import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-03-sum-of-powers',
  type: 'formula',
  chapter: 2,
  section: '2.5',
  difficulty: 'medium',
  tags: ['formula', 'summation', 'algebra'],

  front: `**Sum of Powers Formulas**

State the closed-form formulas for:
1. Sum of first N integers
2. Sum of first N squares
3. Sum of first N cubes`,

  back: `$$\sum_{k=1}^{N} k = \frac{N(N+1)}{2}$$

$$\sum_{k=1}^{N} k^2 = \frac{N(N+1)(2N+1)}{6}$$

$$\sum_{k=1}^{N} k^3 = \left[\frac{N(N+1)}{2}\right]^2$$

**Memory trick:** Sum of cubes = (sum of integers)²

**Quick checks:**
- N=3: 1+2+3=6 ✓, 1+4+9=14 ✓, 1+8+27=36=6² ✓

**Used for:**
- **Clock Pieces:** Σk (k=1..12) = 78, target = 26
- **Missing Integers:** Expected Σk and Σk² for {1..100}
- **Counterfeit Coins I:** Σk (k=1..10) = 55 total coins`,
};

export default fc;
