interface UKServiceSchemaProps {
  type: "home" | "breadcrumb" | "itemList" | "faq" | "default" | "property" | "article";
  data?: any;
  includeSiteWide?: boolean;
}

export default function UKServiceSchema({ type, data, includeSiteWide = false }: UKServiceSchemaProps) {
  return <SchemaRenderer type={type} data={data} includeSiteWide={includeSiteWide} />;
}

export function SchemaRenderer({ type, data, includeSiteWide = false }: UKServiceSchemaProps) {
  const baseUrl = "https://www.groupescapehouses.co.uk";
  const siteName = "Group Escape Houses";
  const sameAs = [
    "https://www.instagram.com/groupescapehouses/",
    "https://www.tiktok.com/@groupescapehouses",
    "https://www.youtube.com/@GroupEscapeHouses",
    "https://www.facebook.com/profile.php?id=61580927195664",
    "https://www.pinterest.com/groupescapehouses"
  ];
  
  // 1) Organization & WebSite
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": siteName,
    "url": `${baseUrl}/`,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`
    },
    "sameAs": sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+44-1273-569301",
      "email": "hello@groupescapehouses.co.uk",
      "areaServed": "GB",
      "availableLanguage": "en-GB"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": siteName,
    "url": `${baseUrl}/`,
    "telephone": "+441273569301",
    "email": "hello@groupescapehouses.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11a North Street",
      "addressLocality": "Brighton",
      "postalCode": "BN41 1DH",
      "addressCountry": "GB"
    },
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/logo.png`,
    "priceRange": "££",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": `${baseUrl}/`,
    "name": siteName,
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/properties?destination={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 3) WebPage schema (Every page)
  const webPageSchema = type !== "default" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${data?.url || "/"}#webpage`,
    "url": `${baseUrl}${data?.url || "/"}`,
    "name": data?.name || `Group Accommodation & Luxury Holiday Houses UK | ${siteName}`,
    "description": data?.description || "Luxury large group accommodation across the UK. Book large group houses with hot tubs, pools, and expert planning.",
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#organization` }
  } : null;

  // 2) BreadcrumbList schema (Every page EXCEPT homepage)
  const breadcrumbSchema = (type !== "home" && data?.breadcrumbs) ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.breadcrumbs.map((crumb: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith("http") ? crumb.url : `${baseUrl}${crumb.url.startsWith("/") ? "" : "/"}${crumb.url}`
    }))
  } : null;

  // 4) ItemList schema (Collection pages, search results, location pages)
  const itemListSchema = (type === "itemList" && data?.items) ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data.items.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": item.url ? (item.url.startsWith("http") ? item.url : `${baseUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`) : `${baseUrl}/properties/${item.slug}`
    }))
  } : null;

  // 5) FAQPage schema (Pages with FAQs)
  const faqSchema = (type === "faq" && data?.faqs) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // 6) Property/VacationRental schema
  const propertySchema = (type === "property" && data) ? {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "url": `${baseUrl}/properties/${data.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.location,
      "addressCountry": "GB"
    },
    "provider": { "@id": `${baseUrl}/#organization` },
    ...(data.priceFrom && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": data.priceFrom,
        "availability": "https://schema.org/InStock"
      }
    })
  } : null;

  // 7) Article schema
  const articleSchema = (type === "article" && data) ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.image,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Organization",
      "name": siteName
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  } : null;

  return (
    <>
      {/* Site-wide schema */}
      {includeSiteWide && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </>
      )}
      
      {/* Page specific schema */}
      {webPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {propertySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}
