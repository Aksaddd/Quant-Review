import { Problem } from '@/lib/types';

const raceTrack: Problem = {
  id: 'ch2-35-race-track',
  chapter: 2,
  section: '2.8',
  sectionTitle: 'Math Induction',
  title: 'Race Track',
  difficulty: 'hard',
  keyTechnique: 'Math induction, greedy + phantom car argument',
  tags: ['induction', 'proof', 'greedy', 'logic'],

  setup: `A **one-way circular race track** has **N gas cans** placed at various positions. The total amount of gas across all cans is exactly enough to complete **one full circle**.

Your car starts with an **empty tank**.

**Prove that there always exists a starting position from which you can drive the full circle without running out of gas.**`,

  solution: `**Proof by induction:**

**Base case n=1:** The single gas can is the starting position. You drive to the finish on that one tank. ✓

**Base case n=2:** The total gas covers one circle. At least one of the two gas cans must contain enough gas to reach the other. Start at that can. ✓

**Inductive step (n → n+1):**

Assume the statement holds for any n gas cans.

Given n+1 cans, consider any adjacent pair (can i, can i+1) where the gas at can i **is sufficient to reach can i+1** (such a pair always exists — if no can could reach the next, the total gas would be insufficient to cover the track).

**Merge:** Remove can i+1 and add its gas to can i. This creates an equivalent n-can track.

By the inductive hypothesis, there is a valid starting position for the n-can version. That starting position also works for the original n+1-can version (the merged can simulates stopping at i, refueling, then continuing to i+1). ∎

---

**Alternative (Phantom Car Argument):**

Imagine a "fully-fueled" phantom car with unlimited gas drives the full circle starting from any point. Record the tank level at each gas can **before refueling**. The gas can with the **lowest recorded level** is the valid starting position for an empty-tank car.

---

**Final Answer:** Proven by induction (merge argument) or phantom car method.`,

  hints: [
    'Try the base case: 1 can, then 2 cans. Does a valid start always exist?',
    'For the inductive step, find two adjacent cans where the first can reach the second. Merge them.',
    'Alternatively: imagine running the full circuit fully fueled. Where was your tank lowest before refueling?',
  ],

  finalAnswer: 'Proven by induction. Merge any can that can reach the next; reduce to n-can problem. Or: valid start = position with lowest pre-refuel tank level on phantom run.',
};

export default raceTrack;
