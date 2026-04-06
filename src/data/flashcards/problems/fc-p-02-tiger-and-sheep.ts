import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-02-tiger-and-sheep',
  type: 'problem',
  chapter: 2,
  section: '2.1',
  difficulty: 'medium',
  tags: ['parity', 'game-theory', 'simplification'],
  problemId: 'ch2-02-tiger-and-sheep',

  front: `**Tiger and Sheep**

100 tigers and 1 sheep on a magic island. A tiger that eats the sheep becomes a sheep. All tigers are rational and want to survive first.

**Will the sheep be eaten?**`,

  back: `**Key insight:** Parity determines the outcome.

| # Tigers | Outcome |
|----------|---------|
| 1 (odd) | Sheep **eaten** — no threat |
| 2 (even) | Sheep **safe** — eating = becoming prey |
| 3 (odd) | Sheep **eaten** — eater lands in safe n=2 scenario |
| 4 (even) | Sheep **safe** — eater lands in dangerous n=3 scenario |

**Rule:** Odd # tigers → sheep eaten. Even # tigers → sheep safe.

**100 tigers (even) → sheep is NOT eaten.**`,
};

export default fc;
