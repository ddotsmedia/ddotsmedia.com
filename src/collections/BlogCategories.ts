import type { CollectionConfig } from "payload";

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  admin: { useAsTitle: "name", description: "Categories for blog posts." },
  access: { read: () => true },
  timestamps: true,
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: { width: "50%", description: "URL-friendly identifier, e.g. web-development" },
        },
      ],
    },
    { name: "description", type: "text" },
    {
      name: "color",
      type: "text",
      admin: { description: 'Hex color for this category badge, e.g. #17A697' },
    },
  ],
};
