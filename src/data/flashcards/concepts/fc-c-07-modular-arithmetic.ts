import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-07-modular-arithmetic',
  type: 'concept',
  chapter: 2,
  section: '2.7',
  difficulty: 'medium',
  tags: ['technique', 'modular-arithmetic', 'number-theory'],

  front: `**Technique: Modular Arithmetic**

Define modular arithmetic and explain its key properties. How is it used to prove impossibility?`,

  back: `**Definition:** $x \bmod y$ = remainder when x is divided by y.

**Key properties:**
- $(x_1 + x_2) \bmod y = ((x_1 \bmod y) + (x_2 \bmod y)) \bmod y$
- If $x_1 \\equiv x_2 \\\pmod{y}$, then $(x_1 - x_2) \bmod y = 0$
- $10 \\equiv 1 \\\pmod{9}$ → digit sum rule
- $10 \\equiv -1 \\\pmod{11}$ → alternating digit sum rule

**As an invariant (proving impossibility):**
Find a quantity mod n that is **preserved** by every operation. If the target state has a different residue → impossible.

**Examples:**
- **Chameleon Colors:** Residues mod 3 of counts always = {0,1,2}. Target (0,0,0) is unreachable.
- **Prisoner Problem:** Parity of visible hats mod 2 (or mod k) encodes and decodes hat colors.
- **Rainbow Hats:** Each prisoner "owns" one residue class mod 7.`,
};

export default fc;
