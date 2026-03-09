'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { imageToAscii, asciiToHtml, AsciiDensity, AsciiResult } from '@/lib/imageToAscii';
import ErrorAlert from '@/components/ErrorAlert';

const DENSITIES: { label: string; value: AsciiDensity }[] = [
  { label: 'Standard', value: 'standard' },
  { label: 'Simple', value: 'simple' },
  { label: 'Blocks', value: 'blocks' },
];

function triggerDownload(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ImageToAsciiClient() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(100);
  const [density, setDensity] = useState<AsciiDensity>('standard');
  const [colored, setColored] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AsciiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const ascii = await imageToAscii(file, { width, density, colored });
      setResult(ascii);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    triggerDownload(result.text, 'ascii-art.txt', 'text/plain');
  };

  const handleDownloadHtml = () => {
    if (!result) return;
    const html = asciiToHtml(result, colored);
    triggerDownload(html, 'ascii-art.html', 'text/html');
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'image';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="ascii-width" className="block text-sm font-medium text-neutral-700 mb-1">
            Width: <span className="text-primary-600">{width} chars</span>
          </label>
          <input
            id="ascii-width"
            type="range"
            min={20}
            max={300}
            step={10}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>20</span><span>300</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Character set</p>
          <div className="flex gap-2 flex-wrap">
            {DENSITIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setDensity(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  density === value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={colored}
            onChange={(e) => setColored(e.target.checked)}
            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">Colored output (HTML preview)</span>
        </label>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Converting…' : 'Convert to ASCII'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {result && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-500">
            {result.rows} rows × {result.cols} cols
          </p>

          <div className="overflow-auto border border-neutral-200 rounded-lg bg-neutral-900 max-h-96">
            <pre
              className="text-[10px] leading-[1.1] p-3 font-mono"
              style={{ color: colored ? undefined : '#eee' }}
              aria-label="ASCII art preview"
              dangerouslySetInnerHTML={
                colored
                  ? { __html: result.htmlLines.join('\n') }
                  : undefined
              }
            >
              {!colored ? result.text : undefined}
            </pre>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 hover:border-primary-400 hover:text-primary-600 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy Text'}
            </button>
            <button
              onClick={handleDownloadTxt}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Download .txt
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-600 border border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Download .html
            </button>
          </div>
          <p className="text-xs text-neutral-400">
            Saved as: {baseName}-ascii
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
