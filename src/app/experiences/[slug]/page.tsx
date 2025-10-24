"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, Calendar, MessageCircle, ChefHat, Utensils, Paintbrush, Wine, Palette, Mic2, Sparkles, Camera, Heart, Coffee, Gift, Music, PartyPopper, Flower2, Scissors } from "lucide-react";
import Link from "next/link";

// Experience data
const experiencesData: Record<string, any> = {
  "private-chef": {
    title: "Private Chef Experience",
    duration: "3-4 hours",
    priceFrom: 65,
    groupSize: "8-24 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-priva-eb946e05-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-beautif-3f1464a0-20251024112454.jpg"
    ],
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
  "butlers-in-the-buff": {
    title: "Butlers in the Buff",
    duration: "2-3 hours",
    priceFrom: 55,
    groupSize: "8-20 guests",
    image: "https://butlersinthebuff.com.au/wp-content/uploads/2023/10/543843566-buff-butler-gallery-40.jpg",
    gallery: [
      "https://butlersinthebuff.com.au/wp-content/uploads/2023/05/games_included.jpg.webp",
      "https://butlersinthebuff.com.au/wp-content/uploads/2023/05/buff-butler-gallery-7.jpg.webp",
      "https://butlersinthebuff.com.au/wp-content/uploads/2023/05/buff-butler-gallery-23.jpg.webp",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-hands-2c8eecb5-20251024121343.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-male--f79d9b5c-20251024121343.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-butle-63e769c4-20251024121606.jpg"
    ],
    icon: Sparkles,
    description:
      "Add a cheeky twist to your celebration with our professional Butlers in the Buff! These handsome, polite gentlemen will serve drinks, canapés, and plenty of laughs while wearing nothing but an apron and bow tie. It's the ultimate hen party experience that's tasteful, fun, and guaranteed to create hilarious memories. Perfect for getting the party started!",
    included: [
      "Professional butler(s) in signature apron and bow tie",
      "Drinks and canapé service throughout",
      "Party games and entertainment",
      "Photo opportunities with the group",
      "Professional, friendly, and fun attitude",
      "Memories that'll last forever!",
    ],
    whatToProvide: [
      "Drinks and canapés for serving",
      "Space for mingling and serving",
      "Cameras ready for photos!",
      "Open-minded fun attitude",
    ],
    pricing: [
      { size: "8-15 guests", price: 60 },
      { size: "16-20 guests", price: 55 },
    ],
    faqs: [
      {
        question: "How revealing is the outfit?",
        answer: "Our butlers wear a collar, bow tie, cuffs, and a front apron. It's cheeky and fun but always tasteful and professional."
      },
      {
        question: "What do the butlers do?",
        answer: "They'll serve drinks, canapés, host games, pose for photos, and keep the party atmosphere fun and lively. They're professional entertainers first and foremost!"
      }
    ]
  },
  "mobile-beauty-bar": {
    title: "Mobile Beauty Bar",
    duration: "2-3 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-mobile--5f90d17a-20251024112456.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-beauty--59094aa7-20251024112454.jpg"
    ],
    icon: Sparkles,
    description:
      "Transform your venue into a luxurious beauty salon with our mobile beauty bar. Our professional beauty therapists bring everything needed for mini makeovers, nail treatments, and pampering sessions. Perfect for getting glammed up together before a night out or as a relaxing afternoon activity.",
    included: [
      "Professional beauty therapists",
      "Mini facials and skin treatments",
      "Express manicures or nail art",
      "Make-up touch-ups and advice",
      "All products and equipment",
      "Relaxing pamper atmosphere",
    ],
    whatToProvide: [
      "Tables and chairs for beauty stations",
      "Good lighting in treatment area",
      "Power outlets for equipment",
      "Towels for treatments",
    ],
    pricing: [
      { size: "8-12 guests", price: 50 },
      { size: "13-16 guests", price: 47 },
      { size: "17-20 guests", price: 45 },
    ],
    faqs: [
      {
        question: "What treatments are available?",
        answer: "Mini facials, express manicures, nail art, make-up application, and skin consultations. Each person typically receives 2-3 mini treatments."
      },
      {
        question: "How long does each person get?",
        answer: "Each guest receives approximately 20-30 minutes of pampering. We rotate through the group to ensure everyone is treated."
      }
    ]
  },
  "pamper-party-package": {
    title: "Pamper Party Package",
    duration: "3-4 hours",
    priceFrom: 65,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-pamper-party-b3bca2c7-20251018123229.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-spa-tre-e0b84486-20251024112455.jpg"
    ],
    icon: Heart,
    description:
      "The ultimate pampering experience! This package combines multiple treatments for a full afternoon of indulgence. Enjoy massages, facials, manicures, and more. Perfect for a relaxing hen party or recovery session after a night out. Our mobile therapists bring the spa to you!",
    included: [
      "Multiple professional therapists",
      "Choice of 2-3 treatments per person",
      "Mini massages, facials, manicures, or pedicures",
      "All spa products and equipment",
      "Relaxing music and ambiance setup",
      "Refreshments guidance",
    ],
    whatToProvide: [
      "Quiet, comfortable space",
      "Seating and reclining areas",
      "Towels and robes (optional)",
      "Background music system",
    ],
    pricing: [
      { size: "8-12 guests", price: 70 },
      { size: "13-16 guests", price: 67 },
      { size: "17-20 guests", price: 65 },
    ],
    faqs: [
      {
        question: "What's included in the package?",
        answer: "Each guest chooses from mini massage, facial, manicure, or pedicure treatments. The package includes 2-3 treatments per person over 3-4 hours."
      },
      {
        question: "Can we customize the treatments?",
        answer: "Yes! We'll work with you beforehand to understand preferences and create a schedule that works for your group."
      }
    ]
  },
  "personalised-robes": {
    title: "Personalised Robes",
    duration: "Delivered before arrival",
    priceFrom: 25,
    groupSize: "Any size",
    image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-persona-2842c40c-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-close-u-4f4b8465-20251024112456.jpg"
    ],
    icon: Gift,
    description:
      "Make your hen weekend extra special with personalized robes for the whole group! Each robe is embroidered with names or fun titles. Perfect for photos, getting ready together, and as memorable keepsakes. Available in various colors and styles to match your hen party theme.",
    included: [
      "Soft, luxury robes for each guest",
      "Personalized embroidery (name or nickname)",
      "Choice of colors and styles",
      "Delivered before your arrival",
      "Gift wrapping option available",
      "Keepsake to take home",
    ],
    whatToProvide: [
      "Guest names and preferred titles",
      "Color preferences",
      "Delivery address and date",
      "Sizes for each person",
    ],
    pricing: [
      { size: "Per robe", price: 25 },
    ],
    faqs: [
      {
        question: "How long does delivery take?",
        answer: "We need 2-3 weeks' notice for personalization. We can rush orders for an additional fee with at least 1 week's notice."
      },
      {
        question: "What can we have embroidered?",
        answer: "Names, nicknames, or fun titles like 'Bride Tribe', 'Maid of Honor', etc. Up to 15 characters per robe."
      }
    ]
  },
  "prosecco-reception": {
    title: "Prosecco Reception",
    duration: "1-2 hours",
    priceFrom: 15,
    groupSize: "Any size",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-prosecc-497946e6-20251024112454.jpg"
    ],
    icon: Wine,
    description:
      "Start your celebration in style with a prosecco reception! We'll deliver chilled prosecco, elegant glasses, and all the extras needed for a sophisticated welcome. Perfect for kicking off your hen weekend or celebrating arrival at your property.",
    included: [
      "Chilled prosecco bottles (calculated for group)",
      "Elegant prosecco flutes or coupes",
      "Fresh fruit garnishes (strawberries, raspberries)",
      "Ice buckets and napkins",
      "Delivery and setup at your property",
      "Collection of glassware after event",
    ],
    whatToProvide: [
      "Fridge space for chilling",
      "Table or bar area for setup",
      "Your excited group!",
    ],
    pricing: [
      { size: "Per person", price: 15 },
    ],
    faqs: [
      {
        question: "How much prosecco is included?",
        answer: "Approximately 1-1.5 glasses per person (150-200ml). We can provide additional bottles at cost price."
      },
      {
        question: "Can we upgrade to champagne?",
        answer: "Yes! We can provide champagne instead for an additional cost. Contact us for pricing."
      }
    ]
  },
  "afternoon-tea": {
    title: "Afternoon Tea",
    duration: "2 hours",
    priceFrom: 30,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-traditi-02d702c5-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-2ebb58a2-20251024112456.jpg"
    ],
    icon: Coffee,
    description:
      "Enjoy a delightful afternoon tea delivered to your property. Featuring delicious finger sandwiches, freshly baked scones with jam and cream, and an assortment of sweet treats. A quintessentially British experience perfect for a sophisticated hen celebration!",
    included: [
      "Finger sandwiches (various fillings)",
      "Freshly baked scones with jam and clotted cream",
      "Selection of cakes and pastries",
      "Tea, coffee, and soft drinks",
      "China tea sets or elegant disposable ware",
      "Setup and presentation",
    ],
    whatToProvide: [
      "Dining space and seating",
      "Table setup for afternoon tea service",
      "Refrigeration if needed",
    ],
    pricing: [
      { size: "8-12 guests", price: 35 },
      { size: "13-16 guests", price: 32 },
      { size: "17-20 guests", price: 30 },
    ],
    faqs: [
      {
        question: "Can we add prosecco?",
        answer: "Yes! We offer an upgrade to include prosecco or champagne for an additional £10-15 per person."
      },
      {
        question: "What about dietary requirements?",
        answer: "We can cater for vegetarian, vegan, gluten-free, and other dietary needs. Just let us know when booking."
      }
    ]
  },
  "bbq-catering": {
    title: "BBQ Catering",
    duration: "3-4 hours",
    priceFrom: 25,
    groupSize: "10-30 guests",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-chef-gr-a9661c49-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-bbq-foo-2803659b-20251024112455.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-f38980b2-20251024112457.jpg"
    ],
    icon: Utensils,
    description:
      "Sizzling BBQ brought to you! Our catering team sets up a full BBQ spread at your property with delicious grilled meats, veggie options, sides, and salads. Perfect for a summer hen party or outdoor celebration. Includes setup, cooking, serving, and cleanup.",
    included: [
      "Professional BBQ chef and server",
      "Selection of meats (burgers, sausages, chicken)",
      "Vegetarian and vegan options",
      "Fresh salads and side dishes",
      "Buns, condiments, and sauces",
      "All equipment, setup, and cleanup",
    ],
    whatToProvide: [
      "Outdoor space for BBQ (garden, patio)",
      "Tables and seating for dining",
      "Plates and cutlery (or we can provide)",
    ],
    pricing: [
      { size: "10-15 guests", price: 30 },
      { size: "16-22 guests", price: 27 },
      { size: "23-30 guests", price: 25 },
    ],
    faqs: [
      {
        question: "What if it rains?",
        answer: "We can BBQ under cover if you have a gazebo or covered area. For indoor venues, we can arrange alternative catering."
      },
      {
        question: "What's on the menu?",
        answer: "Typically burgers, sausages, chicken, halloumi, salads, coleslaw, and bread. We can customize the menu to your preferences!"
      }
    ]
  },
  "pizza-making-class": {
    title: "Pizza Making Class",
    duration: "2-3 hours",
    priceFrom: 40,
    groupSize: "8-16 guests",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-hands-s-220d515e-20251024112453.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-freshly-c80c7cd1-20251024112453.jpg"
    ],
    icon: ChefHat,
    description:
      "Get hands-on and create your own delicious pizzas! A professional pizza chef teaches you dough-making, sauce preparation, and topping techniques. Then enjoy eating your creations together. Fun, interactive, and delicious!",
    included: [
      "Professional pizza chef instructor",
      "All ingredients (flour, toppings, cheese, sauce)",
      "Pizza-making equipment and tools",
      "Dough preparation demonstration",
      "Individual pizzas for each guest",
      "Cooking and eating together",
    ],
    whatToProvide: [
      "Kitchen with oven access",
      "Work surfaces for dough preparation",
      "Dining area for eating pizzas",
      "Aprons (optional)",
    ],
    pricing: [
      { size: "8-12 guests", price: 45 },
      { size: "13-16 guests", price: 40 },
    ],
    faqs: [
      {
        question: "Do we need cooking experience?",
        answer: "Not at all! The chef guides you through every step. It's all about having fun and getting creative with toppings!"
      },
      {
        question: "What toppings are available?",
        answer: "A wide selection including meats, vegetables, and cheeses. We can accommodate dietary requirements and preferences."
      }
    ]
  },
  "bottomless-brunch": {
    title: "Bottomless Brunch",
    duration: "2 hours",
    priceFrom: 35,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-bottoml-fc09e26b-20251024112456.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-mimosas-99c33b58-20251024112455.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-68f2d5cf-20251024112456.jpg"
    ],
    icon: Coffee,
    description:
      "The perfect way to start your celebration! Enjoy unlimited prosecco, mimosas, or cocktails alongside a delicious brunch spread. Delivered and served at your property for a stress-free morning of indulgence.",
    included: [
      "2 hours of unlimited prosecco or mimosas",
      "Full brunch spread (pastries, eggs, bacon, fruits)",
      "Servers for drinks and food",
      "Juice, tea, and coffee",
      "Setup and cleanup",
    ],
    whatToProvide: [
      "Dining space and tables",
      "Plates and cutlery (or we can provide)",
      "Ready appetites!",
    ],
    pricing: [
      { size: "8-12 guests", price: 40 },
      { size: "13-16 guests", price: 37 },
      { size: "17-20 guests", price: 35 },
    ],
    faqs: [
      {
        question: "Is it really unlimited drinks?",
        answer: "Yes! For the full 2 hours. We serve responsibly and want everyone to have a great time safely."
      },
      {
        question: "What's included in the food?",
        answer: "Pastries, eggs, bacon, sausages, fruits, toast, and condiments. We can adapt for dietary requirements."
      }
    ]
  },
  "gin-tasting": {
    title: "Gin Tasting",
    duration: "1.5-2 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-gin-tas-252ece50-20251024112544.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-gin-exp-42a06db0-20251024112545.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-96800ca2-20251024112545.jpg"
    ],
    icon: Wine,
    description:
      "Discover the world of craft gin with our guided tasting experience. Sample 5-6 premium gins, learn about botanicals and production, and find your perfect serve. Perfect for gin lovers!",
    included: [
      "Professional gin expert host",
      "5-6 premium gin tastings",
      "Tonic pairings and garnishes",
      "Botanical education session",
      "Tasting notes and recommendations",
      "Recipe cards for favorite serves",
    ],
    whatToProvide: [
      "Table space for tasting setup",
      "Glasses (or we can provide)",
      "Ice and refrigeration",
    ],
    pricing: [
      { size: "8-12 guests", price: 50 },
      { size: "13-16 guests", price: 47 },
      { size: "17-20 guests", price: 45 },
    ],
    faqs: [
      {
        question: "Which gins will we taste?",
        answer: "We feature a mix of classic and craft gins from UK distilleries. We can tailor the selection to your preferences!"
      },
      {
        question: "How much gin do we drink?",
        answer: "Each tasting is approximately 25ml, totaling about 1.5 drinks worth over the session. It's about savoring, not getting drunk!"
      }
    ]
  },
  "wine-tasting": {
    title: "Wine Tasting",
    duration: "1.5-2 hours",
    priceFrom: 40,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-wine-ta-53b9a52e-20251024112544.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-sommeli-49e9de23-20251024112544.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-elegant-62888f9b-20251024112544.jpg"
    ],
    icon: Wine,
    description:
      "Explore wines from around the world with a professional sommelier. Taste 5-6 wines, learn about regions and grapes, and discover what you love. Sophisticated and fun!",
    included: [
      "Professional sommelier guide",
      "5-6 wine tastings (reds, whites, rosé)",
      "Tasting notes and pairing advice",
      "Cheese and crackers to accompany",
      "Wine education and fun facts",
      "Recommendations for future purchases",
    ],
    whatToProvide: [
      "Table space for tasting",
      "Wine glasses (or we can provide)",
      "Water for palate cleansing",
    ],
    pricing: [
      { size: "8-12 guests", price: 45 },
      { size: "13-16 guests", price: 42 },
      { size: "17-20 guests", price: 40 },
    ],
    faqs: [
      {
        question: "What wines will we try?",
        answer: "A curated selection from different regions and styles. We typically include sparkling, white, rosé, and red wines."
      },
      {
        question: "Is food included?",
        answer: "Yes, we provide cheese, crackers, and accompaniments to complement the wines."
      }
    ]
  },
  "games-activities-pack": {
    title: "Games & Activities Pack",
    duration: "All weekend",
    priceFrom: 20,
    groupSize: "Any size",
    image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-hen-par-91c7762f-20251024112547.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-cdb32043-20251024112545.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-hen-par-e7234a31-20251024112544.jpg"
    ],
    icon: PartyPopper,
    description:
      "Keep the fun going all weekend with our curated games and activities pack! Includes hen party games, challenges, props, and entertainment to keep everyone laughing. Delivered to your property.",
    included: [
      "Hen party game cards and challenges",
      "Props and accessories",
      "Truth or dare cards",
      "Drinking games (optional)",
      "Photo booth props",
      "Activity ideas and suggestions",
    ],
    whatToProvide: [
      "Space to play and have fun",
      "Your sense of humor",
      "Camera for capturing moments",
    ],
    pricing: [
      { size: "Per pack", price: 20 },
    ],
    faqs: [
      {
        question: "What's in the pack?",
        answer: "A curated selection of 10-15 different games, challenges, props, and activities. Perfect for a full weekend of entertainment!"
      },
      {
        question: "Are the games appropriate?",
        answer: "We offer different pack styles from tame to cheeky. Choose what suits your group's vibe!"
      }
    ]
  },
  "decorations-balloons": {
    title: "Decorations & Balloons",
    duration: "Setup before arrival",
    priceFrom: 50,
    groupSize: "Any size",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-balloon-bbe753a4-20251024112544.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-party-r-a98e5dcf-20251024112629.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-decorat-fefb43ff-20251024112629.jpg"
    ],
    icon: PartyPopper,
    description:
      "Transform your property into a party paradise! We'll set up beautiful decorations, balloon displays, banners, and party supplies before you arrive. Choose from our themed packages or create a custom look.",
    included: [
      "Balloon arrangements and arches",
      "Banners and bunting",
      "Table decorations",
      "Photo backdrop setup",
      "Setup before your arrival",
      "Collection after your stay",
    ],
    whatToProvide: [
      "Access to property for setup",
      "Space preferences for decorations",
      "Color scheme or theme preferences",
    ],
    pricing: [
      { size: "Basic package", price: 50 },
      { size: "Standard package", price: 85 },
      { size: "Premium package", price: 150 },
    ],
    faqs: [
      {
        question: "Can we customize colors and themes?",
        answer: "Absolutely! We'll work with you to create the perfect look based on your color preferences and party theme."
      },
      {
        question: "When is setup done?",
        answer: "We coordinate with the property to set up on your arrival day before check-in time, so everything is ready when you arrive!"
      }
    ]
  },
  "hair-styling": {
    title: "Hair Styling",
    duration: "2-3 hours",
    priceFrom: 35,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-hair-st-adf721fe-20251024112629.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-4762c97e-20251024112628.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-mobile--9e9ed63c-20251024112629.jpg"
    ],
    icon: Scissors,
    description:
      "Get glammed up with professional hair styling for your entire group. Our mobile hair stylists bring salon-quality services to your door, creating gorgeous hairstyles perfect for your celebration. From elegant updos to beachy waves, bouncy blowouts to intricate braids, we'll make sure everyone looks picture-perfect.",
    included: [
      "Professional mobile hair stylist",
      "Individual consultation for each guest",
      "Choice of styling (updos, curls, braids, blowouts)",
      "All styling tools and products provided",
      "Touch-up tips and hairspray for the day",
      "Group photo session after styling",
    ],
    whatToProvide: [
      "Space with good lighting and mirrors",
      "Chairs for styling area",
      "Power outlets for styling tools",
      "Hair washed and dried beforehand (optional)",
    ],
    pricing: [
      { size: "8-12 guests", price: 40 },
      { size: "13-16 guests", price: 37 },
      { size: "17-20 guests", price: 35 },
    ],
    faqs: [
      {
        question: "Should we wash our hair before the stylist arrives?",
        answer: "Clean, dry hair works best for most styles. However, the stylist can work with damp or day-old hair too. We'll provide guidance based on your chosen styles when you book."
      },
      {
        question: "How long does each person take?",
        answer: "Simple styles take 15-20 minutes, while intricate updos or braids can take 30-40 minutes per person. We'll schedule enough time for everyone based on your chosen styles."
      },
      {
        question: "Can we try different styles?",
        answer: "Yes! Each guest can choose their preferred style. We recommend deciding in advance to make the most of your session time."
      }
    ]
  },
  "sip-and-paint": {
    title: "Sip & Paint",
    duration: "2-3 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-p-27b172b0-20251024112629.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-complet-e0ce6a07-20251024112629.jpg"
    ],
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
    image: "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/fun_friendly.jpg.webp",
    gallery: [
      "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/bitb_cocktail_shaking.jpg.webp",
      "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/great_tasting_cocktails.jpg.webp",
      "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/games_included.jpg.webp"
    ],
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
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-s-d368537d-20251024112629.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-karaoke-d1eb945a-20251024112712.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-woman-s-a4bccd8c-20251024112712.jpg"
    ],
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
  "spa-treatments": {
    title: "Spa Treatments",
    duration: "2-3 hours",
    priceFrom: 75,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-15d1f1e0-20251021222805.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-spa-the-d886efae-20251024112712.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-facial--d2f444fe-20251024112712.jpg"
    ],
    icon: Sparkles,
    description:
      "Mobile therapists bring massages, facials, and pamper sessions straight to you. Bliss without leaving the house. Perfect for a relaxing afternoon or recovery session.",
    included: [
      "Professional mobile therapists",
      "Choice of treatments (massage, facial, manicure)",
      "All equipment and products",
      "Relaxing music and ambiance",
      "Treatment consultation",
      "Take-home aftercare advice",
    ],
    whatToProvide: [
      "Quiet space for treatments",
      "Comfortable seating or massage area",
      "Towels and robes (optional)",
      "Relaxing atmosphere",
    ],
    pricing: [
      { size: "8-12 guests", price: 80 },
      { size: "13-16 guests", price: 77 },
      { size: "17-20 guests", price: 75 },
    ],
    faqs: [
      {
        question: "What treatments are available?",
        answer: "We offer massages (back, shoulder, full body), facials, manicures, pedicures, and more. You can mix and match treatments for your group."
      },
      {
        question: "How long is each treatment?",
        answer: "Individual treatments typically last 30-45 minutes. We'll schedule the session to accommodate your entire group."
      }
    ]
  },
  "yoga-session": {
    title: "Yoga & Pilates Classes",
    duration: "1.5-2 hours",
    priceFrom: 40,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-group-yoga-c-bd43fc48-20251021222800.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-y-d9dc8ad2-20251024112705.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-yoga-in-463cc609-20251024112712.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-women-i-110aa8da-20251024112711.jpg"
    ],
    icon: Heart,
    description:
      "Flow into the weekend with a private group class led by a professional instructor. Ideal for setting a calm, happy tone. Perfect for a morning or recovery session.",
    included: [
      "Professional yoga/pilates instructor",
      "Mats and equipment provided",
      "Tailored session for all fitness levels",
      "Relaxation and breathing exercises",
      "Post-class refreshments guidance",
      "Group photo opportunity",
    ],
    whatToProvide: [
      "Large open space",
      "Good ventilation",
      "Water for participants",
      "Comfortable workout clothes",
    ],
    pricing: [
      { size: "8-12 guests", price: 45 },
      { size: "13-16 guests", price: 42 },
      { size: "17-20 guests", price: 40 },
    ],
    faqs: [
      {
        question: "Do we need yoga experience?",
        answer: "Not at all! Our instructors tailor the class to your group's ability level, from complete beginners to experienced yogis."
      },
      {
        question: "What should we wear?",
        answer: "Comfortable, stretchy clothing that allows movement. We recommend leggings and a fitted top."
      }
    ]
  },
  "life-drawing": {
    title: "Life Drawing",
    duration: "2 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://butlersinthebuff.co.uk/wp-content/uploads/2022/12/life-drawing7-276x267.png",
    gallery: [
      "https://butlersinthebuff.co.uk/wp-content/uploads/2022/12/life-drawing1-400x267.jpg",
      "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/bitb_service1.jpg.webp",
      "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/buff-butler-gallery-7.jpg.webp"
    ],
    icon: Paintbrush,
    description:
      "Add some giggles with a classy-but-fun experience that everyone will remember. Professional life drawing session with a cheeky twist!",
    included: [
      "Professional art instructor",
      "Life drawing model",
      "All art supplies (paper, charcoal, pencils)",
      "Step-by-step guidance",
      "Take-home artwork",
      "Lots of laughter!",
    ],
    whatToProvide: [
      "Space with good lighting",
      "Tables or easels for drawing",
      "Chairs for participants",
      "Open-minded attitude!",
    ],
    pricing: [
      { size: "8-12 guests", price: 50 },
      { size: "13-16 guests", price: 47 },
      { size: "17-20 guests", price: 45 },
    ],
    faqs: [
      {
        question: "Do we need drawing experience?",
        answer: "Absolutely not! This is all about fun and laughter. The instructor will guide you through basic techniques."
      },
      {
        question: "What should we expect?",
        answer: "A professional, fun atmosphere with a cheeky model. It's tasteful but guaranteed to create hilarious memories!"
      }
    ]
  },
  "flower-crown-making": {
    title: "Flower Crown Making",
    duration: "1.5-2 hours",
    priceFrom: 35,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-women-m-ae355045-20251024112745.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-beautif-6e71a563-20251024112747.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-c6f54c3e-20251024112747.jpg"
    ],
    icon: Flower2,
    description:
      "Get creative and make beautiful flower crowns for your group. Perfect Instagram moment included. Take home your handmade creations!",
    included: [
      "Professional florist instructor",
      "Fresh flowers and greenery",
      "All crafting materials and tools",
      "Step-by-step guidance",
      "Take-home flower crowns",
      "Group photo session with crowns",
    ],
    whatToProvide: [
      "Table space for crafting",
      "Good natural lighting",
      "Chairs for participants",
      "Enthusiasm and creativity!",
    ],
    pricing: [
      { size: "8-12 guests", price: 40 },
      { size: "13-16 guests", price: 37 },
      { size: "17-20 guests", price: 35 },
    ],
    faqs: [
      {
        question: "How long do the crowns last?",
        answer: "Fresh flower crowns last 1-2 days with proper care. We'll provide tips to keep them looking their best!"
      },
      {
        question: "Can we choose the flowers?",
        answer: "Yes! We can tailor the color scheme and flower types to match your group's preferences and wedding colors."
      }
    ]
  },
  "dance-class": {
    title: "Dance Class",
    duration: "1.5-2 hours",
    priceFrom: 40,
    groupSize: "8-25 guests",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-dance-i-08b3f3a5-20251024112745.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-o-7063e1b4-20251024112742.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-dance-c-480deef0-20251024112745.jpg"
    ],
    icon: Music,
    description:
      "Learn a choreographed routine with your group. From hip-hop to burlesque, we'll get everyone moving. Perfect for active groups!",
    included: [
      "Professional dance instructor",
      "Choreographed routine tailored to your group",
      "Music and sound system",
      "Step-by-step breakdown",
      "Final performance video",
      "Lots of fun and energy!",
    ],
    whatToProvide: [
      "Large open space for dancing",
      "Good flooring (not carpet)",
      "Power outlet for sound system",
      "Comfortable clothing and trainers",
    ],
    pricing: [
      { size: "8-15 guests", price: 45 },
      { size: "16-20 guests", price: 42 },
      { size: "21-25 guests", price: 40 },
    ],
    faqs: [
      {
        question: "What dance styles are available?",
        answer: "We offer everything from hip-hop and street dance to burlesque, salsa, and even Spice Girls routines! Choose what suits your group."
      },
      {
        question: "Do we need dance experience?",
        answer: "Not at all! The instructor will adapt the routine to your group's ability. It's all about having fun!"
      }
    ]
  },
  "photography-package": {
    title: "Photography Package",
    duration: "2-3 hours",
    priceFrom: 150,
    groupSize: "Any size",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-photogr-1ceb4c7a-20251024112746.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-group-p-8e93c1f7-20251024112747.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-profess-092b6919-20251024112745.jpg"
    ],
    icon: Camera,
    description:
      "Capture your special weekend with a professional photographer. Candid moments and group shots you'll treasure forever.",
    included: [
      "Professional photographer for 2-3 hours",
      "Candid and posed shots",
      "Edited digital images (100-200 photos)",
      "Online gallery for sharing",
      "Print rights included",
      "Fast turnaround (7-14 days)",
    ],
    whatToProvide: [
      "Your beautiful group!",
      "Location ideas (indoor/outdoor)",
      "Willingness to have fun on camera",
      "Any specific shots you'd like",
    ],
    pricing: [
      { size: "Any group size", price: 150 },
    ],
    faqs: [
      {
        question: "How many photos do we receive?",
        answer: "You'll receive 100-200 professionally edited digital images, depending on the session length. All photos come with print rights."
      },
      {
        question: "Can we have both candid and posed shots?",
        answer: "Absolutely! The photographer will capture both natural moments and organize group photos to ensure you get a great mix."
      }
    ]
  },
  "make-up-artist": {
    title: "Make-up Artist",
    duration: "2-3 hours",
    priceFrom: 40,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-makeup--3bdaf416-20251024112746.jpg"
    ],
    icon: Sparkles,
    description:
      "Professional make-up application for your entire group. From natural glam to full glam, look your absolute best!",
    included: [
      "Professional make-up artist",
      "Individual consultation for each guest",
      "High-quality products and tools",
      "Choice of look (natural, glam, dramatic)",
      "Lashes application (if desired)",
      "Touch-up tips for the day",
    ],
    whatToProvide: [
      "Well-lit space with mirrors",
      "Chairs for make-up area",
      "Clean faces (moisturized)",
      "Any specific product preferences",
    ],
    pricing: [
      { size: "8-12 guests", price: 45 },
      { size: "13-16 guests", price: 42 },
      { size: "17-20 guests", price: 40 },
    ],
    faqs: [
      {
        question: "How long does each person take?",
        answer: "Natural looks take 20-30 minutes, while full glam can take 40-45 minutes per person. We'll schedule accordingly."
      },
      {
        question: "What should we do before the artist arrives?",
        answer: "Arrive with clean, moisturized skin. Remove any existing make-up beforehand."
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
      title: "Hair Styling",
      duration: "2-3 hours",
      priceFrom: 35,
      groupSize: "8-20 guests",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      slug: "hair-styling",
    },
    {
      title: "Karaoke Night",
      duration: "3-4 hours",
      priceFrom: 40,
      groupSize: "8-30 guests",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      slug: "karaoke-night",
    },
    {
      title: "Spa Treatments",
      duration: "2-3 hours",
      priceFrom: 75,
      groupSize: "8-20 guests",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-15d1f1e0-20251021222805.jpg",
      slug: "spa-treatments",
    },
  ];

  const relatedExperiences = allExperiences
    .filter(exp => exp.slug !== params.slug)
    .slice(0, 3);

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
              className="object-contain bg-gray-100" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Icon className="w-8 h-8" />
                </div>
                <h1 className="mb-0 drop-shadow-lg text-white" style={{ fontFamily: "var(--font-display)", color: "white" }}>
                  {experience.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-6 text-lg drop-shadow-md text-white">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span className="text-white">{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="text-white">{experience.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {experience.gallery && experience.gallery.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {experience.gallery.map((img: string, index: number) => (
                <div key={index} className="relative h-[200px] md:h-[280px] rounded-xl overflow-hidden">
                  <Image 
                    src={img} 
                    alt={`${experience.title} - Image ${index + 1}`}
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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