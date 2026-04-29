---
title: "Chapter 21 — Functions"
source: "The Art of Problem Solving, Volume 1"
chapter: 21
problem_range: [402, 413]
sections:
  - "21.1 Welcome to the Machine"
  - "21.2 Graphing Functions"
  - "21.3 Inputs and Outputs"
  - "21.4 Even and Odd"
  - "21.5 Some Special Functions"
  - "21.5.1 Absolute Values"
  - "21.5.2 Floored"
  - "21.5.3 Split Up"
  - "21.6 Transforming a Function"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • `\x` (OCR artifact for the `3/4` fraction)  → 3/4
    • `f n(x)`, `f^n(x)`                          → f^{n}(x)  (function iteration)
    • `[/(*)]”`, `[f(x)]"`                        → [f(x)]^{n}
    • `^x`, `tfc`, `Vt`                           → cube root, fourth root, square root
    • `MA©`                                       → MAΘ
    • `M ATHCO U N TS`                            → MATHCOUNTS
    • `lABC`, `LABC`, `ZABC` (etc.)               → ∠ABC
    • Floor `|x|` vs absolute `|x|` — distinguish by context;
      use ⌊·⌋ and ⌈·⌉ for floor and ceiling explicitly
  See inline `<!-- OCR-NOTE -->` blocks for places where the source has
  a probable typo or the OCR is ambiguous.
---

# Chapter 21 — Functions

## 21.1 Welcome to the Machine

Consider the line given by the standard form equation

$$-3x + 4y = 12.$$

In our discussion of analytic geometry, we treated this line solely as a geometric figure, defined by the points $(x, y)$ satisfying the equation. However, there is another very productive way to look at such a line. Change the equation into slope-intercept form:

$$y = \tfrac{3}{4}x + 3.$$

Now for each $x$ we put in, running it through the procedure $\tfrac{3}{4}x + 3$ automatically gives back the corresponding $y$. We can thus think of the line equation as a machine which, for each $x$ we put in, gives us back one, and only one, $y$.

> **Exercise 21-1.** Do all line equations give back one, and only one, $y$ for each $x$?

The "machine," given by $\tfrac{3}{4}x + 3$, is called a **function**. A function always has one, and only one, output for each input; for this reason, not every expression is a function. For example, $\sqrt{x}$ is not a valid function, since most numbers have two square roots — if we tried to take $\sqrt{1}$, we would not know whether the machine should produce $1$ or $-1$. We can make the square root a function, however, by specifying that we will take only the positive answer.

When we wish to treat an equation as a function, we no longer write it using $x$ and $y$, which seems to imply a parallelism between the two variables. Instead, we give the machine part a name of its own, like $f$. To show that $f$ is a function of the variable $x$, we usually write it as $f(x)$, which is pronounced "$f$ of $x$." We would thus rewrite our line equation as

$$f(x) = \tfrac{3}{4}x + 3. \quad (21.1)$$

> **Exercise 21-2.** Which of the following are functions?
>
>   i. $\sqrt[3]{x}$
>   ii. $\sqrt[4]{x}$
>   iii. $\dfrac{x}{x+1}$

> **Example 21-1.** If $r(x) = \dfrac{x}{x^2 + 1}$, find $r(-1)$, $r(0)$, and $r(2)$.
>
> ***Solution.*** We just substitute the input into the machine and turn the crank, so that
>
> $$r(-1) = \frac{-1}{(-1)^2 + 1} = -\tfrac{1}{2}, \qquad r(0) = \frac{0}{1} = 0, \qquad r(2) = \frac{2}{2^2 + 1} = \tfrac{2}{5}.$$

> **Exercise 21-3.** For each of the functions $f(x)$ in Exercise 21-2, find $f(64)$.

> **Exercise 21-4.** If $f(x) = 2^x$, find $f(4)/f(3)$.

> **Exercise 21-5.** Given that $f(x + 1) = x^3 + 6x^2 + x + 3$, find $f(4)$. *(MAΘ 1987)*

