import { Problem } from '@/lib/types';

const glassBalls: Problem = {
  id: 'ch2-24-glass-balls',
  chapter: 2,
  section: '2.5',
  sectionTitle: 'Series Summation',
  title: 'Glass Balls',
  difficulty: 'hard',
  keyTechnique: 'Optimal worst-case strategy, triangular numbers',
  tags: ['optimization', 'dynamic-programming', 'worst-case', 'summation'],

  setup: `You have **two identical glass balls** and a **100-story building**. A ball will break if dropped from floor **X or higher**, but survive any drop below floor X. You do not know X.

**Minimize the number of drops needed in the worst case to determine X exactly.**`,

  solution: `**Key insight: Use the first ball to scan in decreasing steps, then the second ball to scan linearly.**

Let N = the maximum number of drops allowed.

**Strategy:** Drop ball 1 from floors: N, N+(N−1), N+(N−1)+(N−2), …

If ball 1 breaks at step k, ball 2 scans linearly from the last safe floor (using at most N−k more drops).

**Total drops used:** always ≤ N.

**Coverage:** N + (N−1) + (N−2) + … + 1 = **N(N+1)/2** floors.

For 100 floors:
$$N(N+1)/2 \\\geq 100 \\implies N \\\geq 14 \\quad (14 \\\times 15 / 2 = 105 \\\geq 100)$$

---

**Optimal sequence of floors for ball 1:**
14 → 27 → 39 → 50 → 60 → 69 → 77 → 84 → 90 → 95 → 99 → 100

(Each step is one fewer than the previous: 14, 13, 12, 11, 10, …)

**If ball 1 breaks at floor 27 (after surviving 14):**
Ball 2 scans floors 15, 16, 17, … up to 27 → at most 13 more drops.
Total: 2 drops (ball 1) + 13 (ball 2) = 15 — **still ≤ 14? No** — we'd use 14 total: 1 (first drop) + 13.

The key is that after the kth drop of ball 1, ball 2 has at most N−k drops remaining.

---

**Final Answer: 14 drops minimum in the worst case.** Start ball 1 at floor 14, then 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100.`,

  hints: [
    'If you use ball 1 to jump in large steps and it breaks, how many drops does ball 2 need?',
    'The total drops must be the same whether ball 1 breaks early or late. How do you balance this?',
    'If the maximum drops is N, the first jump is N, second is N-1, third is N-2, etc. What\'s the max coverage?',
  ],

  finalAnswer: '14 drops. Drop ball 1 at decreasing intervals (14, 13, 12,…). N(N+1)/2 ≥ 100 gives N=14.',
};

export default glassBalls;
