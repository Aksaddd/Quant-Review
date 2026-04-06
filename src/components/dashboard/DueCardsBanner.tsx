'use client';

import Link from 'next/link';
import { ArrowRight, CalendarClock, Star } from 'lucide-react';

interface DueCardsBannerProps {
  dueCount: number;
  newCount: number;
  streak: number;
}

export default function DueCardsBanner({ dueCount, newCount, streak }: DueCardsBannerProps) {
  const total = dueCount + newCount;

  if (total === 0) {
    return (
      <div className="flex items-center gap-4 p-4 bg-[#e6f4ea] border border-[#a8d5b5] rounded-lg">
        <span className="text-2xl" aria-hidden>✅</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#0d652d]">All caught up for today!</p>
          <p className="text-xs text-[#1fab54] mt-0.5">No reviews or new cards due. Come back tomorrow.</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e8471d]">
            🔥 {streak} day streak
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-[#e8f0fe] border border-[#a8c4f8] rounded-lg">
      <span className="text-2xl" aria-hidden>🧠</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#0d4fd1]">
          Today&apos;s session — {total} card{total !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          {dueCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#1865f2]">
              <CalendarClock size={11} /> {dueCount} review{dueCount !== 1 ? 's' : ''}
            </span>
          )}
          {newCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#f5a623]">
              <Star size={11} /> {newCount} new
            </span>
          )}
        </div>
      </div>
      {streak > 0 && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e8471d] shrink-0">
          🔥 {streak}
        </div>
      )}
      <Link
        href="/flashcards"
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors shrink-0"
      >
        Start <ArrowRight size={14} />
      </Link>
    </div>
  );
}
