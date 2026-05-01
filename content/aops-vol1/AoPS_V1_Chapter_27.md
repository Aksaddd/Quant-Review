---
title: "Chapter 27 — Sets"
source: "The Art of Problem Solving, Volume 1"
chapter: 27
problem_range: [500, 507]
sections:
  - "27.1 Some Definitions"
  - "27.2 Operating on Sets"
  - "27.3 Venn Diagrams"
  - "27.4 Subsets"
includes_big_picture: true
big_picture_topic: "Russell's paradox and the tier system in set theory"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • `e` (element-of) in OCR                    → ∈
    • `i` (not-element-of, ∉, with crossed e)    → ∉
    • `c` (subset)                               → ⊂
    • `2#A`                                      → 2^{|A|} or 2^{#A}
    • `0` for empty set                          → ∅
    • Number sets R, C, Z, Q                     → \mathbb{R}, \mathbb{C}, \mathbb{Z}, \mathbb{Q}
    • Source for Problem 500: "{1, 2} ∈ X ∈ {1,…}"
      The AHSME 1972 original uses ⊆ in both places (count = 8); the
      OCR rendered both as ∈, but ∈ doesn't make sense (sets aren't
      typically elements of {1,2,3,4,5}). Corrected to ⊆ with note.
  Eight figures total in this chapter — the most figure-dense so far,
  all Venn diagrams.
---

# Chapter 27 — Sets

## 27.1 Some Definitions

A **set** is a collection of objects. For example, the set of all past Presidents of the United States, the set of all real numbers, and the set of all copies of this textbook are all valid sets. A set is usually denoted by placing the objects in the set inside a pair of curly braces; thus the set of even positive integers less than $10$ is given by

$$\{2, 4, 6, 8\}.$$

Some sets are too long to specify in this way: for example, the set of Presidents, $\{\text{Washington, Adams, Jefferson, Monroe, Madison}, \ldots\}$. In such a case, we can write the set like this:

$$\{x \mid x \text{ is a former President}\}.$$

Here $x$ is a **dummy variable**, which simply takes on all values specified by the condition after the vertical bar. Another example could be the set of all points in the Cartesian plane:

$$\{(x, y) \mid x \text{ and } y \text{ are real numbers}\}.$$

Here there are two dummy variables, $x$ and $y$; the values that each can take must be specified.

Sets can have names, to make writing them simpler. For example, we could define $P$ to be the set of former Presidents; when we wish to refer to the set, we can just write $P$ rather than $\{x \mid x \text{ is a former President}\}$.

Each of the major types of numbers (see Chapter 8) has a special letter-like symbol which always refers to that set. The set of real numbers is denoted by $\mathbb{R}$, using a stylized R for "reals." Similarly, the set of complex numbers is written $\mathbb{C}$. Unfortunately, the symbol for the integers, $\mathbb{Z}$, was invented in Germany, so is based on a Z rather than an I. The rationals are denoted by $\mathbb{Q}$, where the Q stands for "quotients." Remember these; their use will become more and more common as you get into more advanced problems. Instead of saying "Find all real numbers $x \ldots$", a problem might say "Find all $x \in \mathbb{R}$." Be ready.

An object in a set is called an **element** of the set. Thus Grover Cleveland is an element of $\{x \mid x \text{ is a former President}\}$, and $\pi$ is an element of $\{x \mid x \text{ is a real number}\}$. We sometimes use the symbol $\in$ to denote being an element, so that we could rewrite one statement above as "Grover Cleveland $\in P$." A cross through the $\in$ just means *not*, so that Aaron Burr $\notin P$. Since a set is just a collection, it doesn't make any sense for one element to be in twice; each element in a set can occur only once. Similarly, the order in which we list the elements does not matter; $\{2, 6, 8, 4\}$ is the same set as $\{2, 4, 6, 8\}$.

The number of elements in a set is called the **size** of the set, and is denoted by the symbol $\#$. Thus $\#\{2, 4, 6, 8\} = 4$, and $\#\{x \mid x \text{ is a former President}\} = 41$ at this writing. The size of a set is more formally called its **cardinality**.

> **Exercise 27-1.** Write the set $\{2, 4, 6, 8\}$ using $\{x \mid \ldots\}$ notation and the set $\{F \mid F \text{ is an ex-Beatle}\}$ using $\{x, y, z\}$ notation.

---

## 27.2 Operating on Sets

