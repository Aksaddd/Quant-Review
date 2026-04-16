import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-15-lagrange-multipliers',
  type: 'concept',
  chapter: 3,
  section: '3.4',
  difficulty: 'medium',
  tags: ['technique', 'optimization', 'calculus'],

  front: `**Technique: Lagrange Multipliers**

How do you find the extremum of $f(x,y)$ subject to a constraint $g(x,y) = 0$?`,

  back: `**Method:** Solve the system:
$$\\nabla f = \\lambda \\nabla g \\quad \\text{and} \\quad g(x,y) = 0$$

Equivalently, define the **Lagrangian**:
$$\\mathcal{L}(x,y,\\lambda) = f(x,y) - \\lambda \\cdot g(x,y)$$

Set all partial derivatives to zero:
$$\\frac{\\partial \\mathcal{L}}{\\partial x} = 0, \\quad \\frac{\\partial \\mathcal{L}}{\\partial y} = 0, \\quad \\frac{\\partial \\mathcal{L}}{\\partial \\lambda} = 0$$

**Interpretation:** At the extremum, the gradient of $f$ is parallel to the gradient of $g$ (the constraint surface).

**Application:** Finding the closest point on a plane to the origin — minimize $x^2 + y^2 + z^2$ subject to $ax + by + cz = d$.

**Result:** Distance $= |d| / \\sqrt{a^2 + b^2 + c^2}$`,
};

export default fc;
