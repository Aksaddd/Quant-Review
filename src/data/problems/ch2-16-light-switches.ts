import { Problem } from '@/lib/types';

const lightSwitches: Problem = {
  id: 'ch2-16-light-switches',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Light Switches',
  difficulty: 'medium',
  keyTechnique: 'Two binary properties (on/off + hot/cold)',
  tags: ['logic', 'creative', 'binary-states', 'reasoning'],

  setup: `There is **one light bulb** inside a closed room. Outside the room are **four switches** — exactly one controls the bulb. You cannot see inside the room from outside.

**How many times must you enter the room to determine which switch controls the bulb?**`,

  solution: `### Key Insight

**Answer: Once.**

A light bulb has **two independent binary properties**:
1. **On or off** (current state)
2. **Hot or cold** (recent history — was it on?)

These two properties together encode **4 distinct states**, which is exactly what you need to identify 4 switches.

### Strategy

1. Turn on **Switch 1** and **Switch 2**. Wait several minutes.
2. Turn **off Switch 2** (leave Switch 1 on). Turn on **Switch 3**.
3. Enter the room **once** and observe:

| Bulb state | Conclusion |
|------------|------------|
| **On + Hot** | Switch 1 (currently on, has been on a while) |
| **Off + Hot** | Switch 2 (was on and warm, now off) |
| **On + Cold** | Switch 3 (just turned on, not warm yet) |
| **Off + Cold** | Switch 4 (never turned on) |

### Final Answer

**1 entry.** Use the bulb's thermal property as a second information channel alongside its on/off state.`,

  hints: [
    'With just on/off, you can distinguish 2 states. But you have 4 switches. What else can a light bulb tell you?',
    'A bulb that was recently on is warm. How can you exploit this?',
    'Turn two switches on, then turn one off, then turn a third on — then enter once.',
  ],

  finalAnswer: 'Once. Turn on switches 1 & 2, wait, turn off 2, turn on 3, enter: on+hot=1, off+hot=2, on+cold=3, off+cold=4.',
};

export default lightSwitches;
