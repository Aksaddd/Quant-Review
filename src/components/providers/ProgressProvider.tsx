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
  loadStudySettings,
  saveStudySettings,
} from '@/lib/storage';
import {
  createSM2Card,
  applySM2,
  getReviewDue,
  getNewCards,
  isMastered,
  resolveState,
} from '@/lib/sm2';
import type {
  ProblemProgress,
  ProblemStatus,
  SM2Card,
  ReviewGrade,
} from '@/lib/types';
import { chapter2Problems, SECTIONS } from '@/data/problems';
import { allFlashcards, flashcardsById } from '@/data/flashcards';
import { textbookProblems, textbookChapters } from '@/data/chapters';

/** All problems tracked across chapters 2–7 for progress aggregation. */
const ALL_TRACKED_PROBLEMS = [...chapter2Problems, ...textbookProblems];

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

  /* Flashcard SM-2 state */
  sm2Cards: Record<string, SM2Card>;
  reviewCard: (cardId: string, grade: ReviewGrade) => void;
  markCardsDue: (cardIds: string[]) => void;

  /* Session model */
  reviewDue: SM2Card[];          // review-state cards past their date
  newCardsQueue: SM2Card[];      // new cards available for today's session
  newIntroducedToday: number;    // new cards already seen today
  newCardsPerDay: number;        // daily new-card limit
  setNewCardsPerDay: (n: number) => void;

  /** @deprecated use reviewDue */
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
  const [problemProgress, setProblemProgressState] = useState<Record<string, ProblemProgress>>({});
  const [sm2Cards, setSm2Cards] = useState<Record<string, SM2Card>>({});
  const [newCardsPerDay, setNewCardsPerDayState] = useState(10);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    setProblemProgressState(loadProblemProgress());

    const stored = loadSM2Cards();
    // Ensure every flashcard has an SM-2 record; normalise legacy cards
    const merged: Record<string, SM2Card> = {};
    allFlashcards.forEach((fc) => {
      const existing = stored[fc.id];
      if (existing) {
        // Backwards-compat: add state field if missing
        merged[fc.id] = {
          ...existing,
          state: existing.state ?? (existing.repetitions > 0 ? 'review' : 'new'),
        };
      } else {
        merged[fc.id] = createSM2Card(fc.id);
      }
    });
    setSm2Cards(merged);

    const study = loadStudySettings();
    setNewCardsPerDayState(study.newCardsPerDay);
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
      setProblemProgressState((prev) => ({ ...prev, [problemId]: updated }));
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
      const existing = sm2Cards[cardId] ?? createSM2Card(cardId);
      const updated  = applySM2(existing, grade);
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
          // Only affects review-state cards; new cards stay new until first session
          const card = resolveState(updated[id]) === 'review'
            ? { ...updated[id], nextReview: today }
            : updated[id];
          updated[id] = card;
          upsertSM2Card(card);
        }
      });
      return updated;
    });
  }, []);

  /* ── Settings ──────────────────────────────────────────────────────────── */
  const setNewCardsPerDay = useCallback((n: number) => {
    setNewCardsPerDayState(n);
    saveStudySettings({ newCardsPerDay: n });
  }, []);

  /* ── Session model ─────────────────────────────────────────────────────── */
  const today = new Date().toISOString().split('T')[0];
  const allSm2 = useMemo(() => Object.values(sm2Cards), [sm2Cards]);

  // Cards due for review (already in rotation)
  const reviewDue = useMemo(() => getReviewDue(allSm2), [allSm2]);

  // How many new cards were introduced today
  const newIntroducedToday = useMemo(
    () => allSm2.filter((c) => c.firstReviewed === today).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allSm2, today]
  );

  // New cards available for today (up to the daily limit)
  const newCardsQueue = useMemo(() => {
    const remaining = Math.max(0, newCardsPerDay - newIntroducedToday);
    return getNewCards(allSm2).slice(0, remaining);
  }, [allSm2, newCardsPerDay, newIntroducedToday]);

  /* ── Aggregates ────────────────────────────────────────────────────────── */
  const totalSolved = useMemo(
    () => Object.values(problemProgress).filter((p) => p.status === 'solved').length,
    [problemProgress]
  );

  const masteredCount = useMemo(
    () => allSm2.filter(isMastered).length,
    [allSm2]
  );

  const sectionStats = useMemo<SectionStat[]>(() => {
    return SECTIONS.map(({ id, title }) => {
      const problems = chapter2Problems.filter((p) => p.section === id);
      const cards    = allFlashcards.filter((fc) => fc.section === id);
      return {
        section:       id,
        sectionTitle:  title,
        total:         problems.length,
        solved:        problems.filter((p) => getProblemStatus(p.id) === 'solved').length,
        cardsReviewed: cards.filter((fc) => (sm2Cards[fc.id]?.repetitions ?? 0) > 0).length,
        cardsMastered: cards.filter((fc) => isMastered(sm2Cards[fc.id] ?? createSM2Card(fc.id))).length,
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
      reviewDue,
      newCardsQueue,
      newIntroducedToday,
      newCardsPerDay,
      setNewCardsPerDay,
      dueCards: reviewDue, // backwards compat
      totalSolved,
      totalProblems: ALL_TRACKED_PROBLEMS.length,
      sectionStats,
      masteredCount,
    }),
    [
      problemProgress, setProblemStatus, getProblemStatus,
      sm2Cards, reviewCard, markCardsDue,
      reviewDue, newCardsQueue, newIntroducedToday, newCardsPerDay, setNewCardsPerDay,
      totalSolved, sectionStats, masteredCount,
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
