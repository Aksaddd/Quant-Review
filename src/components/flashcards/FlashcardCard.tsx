'use client';

import { useState, useCallback } from 'react';
import { RotateCw } from 'lucide-react';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import type { Flashcard } from '@/lib/types';

interface FlashcardCardProps {
  card: Flashcard;
  /** Called when user flips the card (for activity tracking) */
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
      className="flashcard-scene w-full cursor-pointer select-none"
      style={{ minHeight: 320 }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFlip() : undefined}
      aria-label={flipped ? 'Flip to front' : 'Flip to see answer'}
    >
      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-face flashcard-front bg-[var(--surface-2)] border border-[var(--surface-border-strong)] rounded-2xl p-6 flex flex-col">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-4">
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="ml-auto text-xs text-[var(--text-muted)] font-mono">§{card.section}</span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="prose-reading text-[var(--text-primary)]">
              <MarkdownRenderer content={card.front} />
            </div>
          </div>

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-[var(--surface-border)]">
            <RotateCw size={12} className="text-[var(--text-muted)]" />
            <span className="text-[11px] text-[var(--text-muted)]">Click to reveal answer</span>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back bg-[var(--surface-2)] border border-brand-500/30 rounded-2xl p-6 flex flex-col">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-4">
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="ml-auto text-[10px] font-semibold text-brand-400 uppercase tracking-wider">Answer</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="prose-reading text-[var(--text-primary)]">
              <MarkdownRenderer content={card.back} />
            </div>
          </div>

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-[var(--surface-border)]">
            <RotateCw size={12} className="text-[var(--text-muted)]" />
            <span className="text-[11px] text-[var(--text-muted)]">Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
