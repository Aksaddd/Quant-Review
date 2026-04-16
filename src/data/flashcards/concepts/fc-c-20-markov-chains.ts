import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-20-markov-chains',
  type: 'concept',
  chapter: 5,
  section: '5.1',
  difficulty: 'medium',
  tags: ['technique', 'stochastic-processes', 'markov'],

  front: `**Markov Chains: Key Definitions**

State the Markov property and explain the classification of states: recurrent, transient, absorbing.`,

  back: `**Markov property:**
$$P(X_{n+1} = j \\mid X_n = i, X_{n-1}, \\ldots, X_0) = P(X_{n+1} = j \\mid X_n = i) = p_{ij}$$

The future depends only on the present, not the past.

**State classification:**
- **Accessible:** $i \\to j$ if $P(X_n = j | X_0 = i) > 0$ for some $n$
- **Communicating:** $i \\leftrightarrow j$ (accessible both ways)
- **Recurrent:** Returns to $i$ with probability 1
- **Transient:** Positive probability of never returning
- **Absorbing:** $p_{ii} = 1$ (once entered, never leaves)

**Absorption equations (transient state $i$):**
- Absorption probability: $a_i = \\sum_j p_{ij} a_j$
- Expected time: $\\mu_i = 1 + \\sum_j p_{ij} \\mu_j$

**Interview tip:** Set up the transition matrix, identify absorbing states, then solve the system of linear equations.`,
};

export default fc;
