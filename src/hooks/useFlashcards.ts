'use client';

import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { allFlashcards, flashcardsByType, flashcardsByDifficulty } from '@/data/flashcards';
import { getDueCards, isMastered } from '@/lib/sm2';
import type { Flashcard } from '@/lib/types';

export type FlashcardFilter = {
  type?: Flashcard['type'] | 'all';
  difficulty?: Flashcard['difficulty'] | 'all';
  dueOnly?: boolean;
};

export function useFlashcards(filter: FlashcardFilter = {}) {
  const { sm2Cards, dueCards } = useProgress();

  const filtered = useMemo(() => {
    let cards = allFlashcards;

    if (filter.type && filter.type !== 'all') {
      cards = cards.filter((c) => c.type === filter.type);
    }
    if (filter.difficulty && filter.difficulty !== 'all') {
      cards = cards.filter((c) => c.difficulty === filter.difficulty);
    }
    if (filter.dueOnly) {
      const dueIds = new Set(dueCards.map((c) => c.id));
      cards = cards.filter((c) => dueIds.has(c.id));
    }

    return cards;
  }, [filter.type, filter.difficulty, filter.dueOnly, dueCards]);

  const stats = useMemo(() => ({
    total: allFlashcards.length,
    due: dueCards.length,
    mastered: Object.values(sm2Cards).filter(isMastered).length,
    byType: {
      problem:   flashcardsByType.problem.length,
      concept:   flashcardsByType.concept.length,
      formula:   flashcardsByType.formula.length,
      principle: flashcardsByType.principle.length,
    },
  }), [sm2Cards, dueCards]);

  return { cards: filtered, stats };
}
