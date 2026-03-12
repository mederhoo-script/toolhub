import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Free Image Tool Hub — Free Online Image Tools",
    template: "%s | Free Image Tool Hub",
  },
  description:
    "Free Image Tool Hub: compress, convert, resize, and transform images instantly in your browser. No uploads, no sign-up required.",
  metadataBase: new URL("https://allimagetools.vercel.app"),
  authors: [{ name: "Free Image Tool Hub", url: "https://allimagetools.vercel.app" }],
  creator: "Free Image Tool Hub",
  publisher: "Free Image Tool Hub",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Free Image Tool Hub — Free Online Image Tools",
    description:
      "20 free online image tools: compress, convert, resize, and transform images in your browser. No uploads, no sign-up.",
    url: "https://allimagetools.vercel.app",
    siteName: "Free Image Tool Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://allimagetools.vercel.app/og",
        width: 1200,
        height: 630,
        alt: "Free Image Tool Hub — Free Online Image Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Tool Hub — Free Online Image Tools",
    description:
      "20 free online image tools: compress, convert, resize, and transform images in your browser. No uploads, no sign-up.",
    images: ["https://allimagetools.vercel.app/og"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Free Image Tool Hub",
  },
  alternates: {
    canonical: "https://allimagetools.vercel.app",
    languages: {
      "x-default": "https://allimagetools.vercel.app",
      "en": "https://allimagetools.vercel.app",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
  <Script
    id="ad-network"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(s){
        s.dataset.zone='10718176';
        s.src='https://nap5k.com/tag.min.js';
      })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`
    }}
  />
</head>
      <body className="antialiased bg-white text-neutral-900 min-h-screen font-sans">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
