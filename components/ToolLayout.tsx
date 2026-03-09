import { ReactNode } from 'react';
import Link from 'next/link';
import AdBanner from './AdBanner';
import FAQSection from './FAQSection';
import { FAQ } from '@/types';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  faqs?: FAQ[];
  url?: string;
}

/** Canonical date the site launched — used in structured data */
const SITE_DATE_PUBLISHED = '2024-01-01';
/** Approximate last-updated date for structured data */
const SITE_DATE_MODIFIED = '2025-01-01';

const MORE_TOOLS = [
  { href: '/compress-image', name: 'Compress Image', icon: '🗜️' },
  { href: '/image-to-pdf', name: 'Image to PDF', icon: '📄' },
  { href: '/image-to-webp', name: 'Image to WebP', icon: '⚡' },
  { href: '/image-to-jpg', name: 'Image to JPG', icon: '🖼️' },
  { href: '/image-to-png', name: 'Image to PNG', icon: '🔵' },
  { href: '/resize-image', name: 'Resize Image', icon: '📐' },
  { href: '/image-to-text', name: 'Image to Text (OCR)', icon: '🔍' },
  { href: '/image-to-qr', name: 'QR Code Generator', icon: '📱' },
  { href: '/image-to-base64', name: 'Image to Base64', icon: '💻' },
  { href: '/image-to-grayscale', name: 'Grayscale Converter', icon: '⬛' },
];

export default function ToolLayout({
  title,
  description,
  children,
  faqs,
  url,
}: ToolLayoutProps) {
  const softwareSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'ImageApplication',
    operatingSystem: 'Any',
    datePublished: SITE_DATE_PUBLISHED,
    dateModified: SITE_DATE_MODIFIED,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Free Image Tool Hub',
      url: 'https://allimagetools.vercel.app',
    },
  };
  if (url) {
    softwareSchema.url = url;
  }

  const breadcrumbSchema = url
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://allimagetools.vercel.app',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: url,
          },
        ],
      }
    : null;

  // Show up to 8 "More Tools" links, excluding the current page
  const moreTools = MORE_TOOLS.filter((t) => !url || !url.endsWith(t.href)).slice(0, 8);

  return (
    <div className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
            aria-label="Free Image Tool Hub Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Free Image Tool Hub logo"
              width={32}
              height={32}
              loading="eager"
              className="rounded-lg"
            />
            <span className="text-base font-bold text-neutral-900">
              Free Image<span className="text-primary-600"> Tool Hub</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AdBanner variant="leaderboard" />

        <div className="mt-8">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">›</li>
              <li className="text-neutral-700 font-medium" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Page title block */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-900 leading-tight">{title}</h1>
            <p className="text-neutral-500 text-base mt-2 leading-relaxed">{description}</p>
          </div>

          {/* Tool card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
            {children}
          </div>
        </div>

        {faqs && faqs.length > 0 && (
          <div className="mt-10">
            <FAQSection faqs={faqs} />
          </div>
        )}

        {/* More Tools — internal linking */}
        {moreTools.length > 0 && (
          <section aria-labelledby="more-tools-heading" className="mt-10">
            <h2
              id="more-tools-heading"
              className="text-lg font-bold text-neutral-900 mb-4"
            >
              More Free Image Tools
            </h2>
            <nav aria-label="More image tools">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {moreTools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:text-primary-700 text-sm text-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <span aria-hidden="true">{tool.icon}</span>
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        )}

        <div className="mt-10">
          <AdBanner variant="leaderboard" />
        </div>
      </main>

      <footer className="mt-16 border-t border-neutral-200 bg-neutral-900">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Link href="/" className="inline-flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="logo" width={26} height={26} className="rounded-md" />
              <span className="text-white font-semibold text-sm">Free Image Tool Hub</span>
            </Link>
            <p className="text-neutral-400 text-xs">
              All processing happens locally in your browser. Your images stay private.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
            <a href="/image-to-pdf" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to PDF</a>
            <a href="/compress-image" className="text-neutral-400 hover:text-white text-xs transition-colors">Compress Image</a>
            <a href="/image-to-jpg" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to JPG</a>
            <a href="/image-to-png" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to PNG</a>
            <a href="/image-to-webp" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to WebP</a>
            <a href="/image-to-base64" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to Base64</a>
            <a href="/image-to-text" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to Text</a>
            <a href="/image-to-grayscale" className="text-neutral-400 hover:text-white text-xs transition-colors">Grayscale</a>
            <a href="/resize-image" className="text-neutral-400 hover:text-white text-xs transition-colors">Resize Image</a>
            <a href="/image-to-favicon" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to Favicon</a>
            <a href="/image-to-svg" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to SVG</a>
            <a href="/image-to-qr" className="text-neutral-400 hover:text-white text-xs transition-colors">QR Code</a>
            <a href="/image-to-color-palette" className="text-neutral-400 hover:text-white text-xs transition-colors">Color Palette</a>
            <a href="/image-to-ascii" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to ASCII</a>
            <a href="/image-to-pixel-art" className="text-neutral-400 hover:text-white text-xs transition-colors">Pixel Art</a>
            <a href="/image-to-icon" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to Icon</a>
            <a href="/image-to-bmp" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to BMP</a>
            <a href="/image-to-gif" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to GIF</a>
            <a href="/image-to-zip" className="text-neutral-400 hover:text-white text-xs transition-colors">Images to ZIP</a>
            <a href="/image-to-html" className="text-neutral-400 hover:text-white text-xs transition-colors">Image to HTML</a>
          </nav>
          <div className="border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Free Image Tool Hub — Free Online Image Tools.
          </div>
        </div>
      </footer>
    </div>
  );
}
