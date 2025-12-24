import BreadcrumbSchema from "./BreadcrumbSchema";

interface StructuredDataProps {
  type?: "home" | "property" | "experience" | "destination" | "faq" | "blog" | "listing" | "breadcrumb";
  data?: any;
}

export default function StructuredData({ type = "home", data }: StructuredDataProps) {
  const baseUrl = "https://www.groupescapehouses.co.uk";
  
    // Organization Schema - PLATFORM LEVEL
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Group Escape Houses",
      "url": `${baseUrl}/`,
      "description": "Group Escape Houses lists large group houses and cottages across the UK. Guests enquire and book directly with property owners, with no commission.",
      "telephone": "01273 569301",
      "email": "hello@groupescapehouses.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11a North Street",
        "addressLocality": "Brighton",
        "postalCode": "BN41 1DH",
        "addressCountry": "GB"
      },
      "sameAs": [
        "https://www.instagram.com/groupescapehouses/"
      ]
    };
  
    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": `${baseUrl}/`,
      "name": "Group Escape Houses",
      "publisher": { "@id": `${baseUrl}/#organization` }
    };

    // HomePage Schema
    const homePageSchema = {
      "@context": "https://schema.org",
      "@type": "HomePage",
      "@id": `${baseUrl}/#webpage`,
      "url": `${baseUrl}/`,
      "name": "Large Group Accommodation Across the UK",
      "isPartOf": { "@id": `${baseUrl}/#website` },
      "about": { "@id": `${baseUrl}/#organization` }
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
  const collectionPageSchema = (type === "listing" || type === "destination") ? {
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
    "itemListElement": (data?.breadcrumbs || []).map((crumb: any, index: number) => {
      const crumbUrl = crumb.url || crumb.item || "";
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumbUrl.startsWith("http") ? crumbUrl : `${baseUrl}${crumbUrl.startsWith("/") ? "" : "/"}${crumbUrl}`
      };
    })
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

  // Experience Schema
  const experienceSchema = type === "experience" && data ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.description,
    "provider": { "@id": `${baseUrl}/#organization` },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "image": data.image
  } : null;

  return (
    <>
      {/* Home Page Specific Schemas */}
      {type === "home" && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          />
        </>
      )}

      {/* Page Specific Schemas */}
      {collectionPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        />
      )}

      {lodgingBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema) }}
        />
      )}

      {experienceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceSchema) }}
        />
      )}

      {(type === "breadcrumb" || data?.breadcrumbs) && (
        <BreadcrumbSchema items={data?.breadcrumbs || []} />
      )}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
