'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { toFavicon } from '@/lib/imageToFavicon';

const SIZES = [16, 32, 64] as const;
type FaviconSize = typeof SIZES[number];

export default function ImageToFaviconClient() {
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState<FaviconSize>(32);
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
      const blob = await toFavicon(file, size);
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'favicon';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={10} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Output size</p>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  size === s
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {s}×{s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Generating…' : 'Generate Favicon'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {outputUrl && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-600">
            Preview:
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outputUrl}
            alt="Favicon preview"
            width={size * 2}
            height={size * 2}
            className="border border-neutral-200 rounded"
            style={{ imageRendering: 'pixelated' }}
          />
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}-favicon-${size}x${size}.png`}
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
