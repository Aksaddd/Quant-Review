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

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#f0f1f3] text-[#626975] border-[#e4e6ea]',
  blue:    'bg-[#e8f0fe] text-[#1865f2] border-[#a8c4f8]',
  green:   'bg-[#e6f4ea] text-[#1fab54] border-[#a8d5b5]',
  yellow:  'bg-[#fef9e7] text-[#f5a623] border-[#fdd8a0]',
  red:     'bg-[#fce8e6] text-[#d92916] border-[#f5c6c0]',
  purple:  'bg-[#f3effe] text-[#9059ff] border-[#d4bcf8]',
  muted:   'bg-[#f7f8fa] text-[#9299a5] border-transparent',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[#9299a5]',
  blue:    'bg-[#1865f2]',
  green:   'bg-[#1fab54]',
  yellow:  'bg-[#f5a623]',
  red:     'bg-[#d92916]',
  purple:  'bg-[#9059ff]',
  muted:   'bg-[#9299a5]',
};

const sizeStyles = {
  sm: 'text-[10px] px-1.5 py-0.5 rounded',
  md: 'text-[11px] px-2   py-0.5 rounded-md',
};

export function Badge({ variant = 'default', size = 'md', dot = false, className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-semibold border whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
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
