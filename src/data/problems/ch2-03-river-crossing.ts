import { Problem } from '@/lib/types';

const riverCrossing: Problem = {
  id: 'ch2-03-river-crossing',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'River Crossing',
  difficulty: 'easy',
  keyTechnique: 'Logic reasoning, optimization',
  tags: ['logic', 'optimization', 'reasoning'],

  setup: `Four people (A, B, C, D) need to cross a river at night. There is one bridge and one torch. The bridge can hold **at most 2 people** at a time and the torch must be carried on every crossing. Each pair walks at the speed of the **slower person**.

Crossing times:
- **A**: 10 minutes
- **B**: 5 minutes
- **C**: 2 minutes
- **D**: 1 minute

**What is the minimum time to get all four people across?**`,

  solution: `**Key insight:** The two slowest people (A and B) should cross together, and the two fastest (C and D) should shuttle the torch back.

**Optimal sequence:**

| Step | Who crosses | Direction | Time | Cumulative |
|------|-------------|-----------|------|------------|
| 1 | C and D | → | 2 min | 2 min |
| 2 | D returns | ← | 1 min | 3 min |
| 3 | A and B cross | → | 10 min | 13 min |
| 4 | C returns | ← | 2 min | 15 min |
| 5 | C and D cross | → | 2 min | **17 min** |

**Why not send A or B back?** If D brings A across first (10 min) then returns (1 min), then B and another cross — you use at least 10 + 1 + 5 = 16 min just for those three, plus more. Pairing A and B is always more efficient.

---

**Final Answer: 17 minutes.**`,

  hints: [
    'Who should carry the torch back? The fastest person.',
    'Should the two slowest people cross together or separately?',
    'Try pairing A and B for one crossing — how does that affect the total?',
  ],

  finalAnswer: '17 minutes. C and D cross first; D returns; A and B cross; C returns; C and D cross.',
};

export default riverCrossing;
