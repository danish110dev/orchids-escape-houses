import { ChefHat, Utensils, Paintbrush, Wine, Palette, Mic2, Sparkles, Camera, Heart, Coffee, Gift, Music, PartyPopper, Flower2, Scissors } from "lucide-react";

export const experiencesData: Record<string, any> = {
  "private-chef": {
    title: "Private Chef Experience",
    duration: "3-4 hours",
    priceFrom: 65,
    groupSize: "8-24 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-a-private-ch-e336a153-20251018105040.jpg",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-priva-eb946e05-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-beautif-3f1464a0-20251024112454.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-priva-23564d70-20251024130257.jpg"
    ],
    icon: ChefHat,
    description: "Treat your group to a restaurant-quality dining experience in the comfort of your own property. Our professional chefs will arrive with all ingredients, prepare a stunning three-course meal tailored to your preferences, and handle all the clearing up. It's the perfect way to enjoy gourmet food without lifting a finger, leaving you free to focus on celebrating with your guests.",
    included: ["Professional private chef for the evening", "Three-course gourmet meal tailored to your group", "All ingredients, equipment, and serving ware", "Menu planning consultation beforehand", "Full table service and presentation", "Kitchen cleanup and washing up"],
    whatToProvide: ["Dining space and table setup", "Basic kitchen facilities (oven, hob, fridge)", "Crockery and cutlery for your group size", "Let us know about any dietary requirements in advance"],
    pricing: [{ size: "8-12 guests", price: 75 }, { size: "13-18 guests", price: 68 }, { size: "19-24 guests", price: 65 }],
    faqs: [{ question: "Can we customise the menu?", answer: "Absolutely! Our chefs will work with you to create a menu that suits your group's preferences and dietary requirements. We can accommodate vegetarian, vegan, gluten-free, and other dietary needs." }, { question: "What time does the chef arrive?", answer: "The chef typically arrives 1-2 hours before your preferred dining time to prepare. We'll coordinate the exact timing with you when booking." }, { question: "Does the price include drinks?", answer: "The price includes all food and chef service. Drinks are not included, but we can arrange wine pairing recommendations or beverage delivery services for an additional cost." }]
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
    description: "Get creative and make beautiful flower crowns for your group. Perfect Instagram moment included. Take home your handmade creations!",
    included: ["Professional florist instructor", "Fresh flowers and greenery", "All crafting materials and tools", "Step-by-step guidance", "Take-home flower crowns", "Group photo session with crowns"],
    whatToProvide: ["Table space for crafting", "Good natural lighting", "Chairs for participants", "Enthusiasm and creativity!"],
    pricing: [{ size: "8-12 guests", price: 40 }, { size: "13-16 guests", price: 37 }, { size: "17-20 guests", price: 35 }],
    faqs: [{ question: "How long do the crowns last?", answer: "Fresh flower crowns last 1-2 days with proper care. We'll provide tips to keep them looking their best!" }, { question: "Can we choose the flowers?", answer: "Yes! We can tailor the color scheme and flower types to match your group's preferences and wedding colors." }]
  },
  "cocktail-masterclass": {
    title: "Cocktail Masterclass",
    duration: "2 hours",
    priceFrom: 50,
    groupSize: "8-20 guests",
    image: "https://butlersinthebuff.co.uk/wp-content/uploads/2023/05/fun_friendly.jpg.webp",
    gallery: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/hen-party-cocktail-classes-4-e1657801576427.jpg-1760963913852.webp",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80"
    ],
    slug: "cocktail-masterclass",
    icon: Wine,
    description: "Shake things up with a professional cocktail masterclass led by an expert mixologist. Learn to create classic and contemporary cocktails while enjoying a fun, hands-on experience. Each guest will master three different cocktails, complete with professional techniques, garnishing tips, and plenty of tasting along the way. Perfect for bringing your group together with laughs, learning, and delicious drinks.",
    included: ["Professional mixologist instructor", "All spirits, mixers, and ingredients for 3 cocktails per person", "Bar equipment and glassware", "Recipe cards to take home", "Cocktail-making techniques and tips", "Fun group atmosphere with music"],
    whatToProvide: ["Kitchen or bar area with counter space", "Ice and a freezer", "Glasses if you prefer to use your own", "Designated drivers or transport arrangements"],
    pricing: [{ size: "8-12 guests", price: 55 }, { size: "13-16 guests", price: 52 }, { size: "17-20 guests", price: 50 }],
    faqs: [{ question: "What cocktails will we learn?", answer: "You'll typically learn three cocktails, which can include classics like Mojitos, Espresso Martinis, and Cosmopolitans, or we can tailor the selection to your group's preferences." }, { question: "Is the alcohol included?", answer: "Yes! All spirits, mixers, and ingredients are included in the price. We bring everything you need." }, { question: "Can non-drinkers participate?", answer: "Absolutely! We can create mocktail versions of any cocktails so everyone can join in the fun." }]
  },
  "sip-and-paint": {
    title: "Sip & Paint",
    duration: "2-3 hours",
    priceFrom: 45,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photograph-of-a-sip-a-b0921423-20251024095025.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80"
    ],
    slug: "sip-and-paint",
    icon: Palette,
    description: "Unleash your inner artist with a relaxed and fun painting session. No experience needed - our friendly instructor will guide you step-by-step to create your own masterpiece. Enjoy your favourite drinks while you paint, chat, and laugh with your group. Everyone takes home their own canvas as a unique memento of your celebration. It's creative, social, and brilliantly fun.",
    included: ["Professional art instructor", "Canvas for each guest", "All paints, brushes, and art supplies", "Aprons to protect clothing", "Step-by-step guidance to complete your painting", "Set-up and clean-up"],
    whatToProvide: ["Table space for painting", "Good lighting", "Chairs for all participants", "Drinks and snacks (we recommend prosecco!)"],
    pricing: [{ size: "8-12 guests", price: 48 }, { size: "13-16 guests", price: 47 }, { size: "17-20 guests", price: 45 }],
    faqs: [{ question: "Do we need any art experience?", answer: "Not at all! Our instructor will guide you through every step. It's designed to be fun and relaxed, not intimidating." }, { question: "What will we paint?", answer: "We can tailor the painting to your group - popular choices include landscapes, abstract designs, or even a cheeky hen-themed piece!" }, { question: "How long does it take to complete?", answer: "Most paintings are completed within 2-3 hours, but the pace is flexible based on your group's preference." }]
  },
  "hair-styling": {
    title: "Hair Styling",
    duration: "2-3 hours",
    priceFrom: 35,
    groupSize: "8-20 guests",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80"
    ],
    slug: "hair-styling",
    icon: Scissors,
    description: "Get glammed up with professional hair styling for your group. Our talented stylists will come to your property and create beautiful looks for your evening out. From elegant updos to beachy waves, bouncy blow-dries to braided styles, we'll make sure everyone looks and feels fabulous. Perfect before a big night out or special celebration dinner.",
    included: ["Professional mobile hair stylist", "Consultation for each guest", "Wash, blow-dry, and style", "Hair products and styling tools", "Touch-up tips and product recommendations", "Group discounts for larger parties"],
    whatToProvide: ["Space with mirrors and good lighting", "Access to plug sockets", "Hair washed beforehand (or let us know if you'd like wet hair styling)", "Any specific style inspiration photos"],
    pricing: [{ size: "8-12 guests", price: 40 }, { size: "13-16 guests", price: 37 }, { size: "17-20 guests", price: 35 }],
    faqs: [{ question: "How long does each person take?", answer: "Each styling typically takes 20-30 minutes, depending on the complexity. We'll schedule to ensure everyone's ready on time." }, { question: "Can we bring inspiration photos?", answer: "Yes, please do! It helps our stylists understand exactly what you're looking for." }, { question: "Do you provide hair extensions or accessories?", answer: "We can arrange extensions and accessories for an additional cost - just let us know when booking." }]
  },
  "karaoke-night": {
    title: "Karaoke Night",
    duration: "3-4 hours",
    priceFrom: 40,
    groupSize: "8-30 guests",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80"
    ],
    slug: "karaoke-night",
    icon: Mic2,
    description: "Bring the party to your property with a full karaoke setup. Belt out your favourite tunes with our professional sound system, wireless microphones, and access to thousands of songs. Our host will keep the energy high, manage the playlist, and make sure everyone gets their moment in the spotlight. From power ballads to guilty pleasure pop anthems, it's guaranteed to be a night of laughs and unforgettable performances.",
    included: ["Professional karaoke system with screen", "Two wireless microphones", "Sound system and speakers", "Access to 10,000+ songs across all genres", "Karaoke host to manage the night", "Disco lights and party atmosphere"],
    whatToProvide: ["Space for the equipment and performance area", "TV or projector screen (or we can provide one)", "Power sockets", "Your best singing voices and confidence!"],
    pricing: [{ size: "8-15 guests", price: 45 }, { size: "16-25 guests", price: 42 }, { size: "26-30 guests", price: 40 }],
    faqs: [{ question: "What if we can't sing?", answer: "That's what makes it fun! Karaoke is all about having a laugh and letting loose - no talent required." }, { question: "Can we request specific songs?", answer: "Yes! Our system has over 10,000 songs, and you can send us a wishlist beforehand to make sure your favourites are ready to go." }, { question: "Is there a host included?", answer: "Yes, our experienced host will run the evening, manage the tech, and keep the energy high so you can focus on performing!" }]
  },
  "spa-treatments": {
    title: "Spa Treatments",
    duration: "2-3 hours",
    priceFrom: 75,
    groupSize: "8-20 guests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-luxury-spa-t-15d1f1e0-20251021222805.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80"
    ],
    slug: "spa-treatments",
    icon: Sparkles,
    description: "Treat your group to ultimate relaxation with professional spa treatments at your property. Our mobile spa therapists bring everything needed to create a tranquil spa experience without leaving your accommodation. Choose from massages, facials, manicures, pedicures, and more. It's the perfect way to unwind before a big night out or simply indulge in some well-deserved pampering with your group.",
    included: ["Qualified mobile spa therapists", "All treatment products and equipment", "Massage tables, towels, and robes", "Relaxing music and aromatherapy", "Choice of treatments tailored to your group", "Set-up and clean-up"],
    whatToProvide: ["Quiet space for treatments (bedrooms work perfectly)", "Access to warm water", "Comfortable temperature in treatment rooms", "Let us know treatment preferences in advance"],
    pricing: [{ size: "8-12 guests", price: 85 }, { size: "13-16 guests", price: 80 }, { size: "17-20 guests", price: 75 }],
    faqs: [{ question: "What treatments can we choose?", answer: "Popular options include Swedish massage, back massage, express facials, manicures, pedicures, and reflexology. We'll work with you to create a spa menu for your group." }, { question: "How long is each treatment?", answer: "Treatments typically range from 30-60 minutes per person. We'll schedule a rotation so everyone gets pampered." }, { question: "Can we have multiple therapists?", answer: "Yes! For larger groups, we can bring multiple therapists so treatments happen simultaneously and everyone's finished in time." }]
  }
};

export const relatedExperiences = [
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