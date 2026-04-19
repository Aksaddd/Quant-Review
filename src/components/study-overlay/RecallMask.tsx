'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Eye, Check, CircleDashed, Minus } from 'lucide-react';
import { useStudyOverlayStore, type RecallOutcome } from '@/stores/useStudyOverlayStore';
import { useXPStore } from '@/stores/useXPStore';

interface RecallMaskProps {
  /** Stable id so the store doesn't double-count reveals. */
  id: string;
  /** Short cue shown on the mask — enough to trigger retrieval, not enough to answer. */
  prompt: string;
  /** Optional label ("Code example", "Key idea", …) for visual grouping. */
  kind?: string;
  children: ReactNode;
}

const XP_BY_OUTCOME: Record<RecallOutcome, number> = {
  got: 10,
  partial: 5,
  blank: 2, // still credit the attempt — retrieval effort matters even on failure
};

/**
 * Active-recall gate: when the overlay is enabled, `children` is hidden behind
 * a retrieval prompt. User thinks, reveals, then self-rates — mirroring the
 * Anki-style 3-button metacognitive check. Self-rating awards XP through the
 * existing gamification store so recall attempts feel as rewarding as problem
 * solves.
 *
 * When the overlay is disabled (default), this component renders its children
 * as-is with zero visual footprint — safe to wrap every code block / key bullet
 * on a page.
 */
export default function RecallMask({ id, prompt, kind, children }: RecallMaskProps) {
  const enabled = useStudyOverlayStore((s) => s.enabled);
  const masksOn = useStudyOverlayStore((s) => s.masksOn);
  const resetToken = useStudyOverlayStore((s) => s.resetToken);
  const markRevealed = useStudyOverlayStore((s) => s.markRevealed);
  const awardXP = useXPStore((s) => s.awardXP);
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState<RecallOutcome | null>(null);

  // When the user hits Reset on the overlay bar, re-hide every mask and clear
  // its local rating so the next retrieval round starts cold.
  useEffect(() => {
    if (resetToken === 0) return;
    setRevealed(false);
    setRated(null);
  }, [resetToken]);

  // Overlay off, or user toggled "Hide answers" off → render inline, no gate.
  if (!enabled || !masksOn) return <>{children}</>;

  const handleReveal = () => setRevealed(true);

  const handleRate = (outcome: RecallOutcome) => {
    if (rated) return;
    setRated(outcome);
    markRevealed(id, outcome);
    awardXP('recall', XP_BY_OUTCOME[outcome], `${kind ?? 'Recall'} · ${outcome}`);
  };

  return (
    <div className="relative">
      {!revealed && (
        <button
          type="button"
          onClick={handleReveal}
          className="w-full text-left rounded-lg border border-dashed border-[#c8ccd4] bg-[#f7f8fa] hover:bg-[#eef0f4] transition-colors px-5 py-4 group"
          style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-white border border-[#e4e6ea] flex items-center justify-center shrink-0">
              <Eye size={14} className="text-[#626975]" />
            </div>
            <div className="flex-1 min-w-0">
              {kind && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9299a5] mb-1">
                  {kind} · recall first
                </p>
              )}
              <p className="text-[13px] text-[#21242c] leading-relaxed">{prompt}</p>
              <p className="text-[11px] text-[#9299a5] mt-2 group-hover:text-[#626975]">
                Think it through, then click to reveal.
              </p>
            </div>
          </div>
        </button>
      )}

      {revealed && (
        <div>
          {children}
          {!rated && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-[#9299a5] uppercase tracking-wider font-semibold">
                How was that recall?
              </span>
              <button
                type="button"
                onClick={() => handleRate('blank')}
                className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md border border-[#e4e6ea] text-[#a21f1f] bg-white hover:bg-[#fde8e6] transition-colors"
              >
                <Minus size={12} />
                Blank
              </button>
              <button
                type="button"
                onClick={() => handleRate('partial')}
                className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md border border-[#e4e6ea] text-[#8a5a00] bg-white hover:bg-[#fff4de] transition-colors"
              >
                <CircleDashed size={12} />
                Partial
              </button>
              <button
                type="button"
                onClick={() => handleRate('got')}
                className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md border border-[#d8e6ff] text-[#1e6b34] bg-[#e6f4ea] hover:bg-[#d8ecde] transition-colors"
              >
                <Check size={12} />
                Got it
              </button>
            </div>
          )}
          {rated && (
            <p className="mt-3 text-[11px] text-[#9299a5] italic">
              Recall logged ({rated}). +{XP_BY_OUTCOME[rated]} XP.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
