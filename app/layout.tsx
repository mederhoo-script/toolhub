import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";

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
    title: "ToolHub",
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
      <body className="antialiased bg-white text-neutral-900 min-h-screen font-sans">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
