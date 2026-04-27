useful to find the smallest nonnegative integer which is congruent to $x$ mod $y$. (For example, the smallest integer congruent to 12 mod 5 is 2.) When we perform this task, we say that we 'mod out' the 12. Now you see how our second way of viewing mods is useful. To mod out 7631 in mod 7, we can either find 7631 in base 7 and look at the last digit, or we can divide by 7 and look at the remainder.

In this discussion of remainders, we have used mods to denote the amount more than a multiple of 5 a given number is. For example, 2, 7, 12, 17, etc. are all exactly 2 more than a multiple of 5. In the same way we can define negative mods as the amount less than a multiple of 5 a number is. Since 2, 7, 12, 17, etc. are all 3 less than the nearest multiple of 5, they are all congruent to $-3$ mod 5. Extending this reasoning, we can write in mod 5:

$$\cdots \equiv -13 \equiv -8 \equiv -3 \equiv 2 \equiv 7 \equiv 12 \equiv \cdots$$

Note that each term is five away from the one before it and after it. Think about why this is true.

**EXAMPLE 5-5.** Why does the remainder method described above work?

*Solution:* Consider 7631 in base 7. It is $31151_7$, or

$$3 \cdot 7^4 + 1 \cdot 7^3 + 1 \cdot 7^2 + 5 \cdot 7 + 1.$$

When we divide this expression by seven, the seven evenly divides the first 4 terms of the sum and leaves the last term as the remainder, i.e. $7631/7 = 3 \cdot 7^3 + 1 \cdot 7^2 + 1 \cdot 7 + 5$, with a remainder of 1. Hence we see that the last digit of 7631 written in base 7 is the same as the remainder we have upon dividing 7631 by 7. This is why the remainder method works.

*EXERCISE 5-11* Write down some numbers which are congruent to 3 mod 5.

*EXERCISE 5-12* What is the largest integer less than 100 which is congruent to 3 mod 5?

**EXAMPLE 5-6.** How many positive integers less than 100 are congruent to 3 mod 5?

*Solution:* The smallest is obviously 3. In the previous exercise, you should have found that the largest is 98. How many are there in between? We have $3 = 0(5) + 3$ and $98 = 19(5) + 3$, and the other numbers congruent to 3 mod 5 will be $1(5) + 3$, $2(5) + 3$, and so on. The number by which 5 is multiplied can be $0, 1, 2, \ldots, 19$, so there are **20** possibilities.

*EXERCISE 5-13* How many integers are there between 50 and 250 inclusive which are congruent to 1 mod 7?

*EXERCISE 5-14* Which numbers are congruent to 0 mod 5?

Once the principle of congruence is understood, we can move on to doing actual arithmetic with it. One thing which we can do with a congruence like

$$12 \equiv 7 \pmod{5}$$

is add the same thing to both sides:

$$12 + 3 \equiv 7 + 3 \pmod{5}.$$
