'use client';

import { Brain, RotateCcw } from 'lucide-react';
import { useStudyOverlayStore } from '@/stores/useStudyOverlayStore';

/**
 * Floating overlay control: toggles active-recall mode for the current page
 * and surfaces a tiny session HUD (got / partial / blank). Intentionally
 * minimal — the overlay's whole value is the per-block mask; the bar is just
 * the on/off lever plus lightweight metacognitive feedback.
 */
export default function StudyOverlayBar() {
  const enabled = useStudyOverlayStore((s) => s.enabled);
  const counts = useStudyOverlayStore((s) => s.counts);
  const toggle = useStudyOverlayStore((s) => s.toggle);
  const resetSession = useStudyOverlayStore((s) => s.resetSession);

  const total = counts.got + counts.partial + counts.blank;
  const accuracy = total > 0 ? Math.round(((counts.got + counts.partial * 0.5) / total) * 100) : 0;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
      aria-label="Active recall overlay controls"
    >
      {enabled && total > 0 && (
        <div
          className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur border border-[#e4e6ea] shadow-sm text-[11px] font-medium text-[#21242c] tabular-nums"
          style={{ backdropFilter: 'saturate(180%) blur(16px)' }}
        >
          <span className="text-[#1e6b34]">✓ {counts.got}</span>
          <span className="text-[#8a5a00]">~ {counts.partial}</span>
          <span className="text-[#a21f1f]">− {counts.blank}</span>
          <span className="text-[#9299a5]">·</span>
          <span className="text-[#626975]">{accuracy}% recalled</span>
          <button
            type="button"
            onClick={resetSession}
            title="Reset session counts"
            className="ml-1 text-[#9299a5] hover:text-[#21242c] transition-colors"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-md text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97]"
        style={{
          background: enabled ? 'var(--eureka-accent, #1865f2)' : '#ffffff',
          color: enabled ? '#ffffff' : '#21242c',
          border: enabled ? '1px solid transparent' : '1px solid #e4e6ea',
          transitionTimingFunction: 'var(--ease-standard)',
        }}
        aria-pressed={enabled}
      >
        <Brain size={15} />
        {enabled ? 'Recall mode: on' : 'Study with recall'}
      </button>
    </div>
  );
}
