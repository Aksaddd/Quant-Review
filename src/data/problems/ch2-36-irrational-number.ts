import { Problem } from '@/lib/types';

const irrationalNumber: Problem = {
  id: 'ch2-36-irrational-number',
  chapter: 2,
  section: '2.9',
  sectionTitle: 'Proof by Contradiction',
  title: 'Irrational Number (√2)',
  difficulty: 'easy',
  keyTechnique: 'Proof by contradiction, infinite descent',
  tags: ['proof', 'contradiction', 'number-theory', 'classic'],

  setup: `**Prove that √2 is irrational.**`,

  solution: `### Setting Up the Contradiction

**Assume** √2 is rational. Then it can be written as:
$$\\sqrt{2} = \\frac{m}{n}$$
where m and n are integers with **no common factors** (the fraction is in lowest terms, gcd(m, n) = 1).

### Deriving the Contradiction

**Step 1:** Square both sides:
$$2 = \\frac{m^2}{n^2} \\implies m^2 = 2n^2$$

So $m^2$ is even → **m is even** (since odd² is always odd).

**Step 2:** Write m = 2k for some integer k:
$$m^2 = 4k^2 = 2n^2 \\implies n^2 = 2k^2$$

So $n^2$ is even → **n is even**.

**Step 3:** Both m and n are even → they share the common factor **2**.

This **contradicts** our assumption that gcd(m, n) = 1.

Therefore, √2 cannot be rational — it is **irrational**. ∎

### Final Answer

√2 is irrational. The proof by contradiction shows that assuming m/n in lowest terms leads to both m and n being even — a contradiction.`,

  hints: [
    'Assume √2 = m/n in lowest terms. Square both sides.',
    'If m² = 2n², what can you say about m? Write m = 2k and substitute.',
    'What does this force n to be? Does that contradict your assumption?',
  ],

  finalAnswer: 'Proven by contradiction. Assuming √2 = m/n (lowest terms) leads to both m and n being even, contradicting gcd(m,n)=1.',
};

export default irrationalNumber;
