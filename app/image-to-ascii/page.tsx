import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToAsciiClient from './ImageToAsciiClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to ASCII Art Converter — Free Online Tool',
  description: 'Convert any image to ASCII art. Choose character width, character set density, and colored output. Download as .txt or .html. Free and browser-based.',
  keywords: ['image to ascii', 'ascii art generator', 'image to text art', 'ascii converter', 'photo to ascii', 'convert image to ascii art online free', 'ascii art maker', 'picture to ascii art', 'html ascii art', 'text art generator from image', 'how to convert image to ascii', 'ascii art download'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-ascii' },
  openGraph: {
    title: 'Image to ASCII Art Converter — Free | Free Image Tool Hub',
    description: 'Turn any image into ASCII art. Download .txt or .html instantly.',
    url: 'https://allimagetools.vercel.app/image-to-ascii',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to ASCII Art Converter — Free | Free Image Tool Hub',
    description: 'Turn any image into ASCII art. Download .txt or .html instantly.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'How does image-to-ASCII conversion work?',
    answer: 'The image is scaled to the chosen character width. Each pixel\'s brightness is mapped to a character from a density scale: dark pixels become dense characters like "@" or "#", bright pixels become light characters like "." or " ".',
  },
  {
    question: 'What is the character width setting?',
    answer: 'Character width controls how many characters wide the ASCII output is. Higher values produce more detail but may not fit on screen without scrolling. A width of 80 is a classic terminal width; 120–150 works well for most images.',
  },
  {
    question: 'What does the "Colored" option do?',
    answer: 'In colored mode each character is wrapped in an HTML <span> with a color style matching the original pixel color. This only affects the in-browser preview and the HTML download — the plain .txt download is always monochrome.',
  },
  {
    question: 'Why does the preview use a fixed-width font?',
    answer: 'ASCII art is designed for monospace fonts where every character takes exactly the same horizontal space, keeping columns aligned. Proportional fonts would distort the output.',
  },
];

export default function ImageToAsciiPage() {
  return (
    <ToolLayout
      title="Image to ASCII Art Converter"
      description="Convert any image to ASCII art. Choose width, character density, and colored mode. Download as .txt or .html."
      url="https://allimagetools.vercel.app/image-to-ascii"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to ASCII art online for free
      </h2>

      <ImageToAsciiClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload an image, adjust the character width and density settings, then click <strong>Convert to ASCII</strong>. The image is drawn onto a small canvas matching the character dimensions; each pixel&apos;s brightness drives the character selection. The result is displayed in a <code>&lt;pre&gt;</code> block with a monospace font.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Download the art as a plain <code>.txt</code> file for use in terminals, code comments, or social media, or as a styled <code>.html</code> file for embedding on a web page. All processing happens locally in your browser.
        </p>
      </section>
    </ToolLayout>
  );
}
