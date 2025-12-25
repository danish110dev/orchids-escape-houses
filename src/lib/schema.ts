/**
 * JSON-LD Schema Helper Functions
 * Group Escape Houses - Technical SEO Implementation
 * 
 * All schemas are compliant with:
 * - schema.org specification
 * - Google Rich Results requirements
 * - Platform-only business model (no booking/payment language)
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PropertyData {
  id: string;
  name: string;
  description: string;
  images: string[];
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  rooms: number;
  minGuests: number;
  maxGuests: number;
  amenities: string[];
  petsAllowed?: boolean;
  priceRange?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface BlogPostData {
  title: string;
  description: string;
  image: string;
  author?: string;
  datePublished: string;
  dateModified: string;
  url: string;
  body?: string;
}

export interface ServiceData {
  name: string;
  description: string;
  image?: string;
  url: string;
}

export interface ListItemData {
  position: number;
  name: string;
  url: string;
}

// ============================================================================
// 1. ORGANIZATION SCHEMA (Sitewide)
// ============================================================================

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://groupescapehouses.co.uk/#organization",
    "name": "Group Escape Houses",
    "url": "https://groupescapehouses.co.uk",
      "logo": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/stacked_logo-1760785640378.jpg",
    "description": "Advertising platform connecting guests with group holiday houses and cottages across the UK",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11a North Street",
      "addressLocality": "Brighton",
      "postalCode": "BN41 1DH",
      "addressCountry": "GB",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "telephone": "+441273569301",
      "email": "hello@groupescapehouses.co.uk",
    },
    "sameAs": ["https://www.instagram.com/groupescapehouses"],
  };
}

// ============================================================================
// 2. WEBSITE SCHEMA (Sitewide)
// ============================================================================

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://groupescapehouses.co.uk/#website",
    "name": "Group Escape Houses",
    "url": "https://groupescapehouses.co.uk",
    "publisher": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://groupescapehouses.co.uk/properties?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ============================================================================
// 3. HOMEPAGE SCHEMA
// ============================================================================

export function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomePage",
    "@id": "https://groupescapehouses.co.uk/#webpage",
    "name": "Group Escape Houses - Luxury Group Holiday Houses UK",
    "description": "Browse luxury group holiday houses, cottages, and villas across the UK. Hen party houses, wedding venues, corporate escapes, and group accommodation.",
    "url": "https://groupescapehouses.co.uk",
    "isPartOf": {
      "@id": "https://groupescapehouses.co.uk/#website",
    },
    "publisher": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "inLanguage": "en-GB",
  };
}

// ============================================================================
// 4. ABOUT PAGE SCHEMA
// ============================================================================

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://groupescapehouses.co.uk/our-story/#webpage",
    "name": "Our Story - About Group Escape Houses",
    "description": "Learn about Group Escape Houses, how we help property owners reach guests, and how we provide transparent, commission-free listings.",
    "url": "https://groupescapehouses.co.uk/our-story",
    "isPartOf": {
      "@id": "https://groupescapehouses.co.uk/#website",
    },
    "publisher": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "inLanguage": "en-GB",
  };
}

// ============================================================================
// 5. CONTACT PAGE SCHEMA
// ============================================================================

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://groupescapehouses.co.uk/contact/#webpage",
    "name": "Contact Group Escape Houses",
    "description": "Get in touch with Group Escape Houses. Fast response guaranteed. UK support team available.",
    "url": "https://groupescapehouses.co.uk/contact",
    "isPartOf": {
      "@id": "https://groupescapehouses.co.uk/#website",
    },
    "publisher": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "inLanguage": "en-GB",
  };
}

// ============================================================================
// 6. COLLECTION PAGE SCHEMA
// ============================================================================

export function collectionPageSchema(props: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${props.url}#webpage`,
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "isPartOf": {
      "@id": "https://groupescapehouses.co.uk/#website",
    },
    "publisher": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "inLanguage": "en-GB",
  };
}

// ============================================================================
// 7. ITEM LIST SCHEMA (For property listings, destinations, etc.)
// ============================================================================

export function itemListSchema(props: {
  items: ListItemData[];
  id: string;
  totalItems?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${props.id}#itemlist`,
    "itemListOrder": "UserRecommended",
    "numberOfItems": props.totalItems || props.items.length,
    "itemListElement": props.items.map((item) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "url": item.url,
    })),
  };
}

// ============================================================================
// 8. VACATION RENTAL SCHEMA (Property Detail Pages)
// ============================================================================

export function vacationRentalSchema(property: PropertyData) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `https://groupescapehouses.co.uk/properties/${property.id}/#property`,
    "name": property.name,
    "description": property.description,
    "url": `https://groupescapehouses.co.uk/properties/${property.id}`,
    "image": property.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address.street,
      "addressLocality": property.address.city,
      "postalCode": property.address.postcode,
      "addressCountry": "GB",
    },
    "containsPlace": {
      "@type": "Accommodation",
      "name": property.name,
      "accommodationType": "House",
    },
    "numberOfRooms": property.rooms,
    "occupancy": {
      "@type": "QuantitativeValue",
      "minValue": property.minGuests,
      "maxValue": property.maxGuests,
      "unitText": "guests",
    },
    "amenityFeature": property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
    })),
  };

  // Add geo coordinates if available
  if (property.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": property.geo.latitude,
      "longitude": property.geo.longitude,
    };
  }

  // Add pets allowed if specified
  if (property.petsAllowed !== undefined) {
    schema.petsAllowed = property.petsAllowed;
  }

  // Add price range only if displayed on page
  if (property.priceRange) {
    schema.priceRange = property.priceRange;
  }

  // Add aggregate rating and reviews only if available
  if (property.rating && property.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": property.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": property.reviewCount,
    };
  }

  if (property.reviews && property.reviews.length > 0) {
    schema.review = property.reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author,
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
      },
      "reviewBody": review.text,
      "datePublished": review.date,
    }));
  }

  return schema;
}

// ============================================================================
// 9. BREADCRUMB SCHEMA
// ============================================================================

export function breadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${breadcrumbs[breadcrumbs.length - 1]?.url || 'https://groupescapehouses.co.uk'}#breadcrumb`,
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url,
    })),
  };
}

// ============================================================================
// 10. SERVICE SCHEMA (Experiences, Treatments, Activities)
// ============================================================================

export function serviceSchema(service: ServiceData) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.url}#service`,
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@id": "https://groupescapehouses.co.uk/#organization",
    },
    "areaServed": {
      "@type": "Country",
      "name": "GB",
    },
  };

  if (service.image) {
    schema.image = service.image;
  }

  return schema;
}

// ============================================================================
// 11. BLOG POSTING SCHEMA
// ============================================================================

export function blogPostingSchema(post: BlogPostData) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${post.url}#article`,
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": post.author || "Group Escape Houses",
      "url": "https://groupescapehouses.co.uk",
    },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "url": post.url,
    "isPartOf": {
      "@id": "https://groupescapehouses.co.uk/#website",
    },
  };

  if (post.body) {
    schema.articleBody = post.body;
  }

  return schema;
}

// ============================================================================
// 12. UTILITY: Convert schema to JSON-LD string
// ============================================================================

export function schemaToString(schema: any): string {
  return JSON.stringify(schema);
}

// ============================================================================
// 13. UTILITY: Create multiple schemas for single page
// ============================================================================

export function combineSchemas(...schemas: any[]): string {
  return schemas.map((schema) => JSON.stringify(schema)).join("\n");
}
