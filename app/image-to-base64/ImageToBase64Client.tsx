'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { toBase64 } from '@/lib/imageToBase64';

export default function ImageToBase64Client() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (f: File) => {
    setResult(null);
    setError(null);
    setCopied(false);
    setProcessing(true);
    try {
      const b64 = await toBase64(f);
      setResult(b64);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={10} />

      {processing && (
        <p className="mt-4 text-sm text-neutral-500 animate-pulse">
          Encoding…
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700">
              Base64 data URL ({(result.length / 1024).toFixed(1)} KB)
            </p>
            <button
              onClick={handleCopy}
              aria-label="Copy Base64 string to clipboard"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                'Copy'
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={6}
            aria-label="Base64 encoded image string"
            className="w-full font-mono text-xs border border-neutral-200 rounded-lg p-3 bg-neutral-50 resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
