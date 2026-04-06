import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-01-legendres-formula',
  type: 'formula',
  chapter: 2,
  section: '2.2',
  difficulty: 'easy',
  tags: ['formula', 'number-theory', 'factorials'],

  front: `**Legendre's Formula**

How many trailing zeros does **n!** have?

What is the general formula for the exponent of prime p in n!?`,

  back: `**Trailing zeros in n!** = number of times 10 divides n! = min(exp of 2, exp of 5) = **exp of 5** (since 2s always exceed 5s).

$$\text{Trailing zeros} = \sum_{k=1}^{\infty} \left\lfloor \frac{n}{5^k} \right\rfloor$$

**General (Legendre's Formula)** — exponent of prime p in n!:
$$v_p(n!) = \sum_{k=1}^{\infty} \left\lfloor \frac{n}{p^k} \right\rfloor = \frac{n - s_p(n)}{p - 1}$$

where $s_p(n)$ = digit sum of n in base p.

**For n = 100, p = 5:**
$$\lfloor 100/5 \rfloor + \lfloor 100/25 \rfloor + \lfloor 100/125 \rfloor = 20 + 4 + 0 = \mathbf{24}$$`,
};

export default fc;
