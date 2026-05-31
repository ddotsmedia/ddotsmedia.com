import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
      { name: "feature", width: 1600, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true, label: "Alt text" },
  ],
};
