import type { Media } from "@/payload-types";

type Size = "thumbnail" | "card" | "feature";

/** Resolve a usable image URL from a Payload upload field, preferring a size. */
export function mediaUrl(
  media: number | Media | null | undefined,
  size?: Size,
): string | null {
  if (!media || typeof media === "number") return null;
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url ?? null;
  return media.url ?? null;
}

export function mediaAlt(media: number | Media | null | undefined): string {
  return media && typeof media !== "number" ? media.alt : "";
}

export function mediaDims(
  media: number | Media | null | undefined,
): { width: number; height: number } {
  if (media && typeof media !== "number" && media.width && media.height) {
    return { width: media.width, height: media.height };
  }
  return { width: 1200, height: 800 };
}
