import Script from "next/script";

interface StructuredDataProps {
  type?: "home" | "property" | "experience" | "destination" | "faq" | "reviews";
  data?: any;
}

export default function StructuredData({ type = "home", data }: StructuredDataProps) {
  // Organization Schema - appears on all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Group Escape Houses",
    url: "https://groupescapehouses.co.uk",
    logo: "https://groupescapehouses.co.uk/logo.png",
    description: "Luxury hen party houses and group accommodation across the UK with hot tubs, pools, and games rooms. Perfect for celebrations, hen weekends, and special occasions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11a North Street",
      addressLocality: "Brighton",
      addressRegion: "East Sussex",
      postalCode: "BN41 1DH",
      addressCountry: "GB"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-XXXX-XXXXXX",
      email: "hello@groupescapehouses.co.uk",
      contactType: "Customer Service",
      areaServed: "GB",
      availableLanguage: "English"
    },
    sameAs: [
      "https://instagram.com/groupescapehouses",
      "https://facebook.com/groupescapehouses",
      "https://twitter.com/groupescapehouses",
      "https://tiktok.com/@groupescapehouses",
      "https://youtube.com/@groupescapehouses",
      "https://pinterest.com/groupescapehouses"
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://groupescapehouses.co.uk",
    name: "Group Escape Houses",
    image: "https://groupescapehouses.co.uk/logo.png",
    priceRange: "££-£££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11a North Street",
      addressLocality: "Brighton",
      addressRegion: "East Sussex",
      postalCode: "BN41 1DH",
      addressCountry: "GB"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.8225",
      longitude: "-0.1372"
    },
    telephone: "+44-XXXX-XXXXXX",
    email: "hello@groupescapehouses.co.uk",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3000",
      bestRating: "5",
      worstRating: "1"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a hen party house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Browse our properties, select your preferred house, and submit an enquiry with your dates and group size. Our UK team will respond within 24 hours with availability and a quote. You can also call us for instant assistance."
        }
      },
      {
        "@type": "Question",
        name: "What is included in the price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All our properties include utilities, Wi-Fi, and standard amenities. Most houses feature hot tubs, games rooms, and entertainment facilities. Additional experiences like cocktail classes, butlers, and private chefs can be added to your booking."
        }
      },
      {
        "@type": "Question",
        name: "What is the deposit and payment schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We require a deposit to secure your booking (typically 25-30%). The remaining balance is due 6-8 weeks before your stay. All payments are processed securely via Stripe."
        }
      },
      {
        "@type": "Question",
        name: "Can I cancel or change my booking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cancellation policies vary by property. Most bookings are non-refundable within 8 weeks of arrival. We recommend booking travel insurance. Contact our team to discuss any changes to your reservation."
        }
      },
      {
        "@type": "Question",
        name: "How many people can stay in a house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our houses accommodate groups from 8 to 30+ guests. Each property listing shows the maximum capacity, number of bedrooms, and bed configurations. Check the property details for exact sleeping arrangements."
        }
      },
      {
        "@type": "Question",
        name: "Are hen party houses suitable for other celebrations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! While we specialise in hen weekends, our properties are perfect for birthdays, anniversaries, family reunions, and any group celebration. Browse our experiences to find activities for your occasion."
        }
      },
      {
        "@type": "Question",
        name: "What about house rules and damage deposits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each property has specific house rules regarding noise, parties, and check-in times. A refundable damage deposit (typically £250-500) is required. Read our full terms and conditions for complete details."
        }
      },
      {
        "@type": "Question",
        name: "Can you arrange activities and experiences?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We offer cocktail masterclasses, butlers in the buff, life drawing, private chefs, spa treatments, and more. View our experiences page to see all available add-ons and pricing."
        }
      }
    ]
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Luxury Group Accommodation Rental",
    provider: {
      "@type": "Organization",
      name: "Group Escape Houses"
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Group Accommodation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Hen Party Houses",
            description: "Luxury accommodation perfect for hen party weekends with hot tubs, pools, and games rooms"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Party House Experiences",
            description: "Cocktail masterclasses, butlers, private chefs, spa treatments, and entertainment"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Large Group Accommodation",
            description: "Properties sleeping 8-30+ guests across the UK"
          }
        }
      ]
    }
  };

  // Website Schema
  const websiteSchema = {
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
  };

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* LocalBusiness Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Service Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* FAQ Schema - only on pages with FAQs */}
      {type === "home" || type === "faq" ? (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
    </>
  );
}