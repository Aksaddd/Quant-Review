# Chapter 6 — Quadratic Equations

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 66–80. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 66 / book page 52 -->

# Chapter 6

# *Quadratic Equations*

## 6.1 What's a Quadratic?

When you study the physics of moving objects, you'll start with objects moving at a constant rate. For example, if a rock is thrown from a 100 foot tower and travels 5 feet per second from the top of the tower to the ground, it takes 20 seconds for the rock to hit the ground. Unfortunately, the real world isn't so simple. Gravity causes the rock to accelerate. The actual height above the ground in feet of the rock at time $t$ is better described by $100 - 5t - 16t^2$. (Take this on faith for now, or read the first couple chapters of a basic physics book.) Now how long does the rock stay in the air? To find this, we must solve $100 - 5t - 16t^2 = 0$, because we want the time at which the height is 0. This is a **quadratic equation** because it has degree 2. If we just solve this as a linear equation, we get $t = (100 - 16t^2)/5$, which doesn't really tell us anything about $t$.

In this chapter, we examine methods used to solve quadratic equations and the use of these methods on other types of problems.

## 6.2 Factoring Quadratics

How do quadratics occur? You could think of them as a product of linear factors, such as

$$(x + 2)(x + 3) = x(x + 3) + 2(x + 3) = x^2 + 5x + 6.$$

Suppose we are asked to find the solutions to $x^2 + 5x + 6 = 0$. From above, we know this quadratic is the product $(x + 2)(x + 3)$. The solutions to the equation are the values of $x$ which make this product 0. Thus, either $x + 2 = 0$ or $x + 3 = 0$, and our solutions are $-2$ and $-3$.

If we can find the factored form of a quadratic as above, we can always find where the quadratic equals 0. Fortunately, any equation of the form $ax^2 + bx + c = 0$ (where $a$, $b$, and $c$ are the **coefficients** of the quadratic) can always be **factored** as

$$ax^2 + bx + c = a(x - r)(x - s) = 0.$$

The quantities $r$ and $s$ are called the **roots**, **zeroes**, or solutions of the quadratic equation. As above, these are the solutions of the equation because the expression $a(x - r)(x - s)$ can only be zero when either $(x - r) = 0$ or $(x - s) = 0$ (remember $a \neq 0$). Thus the expression equals zero when $x$ equals $r$


<!-- PDF page 67 / book page 53 -->

or $s$. Before we discuss how to find the factored form of a quadratic equation, we should first review how to multiply general expressions like $(x - r)(x - s)$ via the distributive property:

$$(x - r)(x - s) = x(x - s) + (-r)(x - s) = x^2 - sx - rx + rs = x^2 - (r + s)x + rs.$$

Can you see the relationship between the sum and product of the roots and the coefficients of the quadratic?

This same method also works when there are more than two terms in the parentheses, and when there are more than two sets of parentheses.

---

**EXAMPLE 6-1** Expand the expression $(x - a)(x - a - b)(x + a)$.

*Solution:* Let's call this expression $f(x)$. We start by multiplying the first two parentheses and then multiply the result by the third parentheses. It goes

$$
\begin{aligned}
f(x) &= [x(x - a - b) + (-a)(x - a - b)](x + a) \\
&= (x^2 - 2ax - bx + a^2 + ab)(x + a) \\
&= x^2(x + a) - 2ax(x + a) - bx(x + a) + a^2(x + a) + ab(x + a).
\end{aligned}
$$

By expanding the last expression above, we come to our final answer,

$$(x - a)(x - a - b)(x + a) = \mathbf{x^3 - ax^2 - bx^2 - a^2 x + a^3 + a^2 b}.$$

---

👁 **EXERCISE 6-1** Show that $(x + y)^3 = x^3 + 3x^2 y + 3xy^2 + y^3$. You will see this again, many times.

---

Now we come to the question of how to factor quadratic equations. Sometimes we are fortunate and are able to guess the factorization of the quadratic; being good at factoring requires ingenuity, experience, and sometimes dumb luck. Although we have a few helping hints to guide us, factoring is largely a matter of trial and error.

Let's try to factor $x^2 - 3x + 2$. We wish to write this as $(x + u)(x + v)$. Writing this product as

$$(x + u)(x + v) = x(x + v) + u(x + v) = x^2 + (u + v)x + uv,$$

we can compare the coefficients of this general form to those of the original quadratic. From the constant terms of the two quadratics we get $uv = 2$, and from the coefficients of $x$, we have $u + v = -3$. (Make sure you see why.) Assuming $u$ and $v$ are integers, from $uv = 2$ we find that $u$ and $v$ are either 1 and 2 or $-1$ and $-2$. Using $u + v = -3$, we determine that the latter is correct. Thus,

$$x^2 - 3x + 2 = (x - 1)(x - 2).$$

As we have seen, factoring comes down to guessing two numbers given their product and their sum. The product of the two is given by the constant term of the quadratic, and the sum by the negative of the coefficient of $x$. We gain further helping hints in our factoring efforts from the signs of the product and the sum. If the product of the two numbers is positive, then the numbers must have the same sign. If the product is negative, then the signs must be different. If the product of the numbers is positive (and hence the numbers are the same sign), the sum will tell us if the numbers are positive or negative.


