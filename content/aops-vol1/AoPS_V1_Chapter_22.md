---
title: "Chapter 22 — Inequalities"
source: "The Art of Problem Solving, Volume 1"
chapter: 22
problem_range: [414, 428]
sections:
  - "22.1 What They Do"
  - "22.2 Linear Inequalities"
  - "22.3 Quadratic Inequalities"
  - "22.4 Absolute Value Inequalities"
  - "22.5 A Trivial Inequality"
includes_big_picture: true
big_picture_topic: "Bell's Inequality and quantum mechanics"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • `\>`, `>=` (in OCR garble)              → ≥
    • `<=`, `=<`                              → ≤
    • `*2 > y2`                               → x² > y²
    • `yfx`, `Vx`                             → √x
    • `MA©`                                   → MAΘ
    • `M ATHCO U N TS`                        → MATHCOUNTS
    • `AHSM E`                                → AHSME
  Number-line diagrams are extensive in this chapter; each is replaced
  with a `<!-- FIGURE_TODO -->` block plus a precise interval description
  so the downstream pass can re-render them mechanically.
---

# Chapter 22 — Inequalities

When we go from considering only expressions in which two sides are equal to those in which they are not necessarily equal, we enter a new and surprisingly different realm of mathematics. There are as many types of inequalities as there are of equations; the only thing they all have in common is the use of $>$, $<$, $\geq$, or $\leq$.

---

## 22.1 What They Do

There are two types of inequality signs: **strict** and **nonstrict**. Strict inequalities have either the $>$ or $<$ sign in them, and mean that the expression on the larger (open) side of the inequality sign is *definitely larger* than the expression on the smaller (pointy) side. For instance, $3 < 4$, $-1000 < -100$, or $1.01 > 1$.

A special notation is often used when several different variables satisfy the same inequality. Suppose $x$, $y$, and $z$ are all greater than $-17$, for example. Rather than write $x > -17$ and $y > -17$ and $z > -17$, we can just write $x, y, z > -17$. Be warned, however, that this does *not* specify any relationship between $x$, $y$, and $z$, only that each independently satisfies the constraint.

In nonstrict inequalities, the inequality sign has a little bar under it, as in $\leq$ and $\geq$. This bar means that the expressions on the two sides can also be equal. Just because an inequality is nonstrict does not mean the two quantities must necessarily be equal. For example, $1 \geq 0$ is a true statement, but $1$ does not equal $0$. The statement $x \leq y$ is usually pronounced "$x$ is less than or equal to $y$"; $x \geq y$ is just "$x$ is greater than $y$." To emphasize strictness, that the two sides absolutely *may not* be equal, you can also say $x < y$ as "$x$ is strictly less than $y$."

In some ways, inequalities work just like equations. For example, we can add or subtract the same thing on both sides, so that $x - 2 < y - 2$ and $x + 2 < y + 2$ both follow from $x < y$. We can also do manipulations like "$a \leq c$ and $b \leq d$, so $a + b \leq c + d$."

> **Exercise 22-1.** Convince yourself that these assertions are true by trying some examples.

In other ways, inequalities and equations work differently. Consider multiplication. Obviously $2 > 1$, but if we multiply both sides by $-1$, we get $-2 > -1$, which is false. If you multiply by a negative on both sides, you have to *reverse* the sign in the middle, so that $x \leq y$ implies $-x \geq -y$. The same is true with dividing by a negative number. As usual, multiplying both sides by $0$ is illegal, since it will always yield $0$ on both sides; dividing by $0$ is also forbidden, for obvious reasons.

Multiplication does work fine as long as we stay with positive quantities. For example, if $a \geq c$ and $b \geq d$, we can write $ab \geq cd$ so long as all the numbers are positive. In particular, $x > y$ implies $x^{2} > y^{2}$, $x^{3} > y^{3}$, and so on, if $x, y > 0$. Also, $x > y$ implies $\sqrt{x} > \sqrt{y}$.

> **Exercise 22-2.** For what restrictions on $x$ and $y$ is it true that $x > y$ implies $-x < y$?

