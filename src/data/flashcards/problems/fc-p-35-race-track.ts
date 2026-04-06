import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-35-race-track',
  type: 'problem',
  chapter: 2,
  section: '2.8',
  difficulty: 'hard',
  tags: ['induction', 'proof', 'greedy'],
  problemId: 'ch2-35-race-track',

  front: `**Race Track**

Circular one-way track. N gas cans placed randomly. Total gas = exactly enough for one full circle. Car starts empty.

**Prove there always exists a starting position to complete the full circle.**`,

  back: `**Proof by induction (merge argument):**

**Base:** n=1 or n=2 — trivially true.

**Step:** Given n+1 cans, find adjacent pair (i, i+1) where can i reaches can i+1. Such a pair always exists. Merge them into one can (combine gas at position i). Now we have n cans — valid start exists by hypothesis. That start works for the original n+1. ✓

**Alternative (phantom car):** Run full circuit fully fueled. Record tank level before each refuel. The **minimum pre-refuel level** position is the valid empty-start position.`,
};

export default fc;
