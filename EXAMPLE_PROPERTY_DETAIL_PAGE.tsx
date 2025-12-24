/**
 * COMPLETE WORKING EXAMPLE: Property Detail Page
 * /src/app/properties/[slug]/page.tsx
 * 
 * This is a production-ready implementation showing how to:
 * 1. Fetch property data by slug
 * 2. Generate VacationRental schema with all property details
 * 3. Generate BreadcrumbList schema
 * 4. Render both schemas with SchemaRenderer
 * 
 * CRITICAL: VacationRental schema must follow Google's guidelines
 * - Include amenities, rooms, occupancy
 * - Include reviews if displayed
 * - NO booking/payment language
 */

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Bed, Wifi, Heart, Share2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SchemaRenderer } from "@/components/SchemaRenderer";
import {
  vacationRentalSchema,
  breadcrumbSchema,
  type PropertyData,
  type Review,
} from "@/lib/schema";
import { notFound } from "next/navigation";

// ============================================================================
// STATIC PARAMS (Optional: For static generation of popular properties)
// ============================================================================

// export async function generateStaticParams() {
//   const properties = await getPropertiesList();
//   return properties.map((prop) => ({
//     slug: prop.slug,
//   }));
// }

// ============================================================================
// METADATA (Dynamic SEO)
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The property you are looking for does not exist.",
    };
  }

  return {
    title: `${property.name} | Group Escape Houses`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.name,
      description: property.description.substring(0, 160),
      type: "website",
      url: `https://groupescapehouses.co.uk/properties/${params.slug}`,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.name,
        },
      ],
    },
  };
}

// ============================================================================
// DATA FETCHING
// ============================================================================

/**
 * Fetch property by slug
 * Replace with your actual data fetching logic
 */
