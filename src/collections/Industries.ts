import type { CollectionConfig } from "payload";

const ICON_OPTIONS = ["HeartPulse", "Building2", "ShoppingCart", "Landmark", "GraduationCap", "Truck"];

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: { useAsTitle: "title", defaultColumns: ["title", "order"] },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "70%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "30%" } },
      ],
    },
    { name: "icon", type: "select", options: ICON_OPTIONS },
    { name: "description", type: "text" },
  ],
};
