"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, TrendingUp, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationsPage() {
  // Only show destinations that have full data in the detail page
  const destinations = [
    {
      name: "London",
      region: "Greater London",
      propertyCount: 35,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london%2c-uk-29990c38-20251018180027.jpg",
      slug: "london",
      description: "The ultimate hen party destination with world-class entertainment, dining and iconic landmarks.",
      bio: "The capital offers world-class entertainment, dining and iconic landmarks.",
      featured: true
    },
    {
      name: "Brighton",
      region: "East Sussex",
      propertyCount: 18,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--cf923885-20251018100341.jpg",
      slug: "brighton",
      description: "Vibrant seaside city with amazing nightlife and stunning Regency architecture.",
      bio: "Vibrant seaside city combining beach vibes with legendary nightlife.",
      featured: true
    },
    {
      name: "Bath",
      region: "Somerset",
      propertyCount: 15,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
      slug: "bath",
      description: "Historic spa city with Roman baths, Georgian architecture and luxury experiences.",
      bio: "Historic spa city with Roman baths and Georgian architecture.",
      featured: true
    },
    {
      name: "Manchester",
      region: "Greater Manchester",
      propertyCount: 22,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
      slug: "manchester",
      description: "Vibrant city with world-class shopping, dining and legendary nightlife.",
      bio: "Northern powerhouse with vibrant nightlife and warm hospitality.",
      featured: true
    },
    {
      name: "York",
      region: "North Yorkshire",
      propertyCount: 12,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-uk%2c-m-7d6cc34e-20251018100412.jpg",
      slug: "york",
      description: "Medieval city with cobbled streets, historic walls and charming riverside pubs.",
      bio: "Medieval city with cobbled streets and charming riverside pubs.",
      featured: true
    },
    {
      name: "Liverpool",
      region: "Merseyside",
      propertyCount: 19,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-liverpool-uk-12524f88-20251019151454.jpg",
      slug: "liverpool",
      description: "Iconic waterfront city with legendary nightlife, Beatles heritage and vibrant atmosphere.",
      bio: "Iconic waterfront city with legendary nightlife and Beatles heritage.",
      featured: true
    },
    {
      name: "Cardiff",
      region: "South Wales",
      propertyCount: 14,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/cardiff-city-center-photograph%2c-iconic-caf939c9-20251017161252.jpg",
      slug: "cardiff",
      description: "Wales' vibrant capital with fantastic value, warm hospitality and stunning bay.",
      bio: "Wales' vibrant capital with fantastic value and warm hospitality.",
      featured: false
    },
    {
      name: "Bournemouth",
      region: "Dorset",
      propertyCount: 14,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--f4900618-20251018100420.jpg",
      slug: "bournemouth",
      description: "Beautiful beaches, vibrant nightlife and stunning coastal walks.",
      bio: "Beautiful beaches with vibrant nightlife and coastal walks.",
      featured: false
    },
    {
      name: "Newcastle",
      region: "Tyne and Wear",
      propertyCount: 9,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-up-67f977e5-20251019151656.jpg",
      slug: "newcastle",
      description: "Friendly northern city famous for nightlife and stunning quayside.",
      bio: "Friendly northern city famous for nightlife and stunning quayside.",
      featured: false
    },
    {
      name: "Birmingham",
      region: "West Midlands",
      propertyCount: 11,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-birmingham-u-6b0d439a-20251019151500.jpg",
      slug: "birmingham",
      description: "Britain's second city with world-class shopping, diverse dining and buzzing nightlife.",
      bio: "Dynamic city with world-class shopping and diverse entertainment.",
      featured: false
    },
  ];

  const featuredDestinations = destinations.filter((d) => d.featured);
  const otherDestinations = destinations.filter((d) => !d.featured);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[var(--color-accent-pink)]" />
            <span className="text-sm font-medium">Explore England</span>
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Top Hen Party Destinations in England
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto mb-6">
            Discover the best cities and towns across England for your hen celebration
          </p>
          <p className="text-base text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
            From vibrant city centres with legendary nightlife to stunning coastal retreats and historic spa towns, England offers incredible destinations for unforgettable hen weekends. Each location features handpicked luxury houses with hot tubs, pools, and all the amenities you need for the perfect group celebration.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Most Popular
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) =>
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

                <div className="relative h-[580px]">
                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}>
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/95 text-[var(--color-text-primary)] text-sm font-medium shadow-lg backdrop-blur-sm">
                    {destination.propertyCount} properties
                  </div>

                  {/* Content with white background */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}>

                      {destination.name}
                    </h3>
                    <p className="text-sm font-medium mb-3">
                      {destination.region}
                    </p>
                    <p className="text-sm leading-relaxed mb-4 text-black">
                      {destination.bio}
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button
                        size="sm"
                        className="rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200"
                        style={{
                          background: "var(--color-accent-sage)",
                          color: "white"
                        }}>
                        View Properties
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200"
                        style={{
                          background: "var(--color-accent-gold)",
                          color: "white"
                        }}>
                        <Link href="/contact" onClick={(e) => e.stopPropagation()}>
                          Check Availability
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section 1 - After Featured Destinations */}
      <section className="py-8 bg-gradient-to-br from-[var(--color-accent-pink)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span className="text-sm font-medium">Ready to Book?</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Find Your Perfect Hen Party House
          </h2>
          <p className="text-lg text-[var(--color-neutral-dark)] mb-6 max-w-2xl mx-auto">
            Browse our full collection of luxury houses with hot tubs, pools and games rooms
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-10 py-6 text-base font-semibold transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 group"
            style={{
              background: "var(--color-text-primary)",
              color: "white"
            }}>

            <Link href="/properties" className="inline-flex items-center gap-2">
              View All Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-2 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            All Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((destination) =>
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

                <div className="relative h-[540px]">
                  <div
                  className="absolute inset-0 bg-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url('${destination.image}')`,
                    backgroundPosition: destination.name === "Newcastle" ? "center 35%" : "center"
                  }}>
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)" }}>

                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium mb-2">
                      {destination.region}
                    </p>
                    <p className="text-xs font-medium mb-2">
                      {destination.propertyCount} properties
                    </p>
                    <p className="text-xs leading-relaxed mb-3 text-black">
                      {destination.bio}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="rounded-xl px-3 py-1 text-xs font-medium transition-all duration-200 w-full"
                        style={{
                          background: "var(--color-accent-sage)",
                          color: "white"
                        }}>
                        View Properties
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl px-3 py-1 text-xs font-medium transition-all duration-200 w-full"
                        style={{
                          background: "var(--color-accent-gold)",
                          color: "white"
                        }}>
                        <Link href="/contact" onClick={(e) => e.stopPropagation()}>
                          Check Availability
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section 2 - After All Destinations */}
      <section className="bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="rounded-3xl p-12 md:p-16 text-center shadow-2xl" style={{ background: "linear-gradient(135deg, var(--color-accent-sage), var(--color-accent-gold))" }}>
            <h2 className="text-4xl md:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              Not Sure Where to Go?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free personalised quote and let us help you find the perfect destination and house for your group celebration
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-12 py-7 text-lg font-semibold transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
              style={{
                background: "white",
                color: "var(--color-text-primary)"
              }}>

              <Link href="/contact" className="inline-flex items-center gap-2">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-0 scroll-reveal" style={{ background: "var(--color-accent-pink)" }}>
        <div className="max-w-full !text-[10px]">
          {/* Top Row: Text */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-0 gap-2 max-w-[1400px] mx-auto px-6">
            <h2
              className="text-2xl md:text-3xl m-0"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>

              We're on Instagram
            </h2>
            <a
              href="https://instagram.com/groupescapehouses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xl md:text-2xl font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>

              <Instagram className="w-6 h-6" />
              @groupescapehouses
            </a>
          </div>

          {/* Bottom Row: Photo Strip with Animation */}
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-slide-left">
              {[
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90",
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=90",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=90",
              "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=90",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90",
              "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=90",
              // Duplicate for seamless loop
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90",
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=90",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=90",
              "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=90"].
              map((image, index) =>
              <a
                key={index}
                href="https://instagram.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">

                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image}')` }}>
                </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-7 h-7" style={{ color: "var(--color-accent-pink)" }} />
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-16" style={{ fontFamily: "var(--font-display)" }}>
            Why Choose Group Escape Houses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-pink)" }}>

                🏡
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Properties in the best areas, close to nightlife, restaurants and attractions
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-sage)" }}>

                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Insider tips and recommendations for the best experiences in every city
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-gold)" }}>

                🎊
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Packages</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Combine accommodation with experiences for a hassle-free celebration
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "var(--color-accent-sage)",
                  color: "white"
                }}>

                <Link href="/properties">Browse Houses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  color: "var(--color-text-primary)"
                }}>

                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}