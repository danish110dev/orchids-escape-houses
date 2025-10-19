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
    london: {
      name: "London",
      region: "Greater London",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london%2c-uk-29990c38-20251018180027.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-9523ddd1-20251018221659.mp4",
      overview:
        "London is the ultimate destination for unforgettable celebrations, offering world-class entertainment, iconic landmarks, and endless dining options. From the West End to trendy East London, the capital provides an unmatched mix of culture, nightlife, and luxury experiences perfect for any group celebration.",
      quickFacts: {
        fromLondon: "In the capital",
        nightlife: "World-class entertainment",
        dining: "Michelin stars & street food",
        bestTime: "Year-round destination",
        beachAccess: "River Thames views",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£85-£180 per night",
        activities: "Museums, shows, shopping, dining"
      },
      gettingThere: [
        { icon: Train, text: "Excellent train connections to all London terminals from across the UK" },
        { icon: Plane, text: "Multiple airports: Heathrow, Gatwick, Stansted, Luton, City Airport" },
        { icon: Car, text: "Major motorways M1, M4, M25 with congestion charge in central zones" },
        { icon: Bus, text: "Extensive coach network and 24-hour tube on weekends" },
      ],
      nightlife: [
        {
          name: "Fabric",
          description: "World-famous superclub in Farringdon.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-fabr-04e8b8b7-20251019160800.jpg"
        },
        {
          name: "Ministry of Sound",
          description: "Iconic club with legendary sound system.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-mini-3fa369b0-20251019160808.jpg"
        },
        {
          name: "Shoreditch House",
          description: "Rooftop bar with stunning city views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-shoreditch-ho-9aa7be85-20251019160817.jpg"
        },
        {
          name: "The Box Soho",
          description: "Cabaret and nightclub experience.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--519c3daa-20251019160827.jpg"
        },
        {
          name: "Cirque le Soir",
          description: "Circus-themed immersive nightclub.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-cirq-2ddc18f5-20251019160838.jpg"
        },
        {
          name: "XOYO",
          description: "Cutting-edge music venue in Shoreditch.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-xoyo-afa5d766-20251019160846.jpg"
        },
      ],
      brunch: [
        {
          name: "Sketch",
          description: "Instagram-famous pink room with afternoon tea.",
          link: "https://sketch.london/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-sket-3df89909-20251019160854.jpg"
        },
        {
          name: "The Ivy",
          description: "British classics in glamorous setting.",
          link: "https://www.the-ivy.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--b97bab31-20251019160901.jpg"
        },
        {
          name: "Dishoom",
          description: "Bombay-style cafe with legendary bacon naan.",
          link: "https://www.dishoom.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-dish-17464926-20251019160909.jpg"
        },
        {
          name: "Balthazar",
          description: "French brasserie in Covent Garden.",
          link: "https://www.balthazarlondon.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-balt-d299a5ab-20251019160917.jpg"
        },
        {
          name: "Duck & Waffle",
          description: "24-hour dining with breathtaking views.",
          link: "https://duckandwaffle.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-duck-eade91e1-20251019160925.jpg"
        },
        {
          name: "Granger & Co",
          description: "Australian brunch classics.",
          link: "https://grangerandco.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-gran-eb7f7d03-20251019160937.jpg"
        },
      ],
      activities: [
        {
          name: "West End Shows",
          description: "World-class theatre and musicals.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london-west--25bf85fa-20251019160945.jpg"
        },
        {
          name: "Thames River Cruise",
          description: "See London's landmarks from the water.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-thames-river-25ed8e9b-20251019160952.jpg"
        },
        {
          name: "Borough Market",
          description: "Historic food market with artisan treats.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-borough-mark-c97700ca-20251019161001.jpg"
        },
        {
          name: "Shoreditch Street Art",
          description: "Walking tour of famous graffiti.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-shoreditch-s-4a8d64d1-20251019161010.jpg"
        },
        {
          name: "Sky Garden",
          description: "Free rooftop garden with panoramic views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-sky-garden-r-a9df30bb-20251019161016.jpg"
        },
        {
          name: "Camden Market",
          description: "Alternative shopping and street food.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-camden-marke-628ba9a1-20251019161024.jpg"
        },
      ],
      spas: [
        "The Ned Spa - City spa with rooftop pool",
        "ESPA Life at Corinthia - Five-star luxury spa",
        "Cowshed Spa - Trendy Shoreditch spa retreat",
        "Bulgari Spa - Knightsbridge luxury spa",
      ],
    },
    manchester: {
      name: "Manchester",
      region: "Greater Manchester",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-814b7958-20251018221723.mp4",
      overview:
        "Manchester is a vibrant northern powerhouse famous for its music heritage, fantastic shopping, and legendary nightlife. This cosmopolitan city offers incredible value with amazing restaurants, bars, and cultural venues, making it perfect for memorable group celebrations.",
      quickFacts: {
        fromLondon: "2 hours by train",
        nightlife: "Northern Quarter buzzing",
        dining: "Diverse food scene",
        bestTime: "Year-round destination",
        beachAccess: "City centre location",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£65-£140 per night",
        activities: "Shopping, music, culture, dining"
      },
      gettingThere: [
        { icon: Train, text: "London to Manchester: 2 hours by train (Euston to Piccadilly)" },
        { icon: Plane, text: "Manchester Airport: 20 minutes by train or car to city centre" },
        { icon: Car, text: "Well connected via M6, M62, M60 with city centre parking" },
        { icon: Bus, text: "Regular coach services from all major UK cities" },
      ],
      nightlife: [
        {
          name: "The Warehouse Project",
          description: "Legendary club nights and events.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--4e8a13f4-20251019161345.jpg"
        },
        {
          name: "Revolution",
          description: "Cocktail bar with party atmosphere.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-revo-27db3211-20251019161353.jpg"
        },
        {
          name: "Deansgate Locks",
          description: "Canal-side bars and clubs.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-deansgate-loc-ed73dd36-20251019161401.jpg"
        },
        {
          name: "The Printworks",
          description: "Entertainment complex with multiple venues.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--cd2dd1a4-20251019161410.jpg"
        },
        {
          name: "Cloud 23",
          description: "Rooftop bar with panoramic views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-clou-86d155e4-20251019161419.jpg"
        },
        {
          name: "Albert's Schloss",
          description: "Bavarian-style beer hall with live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-albe-67964db5-20251019161426.jpg"
        },
      ],
      brunch: [
        {
          name: "Federal Bar & Kitchen",
          description: "Australian-style brunch in Northern Quarter.",
          link: "https://federalandco.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-fede-c636d4b3-20251019161434.jpg"
        },
        {
          name: "Evelyn's Cafe Bar",
          description: "Bottomless brunch with live music.",
          link: "https://www.evelynscafebar.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-evel-5324f86b-20251019161443.jpg"
        },
        {
          name: "The Ivy Spinningfields",
          description: "All-day dining with cocktails.",
          link: "https://www.the-ivy.co.uk/spinningfields",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--cd553742-20251019161448.jpg"
        },
        {
          name: "Bill's Manchester",
          description: "Relaxed dining with brunch classics.",
          link: "https://bills-website.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bill-bfa3e6be-20251019161456.jpg"
        },
        {
          name: "Dough Pizza Kitchen",
          description: "Bottomless pizza and prosecco.",
          link: "https://www.doughpizzakitchen.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-doug-fc722530-20251019161503.jpg"
        },
        {
          name: "Turtle Bay",
          description: "Caribbean bottomless brunch.",
          link: "https://www.turtlebay.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-turt-3f1e8a27-20251019161510.jpg"
        },
      ],
      activities: [
        {
          name: "Northern Quarter",
          description: "Trendy area with independent shops and street art.",
          image: "https://v3b.fal.media/files/b/koala/v6ZTWxmoV2VnXT74ia6nN_output.png"
        },
        {
          name: "Manchester Art Gallery",
          description: "Free gallery with extensive collections.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-a-0e1f2bc8-20251019161524.jpg"
        },
        {
          name: "Old Trafford Stadium",
          description: "Tour the iconic football stadium.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-old-trafford-bbe915fb-20251019161534.jpg"
        },
        {
          name: "Manchester Cathedral",
          description: "Stunning medieval architecture.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-c-1ddf8cc2-20251019161543.jpg"
        },
        {
          name: "Afflecks Palace",
          description: "Alternative shopping emporium.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-afflecks-pal-1b56dfc5-20251019161549.jpg"
        },
        {
          name: "Castlefield",
          description: "Historic canal area with bars and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-castlefield--9532b8a6-20251019161558.jpg"
        },
      ],
      spas: [
        "The Spa at Midland - Historic hotel spa",
        "King Street Townhouse Spa - Rooftop infinity pool",
        "Bannatyne Spa Manchester - Full facilities",
        "Cloud 23 Spa - Luxury city spa",
      ],
    },
    york: {
      name: "York",
      region: "North Yorkshire",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-uk%2c-m-7d6cc34e-20251018100412.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-cf550e7c-20251018221750.mp4",
      overview:
        "York is a charming medieval city with cobbled streets, historic walls, and beautiful riverside setting. This compact city combines rich history with modern amenities, offering boutique shops, cosy pubs, and unique experiences perfect for sophisticated group celebrations.",
      quickFacts: {
        fromLondon: "2 hours by train",
        nightlife: "Charming pubs & bars",
        dining: "Historic tea rooms & modern dining",
        bestTime: "Year-round destination",
        beachAccess: "Countryside & river views",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£70-£145 per night",
        activities: "History, shopping, walking, dining"
      },
      gettingThere: [
        { icon: Train, text: "London to York: 2 hours by train (Kings Cross to York)" },
        { icon: Plane, text: "Leeds Bradford Airport: 40 minutes by car" },
        { icon: Car, text: "Well connected via A1(M) and A64 with park and ride" },
        { icon: Bus, text: "Regular coach services from major cities" },
      ],
      nightlife: [
        {
          name: "The House of Trembling Madness",
          description: "Quirky medieval bar with craft beers.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--c4fcdc21-20251019161638.jpg"
        },
        {
          name: "Kuda",
          description: "Popular nightclub in city centre.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-kuda-d8135e11-20251019161646.jpg"
        },
        {
          name: "Pitcher & Piano",
          description: "Stylish bar with live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-pitc-3ccef4c4-20251019161652.jpg"
        },
        {
          name: "The Phoenix",
          description: "Live music venue and bar.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--e5fea03c-20251019161701.jpg"
        },
        {
          name: "All Bar One",
          description: "Cocktails and sophisticated atmosphere.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-all--8557886b-20251019161709.jpg"
        },
        {
          name: "The Botanist",
          description: "Garden-themed bar with live entertainment.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--b8a243c3-20251019161715.jpg"
        },
      ],
      brunch: [
        {
          name: "Bettys Tea Room",
          description: "Iconic Yorkshire tea room since 1919.",
          link: "https://www.bettys.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bett-ad3828ec-20251019161722.jpg"
        },
        {
          name: "The Ivy St Helens Square",
          description: "All-day British dining.",
          link: "https://www.the-ivy.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--138075ff-20251019161729.jpg"
        },
        {
          name: "The Star Inn The City",
          description: "Riverside dining with views.",
          link: "https://www.starinnthe city.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-star-inn--9a06ea8d-20251019161737.jpg"
        },
        {
          name: "Partisan",
          description: "Independent cafe with great breakfast.",
          link: "https://www.partisanyork.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-part-1634d352-20251019161746.jpg"
        },
        {
          name: "Spring Espresso",
          description: "Artisan coffee and brunch.",
          link: "https://www.springespresso.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-spri-21a646a9-20251019161752.jpg"
        },
        {
          name: "The Botanist",
          description: "Bottomless brunch with live music.",
          link: "https://thebotanist.uk.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--d8db4af8-20251019161800.jpg"
        },
      ],
      activities: [
        {
          name: "York Minster",
          description: "Magnificent Gothic cathedral.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-minster-4b219d9f-20251019161807.jpg"
        },
        {
          name: "The Shambles",
          description: "Medieval shopping street.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-the-shambles-ebd123da-20251019161814.jpg"
        },
        {
          name: "York City Walls",
          description: "Walk the historic medieval walls.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-city-wa-b7ae138b-20251019161820.jpg"
        },
        {
          name: "Ghost Walk",
          description: "Evening ghost tours through the city.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-ghost-w-b152fe3b-20251019161829.jpg"
        },
        {
          name: "JORVIK Viking Centre",
          description: "Interactive Viking history experience.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-jorvik-vikin-4bfd8755-20251019161842.jpg"
        },
        {
          name: "York's Chocolate Story",
          description: "Interactive chocolate making experience.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york%27s-cho-af974700-20251019161849.jpg"
        },
      ],
      spas: [
        "York Hall Spa - Boutique city spa",
        "Cedar Court Grand Hotel Spa - Historic venue",
        "Middlethorpe Spa - Country house spa",
        "Radisson Blu Spa - Modern spa facilities",
      ],
    },
    cardiff: {
      name: "Cardiff",
      region: "South Wales",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/cardiff-city-center-photograph%2c-iconic-caf939c9-20251017161252.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-7ddf21c9-20251018221811.mp4",
      overview:
        "Cardiff is Wales' vibrant capital city offering fantastic value, warm hospitality, and easy access to stunning coastline. This compact city combines modern amenities with historic charm, featuring a beautiful bay area, excellent shopping, and lively nightlife perfect for group celebrations.",
      quickFacts: {
        fromLondon: "2 hours by train",
        nightlife: "St Mary Street buzzing",
        dining: "Welsh & international cuisine",
        bestTime: "Year-round destination",
        beachAccess: "Cardiff Bay waterfront",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£60-£130 per night",
        activities: "Bay, castle, shopping, rugby"
      },
      gettingThere: [
        { icon: Train, text: "London to Cardiff: 2 hours by train (Paddington to Cardiff Central)" },
        { icon: Plane, text: "Cardiff Airport: 30 minutes by car or bus" },
        { icon: Car, text: "Well connected via M4 with city centre parking" },
        { icon: Bus, text: "Regular coach services from across the UK" },
      ],
      nightlife: [
        {
          name: "Pryzm",
          description: "Large nightclub with multiple rooms.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-pryz-67ce071a-20251019145236.jpg"
        },
        {
          name: "Wow Bar",
          description: "Quirky cocktail bar with fun atmosphere.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-wow--8b92cec3-20251019145245.jpg"
        },
        {
          name: "The Depot",
          description: "Cardiff Bay venue with live entertainment.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-depot-car-df06ce5e-20251019145251.jpg"
        },
        {
          name: "Clwb Ifor Bach",
          description: "Alternative music venue.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-clwb-5989c1c0-20251019145258.jpg"
        },
        {
          name: "The Gatekeeper",
          description: "Rooftop bar with city views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-gatekeepe-22a5ae79-20251019145305.jpg"
        },
        {
          name: "Revolution Cardiff",
          description: "Cocktail bar with party vibes.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-revo-34cc12db-20251019145313.jpg"
        },
      ],
      brunch: [
        {
          name: "The Cosy Club",
          description: "All-day dining in stylish setting.",
          link: "https://www.cosyclub.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--6287a25e-20251019145342.jpg"
        },
        {
          name: "The Ivy Cardiff",
          description: "British classics with brunch menu.",
          link: "https://www.the-ivy.co.uk/cardiff",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--93334740-20251019145348.jpg"
        },
        {
          name: "Bill's Cardiff",
          description: "Relaxed brunch and all-day dining.",
          link: "https://bills-website.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bill-78d6741f-20251019145357.jpg"
        },
        {
          name: "The Potted Pig",
          description: "Unique dining in former bank vault.",
          link: "https://www.thepottedpig.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--6036cbaf-20251019145410.jpg"
        },
        {
          name: "Porro",
          description: "Italian brunch with prosecco.",
          link: "https://www.porro.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-porr-b8c316b1-20251019145418.jpg"
        },
        {
          name: "Calabrisella",
          description: "Italian restaurant with brunch menu.",
          link: "https://www.calabrisella.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-cala-73f3f312-20251019145427.jpg"
        },
      ],
      activities: [
        {
          name: "Cardiff Castle",
          description: "Historic castle in city centre.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cardiff-cast-dbf26bb1-20251019145459.jpg"
        },
        {
          name: "Cardiff Bay",
          description: "Waterfront with restaurants and bars.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cardiff-bay--3166f67b-20251019145506.jpg"
        },
        {
          name: "Principality Stadium",
          description: "World-class rugby venue with tours.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-principality-dae58efb-20251019145516.jpg"
        },
        {
          name: "Cardiff Market",
          description: "Victorian indoor market.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cardiff-vict-ac5e26fd-20251019145523.jpg"
        },
        {
          name: "Wales Millennium Centre",
          description: "Arts venue with shows and performances.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-wales-millen-fb998eda-20251019145532.jpg"
        },
        {
          name: "Bute Park",
          description: "Beautiful parkland along the river.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bute-park-in-bc01c5b0-20251019145539.jpg"
        },
      ],
      spas: [
        "St David's Hotel Spa - Luxury bay spa",
        "Healing Clouds Spa - City centre spa",
        "The Vale Resort Spa - Golf resort spa",
        "Celtic Manor Spa - Championship venue",
      ],
    },
    brighton: {
      name: "Brighton",
      region: "East Sussex",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--cf923885-20251018100341.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-2e4878b9-20251019143819.mp4",
      overview:
        "Brighton is the ultimate hen party destination, combining stunning seaside charm with vibrant nightlife and endless entertainment. This cosmopolitan city offers the perfect mix of beach vibes, quirky shops, amazing restaurants, and legendary clubs. From the iconic Brighton Pier to the historic Lanes, there's something for every taste and budget.",
      quickFacts: {
        fromLondon: "1 hour by train",
        nightlife: "Legendary clubs and bars",
        dining: "100+ restaurants",
        bestTime: "May-September",
        beachAccess: "Pebble beach waterfront",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£69-£150 per night",
        activities: "Beach, pier, shopping, spas"
      },
      gettingThere: [
        { icon: Train, text: "London to Brighton: 1 hour by train (Victoria to Brighton)" },
        { icon: Plane, text: "London Gatwick Airport: 30 minutes by train or car" },
        { icon: Car, text: "Driving: Well connected via M23 and A23 with ample parking" },
        { icon: Bus, text: "Coach services: Regular National Express services from major UK cities" },
      ],
      nightlife: [
        {
          name: "The Arch",
          description: "Popular club with multiple rooms and diverse music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-ni-85dda42b-20251018212525.jpg"
        },
        {
          name: "Patterns",
          description: "Beachfront venue with live DJs and stunning sea views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-beac-8d37a9fe-20251018212534.jpg"
        },
        {
          name: "Coalition",
          description: "Busy student bar with cheap drinks and great atmosphere.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-busy-5c27222d-20251018212541.jpg"
        },
        {
          name: "Proud Cabaret",
          description: "Dinner and show venue with burlesque performances.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-caba-1f11fafd-20251018212548.jpg"
        },
        {
          name: "Revenge",
          description: "Brighton's biggest LGBT+ club with drag shows.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-vibr-3cf7d9e8-20251018212557.jpg"
        },
        {
          name: "Concorde 2",
          description: "Live music venue and club with indie and alternative nights.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-live-098433dc-20251018212603.jpg"
        },
      ],
      brunch: [
        {
          name: "The Ivy in the Lanes",
          description: "Elegant all-day dining in beautiful setting.",
          link: "https://theivybrighton.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-eleg-9ccf4e6e-20251018213941.jpg"
        },
        {
          name: "Burnt Orange",
          description: "Bottomless brunch with great cocktails.",
          link: "https://www.burntorangerestaurant.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-food-photography-of-bottoml-b2a5bdbc-20251018213948.jpg"
        },
        {
          name: "Bills",
          description: "Local favourite serving delicious breakfast and brunch.",
          link: "https://bills-website.co.uk/restaurants/brighton/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-cozy-local-fa-1bb43550-20251018213955.jpg"
        },
        {
          name: "The Salt Room",
          description: "Upscale seafront dining with amazing views.",
          link: "https://www.saltroom-restaurant.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-upscale-seafr-2a17d9c6-20251018214003.jpg"
        },
        {
          name: "Cafe Coho",
          description: "Independent cafe with excellent coffee and brunch.",
          link: "https://www.cafecoho.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-independent-a-2d62cdd0-20251018214014.jpg"
        },
        {
          name: "Terre à Terre",
          description: "Award-winning vegetarian restaurant with creative brunch.",
          link: "https://www.terreaterre.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-food-photography-of-creativ-74c2bc4c-20251018214021.jpg"
        },
      ],
      activities: [
        {
          name: "Brighton Palace Pier",
          description: "Classic seaside fun with arcade games.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-pal-c26b7879-20251018212031.jpg"
        },
        {
          name: "Royal Pavilion",
          description: "Stunning historic palace and gardens.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-roy-40faffe4-20251018212039.jpg"
        },
        {
          name: "Brighton Beach",
          description: "Pebble beach perfect for summer celebrations.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-bea-33acb70a-20251018212047.jpg"
        },
        {
          name: "The Lanes",
          description: "Historic quarter with quirky shops and cafes.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-the-lanes-br-19ff6aa3-20251018212054.jpg"
        },
        {
          name: "British Airways i360",
          description: "Observation tower with panoramic views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-british-airw-87225a9a-20251018212102.jpg"
        },
        {
          name: "North Laine",
          description: "Bohemian area with independent shops and cafes.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-north-laine--874b1984-20251018212109.jpg"
        },
      ],
      spas: [
        "The Lanes Spa - Luxury spa in the heart of the city",
        "Brighton Harbour Hotel Spa - Upscale spa with rooftop pool",
        "Serenity Spa - Day spa offering packages for groups",
        "Unique Mobile Spa - In-house treatments at your property",
      ],
    },
    newcastle: {
      name: "Newcastle",
      region: "Tyne and Wear",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-uk-a7d70fdf-20251018100503.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-drone-footage-slowly-flying-ov-0ece3ba3-20251018213135.mp4",
      overview:
        "Newcastle is famous for its legendary nightlife, warm Geordie hospitality, and stunning quayside setting. This vibrant northern city offers incredible value for money with amazing bars, clubs, and restaurants, making it a top choice for hen parties. From the iconic Tyne Bridge to the rejuvenated Ouseburn Valley, Newcastle combines historic charm with modern entertainment.",
      quickFacts: {
        fromLondon: "3 hours by train",
        nightlife: "Famous party atmosphere",
        dining: "Quayside restaurants & bars",
        bestTime: "April-October",
        beachAccess: "Coast nearby (Tynemouth)",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£59-£120 per night",
        activities: "Quayside, bars, culture, spas"
      },
      gettingThere: [
        { icon: Train, text: "London to Newcastle: 3 hours by train (Kings Cross to Newcastle Central)" },
        { icon: Plane, text: "Newcastle International Airport: 15 minutes by metro or car" },
        { icon: Car, text: "Driving: Well connected via A1(M) with parking in city centre" },
        { icon: Bus, text: "Coach services: Regular National Express and Megabus from major cities" },
      ],
      nightlife: [
        {
          name: "Digital",
          description: "Multi-room nightclub with diverse music and great atmosphere.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-digi-7e8a7795-20251019145953.jpg"
        },
        {
          name: "The Gate",
          description: "Entertainment complex with bars, clubs and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--3ec1c42b-20251019150002.jpg"
        },
        {
          name: "House of Smith",
          description: "Stylish bar with cocktails and live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-hous-e09f0af0-20251019150011.jpg"
        },
        {
          name: "Tup Tup Palace",
          description: "Moroccan-themed club with unique interiors.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-tup--a3a68636-20251019150019.jpg"
        },
        {
          name: "The Botanist",
          description: "Bar and restaurant with live music and bottomless brunch.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--1a8c77bd-20251019150028.jpg"
        },
        {
          name: "Livello",
          description: "Rooftop bar with stunning city views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-live-867ed824-20251019150036.jpg"
        },
      ],
      brunch: [
        {
          name: "The Botanist",
          description: "Bottomless brunch with live music and entertainment.",
          link: "https://thebotanist.uk.com/locations/newcastle/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-botanist--1482a995-20251019150104.jpg"
        },
        {
          name: "Turtle Bay",
          description: "Caribbean bottomless brunch with cocktails.",
          link: "https://www.turtlebay.co.uk/restaurants/newcastle/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-turtle-bay-ne-311c7c9b-20251019150109.jpg"
        },
        {
          name: "Pleased to Meet You",
          description: "Trendy spot with excellent brunch menu.",
          link: "https://www.pleasedtomeetyou.org.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-pleased-to-me-3ae5168a-20251019150117.jpg"
        },
        {
          name: "The Waiting Room",
          description: "Quirky cafe with delicious breakfast options.",
          link: "https://www.thewaitingroomnewcastle.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-waiting-r-14f231a7-20251019150124.jpg"
        },
        {
          name: "The French Quarter",
          description: "Brasserie-style dining on the quayside.",
          link: "https://www.thefrenchquarter.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-french-qu-d9599041-20251019150132.jpg"
        },
        {
          name: "Blackfriars Restaurant",
          description: "Historic medieval building with modern British brunch.",
          link: "https://www.blackfriarsrestaurant.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-blackfriars-r-fd21b8b3-20251019150140.jpg"
        },
      ],
      activities: [
        {
          name: "Quayside",
          description: "Scenic riverside walk with bars and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-qu-72455aae-20251019150211.jpg"
        },
        {
          name: "BALTIC Centre for Contemporary Art",
          description: "Free art gallery with cafe.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-baltic-centr-c820a6d7-20251019150219.jpg"
        },
        {
          name: "Ouseburn Valley",
          description: "Trendy area with independent bars and street food.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-ouseburn-val-6c414289-20251019150226.jpg"
        },
        {
          name: "Grainger Market",
          description: "Historic covered market with unique shops.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-grainger-mar-e6ecb4ef-20251019150234.jpg"
        },
        {
          name: "Newcastle Castle",
          description: "Medieval fortress in the heart of the city.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-ca-9cc26af9-20251019150245.jpg"
        },
        {
          name: "Tyne Bridge",
          description: "Iconic landmark perfect for photos.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-tyne-bridge--526fb827-20251019150252.jpg"
        },
      ],
      spas: [
        "Bannatyne Spa Newcastle - Large spa with pool, sauna and treatments",
        "Hotel du Vin Spa - Boutique spa with luxurious treatments",
        "Village Hotel Spa - Modern spa with extensive facilities",
        "Malmaison Spa - City centre spa with group packages",
      ],
    },
    bath: {
      name: "Bath",
      region: "Somerset",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-8794e359-20251018214911.mp4",
      overview:
        "Bath is a stunning historic city renowned for its Roman baths, Georgian architecture, and luxury spa experiences. This UNESCO World Heritage Site offers the perfect blend of culture, elegance, and modern entertainment, making it an ideal destination for sophisticated hen celebrations. From its iconic Royal Crescent to the boutique shops and world-class restaurants, Bath provides an unforgettable backdrop for your special weekend.",
      quickFacts: {
        fromLondon: "1.5 hours by train",
        nightlife: "Elegant bars and clubs",
        dining: "Fine dining & afternoon tea",
        bestTime: "Year-round destination",
        beachAccess: "Countryside views",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£75-£160 per night",
        activities: "Spas, culture, shopping, dining"
      },
      gettingThere: [
        { icon: Train, text: "London to Bath: 1.5 hours by train (Paddington to Bath Spa)" },
        { icon: Plane, text: "Bristol Airport: 30 minutes by car or bus" },
        { icon: Car, text: "Driving: Well connected via M4 with park and ride facilities" },
        { icon: Bus, text: "Coach services: Regular National Express from major UK cities" },
      ],
      nightlife: [
        {
          name: "The Raven",
          description: "Popular pub with craft beers and live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--0bd79d70-20251018214920.jpg"
        },
        {
          name: "Moles Club",
          description: "Legendary live music venue and nightclub.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-mole-3fb332f8-20251018214929.jpg"
        },
        {
          name: "The Bell",
          description: "Historic pub with roof terrace and cocktail bar.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--a82ff2dc-20251018214936.jpg"
        },
        {
          name: "Komedia",
          description: "Comedy club and late-night venue with bar.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-kome-ed20585e-20251018214945.jpg"
        },
        {
          name: "Sub13",
          description: "Underground club with DJ nights and cocktails.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-sub1-72cf20d4-20251018214953.jpg"
        },
        {
          name: "Assembly Inn",
          description: "Quirky pub with eclectic decor and friendly vibe.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-asse-7365d20e-20251018215002.jpg"
        },
      ],
      brunch: [
        {
          name: "The Pump Room",
          description: "Elegant Georgian restaurant with afternoon tea.",
          link: "https://www.romanbaths.co.uk/pump-room-restaurant",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-eleg-7ba9008e-20251018214304.jpg"
        },
        {
          name: "The Scallop Shell",
          description: "Award-winning seafood and champagne brunch.",
          link: "https://www.thescallopshell.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-food-photography-of-afterno-c5b35ba3-20251018214312.jpg"
        },
        {
          name: "The Circus Restaurant",
          description: "Modern British dining with seasonal menu.",
          link: "https://www.thecircusrestaurant.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-modern-britis-7f67bb3f-20251018214318.jpg"
        },
        {
          name: "Sotto Sotto",
          description: "Italian restaurant in historic vaulted cellar.",
          link: "https://www.sottosotto.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-italian-resta-ea31034c-20251018214325.jpg"
        },
        {
          name: "The Ivy Bath Brasserie",
          description: "Stylish all-day dining with bottomless brunch.",
          link: "https://theivybathbrasserie.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-stylish-brunc-02aef5c5-20251018214333.jpg"
        },
        {
          name: "Sally Lunn's Historic Eating House",
          description: "Bath's oldest house serving famous buns since 1680.",
          link: "https://www.sallylunns.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-historic-bath-1ad03395-20251018214339.jpg"
        },
      ],
      activities: [
        {
          name: "Roman Baths",
          description: "Ancient Roman bathing complex and museum.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-roman-baths--924896ba-20251018215009.jpg"
        },
        {
          name: "Royal Crescent",
          description: "Iconic Georgian architecture and museums.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-royal-cresce-80893b7c-20251018215016.jpg"
        },
        {
          name: "Thermae Bath Spa",
          description: "Modern spa with rooftop pool and thermal waters.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-thermae-bath-4e6530c5-20251018215023.jpg"
        },
        {
          name: "Pulteney Bridge",
          description: "Picturesque bridge with shops spanning the River Avon.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-pulteney-bri-5961dbad-20251018215031.jpg"
        },
        {
          name: "Bath Abbey",
          description: "Stunning Gothic architecture with tower tours.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-abbey-u-b2f9e247-20251018215038.jpg"
        },
        {
          name: "Victoria Art Gallery",
          description: "Free gallery with British and European art.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-victoria-art-c9672963-20251018215046.jpg"
        },
      ],
      spas: [
        "Thermae Bath Spa - Britain's only natural thermal spa with rooftop pool",
        "The Gainsborough Bath Spa - Luxury hotel spa with thermal waters",
        "Bath Spa Hotel - Victorian spa with extensive facilities",
        "Lucknam Park Spa - Country house spa with Michelin-starred dining",
      ],
    },
    bournemouth: {
      name: "Bournemouth",
      region: "Dorset",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-bournem-b7bf3aa3-20251019144046.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-aerial-drone-footage-slowly-fl-deb21a6b-20251018221634.mp4",
      overview:
        "Bournemouth is a stunning coastal destination perfect for hen parties, featuring seven miles of golden sandy beaches, vibrant nightlife, and elegant gardens. This seaside resort town offers the ideal blend of beach relaxation and party atmosphere, with bustling bars, restaurants, and clubs. From the iconic pier to the beautiful cliff-top walks, Bournemouth provides an unforgettable coastal celebration experience.",
      quickFacts: {
        fromLondon: "2 hours by train",
        nightlife: "Vibrant bars and clubs",
        dining: "Seafront restaurants & cafes",
        bestTime: "May-September",
        beachAccess: "7 miles of sandy beaches",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£65-£140 per night",
        activities: "Beach, pier, watersports, shopping"
      },
      gettingThere: [
        { icon: Train, text: "London to Bournemouth: 2 hours by train (Waterloo to Bournemouth)" },
        { icon: Plane, text: "Bournemouth Airport: 15 minutes by car or taxi" },
        { icon: Car, text: "Driving: Well connected via M3 and A31 with parking available" },
        { icon: Bus, text: "Coach services: Regular National Express from major UK cities" },
      ],
      nightlife: [
        {
          name: "The Old Fire Station",
          description: "Popular nightclub with multiple rooms and live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--4aa5b4cf-20251019161920.jpg"
        },
        {
          name: "Aruba",
          description: "Beachfront bar and club with stunning sea views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-aruba-beachfr-a5f4b103-20251019161928.jpg"
        },
        {
          name: "Brass Monkey",
          description: "Quirky bar with cocktails and live entertainment.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bras-87bd008d-20251019161939.jpg"
        },
        {
          name: "Smokin' Aces",
          description: "Late-night venue with DJ sets and dancing.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-smok-477b12fb-20251019161946.jpg"
        },
        {
          name: "The Reef",
          description: "Beachside bar with live music and cocktails.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-reef-beac-9c439a93-20251019161952.jpg"
        },
        {
          name: "Opera House",
          description: "Historic venue with club nights and events.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-oper-e2792bb0-20251019162000.jpg"
        },
      ],
      brunch: [
        {
          name: "The Larder House",
          description: "Contemporary dining with bottomless brunch options.",
          link: "https://www.thelarderhouse.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-the--b2aaad18-20251019144509.jpg"
        },
        {
          name: "Urban Reef",
          description: "Seafront dining with stunning beach views.",
          link: "https://www.urban-reef.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-urban-reef-re-792a0dff-20251019162006.jpg"
        },
        {
          name: "Bournemouth Brewery Tap",
          description: "Craft beers and brunch in vibrant setting.",
          link: "https://www.brewhouseandkitchen.com/venue/bournemouth/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bour-0ee78094-20251019162014.jpg"
        },
        {
          name: "The Stable",
          description: "Cider and pizza restaurant with group menus.",
          link: "https://stablepizza.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-ru-e9630520-20251019144056.jpg"
        },
        {
          name: "The Reef Beach Club",
          description: "Beachside dining with Mediterranean menu.",
          link: "https://www.thereef-beachclub.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-reef-beac-1c0ecc2f-20251019162022.jpg"
        },
        {
          name: "Bournemouth Beach Club",
          description: "Relaxed beach dining with fresh seafood.",
          link: "https://www.bmthbeachclub.com/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-bournemouth-b-74a0e2b9-20251019162031.jpg"
        },
      ],
      activities: [
        {
          name: "Bournemouth Beach",
          description: "Seven miles of golden sand perfect for relaxation.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--fe669a03-20251018221818.jpg"
        },
        {
          name: "Bournemouth Pier",
          description: "Iconic pier with activities and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--1b74fef4-20251018221825.jpg"
        },
        {
          name: "Lower Gardens",
          description: "Beautiful Victorian gardens in town centre.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-lower-garden-87563fdd-20251018221833.jpg"
        },
        {
          name: "Watersports",
          description: "Paddleboarding, kayaking and more on the beach.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-watersports--8197a73f-20251019141858.jpg"
        },
        {
          name: "Russell-Cotes Museum",
          description: "Art gallery and museum in stunning clifftop villa.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-russell-cote-b560c5bd-20251018221841.jpg"
        },
        {
          name: "Bournemouth Square",
          description: "Shopping and entertainment in the heart of town.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--a0a20694-20251018221849.jpg"
        },
      ],
      spas: [
        "Urban Beach Hotel Spa - Boutique spa with sea views and treatments",
        "Hallmark Hotel Spa - Full spa facility with pool and therapies",
        "The Green House Spa - Eco-friendly spa with organic treatments",
        "Bournemouth Highcliff Spa - Clifftop spa with panoramic views",
      ],
    },
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
        slug: "york-minster-house",
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