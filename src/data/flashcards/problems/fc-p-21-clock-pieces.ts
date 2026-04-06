import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-21-clock-pieces',
  type: 'problem',
  chapter: 2,
  section: '2.5',
  difficulty: 'medium',
  tags: ['arithmetic', 'summation', 'partition'],
  problemId: 'ch2-21-clock-pieces',

  front: `**Clock Pieces**

A clock (1–12) breaks into 3 pieces. The sum of numbers on each piece must be equal.

**What numbers are on each piece?**`,

  back: `**Total:** 1+2+…+12 = 78. Each piece must sum to **78/3 = 26**.

Numbers are arranged consecutively on a circle (12 is adjacent to 1).

| Piece | Numbers | Sum |
|-------|---------|-----|
| 1 | 12, 1, 2, 11 | **26** |
| 2 | 3, 4, 9, 10 | **26** |
| 3 | 5, 6, 7, 8 | **26** |

All three are contiguous arcs on the clock face. ✓`,
};

export default fc;
