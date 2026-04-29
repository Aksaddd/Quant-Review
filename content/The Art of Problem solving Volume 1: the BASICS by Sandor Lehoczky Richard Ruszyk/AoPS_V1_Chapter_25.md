---
title: "Chapter 25 — Learning to Count"
source: "The Art of Problem Solving, Volume 1"
chapter: 25
problem_range: [457, 477]
sections:
  - "25.1 What's to Learn?"
  - "25.2 Multiplication"
  - "25.3 Example: The Number of Divisors"
  - "25.4 Restrictions on Multiplication"
  - "25.5 Permutations, Arrangements, and !"
  - "25.6 Mixing it Up"
  - "25.7 Counting the Wrong Thing, Part I"
  - "25.8 Counting the Wrong Thing, Part II"
  - "25.9 Doing it Another Way"
  - "25.10 The Binomial Theorem"
includes_big_picture: false
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • `(”)`, `(£)`, `(jj)` (binomial coefficients) → \binom{n}{k}
    • `nPk`, `„P_k`                                → P(n,k) or _nP_k
    • `nCk`, `„Ck`                                 → C(n,k) or \binom{n}{k}
    • Source typo `2410's` (Example 25-8)          → "24 10's"
    • Problem 458: source prints "factors of 295"  → 2^{95} (the
      superscript was lost in the OCR; 295 = 5·59 has only 4 divisors,
      none > 10^6, so the problem only makes sense as 2^{95})
    • Problem 476: `12n`                           → 12^n
    • Problem 466: `a!/b!`                         → preserved as fraction
  Three figures total — circular-arrangement diagram in §25.5 and
  one for problem 469 (12 points in a plane) plus one for 477.
---

# Chapter 25 — Learning to Count

## 25.1 What's to Learn?

Suppose someone gives you a pile of seventeen things and asks how many there are. Chances are you count them in the normal way: $1, 2, 3, \ldots, 17$. Or maybe you group them somehow: $3, 6, 9, 12, 15$, and two is $17$, or $5, 10, 15$, and $17$. But suppose the pile has seventeen hundred seventeen things: the first method is now entirely impractical. Only by intelligent grouping can the counting be done efficiently.

Similarly, suppose you are asked to count in how many ways two coins can come up when flipped. Head-head, head-tail, tail-head, tail-tail, you say, so $4$. But what if there are six coins? Let's see: head-head-head-head-head-head, tail-head-head$\ldots$ so much for that idea. To count sets like this, we need some smart, and sometimes slick, methods.

> **Example 25-1.** Suppose we want to know the number of integers between $45$ and $317$ exclusive. (**Exclusive** means *not* including $45$ and $317$ in the total. The opposite, or **inclusive**, includes those numbers.) The naïve way to count them would be one by one: $46, 47, 48, \ldots$. The smart way is to simply subtract the two numbers and subtract $1$, to get $317 - 45 - 1 = 271$. Why does this work? The number of integers between $0$ and $n$, exclusive, is $n - 1$, since the numbers are $1, 2, \ldots, n - 1$. By subtracting $45$ from our range, we change the range from "$45$ to $317$" to "$0$ to $(317 - 45) = 272$" without affecting the number of integers inside. We then have $n = 272$, and thus our total is $n - 1 = 271$. By the same argument, the number of integers between the integers $a$ and $b$ ($b > a$) exclusive is $b - a - 1$.

> **Exercise 25-1.** Find the number of integers between $45$ and $317$ inclusive and between $a$ and $b$ inclusive.

---

## 25.2 Multiplication

Let's again consider the second coin problem addressed above.

> *In how many ways can six coins come up when flipped?*

We will group cases so that the answer is clear.

Consider the first coin. No matter how the other coins come up, it has two possibilities, heads and tails. Thus we can immediately do some grouping:

