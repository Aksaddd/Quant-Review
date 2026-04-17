import type { Flashcard, Difficulty } from '@/lib/types';
import flashcardsJson from '../../../content/competitive_programmers_handbook/metadata/flashcards.json';

interface RawCphFlashcard {
  id: string;
  chapter: number;
  part: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  front: string;
  back: string;
}

const DIFFICULTY_MAP: Record<RawCphFlashcard['difficulty'], Difficulty> = {
  beginner: 'easy',
  intermediate: 'medium',
  advanced: 'hard',
};

/**
 * Competitive Programmer's Handbook flashcards are auto-generated from each
 * chapter's `**bold term** is/are …` definition sentences. Section ids are
 * namespaced `cph-chN` so they don't collide with the other books.
 */
export const cpHandbookFlashcards: Flashcard[] = (flashcardsJson as RawCphFlashcard[]).map(
  (raw) => ({
    id: raw.id,
    type: 'concept',
    chapter: 20 + raw.chapter,
    section: `cph-ch${raw.chapter}`,
    difficulty: DIFFICULTY_MAP[raw.difficulty],
    tags: ['cp-handbook', `cph-chapter-${raw.chapter}`],
    front: raw.front,
    back: raw.back,
  }),
);
