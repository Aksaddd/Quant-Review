'use client';

import { ProgressBar } from '@/components/ui/Progress';

interface DeckProgressProps {
  current: number;
  total: number;
  reviewed: number;
}

export default function DeckProgress({ current, total, reviewed }: DeckProgressProps) {
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {current} of {total} cards
        </span>
        <span className="text-xs font-medium text-[var(--text-secondary)]">
          {reviewed} reviewed · {pct}%
        </span>
      </div>
      <ProgressBar value={pct} size="sm" />
    </div>
  );
}
