import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-11-box-packing',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'hard',
  tags: ['combinatorics', 'coloring', 'proof'],
  problemId: 'ch2-11-box-packing',

  front: `**Box Packing**

Can you pack **53 bricks (1×1×4)** into a **6×6×6 box**?

Volume check: 53 × 4 = 212 < 216 = 6³. So volume fits.`,

  back: `**Answer: No — impossible despite sufficient volume.**

**Proof by 3D coloring:**

Divide 6×6×6 into 27 sub-cubes of size 2×2×2. Color alternating black/white → **14 of one color, 13 of the other**.

Any 1×1×4 brick spans exactly **one black and one white** 2×2×2 sub-cube. Each 2×2×2 sub-cube holds at most **4 bricks**.

With only **13 minority-color sub-cubes**: max bricks = 13 × 4 = **52**.

The **53rd brick** needs a 14th minority sub-cube — doesn't exist. ✗`,
};

export default fc;
