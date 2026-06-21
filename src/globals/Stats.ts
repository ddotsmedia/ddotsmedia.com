import type { GlobalConfig } from "payload";

export const Stats: GlobalConfig = {
  slug: "stats",
  access: { read: () => true },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "value", type: "number" },
        { name: "suffix", type: "text", admin: { description: 'e.g. "+"' } },
      ],
    },
  ],
};