Given two sets, in what ways can we form new sets from them? Let's consider the sets $A = \{2, 4, 6, 8\}$ and $B = \{2, 4, 5, 7\}$. One obvious way to get a new set which is related to $A$ and $B$ is to simply combine them, taking all the elements of each. The new set, which we'll call $C$, is $\{2, 4, 5, 6, 7, 8\}$. (Note that we don't write $2$ and $4$ twice, since duplications are not allowed. Also, note that we could have written the elements in any order we pleased; the way we actually did write them just looks nice.) We call the set $C$ obtained in this way the **union** of $A$ and $B$, and denote it by $A \cup B$.

> **Exercise 27-2.** Given the set $A$ above, what is $A \cup A$? Can you generalize to any set $A$?

> **Exercise 27-3.** If $\#A = 8$, $\#B = 9$, and sets $A$ and $B$ have no elements in common, find $\#(A \cup B)$. (Try it on two fixed sets $A$ and $B$ if you need to.)

> **Exercise 27-4.** Do the previous exercise over, this time assuming that $A$ and $B$ have $6$ elements in common.

> **Exercise 27-5.** Find the general formula: if set $A$ contains $a$ elements, set $B$ contains $b$ elements, and sets $A$ and $B$ have $x$ elements in common, how many elements are there in $A \cup B$?

Another new set can be formed from $A$ and $B$ by taking only those elements common to *both*. Using the same $A$ and $B$ as above, the only elements in common are $2$ and $4$, so this new set, called the **intersection** of $A$ and $B$, is just $\{2, 4\}$. The intersection of $A$ and $B$ is denoted by $A \cap B$.

> **Example 27-1.** Consider the sets $E = \{2, 4, 6, \ldots\}$ and $O = \{1, 3, 5, \ldots\}$. Then $E \cup O = \{1, 2, 3, \ldots\}$, which is the same as $\{x \mid x \text{ is a positive integer}\}$. On the other hand, $E \cap O$ is a set with no elements at all, because $E$ and $O$ have no elements in common! The set with no entries is called the **null set**, and is denoted by $\{\,\}$, or more often by the special symbol $\emptyset$.

A final set operation acts on one set only. Given the set of all Presidents, consider the smaller set of Presidents whose names began with M. The **complement** of this smaller set is everything in the larger set, the set of Presidents, but not in the smaller set: in this case, all Presidents whose names did *not* begin with M.

You may ask, "why do we claim this operation acts on one set only, when we needed two sets to define it?" The answer is that the larger set is usually taken for granted, as being obvious from context. Thus the complement of the set of odd integers is the set of even integers; we don't need to specify that the set of all integers is the larger set we're using. The complement of a set $A$ is designated by $\overline{A}$.

---

## 27.3 Venn Diagrams

A useful way to think about sets is through **Venn diagrams**. The basic idea is to represent a set by a circle, as in the diagram below, where a set $A$ is shown; the complement of the set is just as easily represented. For the complement, we don't need to color in the whole rest of our sheet of paper; the rectangle in which the circle is drawn represents "everything."

<!-- FIGURE_TODO chapter=27 section=27.3 panel=1 -->
*Figure: two side-by-side panels. (1) A rectangle (the universe) with a filled circle labeled $A$ inside it. (2) The same rectangle with the circle empty and everything outside the circle (still inside the rectangle) shaded — representing $\overline{A}$.*

Using this representation, the intersection of two sets and their union can be easily depicted as well. Examine these diagrams, which show $A \cup B$ and $A \cap B$ for two sets $A$ and $B$.

<!-- FIGURE_TODO chapter=27 section=27.3 panel=2 -->
*Figure: two side-by-side panels of two overlapping circles labeled $A$ and $B$. (1) Both circles entirely shaded — representing $A \cup B$. (2) Only the lens-shaped overlap shaded — representing $A \cap B$.*

The method is especially important when we are considering three sets at the same time, because then the intersections and unions become too much to keep up with. In the Venn diagram, everything is clear. We have one circle for $A$, one for $B$, and one for $C$. Make sure you see the regions in the diagram that correspond to the intersections and unions of these three sets.

<!-- FIGURE_TODO chapter=27 section=27.3 panel=3 -->
*Figure: three mutually overlapping circles labeled $A$ (lower-left), $B$ (top), and $C$ (lower-right), creating $7$ disjoint regions inside the rectangular universe.*

> **Example 27-2.** Draw a Venn diagram representing the set $\overline{A} \cap B$.
>
> ***Solution.*** The answer is as simple as the diagram at right, where we have filled in $\overline{A}$ with vertical lines and $B$ with horizontal. The desired set is the region covered by both horizontal and vertical lines.
>
> <!-- FIGURE_TODO chapter=27 example=27-2 -->
> *Figure: rectangle containing two overlapping circles $A$ and $B$. Region outside $A$ filled with vertical hatching ($\overline{A}$); circle $B$ filled with horizontal hatching. The cross-hatched region — inside $B$ but outside $A$ — is $\overline{A} \cap B$.*

> **Example 27-3.** One common type of problem which you can solve using Venn diagrams is below.
>
> *At one hospital, there are $100$ patients, all of whom have at least one of the following ailments: a cold, the flu, or an earache. $38$ have a cold, $40$ have the flu, and some number have earaches. If $17$ have both colds and the flu, $10$ have colds and earaches, $23$ have the flu and earaches, and $7$ have all three, how many have an earache?*
>
> Note that to say someone has an earache and a cold is *not* to say that she doesn't have the flu as well; some people may be counted more than once in the breakdown above.
>
> This seemingly complicated problem is simple when you consider a Venn diagram.
>
> <!-- FIGURE_TODO chapter=27 example=27-3 -->
> *Figure: three-circle Venn diagram with circles labeled "Ear" (top), "Cold" (lower-left), "Flu" (lower-right). Regions filled in: center (all three) = $7$; Ear∩Flu only = $16$; Ear∩Cold only = $3$; Cold∩Flu only = $10$; Cold only = $18$; Flu only = $7$; Ear only = $39$.*
>
> We work from the inside out. First, $7$ have all three ailments; we place a $7$ in the central space. Then, since $23$ have both flu and an earache, with $7$ already accounted for by having all three, there are $16$ left to go in the space for flu and earache but not cold. We fill in the remaining two-ailment spaces similarly. Then we tackle the one-ailment spaces. We already have $33$ flu victims, by counting all the people in the flu circle; thus there are $40 - 33 = 7$ people who have the flu only. We enter an $18$ in the cold-only circle in the same way. Every patient must have one of the three diseases, so the number with earache only will be $100$ minus all the numbers in the spaces, which comes out to $39$. When everyone is accounted for, we can answer the original question: how many have earaches? We add up all the numbers in the earache circle, to get $39 + 3 + 7 + 16 = \mathbf{65}$.

In some problems of this type, you will also have to consider some number of people who are *not* in any of the sets; this corresponds to a number written outside of the three circles but inside the rectangle.

Note that this problem could be done just as well with pure equations, not using Venn diagrams at all. In fact, where there are four or more sets, Venn diagrams often are more trouble than they're worth. But for two or three sets, they provide a nice graphical approach to the solution.

---

## 27.4 Subsets

Any set which is wholly contained in another set is called a **subset** of that set. For example, the set of poodles is a subset of the set of all dogs, and the positive integers form a subset of the complex numbers. Similarly, $\{A, B\}$ and $\{A, C\}$ and $\{B\}$ are subsets of $\{A, B, C\}$. Being a subset is denoted by $\subset$. Thus we could write $\{x \mid x \text{ is a poodle}\} \subset \{y \mid y \text{ is a dog}\}$. Since the null set $\emptyset$ has no elements, it is automatically contained in any set: $\emptyset \subset A$ for any set $A$ whatsoever. Similarly, a set is always a subset of itself.

> **Exercise 27-6.** Write down all the subsets of $\{\text{Barbie}\}$. How many are there?

> **Exercise 27-7.** Write down all the subsets of $\{\text{Barbie, Ken}\}$. How many are there?

> **Exercise 27-8.** Write down all the subsets of $\{\text{Barbie, Ken, Starshine}\}$. How many are there?

> **Exercise 27-9.** How many subsets does the null set have?

> **Example 27-4.** Do you see a pattern in the previous exercises? In fact, it is generally true that the number of subsets of a set with $n$ elements is $2^{n}$. Why? Let's treat this as a counting problem: in how many ways can a subset be formed of a set with $n$ elements? Consider the first element. It has $2$ possibilities: it can be in the subset or not. Consider the second element. It, too, has $2$ possibilities: in or out. And so it goes; each element of the $n$ contributes a factor of $2$, so there are $n$ factors of $2$, for a total product of $2^{n}$. This is an important result.

One incredible thing that can be done with the result that the number of subsets of $A$ is $2^{\#A}$ is proving a beautiful combinatorial identity. We do it by counting the subsets in a different way. If you have read Chapter 25, you should know that the number of subsets of a set of size $n$ which have $3$ elements is $\binom{n}{3}$, since this is the number of ways to choose $3$ elements from a set of $n$. Similarly, the number with $4$ elements is $\binom{n}{4}$, the number with $0$ elements is $\binom{n}{0}$, and so on. Thus the total number with any size, from $0$ to $n$, is

$$\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n}.$$

But by Example 27-4, the total number is $2^{n}$! Thus we have immediately proven that for any $n$,

$$\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n} = 2^{n}. \quad (27.1)$$

