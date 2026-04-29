---
title: "Chapter 24 — Sequences and Series"
source: "The Art of Problem Solving, Volume 1"
chapter: 24
problem_range: [434, 456]
sections:
  - "24.1 Arithmetic Series"
  - "24.2 Geometric Series"
  - "24.3 Infinite Series"
  - "24.4 Σ Notation"
  - "24.5 Sequences"
  - "24.6 Sequences and Means"
includes_big_picture: true
big_picture_topic: "Zeno's paradoxes and the discovery of convergent infinite series"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • `]T`, `X)`, `^`                         → Σ (sum)
    • `Y\`, `n` (when meaning product)        → Π (product)
    • `j*`, `7*`, etc. (with strange chars)   → 7^k (exponent)
    • `MA©`                                   → MAΘ
    • `M ATHCO U N TS`                        → MATHCOUNTS
    • `AHSM E`                                → AHSME
  Source typo preserved with annotation: in Section 24.5, the Fibonacci
  sequence walkthrough has `F4 = F3 + F2 = 5, F4 = F3 + F2 = 8`. The
  second occurrence should be F5 = F4 + F3 = 8. Inline note added.
  Problem 432 in Chapter 23 likely should read `(a★b)^n = a★(bn)`
  with `bn` meaning the product b·n, but reproduced as printed.
---

# Chapter 24 — Sequences and Series

## 24.1 Arithmetic Series

> *A child's mother gives her 10 cents one day. Every day thereafter her mother gives her 3 more cents than the previous day. After 20 days, how much does she have?*

This simple problem exhibits what is called an **arithmetic series**. After 1 day, she has 10 cents. On the second day she gets 13 cents, so after two days, she has $23$; after three, $23 + 16 = 39$. The list of amounts she gets each day,

$$10, 13, 16, 19, 22, 25, 28, \ldots,$$

is called a **sequence**. When we add up the terms to get the total amount she has at some point,

$$10 + 13 + 16 + 19 + 22 + 25 + 28 + \cdots,$$

the result is a **series**. In this particular case, where each term is separated by a fixed amount from the previous one, both series and sequence are called **arithmetic** (air ith MET ic). So the problem we need to solve is adding up an arithmetic series.

> **Exercise 24-1.** Which of the following are arithmetic sequences?
>
>   i. $1, 2, 3, 4, 5, \ldots$
>   ii. $1, 3, 6, 10, 15, \ldots$
>   iii. $34, 41, 48, 55, 62, \ldots$

In general, an arithmetic sequence is defined by the first term, which we call $a$, and the difference between successive terms, $d$. The sequence is thus

$$a, \quad a + d, \quad a + 2d, \quad a + 3d, \quad \ldots$$

The $n$th term is $a + (n - 1)d$, since it is $(n - 1)$ $d$'s away from the first. The sum of the first $n$ terms is thus

$$a + (a + d) + (a + 2d) + \cdots + (a + (n - 1)d).$$

Such a series may be summed by a relatively simple method. We write the series down, calling the sum $S$, and write it again backwards underneath.

$$\begin{aligned}
S &= a \;+\; (a + d) \;+\; \cdots \;+\; (a + (n - 1)d) \\
S &= (a + (n - 1)d) \;+\; (a + (n - 2)d) \;+\; \cdots \;+\; a
\end{aligned}$$

Summing the pairs which are vertically aligned, we get

$$2S = (2a + (n - 1)d) + (2a + (n - 1)d) + \cdots + (2a + (n - 1)d),$$

where the sum has $n$ identical terms. Thus we have $2S = n(2a + (n - 1)d)$, or

$$S = \frac{n}{2}\big(2a + (n - 1)d\big).$$

This is one formula which is probably worth remembering, but don't let that distract you from the elegance of the method.

> **Example 24-1.** The problem we started the section with can easily be solved. We have $a = 10$, $d = 3$, $n = 20$. The sum is $\tfrac{20}{2}\big(2(10) + 19(3)\big) = 10(77) = \mathbf{770}$.

> **Exercise 24-2.** Show that our formula is equivalent to
>
> $$\text{Sum} = \frac{\#\,\text{terms}}{2}(\text{first term} + \text{last term}).$$

When we are presented with the first and last terms, this formula quickly gives results.

> **Exercise 24-3.** Find the sum of $8 + 5 + 2 + \cdots + (-10)$.

> **Exercise 24-4.** Find the sum of the first 100 terms of $(-101) + (-99) + (-97) + \cdots$.

> **Exercise 24-5.** Find the sum of the first $k$ integers: $1 + 2 + \cdots + k$.

> **Example 24-2.** Often, complicated problems are formed from the basic idea of the arithmetic series. These are usually pretty easy to untangle. Here's one: *If the sum of the first ten terms of an arithmetic progression is four times the sum of the first five terms, find the ratio of the first term to the common difference.* *(AHSME 1952)*
>
> ***Solution.*** Just remember that our formula, together with the parameters $a$, $d$, and $n$, contains all the information you need. We know that the sums of the first five and first ten terms are $5(2a + 4d)/2$ and $10(2a + 9d)/2$, respectively. Setting the second equal to four times the first and simplifying a little, we get a linear equation:
>
> $$4(5)(2a + 4d) = 10(2a + 9d).$$
>
> Expanding and pulling the variables to different sides, we then have $20a = 10d$, so that $a/d = \mathbf{1/2}$.

Calm application of the sum formula will easily solve all problems of this last type. There are many to practice on at the end of the chapter.

---

## 24.2 Geometric Series

A **geometric series** is like an arithmetic series, except instead of having a constant difference, successive terms have a constant *ratio* $r$. For example, a fable says that a wise woman solved a king's dire problem, and the king said she could have anything she wanted in return. She demurely asked only for a chessboard with $1$ grain of wheat on the first square, $2$ on the second, $4$ on the third, $8$ on the fourth, and so on up to the sixty-fourth square.

> **Exercise 24-6.** How many grains would she have if she had asked for $1, 2, 3, 4, \ldots$, rather than $1, 2, 4, 8, \ldots$?

Since each term is equal to $r$ times the previous one, the general form of a geometric sequence is $a, ar, ar^{2}$, and so on. The $n$th term is clearly $ar^{n-1}$. (Compare this to the $n$th term of an arithmetic series.) We can sum the series with a method similar to the one from the arithmetic series. Watch:

$$\begin{aligned}
S  &= a \;+\; ar \;+\; \cdots \;+\; ar^{n-1} \\
Sr &= \phantom{a \;+\;} ar \;+\; \cdots \;+\; ar^{n-1} \;+\; ar^{n}
\end{aligned}$$

If we now *subtract* the second row from the first, all the terms in the sum but two will cancel. We are left with

$$S - Sr = a - ar^{n},$$

or, as long as $r \neq 1$,

$$S = \frac{a - ar^{n}}{1 - r}. \quad (24.1)$$

Make sure you understand the method used to find this sum. It is a very useful one in many circumstances.

> **Example 24-3.** Let's find the sum $2 - \tfrac{2}{3} + \tfrac{2}{9} - \tfrac{2}{27} + \tfrac{2}{81}$. We see that $a = 2$, $r = -\tfrac{1}{3}$, and $n = 5$, and applying the formula we get
>
> $$S = \frac{2 + \tfrac{2}{243}}{1 + \tfrac{1}{3}} = \frac{488/243}{4/3} = \mathbf{\frac{122}{81}}.$$
>
> If you're not yet convinced of the correctness of our formula, verify this by adding the terms up in the normal way.

> **Exercise 24-7.** What is the sum of the series $1 + 2 + 4 + \cdots + 2^{k}$? How many grains of wheat did the wise woman ask for? If a loaf of bread requires a million grains of wheat, how many loaves could she make? Could the king pay her?

> **Exercise 24-8.** Show how equation (24.1) yields the polynomial factorization
>
> $$x^{k} - 1 = (x - 1)(x^{k-1} + x^{k-2} + \cdots + x + 1).$$

---

## 24.3 Infinite Series

We have up to now assumed that our series terminated after some finite number of terms; however, this need not be so. Consider the geometric series with $a = 1$, $r = \tfrac{1}{2}$:

$$1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \cdots.$$

If we add the first two terms only, the sum is $3/2$. If we add the first three, it is $7/4$, if we add the first four, it is $15/8$. The sums of the first $n$ terms of the series are approaching a set value, $2$. An infinite series is called **convergent** if its sums tend to a fixed value like this.

When can a series converge? First of all, *the terms must tend to zero*. Thus series like

$$1 + 1 + 1 + 1 + 1 + \cdots$$

or

$$1 - 2 + 3 - 4 + 5 - \cdots$$

don't converge. The sums of the first $n$ terms, or **partial sums**, do not tend to anything. Series for which this is the case are called **divergent**.

> ⚠️ **Example 24-4 (Warning).** Just because the terms tend to zero, the sum need not converge! The standard example is
>
> $$1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots.$$
>
> If we group the terms like $1 + \tfrac{1}{2} + (\tfrac{1}{3} + \tfrac{1}{4}) + (\tfrac{1}{5} + \tfrac{1}{6} + \tfrac{1}{7} + \tfrac{1}{8}) + \cdots$, we can see that $(\tfrac{1}{3} + \tfrac{1}{4}) > (\tfrac{1}{4} + \tfrac{1}{4}) = \tfrac{1}{2}$, $(\tfrac{1}{5} + \tfrac{1}{6} + \tfrac{1}{7} + \tfrac{1}{8}) > 4(\tfrac{1}{8}) = \tfrac{1}{2}$, and so on. Thus the given series is greater than the obviously divergent series
>
> $$1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{2} + \frac{1}{2} + \cdots,$$
>
> and thus must itself be divergent, *even though the terms tend to $0$*. (This is one example of the **comparison test** in which we show that each term or group of terms in a series is greater than corresponding terms in a divergent series, such as $1 + \tfrac{1}{2} + \tfrac{1}{2} + \cdots$.)

> **Exercise 24-9.** Write an arithmetic series which is convergent.

When is a geometric series convergent? Consider the infinite geometric series

$$a + ar + ar^{2} + ar^{3} + \cdots.$$

Rearranging Equation (24.1), we can see that the sum of the first $n$ terms is

$$S = \left(\frac{a}{1 - r}\right)\big(1 - r^{n}\big).$$

As $n$ gets bigger, the first term in the product on the right stays the same, so we can ignore it for now. The second term gets bigger and bigger if the absolute value of $r$ is greater than $1$, because then each power of $r$ is even bigger in magnitude.

If the absolute value of $r$ is less than $1$, each power of $r$ gets smaller in absolute value, and the term $r^{n}$ tends to zero. For example, the powers of $0.5$ are $0.25$, $0.125$, $0.0625$, etc. Thus the sum is divergent if $|r| > 1$, and convergent if $|r| < 1$. For the second case we can even write the formula for the sum. Since $r^{n}$ tends to zero as $n$ gets large (as for $0.5$ above), the second factor $(1 - r^{n})$ becomes $1$ in the product, and the sum tends to

$$a + ar + ar^{2} + ar^{3} + \cdots = \frac{a}{1 - r}.$$

Try using the method we used to sum a terminating geometric series to prove this formula.

> **Exercise 24-10.** What happens in the above discussion if $|r| = 1$, that is, for $r = 1$ or $-1$?

---

## 24.4 $\sum_{i=1}^{n}$

There is a very useful shorthand for summation. The large symbol $\sum$ is used, since it is the letter S, for *sum*, in Greek. Let's look at an example:

$$\sum_{k=1}^{5} k = 1 + 2 + 3 + 4 + 5.$$

The expression on the bottom specifies that $k$ is a **dummy variable**. That is, it will be substituted in for, but will not appear in the final expression. Common dummy variables are $i$, $j$, and $k$. The bottom specifies that $k$ will start as $1$; the top specifies that $k$ will stop when it equals $5$. The dummy variable is incremented by $1$'s, and the values of the expression in front of the $\sum$ are added up for all the different values of $k$.

> **Example 24-5.** Let's do the sum $\displaystyle\sum_{k=3}^{7} 2^{k}$.
>
> We have
>
> $$\begin{aligned}
> k = 3:\ &2^{k} = 8 \\
> k = 4:\ &2^{k} = 16 \\
> k = 5:\ &2^{k} = 32 \\
> k = 6:\ &2^{k} = 64 \\
> k = 7:\ &2^{k} = 128
> \end{aligned} \qquad \sum_{k=3}^{7} 2^{k} = 8 + 16 + 32 + 64 + 128 = \mathbf{248}.$$

> **Exercise 24-11.** Write the following in $\sum$ notation.
>
>   i. $1 + 1 + 1 + 1 + 1 + 1 + 1 + 1$
>   ii. $13 + 12\tfrac{1}{2} + 12 + \cdots + \tfrac{1}{2}$
>   iii. $1 - 4 + 9 - 16 + \cdots - 64$

> **Exercise 24-12.** Can you figure out what
>
> $$\sum_{k=1}^{4} \left(\sum_{j=1}^{4} kj\right)$$
>
> must mean? What is its value?

> **Exercise 24-13.** Or worse: what if we made it
>
> $$\sum_{k=1}^{4} \left(\sum_{j=1}^{k} kj\right)?$$

---

To write down an infinite sum, we just let the dummy variable go off to $\infty$, so that we can write

$$a + ar + ar^{2} + ar^{3} + \cdots = \sum_{i=0}^{\infty} ar^{i}.$$

Besides being an efficient code for writing down sums, the $\sum$ notation may be manipulated in some useful ways.

  1. $\displaystyle\sum (a_{n} + b_{n}) = \sum a_{n} + \sum b_{n}$. This is just the associative property of addition.
  2. $\displaystyle\sum k a_{n} = k \sum a_{n}$. This is just the distributive property of multiplication over addition.

Related to $\sum$ notation for sums is $\prod$ notation for products, which works in exactly the same way.

> **Example 24-6.** The expression $(x - 1)(x - 2)(x - 3)(x - 4)$ can be written
>
> $$\prod_{k=1}^{4} (x - k).$$

Any time you encounter an unfamiliar series or product, try to write it in $\sum$ or $\prod$ form. Feeling comfortable with these symbols and being able to manipulate them will be very useful later on; moreover, unless you can write the formula for the $i$th term you may not really understand the sum. (Though being able to do so does not ensure understanding!)

---

## 24.5 Sequences

We have spent most of the chapter dealing with series. **Sequences** are even simpler, though: a sequence is just a list of terms. For example, $1, 1, 1, 1, 1$; or $2, 4, 6, 8$; or $1, -\tfrac{1}{2}, \tfrac{1}{3}, -\tfrac{1}{4}$. Just like a series, a sequence can stop after a while or go on forever.

Like the $\sum$ notation for series, there is a shorthand for sequences: write the $n$th term in curly braces, where $n$ is a dummy variable. Thus the three sequences above can be written $\{1\}$, $\{2n\}$, and $\{(-1)^{n+1} \tfrac{1}{n}\}$. The dummy variable is assumed to start at $1$ and increase by $1$'s.

> **Exercise 24-14.** Write the following sequences in shorthand.
>
>   i. $10, 9, 8, 7, \ldots$
>   ii. $1, 0.5, 0.25, 0.125, \ldots$

> **Exercise 24-15.** Write the first five terms of the following sequences.
>
>   i. $\{n(n + 1)\}$
>   ii. $\{\tfrac{1}{n!}\}$
>   iii. $\{n^{3}\}$

In some sequences, each term may be defined as a function of previous terms. The standard example of such a **recursion** is one in which each term is equal to the sum of the previous two terms. We arbitrarily set the first two terms, $F_{0}$ and $F_{1}$, to $1$, since they don't have two "previous terms." The rest of the terms are then determined; we have $F_{2} = F_{1} + F_{0} = 2$, $F_{3} = F_{2} + F_{1} = 3$, $F_{4} = F_{3} + F_{2} = 5$, $F_{5} = F_{4} + F_{3} = 8$, and so on. <!-- OCR-NOTE: source has "F4 = F3 + F2 = 5, F4 = F3 + F2 = 8" — second occurrence is a typo for F5; corrected here. --> This sequence, called the **Fibonacci sequence**, is only one of infinitely many possible recursions.

> **Exercise 24-16.** Find the next few terms of a sequence whose first three terms are $1$, and whose succeeding terms each equal the sum of the three previous terms.

> **Exercise 24-17.** Find recursive representations for arithmetic and geometric sequences. What is the first term? What is the rule which gives each term from those preceding?

> **Example 24-7.** Prove that $F_{n+2} = \displaystyle\sum_{i=0}^{n} F_{i} + 1$, where $F_{n}$ is the Fibonacci sequence described above.
>
> ***Solution.*** Let's try induction. Read the section on page 256 if you aren't familiar with induction. As a base case, we have $F_{2} = 2 = 1 + 1 = F_{0} + 1$; so far so good. Then, assuming the theorem holds for $n = k - 1$, we show that it holds for $n = k$:
>
> $$\begin{aligned}
> F_{k+2} &= F_{k} + F_{k+1} \\
>         &= F_{k} + \sum_{i=0}^{k-1} F_{i} + 1 \\
>         &= \sum_{i=0}^{k} F_{i} + 1,
> \end{aligned}$$
>
> where we use the inductive assumption in the second line. The theorem holds for $n = 0$, and if the theorem holds for $n = k - 1$, it must also hold for $n = k$. Therefore it holds for all positive integers.

---

## 24.6 Sequences and Means

We have already discussed arithmetic and geometric sequences. An interesting point in relation to these two sequences is *why* they are named as they are. There is a simple reason.

Consider some terms in a general arithmetic sequence $\{x_{n}\}$:

$$\ldots, \quad x_{n-1} = a + (n - 2)d, \quad x_{n} = a + (n - 1)d, \quad x_{n+1} = a + nd, \quad \ldots$$

If we add the terms directly before and after $x_{n}$, we get

$$x_{n-1} + x_{n+1} = 2a + 2(n - 1)d = 2x_{n},$$

which means that

$$x_{n} = \frac{x_{n-1} + x_{n+1}}{2}.$$

Each term is the **arithmetic mean**, or **average** (page 236), of its nearest neighbors! This allows some strange language in which, for example, "insert three arithmetic means between $3$ and $4$" means to find numbers $x$, $y$, and $z$ so that

$$3, \quad x, \quad y, \quad z, \quad 4$$

is an arithmetic sequence.

> **Exercise 24-18.** Insert three arithmetic means between $3$ and $4$.

> **Exercise 24-19.** Given that the **geometric mean** of two numbers $x$ and $y$ is $\sqrt{xy}$, prove that each term in a geometric sequence is the geometric mean of its nearest neighbors.

> **Example 24-8.** Insert two geometric means between $2$ and $16$.
>
> ***Solution.*** We wish to find $x$ and $y$ such that $2, x, y, 16$ is a geometric sequence. Thus, $x = 2r$, $y = xr$, and $16 = yr$ for some $r$, so $16 = yr = xr^{2} = 2r^{3}$ and $r = 2$. Thus, the two numbers are $x = 2(2) = \mathbf{4}$ and $y = 2x = \mathbf{8}$.

> **Exercise 24-20.** Insert three geometric means between $3$ and $4$.

---

## Problems to Solve for Chapter 24

**434.** What is the sixth term of the arithmetic sequence whose 31st and 73rd terms are $18$ and $46$, respectively? *(MAΘ 1991)*

---

**435.** The second term of a geometric sequence is $4$ and the sixth term is $16$. Find the fourth term if the ratio of consecutive terms is a real number. *(MAΘ 1992)*

---

**436.** Evaluate $\displaystyle\sum_{n=0}^{\infty} \left(\frac{3^{n} + 5^{n}}{8^{n}}\right)$. *(Mandelbrot #1)*

---

**437.** For what value of $x$ does

$$1 + x + x^{2} + x^{3} + x^{4} + \cdots = 4?$$

*(Mandelbrot #1)*

---

**438.** Find the sum of the first forty terms of the series $(-59) + (-56) + (-53) + \cdots$. *(Mandelbrot #3)*

---

**439.** If five geometric means are inserted between $8$ and $5832$, find the fifth term in the geometric sequence thus formed by the seven numbers. *(AHSME 1950)*

---

**440.** Find the sum to infinity of

$$\frac{1}{7} + \frac{2}{7^{2}} + \frac{1}{7^{3}} + \frac{2}{7^{4}} + \cdots.$$

*(AHSME 1950)*

---

**441.** A man writes $1$ on the first line of his paper, then writes $2$ and $3$ on the second line, then $4$, $5$, and $6$ on the third, and continues so that on any line $n$ he writes the first $n$ integers following the last integer on line $n - 1$. What is the sum of the first and last integers on line $17$? *(Mandelbrot #1)*

---

**442.** The sum of the first three terms of a geometric sequence of positive integers is equal to seven times the first term, and the sum of the first four terms is $45$. What is the first term of the sequence? *(MATHCOUNTS 1992)*

---

**443.** A wall has been built in such a way that the top row contains one block, the next lower row contains $3$ blocks, the next lower row contains $5$ blocks, and so on, increasing by two blocks in each row. How many rows high is the wall if the total number of blocks used was $900$? *(MATHCOUNTS 1992)*

---

**444.** Given a geometric sequence with first term and common ratio both not $0$, and an arithmetic sequence with first term $0$, a third sequence $1, 1, 2, \ldots$ is formed by adding corresponding terms of the two given sequences. Find the sum of the first ten terms of the third sequence. *(AHSME 1955)*

---

**445.** Find the sum of the infinite series $1 - \tfrac{1}{2} - \tfrac{1}{4} + \tfrac{1}{8} - \tfrac{1}{16} - \tfrac{1}{32} + \tfrac{1}{64} - \tfrac{1}{128} - \cdots$. *(AHSME 1959)*

---

**446.** Thirty-one books are arranged from left to right in order of increasing prices. The price of each book differs by \$2 from that of each adjacent book. For the price of the book at the extreme right a customer can buy the middle book and an adjacent one. Is the adjacent book to the right or left of the middle book? *(AHSME 1961)*

---

**447.** Consider the sets of consecutive integers $\{1\}$, $\{2, 3\}$, $\{4, 5, 6\}$, $\{7, 8, 9, 10\}$, $\ldots$, where each set contains one more element than the preceding one, and where the first element of each set is one more than the last element of the preceding set. Let $S_{n}$ be the sum of the elements in the $n$th set. Find $S_{21}$. *(AHSME 1967)*

---

**448.** For every $n$ the sum of $n$ terms of an arithmetic progression is $2n + 3n^{2}$. What is the $r$th term of the sequence in terms of $r$? *(MAΘ 1987)*

---

**449.** Simplify $\dfrac{1 + 3 + 5 + \cdots + 199}{2 + 4 + 6 + \cdots + 200}$. *(MAΘ 1991)*

---

**450.** Write the following sum in summation notation:

$$32 - 16 + 8 - 4 + 2 - 1.$$

*(MAΘ 1991)*

---

**451.** Find the sum of the odd integers between $10$ and $50$. *(MAΘ 1990)*

---

**452.** Find $x$ so that the sequence $4x - 1$, $2x + 2$, and $2x - 3$ is an arithmetic progression. *(MAΘ 1990)*

---

**453.** $852$ digits are used to number the pages of a book consecutively from page $1$. How many pages are there in the book? *(MAΘ 1990)*

---

**454.** Three numbers $a$, $b$, and $c$, none zero, form an arithmetic progression. Increasing $a$ by $1$ or increasing $c$ by $2$ results in a geometric progression. Find $b$. *(AHSME 1963)*

---

**455.** Prove that any two consecutive Fibonacci numbers $F_{k}$ and $F_{k+1}$ are relatively prime.

---

**456.** Ashley, Bob, Carol, and Doug are rescued from a desert island by a pirate who forces them to play a game. Each of the four, in alphabetical order by first names, is forced to roll two dice. If the total on the two dice is either $8$ or $9$, the person rolling the dice is forced to walk the plank. The players go in order until one player loses: A, B, C, D, A, B, $\ldots$. What is the probability that Doug survives? *(MAΘ 1990)*

---

## 📚 The BIG PICTURE

> By learning mathematics in the modern era, you are getting instant access to concepts which took an immense amount of time to develop. We think of them as "intuitively obvious," but that description is far from the truth; only by slow development were the ideas first understood, and they once seemed revolutionary.
>
> One such idea is that of an **infinite series**. The Greeks, despite their remarkable geometrical insights, had no notion that an infinite number of terms could have a finite sum. You may have heard of **Zeno's paradoxes**; the simplest one goes something like this:
>
> > *Motion cannot exist. To move a certain distance, you must first move half the distance, then half of the remaining distance, then half the remaining distance, and so on. Thus you cannot move, and all motion is an illusion.*
>
> Think about this one a second, and explain it.
>
> Believe it or not, the Greeks were stumped! The idea of an infinite sum just hadn't occurred to anyone yet. The resolution is to say that the distance travelled is given by the infinite sum $\tfrac{d}{2} + \tfrac{d}{4} + \tfrac{d}{8} + \cdots = d$ units, where $d$ is the distance we wish to travel. We can accomplish this distance, moreover, in $\tfrac{d}{2r} + \tfrac{d}{4r} + \tfrac{d}{8r} + \cdots = d/r$ seconds, where $r$ is the rate of travel. Thus, though the motion seems to entail an infinite set of activities, they can all be performed in a finite time. Speed, motion, and reality are saved by something which seems very straightforward to us who have inherited the idea of infinity.
>
> Other of Zeno's "paradoxes" were much subtler:
>
> > *If an arrow in flight is observed at any given moment, it is merely standing still. But if it is always standing still, how can it fly?*
>
> Don't decide the question is trivial until you've thought about it.

---

*End of Chapter 24.*
