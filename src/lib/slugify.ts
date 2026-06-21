import type { FieldHook } from "payload";

export const toSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/** Auto-fills a slug field from `sourceField` when slug is empty. */
export const slugField =
  (sourceField = "title"): FieldHook =>
  ({ value, data }) => {
    if (typeof value === "string" && value.length) return toSlug(value);
    const source = data?.[sourceField];
    return typeof source === "string" ? toSlug(source) : value;
  };