> **Exercise 27-10.** Express the identity (27.1) in $\sum$ form.

> **Exercise 27-11.** Convince yourself that (27.1) is valid by trying $n = 1$, $n = 3$, and $n = 5$.

> **Exercise 27-12.** Go back through the argument with which we proved (27.1) one more time — it's worth understanding thoroughly.

---

## Problems to Solve for Chapter 27

**500.** Find the number of solutions to $\{1, 2\} \subseteq X \subseteq \{1, 2, 3, 4, 5\}$, where $X$ is a set. *(AHSME 1972)*

<!-- OCR-NOTE: source prints "{1,2} ∈ X ∈ {1,2,3,4,5}". The element-of relation does not type-check here ({1,2,3,4,5} contains numbers, not sets), so this is an OCR error. The AHSME 1972 original uses ⊆ in both positions; corrected. -->

---

**501.** Using set notation, how can we describe this Venn diagram? *(MAΘ 1992)*

<!-- FIGURE_TODO chapter=27 problem=501 -->
*Figure: three-circle Venn diagram with circles labeled $A$ (lower-left), $B$ (upper-right), $C$ (lower-right). Specific region(s) shaded — confirm shading from source figure to identify the set expression (likely $B \cap C$, $A \cap B \cap C$, or $(B \cap C) \setminus A$).*

