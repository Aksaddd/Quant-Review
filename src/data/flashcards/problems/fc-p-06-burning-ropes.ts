import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-06-burning-ropes',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'medium',
  tags: ['logic', 'measurement', 'creative'],
  problemId: 'ch2-06-burning-ropes',

  front: `**Burning Ropes**

Two ropes each burn in exactly 1 hour, but unevenly (can't measure by length).

**How do you measure exactly 45 minutes?**`,

  back: `**Key insight:** Lighting a rope from both ends halves its remaining burn time.

**Steps:**
1. **t=0:** Light rope 1 from **both ends** + rope 2 from **one end**
2. **t=30 min:** Rope 1 burns out → immediately light the **other end of rope 2**
3. **t=45 min:** Rope 2 burns out

30 min (rope 1) + 15 min (rope 2 from both ends) = **45 minutes**`,
};

export default fc;
