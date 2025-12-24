import type { Metadata } from "next";
import UKServiceSchema from "@/components/UKServiceSchema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  return {
    alternates: {
      canonical: `/destinations/${slug}`,
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

  let properties = [];

  try {
    const response = await fetch(`${baseUrl}/api/properties?destination=${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (response.ok) {
      properties = await response.json();
    }
  } catch (error) {
    console.error('Error fetching destination properties for schema:', error);
  }

  const destinationName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return (
    <>
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" },
            { name: destinationName, url: `/destinations/${slug}` }
          ]
        }}
      />
      {properties.length > 0 && (
        <UKServiceSchema 
          type="itemList" 
          data={{ items: properties.slice(0, 10) }} 
        />
      )}
      {children}
    </>
  );
}
