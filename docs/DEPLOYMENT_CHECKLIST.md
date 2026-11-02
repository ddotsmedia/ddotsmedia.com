# Deployment Checklist — ddotsmedia.com → 187.127.185.239

## Pre-Deployment (One-time setup)

- [ ] VPS 187.127.185.239 is reachable via SSH as root
- [ ] Run bootstrap script: `ssh root@187.127.185.239 'bash -s' < scripts/bootstrap-vps.sh`
- [ ] Verify post-bootstrap:
  ```bash
  ssh root@187.127.185.239
  docker ps          # ddotsmedia-db should be running
  cat /opt/ddotsmedia/.env.prod | grep PAYLOAD_SECRET  # Should output a value
  nginx -t           # Should say "test successful"
  ```

- [ ] Configure GitHub Secrets at https://github.com/ddotsmedia/ddotsmedia.com/settings/secrets/actions:
  - [ ] VPS_HOST = 187.127.185.239
  - [ ] VPS_USER = root
  - [ ] VPS_SSH_KEY = <contents of ~/.ssh/id_rsa>

## Before Each Deployment

- [ ] All commits are pushed to main branch
- [ ] GitHub Actions CI passes (test job completes successfully)
- [ ] `.env.prod` on VPS has been updated if secrets/configs changed:
  ```bash
  ssh root@187.127.185.239
  cat /opt/ddotsmedia/.env.prod
  # Edit if needed: nano /opt/ddotsmedia/.env.prod
  ```
- [ ] At least 15GB free disk space on VPS:
  ```bash
  df -h /opt/ddotsmedia  # Shows free space in last column
  ```
- [ ] PostgreSQL container is healthy:
  ```bash
  docker exec ddotsmedia-db pg_isready -U ddots_app -d ddotsmedia
  # Should return: accepting connections
  ```

## Deployment Process

### Option A: Automatic (recommended)
1. Push to main branch → GitHub Actions triggers automatically
2. Wait for `test` job (5-10 min)
3. Wait for `build-and-push` job (3-5 min, builds Docker images)
4. **Manual approval required**: Go to Actions workflow → click "Review deployments"
5. Approve → deployment starts (5-10 min)

### Option B: Manual trigger
1. Go to: https://github.com/ddotsmedia/ddotsmedia.com/actions/workflows/deploy.yml
2. Click "Run workflow" → "Run workflow"
3. Wait for tests to pass
4. Approve the deployment when prompted
5. Monitor the "Deploy over SSH" job

## During Deployment

- [ ] Watch the GitHub Actions logs:
  - `test` job should see `npm run test` pass
  - `build-and-push` job should push image to `ghcr.io/ddotsmedia/ddotsmedia-web`
  - `deploy` job should show successful SSH connection and health check

- [ ] SSH to VPS and monitor:
  ```bash
  ssh root@187.127.185.239
  docker logs -f ddotsmedia-web
  # Should show "ready - started server on ... url: http://localhost:3000"
  ```

## Post-Deployment Verification

Within 5 minutes of deployment completing:

- [ ] Health check endpoint responds:
  ```bash
  curl -s https://ddotsmedia.com/api/health
  # Should return: 200 OK
  ```

- [ ] Homepage loads:
  ```bash
  curl -I https://ddotsmedia.com
  # Should return: HTTP/2 200
  ```

- [ ] Open browser: https://ddotsmedia.com
  - [ ] Page displays without errors (check browser DevTools console)
  - [ ] Navigation works
  - [ ] Admin panel accessible: https://ddotsmedia.com/admin

- [ ] Database is accessible:
  ```bash
  ssh root@187.127.185.239
  docker exec ddotsmedia-db psql -U ddots_app -d ddotsmedia -c "SELECT COUNT(*) FROM payload_versioned_docs LIMIT 1;"
  # Should return a count (or 0 if empty)
  ```

- [ ] Container is stable (check after 2 minutes):
  ```bash
  docker ps | grep ddotsmedia-web
  # Should show STATUS: "Up X minutes" (not restarting)
  ```

## If Something Goes Wrong

### Health check failed (deploy job hangs at "Health check passed" line)
```bash
# Check app logs
ssh root@187.127.185.239
docker logs --tail 50 ddotsmedia-web

# Common issues:
# - DATABASE_URL incorrect
# - PAYLOAD_SECRET missing/wrong
# - App crashed during startup
# - Port 3082 already in use: `ss -ltnp | grep 3082`
```

### Disk gate failed (< 15GB free)
```bash
# See VPS Infrastructure docs for cleanup
# Quick: docker system prune -a (remove unused images)
df -h /opt/ddotsmedia
du -sh /var/lib/docker
```

### Container crashes immediately
```bash
# Check environment variables
docker run -it --env-file /opt/ddotsmedia/.env.prod --rm ghcr.io/ddotsmedia/ddotsmedia-web:latest node server.js
# Watch for errors
```

### Nginx 502 Bad Gateway
```bash
# Verify Nginx config
nginx -t
systemctl reload nginx

# Check if app container is running
docker ps | grep ddotsmedia-web

# Check logs
docker logs ddotsmedia-web
```

## Rollback

If deployment causes issues:

```bash
ssh root@187.127.185.239
cd /opt/ddotsmedia

# Restore previous backup (if available)
ls -lt backups/
tar -xzf backups/media-TIMESTAMP.tar.gz
# or restore DB: psql ... < backups/ddotsmedia-db-TIMESTAMP.sql

# Restart with previous image (if known)
docker pull ghcr.io/ddotsmedia/ddotsmedia-web:PREVIOUS_COMMIT_SHA
TAG=PREVIOUS_COMMIT_SHA docker compose -f docker-compose.prod.yml up -d
```

Or trigger a new deployment with a known-good commit:

```bash
git log --oneline | head -20
# Find commit SHA of last known-good state
# In GitHub Actions, "Run workflow" → input commit SHA in image_tag
```

## Success Criteria

Deployment is successful when:
1. ✅ GitHub Actions deploy job shows "Health check passed"
2. ✅ https://ddotsmedia.com/api/health returns 200 OK
3. ✅ https://ddotsmedia.com homepage loads
4. ✅ https://ddotsmedia.com/admin is accessible
5. ✅ Container is stable (STATUS: "Up X minutes", not restarting)
6. ✅ Logs show no errors: `docker logs ddotsmedia-web | tail -20`

---

## Common Issues & Fixes

| Issue | Check | Fix |
|-------|-------|-----|
| "SSH permission denied" | VPS_SSH_KEY in secrets | Verify `/root/.ssh/authorized_keys` has public key |
| "Health check failed" | `docker logs ddotsmedia-web` | Check DATABASE_URL, .env.prod, logs |
| "Disk gate failed" | `df -h /opt/ddotsmedia` | Run `docker system prune -a` on VPS |
| "502 Bad Gateway" | `docker ps`, Nginx logs | Verify app container is running, Nginx config |
| "Page loads slowly" | Monitor container: `docker stats` | Check CPU/memory limits, database queries |

---

## Monitoring After Deploy

```bash
# Watch real-time logs
ssh root@187.127.185.239
docker logs -f ddotsmedia-web

# Check container stats
docker stats ddotsmedia-web

# Check port/connections
ss -ltnp | grep 3082

# Check disk usage
df -h /opt/ddotsmedia
du -sh /opt/ddotsmedia/*
```

Keep monitoring for at least 5 minutes after deployment to catch startup issues.
