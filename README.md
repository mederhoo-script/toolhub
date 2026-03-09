# Free Image Tool Hub

A production-ready **Next.js 16** web application with **20 browser-based image processing tools** — all processing happens client-side, with zero file uploads and no sign-up required.

🌐 **Live:** [toolhub.vercel.app](https://toolhub.vercel.app)

---

## ✨ Features

- 🔒 **100% Private** — images never leave your device
- ⚡ **Instant Results** — no server queues, no waiting
- 🆓 **Always Free** — no account, no watermarks, no limits
- 📱 **Works Everywhere** — mobile-friendly, accessible, keyboard-navigable
- 🔍 **Search & Filter** — find tools by name or category in seconds

---

## 🛠 Tools

### Convert
| Tool | Description |
|------|-------------|
| [Image to PDF](/image-to-pdf) | Convert to A4 or Letter PDF |
| [Image to JPG](/image-to-jpg) | Convert with adjustable quality slider |
| [Image to PNG](/image-to-png) | Lossless, transparency preserved |
| [Image to WebP](/image-to-webp) | 30–50% smaller than JPG/PNG |
| [Image to SVG](/image-to-svg) | Embed raster image in a self-contained SVG |
| [Image to BMP](/image-to-bmp) | Uncompressed 24-bit BMP |
| [Image to GIF](/image-to-gif) | Static GIF with median-cut quantisation |
| [Convert to Grayscale](/image-to-grayscale) | Remove colour instantly |

### Optimize
| Tool | Description |
|------|-------------|
| [Compress Image](/compress-image) | Reduce to 50/100/200 KB or a custom target |
| [Resize Image](/resize-image) | Exact dimensions with aspect ratio lock |

### Extract
| Tool | Description |
|------|-------------|
| [Image to Text (OCR)](/image-to-text) | Extract text using Tesseract.js (9 languages) |
| [Image to Base64](/image-to-base64) | Encode as data URL for HTML/CSS embedding |
| [Color Palette Extractor](/image-to-color-palette) | Extract dominant colours; copy HEX codes |
| [Image to ASCII Art](/image-to-ascii) | Convert to ASCII text art; download .txt or .html |

### Generate
| Tool | Description |
|------|-------------|
| [QR Code Generator](/image-to-qr) | Generate QR codes from text/URL; download PNG or SVG |
| [Image to Favicon](/image-to-favicon) | Generate 16×16, 32×32, 64×64 favicon PNGs |
| [Image to Icon Set](/image-to-icon) | Generate 16–512 px icons; download individually or as ZIP |
| [Image to Pixel Art](/image-to-pixel-art) | Pixelate images with nearest-neighbour scaling |

### Export
| Tool | Description |
|------|-------------|
| [Images to ZIP](/image-to-zip) | Package multiple images into a single ZIP archive |
| [Image to HTML](/image-to-html) | Export as Base64 HTML embed or ASCII art HTML page |

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| PDF | jsPDF |
| Compression | browser-image-compression |
| OCR | Tesseract.js |
| QR | qrcode |
| ZIP | JSZip |
| Image ops | Canvas API, FileReader API, Web Workers |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## 📁 Project Structure

```
app/
  page.tsx              # Home page with hero, feature strip, tool grid
  layout.tsx            # Root layout with metadata
  not-found.tsx         # Custom 404 page
  globals.css           # Tailwind theme + utility classes
  HomeSearch.tsx        # Client: search + category filter for tools
  [tool-slug]/
    page.tsx            # Tool page with metadata + FAQs
    [Tool]Client.tsx    # Client component with actual tool logic

components/
  ToolLayout.tsx        # Shared layout for all tool pages
  FileUploader.tsx      # Drag-and-drop file upload component
  DownloadButton.tsx    # Styled download button
  ActionButton.tsx      # Primary action button (process/convert)
  ErrorAlert.tsx        # Styled error message component
  FAQSection.tsx        # Accordion FAQ with JSON-LD schema
  AdBanner.tsx          # Ad placeholder
  ToolNavigation.tsx    # Horizontal tool pill navigation

lib/
  convertFormat.ts      # JPG / PNG / WebP / Grayscale via Canvas
  compressImage.ts      # browser-image-compression wrapper
  resizeImage.ts        # Canvas-based resize
  imageTopdf.ts         # jsPDF wrapper
  imageToText.ts        # Tesseract.js OCR
  imageToBase64.ts      # FileReader data URL
  imageToQr.ts          # qrcode library
  imageToSvg.ts         # SVG embed generator
  imageToFavicon.ts     # Canvas resize to favicon sizes
  imageToColorPalette.ts# K-means dominant colour extraction
  imageToAscii.ts       # ASCII art renderer
  imageToPixelArt.ts    # Nearest-neighbour pixelation
  imageToIcon.ts        # Multi-size icon generator
  imageToBmp.ts         # Pure-JS 24-bit BMP encoder
  imageToGif.ts         # Median-cut GIF encoder + LZW
  imageToZip.ts         # JSZip multi-image packer
  imageToHtml.ts        # HTML embed / ASCII HTML export

public/
  logo.svg              # App logo
  og-default.svg        # Open Graph social sharing image
```

---

## ⚠️ Known Limitations

- **Image to SVG**: embed mode only (no rasterization/vectorization)
- **Image to GIF**: static single-frame GIF; no multi-frame animation support
- **GIF size**: large images auto-downscaled to max 256×256 px before encoding

