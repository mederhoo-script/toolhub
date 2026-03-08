import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import HomeSearch from './HomeSearch';

export const metadata: Metadata = {
  title: 'Free Image Tool Hub — Free Online Image Tools',
  description:
    'Free Image Tool Hub: 20 free online image tools to compress, convert, resize, and transform images in your browser. No upload, no sign-up. Instant results.',
  keywords: [
    'free online image tools',
    'image converter',
    'compress image',
    'resize image',
    'image to pdf',
    'image to text',
    'image to base64',
    'image to webp',
    'grayscale image',
    'favicon generator',
    'image to svg',
    'qr code generator',
    'image color palette',
    'image to ascii',
    'pixel art generator',
    'image to icon',
    'image to bmp',
    'image to gif',
    'images to zip',
    'image to html',
  ],
  alternates: { canonical: 'https://toolhub.vercel.app' },
  openGraph: {
    title: 'Free Image Tool Hub — Free Online Image Tools',
    description:
    'Free Image Tool Hub: convert, compress, resize, and transform images instantly in your browser. Free, private, no sign-up.',
    url: 'https://toolhub.vercel.app',
    images: [{ url: 'https://toolhub.vercel.app/og-default.png' }],
    type: 'website',
  },
};

const tools = [
  {
    href: '/image-to-pdf',
    icon: '📄',
    name: 'Image to PDF',
    description: 'Convert any image to a PDF document. Supports A4 and Letter.',
  },
  {
    href: '/compress-image',
    icon: '🗜️',
    name: 'Compress Image',
    description: 'Reduce file size to 50 KB, 100 KB, 200 KB, or a custom target.',
  },
  {
    href: '/image-to-jpg',
    icon: '🖼️',
    name: 'Image to JPG',
    description: 'Convert PNG, WebP, GIF to JPG with a custom quality slider.',
  },
  {
    href: '/image-to-png',
    icon: '🔵',
    name: 'Image to PNG',
    description: 'Convert to lossless PNG. Transparency and alpha channel preserved.',
  },
  {
    href: '/image-to-webp',
    icon: '⚡',
    name: 'Image to WebP',
    description: 'Convert to modern WebP for 30–50% smaller files on the web.',
  },
  {
    href: '/image-to-base64',
    icon: '💻',
    name: 'Image to Base64',
    description: 'Encode any image as a Base64 data URL for HTML/CSS embedding.',
  },
  {
    href: '/image-to-text',
    icon: '🔍',
    name: 'Image to Text (OCR)',
    description: 'Extract text from images using Tesseract OCR. 9 languages.',
  },
  {
    href: '/image-to-grayscale',
    icon: '⬛',
    name: 'Convert to Grayscale',
    description: 'Remove colour and convert to black-and-white instantly.',
  },
  {
    href: '/resize-image',
    icon: '📐',
    name: 'Resize Image',
    description: 'Set exact pixel dimensions with optional aspect ratio lock.',
  },
  {
    href: '/image-to-favicon',
    icon: '⭐',
    name: 'Image to Favicon',
    description: 'Generate 16×16, 32×32, or 64×64 favicon PNG from any image.',
  },
  {
    href: '/image-to-svg',
    icon: '🔷',
    name: 'Image to SVG',
    description: 'Embed any raster image in a self-contained SVG file for use in vector editors.',
  },
  {
    href: '/image-to-qr',
    icon: '📱',
    name: 'QR Code Generator',
    description: 'Generate a QR code from any text or URL. Download PNG or SVG.',
  },
  {
    href: '/image-to-color-palette',
    icon: '🎨',
    name: 'Color Palette Extractor',
    description: 'Extract dominant colors from any image. Copy HEX codes to clipboard.',
  },
  {
    href: '/image-to-ascii',
    icon: '🔤',
    name: 'Image to ASCII Art',
    description: 'Convert any image to ASCII text art. Download .txt or styled .html.',
  },
  {
    href: '/image-to-pixel-art',
    icon: '🕹️',
    name: 'Image to Pixel Art',
    description: 'Pixelate any image with nearest-neighbour scaling. Download PNG or WebP.',
  },
  {
    href: '/image-to-icon',
    icon: '🖼️',
    name: 'Image to Icon Set',
    description: 'Generate 16–512 px icons from any image. Download individual PNGs or ZIP.',
  },
  {
    href: '/image-to-bmp',
    icon: '🗂️',
    name: 'Image to BMP',
    description: 'Convert any image to an uncompressed 24-bit BMP file.',
  },
  {
    href: '/image-to-gif',
    icon: '✨',
    name: 'Image to GIF',
    description: 'Convert any image to a GIF with browser-side colour quantisation.',
  },
  {
    href: '/image-to-zip',
    icon: '📦',
    name: 'Images to ZIP',
    description: 'Package multiple images into a single ZIP archive for easy download.',
  },
  {
    href: '/image-to-html',
    icon: '🌐',
    name: 'Image to HTML',
    description: 'Export image as a Base64 HTML embed or an ASCII art HTML page.',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Free Image Tool Hub',
  url: 'https://toolhub.vercel.app',
  description:
    'Free Image Tool Hub: free online image tools to compress, convert, resize, and transform images in your browser.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://toolhub.vercel.app/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-neutral-50">
        <header className="bg-white border-b border-neutral-200 px-4 py-3">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Free Image Tool Hub Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Free Image Tool Hub logo"
                width={32}
                height={32}
                loading="eager"
                className="rounded-md"
              />
              <span className="text-xl font-bold text-primary-600">Free Image Tool Hub</span>
            </Link>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="bg-white border-b border-neutral-100 py-16 px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="Free Image Tool Hub logo"
                  width={80}
                  height={80}
                  loading="eager"
                  className="rounded-2xl shadow-md"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
                Free Online Image Tools
              </h1>
              <p className="mt-4 text-xl text-neutral-600">
                Convert, compress, resize, and transform images — instantly in
                your browser. No uploads, no sign-up, completely free.
              </p>
              <a
                href="#tools"
                className="mt-8 inline-block px-8 py-3 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Explore Tools
              </a>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-4 py-8">
            <AdBanner variant="leaderboard" />
          </div>

          {/* Tool Grid */}
          <section id="tools" className="max-w-5xl mx-auto px-4 pb-12">
            <HomeSearch tools={tools} />
          </section>

          <div className="max-w-5xl mx-auto px-4 pb-8">
            <AdBanner variant="leaderboard" />
          </div>

          {/* SEO Intro Block */}
          <section className="max-w-3xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Why use Free Image Tool Hub for image processing?
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Free Image Tool Hub is a collection of twenty powerful, completely
                free image tools designed to run entirely in your browser. Unlike
                most online image editors and converters, Free Image Tool Hub
                never uploads your files to a server. Every conversion,
                compression, and transformation happens locally using modern
                browser APIs — the Canvas API, Web Workers, and the FileReader API.
              </p>
              <p>
                This means your images are completely private. Whether you are
                compressing a confidential medical scan, extracting text from a
                legal document, or converting a logo to WebP for your website,
                your files stay on your device at all times. No account, no
                email, no watermarks, no limits.
              </p>
              <p>
                Our free image compression tool can reduce file sizes to a
                specific KB target — useful for platforms with strict upload
                limits. The free OCR tool extracts text from images using
                Tesseract.js, the same engine used by Google. The free PDF
                converter wraps images in properly formatted A4 or Letter
                documents in seconds.
              </p>
              <p>
                Free Image Tool Hub is built with Next.js 16 and runs at the
                edge for lightning-fast page loads. Each tool page includes
                detailed instructions, SEO-friendly content, and a FAQ section
                to help you understand exactly how the tool works and when to
                use it. All tools are mobile-friendly and accessible, with
                keyboard navigation and screen reader support throughout.
              </p>
              <p>
                Whether you are a web developer optimising assets, a designer
                preparing files for clients, a student submitting assignments,
                or anyone who needs to work with images quickly and privately,
                Free Image Tool Hub has a free tool for you. Bookmark this page
                and get instant access to all ten tools any time you need them.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-neutral-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-neutral-500">
            <p>
              © {new Date().getFullYear()} Free Image Tool Hub — Free Online Image Tools.
              All processing happens in your browser.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
