import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Gamepad2, Users, MapPin, Check, ArrowRight, Trophy, Dices, Target, ChevronDown, Waves, Film } from "lucide-react";
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
  title: "Houses with Games Rooms UK | Large Group Accommodation | Group Escape Houses",
  description: "Book large houses with games rooms across the UK. Perfect for group getaways with pool tables, table tennis, arcade games and more. Properties sleeping 10-30 guests with entertainment spaces.",
  keywords: "houses with games rooms UK, games room holidays UK, large houses with games rooms, group accommodation games room, holiday homes with games rooms, pool table holiday house",
  alternates: {
    canonical: "https://www.groupescapehouses.co.uk/houses-with-games-rooms",
  },
  openGraph: {
    title: "Houses with Games Rooms UK | Large Group Accommodation",
    description: "Book large houses with games rooms across the UK. Perfect for group getaways with pool tables, table tennis, arcade games and more.",
    url: "https://www.groupescapehouses.co.uk/houses-with-games-rooms",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
  },
};

export default async function HousesWithGamesRoomsPage() {
  const gamesRoomProperties = await db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .limit(6);

  const gamesRoomFeatures = [
    { title: "Pool & Snooker", description: "Full-size pool tables and snooker tables for competitive matches", icon: Target },
    { title: "Table Tennis", description: "Indoor table tennis for fast-paced fun whatever the weather", icon: Gamepad2 },
    { title: "Arcade Games", description: "Classic arcade machines, air hockey, and retro gaming", icon: Dices },
    { title: "Tournament Fun", description: "Organise group tournaments and competitions", icon: Trophy },
  ];

  const topDestinations = [
    { name: "Lake District", slug: "lake-district", description: "Perfect for rainy day entertainment" },
    { name: "Yorkshire", slug: "yorkshire", description: "Indoor fun after countryside walks" },
    { name: "Peak District", slug: "peak-district", description: "Evening entertainment after hiking" },
    { name: "Cotswolds", slug: "cotswolds", description: "All-weather group activities" },
    { name: "Cornwall", slug: "cornwall", description: "Backup plan for beach days" },
    { name: "Devon", slug: "devon", description: "Family-friendly entertainment" },
  ];

  const relatedFeatures = [
    { title: "Hot Tubs", slug: "/houses-with-hot-tubs", icon: Waves, description: "Relaxation after the games" },
    { title: "Cinema Rooms", slug: "/features/cinema-room", icon: Film, description: "Movie nights together" },
    { title: "Swimming Pools", slug: "/features/swimming-pool", icon: Waves, description: "Indoor and outdoor pools" },
  ];

  const faqs = [
    {
      question: "What games are typically included in games rooms?",
      answer: "Games rooms vary by property but commonly include pool tables, table tennis, darts, air hockey, foosball, and board game collections. Some properties also have arcade machines, video game consoles, and card tables. Check individual property listings for specific games available."
    },
    {
      question: "Are games rooms suitable for all ages?",
      answer: "Yes, games rooms offer entertainment for all ages and abilities. Pool, table tennis, and board games can be enjoyed by children and adults alike. Many families specifically seek games room properties because they keep everyone entertained, from teenagers to grandparents."
    },
    {
      question: "Is equipment provided or do we need to bring anything?",
      answer: "All games equipment is provided — pool cues, balls, table tennis bats, darts, and so on. You don't need to bring anything except your competitive spirit. Properties maintain their equipment, though minor wear is normal in well-used games rooms."
    },
    {
      question: "Can we use the games room at any time?",
      answer: "Yes, the games room is available whenever you want throughout your stay. Most groups enjoy evening games sessions after dinner, but you're free to play at any time. Some properties request quieter hours late at night if there are neighbouring properties nearby."
    },
    {
      question: "Are games rooms indoor or outdoor?",
      answer: "Most games rooms are fully indoor, meaning you can enjoy them whatever the weather. This makes them particularly valuable during British winters or rainy summers. Some properties also have outdoor games like giant chess or boules for fine weather."
    },
    {
      question: "Do games rooms work well for corporate events?",
      answer: "Absolutely. Games rooms are excellent for corporate retreats and team building. Pool tournaments, table tennis championships, and group games help colleagues bond in a relaxed setting. Many corporate groups specifically request games room properties for this reason."
    },
  ];

  const transformedProperties = gamesRoomProperties.map(p => ({
    id: p.id.toString(),
    title: p.title,
    location: p.location,
    sleeps: p.sleepsMax,
    bedrooms: p.bedrooms,
    priceFrom: Math.round(p.priceFromMidweek / 3),
    image: validateImageUrl(p.heroImage, p.title),
    features: ["Games Room"],
    slug: p.slug,
  }));

  return (
    <div className="min-h-screen bg-white">
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Houses with Games Rooms", url: "/houses-with-games-rooms" }
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
          src="https://images.unsplash.com/photo-1626995216005-51fce6be8f73?w=1920&q=90"
          alt="Luxury house with professional games room featuring pool table"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
            Houses with Games Rooms UK
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-white/90">
            Keep the fun going with large group properties featuring dedicated games rooms. Pool tables, table tennis, arcade games, and more for all-weather entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              <Link href="/properties">Browse Games Room Properties</Link>
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
              Large Group Houses with Entertainment Spaces
            </h2>
            <div className="prose prose-lg max-w-none text-[var(--color-neutral-dark)]">
              <p className="text-lg leading-relaxed mb-6">
                A dedicated games room transforms a group holiday from memorable to unforgettable. After a day exploring the <Link href="/destinations/lake-district" className="text-[var(--color-accent-sage)] hover:underline font-medium">Lake District</Link> fells, walking the <Link href="/destinations/cotswolds" className="text-[var(--color-accent-sage)] hover:underline font-medium">Cotswolds</Link> villages, or celebrating a <Link href="/special-celebrations" className="text-[var(--color-accent-sage)] hover:underline font-medium">milestone birthday</Link>, what better way to unwind than a pool tournament, table tennis championship, or evening of board games?
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Group Escape Houses features an excellent selection of <Link href="/large-group-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">large group accommodation</Link> with games rooms across the UK. Our properties range from <Link href="/house-styles/large-cottages" className="text-[var(--color-accent-sage)] hover:underline font-medium">large cottages</Link> with modest games areas to grand <Link href="/house-styles/manor-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">manor houses</Link> with professional-standard entertainment facilities.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Games rooms provide invaluable all-weather entertainment — essential for UK holidays where the occasional rainy day is almost guaranteed. But they're not just for bad weather. Evening games sessions become a highlight of group stays, bringing everyone together for friendly competition and plenty of laughter.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our games room properties suit every occasion: <Link href="/holiday-focus/multi-generational-holidays" className="text-[var(--color-accent-sage)] hover:underline font-medium">multi-generational family holidays</Link> where grandparents can play pool with grandchildren, <Link href="/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen parties</Link> and <Link href="/stag-do-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">stag weekends</Link> with tournament fun, <Link href="/holiday-focus/business-offsite-corporate-accommodation" className="text-[var(--color-accent-sage)] hover:underline font-medium">corporate retreats</Link> for team building, and <Link href="/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">friend group getaways</Link> seeking competitive entertainment.
              </p>
              <p className="text-lg leading-relaxed">
                Many of our games room properties also feature <Link href="/houses-with-hot-tubs" className="text-[var(--color-accent-sage)] hover:underline font-medium">hot tubs</Link>, <Link href="/features/cinema-room" className="text-[var(--color-accent-sage)] hover:underline font-medium">cinema rooms</Link>, and <Link href="/features/swimming-pool" className="text-[var(--color-accent-sage)] hover:underline font-medium">swimming pools</Link> — creating complete entertainment packages for unforgettable group stays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            What You'll Find in Our Games Rooms
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Entertainment options that bring groups together
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamesRoomFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-sage)" }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[var(--color-neutral-dark)] leading-relaxed">{feature.description}</p>
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
            Games Room Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { url: "https://images.unsplash.com/photo-1626995216005-51fce6be8f73?w=800&q=90", alt: "Professional pool table in luxury games room" },
              { url: "https://images.unsplash.com/photo-1534878883218-7650ec5e5b10?w=800&q=90", alt: "Table tennis in modern games room" },
              { url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=90", alt: "Arcade games and entertainment" },
              { url: "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=800&q=90", alt: "Pool table with vintage decor" },
              { url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=90", alt: "Luxury home entertainment room" },
              { url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=90", alt: "Group enjoying games together" },
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

      {/* Why Choose Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Why Book a House with a Games Room?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">All-Weather Entertainment</h3>
                    <p className="text-[var(--color-neutral-dark)]">British weather is unpredictable. A games room ensures your group has entertainment options whatever the forecast.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Inter-Generational Fun</h3>
                    <p className="text-[var(--color-neutral-dark)]">Pool, darts, and board games bridge generations. Everyone from children to grandparents can join in and compete.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Evening Entertainment</h3>
                    <p className="text-[var(--color-neutral-dark)]">After dinner, the games room becomes the social hub. No need to venture out — the entertainment is built into your stay.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Friendly Competition</h3>
                    <p className="text-[var(--color-neutral-dark)]">Tournaments and competitions create shared experiences and talking points that groups remember for years.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Team Building Value</h3>
                    <p className="text-[var(--color-neutral-dark)]">For corporate groups, games rooms offer natural team building opportunities without forced activities.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534878883218-7650ec5e5b10?w=800&q=90"
                alt="Friends playing table tennis in games room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Best Destinations for Games Room Breaks
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Locations where games rooms add extra value to your stay
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

      {/* Related Features */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Combine with Other Features
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12 max-w-3xl mx-auto">
            Many of our games room properties also feature these popular amenities
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
                  Featured Games Room Properties
                </h2>
                <p className="text-xl text-[var(--color-neutral-dark)]">Handpicked houses with entertainment spaces</p>
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
            Games Room FAQs
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] text-center mb-12">
            Everything you need to know about our games room properties
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
              Ready for Some Competitive Fun?
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] mb-10 max-w-3xl mx-auto">
              Find the perfect property with a games room for your group. Browse our collection or get in touch for personalised recommendations.
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
