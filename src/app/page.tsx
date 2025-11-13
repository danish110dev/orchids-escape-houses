"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Instagram, Home as HomeIcon, Sparkles, CreditCard, PartyPopper, Shield, Users, Award, Clock, Calendar, MapPin, User, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ExperienceCard from "@/components/ExperienceCard";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

// Lazy load non-critical components
const ReviewSlider = dynamic(() => import("@/components/ReviewSlider"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
});

// Static destinations data
const destinations = [
  { 
    name: "London", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-london-citysc-8f325788-20251019170619.jpg?",
    description: "Iconic attractions & world-class nightlife"
  },
  { 
    name: "Brighton", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/wide-angle-photograph-of-brighton-seafro-11bd7734-20251017161212.jpg",
    description: "Seaside fun with vibrant beach bars"
  },
  { 
    name: "Bath", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/historic-bath-city-center-photograph%2c--eef16b18-20251017161220.jpg",
    description: "Georgian elegance & thermal spas"
  },
  { 
    name: "Manchester", 
    image: "https://v3b.fal.media/files/b/tiger/TnJnPy7geHZHAjOwxZKxO_output.png",
    description: "Northern vibes & legendary nightlife"
  },
  { 
    name: "Newquay", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-newquay-beach-1b9fbe44-20251019170627.jpg?",
    description: "Surf beaches & coastal adventures"
  },
  { 
    name: "Liverpool", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Beatles heritage & waterfront bars"
  },
];

