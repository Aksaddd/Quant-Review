import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-18-conditional-expectation',
  type: 'concept',
  chapter: 4,
  section: '4.5',
  difficulty: 'medium',
  tags: ['technique', 'probability', 'expected-value'],

  front: `**Technique: Conditioning (Tower Property)**

How does conditioning on a first step simplify expected value calculations?`,

  back: `**Law of Total Expectation (Tower Property):**
$$E[X] = \\sum_i E[X | A_i] \\cdot P(A_i) = E[E[X | Y]]$$

**First-step analysis pattern:**
1. Condition on what happens in the first step
2. Express $E[X]$ in terms of itself or simpler quantities
3. Solve the resulting equation

**Example — Coupon Collector:**
Let $E_i$ = expected draws to get the $i$-th new coupon when $i-1$ are collected.
$$E_i = \\frac{n}{n - (i-1)} \\quad \\implies \\quad E[T] = n \\sum_{k=1}^{n} \\frac{1}{k} = nH_n$$

**Example — Gambler's Ruin:**
$P_i = \\frac{1}{2}P_{i-1} + \\frac{1}{2}P_{i+1}$, boundary conditions $P_0 = 0$, $P_N = 1$.

**Interview tip:** "Condition on the first…" is nearly always the right opening move for expected value problems.`,
};

export default fc;