---

## 21.2 Graphing Functions

A function is graphed in the same way as a normal equation is. On the horizontal axis we place the **independent variable** ($x$ in this case), which can vary freely. On the vertical is the value of the function. The graph of Equation 21.1 is thus the same as if we were graphing the line equation $y = \tfrac{3}{4}x + 3$, with the difference that the vertical axis is called $f(x)$, rather than $y$.

A common test to check if a graph represents a function is that if any vertical line passes through more than one point of the curve, the curve does not represent a function. Compare this to the statement that a function gives only one output for every $x$.

> **Example 21-2.** Graph the function $f(x) = x^2$.
>
> ***Solution.*** The simplest way to do this is simply to plug in values of $x$. For each, we find the value of the function and plot the point $(x, f(x))$. If $x = 0$, $f(x) = 0$. If $x = 1$ or $x = -1$, then $f(x) = 1$. (Note that two different $x$ values can go to a single $f(x)$; a single $x$ just cannot go to two values of $f(x)$.) If $x = 2$ or $x = -2$, $f(x) = 4$. If $x = 3$ or $x = -3$, $f(x) = 9$. If we plot these few points, we can see what the basic shape of the curve must be, and fill it in.
>
> <!-- FIGURE_TODO chapter=21 example=21-2 -->
> *Figure: parabola $f(x) = x^2$ opening upward, vertex at the origin, passing through $(\pm 1, 1)$, $(\pm 2, 4)$, $(\pm 3, 9)$.*

> **Exercise 21-6.** Graph the functions $f(x) = x^3$ and $h(x) = x^3 + 3$.

> **Exercise 21-7.** Graph the function $f(x) = \dfrac{1}{1 + x^2}$. (You will have to use some non-integral values for $x$ to get an idea of the shape near $x = 0$.)

---

## 21.3 Inputs and Outputs

In examples above, we've examined how to graph several different functions. Consider graphing the function $f(x) = 1/(1 - x^2)$. When we plug in $x = 1$, we find that $f(x)$ is undefined, because it is a fraction with denominator $0$. Thus the point $x = 1$ is not allowed as an input to the function, and neither is $x = -1$.

The set of allowable inputs to a function is called the **domain**; the domain of $f(x)$ in this case is *all real numbers except* $x = \pm 1$. The domains of all the functions from the previous section are all reals. Unless specified otherwise, you can almost always assume that the domain is restricted to the reals, rather than allowing complex inputs. You can also generally assume that complex *outputs* are forbidden, so that $-1$ is *not* in the domain of $\sqrt{x}$.

> **Example 21-3.** What is the domain of $\log x$?
>
> ***Solution.*** The logarithm of $x$ is the number $y$ such that $10^y = x$. If $x > 0$, there will always be such a number $y$, but for $x \leq 0$ there can be no such power. Thus the domain is **the positive real numbers**.

> **Exercise 21-8.** Plot $f(x) = \log_2 x$.

> **Exercise 21-9.** Find the domains of:
>
>   i. $f(x) = \dfrac{x^2 + 3x - 2}{x^2 - 3x + 2}$.
>   ii. $h(y) = 2^y$. (Note that the input variable does not have to be called $x$.)
>   iii. $g(t) = \sqrt{t}$, where the positive square root is the one taken.

Just as the domain of a function is the set of allowed inputs, the **range** is defined as the set of all outputs of the function. For example, the range of $x^2 - 1$ is all numbers greater than or equal to $-1$, the range of $1/x$ is all real numbers except zero, and the range of the line function of Section 21.1 is all reals. (Make sure you understand all of these.) As was noted above, the outputs are almost always restricted to the reals, rather than allowing complex outputs. You can usually find the range of a function with pure common sense through thinking about what the outputs can be.

> **Example 21-4.** Find the range of $2^x$.
>
> ***Solution.*** A power of a positive number is always positive, but can be any positive number, as you should have observed in the previous set of examples. Thus the range is **the positive real numbers**.

