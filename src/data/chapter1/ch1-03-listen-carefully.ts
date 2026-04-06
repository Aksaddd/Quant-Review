import { Principle } from '@/lib/types';

const listenCarefully: Principle = {
  id: 'ch1-03-listen-carefully',
  chapter: 1,
  section: '1.1',
  sectionTitle: 'Interview Principles',
  number: 3,
  title: 'Principle 3: Listen Carefully',
  content: `Many candidates fail not because they lack knowledge but because they **didn't fully understand the question** before launching into a solution. Listening is an active skill.

**The classic mistake:**

An interviewer asks: *"You have a 3-gallon jug and a 5-gallon jug. How do you measure exactly 4 gallons?"*

A candidate who isn't listening carefully might start solving a different version — maybe they misheard "4" as "2", or assumed the jugs were different sizes. They produce a confident, correct-looking answer to the wrong problem.

**What careful listening looks like:**

1. **Let the interviewer finish.** Do not interrupt or start solving while the problem is still being stated. You will miss constraints.

2. **Repeat the problem back.** Before you begin, paraphrase: *"So I want to find the minimum number of weighings to identify one defective ball out of 12, where I don't know if the defective ball is heavier or lighter — is that right?"* This confirms understanding and often prompts the interviewer to correct a misunderstanding before you waste 5 minutes.

3. **Identify the constraints explicitly.** What is given? What is fixed? What are you optimizing? Write them down.

4. **Ask for clarification on ambiguities.** If the problem says "a fair coin," you know the probability is 0.5. If it says "a biased coin," ask what the bias is, or whether you need to solve in general. Interviewers reward candidates who identify ambiguities.

5. **Notice when the interviewer gives hints.** Sometimes an interviewer will say "think about what happens at the boundary" or "consider the parity." These are not casual remarks — they are directional hints. Follow them.

**The meta-skill:** Treating the interviewer as a collaborator rather than an adversary. They want you to succeed. They are giving you information through their words, their emphasis, and their reactions to your approach.`,
  keyTakeaway: 'Repeat the problem back before solving. Identify constraints explicitly. Treat interviewer hints as navigation signals.',
};

export default listenCarefully;
