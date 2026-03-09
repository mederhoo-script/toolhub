'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { convertImageToPdf } from '@/lib/imageTopdf';
import ErrorAlert from '@/components/ErrorAlert';

export default function ImageToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setOutputUrl(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const blob = await convertImageToPdf(file, pageSize);
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
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

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div>
          <label
            htmlFor="page-size"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Page size
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter')}
            className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Converting…' : 'Convert to PDF'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {outputUrl && (
        <div className="mt-6">
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}.pdf`}
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
