import type { Metadata } from "next";
import UKServiceSchema from "@/components/UKServiceSchema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  try {
    const response = await fetch(`${baseUrl}/api/properties?slug=${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) throw new Error('Failed to fetch property');
    const propertyData = await response.json();
    
    if (!propertyData || propertyData.length === 0) {
      return {
        title: "Property | Group Escape Houses",
        alternates: { canonical: `/properties/${slug}` },
      };
    }

    const property = propertyData[0];
    const title = `${property.title} | ${property.sleepsMax} Guests | Group Escape Houses`;
    const description = `${property.title} in ${property.location}. Sleeps ${property.sleepsMax} guests across ${property.bedrooms} bedrooms.`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/properties/${slug}`,
        images: [{ url: property.heroImage || `${baseUrl}/og-image.jpg` }],
      },
      alternates: { canonical: `/properties/${slug}` },
    };
  } catch (error) {
    return {
      title: "Property | Group Escape Houses",
      alternates: { canonical: `/properties/${slug}` },
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
    const baseUrl = 'https://groupescapehouses.co.uk';
    
    let property = null;
    let relatedProperties = [];
    try {
      // Fetch property and related properties server-side for schema
      const response = await fetch(`${baseUrl}/api/properties?slug=${slug}`, {
        next: { revalidate: 60 },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          property = data[0];
          
          // Fetch related
          const relatedResponse = await fetch(`${baseUrl}/api/properties?isPublished=true&limit=3`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            relatedProperties = relatedData.filter((p: any) => p.slug !== slug).slice(0, 2);
          }
        }
      }
    } catch (e) {
      console.error('Error fetching property for layout schema:', e);
    }

    // Default FAQs matching PropertyDetailPage
    const faqs = [
      {
        question: "What is included in the price?",
        answer: "The price includes full use of the property and all facilities including hot tub, pool, games room, and all utilities. Bedding and towels are provided."
      },
      {
        question: "How do deposits and payments work?",
        answer: "A 25% deposit is required to secure your booking. The remaining balance is due 6 weeks before your arrival. A refundable damage deposit of £500 is also required."
      },
      {
        question: "Can we bring pets?",
        answer: "Please check the individual property features for pet-friendly status."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, there is private parking available on the property."
      }
    ];

    return (
      <>
        {property && (
          <>
            <UKServiceSchema 
              type="breadcrumb" 
              data={{
                breadcrumbs: [
                  { name: "Home", url: "/" },
                  { name: "Properties", url: "/properties" },
                  { name: property.title, url: `/properties/${slug}` }
                ]
              }}
            />
            <UKServiceSchema 
              type="itemList" 
              data={{ items: relatedProperties }} 
            />
            <UKServiceSchema type="faq" data={{ faqs }} />
          </>
        )}
        {children}
      </>
    );
}
