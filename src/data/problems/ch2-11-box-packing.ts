import { Problem } from '@/lib/types';

const boxPacking: Problem = {
  id: 'ch2-11-box-packing',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Box Packing',
  difficulty: 'hard',
  keyTechnique: '3D coloring argument, proof by contradiction',
  tags: ['combinatorics', 'coloring', 'proof', 'geometry', '3d'],

  setup: `Can you pack **53 bricks** of dimension **1×1×4** into a **6×6×6 box**?

Note: 53 × 4 = 212, and 6³ = 216, so there is enough total volume.`,

  solution: `### Setting Up the Coloring Argument

**Answer: No — it is impossible.**

Divide the 6×6×6 box into **27 non-overlapping 2×2×2 sub-cubes** (think of a 3×3×3 arrangement of 2×2×2 blocks). Color them alternating **black** and **white** like a 3D checkerboard.

In a 3×3×3 arrangement: **14 cubes of one color**, **13 of the other**.

### Key Observation

Any 1×1×4 brick, regardless of orientation, always passes through exactly **one black** and **one white** 2×2×2 sub-cube (it spans exactly 4 unit cells = 2 full sub-cubes side by side).

Wait — more precisely: a 1×1×4 brick covers exactly 4 cells. Since sub-cubes are 2×2×2 = 8 cells each, and the brick spans exactly 2 sub-cubes of opposite colors.

### Deriving the Bound

Each 2×2×2 sub-cube can hold **at most 4** such bricks (4 × 4 = 16 > 8, but only 4 non-overlapping bricks can fit).

With only **13 sub-cubes** of the minority color, at most **13 × 4 = 52 bricks** can be placed before running out of minority-color sub-cubes.

The **53rd brick** would require a 14th minority-color sub-cube — which doesn't exist.

**Final Answer: No. The 53rd brick cannot be packed. Maximum is 52.**`,

  hints: [
    'The volume fits — so why might it still be impossible?',
    'Try coloring the 6×6×6 box into 2×2×2 sub-cubes and alternating colors like a 3D chessboard.',
    'How many sub-cubes of each color are there? How many bricks can each sub-cube accommodate?',
  ],

  finalAnswer: 'No. Despite sufficient volume, the 53rd brick is impossible. The 3D coloring argument shows at most 52 bricks can fit.',
};

export default boxPacking;
