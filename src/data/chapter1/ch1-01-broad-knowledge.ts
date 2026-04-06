import { Principle } from '@/lib/types';

const broadKnowledge: Principle = {
  id: 'ch1-01-broad-knowledge',
  chapter: 1,
  section: '1.1',
  sectionTitle: 'Interview Principles',
  number: 1,
  title: 'Principle 1: Broad Knowledge Base',
  content: `Quant interviewers are looking for candidates who have **strong analytical skills**, who are **quick learners** with **solid mathematical fundamentals**, and who can apply their skills in a practical setting. They evaluate candidates across multiple dimensions simultaneously — you cannot specialize into just one area.

**Areas you must cover:**

- **Brain teasers and mental math** — logic puzzles, probability, game theory, counting problems
- **Calculus and linear algebra** — derivatives, integrals, matrices, eigenvalues
- **Probability and statistics** — distributions, conditional probability, expectation, variance, law of large numbers, CLT
- **Finance** — derivatives pricing, options theory (Black-Scholes), fixed income, risk measures
- **Stochastic processes** — random walks, Brownian motion, Itô's lemma, SDEs
- **Algorithms and data structures** — sorting, searching, dynamic programming, complexity analysis
- **Programming** — C++, Python, SQL — you need to code quickly and correctly under pressure

**How to build breadth:**

Work through this book cover to cover. Simultaneously, pick up a standard options textbook (Hull's *Options, Futures, and Other Derivatives* is the standard), practice coding problems on LeetCode (aim for medium/hard), and review your probability textbook.

**The interview reality:** At top quant firms (Citadel, Two Sigma, Jane Street, DE Shaw, Renaissance), you will face multiple rounds testing all of these areas. A candidate who is exceptional in one area but weak in another will be cut. Breadth is your floor; depth is your ceiling.`,
  keyTakeaway: 'You cannot specialize. Cover mathematics, probability, finance, stochastic processes, and programming — all of them.',
};

export default broadKnowledge;
