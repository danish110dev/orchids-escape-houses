import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  return {
    alternates: {
      canonical: `${baseUrl}/properties/${params.slug}`,
    },
  };
}

export default function PropertyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
