"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Navigation, Coffee, Moon, Sparkles, UtensilsCrossed, ChevronDown, Calendar, Home, Waves, PoundSterling, Users, PartyPopper, Train, Plane, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationClientProps {
  slug: string;
}

export default function DestinationClient({ slug }: DestinationClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  // Full destinations data - moved from server to client
  const destinationsData: Record<string, any> = {
    london: {
      name: "London",
      region: "Greater London",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london-uk-c-4c8e8b9a-20251018100334.jpg",
      video: "",
      overview: "London is the capital of luxury group accommodation, offering world-class entertainment, Michelin-starred dining, and iconic landmarks. Perfect for hen parties seeking sophistication, culture, and unforgettable nightlife in one of the world's most vibrant cities.",
      quickFacts: {
        fromLondon: "You're already here! Easy access to all properties via tube and train",
        bestTime: "Year-round destination with theatres, shopping, and dining always available",
        nightlife: "World-class! Shoreditch clubs, West End bars, Soho cocktail lounges, rooftop terraces",
        dining: "Michelin-starred restaurants, Borough Market, Brick Lane curries, afternoon tea at The Ritz",
        beachAccess: "No beach but stunning Thames riverside walks, parks, and rooftop bars",
        accommodation: "Luxury townhouses in Kensington, modern lofts in Shoreditch, period properties in Chelsea",
        priceRange: "£95-£140 per night for premium central London properties",
        activities: "West End shows, Thames boat trips, museums, shopping Oxford Street, afternoon tea"
      },
      gettingThere: [
        { icon: Train, text: "Excellent tube network connects all areas" },
        { icon: Car, text: "Easy access via M25 and major motorways" },
        { icon: Bus, text: "24-hour bus services throughout the city" },
        { icon: Plane, text: "Five major airports: Heathrow, Gatwick, Stansted, Luton, City" }
      ],
      nightlife: [
        { name: "Shoreditch Clubs", description: "Trendy East London nightlife district", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
        { name: "West End Bars", description: "Sophisticated cocktail bars and lounges", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
        { name: "Soho Nightlife", description: "Vibrant bars and entertainment venues", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" }
      ],
      brunch: [
        { name: "The Ivy", description: "Iconic British dining experience", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Dishoom", description: "Bombay-style brunch with bottomless chai", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", link: "#" },
        { name: "Sketch", description: "Instagram-worthy pink dining room", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "West End Shows", description: "World-famous theatre district", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80" },
        { name: "Thames River Cruise", description: "See London's landmarks from the water", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
        { name: "Afternoon Tea", description: "Classic British tradition at luxury hotels", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80" }
      ]
    },
    "lake-district": {
      name: "Lake District",
      region: "Cumbria",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-lake-district-51198f8c-20251019170636.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/stunning-cinematic-aerial-drone-shot-gli-b539c0a2-20251023164106.mp4",
      overview: "The Lake District is England's most stunning national park, offering breathtaking landscapes, luxury lodges, and peaceful mountain retreats perfect for group celebrations. With dramatic fells, pristine lakes, and charming villages, it's the ideal destination for groups seeking natural beauty combined with luxury accommodation.",
      quickFacts: {
        fromLondon: "4-5 hours by train to Windermere or 5-6 hours by car via M6",
        bestTime: "May to September for hiking and boat trips, winter for cosy retreats with log fires",
        nightlife: "Traditional Lakeland pubs with local ales, cosy inns with live folk music",
        dining: "Award-winning gastropubs, Michelin-starred restaurants, traditional afternoon tea with lake views",
        beachAccess: "No beaches but 16 stunning lakes including Windermere, Ullswater and Derwentwater for boat trips",
        accommodation: "Luxury lakeside lodges with hot tubs, mountain-view retreats, converted barns with spa facilities",
        priceRange: "£80-£120 per night with premium lodges featuring private hot tubs and saunas",
        activities: "Lake cruises, fell walking, spa treatments, kayaking, scenic drives, mountain biking"
      },
      gettingThere: [
        { icon: Train, text: "Regular train services to Windermere and Penrith from London Euston (4-5 hours)" },
        { icon: Car, text: "Scenic drive via M6 motorway (approx 5-6 hours from London)" },
        { icon: Bus, text: "National Express coaches run daily services to major Lake District towns" },
        { icon: Plane, text: "Nearest airports: Manchester (2 hours) or Newcastle (2.5 hours)" }
      ],
      nightlife: [
        { name: "The Drunken Duck", description: "Award-winning pub with craft beers and stunning views", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
        { name: "Zeffirellis", description: "Popular cinema and jazz bar in Ambleside", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80" },
        { name: "The Old Dungeon Ghyll", description: "Traditional climbers' pub with live music", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-traditional-c-9f271f04-20251022073931.jpg" }
      ],
      brunch: [
        { name: "The Jumble Room", description: "Quirky restaurant with creative brunch menu", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-quirky-eclect-9dc02dd6-20251022073924.jpg", link: "#" },
        { name: "Doi Intanon", description: "Thai restaurant with lakeside views", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-thai-restaura-a5539b7a-20251022073930.jpg", link: "#" },
        { name: "The Cottage in the Wood", description: "Fine dining with panoramic fell views", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", link: "#" }
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
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/vibrant-aerial-establishing-shot-of-brig-8a8e78c4-20251022152555.mp4",
      overview: "Brighton is the UK's premier hen party destination, combining stunning Regency architecture with legendary nightlife, a vibrant beach scene, and endless entertainment options. From cocktail bars to beachfront clubs, this seaside city offers the perfect blend of sophistication and fun for unforgettable group celebrations.",
      quickFacts: {
        fromLondon: "Just 1 hour by direct train from Victoria or London Bridge - perfect for quick escapes",
        bestTime: "Year-round destination! May-September for beach clubs and seafront, October-April for cheaper rates",
        nightlife: "Legendary! Coalition (5 floors), Patterns seafront club, The Arch cocktail bar, PRYZM superclub",
        dining: "Outstanding seafood at Riddle & Finns, The Ivy in the Lanes, bottomless brunch at Plateau",
        beachAccess: "Direct beach access! 5 miles of pebble beach, Brighton Pier, beach volleyball, water sports",
        accommodation: "Regency townhouses with hot tubs, seafront villas with games rooms, modern lofts near The Lanes",
        priceRange: "£75-£110 per night, split between groups makes it very affordable",
        activities: "Beach clubs, The Lanes shopping, Brighton Pier rides, paddleboarding, comedy clubs, cocktail classes"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Victoria or London Bridge (1 hour)" },
        { icon: Car, text: "Easy drive via M23 and A23 (approx 1.5 hours from London)" },
        { icon: Bus, text: "National Express and Megabus services from London Victoria" },
        { icon: Plane, text: "Gatwick Airport is 30 minutes away with direct train connections" }
      ],
      nightlife: [
        { name: "Coalition", description: "Multi-room club with varied music across 5 floors", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-large-multi-e060105c-20251021225447.jpg" },
        { name: "Patterns", description: "Seafront club with top DJs and stunning terrace", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-seafront-ni-845a7016-20251021225429.jpg" },
        { name: "The Arch", description: "Boutique venue with cocktails and live music", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-upscale-bo-dede2298-20251021225429.jpg" }
      ],
      brunch: [
        { name: "The Ivy in the Lanes", description: "Elegant all-day dining in historic setting", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-elegant-up-8951bf0f-20251021225427.jpg", link: "https://theivybrighton.com" },
        { name: "Plateau", description: "Rooftop restaurant with bottomless brunch", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-chic-roofto-e8a24100-20251021225428.jpg", link: "#" },
        { name: "Riddle & Finns", description: "Premium seafood and champagne bar", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-premium-sea-2a93d3c3-20251021225430.jpg", link: "#" }
      ],
      activities: [
        { name: "Beach Clubs", description: "Spend the day at Brighton's famous beach clubs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-brighton-beac-c00ed960-20251021225429.jpg" },
        { name: "Shopping in The Lanes", description: "Explore quirky boutiques and vintage shops", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-the-lanes-sho-5a58ff3e-20251021225428.jpg" },
        { name: "Brighton Pier", description: "Classic seaside fun with rides and arcades", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-brighton-pala-91beb56d-20251021225428.jpg" }
      ]
    },
    bath: {
      name: "Bath",
      region: "Somerset",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/stunning-cinematic-aerial-drone-shot-gli-8ac50973-20251023155918.mp4",
      overview: "Bath is a stunning UNESCO World Heritage city combining Roman history, Georgian elegance, and world-class spa experiences. Perfect for sophisticated hen parties seeking culture, relaxation, and refined entertainment in one of England's most beautiful cities.",
      quickFacts: {
        fromLondon: "Just 1.5 hours by direct train from Paddington - ideal for elegant weekend escapes",
        bestTime: "Year-round elegance! Spring (Apr-May) for festivals, December for Christmas markets and lights",
        nightlife: "Sophisticated scene - Sub 13 underground cocktails, The Dark Horse speakeasy, champagne at The Bath Priory",
        dining: "Fine dining capital! The Pump Room in Roman Baths, Sally Lunn's historic buns, Society Café bottomless brunch",
        beachAccess: "No beach but beautiful River Avon walks, punting, and the stunning Royal Crescent gardens",
        accommodation: "Georgian townhouses with period features, luxury spas with hot tubs, Bath stone manors with games rooms",
        priceRange: "£85-£120 per night for authentic Georgian properties with modern luxury",
        activities: "Thermae Bath Spa rooftop pools, Roman Baths tours, Jane Austen Centre, afternoon tea, boutique shopping"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Paddington (1.5 hours)" },
        { icon: Car, text: "M4 motorway via Bristol (approx 2.5 hours from London)" },
        { icon: Bus, text: "National Express coaches from London Victoria" },
        { icon: Plane, text: "Bristol Airport is 30 minutes away" }
      ],
      nightlife: [
        { name: "Sub 13", description: "Underground cocktail bar in vaulted cellars", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
        { name: "The Bell Inn", description: "Historic pub with live music nights", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80" },
        { name: "The Dark Horse", description: "Cocktail bar with speakeasy vibes", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" }
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
      video: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_videos/dynamic-aerial-drone-shot-sweeping-over--5f6ee601-20251022191055.mp4",
      overview: "Manchester is the vibrant Northern powerhouse with world-class shopping, incredible nightlife, and warm Northern hospitality. Perfect for hen parties seeking a cosmopolitan city break with legendary music venues, trendy bars, and industrial-chic accommodation.",
      quickFacts: {
        fromLondon: "Just 2 hours by direct train from Euston - easy Northern city escape",
        bestTime: "Year-round party city! Summer for rooftop bars, winter for Christmas markets",
        nightlife: "Legendary music scene! Warehouse Project, The Deaf Institute, Northern Quarter bars",
        dining: "Diverse and trendy - Northern Quarter street food, Spinningfields fine dining, curry mile",
        beachAccess: "No beach but vibrant canal-side bars and MediaCityUK waterfront",
        accommodation: "Industrial loft conversions with hot tubs, modern apartments, Victorian warehouses",
        priceRange: "£70-£95 per night - great value for a major city",
        activities: "Shopping Trafford Centre, Northern Quarter vintage, football tours, music venues"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Euston (2 hours)" },
        { icon: Plane, text: "Manchester Airport with global connections" },
        { icon: Car, text: "M6 and M62 motorways (approx 3.5 hours from London)" },
        { icon: Bus, text: "Frequent coach services from major cities" }
      ],
      nightlife: [
        { name: "Warehouse Project", description: "Legendary electronic music venue", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
        { name: "Northern Quarter", description: "Trendy bars and independent venues", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
        { name: "Deansgate Locks", description: "Canalside bars and clubs", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80" }
      ],
      brunch: [
        { name: "Federal Bar", description: "Australian-inspired brunch in Northern Quarter", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80", link: "#" },
        { name: "Grindsmith", description: "Specialty coffee and creative brunch", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", link: "#" },
        { name: "The Ivy Spinningfields", description: "Elegant all-day dining", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", link: "#" }
      ],
      activities: [
        { name: "Trafford Centre Shopping", description: "Massive shopping and entertainment complex", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { name: "Football Stadium Tours", description: "Visit Old Trafford or Etihad Stadium", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80" },
        { name: "Northern Quarter", description: "Vintage shopping and street art", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" }
      ]
    },
    bournemouth: {
      name: "Bournemouth",
      region: "Dorset",
      image: "https://images.unsplash.com/photo-1581974206179-4cf0049a2d90?w=1200&q=80",
      video: "",
      overview: "Bournemouth offers seven miles of golden sandy beaches, vibrant nightlife, and beautiful gardens. Perfect for hen parties wanting a classic British seaside experience with beach clubs, water sports, and stunning cliff-top walks.",
      quickFacts: {
        fromLondon: "2 hours by direct train from Waterloo - easy seaside escape",
        bestTime: "May to September for beach activities, year-round for nightlife",
        nightlife: "Buzzing seafront scene! The Old Fire Station, Cameo nightclub, beach bars",
        dining: "Fresh seafood on the pier, West Cliff restaurants, Boscombe food scene",
        beachAccess: "7 miles of award-winning sandy beaches - perfect for beach activities",
        accommodation: "Victorian villas near beach, modern seafront apartments, clifftop houses with sea views",
        priceRange: "£75-£105 per night - affordable seaside luxury",
        activities: "Beach sports, paddleboarding, cliff walks, pier entertainment, shopping"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Waterloo (2 hours)" },
        { icon: Car, text: "M3 and A338 (approx 2.5 hours from London)" },
        { icon: Bus, text: "National Express coaches from London" },
        { icon: Plane, text: "Bournemouth Airport with connections across Europe" }
      ],
      nightlife: [],
      brunch: [],
      activities: []
    },
    york: {
      name: "York",
      region: "North Yorkshire",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&q=80",
      video: "",
      overview: "York is a historic walled city combining medieval charm, world-class museums, and vibrant nightlife. Perfect for hen parties seeking culture, history, and sophisticated entertainment in one of England's most picturesque cities.",
      quickFacts: {
        fromLondon: "2 hours by direct train from King's Cross",
        bestTime: "Year-round charm! Spring for gardens, December for Christmas markets",
        nightlife: "Medieval pubs, Shambles bars, Micklegate nightlife district",
        dining: "Betty's Tea Rooms, riverside restaurants, historic pub dining",
        beachAccess: "No beach but beautiful river walks and city walls",
        accommodation: "Georgian townhouses, medieval properties, modern apartments in city walls",
        priceRange: "£75-£100 per night - great value historic city",
        activities: "York Minster, Shambles shopping, ghost walks, afternoon tea, city walls walk"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London King's Cross (2 hours)" },
        { icon: Car, text: "A1(M) motorway (approx 4 hours from London)" },
        { icon: Bus, text: "National Express coaches from London" },
        { icon: Plane, text: "Leeds Bradford Airport is 45 minutes away" }
      ],
      nightlife: [],
      brunch: [],
      activities: []
    },
    cardiff: {
      name: "Cardiff",
      region: "South Wales",
      image: "https://images.unsplash.com/photo-1590698933947-a202b069a861?w=1200&q=80",
      video: "",
      overview: "Cardiff is Wales's vibrant capital with a stunning castle, Cardiff Bay waterfront, and legendary Welsh hospitality. Perfect for hen parties seeking a compact city with great nightlife, rugby culture, and easy access to Welsh countryside.",
      quickFacts: {
        fromLondon: "2 hours by direct train from Paddington",
        bestTime: "Year-round destination! Spring for Principality Stadium events, summer for Cardiff Bay",
        nightlife: "St Mary Street clubs, Cardiff Bay bars, Roath nightlife",
        dining: "Welsh lamb, Cardiff Bay restaurants, St Mary Street curry houses",
        beachAccess: "Cardiff Bay waterfront, Penarth beach 20 minutes away",
        accommodation: "Victorian terraces, Bay apartments, city centre townhouses",
        priceRange: "£70-£95 per night - excellent value capital city",
        activities: "Cardiff Castle, Principality Stadium tours, Cardiff Bay, shopping arcades"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London Paddington (2 hours)" },
        { icon: Car, text: "M4 motorway (approx 2.5 hours from London)" },
        { icon: Bus, text: "Megabus and National Express from London" },
        { icon: Plane, text: "Cardiff Airport with UK and European flights" }
      ],
      nightlife: [],
      brunch: [],
      activities: []
    },
    newcastle: {
      name: "Newcastle",
      region: "Tyne and Wear",
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1200&q=80",
      video: "",
      overview: "Newcastle offers legendary nightlife, warm Geordie hospitality, and stunning bridges over the Tyne. Perfect for hen parties seeking big nights out, fantastic value, and one of the UK's most friendly cities.",
      quickFacts: {
        fromLondon: "3 hours by direct train from King's Cross",
        bestTime: "Year-round party city! Summer for Quayside, any time for nightlife",
        nightlife: "Legendary! Diamond Strip, Bigg Market, Quayside bars, digital nightclub",
        dining: "Geordie classics, Quayside restaurants, Grey Street fine dining",
        beachAccess: "Tynemouth beach 20 minutes away - surfing and seaside charm",
        accommodation: "Quayside apartments, city centre townhouses, Victorian terraces",
        priceRange: "£65-£90 per night - best value major UK city",
        activities: "Quayside walks, Tyne Bridge, shopping Eldon Square, Baltic art gallery"
      },
      gettingThere: [
        { icon: Train, text: "Direct trains from London King's Cross (3 hours)" },
        { icon: Car, text: "A1(M) motorway (approx 5 hours from London)" },
        { icon: Bus, text: "National Express coaches from London" },
        { icon: Plane, text: "Newcastle Airport with excellent UK and European connections" }
      ],
      nightlife: [],
      brunch: [],
      activities: []
    },
  };

  const destination = destinationsData[slug] || {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: "UK",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    video: "",
    overview: `Discover luxury group accommodation in ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}. Perfect for hen parties, celebrations, and group getaways with stunning houses featuring hot tubs, pools, and exceptional amenities.`,
    quickFacts: {
      fromLondon: "Easily accessible from London",
      bestTime: "Year-round destination",
      nightlife: "Vibrant bars, clubs, and entertainment",
      dining: "Excellent restaurants and dining options",
      beachAccess: "Check specific location for beach access",
      accommodation: "Luxury group houses with hot tubs and modern amenities",
      priceRange: "£70-£120 per night for group accommodation",
      activities: "Shopping, dining, entertainment, and local attractions"
    },
    gettingThere: [
      { icon: Train, text: "Accessible by train from major UK cities" },
      { icon: Car, text: "Easy access via motorways" },
      { icon: Bus, text: "Regular coach services available" },
      { icon: Plane, text: "Nearest airports provide good connections" }
    ],
    nightlife: [],
    brunch: [],
    activities: []
  };

  // Location-specific properties data from original
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
    bath: [
      {
        id: "1",
        title: "Georgian Spa House",
        location: "Bath, Somerset",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 110,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
        features: ["Hot Tub", "Period Features", "Garden"],
        slug: "georgian-spa-house",
      },
      {
        id: "2",
        title: "Royal Crescent Villa",
        location: "Bath, Somerset",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 95,
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        features: ["City Views", "Hot Tub", "Games Room"],
        slug: "royal-crescent-villa",
      },
      {
        id: "3",
        title: "Riverside Bath House",
        location: "Bath, Somerset",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 85,
        image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
        features: ["River Views", "Hot Tub", "Parking"],
        slug: "riverside-bath-house",
      },
    ],
    manchester: [
      {
        id: "1",
        title: "Northern Quarter Loft",
        location: "Manchester, Greater Manchester",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 85,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
        features: ["Hot Tub", "Industrial Chic", "Roof Terrace"],
        slug: "northern-quarter-loft",
      },
      {
        id: "2",
        title: "Spinningfields Penthouse",
        location: "Manchester, Greater Manchester",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 95,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        features: ["City Views", "Games Room", "Hot Tub"],
        slug: "spinningfields-penthouse",
      },
      {
        id: "3",
        title: "Deansgate Warehouse",
        location: "Manchester, Greater Manchester",
        sleeps: 20,
        bedrooms: 10,
        priceFrom: 75,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        features: ["Hot Tub", "Cinema Room", "Bar Area"],
        slug: "deansgate-warehouse",
      },
    ],
    "lake-district": [
      {
        id: "1",
        title: "Windermere Lakeside Lodge",
        location: "Lake District, Cumbria",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 110,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-lake-district-51198f8c-20251019170636.jpg",
        features: ["Hot Tub", "Lake Views", "Sauna"],
        slug: "windermere-lakeside-lodge",
      },
      {
        id: "2",
        title: "Ambleside Mountain Retreat",
        location: "Lake District, Cumbria",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 95,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        features: ["Hot Tub", "Mountain Views", "Games Room"],
        slug: "ambleside-mountain-retreat",
      },
      {
        id: "3",
        title: "Keswick Country House",
        location: "Lake District, Cumbria",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 85,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        features: ["Hot Tub", "Garden", "Log Fire"],
        slug: "keswick-country-house",
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
        image: "https://images.unsplash.com/photo-1581974206179-4cf0049a2d90?w=800&q=80",
        features: ["Hot Tub", "Sea Views", "Beach Access"],
        slug: "bournemouth-beach-house",
      },
      {
        id: "2",
        title: "Clifftop Villa",
        location: "Bournemouth, Dorset",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 85,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
        features: ["Hot Tub", "Pool", "Garden"],
        slug: "clifftop-villa",
      },
      {
        id: "3",
        title: "Sandbanks Retreat",
        location: "Bournemouth, Dorset",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 79,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        features: ["Beach Access", "Hot Tub", "BBQ"],
        slug: "sandbanks-retreat",
      },
    ],
    york: [
      {
        id: "1",
        title: "York Minster House",
        location: "York, North Yorkshire",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 89,
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
        features: ["Hot Tub", "Historic Features", "Garden"],
        slug: "york-minster-house",
      },
      {
        id: "2",
        title: "Shambles Georgian Townhouse",
        location: "York, North Yorkshire",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 82,
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
        features: ["City Centre", "Hot Tub", "Period Features"],
        slug: "shambles-georgian-townhouse",
      },
      {
        id: "3",
        title: "Riverside York Retreat",
        location: "York, North Yorkshire",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 75,
        image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
        features: ["River Views", "Hot Tub", "Games Room"],
        slug: "riverside-york-retreat",
      },
    ],
    cardiff: [
      {
        id: "1",
        title: "Cardiff Bay Penthouse",
        location: "Cardiff, South Wales",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 85,
        image: "https://images.unsplash.com/photo-1590698933947-a202b069a861?w=800&q=80",
        features: ["Hot Tub", "Bay Views", "Roof Terrace"],
        slug: "cardiff-bay-penthouse",
      },
      {
        id: "2",
        title: "Castle Quarter House",
        location: "Cardiff, South Wales",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 79,
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/cardiff-city-center-photograph%2c-iconic-caf939c9-20251017161252.jpg",
        features: ["City Centre", "Hot Tub", "Games Room"],
        slug: "castle-quarter-house",
      },
      {
        id: "3",
        title: "Victorian Cardiff Terrace",
        location: "Cardiff, South Wales",
        sleeps: 12,
        bedrooms: 6,
        priceFrom: 69,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        features: ["Hot Tub", "Garden", "Parking"],
        slug: "victorian-cardiff-terrace",
      },
    ],
    newcastle: [
      {
        id: "1",
        title: "Quayside Warehouse Loft",
        location: "Newcastle, Tyne and Wear",
        sleeps: 18,
        bedrooms: 9,
        priceFrom: 79,
        image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80",
        features: ["Hot Tub", "River Views", "Industrial Style"],
        slug: "quayside-warehouse-loft",
      },
      {
        id: "2",
        title: "Grey Street Townhouse",
        location: "Newcastle, Tyne and Wear",
        sleeps: 14,
        bedrooms: 7,
        priceFrom: 72,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        features: ["City Centre", "Hot Tub", "Period Features"],
        slug: "grey-street-townhouse",
      },
      {
        id: "3",
        title: "Jesmond Party House",
        location: "Newcastle, Tyne and Wear",
        sleeps: 16,
        bedrooms: 8,
        priceFrom: 65,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        features: ["Hot Tub", "Games Room", "Garden"],
        slug: "jesmond-party-house",
      },
    ],
  };

  const properties = propertiesByLocation[slug] || propertiesByLocation.brighton || [];

  const faqs = [
    {
      question: `How far is ${destination.name} from London?`,
      answer: `${destination.quickFacts.fromLondon}. ${destination.name} is easily accessible by direct train services, making it perfect for a weekend getaway without the hassle of long travel times.`
    },
    {
      question: `What's included in the price of a hen party house in ${destination.name}?`,
      answer: `Our ${destination.name} properties include all essential amenities such as WiFi, bed linens, towels, fully equipped kitchens, and access to features like hot tubs and games rooms where available. Prices are typically per night, and we'll provide a full breakdown of what's included when you enquire.`
    },
    {
      question: `How many people can stay in your ${destination.name} hen party houses?`,
      answer: `Our ${destination.name} properties accommodate groups from 10 to 20+ people. Each house listing shows the exact number of bedrooms and maximum occupancy.`
    },
    {
      question: `Are hen parties and celebrations allowed in ${destination.name} properties?`,
      answer: `Yes! Our ${destination.name} properties are specifically selected for group celebrations including hen parties. However, we do have house rules to respect neighbours and local communities.`
    },
    {
      question: `What are the best areas to stay in ${destination.name} for a hen party?`,
      answer: `For ${destination.name}, we recommend staying close to the main nightlife and entertainment areas for easy access. We'll help you choose the perfect location based on your plans.`
    },
    {
      question: `Can we bring decorations and have a party at the house?`,
      answer: `Absolutely! You're welcome to bring decorations to celebrate. We recommend non-damaging items like banners, balloons, and table decorations.`
    },
    {
      question: `What time is check-in and check-out?`,
      answer: `Standard check-in is typically 4pm and check-out is 10am. Where possible, we can arrange early check-in or late check-out for an additional fee.`
    },
    {
      question: `Is parking available at ${destination.name} properties?`,
      answer: `Most of our ${destination.name} properties include parking arrangements. We'll confirm exact details when you book.`
    },
    {
      question: `How does payment work and can we split the cost?`,
      answer: `We require a deposit to secure your booking, with the balance due closer to your stay date. For hen parties, it's common for one person to pay the deposit and then split the remaining cost among the group.`
    },
    {
      question: `What's your cancellation policy?`,
      answer: `Our standard cancellation policy allows full refund if cancelled 8+ weeks before arrival, 50% refund for 4-8 weeks notice, and deposits are non-refundable within 4 weeks of arrival.`
    },
    {
      question: `Are the houses suitable for mixed groups or just hen parties?`,
      answer: `While our properties are perfect for hen parties, they're also ideal for any group celebration including birthdays, reunions, stag dos, and special occasions.`
    },
    {
      question: `Can you help arrange activities and experiences in ${destination.name}?`,
      answer: `Yes! We partner with local experience providers to offer activities like cocktail making classes, spa treatments, private chefs, and more.`
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
        "item": `https://groupescapehouses.co.uk/destinations/${slug}`
      }
    ]
  };

  useEffect(() => {
    if (videoRef.current && destination.video) {
      const playVideo = async () => {
        try {
          videoRef.current!.muted = true;
          await videoRef.current!.play();
          setVideoLoaded(true);
        } catch (error) {
          console.error('Video play failed:', error);
          if (videoRef.current) {
            videoRef.current.style.display = 'none';
          }
          const fallbackImg = document.getElementById('hero-fallback-img');
          if (fallbackImg) {
            (fallbackImg as HTMLElement).style.display = 'block';
          }
        }
      };

      playVideo();
      videoRef.current.addEventListener('loadeddata', playVideo);
      videoRef.current.addEventListener('canplay', playVideo);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', playVideo);
          videoRef.current.removeEventListener('canplay', playVideo);
        }
      };
    }
  }, [destination.video]);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <div className="relative h-[500px] mt-20 overflow-hidden">
        {destination.video ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                display: 'block',
                zIndex: 0
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallbackImg = document.getElementById('hero-fallback-img');
                if (fallbackImg) {
                  (fallbackImg as HTMLElement).style.display = 'block';
                }
              }}
            >
              <source src={destination.video} type="video/mp4" />
            </video>
            <div 
              id="hero-fallback-img"
              className="absolute inset-0"
              style={{ display: 'none', zIndex: 0 }}
            >
              <Image 
                src={destination.image} 
                alt={destination.name} 
                fill 
                className="object-cover" 
                priority 
                onError={() => handleImageError('hero-fallback')}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" style={{ zIndex: 1 }}></div>
          </>
        ) : (
          <>
            <Image 
              src={destination.image} 
              alt={destination.name} 
              fill 
              className="object-cover" 
              style={{ zIndex: 0 }}
              priority 
              onError={() => handleImageError('hero')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" style={{ zIndex: 1 }}></div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 2 }}>
          <div className="max-w-[1200px] mx-auto px-6 pb-12">
            <h1 className="text-white mb-2 drop-shadow-lg" style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-white text-xl mb-6 drop-shadow-md" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              <MapPin className="w-5 h-5 drop-shadow-md" />
              <span>{destination.region}</span>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 py-4 font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg"
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
                  and private chef dinners, there's something to suit every group's taste and budget.
                </p>
                
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  Looking for other celebration options? Explore our <Link href="/house-styles/party-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">party houses</Link> for 
                  lively group gatherings, <Link href="/house-styles/luxury-houses" className="text-[var(--color-accent-sage)] hover:underline font-medium">luxury houses</Link> for upscale celebrations, 
                  or browse our collection of <Link href="/destinations" className="text-[var(--color-accent-sage)] hover:underline font-medium">UK destinations</Link>.
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
      {destination.nightlife && destination.nightlife.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <Moon className="w-5 h-5 text-[var(--color-accent-sage)]" />
              <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Top Nightlife Spots
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.nightlife.map((venue: any, index: number) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                  {venue.image && !imageErrors[`nightlife-${index}`] ? (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-secondary)]">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(`nightlife-${index}`)}
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-secondary)] flex items-center justify-center">
                      <Moon className="w-16 h-16 text-[var(--color-accent-sage)] opacity-30" />
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
      )}

      {/* Brunch & Dining */}
      {destination.brunch && destination.brunch.length > 0 && (
        <section className="py-16 bg-[var(--color-bg-secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent-gold)]" />
              <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Best Brunch & Dining
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.brunch.map((venue: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  {!imageErrors[`brunch-${index}`] ? (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-primary)]">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(`brunch-${index}`)}
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-primary)] flex items-center justify-center">
                      <UtensilsCrossed className="w-16 h-16 text-[var(--color-accent-gold)] opacity-30" />
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
      )}

      {/* Activities */}
      {destination.activities && destination.activities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-[var(--color-accent-pink)]" />
              <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Things to Do
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.activities.map((activity: any, index: number) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                  {activity.image && !imageErrors[`activity-${index}`] ? (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-secondary)]">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(`activity-${index}`)}
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden bg-[var(--color-bg-secondary)] flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-[var(--color-accent-pink)] opacity-30" />
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
      )}

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
    </>
  );
}