import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-16-cholesky-decomposition',
  type: 'concept',
  chapter: 3,
  section: '3.6',
  difficulty: 'medium',
  tags: ['technique', 'linear-algebra', 'simulation'],

  front: `**Technique: Cholesky Decomposition**

What is it, and how is it used to generate correlated normal random variables?`,

  back: `**Cholesky decomposition:** For any positive definite matrix $\\Sigma$:
$$\\Sigma = LL^T$$
where $L$ is a **lower triangular** matrix.

**Generating correlated normals:**
1. Generate independent standard normals: $Z = (Z_1, Z_2, \\ldots, Z_n)^T$
2. Compute $L$ from the target covariance matrix $\\Sigma$
3. Set $X = \\mu + LZ$

Then $X \\sim N(\\mu, \\Sigma)$ — the variables have the desired correlation structure.

**For 2 variables** with correlation $\\rho$:
$$X_1 = Z_1$$
$$X_2 = \\rho Z_1 + \\sqrt{1 - \\rho^2}\\,Z_2$$

**Why it matters:** Essential for Monte Carlo simulation of multi-asset portfolios, multi-factor models, and correlated risk scenarios.`,
};

export default fc;
