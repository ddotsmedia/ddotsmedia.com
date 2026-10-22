import type { GlobalConfig } from "payload";

export const FooterSettings: GlobalConfig = {
  slug: "footer-settings",
  access: { read: () => true },
  admin: { description: "Footer tagline, links, and copyright." },
  fields: [
    { name: "tagline", type: "text", admin: { description: "Short tagline shown under the logo in the footer." } },
    {
      name: "quickLinks",
      type: "array",
      admin: { description: "Quick navigation links column." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
            { name: "link", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "serviceLinks",
      type: "array",
      admin: { description: "Services column links." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
            { name: "link", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "legalLinks",
      type: "array",
      admin: { description: "Bottom-bar legal links (Privacy Policy, Terms, etc.)." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
            { name: "link", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "copyrightText",
      type: "text",
      admin: { description: 'e.g. "2025 Ddotsmedia IT Solutions LLC. All rights reserved."' },
    },
  ],
};
