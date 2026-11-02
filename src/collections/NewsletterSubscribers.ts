import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "status", "createdAt"],
    description: "Email newsletter subscribers.",
  },
  access: { read: () => true },
  timestamps: true,
  fields: [
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, unique: true, admin: { width: "50%" } },
        { name: "name", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
