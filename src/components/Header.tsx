"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Experiences", href: "/experiences" },
    { label: "Destinations", href: "/destinations" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span
              className="text-2xl font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Group Escape Houses
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium hover:text-[var(--color-accent-pink)] transition-colors relative group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--color-accent-pink)] transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="rounded-2xl px-9 py-3 text-[var(--color-text-primary)] font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: "var(--color-accent-pink)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Link href="/contact">Get Instant Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg mx-4 p-6 backdrop-blur-md">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium py-2 hover:text-[var(--color-accent-pink)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="rounded-2xl mt-4 text-[var(--color-text-primary)] font-medium"
                style={{ background: "var(--color-accent-pink)" }}
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Instant Quote
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}