'use client';

import { BookOpen, Brain, Flame, Target } from 'lucide-react';
import { ProgressRing } from '@/components/ui/Progress';

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Problems solved */}
      <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl p-4 flex items-center gap-4">
        <ProgressRing
          value={solvedPct}
          size={52}
          strokeWidth={4}
          color="var(--brand-500)"
          label={`${solvedPct}%`}
        />
        <div>
          <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">Problems</p>
          <p className="text-lg font-bold text-[var(--text-primary)] leading-none">
            {totalSolved}<span className="text-sm font-normal text-[var(--text-muted)]">/{totalProblems}</span>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">solved</p>
        </div>
      </div>

      {/* Flashcards mastered */}
      <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl p-4 flex items-center gap-4">
        <ProgressRing
          value={masteredPct}
          size={52}
          strokeWidth={4}
          color="var(--success)"
          label={`${masteredPct}%`}
        />
        <div>
          <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">Mastered</p>
          <p className="text-lg font-bold text-[var(--text-primary)] leading-none">
            {masteredCount}<span className="text-sm font-normal text-[var(--text-muted)]">/{totalFlashcards}</span>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">cards</p>
        </div>
      </div>

      {/* Due today */}
      <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl p-4 flex items-center gap-4">
        <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0
          ${dueCount > 0 ? 'bg-[var(--warning-bg)] border border-[var(--warning)]/30' : 'bg-[var(--surface-3)] border border-[var(--surface-border)]'}`}>
          <Brain size={22} className={dueCount > 0 ? 'text-[var(--warning)]' : 'text-[var(--text-muted)]'} />
        </div>
        <div>
          <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">Due Today</p>
          <p className="text-lg font-bold text-[var(--text-primary)] leading-none">{dueCount}</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">flashcards</p>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl p-4 flex items-center gap-4">
        <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0
          ${streak > 0 ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-[var(--surface-3)] border border-[var(--surface-border)]'}`}>
          <Flame size={22} className={streak > 0 ? 'text-orange-400' : 'text-[var(--text-muted)]'} />
        </div>
        <div>
          <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">Streak</p>
          <p className="text-lg font-bold text-[var(--text-primary)] leading-none">{streak}</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">days</p>
        </div>
      </div>
    </div>
  );
}
