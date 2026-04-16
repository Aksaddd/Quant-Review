import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-16-brownian-motion',
  type: 'formula',
  chapter: 5,
  section: '5.4',
  difficulty: 'hard',
  tags: ['formula', 'stochastic-calculus', 'brownian-motion'],

  front: `**Brownian Motion Properties**

State the defining properties of standard Brownian motion $W(t)$ and its key expectations.`,

  back: `**Defining properties:**
1. $W(0) = 0$
2. **Independent increments:** $W(t_2) - W(t_1)$ independent of $W(t_1) - W(t_0)$
3. **Normal increments:** $W(s+t) - W(s) \\sim N(0, t)$
4. **Continuous paths** (almost surely)

**Key moments:**
- $E[W(t)] = 0$
- $E[W(t)^2] = t$
- $\\text{Var}(W(t)) = t$
- $\\text{Cov}(W(s), W(t)) = \\min(s, t)$

**Martingales from BM:**
1. $W(t)$ (trivially)
2. $W(t)^2 - t$ (used for $E[\\text{hitting time}]$)
3. $\\exp(\\lambda W(t) - \\tfrac{1}{2}\\lambda^2 t)$ (exponential martingale)

**First passage to $\\pm 1$:**
Using $W(t)^2 - t$ martingale: $E[\\tau] = 1$

**Note:** $\\text{Corr}(W(t), W(t)^2) = 0$ (zero correlation but NOT independent!)`,
};

export default fc;
