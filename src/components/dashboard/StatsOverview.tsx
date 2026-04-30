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
  const solvedPct   = totalProblems  > 0 ? Math.round((totalSolved   / totalProblems)  * 100) : 0;
  const masteredPct = totalFlashcards > 0 ? Math.round((masteredCount / totalFlashcards) * 100) : 0;

  const cards = [
    {
      label: 'Problems solved',
      value: `${totalSolved}`,
      sub: `of ${totalProblems}`,
      pct: solvedPct,
      color: 'var(--eureka-accent)',
      icon: null as typeof Flame | null,
    },
    {
      label: 'Cards mastered',
      value: `${masteredCount}`,
      sub: `of ${totalFlashcards}`,
      pct: masteredPct,
      color: '#30d158',
      icon: null,
    },
    {
      label: 'Due today',
      value: `${dueCount}`,
      sub: 'flashcards',
      pct: null,
      color: dueCount > 0 ? '#ff9f0a' : '#86868b',
      icon: null,
    },
    {
      label: 'Day streak',
      value: `${streak}`,
      sub: 'days',
      pct: null,
      color: streak > 0 ? '#ff453a' : '#86868b',
      icon: streak > 0 ? Flame : null,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map(({ label, value, sub, pct, color, icon: Icon }) => (
        <div
          key={label}
          className="p-3 sm:p-4"
          style={{
            background: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.06)',
            borderRadius: 16,
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b] mb-2">
            {label}
          </p>
          <div className="flex items-end gap-1.5 flex-wrap">
            {Icon && <Icon size={18} style={{ color }} className="mb-0.5 shrink-0" />}
            <span
              className="font-semibold leading-none tabular-nums tracking-[-0.02em]"
              style={{ color, fontSize: 'clamp(22px, 6vw, 28px)' }}
            >
              {value}
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#86868b] mb-1 tabular-nums">{sub}</span>
          </div>
          {pct !== null && (
            <div className="mt-3">
              <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: color,
                    transition: 'width 700ms var(--ease-standard)',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
