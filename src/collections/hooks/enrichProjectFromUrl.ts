import type { CollectionBeforeChangeHook } from "payload";
import { toSlug } from "../../lib/slugify";

const TIMEOUT_MS = 15_000;

async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Parse <title> + meta/og description from raw HTML (no DOM dependency). */
function parseMeta(html: string): { title: string; description: string } {
  const title =
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ??
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    "";
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    "";
  return { title: decodeEntities(title), description: decodeEntities(description) };
}

/** Capture a screenshot via ApiFlash, store it as a Media doc, return its id. */
async function captureScreenshot(
  liveUrl: string,
  alt: string,
  req: Parameters<CollectionBeforeChangeHook>[0]["req"],
): Promise<number | string | null> {
  const accessKey = process.env.APIFLASH_ACCESS_KEY;
  if (!accessKey) return null;

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
  const res = await fetchWithTimeout(`https://api.apiflash.com/v1/urltoimage?${params.toString()}`);
  if (!res.ok) throw new Error(`ApiFlash HTTP ${res.status}`);
  const json = (await res.json()) as { url?: string };
  if (!json.url) throw new Error("ApiFlash returned no image url");

  const imgRes = await fetchWithTimeout(json.url);
  if (!imgRes.ok) throw new Error(`screenshot fetch HTTP ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());

  const name = `${toSlug(hostnameOf(liveUrl) || "screenshot") || "screenshot"}.png`;
  const media = await req.payload.create({
    collection: "media",
    data: { alt: alt || hostnameOf(liveUrl) || "Screenshot" },
    file: { data: buffer, mimetype: "image/png", name, size: buffer.length },
  });
  return media.id;
}

/**
 * On save, if `liveUrl` is set/changed, auto-fill title/description/slug from the
 * page and capture a screenshot into coverImage. Every network call is wrapped
 * in try/catch with a timeout — failures are logged and the save still succeeds.
 * Never overwrites values the user has already typed.
 */
export const enrichProjectFromUrl: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  const liveUrl = typeof data?.liveUrl === "string" ? data.liveUrl.trim() : "";
  if (!liveUrl) return data;

  const urlChanged = liveUrl !== (originalDoc?.liveUrl ?? "");
  const needsMeta = !data.title || !data.shortDescription || !data.slug;
  const needsShot = !data.coverImage;
  if (!urlChanged && !needsMeta && !needsShot) return data;

  // (b) METADATA — only fill empties, never overwrite user input.
  if (!data.title || !data.shortDescription) {
    try {
      const res = await fetchWithTimeout(liveUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DdotsmediaBot/1.0)" },
      });
      if (res.ok) {
        const meta = parseMeta(await res.text());
        if (!data.title && meta.title) data.title = meta.title;
        if (!data.shortDescription && meta.description) data.shortDescription = meta.description;
      }
    } catch (err) {
      req.payload.logger.warn(`[projects] metadata fetch failed for ${liveUrl}: ${String(err)}`);
    }
  }

  // (c) SLUG — derive from title or hostname when empty.
  if (!data.slug) {
    const base = (typeof data.title === "string" && data.title) || hostnameOf(liveUrl);
    if (base) data.slug = toSlug(base);
  }

  // (a) SCREENSHOT — capture when there's no cover yet or the URL changed.
  if (needsShot || urlChanged) {
    try {
      const mediaId = await captureScreenshot(
        liveUrl,
        (typeof data.title === "string" && data.title) || hostnameOf(liveUrl),
        req,
      );
      if (mediaId != null) data.coverImage = mediaId;
    } catch (err) {
      req.payload.logger.warn(`[projects] screenshot failed for ${liveUrl}: ${String(err)}`);
    }
  }

  return data;
};
