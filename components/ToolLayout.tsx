import { ReactNode } from 'react';
import Link from 'next/link';
import AdBanner from './AdBanner';
import FAQSection from './FAQSection';
import { FAQ } from '@/types';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  faqs?: FAQ[];
}

export default function ToolLayout({
  title,
  description,
  children,
  faqs,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="ToolHub Home"
          >
            ToolHub
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AdBanner variant="leaderboard" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
          <p className="text-neutral-600 text-lg mb-8">{description}</p>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
            {children}
          </div>
        </div>

        {faqs && faqs.length > 0 && (
          <div className="mt-10">
            <FAQSection faqs={faqs} />
          </div>
        )}

        <div className="mt-10">
          <AdBanner variant="leaderboard" />
        </div>
      </main>

      <footer className="mt-16 border-t border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} ToolHub — Free Online Image Tools.
            All processing happens in your browser.
          </p>
          <nav className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            <a href="/image-to-pdf" className="hover:text-primary-600">Image to PDF</a>
            <a href="/compress-image" className="hover:text-primary-600">Compress Image</a>
            <a href="/image-to-jpg" className="hover:text-primary-600">Image to JPG</a>
            <a href="/image-to-png" className="hover:text-primary-600">Image to PNG</a>
            <a href="/image-to-webp" className="hover:text-primary-600">Image to WebP</a>
            <a href="/image-to-base64" className="hover:text-primary-600">Image to Base64</a>
            <a href="/image-to-text" className="hover:text-primary-600">Image to Text</a>
            <a href="/image-to-grayscale" className="hover:text-primary-600">Grayscale</a>
            <a href="/resize-image" className="hover:text-primary-600">Resize Image</a>
            <a href="/image-to-favicon" className="hover:text-primary-600">Image to Favicon</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
