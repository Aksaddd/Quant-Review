import { Problem } from '@/lib/types';

const wiseMen: Problem = {
  id: 'ch2-20-wise-men',
  chapter: 2,
  section: '2.4',
  sectionTitle: 'Application of Symmetry',
  title: 'Wise Men (Sultan\'s Glass)',
  difficulty: 'hard',
  keyTechnique: 'Symmetric role assignment, designated counter',
  tags: ['logic', 'game-theory', 'symmetry', 'strategy', 'classic'],

  setup: `**50 wise men** are imprisoned by a sultan. A glass (currently sitting bottom-down) is placed in a room. Each minute, **one wise man is randomly called** to the room and may either:
- **Turn the glass over**, or
- **Do nothing**

Calls are random and can repeat; no wise man knows who has been called before. If any wise man correctly declares *"all 50 of us have been called at least once,"* they all go free. If the declaration is **wrong**, they are all executed.

**Design a strategy that guarantees freedom.**`,

  solution: `**Strategy: Designate one wise man as the "spokesman" and assign asymmetric roles.**

**Setup:**
- Choose one wise man as the **spokesman**.
- The glass starts **bottom-down**.

**Rules for the other 49 wise men:**
- The **first time** you enter the room and find the glass **bottom-down**: flip it upside-down.
- After that (or if the glass is already upside-down when you enter): do nothing.

**Rules for the spokesman:**
- Every time you enter and find the glass **upside-down**: flip it back to bottom-down and **increment your count by 1**.
- When your count reaches **49**: all 49 others have been called at least once. Declare freedom.

---

**Why it works:**
- Each of the 49 non-spokesmen flips the glass exactly once (their "I've been here" signal).
- The spokesman counts each signal. After 49 flips, all 49 others are accounted for.
- The spokesman himself is included because he was called too (he's the one counting).

**Guarantee:** The strategy terminates with probability 1 (by the infinite monkey theorem — all 50 will eventually be called).

---

**Final Answer:** Designate a spokesman. Others flip once (bottom-to-up) to signal presence. Spokesman counts each flip-back (up-to-bottom). At count 49, declare freedom.`,

  hints: [
    'How can one person know when everyone has been called, given no direct communication?',
    'Assign one person a unique role: the counter. What signal can others send to the counter?',
    'The glass is a shared "memory." How can each person leave exactly one irreversible mark?',
  ],

  finalAnswer: 'Spokesman counts each glass flip-back (49 total = all others visited). Others flip once only when glass is bottom-down as their unique signal.',
};

export default wiseMen;
