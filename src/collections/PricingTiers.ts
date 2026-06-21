import type { CollectionConfig } from "payload";

export const PricingTiers: CollectionConfig = {
  slug: "pricing-tiers",
  admin: { useAsTitle: "name", defaultColumns: ["name", "price", "highlighted", "order"] },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "60%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "40%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "price", type: "text", admin: { width: "50%", description: 'e.g. "AED 5,000"' } },
        { name: "priceLabel", type: "text", defaultValue: "Starting from", admin: { width: "50%" } },
      ],
    },
    { name: "features", type: "array", fields: [{ name: "value", type: "text" }] },
    { name: "highlighted", type: "checkbox", label: 'Highlight as "Most Popular"' },
    {
      type: "row",
      fields: [
        { name: "ctaText", type: "text", defaultValue: "Contact for Details", admin: { width: "50%" } },
        { name: "ctaLink", type: "text", defaultValue: "/contact", admin: { width: "50%" } },
      ],
    },
  ],
};
