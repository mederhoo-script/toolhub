/**
 * Converts an image file to a favicon PNG at the specified size.
 * @param file - The source image file
 * @param size - Output dimension in pixels (16, 32, or 64)
 * @returns A Blob containing the favicon PNG
 */
export async function toFavicon(
  file: File,
  size: 16 | 32 | 64 = 32
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        // Draw image scaled to the target size, centred with cover behaviour
        const ratio = Math.min(size / img.naturalWidth, size / img.naturalHeight);
        const drawW = img.naturalWidth * ratio;
        const drawH = img.naturalHeight * ratio;
        const offsetX = (size - drawW) / 2;
        const offsetY = (size - drawH) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob returned null'));
          },
          'image/png'
        );
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(new Error(`Favicon generation failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
