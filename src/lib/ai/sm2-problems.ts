// ─────────────────────────────────────────────
// SM-2 Extended to Problems
// AI/ML Engineer · Phase 1 Foundation
//
// THE single most evidence-backed intervention:
// "3 retrieval sessions immunize against forgetting" (Make It Stick)
//
// A "solved" problem now resurfaces on an expanding schedule:
// 1 day → 6 days → 3 weeks → 2 months → ...
// If the student fails on re-attempt, the interval resets.
// ─────────────────────────────────────────────

import { addDays, formatISO } from 'date-fns';
import type { ProblemSM2Card, ProblemSM2State, ReviewGradeAI } from './types';
import { GRADE_QUALITY_MAP } from './types';

const MIN_EF      = 1.3;
const DEFAULT_EF  = 2.5;
const MASTERY_THRESHOLD_DAYS = 21;  // interval >= 21 days = mastered
const NEW_SENTINEL = '9999-12-31';

function todayISO(): string {
  return formatISO(new Date(), { representation: 'date' });
}

// ── Card Lifecycle ──────────────────────────────

/**
 * Create a fresh SM-2 state for a problem.
 * Starts as 'new' — outside the SRS queue until first attempt.
 */
export function createProblemSM2(problemId: string): ProblemSM2Card {
  return {
    problemId,
    state:          'new',
    repetitions:    0,
    intervalDays:   0,
    easinessFactor: DEFAULT_EF,
    dueDate:        NEW_SENTINEL,
    totalReviews:   0,
  };
}

/**
 * Apply a review grade to a problem's SM-2 state.
 *
 * Grade mapping:
 * - blackout (0): Complete blank — couldn't start
 * - again (1):    Wrong approach, recognized solution after reveal
 * - hard (2):     Got it but needed significant hints
 * - good (4):     Solved with some thought
 * - easy (5):     Instant, confident solution
 *
 * Returns a NEW card object (immutable).
 */
export function applyProblemSM2(
  card: ProblemSM2Card,
  grade: ReviewGradeAI,
  timeSpentSeconds?: number
): ProblemSM2Card {
  const q     = GRADE_QUALITY_MAP[grade];
  const today = todayISO();
  let { repetitions, intervalDays, easinessFactor } = card;

  if (q < 3) {
    // Failed — reset to short interval
    repetitions  = 0;
    intervalDays = 1;
  } else {
    // Passed — standard SM-2 progression
    if (repetitions === 0)      intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else                        intervalDays = Math.round(intervalDays * easinessFactor);
    repetitions += 1;
  }

  // Update easiness factor (SM-2 formula)
  easinessFactor = Math.max(
    MIN_EF,
    easinessFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
  );

  // Time-based adjustment: if solved very quickly on review, boost interval
  // (indicates strong recall — desirable difficulty principle)
  if (timeSpentSeconds !== undefined && q >= 3 && repetitions > 1) {
    if (timeSpentSeconds < 60) {
      // Solved in under a minute on review — strong recall
      intervalDays = Math.round(intervalDays * 1.1);
    } else if (timeSpentSeconds > 600) {
      // Took over 10 minutes — borderline recall, slightly compress interval
      intervalDays = Math.max(1, Math.round(intervalDays * 0.9));
    }
  }

  const dueDate = formatISO(addDays(new Date(), intervalDays), {
    representation: 'date',
  });

  // Determine state
  let state: ProblemSM2State = 'review';
  if (intervalDays >= MASTERY_THRESHOLD_DAYS && q >= 4) {
    state = 'mastered';
  }

  return {
    ...card,
    state,
    repetitions,
    intervalDays,
    easinessFactor,
    dueDate,
    lastReviewed:  today,
    firstReviewed: card.firstReviewed ?? today,
    lastGrade:     grade,
    totalReviews:  card.totalReviews + 1,
  };
}

// ── Query Helpers ───────────────────────────────

/** True if a problem is due for review today or overdue. */
export function isProblemDue(card: ProblemSM2Card): boolean {
  if (card.state === 'new') return false;
  return card.dueDate <= todayISO();
}

/** Get all problems due for review, oldest first. */
export function getProblemsDue(cards: ProblemSM2Card[]): ProblemSM2Card[] {
  return cards
    .filter(isProblemDue)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/** Get problems in 'new' state (never attempted). */
export function getNewProblems(cards: ProblemSM2Card[]): ProblemSM2Card[] {
  return cards.filter((c) => c.state === 'new');
}

/** Get problems marked as mastered (interval >= 21 days, grade >= good). */
export function getMasteredProblems(cards: ProblemSM2Card[]): ProblemSM2Card[] {
  return cards.filter((c) => c.state === 'mastered');
}

/**
 * Compute review statistics for a set of problem SM-2 cards.
 */
export function getProblemSM2Stats(cards: ProblemSM2Card[]): {
  total: number;
  new: number;
  review: number;
  mastered: number;
  dueToday: number;
  averageInterval: number;
  retrievalSessions: number;  // total reviews across all cards
} {
  const dueToday = getProblemsDue(cards).length;
  const stats = {
    total:    cards.length,
    new:      0,
    review:   0,
    mastered: 0,
    dueToday,
    averageInterval: 0,
    retrievalSessions: 0,
  };

  let intervalSum = 0;
  let intervalCount = 0;

  for (const card of cards) {
    switch (card.state) {
      case 'new':      stats.new++;      break;
      case 'review':   stats.review++;   break;
      case 'mastered': stats.mastered++; break;
    }
    stats.retrievalSessions += card.totalReviews;
    if (card.state !== 'new') {
      intervalSum += card.intervalDays;
      intervalCount++;
    }
  }

  stats.averageInterval = intervalCount > 0
    ? Math.round(intervalSum / intervalCount)
    : 0;

  return stats;
}

/**
 * Prioritize problems for a study session.
 * Order: overdue reviews → due reviews → new problems.
 * Within each group, prioritize lower easiness factor (harder for the student).
 */
export function prioritizeProblems(
  cards: ProblemSM2Card[],
  maxCount: number = 10
): ProblemSM2Card[] {
  const today = todayISO();

  const overdue = cards
    .filter((c) => c.state !== 'new' && c.dueDate < today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const due = cards
    .filter((c) => c.state !== 'new' && c.dueDate === today)
    .sort((a, b) => a.easinessFactor - b.easinessFactor);

  const newCards = cards
    .filter((c) => c.state === 'new')
    .sort(() => Math.random() - 0.5); // shuffle new cards

  return [...overdue, ...due, ...newCards].slice(0, maxCount);
}

export { MASTERY_THRESHOLD_DAYS };
