'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  loadProblemProgress,
  upsertProblemProgress,
  loadSM2Cards,
  upsertSM2Card,
} from '@/lib/storage';
import { createSM2Card, applySM2, getDueCards, isMastered } from '@/lib/sm2';
import type {
  ProblemProgress,
  ProblemStatus,
  SM2Card,
  ReviewGrade,
} from '@/lib/types';
import { chapter2Problems, SECTIONS } from '@/data/problems';
import { allFlashcards } from '@/data/flashcards';

/* ── Types ──────────────────────────────────────────────────────────────── */
interface SectionStat {
  section: string;
  sectionTitle: string;
  total: number;
  solved: number;
  cardsReviewed: number;
  cardsMastered: number;
}

interface ProgressContextValue {
  /* Problem progress */
  problemProgress: Record<string, ProblemProgress>;
  setProblemStatus: (problemId: string, status: ProblemStatus) => void;
  getProblemStatus: (problemId: string) => ProblemStatus;

  /* Flashcard (SM-2) progress */
  sm2Cards: Record<string, SM2Card>;
  reviewCard: (cardId: string, grade: ReviewGrade) => void;
  markCardsDue: (cardIds: string[]) => void;
  dueCards: SM2Card[];

  /* Aggregates */
  totalSolved: number;
  totalProblems: number;
  sectionStats: SectionStat[];
  masteredCount: number;
}

/* ── Context ─────────────────────────────────────────────────────────────── */
export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [problemProgress, setProblemProgress] = useState<Record<string, ProblemProgress>>({});
  const [sm2Cards, setSm2Cards] = useState<Record<string, SM2Card>>({});

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    setProblemProgress(loadProblemProgress());
    const stored = loadSM2Cards();
    /* Ensure every flashcard has an SM-2 record */
    const merged: Record<string, SM2Card> = { ...stored };
    allFlashcards.forEach((fc) => {
      if (!merged[fc.id]) merged[fc.id] = createSM2Card(fc.id);
    });
    setSm2Cards(merged);
  }, []);

  /* ── Problem status ────────────────────────────────────────────────────── */
  const setProblemStatus = useCallback(
    (problemId: string, status: ProblemStatus) => {
      const updated: ProblemProgress = {
        problemId,
        status,
        lastVisited: new Date().toISOString(),
      };
      upsertProblemProgress(updated);
      setProblemProgress((prev) => ({ ...prev, [problemId]: updated }));
    },
    []
  );

  const getProblemStatus = useCallback(
    (problemId: string): ProblemStatus =>
      problemProgress[problemId]?.status ?? 'unseen',
    [problemProgress]
  );

  /* ── SM-2 review ───────────────────────────────────────────────────────── */
  const reviewCard = useCallback(
    (cardId: string, grade: ReviewGrade) => {
      const existing =
        sm2Cards[cardId] ?? createSM2Card(cardId);
      const updated = applySM2(existing, grade);
      upsertSM2Card(updated);
      setSm2Cards((prev) => ({ ...prev, [cardId]: updated }));
    },
    [sm2Cards]
  );

  /* ── Mark cards as due (override nextReview to today) ─────────────────── */
  const markCardsDue = useCallback((cardIds: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    setSm2Cards((prev) => {
      const updated = { ...prev };
      cardIds.forEach((id) => {
        if (updated[id]) {
          const card = { ...updated[id], nextReview: today };
          updated[id] = card;
          upsertSM2Card(card);
        }
      });
      return updated;
    });
  }, []);

  /* ── Derived values ────────────────────────────────────────────────────── */
  const dueCards = useMemo(
    () => getDueCards(Object.values(sm2Cards)),
    [sm2Cards]
  );

  const totalSolved = useMemo(
    () =>
      Object.values(problemProgress).filter((p) => p.status === 'solved').length,
    [problemProgress]
  );

  const masteredCount = useMemo(
    () => Object.values(sm2Cards).filter(isMastered).length,
    [sm2Cards]
  );

  const sectionStats = useMemo<SectionStat[]>(() => {
    return SECTIONS.map(({ id, title }) => {
      const problems = chapter2Problems.filter((p) => p.section === id);
      const cards    = allFlashcards.filter((fc) => fc.section === id);

      return {
        section:      id,
        sectionTitle: title,
        total:        problems.length,
        solved:       problems.filter(
          (p) => getProblemStatus(p.id) === 'solved'
        ).length,
        cardsReviewed: cards.filter(
          (fc) => (sm2Cards[fc.id]?.repetitions ?? 0) > 0
        ).length,
        cardsMastered: cards.filter((fc) =>
          isMastered(sm2Cards[fc.id] ?? createSM2Card(fc.id))
        ).length,
      };
    });
  }, [problemProgress, sm2Cards, getProblemStatus]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      problemProgress,
      setProblemStatus,
      getProblemStatus,
      sm2Cards,
      reviewCard,
      markCardsDue,
      dueCards,
      totalSolved,
      totalProblems: chapter2Problems.length,
      sectionStats,
      masteredCount,
    }),
    [
      problemProgress,
      setProblemStatus,
      getProblemStatus,
      sm2Cards,
      reviewCard,
      markCardsDue,
      dueCards,
      totalSolved,
      sectionStats,
      masteredCount,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
