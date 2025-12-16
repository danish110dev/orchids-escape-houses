import type { Metadata } from "next";

// Experiences data
const experiencesData: Record<string, any> = {
  "private-chef": {
    title: "Private Chef Hire for Hen Parties",
    description: "Michelin-trained private chefs from £55pp. Restaurant-quality dining at your hen party house. Menus tailored to your group.",
    keywords: "private chef hire, hen party catering, group dining, luxury catering service",
  },
  "cocktail-masterclass": {
    title: "Cocktail Making Masterclass",
    description: "Learn to shake, stir and muddle like a pro. Interactive cocktail classes for groups. Book now from £45pp.",
    keywords: "cocktail masterclass, hen party activity, mixology class, group experience",
  },
  "life-drawing": {
    title: "Life Drawing Classes & Butler in the Buff",
    description: "Professional life drawing sessions for hen parties. Available with regular models or the famous 'butler in the buff' experience.",
    keywords: "life drawing hen party, butler in the buff, hen do activity, group art class",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  const experience = experiencesData[slug];
  if (!experience) {
    return {
      title: "Experience | Group Escape Houses",
      alternates: {
        canonical: `${baseUrl}/experiences/${slug}`,
      },
    };
  }

  return {
    title: `${experience.title} | Group Escape Houses`,
    description: experience.description,
    keywords: experience.keywords,
    authors: [{ name: 'Group Escape Houses' }],
    creator: 'Group Escape Houses',
    openGraph: {
      title: experience.title,
      description: experience.description,
      url: `${baseUrl}/experiences/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: experience.title,
      description: experience.description,
    },
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