async function getPropertyBySlug(slug: string): Promise<PropertyData | null> {
  try {
    // EXAMPLE 1: Fetch from internal API route
    // const response = await fetch(
    //   `https://groupescapehouses.co.uk/api/properties/${slug}`,
    //   { cache: "revalidate" }
    // );
    // if (!response.ok) return null;
    // return response.json();

    // EXAMPLE 2: Fetch from database
    // const property = await db.query.properties.findFirst({
    //   where: eq(properties.slug, slug),
    // });
    // return property || null;

    // EXAMPLE 3: Static data for demo
    const demoProperties: Record<string, PropertyData> = {
      "the-manor-brighton": {
        id: "property-001",
        name: "The Manor - Brighton",
        description:
          "Stunning 8-bedroom Victorian manor house in the heart of Brighton. Perfect for hen parties, weddings, and group celebrations. Features luxury hot tub, games room, and beautiful gardens.",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
        ],
        address: {
          street: "123 Marine Parade",
          city: "Brighton",
          postcode: "BN2 1AE",
        },
        geo: {
          latitude: 50.8225,
          longitude: -0.1623,
        },
        rooms: 8,
        minGuests: 6,
        maxGuests: 20,
        amenities: [
          "Hot Tub",
          "Swimming Pool",
          "Games Room",
          "WiFi",
          "Fully Equipped Kitchen",
          "Large Garden",
          "BBQ Area",
          "Gym",
        ],
        petsAllowed: true,
        priceRange: "£800 - £2,500 per night",
        rating: 4.8,
        reviewCount: 47,
        reviews: [
          {
            author: "Sarah M.",
            rating: 5,
            text: "Absolutely amazing venue for our hen party! The house was immaculate, staff were helpful, and the hot tub was a huge hit.",
            date: "2025-12-01",
          },
          {
            author: "James K.",
            rating: 5,
            text: "Perfect location for our corporate team building. Great amenities and plenty of space for 15 people.",
            date: "2025-11-15",
          },
          {
            author: "Emma L.",
            rating: 4,
            text: "Beautiful house with stunning views. Only minor issue was WiFi speed, but overall excellent.",
            date: "2025-10-20",
          },
        ],
      },
      "seaside-cottage-cornwall": {
        id: "property-002",
        name: "Seaside Cottage - Cornwall",
        description:
          "Charming 6-bedroom cottage overlooking the Cornish coastline. Ideal for family reunions, friend groups, and holiday celebrations.",
        images: [
          "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=1200",
        ],
        address: {
          street: "Coast Road",
          city: "Penzance",
          postcode: "TR18 4LP",
        },
        rooms: 6,
        minGuests: 4,
        maxGuests: 14,
        amenities: ["Sea View", "Patio", "Kitchen", "WiFi", "Parking"],
        petsAllowed: true,
        priceRange: "£600 - £1,500 per night",
        rating: 4.6,
        reviewCount: 23,
      },
    };

    return demoProperties[slug] || null;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // ========================================================================
  // BUILD SCHEMA DATA
  // ========================================================================

  // VacationRental schema with all property details
  const rentalSchema = vacationRentalSchema(property);

  // BreadcrumbList schema for navigation
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://groupescapehouses.co.uk" },
    { name: "Properties", url: "https://groupescapehouses.co.uk/properties" },
    {
      name: property.name,
      url: `https://groupescapehouses.co.uk/properties/${params.slug}`,
    },
  ]);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="bg-slate-50 border-b">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4">
            <Link
              href="/properties"
              className="flex items-center text-accent-pink hover:text-accent-pink/80 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative w-full h-96 bg-slate-200 overflow-hidden">
          {property.images[0] && (
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Image Gallery Button */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm font-medium text-slate-900">
              {property.images.length} photos
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              {/* Title & Location */}
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">
                {property.name}
              </h1>
              <div className="flex items-center text-slate-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {property.address.street}, {property.address.city},{" "}
                  {property.address.postcode}
                </span>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Bedrooms</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {property.rooms}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Guests</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {property.minGuests}-{property.maxGuests}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Price</p>
                  <p className="text-lg font-bold text-accent-pink">
                    {property.priceRange || "Contact for pricing"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                  About This Property
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {property.description}
                </p>
              </section>

              {/* Amenities */}
              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                  Amenities & Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center p-3 bg-slate-50 rounded-lg"
                    >
                      <Wifi className="w-5 h-5 text-accent-pink mr-3" />
                      <span className="text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Guest Capacity */}
              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                  Guest Capacity
                </h2>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-accent-pink mr-3" />
                    <div>
                      <p className="text-sm text-slate-600">Sleeps</p>
                      <p className="text-xl font-bold text-slate-900">
                        {property.minGuests} - {property.maxGuests} guests
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    Ideal for group holidays, celebrations, and team building.
                  </p>
                </div>
              </section>

              {/* Reviews Section */}
              {property.reviews && property.reviews.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                    Guest Reviews
                  </h2>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="text-4xl font-bold text-slate-900">
                      {property.rating}
                    </div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-yellow-400 ${
                              i < Math.floor(property.rating!)
                                ? "★"
                                : "☆"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-600">
                        {property.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {property.reviews.slice(0, 3).map((review, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-lg border"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-slate-900">
                            {review.author}
                          </p>
                          <span className="text-yellow-400">
                            {"★".repeat(review.rating)}
                          </span>
                        </div>
                        <p className="text-slate-700">{review.text}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div>
              <div className="bg-slate-50 rounded-xl p-6 sticky top-6">
                {/* Price */}
                <div className="mb-6 pb-6 border-b">
                  <p className="text-sm text-slate-600 mb-1">Price from</p>
                  <p className="text-3xl font-bold text-accent-pink">
                    {property.priceRange || "Contact owner"}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Bed className="w-5 h-5 text-accent-pink flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">{property.rooms} Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-accent-pink flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">
                        Sleeps {property.minGuests}-{property.maxGuests}
                      </p>
                    </div>
                  </div>
                  {property.petsAllowed && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm text-accent-pink">🐾</span>
                      <div>
                        <p className="text-sm text-slate-600">Pets Allowed</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-accent-pink text-slate-900 font-semibold py-3 rounded-lg hover:bg-accent-pink/90 transition-colors mb-3">
                  Contact Property Owner
                </button>

                {/* Share Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 border border-slate-300 rounded-lg py-2 hover:bg-slate-100 transition flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="flex-1 border border-slate-300 rounded-lg py-2 hover:bg-slate-100 transition flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ====================================================================
          JSON-LD SCHEMAS
          These are critical for Google to understand this is a vacation rental
          ==================================================================== */}
      <SchemaRenderer schemas={[rentalSchema, breadcrumbs]} />
    </div>
  );
}

// ============================================================================
// OPTIONAL: Enable ISR (Incremental Static Regeneration)
// ============================================================================
// export const revalidate = 3600; // Regenerate page every hour
