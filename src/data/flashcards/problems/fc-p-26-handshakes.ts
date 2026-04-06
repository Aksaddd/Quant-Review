import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-26-handshakes',
  type: 'problem',
  chapter: 2,
  section: '2.6',
  difficulty: 'easy',
  tags: ['pigeon-hole', 'proof'],
  problemId: 'ch2-26-handshakes',

  front: `**Handshakes**

At a party of 26 people, each shook hands with at least 1 other.

**Prove at least two people shook hands with the same number of people.**`,

  back: `**Pigeon Hole Principle:**

- **Pigeons** = 26 people
- **Holes** = possible handshake counts

Each person shook between **1 and 25** hands. That's 25 possible values.

**Key:** Can't have both 0 and 25 simultaneously (if someone shook 25 hands, everyone shook at least 1). So there are at most **25 distinct values**.

26 people, ≤ 25 distinct counts → **at least two share the same count**. ∎`,
};

export default fc;
