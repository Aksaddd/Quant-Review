import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-pr-03-listen-carefully',
  type: 'principle',
  chapter: 1,
  section: '1.3',
  difficulty: 'easy',
  tags: ['principle', 'interview-strategy', 'communication'],

  front: `**Principle 3: Listen Carefully**

Why is listening a critical interview skill for quant candidates? What should you listen for?`,

  back: `**Core idea:** Interviewers embed constraints, hints, and clarifications in the problem statement. Missing them wastes time and signals poor attention to detail.

**What to listen for:**
- **Exact constraints:** "At most" vs "at least", "strictly greater" vs "greater than or equal to"
- **Hidden assumptions:** "All pirates are rational" — this tells you game theory applies
- **Embedded hints:** If an interviewer rephrases or adds emphasis, they're guiding you
- **Follow-up cues:** "Interesting… what if you had n objects instead of 5?" — they're probing generalization

**Best practices:**
- **Repeat the problem back** in your own words before solving
- **Ask clarifying questions** before diving in: "Can I assume all speeds are distinct?"
- **Pause and listen** when the interviewer speaks — don't rush to solve while they're still talking
- **Note when hints are given** — acknowledge them and incorporate them

**Key insight:** A wrong answer to the right problem is better than a right answer to the wrong problem.`,
};

export default fc;
