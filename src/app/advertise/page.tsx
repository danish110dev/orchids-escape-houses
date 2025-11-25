import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  HeartHandshake,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise Your Property - List With Group Escape Houses",
  description: "Reach thousands of group guests looking for luxury UK accommodation. List your property with Group Escape Houses and maximise your bookings with zero upfront costs.",
  openGraph: {
    title: "Advertise Your Property - List With Group Escape Houses",
    description: "Reach thousands of group guests looking for luxury UK accommodation.",
    type: "website",
  },
};

export default function AdvertisePage() {
  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands of Group Guests",
      description: "Connect with hen parties, celebrations, and weekend groups actively searching for luxury accommodation across the UK."
    },
    {
      icon: TrendingUp,
      title: "Maximise Your Bookings",
      description: "Our targeted marketing reaches guests looking for group houses with hot tubs, pools, and party-ready features."
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Join a premium platform with 3,000+ five-star reviews. We handle marketing, enquiries, and payment collection."
    },
    {
      icon: Clock,
      title: "Quick & Easy Setup",
      description: "List your property in minutes. We'll create professional listings with photography support available."
    },
    {
      icon: CreditCard,
      title: "No Upfront Costs",
      description: "Zero listing fees. You only pay commission on confirmed bookings - no risk, just results."
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Support",
      description: "Our UK-based team handles guest enquiries, bookings, and support so you can focus on hosting."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Submit Your Property",
      description: "Complete our simple form with property details, photos, and availability. We'll review within 48 hours."
    },
    {
      step: "2",
      title: "We Create Your Listing",
      description: "Our team crafts a stunning listing page optimised to attract group bookings. Professional photography available."
    },
    {
      step: "3",
      title: "Start Receiving Bookings",
      description: "Your property goes live and starts appearing in searches. We handle enquiries and secure bookings on your behalf."
    },
    {
      step: "4",
      title: "Get Paid Securely",
      description: "Receive payment directly to your account after each booking. Simple, transparent, and hassle-free."
    }
  ];

  const requirements = [
    "Sleeps 8+ guests (ideal for group stays)",
    "High-quality interiors and well-maintained",
    "Desirable features: hot tub, pool, games room, or unique selling points",
    "Located in popular UK destinations or beautiful countryside",
    "Available for weekend and midweek bookings",
    "Clear house rules and check-in/check-out procedures"
  ];

  const faqs = [
    {
      question: "What commission do you charge?",
      answer: "Our commission structure is competitive and transparent. We only charge a percentage on confirmed bookings - no upfront costs or listing fees. Contact us for specific rates tailored to your property."
    },
    {
      question: "Do I need professional photos?",
      answer: "High-quality photos significantly improve booking rates. We can arrange professional photography at a discounted rate, or you can submit your own professional images."
    },
    {
      question: "How do I manage my calendar?",
      answer: "We provide access to an owner dashboard where you can manage availability, view bookings, and sync with other platforms via iCal."
    },
    {
      question: "Who handles guest communication?",
      answer: "Our UK-based team manages all enquiries, bookings, and guest support. You'll be notified of confirmed bookings and can communicate directly with guests if needed."
    },
    {
      question: "What about damage deposits?",
      answer: "We collect security deposits from guests and handle any damage claims on your behalf, ensuring your property is protected."
    },
    {
      question: "Can I block out dates?",
      answer: "Absolutely. You have full control over your calendar and can block dates for personal use or maintenance at any time."
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-sage)]/10 rounded-full border border-[var(--color-accent-sage)]/20">
                <Sparkles className="w-4 h-4 text-[var(--color-accent-sage)]" />
                <span className="text-sm font-medium text-[var(--color-accent-sage)]">
                  List Your Property Today
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Advertise Your Property on Group Escape Houses
              </h1>
              
              <p className="text-xl text-[var(--color-neutral-dark)] leading-relaxed">
                Join the UK's leading platform for luxury group accommodation. Reach thousands of guests looking for hen parties, celebrations, and unforgettable weekends.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  asChild
                  size="lg"
                  className="rounded-2xl px-8 py-6 text-lg font-medium text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--color-accent-sage)" }}
                >
                  <Link href="#apply">
                    List Your Property
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-2xl px-8 py-6 text-lg font-medium border-2"
                  style={{ borderColor: "var(--color-accent-gold)" }}
                >
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]" />
                  <span className="font-semibold">3,000+ Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-[var(--color-accent-sage)]" />
                  <span className="font-semibold">100+ Properties</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Luxury property exterior"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[var(--color-accent-sage)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-neutral-dark)]">Average Increase</p>
                    <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>+45% Bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why List With Us?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)]">
              We're not just another booking platform. We're specialists in luxury group accommodation with a proven track record.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-sage)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-neutral-dark)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How It Works
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)]">
              Getting started is simple. Follow these four easy steps to start maximising your property's potential.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-gold)] flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)]">
                    {item.description}
                  </p>
                </div>
                
                {/* Arrow connector (hidden on last item) */}
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[var(--color-accent-gold)] w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Is Your Property Right for Us?
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] mb-8">
                We work with a curated selection of properties that meet our quality standards and appeal to group guests.
              </p>
              
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-[var(--color-neutral-dark)]">{requirement}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-[var(--color-accent-sage)]/10 rounded-2xl border border-[var(--color-accent-sage)]/20">
                <p className="text-[var(--color-neutral-dark)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Not sure if you qualify?</strong> Get in touch anyway! We love unique properties and are always looking to expand our collection.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
                alt="Luxury interior"
                width={400}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80"
                alt="Property pool"
                width={400}
                height={500}
                className="rounded-2xl w-full h-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)]">
              Fill in the form below and we'll be in touch within 48 hours to discuss your property.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="propertyName" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Property Name
                </label>
                <input
                  type="text"
                  id="propertyName"
                  name="propertyName"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Property Location (City/Region) *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Brighton, Cotswolds, Lake District"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                    Number of Bedrooms *
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="sleeps" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                    Maximum Guests *
                  </label>
                  <input
                    type="number"
                    id="sleeps"
                    name="sleeps"
                    required
                    min="8"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="features" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Key Features
                </label>
                <textarea
                  id="features"
                  name="features"
                  rows={3}
                  placeholder="e.g. Hot tub, swimming pool, games room, cinema room..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Property Website or Listing URL (if available)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us anything else about your property or any questions you have..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-accent-sage)] focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <Button 
                type="submit"
                size="lg"
                className="w-full rounded-2xl px-8 py-6 text-lg font-medium text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ background: "var(--color-accent-sage)" }}
              >
                Submit Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-center text-[var(--color-neutral-dark)]">
                By submitting this form, you agree to be contacted by Group Escape Houses regarding your property listing.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)]">
              Everything you need to know about listing your property with us.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group bg-[var(--color-bg-primary)] rounded-2xl p-6 hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                <summary className="flex items-start justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold pr-8" style={{ fontFamily: "var(--font-display)" }}>
                    {faq.question}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-[var(--color-accent-sage)] transform group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-[var(--color-neutral-dark)] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          
          <div className="mt-12 text-center p-8 bg-[var(--color-accent-sage)]/10 rounded-2xl border border-[var(--color-accent-sage)]/20">
            <p className="text-lg text-[var(--color-neutral-dark)] mb-4">
              Still have questions? Our team is here to help.
            </p>
            <Button 
              asChild
              className="rounded-2xl px-8 py-3 font-medium text-white"
              style={{ background: "var(--color-accent-gold)" }}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ready to Maximise Your Property's Potential?
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] mb-8 max-w-3xl mx-auto">
            Join Group Escape Houses today and start reaching thousands of group guests looking for their perfect weekend escape.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg font-medium text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: "var(--color-accent-sage)" }}
            >
              <Link href="#apply">
                List Your Property Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-6 text-lg font-medium border-2"
              style={{ borderColor: "var(--color-accent-gold)" }}
            >
              <Link href="/contact">Speak to Our Team</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--color-neutral-dark)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-sage)]" />
              <span>No Upfront Costs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-sage)]" />
              <span>48 Hour Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-sage)]" />
              <span>UK Support Team</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
