export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolMeta {
  title: string;
  description: string;
  slug: string;
  icon: string;
}

export interface ConversionResult {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

export interface OCRProgress {
  status: string;
  progress: number;
}

export type ImageFormat = 'jpg' | 'png' | 'webp' | 'grayscale';
