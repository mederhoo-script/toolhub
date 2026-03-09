import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToFaviconClient from './ImageToFaviconClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to Favicon Generator — Free Online Tool',
  description: 'Convert any image to a favicon in 16×16, 32×32, or 64×64 PNG format. Instant browser-based favicon generator. No upload required.',
  keywords: ['image to favicon', 'favicon generator', 'create favicon online', 'ico converter', 'favicon from image', 'free favicon generator', 'favicon png generator', '16x16 favicon', '32x32 favicon', 'website icon generator', 'how to create a favicon', 'favicon maker online free'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-favicon' },
  openGraph: {
    title: 'Image to Favicon Generator — Free | Free Image Tool Hub',
    description: 'Create a favicon from any image in 16×16, 32×32, or 64×64 px. Browser-based, instant.',
    url: 'https://allimagetools.vercel.app/image-to-favicon',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Favicon Generator — Free | Free Image Tool Hub',
    description: 'Create a favicon from any image in 16×16, 32×32, or 64×64 px. Browser-based, instant.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What size should a favicon be?',
    answer: 'The standard favicon size is 16×16 pixels for browser tabs. 32×32 is used for high-DPI displays and taskbar icons. 64×64 is suitable for bookmark icons and shortcuts. Most modern websites provide all three sizes.',
  },
  {
    question: 'Why is the output PNG instead of ICO?',
    answer: 'Modern browsers fully support PNG favicons, which are simpler and higher quality than the older ICO format. You can reference a PNG favicon in your HTML with <link rel="icon" type="image/png" href="/favicon.png">.',
  },
  {
    question: 'What image works best as a favicon?',
    answer: 'Simple, bold graphics with high contrast work best at small sizes. Logos, monograms, and simple symbols are ideal. Avoid fine detail, small text, or complex scenes — they become illegible at 16×16 or 32×32 pixels.',
  },
  {
    question: 'How do I add the favicon to my website?',
    answer: 'Download the generated PNG and upload it to your server root or public directory. Then add <link rel="icon" type="image/png" href="/your-favicon.png"> inside the <head> of your HTML.',
  },
  {
    question: 'Can I generate multiple sizes at once?',
    answer: 'Currently the tool generates one size per click. You can quickly repeat the process for each size you need (16, 32, 64) by selecting a different size and clicking Generate again.',
  },
];

export default function ImageToFaviconPage() {
  return (
    <ToolLayout
      title="Image to Favicon Generator"
      description="Convert any image to a browser favicon at 16×16, 32×32, or 64×64 pixels. Free, instant, no upload needed."
      url="https://allimagetools.vercel.app/image-to-favicon"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to create a favicon from an image online for free
      </h2>

      <ImageToFaviconClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          A favicon is the small icon that appears in browser tabs, bookmark lists, and browser history. Having a recognisable favicon reinforces your brand identity and helps users identify your site among multiple open tabs. Free Image Tool Hub&apos;s favicon generator creates a properly sized PNG from any image you upload.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          When you upload an image, the tool draws it onto an HTML canvas at your chosen size (16×16, 32×32, or 64×64 pixels). The image is scaled proportionally and centred on the canvas, so your icon is never distorted or cropped unexpectedly. The canvas is then exported as a PNG Blob using the Canvas API.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          A preview of the favicon is displayed at 2× size so you can check how it looks before downloading. Because small favicons are often displayed with pixel-exact rendering, the preview uses CSS <code>image-rendering: pixelated</code> to show crisp pixels rather than a blurry scaled-up version.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser — no image data is uploaded to any server. Download the generated PNG and reference it in your website&apos;s HTML <code>&lt;head&gt;</code> section. Most modern browsers, including Chrome, Firefox, Safari, and Edge, support PNG favicons natively.
        </p>
      </section>
    </ToolLayout>
  );
}
