import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-07-defective-ball',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'hard',
  tags: ['logic', 'information-theory', 'divide-and-conquer'],
  problemId: 'ch2-07-defective-ball',

  front: `**Defective Ball**

12 identical balls — one is heavier OR lighter (unknown which). Balance scale only shows which side is heavier.

**Find the defective ball in 3 weighings.**`,

  back: `**Key insight:** Divide into thirds — each weighing has 3 outcomes (left heavy / balanced / right heavy), giving ternary information.

**General rule:**
- Knowing heavier/lighter: identify among **3ⁿ** balls in n weighings
- Not knowing: identify among **(3ⁿ − 3) / 2** balls in n weighings
- n=3: (27−3)/2 = **12** ✓

**Weighing 1:** 4 vs 4, set 4 aside.
- **Balanced** → defective is in the set-aside 4 (known to be different)
- **Unbalanced** → defective is heavy in one group or light in the other

Each case resolves in 2 more weighings using known-normal balls as references.`,
};

export default fc;
