import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-27-bit-manipulation',
  type: 'concept',
  chapter: 7,
  section: '7.2',
  difficulty: 'easy',
  tags: ['technique', 'algorithms', 'binary'],

  front: `**The Power of Two: Bit Tricks**

How do you check if an integer is a power of 2? How do you swap two integers without extra storage?`,

  back: `**Power of 2 check:**
\`\`\`
x > 0 && (x & (x - 1)) == 0
\`\`\`
Why: $2^n$ has exactly one set bit; $2^n - 1$ has all lower bits set → AND = 0.

**Swap without temp variable:**
\`\`\`
// XOR method:
i ^= j;  j ^= i;  i ^= j;
// Arithmetic method:
i = i + j;  j = i - j;  i = i - j;
\`\`\`
Uses properties: $x \\oplus x = 0$ and $x \\oplus 0 = x$

**Multiply by 7 without * operator:**
\`\`\`
(x << 3) - x    // x * 8 - x = 7x
\`\`\`

**Simulate probability $p$ with coin flips:**
Write $p$ in binary: $p = 0.p_1 p_2 p_3 \\ldots$
Flip coins $s_1, s_2, \\ldots$ — if $s_i < p_i$: WIN; if $s_i > p_i$: LOSE; if equal: continue.

**Poisoned wine (1000 bottles, 10 mice):**
$2^{10} = 1024 > 1000$. Label bottles in binary; each mouse drinks from bottles where its bit = 1. Dead mice → binary number of poison bottle.`,
};

export default fc;
