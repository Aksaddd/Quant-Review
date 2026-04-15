import type { Chapter } from '@/lib/types';

import chapter3 from './chapter3';
import chapter4 from './chapter4';
import chapter5 from './chapter5';
import chapter6 from './chapter6';
import chapter7 from './chapter7';

/** Textbook-style chapters 3–7 (chapters 1–2 have their own dedicated data) */
export const textbookChapters: Chapter[] = [chapter3, chapter4, chapter5, chapter6, chapter7];

/** O(1) lookup by chapter id (e.g. "chapter-3") */
export const chaptersById: Record<string, Chapter> = Object.fromEntries(
  textbookChapters.map((c) => [c.id, c])
);

/** O(1) lookup by chapter number */
export const chaptersByNumber: Record<number, Chapter> = Object.fromEntries(
  textbookChapters.map((c) => [c.number, c])
);

export { chapter3, chapter4, chapter5, chapter6, chapter7 };
