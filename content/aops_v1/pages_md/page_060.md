We can find a (slightly more complicated) rule to test for divisibility by 3. Let's use 7965. We divide it not into two parts as above, but many more, writing it as $7000 + 900 + 60 + 5$. Since $10 \equiv 1 \pmod{3}$, taking the sum mod 3 causes each factor of 10 to reduce to a 1. (For example, $100 \equiv 10 \cdot 10 \pmod{3} \equiv 1 \cdot 1 \pmod{3} \equiv 1 \pmod{3}$.) Hence we have

$$\begin{aligned}
7965 &\equiv 7000 + 900 + 60 + 5 \pmod{3} \\
&\equiv 7 \cdot 10 \cdot 10 \cdot 10 + 9 \cdot 10 \cdot 10 + 6 \cdot 10 + 5 \pmod{3} \\
&\equiv 7 \cdot 1 \cdot 1 \cdot 1 + 9 \cdot 1 \cdot 1 + 6 \cdot 1 + 5 \pmod{3} \\
&\equiv 7 + 9 + 6 + 5 \pmod{3}.
\end{aligned}$$

Thus a number is congruent to the sum of its digits mod 3! In general, then, *a number is divisible by 3 if and only if the sum of its digits is*.

*EXERCISE 5-20* For the numbers 1717, 3451, and 173451, test for divisibility by 3 by the shortcut and by direct division.

*EXERCISE 5-21* Find the divisibility shortcut for 9; recreate the discussion of divisibility by 3, except using $10 \equiv 1 \pmod{9}$.

*EXERCISE 5-22* Which of the following is divisible by 3 but not by 9: 4995, 4996, 4997, 4998, 4999?

We have been able to get good divisibility rules for 10 and its divisors, and for 3 and 9. How about for 11? We can write $10 \equiv -1 \pmod{11}$ (does this make sense?) to simplify. Each power of 10 will thus be congruent to a power of $-1$ when we write the number in mod 11, e.g. $1000 \equiv (10)^3 \equiv (-1)^3 \equiv -1 \pmod{11}$. Hence

$$\begin{aligned}
7964 &\equiv 7 \cdot 10^3 + 9 \cdot 10^2 + 6 \cdot 10 + 4 \pmod{11} \\
&\equiv 7 \cdot (-1)^3 + 9 \cdot (-1)^2 + 6 \cdot (-1) + 4 \pmod{11} \\
&\equiv -7 + 9 - 6 + 4 \pmod{11}.
\end{aligned}$$

Hence, *a number is divisible by 11 if and only if the sum of its digits with alternating signs is*.

What if the alternating sum is negative? If it is $-11$, $-22$, etc., the number is divisible, otherwise not. This is because $-11$, $-22$, etc. are all evenly divisible by 11. If the alternating sum is 0, then the number is divisible by 11, as 0 is divisible by all numbers. You might be uncomfortable with using negatives for divisibility, but they are fine in both divisibility and modular arithmetic, as in the example of $10 \equiv -1 \pmod{11}$ above.

*EXERCISE 5-23* Which of the following are divisible by 11: 11, 111, 1111, 1716, 1761, 152637?

*EXERCISE 5-24* Prove, using our rule, that a two-digit number is divisible by 11 if and only if its digits are the same.

**EXAMPLE 5-8.** How would you test a number for divisibility by 12?

*Solution:* We might try to build a rule similar to that for 11, but there is a much easier way. Since 12 factors into $4 \times 3$, a number is divisible by 12 if it is divisible by 4 and by 3; divisibility by these numbers can be easily tested.

This shows that in general composite numbers can be analyzed in terms of the numbers which divide them.
