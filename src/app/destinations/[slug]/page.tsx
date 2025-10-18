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
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Ministry of Sound",
          description: "Iconic club with legendary sound system.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Shoreditch House",
          description: "Rooftop bar with stunning city views.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Box Soho",
          description: "Cabaret and nightclub experience.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "Cirque le Soir",
          description: "Circus-themed immersive nightclub.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
        },
        {
          name: "XOYO",
          description: "Cutting-edge music venue in Shoreditch.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "Sketch",
          description: "Instagram-famous pink room with afternoon tea.",
          link: "https://sketch.london/",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
        },
        {
          name: "The Ivy",
          description: "British classics in glamorous setting.",
          link: "https://www.the-ivy.co.uk/",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80"
        },
        {
          name: "Dishoom",
          description: "Bombay-style cafe with legendary bacon naan.",
          link: "https://www.dishoom.com/",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
        },
        {
          name: "Balthazar",
          description: "French brasserie in Covent Garden.",
          link: "https://www.balthazarlondon.com/",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
          name: "Duck & Waffle",
          description: "24-hour dining with breathtaking views.",
          link: "https://duckandwaffle.com/",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        },
        {
          name: "Granger & Co",
          description: "Australian brunch classics.",
          link: "https://grangerandco.com/",
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "West End Shows",
          description: "World-class theatre and musicals.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        },
        {
          name: "Thames River Cruise",
          description: "See London's landmarks from the water.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
        },
        {
          name: "Borough Market",
          description: "Historic food market with artisan treats.",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        },
        {
          name: "Shoreditch Street Art",
          description: "Walking tour of famous graffiti.",
          image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80"
        },
        {
          name: "Sky Garden",
          description: "Free rooftop garden with panoramic views.",
          image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80"
        },
        {
          name: "Camden Market",
          description: "Alternative shopping and street food.",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
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
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Revolution",
          description: "Cocktail bar with party atmosphere.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Deansgate Locks",
          description: "Canal-side bars and clubs.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Printworks",
          description: "Entertainment complex with multiple venues.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "Cloud 23",
          description: "Rooftop bar with panoramic views.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
        },
        {
          name: "Albert's Schloss",
          description: "Bavarian-style beer hall with live music.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "Federal Bar & Kitchen",
          description: "Australian-style brunch in Northern Quarter.",
          link: "https://federalandco.com/",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
        },
        {
          name: "Evelyn's Cafe Bar",
          description: "Bottomless brunch with live music.",
          link: "https://www.evelynscafebar.com/",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80"
        },
        {
          name: "The Ivy Spinningfields",
          description: "All-day dining with cocktails.",
          link: "https://www.the-ivy.co.uk/spinningfields",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
        },
        {
          name: "Bill's Manchester",
          description: "Relaxed dining with brunch classics.",
          link: "https://bills-website.co.uk/",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
          name: "Dough Pizza Kitchen",
          description: "Bottomless pizza and prosecco.",
          link: "https://www.doughpizzakitchen.co.uk/",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        },
        {
          name: "Turtle Bay",
          description: "Caribbean bottomless brunch.",
          link: "https://www.turtlebay.co.uk/",
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "Northern Quarter",
          description: "Trendy area with independent shops and street art.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        },
        {
          name: "Manchester Art Gallery",
          description: "Free gallery with extensive collections.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
        },
        {
          name: "Old Trafford Stadium",
          description: "Tour the iconic football stadium.",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        },
        {
          name: "Manchester Cathedral",
          description: "Stunning medieval architecture.",
          image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80"
        },
        {
          name: "Afflecks Palace",
          description: "Alternative shopping emporium.",
          image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80"
        },
        {
          name: "Castlefield",
          description: "Historic canal area with bars and restaurants.",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
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
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Kuda",
          description: "Popular nightclub in city centre.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Pitcher & Piano",
          description: "Stylish bar with live music.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "The Phoenix",
          description: "Live music venue and bar.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "All Bar One",
          description: "Cocktails and sophisticated atmosphere.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
        },
        {
          name: "The Botanist",
          description: "Garden-themed bar with live entertainment.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "Bettys Tea Room",
          description: "Iconic Yorkshire tea room since 1919.",
          link: "https://www.bettys.co.uk/",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
        },
        {
          name: "The Ivy St Helens Square",
          description: "All-day British dining.",
          link: "https://www.the-ivy.co.uk/",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80"
        },
        {
          name: "The Star Inn The City",
          description: "Riverside dining with views.",
          link: "https://www.starinnthe city.co.uk/",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
        },
        {
          name: "Partisan",
          description: "Independent cafe with great breakfast.",
          link: "https://www.partisanyork.co.uk/",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
          name: "Spring Espresso",
          description: "Artisan coffee and brunch.",
          link: "https://www.springespresso.co.uk/",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        },
        {
          name: "The Botanist",
          description: "Bottomless brunch with live music.",
          link: "https://thebotanist.uk.com/",
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "York Minster",
          description: "Magnificent Gothic cathedral.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        },
        {
          name: "The Shambles",
          description: "Medieval shopping street.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
        },
        {
          name: "York City Walls",
          description: "Walk the historic medieval walls.",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        },
        {
          name: "Ghost Walk",
          description: "Evening ghost tours through the city.",
          image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80"
        },
        {
          name: "JORVIK Viking Centre",
          description: "Interactive Viking history experience.",
          image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80"
        },
        {
          name: "York's Chocolate Story",
          description: "Interactive chocolate making experience.",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
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
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Wow Bar",
          description: "Quirky cocktail bar with fun atmosphere.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "The Depot",
          description: "Cardiff Bay venue with live entertainment.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "Clwb Ifor Bach",
          description: "Alternative music venue.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "The Gatekeeper",
          description: "Rooftop bar with city views.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
        },
        {
          name: "Revolution Cardiff",
          description: "Cocktail bar with party vibes.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Cosy Club",
          description: "All-day dining in stylish setting.",
          link: "https://www.cosyclub.co.uk/",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
        },
        {
          name: "The Ivy Cardiff",
          description: "British classics with brunch menu.",
          link: "https://www.the-ivy.co.uk/cardiff",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80"
        },
        {
          name: "Bill's Cardiff",
          description: "Relaxed brunch and all-day dining.",
          link: "https://bills-website.co.uk/",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
        },
        {
          name: "The Potted Pig",
          description: "Unique dining in former bank vault.",
          link: "https://www.thepottedpig.com/",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
          name: "Porro",
          description: "Italian brunch with prosecco.",
          link: "https://www.porro.co.uk/",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        },
        {
          name: "Calabrisella",
          description: "Italian restaurant with brunch menu.",
          link: "https://www.calabrisella.co.uk/",
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
        },
      ],
      activities: [
        {
          name: "Cardiff Castle",
          description: "Historic castle in city centre.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        },
        {
          name: "Cardiff Bay",
          description: "Waterfront with restaurants and bars.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
        },
        {
          name: "Principality Stadium",
          description: "World-class rugby venue with tours.",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        },
        {
          name: "Cardiff Market",
          description: "Victorian indoor market.",
          image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80"
        },
        {
          name: "Wales Millennium Centre",
          description: "Arts venue with shows and performances.",
          image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80"
        },
        {
          name: "Bute Park",
          description: "Beautiful parkland along the river.",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
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
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/cinematic-drone-footage-slowly-flying-ov-6568fb80-20251018213103.mp4",
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
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-mult-5207be2f-20251018212610.jpg"
        },
        {
          name: "The Gate",
          description: "Entertainment complex with bars, clubs and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-ente-d4922a80-20251018212617.jpg"
        },
        {
          name: "House of Smith",
          description: "Stylish bar with cocktails and live music.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-styl-0c9c3b99-20251018212624.jpg"
        },
        {
          name: "Tup Tup Palace",
          description: "Moroccan-themed club with unique interiors.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-moro-c2e4bdfa-20251018212630.jpg"
        },
        {
          name: "The Botanist",
          description: "Bar and restaurant with live music and bottomless brunch.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-bota-f17060f6-20251018212638.jpg"
        },
        {
          name: "Livello",
          description: "Rooftop bar with stunning city views.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-roof-60d6d01b-20251018212646.jpg"
        },
      ],
      brunch: [
        {
          name: "The Botanist",
          description: "Bottomless brunch with live music and entertainment.",
          link: "https://thebotanist.uk.com/locations/newcastle/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-bottomless-bru-f86ca3ad-20251018181046.jpg"
        },
        {
          name: "Turtle Bay",
          description: "Caribbean bottomless brunch with cocktails.",
          link: "https://www.turtlebay.co.uk/restaurants/newcastle/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-caribbean-bru-cdfcf41d-20251018181056.jpg"
        },
        {
          name: "Pleased to Meet You",
          description: "Trendy spot with excellent brunch menu.",
          link: "https://www.pleasedtomeetyou.org.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-trendy-brunch-70c2b47e-20251018181104.jpg"
        },
        {
          name: "The Waiting Room",
          description: "Quirky cafe with delicious breakfast options.",
          link: "https://www.thewaitingroomnewcastle.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-quirky-cafe-i-b044af4b-20251018181113.jpg"
        },
        {
          name: "The French Quarter",
          description: "Brasserie-style dining on the quayside.",
          link: "https://www.thefrenchquarter.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-brasserie-din-bb0b93c1-20251018181121.jpg"
        },
        {
          name: "Blackfriars Restaurant",
          description: "Historic medieval building with modern British brunch.",
          link: "https://www.blackfriarsrestaurant.co.uk/",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-historic-blac-bffa7755-20251018212934.jpg"
        },
      ],
      activities: [
        {
          name: "Quayside",
          description: "Scenic riverside walk with bars and restaurants.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-qu-8b4f19e0-20251018212118.jpg"
        },
        {
          name: "BALTIC Centre for Contemporary Art",
          description: "Free art gallery with cafe.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-baltic-centr-6496f41a-20251018212125.jpg"
        },
        {
          name: "Ouseburn Valley",
          description: "Trendy area with independent bars and street food.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-ouseburn-val-228dbdcb-20251018212132.jpg"
        },
        {
          name: "Grainger Market",
          description: "Historic covered market with unique shops.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-grainger-mar-1de926ad-20251018212139.jpg"
        },
        {
          name: "Newcastle Castle",
          description: "Medieval fortress in the heart of the city.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-ca-c770b965-20251018212146.jpg"
        },
        {
          name: "Tyne Bridge",
          description: "Iconic landmark perfect for photos.",
          image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-tyne-bridge--8aafb273-20251018212152.jpg"
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
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
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
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80"
        },
        {
          name: "Aruba",
          description: "Beachfront bar and club with stunning sea views.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
        },
        {
          name: "Brass Monkey",
          description: "Quirky bar with cocktails and live entertainment.",
          image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
        },
        {
          name: "Smokin' Aces",
          description: "Late-night venue with DJ sets and dancing.",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        },
        {
          name: "The Reef",
          description: "Beachside bar with live music and cocktails.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
        },
        {
          name: "Opera House",
          description: "Historic venue with club nights and events.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        },
      ],
      brunch: [
        {
          name: "The Larder House",
          description: "Contemporary dining with bottomless brunch options.",
          link: "https://www.thelarderhouse.co.uk/",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
        },
        {
          name: "Urban Reef",
          description: "Seafront dining with stunning beach views.",
          link: "https://www.urban-reef.com/",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80"
        },
        {
          name: "Bournemouth Brewery Tap",
          description: "Craft beers and brunch in vibrant setting.",
          link: "https://www.brewhouseandkitchen.com/venue/bournemouth/",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
        },
        {
          name: "The Stable",
          description: "Cider and pizza restaurant with group menus.",
          link: "https://stablepizza.com/",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
        },
        {
          name: "The Reef Beach Club",
          description: "Beachside dining with Mediterranean menu.",
          link: "https://www.thereef-beachclub.com/",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
        },
        {
          name: "Bournemouth Beach Club",
          description: "Relaxed beach dining with fresh seafood.",
          link: "https://www.bmthbeachclub.com/",
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
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
          image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&q=80"
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
    brighton: [
      {
        id: "1",
        title: "The Brighton Manor",
        location: "Brighton, East Sussex",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 89,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
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