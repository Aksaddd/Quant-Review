'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import { problemsById } from '@/data/problems';
import type { Flashcard } from '@/lib/types';

interface FlashcardCardProps {
  card: Flashcard;
  onFlip?: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 320, damping: 24, mass: 0.9 };

export default function FlashcardCard({ card, onFlip }: FlashcardCardProps) {
  const [flipped, setFlipped] = useState(false);

  const problem =
    card.type === 'problem' && card.problemId
      ? problemsById[card.problemId]
      : null;

  const frontContent = problem ? problem.setup : card.front;
  const backContent = problem
    ? problem.solution + (problem.finalAnswer ? `\n\n**Answer:** ${problem.finalAnswer}` : '')
    : card.back;
  const title = problem ? problem.title : null;

  const handleFlip = useCallback(() => {
    setFlipped((f) => {
      if (!f) onFlip?.();
      return !f;
    });
  }, [onFlip]);

  const FACE_CLASS =
    'p-6 flex flex-col min-h-[280px] cursor-pointer select-none';
  const FACE_STYLE: React.CSSProperties = {
    background: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.06)',
    borderRadius: 20,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08)',
    backfaceVisibility: 'hidden',
  };

  return (
    <div
      className="w-full relative"
      style={{ perspective: 1200 }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? handleFlip() : undefined}
      aria-label={flipped ? 'Flip to front' : 'Flip to see answer'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={flipped ? 'back' : 'front'}
          initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
          transition={SPRING}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {!flipped ? (
            <div className={FACE_CLASS} style={FACE_STYLE}>
              <div className="flex items-center gap-2 mb-5">
                <TypeBadge type={card.type} />
                <DifficultyBadge difficulty={card.difficulty} />
                <span className="ml-auto text-[11px] text-[#86868b] font-mono tabular-nums">{card.section}</span>
              </div>

              {title && (
                <p className="text-[15px] font-semibold tracking-tight text-[#1d1d1f] mb-3">{title}</p>
              )}

              <div className="flex-1 flex flex-col justify-center">
                <div className="prose-reading text-[#1d1d1f]">
                  <MarkdownRenderer content={frontContent} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-6 pt-4" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                <RotateCw size={12} className="text-[#86868b]" />
                <span className="text-[11px] text-[#86868b] tracking-tight">Click to reveal answer</span>
              </div>
            </div>
          ) : (
            <div
              className={FACE_CLASS}
              style={{
                ...FACE_STYLE,
                border: '0.5px solid var(--eureka-accent-tint-strong)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 10px 32px -14px var(--eureka-accent-tint-strong)',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <TypeBadge type={card.type} />
                <DifficultyBadge difficulty={card.difficulty} />
                <span
                  className="ml-auto text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: 'var(--eureka-accent)' }}
                >
                  {problem ? 'Solution' : 'Answer'}
                </span>
              </div>

              {title && (
                <p className="text-[15px] font-semibold tracking-tight text-[#1d1d1f] mb-3">{title}</p>
              )}

              <div className="flex-1">
                <div className="prose-reading text-[#1d1d1f]">
                  <MarkdownRenderer content={backContent} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-6 pt-4" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                <RotateCw size={12} className="text-[#86868b]" />
                <span className="text-[11px] text-[#86868b] tracking-tight">Click to flip back</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
