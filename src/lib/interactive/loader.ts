// Loads interactive JSON documents at build time via static import.
// resolveJsonModule + isolatedModules in tsconfig means the JSON is typed as
// `any` on import; we cast through unknown to the discriminated union.

import type { InteractiveDoc, ProblemWalkthrough, ReadingSection } from '@/types/interactive';

import ch1P1 from '../../../content/interactive/ch01/ch1-p1-broad-knowledge.json';
import ch2Pirates from '../../../content/interactive/ch02/ch2-01-screwy-pirates.json';

const REGISTRY: Record<string, InteractiveDoc> = {
  'ch1-p1-broad-knowledge': ch1P1 as unknown as ReadingSection,
  'ch2-01-screwy-pirates':  ch2Pirates as unknown as ProblemWalkthrough,
};

export function getInteractiveDoc(id: string): InteractiveDoc | null {
  return REGISTRY[id] ?? null;
}

export function listInteractiveDocs(): InteractiveDoc[] {
  return Object.values(REGISTRY);
}

export function listInteractiveDocsByChapter(chapter: number): InteractiveDoc[] {
  return Object.values(REGISTRY).filter((d) => d.chapter === chapter);
}
