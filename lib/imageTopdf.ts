import { jsPDF } from 'jspdf';

/**
 * Converts an image file to a PDF document (A4 or Letter size).
 * The image is scaled to fit within the page while maintaining aspect ratio.
 * @param file - The image file to convert
 * @param pageSize - 'a4' or 'letter'
 * @returns A Blob containing the PDF data
 */
export async function convertImageToPdf(
  file: File,
  pageSize: 'a4' | 'letter' = 'a4'
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const dataUrl = e.target?.result as string;
        const img = new window.Image();
        img.onload = () => {
          try {
            const pdf = new jsPDF({
              orientation: img.width > img.height ? 'landscape' : 'portrait',
              unit: 'pt',
              format: pageSize,
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;

            const availW = pageWidth - margin * 2;
            const availH = pageHeight - margin * 2;

            const ratio = Math.min(availW / img.width, availH / img.height);
            const drawW = img.width * ratio;
            const drawH = img.height * ratio;
            const offsetX = margin + (availW - drawW) / 2;
            const offsetY = margin + (availH - drawH) / 2;

            const ext = file.type === 'image/png' ? 'PNG' : 'JPEG';
            pdf.addImage(dataUrl, ext, offsetX, offsetY, drawW, drawH);

            const blob = pdf.output('blob');
            resolve(blob);
          } catch (err) {
            reject(new Error(`PDF generation failed: ${(err as Error).message}`));
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = dataUrl;
      } catch (err) {
        reject(new Error(`File reading failed: ${(err as Error).message}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
