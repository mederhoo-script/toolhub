import { OCRProgress } from '@/types';

/**
 * Extracts text from an image file using Tesseract.js OCR.
 * @param file - The image file to process
 * @param language - Tesseract language code (default: 'eng')
 * @param onProgress - Optional callback for progress updates
 * @returns The extracted text string
 */
export async function extractText(
  file: File,
  language = 'eng',
  onProgress?: (progress: OCRProgress) => void
): Promise<string> {
  // Dynamically import Tesseract to avoid SSR issues
  const Tesseract = await import('tesseract.js');

  try {
    const result = await Tesseract.recognize(file, language, {
      logger: (m: { status: string; progress: number }) => {
        if (onProgress) {
          onProgress({ status: m.status, progress: m.progress });
        }
      },
    });
    return result.data.text;
  } catch (err) {
    throw new Error(`OCR failed: ${(err as Error).message}`);
  }
}
