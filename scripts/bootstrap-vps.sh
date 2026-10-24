#!/usr/bin/env bash
# Bootstrap VPS 187.127.185.239 for ddotsmedia.com deployment
# Run this ONCE as root on the VPS to provision everything
#
#   ssh root@187.127.185.239 'bash -s' < bootstrap-vps.sh
#   OR: scp bootstrap-vps.sh root@187.127.185.239:/ && ssh root@187.127.185.239 bash /bootstrap-vps.sh
#
set -euo pipefail

DOMAIN="ddotsmedia.com"
APP_DIR="/opt/ddotsmedia"
DEPLOY_PORT="3082"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@${DOMAIN}}"

log() { echo -e "\n\033[1;36m==> $*\033[0m"; }
error() { echo -e "\n\033[1;31m❌ $*\033[0m" >&2; exit 1; }

# Verify root
[ "$EUID" = 0 ] || error "Must run as root"

# ─────────── 1. Base packages ───────────
log "Installing base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y >/dev/null
apt-get install -y ca-certificates curl git nginx openssl certbot python3-certbot-nginx >/dev/null

# ─────────── 2. Docker ───────────
if ! command -v docker >/dev/null 2>&1; then
  log "Installing Docker"
  curl -fsSL https://get.docker.com | sh >/dev/null 2>&1
fi
systemctl enable --now docker >/dev/null

# ─────────── 3. App directory ───────────
log "Setting up app directory: $APP_DIR"
mkdir -p "$APP_DIR"/{data/media,data/private,backups,scripts}

# ─────────── 4. Docker network ───────────
log "Creating Docker network"
docker network inspect ddotsmedia >/dev/null 2>&1 || docker network create ddotsmedia >/dev/null

# ─────────── 5. Environment file ───────────
log "Creating environment file"
ENV_FILE="${APP_DIR}/.env.prod"
if [ -f "$ENV_FILE" ]; then
  log "Environment file already exists, skipping generation"
else
  DB_PASSWORD="$(openssl rand -hex 16)"
  PAYLOAD_SECRET="$(openssl rand -hex 32)"
  BETTER_AUTH_SECRET="$(openssl rand -hex 32)"

  cat > "$ENV_FILE" <<EOF
# Generated at $(date -u +%FT%TZ) by bootstrap-vps.sh
# Edit RESEND_API_KEY / SMTP after first deploy if needed

# ─── Database ───
DATABASE_URL=postgres://ddots_app:${DB_PASSWORD}@ddotsmedia-db:5432/ddotsmedia

# ─── Payload CMS ───
PAYLOAD_SECRET=${PAYLOAD_SECRET}

# ─── Better Auth ───
BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
BETTER_AUTH_URL=https://${DOMAIN}

# ─── Site ───
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
OWNER_EMAIL=admin@${DOMAIN}
OWNER_PASSWORD=change-me-after-first-login

# ─── Email (Resend preferred, SMTP fallback) ───
RESEND_API_KEY=
RESEND_FROM="Ddotsmedia <noreply@${DOMAIN}>"
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Ddotsmedia <noreply@${DOMAIN}>"
ADMIN_EMAIL=admin@${DOMAIN}

# ─── Screenshots (ApiFlash) ───
APIFLASH_ACCESS_KEY=
EOF
  chmod 600 "$ENV_FILE"
  log "Created $ENV_FILE with generated secrets"
fi

# ─────────── 6. PostgreSQL ───────────
log "Starting PostgreSQL container"
if ! docker ps -a --format '{{.Names}}' | grep -q "^ddotsmedia-db$"; then
  DB_PASSWORD="$(grep DATABASE_URL "$ENV_FILE" | sed -E 's/.*:([^@]+)@.*/\1/')"
  docker run -d \
    --name ddotsmedia-db \
    --restart unless-stopped \
    --network ddotsmedia \
    -e POSTGRES_USER=ddots_app \
    -e POSTGRES_PASSWORD="$DB_PASSWORD" \
    -e POSTGRES_DB=ddotsmedia \
    -v ddotsmedia_pgdata:/var/lib/postgresql/data \
    -p 127.0.0.1:5432:5432 \
    postgres:17-alpine >/dev/null 2>&1
  log "PostgreSQL container created"
else
  docker start ddotsmedia-db >/dev/null 2>&1
  log "PostgreSQL container already exists, started"
fi

# Wait for DB readiness
log "Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
  if docker exec ddotsmedia-db pg_isready -U ddots_app -d ddotsmedia >/dev/null 2>&1; then
    log "PostgreSQL ready"
    break
  fi
  sleep 1
done

# ─────────── 7. Nginx ───────────
log "Configuring Nginx"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
cat > "$NGINX_CONF" <<'NGINX_EOF'
upstream ddotsmedia_backend {
    server 127.0.0.1:DEPLOY_PORT;
}

server {
    listen 80;
    server_name ddotsmedia.com www.ddotsmedia.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ddotsmedia.com www.ddotsmedia.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://ddotsmedia_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/health {
        proxy_pass http://ddotsmedia_backend;
        access_log off;
    }

    # SSL certs will be added by certbot
    # ssl_certificate ...
    # ssl_certificate_key ...
}
NGINX_EOF

# Replace DEPLOY_PORT placeholder
sed -i "s/DEPLOY_PORT/${DEPLOY_PORT}/g" "$NGINX_CONF"

# Enable the site
ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}" 2>/dev/null || true

# Test and reload Nginx
nginx -t >/dev/null 2>&1 && systemctl reload nginx || error "Nginx config test failed"
log "Nginx configured"

# ─────────── 8. SSL Certificate ───────────
log "Setting up SSL certificate"
if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  certbot certonly --nginx --non-interactive --agree-tos \
    -m "$CERTBOT_EMAIL" \
    -d "$DOMAIN" \
    -d "www.${DOMAIN}" 2>&1 | grep -E "(Cert|issued|ERROR)" || true

  # After cert is issued, certbot updates nginx config automatically
  nginx -t >/dev/null 2>&1 && systemctl reload nginx || log "WARNING: Nginx reload failed after cert setup"
  log "SSL certificate provisioned (or already exists)"
else
  log "SSL certificate already exists"
fi

# ─────────── 9. Deploy scripts ───────────
log "Installing deploy scripts"
# Copy backup.sh from repo if available
if [ -f "$APP_DIR/scripts/backup.sh" ]; then
  chmod +x "$APP_DIR/scripts/backup.sh"
  log "backup.sh already present"
fi

# ─────────── Done ───────────
log "✅ VPS bootstrap complete!"
echo ""
echo "Next steps:"
echo "  1. Configure GitHub Secrets in https://github.com/ddotsmedia/ddotsmedia.com/settings/secrets/actions:"
echo "     - VPS_HOST=187.127.185.239"
echo "     - VPS_USER=root"
echo "     - VPS_SSH_KEY=<contents of ~/.ssh/id_rsa>"
echo ""
echo "  2. Update .env.prod on the VPS:"
echo "     nano $ENV_FILE"
echo "     (Set OWNER_PASSWORD, RESEND_API_KEY if using it, etc.)"
echo ""
echo "  3. Trigger deployment:"
echo "     - Push to main branch, OR"
echo "     - Use GitHub Actions workflow_dispatch at:"
echo "       https://github.com/ddotsmedia/ddotsmedia.com/actions/workflows/deploy.yml"
echo ""
