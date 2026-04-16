import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-14-newtons-method',
  type: 'concept',
  chapter: 3,
  section: '3.4',
  difficulty: 'medium',
  tags: ['technique', 'numerical', 'root-finding'],

  front: `**Technique: Newton's Method (Newton-Raphson)**

State the iteration formula and its convergence properties.`,

  back: `**Iteration formula:**
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

**Geometric interpretation:** At each step, approximate $f(x)$ by its tangent line and find where the tangent crosses zero.

**Convergence:** Quadratic convergence near a simple root — number of correct digits roughly **doubles** each iteration.

**Failure cases:**
- $f'(x_n) = 0$ (horizontal tangent → division by zero)
- Bad initial guess (can cycle or diverge)
- Multiple roots (convergence degrades to linear)

**Application:** Finding implied volatility in Black-Scholes — iterate $\\sigma_{n+1} = \\sigma_n - (C_{BS}(\\sigma_n) - C_{market}) / \\text{vega}(\\sigma_n)$`,
};

export default fc;
