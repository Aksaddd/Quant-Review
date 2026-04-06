import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-17-quant-salary',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'easy',
  tags: ['logic', 'cryptography', 'privacy'],
  problemId: 'ch2-17-quant-salary',

  front: `**Quant Salary**

8 quants want to compute their **average salary** without anyone revealing their own salary.

**How?**`,

  back: `**Random masking protocol:**

1. Quant 1 picks secret random number **R**, computes R + S₁, passes it on
2. Each quant adds their salary to the running total, passes it on
3. Total returns to Quant 1 as: R + S₁ + S₂ + … + S₈
4. Quant 1 subtracts **R** → gets true total
5. Divide by 8 → **average salary**

No one ever sees anyone else's raw salary. Intermediate values are masked by R.

*Used in practice to anonymize fund position data.*`,
};

export default fc;
