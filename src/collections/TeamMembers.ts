import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "70%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "30%" } },
      ],
    },
    { name: "role", type: "text" },
    { name: "linkedin", type: "text", label: "LinkedIn URL" },
    { name: "avatar", type: "upload", relationTo: "media" },
  ],
};
