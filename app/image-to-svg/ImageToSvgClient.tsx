'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { imageToSvgEmbed } from '@/lib/imageToSvg';
import ErrorAlert from '@/components/ErrorAlert';

export default function ImageToSvgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setOutputUrl(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const svgString = await imageToSvgEmbed(file);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'image';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6">
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Converting…' : 'Convert to SVG'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {outputUrl && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-green-700 font-medium">✓ SVG generated successfully</p>
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}.svg`}
            disabled={false}
          />
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
