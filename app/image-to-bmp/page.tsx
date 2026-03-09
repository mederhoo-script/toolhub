import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToBmpClient from './ImageToBmpClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to BMP Converter — Free Online Tool',
  description: 'Convert any image (PNG, JPG, WebP) to an uncompressed 24-bit BMP file. Free, browser-based, no upload required.',
  keywords: ['image to bmp', 'convert to bmp', 'png to bmp', 'jpg to bmp', 'bmp converter'],
  alternates: { canonical: 'https://toolhub.vercel.app/image-to-bmp' },
  openGraph: {
    title: 'Image to BMP Converter — Free | Free Image Tool Hub',
    description: 'Convert any image to a BMP file instantly. Browser-based, no upload.',
    url: 'https://toolhub.vercel.app/image-to-bmp',
    images: [{ url: 'https://toolhub.vercel.app/og-default.svg' }],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What is a BMP file?',
    answer: 'BMP (Bitmap) is an uncompressed raster image format developed by Microsoft. BMP files store colour data for every pixel without any compression, making them very large but also very simple to read and write. They are primarily used in Windows applications and legacy software.',
  },
  {
    question: 'Why would I need a BMP file?',
    answer: 'BMP is required by some older Windows applications, industrial software, and hardware interfaces that do not support PNG or JPEG. It is also used in game development and situations where predictable raw pixel data is needed.',
  },
  {
    question: 'Is the BMP lossless?',
    answer: 'Yes. The output is a 24-bit uncompressed BMP using the RGB colour model. No colour information is lost compared to the source image (assuming the source was lossless or already decoded). Transparent areas are rendered as the background colour.',
  },
  {
    question: 'Why is the BMP file so large?',
    answer: 'BMP stores every pixel as three bytes (R, G, B) with no compression. A 1920×1080 image requires approximately 6 MB. For web or storage use, prefer PNG or WebP which achieve similar or better quality in a fraction of the size.',
  },
];

export default function ImageToBmpPage() {
  return (
    <ToolLayout
      title="Image to BMP Converter"
      description="Convert any image to an uncompressed 24-bit BMP file. Free, instant, no upload required."
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to BMP online for free
      </h2>

      <ImageToBmpClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any image and click <strong>Convert to BMP</strong>. The tool draws the image onto an HTML canvas, reads the pixel data as RGBA values, and encodes them into the BMP file format entirely in your browser. The resulting BMP file is a standard 24-bit Windows Bitmap (BITMAPINFOHEADER v3) that opens in any image viewer, Paint, or photo editor.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          No data is ever uploaded to a server. The BMP encoder runs entirely in JavaScript in your browser.
        </p>
      </section>
    </ToolLayout>
  );
}
