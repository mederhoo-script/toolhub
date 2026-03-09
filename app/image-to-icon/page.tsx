import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToIconClient from './ImageToIconClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to Icon Generator — Free Online Tool',
  description: 'Generate a multi-size icon set (16, 32, 48, 64, 128, 256, 512 px) from any image. Download individual PNGs or all sizes in a ZIP. Free and browser-based.',
  keywords: ['image to icon', 'icon generator', 'app icon generator', 'png icon set', 'icon from image', 'multi size icon generator', 'ios icon generator online', 'android icon generator', 'png icon maker', 'how to make app icon online', 'icon pack generator free', 'image to multiple icon sizes'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-icon' },
  openGraph: {
    title: 'Image to Icon Generator — Free | Free Image Tool Hub',
    description: 'Generate icon sets at 16–512 px from any image. Download ZIP or individual PNGs.',
    url: 'https://allimagetools.vercel.app/image-to-icon',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Icon Generator — Free | Free Image Tool Hub',
    description: 'Generate icon sets at 16–512 px from any image. Download ZIP or individual PNGs.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What sizes are generated?',
    answer: 'By default the tool generates 16×16, 32×32, 48×48, 64×64, 128×128, 256×256, and 512×512 pixel square PNGs. You can deselect any sizes you do not need before generating.',
  },
  {
    question: 'Can I use these icons as app icons or favicons?',
    answer: 'Yes. The generated PNGs follow the standard sizes required by Android, iOS, Windows, and web apps. For web favicons reference the 16×16 and 32×32 icons; for Android adaptive icons use 512×512 as the source.',
  },
  {
    question: 'Will the icons be square even if my image is not?',
    answer: 'Yes. The image is scaled to fit within a square canvas, preserving the original aspect ratio with the image centred. Transparent areas are left empty (PNG alpha).',
  },
  {
    question: 'What format is the ZIP download?',
    answer: 'The ZIP file contains individual PNG files named icon-{size}x{size}.png, e.g. icon-32x32.png. Open the ZIP to access each size separately.',
  },
];

export default function ImageToIconPage() {
  return (
    <ToolLayout
      title="Image to Icon Generator"
      description="Generate a full icon set at 16, 32, 48, 64, 128, 256, and 512 px from any image. Download individual PNGs or a ZIP bundle."
      url="https://allimagetools.vercel.app/image-to-icon"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to create an icon set from an image online for free
      </h2>

      <ImageToIconClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any square or non-square image. Select the sizes you need, then click <strong>Generate Icons</strong>. Each size is rendered onto a separate canvas and exported as a transparent PNG. All files are bundled into a ZIP archive using JSZip, which can be downloaded with a single click.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser. No image is ever uploaded to a server.
        </p>
      </section>
    </ToolLayout>
  );
}
