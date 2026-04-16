import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-06-derivative-rules',
  type: 'formula',
  chapter: 3,
  section: '3.1',
  difficulty: 'easy',
  tags: ['formula', 'derivatives', 'calculus'],

  front: `**Core Derivative Formulas**

State the derivative rules for: product, quotient, chain rule, and the key exponential/log derivatives.`,

  back: `**Product rule:** $(uv)' = u'v + uv'$

**Quotient rule:** $(u/v)' = (u'v - uv')/v^2$

**Chain rule:** $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$

**Key derivatives:**
$$\\frac{d}{dx}(e^u) = e^u \\cdot u'$$
$$\\frac{d}{dx}(a^u) = a^u \\cdot \\ln a \\cdot u'$$
$$\\frac{d}{dx}(\\ln u) = \\frac{u'}{u}$$

**Must-know limits:**
- $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
- $\\lim_{x \\to 0} (1 + kx)^{1/x} = e^k$
- $e^x = \\lim_{n \\to \\infty} (1 + x/n)^n$`,
};

export default fc;
