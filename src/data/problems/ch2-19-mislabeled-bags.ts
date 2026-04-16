import { Problem } from '@/lib/types';

const mislabeledBags: Problem = {
  id: 'ch2-19-mislabeled-bags',
  chapter: 2,
  section: '2.4',
  sectionTitle: 'Application of Symmetry',
  title: 'Mislabeled Bags',
  difficulty: 'easy',
  keyTechnique: 'Constraint logic, process of elimination',
  tags: ['logic', 'deduction', 'constraint-satisfaction', 'reasoning'],

  setup: `There are **three bags**:
- One bag contains only **apples**
- One bag contains only **oranges**
- One bag contains a **mix** of both

**All three bags are mislabeled** (no bag has the correct label).

**What is the minimum number of fruit picks needed to identify all three bags correctly?**`,

  solution: `### Strategy

**Answer: 1 pick.** Pick one fruit from the bag labeled "mix."

Since all bags are mislabeled, the bag labeled **"mix"** must actually contain either only apples or only oranges (not a mix).

### Working Through the Cases

**Case 1: You draw an orange** from the "mix" bag.
- That bag is actually **all oranges**.
- The bag labeled **"orange"** cannot be all oranges (it's mislabeled), and it can't be all apples (because the apple bag is still unaccounted for) — so it must be the **mix**.
- The bag labeled **"apple"** must then be **all apples**.

**Case 2: You draw an apple** from the "mix" bag.
- That bag is actually **all apples**.
- By the same logic: bag labeled "apple" → **mix**, bag labeled "orange" → **all oranges**.

### Key Insight

The mislabeling constraint is so strong that one pick from the most informative bag (the "mix" label) cascades into full identification of all three.

**Final Answer: 1 pick — from the bag labeled "mix".**`,

  hints: [
    'Since ALL bags are mislabeled, what can the "mix" bag actually contain?',
    'Once you identify the "mix" bag\'s true contents, what does that tell you about the other two?',
    'You only need one pick from the right bag. Which bag gives you the most information?',
  ],

  finalAnswer: '1 pick from the bag labeled "mix." Since it can\'t be a mix, one fruit identifies it, and the other two follow by elimination.',
};

export default mislabeledBags;
