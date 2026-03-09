import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Free Image Tool Hub';
  const isToolPage = searchParams.has('title');

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f0fdf4 100%)',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            marginBottom: '32px',
            boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
          }}
        >
          🖼️
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: isToolPage ? '56px' : '68px',
            fontWeight: '800',
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '20px',
            maxWidth: '960px',
            padding: '0 40px',
          }}
        >
          {isToolPage ? (
            title
          ) : (
            <>
              Free Image{' '}
              <span style={{ color: '#2563eb' }}>Tool Hub</span>
            </>
          )}
        </div>

        {/* Sub-headline */}
        <div
          style={{
            fontSize: '28px',
            color: '#475569',
            textAlign: 'center',
            maxWidth: '860px',
            marginBottom: '36px',
          }}
        >
          {isToolPage
            ? 'Free Image Tool Hub — free, private, no sign-up'
            : '20 free online image tools — compress, convert, resize & more'}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['🔒 Private', '⚡ Instant', '🆓 Always Free', '📱 Mobile-Friendly'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '10px 22px',
                  fontSize: '20px',
                  color: '#334155',
                }}
              >
                {badge}
              </div>
            ),
          )}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '40px',
            fontSize: '18px',
            color: '#94a3b8',
          }}
        >
          allimagetools.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
