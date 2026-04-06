import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-25-matching-socks',
  type: 'problem',
  chapter: 2,
  section: '2.6',
  difficulty: 'easy',
  tags: ['pigeon-hole', 'combinatorics'],
  problemId: 'ch2-25-matching-socks',

  front: `**Matching Socks**

Drawer: 2 red, 20 yellow, 31 blue socks. Pitch dark.

**Minimum socks to grab to guarantee a matching pair?**`,

  back: `**Apply the Pigeon Hole Principle:**

- **Pigeons** = socks drawn
- **Holes** = colors = 3 (red, yellow, blue)

Worst case: draw 1 of each color (3 socks, no match).
The **4th sock** must match one of the 3 colors.

The actual quantities (2, 20, 31) don't matter — only the **number of colors** does.

**Answer: 4 socks.**`,
};

export default fc;
