import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-10-infinite-sequence',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'medium',
  tags: ['algebra', 'fixed-point', 'sequences'],
  problemId: 'ch2-10-infinite-sequence',

  front: `**Infinite Sequence**

$$x^{x^{x^{x^{\\cdots}}}} = 2$$

**What is x?**`,

  back: `**Key insight:** An infinite tower is self-similar — removing one level leaves the same infinite tower.

The exponent on the first x **is the entire tower**, which equals 2:

$$x^2 = 2 \\implies x = \\sqrt{2}$$

**Convergence check:** The tower $x^{x^{x^{\\cdots}}}$ converges for $1 < x \\leq e^{1/e} \\approx 1.4447$.

Since $\\sqrt{2} \\approx 1.414 < e^{1/e}$, it converges. ✓

**Answer: $x = \\sqrt{2}$**`,
};

export default fc;
