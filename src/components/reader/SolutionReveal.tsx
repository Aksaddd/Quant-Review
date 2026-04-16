'use client';

import { useState, useRef } from 'react';
import { CheckCircle2, ChevronDown, RotateCcw, Undo2 } from 'lucide-react';
import HintStep from './HintStep';
import ScratchpadGate from './ScratchpadGate';
import CollapsibleSolution from './CollapsibleSolution';

interface SolutionRevealProps {
  solution: string;
  finalAnswer?: string;
  hints: string[];
  onSolved?: (hintsUsed: number) => void;
  onAttempted?: () => void;
  onUndoSolved?: () => void;
  onReset?: () => void;
  currentStatus: 'unseen' | 'attempted' | 'solved' | 'reading';
}

export default function SolutionReveal({
  solution,
  finalAnswer,
  hints,
  onSolved,
  onAttempted,
  onUndoSolved,
  onReset,
  currentStatus,
}: SolutionRevealProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [scratchpadSubmitted, setScratchpadSubmitted] = useState(false);
  const hintsRevealedRef = useRef(0);

  const handleScratchpadSubmit = (approach: string) => {
    setScratchpadSubmitted(true);
    if (currentStatus === 'unseen') onAttempted?.();
  };

  const handleReveal = () => {
    setShowSolution(true);
    if (currentStatus === 'unseen' && !scratchpadSubmitted) onAttempted?.();
  };

  const handleReset = () => {
    setShowSolution(false);
    setScratchpadSubmitted(false);
    hintsRevealedRef.current = 0;
    onReset?.();
  };

  const handleHintRevealed = (count: number) => {
    hintsRevealedRef.current = count;
  };

  return (
    <div className="space-y-3 mt-1">
      {/* Generate Before Reveal: scratchpad gate */}
      {currentStatus !== 'solved' && (
        <ScratchpadGate
          onSubmit={handleScratchpadSubmit}
          submitted={scratchpadSubmitted}
        />
      )}

      {/* Hints — only visible after scratchpad submission (or if already solved) */}
      {(scratchpadSubmitted || currentStatus === 'solved') && hints.length > 0 && (
        <div className="p-4 rounded-lg bg-[#fef9e7] border border-[#fdd8a0]">
          <HintStep hints={hints} onRevealCount={handleHintRevealed} />
        </div>
      )}

      {/* Solution toggle — only available after scratchpad submission */}
      {(scratchpadSubmitted || currentStatus === 'solved') && (
        <>
          {!showSolution ? (
            <button
              onClick={handleReveal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
                border border-[var(--ka-blue)] text-[var(--ka-blue)] text-sm font-semibold
                hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150"
            >
              <ChevronDown size={15} />
              Show solution
            </button>
          ) : (
            <div className="reading-card border rounded-lg overflow-hidden animate-fade-up">
              {/* Solution header */}
              <div className="reading-card-header flex items-center justify-between px-4 py-2.5 border-b">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--rt-text-secondary)' }}>Solution</span>
                <button
                  onClick={() => setShowSolution(false)}
                  className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
                >
                  Hide
                </button>
              </div>

              {/* Collapsible step-by-step solution body */}
              <div className="reading-card p-4">
                <CollapsibleSolution solution={solution} finalAnswer={finalAnswer} />
              </div>

              {/* Footer */}
              <div className="reading-card-header px-4 py-3 border-t flex items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>

                {currentStatus !== 'solved' ? (
                  <button
                    onClick={() => onSolved?.(hintsRevealedRef.current)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1fab54] text-white text-sm font-semibold hover:bg-[#17944a] transition-colors"
                  >
                    <CheckCircle2 size={15} />
                    Mark as solved
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onUndoSolved}
                      className="flex items-center gap-1.5 text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
                    >
                      <Undo2 size={12} />
                      Undo solved
                    </button>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#1fab54]" />
                      <span className="text-xs font-semibold text-[#1fab54]">Solved</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
