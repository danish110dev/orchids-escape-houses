import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://groupescapehouses.co.uk';
  const currentDate = new Date().toISOString();
  
  // Static routes with optimized priorities for AI search
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily', // Homepage changes daily
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: currentDate,
      changeFrequency: 'daily', // Properties update frequently
      priority: 0.9, // Very important for conversions
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7, // Important for trust signals
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7, // Good for content SEO
    },
    {
      url: `${baseUrl}/our-story`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/house-styles-and-features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/booking-terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Property pages - HIGH PRIORITY for conversions
  const propertyRoutes: MetadataRoute.Sitemap = [
    'brighton-manor',
    'bath-spa-retreat',
    'manchester-party-house',
  ].map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Individual properties are high value
  }));

  // Experience pages
  const experienceRoutes: MetadataRoute.Sitemap = [
    'private-chef',
    'cocktail-masterclass',
    'sip-and-paint', // Added missing experience
    'spa-treatments',
    'pamper-party',
    'yoga-class',
    'murder-mystery',
  ].map((slug) => ({
    url: `${baseUrl}/experiences/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Destination pages - HIGH PRIORITY for local SEO
  const destinationRoutes: MetadataRoute.Sitemap = [
    'brighton',
    'bath',
    'manchester',
    'london',
    'liverpool',
    'newquay',
    'york',
    'newcastle',
    'cardiff',
    'bournemouth',
    'edinburgh',
    'scottish-highlands',
    'snowdonia',
    'devon',
    'cotswolds',
    'lake-district',
    'birmingham',
    'blackpool',
    'bristol',
    'cambridge',
    'canterbury',
    'cheltenham',
    'chester',
    'durham',
    'exeter',
    'harrogate',
    'leeds',
    'margate',
    'nottingham',
    'oxford',
    'plymouth',
    'sheffield',
    'st-ives',
    'stratford-upon-avon',
    'windsor',
  ].map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Very important for location-based searches
  }));

  // Feature pages
  const featureRoutes: MetadataRoute.Sitemap = [
    'hot-tub',
    'swimming-pool',
    'indoor-swimming-pool',
    'games-room',
    'cinema-room',
    'tennis-court',
    'direct-beach-access',
    'ev-charging',
    'fishing-lake',
    'ground-floor-bedroom',
  ].map((slug) => ({
    url: `${baseUrl}/features/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // House styles pages
  const houseStyleRoutes: MetadataRoute.Sitemap = [
    'manor-houses',
    'party-houses',
    'castles',
    'country-houses',
    'stately-houses',
    'luxury-houses',
    'large-holiday-homes',
    'large-cottages',
    'luxury-cottages-with-sea-views',
    'luxury-dog-friendly-cottages',
    'unusual-and-quirky',
    'family-holidays',
  ].map((slug) => ({
    url: `${baseUrl}/house-styles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Occasions pages (with /occasions/ prefix)
  const occasionRoutes: MetadataRoute.Sitemap = [
    'hen-party-houses',
    'weddings',
    'special-celebrations',
    'weekend-breaks',
    'christmas',
    'new-year',
    'easter',
  ].map((slug) => ({
    url: `${baseUrl}/occasions/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Important for occasion-based searches
  }));

  // Direct occasion routes (without /occasions/ prefix)
  const directOccasionRoutes: MetadataRoute.Sitemap = [
    'hen-party-houses',
    'weddings',
    'special-celebrations',
    'weekend-breaks',
    'christmas',
    'new-year',
    'easter',
    'spa-treatments',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...propertyRoutes,
    ...experienceRoutes,
    ...destinationRoutes,
    ...featureRoutes,
    ...houseStyleRoutes,
    ...occasionRoutes,
    ...directOccasionRoutes,
  ];
}