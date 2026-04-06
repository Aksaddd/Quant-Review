import { Problem } from '@/lib/types';

const tigerAndSheep: Problem = {
  id: 'ch2-02-tiger-and-sheep',
  chapter: 2,
  section: '2.1',
  sectionTitle: 'Problem Simplification',
  title: 'Tiger and Sheep',
  difficulty: 'medium',
  keyTechnique: 'Problem simplification, parity',
  tags: ['parity', 'game-theory', 'logic', 'simplification'],

  setup: `100 tigers and 1 sheep are placed on a magic island that has plenty of grass. Tigers can eat grass, but they **prefer** to eat sheep.

The rules:
- Only **one tiger** can eat the sheep at a time.
- A tiger that eats the sheep **becomes a sheep** itself.
- All tigers are **perfectly rational** — their top priority is to survive.

**Will the sheep be eaten?**`,

  solution: `**Strategy: Simplify to small cases and look for a parity pattern.**

**n = 1 tiger:** The single tiger eats the sheep immediately — there is no threat.
→ **Sheep is eaten.**

**n = 2 tigers:** If tiger A eats the sheep, A becomes a sheep and will be eaten by tiger B. Knowing this, neither tiger eats.
→ **Sheep is safe.**

**n = 3 tigers:** Any tiger knows that after eating the sheep and becoming a sheep, only 2 tigers remain. From the n = 2 case, a lone sheep with 2 tigers is safe. So the eating tiger survives. Rational tigers will eat.
→ **Sheep is eaten.**

**n = 4 tigers:** After one tiger eats, we have 3 tigers and 1 new sheep — and from the n = 3 case, that sheep gets eaten. No tiger wants to become the new sheep. Nobody eats.
→ **Sheep is safe.**

**Pattern:**

| # Tigers | Outcome |
|----------|---------|
| Odd | Sheep is **eaten** |
| Even | Sheep is **safe** |

---

**Final Answer:** With **100 tigers (even)**, the sheep will **NOT** be eaten.`,

  hints: [
    'Start with 1 tiger. What does it do?',
    'Now try 2 tigers. Would either tiger risk eating the sheep?',
    'What pattern do you see between n = 1, 2, 3, 4? Is it related to odd vs. even?',
  ],

  finalAnswer: 'The sheep will NOT be eaten. With an even number of tigers, no tiger will risk eating.',
};

export default tigerAndSheep;
