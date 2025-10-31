"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import Image from "next/image";
import { 
  SlidersHorizontal, 
  MapPin, 
  Users, 
  PoundSterling,
  Sparkles,
  Waves,
  Gamepad2,
  PawPrint,
  Accessibility,
  Clapperboard,
  Flame,
  Trees,
  Check
} from "lucide-react";

// Move properties data outside component to prevent re-creation on every render
const properties = [
  {
    id: "1",
    title: "The Brighton Manor",
    location: "Brighton, East Sussex",
    sleeps: 16,
    bedrooms: 8,
    priceFrom: 89,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Pool", "Games Room"],
    slug: "brighton-manor",
  },
  {
    id: "1b",
    title: "Brighton Seafront Villa",
    location: "Brighton, East Sussex",
    sleeps: 12,
    bedrooms: 6,
    priceFrom: 79,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80",
    features: ["Sea View", "Hot Tub", "BBQ"],
    slug: "brighton-seafront-villa",
  },
  {
    id: "1c",
    title: "The Lanes Townhouse",
    location: "Brighton, East Sussex",
    sleeps: 10,
    bedrooms: 5,
    priceFrom: 69,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    features: ["City Centre", "Roof Terrace", "Games Room"],
    slug: "the-lanes-townhouse",
  },
  {
    id: "2",
    title: "Bath Spa Retreat",
    location: "Bath, Somerset",
    sleeps: 20,
    bedrooms: 10,
    priceFrom: 95,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    features: ["Roof Terrace", "City Views", "Games Room"],
    slug: "cardiff-penthouse",
  },
  {
    id: "7",
    title: "London Luxury Loft",
    location: "London, Greater London",
    sleeps: 22,
    bedrooms: 11,
    priceFrom: 125,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
    features: ["Cinema", "Hot Tub", "Roof Terrace"],
    slug: "london-luxury-loft",
  },
  {
    id: "8",
    title: "Liverpool Dockside Retreat",
    location: "Liverpool, Merseyside",
    sleeps: 16,
    bedrooms: 8,
    priceFrom: 82,
    image: "https://images.unsplash.com/photo-1600607687644-aab4f92099c2?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Games Room", "City Views"],
    slug: "liverpool-dockside",
  },
  {
    id: "9",
    title: "Cotswolds Country Estate",
    location: "Cotswolds, Gloucestershire",
    sleeps: 24,
    bedrooms: 12,
    priceFrom: 110,
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&auto=format&fit=crop&q=80",
    features: ["Pool", "Hot Tub", "Garden", "Cinema"],
    slug: "cotswolds-estate",
  },
  {
    id: "10",
    title: "Newcastle Quayside House",
    location: "Newcastle, Tyne and Wear",
    sleeps: 14,
    bedrooms: 7,
    priceFrom: 77,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "BBQ", "Pet Friendly"],
    slug: "newcastle-quayside",
  },
  {
    id: "11",
    title: "Cambridge Riverside Manor",
    location: "Cambridge, Cambridgeshire",
    sleeps: 18,
    bedrooms: 9,
    priceFrom: 92,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80",
    features: ["Garden", "Games Room", "Cinema"],
    slug: "cambridge-riverside",
  },
  {
    id: "12",
    title: "Bristol Harbour House",
    location: "Bristol, South West England",
    sleeps: 15,
    bedrooms: 8,
    priceFrom: 84,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Roof Terrace", "BBQ"],
    slug: "bristol-harbour",
  },
  {
    id: "13",
    title: "Oxford Historic Mansion",
    location: "Oxford, Oxfordshire",
    sleeps: 20,
    bedrooms: 10,
    priceFrom: 98,
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&auto=format&fit=crop&q=80",
    features: ["Pool", "Cinema", "Garden"],
    slug: "oxford-mansion",
  },
  {
    id: "14",
    title: "Lake District Lodge",
    location: "Lake District, Cumbria",
    sleeps: 16,
    bedrooms: 8,
    priceFrom: 88,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Garden", "Pet Friendly"],
    slug: "lake-district-lodge",
  },
  {
    id: "15",
    title: "Newquay Coastal Villa",
    location: "Newquay, Cornwall",
    sleeps: 12,
    bedrooms: 6,
    priceFrom: 79,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Sea View", "BBQ"],
    slug: "newquay-coastal",
  },
  {
    id: "16",
    title: "Edinburgh Castle View House",
    location: "Edinburgh, Scotland",
    sleeps: 18,
    bedrooms: 9,
    priceFrom: 95,
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "City Views", "Games Room"],
    slug: "edinburgh-castle-view",
  },
  {
    id: "17",
    title: "Leeds City Centre Loft",
    location: "Leeds, West Yorkshire",
    sleeps: 14,
    bedrooms: 7,
    priceFrom: 74,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    features: ["Hot Tub", "Roof Terrace", "Cinema"],
    slug: "leeds-city-loft",
  },
  {
    id: "18",
    title: "Birmingham Grand House",
    location: "Birmingham, West Midlands",
    sleeps: 20,
    bedrooms: 10,
    priceFrom: 87,
    image: "https://images.unsplash.com/photo-1600566752229-250ed79470d8?w=800&auto=format&fit=crop&q=80",
    features: ["Pool", "Hot Tub", "Games Room"],
    slug: "birmingham-grand",
  },
];

