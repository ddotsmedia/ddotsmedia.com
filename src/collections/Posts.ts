import type { CollectionConfig } from "payload";
import { slugField } from "../lib/slugify";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", defaultColumns: ["title", "publishedDate", "author"] },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [slugField("title")] },
    },
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "publishedDate",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    { name: "author", type: "text" },
    { name: "tags", type: "array", fields: [{ name: "tag", type: "text" }] },
  ],
};
