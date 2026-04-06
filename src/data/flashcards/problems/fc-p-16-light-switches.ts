import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-16-light-switches',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'medium',
  tags: ['logic', 'creative', 'binary-states'],
  problemId: 'ch2-16-light-switches',

  front: `**Light Switches**

1 bulb inside a room, 4 switches outside. Exactly one controls the bulb.

**How many times must you enter the room to find the right switch?**`,

  back: `**Answer: Once.** Use the bulb's two binary properties: **on/off** + **hot/cold**.

**Protocol:**
1. Turn on switches **1** and **2**, wait a few minutes
2. Turn **off switch 2**, turn **on switch 3**
3. Enter once and observe:

| Bulb | Answer |
|------|--------|
| On + Hot | Switch **1** |
| Off + Hot | Switch **2** (was on, now off) |
| On + Cold | Switch **3** (just turned on) |
| Off + Cold | Switch **4** (never on) |

`,
};

export default fc;
