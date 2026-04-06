import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-36-irrational-number',
  type: 'problem',
  chapter: 2,
  section: '2.9',
  difficulty: 'easy',
  tags: ['proof', 'contradiction', 'number-theory'],
  problemId: 'ch2-36-irrational-number',

  front: `**Irrational Number**

**Prove that $\\sqrt{2}$ is irrational.**`,

  back: `**Proof by contradiction:**

Assume $\\sqrt{2} = m/n$ in lowest terms (gcd(m,n)=1).

1. $m^2 = 2n^2$ → m² is even → **m is even**. Write m = 2k.
2. $4k^2 = 2n^2$ → $n^2 = 2k^2$ → n² is even → **n is even**.
3. Both m and n are even → gcd(m,n) ≥ 2.

This **contradicts** gcd(m,n) = 1. Therefore $\\sqrt{2}$ is irrational. ∎`,
};

export default fc;
