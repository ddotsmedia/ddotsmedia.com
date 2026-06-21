import type { GlobalConfig } from "payload";

export const TrustBar: GlobalConfig = {
  slug: "trust-bar",
  access: { read: () => true },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [{ name: "name", type: "text" }],
    },
  ],
};
