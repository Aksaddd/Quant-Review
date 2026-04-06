import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-04-defective-ball-formula',
  type: 'formula',
  chapter: 2,
  section: '2.2',
  difficulty: 'hard',
  tags: ['formula', 'information-theory', 'search'],

  front: `**Defective Ball — Generalization**

With n balance weighings, how many balls can you handle:
1. If you **know** whether the defective ball is heavier or lighter?
2. If you **don't know**?`,

  back: `Each weighing has **3 outcomes**: left heavy / balanced / right heavy.

**n weighings → 3ⁿ total distinguishable outcomes.**

**Case 1 — Know heavier/lighter:**
Each ball maps to one outcome → can handle up to **3ⁿ balls**.

**Case 2 — Don't know heavier/lighter:**
Each defective ball maps to TWO outcomes (heavy or light) → available slots = (3ⁿ − 3) / 2

(Subtract 3 because "balanced" doesn't identify a ball, and each unknown takes 2 slots.)

| n | Know | Don't know |
|---|------|------------|
| 1 | 3 | 0 |
| 2 | 9 | 3 |
| **3** | **27** | **12 ✓** |
| 4 | 81 | 39 |`,
};

export default fc;
