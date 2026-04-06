import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-pr-02-practice-interview-skills',
  type: 'principle',
  chapter: 1,
  section: '1.2',
  difficulty: 'easy',
  tags: ['principle', 'interview-strategy', 'preparation'],

  front: `**Principle 2: Practice Your Interview Skills**

What does deliberate interview practice look like? How is it different from just studying?`,

  back: `**Core idea:** Knowing the material is necessary but not sufficient. You must practice performing under pressure.

**Key practice behaviors:**
- **Simulate the interview:** Solve problems out loud with a timer, not quietly at your desk
- **Flashcard-first:** Try to recall the answer before looking — passive re-reading creates false confidence
- **Mock interviews:** Use peers, mentors, or platforms like Pramp / Interviewing.io
- **Explain to a rubber duck:** If you can't explain it simply, you don't understand it well enough

**What to practice:**
- Brain teasers: speak through your reasoning step by step
- Math: derive, don't just state formulas
- Coding: write full, runnable code without IDE autocomplete
- Finance: walk through a trade or risk scenario end-to-end

**Common mistake:** Studying alone in reading mode. The interview is a performance — train for the performance, not just the material.`,
};

export default fc;
