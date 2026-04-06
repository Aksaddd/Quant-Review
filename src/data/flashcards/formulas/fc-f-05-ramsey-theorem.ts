import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-05-ramsey-theorem',
  type: 'formula',
  chapter: 2,
  section: '2.6',
  difficulty: 'hard',
  tags: ['formula', 'combinatorics', 'graph-theory', 'ramsey'],

  front: `**Ramsey's Theorem — R(3,3)**

What is R(3,3) and what does it mean? How is it proved?`,

  back: `**R(3,3) = 6**

Meaning: In any group of **6 people**, there must exist either:
- **3 mutual acquaintances**, OR
- **3 mutual strangers**

(Equivalently: any 2-coloring of K₆ contains a monochromatic triangle.)

**Proof sketch (Pigeon Hole):**
Fix one person. Among remaining 5: by PHP, either ≥3 know them or ≥3 don't. Take those 3:
- If any pair among the 3 has the same relationship → triangle with the fixed person ✓
- If all pairs have the opposite relationship → those 3 form a triangle themselves ✓

**Why R(3,3) ≠ 5:** K₅ can be 2-colored with no monochromatic triangle (the Petersen graph coloring).

**General R(r,s):** Minimum n such that any 2-coloring of Kₙ contains a red Kᵣ or blue Kₛ.`,
};

export default fc;
