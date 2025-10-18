"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { 
  SlidersHorizontal, 
  X, 
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
  Check,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(6);
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
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      features: ["Roof Terrace", "City Views", "Games Room"],
      slug: "cardiff-penthouse",
    },
  ];

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

  const toggleFeature = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const visibleProperties = properties.slice(0, displayedCount);
  const hasMore = displayedCount < properties.length;

  const loadMore = () => {
    setDisplayedCount(prev => Math.min(prev + 6, properties.length));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Hen Party Houses to Rent
            </h1>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl">
              Luxury group accommodation across the UK with hot tubs, pools, and amazing features
            </p>
          </motion.div>
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
            <motion.div 
              className={`md:w-80 ${showFilters ? "block" : "hidden md:block"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                        priceMin: 0,
                        priceMax: 200,
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
                      <option value="london">London</option>
                      <option value="brighton">Brighton</option>
                      <option value="bath">Bath</option>
                      <option value="manchester">Manchester</option>
                      <option value="newquay">Newquay</option>
                      <option value="lake-district">Lake District</option>
                      <option value="york">York</option>
                      <option value="bournemouth">Bournemouth</option>
                      <option value="liverpool">Liverpool</option>
                      <option value="bristol">Bristol</option>
                      <option value="newcastle">Newcastle</option>
                      <option value="cambridge">Cambridge</option>
                      <option value="oxford">Oxford</option>
                      <option value="leeds">Leeds</option>
                      <option value="nottingham">Nottingham</option>
                      <option value="birmingham">Birmingham</option>
                      <option value="sheffield">Sheffield</option>
                      <option value="exeter">Exeter</option>
                      <option value="chester">Chester</option>
                      <option value="durham">Durham</option>
                      <option value="canterbury">Canterbury</option>
                      <option value="blackpool">Blackpool</option>
                      <option value="cotswolds">Cotswolds</option>
                      <option value="margate">Margate</option>
                      <option value="harrogate">Harrogate</option>
                      <option value="st-ives">St Ives</option>
                      <option value="windsor">Windsor</option>
                      <option value="stratford-upon-avon">Stratford-upon-Avon</option>
                      <option value="plymouth">Plymouth</option>
                      <option value="cheltenham">Cheltenham</option>
                      <option value="cardiff">Cardiff</option>
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
                      max={300}
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
                          <motion.label 
                            key={feature.label} 
                            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <input
                              type="checkbox"
                              checked={filters.features.includes(feature.label)}
                              onChange={() => toggleFeature(feature.label)}
                              className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                            />
                            <Icon className="w-4 h-4 text-[var(--color-accent-sage)]" />
                            <span className="text-sm">{feature.label}</span>
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instant Enquiry Only */}
                  <div>
                    <motion.label 
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                      />
                      <Check className="w-4 h-4 text-[var(--color-accent-gold)]" />
                      <span className="text-sm font-medium">Instant enquiry only</span>
                    </motion.label>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Property Grid */}
            <div className="flex-1">
              {/* Sort and Count */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-[var(--color-neutral-dark)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--color-accent-gold)]" />
                  Showing {visibleProperties.length} of {properties.length} properties
                </p>
                <select className="px-4 py-2 rounded-xl border border-gray-300 text-sm transition-all duration-200 focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-transparent">
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Sleeps (Most first)</option>
                  <option>Sort by: Newest</option>
                </select>
              </motion.div>

              {/* Property Cards */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {visibleProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <PropertyCard {...property} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              {hasMore && (
                <motion.div 
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
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
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}