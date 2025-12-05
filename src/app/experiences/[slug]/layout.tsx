import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  return {
    alternates: {
      canonical: `${baseUrl}/experiences/${params.slug}`,
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
