import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const JobListings: CollectionConfig = {
  slug: "job-listings",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "locationType", "employmentType", "active"],
    description: "Open positions at Ddotsmedia.",
  },
  access: { read: () => true },
  timestamps: true,
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "60%" } },
        { name: "slug", type: "text", admin: { width: "40%", description: "URL slug, auto-fill from title" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "department",
          type: "select",
          options: [
            { label: "Engineering", value: "engineering" },
            { label: "Design", value: "design" },
            { label: "Project Management", value: "project-management" },
            { label: "Sales", value: "sales" },
            { label: "Marketing", value: "marketing" },
            { label: "Operations", value: "operations" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "locationType",
          type: "select",
          defaultValue: "hybrid",
          options: [
            { label: "On-site (Dubai/UAE)", value: "onsite" },
            { label: "Remote", value: "remote" },
            { label: "Hybrid", value: "hybrid" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "employmentType",
          type: "select",
          defaultValue: "full-time",
          options: [
            { label: "Full-time", value: "full-time" },
            { label: "Part-time", value: "part-time" },
            { label: "Freelance / Contract", value: "freelance" },
            { label: "Internship", value: "internship" },
          ],
          admin: { width: "33%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "location", type: "text", admin: { width: "50%", description: 'e.g. "Dubai, UAE"' } },
        { name: "salaryRange", type: "text", admin: { width: "50%", description: 'e.g. "AED 8,000 - 12,000/mo"' } },
      ],
    },
    { name: "shortDescription", type: "text", admin: { description: "One-line summary shown in job listings" } },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor(),
      admin: { description: "Full job description - role, responsibilities, about the team" },
    },
    {
      name: "requirements",
      type: "richText",
      editor: lexicalEditor(),
      admin: { description: "Required skills, experience, qualifications" },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Show this listing on the careers page" },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