> **Exercise 21-10.** Find the ranges of $\log x$, $x^2 + 1$, and $1/(x - 1)$.

> **Exercise 21-11.** Find the range of $x/(x + 1)$. You will probably need to draw a graph.

Given a function $f(x)$, one thing that can be done is to create a new function in which you put an input $x$ into $f$, then take the output, $f(x)$, and put it through again, if it can go through. (That is, if it is in the domain of $f$.) The result is $f(f(x))$. We can play this game as many times as we wish, as long as each output is still in the domain of $f$. The function $f(f(\cdots f(x) \cdots))$, with $n$ $f$'s, is often written $f^{n}(x)$.

> **Example 21-5.** If $f(x) = x + 2$, then
>
> $$f^{6}(x) = (((((x + 2) + 2) + 2) + 2) + 2) + 2 = x + 12.$$

> **Exercise 21-12.** Find $f^{2}(x)$ if $f(x)$ is
>
>   i. $x/(x + 1)$.
>   ii. $1/x$.
>   iii. $x$.

> ⚠️ **Warning.** The function $f^{n}(x)$ is **NOT** the same as the function $[f(x)]^{n}$, which is the $n$th power of $f$. Do not confuse the two. This is easier said than done, because some very confusing notation has become popular, in which, for example, $\sin^{2} x$ is meant to mean $(\sin x)^{2}$. By what we have just said, $\sin^{2} x$ should mean $\sin(\sin x)$. The reason that $\sin^{2} x = (\sin x)^{2}$ is that constructions like $\sin(\sin x)$ are very rare, while expressions like $(\sin x)^{2}$ are very common. Thus the simple notation $\sin^{2} x$ is used for the latter rather than the former. Be careful.

> **Example 21-6.** If $f(x) = x^{2}$, then the function $f^{3}(x)$ is $((x^{2})^{2})^{2} = (x^{4})^{2} = x^{8}$, while the function $[f(x)]^{3}$ is $(x^{2})^{3} = x^{6}$.

Still another thing we can do with the output of a function is to put it through a *different* function. If $f$ is the first function and $g$ the second, the outcome looks like $g(f(x))$. Of course, we again must make sure that $f(x)$ is in the domain of $g$, and so on. One notation to watch for is writing $g(f(x))$ as $g \circ f$.

> **Example 21-7.** Suppose $f(x) = 6x^{2}$ and $g(x) = x/(\sqrt{x} + 1)$. Then $(g \circ f)(x) = 6x^{2}/(\sqrt{6}\,x + 1)$.

> **Exercise 21-13.** Find a counterexample to the "identity" $f \circ g = g \circ f$.

---

## 21.4 Even and Odd

Some functions have certain kinds of symmetry which make them easier to work with. One function we looked at earlier was $f(x) = x^{2}$, graphed in Example 21-2. If you look back at that graph, you will see that it is symmetric about the $y$-axis.

> **Exercise 21-14.** Show that symmetry of the graph of a function $f(x)$ about the $y$-axis is equivalent to $f(x)$ satisfying the identity
>
> $$f(x) = f(-x). \quad (21.2)$$

> **Exercise 21-15.** What type of symmetry has the graph of a function $f(x)$ which satisfies the identity
>
> $$f(x) = -f(-x)? \quad (21.3)$$

Functions with symmetry about the $y$-axis, or equivalently which satisfy (21.2), are called **even**. Similarly, functions which map to themselves when rotated $180°$ about the origin (those which satisfy (21.3)) are called **odd**.

> **Example 21-8.** Consider a function which for $x > 0$ looks like the first picture below. If the function is even, the continuation to $x < 0$ looks like the second picture. If the function is odd, the continuation to $x < 0$ looks like the third picture.
>
> <!-- FIGURE_TODO chapter=21 example=21-8 panels=3 -->
> *Figure: three side-by-side plots — (1) an arbitrary curve drawn for $x > 0$ only; (2) the same curve mirrored across the $y$-axis (even continuation); (3) the same curve rotated $180°$ about the origin (odd continuation).*

