"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import EnquiryForm from "@/components/EnquiryForm";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Bed,
  Bath,
  MapPin,
  Wifi,
  Car,
  Flame,
  Waves,
  Music,
  ChefHat,
  Download,
  Share2,
  Heart,
  Calendar,
} from "lucide-react";

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const property = {
    title: "The Brighton Manor",
    location: "Brighton, East Sussex",
    sleeps: 16,
    bedrooms: 8,
    bathrooms: 6,
    priceWeekend: 1200,
    priceMidweek: 950,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    ],
    description:
      "A stunning Georgian manor house in the heart of Brighton, perfect for unforgettable hen celebrations. This luxurious property features a private hot tub, heated indoor pool, games room with pool table, and beautifully landscaped gardens. With 8 spacious bedrooms and 6 modern bathrooms, there's plenty of room for your whole group to relax in style.",
    features: [
      { icon: Waves, label: "Hot Tub" },
      { icon: Waves, label: "Indoor Pool" },
      { icon: Music, label: "Games Room" },
      { icon: Wifi, label: "Fast Wi-Fi" },
      { icon: Car, label: "Free Parking" },
      { icon: Flame, label: "BBQ Area" },
      { icon: ChefHat, label: "Gourmet Kitchen" },
      { icon: Music, label: "Sound System" },
    ],
    houseRules: [
      "Check-in: 4pm",
      "Check-out: 10am",
      "No smoking inside",
      "Quiet hours: 11pm - 8am",
      "Maximum occupancy: 16 guests",
      "Damage deposit: £500 (refundable)",
    ],
  };

  const relatedProperties = [
    {
      id: "2",
      title: "Bath Spa Retreat",
      location: "Bath, Somerset",
      sleeps: 20,
      bedrooms: 10,
      priceFrom: 95,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      features: ["Hot Tub", "BBQ"],
      slug: "manchester-party-house",
    },
  ];

  const faqs = [
    {
      question: "What is included in the price?",
      answer:
        "The price includes full use of the property and all facilities including hot tub, pool, games room, and all utilities. Bedding and towels are provided. Additional cleaning during your stay can be arranged for an extra fee.",
    },
    {
      question: "How do deposits and payments work?",
      answer:
        "A 25% deposit is required to secure your booking. The remaining balance is due 6 weeks before your arrival. A refundable damage deposit of £500 is also required.",
    },
    {
      question: "Can we bring pets?",
      answer:
        "Unfortunately, pets are not permitted at this property. Please check our other listings for pet-friendly options.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, there is free private parking for up to 6 cars on the property. Additional street parking is available nearby.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <div className="pt-24">
        {/* Image Gallery */}
        <div className="max-w-[1400px] mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-[190px] md:h-[290px] cursor-pointer">
                  <Image
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    fill
                    className="object-cover hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentImageIndex(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Title and Location */}
              <div className="mb-8">
                <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-lg text-[var(--color-neutral-dark)] mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Fast Facts */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Fast Facts
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-[var(--color-accent-pink)]" />
                    <p className="text-2xl font-bold">{property.sleeps}</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Sleeps</p>
                  </div>
                  <div className="text-center">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-[var(--color-accent-sage)]" />
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-[var(--color-accent-gold)]" />
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-[var(--color-accent-pink)]" />
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Night min</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-bg-secondary)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-neutral-dark)] mb-1">Weekend from</p>
                      <p className="text-3xl font-bold" style={{ color: "var(--color-accent-pink)" }}>
                        £{property.priceWeekend}
                      </p>
                      <p className="text-xs text-[var(--color-neutral-dark)]">
                        Split from £{Math.round(property.priceWeekend / property.sleeps)} per guest
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-neutral-dark)] mb-1">Midweek from</p>
                      <p className="text-3xl font-bold" style={{ color: "var(--color-accent-sage)" }}>
                        £{property.priceMidweek}
                      </p>
                      <p className="text-xs text-[var(--color-neutral-dark)]">
                        Split from £{Math.round(property.priceMidweek / property.sleeps)} per guest
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  About this property
                </h3>
                <p className="text-[var(--color-neutral-dark)] leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {property.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="text-center">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{ background: "var(--color-accent-pink)/20" }}
                        >
                          <Icon className="w-8 h-8" style={{ color: "var(--color-accent-pink)" }} />
                        </div>
                        <p className="text-sm font-medium">{feature.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-bg-secondary)]">
                  <Button variant="outline" className="rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Download Floorplan
                  </Button>
                </div>
              </div>

              {/* House Rules */}
              <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  House Rules
                </h3>
                <ul className="space-y-3">
                  {property.houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent-pink)] mt-1">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Frequently Asked Questions
                </h3>
                <FAQAccordion faqs={faqs} />
              </div>
            </div>

            {/* Right Column - Enquiry Form */}
            <div className="lg:col-span-1">
              <EnquiryForm propertyTitle={property.title} propertySlug="brighton-manor" />
            </div>
          </div>

          {/* Related Properties */}
          <div className="mt-24">
            <h3 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Similar Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 z-40 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-neutral-dark)]">From</p>
            <p className="text-2xl font-bold" style={{ color: "var(--color-accent-pink)" }}>
              £{property.priceMidweek}
            </p>
          </div>
          <Button
            asChild
            className="rounded-2xl px-8 py-6 font-medium"
            style={{
              background: "var(--color-accent-pink)",
              color: "var(--color-text-primary)",
            }}
          >
            <a href="#enquiry">Enquire Now</a>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}