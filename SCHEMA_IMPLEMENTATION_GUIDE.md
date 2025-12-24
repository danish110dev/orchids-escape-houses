# JSON-LD Implementation Guide - Group Escape Houses

## Overview

This guide covers the implementation of JSON-LD structured data schemas across the Group Escape Houses website for Technical SEO compliance and Google Rich Results eligibility.

**Status:** Ready for Production
**Last Updated:** December 25, 2025

---

## Files Created/Modified

### 1. Core Schema Library
**File:** `src/lib/schema.ts` (NEW)
**Purpose:** Reusable schema generation functions
**Functions:**
- `organizationSchema()` - Sitewide organization info
- `websiteSchema()` - Sitewide website info
- `homePageSchema()` - Homepage specific
- `aboutPageSchema()` - About page
- `contactPageSchema()` - Contact page
- `collectionPageSchema()` - Collection pages (properties, destinations, categories)
- `itemListSchema()` - For listing items
- `vacationRentalSchema()` - Property detail pages
- `breadcrumbSchema()` - Breadcrumb navigation
- `serviceSchema()` - Experience/service pages
- `blogPostingSchema()` - Blog articles
- `combineSchemas()` - Utility to combine multiple schemas

### 2. Schema Renderer Component
**File:** `src/components/SchemaRenderer.tsx` (NEW)
**Purpose:** Render JSON-LD schemas in page head
**Usage:** Import and use on individual pages to inject schema tags

### 3. Global Layout Update
**File:** `src/app/layout.tsx` (MODIFIED)
**Changes:**
- Added import: `import { organizationSchema, websiteSchema } from "@/lib/schema"`
- Added two global `<Script>` tags in `<head>`:
  - Organization schema
  - Website schema
- These render once on all pages

### 4. Homepage Implementation
**File:** `src/app/(home)/page.tsx` (MODIFIED)
**Changes:**
- Added imports for `SchemaRenderer` and `homePageSchema`
- Added `<SchemaRenderer schemas={[homePageSchema()]} />` before closing `</div>`

### 5. Template Documentation
**File:** `IMPLEMENTATION_TEMPLATES.ts` (NEW)
**Contains:** Copy-paste ready examples for all page types

---

## Implementation by Page Type

### Step 1: About Page (`/our-story`)

1. Open your about page file (likely `src/app/our-story/page.tsx` or similar)
2. Add imports at top:
```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import { aboutPageSchema } from "@/lib/schema";
```

3. Before closing `</div>`, add:
```tsx
<SchemaRenderer schemas={[aboutPageSchema()]} />
```

### Step 2: Contact Page (`/contact`)

1. Open contact page file
2. Add imports:
```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import { contactPageSchema } from "@/lib/schema";
```

3. Before closing `</div>`, add:
```tsx
<SchemaRenderer schemas={[contactPageSchema()]} />
```

### Step 3: Properties Collection Page (`/properties`)

```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  collectionPageSchema,
  itemListSchema,
} from "@/lib/schema";

// Inside your component:
export default async function PropertiesPage() {
  // Fetch your properties
  const properties = await getProperties();

  // Build item list for schema
  const items = properties.map((prop, index) => ({
    position: index + 1,
    name: prop.name,
    url: `https://groupescapehouses.co.uk/properties/${prop.slug}`,
  }));

  const collectionSchema = collectionPageSchema({
    name: "Browse Group Holiday Houses - Group Escape Houses",
    description: "Browse luxury group holiday houses and cottages across the UK.",
    url: "https://groupescapehouses.co.uk/properties",
  });

  const itemsSchema = itemListSchema({
    items,
    id: "https://groupescapehouses.co.uk/properties",
    totalItems: properties.length,
  });

  return (
    <div>
      {/* Your content */}
      <SchemaRenderer schemas={[collectionSchema, itemsSchema]} />
    </div>
  );
}
```

### Step 4: Property Detail Page (`/properties/[slug]`)

This is CRITICAL - requires dynamic data fetching.

```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  vacationRentalSchema,
  breadcrumbSchema,
  type PropertyData,
} from "@/lib/schema";

