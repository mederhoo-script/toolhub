'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { resizeImage } from '@/lib/resizeImage';

export default function ResizeImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>('800');
  const [height, setHeight] = useState<string>('600');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [origSize, setOrigSize] = useState<{ w: number; h: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setOutputUrl(null);
    setError(null);
    const img = new window.Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      setOrigSize({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (maintainAspect && origSize && val) {
      const w = parseInt(val, 10);
      if (!isNaN(w) && origSize.w > 0) {
        setHeight(String(Math.round((w * origSize.h) / origSize.w)));
      }
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    if (maintainAspect && origSize && val) {
      const h = parseInt(val, 10);
      if (!isNaN(h) && origSize.h > 0) {
        setWidth(String(Math.round((h * origSize.w) / origSize.h)));
      }
    }
  };

  const handleResize = async () => {
    if (!file) return;
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    if (!w || !h || w < 1 || h < 1) {
      setError('Please enter valid positive dimensions.');
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const blob = await resizeImage(file, w, h, maintainAspect);
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'image';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      {origSize && (
        <p className="mt-2 text-xs text-neutral-500">
          Original: {origSize.w} × {origSize.h} px
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="resize-width" className="block text-sm font-medium text-neutral-700 mb-1">
              Width (px)
            </label>
            <input
              id="resize-width"
              type="number"
              min="1"
              max="10000"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              className="border border-neutral-300 rounded-lg px-3 py-2 w-28 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="resize-height" className="block text-sm font-medium text-neutral-700 mb-1">
              Height (px)
            </label>
            <input
              id="resize-height"
              type="number"
              min="1"
              max="10000"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              className="border border-neutral-300 rounded-lg px-3 py-2 w-28 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspect}
              onChange={(e) => setMaintainAspect(e.target.checked)}
              className="w-4 h-4 accent-primary-600"
            />
            Lock aspect ratio
          </label>
        </div>

        <button
          onClick={handleResize}
          disabled={!file || processing}
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Resizing…' : 'Resize Image'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {outputUrl && (
        <div className="mt-6">
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}-resized.${file?.name.split('.').pop() ?? 'png'}`}
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
