/**
 * Converts an image file to an HTML document with two export variants:
 *  1. Base64 <img> snippet – the image is embedded as a data URL.
 *  2. ASCII art HTML – wraps ASCII text in a styled <pre>.
 */

/**
 * Reads a file and returns it as a base64 data URL.
 */
export async function imageToBase64DataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a self-contained HTML document that embeds the image as a
 * base64 data URL.
 */
export async function imageToHtmlEmbed(file: File): Promise<string> {
  const dataUrl = await imageToBase64DataUrl(file);
  const safeName = file.name.replace(/[<>&"]/g, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeName}</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center;
         min-height:100vh; background:#f5f5f5; }
  img  { max-width:100%; height:auto; box-shadow:0 4px 16px rgba(0,0,0,.2); }
</style>
</head>
<body>
<img src="${dataUrl}" alt="${safeName}">
</body>
</html>`;
}

/**
 * Generates an HTML document that displays ASCII art inside a <pre> element.
 */
export function asciiToHtmlDoc(asciiText: string, colored = false, htmlLines?: string[]): string {
  const body = colored && htmlLines
    ? htmlLines.join('\n')
    : asciiText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ASCII Art</title>
<style>
  body { margin:0; padding:16px; background:#111; }
  pre  { font-family:monospace; font-size:10px; line-height:1.15;
         color:#eee; white-space:pre; }
</style>
</head>
<body>
<pre>${body}</pre>
</body>
</html>`;
}
