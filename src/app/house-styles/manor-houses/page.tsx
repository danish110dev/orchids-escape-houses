"use client";

import Link from "next/link";
import { Check, ArrowRight, Home, Users, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ManorHousesPage() {
  const highlights = [
    "Grand country estates with extensive grounds",
    "Perfect for large celebrations and weddings",
    "Historic architecture and period features",
    "Spacious rooms sleeping 16-30+ guests",
    "Premium amenities including pools and hot tubs"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center text-white">
          <nav className="flex justify-center gap-2 text-sm mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/house-styles-and-features" className="hover:underline">House Styles</Link>
            <span>/</span>
            <span>Manor Houses</span>
          </nav>
          
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)", color: "white" }}>
            Manor Houses to Rent
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Grand country manors for unforgettable group celebrations
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Luxury Manor Houses UK
              </h2>
              <p className="text-lg text-[var(--color-neutral-dark)] mb-8 leading-relaxed">
                Discover our collection of grand manor houses to rent across the UK. These impressive country estates offer the perfect setting for milestone celebrations, hen parties, and large group gatherings. With historic architecture, sprawling grounds, and luxury amenities, our manor houses provide an unforgettable backdrop for your special occasion.
              </p>

              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-body)" }}>
                What to Expect
              </h3>
              <ul className="space-y-3 mb-8">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-neutral-dark)]">{highlight}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 text-white font-medium transition-all duration-200 hover:shadow-lg"
                style={{ background: "var(--color-accent-sage)" }}
              >
                <Link href="/properties">
                  Browse Manor Houses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Right Stats */}
            <div className="space-y-6">
              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <Home className="w-12 h-12 text-[var(--color-accent-sage)] mb-4" />
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Historic Elegance
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Period features and timeless architecture create a truly memorable setting
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <Users className="w-12 h-12 text-[var(--color-accent-gold)] mb-4" />
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  16-30+ Guests
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Spacious accommodation perfect for large groups and celebrations
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <Sparkles className="w-12 h-12 text-[var(--color-accent-sage)] mb-4" />
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Premium Features
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Hot tubs, pools, games rooms, and extensive grounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}