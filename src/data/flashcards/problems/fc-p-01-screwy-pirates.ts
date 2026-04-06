import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-01-screwy-pirates',
  type: 'problem',
  chapter: 2,
  section: '2.1',
  difficulty: 'medium',
  tags: ['game-theory', 'logic', 'simplification'],
  problemId: 'ch2-01-screwy-pirates',

  front: `**Screwy Pirates**

5 pirates divide 100 gold coins. The most senior pirate proposes a split; if ≥ 50% vote yes it passes, otherwise he is thrown overboard and the process repeats.

Pirates prioritize: (1) stay alive, (2) maximize gold, (3) fewer pirates on the boat.

**How many coins does each pirate receive?**`,

  back: `**Key insight:** Simplify to 2 pirates, then build up.

- **2 pirates:** Senior keeps 100, gets 50% vote (himself). Pirate 1 gets 0.
- **3 pirates:** Pirate 3 bribes pirate 1 with 1 coin (beats his 0). Keeps 99.
- **4 pirates:** Pirate 4 bribes pirate 2 with 1 coin. Keeps 99.
- **5 pirates:** Pirate 5 bribes pirates 1 & 3 with 1 coin each. Keeps 98.

**Pattern:** Senior pirate offers 1 coin to every other-indexed pirate who gets 0 in the next round, keeps the rest.

| Pirate | Coins |
|--------|-------|
| 5 (proposer) | **98** |
| 4 | 0 |
| 3 | 1 |
| 2 | 0 |
| 1 | 1 |`,
};

export default fc;
