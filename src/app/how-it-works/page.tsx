import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HomeIcon, Sparkles, CreditCard, PartyPopper, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      icon: HomeIcon,
      title: "Choose Your House",
      description: "Browse our collection of luxury party houses across the UK. Filter by location, group size, and features like hot tubs and pools.",
    },
    {
      step: 2,
      icon: Sparkles,
      title: "Add Experiences",
      description: "Enhance your stay with cocktail classes, butlers in the buff, private chefs, spa treatments, and more.",
    },
    {
      step: 3,
      icon: CreditCard,
      title: "Pay Your Deposit",
      description: "Secure your booking with a 25% deposit. The remaining balance is due 8 weeks before arrival.",
    },
    {
      step: 4,
      icon: PartyPopper,
      title: "Final Balance & Enjoy",
      description: "Pay the final balance 8 weeks before arrival, then relax and get ready for an unforgettable celebration.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
            How to Book Your Perfect Hen Weekend
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
            Booking with Group Escape Houses is simple and transparent. Here's how it works.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center animate-float"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                      animationDelay: `${item.step * 0.2}s`,
                    }}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="mb-4" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="space-y-12">
            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Booking & Payment
              </h2>
              <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                <p>
                  When you find your perfect property, simply submit an enquiry through our instant enquiry form. You'll need to provide your preferred dates, group size, and any special requirements.
                </p>
                <p>
                  Once we confirm availability, you'll receive a booking confirmation and invoice. A 25% deposit secures your reservation, with the remaining balance due 8 weeks before your arrival date.
                </p>
                <p>
                  If you book within 8 weeks of your arrival date, the full balance is payable immediately.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Security Deposit
              </h2>
              <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                <p>
                  A refundable security deposit of £250-£500 (depending on the property) is required. This is taken as a pre-authorisation on your card 7 days before arrival.
                </p>
                <p>
                  The deposit is released within 7 days after departure, provided there's no damage and the property is left in good condition.
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

            <div>
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Cancellation Policy
              </h2>
              <div className="space-y-4 text-lg" style={{ color: "var(--color-neutral-dark)" }}>
                <ul className="list-disc pl-6 space-y-2">
                  <li>More than 8 weeks before arrival: Deposit forfeited</li>
                  <li>4-8 weeks before arrival: 50% of total booking cost</li>
                  <li>2-4 weeks before arrival: 75% of total booking cost</li>
                  <li>Less than 2 weeks before arrival: 100% of total booking cost</li>
                </ul>
                <p className="pt-4">
                  We strongly recommend taking out travel insurance to cover unexpected cancellations.
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

      <Footer />
    </div>
  );
}