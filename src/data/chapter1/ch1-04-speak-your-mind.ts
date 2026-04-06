import { Principle } from '@/lib/types';

const speakYourMind: Principle = {
  id: 'ch1-04-speak-your-mind',
  chapter: 1,
  section: '1.1',
  sectionTitle: 'Interview Principles',
  number: 4,
  title: 'Principle 4: Speak Your Mind',
  content: `Interviewers cannot assess what they cannot see. **Thinking silently is a disqualifier** in quant interviews, even when your reasoning is correct.

**Why this matters:**

A quant researcher or trader on the job needs to communicate complex quantitative reasoning to colleagues, clients, and risk managers. The interview is testing this communication skill just as much as it is testing your mathematical ability. A candidate who produces the right answer after 5 minutes of silence gives the interviewer nothing to evaluate — and nothing to help with if you're going in the wrong direction.

**What speaking your mind looks like:**

1. **Narrate your setup.** *"I'm going to define the state space first. Let S be the number of coins remaining..."*

2. **Announce your approach before executing it.** *"I think this might be a parity argument — let me check if the invariant holds..."* This lets the interviewer redirect you before you go too far down a wrong path.

3. **Verbalize when you're stuck.** *"I can see that the recursion converges, but I'm not sure how to close-form it. Let me try a few small cases to see if there's a pattern."* This shows methodical thinking and invites the interviewer to help.

4. **Flag assumptions.** *"I'm assuming the coin is fair — if it's biased, this approach changes."*

5. **Check in.** After stating your solution, ask: *"Does that match what you were expecting?"* or *"Is there a cleaner way to see this?"* This shows intellectual humility and keeps the conversation collaborative.

**The correction opportunity:** When you think aloud, the interviewer can correct you early. A wrong assumption caught at minute 2 is recoverable. The same wrong assumption discovered at minute 8 (after you've built an entire solution on it) is a failed interview. Speaking your mind is risk management.

**Common fear:** "What if I say something wrong?" The answer is: saying something wrong and correcting it is far better than saying nothing. Interviewers know these problems are hard. They are evaluating your *process*, not just your answer.`,
  keyTakeaway: 'Never think silently. Narrate your reasoning, announce your approach, and verbalize when stuck — this lets interviewers guide and evaluate you.',
};

export default speakYourMind;
