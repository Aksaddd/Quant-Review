import { Problem } from '@/lib/types';

const cardGame: Problem = {
  id: 'ch2-05-card-game',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Card Game',
  difficulty: 'medium',
  keyTechnique: 'Symmetry, invariants',
  tags: ['symmetry', 'invariants', 'logic', 'probability'],

  setup: `A casino uses a standard 52-card deck. You and the dealer take turns flipping over **two cards at a time**:

- Both **black** → go to **dealer's** pile
- Both **red** → go to **your** pile
- One black, one red → **discarded**

At the end, if you have **more cards** than the dealer, you win \$100. The casino charges you a fee to play.

**How much would you pay to play this game?**`,

  solution: `### Key Insight

Your pile and the dealer's pile will always be equal.

### Tracing the Invariant

Consider what happens to the red and black cards:
- Each "both red" pair adds 2 to your pile.
- Each "both black" pair adds 2 to the dealer's pile.
- Each "mixed" pair discards 1 red and 1 black card.

The deck starts with exactly 26 red and 26 black cards.

Every time a mixed pair is discarded, one red and one black card leave together — maintaining equal balance. The remaining unpaired reds go to your pile and the remaining blacks go to the dealer's pile.

Since red and black are always removed in equal numbers (either both together in your/dealer pile, or one of each discarded), you will **always end up with the same number of cards** as the dealer.

### Final Answer

The game is a guaranteed **tie** — you can never win. You should pay **$0**. This game can never be won.`,

  hints: [
    'Think about what happens to the count of red and black cards over time.',
    'Every discarded pair removes one red and one black card equally.',
    'Since the deck starts balanced (26 red, 26 black), what must be true at the end?',
  ],

  finalAnswer: '$0. Your pile always equals the dealer\'s pile regardless of card order — the game can never be won.',
};

export default cardGame;
