import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-pr-01-broad-knowledge',
  type: 'concept',
  chapter: 1,
  section: '1.1',
  difficulty: 'easy',
  tags: ['principle', 'interview-strategy', 'preparation'],

  front: `**Principle 1: Build a Broad Knowledge Base**

What does this principle mean for quant interview preparation, and what areas must you cover?`,

  back: `**Core idea:** Quant interviews test breadth AND depth. You can't specialize into one area and ignore the rest.

**Must-cover areas:**
- **Mathematics:** Probability, statistics, calculus, linear algebra, combinatorics
- **Brain teasers:** Logic, game theory, proof techniques
- **Finance:** Derivatives, options, fixed income, risk
- **Programming:** Algorithms, data structures, coding problems
- **Stochastic processes:** Brownian motion, Itô calculus, SDEs

**Practical approach:**
- Work through this entire book cover-to-cover
- Practice LeetCode (medium/hard) for coding rounds
- Read Hull's "Options, Futures, and Other Derivatives" for finance
- Know your resume projects deeply — they will probe every line

**Key insight:** Interviewers test whether you can connect concepts across domains. A probabilist who can't code, or a coder who can't reason about risk, will be eliminated.`,
};

export default fc;
