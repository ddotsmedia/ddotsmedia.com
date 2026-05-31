import { getPayload } from "payload";
import config from "@payload-config";

/** Cached Payload local-API instance (no HTTP hop). */
export const getPayloadClient = async () => getPayload({ config });

/**
 * Run a Payload query that may execute at build time when the DB is unreachable.
 * Returns `fallback` instead of throwing so `next build` (generateStaticParams,
 * sitemap) succeeds; the pages then populate on-demand via ISR at runtime.
 */
export async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn("[payload] query failed (using fallback):", (err as Error).message);
    return fallback;
  }
}
