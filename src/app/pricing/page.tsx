"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Award, Users, Clock, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Bronze",
      price: "£450",
      description: "Everything you need to start receiving direct, commission-free enquiries.",
      features: [
        "High-impact property page",
        "Direct, commission-free enquiries",
        "Full calendar management",
        "Direct link to your website",
        "Standard SEO optimization"
      ]
    },
    {
      name: "Silver",
      price: "£650",
      description: "Enhanced visibility and targeted social media promotion to boost your bookings.",
      featured: true,
      features: [
        "Everything in Bronze",
        "Featured social media promotion",
        "Themed blog feature spotlight",
        "Three dedicated Holiday Focus pages",
        "Ongoing listing production support"
      ]
    },
    {
      name: "Gold",
      price: "£850",
      description: "The ultimate marketing package with homepage placement and priority support.",
      features: [
        "Everything in Silver",
        "Homepage feature placement",
        "Specialist page spotlighting",
        "Priority production support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              List Your Property
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
              Choose a simple fixed-fee listing and reach guests directly. No commission, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white rounded-3xl p-8 border-2 transition-all ${
                  plan.featured ? "border-[var(--color-accent-sage)] shadow-xl scale-105" : "border-gray-100 hover:shadow-lg"
                }`}
              >
                {plan.featured && (
                  <span className="bg-[var(--color-accent-sage)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[var(--color-neutral-dark)] text-sm">+ VAT / year</span>
                </div>
                <p className="text-sm text-[var(--color-neutral-dark)] mb-8">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild
                  className="w-full rounded-xl py-6"
                  variant={plan.featured ? "default" : "outline"}
                  style={plan.featured ? { background: "var(--color-accent-sage)", color: "white" } : { borderColor: "var(--color-accent-sage)", color: "var(--color-accent-sage)" }}
                >
                  <Link href="/contact">Choose {plan.name}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <Shield className="w-8 h-8 mx-auto mb-4 text-[var(--color-accent-sage)]" />
              <h3 className="font-semibold mb-2 text-sm">No Commission</h3>
              <p className="text-xs text-[var(--color-neutral-dark)]">Keep 100% of your revenue</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <Users className="w-8 h-8 mx-auto mb-4 text-[var(--color-accent-gold)]" />
              <h3 className="font-semibold mb-2 text-sm">Direct Enquiries</h3>
              <p className="text-xs text-[var(--color-neutral-dark)]">Deal directly with your guests</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <Award className="w-8 h-8 mx-auto mb-4 text-[var(--color-accent-sage)]" />
              <h3 className="font-semibold mb-2 text-sm">Expert Support</h3>
              <p className="text-xs text-[var(--color-neutral-dark)]">UK-based property team</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <Clock className="w-8 h-8 mx-auto mb-4 text-[var(--color-accent-gold)]" />
              <h3 className="font-semibold mb-2 text-sm">Full Control</h3>
              <p className="text-xs text-[var(--color-neutral-dark)]">Manage your own calendar</p>
            </div>
          </div>

          <div className="text-center bg-[var(--color-bg-secondary)] rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Ready to list your house?</h2>
            <p className="text-[var(--color-neutral-dark)] mb-8 max-w-2xl mx-auto">
              Join the UK's specialist platform for luxury large group properties and start receiving direct enquiries.
            </p>
            <Button asChild size="lg" className="rounded-xl px-10 py-6" style={{ background: "var(--color-accent-sage)", color: "white" }}>
              <Link href="/contact">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
