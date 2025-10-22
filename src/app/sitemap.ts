import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://groupescapehouses.co.uk';
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/booking-terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/house-styles-and-features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Property pages
  const propertyRoutes: MetadataRoute.Sitemap = [
    'brighton-manor',
    'bath-spa-retreat',
    'manchester-party-house',
  ].map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Experience pages
  const experienceRoutes: MetadataRoute.Sitemap = [
    'private-chef',
    'cocktail-masterclass',
    'spa-treatments',
    'pamper-party',
    'yoga-class',
    'murder-mystery',
  ].map((slug) => ({
    url: `${baseUrl}/experiences/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Destination pages
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
  ].map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
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
    lastModified: new Date(),
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
    lastModified: new Date(),
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
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
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
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
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