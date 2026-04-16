import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-13-distributions',
  type: 'formula',
  chapter: 4,
  section: '4.4',
  difficulty: 'medium',
  tags: ['formula', 'probability', 'distributions'],

  front: `**Key Probability Distributions**

State the PMF/PDF, mean, and variance for: Binomial, Poisson, Geometric, Exponential, and Normal.`,

  back: `| Distribution | PMF/PDF | Mean | Variance |
|---|---|---|---|
| **Binomial**$(n,p)$ | $\\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| **Poisson**$(\\lambda)$ | $e^{-\\lambda}\\lambda^k/k!$ | $\\lambda$ | $\\lambda$ |
| **Geometric**$(p)$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| **Exponential**$(\\lambda)$ | $\\lambda e^{-\\lambda x}$ | $1/\\lambda$ | $1/\\lambda^2$ |
| **Normal**$(\\mu,\\sigma^2)$ | $\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/2\\sigma^2}$ | $\\mu$ | $\\sigma^2$ |

**Key properties:**
- Poisson: limit of Binomial as $n \\to \\infty$, $p \\to 0$, $np = \\lambda$
- Exponential: **memoryless** — $P(X > s+t | X > s) = P(X > t)$
- Normal moments: $E[X^{2n}] = (2n-1)!! \\cdot \\sigma^{2n}$, odd moments = 0`,
};

export default fc;
