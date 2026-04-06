import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-27-have-we-met',
  type: 'problem',
  chapter: 2,
  section: '2.6',
  difficulty: 'medium',
  tags: ['pigeon-hole', 'proof', 'graph-theory'],
  problemId: 'ch2-27-have-we-met',

  front: `**Have We Met Before?**

Prove: Among any **6 people** at a party, either at least **3 all know each other** OR at least **3 are all strangers**.`,

  back: `**Proof (Ramsey R(3,3)=6):**

Fix person 6. Among the other 5, by PHP: either ≥3 **know** person 6, or ≥3 **don't know** person 6.

**Case: ≥3 know person 6** (call them A, B, C):
- If any two of A, B, C know each other → those two + person 6 = **3 mutual acquaintances** ✓
- If none of A, B, C know each other → A, B, C are **3 mutual strangers** ✓

**Case: ≥3 don't know person 6** — symmetric argument. ✓

In all cases the conclusion holds. ∎ This is **Ramsey's Theorem R(3,3)=6**.`,
};

export default fc;
