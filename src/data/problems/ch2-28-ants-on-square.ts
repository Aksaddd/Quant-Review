import { Problem } from '@/lib/types';

const antsOnSquare: Problem = {
  id: 'ch2-28-ants-on-square',
  chapter: 2,
  section: '2.6',
  sectionTitle: 'The Pigeon Hole Principle',
  title: 'Ants on a Square',
  difficulty: 'medium',
  keyTechnique: 'Generalized Pigeon Hole, grid division',
  tags: ['pigeon-hole', 'geometry', 'combinatorics', 'proof'],

  setup: `**51 ants** are placed on a **unit square** (side length 1).

Can you always place a **circle of radius 1/7** somewhere on the square to cover **at least 3 ants**?`,

  solution: `**Yes. Proof using the Generalized Pigeon Hole Principle:**

**Step 1: Divide the square into regions.**

Divide the 1×1 unit square into a **5×5 grid** of 25 smaller squares, each with side length **1/5**.

**Step 2: Apply Generalized Pigeon Hole.**

51 ants in 25 sub-squares:
$$\\lceil 51 / 25 \\rceil = \\lceil 2.04 \\rceil = 3$$

At least **one sub-square contains 3 or more ants**.

**Step 3: Show the circle fits.**

A sub-square of side 1/5 has diagonal:
$$d = \\sqrt{2} \\times \\frac{1}{5} = \\frac{\\sqrt{2}}{5} \\approx 0.2828$$

A circle centered at the center of a 1/5 × 1/5 square with radius r covers the entire square if:
$$r \\geq \\frac{d}{2} = \\frac{\\sqrt{2}}{10} \\approx 0.1414$$

Our circle has radius **1/7 ≈ 0.1429 > 0.1414**. ✓

So the circle of radius 1/7 centered on any such sub-square covers all ants within it.

---

**Final Answer: Yes.** By Pigeon Hole, some 1/5 × 1/5 sub-square has ≥ 3 ants, and a circle of radius 1/7 is large enough to cover any such sub-square.`,

  hints: [
    'Divide the square into 25 smaller regions. How many ants must be in at least one region?',
    'Apply Generalized Pigeon Hole: ⌈51/25⌉ = ?',
    'Can a circle of radius 1/7 cover an entire 1/5 × 1/5 sub-square? Check the diagonal vs. diameter.',
  ],

  finalAnswer: 'Yes. Divide into 5×5 grid → some cell has ≥3 ants (by PHP). Radius 1/7 > diagonal/2 of each cell, so the circle covers it.',
};

export default antsOnSquare;
