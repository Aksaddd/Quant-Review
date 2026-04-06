'use client';

import Link from 'next/link';
import { CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import type { SectionStats } from '@/lib/types';

const SECTION_EMOJIS: Record<string, string> = {
  '2.1': '🎯', '2.2': '🔢', '2.3': '🧩', '2.4': '⚖️',
  '2.5': '∑',  '2.6': '🐦', '2.7': '🔣', '2.8': '📐', '2.9': '💡',
};

function masteryLabel(pct: number): string {
  if (pct === 0)   return 'Not started';
  if (pct < 50)    return 'Familiar';
  if (pct < 100)   return 'Proficient';
  return 'Mastered';
}

function masteryColor(pct: number): string {
  if (pct === 0)   return '#e4e6ea';
  if (pct < 50)    return '#a3c4f3';
  if (pct < 100)   return '#1865f2';
  return '#1fab54';
}

interface SectionGridProps {
  sections: SectionStats[];
}

export default function SectionGrid({ sections }: SectionGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#21242c]">Course Units</h2>
        <Link
          href="/read/chapter-2"
          className="text-sm font-semibold text-[var(--ka-blue)] hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-2">
        {sections.map((sec) => {
          const pct = sec.total > 0 ? Math.round((sec.solved / sec.total) * 100) : 0;
          const complete = sec.solved === sec.total && sec.total > 0;
          const color = masteryColor(pct);
          const label = masteryLabel(pct);

          return (
            <Link
              key={sec.section}
              href={`/read/chapter-2#section-${sec.section}`}
              className="group flex items-center gap-4 p-4 bg-white border border-[#e4e6ea] rounded-lg hover:border-[#c8ccd4] hover:shadow-sm transition-all duration-150"
            >
              {/* Mastery ring */}
              <div className="relative w-11 h-11 shrink-0">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#e4e6ea" strokeWidth="3" />
                  {pct > 0 && (
                    <circle
                      cx="22" cy="22" r="18"
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
                      transform="rotate(-90 22 22)"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                  )}
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-base">
                  {SECTION_EMOJIS[sec.section] ?? '📖'}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[11px] font-medium text-[#9299a5]">§{sec.section}</p>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: color + '20', color }}
                  >
                    {label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#21242c] group-hover:text-[var(--ka-blue)] transition-colors">
                  {sec.sectionTitle}
                </p>
                <p className="text-[12px] text-[#9299a5] mt-0.5">
                  {sec.solved} / {sec.total} problems
                </p>
              </div>

              {/* Right */}
              {complete ? (
                <CheckCircle2 size={20} className="text-[#1fab54] shrink-0" />
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                  <ChevronRight size={15} className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
