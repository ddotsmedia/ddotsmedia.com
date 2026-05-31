import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "initials", type: "text", maxLength: 4 },
  ],
};
