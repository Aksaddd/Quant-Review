'use client';

import Link from 'next/link';
import { ArrowRight, CalendarClock, Star } from 'lucide-react';

interface DueCardsBannerProps {
  dueCount: number;
  newCount: number;
  streak: number;
}

const CARD_BASE: React.CSSProperties = {
  borderRadius: 16,
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
};

export default function DueCardsBanner({ dueCount, newCount, streak }: DueCardsBannerProps) {
  const total = dueCount + newCount;

  if (total === 0) {
    return (
      <div
        className="flex items-center gap-4 p-4"
        style={{
          ...CARD_BASE,
          background: 'rgba(48,209,88,0.08)',
          border: '0.5px solid rgba(48,209,88,0.2)',
        }}
      >
        <span className="text-2xl" aria-hidden>✅</span>
        <div className="flex-1">
          <p className="text-[14px] font-semibold tracking-tight" style={{ color: '#1f9b46' }}>
            All caught up for today
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: '#30a14c' }}>
            No reviews or new cards due. Come back tomorrow.
          </p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: '#ff453a' }}>
            🔥 {streak} day streak
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 sm:gap-4 p-4"
      style={{
        ...CARD_BASE,
        background: 'var(--eureka-accent-tint)',
        border: '0.5px solid var(--eureka-accent-tint-strong)',
      }}
    >
      <span className="text-2xl shrink-0" aria-hidden>🧠</span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--eureka-accent)' }}>
          Today&apos;s session — {total} card{total !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
          {dueCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] tabular-nums" style={{ color: 'var(--eureka-accent)' }}>
              <CalendarClock size={11} /> {dueCount} review{dueCount !== 1 ? 's' : ''}
            </span>
          )}
          {newCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] tabular-nums" style={{ color: '#b76d07' }}>
              <Star size={11} /> {newCount} new
            </span>
          )}
        </div>
      </div>
      {streak > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold shrink-0 tabular-nums" style={{ color: '#ff453a' }}>
          🔥 {streak}
        </div>
      )}
      <Link
        href="/flashcards"
        className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] text-[13px] font-semibold tracking-tight text-white transition-all duration-200 active:scale-[0.97] w-full sm:w-auto sm:shrink-0"
        style={{
          borderRadius: 12,
          background: 'var(--eureka-accent)',
          transitionTimingFunction: 'var(--ease-standard)',
        }}
      >
        Start <ArrowRight size={14} />
      </Link>
    </div>
  );
}
