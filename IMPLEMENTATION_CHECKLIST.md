# JSON-LD Implementation Checklist

## 📦 Deliverables Created

### Code Files (Ready to Deploy)
- [x] `src/lib/schema.ts` - 11 schema generator functions
- [x] `src/components/SchemaRenderer.tsx` - Schema rendering component
- [x] `src/app/layout.tsx` - Updated with global schemas
- [x] `src/app/(home)/page.tsx` - Updated with HomePage schema

### Documentation Files
- [x] `SCHEMA_TEMPLATES.md` - Complete schema reference
- [x] `SCHEMA_IMPLEMENTATION_GUIDE.md` - Step-by-step guide
- [x] `IMPLEMENTATION_TEMPLATES.ts` - 7 copy-paste templates
- [x] `EXAMPLE_PROPERTIES_PAGE.tsx` - Working properties collection example
- [x] `EXAMPLE_PROPERTY_DETAIL_PAGE.tsx` - Working property detail example
- [x] `IMPLEMENTATION_SUMMARY.md` - Quick summary

---

## 🚀 Phase 1: Already Complete

### Homepage ✅
```
Status: LIVE
Schema: HomePage + Organization + WebSite
Testing: Visit https://groupescapehouses.co.uk
```

**Test with Google:**
1. https://search.google.com/test/rich-results
2. Enter: https://groupescapehouses.co.uk
3. Should show 3 schemas detected

---

## 📋 Phase 2: Static Pages (1 Day)

### About Page
- [ ] Open: `src/app/our-story/page.tsx` (or similar path)
- [ ] Add imports:
  ```tsx
  import { SchemaRenderer } from "@/components/SchemaRenderer";
  import { aboutPageSchema } from "@/lib/schema";
  ```
- [ ] Add before closing `</div>`:
  ```tsx
  <SchemaRenderer schemas={[aboutPageSchema()]} />
  ```
- [ ] Test with Google Rich Results Test
- [ ] Verify in page source: `<script type="application/ld+json">`

### Contact Page
- [ ] Open: `src/app/contact/page.tsx`
- [ ] Add imports:
  ```tsx
  import { SchemaRenderer } from "@/components/SchemaRenderer";
  import { contactPageSchema } from "@/lib/schema";
  ```
- [ ] Add schema renderer
- [ ] Test

---

## 📋 Phase 3: Collection Pages (2-3 Days)

### Properties Collection Page
- [ ] Open: `src/app/properties/page.tsx`
- [ ] Copy pattern from `EXAMPLE_PROPERTIES_PAGE.tsx`
- [ ] Key steps:
  - [ ] Import: `collectionPageSchema`, `itemListSchema`, `SchemaRenderer`
  - [ ] Fetch property list from DB/API
  - [ ] Build items array with position, name, URL
  - [ ] Generate `collectionSchema`
  - [ ] Generate `itemsSchema`
  - [ ] Add `<SchemaRenderer schemas={[collectionSchema, itemsSchema]} />`
- [ ] Test

### Destinations Collection Pages
- [ ] Open: `src/app/destinations/[slug]/page.tsx`
- [ ] Same pattern as properties
- [ ] Fetch destination-specific data
- [ ] Generate schemas with destination name
- [ ] Add BreadcrumbList schema
- [ ] Test

### House Styles Category Pages
- [ ] Open: `src/app/house-styles/[slug]/page.tsx`
- [ ] Same pattern as destinations
- [ ] Test

### Occasions Category Pages
- [ ] Open: `src/app/occasions/[slug]/page.tsx`
- [ ] Same pattern
- [ ] Test

---

## 📋 Phase 4: Property Detail Pages (2-3 Days) ⭐ CRITICAL