> **Exercise 21-16.** Draw some functions which are even, odd, and neither even nor odd.

> **Exercise 21-17.** Write down some functions which are even, odd, and neither.

> **Exercise 21-18.** Find which of the following are odd or even: $x$, $x^{2}$, $x^{3}$, $x^{4}$, $x^{6} + 27x^{4} + x^{2}$, $x^{5} + 1$, $x^{6} + x^{5}$.

> **Exercise 21-19.** A function of the form $a_{n} x^{n} + a_{n-1} x^{n-1} + \cdots + a_{0}$, where $n$ is a positive integer and the $a_{i}$'s are constants, is called a **polynomial**. When is a polynomial even? Odd?

> **Example 21-9.** What are the possible values at $x = 0$ of even or odd functions?
>
> ***Solution.*** If $f$ is odd, then we have $f(-x) = -f(x)$. Substituting in $x = 0$, we then have $f(0) = -f(0)$, so $2f(0) = 0$ and $f(0) = 0$! On the other hand, if $f$ is even, we merely get $f(0) = f(0)$, and $f(0)$ can be anything at all. Hence an odd function must pass through the origin, but an even function has no similar restriction.

---

## 21.5 Some Special Functions

There are certain functions which, while useful, don't fit in nicely with anything else. The only way to study such functions is on a case-by-case basis.

### 21.5.1 Absolute Values

One very important such function is the **absolute value function**, denoted by $f(x) = |x|$. The function returns the distance from $x$ to $0$, which is just the positive version of $x$: $x$ itself if $x$ is positive, $-x$ if $x$ is negative. For example, $|4| = 4$, $|17| = 17$, $|-3| = 3$, $|-9| = 9$, and $|0| = 0$. Absolute value can also be used to denote the distance between two numbers; for example, $|x - y| < 2$ means that $x$ and $y$ are less than $2$ units apart.

> **Exercise 21-20.** Make sure you understand why $|x - y| < 2$ means that $x$ and $y$ are less than $2$ apart. Why do we need an absolute value here?

> **Exercise 21-21.** Graph the absolute value function $f(x) = |x|$. What are its domain and range?

When confronted with the absolute value sign in a problem, the easiest thing to do is usually to replace the absolute value problem by a new problem without the absolute value. We use the fact that if $|M| = N$ for any expressions $M$ and $N$, then either $M = N$ or $M = -N$.

> **Example 21-10.** Find all solutions to the equation $|x^{2} - 3x| = 4$.
>
> ***Solution.*** We can split the problem into two cases: either $x^{2} - 3x = 4$ or $x^{2} - 3x = -4$. The first case yields the solutions $4$ and $-1$; the second yields $(3 \pm i\sqrt{7})/2$. If we restrict ourselves to real solutions, only $\mathbf{4}$ and $\mathbf{-1}$ are acceptable.

> **Exercise 21-22.** Solve the equation $\left| \dfrac{x + 2}{3x - 1} \right| = 5$.

### 21.5.2 Floored

Another important special function is the **greatest integer function** or **floor function**, denoted by $f(x) = \lfloor x \rfloor$ or $f(x) = [x]$. The value of the function is just $x$ itself if $x$ is an integer, or the integer directly below $x$ if not. Thus $\lfloor 3 \rfloor = 3$, $\lfloor 4.3 \rfloor = 4$, $\lfloor -\pi \rfloor = -4$, and $\lfloor \sqrt{2}/2 \rfloor = 0$. Because they nicely suggest what the function does and are more distinctive, we prefer the $\lfloor \cdot \rfloor$ notation and the name "floor function."

> **Exercise 21-23.** Find $\lfloor -\sqrt{17} \rfloor$, $\lfloor \sqrt[3]{17} \rfloor$, $\lfloor -\sqrt[4]{17} \rfloor$, and $\lfloor \sqrt[5]{17} \rfloor$.

