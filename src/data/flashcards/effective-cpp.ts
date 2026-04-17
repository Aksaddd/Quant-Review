import type { Flashcard, Difficulty } from '@/lib/types';
import flashcardsJson from '../../../content/Effective_C++/metadata/flashcards.json';

interface RawCppFlashcard {
  id: string;
  item: number;
  chapter: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  front: string;
  back: string;
}

const DIFFICULTY_MAP: Record<RawCppFlashcard['difficulty'], Difficulty> = {
  beginner: 'easy',
  intermediate: 'medium',
  advanced: 'hard',
};

/**
 * Effective C++ flashcards are derived from each Item's "Things to Remember"
 * bullets. We namespace their section as `ecpp-chN` so they don't collide
 * with the Quantitative Finance book's section ids.
 */
export const effectiveCppFlashcards: Flashcard[] = (flashcardsJson as RawCppFlashcard[]).map(
  (raw) => ({
    id: raw.id,
    type: 'principle',
    chapter: 10 + raw.chapter,
    section: `ecpp-ch${raw.chapter}`,
    difficulty: DIFFICULTY_MAP[raw.difficulty],
    tags: ['effective-cpp', `ecpp-item-${raw.item}`],
    front: raw.front,
    back: raw.back,
  }),
);
