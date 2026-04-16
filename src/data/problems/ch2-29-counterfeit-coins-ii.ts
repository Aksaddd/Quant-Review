import { Problem } from '@/lib/types';

const counterfeitCoinsII: Problem = {
  id: 'ch2-29-counterfeit-coins-ii',
  chapter: 2,
  section: '2.6',
  sectionTitle: 'The Pigeon Hole Principle',
  title: 'Counterfeit Coins II',
  difficulty: 'hard',
  keyTechnique: 'Base-3 encoding, Pigeon Hole uniqueness',
  tags: ['pigeon-hole', 'number-theory', 'base-3', 'clever-encoding'],

  setup: `You have **5 bags**, each containing **100 coins**. Every coin in a bag weighs the same — either **9g, 10g, or 11g** — but each bag may differ. You have a **digital scale** (reads exact weight).

**How many weighings are needed to determine the coin type (9g, 10g, or 11g) of every bag?**`,

  solution: `**Answer: 1 weighing.**

### Strategy: Use Powers of 3

Take coins from each bag as follows:

| Bag | Coins taken | Power of 3 |
|-----|-------------|------------|
| 1   | 1 coin      | 3⁰ = 1     |
| 2   | 3 coins     | 3¹ = 3     |
| 3   | 9 coins     | 3² = 9     |
| 4   | 27 coins    | 3³ = 27    |
| 5   | 81 coins    | 3⁴ = 81    |

**Total coins:** 1+3+9+27+81 = **121 coins**

### Decoding the Deviation

**If all coins were 10g:** expected weight = 121 × 10 = **1210 grams**

**Actual weight:** 1210 + deviation, where deviation = Σ (cᵢ × dᵢ)
- cᵢ = coins taken from bag i
- dᵢ = deviation of bag i from 10g (either −1, 0, or +1)

**Deviation range:** each dᵢ ∈ {−1, 0, +1} — this is **base-3 representation**!

The deviation encodes a unique base-3 number, allowing us to read off d₁, d₂, d₃, d₄, d₅ directly.

### Why It Works

By Pigeon Hole, all 3⁵ = 243 possible bag-type combinations produce **distinct total weights** (no two combinations give the same deviation sum).

### Final Answer

**1 weighing.** Take 1, 3, 9, 27, 81 coins from bags 1–5. The deviation from 1210g encodes all five bag types simultaneously.`,

  hints: [
    'You need to distinguish 3⁵ = 243 combinations in one weighing. How?',
    'What if you took different numbers of coins from each bag — specifically powers of 3?',
    'The deviation from expected weight encodes the bag types in base 3. How do you decode it?',
  ],

  finalAnswer: 'Take 3⁰, 3¹, 3², 3³, 3⁴ coins from bags 1–5. Decode deviation from 1210g in base 3 to find each bag\'s type.',
};

export default counterfeitCoinsII;
