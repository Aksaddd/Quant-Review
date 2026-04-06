'use client';

import { Flame } from 'lucide-react';

interface StatsOverviewProps {
  totalSolved: number;
  totalProblems: number;
  masteredCount: number;
  totalFlashcards: number;
  dueCount: number;
  streak: number;
}

export default function StatsOverview({
  totalSolved,
  totalProblems,
  masteredCount,
  totalFlashcards,
  dueCount,
  streak,
}: StatsOverviewProps) {
  const solvedPct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
  const masteredPct = totalFlashcards > 0 ? Math.round((masteredCount / totalFlashcards) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        {
          label: 'Problems solved',
          value: `${totalSolved}`,
          sub: `of ${totalProblems}`,
          pct: solvedPct,
          color: '#1865f2',
          bg: '#e8f0fe',
        },
        {
          label: 'Cards mastered',
          value: `${masteredCount}`,
          sub: `of ${totalFlashcards}`,
          pct: masteredPct,
          color: '#1fab54',
          bg: '#e6f4ea',
        },
        {
          label: 'Due today',
          value: `${dueCount}`,
          sub: 'flashcards',
          pct: null,
          color: dueCount > 0 ? '#f5a623' : '#9299a5',
          bg: dueCount > 0 ? '#fef9e7' : '#f7f8fa',
        },
        {
          label: 'Day streak',
          value: `${streak}`,
          sub: 'days',
          pct: null,
          color: streak > 0 ? '#e8471d' : '#9299a5',
          bg: streak > 0 ? '#fde8e4' : '#f7f8fa',
          icon: streak > 0 ? Flame : null,
        },
      ].map(({ label, value, sub, pct, color, bg, icon: Icon }) => (
        <div
          key={label}
          className="bg-white border border-[#e4e6ea] rounded-lg p-4"
        >
          <p className="text-[11px] font-semibold text-[#9299a5] uppercase tracking-wide mb-2">{label}</p>
          <div className="flex items-end gap-1.5">
            {Icon && <Icon size={18} style={{ color }} className="mb-0.5 shrink-0" />}
            <span className="text-2xl font-extrabold leading-none" style={{ color }}>{value}</span>
            <span className="text-sm text-[#9299a5] mb-0.5">{sub}</span>
          </div>
          {pct !== null && (
            <div className="mt-3">
              <div className="h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