### Property Detail Page (HIGHEST PRIORITY)
- [ ] Open: `src/app/properties/[slug]/page.tsx`
- [ ] Copy pattern from `EXAMPLE_PROPERTY_DETAIL_PAGE.tsx`
- [ ] Key steps:
  - [ ] Import: `vacationRentalSchema`, `breadcrumbSchema`, `SchemaRenderer`
  - [ ] Fetch property data by slug from DB/API
  - [ ] Ensure property data matches `PropertyData` interface:
    ```typescript
    {
      id: string;
      name: string;
      description: string;
      images: string[];
      address: { street, city, postcode };
      geo?: { latitude, longitude };
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
    ```
  - [ ] Generate `vacationRentalSchema(property)`
  - [ ] Generate `breadcrumbSchema([...])`
  - [ ] Add `<SchemaRenderer schemas={[rentalSchema, breadcrumbs]} />`
- [ ] **CRITICAL:** Test with Google Rich Results Test
  - Ensure VacationRental schema is valid
  - Check for any schema violations

### Destination Detail Pages
- [ ] Open: `src/app/destinations/[slug]/page.tsx`
- [ ] Add VacationRental for each property shown
- [ ] Add BreadcrumbList
- [ ] Test

### House Style Detail Pages
- [ ] Same as destination detail

### Occasion Detail Pages
- [ ] Same as destination detail

---

## 📋 Phase 5: Content Pages (2 Days)

### Blog Posts
- [ ] Open: `src/app/blog/[slug]/page.tsx`
- [ ] Import: `blogPostingSchema`, `breadcrumbSchema`, `SchemaRenderer`
- [ ] Fetch blog post data (must include datePublished, dateModified)
- [ ] Generate schemas:
  ```tsx
  const postSchema = blogPostingSchema({
    title: post.title,
    description: post.description,
    image: post.image,
    author: post.author,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    url: `https://groupescapehouses.co.uk/blog/${slug}`,
    body: post.body,
  });
  ```
- [ ] Add breadcrumbs
- [ ] Test

### Experience/Service Pages
- [ ] Open: `src/app/experiences/[slug]/page.tsx`
- [ ] Import: `serviceSchema`, `breadcrumbSchema`, `SchemaRenderer`
- [ ] Generate Service schema
- [ ] Add breadcrumbs
- [ ] Test

---

## 🧪 Phase 6: Testing & Validation (1 Day)

### For Each Page Type

- [ ] **Google Rich Results Test**
  - URL: https://search.google.com/test/rich-results
  - Check: All schemas detected
  - Check: No errors or warnings
  - Check: Rich results preview shown

- [ ] **Schema.org Validator**
  - URL: https://validator.schema.org/
  - Check: "Document has no errors"
  - Check: Correct schema types identified

- [ ] **Browser DevTools**
  - View page source (Ctrl+U)
  - Search: `<script type="application/ld+json">`
  - Verify: Valid JSON output
  - Verify: No escaping issues

- [ ] **Mobile Test**
  - Test on mobile device/emulator
  - Verify schemas render correctly

### Property Detail Pages (EXTRA SCRUTINY)

- [ ] VacationRental schema present
- [ ] containsPlace: Accommodation included
- [ ] NO Offer/ReservationAction/BookingAction
- [ ] Images array populated
- [ ] Address complete (street, city, postcode)
- [ ] Room count accurate
- [ ] Occupancy (min/max guests) correct
- [ ] Amenities list visible on page
- [ ] Reviews show if displayed
- [ ] Rating accurate if shown
- [ ] Price range matches page display

---

## 🔍 Quality Checks

### Before Deploying Each Page

- [ ] No hardcoded data in schema (all from DB/API)
- [ ] All URLs use `https://groupescapehouses.co.uk`
- [ ] No placeholder text like `[PROPERTY_NAME]`
- [ ] Schema IDs are unique per page
- [ ] SchemaRenderer imported correctly
- [ ] All required imports present
- [ ] TypeScript compiles without errors
- [ ] No console warnings or errors
- [ ] Images URLs are valid and accessible

