'use client';

import { useMemo } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { allFlashcards } from '@/data/flashcards';
import { chapter2Problems } from '@/data/problems';
import { SECTIONS } from '@/data/problems';
import StatsOverview from '@/components/dashboard/StatsOverview';
import DueCardsBanner from '@/components/dashboard/DueCardsBanner';
import SectionGrid from '@/components/dashboard/SectionGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import type { SectionStats } from '@/lib/types';

export default function DashboardPage() {
  const { totalSolved, totalProblems, masteredCount, dueCards, sectionStats, problemProgress, getProblemStatus } = useProgress();
  const { streak } = useStreak();

  const recentItems = useMemo(() => {
    return chapter2Problems
      .filter((p) => {
        const s = getProblemStatus(p.id);
        return s === 'solved' || s === 'attempted';
      })
      .slice(0, 6)
      .map((p) => ({ problem: p, status: getProblemStatus(p.id) as 'solved' | 'attempted' }));
  }, [problemProgress, getProblemStatus]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Track your quant interview prep progress.</p>
      </div>

      {/* Due cards banner */}
      <DueCardsBanner dueCount={dueCards.length} />

      {/* Stats row */}
      <StatsOverview
        totalSolved={totalSolved}
        totalProblems={totalProblems}
        masteredCount={masteredCount}
        totalFlashcards={allFlashcards.length}
        dueCount={dueCards.length}
        streak={streak}
      />

      {/* Quick actions */}
      <QuickActions />

      {/* Section grid */}
      <SectionGrid sections={sectionStats} />

      {/* Recent activity */}
      <RecentActivity items={recentItems} />
    </div>
  );
}
