import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-22-dynamic-programming',
  type: 'concept',
  chapter: 5,
  section: '5.3',
  difficulty: 'hard',
  tags: ['technique', 'optimization', 'dynamic-programming'],

  front: `**Dynamic Programming (Bellman's Principle)**

Explain the DP framework. How do you solve optimal stopping problems?`,

  back: `**Framework:**
- Stages $k = 0, 1, \\ldots, N$ with state $x_k$ and control $u_k$
- State evolves: $x_{k+1} = f(x_k, u_k, w_k)$
- Minimize: $g_N(x_N) + \\sum_{k=0}^{N-1} g_k(x_k, u_k, w_k)$

**Bellman recursion (backward induction):**
$$J_k(x_k) = \\min_{u_k} E[g_k(x_k, u_k, w_k) + J_{k+1}(x_{k+1})]$$

**Principle of Optimality:** The tail of an optimal policy is optimal for the tail problem.

**Optimal stopping:** At each state, decide: stop (take current payoff) or continue (expected future value).

**Example — Dice Game (up to 3 rolls):**
- Stage 3: $E = 3.5$ (must take)
- Stage 2: Stop if $\\geq 4$, else roll → $E = 4.25$
- Stage 1: Stop if $\\geq 5$, else roll → $E = 14/3 \\approx 4.67$

**Interview tip:** Always work backward from the terminal stage.`,
};

export default fc;
