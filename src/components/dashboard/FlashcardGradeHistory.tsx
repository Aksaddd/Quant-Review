'use client';

import Link from 'next/link';
import { Brain } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { flashcardsById } from '@/data/flashcards';
import { problemsById } from '@/data/problems';
import type { ReviewGrade } from '@/lib/types';

const GRADE_META: Record<ReviewGrade, { label: string; color: string; bg: string; border: string }> = {
  blackout: { label: 'Blackout', color: '#d92916', bg: '#fce8e6', border: '#f5c6c0' },
  again:    { label: 'Wrong',    color: '#e8591a', bg: '#fef0e7', border: '#fbc8a0' },
  hard:     { label: 'Hard',     color: '#f5a623', bg: '#fef9e7', border: '#fdd8a0' },
  good:     { label: 'Good',     color: '#1865f2', bg: '#e8f0fe', border: '#a8c4f8' },
  easy:     { label: 'Easy',     color: '#1fab54', bg: '#e6f4ea', border: '#a8d5b5' },
};

export default function FlashcardGradeHistory() {
  const { sm2Cards } = useProgress();

  // All cards that have been reviewed at least once, sorted by most recently reviewed
  const reviewed = Object.values(sm2Cards)
    .filter((c) => c.lastReviewed && c.lastGrade)
    .sort((a, b) => (b.lastReviewed ?? '').localeCompare(a.lastReviewed ?? ''));

  if (reviewed.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#21242c]">Flashcard Ratings</h2>
        <Link
          href="/flashcards"
          className="text-sm font-semibold text-[var(--ka-blue)] hover:underline flex items-center gap-1"
        >
          Review cards
        </Link>
      </div>

      <div className="space-y-1.5">
        {reviewed.map((sm2) => {
          const card = flashcardsById[sm2.cardId];
          if (!card) return null;

          const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
          const title = problem
            ? problem.title
            : card.front.replace(/\*\*/g, '').split('\n')[0].slice(0, 60);

          const grade = sm2.lastGrade!;
          const meta = GRADE_META[grade];

          return (
            <div
              key={sm2.cardId}
              className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#e4e6ea] rounded-lg"
            >
              {/* Grade badge */}
              <span
                className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.border }}
              >
                {meta.label}
              </span>

              {/* Card title */}
              <p className="flex-1 text-sm text-[#21242c] truncate">{title}</p>

              {/* Section */}
              <span className="text-[10px] font-mono text-[#9299a5] shrink-0">§{card.section}</span>
            </div>
          );
        })}
      </div>

      {reviewed.length === 0 && (
        <div className="text-center py-10 bg-white border border-[#e4e6ea] rounded-lg">
          <Brain size={24} className="text-[#9299a5] mx-auto mb-2" />
          <p className="text-sm text-[#626975]">No cards reviewed yet.</p>
        </div>
      )}
    </div>
  );
}
