import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-23-counterfeit-coins-i',
  type: 'problem',
  chapter: 2,
  section: '2.5',
  difficulty: 'medium',
  tags: ['logic', 'weighing', 'clever-encoding'],
  problemId: 'ch2-23-counterfeit-coins-i',

  front: `**Counterfeit Coins I**

10 bags of 100 coins. 9 bags: genuine (10g each). 1 bag: counterfeits (9g or 11g). Digital scale.

**Identify the counterfeit bag AND whether heavier/lighter in ONE weighing.**`,

  back: `**Take j coins from bag j** (j = 1 to 10) → 55 coins total.

**Expected weight** (all genuine): 55 × 10 = **550g**

**If bag j is counterfeit:**
- Deviation = ±j (took j counterfeit coins, each ±1g off)
- Weight = 550 + j → bag j is **heavier (11g)**
- Weight = 550 − j → bag j is **lighter (9g)**

Each j is unique, so the deviation **uniquely identifies** both the bag and the direction.

*Example: scale reads 546 → deviation −4 → bag 4 has 9g coins.*`,
};

export default fc;
