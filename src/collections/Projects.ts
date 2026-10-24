import type { CollectionConfig } from "payload";
import { slugField } from "../lib/slugify";
import { enrichProjectFromUrl } from "./hooks/enrichProjectFromUrl";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "featured", "order"],
    description: "Paste a live URL and save — title, description & screenshot auto-fill.",
  },
  access: { read: () => true },
  hooks: { beforeChange: [enrichProjectFromUrl] },
  fields: [
    // ── Sidebar ──────────────────────────────────────────────────────────────
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [slugField("title")] },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "Live",
      options: ["Live", "In Progress", "Archived"],
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      admin: { position: "sidebar" } as never,
      fields: [
        { name: "featured", type: "checkbox", label: "⭐ Featured", admin: { width: "50%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "50%" } },
      ],
    },

    // ── Main form — minimal & clean ──────────────────────────────────────────
    {
      name: "liveUrl",
      type: "text",
      required: true,
      label: "🌐 Live URL",
      validate: (value: string | null | undefined) => {
        if (!value) return "Live URL is required";
        try {
          const u = new URL(value);
          if (u.protocol !== "http:" && u.protocol !== "https:")
            return "URL must start with http:// or https://";
          return true;
        } catch {
          return "Enter a valid URL, e.g. https://example.com";
        }
      },
      admin: { description: "Paste URL and save — everything below auto-fills." },
    },
    {
      type: "row",
      fields: [
        { name: "title", type: "text", label: "Title (auto-filled)", admin: { width: "70%" } },
        {
          name: "category",
          type: "select",
          label: "Category",
          admin: { width: "30%" },
          options: ["Web", "iOS", "Android", "Desktop", "ERP"],
        },
      ],
    },
    { name: "shortDescription", type: "textarea", label: "Short Description (auto-filled)" },

    // ── All optional details — collapsed by default ──────────────────────────
    {
      type: "collapsible",
      label: "📝 Full Description",
      admin: { initCollapsed: true },
      fields: [{ name: "fullDescription", type: "richText" }],
    },
    {
      type: "collapsible",
      label: "🏢 Project Details",
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "client", type: "text", admin: { width: "33%" } },
            { name: "year", type: "text", admin: { width: "33%" } },
            { name: "duration", type: "text", admin: { width: "33%" } },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "🖼️ Media",
      admin: { initCollapsed: true },
      fields: [
        { name: "coverImage", type: "upload", relationTo: "media" },
        {
          name: "gallery",
          type: "array",
          fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
        },
      ],
    },
    {
      type: "collapsible",
      label: "🔗 Links",
      admin: { initCollapsed: true },
      fields: [
        { name: "appStoreUrl", type: "text", label: "App Store URL" },
        { name: "playStoreUrl", type: "text", label: "Play Store URL" },
        { name: "githubUrl", type: "text", label: "GitHub URL" },
      ],
    },
    {
      type: "collapsible",
      label: "🛠️ Tech Stack",
      admin: { initCollapsed: true },
      fields: [{ name: "techStack", type: "array", fields: [{ name: "tech", type: "text" }] }],
    },
    {
      type: "collapsible",
      label: "📺 Live Preview",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "previewType",
          type: "select",
          options: ["liveEmbed", "video", "deviceMockup", "screenshots"],
        },
        { name: "previewVideoUrl", type: "text" },
        {
          name: "deviceType",
          type: "select",
          options: ["iphone", "android", "macbook", "browser"],
        },
      ],
    },
    {
      type: "collapsible",
      label: "📊 Case Study",
      admin: { initCollapsed: true },
      fields: [
        { name: "problem", type: "richText" },
        { name: "solution", type: "richText" },
        { name: "results", type: "richText" },
        {
          name: "metrics",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "value", type: "text" },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "💬 Testimonial",
      admin: { initCollapsed: true },
      fields: [
        { name: "testimonialQuote", type: "textarea" },
        { name: "testimonialAuthor", type: "text" },
        { name: "testimonialRole", type: "text" },
      ],
    },
  ],
};
