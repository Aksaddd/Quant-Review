import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-04-birthday-problem',
  type: 'problem',
  chapter: 2,
  section: '2.2',
  difficulty: 'hard',
  tags: ['logic', 'deduction', 'elimination'],
  problemId: 'ch2-04-birthday-problem',

  front: `**Birthday Problem (Logic Deduction)**

Dates: Mar 4/5/8 · Jun 4/7 · Sep 1/5 · Dec 1/2/8.
You know the month; colleague C knows the day.

You: *"I don't know, and C doesn't know either."*
C: *"I didn't know, but now I do."*
You: *"Now I know too."*

**What is the birthday?**`,

  back: `**3-step elimination:**

**Step 1** — Your certainty that C doesn't know rules out any month containing a unique day:
- Day 7 only in Jun → eliminate June
- Day 2 only in Dec → eliminate December
- Remaining: **Mar 4, Mar 5, Mar 8, Sep 1, Sep 5**

**Step 2** — C now knows → day must be unique among remaining:
- Day 5 appears in both Mar and Sep → eliminate Mar 5, Sep 5
- Remaining: **Mar 4, Mar 8, Sep 1**

**Step 3** — You now know → your month has only one remaining date:
- March has two (4 and 8) → not March
- September has one (Sep 1) → **September**

**Answer: September 1**`,
};

export default fc;
