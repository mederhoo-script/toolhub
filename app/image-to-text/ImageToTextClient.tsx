'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ToolNavigation from '@/components/ToolNavigation';
import { OCRProgress } from '@/types';

const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'fra', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'spa', label: 'Spanish' },
  { code: 'por', label: 'Portuguese' },
  { code: 'ita', label: 'Italian' },
  { code: 'chi_sim', label: 'Chinese (Simplified)' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'ara', label: 'Arabic' },
];

export default function ImageToTextClient() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('eng');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  const handleExtract = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);
    try {
      // Dynamically import to avoid SSR issues with Tesseract.js worker
      const { extractText } = await import('@/lib/imageToText');
      const text = await extractText(file, language, (p) => setProgress(p));
      setResult(text);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy text');
    }
  };

  const progressPercent = progress ? Math.round(progress.progress * 100) : 0;

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={10} />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="ocr-lang" className="block text-sm font-medium text-neutral-700 mb-1">
            Language
          </label>
          <select
            id="ocr-lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Extracting…' : 'Extract Text'}
        </button>
      </div>

      {processing && progress && (
        <div className="mt-4" aria-live="polite" aria-label="OCR progress">
          <p className="text-sm text-neutral-600 mb-1 capitalize">
            {progress.status} — {progressPercent}%
          </p>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {result !== null && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700">Extracted text</p>
            <button
              onClick={handleCopy}
              aria-label="Copy extracted text to clipboard"
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={10}
            aria-label="Extracted text from image"
            className="w-full text-sm border border-neutral-200 rounded-lg p-3 bg-neutral-50 resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
