"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    groupSize: 0,
    priceMin: 0,
    priceMax: 200,
    features: [] as string[],
  });

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
      title: "Bath Spa Retreat",
      location: "Bath, Somerset",
      sleeps: 20,
      bedrooms: 10,
      priceFrom: 95,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      features: ["Games Room", "Cinema", "Hot Tub"],
      slug: "bath-spa-retreat",
    },
    {
      id: "3",
      title: "Manchester Party House",
      location: "Manchester, Greater Manchester",
      sleeps: 14,
      bedrooms: 7,
      priceFrom: 79,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      features: ["Hot Tub", "BBQ", "Garden"],
      slug: "manchester-party-house",
    },
    {
      id: "4",
      title: "York Georgian Townhouse",
      location: "York, North Yorkshire",
      sleeps: 18,
      bedrooms: 9,
      priceFrom: 85,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      features: ["Hot Tub", "Pet Friendly", "Parking"],
      slug: "york-townhouse",
    },
    {
      id: "5",
      title: "Bournemouth Beach House",
      location: "Bournemouth, Dorset",
      sleeps: 12,
      bedrooms: 6,
      priceFrom: 75,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      features: ["Pool", "Sea View", "BBQ"],
      slug: "bournemouth-beach",
    },
    {
      id: "6",
      title: "Cardiff City Penthouse",
      location: "Cardiff, South Wales",
      sleeps: 10,
      bedrooms: 5,
      priceFrom: 69,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      features: ["Roof Terrace", "City Views", "Games Room"],
      slug: "cardiff-penthouse",
    },
  ];

  const featureOptions = [
    "Hot Tub",
    "Pool",
    "Games Room",
    "Pet Friendly",
    "Accessible",
    "Cinema",
    "BBQ",
    "Garden",
  ];

  const toggleFeature = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Hen Party Houses to Rent
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl">
            Luxury group accommodation across the UK with hot tubs, pools, and amazing features
          </p>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full rounded-xl py-6 font-medium"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`md:w-80 ${showFilters ? "block" : "hidden md:block"}`}>
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({
                        location: "",
                        groupSize: 0,
                        priceMin: 0,
                        priceMax: 200,
                        features: [],
                      })
                    }
                  >
                    Clear all
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      className="w-full px-4 py-2 rounded-xl border border-gray-300"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                      <option value="">All locations</option>
                      <option value="brighton">Brighton</option>
                      <option value="bath">Bath</option>
                      <option value="manchester">Manchester</option>
                      <option value="york">York</option>
                      <option value="bournemouth">Bournemouth</option>
                      <option value="cardiff">Cardiff</option>
                    </select>
                  </div>

                  {/* Group Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Group size: {filters.groupSize > 0 ? `${filters.groupSize}+` : "Any"}
                    </label>
                    <Slider
                      value={[filters.groupSize]}
                      onValueChange={([value]) => setFilters({ ...filters, groupSize: value })}
                      max={30}
                      step={2}
                      className="py-4"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price per night: £{filters.priceMin} - £{filters.priceMax}
                    </label>
                    <Slider
                      value={[filters.priceMin, filters.priceMax]}
                      onValueChange={([min, max]) =>
                        setFilters({ ...filters, priceMin: min, priceMax: max })
                      }
                      max={300}
                      step={10}
                      className="py-4"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Features</label>
                    <div className="space-y-2">
                      {featureOptions.map((feature) => (
                        <label key={feature} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.features.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                            className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                          />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Instant Enquiry Only */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                      />
                      <span className="text-sm font-medium">Instant enquiry only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <div className="flex-1">
              {/* Sort and Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-[var(--color-neutral-dark)]">
                  Showing {properties.length} properties
                </p>
                <select className="px-4 py-2 rounded-xl border border-gray-300 text-sm">
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Sleeps (Most first)</option>
                  <option>Sort by: Newest</option>
                </select>
              </div>

              {/* Property Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 py-6 font-medium"
                  style={{
                    background: "var(--color-accent-sage)",
                    color: "white",
                  }}
                >
                  Load More Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}