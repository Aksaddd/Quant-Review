import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-p-14-message-delivery',
  type: 'problem',
  chapter: 2,
  section: '2.3',
  difficulty: 'easy',
  tags: ['logic', 'cryptography', 'security'],
  problemId: 'ch2-14-message-delivery',

  front: `**Message Delivery**

Insecure messenger — anything in an unlocked box is stolen. Each person has only their own padlock and key.

**How do you securely send a document to a colleague?**`,

  back: `**Three-trip double-lock protocol (no shared key needed):**

1. **You** lock the box with your lock → send to colleague
2. **Colleague** adds their lock (now 2 locks) → sends back
3. **You** remove your lock → send back (secured by colleague's lock only)
4. **Colleague** removes their lock → opens box ✓

At no point does the document travel unlocked.

*This is the physical analog of the **Shamir three-pass protocol** in cryptography.*`,
};

export default fc;
