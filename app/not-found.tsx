import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Free Image Tool Hub Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Free Image Tool Hub logo"
              width={32}
              height={32}
              loading="eager"
              className="rounded-lg"
            />
            <span className="text-base font-bold text-neutral-900">
              Free Image<span className="text-primary-600"> Tool Hub</span>
            </span>
          </Link>
        </div>
      </header>

      {/* 404 content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          {/* Large 404 */}
          <div className="text-8xl font-extrabold gradient-text mb-4 select-none" aria-hidden="true">
            404
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 mb-3">
            Page not found
          </h1>
          <p className="text-neutral-500 leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try one of the tools below, or head back home.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/#tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-semibold hover:border-primary-300 hover:text-primary-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Browse All Tools
            </Link>
          </div>

          {/* Quick tool links */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Popular Tools
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/compress-image', icon: '🗜️', name: 'Compress Image' },
                { href: '/image-to-pdf', icon: '📄', name: 'Image to PDF' },
                { href: '/image-to-webp', icon: '⚡', name: 'Image to WebP' },
                { href: '/image-to-text', icon: '🔍', name: 'Image to Text' },
                { href: '/resize-image', icon: '📐', name: 'Resize Image' },
                { href: '/image-to-qr', icon: '📱', name: 'QR Code' },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  <span aria-hidden="true">{tool.icon}</span>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-4 py-6 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Free Image Tool Hub
      </footer>
    </div>
  );
}
