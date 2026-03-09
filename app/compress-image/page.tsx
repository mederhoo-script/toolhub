import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CompressImageClient from './CompressImageClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Compress Image Online — Reduce File Size Free',
  description:
    'Compress images to a target file size (50 KB, 100 KB, 200 KB, or custom) instantly in your browser. No uploads required.',
  keywords: [
    'compress image online',
    'reduce image size',
    'image compressor',
    'jpg compressor',
    'png compressor',
    'compress image to 50kb',
    'compress image to 100kb',
    'reduce image file size online free',
    'compress jpeg online without losing quality',
    'compress png online free',
    'image size reducer online',
    'how to compress image online',
  ],
  alternates: { canonical: 'https://allimagetools.vercel.app/compress-image' },
  openGraph: {
    title: 'Compress Image Online — Free | Free Image Tool Hub',
    description:
      'Reduce image file size to 50 KB, 100 KB, 200 KB or a custom target — all in your browser.',
    url: 'https://allimagetools.vercel.app/compress-image',
    images: [{ url: 'https://allimagetools.vercel.app/og-default.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress Image Online — Free | Free Image Tool Hub',
    description:
      'Reduce image file size to 50 KB, 100 KB, 200 KB or a custom target — all in your browser.',
    images: ['https://allimagetools.vercel.app/og-default.svg'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'How does the image compression work?',
    answer:
      'Free Image Tool Hub uses the browser-image-compression library to reduce file size client-side. It progressively lowers quality and resolution until the output matches your target size.',
  },
  {
    question: 'Will compressing reduce image quality?',
    answer:
      'Some quality reduction is inevitable when compressing below the original size, but the algorithm minimises visible artifacts. At 100 KB most images remain visually identical to the original.',
  },
  {
    question: 'What is the maximum file size I can compress?',
    answer:
      'You can upload images up to 20 MB. The tool can typically compress to targets as low as 20 KB, though heavily compressed images at very small targets may show quality loss.',
  },
  {
    question: 'Is there a limit on how many images I can compress?',
    answer:
      'No. Because everything runs in your browser, there are no server-side limits. You can compress as many images as you like, one at a time.',
  },
  {
    question: 'Can I compress PNG images?',
    answer:
      'Yes. PNG files are supported, though the compressor may convert them to JPEG internally to achieve smaller file sizes. For PNG with transparency, use our Image to PNG tool instead.',
  },
];

export default function CompressImagePage() {
  return (
    <ToolLayout
      title="Compress Image Online"
      description="Reduce your image file size to a target KB — instantly in your browser. No uploads, no account needed."
      url="https://allimagetools.vercel.app/compress-image"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to compress an image online for free
      </h2>

      <CompressImageClient />

      <section className="mt-10 prose prose-neutral max-w-none">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">
          How it works
        </h2>
        <p className="text-neutral-600 leading-relaxed">
          Large image files are the number-one cause of slow-loading web pages
          and bloated email attachments. Free Image Tool Hub&apos;s image compressor lets
          you set an exact target size — 50 KB, 100 KB, 200 KB, or a custom
          value — and delivers a compressed image that meets that target
          without manual trial and error.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The tool leverages the{' '}
          <strong>browser-image-compression</strong> library, which uses a
          combination of quality reduction and dimension scaling to shrink the
          file. It starts at a high quality setting and iterates downward until
          the output falls within 10% of your target size. If the first pass
          doesn&apos;t hit the target, a second pass with tighter constraints is
          applied automatically.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Everything runs entirely in your browser using Web Workers, so your
          original image never leaves your device. The compressed file is
          generated in memory and offered as a direct download — no waiting for
          a server, no queue, no email confirmation.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          This tool is ideal for preparing images for web use (where a 100 KB
          limit is a common guideline), reducing email attachment sizes, and
          meeting platform upload limits for social media, e-commerce
          storefronts, and government portals that enforce strict file size
          caps.
        </p>
      </section>
    </ToolLayout>
  );
}
