import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-10-bayes-formula',
  type: 'formula',
  chapter: 4,
  section: '4.3',
  difficulty: 'easy',
  tags: ['formula', 'probability', 'bayes'],

  front: `**Bayes' Formula**

State Bayes' theorem and the Law of Total Probability.`,

  back: `**Bayes' Formula:**
$$P(F_j | E) = \\frac{P(E | F_j) \\cdot P(F_j)}{\\sum_{i} P(E | F_i) \\cdot P(F_i)}$$

**Law of Total Probability:**
$$P(E) = \\sum_{i} P(E | F_i) \\cdot P(F_i)$$

where $\\{F_1, F_2, \\ldots\\}$ is a partition of the sample space.

**Conditional probability:**
$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

**Key applications:**
- **Monty Hall:** Updating probability after host reveals a goat
- **Unfair Coin:** Inferring which coin was drawn after observing flips
- **Medical testing:** P(disease | positive test)

**Interview tip:** Always draw a probability tree for Bayes problems — it prevents sign/direction errors.`,
};

export default fc;
