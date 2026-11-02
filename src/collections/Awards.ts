import type { CollectionConfig } from "payload";

export const Awards: CollectionConfig = {
  slug: "awards",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "organization", "year", "order"],
    description: "Awards, recognitions, and certifications.",
  },
  access: { read: () => true },
  timestamps: true,
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "organization", type: "text", admin: { width: "50%" } },
        { name: "year", type: "number", admin: { width: "25%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "25%" } },
      ],
    },
    { name: "description", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
