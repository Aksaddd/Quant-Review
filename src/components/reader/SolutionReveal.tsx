'use client';

import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import MarkdownRenderer from './MarkdownRenderer';
import HintStep from './HintStep';

interface SolutionRevealProps {
  solution: string;
  finalAnswer?: string;
  hints: string[];
  onSolved?: () => void;
  onAttempted?: () => void;
  currentStatus: 'unseen' | 'attempted' | 'solved';
}

export default function SolutionReveal({
  solution,
  finalAnswer,
  hints,
  onSolved,
  onAttempted,
  currentStatus,
}: SolutionRevealProps) {
  const [showSolution, setShowSolution] = useState(false);

  const handleReveal = () => {
    setShowSolution(true);
    if (currentStatus === 'unseen') onAttempted?.();
  };

  return (
    <div className="mt-5 space-y-4">
      {/* Hint accordion */}
      {hints.length > 0 && (
        <div className="p-4 rounded-2xl bg-[var(--surface-3)] border border-[var(--surface-border)]">
          <HintStep hints={hints} />
        </div>
      )}

      {/* Solution toggle */}
      {!showSolution ? (
        <button
          onClick={handleReveal}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl
            border-2 border-dashed border-[var(--surface-border-strong)]
            text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)]
            hover:border-brand-500/40 hover:bg-brand-500/5
            transition-all duration-200"
        >
          <Eye size={15} />
          Reveal Solution
        </button>
      ) : (
        <div className="rounded-2xl border border-[var(--surface-border-strong)] overflow-hidden animate-fade-up">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-3)] border-b border-[var(--surface-border)]">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-brand-400" />
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Solution</span>
            </div>
            <button
              onClick={() => setShowSolution(false)}
              className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <EyeOff size={14} />
            </button>
          </div>

          <div className="p-4 bg-[var(--surface-2)]">
            <MarkdownRenderer content={solution} />

            {finalAnswer && (
              <div className="mt-4 p-3 rounded-xl bg-[var(--success-bg)] border border-[var(--success)]/20">
                <p className="text-xs font-semibold text-[var(--success)] uppercase tracking-wider mb-1">Answer</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{finalAnswer}</p>
              </div>
            )}
          </div>

          {/* Mark solved button */}
          {currentStatus !== 'solved' && (
            <div className="px-4 py-3 bg-[var(--surface-3)] border-t border-[var(--surface-border)] flex justify-end">
              <Button
                size="sm"
                variant="success"
                iconRight={<CheckCircle2 size={14} />}
                onClick={onSolved}
              >
                Mark as Solved
              </Button>
            </div>
          )}

          {currentStatus === 'solved' && (
            <div className="px-4 py-3 bg-[var(--success-bg)] border-t border-[var(--success)]/20 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[var(--success)]" />
              <span className="text-xs font-medium text-[var(--success)]">Marked as solved</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
