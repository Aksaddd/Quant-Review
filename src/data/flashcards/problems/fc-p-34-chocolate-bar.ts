import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-34-chocolate-bar',
  type: 'problem',
  chapter: 2,
  section: '2.8',
  difficulty: 'medium',
  tags: ['induction', 'counting'],
  problemId: 'ch2-34-chocolate-bar',

  front: `**Chocolate Bar Problem**

A 6×8 chocolate bar. Each break splits one piece into two along a straight line.

**How many breaks to separate all 48 squares? Does order matter?**`,

  back: `**Answer: 47 breaks. Order never matters.**

**Intuitive proof:** Each break increases the number of pieces by **exactly 1**.

- Start: 1 piece
- End: 48 pieces
- Increases needed: 48 − 1 = **47**

Every break contributes exactly 1 to the piece count regardless of which piece you break or how. The final answer is always **mn − 1** for an m×n bar.

**6×8:** 6×8 − 1 = **47** ✓`,
};

export default fc;
