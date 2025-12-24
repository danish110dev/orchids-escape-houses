# JSON-LD Schema Templates for Group Escape Houses
## Technical SEO Structured Data Implementation

---

## 1. SITEWIDE SCHEMAS (Every Page)

### 1.1 Organization Schema
**Use this on every page in the `<head>` tag**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://groupescapehouses.co.uk/#organization",
  "name": "Group Escape Houses",
  "url": "https://groupescapehouses.co.uk",
  "logo": "https://groupescapehouses.co.uk/logo.png",
  "description": "Advertising platform connecting guests with group holiday houses and cottages across the UK",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11a North Street",
    "addressLocality": "Brighton",
    "postalCode": "BN41 1DH",
    "addressCountry": "GB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "telephone": "+441273569301",
    "email": "hello@groupescapehouses.co.uk"
  },
  "sameAs": [
    "https://www.instagram.com/groupescapehouses"
  ]
}
```

---

### 1.2 WebSite Schema
**Use this on every page in the `<head>` tag**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://groupescapehouses.co.uk/#website",
  "name": "Group Escape Houses",
  "url": "https://groupescapehouses.co.uk",
  "publisher": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://groupescapehouses.co.uk/properties?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 1.3 WebPage Schema (Homepage)
**Use on `/` only**

```json
{
  "@context": "https://schema.org",
  "@type": "HomePage",
  "@id": "https://groupescapehouses.co.uk/#webpage",
  "name": "Group Escape Houses - Luxury Group Holiday Houses UK",
  "description": "Browse luxury group holiday houses, cottages, and villas across the UK. Hen party houses, wedding venues, corporate escapes, and group accommodation.",
  "url": "https://groupescapehouses.co.uk",
  "isPartOf": {
    "@id": "https://groupescapehouses.co.uk/#website"
  },
  "publisher": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "inLanguage": "en-GB"
}
```

---

### 1.4 WebPage Schema (About Page)
**Use on `/our-story` only**

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://groupescapehouses.co.uk/our-story/#webpage",
  "name": "Our Story - About Group Escape Houses",
  "description": "Learn about Group Escape Houses, how we help property owners reach guests, and how we provide transparent, commission-free listings.",
  "url": "https://groupescapehouses.co.uk/our-story",
  "isPartOf": {
    "@id": "https://groupescapehouses.co.uk/#website"
  },
  "publisher": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "inLanguage": "en-GB"
}
```

---

### 1.5 WebPage Schema (Contact Page)
**Use on `/contact` only**

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://groupescapehouses.co.uk/contact/#webpage",
  "name": "Contact Group Escape Houses",
  "description": "Get in touch with Group Escape Houses. Fast response guaranteed. UK support team available.",
  "url": "https://groupescapehouses.co.uk/contact",
  "isPartOf": {
    "@id": "https://groupescapehouses.co.uk/#website"
  },
  "publisher": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "inLanguage": "en-GB"
}
```

---

## 2. COLLECTION PAGES (Properties Browse, Destinations, Categories)

### 2.1 WebPage + ItemList Schema
**Use on `/properties`, `/destinations`, `/house-styles`, `/occasions`, etc.**

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://groupescapehouses.co.uk/properties/#webpage",
  "name": "Browse Group Holiday Houses - Group Escape Houses",
  "description": "Browse luxury group holiday houses and cottages across the UK. Filter by location, group size, price, and features.",
  "url": "https://groupescapehouses.co.uk/properties",
  "isPartOf": {
    "@id": "https://groupescapehouses.co.uk/#website"
  },
  "publisher": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "inLanguage": "en-GB"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://groupescapehouses.co.uk/properties/#itemlist",
  "itemListOrder": "UserRecommended",
  "numberOfItems": "[TOTAL_PROPERTY_COUNT]",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "[PROPERTY_NAME_1]",
      "url": "https://groupescapehouses.co.uk/properties/[property-slug-1]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[PROPERTY_NAME_2]",
      "url": "https://groupescapehouses.co.uk/properties/[property-slug-2]"
    }
  ]
}
```

---

## 3. PROPERTY DETAIL PAGES (Individual House Listings)

### 3.1 VacationRental + Accommodation Schema
**CRITICAL: Use on every property detail page (e.g., `/properties/[slug]`)**

