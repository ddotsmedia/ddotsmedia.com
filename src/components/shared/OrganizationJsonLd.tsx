const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Site-wide Organization JSON-LD. Rendered once in the root layout. */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ddotsmedia IT Solutions",
          url: siteUrl,
          description:
            "Software, web, and mobile development studio building custom apps and ERP systems for UAE businesses.",
          areaServed: "AE",
          knowsAbout: ["Web Development", "Mobile Apps", "Custom Software", "ERP Systems"],
        }),
      }}
    />
  );
}
