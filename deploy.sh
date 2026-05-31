#!/usr/bin/env bash
# Fully automated deploy for ddotsmedia.com — run AS ROOT on the VPS (194.164.151.202).
# Idempotent: re-run any time to redeploy. First run provisions everything.
#
#   curl -fsSL <raw deploy.sh> -o deploy.sh   # or scp it once
#   sudo GITHUB_TOKEN=ghp_xxx CERTBOT_EMAIL=you@ddotsmedia.com bash deploy.sh
#
set -euo pipefail

# ─────────── Config (override via env) ───────────
DOMAIN="${DOMAIN:-ddotsmedia.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.ddotsmedia.com}"
REPO_URL="${REPO_URL:-https://github.com/ddotsmedia/ddotsmedia.com}"
BRANCH="${BRANCH:-master}"
APP_DIR="${APP_DIR:-/opt/ddotsmedia-web}"
HOST_PORT="${HOST_PORT:-3010}"          # nginx -> app (free 301x port)
DB_PORT="${DB_PORT:-5455}"              # host:container 5432, bound to 127.0.0.1
DB_NAME="${DB_NAME:-ddotsmedia_web}"
DB_USER="${DB_USER:-ddots}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@${DOMAIN}}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"        # required only if repo is private
ENV_FILE="${APP_DIR}/.env"

log() { echo -e "\n\033[1;36m==> $*\033[0m"; }

# ─────────── 1. Base packages + Docker ───────────
log "Installing base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git nginx openssl

if ! command -v docker >/dev/null 2>&1; then
  log "Installing Docker"
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

if ! command -v certbot >/dev/null 2>&1; then
  log "Installing Certbot"
  apt-get install -y certbot python3-certbot-nginx
fi

# ─────────── 2. Fetch code (clone or pull) ───────────
CLONE_URL="$REPO_URL"
if [ -n "$GITHUB_TOKEN" ]; then
  CLONE_URL="https://x-access-token:${GITHUB_TOKEN}@${REPO_URL#https://}"
fi

if [ -d "${APP_DIR}/.git" ]; then
  log "Updating existing checkout"
  git -C "$APP_DIR" remote set-url origin "$CLONE_URL"
  git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/${BRANCH}"
else
  log "Cloning ${REPO_URL}"
  git clone --depth 1 -b "$BRANCH" "$CLONE_URL" "$APP_DIR"
fi
# scrub token from stored remote
git -C "$APP_DIR" remote set-url origin "$REPO_URL"

# ─────────── 3. Docker network + Postgres ───────────
log "Ensuring docker network + Postgres"
docker network inspect ddotsmedia-net >/dev/null 2>&1 || docker network create ddotsmedia-net

if [ ! -f "$ENV_FILE" ]; then
  log "Generating ${ENV_FILE} (first run)"
  DB_PASSWORD="$(openssl rand -hex 16)"
  PAYLOAD_SECRET="$(openssl rand -hex 32)"
  mkdir -p "$APP_DIR"
  cat > "$ENV_FILE" <<EOF
# Generated $(date -u +%FT%TZ). Edit RESEND/SMTP below, then re-run deploy.sh.
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@ddotsmedia-postgres:5432/${DB_NAME}
PAYLOAD_SECRET=${PAYLOAD_SECRET}
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
RESEND_API_KEY=
RESEND_FROM="Ddotsmedia <noreply@${DOMAIN}>"
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Ddotsmedia <noreply@${DOMAIN}>"
EOF
  chmod 600 "$ENV_FILE"
else
  log "Reusing existing ${ENV_FILE}"
fi
# shellcheck disable=SC1090
set -a; . "$ENV_FILE"; set +a
DB_PASSWORD="$(echo "$DATABASE_URL" | sed -E 's#.*://[^:]+:([^@]+)@.*#\1#')"

if ! docker ps -a --format '{{.Names}}' | grep -qx ddotsmedia-postgres; then
  docker run -d --name ddotsmedia-postgres --restart unless-stopped \
    --network ddotsmedia-net \
    -e POSTGRES_USER="$DB_USER" -e POSTGRES_PASSWORD="$DB_PASSWORD" -e POSTGRES_DB="$DB_NAME" \
    -v ddotsmedia_pgdata:/var/lib/postgresql/data \
    -p "127.0.0.1:${DB_PORT}:5432" \
    postgres:16-alpine
else
  docker start ddotsmedia-postgres >/dev/null
fi

log "Waiting for Postgres"
until docker exec ddotsmedia-postgres pg_isready -U "$DB_USER" >/dev/null 2>&1; do sleep 1; done

# ─────────── 4. Build + run app ───────────
log "Building image"
# Build does NOT need the DB: generateStaticParams/sitemap tolerate an unreachable
# DB and pages render on-demand via ISR at runtime. Keeps the image portable.
docker build -t ddotsmedia-web "$APP_DIR"

log "(Re)starting app container"
docker rm -f ddotsmedia-web >/dev/null 2>&1 || true
docker run -d --name ddotsmedia-web --restart unless-stopped \
  --network ddotsmedia-net \
  --env-file "$ENV_FILE" \
  -p "127.0.0.1:${HOST_PORT}:3000" \
  -v ddotsmedia_media:/app/media \
  ddotsmedia-web

# ─────────── 5. Nginx reverse proxy ───────────
log "Configuring nginx"
cat > "/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN} ${WWW_DOMAIN};
    client_max_body_size 25M;
    location / {
        proxy_pass http://127.0.0.1:${HOST_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
nginx -t && systemctl reload nginx

# ─────────── 6. SSL (Certbot) ───────────
log "Obtaining/renewing TLS cert"
if certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
  echo "Cert exists — skipping issuance (auto-renew handles it)."
else
  certbot --nginx --non-interactive --agree-tos -m "$CERTBOT_EMAIL" \
    -d "$DOMAIN" -d "$WWW_DOMAIN" --redirect || \
    echo "WARNING: certbot failed (check DNS A-records point to this VPS), site still on HTTP."
fi

log "Done. App: https://${DOMAIN}  •  Admin: https://${DOMAIN}/admin"
echo "Health check:"; curl -fsS -o /dev/null -w "  local app -> HTTP %{http_code}\n" "http://127.0.0.1:${HOST_PORT}" || true