```json
{
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "@id": "https://groupescapehouses.co.uk/properties/[property-slug]/#property",
  "name": "[PROPERTY_NAME]",
  "description": "[PROPERTY_DESCRIPTION - from your listing]",
  "url": "https://groupescapehouses.co.uk/properties/[property-slug]",
  "image": [
    "[IMAGE_URL_1]",
    "[IMAGE_URL_2]",
    "[IMAGE_URL_3]"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET_ADDRESS]",
    "addressLocality": "[TOWN/CITY]",
    "postalCode": "[POSTCODE]",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [LAT],
    "longitude": [LON]
  },
  "containsPlace": {
    "@type": "Accommodation",
    "name": "[PROPERTY_NAME]",
    "accommodationType": "House"
  },
  "numberOfRooms": [NUMBER_OF_ROOMS],
  "occupancy": {
    "@type": "QuantitativeValue",
    "minValue": [MIN_GUESTS],
    "maxValue": [MAX_GUESTS],
    "unitText": "guests"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Hot Tub"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Swimming Pool"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Games Room"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Pet Friendly"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi"
    }
  ],
  "petsAllowed": true,
  "priceRange": "[PRICE_RANGE_TEXT]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[AVERAGE_RATING]",
    "bestRating": 5,
    "worstRating": 1,
    "ratingCount": [TOTAL_REVIEWS]
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "[REVIEWER_NAME]"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "[RATING]"
      },
      "reviewBody": "[REVIEW_TEXT]",
      "datePublished": "[DATE_PUBLISHED]"
    }
  ]
}
```

**Notes for Property Detail Schema:**
- ✅ Include `VacationRental` as the main type (not `Accommodation` or `House`)
- ✅ Use `containsPlace` with `Accommodation` to indicate it's a vacation home
- ✅ Include `amenityFeature` for visible features ONLY
- ✅ Include `aggregateRating` and `review` ONLY if reviews are displayed
- ✅ Include `priceRange` ONLY if visible on page (e.g., "£500 - £1,200 per night")
- ❌ Do NOT include: `Reservation`, `Booking`, `Payment`, `BuyAction`, `OrderAction`
- ❌ Do NOT imply Group Escape Houses handles transactions

---

## 4. BREADCRUMB SCHEMA (All Pages Except Homepage)

### 4.1 BreadcrumbList Schema
**Use on all pages EXCEPT the homepage**

#### Example: Property Detail Page
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://groupescapehouses.co.uk/properties/[slug]/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://groupescapehouses.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Properties",
      "item": "https://groupescapehouses.co.uk/properties"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[PROPERTY_NAME]",
      "item": "https://groupescapehouses.co.uk/properties/[slug]"
    }
  ]
}
```

#### Example: Destination Page
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://groupescapehouses.co.uk/destinations/[slug]/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://groupescapehouses.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Destinations",
      "item": "https://groupescapehouses.co.uk/destinations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[DESTINATION_NAME]",
      "item": "https://groupescapehouses.co.uk/destinations/[slug]"
    }
  ]
}
```

#### Example: Category Page (House Styles, Occasions, etc.)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://groupescapehouses.co.uk/house-styles/[slug]/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://groupescapehouses.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "House Styles",
      "item": "https://groupescapehouses.co.uk/house-styles"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[STYLE_NAME]",
      "item": "https://groupescapehouses.co.uk/house-styles/[slug]"
    }
  ]
}
```

---

## 5. SERVICE/EXPERIENCE PAGES

### 5.1 Service Schema
**Use on `/experiences` and individual experience pages**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://groupescapehouses.co.uk/experiences/[slug]/#service",
  "name": "[SERVICE_NAME]",
  "description": "[SERVICE_DESCRIPTION]",
  "image": "[SERVICE_IMAGE_URL]",
  "url": "https://groupescapehouses.co.uk/experiences/[slug]",
  "provider": {
    "@id": "https://groupescapehouses.co.uk/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "GB"
  }
}
```

**Examples:**
- Hen Party Experiences
- Wedding Venues & Planning
- Corporate Team Building
- Hot Tub Treatments
- Private Chef Services
- Activity Packages

---

## 6. BLOG/ARTICLE PAGES

