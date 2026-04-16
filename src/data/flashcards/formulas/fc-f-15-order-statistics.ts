import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-15-order-statistics',
  type: 'formula',
  chapter: 4,
  section: '4.6',
  difficulty: 'medium',
  tags: ['formula', 'probability', 'order-statistics'],

  front: `**Order Statistics**

For $n$ i.i.d. Uniform(0,1) random variables, what are $E[\\max]$, $E[\\min]$, and the general $E[X_{(k)}]$?`,

  back: `For $n$ i.i.d. $\\text{Uniform}(0,1)$:

**CDF of $k$-th order statistic** $X_{(k)}$:
$$F_{X_{(k)}}(x) = \\sum_{j=k}^{n} \\binom{n}{j} x^j (1-x)^{n-j}$$

**Expected values:**
$$E[X_{(k)}] = \\frac{k}{n+1}$$

**Special cases:**
- $E[\\min] = E[X_{(1)}] = \\frac{1}{n+1}$
- $E[\\max] = E[X_{(n)}] = \\frac{n}{n+1}$

**For Exponential($\\lambda$) i.i.d.:**
- $\\min(X_1, \\ldots, X_n) \\sim \\text{Exp}(n\\lambda)$
- $E[\\min] = \\frac{1}{n\\lambda}$

**Correlation of max and min** (Uniform):
$$\\text{Corr}(X_{(1)}, X_{(n)}) = \\frac{1}{n-1} \\cdot \\frac{1}{n+1} \\cdot \\frac{1}{\\sigma_{(1)}\\sigma_{(n)}}$$

This comes up in quant interviews for modeling best/worst returns in a portfolio.`,
};

export default fc;
