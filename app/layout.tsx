import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Image Tool Hub — Free Online Image Tools",
    template: "%s | Free Image Tool Hub",
  },
  description:
    "Free Image Tool Hub: compress, convert, resize, and transform images instantly in your browser. No uploads, no sign-up required.",
  metadataBase: new URL("https://toolhub.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