> **Example 22-1.** One thing we have not considered, which we *can* do with an $=$, is take reciprocals of both sides. With inequalities, this gets tricky. If one side is negative and the other positive, they will maintain their signs after the reciprocal is taken, so the negative must still be less than the positive:
>
> $$-2 \leq 3 \quad : \quad -1/2 \leq 1/3.$$
>
> However, if both are positive, it's a different story. For example, we can start with $2 \leq 3$, divide by $2$ to get $1 \leq 3/2$, and divide by $3$ to get $1/3 \leq 1/2$. Thus, $2 \leq 3$ implies $1/2 \geq 1/3$; the inequality sign is *reversed* when we take the reciprocals.

> **Exercise 22-3.** Finish the previous example by figuring out what happens if both sides of the inequality are negative.

The rule built up in Example 22-1 and Exercise 22-3 is a good one to remember. The inequality sign must be reversed when reciprocals are taken if the two sides are both positive or both negative.

---

## 22.2 Linear Inequalities

The simplest types of inequalities are **linear inequalities**. In exact analogy to linear equations, they contain only first powers of the variables involved; for example, $x > 4y + 3$ is linear, while $x^{2} > 1/y$ is not.

The tools for dealing with linear inequalities are similar to those for dealing with linear equations. For example, we can graph them. Let's consider the one cited above, $x > 4y + 3$. Using the standard techniques we learned in Chapter 16, we graph the line which comes from the equality, $x = 4y + 3$.

<!-- FIGURE_TODO chapter=22 section=22.2 panel=1 -->
*Figure: the line $x = 4y + 3$ plotted on the $xy$-plane, drawn as a dashed line because it is not part of the strict-inequality solution.*

Now what is the relation of this line to the solutions of the inequality? The line itself contains points which are *not* solutions, since the inequality is strict and for points on this line, $x$ and $4y + 3$ are equal. However, the line still serves an important purpose.

Let's rewrite our original inequality as $x - 4y - 3 > 0$. Consider all possible things that $x - 4y - 3$ could equal. The points satisfying $x - 4y - 3 = k$, for any constant $k$, will always form a straight line which is parallel to the line we have already drawn. (Why parallel?) If we consider all the lines $x - 4y - 3 = k$, then all the ones where $k > 0$ should be on one side of the original line, and those with $k < 0$ on the other.

> **Exercise 22-4.** To verify this and see how it works, draw the lines $x - 4y - 3 = -4$, $x - 4y - 3 = -2$, $x - 4y - 3 = 0$, $x - 4y - 3 = 2$, and $x - 4y - 3 = 4$ on one graph.

So how does all this help with the original problem? It actually solves the problem completely! The solutions of the inequality $x - 4y - 3 > 0$ are all points $(x, y)$ such that $x - 4y - 3 = k$ where $k > 0$. Thus the solution of the inequality consists of all the lines on one side of our original line, where $k$ is $0$. The solution is an entire half-plane. The original line has to be drawn in dashes, since it is not part of the solution, even though it forms the boundary between the solution and the rest of the plane. If we went back to the start and changed the $>$ to a $\geq$, this line would be part of the solution, and we would draw it as a solid line.

<!-- FIGURE_TODO chapter=22 section=22.2 panel=2 -->
*Figure: same axes; the entire half-plane below/right of the dashed line $x = 4y + 3$ is shaded, representing $x > 4y + 3$.*

Notice that we can determine which side of the initial line to shade by selecting a point in the plane on one side of the line. For example, in the case of $x > 4y + 3$, we try $(0, 0)$ and find that the statement $0 > 4 \cdot 0 + 3$ is false. Therefore, we shade the side of the line which does not contain $(0, 0)$, since we know that $(0, 0)$ is not a solution.

> **Exercise 22-5.** Draw the solution of the inequality $x + y > 0$.

> **Exercise 22-6.** Draw the solution of the inequality $x - y < 0$ on the same graph as that of the previous exercise.

> **Exercise 22-7.** Draw the solution to the simultaneous inequalities
>
> $$\begin{aligned} x + y &> 0 \\ x - y &< 0. \end{aligned}$$

> **Exercise 22-8.** Show the various ways this simultaneous solution would change if either or both of the strict inequalities were made nonstrict.

> **Example 22-2.** The linear inequalities we have looked at so far have all been in two variables; however, there can also be linear inequalities in only one variable. These are fairly trivial: for example, $x < -3$. The plotting of such an inequality is done on a number line; the inequality $x < -3$ is shown below. Note that the open circle at $-3$ emphasizes that $-3$ is *not* included; if we used a $\leq$ instead, this would be a filled circle, to show that it is included.
>
> <!-- FIGURE_TODO chapter=22 example=22-2 -->
> *Figure: number line from $-6$ to $6$. An open circle is at $-3$; the ray extending leftward from $-3$ (toward $-\infty$) is highlighted.*

