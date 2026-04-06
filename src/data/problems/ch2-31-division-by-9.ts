import { Problem } from '@/lib/types';

const divisionBy9: Problem = {
  id: 'ch2-31-division-by-9',
  chapter: 2,
  section: '2.7',
  sectionTitle: 'Modular Arithmetic',
  title: 'Division by 9',
  difficulty: 'easy',
  keyTechnique: 'Modular arithmetic proof, digit sum',
  tags: ['modular-arithmetic', 'number-theory', 'proof', 'arithmetic'],

  setup: `**Prove** that an integer is divisible by 9 if and only if the **sum of its digits** is divisible by 9.

**Bonus:** State the analogous rule for divisibility by 11.`,

  solution: `**Proof:**

Write the integer as:
$$a = a_n \\\cdot 10^n + a_{n-1} \\\cdot 10^{n-1} + \\\\cdots + a_1 \\\cdot 10 + a_0$$

where $a_0, a_1, \\ldots, a_n$ are its digits.

Define the digit sum:
$$b = a_n + a_{n-1} + \\\\cdots + a_1 + a_0$$

Compute the difference:
$$a - b = a_n(10^n - 1) + a_{n-1}(10^{n-1} - 1) + \\\\cdots + a_1(10 - 1)$$

Each term $(10^k - 1)$ is divisible by 9:
- $10 - 1 = 9$
- $100 - 1 = 99 = 9 \\\times 11$
- $1000 - 1 = 999 = 9 \\\times 111$
- In general: $10^k - 1 = \\underbrace{99\\ldots9}_{k} = 9 \\\times \\underbrace{11\\ldots1}_{k}$ ✓

Therefore **a − b is divisible by 9**. This means: a ≡ b (mod 9).

So a is divisible by 9 **if and only if** b (the digit sum) is divisible by 9. ∎

---

**Bonus — Divisibility by 11:**

Use alternating signs: $a_0 - a_1 + a_2 - a_3 + \\\\cdots$

This works because $10 \\\equiv -1 \\\\pmod{11}$, so $10^k \\\equiv (-1)^k \\\\pmod{11}$.

---

**Final Answer:** Proven. a ≡ digit_sum(a) (mod 9), because 10^k ≡ 1 (mod 9) for all k.`,

  hints: [
    'Write the number in terms of its digits and powers of 10.',
    'What is 10 mod 9? What about 100 mod 9? 1000 mod 9?',
    'Since 10 ≡ 1 (mod 9), every 10^k ≡ 1 (mod 9). What does that imply about the whole number?',
  ],

  finalAnswer: 'Since 10^k ≡ 1 (mod 9) for all k, a number ≡ sum of its digits (mod 9). Divisible by 9 iff digit sum divisible by 9.',
};

export default divisionBy9;