// Destinations list
const destinations = [
  { name: "Bath", slug: "bath" },
  { name: "Birmingham", slug: "birmingham" },
  { name: "Blackpool", slug: "blackpool" },
  { name: "Bournemouth", slug: "bournemouth" },
  { name: "Brighton", slug: "brighton" },
  { name: "Bristol", slug: "bristol" },
  { name: "Cambridge", slug: "cambridge" },
  { name: "Canterbury", slug: "canterbury" },
  { name: "Cardiff", slug: "cardiff" },
  { name: "Cheltenham", slug: "cheltenham" },
  { name: "Chester", slug: "chester" },
  { name: "Cotswolds", slug: "cotswolds" },
  { name: "Durham", slug: "durham" },
  { name: "Exeter", slug: "exeter" },
  { name: "Harrogate", slug: "harrogate" },
  { name: "Lake District", slug: "lake-district" },
  { name: "Leeds", slug: "leeds" },
  { name: "Liverpool", slug: "liverpool" },
  { name: "London", slug: "london" },
  { name: "Manchester", slug: "manchester" },
  { name: "Margate", slug: "margate" },
  { name: "Newcastle", slug: "newcastle" },
  { name: "Newquay", slug: "newquay" },
  { name: "Nottingham", slug: "nottingham" },
  { name: "Oxford", slug: "oxford" },
  { name: "Plymouth", slug: "plymouth" },
  { name: "Sheffield", slug: "sheffield" },
  { name: "St Ives", slug: "st-ives" },
  { name: "Stratford-upon-Avon", slug: "stratford-upon-avon" },
  { name: "Windsor", slug: "windsor" },
  { name: "York", slug: "york" },
].sort((a, b) => a.name.localeCompare(b.name));

