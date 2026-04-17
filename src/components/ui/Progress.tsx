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

const barHeights = { xs: 'h-[2px]', sm: 'h-[3px]', md: 'h-[5px]' };

/**
 * Color maps to Apple/iOS system hues or the user's accent.
 * `brand` follows --eureka-accent so bars retint with the store.
 */
const BAR_COLORS: Record<NonNullable<ProgressBarProps['color']>, string> = {
  brand:   'var(--eureka-accent)',
  success: '#30d158',
  error:   '#ff375f',
  info:    '#0a84ff',
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
        <div className="flex justify-between text-[11px] text-[#86868b] mb-1 tabular-nums tracking-tight">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div
        className={clsx('w-full rounded-full overflow-hidden', barHeights[size])}
        style={{ background: 'rgba(0,0,0,0.06)' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: BAR_COLORS[color],
            transition: animated ? 'width 500ms var(--ease-standard)' : 'none',
          }}
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
  strokeWidth = 4,
  color = 'var(--eureka-accent)',
  trackColor = 'rgba(0,0,0,0.08)',
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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
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
          style={{ transition: 'stroke-dashoffset 700ms var(--ease-standard)' }}
        />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center tracking-tight">
          {label}
        </span>
      )}
    </div>
  );
}
