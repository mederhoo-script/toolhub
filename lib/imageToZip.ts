import JSZip from 'jszip';

export interface ZipEntry {
  name: string;
  blob: Blob;
}

/**
 * Packages an array of blobs into a single ZIP file.
 */
export async function filesToZip(entries: ZipEntry[]): Promise<Blob> {
  const zip = new JSZip();
  for (const { name, blob } of entries) {
    zip.file(name, blob);
  }
  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}
