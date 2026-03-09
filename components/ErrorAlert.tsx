interface ErrorAlertProps {
  error: string | null;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl"
    >
      <svg
        className="w-4 h-4 text-red-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-sm text-red-600 font-medium">{error}</p>
    </div>
  );
}
