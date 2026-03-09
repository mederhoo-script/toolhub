'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import DownloadButton from '@/components/DownloadButton';
import ToolNavigation from '@/components/ToolNavigation';
import { compressToTargetSize } from '@/lib/compressImage';
import ErrorAlert from '@/components/ErrorAlert';

const PRESETS = [50, 100, 200] as const;

export default function CompressImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [targetKB, setTargetKB] = useState<number>(100);
  const [customKB, setCustomKB] = useState<string>('');
  const [useCustom, setUseCustom] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setOutputUrl(null);
    setOutputSize(null);
    setError(null);
  };

  const effectiveTarget = useCustom ? parseInt(customKB, 10) || 100 : targetKB;

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const compressed = await compressToTargetSize(file, effectiveTarget);
      const url = URL.createObjectURL(compressed);
      setOutputUrl(url);
      setOutputSize(compressed.size);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'image';
  const ext = file?.name.split('.').pop() ?? 'jpg';

  return (
    <>
      <FileUploader onFileSelect={handleFile} accept="image/*" maxSizeMB={20} />

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-2">
            Target size
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((kb) => (
              <button
                key={kb}
                onClick={() => {
                  setTargetKB(kb);
                  setUseCustom(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  !useCustom && targetKB === kb
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                }`}
              >
                {kb} KB
              </button>
            ))}
            <button
              onClick={() => setUseCustom(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                useCustom
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
              }`}
            >
              Custom
            </button>
          </div>

          {useCustom && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10000"
                value={customKB}
                onChange={(e) => setCustomKB(e.target.value)}
                placeholder="Enter KB"
                aria-label="Custom target size in KB"
                className="border border-neutral-300 rounded-lg px-3 py-2 w-32 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-500">KB</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCompress}
          disabled={!file || processing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {processing ? 'Compressing…' : 'Compress Image'}
        </button>
      </div>

      <ErrorAlert error={error} />

      {outputUrl && outputSize !== null && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-600">
            Compressed size:{' '}
            <strong className="text-neutral-900">
              {(outputSize / 1024).toFixed(1)} KB
            </strong>
          </p>
          <DownloadButton
            fileUrl={outputUrl}
            fileName={`${baseName}-compressed.${ext}`}
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
