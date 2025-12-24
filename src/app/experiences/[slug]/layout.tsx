import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { experiencesData } from "@/data/experiences";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://www.groupescapehouses.co.uk';
  const experience = experiencesData[slug] || experiencesData["private-chef"];

  return {
    title: `${experience.title} | Group Escape Houses`,
    description: experience.description,
    alternates: {
      canonical: `/experiences/${slug}`,
    },
    openGraph: {
      title: `${experience.title} | Group Escape Houses`,
      description: experience.description,
      url: `/experiences/${slug}`,
      images: [{ url: experience.image }],
    }
  };
}

interface ExperienceDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function ExperienceDetailLayout({
  children,
  params,
}: ExperienceDetailLayoutProps) {
  const { slug } = await params;
  const experience = experiencesData[slug] || experiencesData["private-chef"];

  return (
    <>
      <StructuredData 
        type="experience" 
        data={{
          title: experience.title,
          description: experience.description,
          image: experience.image
        }} 
      />
      <StructuredData 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Experiences", url: "/experiences" },
            { name: experience.title, url: `/experiences/${slug}` }
          ]
        }}
      />
      {children}
    </>
  );
}