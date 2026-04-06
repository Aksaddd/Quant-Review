import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-13-door-to-offer',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'medium',
  tags: ['logic', 'deduction', 'classic'],
  problemId: 'ch2-13-door-to-offer',

  front: `**Door to Offer**

Two doors: one leads to a job offer, one to rejection. Two guards — one always lies, one always tells the truth. You don't know which is which.

**You get one yes/no question. What do you ask?**`,

  back: `**The question:** *"Would the OTHER guard say that your door leads to the job offer?"*

**Why it works — double negation cancels out:**

| Guard | At offer door | Answer |
|-------|--------------|--------|
| Truth-teller | Liar would say "No" | Reports: **No** |
| Liar | Truth-teller would say "Yes" | Reports: **No** |
| Truth-teller | At exit — liar says "Yes" | Reports: **Yes** |
| Liar | At exit — truth-teller says "No" | Reports: **Yes** |

**Rule:** Answer **No** → take THIS door. Answer **Yes** → take the OTHER door.`,
};

export default fc;
