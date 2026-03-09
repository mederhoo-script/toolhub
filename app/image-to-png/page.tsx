import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToPngClient from './ImageToPngClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Convert Image to PNG — Free Online Converter',
  description: 'Convert JPG, WebP, GIF, BMP to PNG format instantly in your browser. Preserves transparency. No upload required.',
  keywords: ['convert image to png', 'jpg to png', 'webp to png', 'image converter png', 'free png converter', 'gif to png', 'bmp to png', 'convert photo to png online free', 'png with transparency', 'lossless image converter', 'how to convert jpg to png', 'png image converter online'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-png' },
  openGraph: {
    title: 'Convert Image to PNG — Free | Free Image Tool Hub',
    description: 'Convert any image to lossless PNG. Transparency preserved. 100% browser-based.',
    url: 'https://allimagetools.vercel.app/image-to-png',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Image to PNG — Free | Free Image Tool Hub',
    description: 'Convert any image to lossless PNG. Transparency preserved. 100% browser-based.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'Does converting to PNG preserve transparency?',
    answer: 'Yes. PNG supports an alpha channel (transparency). When you convert an image that has transparent areas, those areas will be preserved in the output PNG.',
  },
  {
    question: 'Why are PNG files larger than JPG?',
    answer: 'PNG uses lossless compression, meaning no pixel data is discarded. This produces a perfect copy of the original but at the cost of a larger file size compared to lossy JPEG.',
  },
  {
    question: 'Can I convert a JPG to PNG?',
    answer: 'Yes. Upload your JPG and click Convert to PNG. Note that because JPG is lossy, the resulting PNG will be a lossless copy of the already-compressed JPG — not a perfect reconstruction of the original.',
  },
  {
    question: 'What formats does the tool accept?',
    answer: 'Any image format your browser can display: JPG, JPEG, WebP, GIF, BMP, AVIF, and SVG (rasterised).',
  },
  {
    question: 'Is there a quality setting for PNG?',
    answer: 'PNG is lossless so there is no quality slider — the output is always the best possible quality. File size is determined by image content and the compression algorithm, not a quality setting.',
  },
];

export default function ImageToPngPage() {
  return (
    <ToolLayout
      title="Convert Image to PNG"
      description="Convert JPG, WebP, and other formats to lossless PNG instantly. Transparency is preserved. Free, no upload."
      url="https://allimagetools.vercel.app/image-to-png"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to PNG online for free
      </h2>

      <ImageToPngClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          PNG (Portable Network Graphics) is the go-to format for images that require lossless quality and transparency support. Unlike JPEG, PNG does not discard any pixel information during compression, making it ideal for logos, screenshots, illustrations, and any image that will be further edited.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          When you upload an image, Free Image Tool Hub draws it onto an HTML canvas element at its original dimensions. The canvas preserves any alpha channel (transparency) present in the source image. The output is then exported as a PNG Blob using the Canvas API&apos;s native PNG encoder, which applies lossless deflate compression.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The conversion runs entirely in your browser — no server, no upload, no privacy risk. The result is available for instant download. Because PNG uses lossless compression, the output file will typically be larger than a JPEG of the same image, but the quality will be perfect.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          If file size is a concern and your image does not need transparency, consider using our Image to WebP tool, which offers near-lossless quality at significantly smaller file sizes.
        </p>
      </section>
    </ToolLayout>
  );
}
