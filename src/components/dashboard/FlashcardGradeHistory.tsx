'use client';

import Link from 'next/link';
import { Brain } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { flashcardsById } from '@/data/flashcards';
import { problemsById } from '@/data/problems';
import type { ReviewGrade } from '@/lib/types';

const GRADE_META: Record<ReviewGrade, { label: string; color: string; bg: string }> = {
  blackout: { label: 'Blackout', color: '#ff453a', bg: 'rgba(255,69,58,0.12)' },
  again:    { label: 'Wrong',    color: '#ff6a37', bg: 'rgba(255,106,55,0.12)' },
  hard:     { label: 'Hard',     color: '#b76d07', bg: 'rgba(255,159,10,0.14)' },
  good:     { label: 'Good',     color: 'var(--eureka-accent)', bg: 'var(--eureka-accent-tint)' },
  easy:     { label: 'Easy',     color: '#1f9b46', bg: 'rgba(48,209,88,0.14)' },
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
        <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Flashcard Ratings</h2>
        <Link
          href="/flashcards"
          className="text-[13px] font-semibold hover:underline flex items-center gap-1"
          style={{ color: 'var(--eureka-accent)' }}
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
              className="flex items-center gap-3 px-4 py-2.5"
              style={{
                background: '#ffffff',
                border: '0.5px solid rgba(0,0,0,0.06)',
                borderRadius: 12,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
            >
              {/* Grade badge — tint only, no border */}
              <span
                className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md tracking-tight"
                style={{ color: meta.color, background: meta.bg }}
              >
                {meta.label}
              </span>

              <p className="flex-1 text-[13px] text-[#1d1d1f] truncate tracking-tight">{title}</p>

              <span className="text-[10px] font-mono text-[#86868b] shrink-0 tabular-nums">{card.section}</span>
            </div>
          );
        })}
      </div>

      {reviewed.length === 0 && (
        <div
          className="text-center py-10"
          style={{
            background: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.06)',
            borderRadius: 16,
          }}
        >
          <Brain size={24} className="text-[#86868b] mx-auto mb-2" />
          <p className="text-[13px] text-[#6e6e73]">No cards reviewed yet.</p>
        </div>
      )}
    </div>
  );
}