const featureOptions = [
  { icon: Waves, label: "Hot Tub" },
  { icon: Waves, label: "Pool" },
  { icon: Gamepad2, label: "Games Room" },
  { icon: PawPrint, label: "Pet Friendly" },
  { icon: Accessibility, label: "Accessible" },
  { icon: Clapperboard, label: "Cinema" },
  { icon: Flame, label: "BBQ" },
  { icon: Trees, label: "Garden" },
];

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(6);
  
  // Read search params from homepage (destination, checkIn, checkOut, guests, pets)
  const destinationParam = searchParams.get("destination") || searchParams.get("location") || "";
  const guestsParam = searchParams.get("guests") || "0";
  
  const [filters, setFilters] = useState({
    location: destinationParam,
    groupSize: parseInt(guestsParam),
    priceMin: 50,
    priceMax: 3000,
    features: [] as string[],
  });

  // Update URL when location filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove old destination param to avoid conflicts
    params.delete("destination");
    
    if (filters.location) {
      params.set("location", filters.location);
    } else {
      params.delete("location");
    }
    router.replace(`/properties?${params.toString()}`, { scroll: false });
  }, [filters.location, router]);

  // Reset displayedCount when filters change
  useEffect(() => {
    setDisplayedCount(6);
  }, [filters]);

  const toggleFeature = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Location filter
      if (filters.location) {
        const locationMatch = property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase().replace("-", " "));
        if (!locationMatch) return false;
      }

      // Group size filter
      if (filters.groupSize > 0 && property.sleeps < filters.groupSize) {
        return false;
      }

      // Price filter
      if (property.priceFrom < filters.priceMin || property.priceFrom > filters.priceMax) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feature) =>
          property.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [filters]);

  const visibleProperties = filteredProperties.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProperties.length;

  const loadMore = () => {
    setDisplayedCount(prev => Math.min(prev + 6, filteredProperties.length));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div>
            <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Hen Party Houses to Rent
            </h1>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl">
              Luxury group accommodation across the UK with hot tubs, pools, and amazing features
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12 pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full rounded-xl py-6 font-medium transition-all duration-200 hover:scale-[1.02]"
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
                  <h3 className="text-xl font-semibold flex items-center gap-2" style={{ fontFamily: "var(--font-body)" }}>
                    <SlidersHorizontal className="w-5 h-5 text-[var(--color-accent-sage)]" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({
                        location: "",
                        groupSize: 0,
                        priceMin: 50,
                        priceMax: 3000,
                        features: [],
                      })
                    }
                    className="hover:text-[var(--color-accent-pink)] transition-colors"
                  >
                    Clear all
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-accent-pink)]" />
                      Location
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-transparent"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                      <option value="">All locations</option>
                      {destinations.map((destination) => (
                        <option key={destination.slug} value={destination.slug}>
                          {destination.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Group Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--color-accent-gold)]" />
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
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <PoundSterling className="w-4 h-4 text-[var(--color-accent-sage)]" />
                      Price per night: £{filters.priceMin} - £{filters.priceMax}
                    </label>
                    <Slider
                      value={[filters.priceMin, filters.priceMax]}
                      onValueChange={([min, max]) =>
                        setFilters({ ...filters, priceMin: min, priceMax: max })
                      }
                      max={3000}
                      step={10}
                      className="py-4"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--color-accent-pink)]" />
                      Features
                    </label>
                    <div className="space-y-2">
                      {featureOptions.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <label 
                            key={feature.label} 
                            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filters.features.includes(feature.label)}
                              onChange={() => toggleFeature(feature.label)}
                              className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                            />
                            <Icon className="w-4 h-4 text-[var(--color-accent-sage)]" />
                            <span className="text-sm">{feature.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instant Enquiry Only */}
                  <div>
                    <label 
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                      />
                      <Check className="w-4 h-4 text-[var(--color-accent-gold)]" />
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
                <p className="text-[var(--color-neutral-dark)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--color-accent-gold)]" />
                  Showing {visibleProperties.length} of {filteredProperties.length} properties
                </p>
                <select className="px-4 py-2 rounded-xl border border-gray-300 text-sm transition-all duration-200 focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-transparent">
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Sleeps (Most first)</option>
                  <option>Sort by: Newest</option>
                </select>
              </div>

              {/* Property Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {visibleProperties.length > 0 ? (
                  visibleProperties.map((property) => (
                    <div key={property.id}>
                      <PropertyCard {...property} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-xl text-[var(--color-neutral-dark)]">
                      No properties match your filters. Try adjusting your search criteria.
                    </p>
                  </div>
                )}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={loadMore}
                      size="lg"
                      className="rounded-2xl px-10 py-6 font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                      style={{
                        background: "var(--color-accent-sage)",
                        color: "white",
                      }}
                    >
                      Load More Properties
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-2xl px-10 py-6 font-medium border-2 transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
                      style={{
                        borderColor: "var(--color-accent-gold)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      <Link href="/contact">Request a Quote</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}