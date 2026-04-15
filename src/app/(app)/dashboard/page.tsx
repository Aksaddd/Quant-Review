'use client';

import { useMemo } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { allFlashcards } from '@/data/flashcards';
import { chapter2Problems } from '@/data/problems';
import StatsOverview from '@/components/dashboard/StatsOverview';
import DueCardsBanner from '@/components/dashboard/DueCardsBanner';
import SectionGrid from '@/components/dashboard/SectionGrid';
import ChapterList from '@/components/dashboard/ChapterList';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import FlashcardGradeHistory from '@/components/dashboard/FlashcardGradeHistory';

export default function DashboardPage() {
  const { totalSolved, totalProblems, masteredCount, reviewDue, newCardsQueue, sectionStats, getProblemStatus, problemProgress } = useProgress();
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#21242c]">
          Quantitative Finance
        </h1>
        <p className="text-sm text-[#626975] mt-0.5">
          A Practical Guide to Quantitative Finance Interviews · Chapter 2
        </p>
      </div>

      {/* Due cards / streak banner */}
      <DueCardsBanner dueCount={reviewDue.length} newCount={newCardsQueue.length} streak={streak} />

      {/* Quick actions */}
      <QuickActions />

      {/* Stats */}
      <StatsOverview
        totalSolved={totalSolved}
        totalProblems={totalProblems}
        masteredCount={masteredCount}
        totalFlashcards={allFlashcards.length}
        dueCount={reviewDue.length}
        streak={streak}
      />

      {/* Course units */}
      <SectionGrid sections={sectionStats} />

      {/* Textbook reference chapters 3–7 */}
      <ChapterList />

      {/* Recent activity */}
      {recentItems.length > 0 && <RecentActivity items={recentItems} />}

      {/* Flashcard rating history */}
      <FlashcardGradeHistory />
    </div>
  );
}
