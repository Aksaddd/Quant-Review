import { Problem } from '@/lib/types';

const messageDelivery: Problem = {
  id: 'ch2-14-message-delivery',
  chapter: 2,
  section: '2.3',
  sectionTitle: 'Thinking Out of the Box',
  title: 'Message Delivery',
  difficulty: 'easy',
  keyTechnique: 'Sequential locking, asymmetric key exchange',
  tags: ['logic', 'cryptography', 'security', 'creative'],

  setup: `You need to send an **important document** to a colleague via an **insecure messenger service**. The rules:

- Anything placed in an **unlocked box** will be stolen by the messenger.
- **Locks placed inside** the box are also stolen.
- Each person only has the key to **their own padlock**.
- You and your colleague each have one padlock and one key.

**How do you securely deliver the document?**`,

  solution: `**Strategy: Double-lock exchange (no shared key needed)**

**Step 1:** You place the document in the box, lock it with **your padlock**, and send it to your colleague.

**Step 2:** Your colleague **cannot open** your lock, but adds their **own padlock** to the box (now two locks) and sends it back to you.

**Step 3:** You receive the box with two locks. You use your key to **remove your padlock** (the colleague's lock keeps the box secure). Send it back.

**Step 4:** Your colleague receives the box locked only with **their own padlock**, opens it, and retrieves the document.

---

**Why it works:** At no point does the document travel without a lock. The messenger can never access the document because it is always secured by at least one lock they cannot open.

This is the physical analog of the **Shamir three-pass protocol** in cryptography.

---

**Final Answer:** Three trips: you lock it → colleague adds lock → you remove your lock → colleague opens theirs.`,

  hints: [
    'You can\'t send the key with the box — it would be stolen. What if you didn\'t need to send the key at all?',
    'What if both locks were on the box at the same time?',
    'Can you remove a lock without the other person\'s key?',
  ],

  finalAnswer: 'Three-trip protocol: send with your lock → colleague adds their lock → you remove your lock → colleague opens theirs.',
};

export default messageDelivery;
