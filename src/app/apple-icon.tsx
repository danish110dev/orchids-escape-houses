import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
            width: '156px',
            height: '156px',
            border: '3px solid #C6A76D',
            borderRadius: '50%',
            opacity: 0.3,
          }}
        />
        {/* GEH text */}
        <div
          style={{
            fontSize: '72px',
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
