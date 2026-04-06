import { Principle } from '@/lib/types';

const practiceSkills: Principle = {
  id: 'ch1-02-practice-skills',
  chapter: 1,
  section: '1.1',
  sectionTitle: 'Interview Principles',
  number: 2,
  title: 'Principle 2: Practice Your Interview Skills',
  content: `Having the knowledge is necessary but not sufficient. You also need to practice **applying** that knowledge under the pressure of a live interview. This is a separate skill that must be trained independently.

**Why practice matters:**

Knowing how to solve a problem at your desk and solving it correctly in 3 minutes while being watched are very different things. The cognitive load of the interview environment — time pressure, social pressure, communicating your reasoning out loud — consumes mental resources that you would otherwise use for solving the problem.

**How to practice effectively:**

1. **Timed problem sets.** Set a timer for 3–5 minutes per problem. If you can't solve it, move on. Review the solution, understand it fully, and retry from memory the next day.

2. **Mock interviews.** Practice with a partner who acts as the interviewer. The act of explaining your reasoning out loud while solving is a skill in itself. You need to do this repeatedly before the real thing.

3. **Mental math drills.** Quant interviewers often expect fast arithmetic. Practice multiplying two-digit numbers, computing percentages, and estimating orders of magnitude without a calculator.

4. **Spaced repetition.** Don't cram. Review problems you've seen before at increasing intervals — this is exactly what the flashcard system in this platform implements.

5. **Pattern recognition over memorization.** The goal is not to memorize solutions but to recognize *which technique applies* and *why*. When you see a new problem, you should be able to immediately classify it: "this is a Pigeon Hole problem", "this needs modular arithmetic", "this is a symmetry argument."

**The feedback loop:** After each practice session, identify the specific gaps — not "I got it wrong" but "I didn't recognize that this required induction" or "I set up the wrong base case." Target those gaps specifically.`,
  keyTakeaway: 'Knowledge without practice is not enough. Train under time pressure, practice thinking aloud, and use spaced repetition.',
};

export default practiceSkills;
