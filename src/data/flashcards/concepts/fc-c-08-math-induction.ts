import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-08-math-induction',
  type: 'concept',
  chapter: 2,
  section: '2.8',
  difficulty: 'medium',
  tags: ['technique', 'induction', 'proof'],

  front: `**Technique: Mathematical Induction**

State the steps for a proof by induction. What is strong induction and when do you use it?`,

  back: `**Proof by Induction — 3 steps:**

1. **State** you're using induction and define predicate P(n)
2. **Base case:** Prove P(1) (or the smallest applicable n) is true
3. **Inductive step:** Assume P(n) is true → prove P(n+1) is true

**Strong (Complete) Induction:**
In step 3, assume P(1), P(2), …, P(n) are **all true** → prove P(n+1).
Use when P(n+1) depends on multiple earlier values (not just P(n)).

**Chapter 2 examples:**
- **Coin Split:** f(N) = x(N−x) + f(x) + f(N−x) → strong induction proves f(n) = n(n−1)/2
- **Race Track:** Reduce n+1 cans to n cans by merging; apply inductive hypothesis
- **Chocolate Bar:** Each break adds 1 piece → mn−1 total breaks (inductive counting)

**Interview tip:** If the formula works for n=2, 3, 4 and you can write the recurrence, induction is usually the right tool.`,
};

export default fc;
