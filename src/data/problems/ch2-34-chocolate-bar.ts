import { Problem } from '@/lib/types';

const chocolateBar: Problem = {
  id: 'ch2-34-chocolate-bar',
  chapter: 2,
  section: '2.8',
  sectionTitle: 'Math Induction',
  title: 'Chocolate Bar Problem',
  difficulty: 'medium',
  keyTechnique: 'Induction + intuitive counting argument',
  tags: ['induction', 'combinatorics', 'counting', 'proof'],

  setup: `You have a **6×8 chocolate bar** made of 48 individual squares. Each "break" splits one rectangular piece into two rectangles along a straight line.

**How many breaks does it take to separate all 48 squares?**

Prove that this number is the same regardless of the order of breaks.`,

  solution: `**Answer: 47 breaks.**

### Intuitive Proof

Each break takes one piece and turns it into two pieces — increasing the number of pieces by **exactly 1**.

- Start: **1 piece** (the whole bar)
- End: **48 pieces** (all individual squares)
- Increases needed: 48 − 1 = **47**
- Therefore: **47 breaks**, always.

The order of breaks is irrelevant — every break always adds exactly one piece to the count.

### Formal Proof by Induction

Let P(n) = "An m×n chocolate bar requires mn−1 breaks."

**Base case:** A 1×1 bar requires 0 = 1×1−1 breaks. ✓

**Inductive step:** Consider an m×n bar. Split it into an m×k and m×(n−k) piece with one break. By the inductive hypothesis, these require mk−1 and m(n−k)−1 breaks respectively.

Total = 1 + (mk−1) + (m(n−k)−1) = 1 + mk−1 + mn−mk−1 = mn−1. ✓

### Final Answer

**47 breaks** for a 6×8 bar. In general, mn−1 breaks for an m×n bar.`,

  hints: [
    'Don\'t focus on HOW you break it — focus on what changes with each break.',
    'How many pieces are there at the start? At the end? How does each break change the count?',
    'Each break adds exactly 1 piece. How many breaks are needed to go from 1 piece to 48?',
  ],

  finalAnswer: '47 breaks. Each break increases piece count by 1: from 1 to 48 requires exactly 47 breaks, always.',
};

export default chocolateBar;
