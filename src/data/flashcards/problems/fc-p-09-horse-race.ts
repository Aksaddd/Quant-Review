import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-09-horse-race',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'medium',
  tags: ['logic', 'optimization', 'elimination'],
  problemId: 'ch2-09-horse-race',

  front: `**Horse Race**

25 horses, unique speeds, 5 lanes (no stopwatch). Find the **3 fastest** horses.

**Minimum races needed?**`,

  back: `**3-round strategy:**

**Round 1 (5 races):** Race 5 groups of 5 → identify each group's winner.

**Round 2 (1 race):** Race the 5 group winners. Label result: 1st > 2nd > 3rd > 4th > 5th.
- Eliminate: groups 4 and 5 entirely (too slow)
- Horse 1 = **fastest overall**
- Candidates for 2nd/3rd: horses **2, 3** (from group 1), **6, 7** (from group 2), **11** (from group 3)

**Round 3 (1 race):** Race those 5 candidates. Top 2 = 2nd and 3rd fastest.

**Answer: 7 races minimum.**`,
};

export default fc;
