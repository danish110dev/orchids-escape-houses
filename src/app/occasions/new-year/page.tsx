"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartyPopper, Music, Waves, Sparkles, Check } from "lucide-react";

export default function NewYearPage() {
  const features = [
    "Hot tubs, sound systems, and games rooms",
    "Optional catering or bar service",
    "Late checkout available",
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
          >
            <img
              src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1600&q=80"
              alt="Fireworks and champagne toast celebration"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 
                className="text-white mb-2" 
                style={{ fontFamily: "var(--font-display)" }}
              >
                New Year Breaks
              </h1>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2"
            >
              <p className="text-xl text-[var(--color-neutral-dark)] mb-8 leading-relaxed">
                Ring in the New Year in total comfort and style. Whether you're hosting a party or escaping for a peaceful weekend, our homes are made for celebration, relaxation, and unforgettable memories.
              </p>

              <h3 className="mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-body)" }}>
                <Sparkles className="w-6 h-6 text-[var(--color-accent-gold)]" />
                What's Included
              </h3>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--color-accent-sage)] bg-opacity-20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-[var(--color-accent-sage)]" />
                    </div>
                    <p className="text-[var(--color-neutral-dark)]">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl px-8 py-6 font-medium transition-all duration-300 hover:scale-[1.02]"
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
                  className="rounded-2xl px-8 py-6 font-medium border-2"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <Link href="/contact">Get Instant Quote</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sidebar Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <PartyPopper className="w-8 h-8 text-[var(--color-accent-sage)] mb-3" />
                <h4 className="font-semibold mb-2">Party Ready</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  Perfect spaces for New Year celebrations
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <Music className="w-8 h-8 text-[var(--color-accent-gold)] mb-3" />
                <h4 className="font-semibold mb-2">Sound Systems</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  Entertainment systems included
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <Waves className="w-8 h-8 text-[var(--color-accent-sage)] mb-3" />
                <h4 className="font-semibold mb-2">Hot Tubs</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  Relax and celebrate in style
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}