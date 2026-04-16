import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-19-gamblers-ruin',
  type: 'concept',
  chapter: 4,
  section: '4.3',
  difficulty: 'medium',
  tags: ['technique', 'probability', 'random-walk'],

  front: `**Gambler's Ruin Problem**

A gambler starts with \\$i and wins/loses \\$1 each round with probability $p$/$q$. What is the probability of reaching \\$N before going broke?`,

  back: `**Fair game** ($p = q = 1/2$):
$$P_i = \\frac{i}{N}$$

**Unfair game** ($p \\neq q$, let $r = q/p$):
$$P_i = \\frac{1 - r^i}{1 - r^N}$$

**Expected duration (fair game):**
$$E[T_i] = i(N - i)$$

**Derivation approach:** First-step analysis.
- $P_i = pP_{i+1} + qP_{i-1}$
- Boundary: $P_0 = 0$, $P_N = 1$
- Solve the recurrence → characteristic equation

**Key insight:** Even with $p = 0.49$ (slight house edge), ruin probability is very high. With $i = 50$, $N = 100$, $P_{\\text{ruin}} \\approx 88\\%$.

**Finance application:** Models the probability of a trading strategy going bust before reaching a profit target.`,
};

export default fc;
