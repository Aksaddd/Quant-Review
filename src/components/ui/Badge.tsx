import { clsx } from 'clsx';
import type { Difficulty } from '@/lib/types';

/* ── Generic badge ──────────────────────────────────────────────────────── */
type BadgeVariant = 'default' | 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'muted';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Badge — Apple treatment.
 *
 * Monochromatic by default: `default` and `muted` use luminance grey + accent.
 * Semantic variants (blue/green/yellow/red/purple) stay but desaturated to iOS
 * system hues with 12% tint backgrounds and no hard borders — glyph-first,
 * color-muted so text content carries the meaning.
 */

// Each variant: [bg tint (rgba), fg solid, dot solid]
const VARIANTS: Record<BadgeVariant, { bg: string; fg: string; dot: string }> = {
  default: { bg: 'var(--eureka-accent-tint)',       fg: 'var(--eureka-accent)', dot: 'var(--eureka-accent)' },
  blue:    { bg: 'rgba(10,132,255,0.12)',  fg: '#0a84ff', dot: '#0a84ff' },
  green:   { bg: 'rgba(48,209,88,0.12)',   fg: '#30a14c', dot: '#30d158' },
  yellow:  { bg: 'rgba(255,159,10,0.14)',  fg: '#b76d07', dot: '#ff9f0a' },
  red:     { bg: 'rgba(255,55,95,0.12)',   fg: '#d1365c', dot: '#ff375f' },
  purple:  { bg: 'rgba(191,90,242,0.12)',  fg: '#8a44c2', dot: '#bf5af2' },
  muted:   { bg: 'rgba(0,0,0,0.05)',       fg: '#6e6e73', dot: '#86868b' },
};

const sizeStyles = {
  sm: 'text-[10px] px-1.5 py-0.5 rounded-md',
  md: 'text-[11px] px-2   py-0.5 rounded-md',
};

export function Badge({ variant = 'default', size = 'md', dot = false, className, children }: BadgeProps) {
  const v = VARIANTS[variant];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-semibold tracking-tight whitespace-nowrap',
        sizeStyles[size],
        className,
      )}
      style={{ background: v.bg, color: v.fg }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: v.dot }} />}
      {children}
    </span>
  );
}

/* ── Difficulty badge ────────────────────────────────────────────────────── */
export function DifficultyBadge({ difficulty, size = 'md' }: { difficulty: Difficulty; size?: 'sm' | 'md' }) {
  const map: Record<Difficulty, { label: string; variant: BadgeVariant }> = {
    easy:   { label: 'Easy',   variant: 'green'  },
    medium: { label: 'Medium', variant: 'yellow' },
    hard:   { label: 'Hard',   variant: 'red'    },
  };
  const { label, variant } = map[difficulty];
  return <Badge variant={variant} size={size} dot>{label}</Badge>;
}

/* ── Type badge ──────────────────────────────────────────────────────────── */
export function TypeBadge({ type, size = 'sm' }: { type: 'problem' | 'concept' | 'formula' | 'principle'; size?: 'sm' | 'md' }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    problem:   { label: 'Problem',   variant: 'blue'   },
    concept:   { label: 'Concept',   variant: 'purple' },
    formula:   { label: 'Formula',   variant: 'green'  },
    principle: { label: 'Principle', variant: 'yellow' },
  };
  const { label, variant } = map[type] ?? { label: type, variant: 'default' as BadgeVariant };
  return <Badge variant={variant} size={size}>{label}</Badge>;
}
