import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-04-symmetry',
  type: 'concept',
  chapter: 2,
  section: '2.4',
  difficulty: 'medium',
  tags: ['technique', 'strategy', 'symmetry'],

  front: `**Technique: Application of Symmetry**

How does symmetry help solve problems? Describe the technique and its key applications.`,

  back: `**Core idea:** Design a solution that works for ALL values of an unknown variable by exploiting symmetric structure — the answer becomes independent of what you don't know.

**Three forms of symmetry:**

1. **Algebraic symmetry** — construct an expression that simplifies regardless of the unknown variable m (Coin Piles: both piles = 20−m heads for any m)

2. **Constraint symmetry** — use the constraint itself (all bags mislabeled) to force the solution (Mislabeled Bags: only 1 pick needed)

3. **Designated role assignment** — break symmetry intentionally by assigning one actor a unique role to track global state on behalf of all others (Wise Men: spokesman counts 49 flips)

**Key insight:** If a problem has n symmetric actors, making one asymmetric (a counter, a spokesman) often unlocks the solution.`,
};

export default fc;
