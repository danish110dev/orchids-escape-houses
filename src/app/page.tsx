"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Home as HomeIcon, Sparkles, CreditCard, PartyPopper, Shield, Users, Award, Clock, Calendar, MapPin, User, Minus, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ExperienceCard from "@/components/ExperienceCard";
import ReviewSlider from "@/components/ReviewSlider";
import FAQSection from "@/components/FAQSection";
import LoadingScreen from "@/components/LoadingScreen";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

// Move static data outside component to prevent re-creation on each render
const featuredProperties = [
  {
    id: "1",
    title: "The Brighton Manor",
    location: "Brighton, East Sussex",
    sleeps: 16,
    bedrooms: 8,
    priceFrom: 89,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-b6c21bf3-20251018131712.jpg",
    features: ["Hot Tub", "Pool"],
    slug: "brighton-manor",
  },
  {
    id: "2",
    title: "Bath Spa Retreat",
    location: "Bath, Somerset",
    sleeps: 20,
    bedrooms: 10,
    priceFrom: 95,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-71429268-20251018131719.jpg",
    features: ["Games Room", "Cinema"],
    slug: "bath-spa-retreat",
  },
  {
    id: "3",
    title: "Manchester Party House",
    location: "Manchester, Greater Manchester",
    sleeps: 14,
    bedrooms: 7,
    priceFrom: 79,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-303caf30-20251018131730.jpg",
    features: ["Hot Tub", "BBQ"],
    slug: "manchester-party-house",
  },
];

const experiences = [
  {
    title: "Private Chef Experience",
    duration: "3-4 hours",
    priceFrom: 55,
    groupSize: "Any size",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
    slug: "private-chef",
  },
  {
    title: "Cocktail Masterclass",
    duration: "2-3 hours",
    priceFrom: 50,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
    slug: "cocktail-masterclass",
  },
  {
    title: "Sip & Paint",
    duration: "2-3 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
    slug: "sip-and-paint",
  },
  {
    title: "Pamper Party",
    duration: "2-3 hours",
    priceFrom: 65,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-pamper-party-b3bca2c7-20251018123229.jpg?",
    slug: "pamper-party",
  },
  {
    title: "Yoga & Wellness Class",
    duration: "1.5-2 hours",
    priceFrom: 40,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-yoga-class-i-48b5a9ef-20251018105055.jpg",
    slug: "yoga-class",
  },
  {
    title: "Murder Mystery Night",
    duration: "3-4 hours",
    priceFrom: 50,
    groupSize: "10-30 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-murder-myste-09ddcc62-20251018105103.jpg",
    slug: "murder-mystery",
  },
];

