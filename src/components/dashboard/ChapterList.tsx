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
  if (pct === 0) return '#e4e6ea';
  if (pct < 50) return '#a3c4f3';
  if (pct < 100) return '#1865f2';
  return '#1fab54';
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
        <h2 className="text-lg font-bold text-[#21242c]">Reference Chapters</h2>
        <span className="text-xs text-[#9299a5]">Chapters 3–7 · Textbook + problems</span>
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
              className="group flex items-center gap-4 p-4 bg-white border border-[#e4e6ea] rounded-lg hover:border-[#c8ccd4] hover:shadow-sm transition-all duration-150"
            >
              {/* Mastery ring with chapter glyph */}
              <div className="relative w-11 h-11 shrink-0">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#e4e6ea" strokeWidth="3" />
                  {pct > 0 && (
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
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
                <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-[var(--ka-blue)]">
                  {CHAPTER_EMOJIS[chap.number] ?? <BookOpen size={16} />}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[11px] font-medium text-[#9299a5]">
                    Ch {chap.number} · pp. {chap.pageRange}
                  </p>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: color + '20', color }}
                  >
                    {label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#21242c] group-hover:text-[var(--ka-blue)] transition-colors truncate">
                  {chap.title}
                </p>
                <p className="text-[12px] text-[#9299a5] mt-0.5">
                  {solved} / {total} problems · {chap.sections.length} sections
                </p>
              </div>

              {/* Right indicator */}
              <div className="flex items-center gap-3 shrink-0">
                {complete ? (
                  <CheckCircle2 size={20} className="text-[#1fab54]" />
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold" style={{ color }}>
                      {pct}%
                    </span>
                    <ChevronRight
                      size={15}
                      className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors"
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
