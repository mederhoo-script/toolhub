export interface PaletteColor {
  hex: string;
  r: number;
  g: number;
  b: number;
  count: number;
}

/**
 * Extracts dominant colours from an image using a simple quantisation
 * approach: the image is downscaled on a canvas, pixel data is read, pixels
 * are bucketed by quantising each RGB channel to 5 bits (32 levels), and the
 * top N buckets by frequency are returned.
 */
export async function extractPalette(
  file: File,
  count = 8
): Promise<PaletteColor[]> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        // Sample at a fixed resolution to keep it fast for large images
        const MAX = 200;
        const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        // Quantise each channel to 5 bits → 32 levels
        const SHIFT = 3;
        const buckets = new Map<number, { r: number; g: number; b: number; count: number }>();

        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 128) continue; // skip transparent pixels

          const r = data[i] >> SHIFT;
          const g = data[i + 1] >> SHIFT;
          const b = data[i + 2] >> SHIFT;
          const key = (r << 10) | (g << 5) | b;

          const existing = buckets.get(key);
          if (existing) {
            existing.count++;
          } else {
            buckets.set(key, {
              r: data[i],
              g: data[i + 1],
              b: data[i + 2],
              count: 1,
            });
          }
        }

        // Sort by frequency descending and pick the top N
        const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);

        const palette: PaletteColor[] = sorted.slice(0, count).map((c) => ({
          hex: `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`,
          r: c.r,
          g: c.g,
          b: c.b,
          count: c.count,
        }));

        resolve(palette);
      } catch (err) {
        reject(new Error(`Palette extraction failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

function toHex(n: number): string {
  return n.toString(16).padStart(2, '0');
}
