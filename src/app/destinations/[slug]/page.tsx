"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Navigation, Coffee, Moon, Sparkles, UtensilsCrossed } from "lucide-react";

export default function DestinationDetailPage() {
  const destination = {
    name: "Brighton",
    region: "East Sussex",
    image: "https://images.unsplash.com/photo-1599067621490-d5c76a0f1e6d?w=1600&q=80",
    overview:
      "Brighton is the ultimate hen party destination, combining stunning seaside charm with vibrant nightlife and endless entertainment. This cosmopolitan city offers the perfect mix of beach vibes, quirky shops, amazing restaurants, and legendary clubs. From the iconic Brighton Pier to the historic Lanes, there's something for every taste and budget.",
    gettingThere: [
      "London to Brighton: 1 hour by train (Victoria to Brighton)",
      "London Gatwick Airport: 30 minutes by train or car",
      "Driving: Well connected via M23 and A23 with ample parking",
      "Coach services: Regular National Express services from major UK cities",
    ],
    nightlife: [
      "The Arch - Popular club with multiple rooms and diverse music",
      "Patterns - Beachfront venue with live DJs and stunning sea views",
      "Coalition - Busy student bar with cheap drinks and great atmosphere",
      "Proud Cabaret - Dinner and show venue with burlesque performances",
      "Revenge - Brighton's biggest LGBT+ club with drag shows",
    ],
    brunch: [
      "The Ivy in the Lanes - Elegant all-day dining in beautiful setting",
      "Burnt Orange - Bottomless brunch with great cocktails",
      "Bills - Local favourite serving delicious breakfast and brunch",
      "The Salt Room - Upscale seafront dining with amazing views",
      "Cafe Coho - Independent cafe with excellent coffee and brunch",
    ],
    activities: [
      "Brighton Palace Pier - Classic seaside fun with arcade games",
      "Royal Pavilion - Stunning historic palace and gardens",
      "Brighton Beach - Pebble beach perfect for summer celebrations",
      "The Lanes - Historic quarter with quirky shops and cafes",
      "British Airways i360 - Observation tower with panoramic views",
      "North Laine - Bohemian area with independent shops and cafes",
    ],
    spas: [
      "The Lanes Spa - Luxury spa in the heart of the city",
      "Brighton Harbour Hotel Spa - Upscale spa with rooftop pool",
      "Serenity Spa - Day spa offering packages for groups",
      "Unique Mobile Spa - In-house treatments at your property",
    ],
  };

  const properties = [
    {
      id: "1",
      title: "The Brighton Manor",
      location: "Brighton, East Sussex",
      sleeps: 16,
      bedrooms: 8,
      priceFrom: 89,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      features: ["Hot Tub", "Pool", "Games Room"],
      slug: "brighton-manor",
    },
    {
      id: "2",
      title: "Brighton Seafront Villa",
      location: "Brighton, East Sussex",
      sleeps: 12,
      bedrooms: 6,
      priceFrom: 79,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      features: ["Sea View", "Hot Tub", "BBQ"],
      slug: "brighton-villa",
    },
    {
      id: "3",
      title: "The Lanes Townhouse",
      location: "Brighton, East Sussex",
      sleeps: 10,
      bedrooms: 5,
      priceFrom: 69,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      features: ["City Centre", "Roof Terrace"],
      slug: "lanes-townhouse",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <div className="relative h-[500px] mt-20">
        <Image src={destination.image} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1200px] mx-auto px-6 pb-12">
            <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-white text-xl">
              <MapPin className="w-5 h-5" />
              <span>{destination.region}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Why {destination.name}?
              </h2>
              <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                {destination.overview}
              </p>
            </div>
            <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">From London</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">1 hour by train</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Moon className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Nightlife</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Legendary clubs and bars</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Dining</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">100+ restaurants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Navigation className="w-5 h-5 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Getting There
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.gettingThere.map((option, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <p className="text-[var(--color-neutral-dark)]">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Moon className="w-5 h-5 text-[var(--color-accent-sage)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Top Nightlife Spots
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.nightlife.map((venue, index) => (
              <div key={index} className="bg-[var(--color-bg-primary)] rounded-xl p-6">
                <p className="font-semibold mb-2">{venue.split(" - ")[0]}</p>
                <p className="text-sm text-[var(--color-neutral-dark)]">{venue.split(" - ")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brunch & Dining */}
      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent-gold)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Best Brunch & Dining
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.brunch.map((venue, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <p className="font-semibold mb-2">{venue.split(" - ")[0]}</p>
                <p className="text-sm text-[var(--color-neutral-dark)]">{venue.split(" - ")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Things to Do
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.activities.map((activity, index) => (
              <div key={index} className="bg-[var(--color-bg-primary)] rounded-xl p-6">
                <p className="font-semibold mb-2">{activity.split(" - ")[0]}</p>
                {activity.split(" - ")[1] && (
                  <p className="text-sm text-[var(--color-neutral-dark)]">{activity.split(" - ")[1]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties in this area */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Hen Party Houses in {destination.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}