<!-- PDF page 68 / book page 54 -->

🪡 How would we factor $-4x^2 - 8x - 3$? Our above discussion only deals with quadratics whose leading coefficient is 1. Our first instinct might be to divide the quadratic by $-4$ to make the leading coefficient 1, but this would introduce fractional coefficients, which usually cause trouble. We will however, factor out a $-1$, because it is always best to have a positive coefficient of $x^2$. Now we have $-(4x^2 + 8x + 3)$. We look for a factorization of $4x^2 + 8x + 3$ of the form $(sx + u)(tx + v)$. Expanding this we find

$$(sx + u)(tx + v) = stx^2 + (sv + ut)x + uv = 4x^2 + 8x + 3.$$

We have left the world of simple trial and error and entered the domain of magic and luck. From the above we find $st = 4$, $sv + ut = 8$, and $uv = 3$. Always let $s$ and $t$ be positive, and factoring will be much easier. Now we guess $u = 3$ and $v = 1$. Thus, $s + 3t = 8$ and $st = 4$. After trying $(s, t) = (1, 4)$; $(4, 1)$; and $(2, 2)$, we note that $(2, 2)$ works, so

$$4x^2 + 8x + 3 = (2x + 1)(2x + 3).$$

Your first choices for $u$ and $v$ will not always work; had we chosen $(u, v) = (-1, -3)$ and maintained that $s$ and $t$ be positive, we would have $-s - 3t = 8$, which has no positive solutions.

Although factoring when the leading coefficient is not $+1$ can be very difficult, the guiding signs noted before can also be used here to determine the signs of $u$ and $v$. When the coefficient of $x^2$ is positive, the constant term of the quadratic is the product $uv$, and thus determines if $u$ and $v$ have the same sign or not. The coefficient of $x$, if the constant term is positive, determines the common sign of $u$ and $v$. It is very important to remember in this that the coefficient of $x^2$ must be positive, as must both $s$ and $t$ in order for these hints to be true. (Why?)

Be patient when learning how to factor. It takes much practice, but in time you'll be able to factor without even writing down the $u$'s and $v$'s.

---

**EXAMPLE 6-2** Solve the quadratic equations $x^2 + 9x + 18 = 0$ and $x^2 - x - 30 = 0$.

*Solution:* For the first, we seek two numbers whose product is 18 and sum is 9. Since both the product and the sum are positive, both the numbers are positive. Since $18 = 1 \cdot 18 = 2 \cdot 9 = 3 \cdot 6$, we only have 3 possibilities. We find that $x^2 + 9x + 18 = (x + 3)(x + 6)$. Thus, $x^2 + 9x + 18 = 0$ if $x + 3 = 0$ or $x + 6 = 0$. Hence our solutions are $x = \mathbf{-3}$ and $x = \mathbf{-6}$. (Put these solutions back in the original equation to check them.)

For the second, we seek two numbers whose product is $-30$ and whose sum is $-1$. Since the product is negative, the two numbers differ in sign. Because the sum of the numbers is $-1$, the magnitudes of the two numbers differ by 1. Since $5 \cdot 6 = 30$, our only options are 5 and $-6$, or $-5$ and 6. The former gives us a sum of $-1$, and thus is correct. Hence $x^2 - x - 30 = (x - 6)(x + 5) = 0$, and the solutions are $\mathbf{6}$ and $\mathbf{-5}$.

---

**EXAMPLE 6-3** Find all $x$ that satisfy $x^2 + \tfrac{3}{2}x = 1$.

*Solution:* Our first step is to get all the terms on one side and make all the coefficients integers by multiplying the whole equation by 2. (This should always be your first step when trying to factor a quadratic equation.) Doing so yields

$$2x^2 + 3x - 2 = 0.$$


<!-- PDF page 69 / book page 55 -->

Assuming that the factored form is $(sx + u)(tx + v)$, where $s$ and $t$ are positive, we obtain

$$uv = -2 = -st.$$

