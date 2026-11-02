#!/usr/bin/env bash
# Backup script for ddotsmedia.com — backs up database and media before deploy
# Called by .github/workflows/deploy.yml before pulling and restarting containers

set -euo pipefail

BACKUP_DIR="/opt/ddotsmedia/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
APP_DIR="/opt/ddotsmedia"

log() { echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*"; }

# Create backup directory if needed
mkdir -p "$BACKUP_DIR"

# Backup database
log "Backing up PostgreSQL database..."
DUMP_FILE="${BACKUP_DIR}/ddotsmedia-db-${TIMESTAMP}.sql.gz"
if docker ps --format '{{.Names}}' | grep -q "^ddotsmedia-db$"; then
  docker exec ddotsmedia-db pg_dump -U ddots_app ddotsmedia 2>/dev/null | gzip > "$DUMP_FILE" && \
    log "Database backed up to $DUMP_FILE" || \
    log "WARNING: Database backup failed (non-fatal, continuing)"
else
  log "Database container not running, skipping DB backup"
fi

# Backup media uploads
log "Backing up media uploads..."
MEDIA_BACKUP="${BACKUP_DIR}/media-${TIMESTAMP}.tar.gz"
if [ -d "${APP_DIR}/data/media" ]; then
  tar -czf "$MEDIA_BACKUP" -C "${APP_DIR}/data" media 2>/dev/null && \
    log "Media backed up to $MEDIA_BACKUP" || \
    log "WARNING: Media backup failed (non-fatal, continuing)"
else
  log "No media directory found, skipping media backup"
fi

# Keep only last 10 backups
log "Cleaning old backups (keeping last 10)..."
ls -t "$BACKUP_DIR"/ddotsmedia-db-*.sql.gz 2>/dev/null | tail -n +11 | xargs -r rm
ls -t "$BACKUP_DIR"/media-*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm

log "Backup complete"
