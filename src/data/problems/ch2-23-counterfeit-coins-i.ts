import { Problem } from '@/lib/types';

const counterfeitCoinsI: Problem = {
  id: 'ch2-23-counterfeit-coins-i',
  chapter: 2,
  section: '2.5',
  sectionTitle: 'Series Summation',
  title: 'Counterfeit Coins I',
  difficulty: 'medium',
  keyTechnique: 'Weighted sampling, unique identification via positional weight',
  tags: ['logic', 'weighing', 'arithmetic', 'clever-encoding'],

  setup: `You have **10 bags**, each containing **100 coins**:
- **9 bags** contain genuine coins weighing **10 grams each**
- **1 bag** contains counterfeit coins weighing either **9 grams** or **11 grams** each (all coins in a bag weigh the same)

You have a **digital scale** (reads exact weight).

**Identify the counterfeit bag in exactly one weighing. Also determine whether the counterfeits are heavier or lighter.**`,

  solution: `### Strategy: Weighted Sampling

Take a different number of coins from each bag.

Take **1 coin from bag 1, 2 coins from bag 2, …, 10 coins from bag 10** → **55 coins total**.

### Computing the Answer

**If all coins were genuine:** expected weight = 55 × 10 = **550 grams**

**If bag j is counterfeit:**
- Each counterfeit coin is off by **±1 gram**
- You took j coins from bag j
- Actual weight = 550 ± j

Since j is unique for each bag (1 through 10), the deviation **uniquely identifies the bag**:
- Weight = 550 + j → bag j has **heavier** coins (11g)
- Weight = 550 − j → bag j has **lighter** coins (9g)

**Example:** If scale reads 546 → deviation = −4 → **bag 4** has **9-gram** counterfeits.

**Algorithm complexity: O(n)** — trivially extends to n bags by taking 1, 2, …, n coins.

### Final Answer

Take k coins from bag k (k = 1 to 10). Weigh all 55. Deviation from 550 identifies bag and direction.`,

  hints: [
    'With one weighing, you need to encode which bag is fake AND whether it\'s heavy or light.',
    'What if you took a different number of coins from each bag?',
    'If you take j coins from bag j, and bag j is counterfeit, the total deviation equals ±j.',
  ],

  finalAnswer: 'Take j coins from bag j (j=1..10). Weigh all. If result = 550+j, bag j is heavy. If 550−j, bag j is light.',
};

export default counterfeitCoinsI;
