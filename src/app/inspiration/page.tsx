"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UKServiceSchema from "@/components/UKServiceSchema";
import Link from "next/link";
import Script from "next/script";
import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function InspirationPage() {
  const posts = [
    {
      id: 1,
      title: "How to Plan a Stress-Free Large Group Holiday",
      excerpt: "Coordinating schedules and preferences for a large group can be challenging. Our expert tips help you plan a seamless getaway that everyone will enjoy.",
      category: "Planning Tips",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-planning-che-9704c7d1-20251018105913.jpg",
      date: "15 Jan 2025",
      slug: "large-group-holiday-planning",
    },
    {
      id: 2,
      title: "Top UK Destinations for Multi-Generational Family Breaks",
      excerpt: "From the rolling hills of the Cotswolds to the rugged coast of Cornwall, discover the best locations for a family reunion that caters to all ages.",
      category: "Destination Guides",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-women-friend-01b63e10-20251018105846.jpg",
      date: "12 Jan 2025",
      slug: "family-group-destinations-uk",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Booking Corporate Retreat Venues",
      excerpt: "Boost team morale and productivity with the perfect offsite location. Here's what to look for in a corporate retreat venue that balances work and play.",
      category: "Corporate",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-showing-split-c-189baecf-20251018105904.jpg",
      date: "8 Jan 2025",
      slug: "corporate-retreat-booking-guide",
    },
    {
      id: 4,
      title: "House Spotlight: Inside The Luxury Cotswold Manor",
      excerpt: "Take a tour of one of our most impressive properties. With space for 24, an indoor pool, and acres of private grounds, it's the pinnacle of group luxury.",
      category: "House Spotlights",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-holid-f27f8e6d-20251018105853.jpg",
      date: "5 Jan 2025",
      slug: "cotswold-manor-spotlight",
    },
    {
      id: 5,
      title: "Wedding Accommodation: Housing Your Guests in Style",
      excerpt: "Planning a destination wedding? Learn how to coordinate group accommodation that keeps your wedding party together and creates a festive atmosphere.",
      category: "Occasions",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--0e8a0dba-20251018105838.jpg",
      date: "2 Jan 2025",
      slug: "wedding-group-accommodation-guide",
    },
    {
      id: 6,
      title: "Self-Catering vs. Private Chef: What's Best for Your Group?",
      excerpt: "Whether you love cooking together or want a restaurant experience at home, we weigh up the pros and cons of different dining options for group stays.",
      category: "Planning Tips",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-hen-party-ac-2ed8f30b-20251018105832.jpg",
      date: "29 Dec 2024",
      slug: "group-dining-options-guide",
    },
  ];

  const categories = [
    "All Posts",
    "Planning Tips",
    "Destination Guides",
    "Corporate",
    "House Spotlights",
    "Occasions",
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How often do you publish new inspiration posts?",
      answer: "We publish new planning tips, destination guides, and hen party inspiration at least twice a week. Subscribe to our newsletter to get the latest posts delivered to your inbox."
    },
    {
      question: "Can I request a specific topic or destination guide?",
      answer: "Absolutely! We love hearing what our readers want to know. Contact us with your suggestions and we'll do our best to cover topics that help you plan the perfect hen weekend."
    },
    {
      question: "Are the experiences and venues you mention available to book?",
      answer: "Yes! Many of the experiences, venues, and properties featured in our inspiration posts can be booked directly through our platform or via our partner network. Look for booking links within each article."
    },
    {
      question: "Can I share your articles with my hen party group?",
      answer: "Please do! All our content is designed to be shared. Use the share buttons on each post or copy the URL to send to your group chat."
    },
    {
      question: "Do you accept guest posts or contributions?",
      answer: "We're always interested in authentic hen party stories and destination recommendations. If you have a unique experience or expert knowledge to share, get in touch with our editorial team."
    }
  ];

  return (
    <div className="min-h-screen">
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Inspiration", url: "/inspiration" }
          ]
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Inspiration
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl">
            Everything you need to plan the perfect group getaway, from luxury destination guides to expert hosting tips
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
                href={`/inspiration/${post.slug}`}
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

      {/* FAQ Section */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto">
              Everything you need to know about our planning tips and inspiration
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[var(--color-accent-gold)]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-[var(--color-bg-primary)]"
                >
                  <h3
                    className="text-lg font-semibold pr-4"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-accent-gold)" }}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-[var(--color-neutral-dark)]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[var(--color-neutral-dark)] mb-4">
              Looking for more inspiration?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Get in touch with our team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      <Script
        id="schema-inspiration-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://groupescapehouses.co.uk/inspiration/#webpage",
            "name": "Group Holiday Inspiration - Tips & Guides",
            "description": "Read our latest inspiration posts about planning group holidays, hen parties, stag dos, and UK destinations.",
            "url": "https://groupescapehouses.co.uk/inspiration",
            "isPartOf": { "@id": "https://groupescapehouses.co.uk/#website" },
            "publisher": { "@id": "https://groupescapehouses.co.uk/#organization" },
            "inLanguage": "en-GB"
          })
        }}
      />
      
      <Script
        id="schema-inspiration-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://groupescapehouses.co.uk/inspiration/#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://groupescapehouses.co.uk"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Inspiration",
                "item": "https://groupescapehouses.co.uk/inspiration"
              }
            ]
          })
        }}
      />
    </div>
  );
}
