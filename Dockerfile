# ---- Base ----
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build needs no DB: generateStaticParams/sitemap tolerate an unreachable DB and
# pages render on-demand via ISR at runtime. Real secrets are injected at run.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Migrator ----
# One-shot: applies pending Payload migrations and exits. Used by
# docker-compose.prod.yml's `migrate` service (runs before `web` starts) and
# by CI to publish a matching -migrator image tag.
FROM base AS migrator
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["node", "--import", "tsx", "./node_modules/payload/bin.js", "migrate"]

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone server + static assets + public dir
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Media upload dir (mount a volume here)
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
