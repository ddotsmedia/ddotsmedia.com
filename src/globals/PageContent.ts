import type { GlobalConfig } from "payload";

function pageGroup(name: string, label: string) {
  return {
    name,
    type: "group" as const,
    label,
    fields: [
      {
        name: "overline",
        type: "text" as const,
        admin: { description: "Small label above the heading (e.g. 'About Us', 'Our Work')" },
      },
      {
        name: "heading",
        type: "text" as const,
        admin: { description: "Main H1 heading shown at the top of the page" },
      },
      {
        name: "subtext",
        type: "textarea" as const,
        admin: { description: "Short paragraph shown below the heading" },
      },
    ],
  };
}

export const PageContent: GlobalConfig = {
  slug: "page-content",
  access: { read: () => true },
  admin: {
    description:
      "Edit the hero heading and subtext for each main page. Leave a field blank to use the default built-in text.",
  },
  fields: [
    pageGroup("about", "About Page"),
    pageGroup("services", "Services Page"),
    pageGroup("contact", "Contact Page"),
    pageGroup("portfolio", "Portfolio Page"),
    pageGroup("blog", "Blog Page"),
    pageGroup("careers", "Careers Page"),
  ],
};
