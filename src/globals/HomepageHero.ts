import type { GlobalConfig } from "payload";

export const HomepageHero: GlobalConfig = {
  slug: "homepage-hero",
  access: { read: () => true },
  admin: { description: "Content for the homepage hero section." },
  fields: [
    { name: "badgeText", type: "text", admin: { description: 'Small label above headline, e.g. "Trusted by 80+ UAE businesses"' } },
    { name: "headline", type: "text", admin: { description: "Main headline -- plain part" } },
    { name: "headlineHighlight", type: "text", admin: { description: "Highlighted/coloured word(s) inside the headline" } },
    { name: "subheading", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "ctaPrimaryText", type: "text", admin: { width: "50%", description: 'e.g. "Get Free Quote"' } },
        { name: "ctaPrimaryLink", type: "text", admin: { width: "50%", description: 'e.g. "/contact"' } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "ctaSecondaryText", type: "text", admin: { width: "50%", description: 'e.g. "View Portfolio"' } },
        { name: "ctaSecondaryLink", type: "text", admin: { width: "50%", description: 'e.g. "/portfolio"' } },
      ],
    },
    {
      name: "videoBgUrl",
      type: "text",
      admin: { description: "Optional background video URL (mp4). Leave empty to use the default particle/gradient background." },
    },
  ],
};
