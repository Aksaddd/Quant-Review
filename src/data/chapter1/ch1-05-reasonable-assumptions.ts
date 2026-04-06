import { Principle } from '@/lib/types';

const reasonableAssumptions: Principle = {
  id: 'ch1-05-reasonable-assumptions',
  chapter: 1,
  section: '1.1',
  sectionTitle: 'Interview Principles',
  number: 5,
  title: 'Principle 5: Make Reasonable Assumptions',
  content: `Real-world quant problems are almost never fully specified. Part of what is being tested is your ability to **identify what you need to assume**, make **defensible choices**, and **proceed despite ambiguity**.

**Why assumptions are necessary:**

In research and trading, you constantly work with incomplete information. A model requires assumptions about volatility, correlation, liquidity. A strategy requires assumptions about market microstructure. The ability to make calibrated, reasonable assumptions and be explicit about them is a core professional skill — and it is tested in interviews.

**How to handle assumptions in an interview:**

1. **Identify them explicitly.** Don't slip assumptions in silently. State them: *"I'm going to assume the market is frictionless — no transaction costs."* This shows awareness that you made a choice.

2. **Make them reasonable and conventional.** Default to the standard assumptions in your domain. For probability problems: independent events unless stated otherwise, fair coins, uniform distributions. For finance: no arbitrage, risk-neutral pricing.

3. **State the impact.** *"If this assumption doesn't hold, the answer would change because..."* This shows you understand what the assumption is doing.

4. **Resolve ambiguities by asking, not guessing silently.** If you genuinely can't proceed without knowing something, ask: *"Is the ball equally likely to be lighter or heavier?"* But don't ask about things you can figure out yourself — that signals you can't work independently.

**The boundary of reasonable:**

Assumptions should be *necessary* (you can't solve without them) and *minimal* (you're not assuming away the difficulty of the problem). An interviewer will push back if your assumptions make the problem trivial.

**Example in practice:**

*Problem: "How many piano tuners are in Chicago?"*

You cannot solve this without assumptions. The right move is to build a Fermi estimation: assume a population of ~2.7 million, average household size of 2.5 people, fraction who own pianos (~1 in 20 households), how often a piano needs tuning (once per year), how long it takes to tune a piano (2 hours), and how many hours a tuner works per year. Each assumption is explicit, reasonable, and computable. The answer doesn't need to be exact — the methodology does.`,
  keyTakeaway: 'State assumptions explicitly, make them reasonable and conventional, and explain their impact on the solution.',
};

export default reasonableAssumptions;
