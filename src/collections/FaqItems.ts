import type { CollectionConfig } from "payload";

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  admin: { useAsTitle: "question", defaultColumns: ["question", "page", "order"] },
  access: { read: () => true },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        {
          name: "page",
          type: "select",
          defaultValue: "general",
          options: ["services", "about", "general"],
          admin: { width: "50%", description: "Which page this FAQ appears on" },
        },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "50%" } },
      ],
    },
  ],
};
