# ToolHub — Free Online Image Tools

A production-ready Next.js 16 web application with 10 browser-based image processing tools.

## Tools

- **Image to PDF** — Convert images to A4/Letter PDF documents
- **Compress Image** — Reduce file size to a target KB (50/100/200/custom)
- **Image to JPG** — Convert with adjustable quality slider
- **Image to PNG** — Lossless conversion, transparency preserved
- **Image to WebP** — Modern format, 30–50% smaller than JPG/PNG
- **Image to Base64** — Encode as data URL for HTML/CSS embedding
- **Image to Text (OCR)** — Extract text using Tesseract.js, 9 languages
- **Convert to Grayscale** — Remove colour from any image
- **Resize Image** — Set exact dimensions with aspect ratio lock
- **Image to Favicon** — Generate 16×16, 32×32, or 64×64 PNG favicons

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4
- **Libraries**: jsPDF, browser-image-compression, Tesseract.js, Canvas API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Key Features

- All processing happens **client-side** — no file uploads, no server
- **Privacy-first**: images never leave your device
- SEO-optimised with `generateMetadata()`, OpenGraph, and JSON-LD schemas
- Accessible: ARIA labels, keyboard navigation, screen reader support
- Mobile-responsive with TailwindCSS
