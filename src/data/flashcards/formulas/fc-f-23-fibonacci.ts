import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-23-fibonacci',
  type: 'formula',
  chapter: 7,
  section: '7.1',
  difficulty: 'medium',
  tags: ['formula', 'algorithms', 'fibonacci'],

  front: `**Fibonacci Numbers**

State Binet's formula, the recursive complexity, and the efficient methods.`,

  back: `**Recurrence:** $F_n = F_{n-1} + F_{n-2}$, with $F_0 = 0$, $F_1 = 1$

**Binet's (closed-form) formula:**
$$F_n = \\frac{\\varphi^n - \\psi^n}{\\sqrt{5}}$$
where $\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.618$ (golden ratio), $\\psi = \\frac{1-\\sqrt{5}}{2}$

**Complexity by method:**
| Method | Time | Space |
|--------|------|-------|
| Naive recursive | $O(\\varphi^n)$ ≈ $O(1.618^n)$ | $O(n)$ |
| Iterative | $O(n)$ | $O(1)$ |
| Matrix power | $O(\\log n)$ | $O(1)$ |

**Matrix method:** $\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$

Compute $M^n$ by repeated squaring in $O(\\log n)$ multiplications.

**Application:** Hopping rabbit (n stairs, 1 or 2 at a time) = $F_{n+1}$ ways.`,
};

export default fc;
