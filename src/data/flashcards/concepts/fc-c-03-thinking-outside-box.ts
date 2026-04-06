import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-03-thinking-outside-box',
  type: 'concept',
  chapter: 2,
  section: '2.3',
  difficulty: 'medium',
  tags: ['technique', 'strategy', 'creative'],

  front: `**Technique: Thinking Out of the Box**

What mental shifts unlock "out-of-the-box" problems? Give examples.`,

  back: `**Common "aha" patterns:**

| Pattern | Example |
|---------|---------|
| **Dual-use properties** | Bulb is hot/cold + on/off (Light Switches) |
| **Reuse/repurpose** | 6 flipped = 9 (Calendar Cubes) |
| **Symmetry breaks the constraint** | Flip all 20 coins (Coin Piles) |
| **Indirect protocol** | Double-lock avoids sharing keys (Message Delivery) |
| **Parity as invariant** | Track red ball count mod 2 (Last Ball) |
| **Random masking** | Add noise, remove it at the end (Quant Salary) |

**Mindset:** The "obvious" approach is usually wrong. Ask: *"What property of this object am I ignoring?"*`,
};

export default fc;
