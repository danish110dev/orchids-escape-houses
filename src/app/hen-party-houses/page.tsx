"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  Sparkles, 
  Wine, 
  Music, 
  Camera, 
  Crown, 
  Check, 
  ArrowRight, 
  Waves, 
  Gamepad2, 
  Star,
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";

export default function HenPartyHousesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    "Hot tubs, swimming pools, and games rooms for non-stop fun",
    "Add-on experiences: cocktail masterclass, butlers, or pamper sessions",
    "Stylish interiors perfect for Instagram-worthy photos",
    "Spacious communal areas for group activities and celebrations",
    "Bride stays free on qualifying bookings (10+ guests)",
    "24/7 UK support team for any last-minute requests"
  ];

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
      title: "Cocktail Masterclass",
      duration: "2-3 hours",
      priceFrom: 50,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cocktail-mas-9a8fa570-20251018105410.jpg",
      slug: "cocktail-masterclass",
    },
    {
      title: "Spa & Treatments",
      duration: "2-3 hours",
      priceFrom: 75,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-c9c6358b-20251018123402.jpg",
      slug: "spa-treatments",
    },
    {
      title: "Pamper Party",
      duration: "2-3 hours",
      priceFrom: 65,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-pamper-party-b3bca2c7-20251018123229.jpg",
      slug: "pamper-party",
    },
  ];

  const henFeatures = [
    {
      icon: Crown,
      title: "Made for Hen Parties",
      description: "Spacious houses designed for groups, with open-plan living for socialising and private rooms for everyone."
    },
    {
      icon: Wine,
      title: "Hot Tubs & Pools",
      description: "Relax and unwind with luxury amenities including hot tubs, swimming pools, and beautiful outdoor spaces."
    },
    {
      icon: Music,
      title: "Entertainment Spaces",
      description: "Games rooms, cinemas, sound systems, and party-ready spaces to keep the celebrations going."
    },
    {
      icon: Camera,
      title: "Instagram-Worthy",
      description: "Beautiful interiors and stunning locations perfect for creating unforgettable memories and photos."
    },
    {
      icon: Sparkles,
      title: "Add Experiences",
      description: "Enhance your weekend with cocktail classes, spa treatments, private chefs, and more curated activities."
    },
    {
      icon: Heart,
      title: "Bride Stays Free",
      description: "Exclusive offer: On all hen party bookings of 10 or more guests, the bride stays completely free!"
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=90",
      alt: "Group of women celebrating hen party by hot tub with champagne"
    },
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90",
      alt: "Luxury hot tub with champagne glasses for hen celebration"
    },
    {
      url: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=1600&q=90",
      alt: "Friends celebrating hen party weekend together"
    },
    {
      url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1600&q=90",
      alt: "Stylish hen party decorations and celebration setup"
    },
    {
      url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1600&q=90",
      alt: "Girls enjoying cocktails at hen party celebration"
    },
    {
      url: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=1600&q=90",
      alt: "Group photo of hen party weekend celebration"
    }
  ];

  const faqs = [
    {
      question: "Do you really offer a free stay for the bride?",
      answer: "Yes! On all hen party bookings of 10 or more guests, the bride stays completely free. This is automatically applied when you book, making it even more affordable for the whole group."
    },
    {
      question: "What hen party add-ons do you offer?",
      answer: "We offer cocktail masterclasses, butlers in the buff, life drawing sessions, private chefs, spa treatments, and decoration packages. These can all be arranged when you make your booking."
    },
    {
      question: "Are your houses suitable for hen parties?",
      answer: "Our houses are perfect for fun celebrations. Many properties are in secluded locations ideal for groups, while others are central to city nightlife. We'll match you with the right house for your group's vibe."
    },
    {
      question: "Can we sync our calendar or invite guests easily?",
      answer: "Yes, we provide a clear breakdown of costs that's easy to share with your group. Our platform also allows for easy enquiries and direct communication with property owners."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Hen Party Houses", url: "/hen-party-houses" }
          ]
        }}
      />
      <UKServiceSchema type="itemList" data={{ items: featuredProperties }} />
      <UKServiceSchema type="faq" data={{ faqs }} />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=90')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              Hen Party Houses UK
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
              Celebrate the bride-to-be in luxury group accommodation across the UK. Perfect hen do houses with hot tubs, pools, and unforgettable experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105"
                style={{ background: "var(--color-accent-sage)", color: "white" }}
              >
                <Link href="/properties">Browse Hen Houses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-7 text-xl font-bold bg-white/10 backdrop-blur-sm border-2 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Link href="/contact">Check Availability</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Perfect for Hen Weekends
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)]">Everything you need for an unforgettable celebration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {henFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[var(--color-neutral-dark)] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Top Hen Party Houses
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)]">Handpicked luxury properties across the UK.</p>
            </div>
            <Button asChild variant="ghost" className="text-[var(--color-accent-sage)] font-bold text-lg hover:bg-transparent hover:underline p-0">
              <Link href="/properties">View all properties <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Hen Party Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group"
              >
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Hen Party FAQs
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden bg-[var(--color-bg-primary)]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-xl">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="bg-white p-16 rounded-[40px] shadow-xl border border-gray-100">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Ready to plan the perfect Hen Weekend?
            </h2>
            <p className="text-2xl text-[var(--color-neutral-dark)] mb-12 max-w-3xl mx-auto">
              Get in touch today for an instant quote and start planning the ultimate celebration for the bride-to-be.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-12 py-8 text-xl font-bold"
                style={{ background: "var(--color-accent-sage)", color: "white" }}
              >
                <Link href="/contact">Check Availability and Book</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
