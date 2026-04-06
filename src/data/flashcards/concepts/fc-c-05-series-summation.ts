import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-05-series-summation',
  type: 'concept',
  chapter: 2,
  section: '2.5',
  difficulty: 'easy',
  tags: ['technique', 'strategy', 'summation', 'formulas'],

  front: `**Technique: Series Summation**

What summation formulas must you know cold for quant interviews?`,

  back: `**Must-memorize formulas:**

| Formula | Expression |
|---------|-----------|
| Sum of first N integers | $\\frac{N(N+1)}{2}$ |
| Sum of first N squares | $\\frac{N(N+1)(2N+1)}{6}$ |
| Sum of first N cubes | $\\left[\\frac{N(N+1)}{2}\\right]^2$ |
| Triangular number T(N) | $\\frac{N(N+1)}{2}$ |

**Applied in problems:**
- **Clock Pieces:** 1+…+12 = 78, target = 26
- **Counterfeit Coins I:** 1+2+…+10 = 55 coins
- **Glass Balls:** N(N+1)/2 ≥ 100 → N=14
- **Coin Split:** f(n) = n(n−1)/2 = 499,500 for n=1000`,
};

export default fc;
