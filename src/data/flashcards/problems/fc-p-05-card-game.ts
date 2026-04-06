import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-05-card-game',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'medium',
  tags: ['symmetry', 'invariants'],
  problemId: 'ch2-05-card-game',

  front: `**Card Game**

Flip 2 cards at a time: both black → dealer's pile, both red → your pile, mixed → discard. You win \$100 if your pile is larger.

**How much do you pay to play?**`,

  back: `**Key insight:** Your pile always equals the dealer's pile — guaranteed tie.

**Why:** The deck starts 26 red / 26 black. Every operation either:
- Removes 2 of the same color (maintains equal reduction), or
- Discards 1 red + 1 black (removes equally from both sides)

Red and black cards are always removed in equal numbers → you always end up with the same count as the dealer.

**Answer: $0. The game can never be won.**`,
};

export default fc;