Since $t$ and $u$ can be at most 2 each and $tu + sv = 3$ (do you see why?), we try $t = u = 2, s = 1, v = -1$. This works (of course, this isn't always true of your first guess), so the factored form of our quadratic is $(x + 2)(2x - 1)$, and the desired $x$ are $\mathbf{-2}$ and $\mathbf{1/2}$.

---

**EXERCISE 6-2** Find the solutions to the following equations:

i. $x^2 = -5x - 6$.

ii. $x^2 - 3x - 40 = 0$.

iii. $2x^2 + \tfrac{1}{3}x - \tfrac{2}{3} = 0$.

🪡 iv. $49x^2 - 316x + 132 = 0$. If you can factor this successfully, you have probably mastered the art of factoring.

v. $x = \dfrac{28}{x - 3}$.

---

🪡 **EXERCISE 6-3** When factoring the quadratic $x^2 + bx + c$, where $b$ and $c$ are integers, why do we not consider the case where $u$ and $v$ in the factored form $(x + u)(x + v)$ are fractions?

---

There are three special factorizations which you should learn and be able to recognize easily.

1. *Equations in which one root is zero.* Because the product of the roots is zero, the constant term is zero. Thus, these equations always look like $ax^2 + bx = 0$. Factoring these is very easy, as we just write $ax^2 + bx = x(ax + b) = 0$.

2. *Equations of the form* $x^2 - a^2 = 0$. These factor as $(x - a)(x + a) = 0$. (Multiply it out yourself and see.) These can also be solved by rearranging the equation and taking the square root: $x^2 = a^2$, so $x = \pm\sqrt{a^2} = \pm a$.

3. *Perfect squares.* The square of $(x + a)$ is $(x + a)^2 = x^2 + 2ax + a^2$. These are usually the hardest to recognize.

---

**EXAMPLE 6-4** Consider the following examples of the above factorizations:

i. $5x^2 - 3x = x(5x - 3)$.

ii. $4x^2 - 9 = (2x + 3)(2x - 3)$. This one is a bit tricky. Compare it to the second form above and notice that $4x^2$ is a perfect square of $2x$.

iii. $x^2 + 6x + 9 = (x + 3)^2$.

iv. $4x^2 + 12x + 9 = (2x + 3)^2$. Another tricky one. Compare this to the third form above, putting $2x$ in place of $x$ and 3 in place of $a$.

---

**EXERCISE 6-4** Solve each of the following equations.

| | |
|---|---|
| i. $3x^2 + 5x = 0$ | ii. $3x^2 + 6x + 3 = 0$ |
| iii. $5x^2 - 45 = 0$ | iv. $\dfrac{x^2}{3} - 2x + 3 = 0$ |
| v. $4x^2 = 5x$ | vi. $36 - 25x^2 = 0$ |


<!-- PDF page 70 / book page 56 -->

## 6.3 The Quadratic Formula

Unfortunately, not all quadratic equations have nice simple roots like 1 or $-2$. Indeed, not all quadratic equations can be factored easily. For example, try to find all solutions to $x^2 + x - 1 = 0$. It shouldn't take you too long to convince yourself that factoring isn't going to get you far. Hence, we look for a *general* way to find the solutions to quadratic equations, which avoids the limitations of factoring.

We have already seen that it is pretty easy to solve linear equations, so if we could somehow make the quadratic equation into a linear equation, then we could solve it. Since quadratic equations have a squared term, it seems the easiest way to do this would be to take square roots. Let's try:

$$ax^2 = -bx - c,$$

so

$$\sqrt{a}\, x = \sqrt{-bx - c}.$$

Unfortunately, this is not a linear equation because of the $x$ in the $\sqrt{-bx - c}$. What we really need to do is to manipulate the given quadratic into the form $x^2 + 2xm + m^2$, because we know how to take the square root of that (remember special factorization 3 on page 55). This method is called **completing the square**.

Our first step is to get rid of the coefficient of $x^2$. Dividing the equation by $a$ gives

$$x^2 + \frac{b}{a}x + \frac{c}{a} = 0.$$

To complete the square, we will need a new constant term. So we first move the old constant term to the other side of the equation, to get

$$x^2 + \frac{b}{a}x = -\frac{c}{a}.$$

We now need to find a constant term which will yield the form $x^2 + 2xm + m^2$. The coefficient of $x$, or $2m$, needs to be halved, then squared, to get the constant term, $m^2$. In our quadratic, this $x$ coefficient is $b/a$, so we add $(b/2a)^2$ to each side, yielding

$$x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} = -\frac{c}{a} + \frac{b^2}{4a^2}.$$

(If you aren't convinced that the left side of this equation is a perfect square, multiply out the expression below and see for yourself.) Now our equation is

$$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}.$$

Taking the square root of both sides of the equation (remembering that we want both the positive and negative roots), we have

$$x + \frac{b}{2a} = \pm \frac{\sqrt{b^2 - 4ac}}{2a}.$$


<!-- PDF page 71 / book page 57 -->

As advertised, this is just a linear equation! Solving then yields

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.$$

This is the **quadratic formula**. Don't be confused by the $\pm$ sign; it simply means that there are two solutions to the equation. To get them both, you use the positive sign for one and the negative sign for the other.

To make sure you understand this proof, close the book after reading through the proof a few times and try to re-create the proof. It is important that you understand completing the square as a general solution technique, as it is useful for various other types of problems.

Using the quadratic formula is quite simple. Returning to our introductory example, $x^2 + x - 1 = 0$, the solutions are

$$x = \frac{-1 \pm \sqrt{1 + 4}}{2} = \frac{-1 \pm \sqrt{5}}{2}.$$

As you can see, you would have a hard time guessing these roots using the trial and error method; the roots are not even rational.

If a quadratic has real coefficients, we can immediately tell whether the roots are real or imaginary by considering the **discriminant** of the equation. Consider the quadratic formula again. If $a$, $b$, and $c$ are real, where can imaginary quantities enter? Only through the $\sqrt{b^2 - 4ac}$ term, which is imaginary when $b^2 - 4ac < 0$ and real when $b^2 - 4ac \geq 0$. The quantity $b^2 - 4ac$ is called the discriminant. To reiterate, *if the discriminant is negative, the roots are imaginary, and if it is positive, the roots are real.*

Moreover, if the discriminant is 0, the two roots of the quadratic are the same, and equal to

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \frac{-b \pm 0}{2a} = \frac{-b}{2a}.$$

---

