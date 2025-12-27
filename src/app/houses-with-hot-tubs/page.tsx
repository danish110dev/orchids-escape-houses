import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Droplets, Users, MapPin, Check, ArrowRight, Star, Moon, Sun, ChevronDown, Gamepad2, Film, Waves } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UKServiceSchema from "@/components/UKServiceSchema";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { properties, propertyFeatures } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Houses with Hot Tubs UK | Large Group Accommodation | Group Escape Houses",
  description: "Book large houses with hot tubs across the UK. Perfect for group getaways, family holidays, birthday celebrations and weekend breaks. Properties sleeping 10-30 guests with private hot tubs.",
  keywords: "houses with hot tubs UK, hot tub holidays UK, large houses with hot tubs, group accommodation hot tub, holiday homes with hot tubs, hot tub breaks UK",
  alternates: {
    canonical: "https://www.groupescapehouses.co.uk/houses-with-hot-tubs",
  },
  openGraph: {
    title: "Houses with Hot Tubs UK | Large Group Accommodation",
    description: "Book large houses with hot tubs across the UK. Perfect for group getaways, family holidays, birthday celebrations and weekend breaks.",
    url: "https://www.groupescapehouses.co.uk/houses-with-hot-tubs",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
  },
};

export default async function HousesWithHotTubsPage() {
  const hotTubProperties = await db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .limit(6);

  const hotTubBenefits = [
    { title: "Year-Round Relaxation", description: "Enjoy the hot tub whatever the weather — winter evenings under the stars or warm summer sunsets", icon: Sun },
    { title: "Group Bonding", description: "The hot tub becomes a natural gathering spot for conversation, laughter, and quality time", icon: Users },
    { title: "Evening Entertainment", description: "End each day with a relaxing soak — no need to book spa treatments elsewhere", icon: Moon },
    { title: "Photo Opportunities", description: "Hot tubs with scenic backdrops create Instagram-worthy memories of your trip", icon: Star },
  ];

  const topDestinations = [
    { name: "Lake District", slug: "lake-district", description: "Mountain views and lakeside settings" },
    { name: "Yorkshire", slug: "yorkshire", description: "Rural escapes in the Dales" },
    { name: "Cotswolds", slug: "cotswolds", description: "Countryside charm and rolling hills" },
    { name: "Cornwall", slug: "cornwall", description: "Coastal properties with sea views" },
    { name: "Devon", slug: "devon", description: "Dartmoor and coastal retreats" },
    { name: "Peak District", slug: "peak-district", description: "Walking country escapes" },
  ];

  const relatedFeatures = [
    { title: "Games Rooms", slug: "/houses-with-games-rooms", icon: Gamepad2, description: "Entertainment for the whole group" },
    { title: "Swimming Pools", slug: "/features/swimming-pool", icon: Waves, description: "Indoor and outdoor pools" },
    { title: "Cinema Rooms", slug: "/features/cinema-room", icon: Film, description: "Movie nights together" },
  ];

  const faqs = [
    {
      question: "Are the hot tubs private?",
      answer: "Yes, all hot tubs at our properties are for your group's exclusive use throughout your stay. You won't share with other guests or the public. Most hot tubs are located in private gardens or on secluded decking areas."
    },
    {
      question: "What size are the hot tubs?",
      answer: "Hot tub sizes vary by property, typically accommodating 4-8 people at a time. For larger groups, guests can rotate usage throughout the day and evening. Property listings specify hot tub capacity where available."
    },
    {
      question: "Are hot tubs available year-round?",
      answer: "Yes, hot tubs can be enjoyed in all seasons. Many guests particularly love winter hot tub sessions — there's nothing quite like relaxing in warm bubbles while surrounded by frosty landscapes or under starry skies. Properties maintain hot tubs at comfortable temperatures year-round."
    },
    {
      question: "Is the hot tub included in the rental price?",
      answer: "In most cases, hot tub access is included in the rental price. Some properties may charge a small additional fee for hot tub heating during winter months. Any additional charges are clearly stated in the property listing."
    },
    {
      question: "What should we bring for the hot tub?",
      answer: "Just bring your swimwear and a towel. Most properties provide robes, and some supply outdoor slippers. The hot tub itself comes fully equipped with all necessary chemicals and maintenance handled by the property owner."
    },
    {
      question: "Are hot tub houses suitable for families?",
      answer: "Yes, many of our hot tub properties are perfect for family holidays. However, children should always be supervised around hot tubs. Some properties have specific age restrictions for hot tub use — these are noted in individual listings."
    },
  ];

  const transformedProperties = hotTubProperties.map(p => ({
    id: p.id.toString(),
    title: p.title,
    location: p.location,
    sleeps: p.sleepsMax,
    bedrooms: p.bedrooms,
    priceFrom: Math.round(p.priceFromMidweek / 3),
    image: validateImageUrl(p.heroImage, p.title),
    features: ["Hot Tub"],
    slug: p.slug,
  }));

  return (
    <div className="min-h-screen bg-white">
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Houses with Hot Tubs", url: "/houses-with-hot-tubs" }
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
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=90"
          alt="Luxury house with private hot tub in stunning UK location"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
            Houses with Hot Tubs UK
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-white/90">
            Relax and unwind in luxury properties with private hot tubs. Perfect for group getaways, family holidays, and celebrations across the United Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              <Link href="/properties">Browse Hot Tub Properties</Link>
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
              The Ultimate Group Getaway with Private Hot Tubs
            </h2>
            <div className="prose prose-lg max-w-none text-[var(--color-neutral-dark)]">
              <p className="text-lg leading-relaxed mb-6">
                A private hot tub transforms any group holiday into something special. Picture this: you've spent the day exploring the <Link href="/destinations/lake-district" className="text-[var(--color-accent-sage)] hover:underline font-medium">Lake District</Link> fells, walking the <Link href="/destinations/cornwall" className="text-[var(--color-accent-sage)] hover:underline font-medium">Cornwall</Link> coastal path, or celebrating a <Link href="/special-celebrations" className="text-[var(--color-accent-sage)] hover:underline font-medium">milestone birthday</Link>. As evening falls, you gather in the bubbling warmth of your own hot tub, drinks in hand, stars appearing overhead.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Group Escape Houses specialises in <Link href="/large-group-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">large group accommodation</Link> with hot tubs across the UK. Our properties range from cosy <Link href="/house-styles/large-cottages" className="text-[var(--color-accent-sage)] hover:underline font-medium">large cottages</Link> sleeping 10-12 guests to grand <Link href="/house-styles/manor-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">manor houses</Link> accommodating 25-30. Whatever your group size, we have hot tub properties to match.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Hot tubs have become one of the most requested features for group bookings — and for good reason. They provide a focal point for socialising that feels luxurious yet relaxed. Unlike a spa visit that needs to be booked and travelled to, your private hot tub is available whenever you want it, from a pre-breakfast dip to a midnight soak.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our hot tub properties are popular for all occasions: <Link href="/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen parties</Link>, <Link href="/stag-do-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">stag weekends</Link>, <Link href="/holiday-focus/multi-generational-holidays" className="text-[var(--color-accent-sage)] hover:underline font-medium">multi-generational family holidays</Link>, <Link href="/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">birthday weekends</Link>, and <Link href="/holiday-focus/business-offsite-corporate-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">corporate retreats</Link>. Many properties also feature <Link href="/houses-with-games-rooms" className="text-[var(--color-accent-sage)] hover:underline font-medium">games rooms</Link>, <Link href="/features/swimming-pool" className="text-[var(--color-accent-sage)] hover:underline font-medium">swimming pools</Link>, and beautiful grounds.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're seeking countryside tranquility, coastal views, or convenient access to vibrant towns and cities, we'll help you find the perfect hot tub property for your group escape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Why Book a House with a Hot Tub?
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Private hot tubs elevate group holidays from great to unforgettable
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotTubBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-[var(--color-neutral-dark)] leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Hot Tub Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { url: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?w=800&q=90", alt: "Champagne celebration in hot tub" },
              { url: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&q=90", alt: "Relaxing in hot tub at sunset" },
              { url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=90", alt: "Private hot tub with mountain views" },
              { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=90", alt: "Luxury garden hot tub" },
              { url: "https://images.unsplash.com/photo-1529230117010-b6c6d3158e8e?w=800&q=90", alt: "Hot tub deck area" },
              { url: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=90", alt: "Evening hot tub under stars" },
            ].map((image, index) => (
              <div key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Best Destinations for Hot Tub Breaks
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Discover scenic locations across the UK with hot tub properties
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {topDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
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

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=90"
                alt="Luxury hot tub with countryside views"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                What to Expect from Our Hot Tub Properties
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Private & Exclusive</h3>
                    <p className="text-[var(--color-neutral-dark)]">Every hot tub is for your group's exclusive use — no sharing with other guests or booking time slots.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Professionally Maintained</h3>
                    <p className="text-[var(--color-neutral-dark)]">All hot tubs are cleaned and chemically balanced before your arrival by property owners or their maintenance teams.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Scenic Settings</h3>
                    <p className="text-[var(--color-neutral-dark)]">From lakeside decks to garden gazebos, our hot tubs occupy beautiful spots with views to enjoy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">24/7 Access</h3>
                    <p className="text-[var(--color-neutral-dark)]">Use the hot tub whenever you like — morning, afternoon, evening, or midnight. It's entirely up to your group.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Combined with Other Amenities</h3>
                    <p className="text-[var(--color-neutral-dark)]">Many hot tub properties also feature games rooms, swimming pools, saunas, and beautiful grounds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Combine with Other Features
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Many of our hot tub properties also feature these popular amenities
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.slug}
                  href={feature.slug}
                  className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-sage)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--color-neutral-dark)] mb-4">{feature.description}</p>
                  <span className="text-[var(--color-accent-sage)] font-medium inline-flex items-center gap-2">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {transformedProperties.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Featured Hot Tub Properties
                </h2>
                <p className="text-xl text-[var(--color-neutral-dark)]">Handpicked houses with private hot tubs</p>
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
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Hot Tub FAQs
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12">
            Everything you need to know about our hot tub properties
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white">
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
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="bg-[var(--color-bg-primary)] p-16 rounded-[40px] shadow-xl border border-gray-100">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Book Your Hot Tub Break?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] mb-10 max-w-3xl mx-auto">
              Find the perfect property with a private hot tub for your group. Browse our collection or get in touch for personalised recommendations.
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
