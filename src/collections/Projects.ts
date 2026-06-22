import type { CollectionConfig } from "payload";
import { slugField } from "../lib/slugify";
import { enrichProjectFromUrl } from "./hooks/enrichProjectFromUrl";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "featured", "order"],
    description:
      "Paste a live URL and save — the title, description, slug, and screenshot are auto-filled. Everything else is optional.",
  },
  access: { read: () => true },
  hooks: { beforeChange: [enrichProjectFromUrl] },
  fields: [
    // Only the URL is required — paste it and save; the rest auto-fills.
    {
      name: "liveUrl",
      type: "text",
      required: true,
      label: "Live URL",
      validate: (value: string | null | undefined) => {
        if (!value) return "Live URL is required";
        try {
          const u = new URL(value);
          if (u.protocol !== "http:" && u.protocol !== "https:") {
            return "URL must start with http:// or https://";
          }
          return true;
        } catch {
          return "Enter a valid URL, e.g. https://example.com";
        }
      },
      admin: { description: "Public URL of the site/app. Everything else is optional." },
    },
    {
      type: "row",
      fields: [
        { name: "title", type: "text", admin: { width: "70%" } },
        {
          name: "category",
          type: "select",
          admin: { width: "30%" },
          options: ["Web", "iOS", "Android", "Desktop", "ERP"],
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [slugField("title")] },
    },
    { name: "shortDescription", type: "textarea" },
    { name: "fullDescription", type: "richText" },
    {
      type: "row",
      fields: [
        { name: "client", type: "text" },
        { name: "year", type: "text" },
        { name: "duration", type: "text" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "Live",
      options: ["Live", "In Progress"],
    },
    {
      type: "collapsible",
      label: "Links",
      fields: [
        { name: "appStoreUrl", type: "text" },
        { name: "playStoreUrl", type: "text" },
        { name: "githubUrl", type: "text" },
      ],
    },
    {
      type: "collapsible",
      label: "Media",
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
      label: "Live Preview",
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
    { name: "techStack", type: "array", fields: [{ name: "tech", type: "text" }] },
    {
      type: "collapsible",
      label: "Case Study",
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
      label: "Testimonial",
      fields: [
        { name: "testimonialQuote", type: "textarea" },
        { name: "testimonialAuthor", type: "text" },
        { name: "testimonialRole", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "featured", type: "checkbox", admin: { width: "50%" } },
        { name: "order", type: "number", defaultValue: 0, admin: { width: "50%" } },
      ],
    },
  ],
};
