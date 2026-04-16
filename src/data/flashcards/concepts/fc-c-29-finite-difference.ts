import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-29-finite-difference',
  type: 'concept',
  chapter: 7,
  section: '7.3',
  difficulty: 'hard',
  tags: ['technique', 'numerical-methods', 'pde'],

  front: `**Finite Difference Methods**

Name the three finite difference schemes for solving the BSM PDE. Which is most commonly used and why?`,

  back: `All discretize the BSM PDE on a space-time grid $(S_i, t_j)$.

| Method | Stability | Accuracy | Notes |
|--------|-----------|----------|-------|
| **Explicit (Forward)** | Conditional: $\\alpha \\leq 1/2$ | $O(\\Delta t, \\Delta x^2)$ | Simple but restrictive |
| **Implicit (Backward)** | Unconditional | $O(\\Delta t, \\Delta x^2)$ | Solve tridiagonal system |
| **Crank-Nicolson** | Unconditional | $O(\\Delta t^2, \\Delta x^2)$ | **Most common** |

where $\\alpha = \\Delta\\tau / (\\Delta x)^2$.

**Explicit method danger:** Too many space steps (small $\\Delta x$) → $\\alpha$ exceeds $1/2$ → **instability** (oscillating, divergent prices).

**Crank-Nicolson** averages explicit and implicit → second-order in both time and space → gold standard for 1D option pricing.

**Key question: "Too many time steps or too many space steps — which is worse?"**
Answer: **Too many space steps.** Small $\\Delta x$ forces even smaller $\\Delta t$ for the explicit method. Implicit/CN avoid this entirely.

**When to use which:**
- 1D European: Crank-Nicolson
- American: Crank-Nicolson + penalty/PSOR
- Multi-asset: Monte Carlo (curse of dimensionality)`,
};

export default fc;
