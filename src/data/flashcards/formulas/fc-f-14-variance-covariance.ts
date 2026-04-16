import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-14-variance-covariance',
  type: 'formula',
  chapter: 4,
  section: '4.5',
  difficulty: 'easy',
  tags: ['formula', 'probability', 'variance'],

  front: `**Variance and Covariance Formulas**

State the key formulas for variance, covariance, and properties of sums of random variables.`,

  back: `**Variance:**
$$\\text{Var}(X) = E[X^2] - (E[X])^2$$
$$\\text{Var}(aX + b) = a^2 \\text{Var}(X)$$

**Covariance:**
$$\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$$
$$\\text{Cov}(aX, bY) = ab \\cdot \\text{Cov}(X,Y)$$

**Correlation:** $\\rho = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}$, where $-1 \\le \\rho \\le 1$

**Sum of random variables:**
$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X,Y)$$

**If independent:** $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$

**Optimal hedge ratio:**
$$h^* = \\frac{\\text{Cov}(X,Y)}{\\text{Var}(Y)} = \\rho \\frac{\\sigma_X}{\\sigma_Y}$$
Minimizes $\\text{Var}(X - hY)$.`,
};

export default fc;
