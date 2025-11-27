import Link from "next/link";
import { CheckCircle, TrendingUp, Users, Shield, Clock, Award, ArrowRight, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AdvertiseWithUs() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
                List Your Property with Group Escape Houses
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-[var(--color-neutral-dark)]">
                Join our network of premium group accommodation providers and reach thousands of group travellers across the UK
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="rounded-2xl px-8 py-6 font-medium transition-all hover:scale-[1.05]"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                    }}
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+441273569301">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-2xl px-8 py-6 font-medium border-2 transition-all hover:bg-white"
                    style={{
                      borderColor: "var(--color-accent-gold)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 01273 569301
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why List With Us */}
        <section id="benefits" className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Why List Your Property with Us
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
                We connect property owners with quality group bookings across the UK
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <TrendingUp className="w-12 h-12 mb-4 text-[var(--color-accent-sage)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Increased Bookings
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Access our established customer base actively searching for large group accommodation
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <Users className="w-12 h-12 mb-4 text-[var(--color-accent-pink)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Quality Guests
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  We pre-screen enquiries and match your property with suitable groups
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <Shield className="w-12 h-12 mb-4 text-[var(--color-accent-gold)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Secure Payments
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  We handle payment processing, deposits, and damage protection on your behalf
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <Clock className="w-12 h-12 mb-4 text-[var(--color-accent-sage)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Time Saving
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Our team handles enquiries, bookings, and guest communications
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <Award className="w-12 h-12 mb-4 text-[var(--color-accent-pink)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Professional Marketing
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Professional photography, listing optimization, and targeted advertising
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--color-bg-primary)] transition-transform hover:scale-105">
                <CheckCircle className="w-12 h-12 mb-4 text-[var(--color-accent-gold)]" />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  No Upfront Costs
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Commission-based model means you only pay when you get bookings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                How It Works
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
                Getting your property listed is simple and straightforward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--color-accent-sage)] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Contact Us
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Get in touch via phone or email to discuss your property
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--color-accent-pink)] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Property Review
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  We assess your property and discuss commission terms
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--color-accent-gold)] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Create Listing
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Professional photos taken and your listing goes live
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--color-accent-sage)] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Start Earning
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  We manage bookings and you receive payments directly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Transparent Commission Structure
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
                Simple, fair pricing with no hidden fees or charges
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-[var(--color-bg-primary)] rounded-3xl p-12">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-sage)" }}>
                  15-20%
                </div>
                <p className="text-xl text-[var(--color-neutral-dark)]">
                  Commission on confirmed bookings
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <p className="text-[var(--color-neutral-dark)]">
                    <strong>No upfront costs</strong> – You only pay when you get bookings
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <p className="text-[var(--color-neutral-dark)]">
                    <strong>No monthly fees</strong> – Commission-only model
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <p className="text-[var(--color-neutral-dark)]">
                    <strong>Professional photography</strong> – Included in service
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <p className="text-[var(--color-neutral-dark)]">
                    <strong>Marketing support</strong> – SEO, social media, and advertising
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <p className="text-[var(--color-neutral-dark)]">
                    <strong>Full booking management</strong> – We handle everything
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Requirements */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Property Requirements
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
                We work with properties that meet our quality standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Ideal Properties Include
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Sleeps 10+ guests comfortably</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">High-quality interiors and furnishings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Premium amenities (hot tub, pool, games room)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Well-maintained with excellent reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Located in popular UK destinations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  What We Look For
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Responsive and professional owners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Clear availability calendar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Competitive pricing for the market</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Flexible booking terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-neutral-dark)]">Commitment to guest satisfaction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Provide */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                What We Provide for You
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
                Comprehensive support to maximize your property's potential
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-sage)" }}>
                  Marketing & Exposure
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Professional property photography and videography</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Featured placement on our website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">SEO optimization for search engines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Social media promotion to 20,000+ followers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Email marketing to our subscriber base</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-pink)" }}>
                  Booking Management
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">24/7 enquiry handling and response</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Guest vetting and screening process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Secure payment processing and deposits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Contract management and documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)] flex-shrink-0 mt-2"></div>
                    <span className="text-[var(--color-neutral-dark)]">Post-booking guest support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-[var(--color-bg-primary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-sage)" }}>
                  3,000+
                </div>
                <p className="text-[var(--color-neutral-dark)]">5 Star Reviews</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-pink)" }}>
                  50+
                </div>
                <p className="text-[var(--color-neutral-dark)]">Listed Properties</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-gold)" }}>
                  20K+
                </div>
                <p className="text-[var(--color-neutral-dark)]">Social Followers</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-sage)" }}>
                  10+
                </div>
                <p className="text-[var(--color-neutral-dark)]">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-white">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  What type of properties do you accept?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  We specialize in large group accommodation sleeping 10 or more guests. Properties should have high-quality interiors and desirable amenities such as hot tubs, pools, or games rooms. Location matters too – we focus on popular UK destinations with good transport links.
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  How does the commission structure work?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Our commission ranges from 15-20% depending on the property and booking volume. There are no upfront costs, monthly fees, or hidden charges. You only pay commission on confirmed bookings. We handle all payment processing and deposit management.
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Do I need to be exclusive with Group Escape Houses?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  No, you can list your property on other platforms. However, we require accurate availability management to avoid double bookings. We provide calendar syncing tools to make this easier.
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  How long does it take to get my property live?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Once approved, we arrange professional photography within 1-2 weeks. Your listing typically goes live within 2-3 weeks of initial contact. We can work faster for urgent cases.
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  What support do you provide?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Our Brighton-based team handles all guest enquiries, booking management, payment processing, and post-booking support. You maintain control of your calendar and pricing while we handle the operational work.
                </p>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Can I set my own pricing?
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  Yes, you set your own rates. We provide market insights and pricing recommendations to help you stay competitive, but the final decision is always yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[var(--color-accent-sage)] to-[var(--color-accent-gold)]">
          <div className="max-w-[900px] mx-auto px-6 text-center text-white">
            <h2 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Ready to List Your Property?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join our network of successful property owners and start receiving quality bookings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <a
                  href="tel:+441273569301"
                  className="text-lg hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  01273 569301
                </a>
                <p className="text-sm mt-2 opacity-75">Mon-Fri, 9am-6pm</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <a
                  href="mailto:hello@groupescapehouses.co.uk"
                  className="text-lg hover:text-[var(--color-accent-gold)] transition-colors break-all"
                >
                  hello@groupescapehouses.co.uk
                </a>
                <p className="text-sm mt-2 opacity-75">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-2xl px-12 py-6 font-medium transition-all hover:scale-[1.05]"
                  style={{
                    background: "white",
                    color: "var(--color-accent-sage)",
                  }}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
