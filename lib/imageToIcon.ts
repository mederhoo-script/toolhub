import JSZip from 'jszip';

export const ICON_SIZES = [16, 32, 48, 64, 128, 256, 512] as const;
export type IconSize = (typeof ICON_SIZES)[number];

/**
 * Renders the image onto a canvas at the given square size and returns
 * a PNG Blob.
 */
export async function renderIconSize(img: HTMLImageElement, size: IconSize): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context unavailable'));
      return;
    }
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error(`toBlob failed for size ${size}`));
    }, 'image/png');
  });
}

/**
 * Loads an image file and generates icon PNGs for all requested sizes.
 * Returns a map of size → Blob.
 */
export async function generateIconSet(
  file: File,
  sizes: readonly IconSize[] = ICON_SIZES
): Promise<Map<IconSize, Blob>> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(url);
      try {
        const result = new Map<IconSize, Blob>();
        for (const size of sizes) {
          result.set(size, await renderIconSize(img, size));
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Packages multiple Blobs (with filenames) into a ZIP file and returns the
 * ZIP as a Blob.
 */
export async function packZip(files: { name: string; blob: Blob }[]): Promise<Blob> {
  const zip = new JSZip();
  for (const { name, blob } of files) {
    zip.file(name, blob);
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
}
