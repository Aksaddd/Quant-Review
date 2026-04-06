import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-08-trailing-zeros',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'easy',
  tags: ['number-theory', 'factorization'],
  problemId: 'ch2-08-trailing-zeros',

  front: `**Trailing Zeros**

**How many trailing zeros does 100! have?**`,

  back: `**Key insight:** Trailing zeros come from 10 = 2×5. Factors of 2 always outnumber 5s, so count factors of **5** only.

**Legendre's formula** — count multiples of powers of 5:

$$\\\lfloor 100/5 \\\rfloor + \\\lfloor 100/25 \\\rfloor + \\\lfloor 100/125 \\\rfloor + \\\\cdots$$
$$= 20 + 4 + 0 = \\mathbf{24}$$

**Answer: 24 trailing zeros.**

*General formula for n!: Σ ⌊n/5^k⌋ for k = 1, 2, 3, …*`,
};

export default fc;