### Business Compliance Check

- [ ] No `Offer` element with price
- [ ] No `ReservationAction` anywhere
- [ ] No `BookingAction` anywhere
- [ ] No `Payment` or `Checkout` references
- [ ] Language: "guests enquire and book directly"
- [ ] No implication GEH handles bookings
- [ ] Organization schema clear: "advertising platform"

---

## 📊 Testing Results Template

For each page tested, document:

```
Page: [URL]
Date: [Date]
Status: ✅ Pass / ❌ Fail

Google Rich Results Test:
- Schemas Detected: [List them]
- Errors: [Any errors?]
- Warnings: [Any warnings?]

Schema.org Validator:
- Result: [Pass/Fail]
- Issues: [Any issues?]

Notes:
[Any observations]
```

---

## 🚨 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Unexpected token < in JSON" | HTML in JSON | Use `JSON.stringify()` |
| Schema appears as plain text | Not in `<Script>` tag | Add `<Script type="application/ld+json">` |
| "No structured data found" | Schema not in `<head>` | Move `<Script>` from `<body>` to `<head>` |
| Duplicate schemas | Multiple renders | Check for multiple SchemaRenderer calls |
| Missing images | Empty array | Verify images array populated from DB |
| Bad ratings | Invalid rating value | Ensure rating is 0-5 |
| Reviews not showing | Missing review array | Only include if reviews displayed on page |

---

## 📈 Monitoring After Launch

### Week 1
- [ ] Check Google Search Console for errors
- [ ] Monitor schema detection in GSC
- [ ] Verify no validation errors
- [ ] Check Core Web Vitals

### Week 2-4
- [ ] Monitor ranking changes for target keywords
- [ ] Check rich snippet display in search results
- [ ] Monitor CTR changes
- [ ] Track traffic source changes

### Month 2-3
- [ ] Analyze impact on organic traffic
- [ ] Monitor booking inquiry changes
- [ ] Check for schema violations
- [ ] Optimize based on performance data

---

## ✅ Go-Live Checklist

Before deploying to production:

- [ ] All code committed to git
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] robots.txt allows crawling
- [ ] robots meta tag: `index, follow`
- [ ] No `noindex` on any page
- [ ] Sitemap.xml submitted to GSC
- [ ] Google Analytics configured
- [ ] Page load times acceptable
- [ ] Mobile testing complete
- [ ] Schema validation complete

---

## 📞 Support & Questions

### If Unsure About Implementation

1. Check: `IMPLEMENTATION_TEMPLATES.ts` - Copy-paste templates
2. Check: `EXAMPLE_PROPERTIES_PAGE.tsx` - Working properties page
3. Check: `EXAMPLE_PROPERTY_DETAIL_PAGE.tsx` - Working detail page
4. Check: `SCHEMA_IMPLEMENTATION_GUIDE.md` - Step-by-step guide

### Common Questions

**Q: Where do I put the schemas?**
A: At the end of your component, before closing `</div>`, add:
```tsx
<SchemaRenderer schemas={[schema1, schema2]} />
```

**Q: Do I need schemas on every page?**
A: No. Global schemas (Organization, WebSite) are on every page automatically. Page-specific schemas only on their pages.

**Q: What if my data is missing?**
A: Only include schema fields with actual data. Don't include empty arrays or null values.

**Q: How do I test?**
A: Use Google Rich Results Test: https://search.google.com/test/rich-results

---

## 📅 Timeline Estimate

- Phase 1 (Core): ✅ COMPLETE
- Phase 2 (Static Pages): 1 day
- Phase 3 (Collections): 2 days
- Phase 4 (Detail Pages): 2-3 days ⭐
- Phase 5 (Content): 2 days
- Phase 6 (Testing): 1 day

**Total: 3-4 days full implementation**

---

**Last Updated:** December 25, 2025
**Status:** Ready for Production 🚀
