import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-06-pigeon-hole',
  type: 'concept',
  chapter: 2,
  section: '2.6',
  difficulty: 'easy',
  tags: ['technique', 'pigeon-hole', 'combinatorics'],

  front: `**Technique: The Pigeon Hole Principle**

State the principle, its generalization, and give 3 applications.`,

  back: `**Basic Pigeon Hole Principle:**
If n+1 or more pigeons occupy n holes, at least one hole contains ≥ 2 pigeons.

**Generalized:**
If mn+1 or more pigeons occupy n holes, at least one hole contains ≥ m+1 pigeons.
$$\\text{At least one hole has} \\geq \\left\\lceil \\frac{\\text{pigeons}}{\\text{holes}} \\right\\rceil \\text{ pigeons}$$

**Applications in Chapter 2:**

| Problem | Pigeons | Holes | Conclusion |
|---------|---------|-------|------------|
| Matching Socks | 4 socks | 3 colors | ≥2 same color |
| Handshakes | 26 people | 25 counts | ≥2 same count |
| Ants on Square | 51 ants | 25 sub-squares | ≥3 ants in one cell |
| Counterfeit Coins II | 243 combinations | 243 weights | all distinct (proves uniqueness) |

`,
};

export default fc;
