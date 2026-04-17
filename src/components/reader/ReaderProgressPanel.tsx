'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

export default function ReaderProgressPanel() {
  const { totalSolved, totalProblems, sectionStats } = useProgress();
  const [expanded, setExpanded] = useState(false);
  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
  const fillColor = pct === 100 ? '#30d158' : 'var(--eureka-accent)';

  return (
    <div
      className="fixed bottom-6 right-6 z-40 w-56 overflow-hidden"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        border: '0.5px solid rgba(0,0,0,0.06)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-hud)',
      }}
    >
      {/* Summary row — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200"
        style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Mini ring */}
        <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
          <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
          {pct > 0 && (
            <circle
              cx="16" cy="16" r="13"
              fill="none"
              stroke={fillColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 13}`}
              strokeDashoffset={`${2 * Math.PI * 13 * (1 - pct / 100)}`}
              transform="rotate(-90 16 16)"
              style={{ transition: 'stroke-dashoffset 500ms var(--ease-standard)' }}
            />
          )}
        </svg>

        <div className="flex-1 text-left min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">Progress</p>
          <p className="text-[14px] font-semibold tracking-tight tabular-nums text-[#1d1d1f]">
            {totalSolved} <span className="text-[#86868b] font-normal">/ {totalProblems}</span>
          </p>
        </div>

        {expanded ? (
          <ChevronDown size={14} className="text-[#86868b] shrink-0" />
        ) : (
          <ChevronUp size={14} className="text-[#86868b] shrink-0" />
        )}
      </button>

      {/* Section breakdown — expandable */}
      {expanded && (
        <div
          className="px-3 py-2 space-y-1.5 max-h-64 overflow-y-auto"
          style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
        >
          {sectionStats.map((sec) => {
            const secPct = sec.total > 0 ? Math.round((sec.solved / sec.total) * 100) : 0;
            const done = sec.solved === sec.total && sec.total > 0;
            return (
              <a
                key={sec.section}
                href={`#section-${sec.section}`}
                className="flex items-center gap-2 py-1 group"
              >
                <span className="text-[10px] font-medium text-[#86868b] w-8 shrink-0 tracking-tight">{sec.section}</span>
                <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${secPct}%`,
                      background: done ? '#30d158' : 'var(--eureka-accent)',
                      transition: 'width 500ms var(--ease-standard)',
                    }}
                  />
                </div>
                {done ? (
                  <CheckCircle2 size={12} style={{ color: '#30d158' }} className="shrink-0" />
                ) : (
                  <span className="text-[10px] font-semibold text-[#86868b] shrink-0 w-6 text-right tabular-nums">
                    {secPct}%
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {/* Progress bar footer */}
      <div className="h-[2px]" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: fillColor,
            transition: 'width 500ms var(--ease-standard)',
          }}
        />
      </div>
    </div>
  );
}
