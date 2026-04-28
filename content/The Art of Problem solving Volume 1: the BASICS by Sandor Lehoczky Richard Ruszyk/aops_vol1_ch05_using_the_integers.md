# Chapter 5 — Using the Integers ⭐

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 53–65. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 53 / book page 39 -->

# Chapter 5

# *Using the Integers*

In spite of their being a rather restricted class of numbers, the integers have a lot of interesting properties and uses. Math which involves the properties of integers is called **number theory**.

## 5.1 Divisibility

An integer $n$ is **divisible** by a different integer $m$ if $n$ is an integral multiple of $m$. For example, 15 is divisible by 3 because $15 = 5 \cdot 3$. The numbers which divide a given integer are called its **divisors**; for example, the divisors of 12 are 1, 2, 3, 4, 6, and 12 (which divides itself because $12 = 12 \cdot 1$).

---

**EXERCISE 5-1** Write down all the divisors of 20.

---

**Primes** are integers which have no divisors except themselves and 1. For example, 7 is a prime, but 8 is not because 2 and 4 divide 8. Numbers like 8 which do have divisors other than 1 and themselves are called **composite**.

💣 **WARNING:** 1 is NOT considered prime! Unfortunately, it is not composite either. (The reasons for this are too complicated to get into now.) The primes less than 10 are thus 2, 3, 5, and 7.

---

**EXERCISE 5-2** Write down all primes between 11 and 20 inclusive.

**EXERCISE 5-3** How many even primes are there?

---

The notation for one number dividing another is to put a vertical line between them, as in $13 \mid 26$ and $12 \mid 24$. To indicate that the first number does not divide the second, we put a slash through the line: $11 \nmid 23$.

## 5.2 Number Bases

We can write the integer 7965841 as

$$7000000 + 900000 + 60000 + 5000 + 800 + 40 + 1.$$


<!-- PDF page 54 / book page 40 -->

That we can write it this way is a consequence of the fact that our usual number system is **base 10**, meaning we have 10 digits. Each digit represents a multiple of a power of 10, based on its position. To make this clearer we could write

$$7 \times 10^6 + 9 \times 10^5 + 6 \times 10^4 + 5 \times 10^3 + 8 \times 10^2 + 4 \times 10^1 + 1 \times 10^0.$$

Why do we count the way we do, following the number 9 with a new number consisting of a 1 and a 0? Having used 10 digits (0 through 9) to count to 9, we make a new "tens place," and assume that the digit in that position is the number of tens. For example, 57 is 5 tens and 7 ones. This saves us from needing a new digit for each number; we can stick to our original ten digits. When we get up to 99, we need to add another place, making the next position represent the number of hundreds.

Humans use 10 digits because we have ten fingers. However, what if we were cartoon characters, with only 8 fingers? Then we might only use the eight digits $0, 1, \ldots, 7$. To go higher than 7, we would create an "eights place," so that 25 in our new number system would represent two 8's and five 1's, or $2(8) + 5 = 21$ in the base ten system. Higher positions would correspond to higher powers of 8; for example, 6543 means $6 \times 8^3 + 5 \times 8^2 + 4 \times 8 + 3$. To get rid of the confusion of going back and forth between the two bases, we use the notation that $47_{10}$ means the base 10 number 47 and $47_8$ means the base 8 number 47. (What is this in base 10?) This notation carries over into other bases as well.

---

**EXAMPLE 5-1** What is the base 7 number $3456_7$ in base 10?

*Solution:* All we have to do is write

$$3 \times 7^3 + 4 \times 7^2 + 5 \times 7^1 + 6 \times 7^0 = 3(343) + 4(49) + 5(7) + 6(1) = \mathbf{1266}.$$

---

**EXAMPLE 5-2** Write the base 10 number 216 in base 4.

*Solution:* The first few powers of 4 are $1, 4, 16, 64, 256, \ldots$ Clearly we can't use 256 or any greater power. The highest power which is less than 216 is $64 = 4^3$. The multiples of 64 are 64, 128, and 192; since $192 = 64 \times 3$ is still less than 216, the first digit is 3. Why don't we just use 2 64's? If so we would need more than 3 16's, but we are only allowed 3 nonzero digits to represent the number of 16's. Try it and see! To find the second digit, we look at what is left once we have taken out three 64's, or $216 - 192 = 24$.

