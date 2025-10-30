import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F3F0',
          position: 'relative',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            width: '28px',
            height: '28px',
            border: '0.5px solid #C6A76D',
            borderRadius: '50%',
            opacity: 0.3,
          }}
        />
        {/* GEH text */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#89A38F',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          GEH
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
