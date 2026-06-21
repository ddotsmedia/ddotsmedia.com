import type { GlobalConfig } from "payload";

const ICON_OPTIONS = ["Search", "Palette", "Code", "Rocket"];

export const ProcessSteps: GlobalConfig = {
  slug: "process-steps",
  access: { read: () => true },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "text" },
        { name: "icon", type: "select", options: ICON_OPTIONS },
      ],
    },
  ],
};
