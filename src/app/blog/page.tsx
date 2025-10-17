import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Hen Party Ideas That Aren't the Usual Spa Day",
      excerpt: "Looking for something different? From cocktail making to life drawing, here are our favourite alternative hen party activities that your group will love.",
      category: "Hen Do Ideas",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      date: "15 Jan 2025",
      slug: "alternative-hen-party-ideas",
    },
    {
      id: 2,
      title: "The Ultimate Brighton Hen Do Guide: Where to Stay, Eat & Party",
      excerpt: "Brighton is the UK's hen party capital for a reason. Our complete guide covers the best houses, restaurants, bars, and activities for an unforgettable weekend.",
      category: "City Guides",
      image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80",
      date: "12 Jan 2025",
      slug: "brighton-hen-do-guide",
    },
    {
      id: 3,
      title: "How to Split Costs Fairly on a Hen Weekend",
      excerpt: "Money can be awkward, but it doesn't have to be. Our practical tips for managing group expenses, deposits, and add-ons without the drama.",
      category: "Planning Tips",
      image: "https://images.unsplash.com/photo-1554224311-beee460ff2ae?w=800&q=80",
      date: "8 Jan 2025",
      slug: "split-costs-hen-weekend",
    },
    {
      id: 4,
      title: "House Spotlight: Inside The Brighton Manor",
      excerpt: "Take a tour of one of our most popular properties. With space for 16, a hot tub, games room, and walking distance to the beach, it's perfect for hen parties.",
      category: "House Spotlights",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      date: "5 Jan 2025",
      slug: "brighton-manor-spotlight",
    },
    {
      id: 5,
      title: "Bath vs Brighton: Which City for Your Hen Weekend?",
      excerpt: "Can't decide between these two amazing cities? We break down the pros and cons of Bath and Brighton to help you choose the perfect destination.",
      category: "City Guides",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      date: "2 Jan 2025",
      slug: "bath-vs-brighton",
    },
    {
      id: 6,
      title: "Your Complete Hen Party Planning Checklist",
      excerpt: "From booking the house to coordinating activities, this step-by-step checklist ensures nothing gets forgotten when planning the perfect hen weekend.",
      category: "Planning Tips",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      date: "29 Dec 2024",
      slug: "hen-party-checklist",
    },
  ];

  const categories = [
    "All Posts",
    "Hen Do Ideas",
    "City Guides",
    "Planning Tips",
    "House Spotlights",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Planning Tips & Inspiration
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl">
            Everything you need to plan the perfect hen weekend, from destination guides to party ideas
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white sticky top-20 z-10 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-[var(--color-accent-sage)] text-[var(--color-accent-sage)] hover:bg-[var(--color-accent-sage)] hover:text-white transition-colors font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        background: "var(--color-accent-sage)",
                        color: "white",
                      }}
                    >
                      {post.category}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-semibold mb-3 group-hover:text-[var(--color-accent-sage)] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[var(--color-neutral-dark)] mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-dark)]">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-xl bg-[var(--color-accent-sage)] text-white font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}