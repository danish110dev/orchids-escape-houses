"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Sparkles, ChefHat, Waves, Heart, Palette, Pizza, Users, Wine, CheckCircle2, MapPin, Utensils, Music, Camera, Flower2, Scissors, Mic2, Gift } from "lucide-react";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";

export default function ExperiencesPage() {
  // Organised by search popularity - most popular first
  const allExperiences = [
    {
      title: "Cocktail Masterclass",
      description: "Learn to shake, stir, and sip like pros with our expert mixologists. Perfect ice-breaker for your group.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cocktail-mas-1a8ca804-20251021222811.jpg",
      icon: Wine,
      category: "fun",
      popular: true,
      slug: "cocktail-masterclass",
      duration: "2 hours",
      priceFrom: 50,
      groupSize: "8-20 guests",
    },
    {
      title: "Private Chef Dining",
      description: "Enjoy a gourmet meal in your own space, cooked by one of our talented local chefs. Perfect for a Friday night feast or Sunday brunch.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-0a38cf4c-20251021222802.jpg",
      icon: ChefHat,
      category: "relaxed",
      popular: true,
      slug: "private-chef",
      duration: "3-4 hours",
      priceFrom: 65,
      groupSize: "8-24 guests",
    },
    {
      title: "Spa Treatments",
      description: "Mobile therapists bring massages, facials, and pamper sessions straight to you. Bliss without leaving the house.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-15d1f1e0-20251021222805.jpg",
      icon: Waves,
      category: "relaxed",
      popular: true,
      slug: "spa-treatments",
      duration: "2-3 hours",
      priceFrom: 75,
      groupSize: "8-20 guests",
    },
    {
      title: "Life Drawing & Cheeky Butlers",
      description: "Add some giggles with a classy-but-fun experience that everyone will remember.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-life-drawing-ec9a158b-20251021222812.jpg",
      icon: Palette,
      category: "fun",
      popular: true,
      slug: "life-drawing",
      duration: "2 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
    },
    {
      title: "Yoga & Pilates Classes",
      description: "Flow into the weekend with a private group class led by a professional instructor. Ideal for setting a calm, happy tone.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-group-yoga-c-bd43fc48-20251021222800.jpg",
      icon: Heart,
      category: "relaxed",
      popular: false,
      slug: "yoga-session",
      duration: "1.5-2 hours",
      priceFrom: 40,
      groupSize: "8-20 guests",
    },
    {
      title: "Pizza Party Night",
      description: "Make, bake, and top your own creations. Dough, laughter, and a lot of prosecco.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-fun-pizza-ma-4a0f37e9-20251021222802.jpg",
      icon: Pizza,
      category: "fun",
      popular: false,
      slug: "pizza-party",
      duration: "2-3 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
    },
    {
      title: "Bottomless Brunch",
      description: "Start your day with unlimited prosecco, delicious food, and great vibes. The perfect hen party tradition.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      icon: Utensils,
      category: "fun",
      popular: true,
      slug: "bottomless-brunch",
      duration: "2-3 hours",
      priceFrom: 35,
      groupSize: "8-30 guests",
    },
    {
      title: "Murder Mystery Dinner",
      description: "Transform your dinner into a night of intrigue and laughter. Dress up, play your part, and see who can uncover the culprit first.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-murder-myste-3f806f2a-20251021222805.jpg",
      icon: Users,
      category: "fun",
      popular: false,
      slug: "murder-mystery",
      duration: "3-4 hours",
      priceFrom: 50,
      groupSize: "10-30 guests",
    },
    {
      title: "Wellness Workshops",
      description: "Meditation, sound baths, or aromatherapy – for a restorative, bonding experience.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-wellness-med-b1dcd986-20251021222802.jpg",
      icon: Sparkles,
      category: "relaxed",
      popular: false,
      slug: "wellness-workshops",
      duration: "2-3 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
    },
    {
      title: "Dance Class",
      description: "Learn a choreographed routine with your group. From hip-hop to burlesque, we'll get everyone moving.",
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
      icon: Music,
      category: "fun",
      popular: false,
      slug: "dance-class",
      duration: "1.5-2 hours",
      priceFrom: 40,
      groupSize: "8-25 guests",
    },
    {
      title: "Photography Package",
      description: "Capture your special weekend with a professional photographer. Candid moments and group shots you'll treasure forever.",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
      icon: Camera,
      category: "relaxed",
      popular: false,
      slug: "photography-package",
      duration: "2-3 hours",
      priceFrom: 150,
      groupSize: "Any size",
    },
    {
      title: "Flower Crown Making",
      description: "Get creative and make beautiful flower crowns for your group. Perfect Instagram moment included.",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
      icon: Flower2,
      category: "relaxed",
      popular: false,
      slug: "flower-crown-making",
      duration: "1.5-2 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
    },
    {
      title: "Hair Styling",
      description: "Professional hair styling for your entire group. From elegant updos to beachy waves, look picture-perfect.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      icon: Scissors,
      category: "relaxed",
      popular: false,
      slug: "hair-styling",
      duration: "2-3 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
    },
    {
      title: "Make-up Artist",
      description: "Professional make-up application for your entire group. From natural glam to full glam, look your absolute best.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
      icon: Sparkles,
      category: "relaxed",
      popular: false,
      slug: "make-up-artist",
      duration: "2-3 hours",
      priceFrom: 40,
      groupSize: "8-20 guests",
    },
    {
      title: "Karaoke Night",
      description: "Belt out your favourite tunes with professional karaoke equipment. Guaranteed laughs and unforgettable memories.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      icon: Mic2,
      category: "fun",
      popular: false,
      slug: "karaoke-night",
      duration: "3-4 hours",
      priceFrom: 40,
      groupSize: "8-30 guests",
    },
    {
      title: "Sip & Paint",
      description: "Unleash your inner artist while sipping your favourite drinks. Create masterpieces with professional guidance.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
      icon: Palette,
      category: "fun",
      popular: false,
      slug: "sip-and-paint",
      duration: "2-3 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
    },
  ];

  const faqs = [
    {
      question: "Can we book experiences separately or only with a property?",
      answer:
        "You can book experiences alongside your property booking. Simply select your preferred experiences when making your enquiry and we'll arrange everything for you.",
    },
    {
      question: "How far in advance should we book experiences?",
      answer:
        "We recommend booking experiences at least 4-6 weeks in advance to ensure availability, especially for popular activities like cocktail masterclasses and butlers. However, we can sometimes arrange last-minute bookings subject to provider availability.",
    },
    {
      question: "What happens if we need to change or cancel an experience?",
      answer:
        "Changes can be made up to 14 days before your arrival subject to availability. Cancellations within 14 days may incur a fee depending on the provider. Full details are provided when you book.",
    },
    {
      question: "Are experiences suitable for all group sizes?",
      answer:
        "Most experiences can accommodate groups of 8-20 guests. Some, like private chefs and butlers, can cater to any size. We'll confirm suitability when you enquire.",
    },
    {
      question: "Can we book multiple experiences during our stay?",
      answer:
        "Absolutely! Many groups combine experiences throughout their weekend. Popular combinations include a cocktail masterclass on arrival, spa treatments the next day, and a bottomless brunch before departure. We'll help you plan the perfect schedule.",
    },
    {
      question: "What's included in the experience price?",
      answer:
        "Each experience price includes all necessary equipment, materials, and instructor/provider fees. Cocktail classes include ingredients for 3-4 drinks, life drawing includes art supplies, and private chefs include food and preparation. Specific inclusions are listed on each experience page.",
    },
    {
      question: "Can we customise experiences?",
      answer:
        "Yes! Many of our experience providers offer customisation options. Let us know your preferences when enquiring and we'll work with you to create the perfect experience.",
    },
    {
      question: "Do you cater for dietary requirements?",
      answer:
        "Yes, all our food and drink experiences can accommodate dietary requirements including vegetarian, vegan, gluten-free, and allergies. Simply let us know when booking and we'll ensure everything is arranged with the provider.",
    },
    {
      question: "When do we pay for experiences?",
      answer:
        "Experience costs are typically paid alongside your final property balance, 8 weeks before arrival. We'll provide a clear breakdown of all costs when we confirm your booking.",
    },
    {
      question: "What happens if the weather affects our planned experience?",
      answer:
        "Most of our experiences take place indoors at your property or nearby venues. For any outdoor activities, providers have contingency plans and we can help reschedule or swap to an alternative experience if needed.",
    },
    {
      question: "Can the bride-to-be be surprised with an experience?",
      answer:
        "Yes! Many groups arrange surprise experiences for the bride. Just let us know in your enquiry notes and we'll coordinate discreetly with you to keep it secret until the big reveal.",
    },
    {
      question: "How long do experiences typically last?",
      answer:
        "Most experiences run for 1.5-2 hours (cocktail masterclasses, life drawing), though some like private chefs and butlers can be booked for longer periods. Specific durations are shown on each experience card and can often be extended for an additional fee.",
    },
  ];

  const destinations = [
    { name: "Brighton", slug: "brighton", image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800" },
    { name: "Bath", slug: "bath", image: "https://images.unsplash.com/photo-1566510224904-a6b733e0d0fa?w=800" },
    { name: "Bournemouth", slug: "bournemouth", image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800" },
    { name: "York", slug: "york", image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800" },
    { name: "Manchester", slug: "manchester", image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=800" },
    { name: "Cardiff", slug: "cardiff", image: "https://images.unsplash.com/photo-1570936885323-16be1d36f92d?w=800" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]"
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            Hen Party Experiences UK – Unforgettable Activities for Your Celebration
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto mb-8">
            Create your dream <Link href="/occasions/hen-party-houses" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">hen weekend</Link> with <Link href="/experiences/spa-treatments" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">spa treatments</Link>, <Link href="/experiences/private-chef" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">private chef dining</Link>, <Link href="/experiences/yoga-session" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">yoga mornings</Link>, and unforgettable moments. Whether you're here to unwind or get the giggles flowing with <Link href="/experiences/cocktail-masterclass" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">cocktail masterclasses</Link>, we've got you covered across the UK.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            style={{
              background: "var(--color-accent-sage)",
              color: "white",
            }}
          >
            <Link href="/contact">Add Experiences to Your Stay</Link>
          </Button>
        </div>
      </motion.section>

      {/* Intro Paragraph */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed" style={{ color: "var(--color-neutral-dark)" }}>
            At <strong>Group Escape Houses</strong>, we make <Link href="/occasions/hen-party-houses" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted">hen party weekends</Link> feel effortless. Our curated activities bring together everything you love – indulgent food, pampering, laughter, and a sprinkle of luxury. Choose from <Link href="/experiences/private-chef" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">chef dining</Link>, <Link href="/experiences/spa-treatments" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">spa treatments</Link>, <Link href="/experiences/yoga-session" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">yoga sessions</Link>, or something a little cheekier like <Link href="/experiences/life-drawing" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">life drawing</Link>. Available at our <Link href="/properties" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted">luxury party houses across the UK</Link> – you tell us the vibe, and we'll make it happen.
          </p>
        </div>
      </section>

      {/* Most Popular Experiences */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              ⭐ Most Popular Hen Party Experiences
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
              Our most searched and booked activities for <Link href="/occasions/hen-party-houses" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">hen parties</Link> and <Link href="/occasions/special-celebrations" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">group celebrations</Link>. These crowd-pleasers are guaranteed to make your weekend unforgettable at any of our <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">UK party houses</Link>.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {allExperiences.filter(exp => exp.popular).map((experience, idx) => (
              <ExperienceCard
                key={idx}
                title={experience.title}
                duration={experience.duration}
                priceFrom={experience.priceFrom}
                groupSize={experience.groupSize}
                image={experience.image}
                slug={experience.slug}
              />
            ))}
          </motion.div>

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
              <Link href="/contact">Book Popular Experiences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Other Experiences */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              More Amazing Experiences
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
              Browse our full collection of activities to create your perfect hen weekend itinerary.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {allExperiences.filter(exp => !exp.popular).map((experience, idx) => (
              <ExperienceCard
                key={idx}
                title={experience.title}
                duration={experience.duration}
                priceFrom={experience.priceFrom}
                groupSize={experience.groupSize}
                image={experience.image}
                slug={experience.slug}
              />
            ))}
          </motion.div>

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
              <Link href="/contact">Enquire About All Experiences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            ✨ How Experience Booking Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-lg max-w-3xl mx-auto mb-12"
            style={{ color: "var(--color-neutral-dark)" }}
          >
            All experiences are optional add-ons that can be arranged when you <Link href="/properties" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors underline decoration-dotted">book your party house</Link> or added later. Our UK-based team at <Link href="/our-story" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">Group Escape Houses</Link> takes care of everything – timings, setup, and suppliers – so all you need to do is relax and enjoy. See our full <Link href="/how-it-works" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">booking process here</Link>.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              "Tailored to your group size",
              "Flexible timings",
              "Trusted local suppliers",
              "No hidden fees",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: "var(--color-accent-sage)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/contact">Request My Weekend Plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Make It Yours */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            💕 Personalise Your Hen Weekend Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-3xl mx-auto mb-8"
            style={{ color: "var(--color-neutral-dark)" }}
          >
            Every <Link href="/occasions/hen-party-houses" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">hen party group</Link> is different, and that's what we love. Whether you're planning a <Link href="/experiences/yoga-session" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">wellness retreat</Link> or a <Link href="/experiences/cocktail-masterclass" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">cocktail-filled celebration</Link>, Group Escape Houses can be customised to match your perfect vibe. Combine experiences at our <Link href="/features/hot-tub" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">luxury houses with hot tubs</Link>, <Link href="/features/swimming-pool" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">pools</Link>, and <Link href="/features/games-room" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">games rooms</Link> across the UK.
          </motion.p>
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
              <Link href="/properties">Check Availability</Link>
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
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              🗺️ Hen Party Experiences by UK Destination
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
              Each destination offers unique venues and providers for your perfect <Link href="/occasions/hen-party-houses" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">hen party weekend</Link>. Browse <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">party houses</Link> and experiences by location to see what's available in your chosen area. All our properties feature <Link href="/features/hot-tub" className="underline hover:text-[var(--color-accent-gold)] transition-colors font-medium">hot tubs</Link>, luxury amenities, and easy access to local providers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {destinations.map((destination, idx) => (
              <motion.div
                key={destination.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-64"
                >
                  <img
                    src={destination.image}
                    alt={`${destination.name} hen party experiences`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <MapPin className="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {destination.name}
                    </h3>
                    <span className="text-sm opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      View Properties & Experiences →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
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
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-center mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            Hen Party Experience FAQs
          </h2>
          <p className="text-center text-lg text-[var(--color-neutral-dark)] mb-12 max-w-2xl mx-auto">
            Everything you need to know about booking experiences with Group Escape Houses. For questions about <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">property bookings</Link>, see our <Link href="/how-it-works" className="underline hover:text-[var(--color-accent-gold)] transition-colors">how it works page</Link>.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
}