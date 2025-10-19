"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: "How do I book a hen party house?",
      answer: "Browse our properties, select your preferred house, and submit an enquiry with your dates and group size. Our UK team will respond within 24 hours with availability and a quote. You can also call us for instant assistance."
    },
    {
      question: "What is included in the price?",
      answer: "All our properties include utilities, Wi-Fi, and standard amenities. Most houses feature hot tubs, games rooms, and entertainment facilities. Additional experiences like cocktail classes, butlers, and private chefs can be added to your booking."
    },
    {
      question: "What is the deposit and payment schedule?",
      answer: "We require a deposit to secure your booking (typically 25-30%). The remaining balance is due 6-8 weeks before your stay. All payments are processed securely via Stripe."
    },
    {
      question: "Can I cancel or change my booking?",
      answer: "Cancellation policies vary by property. Most bookings are non-refundable within 8 weeks of arrival. We recommend booking travel insurance. Contact our team to discuss any changes to your reservation."
    },
    {
      question: "How many people can stay in a house?",
      answer: "Our houses accommodate groups from 8 to 30+ guests. Each property listing shows the maximum capacity, number of bedrooms, and bed configurations. Check the property details for exact sleeping arrangements."
    },
    {
      question: "Are hen party houses suitable for other celebrations?",
      answer: "Absolutely! While we specialise in hen weekends, our properties are perfect for birthdays, anniversaries, family reunions, and any group celebration. Browse our experiences to find activities for your occasion."
    },
    {
      question: "What about house rules and damage deposits?",
      answer: "Each property has specific house rules regarding noise, parties, and check-in times. A refundable damage deposit (typically £250-500) is required. Read our full terms and conditions for complete details."
    },
    {
      question: "Can you arrange activities and experiences?",
      answer: "Yes! We offer cocktail masterclasses, butlers in the buff, life drawing, private chefs, spa treatments, and more. View our experiences page to see all available add-ons and pricing."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Everything you need to know about booking your perfect hen party house
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--color-accent-gold)]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--color-accent-gold)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-200 hover:bg-[var(--color-accent-gold)]/10"
              >
                <h3
                  className="text-lg font-semibold pr-4"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--color-accent-gold)" }}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[var(--color-neutral-dark)]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[var(--color-neutral-dark)] mb-4">
            Still have questions? We're here to help!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
            style={{ color: "var(--color-accent-gold)" }}
          >
            Contact our UK team
          </Link>
        </div>
      </div>
    </section>
  );
}