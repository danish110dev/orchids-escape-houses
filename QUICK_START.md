# Quick Start Guide - JSON-LD Implementation

## What's Done ✅

Your site now has:
- `src/lib/schema.ts` - All schema functions
- `src/components/SchemaRenderer.tsx` - Schema renderer component  
- Global schemas on every page (Organization, WebSite)
- HomePage schema active

**Test it now:** https://search.google.com/test/rich-results → Enter your URL

---

## Next 3 Steps

### Step 1: About Page (5 min)

```tsx
// File: src/app/our-story/page.tsx (or similar)

import { SchemaRenderer } from "@/components/SchemaRenderer";
import { aboutPageSchema } from "@/lib/schema";

export default function OurStoryPage() {
  return (
    <div>
      {/* Your content */}
      
      <SchemaRenderer schemas={[aboutPageSchema()]} />
    </div>
  );
}
```

### Step 2: Contact Page (5 min)

```tsx
// File: src/app/contact/page.tsx

import { SchemaRenderer } from "@/components/SchemaRenderer";
import { contactPageSchema } from "@/lib/schema";

export default function ContactPage() {
  return (
    <div>
      {/* Your content */}
      
      <SchemaRenderer schemas={[contactPageSchema()]} />
    </div>
  );
}
```

### Step 3: Properties Page (20 min)

Copy this pattern:

```tsx
// File: src/app/properties/page.tsx

import { SchemaRenderer } from "@/components/SchemaRenderer";
import { collectionPageSchema, itemListSchema } from "@/lib/schema";

export default async function PropertiesPage() {
  // Fetch your properties
  const properties = await getPropertiesFromDB();

  // Build item list
  const items = properties.map((prop, idx) => ({
    position: idx + 1,
    name: prop.name,
    url: `https://groupescapehouses.co.uk/properties/${prop.slug}`,
  }));

  // Create schemas
  const collectionSchema = collectionPageSchema({
    name: "Browse Group Holiday Houses",
    description: "Luxury group accommodation across the UK",
    url: "https://groupescapehouses.co.uk/properties",
  });

  const itemsSchema = itemListSchema({
    items,
    id: "https://groupescapehouses.co.uk/properties",
    totalItems: properties.length,
  });

  return (
    <div>
      {/* Your properties grid */}
      
      <SchemaRenderer schemas={[collectionSchema, itemsSchema]} />
    </div>
  );
}
```

---

## Most Important: Property Detail Page

This is **CRITICAL** for Google rankings.

```tsx
// File: src/app/properties/[slug]/page.tsx

import { vacationRentalSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaRenderer } from "@/components/SchemaRenderer";

export default async function PropertyPage({ params }) {
  // Fetch property from database
  const property = await getPropertyBySlug(params.slug);

  // Create schemas (MUST use real data from DB!)
  const rentalSchema = vacationRentalSchema(property);
  
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://groupescapehouses.co.uk" },
    { name: "Properties", url: "https://groupescapehouses.co.uk/properties" },
    { name: property.name, url: `https://groupescapehouses.co.uk/properties/${params.slug}` },
  ]);

  return (
    <div>
      {/* Your property details */}
      
      <SchemaRenderer schemas={[rentalSchema, breadcrumbs]} />
    </div>
  );
}
```

**Property data must include:**
```typescript
{
  id: string;
  name: string;
  description: string;
  images: string[];
  address: { street, city, postcode };
  rooms: number;
  minGuests: number;
  maxGuests: number;
  amenities: string[];
  petsAllowed?: boolean;
  priceRange?: string; // Only if shown on page
  rating?: number;     // Only if reviews exist
  reviewCount?: number;
  reviews?: Review[];  // Only if displayed
}
```

---

## Testing

For each page you update:

1. **Google Test**: https://search.google.com/test/rich-results
   - Paste your page URL
   - Should show schemas detected
   - No errors

2. **View Source**: Ctrl+U
   - Search for `application/ld+json`
   - Verify valid JSON

3. **Monitor**: Google Search Console
   - Check Enhancements > Rich Results
   - Monitor for errors

---

## Critical Rules ⚠️

```
❌ DO NOT:
- Add Offer with price
- Add ReservationAction or BookingAction  
- Add Payment or Checkout
- Hardcode property names
- Use placeholder data
- Say GEH handles bookings

✅ DO:
- Use real data from DB/API
- Include all visible information
- Use https:// URLs only
- Add breadcrumbs on all pages (except home)
- Test with Google before going live
```

---

## Full Documentation

When you need details:
- `SCHEMA_TEMPLATES.md` - All schema types
- `IMPLEMENTATION_GUIDE.md` - Step-by-step
- `IMPLEMENTATION_TEMPLATES.ts` - Copy-paste code
- `IMPLEMENTATION_CHECKLIST.md` - Full checklist
- `EXAMPLE_PROPERTIES_PAGE.tsx` - Working example
- `EXAMPLE_PROPERTY_DETAIL_PAGE.tsx` - Working example

---

## Timeline

- **Today**: Add About + Contact + Properties pages (30 min)
- **Today/Tomorrow**: Add Property Detail page (20 min) ⭐ CRITICAL
- **Next 2 days**: Add remaining pages (blog, experiences, etc.)
- **Final day**: Test everything with Google

---

## Done!

```bash
git add -A
git commit -m "Add JSON-LD schemas for SEO"
git push
```

Then test with Google Rich Results Test and monitor Search Console for schema detection.

🎉 Your site is now ready for Google's rich snippets!

---

**Need help?** Check `IMPLEMENTATION_SUMMARY.md` for detailed guide.
