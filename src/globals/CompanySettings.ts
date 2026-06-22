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
  ],
};
