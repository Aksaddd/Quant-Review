import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-18-black-scholes',
  type: 'formula',
  chapter: 6,
  section: '6.1',
  difficulty: 'hard',
  tags: ['formula', 'finance', 'options', 'black-scholes'],

  front: `**Black-Scholes Formula**

State the Black-Scholes pricing formulas for European call and put options (with dividend yield $y$).`,

  back: `**European Call:**
$$c = S e^{-yT} N(d_1) - K e^{-rT} N(d_2)$$

**European Put:**
$$p = K e^{-rT} N(-d_2) - S e^{-yT} N(-d_1)$$

**Where:**
$$d_1 = \\frac{\\ln(S/K) + (r - y + \\sigma^2/2)T}{\\sigma\\sqrt{T}}$$
$$d_2 = d_1 - \\sigma\\sqrt{T}$$

**Assumptions:**
- Geometric Brownian Motion: $dS = (r-y)S\\,dt + \\sigma S\\,dW$
- Constant $r$, $\\sigma$, continuous trading, no transaction costs

**BSM PDE (risk-neutral world):**
$$\\frac{\\partial V}{\\partial t} + rS\\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} = rV$$

**ATM approximation** ($S = K$, small $T$):
$$c \\approx 0.4 \\cdot \\sigma \\cdot S \\cdot \\sqrt{T}$$`,
};

export default fc;
