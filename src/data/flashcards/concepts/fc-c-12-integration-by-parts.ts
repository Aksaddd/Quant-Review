import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-12-integration-by-parts',
  type: 'concept',
  chapter: 3,
  section: '3.2',
  difficulty: 'easy',
  tags: ['technique', 'integration', 'calculus'],

  front: `**Technique: Integration by Parts**

State the formula and the strategy for choosing $u$ and $dv$.`,

  back: `**Formula:**
$$\\int u\\,dv = uv - \\int v\\,du$$

**LIATE rule** for choosing $u$ (pick the first that appears):
1. **L**ogarithmic: $\\ln x$
2. **I**nverse trig: $\\arctan x$
3. **A**lgebraic: $x^n$
4. **T**rig: $\\sin x, \\cos x$
5. **E**xponential: $e^x$

**Classic examples:**
- $\\int \\ln x\\,dx$: let $u = \\ln x$, $dv = dx$ → $x\\ln x - x + c$
- $\\int x e^x\\,dx$: let $u = x$, $dv = e^x dx$ → $xe^x - e^x + c$

**Key result:** $\\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + c$`,
};

export default fc;
