import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from "payload";
import { revalidatePath } from "next/cache";
import { toSlug } from "../../lib/slugify";

const META_TIMEOUT_MS = 5_000;
const SCREENSHOT_TIMEOUT_MS = 20_000;

async function fetchWithTimeout(url: string, timeoutMs: number, init: RequestInit = {}): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ").trim();
}

function hostnameOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function parseMeta(html: string): { title: string; description: string } {
  const title =
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ??
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  return { title: decodeEntities(title), description: decodeEntities(description) };
}

/**
 * PHASE 1: beforeChange — instant slug/title fallback only. No network calls.
 * Project saves immediately with just the URL.
 */
export const enrichProjectFromUrl: CollectionBeforeChangeHook = async ({ data }) => {
  const liveUrl = typeof data?.liveUrl === "string" ? data.liveUrl.trim() : "";
  if (!liveUrl) return data;

  // Set a title/slug fallback from hostname so NOT NULL is never violated.
  const host = hostnameOf(liveUrl);
  if (!data.title && host) data.title = host;
  if (!data.slug) {
    const base = (typeof data.title === "string" && data.title) || host;
    if (base) {
      // Append a short random suffix to avoid unique constraint violations
      // when multiple projects share the same domain.
      const suffix = Math.random().toString(36).slice(2, 6);
      data.slug = toSlug(base) + "-" + suffix;
    }
  }

  return data;
};

/**
 * PHASE 2: afterChange — enrich metadata + screenshot in the background.
 * Fires AFTER the save succeeds so the UI responds instantly.
 * User just refreshes the record after a few seconds to see the enriched data.
 */
export const enrichProjectAfterSave: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  const liveUrl = typeof doc.liveUrl === "string" ? doc.liveUrl.trim() : "";
  if (!liveUrl) return doc;

  // Only run on create, or if URL changed on update.
  const urlChanged = operation === "create" || liveUrl !== (doc._prevLiveUrl ?? "");
  const needsMeta = !doc.title || doc.title === hostnameOf(liveUrl) || !doc.shortDescription;
  const needsShot = !doc.coverImage;
  if (!urlChanged && !needsMeta && !needsShot) return doc;

  // Bust ISR cache immediately so new/updated project appears on the site right away.
  try { revalidatePath("/portfolio"); revalidatePath("/"); } catch { /* ignore */ }

  // Fire and forget — don't block the response.
  setImmediate(async () => {
    try {
      const updates: Record<string, unknown> = {};

      // Fetch metadata (fast timeout — 5s).
      if (needsMeta) {
        try {
          const res = await fetchWithTimeout(liveUrl, META_TIMEOUT_MS, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; DdotsmediaBot/1.0)" },
          });
          if (res.ok) {
            const meta = parseMeta(await res.text());
            if (meta.title && (!doc.title || doc.title === hostnameOf(liveUrl))) {
              updates.title = meta.title;
              // Regenerate slug from real title if we used hostname fallback.
              if (!doc.slug || doc.slug === toSlug(hostnameOf(liveUrl))) {
                updates.slug = toSlug(meta.title);
              }
            }
            if (meta.description && !doc.shortDescription) {
              updates.shortDescription = meta.description;
            }
          }
        } catch {
          // Metadata fetch timed out or failed — keep hostname title.
        }
      }

      // Capture screenshot (slower — 20s).
      if (needsShot) {
        const accessKey = process.env.APIFLASH_ACCESS_KEY;
        if (accessKey) {
          try {
            const params = new URLSearchParams({
              access_key: accessKey,
              url: liveUrl,
              format: "png",
              width: "1440",
              height: "900",
              fresh: "true",
              wait_until: "page_loaded",
              response_type: "json",
            });
            const apiRes = await fetchWithTimeout(
              `https://api.apiflash.com/v1/urltoimage?${params.toString()}`,
              SCREENSHOT_TIMEOUT_MS,
            );
            if (apiRes.ok) {
              const json = (await apiRes.json()) as { url?: string };
              if (json.url) {
                const imgRes = await fetchWithTimeout(json.url, SCREENSHOT_TIMEOUT_MS);
                if (imgRes.ok) {
                  const buffer = Buffer.from(await imgRes.arrayBuffer());
                  const title = typeof updates.title === "string" ? updates.title : (doc.title ?? "");
                  const name = `${toSlug(hostnameOf(liveUrl) || "screenshot") || "screenshot"}.png`;
                  const media = await req.payload.create({
                    collection: "media",
                    data: { alt: title || hostnameOf(liveUrl) || "Screenshot" },
                    file: { data: buffer, mimetype: "image/png", name, size: buffer.length },
                  });
                  updates.coverImage = media.id;
                }
              }
            }
          } catch {
            // Screenshot failed — not fatal.
          }
        }
      }

      // Write enriched data back if we have anything.
      if (Object.keys(updates).length > 0) {
        await req.payload.update({
          collection: "projects",
          id: doc.id,
          data: updates,
        });
        req.payload.logger.info(`[projects] enriched ${doc.id} (${liveUrl})`);
      }
    } catch (err) {
      req.payload.logger.warn(`[projects] background enrichment failed for ${liveUrl}: ${String(err)}`);
    }
  });

  return doc;
};
