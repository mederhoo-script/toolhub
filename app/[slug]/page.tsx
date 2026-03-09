import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import { SEO_PAGE_MAP, SEO_PAGES, type ToolKey } from '@/lib/seoKeywords';

// Tool client components
import CompressImageClient from '@/app/compress-image/CompressImageClient';
import ResizeImageClient from '@/app/resize-image/ResizeImageClient';
import ImageToJpgClient from '@/app/image-to-jpg/ImageToJpgClient';
import ImageToPngClient from '@/app/image-to-png/ImageToPngClient';
import ImageToWebpClient from '@/app/image-to-webp/ImageToWebpClient';
import ImageToPdfClient from '@/app/image-to-pdf/ImageToPdfClient';
import ImageToGrayscaleClient from '@/app/image-to-grayscale/ImageToGrayscaleClient';
import ImageToBase64Client from '@/app/image-to-base64/ImageToBase64Client';
import ImageToTextClient from '@/app/image-to-text/ImageToTextClient';
import ImageToFaviconClient from '@/app/image-to-favicon/ImageToFaviconClient';
import ImageToSvgClient from '@/app/image-to-svg/ImageToSvgClient';
import ImageToQrClient from '@/app/image-to-qr/ImageToQrClient';
import ImageToColorPaletteClient from '@/app/image-to-color-palette/ImageToColorPaletteClient';
import ImageToAsciiClient from '@/app/image-to-ascii/ImageToAsciiClient';
import ImageToPixelArtClient from '@/app/image-to-pixel-art/ImageToPixelArtClient';
import ImageToIconClient from '@/app/image-to-icon/ImageToIconClient';
import ImageToBmpClient from '@/app/image-to-bmp/ImageToBmpClient';
import ImageToGifClient from '@/app/image-to-gif/ImageToGifClient';
import ImageToZipClient from '@/app/image-to-zip/ImageToZipClient';
import ImageToHtmlClient from '@/app/image-to-html/ImageToHtmlClient';

// ---------------------------------------------------------------------------
// Static params — tell Next.js to pre-render every keyword page
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.slug }));
}

// ---------------------------------------------------------------------------
// Per-page metadata
// ---------------------------------------------------------------------------

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGE_MAP.get(slug);
  if (!page) return {};

  const ogImage = toolOgImage(page.title);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.canonical },
    openGraph: {
      title: `${page.title} | Free Image Tool Hub`,
      description: page.description,
      url: page.canonical,
      images: [ogImage],
      siteName: 'Free Image Tool Hub',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Free Image Tool Hub`,
      description: page.description,
      images: [ogImage.url],
    },
  };
}

// ---------------------------------------------------------------------------
// Tool component map
// ---------------------------------------------------------------------------

function ToolComponent({ tool }: { tool: ToolKey }) {
  switch (tool) {
    case 'compress-image':       return <CompressImageClient />;
    case 'resize-image':         return <ResizeImageClient />;
    case 'image-to-jpg':         return <ImageToJpgClient />;
    case 'image-to-png':         return <ImageToPngClient />;
    case 'image-to-webp':        return <ImageToWebpClient />;
    case 'image-to-pdf':         return <ImageToPdfClient />;
    case 'image-to-grayscale':   return <ImageToGrayscaleClient />;
    case 'image-to-base64':      return <ImageToBase64Client />;
    case 'image-to-text':        return <ImageToTextClient />;
    case 'image-to-favicon':     return <ImageToFaviconClient />;
    case 'image-to-svg':         return <ImageToSvgClient />;
    case 'image-to-qr':          return <ImageToQrClient />;
    case 'image-to-color-palette': return <ImageToColorPaletteClient />;
    case 'image-to-ascii':       return <ImageToAsciiClient />;
    case 'image-to-pixel-art':   return <ImageToPixelArtClient />;
    case 'image-to-icon':        return <ImageToIconClient />;
    case 'image-to-bmp':         return <ImageToBmpClient />;
    case 'image-to-gif':         return <ImageToGifClient />;
    case 'image-to-zip':         return <ImageToZipClient />;
    case 'image-to-html':        return <ImageToHtmlClient />;
    default: {
      const _exhaustive: never = tool;
      throw new Error(`Unknown tool key: ${_exhaustive}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SeoKeywordPage({ params }: Props) {
  const { slug } = await params;
  const page = SEO_PAGE_MAP.get(slug);
  if (!page) notFound();

  return (
    <ToolLayout
      title={page.h1}
      description={page.description}
      url={page.canonical}
    >
      <p className="text-neutral-600 leading-relaxed mb-6">{page.intro}</p>

      <ToolComponent tool={page.tool} />
    </ToolLayout>
  );
}
