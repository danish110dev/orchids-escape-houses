"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, TrendingUp, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationsPage() {
  const destinations = [
    {
      name: "London",
      region: "Greater London",
      propertyCount: 35,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london%2c-uk-29990c38-20251018180027.jpg",
      slug: "london",
      description: "The ultimate hen party destination with world-class entertainment, dining and iconic landmarks",
      featured: true,
    },
    {
      name: "Brighton",
      region: "East Sussex",
      propertyCount: 18,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--cf923885-20251018100341.jpg",
      slug: "brighton",
      description: "Vibrant seaside city with amazing nightlife and stunning Regency architecture",
      featured: true,
    },
    {
      name: "Bath",
      region: "Somerset",
      propertyCount: 15,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
      slug: "bath",
      description: "Historic spa city with Roman baths, Georgian architecture and luxury experiences",
      featured: true,
    },
    {
      name: "Manchester",
      region: "Greater Manchester",
      propertyCount: 22,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
      slug: "manchester",
      description: "Vibrant city with world-class shopping, dining and legendary nightlife",
      featured: true,
    },
    {
      name: "Newquay",
      region: "Cornwall",
      propertyCount: 10,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newquay-corn-e91f1ad1-20251018180034.jpg",
      slug: "newquay",
      description: "Stunning Cornish beaches, surf culture and vibrant coastal nightlife",
      featured: true,
    },
    {
      name: "Lake District",
      region: "Cumbria",
      propertyCount: 9,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-lake-distric-a860a2c4-20251018180043.jpg",
      slug: "lake-district",
      description: "Scenic lakes and mountains perfect for luxury retreat weekends",
      featured: true,
    },
    {
      name: "York",
      region: "North Yorkshire",
      propertyCount: 12,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-uk%2c-m-7d6cc34e-20251018100412.jpg",
      slug: "york",
      description: "Medieval city with cobbled streets, historic walls and charming riverside pubs",
      featured: false,
    },
    {
      name: "Bournemouth",
      region: "Dorset",
      propertyCount: 14,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--f4900618-20251018100420.jpg",
      slug: "bournemouth",
      description: "Beautiful beaches, vibrant nightlife and stunning coastal walks",
      featured: false,
    },
    {
      name: "Liverpool",
      region: "Merseyside",
      propertyCount: 16,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-liverpool-uk-4dd6a7d5-20251018100435.jpg",
      slug: "liverpool",
      description: "Cultural hub with iconic waterfront, Beatles heritage and vibrant nightlife",
      featured: false,
    },
    {
      name: "Bristol",
      region: "South West England",
      propertyCount: 11,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bristol-uk-h-41be7939-20251018100453.jpg",
      slug: "bristol",
      description: "Creative city with harbour life, street art and amazing food scene",
      featured: false,
    },
    {
      name: "Newcastle",
      region: "Tyne and Wear",
      propertyCount: 9,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-uk-a7d70fdf-20251018100503.jpg",
      slug: "newcastle",
      description: "Friendly northern city famous for nightlife and stunning quayside",
      featured: false,
    },
    {
      name: "Cambridge",
      region: "Cambridgeshire",
      propertyCount: 8,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cambridge-uk-4a05d130-20251018100510.jpg",
      slug: "cambridge",
      description: "Historic university city with punting, beautiful colleges and riverside pubs",
      featured: false,
    },
    {
      name: "Oxford",
      region: "Oxfordshire",
      propertyCount: 7,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-oxford-uk%2c-c49c256a-20251018100521.jpg",
      slug: "oxford",
      description: "Stunning university city with historic architecture and charming streets",
      featured: false,
    },
    {
      name: "Leeds",
      region: "West Yorkshire",
      propertyCount: 12,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-leeds-uk-cit-d85d4919-20251018100537.jpg",
      slug: "leeds",
      description: "Energetic city with fantastic shopping, dining and buzzing nightlife",
      featured: false,
    },
    {
      name: "Nottingham",
      region: "Nottinghamshire",
      propertyCount: 9,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-nottingham-u-4740c95f-20251018100547.jpg",
      slug: "nottingham",
      description: "Historic city with Robin Hood legend, caves and vibrant student scene",
      featured: false,
    },
    {
      name: "Birmingham",
      region: "West Midlands",
      propertyCount: 14,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-birmingham-u-99ad4012-20251018100557.jpg",
      slug: "birmingham",
      description: "Dynamic city with canal network, Michelin dining and diverse culture",
      featured: false,
    },
    {
      name: "Sheffield",
      region: "South Yorkshire",
      propertyCount: 8,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-sheffield%2c-2b51ddd4-20251018103602.jpg",
      slug: "sheffield",
      description: "Industrial heritage meets modern nightlife with fantastic live music venues",
      featured: false,
    },
    {
      name: "Exeter",
      region: "Devon",
      propertyCount: 6,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-exeter%2c-uk-32d01645-20251018103610.jpg",
      slug: "exeter",
      description: "Historic cathedral city with Roman walls, riverside dining and coastal access",
      featured: false,
    },
    {
      name: "Chester",
      region: "Cheshire",
      propertyCount: 7,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-chester%2c-u-2fa11484-20251018103617.jpg",
      slug: "chester",
      description: "Roman city with ancient walls, Tudor buildings and boutique shopping",
      featured: false,
    },
    {
      name: "Durham",
      region: "County Durham",
      propertyCount: 6,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-durham%2c-uk-c4a1b719-20251018103625.jpg",
      slug: "durham",
      description: "World Heritage site with stunning cathedral, castle and riverside walks",
      featured: false,
    },
    {
      name: "Canterbury",
      region: "Kent",
      propertyCount: 5,
      image: "https://v3b.fal.media/files/b/tiger/2bNJn7KNACVIcuVHWsAp-_output.png",
      slug: "canterbury",
      description: "Medieval city with famous cathedral, charming streets and riverside pubs",
      featured: false,
    },
    {
      name: "Blackpool",
      region: "Lancashire",
      propertyCount: 8,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-blackpool%2c-012163d9-20251018103641.jpg",
      slug: "blackpool",
      description: "Classic seaside resort with tower, beaches and legendary nightlife",
      featured: false,
    },
    {
      name: "Cotswolds",
      region: "Gloucestershire",
      propertyCount: 7,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cotswolds%2c-60a2f4ac-20251018180051.jpg",
      slug: "cotswolds",
      description: "Picturesque honey-stone villages with luxury manor houses and boutique charm",
      featured: false,
    },
    {
      name: "Margate",
      region: "Kent",
      propertyCount: 6,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-margate%2c-u-d23f8a09-20251018180059.jpg",
      slug: "margate",
      description: "Trendy seaside town with vintage vibes, art galleries and sandy beaches",
      featured: false,
    },
    {
      name: "Harrogate",
      region: "North Yorkshire",
      propertyCount: 5,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-harrogate%2c-cfa55d27-20251018180105.jpg",
      slug: "harrogate",
      description: "Elegant spa town with Victorian charm, boutique shops and afternoon tea",
      featured: false,
    },
    {
      name: "St Ives",
      region: "Cornwall",
      propertyCount: 4,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-st-ives-corn-c20b8f01-20251018180133.jpg",
      slug: "st-ives",
      description: "Stunning Cornish harbour town with golden beaches and coastal beauty",
      featured: false,
    },
    {
      name: "Windsor",
      region: "Berkshire",
      propertyCount: 5,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-windsor%2c-u-5545ede5-20251018180119.jpg",
      slug: "windsor",
      description: "Royal town with castle views, riverside walks and historic charm",
      featured: false,
    },
    {
      name: "Stratford-upon-Avon",
      region: "Warwickshire",
      propertyCount: 4,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-stratford-up-91d286ca-20251018180126.jpg",
      slug: "stratford-upon-avon",
      description: "Shakespeare's birthplace with Tudor houses and riverside gardens",
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
            <span className="text-sm font-medium">Explore England</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Top Hen Party Destinations in England
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Discover the best cities and towns across England for your hen celebration
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/95 text-[var(--color-text-primary)] text-sm font-medium shadow-lg backdrop-blur-sm">
                    {destination.propertyCount} properties
                  </div>

                  {/* Content with white background */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                      className="text-3xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {destination.name}
                    </h3>
                    <p className="text-sm font-medium mb-3">
                      {destination.region}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {destination.description}
                    </p>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium mb-2">
                      {destination.region}
                    </p>
                    <p className="text-xs font-medium">
                      {destination.propertyCount} properties
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 scroll-reveal" style={{ background: "var(--color-accent-pink)" }}>
        <div className="max-w-full">
          {/* Top Row: Text */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 max-w-[1400px] mx-auto px-6">
            <h2 
              className="text-4xl md:text-5xl m-0" 
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              We're on Instagram
            </h2>
            <a
              href="https://instagram.com/groupescapehouses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              <Instagram className="w-10 h-10" />
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
                "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=90",
              ].map((image, index) => (
                <a
                  key={index}
                  href="https://instagram.com/groupescapehouses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-7 h-7" style={{ color: "var(--color-accent-pink)" }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
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
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
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
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
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
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
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
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "var(--color-accent-sage)",
                  color: "white",
                }}
              >
                <Link href="/properties">Browse Houses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  color: "var(--color-text-primary)",
                }}
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}