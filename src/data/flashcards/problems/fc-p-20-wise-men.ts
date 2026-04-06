import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-20-wise-men',
  type: 'problem',
  chapter: 2,
  section: '2.4',
  difficulty: 'hard',
  tags: ['symmetry', 'strategy', 'logic'],
  problemId: 'ch2-20-wise-men',

  front: `**Wise Men (Sultan's Glass)**

50 wise men, one glass (starts bottom-down). Each minute one random man enters — can flip or do nothing. Calls repeat; no one knows the history. If any wise man correctly declares "all 50 have been called," they go free.

**Design a guaranteed strategy.**`,

  back: `**Designate one wise man as the Spokesman.**

**Other 49 wise men:** The first time you find the glass **bottom-down** → flip it upside-down. Never flip again.

**Spokesman:** Every time you find the glass **upside-down** → flip it bottom-down and **increment count**.

When count = **49** → declare all 50 have been called. ✓

Each of the 49 sends exactly one signal (a flip). The spokesman counts all 49. He himself was called too (he's the one counting).`,
};

export default fc;