To plot the floor function is difficult, because it is the first function we have tried to plot which is not **continuous**. A continuous function is one which can be drawn in one curve without picking up the pen.

Suppose we try to draw the floor function in this way. Start from $0$, where the value is $0$. Moving to the right, we stay at $0$, since $\lfloor 0.1 \rfloor = 0$, $\lfloor 0.2 \rfloor = 0$, etc. Thus the line will stay at $f(x) = 0$ through $x = 0.9$, $0.99$, $0.999$, closer and closer to $1$. But as soon as we cross $x = 1$, the function value jumps up to $f(x) = 1$; we have to pick up the pen.

<!-- FIGURE_TODO chapter=21 section=21.5.2 -->
*Figure: graph of $f(x) = \lfloor x \rfloor$ as a step function. Each integer-length step has a closed circle on its left endpoint and an open circle on its right endpoint.*

> **Exercise 21-24.** The function $x - \lfloor x \rfloor$ is called the **fractional part** of $x$, and is usually denoted with curly braces: $\{x\}$. Find $\{17\}$, $\{-17/2\}$, $\{17/3\}$, $\{-17/4\}$, and $\{17/5\}$. Plot the function $f(x) = \{x\}$.

> **Exercise 21-25.** The **ceiling function** $\lceil x \rceil$ is defined as the smallest integer which is greater than or equal to the input. Plot the floor and ceiling functions on the same set of axes. Where do the two coincide?

> **Exercise 21-26.** If $f(x) = \lfloor x \rfloor$ and $g(x) = \lceil x \rceil$, express $g(x)$ in terms of $f(x)$ and $x$. Check that your expression works by substituting in some numbers.

> **Exercise 21-27.** Are the absolute value and floor functions even, odd, or neither?

> **Exercise 21-28.** Prove the following for all real $x$.
>
>   i. $\lfloor x \rfloor + \lfloor -x \rfloor$ is equal to either $0$ or $-1$.
>   ii. $\lfloor x + \tfrac{1}{2} \rfloor$ is the integer nearest $x$.
>   iii. $\lfloor x \rfloor - 2\lfloor x/2 \rfloor$ is equal to either $0$ or $1$. (*Hint:* consider the decomposition $\lfloor x \rfloor = x - \{x\}$.)

### 21.5.3 Split Up

Not all functions can be simply described by a single expression. Sometimes a function will behave one way in one region and another way in another. For example, consider the absolute value function $f(x) = |x|$. The function is really *two* functions: $f(x) = x$ for positive $x$ and $f(x) = -x$ for negative $x$. So instead of writing $|x|$, which would be confusing to someone who had not seen this special shorthand, we could be explicit and write

$$f(x) = \begin{cases} x, & \text{if } x \geq 0 \\ -x, & \text{if } x < 0 \end{cases}$$

This structure clearly acknowledges that there are two **cases** involved, and that the function takes a simple form for each case.

For the absolute value function this is a bit formal — most people know what the function is. For other functions, however, this type of construction might be necessary. We might wish, for some reason, to construct a function $g(x)$ which is $x^{2}$ in the region $x \geq 3$, $x^{3}$ for $-2 \leq x < 3$, and $x^{4}$ for $x < -2$. (Note the way the entire real line is covered by our cases.) Since there is no ready-made notation for this function as there is for the absolute value, we could use the general case structure to write

$$g(x) = \begin{cases} x^{2}, & x \geq 3 \\ x^{3}, & -2 \leq x < 3 \\ x^{4}, & x < -2 \end{cases}$$

> **Exercise 21-29.** How many times does the function
>
> $$g(x) = \begin{cases} x^{2} - 8, & x \geq 3 \\ x^{3} + 9, & -2 \leq x < 3 \\ x^{4} - 15, & x < -2 \end{cases}$$
>
> intersect the $x$-axis?

---

## 21.6 Transforming a Function

Once you have a basic understanding of functions, you can begin to construct new functions from functions you already have. There are four basic transformations which can be done.

