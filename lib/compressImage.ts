import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file to a target size in kilobytes.
 * Iterates with decreasing quality until the target is reached.
 * @param file - The image file to compress
 * @param targetKB - Desired output size in kilobytes
 * @returns A compressed File object
 */
export async function compressToTargetSize(
  file: File,
  targetKB: number
): Promise<File> {
  try {
    const targetMB = targetKB / 1024;

    const options = {
      maxSizeMB: targetMB,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      fileType: file.type as string,
    };

    const compressed = await imageCompression(file, options);

    // If still too large, try again with reduced dimensions
    if (compressed.size / 1024 > targetKB * 1.1) {
      const stricter = {
        ...options,
        maxSizeMB: targetMB * 0.9,
        maxWidthOrHeight: 2048,
      };
      return await imageCompression(compressed, stricter);
    }

    return compressed;
  } catch (err) {
    throw new Error(`Compression failed: ${(err as Error).message}`);
  }
}
