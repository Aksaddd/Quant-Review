// ─────────────────────────────────────────────
// SM-2 Spaced Repetition Algorithm
// Based on the SuperMemo SM-2 algorithm (1987)
// ─────────────────────────────────────────────
import { SM2Card, ReviewGrade, GRADE_QUALITY } from './types';
import { addDays, formatISO, parseISO } from 'date-fns';

const MIN_EF = 1.3;
const DEFAULT_EF = 2.5;

/** Create a fresh SM-2 card record for a given flashcard ID. */
export function createSM2Card(cardId: string): SM2Card {
  return {
    cardId,
    repetitions: 0,
    interval: 0,
    easinessFactor: DEFAULT_EF,
    nextReview: formatISO(new Date(), { representation: 'date' }),
  };
}

/**
 * Apply a review grade to an SM-2 card and return the updated record.
 * Does NOT mutate the input object.
 */
export function applySM2(card: SM2Card, grade: ReviewGrade): SM2Card {
  const q = GRADE_QUALITY[grade];
  let { repetitions, interval, easinessFactor } = card;

  if (q < 3) {
    // Failed — reset progress
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easinessFactor);
    }
    repetitions += 1;
  }

  // Update easiness factor
  easinessFactor = Math.max(
    MIN_EF,
    easinessFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
  );

  const nextReview = formatISO(addDays(new Date(), interval), {
    representation: 'date',
  });

  return {
    ...card,
    repetitions,
    interval,
    easinessFactor,
    nextReview,
    lastReviewed: formatISO(new Date(), { representation: 'date' }),
    lastGrade: grade,
  };
}

/** Returns true if a card is due for review today or earlier. */
export function isDue(card: SM2Card): boolean {
  const today = formatISO(new Date(), { representation: 'date' });
  return card.nextReview <= today;
}

/** Returns true if a card is considered "mastered" (interval >= 21 days). */
export function isMastered(card: SM2Card): boolean {
  return card.interval >= 21;
}

/** Sort cards: due first, then by next review date asc. */
export function sortByDue(cards: SM2Card[]): SM2Card[] {
  return [...cards].sort((a, b) => {
    const aDate = parseISO(a.nextReview).getTime();
    const bDate = parseISO(b.nextReview).getTime();
    return aDate - bDate;
  });
}

/** Get cards due today from a collection. */
export function getDueCards(cards: SM2Card[]): SM2Card[] {
  return cards.filter(isDue);
}
