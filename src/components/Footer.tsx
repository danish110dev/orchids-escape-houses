import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="col-span-1">
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-gold)" }}
            >
              Group Escape Houses
            </h3>
            <p className="text-sm text-[var(--color-bg-secondary)] leading-relaxed">
              Luxury party houses designed for unforgettable celebrations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--color-accent-sage)] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--color-bg-secondary)]">
              <li>Office, 11a North St</li>
              <li>Brighton and Hove</li>
              <li>Brighton BN41 1DH</li>
              <li className="pt-2">
                <a
                  href="mailto:hello@groupescapehouses.co.uk"
                  className="hover:text-[var(--color-accent-sage)] transition-colors"
                >
                  hello@groupescapehouses.co.uk
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://instagram.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://tiktok.com/@groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://pinterest.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.18-1.56-.03-3.45.4-5.15l3.1-13.14a5.72 5.72 0 0 1-.21-1.81 3.94 3.94 0 0 1 4.09-3.91c1.93 0 2.86 1.45 2.86 3.18a20.64 20.64 0 0 1-1.15 4.46c-.33 1.38.69 2.5 2.05 2.5 2.47 0 4.13-3.17 4.13-6.93 0-2.86-1.93-5-5.44-5a6.32 6.32 0 0 0-6.6 6.36 3.78 3.78 0 0 0 .72 2.21.37.37 0 0 1 .08.35c-.09.39-.3 1.23-.34 1.4a.28.28 0 0 1-.4.2c-1.55-.63-2.27-2.33-2.27-4.24 0-3.15 2.65-6.93 7.9-6.93 4.23 0 7 3.07 7 6.39 0 4.38-2.44 7.66-6.05 7.66a3.28 3.28 0 0 1-2.8-1.42l-.77 3a11.4 11.4 0 0 1-1.31 2.72A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/447123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://threads.net/@groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center hover:-translate-y-1 hover:bg-[var(--color-accent-gold)] transition-all duration-200"
                aria-label="Threads"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717-1.31 1.63-2.01 4.05-2.08 7.2v.015c.07 3.148.77 5.568 2.08 7.197 1.43 1.78 3.63 2.694 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126.742a12.99 12.99 0 0 0-2.874-.128c-1.207.067-2.162.414-2.838.997-.644.555-.954 1.23-.925 2.006.023.656.413 1.256 1.102 1.69.61.383 1.43.574 2.44.526 1.15-.055 2.09-.462 2.798-1.21.494-.523.863-1.162 1.113-1.923.035-.109.07-.217.104-.326a8.31 8.31 0 0 0-.668-.352c-1.156-.55-2.637-.829-4.403-.829h-.003c-1.766 0-3.247.28-4.403.829-1.035.493-1.864 1.222-2.465 2.168-.722 1.135-1.08 2.477-1.065 3.989.014 1.46.393 2.755 1.127 3.851.734 1.096 1.79 1.94 3.141 2.509 1.387.584 3.02.876 4.855.876h.012c1.836 0 3.468-.292 4.856-.876 1.351-.57 2.407-1.413 3.14-2.509.734-1.096 1.113-2.391 1.127-3.851.015-1.512-.343-2.854-1.065-3.99-.602-.945-1.43-1.674-2.465-2.167-1.156-.549-2.637-.829-4.403-.829z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-accent-gold)] opacity-30 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-bg-secondary)]">
          <p>&copy; 2025 Group Escape Houses. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[var(--color-accent-sage)] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-accent-sage)] transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-[var(--color-accent-sage)] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}