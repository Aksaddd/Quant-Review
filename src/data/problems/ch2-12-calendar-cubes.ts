import { Problem } from '@/lib/types';

const calendarCubes: Problem = {
  id: 'ch2-12-calendar-cubes',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Calendar Cubes',
  difficulty: 'medium',
  keyTechnique: 'Constraint satisfaction, digit reuse (6 ≡ 9)',
  tags: ['logic', 'combinatorics', 'constraint-satisfaction', 'creative'],

  setup: `Design **two cubes** (6 faces each) using **single digits (0–9)** so that together they can display every day of the month from **01 to 31**. Both cubes must always be used (even for single-digit days like 01, 02, etc.).

**What digits do you place on each cube?**`,

  solution: `**Constraints analysis:**

**Must display 11 and 22** → both cubes need a **1** and a **2**.

**Must display 01–09** → both cubes need a **0** (so either cube can show the tens digit).

So far, each cube uses 3 faces: {0, 1, 2}. Each has 3 remaining faces — 6 total.

**Remaining digits needed:** 3, 4, 5, 6, 7, 8, 9 — that's **7 digits** but only **6 remaining faces**.

**Key insight:** **6 and 9 are visually identical when flipped upside down.** No date requires both 6 and 9 on the *same cube simultaneously*. So one face can serve double duty as **6/9**.

**Final assignment:**

| Cube | Faces |
|------|-------|
| Cube 1 | 0, 1, 2, 3, 4, 5 |
| Cube 2 | 0, 1, 2, 6/9, 7, 8 |

**Verification of every date 01–31:** ✓ (All dates use one digit from each cube, with 6/9 covering both 6th and 9th.)

---

**Final Answer:** Cube 1: {0,1,2,3,4,5} · Cube 2: {0,1,2,6/9,7,8}`,

  hints: [
    'Which digits must appear on BOTH cubes? Think about 11 and 22.',
    'Which digit must also appear on both cubes for single-digit days (01–09)?',
    'You need 7 remaining digits but only have 6 faces. What visual trick solves this?',
  ],

  finalAnswer: 'Cube 1: {0,1,2,3,4,5}. Cube 2: {0,1,2,6/9,7,8}. The 6 doubles as a 9 when flipped.',
};

export default calendarCubes;
