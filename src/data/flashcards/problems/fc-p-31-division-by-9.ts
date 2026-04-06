import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-31-division-by-9',
  type: 'problem',
  chapter: 2,
  section: '2.7',
  difficulty: 'easy',
  tags: ['modular-arithmetic', 'number-theory', 'proof'],
  problemId: 'ch2-31-division-by-9',

  front: `**Division by 9**

Prove: An integer is divisible by 9 **if and only if** its **digit sum** is divisible by 9.

*(State the analogous rule for 11.)*`,

  back: `**Proof:** Since $10 \\equiv 1 \\\pmod{9}$, we have $10^k \\equiv 1^k = 1 \\\pmod{9}$ for all k.

So: $a = \\sum a_k \\cdot 10^k \\equiv \\sum a_k \\cdot 1 = \\text{digit sum} \\\pmod{9}$

Therefore $a \\equiv \\text{digit sum} \\\pmod{9}$ — divisible by 9 iff digit sum is. ∎

**Rule for 11:** Since $10 \\equiv -1 \\\pmod{11}$, use the **alternating digit sum** ($a_0 - a_1 + a_2 - \\\cdots$). Divisible by 11 iff alternating digit sum is divisible by 11.`,
};

export default fc;
