import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-17-indicator-variables',
  type: 'concept',
  chapter: 4,
  section: '4.1',
  difficulty: 'easy',
  tags: ['technique', 'probability', 'expected-value'],

  front: `**Technique: Indicator Random Variables**

What are indicator variables, and why are they the single most useful trick in probability interviews?`,

  back: `**Definition:** $I_A = \\begin{cases} 1 & \\text{if event } A \\text{ occurs} \\\\ 0 & \\text{otherwise} \\end{cases}$

**Key property:** $E[I_A] = P(A)$

**Power:** Decompose complex counts into sums of indicators:
$$X = \\sum_{i} I_{A_i} \\implies E[X] = \\sum_{i} P(A_i)$$

**This works even when the $I_{A_i}$ are dependent!** (Linearity of expectation)

**Classic applications:**
- **Birthday problem:** $E[\\text{collisions}] = \\binom{n}{2} \\cdot \\frac{1}{365}$
- **Coupon collector:** $E[T] = n \\cdot H_n = n(1 + 1/2 + \\cdots + 1/n)$
- **Derangements:** $E[\\text{fixed points}] = \\sum_{i=1}^n \\frac{1}{n} = 1$
- **Connecting Noodles:** $E[\\text{loops}] = 1 + 1/3 + 1/5 + \\cdots$

**Interview tip:** When you see "expected number of…", immediately think indicators.`,
};

export default fc;
