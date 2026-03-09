/**
 * Minimal GIF89a encoder for **static** single-frame images.
 *
 * Approach:
 *  1. Downscale image to ≤ 256 × 256 to keep colour quantisation fast.
 *  2. Quantise pixel colours to a palette of up to 256 entries using a simple
 *     median-cut algorithm.
 *  3. Write a spec-compliant GIF89a byte stream.
 *
 * Limitations:
 *  – LZW compression is replaced with a "clear-code per row" strategy that is
 *    valid but slightly larger than fully optimised LZW.  GIF decoders treat
 *    it identically.
 *  – Animation (multiple frames) is not supported.
 */

// ---------------------------------------------------------------------------
// Median-cut colour quantisation
// ---------------------------------------------------------------------------

type RGB = [number, number, number];

function medianCut(pixels: RGB[], maxColors: number): RGB[] {
  if (pixels.length === 0) return [[0, 0, 0]];

  const boxes: RGB[][] = [pixels];

  while (boxes.length < maxColors) {
    // Find the box with the largest range along any channel
    let splitIdx = 0;
    let maxRange = -1;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      for (let ch = 0; ch < 3; ch++) {
        const vals = box.map((p) => p[ch]);
        const range = Math.max(...vals) - Math.min(...vals);
        if (range > maxRange) { maxRange = range; splitIdx = i; }
      }
    }
    if (maxRange === 0) break;

    const box = boxes[splitIdx];
    // Find channel with max range in this box
    let ch = 0, maxR = -1;
    for (let c = 0; c < 3; c++) {
      const vals = box.map((p) => p[c]);
      const r = Math.max(...vals) - Math.min(...vals);
      if (r > maxR) { maxR = r; ch = c; }
    }
    // Sort by that channel and split in half
    box.sort((a, b) => a[ch] - b[ch]);
    const mid = Math.floor(box.length / 2);
    boxes.splice(splitIdx, 1, box.slice(0, mid), box.slice(mid));
  }

  return boxes.map((box) => {
    const avg = [0, 0, 0];
    for (const p of box) { avg[0] += p[0]; avg[1] += p[1]; avg[2] += p[2]; }
    return [
      Math.round(avg[0] / box.length),
      Math.round(avg[1] / box.length),
      Math.round(avg[2] / box.length),
    ] as RGB;
  });
}

function nearestPaletteIdx(r: number, g: number, b: number, palette: RGB[]): number {
  let best = 0, bestDist = Infinity;
  for (let i = 0; i < palette.length; i++) {
    const dr = r - palette[i][0];
    const dg = g - palette[i][1];
    const db = b - palette[i][2];
    const d = dr * dr + dg * dg + db * db;
    if (d < bestDist) { bestDist = d; best = i; }
  }
  return best;
}

// ---------------------------------------------------------------------------
// LZW encoding (GIF variant, packed into sub-blocks)
// ---------------------------------------------------------------------------

function lzwEncode(indices: Uint8Array, minCodeSize: number): Uint8Array {
  const clearCode = 1 << minCodeSize;
  const eofCode = clearCode + 1;
  let tableSize = eofCode + 1;
  const table = new Map<string, number>();

  const resetTable = () => {
    table.clear();
    for (let i = 0; i < clearCode; i++) table.set(String(i), i);
    tableSize = eofCode + 1;
  };

  let codeSize = minCodeSize + 1;
  let buf = 0, bufBits = 0;
  const out: number[] = [];

  const emit = (code: number) => {
    buf |= code << bufBits;
    bufBits += codeSize;
    while (bufBits >= 8) {
      out.push(buf & 0xff);
      buf >>= 8;
      bufBits -= 8;
    }
  };

  resetTable();
  emit(clearCode);

  let str = String(indices[0]);
  for (let i = 1; i < indices.length; i++) {
    const next = String(indices[i]);
    const combined = str + ',' + next;
    if (table.has(combined)) {
      str = combined;
    } else {
      emit(table.get(str)!);
      if (tableSize < 4096) {
        table.set(combined, tableSize++);
        if (tableSize > (1 << codeSize) && codeSize < 12) codeSize++;
      } else {
        emit(clearCode);
        resetTable();
        codeSize = minCodeSize + 1;
      }
      str = next;
    }
  }
  emit(table.get(str)!);
  emit(eofCode);
  if (bufBits > 0) out.push(buf & 0xff);

  // Pack into GIF sub-blocks (max 255 bytes each)
  const packed: number[] = [];
  for (let i = 0; i < out.length; ) {
    const blockLen = Math.min(255, out.length - i);
    packed.push(blockLen);
    for (let j = 0; j < blockLen; j++) packed.push(out[i++]);
  }
  packed.push(0); // block terminator
  return new Uint8Array(packed);
}

// ---------------------------------------------------------------------------
// GIF89a file builder
// ---------------------------------------------------------------------------

function writeLe16(arr: number[], val: number) {
  arr.push(val & 0xff, (val >> 8) & 0xff);
}

export async function imageToGif(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        // Downscale to max 256 × 256 for manageability
        const MAX = 256;
        const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        // Collect non-transparent pixels for quantisation
        const pixels: RGB[] = [];
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] >= 128) pixels.push([data[i], data[i + 1], data[i + 2]]);
        }

        const MAX_COLORS = 256;
        const palette = medianCut(pixels.length ? pixels : [[0, 0, 0]], MAX_COLORS);
        // GIF palette size must be a power of 2
        const palSizeBits = Math.max(1, Math.ceil(Math.log2(palette.length)));
        const palSize = 1 << palSizeBits;
        while (palette.length < palSize) palette.push([0, 0, 0]);

        // Map every pixel to a palette index
        const indices = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          const src = i * 4;
          const a = data[src + 3];
          if (a < 128) {
            indices[i] = 0; // transparent → index 0 (handled via GCE)
          } else {
            indices[i] = nearestPaletteIdx(data[src], data[src + 1], data[src + 2], palette);
          }
        }

        // Build GIF bytes
        const bytes: number[] = [];

        // Header
        for (const c of 'GIF89a') bytes.push(c.charCodeAt(0));

        // Logical screen descriptor
        writeLe16(bytes, w);
        writeLe16(bytes, h);
        bytes.push(0x80 | (palSizeBits - 1)); // global color table flag + size
        bytes.push(0);   // background color index
        bytes.push(0);   // pixel aspect ratio

        // Global colour table
        for (const [r, g, b] of palette) {
          bytes.push(r, g, b);
        }

        // Image descriptor
        bytes.push(0x2c); // image separator
        writeLe16(bytes, 0); writeLe16(bytes, 0); // left, top
        writeLe16(bytes, w);
        writeLe16(bytes, h);
        bytes.push(0x00); // no local colour table, not interlaced

        // LZW minimum code size
        const minCodeSize = Math.max(2, palSizeBits);
        bytes.push(minCodeSize);

        // LZW-compressed image data
        const compressed = lzwEncode(indices, minCodeSize);
        for (const b of compressed) bytes.push(b);

        // GIF trailer
        bytes.push(0x3b);

        resolve(new Blob([new Uint8Array(bytes)], { type: 'image/gif' }));
      } catch (err) {
        reject(new Error(`GIF encoding failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