> **Example 21-11.** The first basic transformation is to replace the old function $f(x)$ with $f(x + a)$, for some number $a$. What does this do to the function? Let's try it for a simple function, like $|x|$, and take $a = 2$. We can plug in some values of $x$ to see what is going on. The values of $f(x)$ and $f(x + 2)$ for various $x$ values can be easily arranged in a table, as below. Using these values, we can draw the two graphs on one pair of axes.
>
> | $x$ | $\|x\|$ | $\|x + 2\|$ |
> |-----|---------|-------------|
> | $-5$ | $5$ | $3$ |
> | $-4$ | $4$ | $2$ |
> | $-3$ | $3$ | $1$ |
> | $-2$ | $2$ | $0$ |
> | $-1$ | $1$ | $1$ |
> | $0$  | $0$ | $2$ |
> | $1$  | $1$ | $3$ |
> | $2$  | $2$ | $4$ |
> | $3$  | $3$ | $5$ |
> | $4$  | $4$ | $6$ |
> | $5$  | $5$ | $7$ |
>
> <!-- FIGURE_TODO chapter=21 example=21-11 -->
> *Figure: $f(x) = |x|$ and $f(x + 2) = |x + 2|$ on the same axes; the latter is the former shifted two units to the left.*
>
> In the table and the corresponding graph, we can clearly see that the graph of $|x + 2|$ is just the graph of $|x|$ shifted toward the *left* by $2$! Why is this? For each $x$, the value of $f(x + 2)$ will equal the value of $f(x)$ for $x + 2$, which is the point $2$ to the right of $x$. Hence $f(x)$ is $2$ units to the right of $f(x + 2)$. Thus the entire graph of $|x + 2|$ must be a shifted version of the graph of $|x|$.

> **Exercise 21-30.** Understand why $f(x + 2)$ must be a shift of $f(x)$, using the table for $|x|$ if necessary. Why should the shift be to the negative, even though $2$ is *added* to $x$?

> **Example 21-12.** A second basic functional transformation is to add some number $a$ *outside* the function, taking $f(x)$ to $f(x) + a$. Let's try this with $f(x) = |x|$.
>
> Taking $a = 2$, we can quickly plot $|x|$ and $|x| + 2$ on the same graph. Put in a few points yourself to confirm that these are the correct graphs; for example, for $x = -4$, $|x| = 4$ and $|x| + 2 = 6$. From the graphs we can immediately see that adding $2$ to the function shifts the graph *up* by $2$. Can you see why this must be true?
>
> <!-- FIGURE_TODO chapter=21 example=21-12 -->
> *Figure: $f(x) = |x|$ and $f(x) + 2 = |x| + 2$ on the same axes; the latter is the former shifted two units up.*

> **Example 21-13.** Yet another transformation we can apply is multiplying the function $f(x)$ by a constant $a$, to get $a f(x)$.
>
> As before, we take $f(x) = |x|$ and $a = 2$. The transformed graph this time is a vertical *stretch* by a factor of $2$. The distance from each point on $f(x)$ to the $x$-axis is doubled when we draw $2f(x)$, so $2f(x)$ is the result of the aforementioned stretch.
>
> <!-- FIGURE_TODO chapter=21 example=21-13 -->
> *Figure: $f(x) = |x|$ and $2f(x) = 2|x|$ on the same axes; arrows from each point on $|x|$ point to the corresponding point on $2|x|$ directly above.*

> **Example 21-14.** The last transformation we will consider is going from $f(x)$ to $f(ax)$.
>
> At the right, we plot $f(x) = |x|$ and $f(2x) = |2x|$; it is clear in this graph that multiplying by $2$ corresponds to a horizontal *shrink* by a factor of $2$. For example, let $g(x) = f(2x)$, then note that $g(1) = f(2)$, $g(2) = f(4)$, etc. Now do you see why $f(2x)$ is a horizontal shrink of $f(x)$?
>
> <!-- FIGURE_TODO chapter=21 example=21-14 -->
> *Figure: $f(x) = |x|$ and $f(2x) = |2x|$ on the same axes; horizontal arrows show each $x$-value being mapped to half its distance from the origin.*

