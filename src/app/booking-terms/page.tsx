"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingTermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex gap-2 text-sm mb-6 text-[var(--color-neutral-dark)]">
            <Link href="/" className="hover:text-[var(--color-accent-sage)] transition-colors">Home</Link>
            <span>/</span>
            <span>Booking Information</span>
          </nav>
          
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Booking Information
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl leading-relaxed">
            Group Escape Houses is an advertising platform. All bookings are handled directly with property owners.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Our Role
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-dark)]">
                <p>
                  Group Escape Houses provides a listing and advertising service for large group holiday accommodation. We are not a booking agency and do not take payments or enter into booking contracts with guests.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Enquiries and Bookings
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-dark)]">
                <p>
                  When you find a property you wish to book, you can send an enquiry directly to the property owner through our platform. All subsequent communication, negotiation, and booking arrangements are conducted directly between you and the owner.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Payments and Deposits
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-dark)]">
                <p>
                  All payments, including deposits, final balances, and security deposits, are paid directly to the property owner.
                </p>
                <p>
                  Payment terms, deadlines, and accepted payment methods are set by the individual property owner. We recommend you review and agree to these terms directly with the owner before making any payment.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Cancellations and Refunds
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-dark)]">
                <p>
                  Cancellation policies are set by individual property owners. Any request for a refund or change to your booking must be made directly to the owner.
                </p>
                <p>
                  Group Escape Houses cannot facilitate refunds as we do not handle guest payments.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Liability
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-dark)]">
                <p>
                  The contract for accommodation is exclusively between the guest and the property owner. Group Escape Houses accepts no liability for any issues arising from the booking, the property itself, or the conduct of the guest or owner.
                </p>
              </div>
            </div>

            <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Contact Us
              </h3>
              <p className="text-[var(--color-neutral-dark)] mb-4">
                If you have any questions about how our platform works, please get in touch.
              </p>
              <p className="text-[var(--color-neutral-dark)]">
                <strong>Email:</strong> <a href="mailto:hello@groupescapehouses.co.uk" className="text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">hello@groupescapehouses.co.uk</a>
              </p>
            </div>

            <div className="mt-8 text-sm text-[var(--color-neutral-dark)]">
              <p><em>Last updated: December 2025</em></p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
