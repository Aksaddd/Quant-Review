import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-10-lhospitals-rule',
  type: 'concept',
  chapter: 3,
  section: '3.1',
  difficulty: 'easy',
  tags: ['technique', 'limits', 'calculus'],

  front: `**Technique: L'Hôpital's Rule**

When can you apply L'Hôpital's rule, and what does it state?`,

  back: `**When to use:** When a limit has an **indeterminate form** — either $0/0$ or $\\infty/\\infty$.

**Statement:** If $\\lim_{x \\to a} f(x)/g(x)$ is indeterminate ($0/0$ or $\\infty/\\infty$), then:
$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$

provided the right-hand limit exists.

**Key tricks:**
- $0 \\cdot \\infty$ form: rewrite as $f/(1/g)$ to get $\\infty/\\infty$
- $\\infty - \\infty$ form: combine into a single fraction first
- May need to apply the rule **multiple times**

**Example:** $\\lim_{x \\to \\infty} e^x/x^2 = \\lim e^x/(2x) = \\lim e^x/2 = \\infty$

**Dominance hierarchy:** $e^x \\gg x^n \\gg \\ln x$ as $x \\to \\infty$`,
};

export default fc;
