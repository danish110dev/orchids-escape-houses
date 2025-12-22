import Script from "next/script";

interface StructuredDataProps {
  type?: "home" | "property" | "experience" | "destination" | "faq" | "blog" | "listing" | "breadcrumb";
  data?: any;
}

export default function StructuredData({ type = "home", data }: StructuredDataProps) {
  const baseUrl = "https://groupescapehouses.co.uk";
  
  // Organization Schema - PLATFORM LEVEL
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Group Escape Houses",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Online UK group accommodation listings and enquiry platform for luxury party houses and large group cottages.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11a North Street",
      "addressLocality": "Brighton",
      "addressRegion": "East Sussex",
      "postalCode": "BN41 1DH",
      "addressCountry": "UK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-1273-569301",
      "contactType": "Customer Service",
      "email": "hello@groupescapehouses.co.uk",
      "areaServed": "GB",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.instagram.com/groupescapehouses/",
      "https://www.tiktok.com/@groupescapehouses",
      "https://www.pinterest.com/groupescapehouses"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Group Escape Houses",
    "url": baseUrl,
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/properties?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema - THE PLATFORM SERVICE
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Group Accommodation Listings and Enquiry Platform",
    "description": "Online platform for browsing and enquiring about luxury group accommodation properties across the UK. Book direct with owners.",
    "provider": { "@id": `${baseUrl}/#organization` },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Group Accommodation Directory",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Party Houses",
          "url": `${baseUrl}/house-styles/party-houses`
        },
        {
          "@type": "OfferCatalog",
          "name": "Large Cottages",
          "url": `${baseUrl}/house-styles/large-cottages`
        }
      ]
    }
  };

  // CollectionPage Schema - For Listings/Categories
  const collectionPageSchema = (type === "listing" || type === "destination" || type === "home") ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data?.title || "Large Group Accommodation UK",
    "description": data?.description || "A directory of luxury group houses and celebration venues across the UK.",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": data?.items?.length || 0,
      "itemListElement": data?.items?.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}${item.url || `/properties/${item.slug}`}`,
        "name": item.name || item.title
      })) || []
    }
  } : null;

  // LodgingBusiness Schema - FOR PROPERTY PAGES
  const lodgingBusinessSchema = (type === "property" && data) ? {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "name": data.name || data.title,
    "description": data.description,
    "url": `${baseUrl}/properties/${data.slug}`,
    "image": data.image || data.heroImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.address?.city || data.location,
      "addressRegion": data.address?.region,
      "addressCountry": "UK"
    },
    "numberOfRooms": data.bedrooms,
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": data.sleeps || data.sleepsMax
    },
    "additionalProperty": data.features?.map((f: string) => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": f
    })),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Property Manager",
      "url": `${baseUrl}/properties/${data.slug}#enquiry`
    }
  } : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = (type === "breadcrumb" || data?.breadcrumbs) ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": (data?.breadcrumbs || []).map((crumb: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith("http") ? crumb.url : `${baseUrl}${crumb.url}`
    }))
  } : null;

  // FAQPage Schema
  const faqSchema = (type === "faq" || data?.faqs) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (data?.faqs || []).map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Blog Article Schema
  const articleSchema = type === "blog" && data ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.headline,
    "description": data.description,
    "image": data.image,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "author": {
      "@type": "Organization",
      "name": "Group Escape Houses"
    },
    "publisher": { "@id": `${baseUrl}/#organization` },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${data.slug}`
    }
  } : null;

  return (
    <>
      {/* Global Schemas - Only on Homepage to avoid duplication if layout also has them */}
      {/* NOTE: If type is 'home', we render the core platform schemas */}
      {type === "home" && (
        <>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Script
            id="service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          />
        </>
      )}

      {/* Page Specific Schemas */}
      {collectionPageSchema && (
        <Script
          id="collection-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        />
      )}

      {lodgingBusinessSchema && (
        <Script
          id="lodging-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema) }}
        />
      )}

      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {articleSchema && (
        <Script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}
