/**
 * COMPLETE WORKING EXAMPLE: Properties Collection Page
 * /src/app/properties/page.tsx
 * 
 * This is a production-ready implementation showing how to:
 * 1. Fetch property data
 * 2. Generate CollectionPage schema
 * 3. Generate ItemList schema
 * 4. Render schemas with SchemaRenderer
 */

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  collectionPageSchema,
  itemListSchema,
  type ListItemData,
} from "@/lib/schema";

// ============================================================================
// METADATA (SEO - Title, Description, OpenGraph)
// ============================================================================

export const metadata: Metadata = {
  title: "Browse Group Holiday Houses | UK Properties",
  description:
    "Browse luxury group holiday houses and cottages across the UK. Filter by location, group size, price, and features. Direct owner bookings.",
  openGraph: {
    title: "Browse Group Holiday Houses",
    description: "Luxury group accommodation across the UK",
    type: "website",
    url: "https://groupescapehouses.co.uk/properties",
    images: [
      {
        url: "https://groupescapehouses.co.uk/og-properties.jpg",
        width: 1200,
        height: 630,
        alt: "Group Holiday Houses",
      },
    ],
  },
};

// ============================================================================
// DATA FETCHING
// ============================================================================

/**
 * Fetch properties from your database/API
 * Replace with your actual data fetching logic
 */
async function getProperties() {
  try {
    // EXAMPLE 1: Fetch from internal API route
    // const response = await fetch(
    //   "https://groupescapehouses.co.uk/api/properties",
    //   { cache: "revalidate" } // ISR or use revalidate in page exports
    // );
    // return response.json();

    // EXAMPLE 2: Fetch from database (Drizzle example)
    // const properties = await db.query.properties.findMany({
    //   limit: 100,
    // });
    // return properties;

    // EXAMPLE 3: Static data for demo
    return [
      {
        id: "property-001",
        slug: "the-manor-brighton",
        name: "The Manor - Brighton",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        location: "Brighton, East Sussex",
      },
      {
        id: "property-002",
        slug: "seaside-cottage-cornwall",
        name: "Seaside Cottage - Cornwall",
        image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f",
        location: "Penzance, Cornwall",
      },
      {
        id: "property-003",
        slug: "lake-house-cotswolds",
        name: "Lake House - Cotswolds",
        image: "https://images.unsplash.com/photo-1577005228a08adc61a0b09ca4fac5a0",
        location: "Cotswolds, Gloucestershire",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export default async function PropertiesPage() {
  const properties = await getProperties();

  // ========================================================================
  // BUILD SCHEMA DATA
  // ========================================================================

  // Create ItemList for schema
  const itemListItems: ListItemData[] = properties.map((prop, index) => ({
    position: index + 1,
    name: prop.name,
    url: `https://groupescapehouses.co.uk/properties/${prop.slug}`,
  }));

  // Create CollectionPage schema
  const collectionSchema = collectionPageSchema({
    name: "Browse Group Holiday Houses - Group Escape Houses",
    description:
      "Browse luxury group holiday houses and cottages across the UK. Filter by location, group size, price, and features.",
    url: "https://groupescapehouses.co.uk/properties",
  });

  // Create ItemList schema
  const itemsSchema = itemListSchema({
    items: itemListItems,
    id: "https://groupescapehouses.co.uk/properties",
    totalItems: properties.length,
  });

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Browse Group Holiday Houses
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Discover luxury group accommodation across the UK. From hen parties
              to corporate escapes, find the perfect house for your occasion.
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-200">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold text-slate-900 mb-2">
                        {property.name}
                      </h2>
                      <p className="text-sm text-slate-600 mb-4">
                        {property.location}
                      </p>
                      <div className="flex items-center text-accent-pink font-medium">
                        View Property
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">
                  No properties available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent-pink rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Browse & Filter
                </h3>
                <p className="text-slate-600">
                  Filter by location, group size, price, and amenities to find
                  your perfect match.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent-pink rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Check Details
                </h3>
                <p className="text-slate-600">
                  View detailed listings, photos, amenities, and guest reviews.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent-pink rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Contact Owner
                </h3>
                <p className="text-slate-600">
                  Reach out directly to the property owner to discuss your
                  booking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ====================================================================
          JSON-LD SCHEMAS
          These render in the page <head> and are parsed by Google
          ==================================================================== */}
      <SchemaRenderer schemas={[collectionSchema, itemsSchema]} />
    </div>
  );
}

// ============================================================================
// OPTIONAL: Enable ISR (Incremental Static Regeneration)
// ============================================================================
// export const revalidate = 3600; // Regenerate page every hour
