import QRCode from 'qrcode';

export type QRErrorLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Generates a QR code as a PNG data URL.
 */
export async function generateQrPng(
  text: string,
  size: number,
  errorLevel: QRErrorLevel
): Promise<string> {
  return QRCode.toDataURL(text, {
    width: size,
    margin: 2,
    errorCorrectionLevel: errorLevel,
    color: { dark: '#000000', light: '#ffffff' },
  });
}

/**
 * Generates a QR code as an SVG string.
 */
export async function generateQrSvg(
  text: string,
  size: number,
  errorLevel: QRErrorLevel
): Promise<string> {
  return QRCode.toString(text, {
    type: 'svg',
    width: size,
    margin: 2,
    errorCorrectionLevel: errorLevel,
  });
}
