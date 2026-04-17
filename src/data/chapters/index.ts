import type { Chapter, Problem } from '@/lib/types';
import { withChoices } from '@/data/choices';

import rawChapter3 from './chapter3';
import rawChapter4 from './chapter4';
import rawChapter5 from './chapter5';
import rawChapter6 from './chapter6';
import rawChapter7 from './chapter7';

/** Returns a copy of `chapter` whose problem blocks have choices attached. */
function attachChoices(chapter: Chapter): Chapter {
  return {
    ...chapter,
    sections: chapter.sections.map((sec) => ({
      ...sec,
      blocks: sec.blocks.map((b) =>
        b.kind === 'problem'
          ? { ...b, problem: withChoices(b.problem) }
          : b
      ),
    })),
  };
}

const chapter3 = attachChoices(rawChapter3);
const chapter4 = attachChoices(rawChapter4);
const chapter5 = attachChoices(rawChapter5);
const chapter6 = attachChoices(rawChapter6);
const chapter7 = attachChoices(rawChapter7);

/** Textbook-style chapters 3–7 (chapters 1–2 have their own dedicated data). */
export const textbookChapters: Chapter[] = [chapter3, chapter4, chapter5, chapter6, chapter7];

/** O(1) lookup by chapter id (e.g. "chapter-3"). */
export const chaptersById: Record<string, Chapter> = Object.fromEntries(
  textbookChapters.map((c) => [c.id, c])
);

/** O(1) lookup by chapter number. */
export const chaptersByNumber: Record<number, Chapter> = Object.fromEntries(
  textbookChapters.map((c) => [c.number, c])
);

/** Flatten every structured worked problem across chapters 3–7. */
export const textbookProblems: Problem[] = textbookChapters.flatMap((chap) =>
  chap.sections.flatMap((sec) =>
    sec.blocks.filter((b) => b.kind === 'problem').map((b: any) => b.problem as Problem)
  )
);

/** Problems grouped by chapter number. */
export const problemsByChapter: Record<number, Problem[]> = textbookChapters.reduce(
  (acc, chap) => {
    acc[chap.number] = chap.sections.flatMap((sec) =>
      sec.blocks.filter((b) => b.kind === 'problem').map((b: any) => b.problem as Problem)
    );
    return acc;
  },
  {} as Record<number, Problem[]>
);

export { chapter3, chapter4, chapter5, chapter6, chapter7 };
