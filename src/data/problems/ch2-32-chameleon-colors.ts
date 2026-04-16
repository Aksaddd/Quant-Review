import { Problem } from '@/lib/types';

const chameleonColors: Problem = {
  id: 'ch2-32-chameleon-colors',
  chapter: 2,
  section: '2.7',
  sectionTitle: 'Modular Arithmetic',
  title: 'Chameleon Colors',
  difficulty: 'hard',
  keyTechnique: 'Modular invariant, impossibility proof',
  tags: ['modular-arithmetic', 'invariants', 'proof', 'combinatorics'],

  setup: `A remote island has chameleons of three colors:
- **13 red**
- **15 green**
- **17 blue**

When **two chameleons of different colors meet**, both instantly change to the **third color**.

*Example: A red and a green meet → both become blue.*

**Can all chameleons ever be the same color?**`,

  solution: `**Answer: No.**

### Finding the Modular Invariant

Label the colors with residues: Red = 0, Green = 1, Blue = 2 (mod 3).

Examine what happens when two different-colored chameleons meet. Consider a meeting between a Red (0) and a Green (1) — both become Blue (2):
- Red count: decreases by 1
- Green count: decreases by 1
- Blue count: increases by 2

In terms of mod 3 residues of the **counts**:
- Starting: Red = 13 ≡ 1, Green = 15 ≡ 0, Blue = 17 ≡ 2 (mod 3)
- The three residues form the set **{0, 1, 2}** — all different.

### Why the Target State Is Unreachable

For all chameleons to be the same color, we'd need one count = 45 and the other two = 0:
- (45, 0, 0) → residues (0, 0, 0)

But we need to check: can the residue set **{0, 1, 2}** ever reach **{0, 0, 0}**?

**Key observation:** In any meeting, the three counts change as (r, g, b) → (r−1, g−1, b+2) or a permutation. The **multiset of residues mod 3 of the three counts** is invariant — it stays {0, 1, 2} (all distinct) throughout all interactions.

Since {0, 0, 0} ≠ {0, 1, 2}, the all-same state is **unreachable**.

### Final Answer

**No.** The modular invariant (residues of counts are always {0,1,2} mod 3) is preserved under every meeting, and the target state (0,0,0) violates it.`,

  hints: [
    'Try small cases: can (1, 0, 2) chameleons reach (3, 0, 0)?',
    'Look at the counts modulo 3. What happens to (red mod 3, green mod 3, blue mod 3) after each meeting?',
    'Does the set of three residues ever change? What does (0, 0, 0) look like modulo 3?',
  ],

  finalAnswer: 'No. The set {13 mod 3, 15 mod 3, 17 mod 3} = {1, 0, 2} is invariant under all meetings. The all-same state requires residues (0,0,0) — impossible.',
};

export default chameleonColors;
