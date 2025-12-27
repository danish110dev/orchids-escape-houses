import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Users, Home, MapPin, Check, ArrowRight, Bed, Bath, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UKServiceSchema from "@/components/UKServiceSchema";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq, gte } from "drizzle-orm";
import { validateImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Large Group Accommodation UK | Houses Sleeping 10-30 Guests | Group Escape Houses",
  description: "Find large group accommodation across the UK sleeping 10 to 30 guests. Perfect for family reunions, birthday celebrations, corporate retreats, and group weekends. Book luxury houses with hot tubs, games rooms and more.",
  keywords: "large group accommodation UK, group accommodation UK, houses sleeping 10 guests, houses sleeping 20 guests, houses sleeping 30 guests, large group holidays UK, group getaways UK",
  alternates: {
    canonical: "https://www.groupescapehouses.co.uk/large-group-accommodation",
  },
  openGraph: {
    title: "Large Group Accommodation UK | Houses Sleeping 10-30 Guests",
    description: "Find large group accommodation across the UK sleeping 10 to 30 guests. Perfect for family reunions, birthdays, corporate retreats and group weekends.",
    url: "https://www.groupescapehouses.co.uk/large-group-accommodation",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
  },
};

export default async function LargeGroupAccommodationPage() {
  const largeProperties = await db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .limit(6);

  const groupSizes = [
    { size: "10-12 guests", description: "Perfect for intimate group celebrations, small family reunions, and close friend getaways", link: "/properties?sleeps=10" },
    { size: "14-16 guests", description: "Ideal for medium-sized groups, extended families, and birthday weekends", link: "/properties?sleeps=14" },
    { size: "18-20 guests", description: "Great for larger celebrations, milestone birthdays, and corporate team building", link: "/properties?sleeps=18" },
    { size: "22-25 guests", description: "Spacious accommodation for big family gatherings and multi-generational holidays", link: "/properties?sleeps=22" },
    { size: "26-30 guests", description: "Our largest properties for major celebrations, weddings, and grand reunions", link: "/properties?sleeps=26" },
  ];

  const occasions = [
    { title: "Group Weekends", description: "Quality time with friends in stunning surroundings", icon: Users, link: "/weekend-breaks" },
    { title: "Birthday Celebrations", description: "Mark milestone birthdays in style", icon: Home, link: "/special-celebrations" },
    { title: "Family Reunions", description: "Bring the whole family together under one roof", icon: Users, link: "/holiday-focus/multi-generational-holidays" },
    { title: "Corporate Retreats", description: "Team building in inspiring locations", icon: MapPin, link: "/holiday-focus/business-offsite-corporate-accommodation" },
  ];

  const topDestinations = [
    { name: "Lake District", slug: "lake-district", description: "Stunning lakeside lodges and mountain retreats" },
    { name: "Cornwall", slug: "cornwall", description: "Coastal properties with beach access" },
    { name: "Yorkshire", slug: "yorkshire", description: "Rural escapes in the Dales and Moors" },
    { name: "Cotswolds", slug: "cotswolds", description: "Honey-stone manors and country estates" },
    { name: "Devon", slug: "devon", description: "Dartmoor lodges and coastal houses" },
    { name: "Peak District", slug: "peak-district", description: "Countryside retreats and converted barns" },
  ];

  const faqs = [
    {
      question: "What is large group accommodation?",
      answer: "Large group accommodation refers to properties that can sleep 10 or more guests comfortably. These are typically large houses, manor houses, converted barns, or lodges with multiple bedrooms, bathrooms, and communal spaces designed for groups to stay together rather than in separate hotel rooms."
    },
    {
      question: "What group sizes do you cater for?",
      answer: "We specialise in properties sleeping from 10 to 30 guests. Whether you need accommodation for 10 friends, a family reunion of 20, or a celebration with 30 guests, we have suitable properties across the UK. Each listing clearly shows the maximum sleeping capacity."
    },
    {
      question: "Are your properties suitable for families with children?",
      answer: "Yes, many of our large group properties are perfect for multi-generational family holidays. Properties often include family-friendly features like enclosed gardens, games rooms, and ground floor bedrooms. We recommend checking individual property details or contacting us to find the most suitable options."
    },
    {
      question: "Can we book for corporate events and team building?",
      answer: "Absolutely. Our large group houses are popular choices for corporate retreats, team building events, and business offsites. Many properties offer spaces suitable for meetings, breakout areas, and team activities, combined with accommodation that keeps your team together."
    },
    {
      question: "How does booking work for large groups?",
      answer: "Simply browse our properties, select your preferred house, and submit an enquiry with your dates and group size. Our team will respond within 24 hours with availability and pricing. You then book directly with the property owner, who handles payment and contracts."
    },
    {
      question: "What amenities are typically included?",
      answer: "Most large group properties include fully equipped kitchens, multiple bathrooms, spacious living areas, dining tables for the whole group, WiFi, and parking. Many also feature hot tubs, games rooms, gardens, and outdoor spaces. Specific amenities vary by property."
    },
  ];

  const transformedProperties = largeProperties.map(p => ({
    id: p.id.toString(),
    title: p.title,
    location: p.location,
    sleeps: p.sleepsMax,
    bedrooms: p.bedrooms,
    priceFrom: Math.round(p.priceFromMidweek / 3),
    image: validateImageUrl(p.heroImage, p.title),
    features: [],
    slug: p.slug,
  }));

  return (
    <div className="min-h-screen bg-white">
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Large Group Accommodation", url: "/large-group-accommodation" }
          ]
        }}
      />
      <UKServiceSchema 
        type="faq" 
        data={{ faqs }}
      />
      <UKServiceSchema 
        type="itemList" 
        data={{
          items: transformedProperties.map(p => ({ ...p, url: `/properties/${p.slug}` }))
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90"
          alt="Large luxury group accommodation in the UK countryside"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
            Large Group Accommodation UK
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-white/90">
            Luxury houses sleeping 10 to 30 guests across the UK. Perfect for family reunions, birthday celebrations, corporate retreats, and unforgettable group weekends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              <Link href="/properties">Browse All Properties</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 py-7 text-xl font-bold bg-white/10 backdrop-blur-sm border-2 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Link href="/contact">Get Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Finding the Perfect Large Group Accommodation
            </h2>
            <div className="prose prose-lg max-w-none text-[var(--color-neutral-dark)]">
              <p className="text-lg leading-relaxed mb-6">
                Planning a getaway for a large group can be challenging. Hotels mean separate rooms, different floors, and fragmented experiences. That's why more and more groups are choosing large group accommodation — spacious houses where everyone stays together under one roof, creating the perfect environment for quality time, shared meals, and lasting memories.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Group Escape Houses specialises in connecting groups with the finest large houses to rent across the United Kingdom. Whether you're organising a <Link href="/holiday-focus/multi-generational-holidays" className="text-[var(--color-accent-sage)] hover:underline font-medium">multi-generational family holiday</Link>, a milestone <Link href="/special-celebrations" className="text-[var(--color-accent-sage)] hover:underline font-medium">birthday celebration</Link>, a <Link href="/holiday-focus/business-offsite-corporate-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">corporate retreat</Link>, or simply a <Link href="/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">weekend away with friends</Link>, we have properties to suit every occasion and group size.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our carefully selected properties range from cosy <Link href="/house-styles/large-cottages" className="text-[var(--color-accent-sage)] hover:underline font-medium">large cottages</Link> sleeping 10-12 guests to grand <Link href="/house-styles/manor-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">manor houses</Link> and <Link href="/house-styles/stately-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">stately homes</Link> accommodating 25-30 guests. Many feature sought-after amenities including <Link href="/houses-with-hot-tubs" className="text-[var(--color-accent-sage)] hover:underline font-medium">private hot tubs</Link>, <Link href="/houses-with-games-rooms" className="text-[var(--color-accent-sage)] hover:underline font-medium">games rooms</Link>, <Link href="/features/swimming-pool" className="text-[var(--color-accent-sage)] hover:underline font-medium">swimming pools</Link>, and expansive grounds — everything you need for an unforgettable group stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Sizes Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Accommodation by Group Size
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            From intimate gatherings of 10 to grand celebrations of 30, find the perfect property for your group
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupSizes.map((group, index) => (
              <Link 
                key={index}
                href={group.link}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-sage)" }}>
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-accent-sage)] transition-colors">
                  Sleeps {group.size}
                </h3>
                <p className="text-[var(--color-neutral-dark)] leading-relaxed mb-4">{group.description}</p>
                <span className="text-[var(--color-accent-sage)] font-medium inline-flex items-center gap-2">
                  View properties <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Large Group Accommodation */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Why Choose Large Group Accommodation?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Everyone Together Under One Roof</h3>
                    <p className="text-[var(--color-neutral-dark)]">No more coordinating across different hotels or holiday parks. Large group houses keep your party together, making it easy to socialise, share meals, and create memories.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Better Value Per Person</h3>
                    <p className="text-[var(--color-neutral-dark)]">When split between 10, 20, or 30 guests, large house rentals often work out significantly cheaper than individual hotel rooms, especially for weekend breaks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Exclusive Use and Privacy</h3>
                    <p className="text-[var(--color-neutral-dark)]">The entire property is yours for the duration of your stay. Enjoy private grounds, exclusive amenities, and the freedom to celebrate without disturbing other guests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Self-Catering Flexibility</h3>
                    <p className="text-[var(--color-neutral-dark)]">Fully equipped kitchens mean you can cater for yourselves, arrange a <Link href="/holiday-focus/book-private-chef" className="text-[var(--color-accent-sage)] hover:underline">private chef</Link>, or mix dining out with home cooking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Premium Amenities</h3>
                    <p className="text-[var(--color-neutral-dark)]">Many properties feature hot tubs, games rooms, cinema rooms, tennis courts, and stunning grounds that hotels simply cannot match.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90"
                alt="Large group enjoying accommodation together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Occasions */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Perfect for Every Occasion
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Our large group properties cater for all types of celebrations and getaways
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occasion, index) => {
              const Icon = occasion.icon;
              return (
                <Link 
                  key={index}
                  href={occasion.link}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-sage)] transition-colors">
                    {occasion.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)] text-sm">{occasion.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Top Destinations for Large Groups
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Discover group-friendly locations across the United Kingdom
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {topDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group bg-[var(--color-bg-primary)] p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[var(--color-accent-sage)]" />
                  <h3 className="text-xl font-bold group-hover:text-[var(--color-accent-sage)] transition-colors">
                    {destination.name}
                  </h3>
                </div>
                <p className="text-[var(--color-neutral-dark)]">{destination.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-bold"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {transformedProperties.length > 0 && (
        <section className="py-20 bg-[var(--color-bg-primary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Featured Large Group Properties
                </h2>
                <p className="text-xl text-[var(--color-neutral-dark)]">Handpicked houses perfect for groups</p>
              </div>
              <Button asChild variant="ghost" className="text-[var(--color-accent-sage)] font-bold text-lg hover:bg-transparent hover:underline p-0">
                <Link href="/properties">View all properties <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transformedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12">
            Everything you need to know about large group accommodation
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-100 rounded-2xl overflow-hidden bg-[var(--color-bg-primary)]">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-lg pr-4">{faq.question}</span>
                  <ChevronDown className="w-6 h-6 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[var(--color-neutral-dark)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="bg-white p-16 rounded-[40px] shadow-xl border border-gray-100">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Book Your Group Stay?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] mb-10 max-w-3xl mx-auto">
              Get in touch today and let us help you find the perfect large group accommodation for your celebration, reunion, or getaway.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-12 py-8 text-xl font-bold"
                style={{ background: "var(--color-accent-sage)", color: "white" }}
              >
                <Link href="/contact">Check Availability</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-12 py-8 text-xl font-bold"
              >
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