---

## 22.3 Quadratic Inequalities

Passing from linear to quadratic inequalities is a big step. While linear inequalities in two variables are fairly simple to deal with, quadratic inequalities in only one variable are plenty to keep us busy. We consider inequalities like

$$x^{2} - x - 6 \geq 0,$$

with one variable in a quadratic expression.

What is the first step in approaching such an inequality? With a quadratic *equation*, we begin by finding the zeros of the expression; we can then factor the equation. The strategy here is the same, though what we *do* with the factorization is much different.

Consider the inequality above. It factors into

$$(x - 3)(x + 2) \geq 0.$$

We thus have a product which must be greater than $0$. The product of two positive numbers or two negative numbers is positive, but the product of a negative and a positive is negative. We can thus conclude that $(x - 3)$ and $(x + 2)$ must have the same sign.

But what are the signs of $(x - 3)$ and $(x + 2)$? Consider $x - 3$. The inequality $x - 3 \geq 0$ is equivalent to $x \geq 3$ by adding $3$ to both sides. As explained in Example 22-2, the graph of this inequality looks like

<!-- FIGURE_TODO chapter=22 section=22.3 panel=1 -->
*Figure: number line from $-6$ to $6$. A closed circle is at $3$; the ray extending rightward from $3$ is highlighted, representing $x \geq 3$.*

Similarly, the graph of $x + 2 \geq 0$, or equivalently $x \geq -2$, looks like

<!-- FIGURE_TODO chapter=22 section=22.3 panel=2 -->
*Figure: number line from $-6$ to $6$. A closed circle is at $-2$; the ray extending rightward from $-2$ is highlighted, representing $x \geq -2$.*

The graph of the full inequality, $(x - 3)(x + 2) \geq 0$, should consist of all points which are either in *either* plot (both factors positive) or *not* in *both* plots (both factors negative). We also should include all points where either term is $0$, since at those points the product equals $0$, which is compatible with our $\geq$ sign. We thus draw the two plots next to each other and read the final plot directly off:

<!-- FIGURE_TODO chapter=22 section=22.3 panel=3 -->
*Figure: three stacked number lines from $-6$ to $6$. Top: $x \geq 3$ (closed circle at 3, ray right). Middle: $x \geq -2$ (closed circle at $-2$, ray right). Bottom: $(x-3)(x+2) \geq 0$ — closed circles at both $-2$ and $3$, with ray going left from $-2$ to $-\infty$ AND ray going right from $3$ to $+\infty$.*

The bottom plot, the solution to $(x - 3)(x + 2) \geq 0$, consists of those points which are either in both or in neither of the first two graphs. Had the inequality been $(x - 3)(x + 2) \leq 0$, we would look for points which are on one of the first two graphs but not the other. (Why?)

> **Exercise 22-9.** Plot the solution to the inequality $x^{2} + 5x + 6 \leq 0$.

> **Exercise 22-10.** Plot the solutions to the inequalities $x^{2} - 6x + 9 \geq 0$ and $x^{2} - 6x + 9 \leq 0$.

While finding the graph of the inequality is enough to understand it, there are other ways to present the answer. One is to write it as simple inequalities. Thus the answer to the first example we did would be

$$x \leq -2 \text{ or } x \geq 3,$$

and that of Exercise 22-9 would be

$$-3 \leq x \leq -2.$$

Another way to present these same answers uses **interval notation**. An interval of the real line is represented as an ordered pair of the starting and ending points; square braces $[$ or $]$ mean that the endpoint is included in the interval, while parentheses $($ or $)$ mean that it is not.

> **Example 22-3.** The interval which is drawn as
>
> <!-- FIGURE_TODO chapter=22 example=22-3 panel=1 -->
> *Figure: number line with closed circles at $-3$ and $6$, and the segment between them shaded.*
>
> is represented in interval notation as $[-3, 6]$, while $(-3, 6)$ denotes the interval
>
> <!-- FIGURE_TODO chapter=22 example=22-3 panel=2 -->
> *Figure: number line with open circles at $-3$ and $6$, and the segment between them shaded.*

> **Exercise 22-11.** What should the interval notation $[-3, 6)$ mean? Draw it.

