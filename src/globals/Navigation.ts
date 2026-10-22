import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: { read: () => true },
  admin: { description: "Header navigation menu links and CTA." },
  fields: [
    {
      name: "menuItems",
      type: "array",
      admin: { description: "Top-level nav links." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "40%" } },
            { name: "link", type: "text", required: true, admin: { width: "40%" } },
            { name: "openInNewTab", type: "checkbox", defaultValue: false, admin: { width: "20%" } },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "ctaText", type: "text", admin: { width: "50%", description: 'Button label, e.g. "Get Free Quote"' } },
        { name: "ctaLink", type: "text", admin: { width: "50%", description: 'e.g. "/contact"' } },
      ],
    },
  ],
};
