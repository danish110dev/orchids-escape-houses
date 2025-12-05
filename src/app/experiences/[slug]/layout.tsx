import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  return {
    alternates: {
      canonical: `${baseUrl}/experiences/${slug}`,
    },
  };
}

export default function ExperienceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}