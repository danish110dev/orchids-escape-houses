import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Luxury Hen Party Houses UK | Hot Tubs, Pools & Games Rooms | Group Escape Houses",
  description: "Book stunning hen party houses sleeping 10-40+ guests across the UK. Luxury group accommodation with hot tubs, swimming pools, games rooms. From £65-£150 per night. Instant enquiry, safe payments, UK support.",
  keywords: "hen party houses UK, group accommodation UK, large holiday homes, houses with hot tubs, hen do accommodation, party houses for groups, luxury group houses, weekend break houses, large cottages UK, group holiday homes",
  authors: [{ name: 'Group Escape Houses' }],
  creator: 'Group Escape Houses',
  publisher: 'Group Escape Houses',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://groupescapehouses.co.uk',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://groupescapehouses.co.uk',
    title: "Luxury Hen Party Houses UK | Hot Tubs, Pools & Games Rooms",
    description: "Book stunning hen party houses sleeping 10-40+ guests across the UK. Luxury group accommodation with hot tubs, swimming pools, games rooms. From £65-£150 per night.",
    siteName: 'Group Escape Houses',
    images: [
      {
        url: 'https://groupescapehouses.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Group Escape Houses - Luxury Group Accommodation UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luxury Hen Party Houses UK | Hot Tubs, Pools & Games Rooms",
    description: "Book stunning hen party houses sleeping 10-40+ guests across the UK. Luxury group accommodation with hot tubs, swimming pools, games rooms.",
    images: ['https://groupescapehouses.co.uk/og-image.jpg'],
  },
  other: {
    'format-detection': 'telephone=no, address=no, email=no',
  },
};
