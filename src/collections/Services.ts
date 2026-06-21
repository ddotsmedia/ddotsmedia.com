import type { CollectionConfig } from "payload";
import { slugField } from "../lib/slugify";

const ICON_OPTIONS = ["Globe", "Smartphone", "Code", "Palette", "Cloud", "LayoutDashboard"];

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "order"] },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "70%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "30%" } },
      ],
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [slugField("title")] },
    },
    {
      type: "row",
      fields: [
        { name: "icon", type: "select", options: ICON_OPTIONS, admin: { width: "50%" } },
        {
          name: "category",
          type: "select",
          options: ["web", "mobile", "software", "design", "devops", "erp"],
          admin: { width: "50%" },
        },
      ],
    },
    { name: "color", type: "text", admin: { description: "CSS color, e.g. var(--brand-teal) or #3dbac6" } },
    { name: "shortDescription", type: "textarea" },
    { name: "longDescription", type: "richText" },
    { name: "features", type: "array", fields: [{ name: "value", type: "text" }] },
    { name: "techStack", type: "array", fields: [{ name: "value", type: "text" }] },
    { name: "screenshot", type: "upload", relationTo: "media" },
  ],
};
