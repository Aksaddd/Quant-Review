'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, CheckCircle2, ChevronDown } from 'lucide-react';

interface ScratchpadGateProps {
  /** If true, the user has submitted their approach and can now see solutions */
  onSubmit: (approach: string) => void;
  submitted: boolean;
}

/**
 * "Generate Before Reveal" gate — forces the student to write their approach
 * before the solution/hints become available. Implements the generation effect
 * from cognitive science research.
 */
export default function ScratchpadGate({ onSubmit, submitted }: ScratchpadGateProps) {
  const [text, setText] = useState('');
  const [expanded, setExpanded] = useState(!submitted);

  if (submitted && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#e6f4ea] border border-[#a8d5b5] text-sm text-[#0d652d] font-semibold hover:bg-[#d4eede] transition-colors"
      >
        <CheckCircle2 size={14} />
        Your approach submitted
        <ChevronDown size={14} className="ml-auto" />
      </button>
    );
  }

  if (submitted && expanded) {
    return (
      <div className="rounded-lg border border-[#a8d5b5] bg-[#f6fef9] p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#1fab54]" />
            <span className="text-xs font-bold text-[#0d652d] uppercase tracking-wider">
              Your approach
            </span>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
          >
            Collapse
          </button>
        </div>
        <p className="text-sm text-[#21242c] whitespace-pre-wrap leading-relaxed">
          {text || '(Quick submission)'}
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border-2 border-dashed border-[#1865f2]/30 bg-[#f4f7fe] p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <PenLine size={14} className="text-[#1865f2]" />
          <span className="text-xs font-bold text-[#1865f2] uppercase tracking-wider">
            Your approach first
          </span>
        </div>
        <p className="text-xs text-[#626975] mb-3 leading-relaxed">
          Describe your approach before seeing the solution. Even rough notes help —
          struggling to generate an answer strengthens long-term retention.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How would you solve this? What technique comes to mind?"
          rows={3}
          className="w-full text-sm border border-[#c8ccd4] rounded-lg px-3 py-2.5 outline-none focus:border-[#1865f2] focus:ring-1 focus:ring-[#1865f2]/20 bg-white resize-none placeholder:text-[#9299a5]"
        />
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => onSubmit('')}
            className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
          >
            Skip
          </button>
          <button
            onClick={() => onSubmit(text)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1865f2] text-white text-sm font-semibold hover:bg-[#1254cc] transition-colors"
          >
            <PenLine size={13} />
            Submit &amp; reveal hints
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
