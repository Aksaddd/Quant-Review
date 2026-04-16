import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-21-martingales',
  type: 'concept',
  chapter: 5,
  section: '5.2',
  difficulty: 'hard',
  tags: ['technique', 'stochastic-processes', 'martingale'],

  front: `**Martingales and Random Walks**

Define a martingale. What are the key martingales for a symmetric random walk?`,

  back: `**Martingale definition:**
$$E[Z_{n+1} \\mid Z_n, Z_{n-1}, \\ldots, Z_1] = Z_n$$

"Fair game" — expected future value equals current value.

**Symmetric random walk** $S_n = X_1 + \\cdots + X_n$, $X_i = \\pm 1$ with prob $1/2$:

Key martingales:
1. $S_n$ (the walk itself)
2. $S_n^2 - n$ (used to find $E[\\text{stopping time}]$)

**Wald's Equality:** If $N$ is a stopping time with $E[N] < \\infty$:
$$E[S_N] = E[X] \\cdot E[N]$$

**Random walk with barriers** at $+\\alpha$ and $-\\beta$:
- $P(\\text{hits } +\\alpha) = \\beta/(\\alpha + \\beta)$
- $E[\\text{stopping time}] = \\alpha \\cdot \\beta$

**Stopping time rule:** $\\{N \\leq n\\}$ must depend only on $X_1, \\ldots, X_n$ (no "peeking" into the future).`,
};

export default fc;
