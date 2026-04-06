'use client';

import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface HintStepProps {
  hints: string[];
}

export default function HintStep({ hints }: HintStepProps) {
  const [revealed, setRevealed] = useState(0);

  if (hints.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={14} className="text-[var(--warning)]" />
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Hints ({revealed}/{hints.length} revealed)
        </span>
      </div>

      {hints.slice(0, revealed).map((hint, i) => (
        <div
          key={i}
          className="flex gap-3 p-3 rounded-xl bg-[var(--warning-bg)] border border-[var(--warning)]/20 animate-fade-up"
        >
          <span className="w-5 h-5 rounded-full bg-[var(--warning)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--warning)] shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <MarkdownRenderer content={hint} />
          </div>
        </div>
      ))}

      {revealed < hints.length && (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="flex items-center gap-2 text-xs font-medium text-[var(--warning)] hover:text-amber-300 transition-colors mt-1"
        >
          <ChevronDown size={14} />
          Show hint {revealed + 1} of {hints.length}
        </button>
      )}

      {revealed > 0 && revealed === hints.length && (
        <button
          onClick={() => setRevealed(0)}
          className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-1"
        >
          <ChevronUp size={14} />
          Hide hints
        </button>
      )}
    </div>
  );
}
