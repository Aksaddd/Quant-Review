'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size    = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    'bg-brand-500 text-black font-semibold',
    'hover:bg-brand-400 active:bg-brand-600',
    'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    'hover:shadow-[0_0_28px_rgba(245,158,11,0.45)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
  ].join(' '),

  secondary: [
    'bg-[var(--surface-3)] text-[var(--text-primary)] font-medium',
    'border border-[var(--surface-border-strong)]',
    'hover:bg-[var(--surface-4)] hover:border-[var(--brand-500)]/40',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--text-secondary)] font-medium',
    'hover:bg-white/5 hover:text-[var(--text-primary)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),

  danger: [
    'bg-[var(--error-bg)] text-[var(--error)] font-medium',
    'border border-[var(--error)]/20',
    'hover:bg-[var(--error)]/20 hover:border-[var(--error)]/40',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),

  success: [
    'bg-[var(--success-bg)] text-[var(--success)] font-medium',
    'border border-[var(--success)]/20',
    'hover:bg-[var(--success)]/20 hover:border-[var(--success)]/40',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
};

const sizeStyles: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-xs  rounded-lg  gap-1.5',
  sm: 'h-8  px-3   text-sm  rounded-xl  gap-2',
  md: 'h-10 px-4   text-sm  rounded-xl  gap-2',
  lg: 'h-12 px-6   text-base rounded-2xl gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center whitespace-nowrap',
          'transition-all duration-150 cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="shrink-0 flex items-center">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight && (
          <span className="shrink-0 flex items-center">{iconRight}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
