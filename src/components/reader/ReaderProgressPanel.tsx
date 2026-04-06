'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

export default function ReaderProgressPanel() {
  const { totalSolved, totalProblems, sectionStats } = useProgress();
  const [expanded, setExpanded] = useState(false);
  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-56 bg-white border border-[#e4e6ea] rounded-xl shadow-lg overflow-hidden">
      {/* Summary row — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f7f8fa] transition-colors"
      >
        {/* Mini ring */}
        <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
          <circle cx="16" cy="16" r="13" fill="none" stroke="#e4e6ea" strokeWidth="3" />
          {pct > 0 && (
            <circle
              cx="16" cy="16" r="13"
              fill="none"
              stroke={pct === 100 ? '#1fab54' : '#1865f2'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 13}`}
              strokeDashoffset={`${2 * Math.PI * 13 * (1 - pct / 100)}`}
              transform="rotate(-90 16 16)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          )}
        </svg>

        <div className="flex-1 text-left min-w-0">
          <p className="text-[11px] font-semibold text-[#9299a5] uppercase tracking-wider">Progress</p>
          <p className="text-sm font-bold text-[#21242c]">
            {totalSolved} <span className="text-[#9299a5] font-normal">/ {totalProblems}</span>
          </p>
        </div>

        {expanded ? (
          <ChevronDown size={14} className="text-[#9299a5] shrink-0" />
        ) : (
          <ChevronUp size={14} className="text-[#9299a5] shrink-0" />
        )}
      </button>

      {/* Section breakdown — expandable */}
      {expanded && (
        <div className="border-t border-[#e4e6ea] px-3 py-2 space-y-1.5 max-h-64 overflow-y-auto">
          {sectionStats.map((sec) => {
            const secPct = sec.total > 0 ? Math.round((sec.solved / sec.total) * 100) : 0;
            const done = sec.solved === sec.total && sec.total > 0;
            return (
              <a
                key={sec.section}
                href={`#section-${sec.section}`}
                className="flex items-center gap-2 py-1 group"
              >
                <span className="text-[11px] font-medium text-[#9299a5] w-8 shrink-0">§{sec.section}</span>
                <div className="flex-1 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${secPct}%`,
                      backgroundColor: done ? '#1fab54' : '#1865f2',
                    }}
                  />
                </div>
                {done ? (
                  <CheckCircle2 size={12} className="text-[#1fab54] shrink-0" />
                ) : (
                  <span className="text-[10px] font-semibold text-[#9299a5] shrink-0 w-6 text-right">
                    {secPct}%
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {/* Progress bar footer */}
      <div className="h-1 bg-[#e4e6ea]">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: pct === 100 ? '#1fab54' : '#1865f2',
          }}
        />
      </div>
    </div>
  );
}
