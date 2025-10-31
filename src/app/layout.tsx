import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import CustomAutumnProvider from "@/lib/autumn-provider";
export const metadata: Metadata = {
  title: "Group Escape Houses | Large Group Accommodation UK | Luxury Hen Party Houses",
  description: "Stay in style with Group Escape Houses. Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors. Perfect for hen parties, birthdays, and weekend getaways.",
  keywords: [
    "hen party houses UK",
    "hen do accommodation",
    "party houses for groups",
    "large group cottages",
    "hen weekend houses",
    "houses with hot tubs UK",
    "luxury party houses",
    "group accommodation UK",
    "large holiday homes",
    "celebration accommodation",
    "birthday party houses",
    "houses with pools UK",
    "party houses with games rooms",
    "large group accommodation UK",
    "luxury hen party houses"
  ],
  authors: [{ name: "Group Escape Houses" }],
  creator: "Group Escape Houses",
  publisher: "Group Escape Houses",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://groupescapehouses.co.uk"),
  alternates: {
    canonical: "https://groupescapehouses.co.uk/",
  },
  // Icons are automatically generated from icon.tsx and apple-icon.tsx
  openGraph: {
    title: "Group Escape Houses | Large Group Accommodation UK | Luxury Hen Party Houses",
    description: "Stay in style with Group Escape Houses. Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors. Perfect for hen parties, birthdays, and weekend getaways.",
    url: "https://groupescapehouses.co.uk",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://groupescapehouses.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Group Escape Houses - Luxury Party Houses UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Escape Houses | Large Group Accommodation UK | Luxury Hen Party Houses",
    description: "Stay in style with Group Escape Houses. Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors.",
    images: ["https://groupescapehouses.co.uk/twitter-image.jpg"],
    creator: "@groupescapehouses",
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
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
        <WhatsAppChatbot />
        <CookieConsent />
        <Toaster />
      
        <VisualEditsMessenger />
      </body>
    </html>
  );
}