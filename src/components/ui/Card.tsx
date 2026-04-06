import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm:   'p-3',
  md:   'p-4 sm:p-5',
  lg:   'p-5 sm:p-7',
};

export default function Card({
  children,
  className,
  hover = false,
  glow = false,
  padding = 'md',
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-2xl border border-[var(--surface-border)]',
        'bg-[var(--surface-2)]',
        paddingStyles[padding],
        hover && [
          'transition-all duration-200 cursor-pointer',
          'hover:border-[var(--surface-border-strong)]',
          'hover:bg-[var(--surface-3)]',
          'hover:-translate-y-0.5',
        ],
        glow && 'hover:shadow-[var(--shadow-brand)]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Card subcomponents ─────────────────────────────────────────────────── */
export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={clsx('font-semibold text-[var(--text-primary)]', className)}>
      {children}
    </h3>
  );
}

export function CardDivider({ className }: { className?: string }) {
  return (
    <hr className={clsx('border-[var(--surface-border)] my-4', className)} />
  );
}
