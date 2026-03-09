import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ImageToQrClient from './ImageToQrClient';
import { FAQ } from '@/types';

export const metadata: Metadata = {
  title: 'QR Code Generator — Free Online Tool',
  description: 'Generate a QR code from any text or URL. Choose size and error correction level. Download as PNG or SVG. Free, browser-based, no upload required.',
  keywords: ['qr code generator', 'text to qr code', 'url to qr code', 'qr code png', 'free qr code', 'generate qr code online free', 'qr code maker', 'qr code from url', 'create qr code for website', 'free qr code generator no signup', 'qr code svg download', 'how to generate qr code'],
  alternates: { canonical: 'https://allimagetools.vercel.app/image-to-qr' },
  openGraph: {
    title: 'QR Code Generator — Free | Free Image Tool Hub',
    description: 'Generate QR codes from any text or URL. Download PNG or SVG instantly.',
    url: 'https://allimagetools.vercel.app/image-to-qr',
    images: [{ url: 'https://allimagetools.vercel.app/og', width: 1200, height: 630, alt: 'Free Image Tool Hub' }],
    siteName: 'Free Image Tool Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator — Free | Free Image Tool Hub',
    description: 'Generate QR codes from any text or URL. Download PNG or SVG instantly.',
    images: ['https://allimagetools.vercel.app/og'],
  },
};

const faqs: FAQ[] = [
  {
    question: 'What can I encode in a QR code?',
    answer: 'Any text — URLs, Wi-Fi credentials, plain text, email addresses, phone numbers, or vCard contact data. For URLs, include the full address (https://...) so scanners automatically open a browser.',
  },
  {
    question: 'What is error correction level?',
    answer: 'Error correction allows a QR code to be read even if part of it is damaged or obscured. L (7%) is the smallest code, H (30%) is the most robust. Choose M or Q for general use. H is recommended if you plan to print the QR code or overlay a logo on top.',
  },
  {
    question: 'What size should I choose?',
    answer: 'For screen display 256 px is usually sufficient. For printing choose 512 px or 1024 px to ensure the QR code is sharp when scaled up.',
  },
  {
    question: 'Can I customise the QR code colours?',
    answer: 'This tool uses black modules on a white background, which provides the highest scanner compatibility. Custom colours can reduce readability with some scanners.',
  },
];

export default function ImageToQrPage() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate a downloadable QR code from any text or URL. Choose size and error correction level. Free and instant."
      url="https://allimagetools.vercel.app/image-to-qr"
      faqs={faqs}
    >
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        How to create a QR code online for free
      </h2>

      <ImageToQrClient />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">How it works</h2>
        <p className="text-neutral-600 leading-relaxed">
          Enter any text or URL, choose your preferred size and error correction level, then click <strong>Generate QR Code</strong>. The QR code is generated entirely in your browser using the open-source <em>qrcode</em> library. No data is transmitted to any server.
        </p>
        <p className="text-neutral-600 leading-relaxed mt-3">
          Download the result as a PNG raster image for screen use, or as an SVG for print-quality output that scales to any size without loss of quality.
        </p>
      </section>
    </ToolLayout>
  );
}