// All destinations for dropdown
const allDestinations = [
  "All Locations", "Brighton", "Bath", "Bournemouth", "London", "Manchester", "Liverpool", "York", 
  "Newcastle", "Cardiff", "Edinburgh", "Scottish Highlands", "Snowdonia", "Newquay", "Devon", 
  "Cotswolds", "Lake District", "Birmingham", "Blackpool", "Bristol", "Cambridge", "Canterbury", 
  "Cheltenham", "Chester", "Durham", "Exeter", "Harrogate", "Leeds", "Margate", "Nottingham", 
  "Oxford", "Plymouth", "Sheffield", "St Ives", "Stratford-upon-Avon", "Windsor"
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formLoadTime] = useState<number>(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [userInteraction, setUserInteraction] = useState({ clicks: 0, keystrokes: 0 });

  // Dynamic data
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Search form state
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [focusedDestinationIndex, setFocusedDestinationIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  
  const dateFieldRef = useRef<HTMLButtonElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const destinationButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const newsletterFormRef = useRef<HTMLFormElement>(null);

  // Fetch data with proper error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);

        const [propertiesRes, experiencesRes, reviewsRes] = await Promise.all([
          fetch('/api/properties?featured=true&isPublished=true&limit=3'),
          fetch('/api/experiences?isPublished=true&limit=6'),
          fetch('/api/reviews?isApproved=true&isPublished=true&limit=6&sort=reviewDate&order=desc')
        ]);

        if (!propertiesRes.ok || !experiencesRes.ok || !reviewsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [propertiesData, experiencesData, reviewsData] = await Promise.all([
          propertiesRes.json(),
          experiencesRes.json(),
          reviewsRes.json()
        ]);

        setFeaturedProperties(propertiesData.map((prop: any) => ({
          id: prop.id.toString(),
          title: prop.title,
          location: prop.location,
          sleeps: prop.sleepsMax,
          bedrooms: prop.bedrooms,
          priceFrom: prop.priceFromWeekend,
          image: prop.heroImage,
          features: [],
          slug: prop.slug,
        })));

        setExperiences(experiencesData.map((exp: any) => ({
          title: exp.title,
          duration: exp.duration,
          priceFrom: exp.priceFrom,
          groupSize: `${exp.groupSizeMin}-${exp.groupSizeMax} guests`,
          image: exp.heroImage,
          slug: exp.slug,
        })));

        setReviews(reviewsData.map((review: any) => ({
          name: review.guestName,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.reviewDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
          property: review.propertyId ? 'Property' : undefined,
          image: review.guestImage,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
        setFeaturedProperties([]);
        setExperiences([]);
        setReviews([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Optimized setup - removed heavy scroll listeners
  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Lightweight interaction tracking
    const trackClick = () => setUserInteraction(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    const trackKeypress = () => setUserInteraction(prev => ({ ...prev, keystrokes: prev.keystrokes + 1 }));

    if (newsletterFormRef.current) {
      newsletterFormRef.current.addEventListener('click', trackClick);
      newsletterFormRef.current.addEventListener('keydown', trackKeypress);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (newsletterFormRef.current) {
        newsletterFormRef.current.removeEventListener('click', trackClick);
        newsletterFormRef.current.removeEventListener('keydown', trackKeypress);
      }
    };
  }, []);

  const announce = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const challenge = Math.floor(Date.now() / 10000).toString();
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          honeypot,
          timestamp: formLoadTime.toString(),
          challenge,
          userInteraction
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubmitStatus("success");
      setEmail("");
      setUserInteraction({ clicks: 0, keystrokes: 0 });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (dateRange?.from) params.set('checkIn', format(dateRange.from, 'yyyy-MM-dd'));
    if (dateRange?.to) params.set('checkOut', format(dateRange.to, 'yyyy-MM-dd'));
    params.set('guests', String(adults + children));
    if (pets > 0) params.set('pets', String(pets));
    
    window.location.href = `/properties?${params.toString()}`;
  };

  // Auto-close calendar
  useEffect(() => {
    if (dateRange?.from && dateRange?.to && datePickerOpen) {
      const timer = setTimeout(() => {
        setDatePickerOpen(false);
        announce("Dates selected");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [dateRange, datePickerOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (datePickerOpen) setDatePickerOpen(false);
        if (destinationOpen) {
          setDestinationOpen(false);
          setFocusedDestinationIndex(-1);
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [datePickerOpen, destinationOpen]);

  // Keyboard navigation for destination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!destinationOpen) return;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedDestinationIndex((prev) => {
          const next = prev + 1 >= allDestinations.length ? 0 : prev + 1;
          destinationButtonsRef.current[next]?.focus();
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedDestinationIndex((prev) => {
          const next = prev - 1 < 0 ? allDestinations.length - 1 : prev - 1;
          destinationButtonsRef.current[next]?.focus();
          return next;
        });
      } else if (e.key === "Enter" && focusedDestinationIndex >= 0) {
        e.preventDefault();
        const selected = allDestinations[focusedDestinationIndex];
        if (selected) {
          setDestination(selected.toLowerCase().replace(/\s+/g, '-'));
          setDestinationOpen(false);
          setFocusedDestinationIndex(-1);
          announce(`${selected} selected`);
        }
      }
    };

    if (destinationOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [destinationOpen, focusedDestinationIndex]);

  const handleDestinationSelect = (dest: string) => {
    setDestination(dest.toLowerCase().replace(/\s+/g, '-'));
    setDestinationOpen(false);
    setFocusedDestinationIndex(-1);
    announce(`${dest} selected`);
  };

  const dateRangeDisplay = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, 'dd MMM')} → ${format(dateRange.to, 'dd MMM')}`
    : dateRange?.from
    ? `${format(dateRange.from, 'dd MMM')} → ?`
    : "Select dates";

  const totalGuests = adults + children + infants;
  const guestsSummary = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''} - ${pets} pet${pets !== 1 ? 's' : ''}`;

  return (
    <div className="min-h-screen">
      <StructuredData type="home" />
      <Header />

      <div
        ref={announcementRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      <main>
        {/* Hero Section - OPTIMIZED */}
        <section className="relative h-[700px] md:h-[800px] flex items-center overflow-hidden">
          {/* Background videos - lazy loaded */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-f1760adc-20251023182556.jpg"
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            aria-label="Background video showcasing luxury group accommodation"
          >
            <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/docs-assets/Main%20Horizontal%20(3).mp4" type="video/mp4" />
          </video>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-f1760adc-20251023182556.jpg"
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
            aria-label="Background video showcasing luxury group accommodation"
          >
            <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/docs-assets/0aNew%20Mobile%20Version%20%20(2).mp4" type="video/mp4" />
          </video>

          {/* Hero Content - REMOVED SCALING ANIMATIONS */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 gap-8">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold drop-shadow-lg"
              style={{
                fontFamily: "var(--font-display)",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Your Perfect Group Escape Starts Here
            </h1>

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                {/* Date Picker */}
                <div className="flex-1 min-w-0">
                  <label htmlFor="ge-dates" className="block text-sm font-medium text-gray-900 mb-2">
                    Check-in / Check-out
                  </label>
                  <Popover 
                    open={datePickerOpen} 
                    onOpenChange={setDatePickerOpen}
                    modal={false}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        ref={dateFieldRef}
                        id="ge-dates"
                        variant="outline"
                        className="ge-input w-full justify-start text-left font-normal"
                        aria-label={`Select dates. ${dateRangeDisplay}`}
                      >
                        <Calendar className="text-gray-400 mr-2 flex-shrink-0" />
                        <span className={dateRange?.from ? "text-gray-900 truncate" : "text-gray-500 truncate"}>
                          {dateRangeDisplay}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0 z-[1000]" 
                      align="start"
                      sideOffset={4}
                    >
                      <div className="p-4 border-b flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {!dateRange?.from && "Select check-in date"}
                          {dateRange?.from && !dateRange?.to && "Select check-out date"}
                          {dateRange?.from && dateRange?.to && "Dates selected"}
                        </p>
                        <button
                          onClick={() => {
                            setDateRange(undefined);
                            announce("Dates cleared");
                          }}
                          className="text-sm text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors font-medium"
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={(range: DateRange | undefined) => {
                          setDateRange(range);
                          if (range?.from && range?.to) {
                            announce(`Selected ${format(range.from, 'MMMM dd')} to ${format(range.to, 'MMMM dd')}`);
                          }
                        }}
                        numberOfMonths={isMobile ? 1 : 2}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        classNames={{
                          day_range_start: "ge-date-start",
                          day_range_end: "ge-date-end",
                          day_range_middle: "ge-date-in-range",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Destination Selector */}
                <div className="flex-1 min-w-0">
                  <label htmlFor="ge-destination" className="block text-sm font-medium text-gray-900 mb-2">
                    Destination
                  </label>
                  <Popover open={destinationOpen} onOpenChange={setDestinationOpen} modal={false}>
                    <PopoverTrigger asChild>
                      <Button
                        id="ge-destination"
                        variant="outline"
                        className="ge-input w-full justify-start text-left font-normal"
                        aria-label={`Select destination. Currently: ${destination ? allDestinations.find(d => d.toLowerCase().replace(/\s+/g, '-') === destination) || "Choose location" : "Choose location"}`}
                      >
                        <MapPin className="text-gray-400 mr-2 flex-shrink-0" />
                        <span className={destination ? "text-gray-900 truncate" : "text-gray-500 truncate"}>
                          {destination ? allDestinations.find(d => d.toLowerCase().replace(/\s+/g, '-') === destination) || "Choose location" : "Choose location"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[1000]" align="start">
                      <div className="max-h-[400px] overflow-y-auto smooth-scroll">
                        <div className="p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-3">Choose Destination</p>
                          <div className="flex flex-col gap-1">
                            {allDestinations.map((dest, index) => (
                              <button
                                key={dest}
                                ref={(el) => { destinationButtonsRef.current[index] = el; }}
                                onClick={() => handleDestinationSelect(dest)}
                                onMouseEnter={() => setFocusedDestinationIndex(index)}
                                className={`px-3 py-2.5 text-sm font-medium text-left rounded-lg transition-colors border ${
                                  focusedDestinationIndex === index
                                    ? 'bg-[var(--color-accent-sage)]/10 border-[var(--color-accent-sage)] text-gray-900'
                                    : 'bg-white border-gray-200 hover:border-[var(--color-accent-sage)] hover:bg-gray-50 text-gray-900'
                                }`}
                                tabIndex={destinationOpen ? 0 : -1}
                              >
                                {dest}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests Selector */}
                <div className="flex-1 min-w-0">
                  <label htmlFor="ge-guests" className="block text-sm font-medium text-gray-900 mb-2">
                    Guests
                  </label>
                  <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="ge-guests"
                        variant="outline"
                        className="ge-input w-full justify-start text-left font-normal"
                        aria-label={`Select guests. Currently: ${guestsSummary}`}
                      >
                        <User className="text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{guestsSummary}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-6 z-[1000]" align="start">
                      <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Adults</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              aria-label="Decrease number of adults"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900" aria-live="polite">{adults}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setAdults(adults + 1)}
                              aria-label="Increase number of adults"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Children</div>
                            <div className="text-sm text-gray-600">Aged 3-17</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              aria-label="Decrease number of children"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900" aria-live="polite">{children}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setChildren(children + 1)}
                              aria-label="Increase number of children"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Infants</div>
                            <div className="text-sm text-gray-600">Aged up to 2</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setInfants(Math.max(0, infants - 1))}
                              aria-label="Decrease number of infants"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900" aria-live="polite">{infants}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setInfants(infants + 1)}
                              aria-label="Increase number of infants"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Pets */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">Pets</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setPets(Math.max(0, pets - 1))}
                              aria-label="Decrease number of pets"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900" aria-live="polite">{pets}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-lg border-2 border-[var(--color-accent-sage)]"
                              onClick={() => setPets(pets + 1)}
                              aria-label="Increase number of pets"
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
                  <label className="hidden md:block text-sm font-medium text-gray-900 mb-2 invisible">
                    Search
                  </label>
                  <Button
                    id="ge-search"
                    size="lg"
                    onClick={handleSearch}
                    className="ge-input w-full rounded-xl font-semibold"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white",
                    }}
                    aria-label="Search for properties"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Description - Below Video - ADD TO sectionsRef */}
        <section className="py-8 sm:py-10 md:py-12 bg-white scale-on-scroll">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2
              className="mb-4 sm:mb-5 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight text-center"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)"
              }}
            >
              Luxury Large Group Accommodation Across the UK
            </h2>
            <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
              Stay in style with Group Escape Houses. Perfect <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury hen party houses</Link> and large group accommodation with hot tubs, pools, and stylish interiors for <Link href="/experiences" className="underline hover:text-[var(--color-accent-gold)] transition-colors">unforgettable celebrations</Link>.
            </p>
          </div>
        </section>

        {/* Trust Signals Section - ADD TO sectionsRef */}
        <section className="py-16 bg-white scale-on-scroll">
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

        {/* Why Choose Us Section - ADD TO sectionsRef */}
        <section className="py-16 bg-[var(--color-bg-secondary)] scroll-reveal scale-on-scroll">
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

            {/* Image Gallery Grid - Optimized with Next.js Image */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-e0d237d8-20251023182535.jpg"
                  alt="Handpicked luxury properties with premium amenities"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">Handpicked Properties</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-party-plannin-d89e9075-20251023182534.jpg"
                  alt="Complete party planning services and experiences"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">Complete Party Planning</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-large-group-o-63176ec6-20251023182534.jpg"
                  alt="Flexible group sizes from 8 to 30+ guests"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">Flexible Group Sizes</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-md h-48 group cursor-pointer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-showcasing-uk-wi-7248fc36-20251023182534.jpg"
                  alt="UK-wide coverage across major cities and destinations"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">UK-Wide Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Section - ADD TO sectionsRef */}
        <section className="py-16 bg-white scroll-reveal scale-on-scroll">
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
            <div className="mb-4 rounded-2xl overflow-hidden shadow-xl relative h-[300px] sm:h-[400px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-real-estate-photograph-of-a-f1760adc-20251023182556.jpg"
                alt="Luxury UK manor house with hot tub at golden hour"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>

            {/* Grid of Feature Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[200px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-sp-11b5bc9b-20251023182557.jpg"
                  alt="Spacious luxury living room perfect for groups"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[200px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxury-uk-c-27088aeb-20251023182556.jpg"
                  alt="Outdoor swimming pool at luxury UK cottage"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[200px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-interior-photograph-of-a-lu-c769dd2c-20251024124605.jpg"
                  alt="Games room with pool table for entertainment"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Split Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[240px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-group-of-ha-f40eb3c6-20251023182556.jpg"
                  alt="Group of friends celebrating at hot tub"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[240px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-a-luxurious-u-d0aaf124-20251023182549.jpg"
                  alt="Elegant dining room for group celebrations"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties - NOW DYNAMIC */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal scale-on-scroll">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
                Featured Party Houses
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-4xl mx-auto px-4">
                Handpicked <Link href="/properties" className="underline hover:text-[var(--color-accent-gold)] transition-colors">luxury party houses</Link> perfect for <Link href="/destinations" className="underline hover:text-[var(--color-accent-gold)] transition-colors">celebrations across the UK</Link>
              </p>
            </div>

            {isLoadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-96"></div>
                ))}
              </div>
            ) : featuredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[var(--color-neutral-dark)]">No featured properties available at the moment.</p>
              </div>
            )}

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

        {/* Service Areas Section - ADD TO sectionsRef */}
        <section className="py-20 bg-white scroll-reveal scale-on-scroll">
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

        {/* Experiences - NOW DYNAMIC */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal scale-on-scroll">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-[42px] px-4" style={{ fontFamily: "var(--font-display)" }}>
                Make your celebration weekend extra special with curated activities and experiences
              </h2>
            </div>

            {isLoadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-80"></div>
                ))}
              </div>
            ) : experiences.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {experiences.map((experience) => (
                  <ExperienceCard key={experience.slug} {...experience} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[var(--color-neutral-dark)]">No experiences available at the moment.</p>
              </div>
            )}

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

        {/* How It Works - ADD TO sectionsRef */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal scale-on-scroll">
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

            {/* Visual Process Images - Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group h-80">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-lifestyle-photograph-of-wom-bd1db51d-20251023182535.jpg"
                  alt="Women browsing and choosing luxury party houses on laptop"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
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
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-photograph-of-group-adding--45a650b3-20251023182534.jpg"
                  alt="Group adding experiences and personalizing their celebration package"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
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

        {/* Destinations - KEEP STATIC for hero showcase */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal scale-on-scroll">
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
                  aria-label={`View ${destination.name} party houses and hen do accommodation`}
                >
                  <Image
                    src={destination.image}
                    alt={`${destination.name} luxury group accommodation and party houses`}
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/95 backdrop-blur-sm">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text-primary)] leading-tight mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {destination.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-neutral-dark)] flex items-center gap-1">
                      {destination.description}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
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

        {/* Reviews - NOW DYNAMIC */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-primary)] scroll-reveal scale-on-scroll">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
                What Our Guests Say
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto px-4">
                Join thousands of happy <Link href="/reviews" className="underline hover:text-[var(--color-accent-gold)] transition-colors">5-star celebrations</Link>
              </p>
            </div>

            {isLoadingData ? (
              <div className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ) : reviews.length > 0 ? (
              <ReviewSlider reviews={reviews} />
            ) : (
              <div className="text-center py-12">
                <p className="text-[var(--color-neutral-dark)]">No reviews available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Instagram Section - ADD TO sectionsRef */}
        <section className="py-12 sm:py-16 md:py-20 scroll-reveal scale-on-scroll" style={{ background: "var(--color-bg-secondary)" }}>
          <div className="max-w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12 gap-3 sm:gap-4 max-w-[1400px] mx-auto px-4 sm:px-6">
              <h2 
                className="mb-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center md:text-left" 
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                Follow Our Journey
              </h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 sm:gap-4 animate-slide-left">
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

        {/* Email Capture - ADD TO sectionsRef */}
        <section className="py-16 sm:py-20 md:py-24 bg-[var(--color-bg-secondary)] scroll-reveal scale-on-scroll">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-[42px]" style={{ fontFamily: "var(--font-display)" }}>
              Get Party Planning Tips
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-neutral-dark)] mb-6 sm:mb-8">
              Subscribe for exclusive deals, house spotlights, and planning inspiration delivered to your inbox
            </p>

            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4" onSubmit={handleEmailSubmit} ref={newsletterFormRef}>
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
      </main>

      <Footer />
    </div>
  );
}