### 6.1 BlogPosting Schema
**Use on all blog posts (e.g., `/blog/[slug]`)**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://groupescapehouses.co.uk/blog/[slug]/#article",
  "headline": "[ARTICLE_HEADLINE]",
  "description": "[ARTICLE_EXCERPT/META_DESCRIPTION]",
  "image": "[ARTICLE_HERO_IMAGE_URL]",
  "author": {
    "@type": "Organization",
    "name": "Group Escape Houses",
    "url": "https://groupescapehouses.co.uk"
  },
  "datePublished": "[ISO_DATE_PUBLISHED]",
  "dateModified": "[ISO_DATE_MODIFIED]",
  "url": "https://groupescapehouses.co.uk/blog/[slug]",
  "articleBody": "[FULL_ARTICLE_TEXT_OR_SUMMARY]",
  "isPartOf": {
    "@id": "https://groupescapehouses.co.uk/#website"
  }
}
```

---

## 7. CRITICAL SEO SETTINGS TO VERIFY

### ✅ Check Your `src/app/layout.tsx`

Ensure these meta tags are present:

```tsx
export const metadata: Metadata = {
  title: "Group Escape Houses | Luxury UK Holiday Houses & Cottages",
  description: "Browse luxury group holiday houses, cottages & villas across the UK. Hen parties, weddings, corporate events & group getaways. Direct owner bookings.",
  robots: "index, follow",  // ✅ MUST BE THIS - not "noindex"
  googleBot: "index, follow",  // ✅ Ensure not "noindex"
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Group Escape Houses",
    description: "Luxury group holiday houses & cottages across the UK",
    url: "https://groupescapehouses.co.uk",
    siteName: "Group Escape Houses",
    type: "website",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk",
  },
};
```

### ✅ Check Your `public/robots.txt`

Should be:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://groupescapehouses.co.uk/sitemap.xml
```

---

## 8. IMPLEMENTATION CHECKLIST

### Phase 1: Core Sitewide (Week 1)
- [ ] Add Organization schema to layout.tsx (global)
- [ ] Add WebSite schema to layout.tsx (global)
- [ ] Add proper robots meta tag: `index, follow`
- [ ] Verify robots.txt allows indexing
- [ ] Create sitemap.xml for all pages
- [ ] Add canonical URLs to all pages

### Phase 2: Homepage & Core Pages (Week 1-2)
- [ ] Add HomePage schema to `/`
- [ ] Add AboutPage schema to `/our-story`
- [ ] Add ContactPage schema to `/contact`
- [ ] Add BreadcrumbList to non-homepage pages

### Phase 3: Property Listings (Week 2-3)
- [ ] Add VacationRental schema to all property detail pages
- [ ] Add ItemList to `/properties` and category pages
- [ ] Verify all property images are included
- [ ] Ensure reviews display correctly in schema

### Phase 4: Blog & Services (Week 3-4)
- [ ] Add BlogPosting to all blog posts
- [ ] Add Service schema to experience pages
- [ ] Add BreadcrumbList to blog pages

### Phase 5: Testing & Validation (Week 4)
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Schema.org Validator](https://validator.schema.org/)
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Search Console for indexing issues

---

## 9. CRITICAL REMINDERS

❌ **NEVER USE:**
- `Offer` with `price` (unless displayed on page)
- `PriceSpecification`
- `ReservationAction`
- `BookingAction`
- `Payment`
- `Order`
- Language suggesting Group Escape Houses handles bookings

✅ **ALWAYS USE:**
- `VacationRental` for property pages (not just "House")
- `containsPlace: Accommodation` pattern
- Clear business context: "advertising platform"
- Links to property owner contact info, not GEH booking

---

## 10. SCHEMA.ORG VALIDATION

Test all schemas at: https://validator.schema.org/

Expected valid output:
```
Document has no errors or warnings
[Schema types used]:
- Organization ✓
- WebSite ✓
- WebPage/HomePage/AboutPage/ContactPage ✓
- VacationRental ✓
- ItemList ✓
- BreadcrumbList ✓
- Service ✓
- BlogPosting ✓
```

---

**Version:** 1.0
**Last Updated:** December 25, 2025
**Status:** Ready for Implementation
