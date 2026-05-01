// Loads interactive JSON documents at build time via static import.
// resolveJsonModule + isolatedModules in tsconfig means the JSON is typed as
// `any` on import; we cast through unknown to the discriminated union.

import type {
  InteractiveDoc, ProblemWalkthrough, ReadingSection, Technique,
} from '@/types/interactive';

import ch1P1        from '../../../content/interactive/ch01/ch1-p1-broad-knowledge.json';
import ch2Pirates   from '../../../content/interactive/ch02/ch2-01-screwy-pirates.json';
import ch2TigerSheep from '../../../content/interactive/ch02/ch2-02-tiger-and-sheep.json';
import techBackInd  from '../../../content/interactive/techniques/backward-induction.json';

const REGISTRY: Record<string, InteractiveDoc> = {
  'ch1-p1-broad-knowledge':  ch1P1         as unknown as ReadingSection,
  'ch2-01-screwy-pirates':   ch2Pirates    as unknown as ProblemWalkthrough,
  'ch2-02-tiger-and-sheep':  ch2TigerSheep as unknown as ProblemWalkthrough,
  'backward-induction':      techBackInd   as unknown as Technique,
};

export function getInteractiveDoc(id: string): InteractiveDoc | null {
  return REGISTRY[id] ?? null;
}

export function listInteractiveDocs(): InteractiveDoc[] {
  return Object.values(REGISTRY);
}

/** Reading sections and problem walkthroughs only — used by /interactive routes. */
export function listInteractiveContent(): (ReadingSection | ProblemWalkthrough)[] {
  return Object.values(REGISTRY).filter(
    (d): d is ReadingSection | ProblemWalkthrough => d.kind !== 'technique',
  );
}

export function listInteractiveDocsByChapter(chapter: number): InteractiveDoc[] {
  return Object.values(REGISTRY).filter(
    (d): d is ReadingSection | ProblemWalkthrough => d.kind !== 'technique' && d.chapter === chapter,
  );
}

export function listTechniques(): Technique[] {
  return Object.values(REGISTRY).filter(
    (d): d is Technique => d.kind === 'technique',
  );
}

export function getTechnique(id: string): Technique | null {
  const doc = REGISTRY[id];
  return doc && doc.kind === 'technique' ? doc : null;
}
