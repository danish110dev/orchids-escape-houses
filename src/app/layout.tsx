import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import CustomAutumnProvider from "@/lib/autumn-provider";

const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display",
});

// Generic metadata for root layout - specific pages override this
export const metadata: Metadata = {
  title: {
    default: "Group Escape Houses | Luxury Group Accommodation UK",
    template: "%s | Group Escape Houses"
  },
  description: "Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors.",
  metadataBase: new URL("https://groupescapehouses.co.uk"),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Icons are automatically generated from icon.tsx and apple-icon.tsx
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "5Y_FiF2qaStUJ-oNPw4DIxA8AUWw-pnJ999FgRUzpgk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
          <link rel="preconnect" href="https://images.unsplash.com" />
          <link rel="preconnect" href="https://v3b.fal.media" />
          <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
      </head>
        <body className={`${fontBody.variable} ${fontDisplay.variable} antialiased`}>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="lazyOnload"
            data-orchids-project-id="8330e9be-5e47-4f2b-bda0-4162d899b6d9"
          />
        <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="lazyOnload"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          <CustomAutumnProvider>
            {children}
          </CustomAutumnProvider>
          <CookieConsent />
          <Toaster />
      
        <VisualEditsMessenger />
      </body>
    </html>
  );
}