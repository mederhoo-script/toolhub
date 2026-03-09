'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { imageToPixelArt } from '@/lib/imageToPixelArt';
import ErrorAlert from '@/components/ErrorAlert';

const PIXEL_SIZES = [16, 32, 64, 128] as const;
const OUTPUT_SCALES = [4, 8, 12] as const;
const FORMATS = ['png', 'webp'] as const;

export default function ImageToPixelArtClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pixelWidth, setPixelWidth] = useState<16 | 32 | 64 | 128>(32);
  const [outputScale, setOutputScale] = useState<4 | 8 | 12>(8);
  const [format, setFormat] = useState<'png' | 'webp'>('png');
  const [keepAspect, setKeepAspect] = useState(true);
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
      const blob = await imageToPixelArt(file, { pixelWidth, keepAspect, outputScale, format });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'pixel-art';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Pixel grid width</p>
          <div className="flex gap-2 flex-wrap">
            {PIXEL_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setPixelWidth(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  pixelWidth === s
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Output scale</p>
          <div className="flex gap-2">
            {OUTPUT_SCALES.map((s) => (
              <button
                key={s}
                onClick={() => setOutputScale(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  outputScale === s
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Output format</p>
          <div className="flex gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors uppercase ${
                  format === f
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={keepAspect}
            onChange={(e) => setKeepAspect(e.target.checked)}
            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">Keep aspect ratio</span>
        </label>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Converting…' : 'Convert to Pixel Art'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {outputUrl && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-600">Preview:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outputUrl}
            alt="Pixel art preview"
            className="max-w-full border border-neutral-200 rounded-lg"
            style={{ imageRendering: 'pixelated', maxHeight: '400px' }}
          />
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}-pixel-art.${format}`}
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
