# GitHub Secrets Setup for VPS Deployment

The `.github/workflows/deploy.yml` workflow deploys to 187.127.185.239 via SSH. You must configure these secrets to enable automated deployment.

## Required Secrets

Configure these at: https://github.com/ddotsmedia/ddotsmedia.com/settings/secrets/actions

### 1. **VPS_HOST**
- **Value:** `187.127.185.239`
- **Purpose:** SSH target host

### 2. **VPS_USER**
- **Value:** `root`
- **Purpose:** SSH user (must have Docker/Nginx access)

### 3. **VPS_SSH_KEY**
- **Value:** Your private SSH key (contents of `~/.ssh/id_rsa`)
- **Purpose:** SSH authentication

If you don't have an SSH key yet:

```bash
# On your local machine (not the VPS)
ssh-keygen -t ed25519 -f ~/.ssh/id_rsa -N ""
cat ~/.ssh/id_rsa  # Copy this entire contents as VPS_SSH_KEY
```

Then copy the public key to the VPS:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@187.127.185.239
```

Or add it manually:

```bash
ssh root@187.127.185.239
echo "$(cat ~/.ssh/id_rsa.pub)" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## Setup Steps

1. **On your local machine**, generate an SSH key if needed:
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/id_rsa -N ""
   ```

2. **Copy public key to VPS**:
   ```bash
   ssh-copy-id -i ~/.ssh/id_rsa.pub root@187.127.185.239
   ```
   (Or add it manually via `authorized_keys`)

3. **Get the private key contents**:
   ```bash
   cat ~/.ssh/id_rsa
   ```

4. **Add GitHub Secrets**:
   - Go to: https://github.com/ddotsmedia/ddotsmedia.com/settings/secrets/actions
   - Click "New repository secret"
   - Add each secret above

5. **Verify VPS is ready** (see `docs/BOOTSTRAP.md`):
   - Docker installed and running
   - `/opt/ddotsmedia` directory exists with `.env.prod`
   - Nginx configured for ddotsmedia.com
   - PostgreSQL running in a container

## Initial VPS Setup

If the VPS is brand new:

```bash
# Download and run bootstrap script
ssh root@187.127.185.239 'bash -s' < scripts/bootstrap-vps.sh
```

Or copy it first:

```bash
scp scripts/bootstrap-vps.sh root@187.127.185.239:/root/
ssh root@187.127.185.239 bash /root/bootstrap-vps.sh
```

## Testing the Deployment

Once secrets are configured:

1. **Via GitHub Actions UI:**
   - Go to: https://github.com/ddotsmedia/ddotsmedia.com/actions/workflows/deploy.yml
   - Click "Run workflow" → "Run workflow"
   - Watch the "deploy" job run

2. **Via git push:**
   - Push to `main` branch
   - The workflow triggers automatically (after tests pass)

## Troubleshooting

### "SSH permission denied"
- Verify public key is in `/root/.ssh/authorized_keys` on VPS
- Check SSH key isn't password-protected in GitHub secrets (should be raw private key)

### "Health check failed"
- Check logs: `ssh root@187.127.185.239 docker logs ddotsmedia-web`
- Verify `.env.prod` has correct DATABASE_URL
- Check port 3082 is not in use: `ss -ltnp | grep 3082`

### "Disk gate failed: less than 15GB free"
- Clean up Docker: `docker system prune -a`
- Check `/var/lib/docker`: `du -sh /var/lib/docker`
- See VPS Infrastructure docs for cleanup

## Environment Variables

The deployment reads `/opt/ddotsmedia/.env.prod` which should contain:

```env
DATABASE_URL=postgres://ddots_app:PASSWORD@ddotsmedia-db:5432/ddotsmedia
PAYLOAD_SECRET=<32-char hex>
BETTER_AUTH_SECRET=<32-char hex>
BETTER_AUTH_URL=https://ddotsmedia.com
NEXT_PUBLIC_SITE_URL=https://ddotsmedia.com
OWNER_EMAIL=admin@ddotsmedia.com
OWNER_PASSWORD=<set-after-first-login>
RESEND_API_KEY=<optional>
SMTP_HOST=<optional>
```

The `bootstrap-vps.sh` script generates the `.env.prod` with random secrets on first run. Edit it before deploying if you need to add API keys.
