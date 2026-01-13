interface UKServiceSchemaProps {
  type: "home" | "breadcrumb" | "itemList" | "faq" | "default" | "property" | "article" | "organization" | "website" | "home_graph";
  data?: any;
  includeSiteWide?: boolean;
}

export default function UKServiceSchema({ type, data, includeSiteWide = false }: UKServiceSchemaProps) {
  return <SchemaRenderer type={type} data={data} includeSiteWide={includeSiteWide} />;
}

export function SchemaRenderer({ type, data, includeSiteWide = false }: UKServiceSchemaProps) {
  const baseUrl = "https://www.groupescapehouses.co.uk";
  const siteName = "Group Escape Houses";
  
  // Organization schema is now handled by OrganizationSchema.tsx sitewide
  // to avoid duplication and maintain a single source of truth.

  const websiteSchema = {
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

  const homeGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...websiteSchema,
        "@context": undefined
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": `${baseUrl}/`,
        "name": "Group Escape Houses | Large Group Accommodation UK",
        "isPartOf": `${baseUrl}/#website`,
        "about": `${baseUrl}/#organization`,
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90"
          }
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I book a hen party house?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Browse our properties, select your preferred house, and submit an enquiry with your dates and group size. Our UK team will respond within 24 hours with availability and a quote. You can also call us for instant assistance."
            }
          },
          {
            "@type": "Question",
            "name": "What is included in the price?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All our properties include utilities, Wi-Fi, and standard amenities. Many houses feature hot tubs and games rooms. Additional experiences like cocktail classes, butlers, and private chefs can be added."
            }
          },
          {
            "@type": "Question",
            "name": "What is the deposit and payment schedule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bookings, payments and contracts are handled directly between guests and property owners. Each owner will have their own preferred payment methods and schedules, which you can discuss once you enquire."
            }
          },
          {
            "@type": "Question",
            "name": "Can I cancel or change my booking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cancellation policies vary by property. Many bookings are non-refundable within 8 weeks of arrival. We recommend travel insurance and contacting the team to discuss changes."
            }
          },
          {
            "@type": "Question",
            "name": "How many people can stay in a house?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our houses accommodate groups from 8 to 30+ guests. Each property listing shows maximum capacity, bedrooms, and bed configurations."
            }
          },
          {
            "@type": "Question",
            "name": "Are hen party houses suitable for other celebrations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our properties are suitable for birthdays, anniversaries, family reunions, and group celebrations, as well as weekend breaks and festive stays."
            }
          },
          {
            "@type": "Question",
            "name": "What about house rules and damage deposits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each property sets its own house rules and check-in arrangements. A refundable damage deposit is usually required, commonly £250 to £500."
            }
          },
          {
            "@type": "Question",
            "name": "Can you arrange activities and experiences?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer experiences such as cocktail masterclasses, life drawing, private chefs, and spa treatments. See the experiences page for options and pricing."
            }
          }
        ]
      }
    ]
  };

  const webPageSchema = type !== "default" && type !== "home_graph" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${data?.url || "/"}#webpage`,
    "url": `${baseUrl}${data?.url || "/"}`,
    "name": data?.name || `Group Escape Houses | Large Group Accommodation UK`,
    "description": data?.description || "Discover large group accommodation and escape houses across the UK. Sleeps 10 to 30 guests. Book direct with property owners.",
    "isPartOf": `${baseUrl}/#website`,
    "about": `${baseUrl}/#organization`
  } : null;

  const breadcrumbSchema = (type !== "home" && data?.breadcrumbs) ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.breadcrumbs.map((crumb: any, index: number) => {
      const isLastItem = index === data.breadcrumbs.length - 1;
      const item: any = {
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name
      };

      if (!isLastItem) {
        item.item = crumb.url.startsWith("http") ? crumb.url : `${baseUrl}${crumb.url.startsWith("/") ? "" : "/"}${crumb.url}`;
      }

      return item;
    })
  } : null;

  const itemListSchema = (type === "itemList" && data?.items) ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data.items.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": item.url ? (item.url.startsWith("http") ? item.url : `${baseUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`) : `${baseUrl}/properties/${item.slug}`
    }))
  } : null;

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
        "url": `${baseUrl}/icon-512x512.png`
      }
    }
  } : null;

  return (
    <>
      {/* Site-wide schema */}
      {includeSiteWide && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}

      {/* Individual schema types */}
      {type === "website" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      {type === "home_graph" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraphSchema) }}
        />
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
