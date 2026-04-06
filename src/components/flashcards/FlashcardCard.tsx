'use client';

import { useState, useCallback } from 'react';
import { RotateCw } from 'lucide-react';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import type { Flashcard } from '@/lib/types';

interface FlashcardCardProps {
  card: Flashcard;
  onFlip?: () => void;
}

export default function FlashcardCard({ card, onFlip }: FlashcardCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((f) => {
      if (!f) onFlip?.();
      return !f;
    });
  }, [onFlip]);

  return (
    <div
      className="w-full cursor-pointer select-none"
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? handleFlip() : undefined}
      aria-label={flipped ? 'Flip to front' : 'Flip to see answer'}
    >
      {!flipped ? (
        /* ── Front ─────────────────────────────────────────────────────── */
        <div className="bg-[var(--surface-2)] border border-[var(--surface-border-strong)] rounded-2xl p-6 flex flex-col min-h-[280px] transition-all duration-200 hover:border-brand-500/30">
          <div className="flex items-center gap-2 mb-5">
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="ml-auto text-xs text-[var(--text-muted)] font-mono">§{card.section}</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="prose-reading text-[var(--text-primary)]">
              <MarkdownRenderer content={card.front} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-6 pt-4 border-t border-[var(--surface-border)]">
            <RotateCw size={12} className="text-[var(--text-muted)]" />
            <span className="text-[11px] text-[var(--text-muted)]">Click to reveal answer</span>
          </div>
        </div>
      ) : (
        /* ── Back ──────────────────────────────────────────────────────── */
        <div className="bg-[var(--surface-2)] border border-brand-500/40 rounded-2xl p-6 flex flex-col min-h-[280px] transition-all duration-200 shadow-[0_0_24px_rgba(245,158,11,0.06)]">
          <div className="flex items-center gap-2 mb-5">
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="ml-auto text-[10px] font-semibold text-brand-400 uppercase tracking-wider">Answer</span>
          </div>

          <div className="flex-1">
            <div className="prose-reading text-[var(--text-primary)]">
              <MarkdownRenderer content={card.back} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-6 pt-4 border-t border-[var(--surface-border)]">
            <RotateCw size={12} className="text-[var(--text-muted)]" />
            <span className="text-[11px] text-[var(--text-muted)]">Click to flip back</span>
          </div>
        </div>
      )}
    </div>
  );
}
