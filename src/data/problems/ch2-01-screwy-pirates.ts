import { Problem } from '@/lib/types';

const screwyPirates: Problem = {
  id: 'ch2-01-screwy-pirates',
  chapter: 2,
  section: '2.1',
  sectionTitle: 'Problem Simplification',
  title: 'Screwy Pirates',
  difficulty: 'medium',
  keyTechnique: 'Problem simplification, game theory',
  tags: ['game-theory', 'logic', 'induction', 'simplification'],

  setup: `Five pirates looted a chest containing 100 gold coins. Being democratic, they agree on the following method to divide the loot:

- The **most senior pirate** proposes a distribution.
- All pirates (including the proposer) vote. If **at least 50% accept**, the gold is divided as proposed.
- If the proposal is **rejected**, the most senior pirate is thrown overboard and the process repeats with the next most senior pirate.

Assume all pirates are perfectly rational with the following priorities (in order):
1. **Stay alive**
2. **Maximize gold**
3. **Prefer fewer pirates** on the boat (if gold is equal)

**How will the gold be divided?**`,

  solution: `**Strategy: Start simple — reduce the number of pirates and find the pattern.**

**2 pirates:** Pirate 2 (most senior) proposes keeping all 100 for himself. He gets 50% of the vote (his own), so the plan passes. Pirate 1 gets nothing.

**3 pirates:** Pirate 3 knows that if rejected, we go to the 2-pirate case where pirate 1 gets 0. So pirate 3 offers pirate 1 just **1 coin** (better than 0). Pirate 3 keeps 99. Passes with 2/3 votes (pirates 1 and 3).

**4 pirates:** If pirate 4's plan fails, we go to 3-pirate case where pirate 2 gets 0. Pirate 4 offers pirate 2 just **1 coin**, keeps 99. Passes with 2/4 = 50% votes (pirates 2 and 4).

**5 pirates:** If plan fails, we go to 4-pirate case where pirates 1 and 3 get 0. Pirate 5 offers them **1 coin each**, keeps 98. Passes with 3/5 votes (pirates 1, 3, and 5).

**Pattern:** For odd total pirates (2n+1), the most senior pirate offers 1 coin each to pirates 1, 3, 5, …, 2n−1, and keeps the rest.

---

**Final Answer:**

| Pirate | Coins |
|--------|-------|
| 5 (proposer) | **98** |
| 4 | 0 |
| 3 | 1 |
| 2 | 0 |
| 1 | 1 |`,

  hints: [
    'Start with the simplest case: 2 pirates. Who has the power?',
    'Now try 3 pirates. Which pirate gets nothing in the 2-pirate case, and how does pirate 3 exploit that?',
    'Extend to 4 and 5 pirates using the same logic. What pattern emerges?',
  ],

  finalAnswer: 'Pirate 5 keeps 98 coins; pirates 1 and 3 each get 1 coin; pirates 2 and 4 get nothing.',
};

export default screwyPirates;
