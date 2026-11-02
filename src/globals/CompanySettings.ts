import type { GlobalConfig } from "payload";

export const CompanySettings: GlobalConfig = {
  slug: "company-settings",
  access: { read: () => true },
  fields: [
    { name: "companyName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "heroHeading", type: "text" },
    { name: "heroSubtext", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "email", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "whatsappNumber", type: "text", admin: { width: "50%" } },
        { name: "address", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "twitter", type: "text" },
        { name: "instagram", type: "text" },
        { name: "github", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "officeHours", type: "text", admin: { width: "50%" } },
        { name: "responseTime", type: "text", admin: { width: "50%", description: 'e.g. "within 2 hours"' } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "officeLocation", type: "text", admin: { width: "50%", description: 'e.g. "Dubai · Abu Dhabi · Sharjah"' } },
        { name: "officeVisitNote", type: "text", admin: { width: "50%", description: 'e.g. "Dubai · by appointment"' } },
      ],
    },
    { name: "officeHoursWeekday", type: "text", admin: { description: 'e.g. "Sun – Thu: 9:00 AM – 6:00 PM GST"' } },
    { name: "officeHoursFriSat", type: "text", admin: { description: 'e.g. "Fri – Sat: Closed"' } },
    { name: "officeHoursNote", type: "text", admin: { description: "e.g. Emergency support / timezone note" } },
    {
      type: "row",
      fields: [
        { name: "ctaButtonText", type: "text", admin: { width: "50%", description: 'e.g. "Get Free Quote"' } },
        { name: "ctaButtonLink", type: "text", admin: { width: "50%", description: 'e.g. "/contact"' } },
      ],
    },
    {
      name: "ctaPromises",
      type: "array",
      label: "CTA Promise Badges",
      admin: { description: "Short trust badges shown in the bottom CTA section (e.g. 'Free consultation')" },
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "storyParagraphs",
      type: "array",
      label: "Company Story Paragraphs",
      admin: { description: "Paragraphs for the 'Our Story' section on the About page" },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    {
      name: "trustBadges",
      type: "array",
      label: "Trust / Certification Badges",
      admin: { description: "Items shown in the 'Partners & Certifications' section on the About page" },
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "officeLocations",
      type: "array",
      label: "Office Locations",
      admin: { description: "Office/presence cards shown on the About page" },
      fields: [
        { name: "city", type: "text", required: true },
        { name: "tag", type: "text", admin: { description: 'e.g. "Headquarters" or "Office"' } },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "timeline",
      type: "array",
      label: "Company Timeline",
      admin: { description: "Milestone entries for the 'Our Journey' section on the About page" },
      fields: [
        { name: "year", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "companyValues",
      type: "array",
      label: "Company Values",
      admin: { description: "Value cards for the 'What We Stand For' section on the About page" },
      fields: [
        { name: "icon", type: "text", admin: { description: "Lucide icon name, e.g. Award, Handshake, Lightbulb" } },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        { name: "accent", type: "text", admin: { description: 'CSS color, e.g. "var(--brand-teal)"' } },
      ],
    },
    {
      name: "cultureItems",
      type: "array",
      label: "Culture Items",
      admin: { description: "Cards for the 'How We Work' culture section on the About page" },
      fields: [
        { name: "icon", type: "text", admin: { description: "Lucide icon name, e.g. Globe2, CalendarCheck" } },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};