// Fetch property data from your database
async function getProperty(slug: string): Promise<PropertyData> {
  // Your fetch logic here
  const response = await fetch(`https://api.example.com/properties/${slug}`);
  return response.json();
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  // Build schemas with actual property data
  const rentalSchema = vacationRentalSchema(property);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://groupescapehouses.co.uk" },
    { name: "Properties", url: "https://groupescapehouses.co.uk/properties" },
    { name: property.name, url: `https://groupescapehouses.co.uk/properties/${property.id}` },
  ]);

  return (
    <div>
      {/* Your property details */}
      <SchemaRenderer schemas={[rentalSchema, breadcrumbs]} />
    </div>
  );
}
```

**PropertyData structure must include:**
```typescript
{
  id: string;                    // Property ID/slug
  name: string;                  // Property name
  description: string;           // Full description
  images: string[];             // Array of image URLs
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  rooms: number;                // Number of bedrooms
  minGuests: number;            // Minimum occupancy
  maxGuests: number;            // Maximum occupancy
  amenities: string[];          // Array of amenity names
  petsAllowed?: boolean;        // Optional
  priceRange?: string;          // Only if shown on page
  rating?: number;              // Only if reviews exist
  reviewCount?: number;         // Only if reviews exist
  reviews?: Review[];           // Only if displayed
}
```

### Step 5: Destination Pages (`/destinations/[slug]`)

Same as properties collection, but with destination-specific data:

```tsx
const destination = await getDestination(slug);
const properties = await getDestinationProperties(slug);

const collectionSchema = collectionPageSchema({
  name: `Group Holiday Houses in ${destination.name}`,
  description: `Browse group holiday houses in ${destination.name}.`,
  url: `https://groupescapehouses.co.uk/destinations/${slug}`,
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://groupescapehouses.co.uk" },
  { name: "Destinations", url: "https://groupescapehouses.co.uk/destinations" },
  { name: destination.name, url: `https://groupescapehouses.co.uk/destinations/${slug}` },
]);

return (
  <div>
    {/* Content */}
    <SchemaRenderer schemas={[collectionSchema, itemsSchema, breadcrumbs]} />
  </div>
);
```

### Step 6: House Styles Pages (`/house-styles/[slug]`)

Same pattern as destinations - use `collectionPageSchema`, `itemListSchema`, and `breadcrumbSchema`.

### Step 7: Occasions Pages (`/occasions/[slug]`)

Same pattern as destinations.

### Step 8: Blog Pages (`/blog/[slug]`)

```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  blogPostingSchema,
  breadcrumbSchema,
  type BlogPostData,
} from "@/lib/schema";

async function getBlogPost(slug: string): Promise<BlogPostData> {
  const response = await fetch(`https://api.example.com/blog/${slug}`);
  return response.json();
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  const postSchema = blogPostingSchema({
    title: post.title,
    description: post.description,
    image: post.image,
    author: post.author || undefined,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    url: `https://groupescapehouses.co.uk/blog/${params.slug}`,
    body: post.body,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://groupescapehouses.co.uk" },
    { name: "Blog", url: "https://groupescapehouses.co.uk/blog" },
    { name: post.title, url: `https://groupescapehouses.co.uk/blog/${params.slug}` },
  ]);

  return (
    <div>
      {/* Blog content */}
      <SchemaRenderer schemas={[postSchema, breadcrumbs]} />
    </div>
  );
}
```

### Step 9: Experience Pages (`/experiences/[slug]`)

```tsx
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  serviceSchema,
  breadcrumbSchema,
  type ServiceData,
} from "@/lib/schema";

async function getExperience(slug: string): Promise<ServiceData> {
  const response = await fetch(`https://api.example.com/experiences/${slug}`);
  return response.json();
}

