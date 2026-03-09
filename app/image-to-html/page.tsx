import type { Metadata } from 'next';
import { toolOgImage } from '@/lib/ogImage';
import ToolLayout from '@/components/ToolLayout';
import ImageToHtmlClient from './ImageToHtmlClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'Image to HTML Converter — Free Online Tool',
  description: 'Export any image as a self-contained HTML file. Embed as a Base64 <img> tag or export ASCII art HTML. Free, browser-based, no upload required.',
  keywords: ['image to html', 'embed image html', 'base64 image html', 'image html snippet', 'ascii art html', 'convert image to html page', 'image html embed code', 'base64 html image generator', 'self contained html image', 'how to embed image in html', 'inline image html code', 'html image export tool'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-html' },
  openGraph: {
    title: 'Image to HTML Converter — Free | Free Image Tool Hub',
    description: 'Export image as HTML: Base64 embed or ASCII art HTML. Browser-based, instant.',
    url: 'https://allimagetools.vercel.app/image-to-html',
    images: [toolOgImage('Image to HTML Converter — Free Online Tool')],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to HTML Converter — Free | Free Image Tool Hub',
    description: 'Export image as HTML: Base64 embed or ASCII art HTML. Browser-based, instant.',
    images: [toolOgImage('Image to HTML Converter — Free Online Tool').url],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What is a Base64 HTML export?',
    answer: 'The image is encoded as a base64 data URL and placed inside an <img> tag in a complete HTML file. Opening the file in a browser displays the image without needing any external image file. Useful for embedding images in email templates or offline HTML documents.',
  },
  {
    question: 'What is the ASCII art HTML export?',
    answer: 'The image is converted to ASCII art characters and wrapped in a <pre> element inside a styled HTML page with a dark background. The characters faithfully represent the brightness of the original image.',
  },
  {
    question: 'Can I paste the snippet directly into my website?',
    answer: 'The Base64 export produces a complete HTML page. To use only the <img> tag in an existing page, open the downloaded HTML file, copy just the <img> tag from the <body>, and paste it into your HTML. Inline Base64 images can increase HTML file size significantly.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'Any image format the browser can decode: PNG, JPEG, WebP, GIF, AVIF, BMP, SVG.',
  },
];

export default function ImageToHtmlPage() {
  return (
    <ToolLayout
      title="Image to HTML Converter"
      description="Export any image as a self-contained HTML file. Choose Base64 embed mode or ASCII art HTML export. Free and instant."
      url="https://allimagetools.vercel.app/image-to-html"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to convert an image to HTML online for free
      </h2>

      <ImageToHtmlClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Upload any image and choose your export mode. <strong>Base64 Embed</strong> reads the image as a data URL and inserts it into a complete HTML document — open the downloaded file in any browser and the image displays without any additional files. <strong>ASCII Art HTML</strong> converts the image to text characters and wraps them in a dark-styled{' '}
          <code>&lt;pre&gt;</code> element inside an HTML page.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          All processing happens locally in your browser. No image data is sent to any server.
        </p>
      </section>
    </ToolLayout>
  );
}
