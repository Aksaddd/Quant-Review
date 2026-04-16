import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-11-logarithmic-differentiation',
  type: 'concept',
  chapter: 3,
  section: '3.1',
  difficulty: 'medium',
  tags: ['technique', 'derivatives', 'calculus'],

  front: `**Technique: Logarithmic Differentiation**

How do you differentiate functions of the form $y = f(x)^{g(x)}$?`,

  back: `**Steps:**
1. Take $\\ln$ of both sides: $\\ln y = g(x) \\cdot \\ln(f(x))$
2. Differentiate both sides w.r.t. $x$, using $(1/y) \\cdot dy/dx$ on the left
3. Apply the product rule on the right
4. Multiply both sides by $y$ to isolate $dy/dx$

**Example:** $y = (\\ln x)^{\\ln x}$

$\\ln y = \\ln x \\cdot \\ln(\\ln x)$

$$\\frac{1}{y}\\frac{dy}{dx} = \\frac{\\ln(\\ln x)}{x} + \\frac{1}{x}$$

$$\\frac{dy}{dx} = (\\ln x)^{\\ln x} \\cdot \\frac{\\ln(\\ln x) + 1}{x}$$

**When to use:** Any time the variable appears in both the base AND the exponent.`,
};

export default fc;
