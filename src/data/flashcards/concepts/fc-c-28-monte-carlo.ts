import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-28-monte-carlo',
  type: 'concept',
  chapter: 7,
  section: '7.3',
  difficulty: 'medium',
  tags: ['technique', 'numerical-methods', 'simulation'],

  front: `**Monte Carlo Simulation**

How do you price a European option via Monte Carlo? What are the key variance reduction techniques?`,

  back: `**MC pricing steps:**
1. Simulate $M$ paths under risk-neutral measure:
$$S_T^{(k)} = S_0 \\exp\\left[(r - \\sigma^2/2)T + \\sigma\\sqrt{T}\\,\\varepsilon_k\\right]$$
2. Compute payoff for each path: $\\max(S_T^{(k)} - K, 0)$
3. Price = $e^{-rT} \\cdot \\frac{1}{M}\\sum_{k=1}^M \\text{payoff}_k$

**Variance reduction techniques:**
| Method | Idea |
|--------|------|
| **Antithetic** | Use $\\varepsilon$ and $-\\varepsilon$ together; average payoffs |
| **Control variate** | Correct estimate using a known-price instrument |
| **Moment matching** | Rescale samples to match theoretical mean/variance |
| **Importance sampling** | Reweight distribution to focus on high-payoff region |
| **Quasi-MC** | Sobol/Halton sequences instead of pseudorandom |

**Estimating Greeks via MC:**
- $\\Delta \\approx \\frac{f(S+\\delta) - f(S-\\delta)}{2\\delta}$ (central difference, same random numbers)
- $\\Gamma \\approx \\frac{f(S+\\delta) - 2f(S) + f(S-\\delta)}{\\delta^2}$

**Limitation:** Cannot directly handle American options (need Longstaff-Schwartz for early exercise).`,
};

export default fc;
