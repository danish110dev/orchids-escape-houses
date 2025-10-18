"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Sparkles, 
  Heart, 
  Church, 
  TreePine, 
  PartyPopper, 
  Egg,
  Calendar,
  ArrowRight 
} from "lucide-react";

export default function OccasionsPage() {
  const occasions = [
    {
      title: "Special Celebrations",
      slug: "special-celebrations",
      icon: Sparkles,
      description: "Birthdays, anniversaries, and milestone moments",
    },
    {
      title: "Hen Party Houses",
      slug: "hen-party-houses",
      icon: Heart,
      description: "Luxury houses perfect for hen weekends",
    },
    {
      title: "Weddings",
      slug: "weddings",
      icon: Church,
      description: "Intimate ceremonies and weekend celebrations",
    },
    {
      title: "Christmas",
      slug: "christmas",
      icon: TreePine,
      description: "Festive stays and family gatherings",
    },
    {
      title: "New Year",
      slug: "new-year",
      icon: PartyPopper,
      description: "Ring in the New Year in style",
    },
    {
      title: "Easter",
      slug: "easter",
      icon: Egg,
      description: "Springtime family escapes",
    },
    {
      title: "Weekend Breaks",
      slug: "weekend-breaks",
      icon: Calendar,
      description: "Short luxury getaways",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                  alt="Luxury celebration gathering"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Title and Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 
                className="mb-6" 
                style={{ fontFamily: "var(--font-display)" }}
              >
                OCCASIONS
              </h1>
              
              <p className="text-lg text-[var(--color-neutral-dark)] mb-8 leading-relaxed">
                Discover our collection of luxury houses for every special moment. Whether you're celebrating a milestone, hosting a hen weekend, or enjoying a festive break, our properties are designed for unforgettable experiences in the UK's most beautiful locations.
              </p>

              {/* Occasions Links */}
              <div className="space-y-3">
                {occasions.map((occasion, index) => {
                  const Icon = occasion.icon;
                  return (
                    <motion.div
                      key={occasion.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    >
                      <Link
                        href={`/occasions/${occasion.slug}`}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-[var(--color-bg-secondary)] transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] bg-opacity-10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[var(--color-accent-sage)]" />
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--color-text-primary)]">
                              {occasion.title}
                            </span>
                            <p className="text-sm text-[var(--color-neutral-dark)]">
                              {occasion.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[var(--color-accent-gold)] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}