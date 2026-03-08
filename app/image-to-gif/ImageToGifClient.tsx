'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { imageToGif } from '@/lib/imageToGif';

export default function ImageToGifClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setOutputUrl(null);
    setOutputSize(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const blob = await imageToGif(file);
      setOutputUrl(URL.createObjectURL(blob));
      setOutputSize(blob.size);
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

      <div className="mt-6 space-y-3">
        <p className="text-sm text-neutral-500">
          Note: GIF supports max 256 colours. Large images are downscaled to 256×256 px.
        </p>
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Converting…' : 'Convert to GIF'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {outputUrl && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-green-700 font-medium">
            ✓ GIF generated
            {outputSize !== null && (
              <span className="ml-2 text-neutral-500">
                ({(outputSize / 1024).toFixed(0)} KB)
              </span>
            )}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outputUrl}
            alt="GIF preview"
            className="max-w-xs border border-neutral-200 rounded-lg"
          />
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}.gif`}
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
