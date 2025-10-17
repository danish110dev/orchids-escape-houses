"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ExperienceDetailPage() {
  const [isEnquiring, setIsEnquiring] = useState(false);

  const experience = {
    title: "Cocktail Masterclass",
    duration: "2 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80",
    description:
      "Get shaking and stirring with a professional mixologist who'll teach your group how to create three delicious cocktails. Perfect for hen parties, this interactive class is full of fun, laughter, and of course, plenty of cocktails to enjoy. All equipment and ingredients are provided.",
    included: [
      "Professional mixologist instructor",
      "All cocktail ingredients and equipment",
      "Learn to make 3 signature cocktails",
      "Recipe cards to take home",
      "Fun cocktail-themed games",
      "Private class at your property",
    ],
    whatToProvide: [
      "Table space for mixing station",
      "Glasses for cocktails (we can provide for a small fee)",
      "Ice and water",
      "Enthusiastic participants!",
    ],
    pricing: [
      { size: "8-12 guests", price: 45 },
      { size: "13-16 guests", price: 42 },
      { size: "17-20 guests", price: 40 },
    ],
  };

  const relatedExperiences = [
    {
      title: "Life Drawing Class",
      duration: "1.5-2 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
      slug: "life-drawing",
    },
    {
      title: "Bottomless Brunch",
      duration: "2 hours",
      priceFrom: 40,
      groupSize: "Any size",
      image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80",
      slug: "bottomless-brunch",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <div className="pt-24">
        {/* Hero Image */}
        <div className="max-w-[1400px] mx-auto px-6 mb-12">
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
            <Image src={experience.image} alt={experience.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {experience.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  About this experience
                </h2>
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  What's included
                </h3>
                <ul className="space-y-4">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Provide */}
              <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  What you need to provide
                </h3>
                <ul className="space-y-4">
                  {experience.whatToProvide.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent-pink)] mt-1">•</span>
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Pricing
                </h3>
                <div className="space-y-4">
                  {experience.pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--color-bg-secondary)]"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[var(--color-accent-sage)]" />
                        <span className="font-medium">{tier.size}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: "var(--color-accent-pink)" }}>
                          £{tier.price}
                        </p>
                        <p className="text-xs text-[var(--color-neutral-dark)]">per person</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-neutral-dark)] mt-6">
                  Prices are per person and include all materials and instruction. Discounts available
                  for larger groups or multiple experiences.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-[var(--color-neutral-dark)] mb-2">From</p>
                  <p className="text-4xl font-bold mb-1" style={{ color: "var(--color-accent-pink)" }}>
                    £{experience.priceFrom}
                  </p>
                  <p className="text-sm text-[var(--color-neutral-dark)]">per person</p>
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-[var(--color-bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--color-accent-sage)]" />
                    <span className="text-sm">{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[var(--color-accent-sage)]" />
                    <span className="text-sm">{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--color-accent-sage)]" />
                    <span className="text-sm">Available weekends and midweek</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full rounded-2xl py-6 text-base font-medium mb-4"
                  style={{
                    background: "var(--color-accent-pink)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <Link href="/contact">Add to Enquiry</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 text-base font-medium"
                  asChild
                >
                  <Link href="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Link>
                </Button>

                <p className="text-xs text-center text-[var(--color-neutral-dark)] mt-6">
                  Book alongside your property for the best rates. Our team will confirm availability
                  and pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Related Experiences */}
          <div className="mt-24">
            <h3 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
              You might also like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedExperiences.map((exp) => (
                <ExperienceCard key={exp.slug} {...exp} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}