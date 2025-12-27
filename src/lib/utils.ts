import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PLACEHOLDER_IMAGE = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/elegant-luxury-property-placeholder-imag-83731ee8-20251207154036.jpg';

export function validateImageUrl(url: string, title?: string): string {
  if (!url || url === '/placeholder-property.jpg' || url === '/placeholder.jpg' || url.startsWith('/images/')) {
    return PLACEHOLDER_IMAGE;
  }
  
  const blockedDomains = ['gstatic.com', 'google.com/images', 'googleusercontent.com', 'londonbay.com', 'propertista.co.uk'];
  if (blockedDomains.some(domain => url.includes(domain))) {
    return PLACEHOLDER_IMAGE;
  }
  
  const hasImageExtension = /\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(url);
  const isImageCDN = 
    url.includes('supabase.co/storage') ||
    url.includes('unsplash.com') ||
    url.includes('fal.media');
  
  if (!hasImageExtension && !isImageCDN) {
    return PLACEHOLDER_IMAGE;
  }
  
  return url;
}
