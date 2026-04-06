'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import HintStep from './HintStep';

interface SolutionRevealProps {
  solution: string;
  finalAnswer?: string;
  hints: string[];
  onSolved?: () => void;
  onAttempted?: () => void;
  currentStatus: 'unseen' | 'attempted' | 'solved' | 'reading';
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
    <div className="space-y-3 mt-1">
      {/* Hints */}
      {hints.length > 0 && (
        <div className="p-4 rounded-lg bg-[#fef9e7] border border-[#fdd8a0]">
          <HintStep hints={hints} />
        </div>
      )}

      {/* Solution toggle */}
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
        <div className="rounded-lg border border-[#e4e6ea] overflow-hidden animate-fade-up">
          {/* Solution header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#f7f8fa] border-b border-[#e4e6ea]">
            <span className="text-xs font-bold text-[#626975] uppercase tracking-wider">Solution</span>
            <button
              onClick={() => setShowSolution(false)}
              className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
            >
              Hide
            </button>
          </div>

          {/* Solution body */}
          <div className="p-4 bg-white">
            <div className="prose-reading text-[#21242c]">
              <MarkdownRenderer content={solution} />
            </div>

            {finalAnswer && (
              <div className="mt-4 p-3 rounded-lg bg-[#e6f4ea] border border-[#a8d5b5]">
                <p className="text-[10px] font-bold text-[#1fab54] uppercase tracking-wider mb-1">Final Answer</p>
                <p className="text-sm font-semibold text-[#0d652d]">{finalAnswer}</p>
              </div>
            )}
          </div>

          {/* Mark solved footer */}
          {currentStatus !== 'solved' && (
            <div className="px-4 py-3 bg-[#f7f8fa] border-t border-[#e4e6ea] flex justify-end">
              <button
                onClick={onSolved}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1fab54] text-white text-sm font-semibold hover:bg-[#17944a] transition-colors"
              >
                <CheckCircle2 size={15} />
                Mark as solved
              </button>
            </div>
          )}

          {currentStatus === 'solved' && (
            <div className="px-4 py-2.5 bg-[#e6f4ea] border-t border-[#a8d5b5] flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#1fab54]" />
              <span className="text-xs font-semibold text-[#1fab54]">Marked as solved</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
