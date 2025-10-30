import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  // Fetch the logo image directly
  const logoUrl = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/stacked_logo-1760785640378-2-1761832743005.webp?width=32&height=32&resize=contain';
  
  const response = await fetch(logoUrl);
  const imageBuffer = await response.arrayBuffer();
  
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}