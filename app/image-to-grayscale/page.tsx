import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToGrayscaleClient from './ImageToGrayscaleClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Convert Image to Grayscale — Free Online Tool',
  description: 'Convert any colour image to grayscale instantly in your browser. No uploads, no sign-up. Free online grayscale converter.',
  keywords: ['convert image to grayscale', 'grayscale image online', 'black and white image converter', 'desaturate image', 'free grayscale tool', 'convert photo to black and white online free', 'remove color from image', 'grayscale filter online', 'jpg to grayscale', 'png to black and white', 'how to make image black and white online', 'greyscale image converter'],
  alternates: { canonical: 'https://toolhub.vercel.app/image-to-grayscale' },
  openGraph: {
    title: 'Convert Image to Grayscale — Free | Free Image Tool Hub',
    description: 'Remove colour from any image instantly. Browser-based, no upload required.',
    url: 'https://toolhub.vercel.app/image-to-grayscale',
    images: [{ url: 'https://toolhub.vercel.app/og-default.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Image to Grayscale — Free | Free Image Tool Hub',
    description: 'Remove colour from any image instantly. Browser-based, no upload required.',
    images: ['https://toolhub.vercel.app/og-default.svg'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What does converting to grayscale do?',
    answer: 'Converting to grayscale removes all colour information from an image, replacing each pixel with a shade of grey based on the luminance of the original colour. The result is a black-and-white image.',
  },
  {
    question: 'How is grayscale calculated?',
    answer: 'Free Image Tool Hub uses the standard luminance formula: 0.299×Red + 0.587×Green + 0.114×Blue. This weights the green channel more heavily because the human eye is most sensitive to green light.',
  },
  {
    question: 'What format is the output file?',
    answer: 'The output is a PNG file, which preserves the lossless quality of the grayscale conversion. The file name includes "-grayscale" to distinguish it from the original.',
  },
  {
    question: 'Can I convert a PNG with transparency to grayscale?',
    answer: 'Yes. Transparency is preserved in the output. The alpha channel is not modified — only the RGB values are converted to grey.',
  },
  {
    question: 'Is grayscale the same as black and white?',
    answer: 'Grayscale images contain 256 shades of grey between pure black and pure white. True black-and-white (1-bit) images only have two tones, but "black and white" is commonly used to mean grayscale in everyday language.',
  },
];

export default function ImageToGrayscalePage() {
  return (
    <ToolLayout
      title="Convert Image to Grayscale"
      description="Remove colour from any image and convert it to grayscale instantly. Free, browser-based, no upload required."
      url="https://toolhub.vercel.app/image-to-grayscale"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to grayscale online for free
      </h2>

      <ImageToGrayscaleClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Grayscale images have many practical applications: they are used in medical imaging, artistic photography, document scanning, and as pre-processing steps for machine learning and OCR pipelines. Converting to grayscale can also reduce file sizes and remove distracting colour information to highlight texture and form.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Free Image Tool Hub performs the grayscale conversion using the Canvas API and the standard luminance formula. Your image is drawn onto a canvas, then each pixel&apos;s colour channels are read and replaced with a weighted average: 29.9% red, 58.7% green, and 11.4% blue. This weighting reflects the sensitivity of the human eye, which perceives green most strongly and blue least.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The result is a true perceptual grayscale image rather than a simple average of the three channels. This produces more natural-looking shadows and highlights compared to a naive desaturation approach. The output is saved as a lossless PNG file, ensuring no additional quality loss.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser. No image data is uploaded to any server, making this tool safe for sensitive or confidential images such as medical scans, legal documents, and personal photographs.
        </p>
      </section>
    </ToolLayout>
  );
}