const reviews = [
  {
    name: "Sophie M",
    rating: 5,
    comment: "Absolutely incredible weekend! The house was stunning, hot tub was perfect, and the cocktail class was so much fun. Can't recommend enough for hen parties!",
    date: "January 2025",
    property: "Brighton Manor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Emma L",
    rating: 5,
    comment: "Best hen do ever! The team were so helpful from start to finish. The house had everything we needed and more. The private chef was a lovely touch!",
    date: "December 2024",
    property: "Bath Spa Retreat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Rachel K",
    rating: 5,
    comment: "Planning was so easy and the house exceeded expectations. Games room kept us entertained for hours. Would definitely book again!",
    date: "November 2024",
    property: "Manchester Party House",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
  {
    name: "Lucy T",
    rating: 5,
    comment: "The perfect hen weekend venue. Beautiful house, great location, and the add-on experiences made it extra special. Highly recommend!",
    date: "October 2024",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    name: "Hannah P",
    rating: 5,
    comment: "Fantastic service from booking to checkout. The house was immaculate and had all the facilities we needed. Will be back!",
    date: "September 2024",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    name: "Olivia S",
    rating: 5,
    comment: "Could not fault anything. The house was gorgeous, pool was amazing, and the whole experience was seamless. Thank you!",
    date: "August 2024",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  },
];

const destinations = [
  { name: "London", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-london-citysc-8f325788-20251019170619.jpg?" },
  { name: "Brighton", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/wide-angle-photograph-of-brighton-seafro-11bd7734-20251017161212.jpg" },
  { name: "Bath", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/historic-bath-city-center-photograph%2c--eef16b18-20251017161220.jpg" },
  { name: "Manchester", image: "https://v3b.fal.media/files/b/tiger/TnJnPy7geHZHAjOwxZKxO_output.png" },
  { name: "Newquay", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newquay-beach-1b9fbe44-20251019170627.jpg?" },
  { name: "Liverpool", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [honeypot, setHoneypot] = useState("");

  // Search form state
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Optimized Intersection Observer
  useEffect(() => {
    setMounted(true);
    setFormLoadTime(Date.now()); // Track when form loaded

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px 0px -50px 0px" // Start animation slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements with slight delay
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          honeypot, // Bot trap
          timestamp: formLoadTime.toString() // Time-based check
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubmitStatus("success");
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkInDate) params.set('checkIn', checkInDate);
    if (checkOutDate) params.set('checkOut', checkOutDate);
    params.set('guests', String(adults + children));
    if (pets > 0) params.set('pets', String(pets));
    
    window.location.href = `/properties?${params.toString()}`;
  };

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    if (range.from) {
      setCheckInDate(format(range.from, 'yyyy-MM-dd'));
    }
    if (range.to) {
      setCheckOutDate(format(range.to, 'yyyy-MM-dd'));
    }
    
    // Auto-close when both dates are selected
    if (range.from && range.to) {
      setDatePickerOpen(false);
    }
  };

  const handleDateReset = () => {
    setDateRange({ from: undefined, to: undefined });
    setCheckInDate("");
    setCheckOutDate("");
  };

  const totalGuests = adults + children + infants;
  const guestsSummary = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''} - ${pets} pet${pets !== 1 ? 's' : ''}`;

  return (
    <div className="min-h-screen">
      <StructuredData type="home" />
      <LoadingScreen />
      <Header />

      {/* Hero Section - Optimized */}
      <section className="relative h-[700px] md:h-[800px] flex items-center overflow-hidden">
        {/* Desktop Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            willChange: "transform"
          }}
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/docs-assets/Desktop%20Size%20Final%20Last.mp4" type="video/mp4" />
        </video>
        
        {/* Mobile Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            willChange: "transform"
          }}
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/docs-assets/Mobile%20Version_Final%20Last%201.mp4" type="video/mp4" />
        </video>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 gap-8">
          {/* Hero Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold drop-shadow-lg"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            Your Perfect Group Escape Starts Here
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
              {/* Date Picker */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in / Check-out
                </label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 justify-start text-left font-normal"
                    >
                      <Calendar className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                      {checkInDate && checkOutDate ? (
                        <span className="text-gray-900 truncate">
                          {format(new Date(checkInDate), 'MMM dd')} - {format(new Date(checkOutDate), 'MMM dd')}
                        </span>
                      ) : (
                        <span className="text-gray-500">Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 border-b flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Select dates</p>
                      {(checkInDate || checkOutDate) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDateReset}
                          className="h-8 px-2 text-xs hover:bg-gray-100"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reset
                        </Button>
                      )}
                    </div>
                    <CalendarComponent
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => handleDateSelect(range || { from: undefined, to: undefined })}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Destination Selector */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="h-14">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <SelectValue placeholder="Choose location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="brighton">Brighton</SelectItem>
                    <SelectItem value="bath">Bath</SelectItem>
                    <SelectItem value="bournemouth">Bournemouth</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="manchester">Manchester</SelectItem>
                    <SelectItem value="liverpool">Liverpool</SelectItem>
                    <SelectItem value="york">York</SelectItem>
                    <SelectItem value="newcastle">Newcastle</SelectItem>
                    <SelectItem value="cardiff">Cardiff</SelectItem>
                    <SelectItem value="edinburgh">Edinburgh</SelectItem>
                    <SelectItem value="highlands">Scottish Highlands</SelectItem>
                    <SelectItem value="snowdonia">Snowdonia</SelectItem>
                    <SelectItem value="newquay">Newquay</SelectItem>
                    <SelectItem value="devon">Devon</SelectItem>
                    <SelectItem value="cotswolds">Cotswolds</SelectItem>
                    <SelectItem value="lake-district">Lake District</SelectItem>
                    <SelectItem value="birmingham">Birmingham</SelectItem>
                    <SelectItem value="blackpool">Blackpool</SelectItem>
                    <SelectItem value="bristol">Bristol</SelectItem>
                    <SelectItem value="cambridge">Cambridge</SelectItem>
                    <SelectItem value="canterbury">Canterbury</SelectItem>
                    <SelectItem value="cheltenham">Cheltenham</SelectItem>
                    <SelectItem value="chester">Chester</SelectItem>
                    <SelectItem value="durham">Durham</SelectItem>
                    <SelectItem value="exeter">Exeter</SelectItem>
                    <SelectItem value="harrogate">Harrogate</SelectItem>
                    <SelectItem value="leeds">Leeds</SelectItem>
                    <SelectItem value="margate">Margate</SelectItem>
                    <SelectItem value="nottingham">Nottingham</SelectItem>
                    <SelectItem value="oxford">Oxford</SelectItem>
                    <SelectItem value="plymouth">Plymouth</SelectItem>
                    <SelectItem value="sheffield">Sheffield</SelectItem>
                    <SelectItem value="st-ives">St Ives</SelectItem>
                    <SelectItem value="stratford-upon-avon">Stratford-upon-Avon</SelectItem>
                    <SelectItem value="windsor">Windsor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests Selector */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 justify-start text-left font-normal"
                    >
                      <User className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-900 truncate">{guestsSummary}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-6" align="start">
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Adults</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setAdults(adults + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Children</div>
                          <div className="text-sm text-gray-500">Aged 3-17</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setChildren(children + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Infants</div>
                          <div className="text-sm text-gray-500">Aged up to 2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{infants}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setInfants(infants + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Pets */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Pets</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setPets(Math.max(0, pets - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{pets}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                            onClick={() => setPets(pets + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-auto md:min-w-[140px]">
                <label className="hidden md:block text-sm font-medium text-gray-700 mb-2 invisible">
                  Search
                </label>
                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="w-full h-14 rounded-xl text-base font-semibold"
                  style={{
                    background: "var(--color-accent-sage)",
                    color: "white",
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Description - Below Video */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h1
            className="mb-4 sm:mb-5 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)"
            }}
          >
            Luxury Large Group Accommodation Across the UK
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
            Stay in style with Group Escape Houses. Perfect <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury hen party houses</Link> and large group accommodation with hot tubs, pools, and stylish interiors for <Link href="/experiences" className="underline hover:text-[var(--color-accent-gold)] transition-colors">unforgettable celebrations</Link>.
          </p>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '0ms' }}>
                <Shield className="w-8 h-8 text-[var(--color-accent-sage)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-[var(--color-neutral-dark)]">Protected payments via Stripe. Your booking is safe with us.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-gold)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '300ms' }}>
                <Award className="w-8 h-8 text-[var(--color-accent-gold)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3,000+ 5-Star Reviews</h3>
              <p className="text-[var(--color-neutral-dark)]">Trusted by thousands of happy guests across the UK.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '600ms' }}>
                <Users className="w-8 h-8 text-[var(--color-accent-sage)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">UK Support Team</h3>
              <p className="text-[var(--color-neutral-dark)]">Brighton-based team ready to help plan your perfect stay.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-gold)]/10 flex items-center justify-center animate-float" style={{ animationDelay: '900ms' }}>
                <Clock className="w-8 h-8 text-[var(--color-accent-gold)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24-Hour Response</h3>
              <p className="text-[var(--color-neutral-dark)]">Fast replies to all enquiries. No waiting around.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Why Choose Group Escape Houses?
            </h2>
            <p className="text-lg text-[var(--color-neutral-dark)] max-w-2xl mx-auto leading-relaxed">
              The UK's leading provider of luxury group accommodation for unforgettable celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-4">
                  <HomeIcon className="w-6 h-6 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Handpicked Properties
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-base leading-relaxed">
                Personally inspected properties with <Link href="/features/hot-tub" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">hot tubs</Link>, <Link href="/features/swimming-pool" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">pools</Link>, and <Link href="/features/games-room" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">games rooms</Link>.
              </p>
            </div>

            <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[var(--color-accent-gold)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Complete Party Planning
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-base leading-relaxed">
                From <Link href="/experiences" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">cocktail classes</Link> to <Link href="/experiences/private-chef" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">private chefs</Link>, we handle everything.
              </p>
            </div>

            <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Flexible Group Sizes
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-base leading-relaxed">
                Perfect for 8 close friends or 30+ guests. All <Link href="/properties" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">party houses</Link> designed for large groups.
              </p>
            </div>

            <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-sage)]/20 to-[var(--color-accent-gold)]/20 flex items-center justify-center mb-4">
                  <HomeIcon className="w-6 h-6 text-[var(--color-accent-gold)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  UK-Wide Coverage
                </h3>
              </div>
              <p className="text-[var(--color-neutral-dark)] text-base leading-relaxed">
                Properties in <Link href="/destinations/brighton" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">Brighton</Link>, <Link href="/destinations/bath" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">Bath</Link>, <Link href="/destinations/manchester" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">Manchester</Link>, and <Link href="/destinations/london" className="font-medium text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors">London</Link>.
              </p>
            </div>
          </div>

          {/* Image Gallery Grid - Integrated */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-e0d237d8-20251023182535.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">Handpicked Properties</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-party-plannin-d89e9075-20251023182534.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">Complete Party Planning</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-large-group-o-63176ec6-20251023182534.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">Flexible Group Sizes</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-showcasing-uk-wi-7248fc36-20251023182534.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">UK-Wide Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-16 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="mb-3 text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Experience Luxury Group Living
            </h2>
            <p className="text-lg text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              From stunning exteriors to luxurious interiors, every property is designed for unforgettable celebrations
            </p>
          </div>

          {/* Main Hero Image */}
          <div className="mb-4 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-f1760adc-20251023182556.jpg"
              alt="Luxury UK manor house with hot tub at golden hour"
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
          </div>

          {/* Grid of Feature Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-sp-11b5bc9b-20251023182557.jpg"
                alt="Spacious luxury living room perfect for groups"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-c-27088aeb-20251023182556.jpg"
                alt="Outdoor swimming pool at luxury UK cottage"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-c769dd2c-20251024124605.jpg"
                alt="Games room with pool table for entertainment"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>

          {/* Bottom Split Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-group-of-ha-f40eb3c6-20251023182556.jpg"
                alt="Group of friends celebrating at hot tub"
                className="w-full h-[240px] object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxurious-u-d0aaf124-20251023182549.jpg"
                alt="Elegant dining room for group celebrations"
                className="w-full h-[240px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              Featured Party Houses
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-4xl mx-auto px-4">
              Handpicked <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury party houses</Link> perfect for <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebrations across the UK</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-white scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Luxury Group Accommodation Across the UK
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto">
              We specialise in providing premium party houses and large group accommodation across England, Scotland, and Wales
            </p>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto text-[var(--color-neutral-dark)]">
            <p className="text-center leading-relaxed">
              Group Escape Houses offers an exclusive collection of <strong>luxury hen party houses</strong>, <strong>large holiday homes</strong>, and <strong>celebration accommodation</strong> throughout the United Kingdom. Our properties are located in the country's most popular destinations for group getaways, including coastal towns, vibrant cities, and stunning countryside locations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 not-prose">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">South England</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/brighton" className="hover:text-[var(--color-accent-gold)]">Brighton & Hove</Link></li>
                  <li><Link href="/destinations/bath" className="hover:text-[var(--color-accent-gold)]">Bath & Somerset</Link></li>
                  <li><Link href="/destinations/bournemouth" className="hover:text-[var(--color-accent-gold)]">Bournemouth & Dorset</Link></li>
                  <li><Link href="/destinations/london" className="hover:text-[var(--color-accent-gold)]">London & South East</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">North England</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/manchester" className="hover:text-[var(--color-accent-gold)]">Manchester & Lancashire</Link></li>
                  <li><Link href="/destinations/liverpool" className="hover:text-[var(--color-accent-gold)]">Liverpool & Merseyside</Link></li>
                  <li><Link href="/destinations/york" className="hover:text-[var(--color-accent-gold)]">York & Yorkshire</Link></li>
                  <li><Link href="/destinations/newcastle" className="hover:text-[var(--color-accent-gold)]">Newcastle & North East</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">Wales & Scotland</h3>
                <ul className="space-y-2 text-[var(--color-neutral-dark)]">
                  <li><Link href="/destinations/cardiff" className="hover:text-[var(--color-accent-gold)]">Cardiff & South Wales</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Scottish Highlands</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Edinburgh & Lowlands</Link></li>
                  <li><Link href="/destinations" className="hover:text-[var(--color-accent-gold)]">Snowdonia & North Wales</Link></li>
                </ul>
              </div>
            </div>

            <p className="text-center mt-8 leading-relaxed">
              All our properties feature essential amenities for group celebrations including fully equipped kitchens, spacious living areas, outdoor spaces, parking, and high-speed Wi-Fi. Most houses include luxury additions such as <strong>hot tubs</strong>, <strong>swimming pools</strong>, <strong>games rooms with pool tables and table tennis</strong>, <strong>cinema rooms</strong>, and <strong>BBQ areas</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-[42px] px-4" style={{ fontFamily: "var(--font-display)" }}>
              Make your celebration weekend extra special with curated activities and experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.slug} {...experience} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/experiences">Explore All Experiences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              How to Book Your Party House
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Four simple steps to your perfect <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">UK group celebration</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Choose House",
                description: "Browse our luxury properties and find your perfect match for your celebration or group gathering",
                icon: HomeIcon,
              },
              {
                step: "2",
                title: "Add Experiences",
                description: "Select from cocktail classes, butlers, spa treatments and more to enhance your weekend",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Pay Deposit",
                description: "Secure your booking with a simple deposit payment via our safe payment system",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Final Balance",
                description: "Pay the remaining balance before your stay and enjoy your unforgettable celebration!",
                icon: PartyPopper,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center relative group">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-float"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                      animationDelay: `${parseInt(item.step) * 100}ms`,
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--color-neutral-dark)]">{item.description}</p>
                  {item.step !== "4" && (
                    <ArrowRight className="hidden lg:block absolute top-8 sm:top-10 -right-4 w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-accent-gold)]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Visual Process Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-80">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-lifestyle-photograph-of-wom-bd1db51d-20251023182535.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Browse & Choose
                </h3>
                <p className="text-white/90 text-base">
                  Explore our collection of handpicked luxury party houses across the UK with detailed photos and information
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-80">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-group-adding--45a650b3-20251023182534.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Personalise Your Experience
                </h3>
                <p className="text-white/90 text-base">
                  Add cocktail masterclasses, private chefs, spa treatments and more to create your perfect celebration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              Top UK Destinations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Discover <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">party houses with hot tubs</Link> across the UK's best locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/90 backdrop-blur-sm">
                  <h3
                    className="text-sm sm:text-base md:text-lg font-semibold text-[var(--color-text-primary)] leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {destination.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
            >
              <Link href="/destinations">View All Locations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 sm:px-10 py-5 sm:py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)] w-full sm:w-auto"
              style={{
                borderColor: "var(--color-accent-gold)",
                color: "var(--color-text-primary)",
              }}
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              What Our Guests Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
              Join thousands of happy <Link href="/reviews" className="underline hover:text-[var(--color-accent-gold)] transition-colors">5-star celebrations</Link>
            </p>
          </div>

          <ReviewSlider reviews={reviews} />
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 sm:py-16 md:py-20 scroll-reveal" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12 gap-3 sm:gap-4 max-w-[1400px] mx-auto px-4 sm:px-6">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-0 text-center md:text-left" 
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              We're on Instagram
            </h2>
            <a
              href="https://www.instagram.com/groupescapehouses/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              @groupescapehouses
            </a>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 animate-slide-left">
              {/* First set of images */}
              {[
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-p-1043bcfc-20251018173502.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-i-de445ee3-20251018173511.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-fb4c6ff3-20251018173520.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-elegant-ou-0244cbf2-20251018173528.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-h-812ddd27-20251018173536.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-360aceae-20251018171413.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-a-34a56fe6-20251018171423.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-99493a7b-20251018171430.jpg?",
              ].map((image, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/groupescapehouses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "var(--color-accent-sage)" }} />
                    </div>
                  </div>
                </a>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-p-1043bcfc-20251018173502.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-i-de445ee3-20251018173511.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-fb4c6ff3-20251018173520.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-an-elegant-ou-0244cbf2-20251018173528.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-h-812ddd27-20251018173536.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-360aceae-20251018171413.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-young-women-a-34a56fe6-20251018171423.jpg?",
                "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-99493a7b-20251018171430.jpg?",
              ].map((image, index) => (
                <a
                  key={`duplicate-${index}`}
                  href="https://www.instagram.com/groupescapehouses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "var(--color-accent-sage)" }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Email Capture */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
            Get Party Planning Tips
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] mb-6 sm:mb-8">
            Subscribe for exclusive deals, house spotlights, and planning inspiration delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4" onSubmit={handleEmailSubmit}>
            {/* Honeypot field - hidden from users, bots will fill it */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ 
                position: 'absolute', 
                left: '-9999px',
                width: '1px',
                height: '1px'
              }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-5 sm:py-6 rounded-xl text-base"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-xl px-8 sm:px-10 py-5 sm:py-6 font-medium w-full sm:w-auto"
              style={{
                background: "var(--color-accent-sage)",
                color: "white",
              }}
              disabled={isSubmitting || submitStatus === "success"}
            >
              {isSubmitting ? "Processing..." : "Subscribe"}
            </Button>
          </form>

          {submitStatus === "success" && (
            <p className="text-green-500 text-sm mt-3 sm:mt-4">
              Thank you for subscribing! We'll send you exclusive party planning tips and special offers.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-red-500 text-sm mt-3 sm:mt-4">
              Oops! There was an error. Please try again.
            </p>
          )}

          <p className="text-xs sm:text-sm text-[var(--color-neutral-dark)] mt-3 sm:mt-4">
            We respect your privacy. Unsubscribe anytime. Read our <Link href="/privacy" className="underline hover:text-[var(--color-accent-gold)] transition-colors">privacy policy</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}