**EXAMPLE 6-5** Find the roots of $3x^2 + x + 4$.

*Solution:* Just plug the coefficients into the quadratic formula:

$$x = \frac{-1 \pm \sqrt{1 - 4(3)(4)}}{2(3)} = \mathbf{\frac{-1 \pm i\sqrt{47}}{6}}.$$

Try using trial and error to arrive at those solutions.

---

We see that in the above example, the roots are complex conjugates. This is no fluke. How does the quadratic formula suggest this?

👁 Whenever the roots of a quadratic equation with real coefficients are imaginary, they are conjugates. Furthermore, if the quadratic has rational coefficients and $x + y\sqrt{z}$ is a root, then $x - y\sqrt{z}$ must also be a root.


<!-- PDF page 72 / book page 58 -->

👁 **EXAMPLE 6-6** Prove that if one of the roots of a quadratic with real coefficients is imaginary, then the two roots of the quadratic are complex conjugates.

*Proof:* As we have seen, one of the roots is imaginary only if $b^2 - 4ac < 0$. From the quadratic formula, the roots of $ax^2 + bx + c = 0$ are

$$-\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a} = -\frac{b}{2a} \pm \frac{\sqrt{-1}\sqrt{4ac - b^2}}{2a} = -\frac{b}{2a} \pm \frac{\sqrt{4ac - b^2}}{2a}\, i.$$

This final expression of the roots is a pair of complex conjugates; thus, the roots are complex conjugates if $b^2 - 4ac < 0$.

---

👁 **EXERCISE 6-5** Given that $x$, $y$, and $z$ are rational and $\sqrt{z}$ is not, show that if $x + y\sqrt{z}$ is a root of a quadratic with rational coefficients, then $x - y\sqrt{z}$ is also a root.

---

These two facts are *very* important. If ever we know one of the roots of a quadratic with rational coefficients and it is imaginary or irrational, then we immediately know the other root!

If so many quadratic equations cannot be solved using trial and error, then why should you bother learning how to factor quadratic equations without using the quadratic formula? The answer is simple: speed. It is much faster to factor than to plod through the quadratic formula (as long as the equation is factorable!). With some practice, you will learn to distinguish those quadratics you can factor from those you can't.

Do you actually have to memorize that awful equation? The truth is that after you use the formula enough, you'll memorize it whether you want to or not. More important than the formula itself is how it is derived and why it works. If you know how to derive the equation, you can figure out the formula if you happen to forget it. You can also use the method of completing the square to solve other types of problems.

---

**EXAMPLE 6-7** If one root of $x^2 + bx + c = 0$ is $3 + \sqrt{2}$, find $b$ and $c$.

*Solution:* Since $3 + \sqrt{2}$ is a root, $3 - \sqrt{2}$ is also a root. Thus, the quadratic is

$$\left(x - (3 + \sqrt{2})\right)\left(x - (3 - \sqrt{2})\right) = x^2 - 6x + 7.$$

Hence $b = \mathbf{-6}$ and $c = \mathbf{7}$. (Can you use the result of the next exercise to avoid performing the above product to answer this problem?)

---

👁 **EXERCISE 6-6** Use the quadratic formula to show that the sum of the roots of $ax^2 + bx + c$ is $-b/a$ and that the product of the roots is $c/a$.

---

**EXERCISE 6-7** Solve the following equations.

| | |
|---|---|
| i. $x^2 + 3x + 1 = 0$ | ii. $4x^2 - x + 7 = 0$ |
| iii. $z^2 - 4/3 = z$ | iv. $0.2 - 0.1z^2 = z$ |

---

🪡 **EXERCISE 6-8** Given that $x^3 + 3x^2 + 3x + 1 = (x + 1)^3$, find all real $x$ such that $x^3 + 3x^2 + 3x = 1$.


<!-- PDF page 73 / book page 59 -->

## 6.4 Variations on a Theme

Not all quadratic equations look like $ax^2 + bx + c = 0$. In this section, we will work a series of examples to show you other forms of quadratic equations and how to solve them. These can generally be divided into two categories, rearrangement problems and substitution problems. The former can be solved by manipulating the equation into quadratic form through multiplications and other operations; the latter can be made into a quadratic with a clever substitution. Although these substitutions are sometimes difficult to see, the problem is usually easy to solve once you've got the substitution.

### 6.4.1 Rearrangements

These problems generally involve variables in denominators of fractions or as the argument of a square root.

---

**EXAMPLE 6-8** Find all $y$ such that $1 + \dfrac{y + 3}{y - 2} = \dfrac{3y - 3}{6 - y}$.

*Solution:* Variables in the denominator of fractions are difficult to deal with, so it is usually best to multiply both sides by any expressions which appear in any denominator. We thus obtain

$$(6 - y)(y - 2)\left(1 + \frac{y + 3}{y - 2}\right) = (6 - y)(y - 2)\left(\frac{3y - 3}{6 - y}\right);$$

then multiplying out yields

$$(6 - y)(y - 2) + (6 - y)(y - 2)\frac{y + 3}{y - 2} = (y - 2)(3y - 3),$$

or

$$-2y^2 + 11y + 6 = 3y^2 - 9y + 6.$$

