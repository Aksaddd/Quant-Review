'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { textbookChapters, problemsByChapter } from '@/data/chapters';
import { useProgress } from '@/hooks/useProgress';

const CHAPTER_EMOJIS: Record<number, string> = {
  3: '∫',
  4: '🎲',
  5: '📈',
  6: '💰',
  7: '⚙️',
};

function masteryColor(pct: number): string {
  if (pct === 0)   return '#d2d2d7';
  if (pct === 100) return '#30d158';
  return 'var(--eureka-accent)';
}

function masteryLabel(pct: number): string {
  if (pct === 0) return 'Not started';
  if (pct < 50) return 'Familiar';
  if (pct < 100) return 'Proficient';
  return 'Mastered';
}

/**
 * Chapters 3–7 — textbook-style chapters with structured worked problems.
 * Shows per-chapter progress ring identical in spirit to the ch-2 SectionGrid.
 */
export default function ChapterList() {
  const { getProblemStatus } = useProgress();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Reference Chapters</h2>
        <span className="text-[11px] text-[#86868b]">Chapters 3–7 · Textbook + problems</span>
      </div>

      <div className="space-y-2">
        {textbookChapters.map((chap) => {
          const problems = problemsByChapter[chap.number] ?? [];
          const total = problems.length;
          const solved = problems.filter((p) => getProblemStatus(p.id) === 'solved').length;
          const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
          const complete = total > 0 && solved === total;
          const color = masteryColor(pct);
          const label = masteryLabel(pct);

          return (
            <Link
              key={chap.id}
              href={`/read/chapter-${chap.number}`}
              className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-all duration-200"
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
              {/* Mastery ring with chapter glyph */}
              <div className="relative w-11 h-11 shrink-0">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
                  {pct > 0 && (
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
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
                <span className="absolute inset-0 flex items-center justify-center text-base font-semibold" style={{ color: 'var(--eureka-accent)' }}>
                  {CHAPTER_EMOJIS[chap.number] ?? <BookOpen size={16} />}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[10px] font-medium text-[#86868b] tabular-nums">
                    Ch {chap.number} · pp. {chap.pageRange}
                  </p>
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
                <p
                  className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[var(--eureka-accent)] transition-colors duration-200 truncate"
                  style={{ transitionTimingFunction: 'var(--ease-standard)' }}
                >
                  {chap.title}
                </p>
                <p className="text-[11px] text-[#86868b] mt-0.5 tabular-nums">
                  {solved} / {total} problems · {chap.sections.length} sections
                </p>
              </div>

              {/* Right indicator */}
              <div className="flex items-center gap-3 shrink-0">
                {complete ? (
                  <CheckCircle2 size={20} style={{ color: '#30d158' }} />
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-semibold tabular-nums tracking-tight" style={{ color }}>
                      {pct}%
                    </span>
                    <ChevronRight
                      size={15}
                      className="text-[#86868b] group-hover:text-[var(--eureka-accent)] transition-colors duration-200"
                      style={{ transitionTimingFunction: 'var(--ease-standard)' }}
                    />
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