export default async function ExperiencePage({
  params,
}: {
  params: { slug: string };
}) {
  const experience = await getExperience(params.slug);

  const serviceSchemaObj = serviceSchema({
    name: experience.name,
    description: experience.description,
    image: experience.image,
    url: `https://groupescapehouses.co.uk/experiences/${params.slug}`,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://groupescapehouses.co.uk" },
    { name: "Experiences", url: "https://groupescapehouses.co.uk/experiences" },
    { name: experience.name, url: `https://groupescapehouses.co.uk/experiences/${params.slug}` },
  ]);

  return (
    <div>
      {/* Content */}
      <SchemaRenderer schemas={[serviceSchemaObj, breadcrumbs]} />
    </div>
  );
}
```

---

## Testing & Validation

### 1. Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter your URL
3. Click "Test URL"
4. Verify schemas appear without errors

### 2. Schema.org Validator
1. Go to: https://validator.schema.org/
2. Paste your page URL
3. Check for valid JSON-LD blocks

### 3. Local Testing
1. View page source (Ctrl+U)
2. Search for `<script type="application/ld+json">`
3. Verify JSON is valid and complete

---

## Checklist for Rollout

### Phase 1: Core (Already Done)
- [x] Create `src/lib/schema.ts`
- [x] Create `src/components/SchemaRenderer.tsx`
- [x] Update `src/app/layout.tsx` with global schemas
- [x] Update homepage with HomePage schema

### Phase 2: Static Pages (1 day)
- [ ] Add AboutPage schema to `/our-story`
- [ ] Add ContactPage schema to `/contact`
- [ ] Update metadata for these pages

### Phase 3: Collection Pages (2 days)
- [ ] Add CollectionPage + ItemList to `/properties`
- [ ] Add schemas to `/destinations`
- [ ] Add schemas to `/house-styles`
- [ ] Add schemas to `/occasions`

### Phase 4: Detail Pages (2-3 days)
- [ ] Add VacationRental + BreadcrumbList to `/properties/[slug]`
- [ ] Add schemas to `/destinations/[slug]`
- [ ] Add schemas to `/house-styles/[slug]`
- [ ] Add schemas to `/occasions/[slug]`

### Phase 5: Content Pages (2 days)
- [ ] Add BlogPosting + BreadcrumbList to `/blog/[slug]`
- [ ] Add Service + BreadcrumbList to `/experiences/[slug]`

### Phase 6: Testing (1 day)
- [ ] Test all pages with Google Rich Results Test
- [ ] Test with Schema.org Validator
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Search Console for indexing

---

## Key Technical Notes

### Global Schemas
Organization and WebSite schemas are injected globally in `layout.tsx` and appear on every page.

### Page-Specific Schemas
Each page adds its own HomePage/AboutPage/ContactPage/etc. schema via `<SchemaRenderer>`.

### Dynamic Data
For dynamic pages (`/properties/[slug]`, `/blog/[slug]`, etc.), **always fetch real data** from your database/API. Do NOT use placeholder values.

### VacationRental Critical Rules
1. Use `@type: VacationRental` (not just "House")
2. Include `containsPlace: Accommodation`
3. **NEVER** include `Offer`, `ReservationAction`, `BookingAction`, or `Payment`
4. Only include `amenityFeature` if amenities are displayed on page
5. Only include `aggregateRating` if reviews are shown
6. Only include `review` array if individual reviews are displayed

### Breadcrumbs
- Include on ALL pages except homepage
- Always include "Home" as first item
- Make sure breadcrumb path matches visible navigation

---

## Support & Troubleshooting

### Issue: "Unexpected token < in JSON at position 0"
**Cause:** HTML being sent to JSON parser
**Fix:** Check that `dangerouslySetInnerHTML` is using `JSON.stringify()` correctly

### Issue: Schema tags appearing as plain text
**Cause:** Using `<script>` with escaped content
**Fix:** Use `dangerouslySetInnerHTML` with `JSON.stringify()` as shown

### Issue: Duplicate schema IDs
**Cause:** Same schema rendered multiple times
**Fix:** Check that schemas are only added once per page

### Issue: Google Rich Results Test shows "No structured data found"
**Cause:** Schema not in `<head>` tag or malformed JSON
**Fix:** Verify `<Script>` is in layout's `<head>`, not in `<body>`

---

## Production Checklist

Before going live:

- [ ] All files created/modified are committed to git
- [ ] No console errors in browser DevTools
- [ ] All schemas validate at schema.org/validator
- [ ] Google Rich Results Test shows all schemas correctly
- [ ] Robots meta tag is `index, follow` (verified in layout.tsx)
- [ ] robots.txt allows crawling
- [ ] sitemap.xml is submitted to Google Search Console
- [ ] No `noindex` or `nofollow` tags on site

---

## Next Steps

1. Implement the page-level schemas following the step-by-step guide above
2. Test each page with Google Rich Results Test
3. Monitor Google Search Console for indexing
4. Submit sitemap: https://search.google.com/search-console

**Estimated Timeline:** 5-7 days for full implementation and testing

---

**Questions?** Review the SCHEMA_TEMPLATES.md and IMPLEMENTATION_TEMPLATES.ts files for detailed examples.
