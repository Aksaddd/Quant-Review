'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, ListChecks } from 'lucide-react';
import { useStudyOverlayStore } from '@/stores/useStudyOverlayStore';

export interface RecallPrompt {
  /** Stable anchor id for the prompt target in the page. */
  anchorId: string;
  /** Short cue — the thing the learner should try to recall. */
  label: string;
}

interface RecallQueueProps {
  /** Label for the source of these prompts (e.g. "Things to Remember"). */
  heading: string;
  prompts: RecallPrompt[];
}

/**
 * Top-of-page retrieval cue list. When overlay is enabled, presents the
 * chapter's core prompts up front: learner attempts recall from the cue alone,
 * then jumps to the masked body to verify. This is the retrieval-first reading
 * loop the synthesis argues for (primary-research-sources §2, §3).
 *
 * Hidden entirely when overlay is off — zero footprint on normal reading.
 */
export default function RecallQueue({ heading, prompts }: RecallQueueProps) {
  const enabled = useStudyOverlayStore((s) => s.enabled);
  const [open, setOpen] = useState(true);

  if (!enabled || prompts.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl border border-[#d8e6ff] bg-[#f6faff] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <ListChecks size={15} className="text-[#1865f2]" />
        <span className="flex-1 text-[12px] font-semibold uppercase tracking-wider text-[#1d1d1f]">
          Recall queue · {heading}
        </span>
        <span className="text-[11px] text-[#626975]">{prompts.length} cues</span>
        {open ? (
          <ChevronDown size={14} className="text-[#9299a5]" />
        ) : (
          <ChevronRight size={14} className="text-[#9299a5]" />
        )}
      </button>

      {open && (
        <div className="border-t border-[#d8e6ff] px-4 py-3">
          <p className="text-[12px] text-[#626975] leading-relaxed mb-3">
            Before scrolling, try to recall each cue from memory. Then jump down to verify and
            self-rate.
          </p>
          <ol className="space-y-1.5">
            {prompts.map((p, i) => (
              <li key={p.anchorId}>
                <a
                  href={`#${p.anchorId}`}
                  className="flex gap-3 text-[13px] text-[#21242c] leading-snug hover:bg-white rounded-md px-2 py-1 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-white border border-[#d8e6ff] text-[11px] font-semibold text-[#1865f2] flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="flex-1">{p.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
