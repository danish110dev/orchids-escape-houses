import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  CreditCard,
  BarChart3,
  FileEdit,
  Bell,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  Star,
  Check,
  X
} from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise Your Property on Group Escape Houses",
  description: "No hidden costs. No hidden surprises. List your luxury holiday property with a straightforward annual subscription. No commission fees, just direct bookings.",
  openGraph: {
    title: "Advertise Your Property on Group Escape Houses",
    description: "No hidden costs. No hidden surprises. Commission-free bookings with annual membership.",
    type: "website",
  },
};

export default function AdvertiseWithUs() {
  const benefits = [
    {
      icon: MessageSquare,
      title: "Direct Contact with Guests",
      description: "We're all about direct bookings. Prospective guests can contact you directly through your page making it easier for everyone - and of course, there is no commission to pay."
    },
    {
      icon: CreditCard,
      title: "Commission-Free Bookings",
      description: "We simply charge a simple annual subscription to list on the site; there's no commission to pay. Just take direct bookings."
    },
    {
      icon: BarChart3,
      title: "Owner's Dashboard",
      description: "You have access to a dashboard where you can monitor enquiries and stats for your listing."
    },
    {
      icon: FileEdit,
      title: "Unique Property Page",
      description: "You have full control over your own property listing page. Make edits, update photos, and share deals and availability."
    },
    {
      icon: Bell,
      title: "Free Late Availability Feature",
      description: "You can populate your late availability entries for up to three months ahead. As premium slots, Christmas and New Year are always there as they are important to fill as early as possible."
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Team Support",
      description: "Our production team are on hand to support you at every step - from building your property page to securing more enquiries."
    }
  ];

  const membershipTiers = [
    {
      name: "Bronze",
      annualPrice: "£450",
      monthlyPrice: "£40",
      totalMonthly: "£480",
      savings: null,
      features: [
        { name: "Annual Membership with Fully Optimised Listing", value: "£450", included: true },
        { name: "Page Build and Ongoing Production Support", value: "£100", included: false },
        { name: "Social Media Promotion, inc Late Deals", value: "£100", included: false },
        { name: "Themed Blog Feature", value: "£100", included: false },
        { name: "3 x Holiday Focus Pages", value: "£150", included: false },
        { name: "Homepage Features", value: "£150", included: false },
        { name: "Specialist Page (Weddings, Youth or Business)", value: "£150", included: false }
      ]
    },
    {
      name: "Silver",
      annualPrice: "£650",
      monthlyPrice: "£57",
      totalMonthly: "£684",
      savings: "£300",
      totalValue: "£950",
      popular: true,
      features: [
        { name: "Annual Membership with Fully Optimised Listing", value: "£450", included: true },
        { name: "Page Build and Ongoing Production Support", value: "£100", included: true },
        { name: "Social Media Promotion, inc Late Deals", value: "£100", included: true },
        { name: "Themed Blog Feature", value: "£100", included: false },
        { name: "3 x Holiday Focus Pages", value: "£150", included: false },
        { name: "Homepage Features", value: "£150", included: false },
        { name: "Specialist Page (Weddings, Youth or Business)", value: "£150", included: false }
      ]
    },
    {
      name: "Gold",
      annualPrice: "£850",
      monthlyPrice: "£75",
      totalMonthly: "£900",
      savings: "£400",
      totalValue: "£1250",
      features: [
        { name: "Annual Membership with Fully Optimised Listing", value: "£450", included: true },
        { name: "Page Build and Ongoing Production Support", value: "£100", included: true },
        { name: "Social Media Promotion, inc Late Deals", value: "£100", included: true },
        { name: "Themed Blog Feature", value: "£100", included: true },
        { name: "3 x Holiday Focus Pages", value: "£150", included: true },
        { name: "Homepage Features", value: "£150", included: true },
        { name: "Specialist Page (Weddings, Youth or Business)", value: "£150", included: true }
      ]
    }
  ];

  const membershipIncludes = [
    "Direct enquiries with no commission charged; all enquiries go straight to you",
    "Dedicated support via phone or email from our team",
    "Direct link to your own booking system or website through seamless integration",
    "Live availability through iCal feed connections for real-time updates",
    "Rich media gallery to showcase your property with images, videos, and floorplans",
    "Market insights and regular guidance on market trends and booking behavior"
  ];

  const standardMarketing = [
    "SEO optimization",
    "Unlimited listings",
    "PR outreach",
    "New property features"
  ];

  const testimonials = [
    {
      quote: "A great company to work with. Set up the profile quickly and to a high quality - the whole process could not be easier. Within 24 hours we were getting enquiries leading to bookings, paying back the annual subscription immediately.",
      author: "Graeme McFall",
      property: "The Hollies, Argyll, Bute"
    },
    {
      quote: "What an amazing year we have had with Group Escape Houses. A day doesn't go by without an enquiry and we are pleased with our conversion rate. Their site is so user-friendly also and the team always greets you personally. Keep up the good work.",
      author: "Sharon",
      property: "Walnut Barn Estate"
    },
    {
      quote: "We finally joined in late February 23 and - wow! We are so pleased at the responses we have had in only 2 months and confirmed bookings. The team are easy to work with and we are excited to be onboard and work with them in the future.",
      author: "Tony",
      property: "Radcliffes Lodge"
    }
  ];

  const resources = [
    { title: "Meet the Team", href: "/our-story" },
    { title: "Properties Recently Joined", href: "/properties" },
    { title: "Property Types", href: "/house-styles" },
    { title: "Read Owner Feedback", href: "#testimonials" },
    { title: "Success Stories", href: "#testimonials" },
    { title: "Owner Guides", href: "#resources" }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]"></div>
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Advertise Your Property on Group Escape Houses
              </h1>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-2 border-[var(--color-accent-sage)] mb-8">
                <Sparkles className="w-5 h-5 text-[var(--color-accent-sage)]" />
                <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                  No Hidden Costs. No Hidden Surprises.
                </span>
              </div>
              
              <p className="text-xl text-[var(--color-neutral-dark)] leading-relaxed mb-10">
                If you're looking for more control, more flexibility to do what you want, and a straightforward partner with no hidden fees, then Group Escape Houses could be just the thing for your luxury holiday property.
              </p>
              
              <Button 
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ background: "var(--color-accent-sage)" }}
              >
                <Link href="#pricing">
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                What you get with your listing on Group Escape Houses
              </h2>
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

            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-6 text-lg font-medium border-2"
                style={{ borderColor: "var(--color-accent-sage)" }}
              >
                <Link href="/our-story">About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Different Section */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
                Why is Group Escape Houses different?
              </h2>
              <p className="text-xl text-[var(--color-neutral-dark)] leading-relaxed">
                Group Escape Houses puts you back in control. We don't charge any commission, just an annual subscription fee. You dictate your prices, have complete control over your calendar and have unfettered access to your potential guests.
              </p>
              <p className="text-xl text-[var(--color-neutral-dark)] leading-relaxed mt-6">
                If you need a hand with your marketing or listing, our experienced team is ready to help increase the visibility of your amazing property and increase your bookings.
              </p>
            </div>
          </div>
        </section>

        {/* Membership Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Membership & Pricing Options
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {membershipTiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`relative rounded-3xl p-8 border-2 ${
                    tier.popular 
                      ? 'border-[var(--color-accent-sage)] shadow-2xl scale-105 bg-white' 
                      : 'border-gray-200 bg-[var(--color-bg-primary)]'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[var(--color-accent-sage)] text-white px-6 py-2 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {tier.name}
                    </h3>
                    {tier.totalValue && (
                      <p className="text-sm text-[var(--color-neutral-dark)] mb-2">
                        Total Value {tier.totalValue}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-accent-sage)]" />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${feature.included ? 'text-[var(--color-text-primary)] font-medium' : 'text-gray-400'}`}>
                            {feature.name}
                          </p>
                          <p className="text-xs text-[var(--color-neutral-dark)] mt-0.5">
                            {feature.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t-2 pt-6 mb-6">
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Pay Annually</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          {tier.annualPrice}
                        </span>
                        <span className="text-[var(--color-neutral-dark)]">+ VAT</span>
                      </div>
                      {tier.savings && (
                        <p className="text-sm font-bold text-[var(--color-accent-sage)] mt-1">
                          YOU SAVE {tier.savings}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">Pay Monthly</p>
                      <p className="text-sm text-[var(--color-neutral-dark)]">
                        {tier.monthlyPrice} ({tier.totalMonthly} Total)
                      </p>
                      <p className="text-xs text-[var(--color-neutral-dark)] mt-1">
                        One Year Minimum Membership
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    size="lg"
                    className={`w-full rounded-2xl px-8 py-6 font-semibold transition-all hover:-translate-y-0.5 ${
                      tier.popular 
                        ? 'bg-[var(--color-accent-sage)] text-white hover:bg-[var(--color-accent-sage)]/90' 
                        : 'bg-white text-[var(--color-accent-sage)] border-2 border-[var(--color-accent-sage)]'
                    }`}
                  >
                    <Link href="#contact">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Membership Includes */}
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Your annual Group Escape Houses membership includes:
                </h3>
                <ul className="space-y-3">
                  {membershipIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-accent-sage)]" />
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Our standard marketing support for all properties:
                </h3>
                <ul className="space-y-3">
                  {standardMarketing.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-accent-sage)]" />
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Download Section */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] rounded-3xl p-12 text-center text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Take More Direct Bookings
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Want to learn more about working with Group Escape Houses to take more direct bookings? Our owners guide provides more information on how we can work for your property.
              </p>
              <Button 
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 text-lg font-semibold bg-white text-[var(--color-accent-sage)] hover:bg-white/90 transition-all hover:-translate-y-0.5"
              >
                <Link href="#contact">
                  Download
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Owner Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Owner Resources
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {resources.map((resource, index) => (
                <Link 
                  key={index}
                  href={resource.href}
                  className="group p-6 rounded-2xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-accent-sage)] transition-all hover:shadow-lg text-center"
                >
                  <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                    {resource.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[var(--color-bg-primary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]" />
                    ))}
                  </div>
                  <p className="text-[var(--color-neutral-dark)] leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[var(--color-text-primary)]">{testimonial.author}</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{testimonial.property}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 text-lg font-medium text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ background: "var(--color-accent-sage)" }}
              >
                <Link href="/reviews">
                  View Success Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contact" className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Join Group Escape Houses Today
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] mb-12 max-w-3xl mx-auto">
              Ready to elevate your property's potential? Partner with us for luxury group bookings and seamless management.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-8 text-left">
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Email Us
                </h3>
                <a href="mailto:hello@groupescapehouses.co.uk" className="text-[var(--color-accent-sage)] hover:underline text-lg">
                  hello@groupescapehouses.co.uk
                </a>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-left">
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Visit Our Office
                </h3>
                <p className="text-[var(--color-neutral-dark)]">
                  11a North St, Brighton and Hove<br />
                  Brighton BN41 1DH
                </p>
              </div>
            </div>

            <Button 
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: "var(--color-accent-sage)" }}
            >
              <Link href="/contact">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}