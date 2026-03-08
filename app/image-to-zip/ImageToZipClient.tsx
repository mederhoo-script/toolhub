'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import ToolNavigation from '@/components/ToolNavigation';
import { filesToZip } from '@/lib/imageToZip';

export default function ImageToZipClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const filtered = arr.filter((f) => !existingNames.has(f.name));
      return [...prev, ...filtered];
    });
    setError(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = ''; // allow re-selecting the same file
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDownload = async () => {
    if (files.length === 0) {
      setError('Please select at least one image.');
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const entries = files.map((f) => ({ name: f.name, blob: f }));
      const zip = await filesToZip(entries);
      const url = URL.createObjectURL(zip);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images by clicking or dragging and dropping"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`min-h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleChange}
          aria-hidden="true"
          tabIndex={-1}
        />
        <svg
          className="w-10 h-10 text-neutral-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-base font-medium text-neutral-700">
          Drop images here, or <span className="text-primary-600">browse</span>
        </p>
        <p className="text-sm text-neutral-500 mt-1">Select multiple files at once</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-neutral-700">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
            <span className="ml-2 text-neutral-400">
              ({(totalSize / 1024).toFixed(0)} KB total)
            </span>
          </p>
          <ul className="max-h-60 overflow-y-auto divide-y divide-neutral-100 border border-neutral-200 rounded-lg">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-2 text-sm">
                <span className="truncate max-w-[70%] text-neutral-700">{f.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-neutral-400">{(f.size / 1024).toFixed(0)} KB</span>
                  <button
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${f.name}`}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6">
        <button
          onClick={handleDownload}
          disabled={files.length === 0 || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Packaging…' : 'Download ZIP'}
        </button>
      </div>

      <div className="mt-8 border-t border-neutral-100 pt-6">
        <ToolNavigation />
      </div>
    </>
  );
}
