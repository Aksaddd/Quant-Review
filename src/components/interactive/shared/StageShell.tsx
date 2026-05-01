'use client';

import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface StageShellProps {
  index: number;          // 1-based for display
  total: number;
  label?: string;
  prompt: string;
  children: ReactNode;    // the stage's input UI
  footer?: ReactNode;     // explanation reveal + nav buttons
  isCorrect?: boolean | null; // null = not yet answered
}

export default function StageShell({
  index, total, label, prompt, children, footer, isCorrect,
}: StageShellProps) {
  return (
    <section
      className={clsx(
        'rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm p-6 mb-4',
        'border-zinc-200 dark:border-zinc-800',
        isCorrect === true  && 'ring-2 ring-emerald-400/50',
        isCorrect === false && 'ring-2 ring-rose-400/50',
      )}
    >
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          Stage {index} of {total}{label ? ` — ${label}` : ''}
        </div>
      </header>
      <h2 className="text-lg font-medium leading-snug mb-4 text-zinc-900 dark:text-zinc-100">
        {prompt}
      </h2>
      <div className="space-y-3">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </section>
  );
}
