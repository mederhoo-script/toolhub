'use client';

import { useState } from 'react';
import ToolNavigation from '@/components/ToolNavigation';
import { generateQrPng, generateQrSvg, QRErrorLevel } from '@/lib/imageToQr';

const SIZES = [256, 512, 1024] as const;
const ERROR_LEVELS: { label: string; value: QRErrorLevel }[] = [
  { label: 'L — 7%', value: 'L' },
  { label: 'M — 15%', value: 'M' },
  { label: 'Q — 25%', value: 'Q' },
  { label: 'H — 30%', value: 'H' },
];

export default function ImageToQrClient() {
  const [text, setText] = useState('');
  const [size, setSize] = useState<256 | 512 | 1024>(256);
  const [errorLevel, setErrorLevel] = useState<QRErrorLevel>('M');
  const [processing, setProcessing] = useState(false);
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter some text or a URL.');
      return;
    }
    setProcessing(true);
    setError(null);
    setPngDataUrl(null);
    setSvgString(null);
    try {
      const [png, svg] = await Promise.all([
        generateQrPng(trimmed, size, errorLevel),
        generateQrSvg(trimmed, size, errorLevel),
      ]);
      setPngDataUrl(png);
      setSvgString(svg);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPng = () => {
    if (!pngDataUrl) return;
    const a = document.createElement('a');
    a.href = pngDataUrl;
    a.download = 'qr-code.png';
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="qr-text" className="block text-sm font-medium text-neutral-700 mb-1">
            Text or URL
          </label>
          <textarea
            id="qr-text"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Size (px)</p>
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
                {s}px
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Error correction</p>
          <div className="flex flex-wrap gap-2">
            {ERROR_LEVELS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setErrorLevel(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  errorLevel === value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Generating…' : 'Generate QR Code'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {pngDataUrl && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-neutral-600">Preview:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pngDataUrl}
            alt="Generated QR code"
            width={256}
            height={256}
            className="border border-neutral-200 rounded-lg"
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={downloadPng}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={downloadSvg}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-primary-600 border border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Download SVG
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
