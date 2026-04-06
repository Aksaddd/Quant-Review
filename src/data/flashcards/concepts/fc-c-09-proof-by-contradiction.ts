import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-09-proof-by-contradiction',
  type: 'concept',
  chapter: 2,
  section: '2.9',
  difficulty: 'easy',
  tags: ['technique', 'contradiction', 'proof'],

  front: `**Technique: Proof by Contradiction**

Explain the method. When should you use it in quant interviews?`,

  back: `**Method:**
1. **Assume** the statement you want to prove is **false**
2. Follow the logical consequences
3. Arrive at a **contradiction** (something impossible or self-contradictory)
4. Therefore the original statement **must be true** ∎

**When to use it:**
- Proving something is **impossible** (Chameleon Colors, Box Packing)
- Proving a quantity is **irrational** or has no solution in a given set
- When the direct proof is unclear but the negation leads somewhere tractable

**Chapter 2 examples:**
- **√2 irrational:** Assume rational → m and n both even → contradicts gcd=1
- **Rainbow Hats:** Assume all 7 wrong → prisoner r is wrong → but prisoner r is always right → contradiction

**Interview tip:** Start by saying "Assume for contradiction that…" — this signals to the interviewer you know the technique and buys you time to think through the consequences.`,
};

export default fc;