---

**502.** Set $A$ contains $15$ elements, set $B$ contains $12$ elements and the intersection of $A$ and $B$ contains $8$ elements. How many elements belong to the union of $A$ and $B$? *(MATHCOUNTS 1986)*

---

**503.** How many $3$-element subsets can be formed from a set of $5$ elements? *(MATHCOUNTS 1989)*

---

**504.** $A$ is a set with $N$ elements. For what value of $N$ are there $11$ times as many different subsets of $A$ of size six as there are subsets of $A$ of size three? *(MATHCOUNTS 1988)*

---

**505.** In one Berwyn high school, there are $75$ students. If $30$ students are studying Czech, $20$ are studying Polish, $15$ are studying German, $11$ are studying Czech and Polish, $9$ are studying Czech and German, $34$ are not studying any language, and $4$ are studying all three languages, then how many students are studying Polish and German?

---

**506.** How many $k$-element subsets of an $n$-element set are there which contain some particular element? How many subsets are there which do not contain the element? How many subsets are there in total? Prove the combinatorial identity

$$\binom{n - 1}{k - 1} + \binom{n - 1}{k} = \binom{n}{k}.$$

---

**507.** How many subsets of

$$\{n \mid n \text{ is a multiple of } 3 \text{ less than } 100\}$$

are also subsets of

$$\{n \mid n \text{ is a multiple of } 4 \text{ less than } 100\}?$$

---

## 📚 The BIG PICTURE

> In the early 1900's, a paradox arose in set theory which some felt threatened the entire idea of sets. Sometimes called **Russell's paradox**, the paradox starts with the fact that since a set is a collection of any type of objects whatsoever, some sets may contain themselves as elements. For example, a set $A$ could be made which contained the numbers $1$ and $2$, and the set $A$: $A = \{1, 2, A\}$. $A$ is a perfectly valid set for most purposes, though it does lead to weird things, as in
>
> $$A = \{1, 2, A\} = \{1, 2, \{1, 2, A\}\} = \{1, 2, \{1, 2, \{1, 2, A\}\}\} = \cdots.$$
>
> You might be tempted to disallow such a strange beast, but it turns out that sets which include other sets are essential to a useful and rigorous development of set theory.
>
> So where is the paradox? Suppose we let $M$ be *a set which consists of every set that does not contain itself*. Thus $A \notin M$ (because $A$ contains itself), but $\{1, 2\} \in M$. The question is, is $M$ in $M$? If $M$ *is* in $M$, then we have a contradiction because $M$ contains itself, and therefore is not in $M$. Things don't get any better when we try letting $M$ not be in $M$, because then $M$ does not contain itself, so by rights should be in $M$. Thus $M$ is not in $M$, but $M$ is also not not in $M$. (Give yourself a minute to sort all this out.)
>
> Was the paradox ever resolved? Well$\ldots$ sort of. A tier system was proposed in which the first tier consists of sets which only contain objects (no sets); the second tier allows sets which contain tier 1 sets but no tier 2 sets; tier 3 sets can contain tier 1 and tier 2 sets, and so on. By placing $M$ on some tier, and thus restricting the possible sets it can contain, we eliminate the paradox, though in a way which is not entirely satisfactory.

---

*End of Chapter 27.*
