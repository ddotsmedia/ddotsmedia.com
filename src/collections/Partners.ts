import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "website", "order"],
    description: "Technology, business, and community partners.",
  },
  access: { read: () => true },
  timestamps: true,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      type: "row",
      fields: [
        { name: "website", type: "text", admin: { width: "50%" } },
        {
          name: "type",
          type: "select",
          defaultValue: "technology",
          options: [
            { label: "Technology", value: "technology" },
            { label: "Business", value: "business" },
            { label: "Media", value: "media" },
            { label: "Community", value: "community" },
          ],
          admin: { width: "25%" },
        },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "25%" } },
      ],
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};
