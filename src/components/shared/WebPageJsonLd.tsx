const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ddotsmedia.com";

interface WebPageJsonLdProps {
  path: string;
  name: string;
  description: string;
  breadcrumb?: { name: string; item: string }[];
}

/** Per-page WebPage + BreadcrumbList JSON-LD. Add to individual pages. */
export function WebPageJsonLd({ path, name, description, breadcrumb }: WebPageJsonLdProps) {
  const url = `${siteUrl}${path}`;
  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];

  if (breadcrumb && breadcrumb.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        ...breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: b.name,
          item: b.item.startsWith("http") ? b.item : `${siteUrl}${b.item}`,
        })),
      ],
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
