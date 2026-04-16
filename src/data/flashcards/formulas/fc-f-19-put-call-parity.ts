import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-19-put-call-parity',
  type: 'formula',
  chapter: 6,
  section: '6.1',
  difficulty: 'medium',
  tags: ['formula', 'finance', 'options', 'arbitrage'],

  front: `**Put-Call Parity**

State put-call parity for European and American options. Why does it hold?`,

  back: `**European (no dividends):**
$$c + Ke^{-rT} = p + S$$

**European (with dividends $D$):**
$$c + Ke^{-rT} = p + S - D$$

**American (inequality):**
$$S - D - K \\leq C - P \\leq S - Ke^{-rT}$$

**Why it holds:** Two portfolios with identical payoff at maturity must have the same price today (no-arbitrage).

Portfolio A: Long call + $Ke^{-rT}$ cash
Portfolio B: Long put + one share

Both pay $\\max(S_T, K)$ at time $T$.

**Arbitrage detection:** If $c + Ke^{-rT} \\neq p + S$:
- If LHS > RHS: Sell call, buy put + stock, borrow
- If RHS > LHS: Buy call, sell put + stock, lend

**Key insight:** Put-call parity holds regardless of the model — it's a pure no-arbitrage result.`,
};

export default fc;
