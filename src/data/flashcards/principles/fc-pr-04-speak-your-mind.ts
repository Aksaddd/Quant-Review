import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-pr-04-speak-your-mind',
  type: 'concept',
  chapter: 1,
  section: '1.4',
  difficulty: 'easy',
  tags: ['principle', 'interview-strategy', 'communication'],

  front: `**Principle 4: Speak Your Mind**

Why must you vocalize your reasoning in a quant interview? What does a strong verbal response look like?`,

  back: `**Core idea:** Quant firms hire people to reason through hard problems collaboratively. Silent thinking — even if correct — signals poor communication and makes you unreadable.

**What "speaking your mind" looks like:**
- *"I'm going to start by simplifying to 2 pirates and work up…"*
- *"I notice the key constraint here is that the burn rate is non-uniform, so length is useless…"*
- *"My first instinct is X, but let me check if that's optimal…"*
- *"I'm not sure yet, but I think the parity of the red balls might be the invariant…"*

**Why it matters:**
1. **Gives credit for partial progress** — even if you don't finish, showing smart reasoning scores points
2. **Invites course correction** — the interviewer can nudge you if you're heading wrong
3. **Demonstrates collaboration** — quant desks value people who think out loud
4. **Buys time** — narrating slows down your brain's impulse to jump to wrong conclusions

**Never:** Sit in silence for more than 30 seconds. Say *"Let me think out loud…"* and start narrating.`,
};

export default fc;
