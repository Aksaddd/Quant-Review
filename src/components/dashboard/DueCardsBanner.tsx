'use client';

import Link from 'next/link';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface DueCardsBannerProps {
  dueCount: number;
}

export default function DueCardsBanner({ dueCount }: DueCardsBannerProps) {
  if (dueCount === 0) {
    return (
      <div className="bg-[var(--success-bg)] border border-[var(--success)]/25 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--success)]/15 flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-[var(--success)]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">All caught up!</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">No cards due. Come back tomorrow to keep your streak.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-500/10 to-brand-400/5 border border-brand-500/25 rounded-2xl p-4 flex items-center gap-4">
      {/* Glow */}
      <div aria-hidden className="absolute -top-8 -right-8 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0">
        <Brain size={18} className="text-brand-400" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {dueCount} card{dueCount !== 1 ? 's' : ''} due for review
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Stay sharp — review now to lock these into long-term memory.
        </p>
      </div>

      <Link href="/flashcards">
        <Button size="sm" iconRight={<ArrowRight size={14} />}>
          Review
        </Button>
      </Link>
    </div>
  );
}
