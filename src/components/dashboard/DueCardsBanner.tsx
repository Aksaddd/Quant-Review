'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DueCardsBannerProps {
  dueCount: number;
  streak: number;
}

export default function DueCardsBanner({ dueCount, streak }: DueCardsBannerProps) {
  if (dueCount === 0) {
    return (
      <div className="flex items-center gap-4 p-4 bg-[#e6f4ea] border border-[#a8d5b5] rounded-lg">
        <span className="text-2xl" aria-hidden>✅</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#0d652d]">You're all caught up!</p>
          <p className="text-xs text-[#1fab54] mt-0.5">No cards due for review. Come back tomorrow.</p>
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
      <div className="flex-1">
        <p className="text-sm font-bold text-[#0d4fd1]">
          {dueCount} card{dueCount !== 1 ? 's' : ''} ready for review
        </p>
        <p className="text-xs text-[#1865f2] mt-0.5">
          Review now to strengthen your long-term memory.
        </p>
      </div>
      <Link
        href="/flashcards"
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors shrink-0"
      >
        Review <ArrowRight size={14} />
      </Link>
    </div>
  );
}
