import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-01-problem-simplification',
  type: 'concept',
  chapter: 2,
  section: '2.1',
  difficulty: 'easy',
  tags: ['technique', 'strategy', 'simplification'],

  front: `**Technique: Problem Simplification**

When should you use this technique, and what are the steps?`,

  back: `**Use when:** The problem involves n objects/players/rounds and feels too complex to attack directly.

**Steps:**
1. Solve for the smallest possible case (n=1 or n=2)
2. Solve n=3, n=4 — look for a pattern
3. Generalize: express the answer for n in terms of n−1 (or earlier cases)
4. Apply the pattern to the original n

**Key examples:**
- **Screwy Pirates**: n=2 pirates → n=3 → … → n=5
- **Tiger and Sheep**: n=1 tiger → parity pattern

**Insight:** You don't need a complete plan at the start. Start simple, find the pattern, then apply it.`,
};

export default fc;
