import { Problem } from '@/lib/types';

const missingIntegers: Problem = {
  id: 'ch2-22-missing-integers',
  chapter: 2,
  section: '2.5',
  sectionTitle: 'Series Summation',
  title: 'Missing Integers',
  difficulty: 'easy',
  keyTechnique: 'Sum and sum-of-squares equations, O(n) algorithm',
  tags: ['arithmetic', 'summation', 'algebra', 'algorithms'],

  setup: `You have a list of **98 distinct integers** drawn from the set **{1, 2, 3, …, 100}**. Two integers are missing.

**Find the two missing integers.**`,

  solution: `**Strategy: Use two equations (sum and sum of squares) to solve for two unknowns.**

Let the two missing integers be **x** and **y**.
Let z₁, z₂, …, z₉₈ be the given integers.

---

**Equation 1 — Sum:**
$$x + y = \\\frac{100 \\\times 101}{2} - \\\sum z_i = 5050 - \\\sum z_i$$

Compute the right side. Call it **S** = x + y.

---

**Equation 2 — Sum of squares:**
$$x^2 + y^2 = \\\frac{100 \\\times 101 \\\times 201}{6} - \\\sum z_i^2 = 338350 - \\\sum z_i^2$$

Compute the right side. Call it **Q** = x² + y².

---

**Solve the system:**

We know S = x + y and Q = x² + y².

Note: $(x - y)^2 = (x + y)^2 - 2(x^2 + y^2) = S^2 - 2Q$... wait, that's wrong.

Actually: $x^2 + y^2 = (x+y)^2 - 2xy$, so $xy = (S^2 - Q)/2$.

Now x and y are the roots of: $t^2 - St + xy = 0$

Solve with the quadratic formula to find x and y exactly.

**Algorithm runs in O(n)** — one pass to compute both sums.

---

**Final Answer:** Compute S = expected sum − actual sum, Q = expected sum-of-squares − actual sum-of-squares, then solve the 2×2 system.`,

  hints: [
    'One equation (sum) gives x + y but not x and y individually.',
    'What second equation can you set up? Try sum of squares.',
    'With x + y = S and x² + y² = Q, you can find xy and then solve the quadratic.',
  ],

  finalAnswer: 'Compute S = 5050 − Σzᵢ and Q = 338350 − Σzᵢ². Then: xy = (S² − Q)/2, and x, y are roots of t² − St + xy = 0.',
};

export default missingIntegers;
