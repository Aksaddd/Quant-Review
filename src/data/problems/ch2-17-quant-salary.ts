import { Problem } from '@/lib/types';

const quantSalary: Problem = {
  id: 'ch2-17-quant-salary',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Quant Salary',
  difficulty: 'easy',
  keyTechnique: 'Secure multi-party computation, random masking',
  tags: ['logic', 'cryptography', 'privacy', 'creative'],

  setup: `**8 quants** want to compute their **average salary** without anyone revealing their individual salary to anyone else.

**Design a protocol to accomplish this.**`,

  solution: `### Strategy: Random Masking with a Circular Chain

**Protocol:**

1. **Quant 1** picks a large **random number R** (known only to them). Adds their salary S₁. Passes the value **(R + S₁)** to Quant 2.
2. **Quant 2** adds their salary S₂. Passes **(R + S₁ + S₂)** to Quant 3.
3. Each subsequent quant adds their salary and passes the running sum along.
4. After Quant 8, the total **(R + S₁ + S₂ + … + S₈)** returns to **Quant 1**.
5. Quant 1 **subtracts R**, leaving **(S₁ + S₂ + … + S₈)**.
6. Divide by **8** → **average salary**.

### Why It's Secure

- No individual ever sees anyone else's salary directly.
- Every intermediate value is masked by R — meaningless without knowing R.
- Only Quant 1 knows R, and they only ever receive the masked total.

**Note:** This protocol is actually used in practice by data providers to anonymize fund position data while still computing aggregate statistics.

### Final Answer

Circular chain with random mask R — each quant adds their salary, Quant 1 removes R at the end, divide by 8.`,

  hints: [
    'What if the first person added a random number that only they know?',
    'Can subsequent people still add to the total without knowing what it represents?',
    'How does the first person "undo" their random mask at the end?',
  ],

  finalAnswer: 'Quant 1 adds random R + salary, passes around, each adds their salary, total returns to Quant 1 who subtracts R, then divides by 8.',
};

export default quantSalary;
