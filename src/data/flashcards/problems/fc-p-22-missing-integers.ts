import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-22-missing-integers',
  type: 'problem',
  chapter: 2,
  section: '2.5',
  difficulty: 'easy',
  tags: ['arithmetic', 'algebra', 'algorithms'],
  problemId: 'ch2-22-missing-integers',

  front: `**Missing Integers**

You have 98 distinct integers from {1, 2, …, 100}. Two are missing.

**Find both missing integers using an O(n) algorithm.**`,

  back: `**Set up two equations, solve for two unknowns (x and y):**

**Sum:** $x + y = 5050 - \\sum z_i$ → gives **S**

**Sum of squares:** $x^2 + y^2 = 338350 - \\sum z_i^2$ → gives **Q**

**Solve:**
$$xy = \\frac{S^2 - Q}{2}$$

x and y are roots of: $t^2 - St + xy = 0$

**One O(n) pass** computes both Σzᵢ and Σzᵢ², then algebra gives x and y exactly.`,
};

export default fc;
