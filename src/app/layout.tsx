import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ClientSideFeatures from "@/components/ClientSideFeatures";
import CustomAutumnProvider from "@/lib/autumn-provider";
import UKServiceSchema from "@/components/UKServiceSchema";

export const metadata: Metadata = {
  title: {
    default: "Large Group Accommodation Across the UK | Group Escape Houses",
    template: "%s | Group Escape Houses"
  },
    description: "Luxury large group accommodation across the UK with hot tubs, pools, and stylish interiors.",
    metadataBase: new URL("https://groupescapehouses.co.uk"),
    alternates: {
      canonical: "./",
    },
    formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
          <UKServiceSchema type="default" includeSiteWide={true} />
      </head>
      <body className="antialiased">
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

        <ClientSideFeatures />
      </body>
    </html>
  );
}
