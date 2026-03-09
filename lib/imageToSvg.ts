/**
 * Wraps a raster image inside an SVG <image> element (embed mode).
 * The image is base64-encoded and embedded as a data URL so the resulting
 * .svg file is fully self-contained.
 */
export async function imageToSvgEmbed(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;

      const img = new window.Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const mimeType = file.type || 'image/png';
        const svg = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`,
          `     width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
          `  <image href="${dataUrl}" x="0" y="0" width="${w}" height="${h}"`,
          `         preserveAspectRatio="xMidYMid meet" mime-type="${mimeType}"/>`,
          `</svg>`,
        ].join('\n');
        resolve(svg);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
