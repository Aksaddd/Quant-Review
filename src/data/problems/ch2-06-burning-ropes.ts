import { Problem } from '@/lib/types';

const burningRopes: Problem = {
  id: 'ch2-06-burning-ropes',
  chapter: 2,
  section: '2.2',
  sectionTitle: 'Logic Reasoning',
  title: 'Burning Ropes',
  difficulty: 'medium',
  keyTechnique: 'Creative measurement, halving by double ignition',
  tags: ['logic', 'measurement', 'creative', 'reasoning'],

  setup: `You have **two ropes**, each of which takes exactly **1 hour to burn completely**. The ropes burn at **non-uniform rates** — you cannot use the length of the rope to measure time.

**How do you measure exactly 45 minutes?**`,

  solution: `**Key insight:** Lighting a rope from **both ends simultaneously** makes it burn in exactly **half** the time, regardless of density variation.

**Strategy:**

1. At time **0:00** — Light **both ends of Rope 1** AND **one end of Rope 2** simultaneously.
2. At time **0:30** — Rope 1 finishes burning (it burned from both ends = 30 min). At this exact moment, **light the other end of Rope 2**.
3. At time **0:45** — Rope 2 finishes burning. It had 30 minutes of burn time remaining, but is now burning from both ends → finishes in **15 more minutes**.

**Timeline:**
\`\`\`
0:00 ──── Rope 1: lit both ends ──── 0:30 (done)
0:00 ──── Rope 2: lit one end ──────────── 0:30 ─── lit other end ─── 0:45 (done)
\`\`\`

**Total time measured: 30 + 15 = 45 minutes.**

---

**Final Answer: 45 minutes.** Light rope 1 from both ends and rope 2 from one end simultaneously. When rope 1 burns out (30 min), light the other end of rope 2. It burns out 15 min later.`,

  hints: [
    'What happens if you light a rope from both ends at once?',
    'How can you create a 15-minute interval from a rope that has 30 minutes left?',
    'Start both ropes at the same time — but differently.',
  ],

  finalAnswer: '45 minutes. Light rope 1 from both ends + rope 2 from one end. When rope 1 is done (30 min), light the other end of rope 2 — it burns out in 15 more minutes.',
};

export default burningRopes;
