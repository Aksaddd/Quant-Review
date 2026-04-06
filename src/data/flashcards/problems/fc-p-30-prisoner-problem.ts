import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-30-prisoner-problem',
  type: 'problem',
  chapter: 2,
  section: '2.7',
  difficulty: 'hard',
  tags: ['modular-arithmetic', 'strategy', 'parity'],
  problemId: 'ch2-30-prisoner-problem',

  front: `**Prisoner Problem (Hat Colors)**

100 prisoners, red or blue hats. Each sees all others' hats but not their own. Called out randomly — must guess their color aloud (others hear).

**Design a strategy to maximize guaranteed survivors.**`,

  back: `**At least 99 guaranteed survivors.**

**Strategy (2 colors):**
- Prisoner 1 counts red hats he sees. If **odd** → says "red". If **even** → says "blue". (50/50 chance for him.)
- Each subsequent prisoner knows the announced parity + sees all current hats → deduces own color **with certainty**.

**Extension to k colors:** Assign values 0 to k−1. Prisoner 1 announces (i − visible_sum) mod k. Each subsequent prisoner deduces own value mod k.

**At least 99 are always saved.** Prisoner 1 is the only one at risk.`,
};

export default fc;
