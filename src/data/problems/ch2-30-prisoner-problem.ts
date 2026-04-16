import { Problem } from '@/lib/types';

const prisonerProblem: Problem = {
  id: 'ch2-30-prisoner-problem',
  chapter: 2,
  section: '2.7',
  sectionTitle: 'Modular Arithmetic',
  title: 'Prisoner Problem (Hat Colors)',
  difficulty: 'hard',
  keyTechnique: 'Parity tracking, modular arithmetic strategy',
  tags: ['modular-arithmetic', 'strategy', 'parity', 'logic'],

  setup: `**100 prisoners** are each given a hat — either **red** or **blue**. Each prisoner can see all other prisoners' hats but **not their own**. They are called out one at a time (randomly) and must **guess their hat color aloud** — all others can hear.

A prisoner who guesses correctly is **freed**; otherwise **executed**.

**Design a strategy to save as many prisoners as possible.** What is the maximum number guaranteed to survive?

**Extension:** What if there are 3 hat colors (red, green, blue)?`,

  solution: `### Strategy for 2 Colors: Parity Encoding

**Setup:** Before the game, prisoners agree: *"Prisoner 1 will announce the color that makes the total number of red hats he sees ODD."*

- **Prisoner 1** counts the red hats he sees. If **odd**, he says "red." If **even**, he says "blue."
  - Prisoner 1 has a 50/50 chance — he may be executed.
- **Each subsequent prisoner** uses the running information:
  - They know the parity prisoner 1 announced.
  - They can see everyone else's hats.
  - They can infer their own hat color with certainty.
  - **All 99 are guaranteed to survive.**

**Guarantee: At least 99 prisoners are saved.**

### Extension to 3 Colors

Assign: red=0, green=1, blue=2.

- **Prisoner 1** announces the color c such that: (c + sum of visible scores) ≡ 0 (mod 3)
- Each subsequent prisoner computes: (known_total − sum_of_visible) mod 3 → their own score.

**At least 99 guaranteed to survive** with 3 colors as well.

### General Rule for k Colors

Prisoner 1 announces based on modular sum mod k. All others can deduce their color. **At least 99 guaranteed.**

### Final Answer

**99 guaranteed survivors.** Prisoner 1 encodes parity; all others decode with certainty.`,

  hints: [
    'Prisoner 1 sacrifices themselves to encode information. What information is most useful?',
    'If prisoner 1 announces the parity of red hats, what can prisoner 2 deduce about their own hat?',
    'Each subsequent prisoner updates the running parity count using what they see and hear.',
  ],

  finalAnswer: 'At least 99 guaranteed saved. Prisoner 1 announces parity of red hats they see; each subsequent prisoner deduces their own color from accumulated parity information.',
};

export default prisonerProblem;
