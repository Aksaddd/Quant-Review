import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-22-sorting-complexity',
  type: 'formula',
  chapter: 7,
  section: '7.1',
  difficulty: 'medium',
  tags: ['formula', 'algorithms', 'sorting', 'complexity'],

  front: `**Sorting Algorithms: Complexity Comparison**

State the time complexities for insertion sort, merge sort, and quicksort. What is the Master Theorem?`,

  back: `| Algorithm | Average | Worst | Space |
|-----------|---------|-------|-------|
| **Insertion Sort** | $\\Theta(n^2)$ | $\\Theta(n^2)$ | $O(1)$ |
| **Merge Sort** | $\\Theta(n\\log n)$ | $\\Theta(n\\log n)$ | $O(n)$ |
| **Quicksort** | $\\Theta(n\\log n)$ | $\\Theta(n^2)$ | $O(\\log n)$ |

**Lower bound:** Comparison-based sorting requires $\\Omega(n\\log n)$.

**Master Theorem** for $T(n) = aT(n/b) + f(n)$, let $c = \\log_b a$:
1. If $f(n) = O(n^{c-\\varepsilon})$: $T(n) = \\Theta(n^c)$
2. If $f(n) = \\Theta(n^c \\log^k n)$: $T(n) = \\Theta(n^c \\log^{k+1} n)$
3. If $f(n) = \\Omega(n^{c+\\varepsilon})$: $T(n) = \\Theta(f(n))$

**Applications:**
- Merge sort: $T(n) = 2T(n/2) + n$ → Case 2 → $\\Theta(n\\log n)$
- Binary search: $T(n) = T(n/2) + 1$ → Case 2 → $\\Theta(\\log n)$`,
};

export default fc;
