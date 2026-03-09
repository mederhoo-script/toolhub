import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import ImageToWebpClient from './ImageToWebpClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Convert Image to WebP — Free Online Converter',
  description: 'Convert JPG, PNG, GIF to WebP format online. Smaller file sizes with excellent quality. Browser-based, no upload required.',
  keywords: ['convert image to webp', 'jpg to webp', 'png to webp', 'image to webp online', 'webp converter', 'gif to webp', 'webp format converter free', 'convert photo to webp', 'reduce image size webp', 'modern image format converter', 'how to convert to webp', 'webp image compression'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-webp' },
  openGraph: {
    title: 'Convert Image to WebP — Free | Free Image Tool Hub',
    description: 'Convert any image to WebP for smaller file sizes. Adjust quality. 100% browser-based.',
    url: 'https://allimagetools.vercel.app/image-to-webp',
    images: [toolOgImage('Convert Image to WebP — Free Online Converter')],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Image to WebP — Free | Free Image Tool Hub',
    description: 'Convert any image to WebP for smaller file sizes. Adjust quality. 100% browser-based.',
    images: [toolOgImage('Convert Image to WebP — Free Online Converter').url],
  },
};

const faqs: FAQ[] = [
  {
    question: 'Why should I use WebP instead of JPG or PNG?',
    answer: 'WebP typically produces files 25–35% smaller than JPG and up to 50% smaller than PNG at equivalent visual quality. This leads to faster page loads and lower bandwidth costs.',
  },
  {
    question: 'Does WebP support transparency?',
    answer: 'Yes. WebP supports both lossy and lossless compression, including an alpha channel for transparency — making it a versatile replacement for both JPG and PNG.',
  },
  {
    question: 'Is WebP supported in all browsers?',
    answer: 'WebP is supported in all modern browsers including Chrome, Firefox, Safari (since v14), Edge, and Opera. Only very old browsers lack support.',
  },
  {
    question: 'What quality should I choose?',
    answer: 'For web images, 75–85 offers excellent quality with significant size savings. For near-lossless quality, use 90+. Below 60 will produce noticeable artifacts on photographs.',
  },
  {
    question: 'Can I convert animated GIFs to WebP?',
    answer: 'The current version converts the first frame of animated GIFs. Animated WebP support is planned for a future update.',
  },
];

export default function ImageToWebpPage() {
  return (
    <ToolLayout
      title="Convert Image to WebP"
      description="Convert JPG, PNG, and other images to modern WebP format. Smaller files, same quality. Free, instant, browser-based."
      url="https://allimagetools.vercel.app/image-to-webp"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to WebP online for free
      </h2>

      <ImageToWebpClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          WebP is Google&apos;s modern image format designed specifically for the web. It achieves significantly smaller file sizes than JPEG and PNG while maintaining excellent visual quality, making it the recommended format for web images by Google&apos;s Lighthouse performance auditing tool.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Free Image Tool Hub converts images to WebP using the browser&apos;s Canvas API. Your image is drawn onto a canvas at its original dimensions, then exported using the <code>image/webp</code> MIME type with your chosen quality level. The conversion runs entirely in your browser — no image data is sent to any server.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The quality slider (1–100) controls the level of lossy compression applied. At quality 85, most images are visually indistinguishable from the original while being 30–40% smaller. The output WebP file is immediately available for download and ready to use on any modern website.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Switching your website images from JPG and PNG to WebP is one of the quickest wins for web performance, often improving Core Web Vitals scores and reducing page load times significantly, especially on mobile connections.
        </p>
      </section>
    </ToolLayout>
  );
}
