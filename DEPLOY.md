# Deploying Ddotsmedia Web (VPS · Docker · Nginx · Certbot)

Self-hosted Next.js 15 + Payload CMS 3 (standalone output). The container listens on
**:3000 internally**; map it to a free host port (this VPS uses the **301x** pattern —
use **3010** unless taken).

## 1. Postgres — separate database

Payload needs its **own** database, isolated from other projects. Either reuse the host
Postgres with a dedicated DB/user, or run a dedicated container:

```bash
docker run -d --name ddotsmedia-postgres --restart unless-stopped \
  -e POSTGRES_USER=ddots -e POSTGRES_PASSWORD='STRONG_PASSWORD' \
  -e POSTGRES_DB=ddotsmedia_web \
  -v ddotsmedia_pgdata:/var/lib/postgresql/data \
  -p 127.0.0.1:5455:5432 \
  postgres:16-alpine
```

Bind to `127.0.0.1` only — never expose Postgres publicly.

## 2. Environment

Copy `.env.example` → `.env` and fill:

```env
DATABASE_URL=postgres://ddots:STRONG_PASSWORD@host.docker.internal:5455/ddotsmedia_web
PAYLOAD_SECRET=<openssl rand -hex 32>
RESEND_API_KEY=...            # or SMTP_* for SMTP
NEXT_PUBLIC_SITE_URL=https://ddotsmedia.com
```

> If Postgres runs on the host (not in Docker), use `host.docker.internal` (add
> `--add-host=host.docker.internal:host-gateway` to `docker run`), or put both
> containers on the same Docker network and use the container name.

## 3. Build & run the app

```bash
docker build -t ddotsmedia-web .

docker run -d --name ddotsmedia-web --restart unless-stopped \
  --env-file .env \
  --add-host=host.docker.internal:host-gateway \
  -p 127.0.0.1:3010:3000 \
  -v ddotsmedia_media:/app/media \
  ddotsmedia-web
```

- **`-v ddotsmedia_media:/app/media`** persists Payload uploads across redeploys
  (the Media collection writes to `/app/media`). Without this, uploaded images are
  lost on every container replace.
- Port bound to `127.0.0.1` — only Nginx talks to it.

On first run, Payload **pushes the schema** automatically (dev push). For controlled
production migrations instead, run `npm run payload migrate` in the builder and switch
the adapter to `push: false` — optional hardening.

Create the first admin user at `https://ddotsmedia.com/admin`.

## 4. Nginx reverse proxy

`/etc/nginx/sites-available/ddotsmedia.com`:

```nginx
server {
    server_name ddotsmedia.com www.ddotsmedia.com;

    client_max_body_size 25M;   # allow media uploads through the proxy

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/ddotsmedia.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 5. SSL with Certbot

```bash
certbot --nginx -d ddotsmedia.com -d www.ddotsmedia.com
```

Certbot rewrites the server block for 443 + auto-renews (`certbot renew` via systemd timer).

## 6. Redeploy

```bash
git pull
docker build -t ddotsmedia-web .
docker stop ddotsmedia-web && docker rm ddotsmedia-web
# re-run the `docker run` from step 3 (named volume keeps media + DB intact)
```

## Port map note

This VPS runs many projects. Before `docker run`, confirm the host port is free:
`ss -ltnp | grep 3010`. Pick the next free `301x` if occupied.
