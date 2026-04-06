import { Problem } from '@/lib/types';

const matchingSocks: Problem = {
  id: 'ch2-25-matching-socks',
  chapter: 2,
  section: '2.6',
  sectionTitle: 'The Pigeon Hole Principle',
  title: 'Matching Socks',
  difficulty: 'easy',
  keyTechnique: 'Pigeon Hole Principle',
  tags: ['pigeon-hole', 'combinatorics', 'logic'],

  setup: `A drawer contains:
- **2 red** socks
- **20 yellow** socks
- **31 blue** socks

You are in the dark and cannot see colors.

**What is the minimum number of socks you must grab to guarantee a matching pair?**`,

  solution: `**Apply the Pigeon Hole Principle:**

- **Pigeons** = socks drawn
- **Holes** = sock colors = **3** (red, yellow, blue)

By the Pigeon Hole Principle: if you draw **more socks than there are colors**, at least two must be the same color.

Drawing **3 socks** could give one of each color (worst case — no match).
Drawing **4 socks** guarantees at least two are the same color.

Note: The actual quantities (2, 20, 31) are irrelevant — only the **number of distinct colors** matters.

---

**Final Answer: 4 socks.**`,

  hints: [
    'How many distinct colors are there?',
    'What is the worst-case scenario — the maximum number of socks you could draw without a match?',
    'Apply the Pigeon Hole Principle: n+1 items in n categories guarantees a repeat.',
  ],

  finalAnswer: '4 socks. With 3 colors, worst case is 1 of each. The 4th guarantees a match.',
};

export default matchingSocks;
