import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-07-integration-formulas',
  type: 'formula',
  chapter: 3,
  section: '3.2',
  difficulty: 'easy',
  tags: ['formula', 'integration', 'calculus'],

  front: `**Essential Integration Formulas**

State the key integration results needed for quant interviews.`,

  back: `**Fundamental Theorem of Calculus:**
$$\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{where } F'(x) = f(x)$$

**Power rule:** $\\int u^k\\,du = \\frac{u^{k+1}}{k+1} + c \\quad (k \\neq -1)$

**Key integrals:**
$$\\int \\ln x\\,dx = x\\ln x - x + c$$
$$\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax} + c$$
$$\\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + c$$

**Gaussian integral:**
$$\\int_{-\\infty}^{\\infty} e^{-x^2/2}\\,dx = \\sqrt{2\\pi}$$

**Substitution:** $\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du$

**Integration by parts:** $\\int u\\,dv = uv - \\int v\\,du$`,
};

export default fc;
