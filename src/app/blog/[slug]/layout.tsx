import type { Metadata } from "next";
import UKServiceSchema from "@/components/UKServiceSchema";

// Blog posts data - extract to a file later
const blogPosts: Record<string, any> = {
  "alternative-hen-party-ideas": {
    title: "10 Hen Party Ideas That Aren't the Usual Spa Day",
    excerpt: "Looking for something different? From cocktail making to life drawing, here are our favourite alternative hen party activities.",
    description: "Discover 10 unique hen party ideas beyond spa days. Cocktail making, life drawing, dance workshops, private chefs & more for unforgettable celebrations.",
    date: "15 Jan 2025",
    category: "Hen Do Ideas",
  },
  "brighton-hen-do-guide": {
    title: "The Ultimate Brighton Hen Do Guide: Where to Stay, Eat & Party",
    excerpt: "Brighton is the UK's hen party capital for a reason. Our complete guide covers the best houses, restaurants, bars, and activities.",
    description: "Complete Brighton hen party guide. Best houses, restaurants, bars, activities & nightlife tips. Plan the perfect Brighton hen do with The Hen Fairy.",
    date: "12 Jan 2025",
    category: "City Guides",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://www.groupescapehouses.co.uk';
  
  const post = blogPosts[slug];
  if (!post) {
    return {
      title: "Blog Post | The Hen Fairy",
      alternates: {
        canonical: `${baseUrl}/blog/${slug}`,
      },
    };
  }

  return {
    title: `${post.title} | The Hen Fairy`,
    description: post.description || post.excerpt,
    keywords: `${post.category.toLowerCase()}, hen party planning, group accommodation, UK celebrations`,
    authors: [{ name: 'The Hen Fairy' }],
    creator: 'The Hen Fairy',
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      url: `${baseUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  };
}

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function BlogPostLayout({
  children,
  params,
}: BlogPostLayoutProps) {
  const { slug } = await params;
  const baseUrl = 'https://www.groupescapehouses.co.uk';
  const post = blogPosts[slug];

  if (!post) {
    return children;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "The Hen Fairy",
      url: baseUrl
    },
    publisher: {
      "@id": `${baseUrl}/#organization`
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`
    }
  };

  return (
    <>
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${slug}` }
          ]
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}