> **Example 22-4.** We can now convert the answers to our quadratic inequalities above to interval notation. The solution to $x^{2} + 5x + 6 \leq 0$ is just $[-3, -2]$. The solution to $x^{2} - x - 6 \geq 0$ is more complicated, because of the "or" which we are forced to include. The interval notation looks like
>
> $$(-\infty, -2] \cup [3, \infty).$$
>
> There are several points to note here. First, the $\cup$ is a set symbol meaning all elements in either set (see Chapter 27 for more information); it replaces the "or." Second, since the intervals have no ends, going out to infinity, we symbolically make the ends of the intervals be $\infty$, the symbol for infinity. We use a parenthesis on $\infty$ rather than a square bracket, because it is *not* included in the interval, not being a real number. This may all seem kind of contrived, but it is an efficient way to write the solutions.

> **Exercise 22-12.** Solve the inequality
>
> $$x^{4} - 5x^{2} + 6 \geq 0$$
>
> by factoring (let $y = x^{2}$ first) and considering the signs of the factors, just as we did for quadratics.

> ⚠️ **Warning.** When an inequality contains proportions, we should be extra careful. Let's look at the inequality $2/(x + 1) \geq 3/(x - 3)$. Our immediate instinct is to cross-multiply and get rid of the fractions; however, it's not that simple. If we tried to multiply through by $x - 3$, we would have to worry about its sign (negative or positive), and thus whether to reverse the $\geq$.
>
> Thus, instead of removing the fractions, we write our inequality as
>
> $$\frac{2}{x + 1} - \frac{3}{x - 3} \geq 0$$
>
> and combine the fractions to get
>
> $$\frac{-x - 9}{(x + 1)(x - 3)} \geq 0.$$
>
> Since we have something which we want to be greater than $0$, we have the same problem as with quadratic inequalities. We factor all the expressions involved and consider the signs of the factors as before — it doesn't matter whether the terms are in the numerator or the denominator. We look for where the three linear terms are all positive or where two are negative and the other positive. See if you can find that the solution to the above is $(-\infty, -9] \cup (-1, 3)$. Can you see why $x = -9$ is included in the solution while $x = -1$ and $x = 3$ are not?

---

## 22.4 Absolute Value Inequalities

Another important type of inequality contains absolute values. These are really no more complicated than quadratics. Suppose we have

$$4|x + 3| + 3 > 9.$$

The key to solving this is being able to remove the absolute value signs. So we first isolate the absolute value, subtracting $3$ from both sides and then dividing by $4$ to get

$$|x + 3| > 3/2.$$

Using the techniques of Chapter 21, this is now equivalent to

$$x + 3 > 3/2 \quad \text{or} \quad x + 3 < -3/2.$$

Make sure you see why the second inequality above is $<$ rather than $>$. The answer then is

$$x > -3/2 \quad \text{or} \quad x < -9/2.$$

> **Exercise 22-13.** Plot this answer and express it in interval notation.

All absolute value inequalities come down to this basic notion of removing the absolute value signs. If we have the absolute value on the small side of the inequality, the result upon removing the absolute value signs will be between two numbers; for example

$$|x + 3| < 3/2$$

becomes

$$-3/2 < x + 3 < 3/2,$$

from which adding $-3$ to all three components yields

$$-9/2 < x < -3/2.$$

---

## 22.5 A Trivial Inequality

All the inequality types we have discussed so far have been applicable only in particular types of problems. The true art of inequalities lies in manipulating a few basic inequalities. The two most useful ones, the **Arithmetic-Geometric Mean Inequality** and the **Cauchy Inequality**, won't be approached until Volume 2. There remains, however, a very useful general inequality to discuss here.

The inequality itself seems absolutely trivial. It is merely the statement that for any real number $x$, we have

$$x^{2} \geq 0.$$

> **Example 22-5.** As a first demonstration that this content-free inequality can be of use, we will prove this statement: for all real $x$ and $y$,
>
> $$\frac{x^{2} + y^{2}}{2} \geq xy.$$
>
> We can multiply through by $2$ to get
>
> $$x^{2} + y^{2} \geq 2xy,$$
>
> then rearrange to find
>
> $$x^{2} - 2xy + y^{2} \geq 0.$$
>
> We can factor the left side into a square, to get
>
> $$(x - y)^{2} \geq 0,$$
>
> which is true because of the Trivial Inequality.

