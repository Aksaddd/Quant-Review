import type { Choice, Problem } from '@/lib/types';

import chapter2Choices from './chapter-2';
import chapter3Choices from './chapter-3';
import chapter4Choices from './chapter-4';
import chapter5Choices from './chapter-5';
import chapter6Choices from './chapter-6';
import chapter7Choices from './chapter-7';

/** All multiple-choice answers keyed by problem id. */
export const problemChoices: Record<string, Choice[]> = {
  ...chapter2Choices,
  ...chapter3Choices,
  ...chapter4Choices,
  ...chapter5Choices,
  ...chapter6Choices,
  ...chapter7Choices,
};

/** Returns a copy of `problem` with `choices` attached when available. */
export function withChoices<P extends Problem>(problem: P): P {
  const choices = problemChoices[problem.id];
  return choices ? { ...problem, choices } : problem;
}
