import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-11-inclusion-exclusion',
  type: 'formula',
  chapter: 4,
  section: '4.1',
  difficulty: 'easy',
  tags: ['formula', 'probability', 'combinatorics'],

  front: `**Inclusion-Exclusion Principle**

State the formula for $P(A \\cup B)$ and the general case.`,

  back: `**Two events:**
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

**Three events:**
$$P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC)$$

**General (n events):**
$$P\\left(\\bigcup_{i=1}^n A_i\\right) = \\sum_{k=1}^{n} (-1)^{k+1} \\sum_{|S|=k} P\\left(\\bigcap_{i \\in S} A_i\\right)$$

**Useful form:** $P(\\text{at least one}) = 1 - P(\\text{none})$

**Derangement application:** Probability all $n$ items are in wrong position:
$$P(D_n) = \\sum_{k=0}^{n} \\frac{(-1)^k}{k!} \\to \\frac{1}{e} \\approx 0.368$$`,
};

export default fc;
