import type { GlobalConfig } from "payload";

export const SeoDefaults: GlobalConfig = {
  slug: "seo-defaults",
  access: { read: () => true },
  admin: { description: "Site-wide SEO defaults applied when page-level meta is absent." },
  fields: [
    {
      name: "metaTitleSuffix",
      type: "text",
      admin: { description: 'Appended to every page title, e.g. "-- Ddotsmedia IT Solutions"' },
    },
    {
      name: "defaultDescription",
      type: "textarea",
      admin: { description: "Fallback meta description (155 chars max recommended)." },
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Default Open Graph / social share image (1200x630px recommended)." },
    },
    {
      name: "twitterHandle",
      type: "text",
      admin: { description: 'Twitter/X handle without @, e.g. "ddotsmedia"' },
    },
    {
      name: "googleVerification",
      type: "text",
      admin: { description: "Google Search Console verification meta content value." },
    },
  ],
};
