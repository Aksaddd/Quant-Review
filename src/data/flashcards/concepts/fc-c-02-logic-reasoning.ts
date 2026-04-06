import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-c-02-logic-reasoning',
  type: 'concept',
  chapter: 2,
  section: '2.2',
  difficulty: 'easy',
  tags: ['technique', 'strategy', 'logic'],

  front: `**Technique: Logic Reasoning**

What are the key strategies for solving pure logic problems in quant interviews?`,

  back: `**Core strategies:**

1. **Elimination** — rule out impossible states step by step (Birthday Problem)
2. **Information theory** — each observation has 3 outcomes (not 2); use ternary logic (Defective Ball)
3. **Invariant tracking** — find what never changes despite operations (Card Game)
4. **Creative measurement** — encode more than one channel of information (Light Switches: on/off + hot/cold)
5. **Worst-case optimization** — minimize the maximum steps needed (Horse Race: 7 races)

**Interview tip:** State your assumptions clearly. If you're stuck, ask "what information am I not using?"`,
};

export default fc;
