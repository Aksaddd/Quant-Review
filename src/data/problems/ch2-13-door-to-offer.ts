import { Problem } from '@/lib/types';

const doorToOffer: Problem = {
  id: 'ch2-13-door-to-offer',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Door to Offer',
  difficulty: 'medium',
  keyTechnique: 'Double-negation questioning, logic elimination',
  tags: ['logic', 'game-theory', 'deduction', 'classic'],

  setup: `There are **two doors**: one leads to a job offer, one leads to the exit (rejection). Each door has a **guard**:
- One guard **always tells the truth**
- One guard **always lies**

You do not know which guard is which, or which door leads to the offer.

You may ask **one guard one yes/no question**.

**What question do you ask, and how do you use the answer?**`,

  solution: `### The Question

Ask one guard:

> *"If I asked the other guard whether your door leads to the job offer, would they say yes?"*

### Why This Works — 4 Cases

| Your door | Guard asked | Other guard's answer | Double negation result |
|-----------|-------------|---------------------|----------------------|
| Offer | Truth-teller | Liar would say **No** (lying about Yes) | Truth-teller reports: **No** |
| Offer | Liar | Truth-teller would say **Yes** | Liar reports: **No** |
| Exit | Truth-teller | Liar would say **Yes** (lying about No) | Truth-teller reports: **Yes** |
| Exit | Liar | Truth-teller would say **No** | Liar reports: **Yes** |

**In all four cases:**
- Answer is **No** → the door you're asking about leads to the **offer** ✓
- Answer is **Yes** → the door you're asking about leads to the **exit** → go to the other door ✓

The double-negation (a liar lying about a truth-teller, or a truth-teller reporting a liar's lie) **always cancels out**, making the answer reliable regardless of which guard you ask.

### Final Answer

Ask either guard: *"Would the other guard say this is the offer door?"* If **No** → take this door. If **Yes** → take the other door.`,

  hints: [
    'Direct questions fail because you don\'t know if you\'re talking to the liar or truth-teller.',
    'What if you ask about what the OTHER guard would say? How does the double negation affect the answer?',
    'Work through all 4 cases: (truth-teller at offer, liar at offer, truth-teller at exit, liar at exit).',
  ],

  finalAnswer: 'Ask: "Would the other guard say this door leads to the offer?" No → take this door. Yes → take the other door.',
};

export default doorToOffer;
