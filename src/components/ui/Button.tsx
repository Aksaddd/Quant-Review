'use client';

import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Variants — Apple treatment.
 *
 * Primary   — solid accent (follows user's chosen hue)
 * Secondary — translucent white material, subtle border, dark text
 * Ghost     — transparent, accent-tint on hover
 * Danger    — solid iOS red
 * Success   — solid iOS green
 *
 * Variant colors are applied via inline style so --eureka-accent stays live.
 */
const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--eureka-accent)',
    color: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.08)',
  },
  secondary: {
    background: 'var(--material-thin-light)',
    backdropFilter: 'var(--material-blur)',
    WebkitBackdropFilter: 'var(--material-blur)',
    color: '#1d1d1f',
    border: '0.5px solid rgba(0,0,0,0.1)',
  },
  ghost: {
    background: 'transparent',
    color: '#424245',
    border: '0.5px solid transparent',
  },
  danger: {
    background: '#ff375f',
    color: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.08)',
  },
  success: {
    background: '#30d158',
    color: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.08)',
  },
};

const VARIANT_HOVER_CLASS: Record<Variant, string> = {
  primary:   'hover:brightness-[1.08]',
  secondary: 'hover:brightness-[0.98]',
  ghost:     'hover:bg-[var(--eureka-accent-tint)] hover:text-[var(--eureka-accent)]',
  danger:    'hover:brightness-[1.08]',
  success:   'hover:brightness-[1.08]',
};

const SIZES: Record<Size, string> = {
  xs: 'h-6  px-2.5 text-[11px] gap-1    rounded-md',
  sm: 'h-8  px-3.5 text-[12px] gap-1.5  rounded-lg',
  md: 'h-9  px-4   text-[13px] gap-2    rounded-lg',
  lg: 'h-11 px-5   text-[14px] gap-2    rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-semibold tracking-tight',
        'transition-all duration-200 ease-standard',
        'active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        VARIANT_HOVER_CLASS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      style={{
        ...VARIANT_STYLES[variant],
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  );
}
