import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToGifClient from './ImageToGifClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to GIF Converter — Free Online Tool',
  description: 'Convert any image (PNG, JPG, WebP) to a GIF file. Browser-based GIF encoder with colour quantisation. Free, no upload required.',
  keywords: ['image to gif', 'convert image to gif', 'png to gif', 'jpg to gif', 'gif converter'],
  alternates: { canonical: 'https://toolhub.vercel.app/image-to-gif' },
  openGraph: {
    title: 'Image to GIF Converter — Free | Free Image Tool Hub',
    description: 'Convert any image to GIF format instantly. Browser-based, no upload.',
    url: 'https://toolhub.vercel.app/image-to-gif',
    images: [{ url: 'https://toolhub.vercel.app/og-default.png' }],
  },
};

const faqs: FAQ[] = [
  {
    question: 'Why is the GIF colour quality lower than the original?',
    answer: 'GIF supports a maximum of 256 colours per frame. Images with millions of colours are quantised (colour-reduced) to fit this limit. For photographic images PNG or WebP are better choices. GIF is most suitable for simple graphics, logos, and illustrations with few colours.',
  },
  {
    question: 'Is the output animated?',
    answer: 'The current tool produces a static single-frame GIF from a single source image. Animation from multiple images is not supported in this version.',
  },
  {
    question: 'What is the maximum image size?',
    answer: 'For performance and compatibility, images are automatically downscaled to a maximum of 256×256 pixels before GIF encoding. If your source image is larger, the output GIF will be at most 256 px on the longest side.',
  },
  {
    question: 'Can I use these GIFs on social media?',
    answer: 'Yes. Most social platforms accept GIF uploads. Keep in mind that static GIFs are larger than equivalent PNGs; platforms may convert them or apply additional compression.',
  },
];

export default function ImageToGifPage() {
  return (
    <ToolLayout
      title="Image to GIF Converter"
      description="Convert any image to a GIF file. Browser-based colour quantisation and GIF encoding. Free and instant."
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to GIF online for free
      </h2>

      <ImageToGifClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any image and click <strong>Convert to GIF</strong>. The tool downscales the image to a maximum of 256×256 px, quantises the colours to a palette of up to 256 entries using median-cut quantisation, then encodes the result as a standard GIF89a file entirely in your browser using LZW compression. No external services are used.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally. No image data leaves your device.
        </p>
      </section>
    </ToolLayout>
  );
}
