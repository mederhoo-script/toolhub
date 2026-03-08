import { ImageFormat } from '@/types';

/**
 * Converts an image file to a specified format using the Canvas API.
 * Supports jpg, png, webp, and grayscale conversions.
 * @param file - The source image file
 * @param format - Target format
 * @param quality - Output quality (0–1, used for jpg/webp)
 * @returns A Blob in the target format
 */
export async function convertTo(
  file: File,
  format: ImageFormat,
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        if (format === 'grayscale') {
          ctx.filter = 'grayscale(100%)';
        }

        ctx.drawImage(img, 0, 0);

        if (format === 'grayscale') {
          // Reinforce grayscale via pixel manipulation for wider compatibility
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }
          ctx.putImageData(imageData, 0, 0);
        }

        const mimeMap: Record<ImageFormat, string> = {
          jpg: 'image/jpeg',
          png: 'image/png',
          webp: 'image/webp',
          grayscale: 'image/png',
        };

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob returned null'));
          },
          mimeMap[format],
          format === 'png' || format === 'grayscale' ? undefined : quality
        );
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(new Error(`Conversion failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
