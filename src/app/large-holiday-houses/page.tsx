import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Home, Users, MapPin, Check, ArrowRight, Star, Bed, Bath, ChevronDown, Waves, Gamepad2, Film } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UKServiceSchema from "@/components/UKServiceSchema";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Large Holiday Houses UK | Luxury Houses for Groups | Group Escape Houses",
  description: "Book large holiday houses across the UK perfect for group getaways. Luxury properties sleeping 10-30 guests with hot tubs, games rooms, pools and stunning locations. Ideal for families, friends and celebrations.",
  keywords: "large holiday houses UK, big holiday homes, large houses to rent UK, holiday homes for groups, luxury holiday houses, group holiday houses UK",
  alternates: {
    canonical: "https://www.groupescapehouses.co.uk/large-holiday-houses",
  },
  openGraph: {
    title: "Large Holiday Houses UK | Luxury Houses for Groups",
    description: "Book large holiday houses across the UK perfect for group getaways. Luxury properties sleeping 10-30 guests with hot tubs, games rooms and stunning locations.",
    url: "https://www.groupescapehouses.co.uk/large-holiday-houses",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
  },
};

export default async function LargeHolidayHousesPage() {
  const holidayHouses = await db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .limit(6);

  const houseStyles = [
    { title: "Manor Houses", description: "Grand period properties with extensive grounds and historic character", slug: "manor-houses", image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&q=80" },
    { title: "Country Houses", description: "Classic British countryside homes in rural settings", slug: "country-houses", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
    { title: "Luxury Cottages", description: "Upscale cottages with premium amenities and modern comforts", slug: "large-cottages", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80" },
    { title: "Coastal Properties", description: "Beachside homes with sea views and beach access", slug: "luxury-cottages-with-sea-views", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" },
  ];

  const popularFeatures = [
    { title: "Hot Tubs", description: "Private hot tubs for relaxation", icon: Waves, link: "/houses-with-hot-tubs" },
    { title: "Games Rooms", description: "Pool tables, darts and entertainment", icon: Gamepad2, link: "/houses-with-games-rooms" },
    { title: "Cinema Rooms", description: "Private cinema experiences", icon: Film, link: "/features/cinema-room" },
    { title: "Swimming Pools", description: "Indoor and outdoor pools", icon: Waves, link: "/features/swimming-pool" },
  ];

  const topRegions = [
    { name: "Lake District", slug: "lake-district", description: "Mountain retreats with stunning lake views" },
    { name: "Cornwall", slug: "cornwall", description: "Coastal escapes with surfing beaches" },
    { name: "Cotswolds", slug: "cotswolds", description: "Honey-stone villages and rolling hills" },
    { name: "Devon", slug: "devon", description: "Dartmoor wilderness and cream tea country" },
    { name: "Yorkshire", slug: "yorkshire", description: "Dales, moors and coastal charm" },
    { name: "Norfolk", slug: "norfolk", description: "Broads, beaches and big skies" },
    { name: "Peak District", slug: "peak-district", description: "Walking country and spa towns" },
    { name: "Sussex", slug: "sussex", description: "South Downs and seaside towns" },
  ];

  const faqs = [
    {
      question: "What makes a property a 'large holiday house'?",
      answer: "Large holiday houses are self-catering properties that can accommodate 10 or more guests. They typically feature multiple bedrooms, several bathrooms, spacious living areas, and facilities designed for groups. Unlike hotels, you have exclusive use of the entire property, including gardens, hot tubs, and other amenities."
    },
    {
      question: "What types of large holiday houses do you offer?",
      answer: "Our portfolio includes manor houses, country estates, converted barns, large cottages, coastal villas, and modern luxury homes. Each property type offers different character and amenities, from historic period features to contemporary design. Browse our house styles to find your perfect match."
    },
    {
      question: "How far in advance should I book?",
      answer: "For peak periods (school holidays, bank holiday weekends, Christmas and New Year), we recommend booking 6-12 months in advance. Popular properties fill quickly. For midweek stays and off-peak periods, 2-3 months notice is usually sufficient, though last-minute availability can sometimes be found."
    },
    {
      question: "Are large holiday houses good value?",
      answer: "Absolutely. When the cost is split between 10, 15, or 20+ guests, large holiday houses often work out cheaper per person than individual hotel rooms. You also save on dining costs with self-catering facilities, and the exclusive use of amenities like hot tubs and games rooms adds significant value."
    },
    {
      question: "What should I consider when choosing a property?",
      answer: "Key factors include: total sleeping capacity versus your group size, bedroom configuration (couples, families, single beds), accessibility requirements, proximity to your planned activities, and specific amenities your group wants. Our team can help match you to the perfect property."
    },
    {
      question: "Can I book add-on experiences?",
      answer: "Yes, many groups enhance their stay with add-on experiences including private chefs, spa treatments, cocktail masterclasses, and activity packages. These can be arranged when you book or added closer to your stay date. See our experiences page for full details."
    },
  ];

  const transformedProperties = holidayHouses.map(p => ({
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
            { name: "Large Holiday Houses", url: "/large-holiday-houses" }
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
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90"
          alt="Large luxury holiday house in the UK countryside"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
            Large Holiday Houses UK
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-white/90">
            Discover stunning large holiday homes across Britain. From country manors to coastal retreats, find the perfect house for your group getaway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              <Link href="/properties">Browse Holiday Houses</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 py-7 text-xl font-bold bg-white/10 backdrop-blur-sm border-2 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Link href="/contact">Check Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              The Best Large Holiday Houses in the UK
            </h2>
            <div className="prose prose-lg max-w-none text-[var(--color-neutral-dark)]">
              <p className="text-lg leading-relaxed mb-6">
                There's something special about gathering your favourite people in a large holiday house. No cramped hotel rooms or coordinating across different accommodations — just one beautiful property where everyone can be together, creating memories that last a lifetime.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Group Escape Houses curates the finest <Link href="/large-group-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">large group accommodation</Link> across the United Kingdom. Our collection spans the dramatic landscapes of the <Link href="/destinations/lake-district" className="text-[var(--color-accent-sage)] hover:underline font-medium">Lake District</Link>, the golden beaches of <Link href="/destinations/cornwall" className="text-[var(--color-accent-sage)] hover:underline font-medium">Cornwall</Link>, the rolling hills of the <Link href="/destinations/cotswolds" className="text-[var(--color-accent-sage)] hover:underline font-medium">Cotswolds</Link>, and everywhere in between. Whether you're seeking a <Link href="/house-styles/manor-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">grand manor house</Link> for a milestone celebration or a <Link href="/house-styles/large-cottages" className="text-[var(--color-accent-sage)] hover:underline font-medium">cosy large cottage</Link> for a family reunion, we have properties to match every vision.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our large holiday houses come equipped with the amenities that transform a good holiday into an extraordinary one. Many feature <Link href="/houses-with-hot-tubs" className="text-[var(--color-accent-sage)] hover:underline font-medium">private hot tubs</Link> for evening relaxation, <Link href="/houses-with-games-rooms" className="text-[var(--color-accent-sage)] hover:underline font-medium">games rooms</Link> for rainy day entertainment, <Link href="/features/swimming-pool" className="text-[var(--color-accent-sage)] hover:underline font-medium">swimming pools</Link> for summer fun, and <Link href="/features/cinema-room" className="text-[var(--color-accent-sage)] hover:underline font-medium">cinema rooms</Link> for movie nights. Combined with fully equipped kitchens, spacious dining areas, and beautiful grounds, these properties offer everything you need for the perfect group escape.
              </p>
              <p className="text-lg leading-relaxed">
                Large holiday houses are ideal for <Link href="/special-celebrations" className="text-[var(--color-accent-sage)] hover:underline font-medium">birthday celebrations</Link>, <Link href="/holiday-focus/multi-generational-holidays" className="text-[var(--color-accent-sage)] hover:underline font-medium">family reunions</Link>, <Link href="/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">weekend breaks with friends</Link>, <Link href="/holiday-focus/business-offsite-corporate-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">corporate retreats</Link>, and <Link href="/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen parties</Link>. Whatever brings your group together, we'll help you find the perfect setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Styles Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Explore House Styles
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            From historic manors to modern coastal homes, find your perfect property style
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {houseStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/house-styles/${style.slug}`}
                className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{style.title}</h3>
                  <p className="text-white/90 mb-4">{style.description}</p>
                  <span className="text-white font-medium inline-flex items-center gap-2">
                    Explore {style.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 py-6 font-bold"
            >
              <Link href="/house-styles-and-features">View All House Styles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Features */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Popular Amenities
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            The features that make our large holiday houses truly special
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.link}
                  href={feature.link}
                  className="bg-[var(--color-bg-primary)] p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-sage)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)] text-sm">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90"
                alt="Luxury large holiday house interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Why Book a Large Holiday House?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Space to Spread Out</h3>
                    <p className="text-[var(--color-neutral-dark)]">Multiple living areas, bedrooms, and outdoor spaces mean everyone has room to relax or socialise as they choose.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Stunning Locations</h3>
                    <p className="text-[var(--color-neutral-dark)]">From lakeside retreats to coastal cliffs, our properties occupy some of Britain's most beautiful locations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Cook Together or Dine Out</h3>
                    <p className="text-[var(--color-neutral-dark)]">Professional kitchens make group cooking a joy, or hire a <Link href="/holiday-focus/book-private-chef" className="text-[var(--color-accent-sage)] hover:underline">private chef</Link> for a special evening.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Memories Made Easy</h3>
                    <p className="text-[var(--color-neutral-dark)]">Shared experiences under one roof create lasting bonds and unforgettable stories.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">All-Inclusive Entertainment</h3>
                    <p className="text-[var(--color-neutral-dark)]">Hot tubs, games rooms, and grounds to explore — entertainment is built into your stay.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Regions */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Top Regions for Large Holiday Houses
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Explore Britain's most popular destinations for group holidays
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {topRegions.map((region) => (
              <Link
                key={region.slug}
                href={`/destinations/${region.slug}`}
                className="group bg-[var(--color-bg-primary)] p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[var(--color-accent-sage)]" />
                  <h3 className="text-lg font-bold group-hover:text-[var(--color-accent-sage)] transition-colors">
                    {region.name}
                  </h3>
                </div>
                <p className="text-[var(--color-neutral-dark)] text-sm">{region.description}</p>
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
                  Featured Large Holiday Houses
                </h2>
                <p className="text-xl text-[var(--color-neutral-dark)]">Handpicked properties for unforgettable group stays</p>
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
            Everything you need to know about booking large holiday houses
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
              Find Your Perfect Holiday House
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] mb-10 max-w-3xl mx-auto">
              Ready to bring your group together? Browse our collection of large holiday houses or get in touch for personalised recommendations.
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
                <Link href="/properties">Browse All Houses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