Rearranging this last equation yields $5y^2 - 20y = 0$, from which we find that our solutions are $y = 0$ and $y = 4$. We are not quite done yet, though; we must make sure that neither of these solutions causes any denominator to be zero. If one of these does cause the denominator to be zero, that solution must be discarded as an **extraneous root**, which is a solution that does not satisfy the original equation. This is not the case for either of our solutions, so $\mathbf{4}$ and $\mathbf{0}$ are our answers.

---

**EXAMPLE 6-9** Find all $x$ such that $\sqrt{x + 3} + 4 = \sqrt{8x + 1}$.

*Solution:* We must do something to get rid of the radical signs. Squaring the equation is generally a good way to do this:

$$
\begin{aligned}
(\sqrt{x + 3} + 4)^2 &= (\sqrt{8x + 1})^2 \\
(x + 3) + 2(4)(\sqrt{x + 3}) + 16 &= 8x + 1 \\
x + 19 + 8\sqrt{x + 3} &= 8x + 1.
\end{aligned}
$$


<!-- PDF page 74 / book page 60 -->

We still have a radical sign, but if we move all the other terms to the other side, we can square the resulting equation and get rid of the radical. Rearranging gives $8\sqrt{x + 3} = 7x - 18$, and squaring this equation gives

$$
\begin{aligned}
64(x + 3) &= 49x^2 - 2(18)(7x) + 324 \\
64x + 192 &= 49x^2 - 252x + 324.
\end{aligned}
$$

Rearranging yields $49x^2 - 316x + 132 = 0$, and factoring this result gives $(x - 6)(49x - 22) = 0$. Thus our solutions are $x = 6$ and $x = 22/49$.

Once again, we are not done; we must check for extraneous solutions. Substituting $x = 6$ in the equation yields $3 + 4 = 7$, which is fine. However, when we plug in the second solution, we reach the erroneous conclusion that $13/7 + 4 = 15/7$. How did this happen?

The problem occurred because $-13/7$ squared is also equal to $x + 3$ when $x = 22/49$. Then the equation reads $-13/7 + 4 = 15/7$, which is fine. However, when working problems in which the radical sign is already present *the positive value of the radical is implied*. Thus $x = 22/49$ is an extraneous solution and the only answer is $x = \mathbf{6}$.

As we see here, the general procedure for solving equations with square roots involved is to manipulate the equation to isolate a radical, then square to get rid of the radical (repeating if there is more than one radical to deal with). We then solve the equation, not forgetting to check that all solutions do indeed 'work'.

---

**EXAMPLE 6-10** Find all pairs $(x, y)$ such that $x + y = xy = 2$.

*Solution:* Since $x + y = 2$, we have $x = 2 - y$. Since $xy = 2$, we then find

$$xy = (2 - y)y = 2y - y^2 = 2,$$

so $y^2 - 2y + 2 = 0$. Using the quadratic formula, we find

$$y = \frac{2 \pm 2i}{2} = 1 \pm i.$$

Now, we use $x = 2 - y$ to find the $x$ corresponding to each $y$. Thus, our solutions are $\mathbf{(1 - i, 1 + i)}$ and $\mathbf{(1 + i, 1 - i)}$.

---

**EXAMPLE 6-11** Note that in the prior exercise, if we let $x$ and $y$ be the roots of the quadratic $z^2 + az + b = 0$, we can determine that $a = -(x + y) = -2$ and $b = xy = 2$. Thus, $x$ and $y$ are the solutions of $z^2 - 2z + 2 = 0$ and hence are $1 + i$ and $1 - i$ as we found above.

---

**EXERCISE 6-9** Find all $z$ such that $\sqrt{5z + 5} - \sqrt{3 - 3z} - 2\sqrt{z} = 0$.

---

### 6.4.2 Substitutions

In substitution problems, an expression, like $3^x$, and the square of the expression, like $3^{2x}$, appear in the same equation. Substituting another variable for the expression, like $y = 3^x$, makes a quadratic in the new variable. We solve for the new variable ($y$), then find the original unknown ($x$) from our definition for the new one.


<!-- PDF page 75 / book page 61 -->

**EXAMPLE 6-12** Find all real $n$ such that $1 + 2^n + 2^{2n} = 73$. *(MAΘ 1987)*

*Solution:* Here, our expression is $2^n$ and its square is $2^{2n}$. Thus, let $x = 2^n$, so $x^2 = 2^{2n}$. The equation is then $1 + x + x^2 = 73$. Rearranging and factoring gives $(x + 9)(x - 8) = 0$, so $x = -9$ and $x = 8$. Substituting these into our expressions for $n$ yields $-9 = 2^n$, which has no solution, and $8 = 2^n$, for which $n = 3$. Thus $n = \mathbf{3}$ is the only solution.

---

**EXAMPLE 6-13** Find all $x$ such that $x^4 + 3x^2 - 4 = 0$.

*Solution:* The variable is $x^2$ and its square is $x^4$. Letting $z = x^2$, we have $z^2 + 3z - 4 = (z + 4)(z - 1) = 0$. Thus our solutions are $z = 1$ and $z = -4$. Going back to $x$, we find $x^2 = 1$, which has the solutions $x = \mathbf{\pm 1}$, or $x^2 = -4$, which has the solutions $x = \mathbf{\pm 2i}$. These are all valid solutions.

