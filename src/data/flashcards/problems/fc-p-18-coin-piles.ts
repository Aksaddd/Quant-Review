import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-18-coin-piles',
  type: 'problem',
  chapter: 2,
  section: '2.4',
  difficulty: 'medium',
  tags: ['symmetry', 'invariants'],
  problemId: 'ch2-18-coin-piles',

  front: `**Coin Piles**

1000 coins on the floor: 980 tails up, 20 heads up. You're blindfolded — can't feel which side is up.

**Separate into two piles with equal numbers of heads-up coins.**`,

  back: `**Strategy: Take any 20 coins, flip them all — that's Pile 1.**

**Proof:** Say m of your 20 were originally heads-up.

- After flipping: Pile 1 has **(20 − m) heads**
- Remaining 980: **(20 − m) heads** (you took m heads with you)

**Both piles always have 20 − m heads — equal for any m.**

The algebra is symmetric regardless of which coins you picked or what m is. The blindfold doesn't matter.`,
};

export default fc;
