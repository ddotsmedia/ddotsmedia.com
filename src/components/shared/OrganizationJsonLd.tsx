const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ddotsmedia.com";

/** Site-wide Organization + LocalBusiness JSON-LD. Rendered once in the root layout. */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Ddotsmedia Technologies LLC",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+971-50-937-9212",
          contactType: "customer support",
          availableLanguage: ["English", "Arabic", "Malayalam"],
        },
        email: "hello@ddotsmedia.com",
        description:
          "Software, web, and mobile development studio building custom apps and ERP systems for UAE businesses.",
        areaServed: ["AE", "SA", "OM", "KW", "BH", "QA"],
        knowsAbout: [
          "Web Development",
          "Mobile App Development",
          "Custom Software",
          "ERP Systems",
          "UI/UX Design",
          "Cloud & DevOps",
        ],
        sameAs: [
          "https://www.linkedin.com/company/ddotsmedia",
          "https://www.instagram.com/ddotsmedia",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Ddotsmedia Technologies LLC",
        url: siteUrl,
        telephone: "+971-50-937-9212",
        email: "hello@ddotsmedia.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sharjah",
          addressRegion: "Sharjah",
          addressCountry: "AE",
          postalCode: "120001",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.2978,
          longitude: 55.3902,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "09:00",
            closes: "13:00",
          },
        ],
        priceRange: "$$",
        currenciesAccepted: "AED",
        paymentAccepted: "Bank Transfer, Credit Card",
        image: `${siteUrl}/og-image.png`,
        hasMap: "https://maps.google.com/?q=25.2978,55.3902",
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Ddotsmedia IT Solutions",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
