'use client';

import Link from 'next/link';
import { CheckCircle2, ChevronRight } from 'lucide-react';
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

/**
 * Mastery uses a single-accent luminance ramp instead of the prior
 * blue→green semantic ladder, so the user's accent picks through.
 */
function masteryColor(pct: number): string {
  if (pct === 0)   return '#d2d2d7';                // Apple grey 300
  if (pct === 100) return '#30d158';                // iOS green — milestone
  return 'var(--eureka-accent)';                    // any partial progress
}

interface SectionGridProps {
  sections: SectionStats[];
}

export default function SectionGrid({ sections }: SectionGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Course Units</h2>
        <Link
          href="/read/chapter-2"
          className="text-[13px] font-semibold hover:underline flex items-center gap-1"
          style={{ color: 'var(--eureka-accent)' }}
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
              className="group flex items-center gap-4 p-4 transition-all duration-200"
              style={{
                background: '#ffffff',
                border: '0.5px solid rgba(0,0,0,0.06)',
                borderRadius: 14,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Mastery ring */}
              <div className="relative w-11 h-11 shrink-0">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
                  {pct > 0 && (
                    <circle
                      cx="22" cy="22" r="18"
                      fill="none"
                      stroke={color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
                      transform="rotate(-90 22 22)"
                      style={{ transition: 'stroke-dashoffset 600ms var(--ease-standard)' }}
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
                  <p className="text-[10px] font-medium text-[#86868b] tabular-nums">{sec.section}</p>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md tracking-tight"
                    style={
                      pct === 0
                        ? { background: 'rgba(0,0,0,0.05)', color: '#86868b' }
                        : pct === 100
                        ? { background: 'rgba(48,209,88,0.14)', color: '#1f9b46' }
                        : { background: 'var(--eureka-accent-tint)', color: 'var(--eureka-accent)' }
                    }
                  >
                    {label}
                  </span>
                </div>
                <p className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[var(--eureka-accent)] transition-colors duration-200"
                   style={{ transitionTimingFunction: 'var(--ease-standard)' }}>
                  {sec.sectionTitle}
                </p>
                <p className="text-[11px] text-[#86868b] mt-0.5 tabular-nums">
                  {sec.solved} / {sec.total} problems
                </p>
              </div>

              {/* Right — flashcard mastery dots + chevron */}
              <div className="flex items-center gap-3 shrink-0">
                {sec.total > 0 && (
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => {
                        const filled = sec.cardsMastered > 0
                          ? Math.round((sec.cardsMastered / Math.max(sec.cardsReviewed, 1)) * 4)
                          : 0;
                        return (
                          <span
                            key={i}
                            className="w-[6px] h-[6px] rounded-full"
                            style={{ background: i < filled ? '#30d158' : 'rgba(0,0,0,0.08)' }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[9px] text-[#86868b] tabular-nums">
                      {sec.cardsMastered}/{sec.cardsReviewed > 0 ? sec.cardsReviewed : '?'} mastered
                    </span>
                  </div>
                )}
                {complete ? (
                  <CheckCircle2 size={20} style={{ color: '#30d158' }} />
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-semibold tabular-nums tracking-tight" style={{ color }}>{pct}%</span>
                    <ChevronRight size={15} className="text-[#86868b] group-hover:text-[var(--eureka-accent)] transition-colors duration-200"
                                   style={{ transitionTimingFunction: 'var(--ease-standard)' }} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
