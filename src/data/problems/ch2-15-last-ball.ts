import { Problem } from '@/lib/types';

const lastBall: Problem = {
  id: 'ch2-15-last-ball',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Last Ball',
  difficulty: 'medium',
  keyTechnique: 'Parity invariant',
  tags: ['parity', 'invariants', 'logic', 'combinatorics'],

  setup: `A bag contains **20 blue balls** and **14 red balls**. Each turn, you randomly remove **2 balls** and apply the following rule:

- Both **same color** → put **1 blue** ball back
- **Different colors** → put **1 red** ball back

(Replacement balls come from an external supply.)

The process continues until **1 ball remains**.

1. **What color is the last ball?**
2. **What if we started with 20 blue and 13 red?**`,

  solution: `**Key insight: Track the parity of red balls — it is an invariant.**

**Analyze how each operation changes the red ball count (R):**

| Operation | Change in R |
|-----------|-------------|
| Remove 2 blue → add 1 blue | R unchanged |
| Remove 2 red → add 1 blue | R decreases by **2** |
| Remove 1 blue + 1 red → add 1 red | R unchanged |

**R can only stay the same or decrease by 2.** This means the **parity of R is invariant** — it never changes.

---

**Case 1: Start with 14 red (even)**
- R stays even throughout.
- The last ball must be blue (if it were red, R = 1, which is odd — impossible from even start).
- **Last ball: BLUE.**

**Case 2: Start with 13 red (odd)**
- R stays odd throughout.
- The last ball must be red (R = 1 is odd — consistent).
- **Last ball: RED.**

---

**Final Answer:**
- 20 blue + 14 red → last ball is **BLUE**
- 20 blue + 13 red → last ball is **RED**`,

  hints: [
    'Instead of simulating the whole process, look for something that never changes.',
    'How does each operation affect the number of red balls? Can red balls increase?',
    'What is the parity (odd/even) of the red ball count at the start? Can it change?',
  ],

  finalAnswer: '14 red (even start) → last ball is BLUE. 13 red (odd start) → last ball is RED. Parity of red count is invariant.',
};

export default lastBall;
