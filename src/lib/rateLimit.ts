type Entry = { count: number; resetAt: number };

// Per-process fixed-window store. Resets on restart; per-instance only — a
// lightweight safeguard, not a distributed limiter.
const store = new Map<string, Entry>();

/** Returns true if the request is allowed (under `max` within `windowMs`). */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

/** Best-effort client IP from proxy headers (nginx sets X-Forwarded-For). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}
