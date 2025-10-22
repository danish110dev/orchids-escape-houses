"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Home as HomeIcon, Sparkles, CreditCard, PartyPopper, Shield, Users, Award, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ExperienceCard from "@/components/ExperienceCard";
import ReviewSlider from "@/components/ReviewSlider";
import FAQSection from "@/components/FAQSection";
import LoadingScreen from "@/components/LoadingScreen";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Luxury Hen Party Houses UK with Hot Tubs & Pools | Group Escape Houses",
  description: "Book luxury hen party houses across the UK. Large group accommodation with hot tubs, pools & games rooms. Perfect for celebrations. Instant enquiry & 3,000+ 5-star reviews.",
  keywords: ["hen party houses UK", "luxury group accommodation", "houses with hot tubs", "party houses with pools", "hen weekend houses", "celebration accommodation"],
  openGraph: {
    title: "Luxury Hen Party Houses UK | Group Escape Houses",
    description: "Book luxury hen party houses with hot tubs, pools & games rooms. Perfect for celebrations across the UK.",
    url: "https://groupescapehouses.co.uk",
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Intersection Observer for scroll animations
  useEffect(() => {
    setMounted(true);
    
    // Wait for loading screen to complete
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

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
      clearTimeout(loadingTimer);
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
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
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
    { name: "London", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-london-citysc-8f325788-20251019170619.jpg?" },
    { name: "Brighton", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/wide-angle-photograph-of-brighton-seafro-11bd7734-20251017161212.jpg" },
    { name: "Bath", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/historic-bath-city-center-photograph%2c--eef16b18-20251017161220.jpg" },
    { name: "Manchester", image: "https://v3b.fal.media/files/b/tiger/TnJnPy7geHZHAjOwxZKxO_output.png" },
    { name: "Newquay", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newquay-beach-1b9fbe44-20251019170627.jpg?" },
    { name: "Liverpool", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  ];

  return (
    <div className="min-h-screen">
      <StructuredData type="home" />
      <LoadingScreen />
      <Header />

      {/* Hero Section - Improved Responsive Design */}
      <section className="relative min-h-[100vh] md:min-h-screen flex items-center justify-center overflow-hidden">
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

        {/* Content - Improved Mobile Layout */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <h1
            className="mb-4 sm:mb-6 animate-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            Luxury Party Houses UK with Hot Tubs & Pools
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-up px-4"
            style={{
              color: "var(--color-neutral-dark)",
              animationDelay: "100ms",
            }}
          >
            Book party houses for groups across the UK. Perfect <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebration accommodation</Link> with hot tubs, games rooms, and unforgettable <Link href="/experiences" className="underline hover:text-[var(--color-accent-gold)] transition-colors">experiences</Link>.
          </p>

          {/* CTA Buttons - Better Mobile Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up max-w-md sm:max-w-none mx-auto px-4" style={{ animationDelay: "200ms" }}>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium transition-all duration-200 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
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
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)] w-full sm:w-auto"
              style={{
                borderColor: "var(--color-accent-gold)",
                color: "var(--color-text-primary)",
              }}
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '0ms' }}>
                <Shield className="w-8 h-8 text-[var(--color-accent-sage)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-[var(--color-neutral-dark)]">Protected payments via Stripe. Your booking is safe with us.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-gold)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '300ms' }}>
                <Award className="w-8 h-8 text-[var(--color-accent-gold)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3,000+ 5-Star Reviews</h3>
              <p className="text-[var(--color-neutral-dark)]">Trusted by thousands of happy guests across the UK.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-pink)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '600ms' }}>
                <Users className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--color-accent-pink)" }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">UK Support Team</h3>
              <p className="text-[var(--color-neutral-dark)]">Brighton-based team ready to help plan your perfect stay.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '900ms' }}>
                <Clock className="w-8 h-8 text-[var(--color-accent-sage)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24-Hour Response</h3>
              <p className="text-[var(--color-neutral-dark)]">Fast replies to all enquiries. No waiting around.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Why Choose Group Escape Houses?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
              We're the UK's leading provider of luxury group accommodation for hen parties, celebrations, and special occasions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="group relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-5">
                  <HomeIcon className="w-7 h-7 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Handpicked Properties
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-lg leading-relaxed">
                Every house in our collection is personally inspected and verified. We only feature properties with exceptional facilities including <Link href="/features/hot-tub" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">hot tubs</Link>, <Link href="/features/swimming-pool" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">pools</Link>, <Link href="/features/games-room" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">games rooms</Link>, and luxury amenities perfect for group celebrations.
              </p>
            </div>

            <div className="group relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-5">
                  <Sparkles className="w-7 h-7 text-[var(--color-accent-gold)]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Complete Party Planning
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-lg leading-relaxed">
                From <Link href="/experiences" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">cocktail masterclasses</Link> to <Link href="/experiences/private-chef" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">private chefs</Link> and <Link href="/experiences/spa-treatments" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">spa treatments</Link>, we handle all the details so you can focus on celebrating. Our UK team manages everything from booking to check-out.
              </p>
            </div>

            <div className="group relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-5">
                  <Users className="w-7 h-7 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Flexible Group Sizes
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-lg leading-relaxed">
                Whether you're a group of 8 close friends or 30+ guests, we have the perfect property. All our <Link href="/properties" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">party houses</Link> are designed for large groups with multiple bedrooms, spacious living areas, and entertainment facilities.
              </p>
            </div>

            <div className="group relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-5">
                  <HomeIcon className="w-7 h-7 text-[var(--color-accent-gold)]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  UK-Wide Coverage
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-lg leading-relaxed">
                Properties across all major UK destinations including <Link href="/destinations/brighton" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">Brighton</Link>, <Link href="/destinations/bath" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">Bath</Link>, <Link href="/destinations/manchester" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">Manchester</Link>, <Link href="/destinations/london" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted underline-offset-4">London</Link>, and more. Every location offers great nightlife, restaurants, and attractions for your celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties - Improved Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              Featured Party Houses
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-4xl mx-auto px-4">
              Handpicked <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury party houses</Link> perfect for <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebrations across the UK</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
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

      {/* Service Areas Section */}
      <section className="py-20 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Luxury Group Accommodation Across the UK
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto">
              We specialise in providing premium party houses and large group accommodation across England, Scotland, and Wales
            </p>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto text-[var(--color-neutral-dark)]">
            <p className="text-center leading-relaxed">
              Group Escape Houses offers an exclusive collection of <strong>luxury hen party houses</strong>, <strong>large holiday homes</strong>, and <strong>celebration accommodation</strong> throughout the United Kingdom. Our properties are located in the country's most popular destinations for group getaways, including coastal towns, vibrant cities, and stunning countryside locations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 not-prose">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">South England</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/brighton" className="hover:text-[var(--color-accent-gold)]">Brighton & Hove</Link></li>
                  <li><Link href="/destinations/bath" className="hover:text-[var(--color-accent-gold)]">Bath & Somerset</Link></li>
                  <li><Link href="/destinations/bournemouth" className="hover:text-[var(--color-accent-gold)]">Bournemouth & Dorset</Link></li>
                  <li><Link href="/destinations/london" className="hover:text-[var(--color-accent-gold)]">London & South East</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">North England</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/manchester" className="hover:text-[var(--color-accent-gold)]">Manchester & Lancashire</Link></li>
                  <li><Link href="/destinations/liverpool" className="hover:text-[var(--color-accent-gold)]">Liverpool & Merseyside</Link></li>
                  <li><Link href="/destinations/york" className="hover:text-[var(--color-accent-gold)]">York & Yorkshire</Link></li>
                  <li><Link href="/destinations/newcastle" className="hover:text-[var(--color-accent-gold)]">Newcastle & North East</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">Wales & Scotland</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/cardiff" className="hover:text-[var(--color-accent-gold)]">Cardiff & South Wales</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Scottish Highlands</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Edinburgh & Lowlands</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Snowdonia & North Wales</Link></li>
                </ul>
              </div>
            </div>

            <p className="text-center mt-8 leading-relaxed">
              All our properties feature essential amenities for group celebrations including fully equipped kitchens, spacious living areas, outdoor spaces, parking, and high-speed Wi-Fi. Most houses include luxury additions such as <strong>hot tubs</strong>, <strong>swimming pools</strong>, <strong>games rooms with pool tables and table tennis</strong>, <strong>cinema rooms</strong>, and <strong>BBQ areas</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences - Better Mobile Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-[42px] px-4" style={{ fontFamily: "var(--font-display)" }}>
              Make your celebration weekend extra special with curated activities and experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.slug} {...experience} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
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

      {/* How It Works - Better Mobile Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              How to Book Your Party House
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Four simple steps to your perfect <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">UK group celebration</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
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
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-float"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                      animationDelay: `${parseInt(item.step) * 100}ms`,
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--color-neutral-dark)]">{item.description}</p>
                  {item.step !== "4" && (
                    <ArrowRight className="hidden lg:block absolute top-8 sm:top-10 -right-4 w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-accent-gold)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations - Improved Grid Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              Top UK Destinations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Discover <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">party houses with hot tubs</Link> across the UK's best locations
            </p>
          </div>

          {/* Improved Grid: 2 cols mobile, 3 cols tablet, 3 cols desktop for balanced 2x3 layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/90 backdrop-blur-sm">
                  <h3
                    className="text-sm sm:text-base md:text-lg font-semibold text-[var(--color-text-primary)] leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {destination.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/destinations">View All Locations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)] w-full sm:w-auto"
              style={{
                borderColor: "var(--color-accent-gold)",
                color: "var(--color-text-primary)",
              }}
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              What Our Guests Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Join thousands of happy <Link href="/reviews" className="underline hover:text-[var(--color-accent-gold)] transition-colors">5-star celebrations</Link>
            </p>
          </div>

          <ReviewSlider reviews={reviews} />
        </div>
      </section>

      {/* Instagram Section - Better Mobile Layout */}
      <section className="py-12 sm:py-16 md:py-20 scroll-reveal" style={{ background: "var(--color-accent-pink)" }}>
        <div className="max-w-full">
          {/* Top Row: Text - Better Mobile Spacing */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12 gap-3 sm:gap-4 max-w-[1400px] mx-auto px-4 sm:px-6">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-0 text-center md:text-left" 
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              We're on Instagram
            </h2>
            <a
              href="https://www.instagram.com/groupescapehouses?igsh=cnh5emtidjR0cnB5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              @groupescapehouses
            </a>
          </div>

          {/* Bottom Row: Photo Strip - Auto-scrolling on desktop, swipeable on mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 animate-slide-left">
              {/* First set of images */}
              {[
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-p-1043bcfc-20251018173502.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-i-de445ee3-20251018173511.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-fb4c6ff3-20251018173520.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-elegant-ou-0244cbf2-20251018173528.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-h-812ddd27-20251018173536.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-360aceae-20251018171413.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-a-34a56fe6-20251018171423.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-99493a7b-20251018171430.jpg?",
              ].map((image, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/groupescapehouses?igsh=cnh5emtidjR0cnB5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "var(--color-accent-pink)" }} />
                    </div>
                  </div>
                </a>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-p-1043bcfc-20251018173502.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-i-de445ee3-20251018173511.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-fb4c6ff3-20251018173520.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-elegant-ou-0244cbf2-20251018173528.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-h-812ddd27-20251018173536.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-360aceae-20251018171413.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-a-34a56fe6-20251018171423.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-99493a7b-20251018171430.jpg?",
              ].map((image, index) => (
                <a
                  key={`duplicate-${index}`}
                  href="https://www.instagram.com/groupescapehouses?igsh=cnh5emtidjR0cnB5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "var(--color-accent-pink)" }} />
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

      {/* Email Capture - Better Mobile Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
            Get Party Planning Tips
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] mb-6 sm:mb-8">
            Subscribe for exclusive deals, house spotlights, and planning inspiration delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-5 sm:py-6 rounded-xl text-base"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-xl px-8 sm:px-10 py-5 sm:py-6 font-medium w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs sm:text-sm text-[var(--color-neutral-dark)] mt-3 sm:mt-4">
            We respect your privacy. Unsubscribe anytime. Read our <Link href="/privacy" className="underline hover:text-[var(--color-accent-gold)] transition-colors">privacy policy</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}