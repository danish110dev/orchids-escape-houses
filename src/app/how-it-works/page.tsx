"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { steps, faqs } from "@/data/how-it-works";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  How to Book Your Perfect Group Getaway
                </h1>
                <p className="text-xl text-[var(--color-neutral-dark)]">
                  Booking with Group Escape Houses is simple and transparent. Connect directly with property owners to plan your perfect stay.
                </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/wide-photograph-of-diverse-group-of-wome-782e4e08-20251024132157.jpg"
                alt="Women planning hen party weekend together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={item.step} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? -5 : 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-[var(--color-accent-sage)]/40"
                      style={{
                        background: "var(--color-accent-sage)",
                        color: "white",
                      }}
                    >
                      <Icon className="w-10 h-10" />
                    </motion.div>
                    <h3 className="mb-4 font-semibold text-xl" style={{ fontFamily: "var(--font-body)" }}>
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-neutral-dark)] leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </section>

      {/* Visual Steps Gallery */}
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/elegant-luxury-house-exterior-with-hot-t-a1be0c95-20251024132155.jpg"
                  alt="Browse local group houses"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 300px"
                  loading="lazy"
                />
              </div>
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/group-of-women-friends-doing-cocktail-ma-1a36aa32-20251024132155.jpg"
                  alt="Enquire directly with owners"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 300px"
                  loading="lazy"
                />
              </div>
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/close-up-of-elegant-hands-holding-credit-36b540a7-20251024132157.jpg"
                  alt="Confirm booking details"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 300px"
                  loading="lazy"
                />
              </div>
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/happy-group-of-women-friends-celebrating-8672ffae-20251024132156.jpg"
                  alt="Enjoy your group stay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 300px"
                  loading="lazy"
                />
              </div>
            </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
                <div>
                  <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    Booking & Payment
                  </h2>
                  <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                    <p>
                      When you find your perfect property, simply submit an enquiry through our platform. You'll need to provide your preferred dates, group size, and any special requirements.
                    </p>
                    <p>
                      Once the owner confirms availability, you will discuss and agree on the booking terms, deposits, and payment schedules directly with them. Group Escape Houses does not handle any booking payments or contracts.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    Deposits & Terms
                  </h2>
                  <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                    <p>
                      Security deposits and booking fees vary by property. These are set and managed by the individual property owner.
                    </p>
                    <p>
                      The owner will provide you with their specific terms and conditions, as well as instructions for payment of deposits and balances.
                    </p>
                  </div>
                </div>

              <div>
                <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Check-In & Check-Out
                </h2>
                <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                  <p>
                    <strong>Check-in:</strong> 4pm on your arrival date
                    <br />
                    <strong>Check-out:</strong> 10am on your departure date
                  </p>
                  <p>
                    You'll receive detailed check-in instructions 48 hours before arrival, including access codes and property information.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/beautiful-welcome-hamper-with-champagne--433b9f64-20251024132155.jpg"
                  alt="Welcome hamper and luxury amenities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="space-y-12">
            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Bookings & Contracts
              </h2>
              <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                <p>
                  As an advertising platform, Group Escape Houses is not involved in the contract between you and the property owner.
                </p>
                <p>
                  All booking contracts, payment terms, and cancellation policies are established directly between the guest and the owner. We recommend clarifying these details with the owner at the time of enquiry.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                House Rules
              </h2>
              <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                <p>All properties have specific house rules including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maximum occupancy must not be exceeded</li>
                  <li>No smoking inside properties</li>
                  <li>Respect quiet hours (typically 11pm-8am)</li>
                  <li>No parties beyond the booked group size</li>
                  <li>Be considerate of neighbours</li>
                </ul>
                <p className="pt-4">
                  Full house rules are provided with your booking confirmation and must be respected.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-12">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 text-lg font-medium transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--color-neutral-dark)]">
              Got questions? We've got answers.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-[var(--color-bg-secondary)] rounded-2xl px-6 data-[state=open]:bg-[var(--color-bg-primary)]"
              >
                <AccordionTrigger 
                  className="text-left hover:no-underline py-6"
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--color-text-primary)"
                  }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-[var(--color-neutral-dark)] pb-6"
                  style={{ fontSize: "16px", lineHeight: "1.7" }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-lg text-[var(--color-neutral-dark)] mb-6">
              Still have questions?
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 py-6 text-lg font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                borderColor: "var(--color-accent-sage)",
                color: "var(--color-accent-sage)",
              }}
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}