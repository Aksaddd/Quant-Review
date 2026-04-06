import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-15-last-ball',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'medium',
  tags: ['parity', 'invariants'],
  problemId: 'ch2-15-last-ball',

  front: `**Last Ball**

Bag: 20 blue, 14 red. Each turn: remove 2 balls, replace with 1 (same color → 1 blue; different → 1 red).

1. What color is the last ball?
2. What if it's 20 blue + 13 red?`,

  back: `**Key insight:** Count of red balls is a **parity invariant**.

- Both blue removed → R unchanged
- Both red removed → R decreases by **2**
- One of each → R unchanged

**Red parity never changes.**

| Start | Red parity | Last ball |
|-------|-----------|-----------|
| 14 red (even) | Stays even → can't end at 1 (odd) | **Blue** |
| 13 red (odd) | Stays odd → can end at 1 | **Red** |

`,
};

export default fc;
