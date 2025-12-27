import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import DestinationClient from "./DestinationClient";

const destinationsSEOData: Record<string, { name: string; region: string; overview: string; highlights: string[]; groupTypes: string[] }> = {
  "lake-district": {
    name: "Lake District",
    region: "Cumbria",
    overview: "The Lake District is England's most stunning national park, offering breathtaking landscapes, luxury lodges, and peaceful mountain retreats. With dramatic fells, pristine lakes, and charming villages, it's the ideal destination for groups seeking natural beauty combined with exceptional accommodation. Properties range from lakeside lodges to converted barns, many featuring private hot tubs and panoramic views.",
    highlights: ["Stunning lakeside properties", "Mountain and fell views", "Outdoor activities", "Cosy log fires", "Hot tubs with scenery"],
    groupTypes: ["Family reunions", "Birthday celebrations", "Corporate retreats", "Friend getaways", "Hen and stag parties"]
  },
  "brighton": {
    name: "Brighton",
    region: "East Sussex",
    overview: "Brighton combines stunning Regency architecture with legendary nightlife, a vibrant beach scene, and endless entertainment options. Just one hour from London, this seaside city offers the perfect blend of coastal relaxation and cosmopolitan excitement. Our Brighton properties range from seafront townhouses to central apartments, perfect for groups seeking beach access and city nightlife.",
    highlights: ["Direct beach access", "Vibrant nightlife", "The Lanes shopping", "Brighton Pier", "Regency architecture"],
    groupTypes: ["Hen parties", "Birthday weekends", "Friend groups", "Corporate events", "Stag weekends"]
  },
  "bath": {
    name: "Bath",
    region: "Somerset",
    overview: "Bath is a stunning UNESCO World Heritage city combining Roman history, Georgian elegance, and world-class spa experiences. Perfect for sophisticated group breaks seeking culture, relaxation, and refined entertainment in one of England's most beautiful cities. Our Bath properties feature Georgian townhouses and luxury spa retreats with period character.",
    highlights: ["Thermae Bath Spa", "Roman Baths", "Georgian architecture", "Boutique shopping", "Fine dining"],
    groupTypes: ["Hen parties", "Spa weekends", "Birthday celebrations", "Friend groups", "Corporate retreats"]
  },
  "cotswolds": {
    name: "Cotswolds",
    region: "South West England",
    overview: "The Cotswolds offers quintessential English countryside with honey-stone villages, rolling hills, and luxury country retreats. This Area of Outstanding Natural Beauty is perfect for groups seeking tranquility, stunning walks, and cosy country houses. Properties include manor houses, converted barns, and farmhouse estates.",
    highlights: ["Honey-stone villages", "Country walks", "Gastropubs", "Antique shopping", "Rural tranquility"],
    groupTypes: ["Family reunions", "Birthday celebrations", "Hen parties", "Corporate retreats", "Multi-generational holidays"]
  },
  "cornwall": {
    name: "Cornwall",
    region: "South West England",
    overview: "Cornwall is England's ultimate coastal escape, offering stunning beaches, dramatic cliffs, and charming fishing villages. Perfect for group getaways seeking surfing, seafood, and spectacular scenery. Our Cornwall properties range from beachfront cottages to clifftop estates with sea views.",
    highlights: ["Golden beaches", "Surfing and water sports", "Coastal walks", "Fresh seafood", "Eden Project"],
    groupTypes: ["Family holidays", "Friend groups", "Birthday celebrations", "Hen parties", "Adventure getaways"]
  },
  "yorkshire": {
    name: "Yorkshire",
    region: "Northern England",
    overview: "Yorkshire offers dramatic moors, historic cities, and warm northern hospitality. From the Yorkshire Dales to the North York Moors, it's perfect for groups seeking countryside escapes and city breaks. Properties include country houses, farmhouses, and Yorkshire Dales lodges.",
    highlights: ["Yorkshire Dales", "Historic York", "Moors walks", "Traditional pubs", "Coastal towns"],
    groupTypes: ["Family reunions", "Walking groups", "Birthday celebrations", "Corporate retreats", "Friend getaways"]
  },
  "devon": {
    name: "Devon",
    region: "South West England",
    overview: "Devon combines dramatic coastlines, rolling countryside, and charming market towns. From the rugged Dartmoor to the English Riviera, it's perfect for groups seeking natural beauty and outdoor adventures. Properties range from coastal properties to Dartmoor lodges.",
    highlights: ["Dartmoor National Park", "English Riviera", "Cream teas", "Coastal walks", "Surfing beaches"],
    groupTypes: ["Family holidays", "Adventure groups", "Birthday celebrations", "Hen parties", "Multi-generational trips"]
  },
  "peak-district": {
    name: "Peak District",
    region: "Central England",
    overview: "The Peak District is England's first national park, offering dramatic landscapes, charming villages, and outdoor adventures. Perfect for groups seeking walking, cycling, and countryside retreats. Properties include country houses, converted barns, and stone cottages.",
    highlights: ["Walking and hiking", "Spa towns", "Bakewell pudding", "Chatsworth House", "Cycling trails"],
    groupTypes: ["Walking groups", "Family reunions", "Corporate retreats", "Birthday celebrations", "Friend getaways"]
  },
  "norfolk": {
    name: "Norfolk",
    region: "East Anglia",
    overview: "Norfolk offers vast beaches, the unique Norfolk Broads, and charming coastal villages. Perfect for groups seeking peaceful countryside, birdwatching, and traditional seaside charm. Properties include coastal cottages, Broads boats, and country houses.",
    highlights: ["Norfolk Broads", "Sandy beaches", "Seal watching", "Birdwatching", "Big skies"],
    groupTypes: ["Family holidays", "Walking groups", "Nature lovers", "Multi-generational trips", "Friend getaways"]
  },
  "suffolk": {
    name: "Suffolk",
    region: "East Anglia",
    overview: "Suffolk combines charming medieval villages, sandy beaches, and gentle countryside. From Southwold to Aldeburgh, it's perfect for groups seeking culture, coastline, and relaxation. Properties include coastal cottages, country houses, and converted barns.",
    highlights: ["Southwold pier", "Aldeburgh", "Suffolk coast", "Medieval villages", "Snape Maltings"],
    groupTypes: ["Family holidays", "Cultural breaks", "Walking groups", "Birthday celebrations", "Friend getaways"]
  },
  "sussex": {
    name: "Sussex",
    region: "South East England",
    overview: "Sussex offers the iconic South Downs, historic towns, and vibrant coastal resorts. From the lanes of Brighton to the cliffs of Beachy Head, it's perfect for groups seeking beach life and countryside. Properties range from Regency townhouses to South Downs lodges.",
    highlights: ["South Downs", "Brighton beaches", "Arundel Castle", "English vineyards", "Coastal walks"],
    groupTypes: ["Hen parties", "Birthday celebrations", "Family holidays", "Corporate events", "Friend groups"]
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const destination = destinationsSEOData[slug] || { 
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: "UK",
    overview: `Discover large group accommodation in ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}. Perfect for family reunions, birthday celebrations, hen parties, and group getaways.`
  };

  const title = `Large Group Accommodation in ${destination.name} | Houses Sleeping 10-30 | Group Escape Houses`;
  const description = `Find large group accommodation in ${destination.name}. Luxury houses sleeping 10-30 guests with hot tubs, games rooms and more. Perfect for family reunions, birthdays, hen parties and group weekends.`;
  const canonicalUrl = `https://www.groupescapehouses.co.uk/destinations/${slug}`;

  return {
    title,
    description,
    keywords: `large group accommodation ${destination.name}, ${destination.name} group houses, ${destination.name} houses with hot tubs, ${destination.name} large holiday houses, ${destination.name} family reunion, ${destination.name} birthday celebration, ${destination.name} hen party houses, ${destination.name} weekend breaks`,
    authors: [{ name: 'Group Escape Houses' }],
    creator: 'Group Escape Houses',
    publisher: 'Group Escape Houses',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Group Escape Houses',
      images: [
        {
          url: 'https://www.groupescapehouses.co.uk/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${destination.name} Large Group Accommodation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.groupescapehouses.co.uk/og-image.jpg'],
    },
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const destination = destinationsSEOData[slug] || {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: "UK",
    overview: `Discover exceptional large group accommodation in ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}. Our carefully selected properties sleep 10 to 30 guests, featuring hot tubs, games rooms, and spacious living areas perfect for bringing groups together under one roof.`,
    highlights: ["Large group houses", "Hot tubs", "Games rooms", "Stunning locations", "Spacious living"],
    groupTypes: ["Family reunions", "Birthday celebrations", "Hen parties", "Corporate retreats", "Friend getaways"]
  };
  
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      
      {/* SSR Content for Search Engines */}
      <noscript>
        <article className="pt-32 pb-16 px-6 max-w-[1200px] mx-auto">
          <header>
            <h1 className="text-4xl font-bold mb-4">Large Group Accommodation in {destination.name}</h1>
            <p className="text-lg text-gray-600 mb-2">{destination.region}, United Kingdom</p>
          </header>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About {destination.name} Group Accommodation</h2>
            <p className="text-lg mb-6">{destination.overview}</p>
            <p className="text-lg mb-6">
              Looking for <Link href="/large-group-accommodation" className="text-blue-600 underline">large group accommodation</Link> in {destination.name}? 
              Group Escape Houses offers luxury properties sleeping 10 to 30 guests, perfect for groups of 10 to 30 guests. 
              Our {destination.name} properties feature premium amenities including <Link href="/houses-with-hot-tubs" className="text-blue-600 underline">private hot tubs</Link>, 
              <Link href="/houses-with-games-rooms" className="text-blue-600 underline">games rooms</Link>, and spacious living areas designed for group gatherings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose {destination.name} for Your Group Stay?</h2>
            <p className="text-lg mb-4">
              {destination.name} is one of the UK's most popular destinations for <Link href="/large-holiday-houses" className="text-blue-600 underline">large holiday houses</Link>. 
              Whether you're planning a <Link href="/holiday-focus/multi-generational-holidays" className="text-blue-600 underline">family reunion</Link>, 
              <Link href="/special-celebrations" className="text-blue-600 underline">birthday celebration</Link>, 
              <Link href="/hen-party-houses" className="text-blue-600 underline">hen party</Link>, or 
              <Link href="/holiday-focus/business-offsite-corporate-accommodation" className="text-blue-600 underline">corporate retreat</Link>, 
              our {destination.name} properties provide the perfect setting.
            </p>
            <h3 className="text-xl font-semibold mb-3">{destination.name} Highlights</h3>
            <ul className="list-disc list-inside mb-6">
              {destination.highlights?.map((highlight, i) => (
                <li key={i} className="mb-2">{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Perfect For</h2>
            <p className="text-lg mb-4">Our {destination.name} properties are ideal for:</p>
            <ul className="list-disc list-inside mb-6">
              {destination.groupTypes?.map((type, i) => (
                <li key={i} className="mb-2">{type}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Group Sizes</h2>
            <p className="text-lg mb-4">
              We offer properties in {destination.name} that accommodate groups from 10 to 30 guests. 
              Whether you need accommodation for a small group of 10-12 friends or a larger celebration of 25-30 guests, 
              we have suitable properties with multiple bedrooms, bathrooms, and communal spaces.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Popular Amenities</h2>
            <p className="text-lg mb-4">
              Most of our {destination.name} properties feature sought-after amenities including:
            </p>
            <ul className="list-disc list-inside mb-6">
              <li className="mb-2"><Link href="/houses-with-hot-tubs" className="text-blue-600 underline">Private hot tubs</Link> for relaxation</li>
              <li className="mb-2"><Link href="/houses-with-games-rooms" className="text-blue-600 underline">Games rooms</Link> with pool tables and entertainment</li>
              <li className="mb-2">Spacious kitchens for group dining</li>
              <li className="mb-2">Multiple living areas for socialising</li>
              <li className="mb-2">Outdoor spaces and gardens</li>
              <li className="mb-2">Free parking for multiple vehicles</li>
            </ul>
          </section>

          <nav className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Explore More</h2>
            <ul className="list-disc list-inside">
              <li className="mb-2"><Link href="/properties" className="text-blue-600 underline">View all properties</Link></li>
              <li className="mb-2"><Link href="/large-group-accommodation" className="text-blue-600 underline">Large group accommodation</Link></li>
              <li className="mb-2"><Link href="/destinations" className="text-blue-600 underline">All UK destinations</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-blue-600 underline">Contact us for availability</Link></li>
            </ul>
          </nav>
        </article>
      </noscript>

      <DestinationClient slug={slug} />
      <Footer />
    </div>
  );
}
