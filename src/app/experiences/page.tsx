"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import FAQAccordion from "@/components/FAQAccordion";
import { Sparkles, CalendarCheck, ShieldCheck, Star, Search, MousePointerClick, CheckCheck, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperiencesPage() {
  const experiences = [
    {
      title: "Cocktail Masterclass",
      duration: "2 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
      image: "https://v3b.fal.media/files/b/koala/pooDA9ogPXXK6L6beoEwZ_output.png",
      slug: "cocktail-masterclass",
    },
    {
      title: "Butlers in the Buff",
      duration: "2-4 hours",
      priceFrom: 65,
      groupSize: "Any size",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/tasteful-butler-service-photograph%2c-pr-e2c8ab0c-20251018093936.jpg?",
      slug: "butlers-in-the-buff",
    },
    {
      title: "Life Drawing Class",
      duration: "1.5-2 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/artistic-life-drawing-class-scene%2c-eas-d2674e31-20251018093944.jpg?",
      slug: "life-drawing",
    },
    {
      title: "Private Chef Experience",
      duration: "Full day",
      priceFrom: 75,
      groupSize: "Any size",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/private-chef-preparing-gourmet-food-in-l-d4cba3e9-20251018093953.jpg?",
      slug: "private-chef",
    },
    {
      title: "Spa & Treatments",
      duration: "2-3 hours",
      priceFrom: 55,
      groupSize: "Up to 16",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/luxury-spa-treatment-scene%2c-serene-spa-568274b8-20251018094000.jpg?",
      slug: "spa-treatments",
    },
    {
      title: "Bottomless Brunch",
      duration: "2 hours",
      priceFrom: 40,
      groupSize: "Any size",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/bottomless-brunch-celebration-scene%2c-e-b3c13bf8-20251018094009.jpg?",
      slug: "bottomless-brunch",
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
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-pink)]" />
            <span className="text-sm font-medium">Add unforgettable moments</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
            Hen Party Experiences
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Make your celebration extra special with our curated selection of activities and services
          </p>
        </div>
      </motion.section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {experiences.map((experience) => (
              <motion.div
                key={experience.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ExperienceCard {...experience} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Add Experiences */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            Why Add Experiences?
          </motion.h2>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              {
                icon: Star,
                bg: "#F2C6C2",
                title: "Create Memories",
                desc: "Make your hen weekend truly unforgettable with activities that bring everyone together",
              },
              {
                icon: CalendarCheck,
                bg: "#89A38F",
                title: "Hassle-Free Planning",
                desc: "We arrange everything for you so you can focus on enjoying the celebration",
              },
              {
                icon: ShieldCheck,
                bg: "#C6A76D",
                title: "Trusted Providers",
                desc: "All our experience providers are carefully vetted and highly rated by previous guests",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -8, 8, -8, 0],
                    y: -8,
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    },
                    hover: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  }}
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center relative cursor-pointer"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.bg} 0%, ${item.bg}dd 100%)`,
                    boxShadow: `0 10px 30px ${item.bg}40, 0 0 0 0 ${item.bg}00`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.5, 
                      opacity: [0, 0.3, 0],
                      transition: { duration: 0.8, repeat: Infinity }
                    }}
                    style={{ 
                      background: item.bg,
                      filter: 'blur(10px)',
                    }}
                  />
                  <item.icon 
                    className="w-12 h-12 relative z-10" 
                    style={{ 
                      color: "white", 
                      fill: idx === 0 ? "white" : "none",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    }} 
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "#1F2937" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#374151" }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            How to Add Experiences
          </motion.h2>
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
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { step: "1", title: "Browse", desc: "Explore our curated experiences", icon: Search },
              { step: "2", title: "Select", desc: "Choose your favourites when enquiring", icon: MousePointerClick },
              { step: "3", title: "Confirm", desc: "We'll check availability and quote", icon: CheckCheck },
              { step: "4", title: "Enjoy", desc: "Everything's arranged for your arrival", icon: PartyPopper },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.15,
                    },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    },
                    hover: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center relative cursor-pointer group"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-pink) 0%, #F2C6C2 100%)",
                    boxShadow: "0 10px 25px rgba(242, 198, 194, 0.3), 0 0 0 0 rgba(242, 198, 194, 0)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ 
                      background: "var(--color-accent-pink)",
                      filter: 'blur(15px)',
                    }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <item.icon 
                      className="w-11 h-11 relative z-10" 
                      style={{ 
                        color: "var(--color-text-primary)",
                        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))"
                      }} 
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                    whileHover={{ scale: 1.15 }}
                    animate={{
                      boxShadow: [
                        "0 4px 10px rgba(31, 41, 55, 0.3)",
                        "0 8px 20px rgba(31, 41, 55, 0.4)",
                        "0 4px 10px rgba(31, 41, 55, 0.3)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    style={{
                      background: "linear-gradient(135deg, var(--color-text-primary) 0%, #374151 100%)",
                      color: "white",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.step}
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-neutral-dark)]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
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