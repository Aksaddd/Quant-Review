import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-12-combinatorics',
  type: 'formula',
  chapter: 4,
  section: '4.2',
  difficulty: 'easy',
  tags: ['formula', 'combinatorics', 'probability'],

  front: `**Combinatorics Formulas**

State the formulas for permutations, combinations, and the binomial theorem.`,

  back: `**Permutations** (order matters):
$$P(n, r) = \\frac{n!}{(n-r)!}$$

**Combinations** (order doesn't matter):
$$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$

**Binomial theorem:**
$$(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k y^{n-k}$$

**Multinomial coefficient:**
$$\\frac{n!}{n_1! \\cdot n_2! \\cdots n_r!}$$

**Useful identities:**
- $\\binom{n}{k} = \\binom{n}{n-k}$
- $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ (Pascal's rule)
- $\\sum_{k=0}^n \\binom{n}{k} = 2^n$

**Stars and bars:** $\\binom{n+k-1}{k-1}$ ways to distribute $n$ identical items into $k$ bins.`,
};

export default fc;
