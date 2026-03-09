import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToJpgClient from './ImageToJpgClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Convert Image to JPG — Free Online Converter',
  description:
    'Convert PNG, WebP, GIF, BMP and other images to JPG format instantly. Adjust quality with a slider. No upload, runs in browser.',
  keywords: ['convert image to jpg', 'png to jpg', 'webp to jpg', 'image to jpeg online', 'free jpg converter', 'gif to jpg', 'bmp to jpg', 'convert photo to jpeg online free', 'image to jpg no upload', 'png to jpeg converter', 'how to convert image to jpg', 'jpg quality reducer'],
  alternates: { canonical: 'https://toolhub.vercel.app/image-to-jpg' },
  openGraph: {
    title: 'Convert Image to JPG — Free | Free Image Tool Hub',
    description: 'Convert any image to JPG with custom quality settings. 100% browser-based.',
    url: 'https://toolhub.vercel.app/image-to-jpg',
    images: [{ url: 'https://toolhub.vercel.app/og-default.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Image to JPG — Free | Free Image Tool Hub',
    description: 'Convert any image to JPG with custom quality settings. 100% browser-based.',
    images: ['https://toolhub.vercel.app/og-default.svg'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What formats can I convert to JPG?',
    answer: 'You can convert PNG, WebP, GIF, BMP, TIFF, and AVIF images to JPG using this tool. Simply upload any browser-supported image format.',
  },
  {
    question: 'What quality setting should I use?',
    answer: 'For web use, 80–90 offers a great balance of quality and file size. For print or archival purposes, use 95–100. Below 70 will produce noticeable compression artifacts.',
  },
  {
    question: 'Will transparent areas be preserved?',
    answer: 'No — JPG does not support transparency. Transparent areas (like in PNG files) will be filled with white. Use our Image to PNG tool if you need to keep transparency.',
  },
  {
    question: 'Does the tool change image dimensions?',
    answer: 'No. The output JPG has exactly the same pixel dimensions as the original. Only the format and compression level change. Use our Resize Image tool to change dimensions.',
  },
  {
    question: 'Is there a file size limit?',
    answer: 'You can upload images up to 20 MB. For larger files, try our Compress Image tool first to reduce the file size before converting.',
  },
];

export default function ImageToJpgPage() {
  return (
    <ToolLayout
      title="Convert Image to JPG"
      description="Convert PNG, WebP, and other image formats to JPG with custom quality. Free, instant, browser-based."
      url="https://toolhub.vercel.app/image-to-jpg"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to JPG online for free
      </h2>

      <ImageToJpgClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          JPG (or JPEG) is the most widely supported image format on the web, optimised for photographs and images with gradual colour transitions. Converting to JPG reduces file size significantly compared to PNG or BMP, making it ideal for sharing photos, embedding images in documents, and web publishing.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Free Image Tool Hub uses the browser&apos;s built-in Canvas API to perform the conversion. When you upload an image, it is drawn onto an HTML canvas element at its original dimensions. The canvas then exports the image as a JPEG Blob using your chosen quality setting (1–100), where higher values preserve more detail at the cost of a larger file.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The entire process happens locally in your browser — no file is sent to any server. This means instant conversion speeds regardless of your internet connection, and complete privacy for sensitive images. Once converted, you can download the JPG file directly to your device.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          One thing to keep in mind: JPG uses lossy compression, which means some pixel information is permanently discarded. For images that need to retain transparency or exact pixel values, consider using our Image to PNG converter instead.
        </p>
      </section>
    </ToolLayout>
  );
}
