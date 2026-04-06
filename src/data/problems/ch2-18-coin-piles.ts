import { Problem } from '@/lib/types';

const coinPiles: Problem = {
  id: 'ch2-18-coin-piles',
  chapter: 2,
  section: '2.4',
  sectionTitle: 'Application of Symmetry',
  title: 'Coin Piles',
  difficulty: 'medium',
  keyTechnique: 'Symmetry, blind flip trick',
  tags: ['symmetry', 'logic', 'probability', 'invariants'],

  setup: `You are **blindfolded** in a room with **1000 coins** on the floor:
- **980 coins** are tails up
- **20 coins** are heads up

You **cannot feel** which side is up. You may move and flip coins freely.

**Separate the coins into two piles such that both piles have the same number of heads-up coins.**`,

  solution: `**Strategy: Take any 20 coins, flip them all, and make that Pile 1. The remaining 980 coins are Pile 2.**

**Proof:**

Let **m** = number of heads-up coins among the 20 you picked.

- The 20 you picked started with **m heads** and **(20 − m) tails**.
- After flipping all 20: they now have **(20 − m) heads** and **m tails**.
- The 980 coins left behind had **(20 − m)** of the original heads remaining (since you took m heads with you).

**Comparing both piles:**
- Pile 1 (your 20 flipped): **20 − m** heads
- Pile 2 (remaining 980): **20 − m** heads

**They are always equal, regardless of m!**

This works even though you're blindfolded and don't know m. The algebra takes care of it symmetrically.

---

**Final Answer:** Take any 20 coins, flip all of them — this pile will always have the same number of heads as the other pile.`,

  hints: [
    'You can\'t determine which coins are heads up. Can you design a strategy that works for ANY value of m?',
    'Take exactly 20 coins (the same count as the heads). What happens if you flip all of them?',
    'If m of your 20 were heads, after flipping you have (20 - m) heads. How many heads are left in the 980?',
  ],

  finalAnswer: 'Take any 20 coins, flip all of them. Both piles will have exactly (20 - m) heads regardless of m.',
};

export default coinPiles;
