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
        className={`min-h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50'
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
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32">
              <Image
                src={preview}
                alt={`Preview of ${fileName}`}
                fill
                className="object-contain rounded-lg"
                unoptimized
              />
            </div>
            <p className="text-sm text-neutral-600 text-center break-all max-w-xs">
              {fileName}
            </p>
            <p className="text-xs text-primary-600 font-medium">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <svg
              className="w-12 h-12 text-neutral-400"
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
            <div>
              <p className="text-base font-medium text-neutral-700">
                Drop your image here, or{' '}
                <span className="text-primary-600">browse</span>
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
