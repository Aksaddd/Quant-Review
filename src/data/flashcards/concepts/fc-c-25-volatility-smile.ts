import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-25-volatility-smile',
  type: 'concept',
  chapter: 6,
  section: '6.2',
  difficulty: 'medium',
  tags: ['technique', 'finance', 'volatility'],

  front: `**Implied Volatility and the Volatility Smile**

What is implied volatility? What causes the smile/skew?`,

  back: `**Implied volatility:** The $\\sigma$ that makes the BS price equal the observed market price. Found by root-finding (Newton's method on vega).

**Volatility smile:** Implied vol plotted as a function of strike $K$:
- **Equity options:** Skewed (lower strikes → higher implied vol) — "smirk"
- **FX options:** U-shaped (both tails have higher vol) — "smile"

**Causes of the smile:**
1. **Fat tails:** Real returns have heavier tails than lognormal
2. **Jump risk:** Markets can gap down (crash fear)
3. **Stochastic volatility:** $\\sigma$ itself is random
4. **Leverage effect:** Stock drops → more leveraged → higher vol

**Stochastic vol effect on pricing:**
- Options are convex in $\\sigma$
- By Jensen's: $E[C(\\tilde{\\sigma})] > C(E[\\tilde{\\sigma}])$
- So stochastic vol generally makes options **more expensive**

**Recovering the risk-neutral density:**
$$f_{S_T}(K) = e^{rT} \\frac{\\partial^2 c}{\\partial K^2}$$ (Breeden-Litzenberger)`,
};

export default fc;
