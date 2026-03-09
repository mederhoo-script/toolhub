import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToZipClient from './ImageToZipClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Images to ZIP — Batch Download Free Online Tool',
  description: 'Upload multiple images and download them all as a single ZIP archive. Free, browser-based batch image packaging with no upload to any server.',
  keywords: ['images to zip', 'batch download images', 'zip image files', 'compress images zip', 'image archive', 'bulk image download zip', 'package images online free', 'multiple images to zip online', 'image zip file creator', 'how to zip images online', 'batch image archiver', 'download images as zip'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-zip' },
  openGraph: {
    title: 'Images to ZIP — Batch Download | Free Image Tool Hub',
    description: 'Package multiple images into a ZIP archive instantly. Browser-based, no upload.',
    url: 'https://allimagetools.vercel.app/image-to-zip',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Images to ZIP — Batch Download | Free Image Tool Hub',
    description: 'Package multiple images into a ZIP archive instantly. Browser-based, no upload.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What image formats can I include in the ZIP?',
    answer: 'Any file the browser can handle as a file upload: PNG, JPEG, WebP, GIF, BMP, SVG, AVIF, and more. The files are added to the ZIP without any conversion — they are stored exactly as uploaded.',
  },
  {
    question: 'Is there a limit to how many images I can zip?',
    answer: 'There is no hard limit, but very large files or many large images may use significant browser memory. Aim for a total uncompressed size under 200 MB for best results.',
  },
  {
    question: 'Is this tool useful beyond images?',
    answer: 'This tool accepts any file type via the file picker, but the accept attribute is set to images by default. For generic ZIP creation, any file system tool or command-line zip utility would be more appropriate.',
  },
  {
    question: 'Are the files compressed inside the ZIP?',
    answer: 'Yes. DEFLATE compression is applied to each file in the archive. PNG and JPEG images are already compressed internally, so the savings may be modest; uncompressed BMP files benefit the most.',
  },
];

export default function ImageToZipPage() {
  return (
    <ToolLayout
      title="Images to ZIP"
      description="Select multiple images and download them as a single ZIP archive. Free, instant, no upload required."
      url="https://allimagetools.vercel.app/image-to-zip"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to download multiple images as a ZIP for free
      </h2>

      <ImageToZipClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Click or drag to select any number of image files. Their names and sizes are listed so you can review them before packaging. Click <strong>Download ZIP</strong> to bundle all selected files into a single compressed ZIP archive using JSZip, which runs entirely in your browser.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          No files are uploaded to any server. Everything happens locally on your device.
        </p>
      </section>
    </ToolLayout>
  );
}
