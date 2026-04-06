'use client';

import Link from 'next/link';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { ProgressBar } from '@/components/ui/Progress';
import { DifficultyBadge } from '@/components/ui/Badge';
import type { SectionStats } from '@/lib/types';

const SECTION_EMOJIS: Record<string, string> = {
  '2.1': '🎯',
  '2.2': '🔢',
  '2.3': '🧩',
  '2.4': '⚖️',
  '2.5': '∑',
  '2.6': '🐦',
  '2.7': '🔣',
  '2.8': '📐',
  '2.9': '💡',
};

interface SectionGridProps {
  sections: SectionStats[];
}

export default function SectionGrid({ sections }: SectionGridProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
        Chapter 2 · Brain Teasers
      </h2>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {sections.map((sec) => {
          const pct = sec.total > 0 ? Math.round((sec.solved / sec.total) * 100) : 0;
          const isComplete = sec.solved === sec.total && sec.total > 0;

          return (
            <Link
              key={sec.section}
              href={`/read/chapter-2#section-${sec.section}`}
              className="group bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--surface-border)] hover:border-[var(--surface-border-strong)] rounded-2xl p-4 transition-all duration-200 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" role="img" aria-hidden>{SECTION_EMOJIS[sec.section] ?? '📖'}</span>
                  <div>
                    <p className="text-[10px] font-medium text-[var(--text-muted)]">§{sec.section}</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{sec.sectionTitle}</p>
                  </div>
                </div>
                {isComplete ? (
                  <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight size={16} className="text-[var(--text-muted)] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                )}
              </div>

              <ProgressBar value={pct} size="sm" className="mb-2" />

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  {sec.solved}/{sec.total} solved
                </span>
                <span className="text-xs font-medium text-[var(--text-secondary)]">{pct}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
