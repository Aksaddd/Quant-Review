import { Problem } from '@/lib/types';

const defectiveBall: Problem = {
  id: 'ch2-07-defective-ball',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Defective Ball',
  difficulty: 'hard',
  keyTechnique: 'Divide-into-thirds, ternary search, information theory',
  tags: ['logic', 'search', 'information-theory', 'divide-and-conquer'],

  setup: `You have **12 identical-looking balls**. One ball is either **heavier or lighter** than the rest (you do not know which). You have a **balance scale** that only tells you which side is heavier (or if they balance).

**Find the defective ball in exactly 3 weighings.** You must also determine whether it is heavier or lighter.`,

  solution: `**Key insight:** Divide into groups of 3 (not 2). Each weighing has 3 outcomes: left heavy, right heavy, or balanced — giving you ternary information.

**Weighing 1:** Place balls **1–4** on the left, **5–8** on the right. Set aside **9–12**.

---

**Case A: Scales balance** → defective is in {9, 10, 11, 12}

**Weighing 2:** Weigh **9, 10, 11** vs **1, 2, 3** (known normals).
- If balanced → ball **12** is defective.
  - **Weighing 3:** Weigh 12 vs any normal to determine heavier/lighter.
- If 9,10,11 side is heavy → defective is heavy and in {9,10,11}.
  - **Weighing 3:** Weigh 9 vs 10. If balanced → 11. If not, the heavier one.
- If 9,10,11 side is light → same logic, defective is lighter.

---

**Case B: Left (1–4) is heavier** → defective is either H in {1,2,3,4} or L in {5,6,7,8}

**Weighing 2:** Weigh **1, 2, 5** vs **3, 6, 7** (4 and 8 set aside, 9–12 are normals).
- Sub-cases narrow to specific balls in **Weighing 3**.

**Case C: Left (1–4) is lighter** → mirror of Case B.

---

**General rule:**
- Knowing heavier/lighter: identify among **3ⁿ** balls in n weighings.
- Not knowing: identify among **(3ⁿ − 3) / 2** balls in n weighings.
- For n = 3: **(27 − 3) / 2 = 12** balls. ✓

---

**Final Answer:** Solvable in 3 weighings using a divide-into-thirds decision tree.`,

  hints: [
    'With a balance scale, each weighing has 3 outcomes. How much information does that give you?',
    'Divide the 12 balls into 3 groups of 4. The first weighing tells you which group contains the defective ball — or does it?',
    'Remember: you don\'t know if the defective ball is heavier or lighter. How does this affect your information?',
  ],

  finalAnswer: 'Solvable in 3 weighings. First weighing: 4 vs 4. The 3-outcome decision tree isolates the defective ball and determines if it is heavier or lighter.',
};

export default defectiveBall;
