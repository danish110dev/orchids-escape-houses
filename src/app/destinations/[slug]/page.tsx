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
    "lake-district": {
      name: "Lake District",
      region: "Cumbria",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-lake-district-51198f8c-20251019170636.jpg",
      overview: "The Lake District is England's most stunning national park, offering breathtaking landscapes, luxury lodges, and peaceful mountain retreats perfect for group celebrations. With dramatic fells, pristine lakes, and charming villages, it's the ideal destination for groups seeking natural beauty combined with luxury accommodation.",
      quickFacts: {
        fromLondon: "4-5 hours by train or car",
        bestTime: "Year-round, Spring and Summer for hiking",
        nightlife: "Cosy pubs and country inns",
        dining: "Traditional pubs and fine dining restaurants",
        beachAccess: "No beach access, stunning lakes and mountains",
        accommodation: "Luxury lodges with hot tubs and lake views",
        priceRange: "£80-£120 per night",
        activities: "Hiking, boat trips, spa treatments, scenic walks"
      },
      gettingThere: [
        { icon: Train, text: "Regular train services to Windermere and Penrith from London Euston (4-5 hours)" },
        { icon: Car, text: "Scenic drive via M6 motorway (approx 5-6 hours from London)" },
        { icon: Bus, text: "National Express coaches run daily services to major Lake District towns" },
        { icon: Plane, text: "Nearest airports: Manchester (2 hours) or Newcastle (2.5 hours)" }
      ],
      nightlife: [
        { name: "The Drunken Duck", description: "Award-winning pub with craft beers and stunning views", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
        { name: "Zeffirellis", description: "Popular cinema and jazz bar in Ambleside", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
        { name: "The Old Dungeon Ghyll", description: "Traditional climbers' pub with live music", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" }
      ],
      brunch: [
        { name: "The Jumble Room", description: "Quirky restaurant with creative brunch menu", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "Doi Intanon", description: "Thai restaurant with lakeside views", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" },
        { name: "The Cottage in the Wood", description: "Fine dining with panoramic fell views", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Windermere Lake Cruise", description: "Scenic boat tours on England's largest lake", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80" },
        { name: "Spa Treatments", description: "Luxury spa experiences in stunning settings", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" },
        { name: "Mountain Hiking", description: "Guided walks and fell climbing adventures", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" }
      ]
    },
    brighton: {
      name: "Brighton",
      region: "East Sussex",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--cf923885-20251018100341.jpg",
      overview: "Brighton is the UK's premier hen party destination, combining stunning Regency architecture with legendary nightlife, a vibrant beach scene, and endless entertainment options. From cocktail bars to beachfront clubs, this seaside city offers the perfect blend of sophistication and fun for unforgettable group celebrations.",
      quickFacts: {
        fromLondon: "1 hour by train",
        bestTime: "Year-round, May-September for beach weather",
        nightlife: "Legendary nightlife and club scene",
        dining: "Outstanding restaurants and brunch spots",
        beachAccess: "Direct beach access with pier and promenade",
        accommodation: "Luxury houses with hot tubs and sea views",
        priceRange: "£75-£110 per night",
        activities: "Beach clubs, spa treatments, shopping, water sports"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Victoria or London Bridge (1 hour)" },
        { icon: Car, text: "Easy drive via M23 and A23 (approx 1.5 hours from London)" },
        { icon: Bus, text: "National Express and Megabus services from London Victoria" },
        { icon: Plane, text: "Gatwick Airport is 30 minutes away with direct train connections" }
      ],
      nightlife: [
        { name: "Coalition", description: "Multi-room club with varied music across 5 floors", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Patterns", description: "Seafront club with top DJs and stunning terrace", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "The Arch", description: "Boutique venue with cocktails and live music", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "The Ivy in the Lanes", description: "Elegant all-day dining in historic setting", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "https://theivybrighton.com" },
        { name: "Plateau", description: "Rooftop restaurant with bottomless brunch", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Riddle & Finns", description: "Premium seafood and champagne bar", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Beach Clubs", description: "Spend the day at Brighton's famous beach clubs", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" },
        { name: "Shopping in The Lanes", description: "Explore quirky boutiques and vintage shops", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "Brighton Pier", description: "Classic seaside fun with rides and arcades", image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=800&q=80" }
      ]
    },
    london: {
      name: "London",
      region: "Greater London",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-london-citysc-8f325788-20251019170619.jpg",
      overview: "London is the ultimate hen party destination with world-class entertainment, dining, and iconic landmarks. From West End shows to rooftop bars, Michelin-starred restaurants to hidden speakeasies, the capital offers endless possibilities for an unforgettable celebration.",
      quickFacts: {
        fromLondon: "You're here!",
        bestTime: "Year-round destination",
        nightlife: "World-class clubs and bars",
        dining: "Michelin-starred to street food",
        beachAccess: "No beach, but Thames riverside",
        accommodation: "Luxury townhouses and penthouses",
        priceRange: "£100-£150 per night",
        activities: "Shows, museums, shopping, afternoon tea"
      },
      gettingThere: [
        { icon: Train, text: "Multiple train stations connecting to all major UK cities" },
        { icon: Plane, text: "Five major airports: Heathrow, Gatwick, Stansted, Luton, City" },
        { icon: Bus, text: "Excellent coach connections from across the UK" },
        { icon: Car, text: "M25 motorway provides access from all directions" }
      ],
      nightlife: [
        { name: "Cirque le Soir", description: "Theatrical nightclub with circus performers", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "XOYO", description: "Shoreditch club with cutting-edge music", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "Sky Garden", description: "Rooftop bar with stunning city views", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "Sketch", description: "Instagram-famous afternoon tea and brunch", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "https://sketch.london" },
        { name: "Dishoom", description: "Bombay-style café with legendary breakfast", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "The Ivy Chelsea Garden", description: "Chic all-day dining with bottomless brunch", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "West End Shows", description: "World-class theatre and musicals", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80" },
        { name: "Thames River Cruise", description: "Champagne cruises past iconic landmarks", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
        { name: "Shopping", description: "From Oxford Street to boutique Covent Garden", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" }
      ]
    },
    bath: {
      name: "Bath",
      region: "Somerset",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
      overview: "Bath is a stunning UNESCO World Heritage city combining Roman history, Georgian elegance, and world-class spa experiences. Perfect for sophisticated hen parties seeking culture, relaxation, and refined entertainment in one of England's most beautiful cities.",
      quickFacts: {
        fromLondon: "1.5 hours by train",
        bestTime: "Year-round, Spring for festivals",
        nightlife: "Sophisticated bars and wine venues",
        dining: "Fine dining and traditional tea rooms",
        beachAccess: "No beach, riverside walks",
        accommodation: "Georgian townhouses with period features",
        priceRange: "£85-£120 per night",
        activities: "Spa treatments, historical tours, afternoon tea"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Paddington (1.5 hours)" },
        { icon: Car, text: "M4 motorway via Bristol (approx 2.5 hours from London)" },
        { icon: Bus, text: "National Express coaches from London Victoria" },
        { icon: Plane, text: "Bristol Airport is 30 minutes away" }
      ],
      nightlife: [
        { name: "Sub 13", description: "Underground cocktail bar in vaulted cellars", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
        { name: "The Bell Inn", description: "Historic pub with live music nights", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
        { name: "The Dark Horse", description: "Cocktail bar with speakeasy vibes", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" }
      ],
      brunch: [
        { name: "The Pump Room", description: "Elegant dining in historic Roman Baths setting", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "Society Café", description: "Stylish all-day dining and cocktails", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Colonna & Small's", description: "Award-winning coffee and brunch", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Thermae Bath Spa", description: "Rooftop thermal pools with city views", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" },
        { name: "Roman Baths", description: "Ancient Roman bathing complex", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
        { name: "Royal Crescent", description: "Iconic Georgian architecture and gardens", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" }
      ]
    },
    manchester: {
      name: "Manchester",
      region: "Greater Manchester",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
      overview: "Manchester is the vibrant Northern powerhouse with world-class shopping, incredible nightlife, and warm hospitality. From the trendy Northern Quarter to iconic music venues, Manchester offers an electric atmosphere perfect for unforgettable hen celebrations.",
      quickFacts: {
        fromLondon: "2 hours by train",
        bestTime: "Year-round, Summer for outdoor venues",
        nightlife: "Legendary music and club scene",
        dining: "Diverse restaurants and trendy eateries",
        beachAccess: "No beach, canal-side walkways",
        accommodation: "Modern lofts and warehouse conversions",
        priceRange: "£70-£95 per night",
        activities: "Shopping, live music, food markets, cocktail bars"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Euston (2 hours)" },
        { icon: Plane, text: "Manchester Airport with global connections" },
        { icon: Car, text: "M6 and M62 motorways from all directions" },
        { icon: Bus, text: "Frequent coach services from major UK cities" }
      ],
      nightlife: [
        { name: "The Warehouse Project", description: "Legendary club with world-class DJs", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Refuge", description: "Grand hotel bar with eclectic entertainment", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "Cloud 23", description: "Rooftop bar with panoramic city views", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "Beautif", description: "Trendy Northern Quarter brunch spot", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "The Ivy Spinningfields", description: "Elegant all-day dining and cocktails", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Federal Bar", description: "Australian-inspired brunch and coffee", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Shopping", description: "From Harvey Nichols to independent boutiques", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "Music Tours", description: "Explore Manchester's legendary music heritage", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80" },
        { name: "Food Markets", description: "Altrincham and Mackie Mayor markets", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" }
      ]
    },
    york: {
      name: "York",
      region: "North Yorkshire",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-uk%2c-m-7d6cc34e-20251018100412.jpg",
      overview: "York is a stunning medieval city with cobbled streets, historic walls, and charming riverside pubs. Perfect for hen parties seeking history, culture, and traditional English charm combined with modern entertainment and excellent dining.",
      quickFacts: {
        fromLondon: "2 hours by train",
        bestTime: "Year-round, Summer for outdoor terraces",
        nightlife: "Traditional pubs and cocktail bars",
        dining: "Historic pubs and fine dining restaurants",
        beachAccess: "No beach, riverside walks",
        accommodation: "Period townhouses and modern homes",
        priceRange: "£75-£100 per night",
        activities: "Historical tours, river cruises, afternoon tea"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Kings Cross (2 hours)" },
        { icon: Car, text: "A1(M) and M1 motorways (approx 3.5 hours from London)" },
        { icon: Bus, text: "National Express services from major cities" },
        { icon: Plane, text: "Leeds Bradford Airport is 45 minutes away" }
      ],
      nightlife: [
        { name: "The Botanist", description: "Stylish bar with botanical cocktails", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
        { name: "The House of Trembling Madness", description: "Unique medieval beer hall", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
        { name: "Evil Eye Lounge", description: "Quirky cocktail bar with vintage vibes", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" }
      ],
      brunch: [
        { name: "Ate O'Clock", description: "Popular brunch spot in The Shambles", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "The Ivy St. Helen's Square", description: "Elegant dining in historic setting", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Mannion & Co", description: "Contemporary dining with local produce", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "York Minster", description: "Stunning Gothic cathedral tours", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
        { name: "The Shambles", description: "Medieval shopping street with boutiques", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "River Cruise", description: "Relaxing boat trips along the River Ouse", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" }
      ]
    },
    cardiff: {
      name: "Cardiff",
      region: "South Wales",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/cardiff-city-center-photograph%2c-iconic-caf939c9-20251017161252.jpg",
      overview: "Cardiff is Wales' vibrant capital offering fantastic value, warm Welsh hospitality, and stunning Cardiff Bay. With a thriving nightlife scene, excellent shopping, and beautiful waterfront, it's perfect for hen parties seeking a lively celebration with great prices.",
      quickFacts: {
        fromLondon: "2 hours by train",
        bestTime: "Year-round, Summer for bay activities",
        nightlife: "Lively bars and clubs scene",
        dining: "Welsh cuisine and international restaurants",
        beachAccess: "No beach, stunning bay waterfront",
        accommodation: "Modern apartments and bay-view properties",
        priceRange: "£65-£90 per night",
        activities: "Shopping, castle tours, bay walks, stadium tours"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Paddington (2 hours)" },
        { icon: Car, text: "M4 motorway (approx 2.5 hours from London)" },
        { icon: Bus, text: "Regular coach services from major UK cities" },
        { icon: Plane, text: "Cardiff Airport with connections to major cities" }
      ],
      nightlife: [
        { name: "Clwb Ifor Bach", description: "Iconic Welsh music and club venue", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Lab 22", description: "Underground cocktail bar and club", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "The Dead Canary", description: "Award-winning speakeasy cocktail bar", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "Milkwood", description: "Stylish bar and kitchen in Cardiff Bay", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "The Ivy Cardiff", description: "Elegant all-day dining and cocktails", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Bill's Cardiff", description: "Quirky dining with bottomless brunch", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Cardiff Castle", description: "Historic castle in the city centre", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
        { name: "Principality Stadium Tour", description: "Behind-the-scenes rugby stadium tour", image: "https://images.unsplash.com/photo-1577223625816-7546f9142bb2?w=800&q=80" },
        { name: "Cardiff Bay", description: "Waterfront dining and entertainment", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" }
      ]
    },
    bournemouth: {
      name: "Bournemouth",
      region: "Dorset",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--f4900618-20251018100420.jpg",
      overview: "Bournemouth offers beautiful sandy beaches, vibrant nightlife, and stunning clifftop walks. Perfect for hen parties wanting beach club days, lively entertainment, and coastal charm all in one fantastic seaside destination.",
      quickFacts: {
        fromLondon: "2 hours by train",
        bestTime: "May-September for beach weather",
        nightlife: "Beach clubs and vibrant bar scene",
        dining: "Seafood restaurants and beach cafés",
        beachAccess: "7 miles of golden sandy beaches",
        accommodation: "Beach-view houses and modern apartments",
        priceRange: "£75-£105 per night",
        activities: "Beach clubs, water sports, coastal walks"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Waterloo (2 hours)" },
        { icon: Car, text: "M3 and A31 (approx 2.5 hours from London)" },
        { icon: Bus, text: "National Express services from London Victoria" },
        { icon: Plane, text: "Bournemouth Airport with European connections" }
      ],
      nightlife: [
        { name: "Aruba", description: "Beach club and nightclub with DJ sets", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Ojo Rojo", description: "Beach club with sea views and cocktails", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "The Old Fire Station", description: "Multi-level bar with rooftop terrace", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "Urban Beach", description: "Beachfront dining with bottomless brunch", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "The Larder House", description: "Stylish café and wine bar", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Neo Restaurant", description: "Contemporary dining with sea views", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Beach Clubs", description: "Sun loungers, cocktails and DJ sets", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" },
        { name: "Water Sports", description: "Paddleboarding, surfing and jet skiing", image: "https://images.unsplash.com/photo-1476400935293-0404fce16baa?w=800&q=80" },
        { name: "Coastal Walks", description: "Stunning clifftop paths with sea views", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" }
      ]
    },
    liverpool: {
      name: "Liverpool",
      region: "Merseyside",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-liverpool-wat-563898e7-20251019170646.jpg",
      overview: "Liverpool combines iconic waterfront views, legendary nightlife, and rich Beatles heritage. With warm Scouse hospitality, fantastic value, and a vibrant atmosphere, it's perfect for hen parties seeking authentic Northern charm.",
      quickFacts: {
        fromLondon: "2.5 hours by train",
        bestTime: "Year-round, Summer for waterfront",
        nightlife: "Famous nightlife and live music",
        dining: "Diverse restaurants and Albert Dock eateries",
        beachAccess: "No beach, stunning waterfront",
        accommodation: "Converted warehouses and modern apartments",
        priceRange: "£70-£95 per night",
        activities: "Beatles tours, shopping, waterfront walks"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Euston (2.5 hours)" },
        { icon: Plane, text: "Liverpool John Lennon Airport" },
        { icon: Car, text: "M6 and M62 motorways" },
        { icon: Bus, text: "Regular coach services from major cities" }
      ],
      nightlife: [
        { name: "The Cavern Club", description: "Legendary music venue where Beatles played", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
        { name: "Santa Chupitos", description: "Shot bar with theatrical serves", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
        { name: "The Merchant", description: "Rooftop bar with city views", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" }
      ],
      brunch: [
        { name: "The Ivy Liverpool", description: "Elegant dining in stunning setting", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "Maray", description: "Middle Eastern inspired small plates", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "92 Degrees", description: "Award-winning coffee and brunch", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Beatles Story", description: "Immersive Beatles museum experience", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80" },
        { name: "Albert Dock Shopping", description: "Waterfront shopping and dining", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "River Cruise", description: "Mersey ferry sightseeing tours", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" }
      ]
    },
    newcastle: {
      name: "Newcastle",
      region: "Tyne and Wear",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newcastle-upo-1cea0fd5-20251019170922.jpg",
      overview: "Newcastle is famous for legendary nightlife, friendly locals, and stunning quayside architecture. The Geordie spirit of fun combined with excellent value makes it a top choice for unforgettable hen celebrations.",
      quickFacts: {
        fromLondon: "3 hours by train",
        bestTime: "Year-round, famous for winter nightlife",
        nightlife: "Legendary Geordie nightlife scene",
        dining: "Modern restaurants and traditional pubs",
        beachAccess: "Nearby Tynemouth beach (20 mins)",
        accommodation: "Quayside apartments and modern houses",
        priceRange: "£65-£90 per night",
        activities: "Shopping, quayside walks, coastal trips"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Kings Cross (3 hours)" },
        { icon: Plane, text: "Newcastle International Airport" },
        { icon: Car, text: "A1(M) motorway from the south" },
        { icon: Bus, text: "National Express services from major cities" }
      ],
      nightlife: [
        { name: "House of Smith", description: "Multi-floor venue with DJs and live acts", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Digital", description: "Underground club with top electronic music", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "The Botanist", description: "Botanical bar and restaurant", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "Pleased To Meet You", description: "Stylish rooftop dining and cocktails", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "The Forth", description: "Award-winning restaurant with chef's table", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "The Patricia", description: "Contemporary bistro on the quayside", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Quayside Market", description: "Sunday market with crafts and street food", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" },
        { name: "Angel of the North", description: "Iconic sculpture photo opportunity", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" },
        { name: "Shopping", description: "From Eldon Square to Grainger Market", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" }
      ]
    },
    birmingham: {
      name: "Birmingham",
      region: "West Midlands",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-birmingham-ci-2022de45-20251019170730.jpg",
      overview: "Birmingham is Britain's dynamic second city with world-class shopping, diverse dining, and buzzing nightlife. The vibrant Jewellery Quarter and modern canal-side venues create the perfect backdrop for celebrations.",
      quickFacts: {
        fromLondon: "1.5 hours by train",
        bestTime: "Year-round, Summer for outdoor venues",
        nightlife: "Diverse clubs and trendy bars",
        dining: "Balti Triangle and Michelin-starred restaurants",
        beachAccess: "No beach, extensive canal network",
        accommodation: "Industrial lofts and modern apartments",
        priceRange: "£70-£95 per night",
        activities: "Shopping, canal walks, food tours"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Euston (1.5 hours)" },
        { icon: Plane, text: "Birmingham Airport with global connections" },
        { icon: Car, text: "M6, M5, M40 and M42 motorways" },
        { icon: Bus, text: "National Express hub with extensive services" }
      ],
      nightlife: [
        { name: "Snobs", description: "Iconic indie club since 1993", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Lab 11", description: "Cocktail bar with speakeasy vibes", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "The Jekyll & Hyde", description: "Multi-level themed bar and club", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "The Ivy Temple Row", description: "Glamorous all-day dining", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "Purnell's Bistro", description: "Michelin-starred chef's casual dining", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "The Wilderness", description: "Innovative tasting menu restaurant", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Shopping", description: "Bullring, Grand Central and boutiques", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "Balti Triangle Food Tour", description: "Explore Birmingham's curry heritage", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" },
        { name: "Jewellery Quarter", description: "Historic area with independent shops", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" }
      ]
    },
    newquay: {
      name: "Newquay",
      region: "Cornwall",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newquay-beach-1b9fbe44-20251019170627.jpg",
      overview: "Newquay is Cornwall's surf capital with stunning beaches, coastal walks, and vibrant nightlife. Perfect for hen parties combining beach days, water sports, and evening entertainment in this beautiful seaside town.",
      quickFacts: {
        fromLondon: "5 hours by train",
        bestTime: "May-September for beach weather",
        nightlife: "Beach clubs and surf-themed bars",
        dining: "Fresh seafood and beachfront cafés",
        beachAccess: "Multiple stunning surf beaches",
        accommodation: "Beach-view houses and coastal cottages",
        priceRange: "£70-£95 per night",
        activities: "Surfing, coastal walks, beach clubs"
      },
      gettingThere: [
        { icon: Train, text: "Trains from London Paddington via Plymouth (5 hours)" },
        { icon: Plane, text: "Newquay Cornwall Airport with UK connections" },
        { icon: Car, text: "A30 via Exeter (approx 5-6 hours from London)" },
        { icon: Bus, text: "National Express services via Plymouth" }
      ],
      nightlife: [
        { name: "Sailors", description: "Legendary nightclub and live music venue", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80" },
        { name: "Bertie's Nightclub", description: "Waterfront club with sea views", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
        { name: "Koola", description: "Beach club with DJ sets and cocktails", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80" }
      ],
      brunch: [
        { name: "The Seafood Restaurant", description: "Rick Stein's legendary seafood dining", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" },
        { name: "Fistral Beach Restaurant", description: "Beachfront dining with stunning views", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "The Beach Hut", description: "Relaxed café with fresh local produce", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Surf Lessons", description: "Learn to surf on Fistral Beach", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80" },
        { name: "Coastal Walks", description: "Stunning South West Coast Path", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80" },
        { name: "Beach Clubs", description: "Day beds, cocktails and DJ sets", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" }
      ]
    }
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