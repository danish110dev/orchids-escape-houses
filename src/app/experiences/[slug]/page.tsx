"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, Calendar, MessageCircle, ChefHat, Utensils, Paintbrush, Wine, Palette, Mic2, Scissors } from "lucide-react";
import Link from "next/link";

// Experience data
const experiencesData: Record<string, any> = {
  "private-chef": {
    title: "Private Chef Experience",
    duration: "3-4 hours",
    priceFrom: 65,
    groupSize: "8-24 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
    icon: ChefHat,
    description:
      "Treat your group to a restaurant-quality dining experience in the comfort of your own property. Our professional chefs will arrive with all ingredients, prepare a stunning three-course meal tailored to your preferences, and handle all the clearing up. It's the perfect way to enjoy gourmet food without lifting a finger, leaving you free to focus on celebrating with your guests.",
    included: [
      "Professional private chef for the evening",
      "Three-course gourmet meal tailored to your group",
      "All ingredients, equipment, and serving ware",
      "Menu planning consultation beforehand",
      "Full table service and presentation",
      "Kitchen cleanup and washing up",
    ],
    whatToProvide: [
      "Dining space and table setup",
      "Basic kitchen facilities (oven, hob, fridge)",
      "Crockery and cutlery for your group size",
      "Let us know about any dietary requirements in advance",
    ],
    pricing: [
      { size: "8-12 guests", price: 75 },
      { size: "13-18 guests", price: 68 },
      { size: "19-24 guests", price: 65 },
    ],
    faqs: [
      {
        question: "Can we customise the menu?",
        answer: "Absolutely! Our chefs will work with you to create a menu that suits your group's preferences and dietary requirements. We can accommodate vegetarian, vegan, gluten-free, and other dietary needs."
      },
      {
        question: "What time does the chef arrive?",
        answer: "The chef typically arrives 1-2 hours before your preferred dining time to prepare. We'll coordinate the exact timing with you when booking."
      },
      {
        question: "Does the price include drinks?",
        answer: "The price includes all food and chef service. Drinks are not included, but we can arrange wine pairing recommendations or beverage delivery services for an additional cost."
      }
    ]
  },
  "sip-and-paint": {
    title: "Sip & Paint",
    duration: "2-3 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
    icon: Palette,
    description:
      "Unleash your inner artist with our popular Sip & Paint experience. A professional art instructor will guide your group through creating your own masterpiece while you enjoy your favourite drinks. No experience needed – just bring your enthusiasm and creativity! Perfect for a fun, relaxed afternoon or evening activity that everyone will love. Take home your unique artwork as a memento of your celebration.",
    included: [
      "Professional art instructor for 2-3 hours",
      "All painting supplies (canvas, brushes, paints, aprons)",
      "Step-by-step guidance suitable for all skill levels",
      "Individual easels and workspace setup",
      "Choice of painting theme or design",
      "Take-home canvas and memories",
    ],
    whatToProvide: [
      "Space with tables and chairs for the group",
      "Good lighting in the painting area",
      "Drinks and refreshments for your group",
      "Floor covering or drop cloths (optional, for extra protection)",
    ],
    pricing: [
      { size: "8-12 guests", price: 50 },
      { size: "13-16 guests", price: 47 },
      { size: "17-20 guests", price: 45 },
    ],
    faqs: [
      {
        question: "Can we drink alcohol during the session?",
        answer: "Yes! That's the 'Sip' part. We encourage you to have your favourite drinks on hand – prosecco, wine, or cocktails pair perfectly with painting. Just remember to drink responsibly!"
      },
      {
        question: "Do we need any painting experience?",
        answer: "Not at all! Our instructors specialise in guiding complete beginners. They'll break down each painting into simple, easy-to-follow steps. Everyone creates something they're proud of!"
      },
      {
        question: "How long does the paint take to dry?",
        answer: "Acrylic paints dry relatively quickly (1-2 hours), but we recommend letting your masterpiece dry overnight before transporting it home. We'll provide tips for safe transport."
      },
      {
        question: "What kind of paintings can we create?",
        answer: "We offer a variety of designs from landscapes and florals to abstract art and seasonal themes. You can choose from our popular designs or request something specific for your group."
      },
      {
        question: "What should we wear?",
        answer: "We provide aprons, but we recommend wearing casual clothes you don't mind getting a tiny bit of paint on, just in case! Acrylic paint washes out easily from most fabrics."
      }
    ]
  },
  "cocktail-masterclass": {
    title: "Cocktail Masterclass",
    duration: "2 hours",
    priceFrom: 50,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
    icon: Wine,
    description:
      "Learn to shake, stir, and muddle like a pro with our cocktail masterclass. An expert mixologist will teach your group how to create 3-4 classic and contemporary cocktails, sharing tips, tricks, and the stories behind each drink. Perfect for getting the party started!",
    included: [
      "Professional mixologist for 2 hours",
      "All ingredients for 3-4 cocktails per person",
      "Bar equipment and glassware",
      "Recipe cards to take home",
      "Cocktail-making techniques and tips",
      "Fun competitions and games",
    ],
    whatToProvide: [
      "Table or bar area for mixing",
      "Ice and refrigeration",
      "Kitchen access for preparation",
      "Snacks to accompany the cocktails (optional)",
    ],
    pricing: [
      { size: "8-12 guests", price: 55 },
      { size: "13-16 guests", price: 52 },
      { size: "17-20 guests", price: 50 },
    ],
    faqs: [
      {
        question: "What cocktails will we learn to make?",
        answer: "Typically 3-4 cocktails including classics like Mojitos, Espresso Martinis, or Aperol Spritz. We can tailor the selection to your group's preferences!"
      },
      {
        question: "Is this suitable for non-drinkers?",
        answer: "Yes! We can create mocktail versions of all cocktails, or run a fully alcohol-free session if preferred."
      }
    ]
  },
  "karaoke-night": {
    title: "Karaoke Night",
    duration: "3-4 hours",
    priceFrom: 40,
    groupSize: "8-30 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
    icon: Mic2,
    description:
      "Belt out your favourite tunes with our fully equipped karaoke experience. We'll set up professional sound equipment, lighting, and a vast library of songs for an unforgettable singing session. Whether your group are closet divas or just fancy a laugh, karaoke is guaranteed to get everyone involved and create brilliant memories. Perfect for hen parties who want to let loose and have a proper sing-song!",
    included: [
      "Professional karaoke setup with speakers and microphones",
      "Lighting package to set the party mood",
      "Extensive song library (thousands of tracks)",
      "Technical support and equipment setup",
      "Multiple microphones for duets and group performances",
      "Request system for your favourite songs",
    ],
    whatToProvide: [
      "Space for singing and audience seating",
      "Power outlets for equipment",
      "Your enthusiasm and favourite songs in mind",
      "Drinks to loosen those vocal cords (optional but recommended)",
    ],
    pricing: [
      { size: "8-15 guests", price: 45 },
      { size: "16-22 guests", price: 42 },
      { size: "23-30 guests", price: 40 },
    ],
    faqs: [
      {
        question: "What songs are available?",
        answer: "We have thousands of tracks from every decade and genre – from classic anthems to the latest chart hits. You can send us a playlist of must-haves before the event!"
      },
      {
        question: "Do we need to be able to sing?",
        answer: "Absolutely not! Karaoke is all about having fun, not winning X Factor. The worse you are, the more entertaining it usually is!"
      },
      {
        question: "Can we add songs that aren't in the library?",
        answer: "Yes, if you let us know in advance, we can usually source specific tracks and add them to the system before your event."
      }
    ]
  },
  "hair-styling": {
    title: "Hair Styling",
    duration: "2-3 hours",
    priceFrom: 35,
    groupSize: "6-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
    icon: Scissors,
    description:
      "Get glammed up for your big night out with our professional hair styling experience. Our talented stylists will come to your property and create stunning looks for your entire group, from elegant updos to bouncy blow-drys. Whether you want festival braids, glamorous curls, or a chic bridal party look, our team will have everyone looking and feeling fabulous. Perfect for hen parties who want to look their best without the stress of salon appointments!",
    included: [
      "Professional hair stylist team for 2-3 hours",
      "Individual styling consultation for each guest",
      "All styling tools, products, and equipment",
      "Choice of hairstyles from our portfolio",
      "Hair accessories and finishing touches",
      "Photos of finished looks for reference",
    ],
    whatToProvide: [
      "Space with good lighting and mirrors",
      "Chairs for styling stations",
      "Power outlets for styling tools",
      "Let us know preferred styles or inspiration photos in advance",
    ],
    pricing: [
      { size: "6-10 guests", price: 40 },
      { size: "11-15 guests", price: 37 },
      { size: "16-20 guests", price: 35 },
    ],
    faqs: [
      {
        question: "How long does each person's hair take?",
        answer: "Depending on hair length and style complexity, each person typically takes 15-30 minutes. We bring multiple stylists for larger groups to ensure everyone is ready on time!"
      },
      {
        question: "What styles can you create?",
        answer: "We can create anything from simple blow-drys and curls to intricate updos, braids, and festival-inspired looks. Send us inspiration photos beforehand and we'll make it happen!"
      },
      {
        question: "Do I need to wash my hair before?",
        answer: "For best results, we recommend washing your hair the night before or morning of the styling session. This gives your hair the perfect texture for styling and helps styles last longer."
      },
      {
        question: "Can you work with all hair types?",
        answer: "Absolutely! Our stylists are experienced with all hair types and textures, from fine and straight to thick, curly, and afro hair. We bring appropriate products and tools for everyone."
      }
    ]
  }
};

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const [isEnquiring, setIsEnquiring] = useState(false);
  
  const experience = experiencesData[params.slug] || experiencesData["private-chef"];
  const Icon = experience.icon;

  // Generate related experiences dynamically, excluding current one
  const allExperiences = [
    {
      title: "Cocktail Masterclass",
      duration: "2 hours",
      priceFrom: 50,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
      slug: "cocktail-masterclass",
    },
    {
      title: "Private Chef Experience",
      duration: "3-4 hours",
      priceFrom: 65,
      groupSize: "8-24 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
      slug: "private-chef",
    },
    {
      title: "Sip & Paint",
      duration: "2-3 hours",
      priceFrom: 45,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
      slug: "sip-and-paint",
    },
    {
      title: "Karaoke Night",
      duration: "3-4 hours",
      priceFrom: 40,
      groupSize: "8-30 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
      slug: "karaoke-night",
    },
    {
      title: "Hair Styling",
      duration: "2-3 hours",
      priceFrom: 35,
      groupSize: "6-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
      slug: "hair-styling",
    },
  ];

  const relatedExperiences = allExperiences
    .filter(exp => exp.slug !== params.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <div className="pt-24">
        {/* Hero Image */}
        <div className="max-w-[1400px] mx-auto px-6 mb-12">
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
            <Image 
              src={experience.image} 
              alt={experience.title} 
              fill 
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-8 h-8" />
                <h1 className="mb-0" style={{ fontFamily: "var(--font-display)" }}>
                  {experience.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  About this experience
                </h2>
                <p className="text-lg text-[var(--color-neutral-dark)] leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-md border-2 border-[var(--color-accent-gold)]">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-[var(--color-accent-gold)]" />
                  <h3 className="text-2xl font-semibold mb-0" style={{ fontFamily: "var(--font-body)" }}>
                    What's included
                  </h3>
                </div>
                <ul className="space-y-4">
                  {experience.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Provide */}
              <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  What you need to provide
                </h3>
                <ul className="space-y-4">
                  {experience.whatToProvide.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent-gold)] text-xl mt-0.5">•</span>
                      <span className="text-[var(--color-neutral-dark)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Pricing
                </h3>
                <div className="space-y-4">
                  {experience.pricing.map((tier: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--color-accent-gold)] bg-gradient-to-r from-[var(--color-bg-primary)] to-white"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[var(--color-accent-gold)]" />
                        <span className="font-medium">{tier.size}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: "var(--color-accent-gold)" }}>
                          £{tier.price}
                        </p>
                        <p className="text-xs text-[var(--color-neutral-dark)]">per person</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-neutral-dark)] mt-6">
                  All prices include materials, instructor/provider fees, and setup. Book alongside your property for the best experience.
                </p>
              </div>

              {/* FAQs */}
              {experience.faqs && experience.faqs.length > 0 && (
                <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-body)" }}>
                    Frequently Asked Questions
                  </h3>
                  <FAQAccordion faqs={experience.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-[var(--color-accent-gold)]">
                <div className="mb-6">
                  <p className="text-sm text-[var(--color-neutral-dark)] mb-2">From</p>
                  <p className="text-4xl font-bold mb-1" style={{ color: "var(--color-accent-gold)" }}>
                    £{experience.priceFrom}
                  </p>
                  <p className="text-sm text-[var(--color-neutral-dark)]">per person</p>
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-[var(--color-bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--color-accent-gold)]" />
                    <span className="text-sm">{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[var(--color-accent-gold)]" />
                    <span className="text-sm">{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--color-accent-gold)]" />
                    <span className="text-sm">Available any day of the week</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[var(--color-accent-gold)]" />
                    <span className="text-sm">All materials included</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full rounded-2xl py-6 text-base font-medium mb-4 hover:opacity-90 transition-opacity"
                  style={{
                    background: "var(--color-accent-gold)",
                    color: "white",
                  }}
                >
                  <Link href="/contact">Add to Enquiry</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 text-base font-medium border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-white"
                  asChild
                >
                  <Link href="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Link>
                </Button>

                <p className="text-xs text-center text-[var(--color-neutral-dark)] mt-6">
                  Book alongside your property for the best rates. Our team will coordinate everything for you.
                </p>
              </div>
            </div>
          </div>

          {/* Related Experiences */}
          {relatedExperiences.length > 0 && (
            <div className="mt-24">
              <h3 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
                You might also like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedExperiences.map((exp) => (
                  <ExperienceCard key={exp.slug} {...exp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}