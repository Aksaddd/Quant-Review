'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export type MistakeTag =
  | 'conceptual'
  | 'calculation'
  | 'forgot_formula'
  | 'misread'
  | 'other';

const MISTAKE_OPTIONS: { tag: MistakeTag; label: string; emoji: string; description: string }[] = [
  { tag: 'conceptual',    label: 'Conceptual Error',    emoji: '🧠', description: 'Misunderstood the underlying concept' },
  { tag: 'calculation',   label: 'Calculation Error',   emoji: '🔢', description: 'Right approach, wrong arithmetic' },
  { tag: 'forgot_formula', label: 'Forgot Formula',      emoji: '📝', description: "Couldn't recall the needed formula" },
  { tag: 'misread',       label: 'Misread Problem',     emoji: '👁', description: 'Missed a key detail in the question' },
  { tag: 'other',         label: 'Other',               emoji: '❓', description: 'Something else went wrong' },
];

interface MistakeTaxonomyProps {
  /** Called when the user selects a mistake tag (or skips) */
  onSelect: (tag: MistakeTag | null) => void;
}

/**
 * Shown after a "Blackout" or "Again" rating on a flashcard.
 * Lets the user categorize their mistake for weakness profiling.
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
      transition={{ duration: 0.2 }}
      className="bg-[#fef9e7] border border-[#fdd8a0] rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-[#f5a623]" />
          <span className="text-xs font-bold text-[#7a4e00] uppercase tracking-wider">
            What went wrong?
          </span>
        </div>
        <button
          onClick={() => onSelect(null)}
          className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
        >
          Skip
        </button>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {MISTAKE_OPTIONS.map((opt) => (
          <button
            key={opt.tag}
            onClick={() => handleSelect(opt.tag)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-150 ${
              selected === opt.tag
                ? 'border-[#f5a623] bg-[#fef3cc]'
                : 'border-[#fdd8a0]/50 bg-white/80 hover:border-[#fdd8a0] hover:bg-white'
            }`}
          >
            <span className="text-base">{opt.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#21242c]">{opt.label}</p>
              <p className="text-[10px] text-[#9299a5]">{opt.description}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
