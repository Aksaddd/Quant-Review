'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { textbookChapters } from '@/data/chapters';

const CHAPTER_EMOJIS: Record<number, string> = {
  3: '∫',
  4: '🎲',
  5: '📈',
  6: '💰',
  7: '⚙️',
};

/**
 * Chapters 3–7 are textbook-style (prose + embedded problems). Surface them
 * as a simple browsable list on the dashboard — we don't yet track per-problem
 * mastery for these chapters, so this is a navigation aid rather than a
 * progress widget.
 */
export default function ChapterList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#21242c]">Reference Chapters</h2>
        <span className="text-xs text-[#9299a5]">Chapters 3–7 · Textbook reading</span>
      </div>

      <div className="space-y-2">
        {textbookChapters.map((chap) => {
          const problemCount = chap.sections.reduce((a, s) => a + s.problemCount, 0);
          return (
            <Link
              key={chap.id}
              href={`/read/chapter-${chap.number}`}
              className="group flex items-center gap-4 p-4 bg-white border border-[#e4e6ea] rounded-lg hover:border-[#c8ccd4] hover:shadow-sm transition-all duration-150"
            >
              {/* Chapter icon */}
              <div className="relative w-11 h-11 shrink-0 rounded-lg bg-[var(--ka-blue-light)] border border-[#a8c4f8] flex items-center justify-center">
                <span className="text-xl font-bold text-[var(--ka-blue)]">
                  {CHAPTER_EMOJIS[chap.number] ?? <BookOpen size={18} />}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[11px] font-bold text-[#9299a5] uppercase tracking-wider">
                    Chapter {chap.number}
                  </p>
                  <span className="text-[10px] text-[#9299a5]">·</span>
                  <p className="text-[11px] text-[#9299a5]">pp. {chap.pageRange}</p>
                </div>
                <p className="text-sm font-semibold text-[#21242c] group-hover:text-[var(--ka-blue)] transition-colors truncate">
                  {chap.title}
                </p>
                <p className="text-[12px] text-[#9299a5] mt-0.5">
                  {chap.sections.length} sections · {problemCount} worked problems
                </p>
              </div>

              <ChevronRight
                size={16}
                className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors shrink-0"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
