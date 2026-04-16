// ─────────────────────────────────────────────
// useProblemSR — Problem Spaced Repetition Hook
// AI/ML Engineer · Phase 1 Foundation
//
// Manages SM-2 state for problems (not flashcards).
// Problems now resurface on expanding schedules.
// ─────────────────────────────────────────────

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ProblemSM2Card, ReviewGradeAI } from '@/lib/ai/types';
import {
  createProblemSM2,
  applyProblemSM2,
  getProblemsDue,
  getNewProblems,
  getMasteredProblems,
  getProblemSM2Stats,
  prioritizeProblems,
} from '@/lib/ai/sm2-problems';

const STORAGE_KEY = 'qr:problem-sm2';

function loadCards(): Record<string, ProblemSM2Card> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCards(cards: Record<string, ProblemSM2Card>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch { /* quota */ }
}

export function useProblemSR(problemIds: string[]) {
  const [cards, setCards] = useState<Record<string, ProblemSM2Card>>({});

  // Hydrate from localStorage
  useEffect(() => {
    const stored = loadCards();
    // Ensure all problems have SM-2 state
    const updated = { ...stored };
    for (const id of problemIds) {
      if (!updated[id]) {
        updated[id] = createProblemSM2(id);
      }
    }
    setCards(updated);
  }, [problemIds]);

  /** Review a problem with a grade. */
  const reviewProblem = useCallback((
    problemId: string,
    grade: ReviewGradeAI,
    timeSpentSeconds?: number
  ) => {
    setCards((prev) => {
      const card = prev[problemId] ?? createProblemSM2(problemId);
      const updated = applyProblemSM2(card, grade, timeSpentSeconds);
      const next = { ...prev, [problemId]: updated };
      saveCards(next);
      return next;
    });
  }, []);

  /** Get the SM-2 state for a specific problem. */
  const getCard = useCallback((problemId: string): ProblemSM2Card => {
    return cards[problemId] ?? createProblemSM2(problemId);
  }, [cards]);

  // Derived data
  const allCards     = Object.values(cards);
  const due          = getProblemsDue(allCards);
  const newProblems  = getNewProblems(allCards);
  const mastered     = getMasteredProblems(allCards);
  const stats        = getProblemSM2Stats(allCards);
  const prioritized  = prioritizeProblems(allCards);

  return {
    cards,
    reviewProblem,
    getCard,
    due,
    newProblems,
    mastered,
    stats,
    prioritized,
  };
}
