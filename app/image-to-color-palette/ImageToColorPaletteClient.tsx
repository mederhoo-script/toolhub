'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { extractPalette, PaletteColor } from '@/lib/imageToColorPalette';

const COUNTS = [5, 8, 10] as const;

export default function ImageToColorPaletteClient() {
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState<5 | 8 | 10>(8);
  const [processing, setProcessing] = useState(false);
  const [palette, setPalette] = useState<PaletteColor[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPalette(null);
    setError(null);
  };

  const handleExtract = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const colors = await extractPalette(file, count);
      setPalette(colors);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Number of colors</p>
          <div className="flex gap-2">
            {COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setCount(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  count === c
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {c} colors
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Extracting…' : 'Extract Colors'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {palette && (
        <div className="mt-6">
          <p className="text-sm font-medium text-neutral-700 mb-3">Color palette</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {palette.map((color) => (
              <div
                key={color.hex}
                className="flex flex-col items-center gap-2 p-3 border border-neutral-200 rounded-xl bg-white"
              >
                <div
                  className="w-16 h-16 rounded-lg shadow-sm border border-neutral-200"
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Color swatch ${color.hex}`}
                />
                <span className="text-xs font-mono text-neutral-700">{color.hex}</span>
                <button
                  onClick={() => copyHex(color.hex)}
                  aria-label={`Copy ${color.hex} to clipboard`}
                  className="text-xs px-3 py-1 rounded-full border border-neutral-300 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  {copied === color.hex ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
