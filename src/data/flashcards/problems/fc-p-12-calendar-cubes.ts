import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-12-calendar-cubes',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'medium',
  tags: ['constraint-satisfaction', 'creative'],
  problemId: 'ch2-12-calendar-cubes',

  front: `**Calendar Cubes**

Design **two dice (6 faces each)** using single digits so every day 01–31 can be displayed. Both dice must always be used.

**What digits go on each die?**`,

  back: `**Constraints:**
- Need **0** on both (for 01–09)
- Need **1** on both (for 11)
- Need **2** on both (for 22)
- 7 remaining digits (3,4,5,6,7,8,9) — only 6 face slots left

**Key insight:** 6 flipped upside down = **9**. They never appear on the same date simultaneously.

**Solution:**

| Die | Faces |
|-----|-------|
| Die 1 | 0, 1, 2, 3, 4, 5 |
| Die 2 | 0, 1, 2, **6/9**, 7, 8 |

`,
};

export default fc;
