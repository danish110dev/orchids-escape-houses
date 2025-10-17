"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import FAQAccordion from "@/components/FAQAccordion";
import { Sparkles, CalendarCheck, ShieldCheck } from "lucide-react";

export default function ExperiencesPage() {
  const experiences = [
    {
      title: "Cocktail Masterclass",
      duration: "2 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      slug: "cocktail-masterclass",
    },
    {
      title: "Butlers in the Buff",
      duration: "2-4 hours",
      priceFrom: 65,
      groupSize: "Any size",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
      slug: "butlers-in-the-buff",
    },
    {
      title: "Life Drawing Class",
      duration: "1.5-2 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
      slug: "life-drawing",
    },
    {
      title: "Private Chef Experience",
      duration: "Full day",
      priceFrom: 75,
      groupSize: "Any size",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      slug: "private-chef",
    },
    {
      title: "Spa & Treatments",
      duration: "2-3 hours",
      priceFrom: 55,
      groupSize: "Up to 16",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      slug: "spa-treatments",
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
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-pink)]" />
            <span className="text-sm font-medium">Add unforgettable moments</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Hen Party Experiences
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Make your celebration extra special with our curated selection of activities and services
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.slug} {...experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Add Experiences */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-16" style={{ fontFamily: "var(--font-display)" }}>
            Why Add Experiences?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "var(--color-accent-pink)" }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Memories</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Make your hen weekend truly unforgettable with activities that bring everyone together
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "var(--color-accent-sage)" }}
              >
                <CalendarCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hassle-Free Planning</h3>
              <p className="text-[var(--color-neutral-dark)]">
                We arrange everything for you so you can focus on enjoying the celebration
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "var(--color-accent-gold)" }}
              >
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Providers</h3>
              <p className="text-[var(--color-neutral-dark)]">
                All our experience providers are carefully vetted and highly rated by previous guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-16" style={{ fontFamily: "var(--font-display)" }}>
            How to Add Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Browse", desc: "Explore our curated experiences" },
              { step: "2", title: "Select", desc: "Choose your favourites when enquiring" },
              { step: "3", title: "Confirm", desc: "We'll check availability and quote" },
              { step: "4", title: "Enjoy", desc: "Everything's arranged for your arrival" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: "var(--color-accent-pink)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-neutral-dark)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            Experience FAQs
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
}