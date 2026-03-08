'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { convertTo } from '@/lib/convertFormat';

export default function ImageToWebpClient() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(85);
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
      const blob = await convertTo(file, 'webp', quality / 100);
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

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="webp-quality" className="block text-sm font-medium text-neutral-700 mb-1">
            Quality: <strong>{quality}</strong>
          </label>
          <input
            id="webp-quality"
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full max-w-xs accent-primary-600"
            aria-valuemin={1}
            aria-valuemax={100}
            aria-valuenow={quality}
          />
          <div className="flex justify-between text-xs text-neutral-400 max-w-xs mt-1">
            <span>Smallest</span>
            <span>Highest</span>
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Converting…' : 'Convert to WebP'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {outputUrl && (
        <div className="mt-6">
          <DownloadButton fileUrl={outputUrl} fileName={`${baseName}.webp`} disabled={false} />
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
