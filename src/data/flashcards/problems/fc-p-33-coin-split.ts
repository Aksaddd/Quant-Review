import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-33-coin-split',
  type: 'problem',
  chapter: 2,
  section: '2.8',
  difficulty: 'medium',
  tags: ['induction', 'invariants', 'combinatorics'],
  problemId: 'ch2-33-coin-split',

  front: `**Coin Split Problem**

Split 1000 coins into two piles, record the product. Keep splitting until all piles are size 1.

**Prove the final sum of products is always the same — and find it.**`,

  back: `**Claim:** f(n) = n(n−1)/2

**Proof by strong induction:**

Splitting N coins into x and (N−x):
$$f(N) = x(N{-}x) + f(x) + f(N{-}x)$$
$$= x(N{-}x) + \\frac{x(x{-}1)}{2} + \\frac{(N{-}x)(N{-}x{-}1)}{2} = \\frac{N(N{-}1)}{2}$$

Result is **independent of x** — the split order doesn't matter. ✓

**For n = 1000:**
$$f(1000) = \\frac{1000 \\times 999}{2} = \mathbf{499{,}500}$$`,
};

export default fc;