What if we were to change the problem to $x^4 + 3x^2 + x - 4 = 0$? The expression $x^2$ and its square are still present, but there is also a third expression in terms of $x$ which is neither the original expression nor its square. Thus, we cannot rewrite the equation as a quadratic.

---

**EXERCISE 6-10** Find all real values of $x$ which satisfy $\sqrt{x^2 + 1} + x^2 + 1 = 90$. *(MAΘ 1991)*

---

## 6.5 Square Roots of Irrationals and Imaginaries

Recalling the expansion $(x + y)^2 = x^2 + 2xy + y^2$, it should be clear how to square expressions like $1 + \sqrt{3}$ and $1 - 2i$. For example,

$$(1 + \sqrt{3})^2 = 1^2 + 2(1)(\sqrt{3}) + (\sqrt{3})^2 = 4 + 2\sqrt{3}.$$

However, what if we were instead asked to find $\sqrt{4 + 2\sqrt{3}}$? From the above expansion, we know the answer is $1 + \sqrt{3}$, but how would we have determined this starting from scratch? As in solving quadratic equations, there is a guesswork method (like factoring) for simple cases and a rigorous method (like the quadratic formula) for more difficult ones.

When asked to find $\sqrt{a + b\sqrt{c}}$, where $a$, $b$, and $c$ are integers, our biggest helping hint is the $b\sqrt{c}$ term. If $c$ is prime, we know one of the terms in our square root has $\sqrt{c}$ and the other is a constant. For example, in determining $\sqrt{4 + 2\sqrt{3}}$, we know the result is of the form $x + y\sqrt{3}$ because 3 is prime.

Thus, if $c$ is prime, $\sqrt{a + b\sqrt{c}}$ will take the form $x + y\sqrt{c}$ for some $x$ and $y$. How do we find $x$ and $y$? Squaring, we obtain

$$(x + y\sqrt{c})^2 = x^2 + cy^2 + 2xy\sqrt{c} = a + b\sqrt{c},$$

and matching the terms up yields the system

$$
\begin{aligned}
2xy &= b \\
x^2 + cy^2 &= a.
\end{aligned}
$$

Our task, then, is to solve the system for $x$ and $y$.


<!-- PDF page 76 / book page 62 -->

Here is where our two methods diverge. If $b$ has a small number of factors, we can use the first equation to guess at $x$ and $y$, then substitute the guesses into the second equation to see if the guesses are right. However, if $b$ has a large number of factors, or if $x$ and $y$ are complicated irrational forms rather than nice integers, trial and error could take a very long time. In these cases, we need to solve the equations the hard way.

---

**EXAMPLE 6-14** Find $\sqrt{34 - 24\sqrt{2}}$.

*Solution:* We know the answer is of the form $x + y\sqrt{2}$. Since $(x + y\sqrt{2})^2 = x^2 + 2xy\sqrt{2} + 2y^2 = 34 - 24\sqrt{2}$, the system we need to solve is

$$
\begin{aligned}
xy &= -12 \\
x^2 + 2y^2 &= 34.
\end{aligned}
$$

First let's try trial and error. We write down pairs $(x, y)$ such that $xy = -12$, looking for a pair which satisfies the second equation, $x^2 + 2y^2 = 34$. We try $(1, -12)$, but it fails, as does $(6, -2)$. Finally we try $(4, -3)$, which succeeds, so $(4 - 3\sqrt{2})^2 = 34 - 24\sqrt{2}$.

However, $-(4 - 3\sqrt{2})$ is also a square root of $34 - 24\sqrt{2}$. Which of the two do we want? Recall that the positive square root is implied in the expression $\sqrt{34 - 24\sqrt{2}}$. Since

$$18 = (3\sqrt{2})^2 > 4^2 = 16,$$

💣 we see that $3\sqrt{2} > 4$, so $\mathbf{-4 + 3\sqrt{2} > 0}$ and this is the desired answer. **WARNING:** When finding the square root of an irrational, always make sure you have a positive answer.

Since 12 has many factors, we may wish to solve the equations for $(x, y)$, rather than resorting to guesswork. We write $y = -12/x$ and substitute this in the second equation, yielding $x^2 + 2(-12/x)^2 = 34$, so $x^2 + 288/x^2 = 34$. Multiplying by $x^2$ and rearranging, we have

$$x^4 - 34x^2 + 288 = 0.$$