> ⚠️ **Warning.** Though the pictures resulting from $2|x|$ and $|2x|$ are the same, a vertical stretch by $2$ and a horizontal shrink by $2$ are not generally the same thing. For example, take $g(x) = 2\sqrt{x}$ and $h(x) = \sqrt{2x}$; we have $g(8) = 4\sqrt{2}$, but $h(8) = 16$.
>
> <!-- OCR-NOTE: The textbook's claim h(8) = 16 is mathematically incorrect — h(8) = √16 = 4. Both OCR passes consistently show "16," so this is preserved verbatim, but it appears to be a typo in the original 1993 printing. The pedagogical point (vertical stretch ≠ horizontal shrink) still stands with the corrected value 4 ≠ 4√2. -->

> **Exercise 21-31.** What relationship does the function $f(x/2)$ have to the function $f(x)$?

> **Exercise 21-32.** Shift and stretch some more functions to get comfortable with these techniques. If necessary, you can always resort to plotting the functions on a point-by-point basis, though you should soon be able to plot the transformed function without this. Always plot both the original function and the transformed function, to make sure you understand what the transformation does.

---

## Problems to Solve for Chapter 21

**402.** Which values of $x$ must be excluded from the domain of

$$g(x) = \dfrac{\dfrac{2}{2 + x}}{2 - \dfrac{2}{2 + x}}\,?$$

*(MAΘ 1990)*

---

**403.** If $f(x) = 2x^{2} - 3x + 1$, then find $f(4x)$. *(MAΘ 1990)*

---

**404.** If $f(x + 1) = x^{2} + 3x + 5$, then find $f(x)$. *(MAΘ 1991)*

---

**405.** If $f(4x + 3) = 2x + 1$, then find $f(-9)$. *(MAΘ 1987)*

---

**406.** How many solutions are there to the equation $|x^{2} - 6x| = 9$? *(MAΘ 1991)*

---

**407.** Let $[x]$ denote the greatest integer function, and $\{x\} = x - [x]$ the fractional part of $x$. If

$$z = \dfrac{\{\sqrt{3}\}^{2} - 2\{\sqrt{2}\}^{2}}{\{\sqrt{3}\} - 2\{\sqrt{2}\}},$$

find $[z]$. *(MAΘ 1992)*

---

**408.** Let $f$ be the function from real numbers to real numbers defined by:

$$f(x) = \begin{cases} x + 2, & \text{if } 3 \text{ is a divisor of } [x] \\ x - 1, & \text{otherwise} \end{cases}$$

As usual, $[x]$ stands for the greatest integer function. Compute $f(f(f(f(f(\pi)))))$. *(MAΘ 1992)*

---

**409.** Solve for all real values of $y$: $|3y + 7| = |2y - 1|$. *(MATHCOUNTS 1990)*

---

**410.** Find the area of the region determined by the system

$$\begin{aligned} y &\geq |x| \\ y &\leq -|x + 1| + 4. \end{aligned}$$

*(MATHCOUNTS 1992)*

---

**411.** Find the coordinates of the points of intersection of the graphs of the equations $y = |2x| - 2$ and $y = -|2x| + 2$. *(MATHCOUNTS 1989)*

---

**412.** Find the equation whose graph is as shown at the right. *(MATHCOUNTS 1989)*

<!-- FIGURE_TODO chapter=21 problem=412 -->
*Figure: a rhombus (square rotated 45°) with vertices at $(5, 0)$, $(0, 5)$, $(-5, 0)$, $(0, -5)$ — i.e., the locus $|x| + |y| = 5$.*

---

**413.** Prove that $\lfloor 2x \rfloor + \lfloor 2y \rfloor \geq \lfloor x \rfloor + \lfloor y \rfloor + \lfloor x + y \rfloor$ for all real $x$ and $y$.

---

*End of Chapter 21.*
