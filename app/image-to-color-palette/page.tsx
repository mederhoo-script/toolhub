import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import ImageToColorPaletteClient from './ImageToColorPaletteClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image Color Palette Extractor — Free Online Tool',
  description: 'Extract the dominant colours from any image. View colour swatches, copy HEX codes to clipboard. Free, browser-based, no upload required.',
  keywords: ['image color palette', 'extract colors from image', 'dominant colors', 'color picker', 'image palette extractor', 'get colors from image online', 'photo color palette generator', 'hex color extractor', 'image color picker online free', 'find colors in image', 'dominant color detector', 'color scheme from image'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-color-palette' },
  openGraph: {
    title: 'Image Color Palette Extractor — Free | Free Image Tool Hub',
    description: 'Find the dominant colors in any image. Copy HEX values instantly.',
    url: 'https://allimagetools.vercel.app/image-to-color-palette',
    images: [toolOgImage('Image Color Palette Extractor — Free Online Tool')],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Color Palette Extractor — Free | Free Image Tool Hub',
    description: 'Find the dominant colors in any image. Copy HEX values instantly.',
    images: [toolOgImage('Image Color Palette Extractor — Free Online Tool').url],
  },
};

const faqs: FAQ[] = [
  {
    question: 'How does the tool determine dominant colors?',
    answer: 'The image is downscaled to 200 × 200 pixels for speed, then every pixel is read from the canvas. Pixels are grouped ("quantised") by rounding each RGB channel to the nearest step, forming colour buckets. The buckets with the highest pixel counts represent the most common colours in the image.',
  },
  {
    question: 'Why might the palette miss some colors I can clearly see?',
    answer: 'Very small details, gradients, or thin lines may occupy too few pixels to appear in the top results. Increasing the palette count (e.g. to 10) may reveal more nuanced colours.',
  },
  {
    question: 'Can I use the HEX codes in my design tools?',
    answer: 'Yes. Click the Copy button next to any swatch to copy the HEX code to your clipboard, then paste it directly into Figma, Photoshop, CSS, or any other tool.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'Any image format the browser can decode: PNG, JPEG, WebP, GIF, AVIF, and BMP.',
  },
];

export default function ImageToColorPalettePage() {
  return (
    <ToolLayout
      title="Image Color Palette Extractor"
      description="Extract the dominant colors from any image and copy HEX codes with one click. Free, instant, no upload required."
      url="https://allimagetools.vercel.app/image-to-color-palette"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to extract colors from an image online for free
      </h2>

      <ImageToColorPaletteClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any image and choose how many colours to extract (5, 8, or 10). The image is drawn onto an HTML canvas, pixel data is read, and colours are grouped by frequency. The most common colour groups are returned as your palette, displayed as swatches alongside their HEX codes. Click <strong>Copy</strong> next to any colour to instantly copy its HEX value to your clipboard.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing runs in your browser — no image is ever uploaded to a server.
        </p>
      </section>
    </ToolLayout>
  );
}
