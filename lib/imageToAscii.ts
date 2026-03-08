export type AsciiDensity = 'standard' | 'simple' | 'blocks';

const CHAR_SETS: Record<AsciiDensity, string> = {
  standard: '@#S%?*+;:,. ',
  simple:   '@%#*+=-:. ',
  blocks:   '█▓▒░ ',
};

export interface AsciiOptions {
  width: number;        // characters per row (clamped 20–300)
  density: AsciiDensity;
  colored: boolean;
}

export interface AsciiResult {
  text: string;         // plain text (no colour)
  htmlLines: string[];  // each line is a <span>…</span> run for coloured display
  rows: number;
  cols: number;
}

/**
 * Converts an image file to ASCII art.
 * Each 2:1 pixel block maps to one character (because chars are ~2× taller).
 */
export async function imageToAscii(
  file: File,
  opts: AsciiOptions
): Promise<AsciiResult> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const cols = Math.min(300, Math.max(20, opts.width));
        const charAspect = 2.0; // characters are roughly twice as tall as wide
        const scale = cols / img.naturalWidth;
        const rows = Math.max(1, Math.round(img.naturalHeight * scale / charAspect));

        const canvas = document.createElement('canvas');
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.drawImage(img, 0, 0, cols, rows);

        const { data } = ctx.getImageData(0, 0, cols, rows);
        const chars = CHAR_SETS[opts.density];
        const lines: string[] = [];
        const htmlLines: string[] = [];

        for (let y = 0; y < rows; y++) {
          let line = '';
          let htmlLine = '';

          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            if (a < 30) {
              line += ' ';
              htmlLine += ' ';
              continue;
            }

            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            const charIdx = Math.floor(brightness * (chars.length - 1));
            const ch = chars[charIdx];
            line += ch;

            if (opts.colored) {
              htmlLine += `<span style="color:rgb(${r},${g},${b})">${escapeHtml(ch)}</span>`;
            } else {
              htmlLine += escapeHtml(ch);
            }
          }

          lines.push(line);
          htmlLines.push(htmlLine);
        }

        resolve({ text: lines.join('\n'), htmlLines, rows, cols });
      } catch (err) {
        reject(new Error(`ASCII conversion failed: ${(err as Error).message}`));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Wraps an ASCII result in a minimal HTML document.
 */
export function asciiToHtml(result: AsciiResult, colored: boolean): string {
  const body = colored
    ? result.htmlLines.join('\n')
    : escapeHtml(result.text);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ASCII Art</title>
<style>
  body { background:#111; margin:0; padding:16px; }
  pre  { font-family:monospace; font-size:10px; line-height:1.1;
         color:#eee; white-space:pre; }
</style>
</head>
<body>
<pre>${body}</pre>
</body>
</html>`;
}
