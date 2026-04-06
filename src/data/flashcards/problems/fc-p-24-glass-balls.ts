import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-24-glass-balls',
  type: 'problem',
  chapter: 2,
  section: '2.5',
  difficulty: 'hard',
  tags: ['optimization', 'worst-case', 'summation'],
  problemId: 'ch2-24-glass-balls',

  front: `**Glass Balls**

2 glass balls, 100-story building. Ball breaks at floor X or above, survives below. Minimize worst-case drops to find X.

**What is the minimum number of drops?**`,

  back: `**Strategy:** Drop ball 1 at decreasing intervals: N, N+(N−1), N+(N−1)+(N−2), …

If ball 1 breaks after k drops, ball 2 has at most N−k remaining drops to scan linearly.

**Coverage:** N + (N−1) + … + 1 = N(N+1)/2 floors must ≥ 100.

$$N(N+1)/2 \\geq 100 \\implies N = 14 \\quad (14 \\times 15/2 = 105)$$

**Start ball 1 at:** floor 14 → 27 → 39 → 50 → 60 → 69 → …

**Answer: 14 drops minimum.**`,
};

export default fc;
