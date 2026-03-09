import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToSvgClient from './ImageToSvgClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to SVG Converter — Free Online Tool',
  description: 'Convert any raster image (PNG, JPG, WebP) to a self-contained SVG file by embedding it inside an SVG <image> tag. Free, browser-based, no upload required.',
  keywords: ['image to svg', 'convert image to svg', 'raster to svg', 'png to svg', 'jpg to svg', 'svg converter', 'embed image in svg', 'free svg converter online', 'photo to svg online', 'convert png to svg free', 'how to convert image to svg', 'svg image wrapper'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-svg' },
  openGraph: {
    title: 'Image to SVG Converter — Free | Free Image Tool Hub',
    description: 'Wrap any raster image in a self-contained SVG file. Browser-based, instant, no upload needed.',
    url: 'https://allimagetools.vercel.app/image-to-svg',
    images: [{ url: 'https://allimagetools.vercel.app/og-default.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to SVG Converter — Free | Free Image Tool Hub',
    description: 'Wrap any raster image in a self-contained SVG file. Browser-based, instant, no upload needed.',
    images: ['https://allimagetools.vercel.app/og-default.svg'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'Does this tool truly vectorize my image?',
    answer: 'No. This tool uses "embed" mode: the original raster image is encoded as a base64 data URL and wrapped inside an SVG <image> element. The result is a valid SVG file that behaves like a vector document but retains the original pixel data. True vectorization (converting pixels to paths) requires heavy computation and is not available in this browser-based tool.',
  },
  {
    question: 'What is the advantage of an embedded SVG?',
    answer: 'An embedded SVG is a single, self-contained file that can be opened in any vector editor, embedded in HTML, or scaled to any size without additional network requests. The SVG\'s viewBox matches the original image dimensions, so it renders at the correct aspect ratio everywhere.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'Any format the browser can decode: PNG, JPEG, WebP, GIF, AVIF, BMP, and ICO are all supported.',
  },
  {
    question: 'Will the SVG file be larger than the original?',
    answer: 'Usually yes. Base64 encoding increases size by roughly 33%. If file size is a concern, keep using the original raster format for web delivery and only use the SVG version when a scalable container is specifically required.',
  },
];

export default function ImageToSvgPage() {
  return (
    <ToolLayout
      title="Image to SVG Converter"
      description="Wrap any raster image in a self-contained SVG file (embed mode). Free, instant, no upload required."
      url="https://allimagetools.vercel.app/image-to-svg"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to SVG online for free
      </h2>

      <ImageToSvgClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any raster image and click <strong>Convert to SVG</strong>. The tool reads the image using the browser&apos;s FileReader API, encodes it as a base64 data URL, and wraps it inside an SVG{' '}
          <code>&lt;image&gt;</code> element with the correct <code>width</code>, <code>height</code>, and <code>viewBox</code> attributes. The generated SVG is fully self-contained — no external files are referenced — and can be downloaded immediately.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser. Your image is never sent to any server.
        </p>
      </section>
    </ToolLayout>
  );
}
