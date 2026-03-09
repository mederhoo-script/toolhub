'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { generateIconSet, packZip, ICON_SIZES, IconSize } from '@/lib/imageToIcon';
import ErrorAlert from '@/components/ErrorAlert';

export default function ImageToIconClient() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Set<IconSize>>(new Set(ICON_SIZES));
  const [processing, setProcessing] = useState(false);
  const [iconBlobs, setIconBlobs] = useState<Map<IconSize, Blob> | null>(null);
  const [iconUrls, setIconUrls] = useState<Map<IconSize, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setIconBlobs(null);
    setIconUrls(null);
    setError(null);
  };

  const toggleSize = (size: IconSize) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) {
        if (next.size > 1) next.delete(size); // keep at least one
      } else {
        next.add(size);
      }
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const sizes = ICON_SIZES.filter((s) => selectedSizes.has(s));
      const blobs = await generateIconSet(file, sizes);
      const urls = new Map<IconSize, string>();
      blobs.forEach((blob, size) => urls.set(size, URL.createObjectURL(blob)));
      setIconBlobs(blobs);
      setIconUrls(urls);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (size: IconSize) => {
    const url = iconUrls?.get(size);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `icon-${size}x${size}.png`;
    a.click();
  };

  const downloadZip = async () => {
    if (!iconBlobs) return;
    setProcessing(true);
    try {
      const entries = Array.from(iconBlobs.entries()).map(([size, blob]) => ({
        name: `icon-${size}x${size}.png`,
        blob,
      }));
      const zip = await packZip(entries);
      const url = URL.createObjectURL(zip);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'icons.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Sizes to generate</p>
          <div className="flex flex-wrap gap-2">
            {ICON_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                aria-pressed={selectedSizes.has(size)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  selectedSizes.has(size)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Generating…' : 'Generate Icons'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {iconUrls && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            {ICON_SIZES.filter((s) => iconUrls.has(s)).map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconUrls.get(size)!}
                  alt={`${size}×${size} icon preview`}
                  width={Math.min(size, 64)}
                  height={Math.min(size, 64)}
                  className="border border-neutral-200 rounded"
                  style={{ imageRendering: size <= 64 ? 'pixelated' : 'auto' }}
                />
                <span className="text-xs text-neutral-500">{size}px</span>
                <button
                  onClick={() => downloadSingle(size)}
                  className="text-xs px-2 py-1 rounded border border-neutral-300 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  ↓ PNG
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={downloadZip}
            disabled={processing}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            Download All as ZIP
          </button>
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
