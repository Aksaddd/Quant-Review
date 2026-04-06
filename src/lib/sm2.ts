// ─────────────────────────────────────────────
// SM-2 Spaced Repetition Algorithm
// Based on the SuperMemo SM-2 algorithm (1987)
// ─────────────────────────────────────────────
import { SM2Card, CardState, ReviewGrade, GRADE_QUALITY } from './types';
import { addDays, formatISO, parseISO } from 'date-fns';

const MIN_EF      = 1.3;
const DEFAULT_EF  = 2.5;
const NEW_SENTINEL = '9999-12-31'; // new cards: never auto-due

function todayISO(): string {
  return formatISO(new Date(), { representation: 'date' });
}

/** Resolve state for cards that predate the state field (backwards compat). */
export function resolveState(card: SM2Card): CardState {
  if (card.state) return card.state;
  return card.repetitions > 0 ? 'review' : 'new';
}

/** Create a fresh SM-2 card. New cards start outside the SRS queue. */
export function createSM2Card(cardId: string): SM2Card {
  return {
    cardId,
    state:         'new',
    repetitions:   0,
    interval:      0,
    easinessFactor: DEFAULT_EF,
    nextReview:    NEW_SENTINEL,
  };
}

/**
 * Apply a review grade to an SM-2 card and return the updated record.
 * - First-time review: card graduates from 'new' → 'review'.
 * - Subsequent reviews: normal SM-2 interval progression.
 * Does NOT mutate the input object.
 */
export function applySM2(card: SM2Card, grade: ReviewGrade): SM2Card {
  const q     = GRADE_QUALITY[grade];
  const today = todayISO();
  let { repetitions, interval, easinessFactor } = card;

  if (q < 3) {
    // Failed — reset to 1 day
    repetitions = 0;
    interval    = 1;
  } else {
    // Passed — standard SM-2 intervals
    if (repetitions === 0)      interval = 1;
    else if (repetitions === 1) interval = 6;
    else                        interval = Math.round(interval * easinessFactor);
    repetitions += 1;
  }

  easinessFactor = Math.max(
    MIN_EF,
    easinessFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
  );

  const nextReview = formatISO(addDays(new Date(), interval), {
    representation: 'date',
  });

  return {
    ...card,
    state:         'review',                        // always graduate on first rating
    firstReviewed: card.firstReviewed ?? today,     // stamp once
    repetitions,
    interval,
    easinessFactor,
    nextReview,
    lastReviewed:  today,
    lastGrade:     grade,
  };
}

/** True if a review-state card is due today or overdue. */
export function isDue(card: SM2Card): boolean {
  if (resolveState(card) !== 'review') return false;
  return card.nextReview <= todayISO();
}

/** All review-state cards due today, oldest first. */
export function getReviewDue(cards: SM2Card[]): SM2Card[] {
  return cards
    .filter(isDue)
    .sort((a, b) => a.nextReview.localeCompare(b.nextReview));
}

/** All cards still in 'new' state (never introduced). */
export function getNewCards(cards: SM2Card[]): SM2Card[] {
  return cards.filter((c) => resolveState(c) === 'new');
}

/** True if a card is considered "mastered" (interval >= 21 days). */
export function isMastered(card: SM2Card): boolean {
  return resolveState(card) === 'review' && card.interval >= 21;
}

/** Sort cards: due first, then by next review date asc. */
export function sortByDue(cards: SM2Card[]): SM2Card[] {
  return [...cards].sort((a, b) =>
    parseISO(a.nextReview).getTime() - parseISO(b.nextReview).getTime()
  );
}

/** @deprecated use getReviewDue — kept for any call sites not yet updated */
export function getDueCards(cards: SM2Card[]): SM2Card[] {
  return getReviewDue(cards);
}
