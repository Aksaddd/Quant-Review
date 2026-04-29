---
title: "Chapter 28 — Prove It"
source: "The Art of Problem Solving, Volume 1"
chapter: 28
problem_range: [508, 525]
sections:
  - "28.1 Words, Words, Words"
  - "28.2 Contradiction"
  - "28.3 Converses Aren't Necessarily True"
  - "28.4 Mathematical Induction"
  - "28.5 Shooting Holes in Pigeons"
  - "28.6 Convincing But Wrong"
includes_big_picture: true
big_picture_topic: "Multiple proofs as aesthetic objects (Gauss, Pythagoras, BEHOLD!)"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • Exponents `n5`, `n4`, `n3`, `n2`           → n^5, n^4, n^3, n^2
    • `7"+1`, `7M`                                → 7^{n+1}, 7^{k+1}
    • `\x/3\` (floor brackets in OCR)             → \lfloor x/3 \rfloor
    • `(2n + 1)`, `(2m + 1)` (odd integer reps)   → preserved
    • Exercise 28-4 contains the famous "all
      heights equal" inductive fallacy — base
      case fails for n=2 (the two singletons
      after removing one person needn't share
      anyone). Preserved as exercise without
      spoiling the answer.
    • Source typo: "{1, 2, 4)" ends with `)` not  → corrected to `}`
      `}` — corrected.
  No standalone figures in this chapter; the BIG PICTURE refers to a
  Pythagorean Theorem proof figure on page 112 (out of scope here).
---

# Chapter 28 — Prove It

To many students, mathematics is no more than finding numerical answers to problems. However, there is much more. Being able to *prove* your assertions is at least as important as finding the answer. Unfortunately, most schools neglect proofs or confine them to geometry classes, when proofs are important to all fields of mathematics. Moreover, proofs are usually presented in a dry, methodical way to emphasize rigor, when real mathematical proofs are written with more words than equations.

---

## 28.1 Words, Words, Words

Proof problems and solutions have a special and subtle vocabulary of their own. Many of these terms confuse beginning students, so we'll go over them.

**▸ When a problem asks us to solve something about *distinct* objects or numbers, it means that the objects or numbers in question are *all different*.** For example, if we are asked to solve a question involving $3$ distinct integers, the numbers cannot be $2$, $3$, and $2$.

**▸ When we say *without loss of generality*, we mean that we have chosen a specific case to solve, but the specific case really doesn't matter.** By solving the assertion for that specific case, we prove it for all cases, as all cases are *qualitatively* the same; only the ordering of names or correlations is different.

> **Example 28-1.** Show that if $x + y + z = 7$ and $x$, $y$, and $z$ are distinct positive integers, then one of these numbers must be $4$.
>
> ***Proof.*** Assume without loss of generality that $x < y < z$. We can do this since we know the numbers are distinct and it doesn't really matter which is which. (While $(1, 2, 4)$ and $(2, 1, 4)$ are considered different solutions, they still consist of the same three numbers.) If $x \geq 2$, the sum $x + y + z$ is at least $2 + 3 + 4 = 9$, which is too big. Thus $x = 1$. Similarly, if $y \geq 3$, the sum is at least $1 + 3 + 4 = 8$; thus, $y = 2$ and $z = 4$. Hence, one of the numbers (the largest) must always be $4$. By using "without loss of generality" as we have, we have just named the largest integer $z$, the smallest $x$, and the other $y$. We can permute these labels in any way and the problem will be unchanged. Thus, all solutions can be found by permuting $(1, 2, 4)$.

> **Example 28-2.** Why can't we use "without loss of generality" as above on a problem involving $x + 2y + 3z = 1$?
>
> ***Solution.*** The quantities in this problem are not interchangeable. Switching $x$ and $z$ yields $z + 2y + 3x = 1$, which is *qualitatively* different from the original $x + 2y + 3z = 1$. (For example, $(x, y, z) = (1, 0, 0)$ is a solution of one equation but not the other.) In the previous problem, switching $x$ and $z$ yields $z + y + x = 7$, which is *not* qualitatively different from $x + y + z = 7$. This is the heart of "without loss of generality": changing the labels does not change the problem.

**▸ In problems in which we are asked to *maximize* a quantity, we are actually asked to do two things.** We must show that the maximum can be attained *and* that no value greater than that maximum can be attained. Just doing one of these is insufficient. The same, of course, holds for *minimization*.

> **Example 28-3.** Find the maximum value of $x + y$ if $x \leq 3$ and $y \leq 5$.
>
> ***Solution.*** Clearly $x + y$ is always less than $9$, since $x + y \leq 3 + 5$. However, $9$ is *not* the maximum, since it is never attained! The true maximum is $\mathbf{8}$, since that is the largest value which can be attained.
>
> <!-- OCR-NOTE: as written, x+y ≤ 3+5 = 8, so 8 IS attained (at x=3, y=5) and is in fact the maximum. The textbook's claim that "x+y is always less than 9" is true but doesn't establish 8 as the max either; the example is somewhat unclear as printed, but the conclusion stands. -->

**▸ A solution to a problem is called *trivial* if the numbers present in the problem have no use in determining that solution.** Trivial solutions are those solutions which are blatantly obvious and have little mathematical value, so problems often ask the solver to find *nontrivial* solutions. For example, when solving the equation $x^{2} + y^{2} = z^{2}$, $(0, 0, 0)$ is a trivial solution. Generally, any solution in which all the variables equal $0$ is a trivial solution. If on a test you are unsure whether a solution you have found is trivial or not, assume it is not trivial; if you had to think at all to find the solution, it probably isn't. As another example, when asked for the *nontrivial* factors of an integer, we want those factors besides $1$ and the number itself.

**▸ Sometimes proofs are so long that we want to break up the proof into smaller parts.** After we prove each of these smaller parts, we combine them to complete the proof. In the text of a proof, these smaller parts are called **lemmas**. There aren't any proofs in this volume complicated enough to require lemmas, but there are some in the second volume. A proof is **rigorous** when the proof is complete with no unproven assumptions.

**▸ A number is even *if and only if* it is divisible by two.** Why do we say "if and only if" rather than just "if" or just "only if?" What is the difference? When we say a number is even *if* it is divisible by two, we do not exclude the possibility that a number which is not a multiple of two is even. By just saying a number is even *only if* it is divisible by two, we don't say that all multiples of two are even. Only by combining the two in "if and only if" can we say both that a number must be a multiple of two to be even *and* that all multiples of two are even. Mathematicians often write "**iff**" rather than "if and only if," so don't assume it's a typographical error.

> **Exercise 28-1.** Do you need "if," "only if," or "iff" in the following?
>
>   i. A number ends with a $5$ $\ldots$ it is divisible by five.
>   ii. An animal is a mammal $\ldots$ it is a human.
>   iii. A figure is a circle $\ldots$ every point on it is a common distance from some center.
>   iv. A number is an integer $\ldots$ it has no fractional part.

Proving facts involving *if and only if* usually requires two steps; the "if" and "only if" parts are generally proved separately. The examples at the end of this section will demonstrate this.

**▸ That a number is a multiple of two is *necessary and sufficient* for the number to be even.** "Necessary and sufficient" is just another way of saying "if and only if." By "necessary," we mean that it is necessary for a number to be a multiple of two in order to be even. As with "only if," this does not imply that all multiples of two are even. By "sufficient," we say that any multiple of two is even, but like "if," this does not exclude numbers which are not multiples of two from being even. Only by putting together both of these can we say all multiples of two and only multiples of two are even. Once again, proofs of facts involving necessary and sufficient usually involve proving the two separately.

> **Example 28-4.** Prove that the product of two integers is odd if and only if both of the integers are odd.
>
> ***Proof.*** To show the "if" part, we write our odd integers as $2n + 1$ and $2m + 1$. The product of these is $(2n + 1)(2m + 1) = 4mn + 2m + 2n + 1$, which is odd because it isn't evenly divisible by two.
>
> To show the "only if," we must show that the product of two even numbers and the product of an even number and an odd number are both even. First, letting the two even numbers be $2n$ and $2m$, the product is $4mn$, which is divisible by $2$. Second, letting the even number be $2n$ and the odd $2m + 1$, the product is $(2n)(2m + 1) = 4mn + 2n$, which is divisible by $2$ and hence even. Thus the product of two integers is odd iff both the integers are odd.

> **Example 28-5.** Show that $x$ being a multiple of $3$ is a necessary and sufficient condition for $x$ to be a solution of $\lfloor x/3 \rfloor - x/3 = 0$.
>
> ***Proof.*** Write the equation as $x/3 = \lfloor x/3 \rfloor$. Since $\lfloor x/3 \rfloor$ is always an integer, $x/3$ must be an integer. Hence, it is necessary for $x$ to be a multiple of $3$. To show that it is sufficient that $x$ be a multiple of $3$, let $x = 3n$ for some integer $n$. Then $\lfloor x/3 \rfloor - x/3 = \lfloor n \rfloor - n = 0$, so all multiples of $3$ are solutions to the equation $\lfloor x/3 \rfloor - x/3 = 0$.

---

## 28.2 Contradiction

> *Is too! Is not! Is too! Is not!*

This is an age old argument of children everywhere. Suppose you are arguing that something "Is too!" The most obvious way to show that it is such is to show that it is indeed true; however, there is another way. Instead of showing that you are right, show that your adversary is wrong. If our opponent is wrong, then you must be right. This is the heart of **contradiction**.

A simple example of the use of contradiction is the proof on page 48 that there are infinitely many prime numbers. Rather than try to prove that there are infinitely many primes directly, we prove that the opposite is impossible — i.e., it is impossible that there is a *finite* number of primes.

> **Exercise 28-2.** Take the time to go to page 48 and review the proof that there are infinitely many primes.

> **Example 28-6.** Prove that if $x$ is a real solution to $x^{5} + 3x^{2} + 7x + 2 = 0$, then $x$ must be negative.
>
> ***Proof.*** First, $x = 0$ is clearly not a solution. Second, if $x > 0$, then $x^{5} + 3x^{2} + 7x + 2$ is the sum of four positive terms and hence cannot be equal to zero. Thus no positive $x$ can be a solution to the equation. Hence, we have shown by contradiction that if $x$ is a solution to the given equation, it cannot be nonnegative, so any real solution $x$ must be negative.

> **Exercise 28-3.** Prove that if $a, b, c > 0$, then if $ax^{2} + bx + c = 0$ has real solutions, both solutions are negative.

---

## 28.3 Converses Aren't Necessarily True

> *All dogs have noses; therefore, anything with a nose is a dog.*

Clearly this argument is ridiculous; however, people will often give arguments like this to prove mathematical facts.

Given a statement like "If an animal is a dog, then it has a nose," the **converse** of the statement is "If an animal has a nose, then it is a dog." Notice that we have just swapped the positions of "dog" and "nose;" that is what the converse is. The **inverse** is "If an animal is not a dog, then it does not have a nose"; we have just negated "nose" and "dog." The **contrapositive** is "If an animal does not have a nose, the animal is not a dog." Here we have both swapped "dog" and "nose" and negated them.

From our examples, it is clear that if a statement is true, its converse and inverse are *not* necessarily true. Indeed, the converse and inverse of our sample statement about dogs' noses are quite ridiculous. The contrapositive of a true statement, however, is *always* true. Do you see why?

While it is important to understand that the contrapositive of a statement is always true, it is equally important to see that the converse may or may not be true. Hence, when asked to prove a statement which is the converse of a true statement, the original statement is irrelevant. You must prove the converse separately.

> **Example 28-7.** What are the converse, inverse, and contrapositive of the statement, "If Jim is outside, it is raining?" Which of these must be true if the statement is true?
>
> ***Solution.*** The converse is "If it is raining, Jim is outside." The inverse is "If Jim is not outside, it is not raining." The contrapositive is "If it is not raining, Jim is not outside." The contrapositive is the only one which must be true if the statement is true.

---

## 28.4 Mathematical Induction

**Mathematical induction** is a powerful tool when we are asked to prove something is true for *integers*. It works like this. Suppose we are asked to prove that a given assertion is true for all positive integers. First, we show that it is true for $1$ (or some other **base case**, often $0$). Second, we show that if it is true for some integer $k$, then it must be true for the number $k + 1$. This is the **inductive step**. Having proved this we argue that, since it is true for $1$, it must be true for $1 + 1 = 2$. Since it is true for $2$, it is true for $2 + 1 = 3$, and so on. Thus the assertion is true for all positive integers.

For example, let's show that

$$1 + 2 + 3 + \cdots + n = \frac{n(n + 1)}{2}.$$

First, we show it is true when $n = 1$. This is obvious, as

$$1 = \frac{1(1 + 1)}{2}.$$

Now, we show that if it is true for $k$, it must also be true for $k + 1$. If the assertion is true for $k$, we have

$$1 + 2 + 3 + \cdots + k = \frac{k(k + 1)}{2}.$$

Now, we must evaluate the sum of the integers from $1$ to $k + 1$:

$$\begin{aligned}
1 + \cdots + k + (k + 1) = (1 + \cdots + k) + (k + 1)
&= \frac{k(k + 1)}{2} + (k + 1) \\
&= \frac{k}{2}(k + 1) + (k + 1) \\
&= \left(\frac{k}{2} + 1\right)(k + 1) \\
&= \frac{(k + 1 + 1)(k + 1)}{2}.
\end{aligned}$$

Thus, we have shown that if

$$1 + 2 + 3 + \cdots + n = \frac{n(n + 1)}{2}$$

is true for $n = k$, then it is true for $n = k + 1$. Since it is true for $n = 1$, it is therefore true for $2, 3, 4, \ldots$, that is, all positive integers.

Ordinarily when using induction, we don't have to explain "Since it is true for$\ldots$" We must merely prove the initial case, prove the inductive step, then assert that the induction is complete. The following example is a model of the use of induction as it should appear in texts, or on test papers.

> **Example 28-8.** Show that for all positive integers $n$,
>
> $$7 + 6 \cdot 7 + 6 \cdot 7^{2} + 6 \cdot 7^{3} + \cdots + 6 \cdot 7^{n} = 7^{n+1}.$$
>
> ***Proof.*** For $n = 1$, we have $7 + 6 \cdot 7 = 49 = 7^{1+1}$, so the assertion is true for $n = 1$. If the assertion is true for $n = k$, we have
>
> $$7 + 6 \cdot 7 + 6 \cdot 7^{2} + 6 \cdot 7^{3} + \cdots + 6 \cdot 7^{k} = 7^{k+1}.$$
>
> Thus,
>
> $$\begin{aligned}
> 7 + 6 \cdot 7 + \cdots + 6 \cdot 7^{k+1} = (7 + 6 \cdot 7 + \cdots + 6 \cdot 7^{k}) + 6 \cdot 7^{k+1}
> &= 7^{k+1} + 6 \cdot 7^{k+1} \\
> &= (1 + 6) 7^{k+1} \\
> &= 7^{k+1+1}.
> \end{aligned}$$
>
> This proves the inductive step and our induction is complete.

> **Exercise 28-4.** Consider the following "proof" that every person in the world is the same height. Step one: In a group of $1$, every person is the same height. Step 2: Given that in any group of $k$ people the people are all the same height, we show that any group of $k + 1$ people must consist of people who are all the same height. We do this as follows. Given a group of $k + 1$ people, we remove one. The other $k$ must be the same height, since they are a group of $k$ people. Now replace the removed person and take someone else out. This also leaves a group of $k$ people of the same height including the first removed person. This person is then the same height as the other $k$. Hence, any group of $k + 1$ people is a group of people who are all the same height. This completes the inductive step, so all people are the same height.
>
> Clearly something is wrong with this. What?

---

## 28.5 Shooting Holes in Pigeons

Consider a flock of $n + 1$ pigeons. Due to space constraints, the pigeons' home only has $n$ holes (bear with us). If the flock flies home for the summer, there must be at least one hole with $2$ or more pigeons in it. Do you see why?

This is the simplest statement of the **Pigeonhole Principle**. (It is also called **Dirichlet's Principle**, probably because he was the first to realize that such an obvious theorem could be useful.) In fact, the Principle is highly useful in math, especially in nonobvious settings.

> **Example 28-9.** Given $7$ points on a line segment of length $1$, prove that there must exist two of the points separated by no more than $1/6$.
>
> ***Proof.*** Divide the line segment into six equal length segments. By the Pigeonhole Principle, two of the points must lie on one of these segments (including endpoints). These two points will be at most $1/6$ apart, because they lie on a segment of length $1/6$.

The hardest part of applying the Principle, besides realizing that it might be useful to the problem at hand, is determining the pigeonholes. They will almost invariably be simple, like dividing an interval into equal pieces or a square into equal squares.

The version of the Principle we are using is a little too weak for general use. We can easily strengthen it by modification. Consider a flock of $2n + 1$ pigeons, with the same $n$ holes. Now there must be some hole with at least *three* pigeons. The general statement and the easy proof are as follows.

> **The Pigeonhole Principle.** Given $kn + 1$ objects which are in $n$ boxes, there must be some box with at least $k + 1$ objects.
>
> ***Proof.*** We use the principle of proof by contradiction. Suppose that the $n$ boxes each have $k$ or fewer objects. The total number of objects is then less than or equal to $nk$. But the total number is given to be $nk + 1$, so this gives $nk + 1 \leq nk$, a contradiction. So our original supposition that there was no box with $k + 1$ or more objects must be false.

The Pigeonhole Principle crops up in a surprising variety of disguises. With some experience, you should learn to identify them.

> **Exercise 28-5.** A group of $n$ people are selecting entrees at a restaurant. All the entrees are either pasta, seafood, beef, chicken, or vegetarian. Find the smallest possible $n$ such that we can be sure that at least $3$ people have dishes from the same category. Prove your answer.

---

## 28.6 Convincing But Wrong

When you compare a proof you have written for a problem to one offered as the "right" proof, you will often find that yours is different from the proposed solution. However, don't assume your proof is wrong. Unlike "find the answer" questions, proofs have many different right answers.

Unfortunately, they also have many wrong ones. And no matter how convincing it is, a wrong proof is still wrong. For this reason, if your proof differs from the "correct" solution, don't automatically assume your proof is just a different way to solve the problem. Challenge your solution; check each link in your chain of reasoning to make sure it is sound.

In this section we discuss convincing but wrong arguments. We'll begin by proving that $-1 = 1$, starting from $1 + 1 = 2$. Our steps are as follows: $1 + 1 = 2$, so $1 - 2 = -1$, so $(1 - 2)^{2} = (-1)^{2}$, so $(1 - 2)^{2} = 1$, so $\sqrt{(1 - 2)^{2}} = \sqrt{1}$, so $1 - 2 = 1$, so $-1 = 1$. Clearly our conclusion, $-1 = 1$, is wrong, but our premise, $1 + 1 = 2$, is correct. So one of our steps must be faulty. Analyzing our "proof" closely, we see that our erroneous step is going from $\sqrt{(1 - 2)^{2}} = \sqrt{1}$ to $1 - 2 = 1$. We have taken the negative square root on the left rather than the positive square root. The moral of the story? It is easy to hide a wrong step amidst a barrage of correct ones.

Convincing but wrong proofs often include showing patterns without proving them. Recognizing a pattern is essential to problem solving, but noting that a pattern exists does not constitute a proof.

For example, suppose we are asked to find a closed form for

$$2^{0} + 2^{1} + 2^{2} + \cdots + 2^{n}.$$

(A **closed form** for a sum is one which can be immediately evaluated by plugging in the variable; there can be no summations left.) If we evaluate the sum for $n = 1, 2,$ and $3$, we find that the answers are $2^{2} - 1$, $2^{3} - 1$, and $2^{4} - 1$, respectively. From these results, we might try to deduce that a general closed form for the sum is $2^{n+1} - 1$. But this is no proof. Seeing a pattern of this type is important in *finding* a general rule, but not in *proving* it.

A common mistake in wrong proofs is **circular reasoning**. Circular reasoning occurs when we use a statement to prove itself. This may sound easy to avoid, but as the following examples show, a circular assumption can be buried very deeply; in working a complex problem it is easy to forget which statements you know and which you are trying to prove.

> **Example 28-10.** What's wrong with the following "proof"?
>
> *Suppose $5$ women and $5$ men are seated at a round table such that each person sits between $2$ people of the opposite sex. We shall prove that if we number the chairs from $1$ to $10$ in order, a woman must be seated in chair $1$.*
>
> *If a woman is in chair $1$, a man must be in chair $2$, so a woman must be in chair $3$, and so forth, until we conclude that a man is in chair $10$. Since chair $10$ is next to chair $1$, a woman must be in chair $1$.*
>
> ***Solution.*** We wish to show that a woman is in chair $1$, but our first step in the erroneous proof *assumes* that a woman is in chair $1$. We are guilty of circular reasoning — we must not in any step assume what we are trying to prove is true.

> **Example 28-11.** What's wrong with this proof that if $|x| + x > 0$, then $x > 0$?
>
> *Since $|x| = x$, then $|x| + x = 2x$. Thus $2x > 0$, so $x > 0$.*
>
> ***Solution.*** This example shows that circular reasoning can be used to prove a true statement incorrectly. Our first step in the "proof" is $|x| = x$; but this is only true if $x \geq 0$! Thus in writing $|x| = x$, we assume that $x \geq 0$, which is what we are trying to prove. Again we are guilty of circular reasoning. (Among the problems at the end of this chapter, the reader is challenged to find a sound proof for the assertion of this problem.)

> **Exercise 28-6.** Find what's wrong with the following proof and provide a sound alternative.
>
> *There are $21$ students in a ten minute class. Each student sleeps for a total of $1$ minute during the class. Prove that there is some moment when at least three students are asleep.*
>
> ***Proof.*** *Two students sleep during the first minute, two during the second, and so on, for a total of $20$ students sleeping for a minute during the $10$ minute class. The remaining student must sleep during one of these minutes as well, so there must be $3$ students sleeping during the same minute.*

---

## Problems to Solve for Chapter 28

**508.** Prove that if $n$ is an integer satisfying $n^{4} + 4n^{3} + 3n^{2} + n + 4000 = 0$, then $n$ must be even.

---

**509.** In one of the examples in this chapter, we showed that if $x$ is a real solution to $x^{5} + 3x^{2} + 7x + 2 = 0$, then $x$ must be negative. Why can't we say that $x$ is a solution to this equation if and only if $x$ is negative?

---

**510.** Show that for all integers $n$ greater than $2$, $1 + 2 + 3 + \cdots + n$ is a composite number.

---

**511.** Given $11$ points, no four of which are coplanar, each triangle formed by three of the points is given a letter $A$, $B$, $C$, or $D$. At most how many triangles must get the same letter? *(Mandelbrot #1)*

---

**512.** Show that if $x/y$ and $y/x$ are both integers, then $|x| = |y|$.

---

**513.** Explain the proposed paradox in the following story. Three men rent a hotel room. They are charged $15$ dollars each. Later, the manager decides they should only have been charged $40$ dollars for the room, so he gives $5$ dollars to a messenger to give to the men. The messenger dishonestly keeps two dollars and gives each man $1$ dollar. Each man has paid $14$ dollars for the room and the messenger has $2$ dollars, for a total of $44$ dollars; however, the men originally paid $45$ dollars for the room. Where's the other dollar?

---

**514.** Prove that if $|x| + x > 0$, then $x$ must be positive.

---

**515.** Chairs are equally spaced around a table and numbered from $1$ to $2n$. Prove that if every odd chair is directly opposite another odd numbered chair, then the number of chairs is a multiple of $4$.

---

**516.** Prove that between any two consecutive multiples of $7$, exclusive, there are exactly two multiples of three.

---

**517.** Given three lines through the origin, prove that there must be a pair of them which form an angle of less than or equal to $60°$.

---

**518.** Show that

$$\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \cdots + \frac{1}{n \cdot (n + 1)} = \frac{n}{n + 1}.$$

---

**519.** Prove that a number has an odd number of distinct factors if and only if the number is a perfect square.

---

**520.** Three women are in a round-robin tennis tournament in which they each play each other player once. Prove that at least one player must lose one game and win one game.

---

**521.** Show that $(1 + 2 + 3 + \cdots + n)^{2} = 1^{3} + 2^{3} + 3^{3} + \cdots + n^{3}$.

---

**522.** A drawer contains $8$ grey socks, $5$ white socks, and $10$ black socks. If socks are randomly taken from the drawer without replacement, how many must be taken to be sure that $4$ socks of the same color have been taken? *(MATHCOUNTS 1988)*

---

**523.** A woman has written $k$ letters and addressed $k$ envelopes for them. She then randomly puts the letters in the envelopes. Show that the number of letters which are put in the proper envelope can be any number from $0$ to $k$ except $k - 1$.

---

**524.** Prove that $n^{5} - n$ is divisible by $10$ for all integers $n$.

---

**525.** Each of $6$ points in space is connected to the other $5$ points by line segments. Each segment thus formed is colored green or purple. Show that it is impossible to color all the segments without forming a triangle in which all three segments are the same color.

---

## 📚 The BIG PICTURE

> To mathematicians, a proof is more than just a confirmation of the truth of an already well-understood principle; it shows a true *understanding* of the principle, and conveys an aesthetic value.
>
> For this reason, people interested in math delight in coming up with proof after proof of a result. Each new proof shows a different facet of the theorem, a geometric or algebraic or topological or analytic or differential facet. For example, Karl Friedrich Gauss, one of the greatest mathematicians ever, had around six different proofs for the Fundamental Theorem of Algebra (see page 79) and multiple proofs of other important theorems. Throughout history, proofs of the Pythagorean Theorem, proofs that the area of a circle is indeed $\pi r^{2}$, and proofs of the Angle Bisector Theorem have all enriched their subjects.
>
> People have always sought to find the simplest, most elegant way to prove a theorem. The Mathematical Association of America's *Mathematics Magazine* even has a section devoted to this principle, in which a proof must consist only of a revealing diagram and a few equations. The most beautiful proof I know of the Pythagorean Theorem (shown on page 112), discovered by an ancient Hindu mathematician, consisted only of the diagram and one word: **BEHOLD!** Developing proofs of this type is an excellent exercise, but don't overdo it, or your proofs will soon be unreadable.

---

*End of Chapter 28.*
