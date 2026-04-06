import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-32-chameleon-colors',
  type: 'problem',
  chapter: 2,
  section: '2.7',
  difficulty: 'hard',
  tags: ['modular-arithmetic', 'invariants', 'proof'],
  problemId: 'ch2-32-chameleon-colors',

  front: `**Chameleon Colors**

Island: **13 red, 15 green, 17 blue** chameleons. When two different-colored meet, both change to the third color.

**Can all chameleons ever become one color?**`,

  back: `**No — proven by modular invariant.**

Initial counts mod 3: **13≡1, 15≡0, 17≡2** → residue set = **{0, 1, 2}** (all distinct).

Any meeting (e.g., red+green→both blue): counts change by (−1, −1, +2). In mod 3: residues permute but remain **one each of {0, 1, 2}**.

For all-same color we'd need counts like (45, 0, 0) → residues **(0, 0, 0)**.

But {0,0,0} ≠ {0,1,2} — the invariant is never broken. **Impossible.** ∎`,
};

export default fc;
