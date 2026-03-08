import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ResizeImageClient from './ResizeImageClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Resize Image Online — Free Image Resizer',
  description: 'Resize any image to exact dimensions in your browser. Lock aspect ratio, set custom width and height. No upload required.',
  keywords: ['resize image online', 'image resizer', 'change image size', 'resize photo online free', 'scale image'],
  alternates: { canonical: 'https://toolhub.vercel.app/resize-image' },
  openGraph: {
    title: 'Resize Image Online — Free | ToolHub',
    description: 'Resize images to any dimension with optional aspect ratio lock. 100% browser-based.',
    url: 'https://toolhub.vercel.app/resize-image',
    images: [{ url: 'https://toolhub.vercel.app/og-default.png' }],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What does "lock aspect ratio" mean?',
    answer: 'When aspect ratio is locked, changing either the width or height automatically adjusts the other dimension to maintain the original proportional relationship between width and height. This prevents image distortion.',
  },
  {
    question: 'Will resizing reduce image quality?',
    answer: 'Downscaling (making an image smaller) generally produces excellent results. Upscaling (making an image larger) can produce blurry results because the Canvas API uses bilinear interpolation, which is better than nearest-neighbour but cannot invent new detail.',
  },
  {
    question: 'What is the maximum output size?',
    answer: 'The tool supports output dimensions up to 10,000 × 10,000 pixels, though very large canvases may be slow in the browser. For most use cases, keeping dimensions under 4,000 px is recommended.',
  },
  {
    question: 'What format is the output file?',
    answer: 'The output format matches the input. JPEG images produce JPEG output; all other formats produce PNG output, preserving transparency where applicable.',
  },
  {
    question: 'Can I resize to a percentage of the original size?',
    answer: 'Currently the tool accepts absolute pixel values. You can calculate your target dimensions (e.g., 50% of 1200 px = 600 px) and enter them manually. Percentage-based resizing is planned for a future update.',
  },
];

export default function ResizeImagePage() {
  return (
    <ToolLayout
      title="Resize Image Online"
      description="Resize any image to exact pixel dimensions. Optional aspect ratio lock prevents distortion. Free, instant, browser-based."
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to resize an image online for free
      </h2>

      <ResizeImageClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Resizing images is a fundamental task for web developers, designers, and content creators. Whether you need to meet a social media platform&apos;s required dimensions, optimise images for faster page loads, or prepare assets for print, ToolHub&apos;s image resizer handles it instantly in your browser.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          When you upload an image, the tool automatically reads its original pixel dimensions and pre-fills the width and height fields. You can then enter your target dimensions. If aspect ratio lock is enabled, adjusting one dimension automatically recalculates the other to prevent distortion — so a landscape photo stays landscape, and a square icon stays square.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The actual resizing is performed by the browser&apos;s Canvas API. The image is drawn onto a canvas at the target dimensions using the browser&apos;s built-in interpolation algorithm. The result is exported as a Blob and offered for download. JPEG images are preserved as JPEG; all other formats are output as PNG.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Because the entire process happens in the browser, there is no file upload, no waiting for a server, and no limit on how many images you can resize. This tool is particularly useful for batch-preparing images for platforms like Shopify, WordPress, Instagram, and LinkedIn, which each have specific image dimension requirements.
        </p>
      </section>
    </ToolLayout>
  );
}
