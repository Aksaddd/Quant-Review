import { clsx } from 'clsx';
import type { Difficulty } from '@/lib/types';

/* ── Generic badge ──────────────────────────────────────────────────────── */
type BadgeVariant = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info' | 'muted';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--surface-4)] text-[var(--text-secondary)] border-[var(--surface-border)]',
  brand:   'bg-[var(--brand-glow)] text-[var(--brand-400)] border-[var(--brand-500)]/20',
  success: 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]/20',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]/20',
  error:   'bg-[var(--error-bg)] text-[var(--error)] border-[var(--error)]/20',
  info:    'bg-[var(--info-bg)] text-[var(--info)] border-[var(--info)]/20',
  muted:   'bg-[var(--surface-3)] text-[var(--text-muted)] border-transparent',
};

const sizeStyles = {
  sm: 'text-[10px] px-1.5 py-0.5 rounded-md',
  md: 'text-xs    px-2   py-1   rounded-lg',
};

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium border whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', {
            'bg-[var(--success)]': variant === 'success',
            'bg-[var(--warning)]': variant === 'warning',
            'bg-[var(--error)]':   variant === 'error',
            'bg-[var(--brand-500)]': variant === 'brand',
            'bg-[var(--info)]':    variant === 'info',
            'bg-[var(--text-muted)]': variant === 'muted' || variant === 'default',
          })}
        />
      )}
      {children}
    </span>
  );
}

/* ── Difficulty badge (specialized) ─────────────────────────────────────── */
interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export function DifficultyBadge({
  difficulty,
  size = 'md',
  showDot = true,
}: DifficultyBadgeProps) {
  const config: Record<Difficulty, { label: string; variant: BadgeVariant }> = {
    easy:   { label: 'Easy',   variant: 'success' },
    medium: { label: 'Medium', variant: 'warning' },
    hard:   { label: 'Hard',   variant: 'error'   },
  };

  const { label, variant } = config[difficulty];

  return (
    <Badge variant={variant} size={size} dot={showDot}>
      {label}
    </Badge>
  );
}

/* ── Type badge ─────────────────────────────────────────────────────────── */
interface TypeBadgeProps {
  type: 'problem' | 'concept' | 'formula';
  size?: 'sm' | 'md';
}

export function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const config = {
    problem: { label: 'Problem', variant: 'info'    as BadgeVariant },
    concept: { label: 'Concept', variant: 'brand'   as BadgeVariant },
    formula: { label: 'Formula', variant: 'success' as BadgeVariant },
  };

  const { label, variant } = config[type];

  return (
    <Badge variant={variant} size={size}>
      {label}
    </Badge>
  );
}
