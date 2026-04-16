import { Problem } from '@/lib/types';

const horseRace: Problem = {
  id: 'ch2-09-horse-race',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Horse Race',
  difficulty: 'medium',
  keyTechnique: 'Structured elimination, tournament reasoning',
  tags: ['logic', 'optimization', 'elimination', 'reasoning'],

  setup: `You have **25 horses**, each running at a unique constant speed. The track fits **5 lanes** — you can race at most 5 horses at a time. You have **no stopwatch**; you can only compare relative finishing positions within a race.

**Find the 3 fastest horses using the minimum number of races.**`,

  solution: `### Strategy Overview

Use structured elimination across 3 rounds.

### Round 1: Group Races (5 Races)

Divide the 25 horses into 5 groups of 5. Race each group. Label the winner of each group as horses 1, 6, 11, 16, 21 (with groups G1–G5 respectively). The losers (4th, 5th in each group) cannot be top-3 overall.

*After Round 1: 5 group winners identified. (5 races used)*

### Round 2: Race the Winners (1 Race)

Race the 5 group winners. Without loss of generality, the order is:

**1st > 6th > 11th > 16th > 21st**

Now we can eliminate:
- Horses 16 and 21 (their group winners finished 4th and 5th — too slow for top 3)
- All horses in the groups of 16 and 21
- Horses that finished 4th or 5th in any group

**Horse 1 is the fastest overall.** Candidates for 2nd and 3rd:
- From G1: horses **2** and **3** (same group as the overall winner)
- From G2: horses **6** and **7** (group winner was 2nd overall)
- From G3: horse **11** (group winner was 3rd overall — only it can reach top 3)

*5 candidates remain for 2nd and 3rd place.*

### Round 3: Final Race (1 Race)

Race horses 2, 3, 6, 7, and 11. The top **2 finishers** are the 2nd and 3rd fastest overall.

**Final Answer: Minimum 7 races** (5 + 1 + 1).`,

  hints: [
    'Can you guarantee finding the top 3 in just 5 races? Why not?',
    'After racing 5 group winners, what can you eliminate immediately?',
    'Which horses are still candidates for 2nd and 3rd place after the group-winner race?',
  ],

  finalAnswer: '7 races minimum. 5 group races + 1 race of group winners + 1 final race of the top 5 candidates.',
};

export default horseRace;
