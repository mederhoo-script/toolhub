import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import ImageToTextClient from './ImageToTextClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to Text — OCR Online Free',
  description: 'Extract text from any image using OCR technology powered by Tesseract.js. Supports 9 languages. Instant, private, browser-based.',
  keywords: ['image to text', 'ocr online', 'extract text from image', 'tesseract ocr', 'free ocr tool', 'optical character recognition online', 'scan image to text', 'photo to text converter', 'read text from image online', 'ocr multiple languages', 'free online ocr no upload', 'how to extract text from image'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-text' },
  openGraph: {
    title: 'Image to Text — Free OCR Online | Free Image Tool Hub',
    description: 'Extract text from images using browser-based OCR. No upload, supports 9 languages.',
    url: 'https://allimagetools.vercel.app/image-to-text',
    images: [toolOgImage('Image to Text — OCR Online Free')],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Text — Free OCR Online | Free Image Tool Hub',
    description: 'Extract text from images using browser-based OCR. No upload, supports 9 languages.',
    images: [toolOgImage('Image to Text — OCR Online Free').url],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What is OCR?',
    answer: 'OCR (Optical Character Recognition) is technology that reads and converts printed or handwritten text within images into machine-readable text that you can copy, edit, and search.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'The tool supports English, French, German, Spanish, Portuguese, Italian, Chinese (Simplified), Japanese, and Arabic. Select your language before extracting for best accuracy.',
  },
  {
    question: 'Why is the extracted text inaccurate?',
    answer: 'OCR accuracy depends on image quality, font clarity, and contrast. For best results, use high-resolution images with clear, well-lit text and minimal background noise.',
  },
  {
    question: 'Does the tool work with handwritten text?',
    answer: 'Tesseract.js can handle some handwriting, but accuracy is best with printed, typed, or clearly rendered fonts. Highly stylised or cursive handwriting may produce poor results.',
  },
  {
    question: 'Why does extraction take a while?',
    answer: 'Tesseract.js downloads a language data model the first time you use a language (cached in your browser for subsequent uses). Actual recognition on typical images takes 2–10 seconds.',
  },
];

export default function ImageToTextPage() {
  return (
    <ToolLayout
      title="Image to Text — OCR Online"
      description="Extract text from any image using AI-powered OCR. Supports 9 languages. Your images never leave your device."
      url="https://allimagetools.vercel.app/image-to-text"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to extract text from an image online for free
      </h2>

      <ImageToTextClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Optical Character Recognition (OCR) enables computers to &ldquo;read&rdquo; text from images, scanned documents, screenshots, and photographs. Free Image Tool Hub&apos;s OCR tool is powered by Tesseract.js, a JavaScript port of the industry-standard Tesseract OCR engine originally developed by HP and now maintained by Google.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          When you select an image and click &ldquo;Extract Text&rdquo;, Tesseract.js runs entirely in your browser using a Web Worker thread. This means your image data never leaves your device — there are no server round-trips, no upload queues, and no privacy concerns. A language model is downloaded once and cached in your browser, so subsequent extractions in the same language are much faster.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          A real-time progress bar shows you the OCR stages: loading the language data, initialising the engine, and recognising text. Once complete, the extracted text appears in a text area that you can copy with a single click. The text retains line breaks and paragraph spacing from the original image.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          For best results, use images with clear, high-contrast text on a plain background. Blurry, low-resolution, or heavily stylised images will produce lower accuracy. You can improve results by preprocessing images with our Grayscale tool to increase contrast before running OCR.
        </p>
      </section>
    </ToolLayout>
  );
}
