import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-20-greeks',
  type: 'formula',
  chapter: 6,
  section: '6.2',
  difficulty: 'hard',
  tags: ['formula', 'finance', 'greeks', 'risk-management'],

  front: `**The Greeks**

Define Delta, Gamma, Theta, Vega, and Rho. State their BS formulas for a European call.`,

  back: `| Greek | Definition | Call Formula |
|-------|-----------|--------------|
| **Delta** $\\Delta$ | $\\partial V/\\partial S$ | $e^{-yT} N(d_1)$ |
| **Gamma** $\\Gamma$ | $\\partial^2 V/\\partial S^2$ | $\\frac{e^{-yT} N'(d_1)}{S\\sigma\\sqrt{T}}$ |
| **Theta** $\\Theta$ | $\\partial V/\\partial t$ | $-\\frac{S\\sigma e^{-yT} N'(d_1)}{2\\sqrt{T}} - rKe^{-rT}N(d_2)$ |
| **Vega** $\\nu$ | $\\partial V/\\partial \\sigma$ | $Se^{-yT}\\sqrt{T}\\,N'(d_1)$ |
| **Rho** $\\rho$ | $\\partial V/\\partial r$ | $KTe^{-rT}N(d_2)$ |

**Key relationships:**
- Gamma always $> 0$ (for long options)
- Vega always $> 0$ (more vol → more value)
- BSM PDE links them: $\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma = rV$ (for delta-neutral portfolio)
- This means **long gamma = short theta** (the fundamental trade-off)

**ATM Delta:** slightly above 0.5 (because $d_1 > 0$ at ATM)
**Near expiry:** Delta approaches step function; Gamma spikes at ATM`,
};

export default fc;
