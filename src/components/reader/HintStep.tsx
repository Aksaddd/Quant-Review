'use client';

import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface HintStepProps {
  hints: string[];
  onRevealCount?: (count: number) => void;
}

/**
 * HintStep — iOS orange (#ff9f0a) as the semantic "hint" hue,
 * but used only as tint + glyph; numbered chip uses solid iOS orange.
 */
const HINT_HUE = '#ff9f0a';
const HINT_HUE_DEEP = '#b76d07';

export default function HintStep({ hints, onRevealCount }: HintStepProps) {
  const [revealed, setRevealed] = useState(0);

  if (hints.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={13} style={{ color: HINT_HUE }} />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: HINT_HUE_DEEP }}
        >
          Hints — {revealed}/{hints.length} revealed
        </span>
      </div>

      {hints.slice(0, revealed).map((hint, i) => (
        <div key={i} className="flex gap-3 mb-2 animate-fade-up">
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5 tracking-tight"
            style={{ background: HINT_HUE, color: '#ffffff' }}
          >
            {i + 1}
          </span>
          <div className="text-[13px] text-[#424245] leading-relaxed">
            <MarkdownRenderer content={hint} />
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 mt-2">
        {revealed < hints.length && (
          <button
            onClick={() => {
              setRevealed((r) => {
                const next = r + 1;
                onRevealCount?.(next);
                return next;
              });
            }}
            className="flex items-center gap-1.5 text-[11px] font-semibold tracking-tight transition-opacity duration-200 hover:opacity-80"
            style={{ color: HINT_HUE_DEEP, transitionTimingFunction: 'var(--ease-standard)' }}
          >
            <ChevronDown size={13} />
            Get a hint {revealed + 1 < hints.length ? `(${revealed + 1}/${hints.length})` : ''}
          </button>
        )}
        {revealed > 0 && (
          <button
            onClick={() => setRevealed(0)}
            className="flex items-center gap-1.5 text-[11px] text-[#86868b] hover:text-[#424245] transition-colors duration-200"
            style={{ transitionTimingFunction: 'var(--ease-standard)' }}
          >
            <ChevronUp size={13} />
            Hide hints
          </button>
        )}
      </div>
    </div>
  );
}
