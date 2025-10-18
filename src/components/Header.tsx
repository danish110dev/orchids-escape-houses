"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHousesOpen, setIsHousesOpen] = useState(false);
  const [isMobileStylesOpen, setIsMobileStylesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const houseStyles = [
    { title: "Manor Houses", slug: "manor-houses" },
    { title: "Country Houses", slug: "country-houses" },
    { title: "Luxury Houses", slug: "luxury-houses" },
    { title: "Castles", slug: "castles" },
    { title: "Luxury Dog Friendly Cottages", slug: "luxury-dog-friendly-cottages" },
    { title: "Unusual & Quirky", slug: "unusual-and-quirky" },
    { title: "Family Holidays", slug: "family-holidays" },
    { title: "Party Houses", slug: "party-houses" },
    { title: "Large Cottages", slug: "large-cottages" },
    { title: "Stately Houses", slug: "stately-houses" },
    { title: "Large Holiday Homes", slug: "large-holiday-homes" },
    { title: "Luxury Cottages with Sea Views", slug: "luxury-cottages-with-sea-views" },
  ];

  const features = [
    { title: "Games Room", slug: "games-room" },
    { title: "Tennis Court", slug: "tennis-court" },
    { title: "Swimming Pool", slug: "swimming-pool" },
    { title: "Cinema Room", slug: "cinema-room" },
    { title: "Hot Tub", slug: "hot-tub" },
    { title: "EV Charging", slug: "ev-charging" },
    { title: "Fishing Lake", slug: "fishing-lake" },
    { title: "Direct Beach Access", slug: "direct-beach-access" },
    { title: "Ground Floor Bedroom", slug: "ground-floor-bedroom" },
    { title: "Indoor Swimming Pool", slug: "indoor-swimming-pool" },
  ];

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Experiences", href: "/experiences" },
    { label: "Destinations", href: "/destinations" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-[70]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/stacked_logo-1760785640378.jpg"
              alt="Group Escape Houses"
              width={180}
              height={120}
              className="h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {/* Houses to Rent Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsHousesOpen(true)}
              onMouseLeave={() => setIsHousesOpen(false)}
            >
              <button
                className="text-[15px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1.5 py-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Houses to Rent
                <ChevronDown className="w-4 h-4" />
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </button>

              {/* Dropdown Menu */}
              {isHousesOpen && (
                <div className="absolute top-full left-0 mt-2 w-[640px] bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
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
                      <h3 className="text-sm font-semibold mb-4 text-[var(--color-accent-gold)] uppercase tracking-wide">
                        Must-Have Features
                      </h3>
                      <ul className="space-y-2.5">
                        {features.map((feature) => (
                          <li key={feature.slug}>
                            <Link
                              href={`/features/${feature.slug}`}
                              className="text-[15px] text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-gold)] transition-colors block py-1.5"
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
                      href="/house-styles-and-features"
                      className="text-sm font-semibold text-[var(--color-accent-sage)] hover:text-[var(--color-accent-gold)] transition-colors"
                    >
                      View All House Styles & Features →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group py-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="rounded-2xl px-9 py-3 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: "var(--color-accent-gold)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 flex items-center gap-2 relative z-[70]"
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

      {/* Mobile Menu - Full Page Dark Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#1F2937] text-white flex flex-col transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? "translate-x-0 z-[60]" : "translate-x-full z-[-1]"
        }`}
      >
        {/* Menu Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 pt-24 pb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column - Main Navigation */}
            <nav className="space-y-6">
              <Link
                href="/"
                className="block text-4xl md:text-5xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Properties Dropdown */}
              <div className="space-y-3">
                <Link
                  href="/properties"
                  className="block text-4xl md:text-5xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Properties
                </Link>
                
                {/* House Styles Submenu */}
                <button
                  onClick={() => setIsMobileStylesOpen(!isMobileStylesOpen)}
                  className="flex items-center gap-2 text-lg text-white/80 hover:text-white transition-colors"
                >
                  House Styles
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMobileStylesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileStylesOpen && (
                  <div className="pl-4 space-y-2 text-white/70">
                    {houseStyles.map((style) => (
                      <Link
                        key={style.slug}
                        href={`/house-styles/${style.slug}`}
                        className="block py-1 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {style.title}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Features Submenu */}
                <button
                  onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                  className="flex items-center gap-2 text-lg text-white/80 hover:text-white transition-colors"
                >
                  Must-Have Features
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMobileFeaturesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileFeaturesOpen && (
                  <div className="pl-4 space-y-2 text-white/70">
                    {features.map((feature) => (
                      <Link
                        key={feature.slug}
                        href={`/features/${feature.slug}`}
                        className="block py-1 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {feature.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/experiences"
                className="block text-4xl md:text-5xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiences
              </Link>

              <Link
                href="/destinations"
                className="block text-4xl md:text-5xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </Link>

              <Link
                href="/how-it-works"
                className="block text-4xl md:text-5xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>

            {/* Right Column - Secondary Navigation */}
            <nav className="space-y-4 md:pt-0 pt-8">
              <Link
                href="/our-story"
                className="block text-2xl font-medium hover:text-[var(--color-accent-gold)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/reviews"
                className="block text-2xl font-medium hover:text-[var(--color-accent-gold)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>

              <Link
                href="/contact"
                className="block text-2xl font-medium hover:text-[var(--color-accent-gold)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                href="/blog"
                className="block text-2xl font-medium hover:text-[var(--color-accent-gold)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom CTA and Contact */}
        <div className="border-t border-white/20 px-8 py-8 space-y-6">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full py-6 text-xl font-medium"
            style={{
              background: "var(--color-accent-gold)",
              color: "white",
            }}
          >
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              INSTANT QUOTE
            </Link>
          </Button>

          <div className="text-center space-y-2">
            <p className="text-white/70 text-sm">Nationwide</p>
            <a
              href="tel:01273590820"
              className="text-2xl font-semibold hover:text-[var(--color-accent-gold)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              01273 590820
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}