import { Problem } from '@/lib/types';

const clockPieces: Problem = {
  id: 'ch2-21-clock-pieces',
  chapter: 2,
  section: '2.5',
  sectionTitle: 'Series Summation',
  title: 'Clock Pieces',
  difficulty: 'medium',
  keyTechnique: 'Series summation, equal partition',
  tags: ['arithmetic', 'summation', 'logic', 'partition'],

  setup: `A clock face is **broken into 3 pieces**. The numbers on each piece must **sum to the same value**.

The clock is numbered 1 through 12 (standard clock face, numbers are consecutive along the circumference).

**What numbers are on each piece?**`,

  solution: `**Step 1: Find the target sum per piece.**

Total sum of 1 + 2 + … + 12 = 12 × 13 / 2 = **78**

Each of the 3 pieces must sum to: 78 / 3 = **26**

---

**Step 2: Find contiguous groupings that sum to 26.**

Since the numbers are arranged in a circle (1–12 consecutively), each piece must be a **contiguous arc**.

Testing groupings:
- **{12, 1, 2, 11}**: 12+1+2+11 = **26** ✓ (wraps around 12→1)
- **{3, 4, 9, 10}**: 3+4+9+10 = **26** ✓
- **{5, 6, 7, 8}**: 5+6+7+8 = **26** ✓

All three are contiguous arcs on the clock face. ✓

---

**Final Answer:**
| Piece | Numbers | Sum |
|-------|---------|-----|
| 1 | 12, 1, 2, 11 | 26 |
| 2 | 3, 4, 9, 10 | 26 |
| 3 | 5, 6, 7, 8 | 26 |`,

  hints: [
    'What is the total sum of numbers 1–12? Divide by 3 to get the target per piece.',
    'The numbers must be contiguous on the clock face (each piece is an arc). Start trying combinations that sum to 26.',
    'Numbers 12 and 1 are adjacent on a clock — don\'t forget the clock is circular.',
  ],

  finalAnswer: 'Piece 1: {12,1,2,11}=26. Piece 2: {3,4,9,10}=26. Piece 3: {5,6,7,8}=26.',
};

export default clockPieces;