In general, to find how many times one number goes into another, we can divide the first by the second and throw out the remainder. Doing this with 24 and 16, the quotient is 1.5, so only one 16 is needed (two 16's are too many), and the second digit is 1. We subtract this 16 from what is left, to get $24 - 16 = 8$. Dividing this by $4^1 = 4$, the quotient is 2, so the third digit is 2. Subtracting $8 - 2 \cdot 4$, we get zero, so the remaining digit is zero since we don't need any 1's. The number in base 4 is $\mathbf{3120_4}$.

---

**EXERCISE 5-4** Find the base 10 representations of $47_8$, $47_9$, and $47_{16}$.

**EXERCISE 5-5** Find the base 8, 9, and 16 representations of $47_{10}$.


<!-- PDF page 55 / book page 41 -->

The presence of base 16 in the previous exercises raises a new question: what if we want to use a base greater than 10? We will need more digits than the usual 10, so all we do is use some other symbols. The most common such case is base 16, or **hexadecimal** (six-plus-ten-imal). Here we use the digits

$$0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F.$$

Thus $A_{16} = 10_{10}$ and $F_{16} = 15_{10}$. If we had a high enough base we might have to start using smiley faces and triangles for digits, but there would be little use for such a system.

---

**EXERCISE 5-6** Find the base 10 equivalents of $BEE_{16}$, $DEF_{16}$, and $A1_{16}$.

---

At the opposite extreme from all these digits is the lowly base 2, or **binary**. Here the only two digits are 0 and 1, and counting looks like $1, 10, 11, 100, 101, 110, \ldots$

---

**EXERCISE 5-7** How do you multiply a number by 2 in base 2?

**EXERCISE 5-8** Do some conversions into and out of binary.

---

**EXAMPLE 5-3** Perform the addition $1001110_2 + 11001101_2$ without converting the two numbers to decimal. Check your answer by converting to decimal, adding, and converting back.

*Solution:* We can do the addition just like ordinary base 10 addition, writing the numbers one above the other like so:

```
    1 0 0 1 1 1 0
  1 1 0 0 1 1 0 1
```

If two 0's are in a column, a zero goes in the result in the same column. If a 1 and a 0 are in a column, a 1 goes below. If two 1's are together, the sum is 2, which in binary is $10_2$. Thus we must carry the 1, and put a 0 below. The 'carrying' process works in base 2 just like in base 10. (Compare this process to adding 56 and 65 in base 10.) This carried 1 will add to the numbers in the next column, making 1 if both are 0, 2 (or $10_2$) with a 1 and a 0, and 3 (or $11_2$) with two 1's. For the latter two we will have to carry another 1, and so on. Using these rules we can fill in the digits of the result from right to left, as usual:

```
  1 1     1 1
      1 0 0 1 1 1 0
    1 1 0 0 1 1 0 1
   ─────────────────
  1 0 0 0 1 1 0 1 1
```

We've placed the carried digits above the columns they're carried to. The result is $100011011_2 = 256 + 16 + 8 + 2 + 1 = 283_{10}$. To confirm this we convert the original numbers to decimal, getting $1001110_2 = 64 + 8 + 4 + 2 = 78_{10}$ and $11001101_2 = 128 + 64 + 8 + 4 + 1 = 205_{10}$, and note that $205_{10} + 78_{10} = 283_{10}$, as desired.

---

We have seen that the operation of carrying works in binary. This procedure works in any base. Say we are adding the base 7 numbers $235_7$ and $114_7$. When we add the two rightmost digits we get $9 = 12_7$, so we place a 2 below the line and carry the 1.


<!-- PDF page 56 / book page 42 -->

## 5.3 The Last Digit

No matter what number base we are using, often the most important digit of a number is the last digit. Why should the last digit be so important? There is a very simple reason: if we want to know the last digit of the sum or product of two numbers, all we have to do is find the sum or product of their last digits and take the last digit of that result.

---

**EXERCISE 5-9** Convince yourself that the previous statement is true. Find the last digits of $34 \cdot 17$ and $34 + 17$, first by actually doing the multiplication and addition, then by taking the last digits and just multiplying or adding those. Explain why this works.

---

The method of the last digit works in any number base and can be used to prove some very useful facts.

---

**EXERCISE 5-10** In base 10, what digits can the last digit of the square of an integer not be?

---

🪡 **EXAMPLE 5-4** Find the units digit of $7^{42} + 42^7$.

*Solution:* To find the last digit of $7^{42} + 42^7$, we find the last digit of each of the two quantities in the sum. To find the last digit of $7^{42}$, we break it up into a product of 7's. Since $7^2 = 49$, $7^2$ ends in 9. Since $7^4 = 7^2 \cdot 7^2$, it ends in the same number as $9 \cdot 9$ ends in, or 1. Now we write $7^{42} = (7^4)^{10} \cdot 7^2$. Since $7^4$ ends in 1, the last digit of $(7^4)^{10}$ is the same as the last digit of the product of ten 1's, or 1. Finally, since $(7^4)^{10}$ ends in 1 and $7^2$ ends in 9, $7^{42}$ ends in $1 \cdot 9 = 9$.

In finding the last digit of $42^7$, the tens digit is irrelevant because it does not contribute to the units digit of the product. Hence we are only concerned with $2^7$. Since this is 128, the last digit of $42^7$ is 8. (Make sure you see why the last digit of $42^7$ is the same as that of $2^7$.) Completing our problem, $7^{42} + 42^7$ ends in the same digit as $9 + 8$, or $\mathbf{7}$.

---

## 5.4 Modular Arithmetic

Imagine we decide to do all arithmetic in base 5. Doing arithmetic in different number bases is not always easy; for example, you don't want to memorize a multiplication table for base 16. ($B \cdot C = 84$?!) So just to make it easier on ourselves, we will consider only the last digits. All numbers which have the same last digit in base 5 will be considered equal:

$$2_5 = 12_5 = 22_5 = 32_5 = \cdots$$

In base 10, this looks like

$$2 = 7 = 12 = 17 = \cdots$$

The usual way to show that we are using this system is to replace the $=$ with a $\equiv$, and also append the suffix $(\text{mod } 5)$. We thus write, for example, $12 \equiv 7 \pmod{5}$. We say that **12 is congruent to 7 mod 5**.

Another way to look at mods is that $2, 7, 12, 17$, etc. all have the same remainder (2) when divided by 5. This method of viewing modular arithmetic makes actual computation much easier. It is often


<!-- PDF page 57 / book page 43 -->

useful to find the smallest nonnegative integer which is congruent to $x \bmod y$. (For example, the smallest integer congruent to 12 mod 5 is 2.) When we perform this task, we say that we 'mod out' the 12. Now you see how our second way of viewing mods is useful. To mod out 7631 in mod 7, we can either find 7631 in base 7 and look at the last digit, or we can divide by 7 and look at the remainder.

In this discussion of remainders, we have used mods to denote the amount more than a multiple of 5 a given number is. For example, 2, 7, 12, 17, etc. are all exactly 2 more than a multiple of 5. In the same way we can define negative mods as the amount less than a multiple of 5 a number is. Since 2, 7, 12, 17, etc. are all 3 less than the nearest multiple of 5, they are all congruent to $-3$ mod 5. Extending this reasoning, we can write in mod 5:

$$\cdots \equiv -13 \equiv -8 \equiv -3 \equiv 2 \equiv 7 \equiv 12 \cdots$$

Note that each term is five away from the one before it and after it. Think about why this is true.

---

**EXAMPLE 5-5** Why does the remainder method described above work?

*Solution:* Consider 7631 in base 7. It is $31151_7$, or

$$3 \cdot 7^4 + 1 \cdot 7^3 + 1 \cdot 7^2 + 5 \cdot 7 + 1.$$

When we divide this expression by seven, the seven evenly divides the first 4 terms of the sum and leaves the last term as the remainder, i.e. $7631/7 = 3 \cdot 7^3 + 1 \cdot 7^2 + 1 \cdot 7 + 5$, with a remainder of 1. Hence we see that the last digit of 7631 written in base 7 is the same as the remainder we have upon dividing 7631 by 7. This is why the remainder method works.

---

**EXERCISE 5-11** Write down some numbers which are congruent to 3 mod 5.

**EXERCISE 5-12** What is the largest integer less than 100 which is congruent to 3 mod 5?

---

**EXAMPLE 5-6** How many positive integers less than 100 are congruent to 3 mod 5?

*Solution:* The smallest is obviously 3. In the previous exercise, you should have found that the largest is 98. How many are there in between? We have $3 = 0(5) + 3$ and $98 = 19(5) + 3$, and the other numbers congruent to 3 mod 5 will be $1(5) + 3, 2(5) + 3$, and so on. The number by which 5 is multiplied can be $0, 1, 2, \ldots, 19$, so there are $\mathbf{20}$ possibilities.

---

**EXERCISE 5-13** How many integers are there between 50 and 250 inclusive which are congruent to 1 mod 7?

**EXERCISE 5-14** Which numbers are congruent to 0 mod 5?

---

Once the principle of congruence is understood, we can move on to doing actual arithmetic with it. One thing which we can do with a congruence like

$$12 \equiv 7 \pmod{5}$$

is add the same thing to both sides:

$$12 + 3 \equiv 7 + 3 \pmod{5}.$$


<!-- PDF page 58 / book page 44 -->

We can do this because if the last digits in base 5 are the same before the addition, they will be the same after the addition. Clearly the same will be true for subtraction.

How about for multiplication? Again, the same should hold. If the last digits are the same before the multiplication, they will be the same after.

Not only can we multiply or add the same quantities to both sides, but if $x$ and $y$ have the same last digit in base 5, then we can add $x$ to one side and $y$ to the other in mod 5. For example, since 8 and 13 have the same last digit in base 5,

$$12 + 13 \equiv 7 + 8 \pmod{5}.$$

Applying this concept to multiplication, since 12 and 7 are congruent mod 5, we can multiply one side by 12 and the other by 7, yielding

$$12^2 \equiv 7^2 \pmod{5}.$$

💣 In this manner, we can raise the two sides to any positive integral power!

**WARNING:** Division is a much more complicated matter. For instance, clearly $5 \equiv 10 \pmod{5}$, but if we divide both sides by 5, we have $1 \equiv 2 \pmod{5}$, an obviously false relation. There is something wrong here, and that something will be investigated in the next volume. Just remember that division doesn't generally work in modular arithmetic.

In finding the last digit of a sum or product of two numbers, we don't need to do the entire sum or product, just the sum or product of the last digits of the two numbers. In mods, this is reflected by the fact that we can "mod out" before or after doing operations; the order doesn't matter. By this we mean that we can mod out the factors of a product and then multiply the results rather than having to mod out the product of the numbers. For example, since $9899 \equiv 4 \pmod{5}$ and $7677 \equiv 2 \pmod{5}$, we can say $9899 \cdot 7677 \equiv 4 \cdot 2 \equiv 8 \equiv 3 \pmod{5}$ rather than first multiplying 9899 and 7677 and modding out the product. Make sure you follow this; it is a very important technique. Try to use it to show that $9453 \cdot 6824 \equiv 6782 \cdot 5675341 \equiv 2 \pmod{5}$.

---

Let's summarize what we can do with congruences. If $a \equiv b \pmod{m}$, then for all positive integers $c$:

1. $a + c \equiv b + c \pmod{m}$
2. $a - c \equiv b - c \pmod{m}$
3. $ac \equiv bc \pmod{m}$
4. $a^c \equiv b^c \pmod{m}$
5. $(a + b) \pmod{m} \equiv a \pmod{m} + b \pmod{m}$
6. $ab \pmod{m} \equiv \big(a \pmod{m}\big)\big(b \pmod{m}\big)$

---

You may need to chew on those last two a bit, though they are among the most useful. They just restate the fact that we can mod out before or after we add or multiply.


<!-- PDF page 59 / book page 45 -->

**EXAMPLE 5-7** If we are given that $a \equiv 0 \pmod{b}$, then the remainder when $a$ is divided by $b$ is 0. Thus we can conclude that $a$ is a multiple of $b$.

---

**EXERCISE 5-15** Find the smallest positive integer which 123 is congruent to mod 4. Find the smallest positive integer that 321 is congruent to mod 7.

🪡 **EXERCISE 5-16** Show that the square of any integer is congruent to either 0, 1, or 4 mod 8.

---

## 5.5 Tricks

Even at this early stage in understanding divisibility, we can find some tricks to tell if one number divides another. We start with the obvious example: a number is divisible by 10 if and only if its last digit is 0. This seems trivial, but then so will the rest of the rules in this section when you've used them a few times.

We start with the basic concept that a number, $x$, is divisible by another number, $y$ if and only if $x \equiv 0 \pmod{y}$. This just means that when we divide $x$ by $y$, the remainder is zero.

First we examine divisibility by 2. A number is divisible by 2 if and only if it is congruent to 0 mod 2. We can write the number, say 7965841, as the sum of its last digit and the rest, as in $7965841 = 1 + 7965840$. Thus we can write $7965841 \equiv 1 + 7965840 \pmod{2}$. The second part ends with a zero, so is divisible by 10, or $7965840 = 10(\text{something})$. But $2 \mid 10$, so this means $7965840 = 2(\text{something else})$, so that 2 divides 7965840, and $7965840 \equiv 0 \pmod{2}$. Substituting this in above, we find that $7965841 \equiv 1 \pmod{2}$, or a number is congruent to its last digit mod 2. So to test for divisibility by 2, we just test the last digit, which must be 2, 4, 6, 8, or 0 if the number is to be divisible by 2. We went through this very long method of showing that $2 \mid 7965840$ to give a hint as to how we test for divisibility of other numbers.

For example, consider 4. A multiple of 10 is not necessarily a multiple of 4, but a multiple of 100 is. Thus, we can write

$$
\begin{aligned}
45376 &\equiv 45300 \pmod{4} + 76 \pmod{4} \\
&\equiv (453 \pmod{4})(100 \pmod{4}) + 0 \pmod{4} \\
&\equiv (453 \cdot 0) \pmod{4} + 0 \pmod{4} \equiv 0 + 0 \pmod{4} \equiv 0 \pmod{4}.
\end{aligned}
$$

Notice how we used $100 \equiv 0 \pmod{4}$.

---

**EXERCISE 5-17** Find a shortcut along the same lines to test for divisibility by 5.

👁 **EXERCISE 5-18** How about for 4, 8, and 20?

**EXERCISE 5-19** Why is it so easy to test for divisibility by these numbers?


<!-- PDF page 60 / book page 46 -->

We can find a (slightly more complicated) rule to test for divisibility by 3. Let's use 7965. We divide it not into two parts as above, but many more, writing it as $7000 + 900 + 60 + 5$. Since $10 \equiv 1 \pmod{3}$, taking the sum mod 3 causes each factor of 10 to reduce to a 1. (For example, $100 \equiv 10 \cdot 10 \pmod{3} \equiv 1 \cdot 1 \pmod{3} \equiv 1 \pmod{3}$.) Hence we have

$$
\begin{aligned}
7965 &\equiv 7000 + 900 + 60 + 5 \pmod{3} \\
&\equiv 7 \cdot 10 \cdot 10 \cdot 10 + 9 \cdot 10 \cdot 10 + 6 \cdot 10 + 5 \pmod{3} \\
&\equiv 7 \cdot 1 \cdot 1 \cdot 1 + 9 \cdot 1 \cdot 1 + 6 \cdot 1 + 5 \pmod{3} \\
&\equiv 7 + 9 + 6 + 5 \pmod{3}.
\end{aligned}
$$

Thus a number is congruent to the sum of its digits in mod 3! In general, then, *a number is divisible by 3 if and only if the sum of its digits is.*

---

**EXERCISE 5-20** For the numbers 1717, 3451, and 173451, test for divisibility by 3 by the shortcut and by direct division.

👁 **EXERCISE 5-21** Find the divisibility shortcut for 9; recreate the discussion of divisibility by 3, except using $10 \equiv 1 \pmod{9}$.

**EXERCISE 5-22** Which of the following is divisible by 3 but not by 9: 4995, 4996, 4997, 4998, 4999?

---

We have been able to get good divisibility rules for 10 and its divisors, and for 3 and 9. How about $10 + 1 = 11$? We can write $10 \equiv -1 \pmod{11}$ (does this make sense?) to simplify. Each power of 10 will thus be congruent to a power of $-1$ when we write the number in mod 11, e.g. $1000 \equiv (10)^3 \equiv (-1)^3 \equiv -1 \pmod{11}$. Hence

$$
\begin{aligned}
7964 &\equiv 7 \cdot 10^3 + 9 \cdot 10^2 + 6 \cdot 10 + 4 \pmod{11} \\
&\equiv 7 \cdot (-1)^3 + 9 \cdot (-1)^2 + 6 \cdot (-1) + 4 \pmod{11} \\
&\equiv -7 + 9 - 6 + 4 \pmod{11}
\end{aligned}
$$

Hence, *a number is divisible by 11 if and only if the sum of its digits with alternating signs is.*

What if the alternating sum is negative? If it is $-11, -22$, etc., the number is divisible, otherwise not. This is because $-11, -22$, etc. are all evenly divisible by 11. If the alternating sum is 0, then the number is divisible by 11, as 0 is divisible by all numbers. You might be uncomfortable with using negatives for divisibility, but they are fine in both divisibility and modular arithmetic, as in the example of $10 \equiv -1 \pmod{11}$ above.

---

**EXERCISE 5-23** Which of the following are divisible by 11: 11, 111, 1111, 1716, 1761, 152637?

**EXERCISE 5-24** Prove, using our rule, that a two-digit number is divisible by 11 if and only if its digits are the same.

---

**EXAMPLE 5-8** How would you test a number for divisibility by 12?

*Solution:* We might try to build a rule similar to that for 11, but there is a much easier way. Since 12 factors into $4 \times 3$, a number is divisible by 12 if it is divisible by 4 and by 3; divisibility by these numbers can be easily tested.

This shows that in general composite numbers can be analyzed in terms of the numbers which divide them.


<!-- PDF page 61 / book page 47 -->

## 5.6 Primes

Primes are the most important integers. There is a simple reason for this: every other number can be broken down into a product of primes. For example, 15 can be written as $3 \cdot 5$, the product of the primes 3 and 5, or 48 as $16 \cdot 3 = 2^4 \cdot 3$, with the primes 2 and 3. By definition, primes cannot be broken down any further, for they have no divisors to split into. The splitting up of numbers into prime factors, or **prime factorization**, is extremely useful, because each number has only one distinct prime factorization. (Here distinct means that, for example, $2^4 \cdot 3$, $3 \cdot 2^4$, and $2 \cdot 2 \cdot 3 \cdot 2 \cdot 2$ are considered the same.)

---

**EXERCISE 5-25** Write down the prime factorizations of all integers from 2 to 12.

**EXERCISE 5-26** What is the prime factorization of 256?

---

Finding the prime factorization of small numbers is very easy using only trial and error. To factor larger numbers, however, we need to be a little more systematic. One important tool is the divisibility tricks we have derived. We can easily factor out all 5's and 2's, for example. We can then test for 3's and 11's. For many numbers, we will already be well on our way with just these few methods.

For others we have to resort to trial and error, going up through the primes and dividing by each to see if it works. A tool to limit the amount of searching we have to do is to think about what the largest primes involved can be. Call the number we intend to factor $N$. Clearly there cannot be more than one factor greater than $\sqrt{N}$, since if there were more than one, their product would exceed $N$. Similarly, if $N$ is not prime, there must be at least one factor less than or equal to $\sqrt{N}$. Why? Since $N$ is not prime, it must have at least two factors other than itself and 1. Either both are greater than $\sqrt{N}$, which we have shown is impossible, or at least one is less than or equal to $\sqrt{N}$. Hence if we cannot find a prime less than $\sqrt{N}$ which divides $N$, we know $N$ is prime.

---

**EXAMPLE 5-9** Let's see how all this works in practice by factoring 123420. We first get rid of all 10's, and convert them to 2's and 5's: $123420 = 10 \cdot 12342 = 2 \cdot 5 \cdot 12342$. Note that upon finding the prime factors 2 and 5 here, we divide 123420 by them and continue our job with the result, 12342. (How would not doing so affect our search for the prime factorization? Try it and see.)

Since the number left is divisible by 2, but not by any more 2's after that, we can take out one more 2: $2 \cdot 5 \cdot 12342 = 2^2 \cdot 5 \cdot 6171$. We then test the number which remains for 3's and 11's. The sum of the digits of 6171 is $6 + 1 + 7 + 1 = 15$, which is divisible by 3 but not 9, so we can take out exactly one 3 to get $2^2 \cdot 3 \cdot 5 \cdot 2057$. The alternating sum of the digits of 2057 is $2 - 0 + 5 - 7 = 0$, which is divisible by 11, so 2057 is divisible by 11, and we have $2^2 \cdot 3 \cdot 5 \cdot 11 \cdot 187$. Testing 187, we again find divisibility by 11, leaving $\mathbf{2^2 \cdot 3 \cdot 5 \cdot 11^2 \cdot 17}$. Since 17 is prime, this is a complete factorization.

---

**EXAMPLE 5-10** Find the prime factorization of 97.

*Solution:* Clearly 2 and 5 do not divide 97; 3 does not divide it because the sum of the digits, 16, is not divisible by 3; 7 does not divide it if we do the long division. But these are all the primes less than $\sqrt{97} \approx 10$, so 97 is **a prime**.

---

**EXERCISE 5-27** Factor 141, 1441, and 14441.


<!-- PDF page 62 / book page 48 -->

At some point in the study of primes, the question arises: How many primes are there? (Do you have a guess?) It was shown by a Greek that there have to be infinitely many primes. The proof is an easy application of contradiction.

*Proof:* Assume for the sake of contradiction that there are only finitely many primes and call them $p_1, p_2, \ldots, p_n$. Now consider the number $P = p_1 p_2 \cdots p_n + 1$. Clearly this number is not divisible by any of the $p_i$, since dividing by any $p_i$ will leave a remainder of 1. But since $P$ has no prime factor, it has no factor. Thus $P$ is prime; but this is a new prime, not one of the $p_i$, which we assumed were all the primes. This is a contradiction, so the original assumption of finitely many primes must be false. If you don't understand contradiction, read about it on page 254 and return.

---

## 5.7 Common and Uncommon Factors

Given two numbers $m$ and $n$, it is often important to think about what factors they have in common. For example consider the numbers 84 and 112, which can be factored into $2^2 \cdot 3 \cdot 7$ and $2^4 \cdot 7$, respectively. What prime factors are in common? Exactly two 2's and one 7.

Given the prime factors that are in common, we can write down the composite common factors as well by combining the primes. In our example, the composite common factors are $2^2 = 4$, $2 \cdot 7 = 14$, and $2^2 \cdot 7 = 28$.

The largest factor shared by two numbers is called their **greatest common factor**, or GCF. The greatest common factor is found by multiplying together all the common prime factors, so that for 84 and 112 we have 28 as the GCF. Once we can do the prime factorizations of two numbers, finding the GCF is easy: just combine all the common prime factors. The GCF of two numbers is usually expressed by writing the numbers in parentheses separated by a comma; for example, $(84, 112) = 28$. (Yes, this does look uncomfortably like an ordered pair.)

What about two numbers which, like 28 and 15, have no common factors? In this case, the greatest common factor is 1. Such numbers are called **relatively prime**.

---

**EXAMPLE 5-11** Find the GCF of 100 and 1000.

*Solution:* The numbers factor as $2^2 \cdot 5^2$ and $2^3 \cdot 5^3$, so they share two 2's and two 5's. The product of these common factors is $2^2 \cdot 5^2 = \mathbf{100}$.

---

**EXERCISE 5-28** Find $(117, 165)$, $(102, 119)$, and $(96, 36)$.

**EXERCISE 5-29** Prove that $(a, b)$ must be less than or equal to $a$, $b$, and $a - b$, where $a > b$.

---

Having analyzed the common factors of two integers, we can next think about the factors which are *not* in common. The **least common multiple** (LCM) of two integers is the smallest number which both integers divide evenly.

To see how the LCM works, let's return to our original pair, $84 = 2^2 \cdot 3 \cdot 7$ and $112 = 2^4 \cdot 7$. If an integer is divisible by 84, it must be divisible by two 2's, a 3, and a 7; if it is divisible by 112, it must be divisible by four 2's and one 7. Since we want it to be divisible by both, the LCM must contain four 2's, one 3, and one 7. Moreover, the LCM should not be divisible by anything else, or it would be larger than $2^4 \cdot 3 \cdot 7 = 336$, which is already divisible by both 84 and 112.


<!-- PDF page 63 / book page 49 -->

To find the LCM, then, we have to factor each number and for each prime, take the largest power which appears in either of the factorizations. The resulting list of powers of primes is multiplied together to get the LCM.

The LCM of two numbers is often written by placing the pair in square brackets, as in $[84, 112] = 336$. Note also that if you add two fractions, the denominator of the new fraction will be the LCM of the denominators of the summed fractions—the process of finding the "least common denominator" is just finding the LCM in disguise.

---

**EXAMPLE 5-12** Find the LCM of 100 and 1000.

*Solution:* The numbers factor into $2^2 \cdot 5^2$ and $2^3 \cdot 5^3$, so the LCM must have three 2's and three 5's. The product of these factors is $2^3 \cdot 5^3 = \mathbf{1000}$.

---

**EXERCISE 5-30** Find $[117, 165]$, $[102, 119]$, and $[96, 36]$.

👁 **EXERCISE 5-31** Show that each pair of integers in the preceding example satisfies

$$(m, n)[m, n] = mn.$$

🪡 **EXERCISE 5-32** Prove the formula of the previous exercise. This formula can be used to solve problems like, "If the GCF of two numbers is 8 and the product of the numbers is 2880, what is the LCM of the numbers?" Using the above method, we don't even have to find the two numbers!

---

GCF's and LCM's of more than two numbers are also possible. Here the GCF is the largest factor which divides all the numbers, and the LCM is the smallest number divisible by all the numbers.

---

**EXAMPLE 5-13** Find $[12, 54, 42]$.

*Solution:* The factorizations of our three numbers are $2^2 \cdot 3$, $2 \cdot 3^3$, and $2 \cdot 3 \cdot 7$. The largest powers encountered are $2^2$, $3^3$, and 7; multiplying these yields $2^2 \cdot 3^3 \cdot 7 = \mathbf{756}$.

---

🪡 **EXERCISE 5-33** Prove that $(l, m, n)[lm, mn, nl] = lmn$ for positive integers $l$, $m$, and $n$.

---

# Problems to Solve for Chapter 5

You are not expected to be able to do all of these now. Do the ones you can, and return to the others after you have completed more of the book.

**87.** Find the GCF of 36, 27, and 45.

**88.** How many multiples of 7 are there between 100 and 200?

**89.** Find the units digit of $19^{93}$.

**90.** Find the 1275th term of the series $1, 3, 5, \ldots, 15, 1, 3, 5, \ldots, 15, 1, \ldots$ *(Mandelbrot #3)*

🪡 **91.** Find the smallest positive integer which when divided by 10 leaves a remainder of 9, when divided by 9 leaves a remainder of 8, by 8 leaves a remainder of 7, etc., down to where, when divided by 2, it leaves a remainder of 1. *(AHSME 1951)*


<!-- PDF page 64 / book page 50 -->

**92.** Find the value of digit $A$ if the five-digit number $12A3B$ is divisible by both 4 and 9, and $A \neq B$. *(MATHCOUNTS 1986)*

**93.** Find the units digit of $3^{1986} - 2^{1986}$. *(MATHCOUNTS 1986)*

**94.** In how many ways can a debt of $69 be paid exactly using only $5 bills and $2 bills? *(MATHCOUNTS 1988)*

**95.** Find the sum of all four digit natural numbers of the form $4AB8$ which are divisible by 2, 3, 4, 6, 8, and 9. *(MATHCOUNTS 1988)*

**96.** If a set of markers is placed in rows of 4 each, there are 2 markers left over; if in rows of 5 each, there are 3 left over; and if in rows of 7 there are 5 left over. What is the smallest number of markers that the set could contain? *(MATHCOUNTS 1984)*

**97.** When $n$ is divided by 5, the remainder is 1. What is the remainder when $3n$ is divided by 5? *(MATHCOUNTS 1991)*

**98.** A six place number is formed by repeating a three place number; for example $256{,}256$ or $678{,}678$, etc. What is the largest integer that divides all such integers? *(AHSME 1951)*

**99.** A base-two numeral consists of 15 digits, all of which are ones. When tripled and written in base two, how many digits does this number contain? *(MATHCOUNTS 1986)*

**100.** What is the largest base 10 number that can be expressed as a 3-digit base 5 number? *(MATHCOUNTS 1989)*

**101.** How many natural numbers require 3 digits when written in base 12, but require 4 digits when written in base 9? *(MATHCOUNTS 1989)*

**102.** Given $9^6 = 531{,}441$, how would you represent $531{,}440$ in base 9? *(MATHCOUNTS 1990)*

**103.** Find the smallest positive integer greater than one which yields a remainder of one when divided by any single digit positive integer greater than 1. *(Mandelbrot #3)*

**104.** A store sold 72 decks of cards for $a67.9b$. Find $a + b$. *(MAΘ 1991)*

🪡 **105.** For each of $n = 84$ and $n = 88$, find the smallest integer multiple of $n$ whose base 10 representation consists entirely of 6's and 7's. *(USAMTS 1)*

🪡 **106.** When the number $n$ is written in base $b$ its representation is the two-digit number $AB$ where $A = b - 2$ and $B = 2$. What is the representation of $n$ in base $(b - 1)$? *(MAΘ 1991)*

**107.** If $a \neq 1$ and $\sqrt[a]{10000_a} = 10_a$, find $a$. *(MAΘ 1990)*

🪡 **108.** Denote by $p_k$ the $k$th prime number. Show that $p_1 p_2 \cdots p_n + 1$ cannot be the perfect square of an integer. *(M&IQ 1992)*

🪡 **109.** Prove that it is impossible for three consecutive squares to sum to another perfect square. *(Mandelbrot #2)*


<!-- PDF page 65 / book page 51 -->

> ## *the BIG PICTURE*
>
> One of the most interesting aspects of the world of mathematics is the existence of **conjectures**, assertions which many think may be true but which no one is able to prove—or disprove. Many famous conjectures are or were in the realm of number theory.
>
> An early instance was the conjecture of Mersenne in the mid-1600's that all integers of the form $2^{2^n} + 1$, called **Mersenne numbers**, are prime. It looks true for the first few $n$: $n = 1$ yields 5; $n = 2$ yields 17; $n = 3$, 257. (Can you verify that 257 is prime?) The fourth Mersenne number, $2^{16} + 1$, is also prime; with no computers to do the complicated calculations, this was as high as anyone could go. However, in the mid-1700's Leonhard Euler was able to find an explicit factor of $2^{32} + 1$, the fifth Mersenne number, and the conjecture was proved false.
>
> Other conjectures were more fortunate; many live on to this day. Christian Goldbach conjectured in the early 1700's that every even integer greater than 4 could be written as the sum of two primes. (For example, $6 = 3 + 3$, $8 = 5 + 3$, $36 = 19 + 17$, and $200 = 97 + 103$.) **Goldbach's conjecture**, as it has come to be called, is to this day an open question. The most powerful computers have been unable to find a counterexample, and the best mathematicians have been unable to prove it. Steps have been made toward a proof, and some feel it is in sight, but that is as far as it goes.
>
> The most famous conjecture of all time was also in the field of number theory. **Fermat's Last Theorem** haunted mathematicians (and amateur solvers, who have flooded publications with bogus "proofs") for centuries. In 1993, Andrew Wiles, a professor at Princeton University, finally finished the theorem off, but he required seven years' unremitting labor, as well as a very large body of supporting work by others, to do it. Old conjectures die hard.


