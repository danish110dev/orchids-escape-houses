import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  // Fetch the Group Escape Houses logo
  const imageUrl = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Screenshot-2025-09-17-at-21.50.52-1761922960864.png?width=8000&height=8000&resize=contain';
  
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    // Fallback to a simple colored square if image fetch fails
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F3F0',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#C6A76D',
              fontFamily: 'Georgia, serif',
            }}
          >
            GE
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}