import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-13-taylor-series',
  type: 'concept',
  chapter: 3,
  section: '3.4',
  difficulty: 'medium',
  tags: ['technique', 'approximation', 'calculus'],

  front: `**Technique: Taylor Series Expansion**

State the Taylor series formula and list the key expansions used in quant interviews.`,

  back: `**General formula** around $x = a$:
$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$

**Must-know expansions** (around $x = 0$):

$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$

$$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots \\quad (|x| \\le 1)$$

$$\\frac{1}{1-x} = 1 + x + x^2 + x^3 + \\cdots \\quad (|x| < 1)$$

$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$$

**Key inequality:** $e^x > 1 + x$ for all $x > 0$

**Application:** Proving $e^\\pi > \\pi^e$ by setting $x = \\pi/e - 1$`,
};

export default fc;
