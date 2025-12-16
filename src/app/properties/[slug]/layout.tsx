import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  try {
    // Fetch property data
    const response = await fetch(`${baseUrl}/api/properties?slug=${slug}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    const propertyData = await response.json();
    
    if (!propertyData || propertyData.length === 0) {
      return {
        title: "Property | Group Escape Houses",
        alternates: {
          canonical: `${baseUrl}/properties/${slug}`,
        },
      };
    }

    const property = propertyData[0];
    const title = `${property.title} | ${property.sleepsMax} Guests | Hot Tub & Pool | Group Escape Houses`;
    const description = `${property.title} in ${property.location}. Sleeps ${property.sleepsMax} guests across ${property.bedrooms} bedrooms. From £${Math.min(property.priceFromWeekend, property.priceFromMidweek)}/night. ${property.description?.substring(0, 100)}...`;
    
    return {
      title,
      description,
      keywords: `${property.title}, ${property.location} holiday home, group accommodation, hen party house, party house, houses sleeping ${property.sleepsMax} guests, hot tub rental, luxury group accommodation`,
      authors: [{ name: 'Group Escape Houses' }],
      creator: 'Group Escape Houses',
      openGraph: {
        title: `${property.title} | Group Escape Houses`,
        description,
        url: `${baseUrl}/properties/${slug}`,
        type: 'website',
        images: [
          {
            url: property.heroImage || 'https://groupescapehouses.co.uk/og-image.jpg',
            width: 1200,
            height: 630,
            alt: property.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [property.heroImage || 'https://groupescapehouses.co.uk/og-image.jpg'],
      },
      alternates: {
        canonical: `${baseUrl}/properties/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating property metadata:', error);
    return {
      title: "Property | Group Escape Houses",
      alternates: {
        canonical: `${baseUrl}/properties/${slug}`,
      },
    };
  }
}

export default function PropertyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}