$$\text{total \# of ways for all six} = (\text{\# ways for last 5 when first is heads}) + (\text{\# ways for last 5 when first is tails}).$$

But whether the first is heads or tails, the other five flips can still occur the same number of ways. We can thus reduce the above to

$$\text{total \# of ways for all six} = 2(\text{\# ways for last 5}).$$

We then look at the second coin. Again, its two possibilities do not affect the rest of the coins, so we have

$$\begin{aligned}
\text{total \# of ways for all six} &= 2(\text{\# ways for last 4; second is heads}) \\
&\quad + 2(\text{\# ways for last 4; second is tails}) \\
&= 2 \cdot 2(\text{\# ways for last 4}).
\end{aligned}$$

We continue like this for all six coins; each coin has two independent choices, so the total number of ways is $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 2^{6} = 64$. By **independent**, we mean that the coins have no effect on each other.

The solution to the coin problem is a simple application of the most fundamental principle of counting: each independent contributor adds a factor of its number of possibilities to the overall product. This is an example of using grouping to count; instead of counting all possibilities, we just count the possibilities of each contributor separately, then multiply them all.

> **Example 25-2.** How many four-letter "words" are there (ignoring spelling, etc.)?
>
> ***Solution.*** The choices of the first, second, third, and fourth letters are independent. Since each has $26$ possibilities, the total number is $\mathbf{26^{4}}$.

> **Example 25-3.** How many four-letter "words" are there with vowels (not 'y') in the middle two places and a consonant at the end?
>
> ***Solution.*** For the first, unspecified letter, there are still $26$ choices. For the middle two letters, there are $5$ choices each. For the last letter, there are $21$ choices. The total is thus $\mathbf{26 \cdot 5 \cdot 5 \cdot 21}$.

> **Exercise 25-2.** In how many ways can Horatio give M&M's to three kids? (M&M's come in red, yellow, green, brown, and tan.)

> **Exercise 25-3.** How many odd numbers with third digit $5$ are there between $20000$ and $69999$ inclusive?

---

## 25.3 Example: The Number of Divisors

A very important application of the multiplicative principle lies in the realm of number theory. Given a number $n$, the **divisors** of $n$ are the numbers which divide $n$. The counting problem is to find out how many there are.

Let's tackle the problem with a specific number, say $540$. The first step is to find the prime factorization of the number. Using our standard methods, we obtain $540 = 2^{2} \cdot 3^{3} \cdot 5$. Given this, how can we find the number of divisors? Any number which divides $540$ could only have $2$, $3$, and $5$ as prime factors. Thus, all divisors of $540$ are of the form $2^{a} 3^{b} 5^{c}$. A divisor of $540$ cannot have more factors of $2$ than $540$ has. (For example, $2^{3} = 8$ does not divide $540$.) Thus, $a \leq 2$, so $a$ can be $0$, $1$, or $2$. Similarly, $b$ can be $0$, $1$, $2$, or $3$, and $c$ can be $0$ or $1$. Putting this together, we have $3$ choices for $a$, $4$ choices for $b$, and $2$ for $c$. Since our choices for $a$, $b$, and $c$ are independent, there are $(3)(4)(2) = 24$ factors of $540$.

Thus we see that counting the number of divisors is a simple application of the multiplication rule. For each prime-power $p^{d}$ which divides our number, there is an *independent* contribution of $0, 1, 2, \ldots,$ or $d$ powers of $p$, for a total of $d + 1$ possibilities. This independence is exactly the condition for the application of the multiplication principle.

> **Exercise 25-4.** Use our arguments to find the general formula: how many divisors does the number $n = p_{1}^{e_{1}} p_{2}^{e_{2}} \cdots p_{k}^{e_{k}}$ have?

> **Exercise 25-5.** Find the number of divisors of $12$ both using the multiplication concept and by direct counting.

> **Exercise 25-6.** How many divisors does $1{,}000{,}000$ have?

The number of divisors of a positive integer $n$ is often denoted $d(n)$.

---

## 25.4 Restrictions on Multiplication

Simple multiplication only works when all contributors are completely independent. This fails for a problem like:

> *In how many ways can Michaelangelo give five differently-colored M&M's to five kids?*

The answer is **not** $5 \cdot 5 \cdot 5 \cdot 5 \cdot 5$. The reason that independence breaks down here is that there are a limited number of M&M's. If Michaelangelo gives a red M&M to the first kid, the option no longer exists of giving a red to any of the others.

In such a situation, we can still use multiplication, but incorporating the restriction that there is only one of each color. So we line the kids up (in our head), and start giving out candy. There are $5$ ways to give the first kid a piece, then only $4$ for the second, since one is gone (doesn't matter which), then $3$ for the third, and so on.

> **Exercise 25-7.** Make sure that the process described above does give all the possible ways. Check also that it does not **overcount**, or count the same possibility twice.

You should do Exercise 25-7 to make sure you understand why the method counts each possible distribution of candy exactly one time. Once this is clear, the answer is clear also; the total number of ways is $5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = \mathbf{120}$.

Using the multiplication rule with restrictions like this is somewhat trickier, but as long as you repeat the considerations of Exercise 25-7 each time you use the method, it is really no harder than multiplication. One way to keep things sorted out is to write down a series of "blanks," one for each item which has an independent choice, and fill them in as you go. Let's consider some easy extensions of the exercises from the previous section.

> **Example 25-4.** How many four-letter "words" are there with vowels in the middle two places and consonants in the other two, and with no letter repeated?
>
> ***Solution.*** For the first and last letters, there are $21$ and $20$ choices. (Again, for the second of the two, $1$ of the $21$ possible choices is already off-limits.) For the middle two letters, there are $5$ and $4$ choices. The total is thus $\mathbf{21 \cdot 5 \cdot 4 \cdot 20}$. If we were doing this by filling in the blanks, we would write
>
> $$\underline{\phantom{XX}} \;\; \underline{\phantom{XX}} \;\; \underline{\phantom{XX}} \;\; \underline{\phantom{XX}}$$
>
> then place a $21$ in the first space, a $20$ in the last, and a $5$ and a $4$ in the middle two.

> **Exercise 25-8.** How many four-letter "words" can be made without repeating the same letter twice? (You can leave your answer as a product of integers.)

> **Exercise 25-9.** How many odd numbers with middle digit $5$ are there between $40000$ and $69999$ inclusive, with no digits repeated?

Sometimes the order in which we treat the contributors matters in restricted problems. For example, take

> *How many five-digit numbers ending with $1$, $2$, or $4$ are there with no digit repeated?*

If we naïvely take the digits in order, we will get to the last digit and break down. Let's try it: there are $9$ choices for the first digit (we can't have $0$), $9$ for the second, $8$ for the third, and $7$ for the fourth. How many possibilities are there for the last digit? We might think there are $3$, since it has to be $1$, $2$, or $4$. However, some of those possibilities might be used up in the preceding digits! We have no way to know whether there are $0, 1, 2,$ or $3$ possibilities left.

We thus take care of the last digit first; it has $3$ possibilities. Now the first digit cannot be $0$, since the number is a five digit one, so excluding $0$ and the number picked for the last slot, there are $8$ possibilities. The three middle digits now have, respectively, $8$, $7$, and $6$ possibilities, so the total is $3 \cdot 8 \cdot 8 \cdot 7 \cdot 6$.

This method is usually necessary when the number of choices (numbers above) for some of the 'blanks' (digits above) are restricted in more ways than for other 'blanks'.

> **Exercise 25-10.** In how many ways can a five letter "word" be written using only the first half of the alphabet with no repetitions such that the third and fifth letters are vowels and the first a consonant?

These problems can get really out of hand. Let's move on.

---

## 25.5 Permutations, Arrangements, and !

Here are two fairly important examples, which are really just rehashes of what we've already done.

> **Example 25-5.** In how many ways can $n$ people be seated in a row of $n$ chairs?
>
> ***Solution.*** We can choose a person to go in the first seat in $n$ ways, to go in the second in $n - 1$ ways, the third $n - 2$ ways, and so on. The total is $(n)(n - 1)(n - 2) \cdots (2)(1)$.

> **Exercise 25-11.** In how many ways can a row of $k$ seats be filled from a set of $n$ people?

The number $(n)(n - 1) \cdots (2)(1)$ is called $n$ **factorial**, and is written $n!$. Note that $0!$ is *defined* to be $1$, because there is exactly $1$ way to lay out zero things in order — do nothing!

The answer to Exercise 25-11 is

$$n(n - 1)(n - 2) \cdots (n - k + 1), \quad \text{or} \quad \frac{n!}{(n - k)!}.$$

Make sure you understand why. This answer is called the number of **permutations** of size $k$ of a set of size $n$; it is sometimes denoted by $_{n}P_{k}$.

> **Exercise 25-12.** Evaluate $3!$, $7!$ (the highest one I know by heart), $_{7}P_{3}$, and $_{5}P_{4}$.

> **Example 25-6.** A special case is $_{n}P_{n}$ for any $n$, which equals $n!/0!$, or just $n!$. Do you see why this should be, based on Example 25-5?

> **Example 25-7.** The factorial has many interesting properties. Perhaps the most useful can be seen by writing it out:
>
> $$n! = n \cdot (n - 1) \cdot (n - 2) \cdots 2 \cdot 1.$$
>
> Now note that if you leave off the first $n$ in the product, you will be left with $(n - 1)!$. This means that for all $n$,
>
> $$n! = n \cdot (n - 1)!.$$

> **Exercise 25-13.** Show that for any $n$ and $k$, we have
>
> $$n! = n \cdot (n - 1) \cdots (n - k + 1) \cdot (n - k)!.$$

> **Example 25-8.** Here's a different kind of problem that often comes up with factorials. How many zeroes are there at the end of $103!$?
>
> ***Solution.*** Problems like this are pretty easy if you remember what the factorial means. We wish to know how many zeroes there are at the end of
>
> $$103 \cdot 102 \cdot 101 \cdots 3 \cdot 2 \cdot 1.$$
>
> Since each terminal zero is just a factor of $10$, we should ask how many factors of ten there are. Since $10 = 2 \cdot 5$, there will be a $10$ for each pair of a $2$ and a $5$ which divides $103!$. Clearly there are more $2$'s than $5$'s, so for each $5$ we will be able to find a $2$. The number of $10$'s will thus equal the number of $5$'s.
>
> So how many $5$'s are there? For each multiple of $5$ there will be one; that is, one factor of $5$ will divide $103!$ for the $5$ which appears in the expansion, one for the $10$, one for the $15$, and so on. The number of such multiples of $5$ less than or equal to $103$ is the integer part of $103/5 = 20.6$, or $20$. That is not the end of the story, however. For each multiple of $5^{2} = 25$, there will be *two* factors of $5$. We have already counted these once, so we need to count them one more time, adding in the integer part of $103/25$, or $4$. The total is thus $24$ $5$'s, for $24$ $10$'s or $\mathbf{24}$ terminal zeros. If the number in question had been larger than $5^{3} = 125$, we would have had to add in the multiples of $125$ a third time, and so on for multiples of $5^{4}$, $5^{5}$, etc.

> **Exercise 25-14.** What is the largest $n$ such that $2^{n}$ divides $100!$?

> ⚠️ **Warning.** The arrangements of Example 25-5 are *in a line*. In problems, sometimes you will have to consider things laid out in a circle as well. It doesn't seem like this makes any difference; you still have the same $n$ things, and the same $n$ places to put them. However, the key point is that with objects arranged in a circle, it is usually assumed that *rotations of the circle don't matter*. Thus the three arrangements below are all thought of as the same:
>
> <!-- FIGURE_TODO chapter=25 section=25.5 -->
> *Figure: three "circular" arrangements of $A$, $B$, $C$ — (1) $A$ on top, $B$ bottom-left, $C$ bottom-right; (2) rotated so $C$ is on top; (3) rotated so $B$ is on top. All three are equivalent under rotation.*
>
> Why are these three apparently different arrangements considered to be the same? Consider what person $A$ sees in each case: $B$ on the right, $C$ on the left. To $A$, the arrangement looks the same in all cases. If you consider what $B$ and $C$ see, you will see that the three cases are equivalent to them as well.
>
> On the other hand, *reflections do matter*, since after a reflection, $A$ sees $B$ on her *left*! Thus
>
> <!-- FIGURE_TODO chapter=25 section=25.5 reflection=true -->
> *Figure: $A$ on top, $C$ bottom-left, $B$ bottom-right — the mirror image of the original arrangement.*
>
> is different from the previous three. There are only two distinct circular arrangements of $3$ objects.
>
> If we count objects in a circle as we do objects in a line, we decide there are $n!$ arrangements. However, as shown above, these arrangements are not all different. Each distinct arrangement is counted $n$ times, once for each rotation of the objects. To account for this, we must divide the number of arrangements by $n$, yielding $n!/n = (n - 1)!$ distinct arrangements. (Compare this to our assertion that there are only two ways to arrange $3$ objects.)
>
> To complicate matters still further, think about a *keychain* with keys on it. When counting the number of arrangements of the keys on the chain, not only do the rotations of the chain not matter, but flipping the whole thing over doesn't matter either! Thus, even the two different circular arrangements are really the same for a three object keychain. There is only one fundamental arrangement of $3$ objects on a keychain.
>
> When dealing with keychains and other objects which can be flipped like this, you have to divide by an extra factor of $2$, since each configuration and its flipped-over companion are indistinguishable.

> **Example 25-9.** In how many ways can $6$ different keys be arranged on a keychain?
>
> ***Solution.*** In a line, there would be $6! = 720$ arrangements. In a circle, there are only $5! = 120$. On a keychain, we need to divide this by $2$, leaving only $\mathbf{60}$ possibilities.

> **Exercise 25-15.** Figure out how many ways there are to arrange $4$ keys on a keychain, then take your keychain and actually do it. Surprised that there are so few?

---

## 25.6 Mixing it Up

One thing remains before we can use our methods to solve a wide range of problems. This is really just an extension of the original discussion, but should probably be explained again. Consider the problem

> *In how many ways can Antoinette give one M&M each to two children if she has $3$ different red, $4$ different brown, and $5$ different tan ones, and the two children insist upon having M&M's of different colors?*

The point of this is that we can separate individual cases, find the number of ways for each, and then add them up. In this problem there are $6$ cases: red-brown, brown-red, red-tan, tan-red, brown-tan, tan-brown. For red-brown we have $3 \cdot 4 = 12$ ways (and the same for brown-red), for red-tan $3 \cdot 5 = 15$ ways (same for tan-red), and for brown-tan $4 \cdot 5 = 20$ ways (same for tan-brown). The total is $2(12 + 15 + 20) = \mathbf{94}$.

Using casework we can go on to solve many problems.

> **Example 25-10.** How many odd numbers with middle digit $5$ and no digit repeated are there between $20000$ and $69999$?
>
> ***Solution.*** We can put the $5$ in the middle first, and turn our attention to the last digit, which must be $1$, $3$, $7$, or $9$. If this last digit is $3$, it restricts the first digit, which can be $2$, $3$, $4$, or $6$, while the first digit is unrestricted if the last digit is not $3$. We thus consider two cases.
>
> ***Case 1: Last digit 3.*** Here there are only the possibilities $2$, $4$, and $6$ for the first digit. The remaining two digits can be chosen from the $7$ choices we haven't used in $7 \cdot 6$ ways. The total for this case is thus $3 \cdot 7 \cdot 1 \cdot 6 \cdot 1$. (The two $1$'s are the $5$ in the middle digit, which has no choice, and the $3$ in the last position.) Multiplying, we find a total of $126$ numbers.
>
> ***Case 2: Last digit not 3.*** For the last digit we have the choices $1$, $7$, and $9$, and for the first digit we have the four choices $2$, $3$, $4$, and $6$. Again, the remaining two digits may be picked in $7 \cdot 6$ ways, for a total of $4 \cdot 7 \cdot 1 \cdot 6 \cdot 3 = 504$.
>
> To find the total number of numbers, we need to add the totals found by the two cases: $126 + 504 = \mathbf{630}$.

> **Example 25-11.** Many counting problems can be subtly changed by the **distinguishability** of the objects counted. Consider the problem:
>
> *In how many ways can two objects be put into two boxes?*
>
> If the objects are distinguishable, there are four different ways: both in box 1, object $A$ in box 1 and $B$ in 2, $B$ in 1 and $A$ in 2, and both in 2. But if the objects are indistinguishable (meaning we can't tell the difference between them), the two middle choices are the same, and there are only three cases!
>
> We can make it still worse by making the boxes themselves indistinguishable. In this case, "both in one box" is only one choice, since we don't care which box we are talking about. Similarly, "one in one box and one in the other" is a single choice, *even if the objects are themselves distinguishable*. Hence, with indistinguishable boxes there are only two possibilities, whether or not the objects are distinguishable. Try to use distinguishability in the exercises which follow.

> **Exercise 25-16.** In how many ways can three different babies be put in two different playpens? In two identical ones?

> **Exercise 25-17.** In how many ways can three identical rattles be given to two different babies?

Problems are often less than explicit about distinguishable versus indistinguishable objects; you may have to go on context and common sense. Get some balls and boxes and try out these concepts. Count the arrangements when the boxes and/or the balls are distinguishable, then count those when the boxes and balls are not distinguishable. This will help make the foggy concept of distinguishability clearer.

---

## 25.7 Counting the Wrong Thing, Part I

In many cases, the best way to count something is to count something else which turns out to be simply related. In the first examples, the way to go is to count the things that we *don't* want, and subtract from the total number of possibilities to get the number we do want.

> **Example 25-12.** The 54-member Council for Security and Cooperation in Europe wishes to choose $3$ member states for different leadership positions. The L lobby decrees that at least one of Lithuania, Lichtenstein, Latvia, and Luxembourg must be chosen. In how many ways can the committee be selected?
>
> ***Solution.*** The simplest approach is to count the number of choices of the offices *without* choosing any of the L countries. Then there are $50$ states and $3$ different positions, making $50 \cdot 49 \cdot 48$ choices. We wish to subtract this from the number of committees which can be formed without restriction, or $54 \cdot 53 \cdot 52$. The committees left are those which satisfy the L lobby. The result is just $\mathbf{54 \cdot 53 \cdot 52 - 50 \cdot 49 \cdot 48}$.

> **Exercise 25-18.** How many ordered (i.e. the order of the books matters) sets of three of the eight *Anne of Green Gables* books are there if we insist that *Anne of Avonlea* be one?

> **Exercise 25-19.** What fraction of four letter "words" contain a repeated letter?

These problems can also be attacked by splitting them into cases, but our new approach is much faster.

---

## 25.8 Counting the Wrong Thing, Part II

A second way to count something other than what we actually want is by the creative use of **overcounting**. In overcounting, we intentionally count more things than we really want, and get rid of the excess cases at the end.

> **Example 25-13.** In how many ways can Cleopatra choose $3$ of the $5$ colors of M&M's to eat?
>
> ***Solution.*** The key here is the recognition that the order in which she picks the colors does not matter. Suppose we pretend that it does; then the answer will be, by Exercise 25-11, $5 \cdot 4 \cdot 3$. If order does not matter, however, then we have overcounted badly. For example, we have counted red-tan-brown and brown-tan-red as different, when in fact they are the same if order does not matter. In both cases, we have the same combination of colors: red, brown, and tan.
>
> How many times have we counted this combination in our "order matters" count? We have counted every arrangement of the combination red-tan-brown, and we know from Exercise 25-11 that there are $3 \cdot 2 \cdot 1$ such arrangements.
>
> For every combination, we have the same problem — each one has been counted $3 \cdot 2 \cdot 1$ times. Thus to get the true number of combinations, we must divide our original number, $5 \cdot 4 \cdot 3$, by $3 \cdot 2 \cdot 1$ to get
>
> $$\frac{5 \cdot 4 \cdot 3}{3 \cdot 2 \cdot 1} = \mathbf{10}.$$

> **Exercise 25-20.** In how many ways can Ulysses choose $4$ of the $11$ Confederate states for attack?

> **Exercise 25-21.** Verify that the answers of the two previous problems satisfy
>
> $$\frac{n!}{k!\,(n - k)!}, \quad (25.1)$$
>
> where $n$ is the number of objects to be chosen from and $k$ is the number to choose.

> **Exercise 25-22.** Prove that the number of ways to choose $k$ objects from a set of $n$, ignoring order, is given by the expression (25.1).

This result is the number of **combinations** of $k$ objects from a set of $n$ objects. It is denoted by $\binom{n}{k}$, or sometimes by $_{n}C_{k}$. **MAKE SURE YOU UNDERSTAND THESE LAST EXERCISES!** The problem of picking a combination of objects from another set is the most fundamental one in counting. To make sure you understand the formula of Exercise 25-21, we present here some more examples.

> **Example 25-14.** In how many ways can a three-person subcommittee be chosen from a five-person committee?
>
> ***Solution.*** The number we want is just $\binom{5}{3}$, which is evaluated as
>
> $$\frac{5!}{3!\, 2!} = \frac{5 \cdot 4 \cdot 3!}{3!\, 2!} = \frac{5 \cdot 4}{2 \cdot 1} = \mathbf{10}.$$
>
> Observe that the expansion property of factorials has been used in the first equality; if you don't follow this, go back and look at Exercise 25-13.

> **Exercise 25-23.** In how many ways can a three-person subcommittee be chosen from a five-person committee if a particular person must be on the subcommittee?

> **Exercise 25-24.** How many ways are there to pick no objects from a set of $n$ objects? Does the formula give what you expect?

> **Exercise 25-25.** In how many ways can Catherine choose two nuts and two bolts if she has eight nuts and six bolts?

> **Example 25-15.** In how many distinguishably different ways can a pair of indistinguishable dice come up?
>
> ***Solution.*** We might at first think the answer was $6$ times $6$, since each die has $6$ possibilities. But here we would be counting 4-2 and 2-4 as different outcomes, when they are, for this purpose, the same. Thus, we count in the following way. If the faces of the two dice are different, we can choose $2$ of the $6$ possibilities for the faces in $\binom{6}{2} = 15$ ways. If they are the same, we can choose the face in $\binom{6}{1} = 6$ ways. The total number of ways is thus $\mathbf{21}$.

The quantity $\binom{n}{k}$ is often pronounced "$n$ choose $k$," because it is the number of ways to choose $k$ things from a set of $n$. Since the expression for $\binom{n}{k}$ involves factorials, we can use the simplifying tactic for factorials, as described in Exercise 25-13 and used above in Example 25-14.

> **Example 25-16.** A set of points is chosen on the circumference of a circle so that the number of different triangles with all three vertices among the points is equal to the number of pentagons with all five vertices in the set. How many points are there? *(Mandelbrot #3)*
>
> ***Solution.*** This is very simple using basic counting. We form triangles by just choosing three vertices from among the points, so the number of triangles that can be drawn from $n$ points is just $\binom{n}{3}$. Similarly the number of pentagons is $\binom{n}{5}$. Thus we have
>
> $$\frac{n!}{5!\,(n - 5)!} = \frac{n!}{3!\,(n - 3)!}.$$
>
> We can cancel the two $n!$'s, and rearranging yields
>
> $$\frac{(n - 3)!}{(n - 5)!} = \frac{5!}{3!}.$$
>
> But $(n - 3)! = (n - 3)(n - 4) \cdot (n - 5)!$, so we have
>
> $$\frac{(n - 3)!}{(n - 5)!} = \frac{(n - 3)(n - 4)(n - 5)!}{(n - 5)!} = (n - 3)(n - 4) = 20,$$
>
> and we can easily solve the quadratic to find $n = \mathbf{8}$. (The quadratic also has the root $n = -1$, but this is clearly extraneous, since there can't be a negative number of points.)

> **Exercise 25-26.** The previous example showed that
>
> $$\binom{8}{5} = \binom{8}{3}.$$
>
> This is of the form
>
> $$\binom{n}{k} = \binom{n}{n - k}$$
>
> with $n = 8$ and $k = 5$. Try some different $n$'s and $k$'s and see if this holds generally. Write down both sides in the form (25.1) to see why or why not. (It should become very clear!)

In the last exercise we proved our first **combinatorial identity**, namely that for all $n$ and $k$,

$$\binom{n}{k} = \binom{n}{n - k}.$$

This is easy to see using the formula for $\binom{n}{k}$, but is there a deeper reason that it holds? For combinatorial identities, there usually is. Here the reason is that to choose $k$ things from a set of $n$, we could just as well choose the $n - k$ things we *don't* want! Once you realize this, the identity is obvious, and very easy to remember.

> ⚠️ **Warning.** Don't confuse combinations with permutations! The thing to remember is that with permutations, *order matters*. So if you want a triple dip cone but don't care about the order of the flavors, the number of cones you can make is a problem in combinations. On the other hand, if you're picky about which flavor is on top and which is on bottom, the number of cones you can make is a problem in permutations.

In general rearrangements, the overcounting concept is still useful. For example, suppose we want to find in how many ways the word LINGUINI can be rearranged. We might immediately think the answer is $8!$, since there are $8$ letters in the word. The problem is that we are overcounting. The three I's are distinct; call them $I_{1}$, $I_{2}$, and $I_{3}$. We have counted, for example, $UNI_{1}LI_{3}GI_{2}N$, $UNI_{2}LI_{1}GI_{3}N$, $UNI_{3}LI_{1}GI_{2}N$, and so on as different words, when they are actually the same! Though distinct, the I's are indistinguishable.

Among the $8!$ arrangements, each has been written $3!$ times by ordering the I's in $3!$ ways. Similarly, each word has been formed $2!$ times by the orderings of the two N's. Dividing out by all these repetitions, since we only want one copy of each arrangement in the end, the final answer is

$$\frac{8!}{3!\, 2!}.$$

> **Exercise 25-27.** In how many ways can the word RAMANUJAN be rearranged? How about MINIMIZATION?

> **Exercise 25-28.** Prove the general formula: the number of rearrangements of a word consisting of $k_{1}$ copies of letter 1, $k_{2}$ copies of letter 2, and so on up to $k_{j}$ copies of letter $j$, with $n$ total letters, is
>
> $$\frac{n!}{k_{1}!\, k_{2}! \cdots k_{j}!}.$$

---

## 25.9 Doing it Another Way

When you have become comfortable with counting problems, a good exercise is to do problems in more than one way. This helps you stay flexible and not get locked into one mode of solving. For example, on page 231 we showed that $\binom{n}{k} = \binom{n}{n - k}$ in two ways, each of which illuminated a different side of the identity.

> **Example 25-17.** As an example, let's find another way to count the arrangements of LINGUINI, done in one way in Section 25.7. This time, we will not resort to overcounting. Instead, we will rid ourselves of the repeated letters first by choosing final positions for them. Of the eight positions (the number of letters in LINGUINI), we take three for the I's; then of the remaining five, choose two for the N's. So far, then, the product is $\binom{8}{3}\binom{5}{2}$. The remaining three letters are not repeated, so we can arrange them in the three remaining spaces in $3!$ ways. The final answer is thus
>
> $$\binom{8}{3}\binom{5}{2}\, 3!.$$

> **Exercise 25-29.** Verify that the answer to Exercise 25-17 agrees with our previous answer to this problem.
>
> <!-- OCR-NOTE: source text says "Exercise 25-17" but appears to mean "Example 25-17" (the LINGUINI re-derivation just above) — preserving as printed. -->

> **Exercise 25-30.** Which method is better suited to proving the general result, as stated in Exercise 25-28?

Always keep in mind the possibility that there may be a clearer, faster, or more intuitive way to approach a counting problem. And occasionally, counting something in two ways will give you a beautiful identity, as we will see on page 250.

---

## 25.10 The Binomial Theorem

We've already seen the expansion of $(x + y)^{2}$ and $(x + y)^{3}$, but what about higher powers, like $(x + y)^{5}$? Is there an easier way to expand this product without multiplying repeatedly? Let's write the product out as

$$(x + y)(x + y)(x + y)(x + y)(x + y).$$

Now we see that any term in the product can be formed by selecting an $x$ or a $y$ from each $(x + y)$. Thus we form $x^{5}$ by taking an $x$ from each $(x + y)$. Since there is only one way to take an $x$ from each term, there is only one $x^{5}$ in the product. However, there are $5$ ways we can choose one $y$ and four $x$'s, forming $x^{4} y$, because there are $5$ $(x + y)$'s to choose the single $y$ from. Hence, there is a $5x^{4} y$ term in our expansion of $(x + y)^{5}$.

Moving on, there are $\binom{5}{2} = 10$ ways we can choose $2$ $y$'s from among the $(x + y)$'s, so there is a $10 x^{3} y^{2}$ term. Likewise we can easily determine the other three terms and:

$$(x + y)^{5} = x^{5} + 5x^{4} y + 10 x^{3} y^{2} + 10 x^{2} y^{3} + 5 x y^{4} + y^{5}.$$

For a quick check, we can let $x = y = 1$ in the above equation. Is the resulting equation true? If not, then our expansion is incorrect.

So can we write an expression for the expansion of $(x + y)^{n}$, where $n$ is any positive integer? Clearly there is an $x^{n}$ term. Since we can pick one $y$ and $(n - 1)$ $x$'s from the $n$ $(x + y)$ terms in $\binom{n}{1}$ ways, there is a $\binom{n}{1} x^{n-1} y$ term. We can just continue in this manner until we have the expansion

$$(x + y)^{n} = \binom{n}{0} x^{n} + \binom{n}{1} x^{n-1} y + \binom{n}{2} x^{n-2} y^{2} + \cdots + \binom{n}{n-1} x y^{n-1} + \binom{n}{n} y^{n}.$$

Notice that we put the $\binom{n}{0}$ and $\binom{n}{n}$ in the first and last terms to make the pattern complete.

This expansion is known as the **Binomial Theorem**, and it is the quickest way to evaluate powers of binomial expressions.

> **Example 25-18.** Write the Binomial Theorem using summation notation.
>
> ***Solution.*** We want the summation representing $(x + y)^{n}$ to go from $0$ to $n$, as the powers of $x$ and $y$ cover that range. Notice that in each term of the expansion, the power of $y$ is always the same as bottom number in the combination. Furthermore the sum of the exponents of $x$ and $y$ is always $n$. Thus, if we let the power of $y$ be $i$, then $x$ must be raised to $n - i$ power and we can express each term as $\binom{n}{i} x^{n-i} y^{i}$. Finally, we can write the expansion as
>
> $$(x + y)^{n} = \sum_{i=0}^{n} \binom{n}{i} x^{n-i} y^{i}.$$

> **Example 25-19.** Find the constant term of the expansion of $\left(x^{2} - \dfrac{2}{x}\right)^{6}$.
>
> ***Solution.*** Using the Binomial Theorem, the $i$th term is
>
> $$\binom{6}{i}(x^{2})^{6-i}\left(-\frac{2}{x}\right)^{i} = \binom{6}{i}\frac{(-2)^{i} x^{12 - 2i}}{x^{i}}.$$
>
> (Notice that we include the negative sign with the second term!)
>
> For the constant term, we must have the $x$'s on top cancel those on the bottom, or $12 - 2i = i$. Thus, we find $i = 4$, and our term is $\binom{6}{4}(-2)^{4} = 15 \cdot 16 = \mathbf{240}$.

---

## Problems to Solve for Chapter 25

**457.** In how many different ways can a student guess a complete set of answers to a five-item true/false quiz? *(MATHCOUNTS 1985)*

---

**458.** How many factors of $2^{95}$ are there which are greater than $1{,}000{,}000$? *(MATHCOUNTS 1984)*

<!-- OCR-NOTE: source prints "factors of 295" — the superscript was lost. 295 = 5·59 has only four divisors, none > 10^6, so the problem only makes sense as 2^{95}. -->

---

**459.** If $n = 100$, find the value of

$$\frac{(n + 1)!}{(n - 1)!}.$$

*(MATHCOUNTS 1988)*

---

**460.** What is the units digit of the sum $1! + 2! + 3! + \cdots + 14! + 15!$? *(MATHCOUNTS 1985)*

---

**461.** In a round-robin tournament, each of six softball teams plays each other team exactly once. How many softball games are needed? *(MATHCOUNTS 1991)*

---

**462.** Evaluate $\dfrac{\binom{10}{8}\binom{6}{2}}{\binom{7}{4}}$. *(MAΘ 1992)*

---

**463.** We are given $5$ lines and two circles in a plane. What is the maximum number of possible intersection points among these seven figures? *(MAΘ 1990)*

---

**464.** A yogurt shop has four different flavors and six different toppings. If a customer wanted to get one flavor and two different toppings, how many combinations could she get? *(MATHCOUNTS 1990)*

---

**465.** Numbers that read the same forward and backward are called **palindromes**. How many three-digit numbers are palindromes? *(MATHCOUNTS 1992)*

---

**466.** If $\dfrac{a!}{b!}$ is a multiple of $4$ but not a multiple of $8$, then what is the maximum value of $a - b$? *(Mandelbrot #2)*

---

**467.** How many odd positive integers are factors of $480$? *(MATHCOUNTS 1989)*

---

**468.** Less than $50$ people are at a party. Each person shakes everyone else's hand. If there is an odd number of total handshakes at the party, what is the largest number of people that could be at the party? *(Mandelbrot #1)*

---

**469.** How many lines are determined by $12$ points in a plane, no three of which are collinear? (That is, how many lines are formed if all possible lines through two of the points are drawn?) *(AHSME 1952)*

---

**470.** In how many ways can four identical red chips and two identical white chips be arranged in a circle? *(MATHCOUNTS 1992)*

---

**471.** How many ways can $5$ books be arranged on a shelf if $2$ of the books must remain together? *(MATHCOUNTS 1984)*

---

**472.** What is the sum of all integers less than $100$ which have exactly $12$ divisors? *(Mandelbrot #1)*

---

**473.** At the end of a professional bowling tournament, the top $5$ bowlers have a playoff. First #5 bowls #4. The loser receives fifth prize and the winner bowls #3 in another game. The loser of this game receives fourth prize and the winner bowls #2. The loser of this game receives third prize and the winner bowls #1. The winner of this game gets first prize and the loser gets second prize. In how many orders can bowlers #1 through #5 receive the prizes? *(AHSME 1988)*

---

**474.** If $A = \{1, 2, 3\}$ and $B = \{a, b, c, d\}$ how many different functions are there that assign one element of $B$ to each element of $A$? *(MATHCOUNTS 1987)*

---

**475.** Palindromes, like $23432$, read the same forward and backward. Find the sum of all four-digit positive integer palindromes. *(Mandelbrot #3)*

---

**476.** Find the greatest $n$ for which $12^{n}$ evenly divides $20!$. *(Mandelbrot #1)*

---

**477.** A new school has exactly $1000$ lockers and $1000$ students. On the first day of school, the first student enters the school and opens all the lockers. The second student then enters and closes every locker with an even number. The third student will 'reverse' every third locker (if closed, it will be opened and if open, it will be closed). The fourth student will reverse every fourth locker and so on, until all $1000$ students have entered and reversed the proper lockers. Which lockers will be open at the end? *(MAΘ 1992)*

---

*End of Chapter 25.*
