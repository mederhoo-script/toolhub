import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Online Image Tools — ToolHub",
    template: "%s | ToolHub",
  },
  description:
    "Free online image tools: compress, convert, resize, and transform images instantly in your browser. No uploads, no sign-up required.",
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
