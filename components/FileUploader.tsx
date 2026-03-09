'use client';

import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUploader({
  onFileSelect,
  accept = 'image/*',
  maxSizeMB = 20,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload image file by clicking or dragging and dropping"
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative min-h-52 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-primary-400 bg-primary-50 scale-[1.01]'
            : preview
            ? 'border-primary-200 bg-primary-50/40 hover:border-primary-400 hover:bg-primary-50'
            : 'border-neutral-200 bg-neutral-50 hover:border-primary-300 hover:bg-primary-50/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={handleChange}
          aria-hidden="true"
          tabIndex={-1}
        />

        {preview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-36 h-36 rounded-xl overflow-hidden ring-2 ring-primary-200 shadow-md">
              <Image
                src={preview}
                alt={`Preview of ${fileName}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700 break-all max-w-xs">
                {fileName}
              </p>
              <p className="text-xs text-primary-600 mt-1 font-medium">
                Click or drag to replace
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? 'bg-primary-100' : 'bg-neutral-100'}`}>
              <svg
                className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary-500' : 'text-neutral-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-700">
                {isDragging ? 'Drop your image here' : (
                  <>Drop your image here, or{' '}<span className="text-primary-600">browse</span></>
                )}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                Supports PNG, JPG, WebP, GIF, BMP · Max {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
