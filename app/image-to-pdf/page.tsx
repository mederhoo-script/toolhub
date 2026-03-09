import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToPdfClient from './ImageToPdfClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to PDF — Free Online Converter',
  description:
    'Convert any image to a PDF document instantly in your browser. Supports JPG, PNG, WebP, and more. No upload, no sign-up. Free forever.',
  keywords: [
    'image to pdf',
    'convert image to pdf',
    'jpg to pdf',
    'png to pdf',
    'free online image to pdf',
    'webp to pdf',
    'photo to pdf converter',
    'convert picture to pdf online free',
    'image to pdf no upload',
    'browser based image to pdf',
    'a4 pdf from image',
    'how to convert image to pdf online',
  ],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-pdf' },
  openGraph: {
    title: 'Image to PDF — Free Online Converter | Free Image Tool Hub',
    description:
      'Convert JPG, PNG, WebP and other images to PDF instantly. Client-side processing — your files never leave your device.',
    url: 'https://allimagetools.vercel.app/image-to-pdf',
    images: [{ url: 'https://allimagetools.vercel.app/og-default.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to PDF — Free Online Converter | Free Image Tool Hub',
    description:
      'Convert JPG, PNG, WebP and other images to PDF instantly. Client-side processing — your files never leave your device.',
    images: ['https://allimagetools.vercel.app/og-default.svg'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What image formats can I convert to PDF?',
    answer:
      'Free Image Tool Hub supports all common browser-readable image formats including JPG, JPEG, PNG, WebP, GIF, and BMP. Simply upload your image and click Convert.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All conversion happens entirely in your browser using the jsPDF library. Your image never leaves your device, ensuring complete privacy.',
  },
  {
    question: 'Can I choose the PDF page size?',
    answer:
      'Yes. You can select either A4 or Letter page size before converting. The image will be automatically scaled and centred to fit the page.',
  },
  {
    question: 'Why is my PDF larger than the original image?',
    answer:
      'PDF is a container format that embeds the full image data along with page metadata. For smaller file sizes, consider compressing your image first using our Compress Image tool.',
  },
  {
    question: 'Can I convert multiple images into one PDF?',
    answer:
      'Currently the tool converts one image per PDF. Multi-page support is planned for a future update. For now, use one of many free PDF merge tools to combine multiple single-page PDFs.',
  },
];

export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert any image to a PDF document instantly, right in your browser. No uploads, no sign-up."
      url="https://allimagetools.vercel.app/image-to-pdf"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to PDF online for free
      </h2>

      <ImageToPdfClient />

      <section className="mt-10 prose prose-neutral max-w-none">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">
          How it works
        </h2>
        <p className="text-neutral-600 leading-relaxed">
          Converting an image to PDF is one of the most common document tasks,
          whether you need to send a photo as a professional attachment, archive
          a scanned receipt, or package graphics for printing. Free Image Tool Hub makes
          this completely free and private — no account required, no file
          uploads, no watermarks.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          When you select or drag an image file onto the upload zone, the
          browser reads it entirely on your device using the File API. Once you
          click &ldquo;Convert to PDF&rdquo;, the{' '}
          <strong>jsPDF library</strong> renders your image onto a blank PDF
          canvas, automatically calculating the correct dimensions so the image
          fits neatly within A4 or Letter margins without distortion.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          The orientation is also handled automatically: portrait images produce
          portrait PDFs, and landscape images produce landscape PDFs. After
          conversion, the PDF is generated as a Blob in memory and a temporary
          download link is created — clicking &ldquo;Download&rdquo; saves the
          file directly to your downloads folder.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Because everything runs in the browser, there is zero latency from
          network uploads or server queues. Even a 10 MB image converts in under
          a second on modern hardware. The tool works on desktop, tablet, and
          mobile browsers, and supports JPG, PNG, WebP, GIF, and BMP files up
          to 20 MB.
        </p>
      </section>
    </ToolLayout>
  );
}
