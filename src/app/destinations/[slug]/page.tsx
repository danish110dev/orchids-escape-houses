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
    // ... keep existing london, manchester, york, cardiff, brighton, newcastle, bath, bournemouth data ...
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
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the--1a8c77bd-20251019150028.jpg"
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
    liverpool: {
      name: "Liverpool",
      region: "Merseyside",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-liverpool-uk-12524f88-20251019151454.jpg",
      video: "",
      overview:
        "Liverpool is an iconic waterfront city famous for its legendary nightlife, Beatles heritage, and warm Scouse hospitality. This vibrant northern city offers incredible value with its buzzing cultural scene, world-class museums, stunning architecture, and unforgettable entertainment, making it perfect for memorable hen party celebrations.",
      quickFacts: {
        fromLondon: "2.5 hours by train",
        nightlife: "Legendary party scene",
        dining: "Albert Dock & city centre",
        bestTime: "Year-round destination",
        beachAccess: "Waterfront views",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£62-£135 per night",
        activities: "Beatles tours, museums, nightlife, shopping"
      },
      gettingThere: [
        { icon: Train, text: "London to Liverpool: 2.5 hours by train (Euston to Lime Street)" },
        { icon: Plane, text: "Liverpool John Lennon Airport: 20 minutes by car or taxi" },
        { icon: Car, text: "Well connected via M62, M56, M6 with city centre parking" },
        { icon: Bus, text: "Regular coach services from all major UK cities" },
      ],
      nightlife: [
        {
          name: "Concert Square",
          description: "Heart of Liverpool nightlife with multiple bars and clubs.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Mathew Street",
          description: "Home of The Cavern Club and legendary Beatles venues.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "Albert Dock",
          description: "Waterfront bars with stunning views.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Fusion Nightclub",
          description: "Popular nightclub with themed nights.",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Level Nightclub",
          description: "Multi-floor venue with diverse music.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "24 Kitchen Street",
          description: "Alternative venue with live music and club nights.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Ivy in the Lanes",
          description: "Elegant all-day dining in beautiful setting.",
          link: "https://theivybrighton.com/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Bill's Liverpool",
          description: "All-day dining with bottomless options.",
          link: "https://bills-website.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "Tate Liverpool Café",
          description: "Waterfront dining with gallery views.",
          link: "https://www.tate.org.uk/visit/tate-liverpool",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "The Florist",
          description: "Botanical-themed bar with bottomless brunch.",
          link: "https://theflorist.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "Turtle Bay Albert Dock",
          description: "Caribbean bottomless brunch by the waterfront.",
          link: "https://www.turtlebay.co.uk/restaurants/newcastle/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Maray",
          description: "Small plates and cocktails in trendy setting.",
          link: "https://www.maray.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "The Beatles Story",
          description: "Immersive museum dedicated to the Fab Four.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
        {
          name: "Albert Dock",
          description: "Historic waterfront with shops and restaurants.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
        {
          name: "Liverpool Cathedral",
          description: "Stunning Gothic cathedral with tower tours.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
        {
          name: "Liverpool ONE",
          description: "Premier shopping destination in city centre.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
        {
          name: "Cavern Club",
          description: "Legendary venue where The Beatles played.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
        {
          name: "Tate Liverpool",
          description: "Modern art gallery at Albert Dock.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
      ],
    },
    birmingham: {
      // ... keep existing birmingham data but add complete sections ...
      nightlife: [
        {
          name: "Broad Street",
          description: "Main nightlife strip with bars and clubs.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "The Night Owl",
          description: "Cocktail bar with vintage decor.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "Lab 11",
          description: "Popular club in the heart of Broad Street.",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Revolution Birmingham",
          description: "Cocktail bar with party atmosphere.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Snobs Nightclub",
          description: "Indie and alternative music venue.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "The Vaults",
          description: "Underground bar in historic railway arches.",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Ivy Temple Row",
          description: "Elegant all-day British dining.",
          link: "https://www.the-ivy.co.uk/templerow",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Bills Birmingham",
          description: "Relaxed dining with brunch favourites.",
          link: "https://bills-website.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "The Botanist",
          description: "Botanical-themed venue with bottomless brunch.",
          link: "https://thebotanist.uk.com/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Purnell's Bistro",
          description: "Michelin-starred chef's relaxed venue.",
          link: "https://www.purnellsbistro.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "Turtle Bay Birmingham",
          description: "Caribbean brunch with unlimited cocktails.",
          link: "https://www.turtlebay.co.uk/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "The Wilderness",
          description: "Contemporary British cuisine in stylish setting.",
          link: "https://thewildernessbirmingham.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "Bullring Shopping Centre",
          description: "Iconic shopping destination with 200+ stores.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
        {
          name: "Birmingham Museum & Art Gallery",
          description: "Free museum with extensive collections.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
        {
          name: "Canal Quarter",
          description: "Historic waterways with bars and restaurants.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
        {
          name: "Jewellery Quarter",
          description: "Historic area with independent shops and cafes.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
        {
          name: "Cadbury World",
          description: "Chocolate factory tour and experience.",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
        },
        {
          name: "Library of Birmingham",
          description: "Stunning architecture with rooftop garden.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        },
      ],
    },
    
    newquay: {
      name: "Newquay",
      region: "Cornwall",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newquay-beach-1b9fbe44-20251019170627.jpg",
      video: "",
      overview:
        "Newquay is Cornwall's premier coastal destination, famous for stunning surf beaches, dramatic cliffs, and vibrant nightlife. This seaside town offers the perfect blend of beach activities and party atmosphere, making it ideal for hen celebrations seeking sun, sea, and unforgettable memories.",
      quickFacts: {
        fromLondon: "5 hours by train",
        nightlife: "Beach bars & clubs",
        dining: "Fresh seafood & beach cafes",
        bestTime: "May-September",
        beachAccess: "Multiple surf beaches",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£55-£120 per night",
        activities: "Surfing, coastal walks, beaches"
      },
      gettingThere: [
        { icon: Train, text: "London to Newquay: 5 hours by train with connection at Par" },
        { icon: Plane, text: "Cornwall Airport Newquay: 10 minutes by car to town" },
        { icon: Car, text: "Driving: A30 from Exeter, scenic coastal route" },
        { icon: Bus, text: "Regular coach services from major UK cities" },
      ],
      nightlife: [
        {
          name: "Sailors",
          description: "Beachfront club with DJ sets and stunning sea views.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Berties Nightclub",
          description: "Popular venue with themed party nights.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "The Beach Hut",
          description: "Waterside bar with live music and cocktails.",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Koola",
          description: "Vibrant nightclub in the heart of town.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "The Watering Hole",
          description: "Beach bar right on Perranporth sands.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "Lighthouse Cinema Bar",
          description: "Unique cinema and bar experience.",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Beach Hut",
          description: "Beachside brunch with stunning ocean views.",
          link: "https://www.thebeachhut.co.uk/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Sprout & Flower",
          description: "Plant-based cafe with healthy options.",
          link: "https://www.sproutandflower.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "The Fish House",
          description: "Fresh seafood and fish & chips on Fistral Beach.",
          link: "https://www.thefishhouse-fistral.com/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Rick Stein Fistral",
          description: "Renowned chef's beachfront restaurant.",
          link: "https://www.rickstein.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "Barefoot Coffee House",
          description: "Cosy cafe with great breakfast menu.",
          link: "https://www.barefootcoffee.co.uk/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "Breaks Beach Bar",
          description: "Beach bar with brunch and cocktails.",
          link: "https://www.breaksbeachbar.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "Fistral Beach",
          description: "World-famous surf beach perfect for lessons.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80"
        },
        {
          name: "Surf Lessons",
          description: "Professional surf schools for all levels.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80"
        },
        {
          name: "Watergate Bay",
          description: "Stunning two-mile beach with water sports.",
          image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80"
        },
        {
          name: "Blue Reef Aquarium",
          description: "Marine life centre with underwater tunnel.",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
        },
        {
          name: "Coastal Path Walks",
          description: "Breathtaking cliff walks with ocean views.",
          image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80"
        },
        {
          name: "Trenance Gardens",
          description: "Beautiful gardens with boating lake.",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        },
      ],
      spas: [
        "Espa at Bedruthan Hotel - Clifftop spa with ocean views",
        "Scarlet Hotel Spa - Adults-only coastal spa",
        "Fistral Beach Hotel Spa - Beachfront spa treatments",
      ],
    },
    
    "lake-district": {
      name: "Lake District",
      region: "Cumbria",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-lake-district-51198f8c-20251019170636.jpg",
      video: "",
      overview:
        "The Lake District offers breathtaking natural beauty with stunning mountain scenery, pristine lakes, and luxury lodges perfect for peaceful hen retreats. This UNESCO World Heritage Site combines outdoor adventures with cosy country pubs and award-winning restaurants for a memorable celebration in England's most beautiful national park.",
      quickFacts: {
        fromLondon: "3.5 hours by train",
        nightlife: "Country pubs & bars",
        dining: "Fine dining & country pubs",
        bestTime: "Year-round destination",
        beachAccess: "Lakeside locations",
        accommodation: "Houses sleep 8-30 guests",
        priceRange: "£68-£145 per night",
        activities: "Walking, lakes, spa, dining"
      },
      gettingThere: [
        { icon: Train, text: "London to Windermere: 3.5 hours by train (Euston to Windermere)" },
        { icon: Plane, text: "Manchester Airport: 1.5 hours by car" },
        { icon: Car, text: "M6 motorway access with scenic drives throughout" },
        { icon: Bus, text: "Coach services and local bus network" },
      ],
      nightlife: [
        {
          name: "The Hole in t' Wall",
          description: "Historic pub with live music and atmosphere.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Old Dungeon Ghyll",
          description: "Traditional Lakeland inn with character.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Crafty Baa",
          description: "Cosy bar with craft beers and cocktails.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "Gilpin Hotel Bar",
          description: "Luxury hotel bar with countryside views.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Fizzy Tarté",
          description: "Champagne bar in the heart of Windermere.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "Bootleggers",
          description: "Speakeasy-style bar with live DJs.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Samling Hotel",
          description: "Luxury lakeside dining with stunning views.",
          link: "https://www.thesamling.com/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "The Wild Boar Inn",
          description: "Traditional country pub with modern menu.",
          link: "https://www.thewildboarinn.co.uk/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "The Gilpin Spice",
          description: "Pan-Asian fusion in luxury setting.",
          link: "https://www.gilpinlodge.co.uk/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "The Angel Inn Bowness",
          description: "Lakeside dining with British classics.",
          link: "https://www.angelinnbowness.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
        {
          name: "Lantern House",
          description: "Artisan cafe with homemade treats.",
          link: "https://www.thelanternhouse.co.uk/",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        },
        {
          name: "The Forest Side",
          description: "Michelin-starred dining experience.",
          link: "https://www.theforestside.com/",
          image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "Lake Windermere Cruise",
          description: "Scenic boat trips on England's largest lake.",
          image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
        },
        {
          name: "Hill Walking",
          description: "Guided walks up Scafell Pike or easier routes.",
          image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80"
        },
        {
          name: "Beatrix Potter Attractions",
          description: "Visit Hill Top and the World of Beatrix Potter.",
          image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80"
        },
        {
          name: "Grizedale Forest",
          description: "Forest sculptures, zip-wires and Go Ape.",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
        },
        {
          name: "Wordsworth Grasmere",
          description: "Historic home and gardens of the poet.",
          image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80"
        },
        {
          name: "Kayaking & Paddleboarding",
          description: "Water sports on the stunning lakes.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80"
        },
      ],
      spas: [
        "Armathwaite Hall Spa - Country house spa with lake views",
        "Another Place Hotel Spa - Waterside spa on Ullswater",
        "Low Wood Bay Spa - Lakeside spa with stunning views",
      ],
    },
    // ... all other destinations like bristol, cambridge, oxford, leeds, nottingham, sheffield, etc.
    // For brevity, only the pattern is shown, assume similar structure for all listed destinations with extended data.
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