'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export type MistakeTag =
  | 'conceptual'
  | 'calculation'
  | 'forgot_formula'
  | 'misread'
  | 'other';

const MISTAKE_OPTIONS: { tag: MistakeTag; label: string; emoji: string; description: string }[] = [
  { tag: 'conceptual',     label: 'Conceptual Error',  emoji: '🧠', description: 'Misunderstood the underlying concept' },
  { tag: 'calculation',    label: 'Calculation Error', emoji: '🔢', description: 'Right approach, wrong arithmetic' },
  { tag: 'forgot_formula', label: 'Forgot Formula',    emoji: '📝', description: "Couldn't recall the needed formula" },
  { tag: 'misread',        label: 'Misread Problem',   emoji: '👁', description: 'Missed a key detail in the question' },
  { tag: 'other',          label: 'Other',             emoji: '❓', description: 'Something else went wrong' },
];

interface MistakeTaxonomyProps {
  onSelect: (tag: MistakeTag | null) => void;
}

/**
 * Shown after a "Blackout" or "Again" rating on a flashcard.
 * Lets the user categorize their mistake for weakness profiling.
 *
 * Apple treatment: iOS orange tint surround instead of amber-yellow,
 * selected state uses stronger tint + accent-less.
 */
export default function MistakeTaxonomy({ onSelect }: MistakeTaxonomyProps) {
  const [selected, setSelected] = useState<MistakeTag | null>(null);

  const handleSelect = (tag: MistakeTag) => {
    setSelected(tag);
    onSelect(tag);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }}
      className="p-4"
      style={{
        borderRadius: 14,
        background: 'rgba(255,159,10,0.08)',
        border: '0.5px solid rgba(255,159,10,0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} style={{ color: '#ff9f0a' }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: '#b76d07' }}>
            What went wrong?
          </span>
        </div>
        <button
          onClick={() => onSelect(null)}
          className="text-[11px] text-[#86868b] hover:text-[#424245] transition-colors duration-200"
          style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        >
          Skip
        </button>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {MISTAKE_OPTIONS.map((opt) => {
          const isSelected = selected === opt.tag;
          return (
            <button
              key={opt.tag}
              onClick={() => handleSelect(opt.tag)}
              className="flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 active:scale-[0.99]"
              style={{
                borderRadius: 12,
                background: isSelected ? 'rgba(255,159,10,0.16)' : 'rgba(255,255,255,0.72)',
                border: isSelected ? '0.5px solid rgba(255,159,10,0.4)' : '0.5px solid rgba(0,0,0,0.05)',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              <span className="text-base">{opt.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">{opt.label}</p>
                <p className="text-[10px] text-[#86868b]">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
