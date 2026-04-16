import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-21-var-duration',
  type: 'formula',
  chapter: 6,
  section: '6.4',
  difficulty: 'medium',
  tags: ['formula', 'finance', 'risk-management'],

  front: `**VaR and Duration**

Define Value at Risk and bond duration. What are their limitations?`,

  back: `**Value at Risk (VaR):**
Maximum loss at confidence level $\\alpha$ over a target horizon.
$$P(\\text{Loss} > \\text{VaR}_\\alpha) = 1 - \\alpha$$

**Drawbacks:**
1. **Tail-blind:** Ignores severity beyond the threshold
2. **Not sub-additive:** $\\text{VaR}(A+B)$ can exceed $\\text{VaR}(A) + \\text{VaR}(B)$
3. Solution: Use **CVaR** (Conditional VaR / Expected Shortfall)

**Duration:**
$$D = -\\frac{1}{P}\\frac{dP}{dy}$$

**Convexity:**
$$C = \\frac{1}{P}\\frac{d^2P}{dy^2}$$

**Price approximation:**
$$\\frac{\\Delta P}{P} \\approx -D \\cdot \\Delta y + \\frac{1}{2}C \\cdot (\\Delta y)^2$$

**DV01:** Dollar change per 1 bp yield move = $D \\cdot P / 10{,}000$

**Key:** Dollar duration is additive across a portfolio — used for hedging interest rate risk.`,
};

export default fc;
