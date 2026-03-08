import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToBase64Client from './ImageToBase64Client';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to Base64 Encoder — Free Online Tool',
  description: 'Convert any image to a Base64 data URL string instantly. Copy and embed images directly in HTML, CSS, or JavaScript. No upload needed.',
  keywords: ['image to base64', 'base64 encoder', 'image to data url', 'base64 image online', 'encode image base64'],
  alternates: { canonical: 'https://toolhub.vercel.app/image-to-base64' },
  openGraph: {
    title: 'Image to Base64 Encoder — Free | ToolHub',
    description: 'Encode any image as a Base64 data URL. Copy and use in HTML, CSS, or JSON.',
    url: 'https://toolhub.vercel.app/image-to-base64',
    images: [{ url: 'https://toolhub.vercel.app/og-default.png' }],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What is a Base64 image?',
    answer: 'A Base64 image is a text-encoded representation of binary image data. It starts with a data URL prefix like "data:image/png;base64," followed by the encoded content, which can be embedded directly in HTML src attributes or CSS background-image rules.',
  },
  {
    question: 'When should I use Base64 instead of an image URL?',
    answer: 'Use Base64 when you want to embed images inline in HTML emails, single-file HTML documents, CSS stylesheets, or JSON payloads where a separate image file is not practical.',
  },
  {
    question: 'Why is the Base64 string larger than the original file?',
    answer: 'Base64 encoding expands binary data by approximately 33% because it converts every 3 bytes of binary data into 4 ASCII characters. The string is larger but no image quality is lost.',
  },
  {
    question: 'Can I use the Base64 string directly in an <img> tag?',
    answer: 'Yes. Use the full data URL as the src attribute: <img src="data:image/png;base64,..." />. This works in all modern browsers.',
  },
  {
    question: 'Is there a size limit for Base64 encoding?',
    answer: 'This tool supports files up to 10 MB. Note that very large Base64 strings can degrade browser rendering performance when embedded in HTML or CSS.',
  },
];

export default function ImageToBase64Page() {
  return (
    <ToolLayout
      title="Image to Base64 Encoder"
      description="Convert any image to a Base64 data URL. Copy and embed directly in HTML, CSS, or JavaScript. Instant, free, browser-based."
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to encode an image to Base64 online for free
      </h2>

      <ImageToBase64Client />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Base64 encoding converts binary image data into a string of ASCII characters, making it possible to embed images directly inside text-based formats like HTML, CSS, JSON, and XML. This eliminates the need for a separate image file and reduces HTTP requests when used judiciously.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          ToolHub uses the browser&apos;s FileReader API to read the selected image and produce a Base64 data URL. The resulting string follows the format <code>data:[mimeType];base64,[data]</code> and is ready to paste directly into code. The entire encoding process happens locally — no data is transmitted to any server.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Once encoded, you can copy the full string to your clipboard with a single click. The copied string can be used as the value of an HTML <code>src</code> attribute, a CSS <code>background-image</code> url, or any field in an API payload that expects image data.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Keep in mind that Base64 strings are approximately 33% larger than the binary file, so this technique is best suited for small icons, thumbnails, and decorative images rather than large photographs.
        </p>
      </section>
    </ToolLayout>
  );
}
