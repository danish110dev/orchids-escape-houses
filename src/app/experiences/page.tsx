"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Sparkles, ChefHat, Waves, Heart, Palette, Pizza, Users, Wine, CheckCircle2 } from "lucide-react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ExperiencesPage() {
  const chilledExperiences = [
    {
      title: "Private Chef Dining",
      description: "Enjoy a gourmet meal in your own space, cooked by one of our talented local chefs. Perfect for a Friday night feast or Sunday brunch.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-0a38cf4c-20251021222802.jpg",
      icon: ChefHat,
    },
    {
      title: "Spa Treatments",
      description: "Mobile therapists bring massages, facials, and pamper sessions straight to you. Bliss without leaving the house.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-15d1f1e0-20251021222805.jpg",
      icon: Waves,
    },
    {
      title: "Yoga & Pilates Classes",
      description: "Flow into the weekend with a private group class led by a professional instructor. Ideal for setting a calm, happy tone.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-group-yoga-c-bd43fc48-20251021222800.jpg",
      icon: Heart,
    },
    {
      title: "Wellness Workshops",
      description: "Meditation, sound baths, or aromatherapy – for a restorative, bonding experience.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-wellness-med-b1dcd986-20251021222802.jpg",
      icon: Sparkles,
    },
  ];

  const funExperiences = [
    {
      title: "Pizza Party Night",
      description: "Make, bake, and top your own creations. Dough, laughter, and a lot of prosecco.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-fun-pizza-ma-4a0f37e9-20251021222802.jpg",
      icon: Pizza,
    },
    {
      title: "Murder Mystery Dinner",
      description: "Transform your dinner into a night of intrigue and laughter. Dress up, play your part, and see who can uncover the culprit first.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-murder-myste-3f806f2a-20251021222805.jpg",
      icon: Users,
    },
    {
      title: "Cocktail Masterclass",
      description: "Learn to shake, stir, and sip like pros with our expert mixologists.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cocktail-mas-1a8ca804-20251021222811.jpg",
      icon: Wine,
    },
    {
      title: "Life Drawing & Cheeky Butlers",
      description: "Add some giggles with a classy-but-fun experience that everyone will remember.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-life-drawing-ec9a158b-20251021222812.jpg",
      icon: Palette,
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

  // Draggable carousel component
  const DraggableCarousel = ({ experiences, bgColor }: { experiences: typeof chilledExperiences, bgColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();

    // Auto-scroll animation
    useEffect(() => {
      if (isHovered || isDragging) {
        controls.stop();
        return;
      }

      const animate = async () => {
        const scrollWidth = (320 + 24) * experiences.length; // card width + gap
        await controls.start({
          x: -scrollWidth,
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          },
        });
      };

      animate();
    }, [isHovered, isDragging, controls, experiences.length]);

    return (
      <div 
        className="mt-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden -mx-6 md:mx-0" ref={constraintsRef}>
          <motion.div
            className="flex gap-6 px-6 md:px-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ x }}
            animate={controls}
          >
            {[...experiences, ...experiences].map((experience, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[320px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: bgColor }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <experience.icon className="w-5 h-5" style={{ color: "var(--color-accent-sage)" }} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                    {experience.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-neutral-dark)" }}>
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

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
            Experiences at Orchids – Relax, Laugh, Celebrate
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto mb-8">
            Create your dream hen weekend with spa treatments, chef-cooked meals, yoga mornings, and unforgettable moments. Whether you're here to unwind or get the giggles flowing, we've got you covered.
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
          <p className="text-lg text-center max-w-4xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
            At Orchids, we make hen weekends feel effortless. Our curated activities bring together everything you love – indulgent food, pampering, laughter, and a sprinkle of luxury. Choose from chef dining, spa treatments, yoga sessions, or something a little cheekier. You tell us the vibe, and we'll make it happen.
          </p>
        </div>
      </section>

      {/* Chilled & Relaxed */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              🌿 Chilled & Relaxed
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
              For hens who love the idea of a weekend that feels like a mini-retreat. Think self-care, slow mornings, and indulgence done right.
            </p>
          </motion.div>

          <DraggableCarousel experiences={chilledExperiences} bgColor="white" />

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
              <Link href="/contact">Enquire About Wellness Experiences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Fun & Interactive */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
              🍕 Fun & Interactive
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-neutral-dark)" }}>
              For when you want to add a little energy and entertainment to the weekend.
            </p>
          </motion.div>

          <DraggableCarousel experiences={funExperiences} bgColor="var(--color-neutral-light)" />

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
              <Link href="/contact">Add a Fun Activity to Your Stay</Link>
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
            ✨ How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-lg max-w-3xl mx-auto mb-12"
            style={{ color: "var(--color-neutral-dark)" }}
          >
            All experiences are optional add-ons that can be arranged before or after booking. Our team takes care of everything – timings, setup, and suppliers – so all you need to do is relax and enjoy.
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
            💕 Make It Yours
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-3xl mx-auto mb-8"
            style={{ color: "var(--color-neutral-dark)" }}
          >
            Every hen group is different, and that's what we love. Whether you're planning a wellness retreat or a cocktail-filled celebration, Orchids can be customised to match your perfect vibe.
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

      {/* FAQs */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-center mb-12" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            Experience FAQs
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
}