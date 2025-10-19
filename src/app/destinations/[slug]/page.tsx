"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Navigation, Coffee, Moon, Sparkles, UtensilsCrossed, ChevronDown, Calendar, Home, Waves, PoundSterling, Users, PartyPopper, Train, Plane, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function DestinationDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Destinations data
  const destinationsData: Record<string, any> = {
    // ... keep existing london, manchester, york, cardiff, brighton, newcastle, bath, bournemouth, liverpool, birmingham, newquay, lake-district data ...
  };

  // Location-specific properties
  const propertiesByLocation: Record<string, any[]> = {
    london: [
      {
        id: "1",
        title: "The Kensington Residence",
        location: "London, Greater London",
        sleeps: 20,
        bedrooms: 10,
        priceFrom: 120,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-lu-82828771-20251019163638.jpg",
        features: ["Hot Tub", "Cinema Room", "Roof Terrace"],
        slug: "kensington-residence",
      },
      {
        id: "2",
        title: "Shoreditch Loft House",
        location: "London, Greater London",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 105,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-i-60588db0-20251019163645.jpg",
        features: ["Games Room", "City Views", "Hot Tub"],
        slug: "shoreditch-loft",
      },
      {
        id: "3",
        title: "Chelsea Manor House",
        location: "London, Greater London",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 98,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-e-053848fb-20251019163658.jpg",
        features: ["Garden", "Hot Tub", "Parking"],
        slug: "chelsea-manor",
      },
    ],
    manchester: [
      {
        id: "1",
        title: "Northern Quarter House",
        location: "Manchester, Greater Manchester",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 85,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-co-351421dc-20251019163711.jpg",
        features: ["Hot Tub", "Games Room", "City Centre"],
        slug: "northern-quarter-house",
      },
      {
        id: "2",
        title: "Deansgate Apartment",
        location: "Manchester, Greater Manchester",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 75,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-lu-9926ea92-20251019163718.jpg",
        features: ["Roof Terrace", "BBQ", "Parking"],
        slug: "deansgate-apartment",
      },
      {
        id: "3",
        title: "Castlefield Warehouse",
        location: "Manchester, Greater Manchester",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 68,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-co-28d24ba1-20251019163727.jpg",
        features: ["Hot Tub", "Industrial Style", "Canal Views"],
        slug: "castlefield-warehouse",
      },
    ],
    york: [
      {
        id: "1",
        title: "The York Minster House",
        location: "York, North Yorkshire",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 92,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-hi-bf770839-20251019163816.jpg",
        features: ["Hot Tub", "Garden", "Historic"],
        slug: "york-minister-house",
      },
      {
        id: "2",
        title: "Shambles Townhouse",
        location: "York, North Yorkshire",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 78,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-ch-1c701d93-20251019163822.jpg",
        features: ["City Centre", "Period Features", "Parking"],
        slug: "shambles-townhouse",
      },
      {
        id: "3",
        title: "The Roman Villa",
        location: "York, North Yorkshire",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 72,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-st-7602731a-20251019163831.jpg",
        features: ["Hot Tub", "Garden", "BBQ"],
        slug: "roman-villa-york",
      },
    ],
    cardiff: [
      {
        id: "1",
        title: "Cardiff Bay House",
        location: "Cardiff, South Wales",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 82,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-lu-e34312f0-20251019163838.jpg",
        features: ["Hot Tub", "Bay Views", "Games Room"],
        slug: "cardiff-bay-house",
      },
      {
        id: "2",
        title: "Cathedral Quarter Residence",
        location: "Cardiff, South Wales",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 70,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-e-c05d8b9a-20251019163846.jpg",
        features: ["City Centre", "Hot Tub", "Roof Terrace"],
        slug: "cathedral-quarter",
      },
      {
        id: "3",
        title: "Pontcanna Villa",
        location: "Cardiff, South Wales",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 65,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-tr-e206e578-20251019163854.jpg",
        features: ["Garden", "BBQ", "Parking"],
        slug: "pontcanna-villa",
      },
    ],
    brighton: [
      {
        id: "1",
        title: "The Brighton Manor",
        location: "Brighton, East Sussex",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 89,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-gr-18e00f17-20251019163902.jpg",
        features: ["Hot Tub", "Pool", "Games Room"],
        slug: "brighton-manor",
      },
      {
        id: "2",
        title: "Brighton Seafront Villa",
        location: "Brighton, East Sussex",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 79,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-st-87e31c86-20251019163913.jpg",
        features: ["Sea View", "Hot Tub", "BBQ"],
        slug: "brighton-villa",
      },
      {
        id: "3",
        title: "The Lanes Townhouse",
        location: "Brighton, East Sussex",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 69,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-e-89ca9be8-20251019163920.jpg",
        features: ["City Centre", "Roof Terrace"],
        slug: "lanes-townhouse",
      },
    ],
    newcastle: [
      {
        id: "1",
        title: "The Quayside Residence",
        location: "Newcastle, Tyne and Wear",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 79,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-co-77b74508-20251019163928.jpg",
        features: ["Hot Tub", "Games Room", "City Views"],
        slug: "quayside-residence",
      },
      {
        id: "2",
        title: "Ouseburn Valley House",
        location: "Newcastle, Tyne and Wear",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 69,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-co-18512d03-20251019163938.jpg",
        features: ["Hot Tub", "BBQ", "Parking"],
        slug: "ouseburn-house",
      },
      {
        id: "3",
        title: "Tyne Bridge Loft",
        location: "Newcastle, Tyne and Wear",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 59,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-mo-855c1f42-20251019163946.jpg",
        features: ["City Centre", "Modern", "Roof Terrace"],
        slug: "tyne-bridge-loft",
      },
    ],
    bath: [
      {
        id: "1",
        title: "The Royal Crescent Manor",
        location: "Bath, Somerset",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 109,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-gr-c3e80ad2-20251019163958.jpg",
        features: ["Hot Tub", "Gardens", "Historic"],
        slug: "royal-crescent-manor",
      },
      {
        id: "2",
        title: "Bath Spa Townhouse",
        location: "Bath, Somerset",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 89,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-e-8601b6de-20251019164005.jpg",
        features: ["Hot Tub", "City Centre", "Georgian"],
        slug: "bath-spa-townhouse",
      },
      {
        id: "3",
        title: "Pulteney Bridge House",
        location: "Bath, Somerset",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 79,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-lu-98c82857-20251019164016.jpg",
        features: ["River Views", "Period Features", "Central"],
        slug: "pulteney-bridge-house",
      },
    ],
    bournemouth: [
      {
        id: "1",
        title: "Bournemouth Beach House",
        location: "Bournemouth, Dorset",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 95,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-st-042fd885-20251019164023.jpg",
        features: ["Hot Tub", "Beach Access", "Games Room"],
        slug: "bournemouth-beach-house",
      },
      {
        id: "2",
        title: "Clifftop Retreat",
        location: "Bournemouth, Dorset",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 85,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-an-e-8ca07f6a-20251019164030.jpg",
        features: ["Sea View", "Hot Tub", "Parking"],
        slug: "clifftop-retreat",
      },
      {
        id: "3",
        title: "The Sandbanks Villa",
        location: "Bournemouth, Dorset",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 75,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-exterior-photograph-of-a-mo-5886e798-20251019164036.jpg",
        features: ["Beach Views", "Modern", "BBQ"],
        slug: "sandbanks-villa",
      },
    ],
    liverpool: [
      {
        id: "1",
        title: "Albert Dock Warehouse",
        location: "Liverpool, Merseyside",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 88,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        features: ["Hot Tub", "Waterfront Views", "Games Room"],
        slug: "albert-dock-warehouse",
      },
      {
        id: "2",
        title: "Cavern Quarter House",
        location: "Liverpool, Merseyside",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 78,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
        features: ["City Centre", "Hot Tub", "Roof Terrace"],
        slug: "cavern-quarter-house",
      },
      {
        id: "3",
        title: "Georgian Liverpool Villa",
        location: "Liverpool, Merseyside",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 68,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        features: ["Period Features", "Garden", "Parking"],
        slug: "georgian-liverpool-villa",
      },
    ],
    birmingham: [
      {
        id: "1",
        title: "Canal Quarter Loft",
        location: "Birmingham, West Midlands",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 82,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        features: ["Hot Tub", "Canal Views", "Modern"],
        slug: "canal-quarter-loft",
      },
      {
        id: "2",
        title: "Jewellery Quarter House",
        location: "Birmingham, West Midlands",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 72,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
        features: ["Historic", "Hot Tub", "City Centre"],
        slug: "jewellery-quarter-house",
      },
      {
        id: "3",
        title: "Digbeth Warehouse",
        location: "Birmingham, West Midlands",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 65,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        features: ["Industrial Style", "Games Room", "Parking"],
        slug: "digbeth-warehouse",
      },
    ],
    newquay: [
      {
        id: "1",
        title: "Fistral Beach House",
        location: "Newquay, Cornwall",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 85,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        features: ["Hot Tub", "Beach Views", "Surf Boards"],
        slug: "fistral-beach-house",
      },
      {
        id: "2",
        title: "Coastal Surf Villa",
        location: "Newquay, Cornwall",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 75,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
        features: ["Hot Tub", "Ocean Views", "BBQ"],
        slug: "coastal-surf-villa",
      },
      {
        id: "3",
        title: "The Boardwalk House",
        location: "Newquay, Cornwall",
        sleeps: 10,
        bedrooms: 5,
        priceFrom: 68,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        features: ["Beach Access", "Modern", "Parking"],
        slug: "boardwalk-house",
      },
    ],
    "lake-district": [
      {
        id: "1",
        title: "Windermere Lakeside House",
        location: "Lake District, Cumbria",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 105,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        features: ["Hot Tub", "Lake Views", "Gardens"],
        slug: "windermere-lakeside",
      },
      {
        id: "2",
        title: "Mountain View Lodge",
        location: "Lake District, Cumbria",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 92,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
        features: ["Hot Tub", "Mountain Views", "Fireplace"],
        slug: "mountain-view-lodge",
      },
      {
        id: "3",
        title: "Ambleside Retreat",
        location: "Lake District, Cumbria",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 82,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        features: ["Hot Tub", "Gardens", "Parking"],
        slug: "ambleside-retreat",
      },
    ],
  };

  const destination = destinationsData[slug] || destinationsData.brighton;

  const properties = propertiesByLocation[slug] || propertiesByLocation.brighton;

  const faqs = [
    {
      question: `How far is ${destination.name} from London?`,
      answer: `${destination.name} is approximately 1 hour from London by train, making it perfect for a weekend getaway. Regular train services run from Victoria station, and the journey offers beautiful countryside views.`
    },
    {
      question: `What's the best time to visit ${destination.name} for a hen party?`,
      answer: `${destination.name} is a fantastic destination year-round. Summer (June-August) offers beach weather and outdoor activities, while spring and autumn provide milder temperatures and fewer crowds. Weekend bookings are popular, so we recommend booking 6-9 months in advance.`
    },
    {
      question: `Are there hen party houses available in ${destination.name}?`,
      answer: `Yes! We have a selection of luxury hen party houses in and around ${destination.name}. Our properties feature hot tubs, spacious entertaining areas, and are perfectly located for accessing the city's nightlife and attractions.`
    },
    {
      question: `What activities can we do in ${destination.name} during our stay?`,
      answer: `${destination.name} offers endless activities including beach visits, spa treatments, cocktail classes, shopping in The Lanes, dining at top restaurants, and experiencing the legendary nightlife. We can help arrange experiences to make your weekend extra special.`
    },
    {
      question: `Can you arrange transport in ${destination.name}?`,
      answer: `While we don't directly arrange transport, ${destination.name} has excellent public transport, taxis, and ride-sharing services. Many of our properties are within walking distance or a short taxi ride from the city centre. We're happy to provide recommendations.`
    }
  ];

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://groupescapehouses.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Destinations",
        "item": "https://groupescapehouses.co.uk/destinations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": destination.name,
        "item": `https://groupescapehouses.co.uk/destinations/${destination.name.toLowerCase()}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      {/* Hero */}
      <div className="relative h-[500px] mt-20">
        {destination.video ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={destination.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </>
        ) : (
          <>
            <Image src={destination.image} alt={destination.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1200px] mx-auto px-6 pb-12">
            <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-white text-xl mb-6">
              <MapPin className="w-5 h-5" />
              <span>{destination.region}</span>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 py-4 font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/contact">Check Availability and Book</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* SEO Content Section with Internal Links */}
      <section className="py-12 bg-white border-b border-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed mb-4">
              Looking for the perfect <Link href="/occasions/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen party houses in {destination.name}</Link>? 
              Group Escape Houses offers stunning <Link href="/properties" className="text-[var(--color-accent-sage)] hover:underline font-medium">luxury group accommodation</Link> perfect 
              for celebrations. Our <Link href="/house-styles/party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">party houses</Link> feature 
              amazing amenities including <Link href="/features/hot-tub" className="text-[var(--color-accent-sage)] hover:underline font-medium">hot tubs</Link>, <Link href="/features/swimming-pool" className="text-[var(--color-accent-sage)] hover:underline font-medium">swimming pools</Link>, 
              and <Link href="/features/games-room" className="text-[var(--color-accent-sage)] hover:underline font-medium">games rooms</Link> to make your weekend unforgettable.
            </p>
            <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
              Whether you're planning a <Link href="/occasions/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen do</Link>, <Link href="/occasions/special-celebrations" className="text-[var(--color-accent-sage)] hover:underline font-medium">special celebration</Link>, 
              or <Link href="/occasions/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">weekend break</Link>, {destination.name} combines the 
              perfect location with our <Link href="/house-styles/luxury-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">luxury houses</Link>. 
              Explore our <Link href="/experiences" className="text-[var(--color-accent-sage)] hover:underline font-medium">experiences</Link> to add cocktail classes, spa treatments, 
              and more. Also discover other popular destinations including <Link href="/destinations/london" className="text-[var(--color-accent-sage)] hover:underline font-medium">London</Link>, <Link href="/destinations/bath" className="text-[var(--color-accent-sage)] hover:underline font-medium">Bath</Link>, 
              and <Link href="/destinations" className="text-[var(--color-accent-sage)] hover:underline font-medium">more UK party destinations</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Why {destination.name}?
              </h2>
              <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed mb-6">
                {destination.overview}
              </p>
              
              <div className="space-y-4 mt-6">
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  {destination.name} stands out as one of the UK's premier destinations for <Link href="/occasions/hen-party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">hen party celebrations</Link>. 
                  Our carefully selected <Link href="/properties" className="text-[var(--color-accent-sage)] hover:underline font-medium">luxury properties</Link> in the area provide the perfect base for your celebration, 
                  featuring essential amenities like <Link href="/features/hot-tub" className="text-[var(--color-accent-sage)] hover:underline font-medium">private hot tubs</Link>, <Link href="/features/games-room" className="text-[var(--color-accent-sage)] hover:underline font-medium">games rooms</Link>, 
                  and spacious living areas designed for group entertainment.
                </p>
                
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  Beyond the accommodation, {destination.name} offers an incredible range of activities to enhance your <Link href="/occasions/weekend-breaks" className="text-[var(--color-accent-sage)] hover:underline font-medium">weekend break</Link>. 
                  From world-class dining and vibrant nightlife to unique <Link href="/experiences" className="text-[var(--color-accent-sage)] hover:underline font-medium">experiences</Link> like cocktail masterclasses, spa treatments, 
                  and private chef dinners, there's something to suit every group's taste and budget. The city's compact layout means you can easily explore on foot, making it simple to move between venues and attractions.
                </p>
                
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  Looking for other celebration options? Explore our <Link href="/house-styles/party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">party houses</Link> for 
                  lively group gatherings, <Link href="/house-styles/luxury-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">luxury houses</Link> for upscale celebrations, 
                  or browse our collection of <Link href="/destinations" className="text-[var(--color-accent-sage)] hover:underline font-medium">UK destinations</Link> including <Link href="/destinations/bath" className="text-[var(--color-accent-sage)] hover:underline font-medium">Bath</Link>, <Link href="/destinations/manchester" className="text-[var(--color-accent-sage)] hover:underline font-medium">Manchester</Link>, 
                  and <Link href="/destinations/york" className="text-[var(--color-accent-sage)] hover:underline font-medium">York</Link>.
                </p>
              </div>
            </div>
            <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">From London</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.fromLondon}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Best Time to Visit</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Moon className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Nightlife</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.nightlife}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Dining</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.dining}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Waves className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Beach Access</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.beachAccess}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-[var(--color-accent-sage)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Accommodation</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.accommodation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PoundSterling className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Price Range</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.priceRange}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PartyPopper className="w-5 h-5 text-[var(--color-accent-pink)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Activities</p>
                    <p className="text-sm text-[var(--color-neutral-dark)]">{destination.quickFacts.activities}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Navigation className="w-5 h-5 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Getting There
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.gettingThere.map((option: any, index: number) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-sage)]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[var(--color-accent-sage)]" />
                  </div>
                  <p className="text-[var(--color-neutral-dark)] flex-1">{option.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nightlife */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Moon className="w-5 h-5 text-[var(--color-accent-sage)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Top Nightlife Spots
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.nightlife.map((venue, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                {venue.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-semibold mb-2 text-[var(--color-text-primary)]">{venue.name}</p>
                  <p className="text-sm text-[var(--color-neutral-dark)]">{venue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brunch & Dining */}
      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent-gold)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Best Brunch & Dining
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.brunch.map((venue, index) => (
              <a
                key={index}
                href={venue.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="font-semibold mb-2 text-[var(--color-text-primary)]">{venue.name}</p>
                  <p className="text-sm text-[var(--color-neutral-dark)] mb-3">{venue.description}</p>
                  <span className="text-[var(--color-accent-sage)] hover:underline text-sm font-medium inline-flex items-center gap-1">
                    Visit Website
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Things to Do
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                {activity.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-semibold mb-2 text-[var(--color-text-primary)]">{activity.name}</p>
                  {activity.description && (
                    <p className="text-sm text-[var(--color-neutral-dark)]">{activity.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Everything you need to know about visiting {destination.name}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[var(--color-bg-primary)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-text-primary)] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[var(--color-neutral-dark)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties in this area */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Hen Party Houses in {destination.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/contact">Check Availability and Book</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}