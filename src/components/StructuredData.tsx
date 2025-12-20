import Script from "next/script";

interface StructuredDataProps {
  type?: "home" | "property" | "experience" | "destination" | "faq" | "blog" | "listing";
  data?: any;
}

export default function StructuredData({ type = "home", data }: StructuredDataProps) {
  // Organization Schema - HOMEPAGE ONLY
  const organizationSchema = type === "home" ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Group Escape Houses",
    url: "https://groupescapehouses.co.uk",
    logo: "https://groupescapehouses.co.uk/logo.png",
    description: "Online UK group accommodation listings and enquiry platform for luxury party houses, hen parties, and celebrations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11a North Street",
      addressLocality: "Brighton",
      addressRegion: "East Sussex",
      postalCode: "BN41 1DH",
      addressCountry: "UK"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-1273-569301",
      contactType: "Customer Service"
    }
  } : null;

  // Website Schema - HOMEPAGE ONLY
  const websiteSchema = type === "home" ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Group Escape Houses",
    url: "https://groupescapehouses.co.uk",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://groupescapehouses.co.uk/properties?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  } : null;

  // Service Schema - HOMEPAGE ONLY
  const serviceSchema = type === "home" ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Group Accommodation Listings and Enquiry Platform",
    description: "Online platform for browsing and enquiring about luxury group accommodation properties across the UK",
    provider: {
      "@type": "Organization",
      name: "Group Escape Houses",
      url: "https://groupescapehouses.co.uk"
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom"
    }
  } : null;

  // ItemList Schema - LISTING AND DESTINATION PAGES ONLY
  const itemListSchema = (type === "listing" || type === "destination") ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data?.items?.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url
    })) || []
  } : null;

  // FAQPage Schema - ONLY ON PAGES WITH VISIBLE FAQs
  const faqSchema = type === "faq" && data?.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq: any) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  // Article Schema - BLOG POSTS ONLY
  const articleSchema = type === "blog" && data ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      "@type": "Organization",
      name: "Group Escape Houses"
    },
    publisher: {
      "@type": "Organization",
      name: "Group Escape Houses",
      url: "https://groupescapehouses.co.uk"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url
    }
  } : null;

  // Accommodation/LodgingBusiness Schema - INDIVIDUAL PROPERTY PAGES ONLY
  const accommodationSchema = type === "property" && data ? {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: data.name,
    url: data.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address?.street,
      addressLocality: data.address?.city,
      addressRegion: data.address?.region,
      postalCode: data.address?.postalCode,
      addressCountry: "UK"
    },
    image: data.image,
    description: data.description,
    telephone: data.telephone,
    priceRange: data.priceRange
  } : null;

  return (
    <>
      {/* Organization Schema - HOMEPAGE ONLY */}
      {organizationSchema && (
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      )}

      {/* Website Schema - HOMEPAGE ONLY */}
      {websiteSchema && (
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}

      {/* Service Schema - HOMEPAGE ONLY */}
      {serviceSchema && (
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}

      {/* ItemList Schema - LISTING AND DESTINATION PAGES ONLY */}
      {itemListSchema && (
        <Script
          id="itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      {/* FAQPage Schema - ONLY ON PAGES WITH VISIBLE FAQs */}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Article Schema - BLOG POSTS ONLY */}
      {articleSchema && (
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* Accommodation Schema - INDIVIDUAL PROPERTY PAGES ONLY */}
      {accommodationSchema && (
        <Script
          id="accommodation-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(accommodationSchema) }}
        />
      )}
    </>
  );
}