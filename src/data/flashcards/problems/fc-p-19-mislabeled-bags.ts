import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-19-mislabeled-bags',
  type: 'problem',
  chapter: 2,
  section: '2.4',
  difficulty: 'easy',
  tags: ['logic', 'constraint-satisfaction'],
  problemId: 'ch2-19-mislabeled-bags',

  front: `**Mislabeled Bags**

Three bags — apples only, oranges only, mixed — but **all labels are wrong**.

**Minimum picks to identify all three bags?**`,

  back: `**Answer: 1 pick — from the bag labeled "mix."**

Since all labels are wrong, the bag labeled "mix" **cannot** contain a mix. It's either all apples or all oranges.

- Draw an **orange** → that bag = all oranges
  - Bag labeled "apple" ≠ apples → must be **mix**
  - Bag labeled "orange" → must be **apples**
- Draw an **apple** → same logic, reversed

One pick from the most constrained bag cascades into full identification.`,
};

export default fc;