> **Exercise 22-14.** In the previous example, we worked from our result *backwards* to a true statement. This is an extremely useful method, but it only proves the result we want if we can reverse our steps, showing that the true statement at the end necessarily implies the result at the start. Show that this is so, that each equation in the argument forces the previous one to be true.

A crucial use of the Trivial Inequality is finding the minimum of quadratic expressions like $x^{2} + 5x + 1$. Just complete the square to get

$$x^{2} + 5x + 1 = \left(x + \tfrac{5}{2}\right)^{2} - \tfrac{21}{4}.$$

Since the square term is greater than or equal to $0$, the entire expression must be greater than or equal to $-21/4$. At what value of $x$ is this minimum, $-21/4$, attained?

---

## Problems to Solve for Chapter 22

**414.** Describe all $y$ such that $3y \geq 4 - y$ and $-2y \geq 1 + y$.

---

**415.** Find all $z$ such that $2/z \geq 1$.

---

**416.** Find all $x$ such that $x^{2} + x - 30 \geq 0$ and $6/x > 0$.

---

**417.** A ball is thrown upward from the top of a tower. If its height is described by $-t^{2} + 60t + 700$, what is the greatest height the ball attains?

---

**418.** Find all $x$ which satisfy the inequality $\sqrt{x} < 2x$. *(AHSME 1980)*

---

**419.** If $1.2 \leq a \leq 5.1$ and $3 \leq b \leq 6$, then find the highest possible value for the quotient $a/b$. Give your answer as a decimal. *(MATHCOUNTS 1988)*

---

**420.** How many integers satisfy $|x| + 1 \geq 3$ and $|x - 1| < 3$? *(MATHCOUNTS 1987)*

---

**421.** For how many integers $n$ is $\left| \dfrac{n}{3} - 2 \right| \leq 3$? *(MATHCOUNTS 1992)*

---

**422.** If $x < a < 0$, prove that $x^{2} > ax > a^{2}$. *(AHSME 1956)*

---

**423.** Show that if $x - y > x$ and $x + y < y$, then both $x$ and $y$ must be negative. *(AHSME 1966)*

---

**424.** Given that the positive integers $a$, $b$, $c$, and $d$ satisfy $\dfrac{a}{b} < \dfrac{c}{d} < 1$, arrange the following in order of increasing magnitude:

$$\frac{b}{a}, \quad \frac{d}{c}, \quad \frac{bd}{ac}, \quad \frac{b + d}{a + c}, \quad 1.$$

*(MAΘ 1987)*

---

**425.** Solve for $x$: $x + 1/x \leq -2$. *(MAΘ 1990)*

---

**426.** If the smallest value of $y$ satisfying the equation $y = 3x^{2} + 6x + k$ is $4$, find the value of $k$. *(MATHCOUNTS 1989)*

---

**427.** If $r > 0$, then for all $p$ and $q$ such that $pq \neq 0$ and $pr > qr$, we have

  A. $-p > -q$
  B. $-p > q$
  C. $1 > -q/p$
  D. $1 < q/p$
  E. none of these

---

**428.** Find the greatest integer $x$ for which $3^{20} > 32^{x}$. *(MAΘ 1991)*

---

## 📚 The BIG PICTURE

> One very famous inequality comes from the strange world of quantum mechanics. **Bell's Inequality** was proven by J.S. Bell in the mid-1960's to answer some nagging doubts about the theory.
>
> Quantum mechanics does not describe the exact motions and interactions of physical particles, but only the *probabilities* of those motions and interactions. In fact, this is assured by another inequality, the so-called Uncertainty Principle, which places a rigid upper bound on the extent to which quantum mechanics can determine a particle's position and speed.
>
> Many have had doubts about this restriction and other weird properties of the quantum description; Einstein himself had grave difficulties. Along with Podolsky and Rosen, he developed a thought experiment which showed that quantum mechanics violated the common-sense notion that nothing can take effect instantaneously, showing, he felt, that there must be a more fundamental set of variables than quantum mechanics evaluates.
>
> Bell's inequality provided a rigid bound on the possibilities of a theory of the type Einstein was hoping for, however. Experiment soon confirmed that the bound is broken by the real world, meaning that Einstein's hopes of a more satisfying theory were in vain.
>
> The interpretation of quantum mechanics was thus shown to be a very tricky business. (This has been confirmed by a flood of popular books asserting that quantum mechanics proves various religious or philosophical assertions. Be skeptical.)

---

*End of Chapter 22.*
