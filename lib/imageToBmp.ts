/**
 * Minimal 24-bit BMP encoder.
 *
 * BMP format (Windows v3 DIB header, uncompressed BGR pixels):
 *   14 bytes file header
 *   40 bytes DIB header (BITMAPINFOHEADER)
 *   Pixel data: rows stored bottom-to-top, each row padded to 4-byte boundary
 */
export async function imageToBmp(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, w, h); // RGBA

        // Row stride: each pixel is 3 bytes (BGR), padded to multiple of 4
        const rowSize = Math.ceil((w * 3) / 4) * 4;
        const pixelDataSize = rowSize * h;
        const fileSize = 54 + pixelDataSize; // 14 + 40 + pixels

        const buf = new ArrayBuffer(fileSize);
        const view = new DataView(buf);
        let offset = 0;

        // ---- File header (14 bytes) ----
        view.setUint16(offset, 0x4d42, true); offset += 2; // 'BM'
        view.setUint32(offset, fileSize, true); offset += 4;
        view.setUint32(offset, 0, true); offset += 4; // reserved
        view.setUint32(offset, 54, true); offset += 4; // pixel data offset

        // ---- DIB header / BITMAPINFOHEADER (40 bytes) ----
        view.setUint32(offset, 40, true); offset += 4;   // header size
        view.setInt32(offset, w, true); offset += 4;     // width
        view.setInt32(offset, -h, true); offset += 4;    // height (negative → top-down)
        view.setUint16(offset, 1, true); offset += 2;    // colour planes
        view.setUint16(offset, 24, true); offset += 2;   // bits per pixel (24-bit RGB)
        view.setUint32(offset, 0, true); offset += 4;    // compression (BI_RGB)
        view.setUint32(offset, pixelDataSize, true); offset += 4;
        view.setInt32(offset, 2835, true); offset += 4;  // X pixels/metre (~72 DPI)
        view.setInt32(offset, 2835, true); offset += 4;  // Y pixels/metre
        view.setUint32(offset, 0, true); offset += 4;    // colours in table
        view.setUint32(offset, 0, true); offset += 4;    // important colours

        // ---- Pixel data ----
        const pixels = new Uint8Array(buf, 54);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const src = (y * w + x) * 4;    // RGBA source index
            const dst = y * rowSize + x * 3; // BGR destination index
            pixels[dst]     = data[src + 2]; // B
            pixels[dst + 1] = data[src + 1]; // G
            pixels[dst + 2] = data[src];     // R
          }
        }

        resolve(new Blob([buf], { type: 'image/bmp' }));
      } catch (err) {
        reject(new Error(`BMP encoding failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
