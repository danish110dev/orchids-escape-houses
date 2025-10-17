"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, TrendingUp } from "lucide-react";

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Brighton",
      region: "East Sussex",
      propertyCount: 18,
      image: "https://images.unsplash.com/photo-1599067621490-d5c76a0f1e6d?w=800&q=80",
      slug: "brighton",
      description: "Vibrant seaside city with amazing nightlife and stunning Regency architecture",
      featured: true,
    },
    {
      name: "Bath",
      region: "Somerset",
      propertyCount: 15,
      image: "https://images.unsplash.com/photo-1566510955207-4fcf94dfafd0?w=800&q=80",
      slug: "bath",
      description: "Historic spa city with Roman baths, Georgian architecture and luxury experiences",
      featured: true,
    },
    {
      name: "Manchester",
      region: "Greater Manchester",
      propertyCount: 22,
      image: "https://images.unsplash.com/photo-1564511287835-b8d1b0de5e98?w=800&q=80",
      slug: "manchester",
      description: "Vibrant city with world-class shopping, dining and legendary nightlife",
      featured: true,
    },
    {
      name: "York",
      region: "North Yorkshire",
      propertyCount: 12,
      image: "https://images.unsplash.com/photo-1590759668628-05b0fc34e04a?w=800&q=80",
      slug: "york",
      description: "Medieval city with cobbled streets, historic walls and charming riverside pubs",
      featured: false,
    },
    {
      name: "Bournemouth",
      region: "Dorset",
      propertyCount: 14,
      image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80",
      slug: "bournemouth",
      description: "Beautiful beaches, vibrant nightlife and stunning coastal walks",
      featured: false,
    },
    {
      name: "Cardiff",
      region: "South Wales",
      propertyCount: 10,
      image: "https://images.unsplash.com/photo-1580670432998-8c5cfa7b9b0b?w=800&q=80",
      slug: "cardiff",
      description: "Capital city with historic castle, waterfront dining and buzzing nightlife",
      featured: false,
    },
    {
      name: "Liverpool",
      region: "Merseyside",
      propertyCount: 16,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      slug: "liverpool",
      description: "Cultural hub with iconic waterfront, Beatles heritage and vibrant nightlife",
      featured: false,
    },
    {
      name: "Edinburgh",
      region: "Scotland",
      propertyCount: 13,
      image: "https://images.unsplash.com/photo-1555297755-4322eb3bb916?w=800&q=80",
      slug: "edinburgh",
      description: "Historic capital with stunning castle, royal mile and world-famous festivals",
      featured: false,
    },
  ];

  const featuredDestinations = destinations.filter((d) => d.featured);
  const otherDestinations = destinations.filter((d) => !d.featured);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[var(--color-accent-pink)]" />
            <span className="text-sm font-medium">Explore the UK</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Hen Party Destinations
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Discover the best cities and towns across the UK for your hen celebration
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Most Popular
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-96">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${destination.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[var(--color-accent-pink)] text-white text-sm font-medium">
                    {destination.propertyCount} properties
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3
                      className="text-3xl font-semibold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {destination.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-3">{destination.region}</p>
                    <p className="text-sm leading-relaxed">{destination.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            All Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${destination.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3
                      className="text-xl font-semibold mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {destination.name}
                    </h3>
                    <p className="text-xs opacity-90 mb-2">{destination.region}</p>
                    <p className="text-xs">
                      {destination.propertyCount} properties
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-16" style={{ fontFamily: "var(--font-display)" }}>
            Why Choose Group Escape Houses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                style={{ background: "var(--color-accent-pink)" }}
              >
                🏡
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Properties in the best areas, close to nightlife, restaurants and attractions
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                style={{ background: "var(--color-accent-sage)" }}
              >
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Insider tips and recommendations for the best experiences in every city
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                style={{ background: "var(--color-accent-gold)" }}
              >
                🎊
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Packages</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Combine accommodation with experiences for a hassle-free celebration
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}