import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://www.groupescapehouses.co.uk';
  
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
          canonical: `/properties/${slug}`,
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
        url: `/properties/${slug}`,
        type: 'website',
        images: [
          {
            url: property.heroImage || 'https://www.groupescapehouses.co.uk/og-image.jpg',
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
        images: [property.heroImage || 'https://www.groupescapehouses.co.uk/og-image.jpg'],
      },
      alternates: {
        canonical: `/properties/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating property metadata:', error);
    return {
      title: "Property | Group Escape Houses",
      alternates: {
        canonical: `/properties/${slug}`,
      },
    };
  }
}

interface PropertyDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailLayout({
  children,
  params,
}: PropertyDetailLayoutProps) {
  const { slug } = await params;
  const baseUrl = 'https://www.groupescapehouses.co.uk';
  
  let property = null;
  try {
    const response = await fetch(`${baseUrl}/api/properties?slug=${slug}`, {
      next: { revalidate: 60 },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        property = data[0];
      }
    }
  } catch (e) {
    console.error('Error fetching property for layout schema:', e);
  }

  return (
    <>
      {property && (
        <>
          <StructuredData type="property" data={property} />
          <StructuredData 
            type="breadcrumb" 
            data={{
              breadcrumbs: [
                { name: "Home", url: "/" },
                { name: "Properties", url: "/properties" },
                { name: property.title, url: `/properties/${slug}` }
              ]
            }}
          />
        </>
      )}
      {children}
    </>
  );
}