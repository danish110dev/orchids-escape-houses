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
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function OccasionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      question: "What types of occasions do you cater for?",
      answer: "We specialise in all types of celebrations including hen parties, weddings, birthdays, anniversaries, Christmas, New Year, Easter, and weekend breaks. Our luxury houses are perfect for groups of 10-30 guests looking for an unforgettable experience."
    },
    {
      question: "Can I book add-on experiences for my occasion?",
      answer: "Absolutely! We offer a range of add-on experiences including cocktail masterclasses, butlers in the buff, life drawing sessions, private chefs, spa treatments, and decorations. These can be arranged when you make your booking."
    },
    {
      question: "Do you offer special rates for occasion bookings?",
      answer: "Yes, we have special offers including free stays for the bride on hen party bookings of 10+ guests. We also offer competitive weekend and midweek rates for all occasions. Contact us for a tailored quote."
    },
    {
      question: "What's included in the house rental?",
      answer: "All our properties come fully equipped with modern kitchens, spacious living areas, comfortable bedrooms, and luxury bathrooms. Many feature hot tubs, pools, games rooms, and beautiful grounds. Specific amenities vary by property."
    },
    {
      question: "How far in advance should I book for my occasion?",
      answer: "We recommend booking 6-12 months in advance for popular dates like Christmas, New Year, and summer weekends. However, we often have last-minute availability, so it's always worth checking with us."
    }
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
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80&auto=format&fit=crop"
                  alt="Luxury celebration gathering with friends and family"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-[var(--color-accent-sage)]">3,000+</div>
                    <div className="text-xs text-[var(--color-neutral-dark)]">5★ Reviews</div>
                  </div>
                  <div className="h-8 w-px bg-[var(--color-bg-secondary)]"></div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--color-accent-gold)]">500+</div>
                    <div className="text-xs text-[var(--color-neutral-dark)]">Luxury Houses</div>
                  </div>
                  <div className="h-8 w-px bg-[var(--color-bg-secondary)]"></div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--color-accent-sage)]">24/7</div>
                    <div className="text-xs text-[var(--color-neutral-dark)]">UK Support</div>
                  </div>
                </div>
              </motion.div>
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
                Luxury Houses for Every Occasion
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Everything you need to know about booking for your special occasion
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[var(--color-bg-primary)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-text-primary)] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[var(--color-neutral-dark)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}