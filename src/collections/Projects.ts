import type { CollectionConfig } from "payload";
import { slugField } from "../lib/slugify";
import { enrichProjectFromUrl } from "./hooks/enrichProjectFromUrl";

const TECH_OPTIONS = [
  'Next.js','React','Vue.js','Nuxt','Angular','Svelte','Astro',
  'React Native','Flutter','Expo','Swift','Kotlin',
  'Node.js','Express','NestJS','Fastify','Laravel','Django','FastAPI',
  'PostgreSQL','MySQL','MongoDB','Redis','SQLite','Supabase','Firebase',
  'Prisma','Drizzle','Mongoose','TypeORM',
  'Tailwind CSS','SCSS','Framer Motion','shadcn/ui','MUI',
  'Payload CMS','WordPress','Strapi','Sanity','Contentful',
  'TypeScript','JavaScript','Python','PHP','Go','Rust',
  'Docker','Kubernetes','GitHub Actions','Nginx','PM2',
  'AWS','GCP','Azure','Vercel','Netlify','Railway','Hostinger VPS',
  'REST API','GraphQL','WebSockets','tRPC','Stripe','Razorpay',
].map(t => ({ label: t, value: t }))

const CATEGORY_OPTIONS = [
  { label: '🌐 Web App',          value: 'Web' },
  { label: '🍎 iOS App',          value: 'iOS' },
  { label: '🤖 Android App',      value: 'Android' },
  { label: '🖥️ Desktop App',      value: 'Desktop' },
  { label: '📊 ERP / Dashboard',  value: 'ERP' },
  { label: '🛒 E-Commerce',       value: 'Ecommerce' },
  { label: '📰 CMS / Blog',       value: 'CMS' },
  { label: '🤖 AI / ML',          value: 'AI' },
  { label: '📱 SaaS',             value: 'SaaS' },
]

