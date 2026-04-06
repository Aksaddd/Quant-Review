import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-03-river-crossing',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'easy',
  tags: ['logic', 'optimization'],
  problemId: 'ch2-03-river-crossing',

  front: `**River Crossing**

A (10 min), B (5 min), C (2 min), D (1 min) must cross a bridge. Max 2 at a time, one torch, pairs move at slower person's speed.

**Minimum time to get all across?**`,

  back: `**Key insight:** Pair the two slowest together; use the two fastest to shuttle the torch.

| Step | Crossing | Time | Total |
|------|----------|------|-------|
| 1 | C + D → | 2 | 2 |
| 2 | D ← | 1 | 3 |
| 3 | A + B → | 10 | 13 |
| 4 | C ← | 2 | 15 |
| 5 | C + D → | 2 | **17** |

**Answer: 17 minutes.**`,
};

export default fc;
