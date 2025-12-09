import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hen Party Houses UK | Hot Tubs & Pools | Group Escape",
  description: "Luxury hen party houses sleeping 10-40+ guests across the UK. Hot tubs, pools, games rooms from £65pp. Instant enquiry & UK support.",
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
    title: "Hen Party Houses UK | Hot Tubs & Pools",
    description: "Luxury hen party houses sleeping 10-40+ guests across the UK. Hot tubs, pools, games rooms from £65pp. Instant enquiry & UK support.",
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
    title: "Hen Party Houses UK | Hot Tubs & Pools",
    description: "Luxury hen party houses sleeping 10-40+ guests. Hot tubs, pools, games rooms from £65pp. UK-based support team.",
    images: ['https://groupescapehouses.co.uk/og-image.jpg'],
  },
  other: {
    'format-detection': 'telephone=no, address=no, email=no',
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}