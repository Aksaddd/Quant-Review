import { Problem } from '@/lib/types';

const rainbowHats: Problem = {
  id: 'ch2-37-rainbow-hats',
  chapter: 2,
  section: '2.9',
  sectionTitle: 'Proof by Contradiction',
  title: 'Rainbow Hats',
  difficulty: 'hard',
  keyTechnique: 'Modular arithmetic + proof by contradiction',
  tags: ['modular-arithmetic', 'contradiction', 'proof', 'strategy', 'logic'],

  setup: `**7 prisoners** are each given a hat. The executioner chooses from **7 colors** (the 7 rainbow colors) for each hat, independently. Each prisoner can see **all other 6 hats** but not their own. They cannot communicate after hats are placed.

Each prisoner must **simultaneously write down** their guess for their own hat color.

**If at least one prisoner guesses correctly, all 7 go free.** Otherwise they are executed.

**Design a strategy that guarantees freedom, regardless of the hat assignment.**`,

  solution: `### Strategy: Modular Arithmetic Assignment

Assign color codes 0–6 to the 7 colors. Label prisoners 0–6.

**Each prisoner i's strategy:**

Prisoner i guesses the color $g_i$ such that:
$$g_i + \\sum_{j \\neq i} x_j \\equiv i \\pmod{7}$$

where $x_j$ is the hat color code of prisoner j (which prisoner i can see).

In other words: prisoner i guesses $g_i = (i - \\sum_{j \\neq i} x_j) \\bmod 7$.

### Proof by Contradiction

Let the true hat codes be $x_0, x_1, \\ldots, x_6$. Define:
$$S = \\sum_{k=0}^{6} x_k \\pmod{7}$$

S must equal some value $r \\in \\{0, 1, 2, 3, 4, 5, 6\\}$.

Prisoner $r$ guesses: $g_r = (r - \\sum_{j \\neq r} x_j) \\bmod 7$

We need to show $g_r = x_r$:
$$g_r = r - \\sum_{j \\neq r} x_j = r - (S - x_r) \\equiv r - S + x_r \\pmod 7$$

Since $S \\equiv r$: $g_r \\equiv r - r + x_r = x_r \\pmod 7$ ✓

**Assume for contradiction** that all 7 guesses are wrong: $g_i \\neq x_i$ for all i.

Then in particular, prisoner $r$ (whose guess is exactly $x_r$) also guessed wrong — a contradiction. ∎

**Therefore at least one prisoner (prisoner r) always guesses correctly.**

### Final Answer

Prisoner i guesses $(i − \\sum_{j≠i} x_j) \\bmod 7$. Prisoner r (where r = total sum mod 7) always guesses correctly. All 7 go free.`,

  hints: [
    'Assign numbers 0–6 to colors and 0–6 to prisoners. Think about modular arithmetic.',
    'What if each prisoner "assumes" the sum of all hats mod 7 equals their prisoner number?',
    'Exactly one prisoner will have the right assumption about the sum. That prisoner guesses correctly.',
  ],

  finalAnswer: 'Prisoner i guesses (i − visible_sum) mod 7. The prisoner whose number equals the true total sum mod 7 is guaranteed to be correct.',
};

export default rainbowHats;
