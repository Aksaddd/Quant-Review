import { Problem } from '@/lib/types';

const trailingZeros: Problem = {
  id: 'ch2-08-trailing-zeros',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Trailing Zeros',
  difficulty: 'easy',
  keyTechnique: 'Prime factorization, counting factors of 5',
  tags: ['number-theory', 'factorization', 'logic', 'arithmetic'],

  setup: `**How many trailing zeros does 100! (100 factorial) have?**`,

  solution: `**Key insight:** Trailing zeros come from factors of **10 = 2 × 5**. Since factors of 2 far outnumber factors of 5 in any factorial, we only need to count how many times **5** divides into 100!

**Counting factors of 5 in 100!:**

Every multiple of 5 contributes at least one factor of 5:
- Multiples of 5 in [1, 100]: **100 / 5 = 20** numbers

But multiples of 25 = 5² contribute an *extra* factor of 5:
- Multiples of 25 in [1, 100]: **100 / 25 = 4** numbers (25, 50, 75, 100)

Multiples of 125 = 5³ would contribute yet another, but **125 > 100**, so there are none.

**Total factors of 5 = 20 + 4 = 24**

**General formula (Legendre's formula):**
$$\\lfloor n/5 \\rfloor + \\lfloor n/25 \\rfloor + \\lfloor n/125 \\rfloor + \\cdots$$

For n = 100: 20 + 4 + 0 = **24**

---

**Final Answer: 24 trailing zeros.**`,

  hints: [
    'Trailing zeros come from pairs of 2 and 5 in the prime factorization. Which is the limiting factor?',
    'Count how many multiples of 5 are in [1, 100]. Don\'t forget that 25, 50, 75, 100 contribute an extra factor.',
    'Apply Legendre\'s formula: sum of floor(100/5^k) for k = 1, 2, 3, ...',
  ],

  finalAnswer: '24 trailing zeros.',
};

export default trailingZeros;
