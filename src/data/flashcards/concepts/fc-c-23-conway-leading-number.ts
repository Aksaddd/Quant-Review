import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-23-conway-leading-number',
  type: 'concept',
  chapter: 5,
  section: '5.2',
  difficulty: 'hard',
  tags: ['technique', 'probability', 'sequences'],

  front: `**Conway's Leading Number: Expected Tosses for Coin Sequences**

How do you compute $E[\\text{tosses until pattern appears}]$ for any coin sequence?`,

  back: `**Conway's Leading Number method:**

For a pattern $P$ of length $n$, compute:
$$E[P] = \\sum_{k=1}^{n} 2^k \\cdot I_k$$

where $I_k = 1$ if the **first $k$ characters** of $P$ match the **last $k$ characters** of $P$.

**Examples:**

| Pattern | Matching prefixes/suffixes | $E$ |
|---------|---------------------------|-----|
| HHH | H=H (k=1), HH=HH (k=2), HHH=HHH (k=3) | $2 + 4 + 8 = 14$ |
| THH | Only THH=THH (k=3) | $8$ |
| HTH | H=H (k=1), HTH=HTH (k=3) | $2 + 8 = 10$ |
| THT | T=T (k=1), THT=THT (k=3) | $2 + 8 = 10$ |

**Penney's game:** Player 2 can always choose a sequence that beats Player 1's with probability $> 1/2$.

**General formula for $n$ heads in a row:**
$$E[n \\text{ heads}] = 2^{n+1} - 2$$`,
};

export default fc;
