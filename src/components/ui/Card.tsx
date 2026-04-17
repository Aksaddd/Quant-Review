'use client';

import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 'solid' renders on surface-0, 'material' uses translucent SF material */
  variant?: 'solid' | 'material';
  onClick?: () => void;
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-4 sm:p-5',
  lg:   'p-5 sm:p-7',
};

/**
 * Card — Apple surface.
 *
 * Solid:    clean white card with 0.5px rgba border + 20px continuous radius
 * Material: translucent material-thin-light with backdrop-filter; use on
 *           canvases where layered depth matters
 *
 * Hover adds a 1px-lift with spring-like ease; glow adds an accent-tinted ring.
 */
export default function Card({
  children,
  className,
  hover = false,
  glow = false,
  padding = 'md',
  variant = 'solid',
  onClick,
}: CardProps) {
  const baseStyle: React.CSSProperties =
    variant === 'material'
      ? {
          background: 'var(--material-thin-light)',
          backdropFilter: 'var(--material-blur)',
          WebkitBackdropFilter: 'var(--material-blur)',
          border: '0.5px solid rgba(0,0,0,0.06)',
          borderRadius: 20,
        }
      : {
          background: '#ffffff',
          border: '0.5px solid rgba(0,0,0,0.08)',
          borderRadius: 20,
        };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'transition-all duration-300 ease-standard',
        paddingStyles[padding],
        hover && 'cursor-pointer hover:-translate-y-[1px]',
        glow && 'hover:shadow-[0_0_0_1px_var(--eureka-accent-tint-strong),0_10px_30px_-12px_rgba(0,0,0,0.18)]',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{
        ...baseStyle,
        boxShadow: hover
          ? '0 1px 2px rgba(0,0,0,0.03), 0 6px 20px -10px rgba(0,0,0,0.12)'
          : '0 1px 2px rgba(0,0,0,0.03)',
      }}
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
    <h3 className={clsx('font-semibold text-[#1d1d1f] tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function CardDivider({ className }: { className?: string }) {
  return (
    <hr
      className={clsx('my-4', className)}
      style={{ border: 'none', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    />
  );
}
