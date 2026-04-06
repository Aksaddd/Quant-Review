'use client';

import { clsx } from 'clsx';

/* ── Linear progress bar ─────────────────────────────────────────────────── */
interface ProgressBarProps {
  value: number;       // 0–100
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  color?: 'brand' | 'success' | 'error' | 'info';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const barHeights = { xs: 'h-1', sm: 'h-1.5', md: 'h-2.5' };

const barColors = {
  brand:   'bg-brand-500',
  success: 'bg-[var(--success)]',
  error:   'bg-[var(--error)]',
  info:    'bg-[var(--info)]',
};

export function ProgressBar({
  value,
  max = 100,
  size = 'sm',
  color = 'brand',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div
        className={clsx(
          'w-full rounded-full bg-[var(--surface-4)] overflow-hidden',
          barHeights[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx(
            'h-full rounded-full',
            barColors[color],
            animated && 'transition-[width] duration-500 ease-out'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Circular progress ring ─────────────────────────────────────────────── */
interface ProgressRingProps {
  value: number;   // 0–100
  size?: number;   // px
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: React.ReactNode;
  className?: string;
}

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  color = 'var(--brand-500)',
  trackColor = 'var(--surface-4)',
  label,
  className,
}: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, value));
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div className={clsx('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center">
          {label}
        </span>
      )}
    </div>
  );
}
