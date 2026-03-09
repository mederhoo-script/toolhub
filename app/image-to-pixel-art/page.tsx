import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import ImageToPixelArtClient from './ImageToPixelArtClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to Pixel Art Converter — Free Online Tool',
  description: 'Convert any photo or image to pixel art. Choose pixel size, keep aspect ratio, and download as PNG or WebP. Free, browser-based, no upload required.',
  keywords: ['image to pixel art', 'pixelate image', 'pixel art generator', 'pixelated image', '8-bit image converter', 'convert photo to pixel art online free', 'pixelate photo online', '8bit art maker', 'retro pixel art from image', 'pixel art maker free', 'how to pixelate image online', 'pixelation filter online'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-pixel-art' },
  openGraph: {
    title: 'Image to Pixel Art Converter — Free | Free Image Tool Hub',
    description: 'Turn any image into pixel art. Choose pixel size and download instantly.',
    url: 'https://allimagetools.vercel.app/image-to-pixel-art',
    images: [toolOgImage('Image to Pixel Art Converter — Free Online Tool')],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Pixel Art Converter — Free | Free Image Tool Hub',
    description: 'Turn any image into pixel art. Choose pixel size and download instantly.',
    images: [toolOgImage('Image to Pixel Art Converter — Free Online Tool').url],
  },
};

const faqs: FAQ[] = [
  {
    question: 'How does pixel art conversion work?',
    answer: 'The image is downscaled to a very small canvas using nearest-neighbour interpolation (the default browser Canvas mode when smoothing is disabled). It is then upscaled back to a display size, keeping the blocky pixel grid intact.',
  },
  {
    question: 'What is the "pixel size" setting?',
    answer: 'Pixel size controls the target width in pixels before upscaling. A value of 32 means the image is first reduced to 32 px wide; each resulting pixel becomes one visible "block" in the output. Smaller values produce a more blocky, classic 8-bit look.',
  },
  {
    question: 'What is the output scale?',
    answer: 'Output scale multiplies the pixelated canvas back to a larger size for the download. A 32 px wide image at 8× scale produces a 256 × ? px output where each original pixel block is 8 × 8 px.',
  },
  {
    question: 'Why PNG instead of GIF for pixel art?',
    answer: 'PNG supports up to 16 million colours with full transparency and lossless compression. GIF is limited to 256 colours. PNG is the better modern choice for pixel art.',
  },
];

export default function ImageToPixelArtPage() {
  return (
    <ToolLayout
      title="Image to Pixel Art Converter"
      description="Convert any image to pixel art with one click. Choose pixel grid size and output scale. Download PNG or WebP."
      url="https://allimagetools.vercel.app/image-to-pixel-art"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to pixel art online for free
      </h2>

      <ImageToPixelArtClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload an image and choose the pixel grid size and output scale. The tool draws your image onto a tiny canvas with smoothing disabled — forcing nearest-neighbour interpolation — then scales it back up to a display-friendly size, producing the classic blocky pixel art appearance. The result is downloadable as a lossless PNG or compressed WebP file.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser. Your image never leaves your device.
        </p>
      </section>
    </ToolLayout>
  );
}
