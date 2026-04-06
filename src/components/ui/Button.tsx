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

const VARIANTS: Record<Variant, string> = {
  primary:   'bg-[#1865f2] text-white hover:bg-[#0d4fd1] border border-[#1865f2]',
  secondary: 'bg-white text-[#21242c] hover:bg-[#f0f1f3] border border-[#c8ccd4]',
  ghost:     'bg-transparent text-[#626975] hover:bg-[#f0f1f3] border border-transparent',
  danger:    'bg-[#d92916] text-white hover:bg-[#b82012] border border-[#d92916]',
  success:   'bg-[#1fab54] text-white hover:bg-[#17944a] border border-[#1fab54]',
};

const SIZES: Record<Size, string> = {
  xs: 'h-6  px-2   text-[11px] gap-1   rounded',
  sm: 'h-8  px-3   text-xs     gap-1.5 rounded-md',
  md: 'h-9  px-4   text-sm     gap-2   rounded-lg',
  lg: 'h-11 px-5   text-sm     gap-2   rounded-lg',
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
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-semibold transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1865f2] focus-visible:ring-offset-1',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
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
