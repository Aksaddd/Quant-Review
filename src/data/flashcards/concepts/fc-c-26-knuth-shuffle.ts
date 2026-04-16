import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-26-knuth-shuffle',
  type: 'concept',
  chapter: 7,
  section: '7.1',
  difficulty: 'medium',
  tags: ['technique', 'algorithms', 'randomization'],

  front: `**Knuth Shuffle and Reservoir Sampling**

How do you generate a uniformly random permutation? How do you sample uniformly from a stream of unknown length?`,

  back: `**Knuth (Fisher-Yates) Shuffle:**
\`\`\`
for i = 1 to n:
    swap(A[i], A[Random(i, n)])
\`\`\`
- $\\Theta(n)$ time
- All $n!$ permutations equally likely
- Proof: Each element has $1/n$ probability at each position

**Reservoir Sampling** (select 1 from stream of unknown length $n$):
\`\`\`
Keep first element. For each new element i (i = 2, 3, ...):
    Replace stored element with probability 1/i
\`\`\`
- $P(\\text{element } k \\text{ selected}) = 1/n$ for all $k$
- $O(n)$ time, $O(1)$ space
- Proof: $P_k = \\frac{1}{k} \\cdot \\frac{k}{k+1} \\cdot \\frac{k+1}{k+2} \\cdots \\frac{n-1}{n} = \\frac{1}{n}$

**Interview tip:** Both algorithms are elegant single-pass solutions. Reservoir sampling is especially useful for streaming data.`,
};

export default fc;
