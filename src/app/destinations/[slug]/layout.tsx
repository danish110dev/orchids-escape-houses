import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  return {
    alternates: {
      canonical: `${baseUrl}/destinations/${slug}`,
    },
  };
}

interface DestinationDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DestinationDetailLayout({
  children,
  params,
}: DestinationDetailLayoutProps) {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';

  let itemListSchema = null;

  try {
    // Fetch properties for this destination
    const response = await fetch(`${baseUrl}/api/properties?destination=${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (response.ok) {
      const properties = await response.json();

      if (properties && properties.length > 0) {
        itemListSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Group Accommodation in ${slug.replace(/-/g, ' ')}`,
          itemListElement: properties.slice(0, 10).map((property: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: property.title,
            url: `${baseUrl}/properties/${property.slug || property.id}`
          }))
        };
      }
    }
  } catch (error) {
    console.error('Error fetching destination properties for schema:', error);
  }

  return (
    <>
      {itemListSchema && (
        <Script
          id={`itemlist-schema-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {children}
    </>
  );
}