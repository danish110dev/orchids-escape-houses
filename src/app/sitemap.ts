import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://groupescapehouses.co.uk';
  const currentDate = new Date();

  // Static routes
  const staticRoutes = [
    '',
    '/properties',
    '/experiences',
    '/destinations',
    '/contact',
    '/how-it-works',
    '/reviews',
    '/our-story',
    '/privacy',
    '/terms',
    '/booking-terms',
    '/house-styles-and-features',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Property pages
  const properties = [
    'brighton-manor',
    'bath-spa-retreat',
    'manchester-party-house',
  ].map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Experience pages
  const experiences = [
    'private-chef',
    'cocktail-masterclass',
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

  // Destination pages
  const destinations = [
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
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Feature pages
  const features = [
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
  const houseStyles = [
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

  // Occasions pages
  const occasions = [
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
    priority: 0.6,
  }));

  // Direct occasion routes (also accessible without /occasions/ prefix)
  const directOccasions = [
    'hen-party-houses',
    'weddings',
    'special-celebrations',
    'weekend-breaks',
    'christmas',
    'new-year',
    'easter',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Additional pages
  const additionalPages = [
    '/spa-treatments',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...properties,
    ...experiences,
    ...destinations,
    ...features,
    ...houseStyles,
    ...occasions,
    ...directOccasions,
    ...additionalPages,
  ];
}
