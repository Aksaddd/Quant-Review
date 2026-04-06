import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-37-rainbow-hats',
  type: 'problem',
  chapter: 2,
  section: '2.9',
  difficulty: 'hard',
  tags: ['modular-arithmetic', 'contradiction', 'strategy'],
  problemId: 'ch2-37-rainbow-hats',

  front: `**Rainbow Hats**

7 prisoners, 7 possible hat colors (0–6). Each sees all others' hats, writes their guess simultaneously. If **at least one** is correct, all go free.

**Design a guaranteed strategy.**`,

  back: `**Strategy:** Prisoner i guesses:
$$g_i = \left(i - \sum_{j \neq i} x_j\right) \bmod 7$$

**Why it works:** The true sum $S = \sum x_k \bmod 7$ equals some $r \in \{0,\ldots,6\}$.

Prisoner r's guess: $(r - (S - x_r)) \bmod 7 = (r - S + x_r) \bmod 7 = x_r$ ✓

**Proof by contradiction:** If all 7 guess wrong, prisoner r also guessed wrong — but we just showed prisoner r is always correct. Contradiction. ∎

**All 7 always go free.**`,
};

export default fc;
