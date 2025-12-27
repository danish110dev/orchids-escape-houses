
interface UKServiceSchemaProps {
  type: "home" | "breadcrumb" | "itemList" | "faq" | "default" | "property" | "article";
  data?: any;
  includeSiteWide?: boolean;
}

export default function UKServiceSchema({ type, data, includeSiteWide = false }: UKServiceSchemaProps) {
  const baseUrl = "https://www.groupescapehouses.co.uk";
  
  // 1) Organization & WebSite
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Group Escape Houses",
    "url": `${baseUrl}/`,
    "telephone": "01273 569301",
    "email": "hello@groupescapehouses.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11a North Street",
      "addressLocality": "Brighton",
      "postalCode": "BN41 1DH",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "GB",
      "availableLanguage": "en-GB"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": `${baseUrl}/`,
    "name": "Group Escape Houses",
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

  // 3) WebPage schema (Homepage ONLY)
  const webPageSchema = type === "home" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": `${baseUrl}/`,
    "name": "Large Group Accommodation Across the UK | Group Escape Houses",
    "description": "Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors.",
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

  // 6) Property/Product schema
  const propertySchema = (type === "property" && data) ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "brand": {
      "@type": "Brand",
      "name": "Group Escape Houses"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": data.priceFrom,
      "availability": "https://schema.org/InStock"
    }
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
      "name": "Group Escape Houses"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Group Escape Houses",
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
