import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-24-american-options',
  type: 'concept',
  chapter: 6,
  section: '6.1',
  difficulty: 'medium',
  tags: ['technique', 'finance', 'options'],

  front: `**American vs European Options**

When should you exercise an American option early? Why never for a call on a non-dividend stock?`,

  back: `**American call (no dividends) — never exercise early:**

Three arguments:
1. **Time value:** Option value $\\geq$ intrinsic value (convexity of payoff)
2. **Dominance:** Holding option + lending $K$ dominates exercising
3. **Jensen's inequality:** $E[\\max(S_T - K, 0)] > \\max(E[S_T] - K, 0)$

**Therefore:** American call = European call (no dividends)

**American put — may exercise early:**
- Deep ITM: $K - S$ now > discounted expected future value
- Interest on $K$ received immediately outweighs time value
- **Optimal exercise boundary:** $S^* < K$ where early exercise is optimal

**With dividends:**
- American call may exercise early **just before** ex-dividend date
- If dividend $> K(1 - e^{-r\\Delta t})$, exercise is optimal

**Option price direction:**
| Factor ↑ | Call | Put |
|----------|------|-----|
| $S$ | ↑ | ↓ |
| $K$ | ↓ | ↑ |
| $\\sigma$ | ↑ | ↑ |
| $r$ | ↑ | ↓ |`,
};

export default fc;
