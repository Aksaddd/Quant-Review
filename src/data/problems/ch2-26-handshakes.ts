import { Problem } from '@/lib/types';

const handshakes: Problem = {
  id: 'ch2-26-handshakes',
  chapter: 2,
  section: '2.6',
  sectionTitle: 'The Pigeon Hole Principle',
  title: 'Handshakes',
  difficulty: 'easy',
  keyTechnique: 'Pigeon Hole Principle, proof',
  tags: ['pigeon-hole', 'combinatorics', 'proof', 'logic'],

  setup: `At a party of **26 people**, each person shook hands with **at least 1** other person.

**Prove that at least two people shook hands with exactly the same number of people.**`,

  solution: `### Setting Up the Problem

**Apply the Pigeon Hole Principle:**

- **Pigeons** = 26 people
- **Holes** = possible handshake counts

Each person can shake hands with between **1 and 25** people (at least 1, at most 25 others).

That gives **25 possible values** (holes): {1, 2, 3, …, 25}.

### Key Insight

It's impossible for one person to have shaken hands with everyone (25 people) while another shook hands with no one (0 people), because if someone shook 25 hands, everyone must have shaken at least 1. So values 0 and 25 cannot both occur — there are always **at most 25 distinct values** available.

### Applying Pigeon Hole

**26 people** (pigeons) into **25 possible handshake counts** (holes) → by the Pigeon Hole Principle, **at least two people must have the same handshake count**. ∎

### Final Answer

By the Pigeon Hole Principle, 26 people with handshake counts in {1,…,25} guarantees at least two share the same count.`,

  hints: [
    'How many distinct handshake counts are possible for 26 people?',
    'Can someone have 0 handshakes and someone else have 25 simultaneously?',
    'You have more people than possible handshake counts — apply Pigeon Hole.',
  ],

  finalAnswer: '26 people, at most 25 distinct handshake counts → at least two must match, by Pigeon Hole.',
};

export default handshakes;
