import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-17-itos-lemma',
  type: 'formula',
  chapter: 5,
  section: '5.4',
  difficulty: 'hard',
  tags: ['formula', 'stochastic-calculus', 'ito'],

  front: `**Itô's Lemma**

State Itô's lemma for $f(X, t)$ where $dX = \\mu\\,dt + \\gamma\\,dW$.`,

  back: `**Itô's Lemma:** If $dX = \\mu(t,X)\\,dt + \\gamma(t,X)\\,dW(t)$, then for $f(X, t)$:

$$df = \\left(\\frac{\\partial f}{\\partial t} + \\mu\\frac{\\partial f}{\\partial X} + \\frac{1}{2}\\gamma^2\\frac{\\partial^2 f}{\\partial X^2}\\right)dt + \\gamma\\frac{\\partial f}{\\partial X}\\,dW$$

**Key difference from ordinary calculus:** The extra $\\frac{1}{2}\\gamma^2 f_{XX}$ term arises because $(dW)^2 = dt$.

**Critical application — $\\ln S$:**
If $dS = rS\\,dt + \\sigma S\\,dW$, then:
$$d(\\ln S) = \\left(r - \\frac{\\sigma^2}{2}\\right)dt + \\sigma\\,dW$$

Therefore: $S_T = S_0 \\exp\\left[\\left(r - \\frac{\\sigma^2}{2}\\right)T + \\sigma W_T\\right]$

**Martingale test:** $f(X,t)$ is a martingale iff the $dt$ coefficient = 0 (no drift).

**Example:** $W^3$ is NOT a martingale because $d(W^3) = 3W\\,dt + 3W^2\\,dW$ has drift $3W\\,dt$.`,
};

export default fc;
