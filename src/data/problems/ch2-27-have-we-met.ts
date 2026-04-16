import { Problem } from '@/lib/types';

const haveWeMet: Problem = {
  id: 'ch2-27-have-we-met',
  chapter: 2,
  section: '2.6',
  sectionTitle: 'The Pigeon Hole Principle',
  title: 'Have We Met Before?',
  difficulty: 'medium',
  keyTechnique: 'Generalized Pigeon Hole, Ramsey-type argument',
  tags: ['pigeon-hole', 'combinatorics', 'proof', 'graph-theory'],

  setup: `**Show that among any 6 people at a party, either:**
- At least **3 people all know each other** (mutual acquaintances), or
- At least **3 people are all strangers** to each other.`,

  solution: `### Setting Up the Problem

**Proof by Pigeon Hole (Ramsey-type argument):**

Fix any one person — call them **Person 6**. Among the remaining 5 people, Person 6 either:
- Knows **at least 3** of them, or
- Does NOT know **at least 3** of them

(By Pigeon Hole: 5 people split into "knows" and "doesn't know" — at least one group has ≥ 3.)

### Case 1: Person 6 Knows at Least 3 People

Call them A, B, C.

- If **any two of A, B, C know each other** (say A and B): then Person 6, A, B are 3 mutual acquaintances. ✓
- If **none of A, B, C know each other**: then A, B, C are 3 mutual strangers. ✓

### Case 2: Person 6 Does Not Know at Least 3 People

Call them A, B, C.

- If **any two of A, B, C don't know each other** (say A and B): then Person 6, A, B are 3 mutual strangers. ✓
- If **all pairs among A, B, C know each other**: then A, B, C are 3 mutual acquaintances. ✓

### Final Answer

In all cases, the conclusion holds. ∎

This is a special case of **Ramsey's theorem**: R(3,3) = 6.

Proven. Among any 6 people, there must be 3 mutual acquaintances or 3 mutual strangers.`,

  hints: [
    'Fix one person and classify the other 5 as "knows" or "doesn\'t know."',
    'With 5 people split into two groups, at least one group has 3+ people.',
    'Take those 3 people. What happens if any two of them know/don\'t know each other?',
  ],

  finalAnswer: 'Proven by Pigeon Hole + case analysis. This is the Ramsey theorem R(3,3)=6.',
};

export default haveWeMet;
