**EXAMPLE 5-7.** If we are given that $a \equiv 0 \pmod{b}$, then the remainder when $a$ is divided by $b$ is 0. Thus we can conclude that $a$ is a multiple of $b$.

*EXERCISE 5-15* Find the smallest positive integer which 123 is congruent to mod 4. Find the smallest positive integer which 321 is congruent to mod 7.

*EXERCISE 5-16* Show that the square of any integer is congruent to either 0, 1, or 4 mod 8.

## 5.5 Tricks

Even at this early stage in understanding divisibility, we can find some tricks to tell if one number divides another. We start with the obvious example: a number is divisible by 10 if and only if its last digit is 0. This seems trivial, but then so will the rest of the rules in this section when you've used them a few times.

We start with the basic concept that a number, $y$ being divisible by another number, $x$ if and only if $x \equiv 0 \pmod{y}$. This just means that when we divide $x$ by $y$, the remainder is zero.

First we examine divisibility by 2. A number is divisible by 2 if and only if it is congruent to 0 mod 2. We can write the number, say 7965841, as the sum of its last digit and the rest, as in $7965841 \equiv 1 + 7965840$. Thus we can write $7965841 \equiv 1 + 7965840 \pmod{2}$. The second part ends with a zero, so is divisible by 10, or $7965840 = 10(\text{something})$. But $2 \mid 10$, so this means $7965840 \equiv 2(\text{something else})$, so that 2 divides 7965840, and $7965840 \equiv 0 \pmod{2}$. Substituting this in above, we find that $7965841 \equiv 1 \pmod{2}$, or a number is congruent to its last digit mod 2. So to test for divisibility by 2, we just test the last digit, which must be 2, 4, 6, 8, or 0 if the number is to be divisible by 2. We went through this very long method of showing that $2 \mid 7965840$ to give a hint as to how we test for divisibility of other numbers.

For example, consider 4. A multiple of 10 is not necessarily a multiple of 4, but a multiple of 100 is. Thus, we can write

$$\begin{aligned}
45376 &\equiv 45300 \pmod{4} + 76 \pmod{4} \\
&\equiv (453 \pmod{4})(100 \pmod{4}) + 0 \pmod{4} \\
&\equiv (453 \cdot 0) \pmod{4} + 0 \pmod{4} \equiv 0 + 0 \pmod{4} \equiv 0 \pmod{4}.
\end{aligned}$$

Notice how we used $100 \equiv 0 \pmod{4}$.

*EXERCISE 5-17* Find a shortcut along the same lines to test for divisibility by 5.

*EXERCISE 5-18* How about for 4, 8, and 20?

*EXERCISE 5-19* Why is it so easy to test for divisibility by these numbers?