We can factor this as a quadratic (if you don't see this, let $z = x^2$), giving $(x^2 - 16)(x^2 - 18) = 0$. Since we want $x$ to be an integer, $x = \pm 4$. For each of these we find $y$, generating the same two solutions as before. What would happen if we tried $x = \pm 3\sqrt{2}$, the other solutions to the equation for $x$?

---

What if $c$ is not prime, as in $\sqrt{5 + 2\sqrt{6}}$? We first try answers of the form $x + y\sqrt{c}$ ($x + y\sqrt{6}$ in the example), but we are no longer assured that this will work. The answer may be of the form $x\sqrt{w} + y\sqrt{z}$, where $c = zw$. For example, to find $\sqrt{5 + 2\sqrt{6}}$, if we first try expressions of the form $x + y\sqrt{6}$, we won't find the answer. When we consider expressions of the form $x\sqrt{2} + y\sqrt{3}$, we have

$$(x\sqrt{2} + y\sqrt{3})^2 = 2x^2 + 3y^2 + 2xy\sqrt{6}.$$

Now, we're back in common territory, looking for $x$ and $y$ such that $2xy = 2$ and $2x^2 + 3y^2 = 5$. Either by trial and error or direct solution, we find $(x, y) = (1, 1)$, so $\sqrt{5 + 2\sqrt{6}} = \sqrt{2} + \sqrt{3}$.


<!-- PDF page 77 / book page 63 -->

For imaginary numbers, our search is very similar to that for irrationals. We know the square root of the complex number $a + bi$ is of the form $x + yi$. Thus,

$$(x + yi)^2 = x^2 - y^2 + 2xyi = (\sqrt{a + bi})^2 = a + bi.$$

Equating imaginary parts, $2xy = b$; equating real parts, $x^2 - y^2 = a$. Again we have a system to solve for $(x, y)$.

---

**EXAMPLE 6-15** Find $\sqrt{5 - 12i}$.

*Solution:* Let $\sqrt{5 - 12i} = a + bi$. Thus

$$(a + bi)^2 = a^2 - b^2 + 2abi = 5 - 12i,$$

so we get the system

$$
\begin{aligned}
2ab &= -12 \\
a^2 - b^2 &= 5.
\end{aligned}
$$

Solving the equations without trial and error, we write $b = -6/a$ and $a^2 - 36/a^2 = 5$. From the latter equation, we have $a^4 - 5a^2 - 36 = (a^2 - 9)(a^2 + 4)$. Since we want $a$ to be real, $a = \pm 3$. Using this to find $b$, we get the two solutions $\mathbf{\pm(3 - 2i)}$. Since there is no distinction between "positive" and "negative" for imaginary numbers, the two solutions are equally valid. (What would happen if we let $a = \pm 2i$? Try it!)

In this particular case, trial and error is just as good an approach as direct solving. From $ab = -6$, we try $(6, -1)$, which fails (because $6^2 - (-1)^2 = 35$, not 5), then $(3, -2)$, which succeeds. Thus $\sqrt{5 - 12i} = 3 - 2i$. As before, $-3 + 2i$ also works.

---

**EXERCISE 6-11** Evaluate the following.

i. $\sqrt{35 - 10\sqrt{10}}$

ii. $\sqrt{55 - 10\sqrt{10}}$

iii. $\sqrt{15 + 8i}$

---

It is important to note that irrational and imaginary numbers don't always have nice neat square roots—for example, try to find $\sqrt{1 + \sqrt{2}}$. However, when we are asked on a test to find a square root of a particular irrational or imaginary number, chances are that the problem will have a simple answer.

---

## 6.6 Beyond Quadratics

We have covered linear equations, in which the unknown quantity is raised only to the first power, and quadratics, in which the unknown is raised to the first and second powers. However, these are only the tip of the iceberg. One can consider expressions with any power of the unknown quantity whatsoever, like

$$x^{17} + 38x^{11} + 12x^{10} - 76x^4 + 123.$$


<!-- PDF page 78 / book page 64 -->

Expressions like this, which are the sum of constants times positive integral powers of $x$ (or any other variable), are called **polynomials**.

We won't examine polynomials in any detail here, because solving them is much harder than solving linear equations and quadratics. However, polynomials *do* have solutions. As with quadratics, the solutions are called **roots**. A polynomial, like a quadratic, can be factored into linear expressions involving its roots, though there will be more such factors. For example, a polynomial with roots $1, 2, 3, \ldots, 17$ could be written in factored form as

$$(x - 1)(x - 2)(x - 3) \cdots (x - 17).$$

A polynomial of degree three is called a **cubic**, and a polynomial of degree four is called a **quartic**.

---

# Problems to Solve for Chapter 6

**110.** What is the positive difference of the roots of $x^2 - 7x - 9$? *(AHSME 1952)*

**111.** Find all the solutions of

$$\sqrt{x + 10} - \frac{6}{\sqrt{x + 10}} = 5.$$

*(AHSME 1953)*

**112.** For all values other than $x = -1$ and $x = 2$, what is the value of

$$\frac{2x^2 - x}{(x + 1)(x - 2)} - \frac{4 + x}{(x + 1)(x - 2)}?$$

*(AHSME 1954)*

**113.** Find all values of $z$ such that $\dfrac{z}{z - 1} = \dfrac{z + 1}{z} - 2$.

**114.** Find $\sqrt{-27 + 36i}$.

**115.** If $9n^2 - 30n + c$ is a perfect square for all integers $n$, what is the value of $c$? *(MATHCOUNTS 1989)*

**116.** Find all pairs $(a, b)$ such that $2a + b = 12$ and $ab = 3$.

**117.** When there is no wind, a plane traveling at a constant rate can cover the 1000 kilometer round-trip distance from $A$ to $B$ and back in 10 hours. If the wind blows from $A$ toward $B$ at $k$ km/hr, it adds 25 minutes to the round trip. Find $k$. *(MAΘ 1990)*

**118.** Find $2x + 5$ if $x$ satisfies $\sqrt{40 - 9x} - 2\sqrt{7 - x} = \sqrt{-x}$. *(MAΘ 1991)*

**119.** How many roots does $x - \dfrac{7}{x - 3} = 3 - \dfrac{7}{x - 3}$ have? *(AHSME 1960)*

**120.** What is the sum of the solutions of $2x^{-2} + x^{-1} - 1 = 0$? *(MAΘ 1991)*

**121.** About the equation $ax^2 - 2x\sqrt{2} + c = 0$, with $a$ and $c$ real constants, we are told that the discriminant is zero. Which of the following must the roots be: integral, rational, irrational, imaginary, real? *(AHSME 1956)*


<!-- PDF page 79 / book page 65 -->

**122.** Which of the following statements are *not* true for the equation $ix^2 - x + 2i = 0$?

(A) The sum of the roots is 2.
(B) The discriminant is 9.
(C) The roots are imaginary.
(D) The roots can be found by using the quadratic formula.
(E) The roots can be found by factoring, using imaginary numbers.

*(AHSME 1959)*

**123.** Solve for $x$: $\dfrac{3^{x^2}}{3^{3x}} = \dfrac{1}{9}$. *(MATHCOUNTS 1990)*

**124.** For a given value of $k$ the product of the solutions of $x^2 - 3kx + 2k^2 - 1 = 0$ is 7. Are the roots rational, irrational, or imaginary? *(AHSME 1960)*

**125.** In a 10 mile race, Janet covered the first 2 miles at a constant rate. She then sped up and rode her bike the last 8 miles at a rate that was 0.5 miles per minute faster. Janet's overall time would have been 2 minutes faster had she ridden her bike the whole race at the faster pace. What was Janet's average speed (in miles per minute) for the whole race? *(MAΘ 1990)*

**126.** Solve for $x$: $\sqrt{x + \sqrt{x + 11}} + \sqrt{x - \sqrt{x + 11}} = 4$. *(MAΘ 1991)*

**127.** Find the sum of the solutions of the equation $8^{x^2 + 3x + 10} = 4^{x^2 - x}$. *(MAΘ 1992)*

**128.** What is the sum of the roots of the equation $(x^2 - 3x)^2 - (3x^2 - 9x) = 4$? *(MAΘ 1991)*

**129.** Two students attempted to solve a quadratic equation, $x^2 + bx + c = 0$. Although both students did the work correctly, the first miscopied the middle term and obtained the solution set $\{-6, 1\}$. The second student miscopied the constant term and obtained the solution set $\{2, 3\}$. What are the correct solutions? *(MAΘ 1992)*

**130.** Find all solutions to the equation $x + \sqrt{x - 2} = 4$. *(AHSME 1950)*

**131.** Show that if the expression $21x^2 + ax + 21$ can be factored into two linear prime binomial factors with integer coefficients, then $a$ must be even. *(AHSME 1951)*

**132.** Find $\sqrt{53 - 8\sqrt{15}}$.

**133.** Find all $z$ such that $9^{z - 1} - 3^{z - 1} - 2 = 0$.

**134.** Without using the quadratic formula, show that the sum of the roots of $ax^2 + bx + c$ is $-b/a$ and that the product of these roots is $c/a$.

**135.** What quadratic polynomial with one as the coefficient of $x^2$ has roots which are the complex conjugates of the solutions of $x^2 - 6x + 11 = 2xi - 10i$? *(MAΘ 1990)*

🪡 **136.** Evaluate $\sqrt{10 - 4i\sqrt{6}}$.

🪡 **137.** Show that if $a$ and $b$ are such that

$$\frac{a + b}{a} = \frac{b}{a + b},$$

then $a$ and $b$ cannot both be real. *(AHSME 1960)*


<!-- PDF page 80 / book page 66 -->

> ## *the BIG PICTURE*
>
> There exists a formula like the quadratic formula for cubic equations! Developed in the mid-1500's by Tartaglia or Cardano (there is still some controversy as to who was first), the derivation is simple, but extremely clever.
>
> Starting with a general cubic equation $x^3 + ax^2 + bx + c = 0$ (where we have already divided out the leading coefficient), we can substitute $y = x + a/3$, which will cause the coefficient of $y^2$ to become zero, leaving us with
>
> $$y^3 + dy + e = 0$$
>
> for some new $d$ and $e$. (Can you verify that the $y^2$ term does indeed vanish?)
>
> The new equation is solved by taking
>
> $$y = \sqrt[3]{u} - \sqrt[3]{v}$$
>
> for properly chosen $u$ and $v$. If you substitute this $y$ into the equation $y^3 + dy + e = 0$ and manipulate the result a little, you should find that $u$ and $v$ which satisfy the system
>
> $$
> \begin{aligned}
> v - u &= e \\
> uv &= d^3/27
> \end{aligned}
> $$
>
> will solve the problem; the system can then be solved as an ordinary quadratic. The formula is pretty hideous, and certainly not useful enough to remember, but the derivation is very beautiful, and you are encouraged to fill in the missing steps.
>
> Smart methods also exist to find the solutions of a general quartic (fourth-degree polynomial) by bringing it down to a cubic, but for the fifth and higher degrees there exists none! Such a method was proven not to exist in the 1800's by Galois, using the methods of abstract algebra (see page 210).


