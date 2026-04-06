import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-pr-05-reasonable-assumptions',
  type: 'concept',
  chapter: 1,
  section: '1.5',
  difficulty: 'easy',
  tags: ['principle', 'interview-strategy', 'communication'],

  front: `**Principle 5: Make Reasonable Assumptions**

When and how should you make assumptions in a quant interview?`,

  back: `**Core idea:** Real-world problems are always underdetermined. The ability to frame assumptions intelligently is a core quant skill.

**When to assume:**
- The problem is ambiguous (e.g., "is the track a loop?")
- A simplification makes the problem tractable without losing generality
- You need to pick a model (continuous vs. discrete, normal vs. fat-tailed)

**How to do it well:**
1. **State the assumption explicitly:** *"I'll assume all horses have distinct speeds."*
2. **Justify it briefly:** *"This is standard in elimination problems."*
3. **Flag if it matters:** *"If speeds can tie, the answer changes to X."*
4. **Keep assumptions conservative** — don't assume away the core difficulty

**Examples from Chapter 2:**
- *"Pirates are perfectly rational"* → enables backward induction
- *"The rope burns in exactly 1 hour"* → sets up the 45-minute problem
- *"The scale only tells you which side is heavier"* → restricts to ternary search

**Key insight:** Stating your assumptions is not weakness — it's precision. Interviewers respect it.`,
};

export default fc;
