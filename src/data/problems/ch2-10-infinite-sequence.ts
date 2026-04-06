import { Problem } from '@/lib/types';

const infiniteSequence: Problem = {
  id: 'ch2-10-infinite-sequence',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Infinite Sequence',
  difficulty: 'medium',
  keyTechnique: 'Fixed-point equation, self-reference',
  tags: ['algebra', 'fixed-point', 'sequences', 'logic'],

  setup: `If $$x^{x^{x^{x^{\\\\cdots}}}} = 2$$, what is **x**?

(The tower of exponents continues infinitely.)`,

  solution: `**Key insight:** An infinite sequence is self-similar — removing one layer leaves the same infinite sequence.

Since the tower is infinite, the exponent on the first x is itself the same infinite tower, which equals 2.

Therefore:
$$x^{(x^{x^{x^{\\\\cdots}}})} = x^2 = 2$$

Solving:
$$x^2 = 2 \\implies x = \\\sqrt{2}$$

**Verification:** Does $$(\\\sqrt{2})^{(\\\sqrt{2})^{(\\\sqrt{2})^{\\\\cdots}}}$$ actually converge to 2?

Yes. For $$1 < x \\\leq e^{1/e} \\\approx 1.4447$$, the infinite power tower converges. Since $$\\\sqrt{2} \\\approx 1.414 < e^{1/e}$$, the tower converges — and the fixed point is indeed 2.

---

**Final Answer: $$x = \\\sqrt{2}$$**`,

  hints: [
    'If the tower is infinite, what happens when you "peel off" one x from the top?',
    'The entire infinite tower appears in the exponent of the first x. What does that exponent equal?',
    'Set up the equation: x raised to the power of [the whole tower] = 2. Substitute.',
  ],

  finalAnswer: 'x = √2. Since the infinite tower equals 2, x^2 = 2, so x = √2.',
};

export default infiniteSequence;
