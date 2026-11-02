# VPS Bootstrap — Setting up 187.127.185.239

## One-Command Setup

If the VPS is fresh (Debian 11/12, root access via SSH):

```bash
ssh root@187.127.185.239 'bash -s' < scripts/bootstrap-vps.sh
```

This single command:
- Installs Docker, Nginx, Certbot, Git
- Creates `/opt/ddotsmedia` directory structure
- Generates `.env.prod` with random secrets
- Starts PostgreSQL container
- Configures Nginx as reverse proxy
- Issues SSL certificate (Let's Encrypt)
- Creates Docker network
- Installs backup scripts

**Output:** VPS fully ready for app deployment (takes ~5-10 minutes)

---

## Manual Setup (if needed)

### 1. SSH to VPS

```bash
ssh root@187.127.185.239
```

### 2. Install base packages

```bash
apt-get update -y
apt-get install -y ca-certificates curl git nginx openssl certbot python3-certbot-nginx
```

### 3. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
```

### 4. Create app directory

```bash
mkdir -p /opt/ddotsmedia/{data/media,data/private,backups,scripts}
cd /opt/ddotsmedia
```

### 5. Generate `.env.prod`

```bash
cat > .env.prod <<'EOF'
DATABASE_URL=postgres://ddots_app:RANDOM_PASSWORD_HERE@ddotsmedia-db:5432/ddotsmedia
PAYLOAD_SECRET=RANDOM_HEX_32_HERE
BETTER_AUTH_SECRET=RANDOM_HEX_32_HERE
BETTER_AUTH_URL=https://ddotsmedia.com
NEXT_PUBLIC_SITE_URL=https://ddotsmedia.com
OWNER_EMAIL=admin@ddotsmedia.com
OWNER_PASSWORD=change-me-after-first-login
RESEND_API_KEY=
RESEND_FROM="Ddotsmedia <noreply@ddotsmedia.com>"
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Ddotsmedia <noreply@ddotsmedia.com>"
ADMIN_EMAIL=admin@ddotsmedia.com
APIFLASH_ACCESS_KEY=
EOF
chmod 600 .env.prod
```

Generate random values:
```bash
openssl rand -hex 16  # For DB_PASSWORD
openssl rand -hex 32  # For PAYLOAD_SECRET and BETTER_AUTH_SECRET
```

### 6. Create Docker network

```bash
docker network create ddotsmedia
```

### 7. Start PostgreSQL

```bash
docker run -d \
  --name ddotsmedia-db \
  --restart unless-stopped \
  --network ddotsmedia \
  -e POSTGRES_USER=ddots_app \
  -e POSTGRES_PASSWORD=YOUR_DB_PASSWORD \
  -e POSTGRES_DB=ddotsmedia \
  -v ddotsmedia_pgdata:/var/lib/postgresql/data \
  -p 127.0.0.1:5432:5432 \
  postgres:17-alpine
```

Wait for readiness:
```bash
docker exec ddotsmedia-db pg_isready -U ddots_app -d ddotsmedia
```

### 8. Configure Nginx

```bash
cat > /etc/nginx/sites-available/ddotsmedia.com <<'EOF'
upstream ddotsmedia_backend {
    server 127.0.0.1:3082;
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
}
EOF

ln -s /etc/nginx/sites-available/ddotsmedia.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 9. Issue SSL certificate

```bash
certbot --nginx -d ddotsmedia.com -d www.ddotsmedia.com --non-interactive --agree-tos -m admin@ddotsmedia.com
```

Certbot automatically updates Nginx config for HTTPS.

---

## Verification Checklist

After setup (or bootstrap script):

```bash
# ✓ Docker is running
docker ps

# ✓ ddotsmedia-db container is healthy
docker exec ddotsmedia-db pg_isready -U ddots_app -d ddotsmedia

# ✓ /opt/ddotsmedia/.env.prod exists and has secrets
cat /opt/ddotsmedia/.env.prod | grep PAYLOAD_SECRET

# ✓ Nginx config is valid
nginx -t

# ✓ Nginx is running
systemctl status nginx

# ✓ SSL cert exists
ls -la /etc/letsencrypt/live/ddotsmedia.com/

# ✓ Free disk space (at least 20GB)
df -h /opt/ddotsmedia
```

---

## Initial Deploy

Once bootstrap is complete, deploy via GitHub Actions:

1. **Configure GitHub Secrets** (see `docs/GITHUB_SECRETS.md`):
   - VPS_HOST=187.127.185.239
   - VPS_USER=root
   - VPS_SSH_KEY=<private key>

2. **Trigger deployment**:
   - Push to main branch, OR
   - Manual trigger: https://github.com/ddotsmedia/ddotsmedia.com/actions/workflows/deploy.yml

3. **Monitor logs**:
   ```bash
   ssh root@187.127.185.239
   docker logs -f ddotsmedia-web
   ```

4. **Access the app**:
   - Site: https://ddotsmedia.com
   - Admin: https://ddotsmedia.com/admin (login with OWNER_EMAIL/OWNER_PASSWORD)

---

## Troubleshooting

### DB connection fails
```bash
# Check PostgreSQL is running and accepting connections
docker logs ddotsmedia-db
docker exec ddotsmedia-db psql -U ddots_app -d ddotsmedia -c "SELECT 1"
```

### Nginx returns 502 (Bad Gateway)
```bash
# Check if app container is running
docker ps | grep ddotsmedia-web

# Check app logs
docker logs ddotsmedia-web

# Check port 3082 is listening
ss -ltnp | grep 3082
```

### SSL certificate issues
```bash
# Check cert validity
certbot certificates

# Force renew (if expiring)
certbot renew --force-renewal

# Reload Nginx after renewal
systemctl reload nginx
```

### Disk space low
```bash
# Check usage
du -sh /var/lib/docker
du -sh /opt/ddotsmedia

# Clean Docker (careful!)
docker system prune -a  # Removes unused images/volumes
```

---

## Next Steps

After VPS is ready and initial deploy succeeds:

1. Log in to admin panel: https://ddotsmedia.com/admin
2. Change OWNER_PASSWORD (it's currently `change-me-after-first-login`)
3. Configure email: Add RESEND_API_KEY or SMTP credentials to `.env.prod`, restart app
4. Test contact form, media uploads, etc.
5. Set up monitoring/alerting if needed
