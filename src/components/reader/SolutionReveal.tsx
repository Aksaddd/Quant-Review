'use client';

import { useState, useRef } from 'react';
import { CheckCircle2, ChevronDown, RotateCcw, Undo2 } from 'lucide-react';
import HintStep from './HintStep';
import ApproachCanvas, { type CanvasSnapshot } from './ApproachCanvas';
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
  problemId: string;
  problemSetup?: string;
  savedCanvasSnapshot?: CanvasSnapshot | null;
  onCanvasSubmit?: (snapshot: CanvasSnapshot) => void;
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
  problemId,
  problemSetup,
  savedCanvasSnapshot,
  onCanvasSubmit,
}: SolutionRevealProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [scratchpadSubmitted, setScratchpadSubmitted] = useState(false);
  const hintsRevealedRef = useRef(0);

  const handleCanvasSubmit = (snapshot: CanvasSnapshot) => {
    setScratchpadSubmitted(true);
    onCanvasSubmit?.(snapshot);
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
      {/* Generate Before Reveal: drawing canvas */}
      {currentStatus !== 'solved' && (
        <ApproachCanvas
          onSubmit={handleCanvasSubmit}
          submitted={scratchpadSubmitted}
          savedSnapshot={savedCanvasSnapshot}
          problemId={problemId}
          problemSetup={problemSetup}
        />
      )}

      {/* Hints — only visible after scratchpad submission (or if already solved) */}
      {(scratchpadSubmitted || currentStatus === 'solved') && hints.length > 0 && (
        <div
          className="p-4"
          style={{
            borderRadius: 14,
            background: 'rgba(255,159,10,0.08)',
            border: '0.5px solid rgba(255,159,10,0.2)',
          }}
        >
          <HintStep hints={hints} onRevealCount={handleHintRevealed} />
        </div>
      )}

      {/* Solution toggle — only available after scratchpad submission */}
      {(scratchpadSubmitted || currentStatus === 'solved') && (
        <>
          {!showSolution ? (
            <button
              onClick={handleReveal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-[13px] font-semibold tracking-tight transition-all duration-200"
              style={{
                borderRadius: 12,
                background: 'var(--eureka-accent-tint)',
                color: 'var(--eureka-accent)',
                border: '0.5px solid rgba(0,0,0,0.06)',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--eureka-accent)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--eureka-accent-tint)';
                e.currentTarget.style.color = 'var(--eureka-accent)';
              }}
            >
              <ChevronDown size={15} />
              Show solution
            </button>
          ) : (
            <div
              className="reading-card overflow-hidden animate-fade-up"
              style={{
                borderRadius: 14,
                border: '0.5px solid rgba(0,0,0,0.06)',
              }}
            >
              {/* Solution header */}
              <div
                className="reading-card-header flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--rt-text-secondary)' }}>Solution</span>
                <button
                  onClick={() => setShowSolution(false)}
                  className="text-[11px] text-[#86868b] hover:text-[#424245] transition-colors"
                >
                  Hide
                </button>
              </div>

              {/* Collapsible step-by-step solution body */}
              <div className="reading-card p-4">
                <CollapsibleSolution solution={solution} finalAnswer={finalAnswer} />
              </div>

              {/* Footer */}
              <div
                className="reading-card-header px-4 py-3 flex items-center justify-between gap-3"
                style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
              >
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-[11px] text-[#86868b] hover:text-[#424245] transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>

                {currentStatus !== 'solved' ? (
                  <button
                    onClick={() => onSolved?.(hintsRevealedRef.current)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97]"
                    style={{
                      borderRadius: 10,
                      background: '#30d158',
                      color: '#ffffff',
                      transitionTimingFunction: 'var(--ease-standard)',
                    }}
                  >
                    <CheckCircle2 size={15} />
                    Mark as solved
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onUndoSolved}
                      className="flex items-center gap-1.5 text-[11px] text-[#86868b] hover:text-[#424245] transition-colors"
                    >
                      <Undo2 size={12} />
                      Undo solved
                    </button>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} style={{ color: '#30d158' }} />
                      <span className="text-[11px] font-semibold tracking-tight" style={{ color: '#1f9b46' }}>Solved</span>
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
