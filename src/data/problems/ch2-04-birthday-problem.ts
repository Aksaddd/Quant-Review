import { Problem } from '@/lib/types';

const birthdayProblem: Problem = {
  id: 'ch2-04-birthday-problem',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Birthday Problem',
  difficulty: 'hard',
  keyTechnique: 'Deductive logic, elimination',
  tags: ['logic', 'deduction', 'elimination', 'reasoning'],

  setup: `Your boss A's birthday is one of the following 10 dates:

- Mar 4, Mar 5, Mar 8
- Jun 4, Jun 7
- Sep 1, Sep 5
- Dec 1, Dec 2, Dec 8

You are told only the **month**. Your colleague C is told only the **day**.

The following conversation takes place:

- **You say:** *"I don't know A's birthday, and I know that C doesn't know it either."*
- **C says:** *"I didn't know A's birthday before, but now I do."*
- **You say:** *"Now I know it too."*

**What is A's birthday?**`,

  solution: `**Step 1 — Analyze your first statement.**

You said C doesn't know. For C to know immediately, C's day would have to appear in only one month. Check which days are unique:
- Day **7** appears only in Jun → if C has 7, C knows immediately (Jun 7)
- Day **2** appears only in Dec → if C has 2, C knows immediately (Dec 2)

Since you are *certain* C doesn't know, the month you were told cannot be **June** or **December** (as those contain the unique-day dates). This eliminates: Jun 4, Jun 7, Dec 1, Dec 2, Dec 8.

**Remaining candidates:** Mar 4, Mar 5, Mar 8, Sep 1, Sep 5

---

**Step 2 — Analyze C's statement.**

C now knows the birthday. From the remaining candidates, C can deduce. If C's day still appeared in two remaining months, C couldn't know. Check day **5**: appears in both Mar 5 and Sep 5 — C still couldn't determine it. So day 5 is eliminated.

Eliminated: Mar 5, Sep 5

**Remaining candidates:** Mar 4, Mar 8, Sep 1

---

**Step 3 — Analyze your second statement.**

You now know too. March has **two** remaining candidates (Mar 4 and Mar 8), but September has only **one** (Sep 1). Since you know, you must have been told **September**.

---

**Final Answer: September 1.**`,

  hints: [
    'Which days appear in only one month? If C had one of those days, C would already know.',
    'Your certainty that C doesn\'t know eliminates entire months. Which months must be ruled out?',
    'After eliminating those months, which days still appear more than once in the remaining list?',
  ],

  finalAnswer: 'September 1.',
};

export default birthdayProblem;
