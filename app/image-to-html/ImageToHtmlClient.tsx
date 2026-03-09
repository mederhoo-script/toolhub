'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { imageToHtmlEmbed, asciiToHtmlDoc } from '@/lib/imageToHtml';
import { imageToAscii } from '@/lib/imageToAscii';
import ErrorAlert from '@/components/ErrorAlert';

type ExportMode = 'base64' | 'ascii';

function triggerDownload(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ImageToHtmlClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<ExportMode>('base64');
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setPreview(null);
    try {
      let html: string;
      if (mode === 'base64') {
        html = await imageToHtmlEmbed(file);
      } else {
        const ascii = await imageToAscii(file, { width: 100, density: 'standard', colored: false });
        html = asciiToHtmlDoc(ascii.text, false);
      }
      setPreview(html);
      const baseName = file.name.replace(/\.[^.]+$/, '');
      triggerDownload(html, `${baseName}-${mode}.html`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const MODES: { label: string; value: ExportMode; desc: string }[] = [
    {
      label: 'Base64 Embed',
      value: 'base64',
      desc: 'Embed the image as a base64 data URL inside a complete HTML page.',
    },
    {
      label: 'ASCII Art HTML',
      value: 'ascii',
      desc: 'Convert the image to ASCII art and wrap it in a styled HTML page.',
    },
  ];

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">Export mode</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODES.map(({ label, value, desc }) => (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={`text-left px-4 py-3 rounded-xl border-2 transition-colors ${
                  mode === value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
              >
                <p className={`font-semibold text-sm ${mode === value ? 'text-primary-700' : 'text-neutral-800'}`}>
                  {label}
                </p>
                <p className="text-xs text-neutral-500 mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Converting…' : 'Export as HTML'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {preview && (
        <div className="mt-6">
          <p className="text-sm text-green-700 font-medium mb-2">✓ HTML downloaded — preview below</p>
          <iframe
            srcDoc={preview}
            title="HTML preview"
            className="w-full h-64 border border-neutral-200 rounded-lg bg-white"
            sandbox="allow-same-origin"
          />
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
