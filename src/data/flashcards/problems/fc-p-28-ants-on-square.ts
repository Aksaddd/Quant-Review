import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-28-ants-on-square',
  type: 'problem',
  chapter: 2,
  section: '2.6',
  difficulty: 'medium',
  tags: ['pigeon-hole', 'geometry'],
  problemId: 'ch2-28-ants-on-square',

  front: `**Ants on a Square**

51 ants on a unit square. Can you always place a **circle of radius 1/7** to cover at least **3 ants**?`,

  back: `**Yes — by the Generalized Pigeon Hole Principle.**

**Step 1:** Divide the unit square into a **5×5 grid** of 25 sub-squares (side = 1/5 each).

**Step 2:** By PHP: $\lceil 51/25 \rceil = 3$ → at least one sub-square holds **≥ 3 ants**.

**Step 3:** Diagonal of a 1/5 square = $\sqrt{2}/5 \approx 0.283$. Circle of radius 1/7 ≈ 0.1429 covers any point within $\sqrt{2}/10 \approx 0.1414$ of center.

Since 1/7 > √2/10, the circle covers the entire sub-square. ✓

**Answer: Yes, always.**`,
};

export default fc;
