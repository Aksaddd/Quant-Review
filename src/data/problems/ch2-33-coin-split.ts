import { Problem } from '@/lib/types';

const coinSplit: Problem = {
  id: 'ch2-33-coin-split',
  chapter: 2,
  section: '2.8',
  sectionTitle: 'Math Induction',
  title: 'Coin Split Problem',
  difficulty: 'medium',
  keyTechnique: 'Strong induction, closed-form invariant',
  tags: ['induction', 'combinatorics', 'invariants', 'proof'],

  setup: `You have a pile of **1000 coins**. You split it into two piles, multiply the two pile sizes, and record the product. You continue splitting any pile into two, recording the product each time, until all piles have exactly **1 coin**.

**Prove that the final sum of all products is always the same, regardless of the order of splits.**

**What is that sum?**`,

  solution: `**Claim:** For a pile of n coins, the sum of all products equals **f(n) = n(n−1)/2**.

**Proof by strong induction:**

**Base cases:**
- f(1) = 0 (can't split a pile of 1 — no products)
- f(2) = 1×1 = 1 = 2×1/2 ✓
- f(3) = Split into 1+2: product 1×2 = 2, then f(1)+f(2) = 0+1 = 1, total = 3 = 3×2/2 ✓

**Inductive step:** Assume f(k) = k(k−1)/2 for all k < N. Consider a pile of N coins split into x and (N−x):

$$f(N) = x(N-x) + f(x) + f(N-x)$$
$$= x(N-x) + \\\frac{x(x-1)}{2} + \\\frac{(N-x)(N-x-1)}{2}$$

Expanding:
$$= xN - x^2 + \\\frac{x^2 - x}{2} + \\\frac{(N-x)^2 - (N-x)}{2}$$
$$= xN - x^2 + \\\frac{x^2 - x + N^2 - 2Nx + x^2 - N + x}{2}$$
$$= \\\frac{N^2 - N}{2} = \\\frac{N(N-1)}{2} \\checkmark$$

The result is **independent of x** — the split choice doesn't matter. ∎

---

**For n = 1000:**
$$f(1000) = \\\frac{1000 \\\times 999}{2} = \\boxed{499{,}500}$$`,

  hints: [
    'Try small cases: what is the sum for n=2, 3, 4? Do you see a pattern?',
    'Formulate a claim: f(n) = ?. Then prove it by strong induction.',
    'When you split N into x and (N-x), express f(N) in terms of f(x) and f(N-x), then simplify.',
  ],

  finalAnswer: 'f(n) = n(n−1)/2. For 1000 coins: f(1000) = 499,500. The sum is always the same regardless of split order.',
};

export default coinSplit;
