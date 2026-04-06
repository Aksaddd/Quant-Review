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
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={13} className="text-[#f5a623]" />
        <span className="text-xs font-bold text-[#7a4e00] uppercase tracking-wider">
          Hints — {revealed}/{hints.length} revealed
        </span>
      </div>

      {hints.slice(0, revealed).map((hint, i) => (
        <div key={i} className="flex gap-3 mb-2 animate-fade-up">
          <span className="w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div className="text-sm text-[#626975] leading-relaxed">
            <MarkdownRenderer content={hint} />
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 mt-2">
        {revealed < hints.length && (
          <button
            onClick={() => setRevealed((r) => r + 1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#f5a623] hover:underline"
          >
            <ChevronDown size={13} />
            Get a hint {revealed + 1 < hints.length ? `(${revealed + 1}/${hints.length})` : ''}
          </button>
        )}
        {revealed > 0 && (
          <button
            onClick={() => setRevealed(0)}
            className="flex items-center gap-1.5 text-xs text-[#9299a5] hover:text-[#626975]"
          >
            <ChevronUp size={13} />
            Hide hints
          </button>
        )}
      </div>
    </div>
  );
}
