interface AdBannerProps {
  variant?: 'leaderboard' | 'rectangle';
}

export default function AdBanner({ variant = 'leaderboard' }: AdBannerProps) {
  const dimensions =
    variant === 'leaderboard'
      ? { width: 728, height: 90, label: '728×90' }
      : { width: 300, height: 250, label: '300×250' };

  return (
    <div
      className="flex items-center justify-center bg-neutral-100 border border-dashed border-neutral-300 rounded-lg mx-auto text-neutral-400 text-xs font-medium"
      style={{
        width: '100%',
        maxWidth: dimensions.width,
        minHeight: dimensions.height,
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Google AdSense slot — replace with script */}
      <div className="flex flex-col items-center gap-1 p-4">
        <span className="text-neutral-300 text-lg">▭</span>
        <span>Advertisement</span>
        <span className="text-neutral-300">{dimensions.label}</span>
      </div>
    </div>
  );
}
