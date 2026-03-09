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
    'image converter online free',
    'compress image online',
    'resize image online free',
    'image to pdf converter',
    'image to text ocr',
    'image to base64 encoder',
    'convert image to webp',
    'grayscale image converter',
    'favicon generator online',
    'image to svg converter',
    'qr code generator free',
    'image color palette extractor',
    'image to ascii art',
    'pixel art generator online',
    'image to icon generator',
    'image to bmp converter',
    'image to gif converter',
    'batch image to zip',
    'image to html converter',
    'jpg to png converter',
    'png to jpg converter',
    'webp converter online',
    'compress jpg online',
    'compress png online',
    'reduce image file size',
    'image resizer online',
    'change image dimensions',
    'ocr online free',
    'extract text from image',
    'base64 image encoder',
    'convert photo to pdf',
    'convert image to black and white',
    'create favicon from image',
    'image pixel art converter',
    'browser based image editor',
    'free image processing tools',
    'no upload image converter',
    'private image converter',
    'image format converter',
  ],
  alternates: { canonical: 'https://allimagetools.vercel.app' },
  openGraph: {
    title: 'Free Image Tool Hub — Free Online Image Tools',
    description:
    'Free Image Tool Hub: convert, compress, resize, and transform images instantly in your browser. Free, private, no sign-up.',
    url: 'https://allimagetools.vercel.app',
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Tool Hub — Free Online Image Tools',
    description:
      '20 free online image tools: compress, convert, resize, and transform images instantly in your browser. No uploads, no sign-up.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const tools = [
  {
    href: '/image-to-pdf',
    icon: '📄',
    name: 'Image to PDF',
    description: 'Convert any image to a PDF document. Supports A4 and Letter.',
    color: 'bg-red-50 text-red-600',
    category: 'Convert',
  },
  {
    href: '/compress-image',
    icon: '🗜️',
    name: 'Compress Image',
    description: 'Reduce file size to 50 KB, 100 KB, 200 KB, or a custom target.',
    color: 'bg-orange-50 text-orange-600',
    category: 'Optimize',
  },
  {
    href: '/image-to-jpg',
    icon: '🖼️',
    name: 'Image to JPG',
    description: 'Convert PNG, WebP, GIF to JPG with a custom quality slider.',
    color: 'bg-yellow-50 text-yellow-600',
    category: 'Convert',
  },
  {
    href: '/image-to-png',
    icon: '🔵',
    name: 'Image to PNG',
    description: 'Convert to lossless PNG. Transparency and alpha channel preserved.',
    color: 'bg-blue-50 text-blue-600',
    category: 'Convert',
  },
  {
    href: '/image-to-webp',
    icon: '⚡',
    name: 'Image to WebP',
    description: 'Convert to modern WebP for 30–50% smaller files on the web.',
    color: 'bg-green-50 text-green-600',
    category: 'Convert',
  },
  {
    href: '/image-to-base64',
    icon: '💻',
    name: 'Image to Base64',
    description: 'Encode any image as a Base64 data URL for HTML/CSS embedding.',
    color: 'bg-indigo-50 text-indigo-600',
    category: 'Extract',
  },
  {
    href: '/image-to-text',
    icon: '🔍',
    name: 'Image to Text (OCR)',
    description: 'Extract text from images using Tesseract OCR. 9 languages.',
    color: 'bg-teal-50 text-teal-600',
    category: 'Extract',
  },
  {
    href: '/image-to-grayscale',
    icon: '⬛',
    name: 'Convert to Grayscale',
    description: 'Remove colour and convert to black-and-white instantly.',
    color: 'bg-neutral-100 text-neutral-600',
    category: 'Convert',
  },
  {
    href: '/resize-image',
    icon: '📐',
    name: 'Resize Image',
    description: 'Set exact pixel dimensions with optional aspect ratio lock.',
    color: 'bg-cyan-50 text-cyan-600',
    category: 'Optimize',
  },
  {
    href: '/image-to-favicon',
    icon: '⭐',
    name: 'Image to Favicon',
    description: 'Generate 16×16, 32×32, or 64×64 favicon PNG from any image.',
    color: 'bg-amber-50 text-amber-600',
    category: 'Generate',
  },
  {
    href: '/image-to-svg',
    icon: '🔷',
    name: 'Image to SVG',
    description: 'Embed any raster image in a self-contained SVG file for use in vector editors.',
    color: 'bg-blue-50 text-blue-700',
    category: 'Convert',
  },
  {
    href: '/image-to-qr',
    icon: '📱',
    name: 'QR Code Generator',
    description: 'Generate a QR code from any text or URL. Download PNG or SVG.',
    color: 'bg-violet-50 text-violet-600',
    category: 'Generate',
  },
  {
    href: '/image-to-color-palette',
    icon: '🎨',
    name: 'Color Palette Extractor',
    description: 'Extract dominant colors from any image. Copy HEX codes to clipboard.',
    color: 'bg-pink-50 text-pink-600',
    category: 'Extract',
  },
  {
    href: '/image-to-ascii',
    icon: '🔤',
    name: 'Image to ASCII Art',
    description: 'Convert any image to ASCII text art. Download .txt or styled .html.',
    color: 'bg-lime-50 text-lime-700',
    category: 'Extract',
  },
  {
    href: '/image-to-pixel-art',
    icon: '🕹️',
    name: 'Image to Pixel Art',
    description: 'Pixelate any image with nearest-neighbour scaling. Download PNG or WebP.',
    color: 'bg-purple-50 text-purple-600',
    category: 'Generate',
  },
  {
    href: '/image-to-icon',
    icon: '🖼️',
    name: 'Image to Icon Set',
    description: 'Generate 16–512 px icons from any image. Download individual PNGs or ZIP.',
    color: 'bg-sky-50 text-sky-600',
    category: 'Generate',
  },
  {
    href: '/image-to-bmp',
    icon: '🗂️',
    name: 'Image to BMP',
    description: 'Convert any image to an uncompressed 24-bit BMP file.',
    color: 'bg-stone-50 text-stone-600',
    category: 'Convert',
  },
  {
    href: '/image-to-gif',
    icon: '✨',
    name: 'Image to GIF',
    description: 'Convert any image to a GIF with browser-side colour quantisation.',
    color: 'bg-fuchsia-50 text-fuchsia-600',
    category: 'Convert',
  },
  {
    href: '/image-to-zip',
    icon: '📦',
    name: 'Images to ZIP',
    description: 'Package multiple images into a single ZIP archive for easy download.',
    color: 'bg-orange-50 text-orange-700',
    category: 'Export',
  },
  {
    href: '/image-to-html',
    icon: '🌐',
    name: 'Image to HTML',
    description: 'Export image as a Base64 HTML embed or an ASCII art HTML page.',
    color: 'bg-emerald-50 text-emerald-600',
    category: 'Export',
  },
];

