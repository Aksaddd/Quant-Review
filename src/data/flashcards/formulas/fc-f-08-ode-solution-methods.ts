import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-08-ode-solution-methods',
  type: 'formula',
  chapter: 3,
  section: '3.5',
  difficulty: 'medium',
  tags: ['formula', 'ode', 'differential-equations'],

  front: `**ODE Solution Methods**

How do you solve: (1) separable ODEs, (2) first-order linear ODEs, (3) second-order constant-coefficient ODEs?`,

  back: `**1. Separable:** $dy/dx = f(x)g(y)$
$$\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx$$

**2. First-order linear:** $y' + P(x)y = Q(x)$

Integrating factor: $\\mu(x) = e^{\\int P(x)\\,dx}$
$$y = \\frac{1}{\\mu(x)}\\int \\mu(x)Q(x)\\,dx$$

**3. Second-order constant-coefficient:** $ay'' + by' + cy = 0$

Characteristic equation: $ar^2 + br + c = 0$
- **Two real roots** $r_1, r_2$: $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$
- **Repeated root** $r$: $y = (C_1 + C_2 x)e^{rx}$
- **Complex roots** $\\alpha \\pm \\beta i$: $y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$

**Nonhomogeneous** ($= f(x)$): general = homogeneous + particular`,
};

export default fc;
