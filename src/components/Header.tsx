"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHousesDropdownOpen, setIsHousesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { label: "Spa Treatments", href: "/spa-treatments" },
    { label: "Destinations", href: "/destinations" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Reviews", href: "/reviews" },
    { label: "Planning Tips & Inspiration", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://v3b.fal.media/files/b/kangaroo/Mst13pbVZIG2-LoyTdF0I_output.png"
              alt="Group Escape Houses"
              width={220}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Houses to Rent Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsHousesDropdownOpen(true)}
              onMouseLeave={() => setIsHousesDropdownOpen(false)}
            >
              <button
                className="text-[15px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group flex items-center gap-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Houses to Rent
                <ChevronDown className="w-4 h-4" />
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </button>

              {/* Dropdown Menu */}
              {isHousesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                  <div className="grid grid-cols-2 gap-8">
                    {/* House Styles Column */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-[var(--color-accent-sage)] uppercase tracking-wide">
                        House Styles
                      </h3>
                      <ul className="space-y-2">
                        {houseStyles.map((style) => (
                          <li key={style.slug}>
                            <Link
                              href={`/house-styles/${style.slug}`}
                              className="text-sm text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)] transition-colors block py-1"
                            >
                              {style.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Must-Have Features Column */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-[var(--color-accent-gold)] uppercase tracking-wide">
                        Must-Have Features
                      </h3>
                      <ul className="space-y-2">
                        {features.map((feature) => (
                          <li key={feature.slug}>
                            <Link
                              href={`/features/${feature.slug}`}
                              className="text-sm text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-gold)] transition-colors block py-1"
                            >
                              {feature.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View All Link */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
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
                className="text-[15px] font-medium hover:text-[var(--color-accent-sage)] transition-colors relative group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-sage)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
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
            className="lg:hidden p-2 flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <Menu className="w-6 h-6" />
                <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>Menu</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg mx-4 p-6 backdrop-blur-md max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-4">
              {/* Houses to Rent Mobile */}
              <div className="border-b border-gray-200 pb-4">
                <Link
                  href="/house-styles-and-features"
                  className="text-[15px] font-semibold py-2 block text-[var(--color-accent-sage)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Houses to Rent
                </Link>
                <div className="ml-4 mt-2 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">House Styles</p>
                  {houseStyles.slice(0, 6).map((style) => (
                    <Link
                      key={style.slug}
                      href={`/house-styles/${style.slug}`}
                      className="text-sm py-1 block text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-sage)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {style.title}
                    </Link>
                  ))}
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3">Features</p>
                  {features.slice(0, 5).map((feature) => (
                    <Link
                      key={feature.slug}
                      href={`/features/${feature.slug}`}
                      className="text-sm py-1 block text-[var(--color-neutral-dark)] hover:text-[var(--color-accent-gold)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {feature.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium py-2 hover:text-[var(--color-accent-sage)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="rounded-2xl mt-4 text-white font-medium"
                style={{ background: "var(--color-accent-gold)" }}
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}