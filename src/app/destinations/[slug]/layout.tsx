import type { Metadata } from "next";
import UKServiceSchema from "@/components/UKServiceSchema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
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

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/destinations" },
    { name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), url: `/destinations/${slug}` }
  ];

  return (
    <>
      <UKServiceSchema 
        type="itemList" 
        data={{ 
          items: properties.slice(0, 10),
          name: `Group Accommodation in ${slug.replace(/-/g, ' ')}`
        }} 
      />
      <UKServiceSchema 
        type="breadcrumb" 
        data={{ breadcrumbs }} 
      />
      {children}
    </>
  );
}
