import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Navigation, Coffee, Moon, Sparkles, UtensilsCrossed, ChevronDown, Calendar, Home, Waves, PoundSterling, Users, PartyPopper, Train, Plane, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DestinationClient from "./DestinationClient";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Destinations data
  const destinationsData: Record<string, any> = {
    "lake-district": {
      name: "Lake District",
      region: "Cumbria",
      overview: "The Lake District is England's most stunning national park, offering breathtaking landscapes, luxury lodges, and peaceful mountain retreats perfect for group celebrations.",
    },
    brighton: {
      name: "Brighton",
      region: "East Sussex",
      overview: "Brighton is the UK's premier hen party destination, combining stunning Regency architecture with legendary nightlife, a vibrant beach scene, and endless entertainment options.",
    },
    // ... rest will be loaded dynamically in the component
  };

  const destination = destinationsData[slug] || { 
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: "UK",
    overview: `Discover amazing group accommodation in ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
  };

  const title = `${destination.name} Hen Party Houses | Hot Tubs & Pools`;
  const description = `${destination.overview.substring(0, 155)}... Book luxury ${destination.name} hen party houses sleeping 10-20+ guests. Hot tubs, pools, games rooms. From £65-£120 per night.`;
  const canonicalUrl = `https://www.groupescapehouses.co.uk/destinations/${slug}`;

  return {
    title,
    description,
    keywords: `${destination.name} hen party houses, ${destination.name} group accommodation, ${destination.name} houses with hot tubs, large group houses ${destination.name}, hen do ${destination.name}, ${destination.name} party houses, ${destination.name} weekend breaks, group holidays ${destination.name}`,
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
          alt: `${destination.name} Group Accommodation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
        images: ['https://www.groupescapehouses.co.uk/og-image.jpg'],
    },
    other: {
      'format-detection': 'telephone=no, address=no, email=no',
    },
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      <DestinationClient slug={slug} />
      <Footer />
    </div>
  );
}