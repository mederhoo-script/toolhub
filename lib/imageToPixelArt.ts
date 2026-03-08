export interface PixelArtOptions {
  pixelWidth: number;   // target downscale width (e.g. 32, 64)
  keepAspect: boolean;
  outputScale: number;  // factor to scale back up for preview/download (e.g. 8)
  format: 'png' | 'webp';
}

/**
 * Converts an image to pixelated "pixel art" by downscaling with
 * nearest-neighbour interpolation and then upscaling for the output.
 */
export async function imageToPixelArt(
  file: File,
  opts: PixelArtOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const maxPx = Math.min(512, Math.max(8, opts.pixelWidth));

        const smallW = maxPx;
        const smallH = opts.keepAspect
          ? Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * maxPx))
          : maxPx;

        // Downscale to tiny canvas (nearest-neighbour via default Canvas behaviour)
        const small = document.createElement('canvas');
        small.width = smallW;
        small.height = smallH;
        const smallCtx = small.getContext('2d');
        if (!smallCtx) throw new Error('Canvas context unavailable');
        smallCtx.imageSmoothingEnabled = false;
        smallCtx.drawImage(img, 0, 0, smallW, smallH);

        // Upscale — disable smoothing to keep the blocky pixel look
        const outW = smallW * opts.outputScale;
        const outH = smallH * opts.outputScale;
        const out = document.createElement('canvas');
        out.width = outW;
        out.height = outH;
        const outCtx = out.getContext('2d');
        if (!outCtx) throw new Error('Canvas context unavailable');
        outCtx.imageSmoothingEnabled = false;
        outCtx.drawImage(small, 0, 0, outW, outH);

        const mime = opts.format === 'webp' ? 'image/webp' : 'image/png';
        out.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob returned null'));
          },
          mime
        );
      } catch (err) {
        reject(new Error(`Pixel art conversion failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