const STATUS_OPTIONS = [
  { label: '🟢 Live',        value: 'Live' },
  { label: '🔵 In Progress', value: 'In Progress' },
  { label: '🟡 Beta',        value: 'Beta' },
  { label: '⚫ Archived',    value: 'Archived' },
  { label: '🔴 Maintenance', value: 'Maintenance' },
]

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
      admin: { position: "sidebar", description: "Auto-generated from title" },
      hooks: { beforeValidate: [slugField("title")] },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "Live",
      options: STATUS_OPTIONS,
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "⭐ Feature on Homepage",
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower = shown first" },
    },

    // ── TABS ─────────────────────────────────────────────────────────────────
    {
      type: "tabs",
      tabs: [

        // ── Tab 1: Overview ──────────────────────────────────────────────────
        {
          label: "📋 Overview",
          fields: [

            // ════════════ REQUIRED ════════════
            {
              name: "liveUrl",
              type: "text",
              required: true,
              label: "🌐 Live URL *",
              validate: (value: string | null | undefined) => {
                if (!value) return "Live URL is required";
                try {
                  const u = new URL(value);
                  if (u.protocol !== "http:" && u.protocol !== "https:")
                    return "URL must start with http:// or https://";
                  return true;
                } catch {
                  return "Enter a valid URL — e.g. https://example.com";
                }
              },
              admin: {
                description: "✨ Paste any URL → Save → Title, description & screenshot auto-fill instantly",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Project Title *",
                  admin: {
                    width: "65%",
                    description: "Auto-filled from the page title",
                  },
                },
                {
                  name: "category",
                  type: "select",
                  required: true,
                  label: "Category *",
                  options: CATEGORY_OPTIONS,
                  admin: { width: "35%" },
                },
              ],
            },
            {
              name: "shortDescription",
              type: "textarea",
              label: "Short Description *",
              admin: {
                description: "Auto-filled from meta tags — shown on portfolio cards (1–2 sentences)",
                rows: 3,
              },
            },

            // ════════════ OPTIONAL (collapsed) ════════════
            {
              type: "collapsible",
              label: "📝 Full Description  —  optional",
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "fullDescription",
                  type: "richText",
                  admin: { description: "Detailed write-up shown on the project detail page" },
                },
              ],
            },
            {
              type: "collapsible",
              label: "🏢 Project Details  —  optional",
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "client",   type: "text",   label: "Client / Company",  admin: { width: "40%" } },
                    { name: "year",     type: "number", label: "Year",               admin: { width: "20%" } },
                    { name: "duration", type: "text",   label: "Duration",           admin: { width: "40%", description: "e.g. 3 months" } },
                  ],
                },
              ],
            },
            {
              type: "collapsible",
              label: "🛠️ Tech Stack & Tags  —  optional",
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "techStack",
                  type: "array",
                  label: "Tech Stack",
                  admin: { description: "Technologies used — shown as tags on the portfolio card", initCollapsed: false },
                  fields: [
                    {
                      name: "tech",
                      type: "select",
                      label: "Technology",
                      options: TECH_OPTIONS,
                    },
                  ],
                },
                {
                  name: "tags",
                  type: "text",
                  label: "Custom Tags",
                  admin: { description: "Comma-separated keywords for search/filter (e.g. fintech, multilingual)" },
                },
              ],
            },
          ],
        },

        // ── Tab 2: Media ─────────────────────────────────────────────────────
        {
          label: "🖼️ Media",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: "Cover Image",
              admin: { description: "Auto-captured screenshot on first save. Replace any time." },
            },
            {
              name: "gallery",
              type: "array",
              label: "Gallery",
              admin: { description: "Additional screenshots or design previews" },
              fields: [
                { name: "image",   type: "upload", relationTo: "media", required: true },
                { name: "caption", type: "text",   admin: { description: "Optional caption" } },
              ],
            },
            {
              type: "collapsible",
              label: "📺 Live Preview / Video  —  optional",
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "previewType",
                  type: "select",
                  label: "Preview Type",
                  options: [
                    { label: 'Live Embed (iframe)', value: 'liveEmbed' },
                    { label: 'Video',               value: 'video' },
                    { label: 'Device Mockup',       value: 'deviceMockup' },
                    { label: 'Screenshots',         value: 'screenshots' },
                  ],
                },
                {
                  name: "previewVideoUrl",
                  type: "text",
                  label: "Video URL",
                  admin: { description: "YouTube, Vimeo, or direct .mp4 URL" },
                },
                {
                  name: "deviceType",
                  type: "select",
                  label: "Device Frame",
                  options: [
                    { label: '📱 iPhone',          value: 'iphone' },
                    { label: '🤖 Android',         value: 'android' },
                    { label: '💻 MacBook',         value: 'macbook' },
                    { label: '🌐 Browser Window',  value: 'browser' },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 3: Links ─────────────────────────────────────────────────────
        {
          label: "🔗 Links",
          fields: [
            { name: "appStoreUrl",  type: "text", label: "🍎 App Store URL" },
            { name: "playStoreUrl", type: "text", label: "🤖 Play Store URL" },
            { name: "githubUrl",    type: "text", label: "🐙 GitHub Repository" },
          ],
        },

        // ── Tab 4: Case Study ────────────────────────────────────────────────
        {
          label: "📊 Case Study",
          fields: [
            { name: "problem",  type: "richText", label: "🎯 Problem / Challenge" },
            { name: "solution", type: "richText", label: "💡 Solution" },
            { name: "results",  type: "richText", label: "📈 Results & Impact" },
            {
              name: "metrics",
              type: "array",
              label: "📊 Key Metrics",
              admin: { description: "Headline numbers to highlight — e.g. 40% faster, 10K users" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", label: "Value", admin: { width: "35%", description: "e.g. 40%" } },
                    { name: "label", type: "text", label: "Label", admin: { width: "65%", description: "e.g. Faster load time" } },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 5: Testimonial ───────────────────────────────────────────────
        {
          label: "💬 Testimonial",
          fields: [
            {
              name: "testimonialQuote",
              type: "textarea",
              label: "Quote",
              admin: { rows: 4, description: "Client testimonial in their own words" },
            },
            {
              type: "row",
              fields: [
                { name: "testimonialAuthor", type: "text", label: "Author Name",    admin: { width: "50%" } },
                { name: "testimonialRole",   type: "text", label: "Role / Company", admin: { width: "50%" } },
              ],
            },
          ],
        },

      ],
    },
  ],
};
