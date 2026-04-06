import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-29-counterfeit-coins-ii',
  type: 'problem',
  chapter: 2,
  section: '2.6',
  difficulty: 'hard',
  tags: ['pigeon-hole', 'base-3', 'number-theory'],
  problemId: 'ch2-29-counterfeit-coins-ii',

  front: `**Counterfeit Coins II**

5 bags, each coin weighs 9g, 10g, or 11g (same within a bag). Digital scale.

**How many weighings to determine the coin type of every bag?**`,

  back: `**Answer: 1 weighing.**

Take coins in **powers of 3**: 1 from bag 1, 3 from bag 2, 9 from bag 3, 27 from bag 4, 81 from bag 5.

**Total:** 121 coins. Expected (all 10g): **1210g**

Each bag's deviation dᵢ ∈ {−1, 0, +1}. Total deviation = $\\sum c_i \\cdot d_i$ encodes all 5 bag types in **base 3**.

3⁵ = 243 combinations → all produce distinct weights by PHP. One weighing uniquely decodes all 5.`,
};

export default fc;
