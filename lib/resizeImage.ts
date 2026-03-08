/**
 * Resizes an image file to the specified dimensions using the Canvas API.
 * @param file - The source image file
 * @param width - Target width in pixels
 * @param height - Target height in pixels
 * @param maintainAspect - Whether to maintain the original aspect ratio
 * @returns A Blob of the resized image (PNG)
 */
export async function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect: boolean
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        let targetW = width;
        let targetH = height;

        if (maintainAspect) {
          const ratio = img.naturalWidth / img.naturalHeight;
          if (width / height > ratio) {
            targetW = Math.round(height * ratio);
          } else {
            targetH = Math.round(width / ratio);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        ctx.drawImage(img, 0, 0, targetW, targetH);

        const outputMime = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
        const quality = file.type === 'image/jpeg' ? 0.92 : undefined;

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob returned null'));
          },
          outputMime,
          quality
        );
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(new Error(`Resize failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
