import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-02-triangular-numbers',
  type: 'formula',
  chapter: 2,
  section: '2.5',
  difficulty: 'easy',
  tags: ['formula', 'summation', 'optimization'],

  front: `**Triangular Numbers & Glass Balls Formula**

What is the nth triangular number? How is it used in the two-glass-ball problem?`,

  back: `**Triangular number:**
$$T(n) = 1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$$

**Glass Balls application:**

With N max drops, ball 1 jumps N, then N−1, then N−2, … covering:
$$T(N) = \\frac{N(N+1)}{2} \\text{ floors}$$

To cover 100 floors: $T(N) \\geq 100$

| N | T(N) |
|---|------|
| 13 | 91 ✗ |
| **14** | **105 ✓** |

**Answer: N = 14.** Start at floor 14, then 27 (14+13), 39 (27+12), 50, 60, ...

**Also used in:** Coin Split Problem: f(n) = n(n−1)/2 = T(n−1)`,
};

export default fc;
