"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Award, Shield, PhoneCall, ArrowRight, Instagram, Home as HomeIcon, Sparkles, CreditCard, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ExperienceCard from "@/components/ExperienceCard";
import ReviewSlider from "@/components/ReviewSlider";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    setMounted(true);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const featuredProperties = [
    {
      id: "1",
      title: "The Brighton Manor",
      location: "Brighton, East Sussex",
      sleeps: 16,
      bedrooms: 8,
      priceFrom: 89,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-b6c21bf3-20251018131712.jpg",
      features: ["Hot Tub", "Pool"],
      slug: "brighton-manor",
    },
    {
      id: "2",
      title: "Bath Spa Retreat",
      location: "Bath, Somerset",
      sleeps: 20,
      bedrooms: 10,
      priceFrom: 95,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-71429268-20251018131719.jpg",
      features: ["Games Room", "Cinema"],
      slug: "bath-spa-retreat",
    },
    {
      id: "3",
      title: "Manchester Party House",
      location: "Manchester, Greater Manchester",
      sleeps: 14,
      bedrooms: 7,
      priceFrom: 79,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-303caf30-20251018131730.jpg",
      features: ["Hot Tub", "BBQ"],
      slug: "manchester-party-house",
    },
  ];

  const experiences = [
    {
      title: "Private Chef Experience",
      duration: "3-4 hours",
      priceFrom: 55,
      groupSize: "Any size",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
      slug: "private-chef",
    },
    {
      title: "Cocktail Masterclass",
      duration: "2-3 hours",
      priceFrom: 50,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cocktail-mas-9a8fa570-20251018105410.jpg?",
      slug: "cocktail-masterclass",
    },
    {
      title: "Spa & Treatments",
      duration: "2-3 hours",
      priceFrom: 75,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-c9c6358b-20251018123402.jpg?",
      slug: "spa-treatments",
    },
    {
      title: "Pamper Party",
      duration: "2-3 hours",
      priceFrom: 65,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-pamper-party-b3bca2c7-20251018123229.jpg?",
      slug: "pamper-party",
    },
    {
      title: "Yoga & Wellness Class",
      duration: "1.5-2 hours",
      priceFrom: 40,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-yoga-class-i-48b5a9ef-20251018105055.jpg",
      slug: "yoga-class",
    },
    {
      title: "Murder Mystery Night",
      duration: "3-4 hours",
      priceFrom: 50,
      groupSize: "10-30 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-murder-myste-09ddcc62-20251018105103.jpg",
      slug: "murder-mystery",
    },
  ];

  const reviews = [
    {
      name: "Sophie M",
      rating: 5,
      comment: "Absolutely incredible weekend! The house was stunning, hot tub was perfect, and the cocktail class was so much fun. Can't recommend enough for hen parties!",
      date: "January 2025",
      property: "Brighton Manor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Emma L",
      rating: 5,
      comment: "Best hen do ever! The team were so helpful from start to finish. The house had everything we needed and more. The private chef was a lovely touch!",
      date: "December 2024",
      property: "Bath Spa Retreat",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
    {
      name: "Rachel K",
      rating: 5,
      comment: "Planning was so easy and the house exceeded expectations. Games room kept us entertained for hours. Would definitely book again!",
      date: "November 2024",
      property: "Manchester Party House",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    },
    {
      name: "Lucy T",
      rating: 5,
      comment: "The perfect hen weekend venue. Beautiful house, great location, and the add-on experiences made it extra special. Highly recommend!",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    },
    {
      name: "Hannah P",
      rating: 5,
      comment: "Fantastic service from booking to checkout. The house was immaculate and had all the facilities we needed. Will be back!",
      date: "September 2024",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    },
    {
      name: "Olivia S",
      rating: 5,
      comment: "Could not fault anything. The house was gorgeous, pool was amazing, and the whole experience was seamless. Thank you!",
      date: "August 2024",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    },
  ];

  const destinations = [
    { name: "Brighton", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/wide-angle-photograph-of-brighton-seafro-11bd7734-20251017161212.jpg" },
    { name: "Bath", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/historic-bath-city-center-photograph%2c--eef16b18-20251017161220.jpg" },
    { name: "Manchester", image: "https://v3b.fal.media/files/b/tiger/TnJnPy7geHZHAjOwxZKxO_output.png" },
    { name: "York", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/historic-york-city-photograph%2c-medieva-87040b2f-20251017161235.jpg" },
    { name: "Bournemouth", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/bournemouth-beach-photograph%2c-golden-s-804727ac-20251017161243.jpg" },
    { name: "Cardiff", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/cardiff-city-center-photograph%2c-iconic-caf939c9-20251017161252.jpg" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video with parallax effect */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
          }}
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-shot-slowly-appro-67258827-20251017160648.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)]/80 to-[var(--color-bg-secondary)]/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <h1
            className="mb-6 animate-fade-up"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            Luxury Party Houses UK with Hot Tubs & Pools
          </h1>
          <p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-up"
            style={{
              color: "var(--color-neutral-dark)",
              animationDelay: "100ms",
            }}
          >
            Book party houses for groups across the UK. Perfect <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebration accommodation</Link> with hot tubs, games rooms, and unforgettable <Link href="/experiences" className="underline hover:text-[var(--color-accent-gold)] transition-colors">experiences</Link>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 text-lg font-medium transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
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
              className="rounded-2xl px-10 py-6 text-lg font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
              style={{
                borderColor: "var(--color-accent-gold)",
                color: "var(--color-text-primary)",
              }}
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-dark)]" />
                  <Input
                    type="text"
                    placeholder="Search by location or features..."
                    className="pl-12 py-6 rounded-xl border-0 text-base"
                  />
                </div>
                <Button
                  size="lg"
                  className="rounded-xl px-8 font-medium"
                  style={{
                    background: "var(--color-accent-sage)",
                    color: "white",
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-sage)]/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[var(--color-accent-sage)]" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                3,000+
              </h3>
              <p className="text-[var(--color-neutral-dark)]">5-star reviews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-sage)]/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--color-accent-sage)]" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Safe Payments
              </h3>
              <p className="text-[var(--color-neutral-dark)]">Secure booking process</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-8 h-8 text-[var(--color-accent-gold)]" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                UK Support
              </h3>
              <p className="text-[var(--color-neutral-dark)]">Fast response from our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Featured Party Houses
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-4xl mx-auto">
              Handpicked <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury party houses</Link> perfect for <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebrations across the UK</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Make your celebration weekend extra special with curated activities and experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.slug} {...experience} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/experiences">Explore All Experiences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              How to Book Your Party House
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Four simple steps to your perfect <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">UK group celebration</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose House",
                description: "Browse our luxury properties and find your perfect match for your celebration or group gathering",
                icon: HomeIcon,
              },
              {
                step: "2",
                title: "Add Experiences",
                description: "Select from cocktail classes, butlers, spa treatments and more to enhance your weekend",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Pay Deposit",
                description: "Secure your booking with a simple deposit payment via our safe payment system",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Final Balance",
                description: "Pay the remaining balance before your stay and enjoy your unforgettable celebration!",
                icon: PartyPopper,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center relative group">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-float"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                      animationDelay: `${parseInt(item.step) * 100}ms`,
                    }}
                  >
                    <Icon className="w-10 h-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)]">{item.description}</p>
                  {item.step !== "4" && (
                    <ArrowRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-[var(--color-accent-gold)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Popular UK Destinations
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Discover <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">party houses with hot tubs</Link> across the UK's best cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={`/destinations/${destination.name.toLowerCase()}`}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm">
                  <h3
                    className="text-xl font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {destination.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-sage)] hover:text-white hover:border-[var(--color-accent-sage)]"
              style={{
                borderColor: "var(--color-accent-sage)",
                color: "var(--color-text-primary)",
              }}
            >
              <Link href="/destinations">View More Locations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: "var(--color-accent-gold)",
                color: "white",
              }}
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              What Our Guests Say
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Join thousands of happy <Link href="/reviews" className="underline hover:text-[var(--color-accent-gold)] transition-colors">5-star celebrations</Link>
            </p>
          </div>

          <ReviewSlider reviews={reviews} />
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text Content */}
            <div>
              <p className="text-sm uppercase tracking-wider mb-3" style={{ color: "var(--color-accent-gold)" }}>
                Social Presence
              </p>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Follow Us on Instagram
              </h2>
              <p className="text-[var(--color-neutral-dark)] mb-6 leading-relaxed">
                See real celebrations, house tours, and party inspiration from our community. Tag us in your events for a chance to be featured!
              </p>
              <a
                href="https://instagram.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-accent-gold)", fontFamily: "var(--font-display)" }}
              >
                <Instagram className="w-7 h-7" />
                @groupescapehouses
              </a>
            </div>

            {/* Right: Instagram Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
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
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-7 h-7 text-[var(--color-accent-sage)]" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Email Capture */}
      <section className="py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Get Party Planning Tips
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] mb-8">
            Subscribe for exclusive deals, house spotlights, and planning inspiration delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-6 rounded-xl text-base"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-xl px-10 py-6 font-medium"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-[var(--color-neutral-dark)] mt-4">
            We respect your privacy. Unsubscribe anytime. Read our <Link href="/privacy" className="underline hover:text-[var(--color-accent-gold)] transition-colors">privacy policy</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}