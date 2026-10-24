import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "serviceInterest", "status", "createdAt"],
    description: "Inbound leads and contact form submissions.",
  },
  access: { read: () => true },
  timestamps: true,
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "email", type: "email", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "company", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "serviceInterest",
      type: "select",
      options: [
        { label: "Web Development", value: "web-development" },
        { label: "Mobile Apps", value: "mobile-apps" },
        { label: "Custom Software", value: "custom-software" },
        { label: "UI/UX Design", value: "ui-ux-design" },
        { label: "Cloud & DevOps", value: "cloud-devops" },
        { label: "ERP Systems", value: "erp-systems" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "message", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Read", value: "read" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "notes", type: "textarea", admin: { description: "Internal notes (not visible to client)" } },
  ],
};