const features = [
  {
    icon: '🔒',
    title: '100% Private',
    description: 'Your images never leave your device. All processing happens locally in the browser.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'No waiting for server uploads. Conversions complete in seconds using browser APIs.',
  },
  {
    icon: '🆓',
    title: 'Always Free',
    description: 'No account, no sign-up, no watermarks, no limits. Completely free, forever.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    description: 'Fully mobile-friendly and accessible with keyboard navigation and screen reader support.',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Free Image Tool Hub',
  url: 'https://allimagetools.vercel.app',
  description:
    'Free Image Tool Hub: free online image tools to compress, convert, resize, and transform images in your browser.',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://allimagetools.vercel.app/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Free Image Tool Hub',
  url: 'https://allimagetools.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://allimagetools.vercel.app/logo.svg',
    width: 512,
    height: 512,
  },
  description:
    'Free Image Tool Hub provides 20 free browser-based image tools including compression, conversion, resizing, OCR, and more.',
  foundingDate: '2024-01-01',
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free Image Tool Hub — Free Online Image Tools',
  url: 'https://allimagetools.vercel.app',
  description:
    'Free Image Tool Hub: 20 free online image tools to compress, convert, resize, and transform images in your browser. No upload, no sign-up. Instant results.',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', url: 'https://allimagetools.vercel.app' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://allimagetools.vercel.app',
      },
    ],
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Online Image Tools',
  description: 'A collection of 20 free browser-based image processing tools.',
  url: 'https://allimagetools.vercel.app',
  numberOfItems: tools.length,
  itemListElement: tools.map((tool, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: tool.name,
    description: tool.description,
    url: `https://allimagetools.vercel.app${tool.href}`,
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 py-3 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Free Image Tool Hub Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Free Image Tool Hub logo"
                width={34}
                height={34}
                loading="eager"
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-neutral-900">
                Free Image<span className="text-primary-600"> Tool Hub</span>
              </span>
            </Link>
            <a
              href="#tools"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Browse Tools
            </a>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden bg-white border-b border-neutral-100">
            {/* Background gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-100 rounded-full opacity-30 blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
              <div className="flex justify-center mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="Free Image Tool Hub logo"
                  width={88}
                  height={88}
                  loading="eager"
                  className="rounded-2xl shadow-xl ring-4 ring-white"
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                20 Free Tools — No Sign-up Required
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 leading-tight tracking-tight">
                Free Online{' '}
                <span className="gradient-text">Image Tools</span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Convert, compress, resize, and transform images — instantly in
                your browser. No uploads, no sign-up, completely free.
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> Privacy first
                </span>
                <span className="text-neutral-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> No file uploads
                </span>
                <span className="text-neutral-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> No watermarks
                </span>
                <span className="text-neutral-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> 100% free
                </span>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Explore All Tools
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Feature Strip */}
          <section className="bg-neutral-900 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center gap-2">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <AdBanner variant="leaderboard" />
          </div>

          {/* Tool Grid */}
          <section id="tools" className="max-w-6xl mx-auto px-4 pb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                All Image Tools
              </h2>
              <p className="mt-2 text-neutral-500 text-sm">
                Search or browse all {tools.length} free tools below
              </p>
            </div>
            <HomeSearch tools={tools} />
          </section>

          <div className="max-w-6xl mx-auto px-4 pb-8">
            <AdBanner variant="leaderboard" />
          </div>

          {/* Stats Strip */}
          <section className="bg-primary-600 py-10 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {[
                { value: '20', label: 'Free Tools' },
                { value: '0', label: 'File Uploads' },
                { value: '0', label: 'Sign-ups Needed' },
                { value: '∞', label: 'Free Forever' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold">{stat.value}</div>
                  <div className="text-primary-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Intro Block */}
          <section className="max-w-3xl mx-auto px-4 py-16">
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
                and get instant access to all twenty tools any time you need them.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-neutral-200 bg-neutral-900">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="logo" width={28} height={28} className="rounded-md" />
                <span className="text-white font-bold text-base">Free Image Tool Hub</span>
              </Link>
              <p className="text-neutral-400 text-sm">
                All processing happens in your browser. Your images stay private.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
              {tools.map((t) => (
                <a key={t.href} href={t.href} className="text-neutral-400 hover:text-white text-xs transition-colors">
                  {t.name}
                </a>
              ))}
            </nav>

            <div className="border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
              © {new Date().getFullYear()} Free Image Tool Hub — Free Online Image Tools.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
