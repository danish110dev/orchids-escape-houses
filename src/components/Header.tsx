"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, LogOut, User as UserIcon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false
});

export default function Header() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHousesOpen, setIsHousesOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isOccasionsOpen, setIsOccasionsOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize auth state once after first check
  useEffect(() => {
    if (!isPending && !isInitialized) {
      setIsInitialized(true);
    }
  }, [isPending, isInitialized]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    if (error?.code) {
      toast.error("Error signing out");
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  const houseStyles = [
    { title: "Manor Houses", slug: "manor-houses" },
    { title: "Country Houses", slug: "country-houses" },
    { title: "Luxury Houses", slug: "luxury-houses" },
    { title: "Castles", slug: "castles" },
    { title: "Party Houses", slug: "party-houses" },
    { title: "Large Holiday Homes", slug: "large-holiday-homes" },
    { title: "Large Cottages", slug: "large-cottages" },
    { title: "Stately Houses", slug: "stately-houses" },
  ];

  const features = [
    { title: "Hot Tub", slug: "hot-tub" },
    { title: "Swimming Pool", slug: "swimming-pool" },
    { title: "Games Room", slug: "games-room" },
    { title: "Cinema Room", slug: "cinema-room" },
    { title: "Tennis Court", slug: "tennis-court" },
    { title: "EV Charging", slug: "ev-charging" },
    { title: "Ground Floor Bedroom", slug: "ground-floor-bedroom" },
    { title: "Indoor Swimming Pool", slug: "indoor-swimming-pool" },
  ];

  const destinations = [
    { title: "Brighton", slug: "brighton" },
    { title: "Bath", slug: "bath" },
    { title: "London", slug: "london" },
    { title: "Manchester", slug: "manchester" },
    { title: "Bournemouth", slug: "bournemouth" },
    { title: "York", slug: "york" },
    { title: "Cardiff", slug: "cardiff" },
    { title: "Newcastle", slug: "newcastle" },
  ];

  const occasions = [
    { title: "Weddings & Celebrations", slug: "weddings", description: "Perfect for your special day" },
    { title: "Weekend Breaks", slug: "weekend-breaks", description: "Relaxing group getaways" },
    { title: "Special Celebrations", slug: "special-celebrations", description: "Birthdays & milestones" },
    { title: "Hen Parties", slug: "hen-party-houses", description: "Memorable hen weekends" },
    { title: "Christmas Gatherings", slug: "christmas", description: "Festive celebrations" },
    { title: "New Year Events", slug: "new-year", description: "Ring in the new year" },
  ];

  const experiences = [
    { title: "Cocktail Masterclass", slug: "cocktail-masterclass" },
    { title: "Sip & Paint", slug: "sip-and-paint" },
    { title: "Butlers in the Buff", slug: "butlers-in-the-buff" },
    { title: "Life Drawing", slug: "life-drawing" },
    { title: "Private Chef", slug: "private-chef" },
    { title: "Spa Treatments", slug: "spa-treatments" },
    { title: "Mobile Beauty Bar", slug: "mobile-beauty-bar" },
    { title: "Pamper Party Package", slug: "pamper-party-package" },
    { title: "Make-up Artist", slug: "make-up-artist" },
    { title: "Hair Styling", slug: "hair-styling" },
    { title: "Personalised Robes", slug: "personalised-robes" },
    { title: "Prosecco Reception", slug: "prosecco-reception" },
    { title: "Afternoon Tea", slug: "afternoon-tea" },
    { title: "BBQ Catering", slug: "bbq-catering" },
    { title: "Pizza Making Class", slug: "pizza-making-class" },
    { title: "Bottomless Brunch", slug: "bottomless-brunch" },
    { title: "Gin Tasting", slug: "gin-tasting" },
    { title: "Wine Tasting", slug: "wine-tasting" },
    { title: "Flower Crown Making", slug: "flower-crown-making" },
    { title: "Dance Class", slug: "dance-class" },
    { title: "Karaoke Night", slug: "karaoke-night" },
    { title: "Yoga Session", slug: "yoga-session" },
    { title: "Photography Package", slug: "photography-package" },
    { title: "DJ Entertainment", slug: "dj-entertainment" },
    { title: "Games & Activities Pack", slug: "games-activities-pack" },
    { title: "Decorations & Balloons", slug: "decorations-balloons" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-md"
        } z-50`}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo - Moved back with better proportions */}
            <Link 
              href="/" 
              className="flex items-center relative z-[60] flex-shrink-0 -ml-2"
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/stacked_logo-1760785640378.jpg"
                alt="Group Escape Houses"
                width={160}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {/* Houses to Rent Dropdown */}
              <div
                className="relative flex-1 flex justify-center px-1"
                onMouseEnter={() => setIsHousesOpen(true)}
                onMouseLeave={() => setIsHousesOpen(false)}
              >
                <button
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1.5 py-7 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Properties
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </button>

                {/* Dropdown Menu */}
                {isHousesOpen && (
                  <div className="absolute top-full left-0 w-[640px] bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    <div className="grid grid-cols-2 gap-10">
                      {/* House Styles Column */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-sage)] uppercase tracking-wide">
                          House Styles
                        </h3>
                        <ul className="space-y-2.5">
                          {houseStyles.map((style) => (
                            <li key={style.slug}>
                              <Link
                                href={`/house-styles/${style.slug}`}
                                className="text-[15px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1.5"
                              >
                                {style.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Must-Have Features Column */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-sage)] uppercase tracking-wide">
                          Must-Have Features
                        </h3>
                        <ul className="space-y-2.5">
                          {features.map((feature) => (
                            <li key={feature.slug}>
                              <Link
                                href={`/features/${feature.slug}`}
                                className="text-[15px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1.5"
                              >
                                {feature.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* View All Link */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
  <Link
    href="/properties"
    className="text-sm font-semibold text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors"
  >

                        Browse All Properties →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Occasions Dropdown */}
              <div
                className="relative flex-1 flex justify-center px-1"
                onMouseEnter={() => setIsOccasionsOpen(true)}
                onMouseLeave={() => setIsOccasionsOpen(false)}
              >
                <button
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1.5 py-7 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Occasions
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </button>

                {/* Dropdown Menu */}
                {isOccasionsOpen && (
                  <div className="absolute top-full left-0 w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-sage)] uppercase tracking-wide">
                      Perfect For Your Celebration
                    </h3>
                    <ul className="space-y-3">
                      {occasions.map((occasion) => (
                        <li key={occasion.slug}>
                          <Link
                            href={`/occasions/${occasion.slug}`}
                            className="group/item flex flex-col py-2 hover:bg-[var(--color-bg-secondary)] rounded-lg px-3 -mx-3 transition-all"
                          >
                            <span className="text-[15px] font-medium text-[var(--color-text-primary)] group-hover/item:text-[var(--color-accent-sage)] transition-colors">
                              {occasion.title}
                            </span>
                            <span className="text-xs text-[var(--color-neutral-dark)]">
                              {occasion.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                          <div className="mt-5 pt-4 border-t border-gray-100">
                            <Link
                              href="/occasions"
                              className="text-sm font-semibold text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors"
                            >
                              View All Occasions →
                            </Link>
                          </div>
                  </div>
                )}
              </div>

              {/* Experiences Dropdown */}
              <div
                className="relative flex-1 flex justify-center px-1"
                onMouseEnter={() => setIsExperiencesOpen(true)}
                onMouseLeave={() => setIsExperiencesOpen(false)}
              >
                <button
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1.5 py-7 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Experiences
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </button>

                {/* Dropdown Menu */}
                {isExperiencesOpen && (
                  <div className="absolute top-full left-0 w-[480px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-sage)] uppercase tracking-wide">
                      Add To Your Stay
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 max-h-[420px] overflow-y-auto pr-2 scrollbar-hide">
                      <ul className="space-y-2.5">
                        {experiences.slice(0, Math.ceil(experiences.length / 2)).map((experience) => (
                          <li key={experience.slug}>
                            <Link
                              href={`/experiences/${experience.slug}`}
                              className="text-[14px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1.5"
                            >
                              {experience.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-2.5">
                        {experiences.slice(Math.ceil(experiences.length / 2)).map((experience) => (
                          <li key={experience.slug}>
                            <Link
                              href={`/experiences/${experience.slug}`}
                              className="text-[14px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1.5"
                            >
                              {experience.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                      {/* View All Link */}
                      <div className="mt-6 pt-5 border-t border-gray-100">
                        <Link
                          href="/experiences"
                          className="text-sm font-semibold text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors"
                        >
                          View All Experiences →
                        </Link>
                      </div>
                  </div>
                )}
              </div>

              {/* Destinations Dropdown */}
              <div
                className="relative flex-1 flex justify-center px-1"
                onMouseEnter={() => setIsDestinationsOpen(true)}
                onMouseLeave={() => setIsDestinationsOpen(false)}
              >
                <button
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1.5 py-7 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Destinations
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </button>

                {/* Dropdown Menu */}
                {isDestinationsOpen && (
                  <div className="absolute top-full left-0 w-[320px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-sage)] uppercase tracking-wide">
                      Popular Destinations
                    </h3>
                    <ul className="space-y-2.5">
                          {destinations.map((destination) => (
                            <li key={destination.slug}>
                              <Link
                                href={`/destinations/${destination.slug}`}
                                className="text-[15px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1.5"
                              >
                                {destination.title}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* View All Link */}
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <Link
                            href="/destinations"
                            className="text-sm font-semibold text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors"
                          >
                            See all locations →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

              {/* How It Works Link */}
              <Link
                href="/how-it-works"
                className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group py-7 flex-1 flex justify-center px-2 whitespace-nowrap"
                style={{ fontFamily: "var(--font-body)" }}
              >
                How It Works
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </Link>

              {/* Admin Link - Only show if authenticated */}
              {session?.user && (
                <Link
                  href="/admin/bookings"
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group py-7 flex-1 flex justify-center px-2 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Admin
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </Link>
              )}

                {/* Advertise Link */}
                <Link
                  href="/why-list-with-escape-houses"
                  className="text-[14px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group py-7 flex-1 flex justify-center px-2 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Advertise
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </Link>
            </nav>

            {/* Auth & CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4 ml-auto flex-shrink-0">
              {/* Phone Number - Always visible */}
              <a
                href="tel:+441273569301"
                className="group flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-sage)]/10 hover:bg-[var(--color-accent-sage)] rounded-xl transition-all duration-200 border border-[var(--color-accent-sage)]/20"
                aria-label="Call us at 01273 569301"
              >
                <Phone className="w-4 h-4 text-[var(--color-accent-sage)] group-hover:text-white" />
                <span className="text-sm font-medium text-[var(--color-accent-sage)] group-hover:text-white">
                  01273 569301
                </span>
              </a>
              
                {isPending ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : isInitialized && session?.user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] rounded-xl">
                      <UserIcon className="w-4 h-4 text-[var(--color-accent-sage)]" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        {session.user.name}
                      </span>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="rounded-xl px-4 py-2 font-medium border-2 transition-all duration-200 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl px-6 py-2 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-sage)] hover:text-white hover:border-[var(--color-accent-sage)]"
                    style={{
                      borderColor: "var(--color-accent-sage)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-xl px-6 py-2 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: "var(--color-accent-gold)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 flex items-center gap-2 relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
              <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                {isMobileMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
        </header>
  
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          session={session}
          isPending={isPending}
          onSignOut={handleSignOut}
          houseStyles={houseStyles}
          features={features}
          destinations={destinations}
          occasions={occasions}
          experiences={experiences}
        />
      </>
    );
  }
