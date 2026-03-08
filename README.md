# ToolHub — Free Online Image Tools

A production-ready Next.js 16 web application with 20 browser-based image processing tools.

## Tools

### Original Tools
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

### New Tools
- **Image to SVG** — Embed any raster image in a self-contained SVG file (embed mode)
- **QR Code Generator** — Generate QR codes from text/URL; download PNG or SVG
- **Color Palette Extractor** — Extract dominant colours from any image; copy HEX codes
- **Image to ASCII Art** — Convert images to ASCII text art; download .txt or styled .html
- **Image to Pixel Art** — Pixelate images with nearest-neighbour scaling; download PNG/WebP
- **Image to Icon Set** — Generate 16–512 px icon PNGs; download individually or as ZIP
- **Image to BMP** — Convert to uncompressed 24-bit BMP using a pure-JS encoder
- **Image to GIF** — Convert to static GIF with median-cut colour quantisation and LZW encoding
- **Images to ZIP** — Batch-package multiple images into a single ZIP archive
- **Image to HTML** — Export as Base64 HTML embed or ASCII art HTML page

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4
- **Libraries**: jsPDF, browser-image-compression, Tesseract.js, qrcode, jszip, Canvas API

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

## Limitations

- **Image to SVG**: embed mode only (vectorization is not implemented)
- **Image to GIF**: static single-frame GIF only; animated GIF from multiple images is not supported
- **GIF size**: large images are automatically downscaled to max 256×256 px before GIF encoding
