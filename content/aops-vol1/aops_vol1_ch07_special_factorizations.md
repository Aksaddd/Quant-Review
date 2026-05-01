# Chapter 7 — Special Factorizations and Clever Manipulations ⭐

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 81–88. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 81 / book page 67 -->

# Chapter 7

# *Special Factorizations and Clever Manipulations*

## 7.1 Factorizations

Evaluate $12^2 - 8^2$. This is simple; just do the arithmetic to get $144 - 64 = 80$. How about $102^2 - 98^2$? Considerably more time consuming, but we can find the squares and subtract, $10404 - 9604 = 800$. All right, try $100002^2 - 99998^2$. Squaring and subtracting would take quite a while. Luckily, there is a better way. Recall from page 55 the factorization

$$x^2 - a^2 = (x - a)(x + a).$$

Applying the factorization, we can skip the arithmetic and get

$$100002^2 - 99998^2 = (100002 - 99998)(100002 + 99998) = 4(200000) = 800000.$$

Slick uses of factorizations are not confined to problems involving squares. There are also standard factorizations for sums and differences of cubes as well. Here are a handful of special factorizations that all students should know.

---

1. **Difference of squares:**

$$a^2 - b^2 = (a - b)(a + b).$$

2. **Sum of squares:**

$$a^2 + b^2 = (a + b)^2 - 2ab.$$

3. **Difference of cubes:**

$$a^3 - b^3 = (a - b)(a^2 + ab + b^2).$$

4. **Sum of cubes:**

$$a^3 + b^3 = (a + b)(a^2 - ab + b^2).$$


<!-- PDF page 82 / book page 68 -->

The first two of these we have seen before in our discussion of factoring quadratic equations on page 55. The second isn't exactly a factorization, as we don't express the sum of squares as a product of factors. However, it is an important enough relation that it shouldn't be ignored; it is often useful in solving problems. When asked to factor an expression, however, you may write $x^2 + 2xy + y^2 = (x + y)^2$, but you would not write $x^2 + y^2 = (x + y)^2 - 2xy$ unless this could help you factor the expression further. It may often do just that, as in

$$x^4 + y^4 + x^2 y^2 = (x^2 + y^2)^2 - 2x^2 y^2 + x^2 y^2 = (x^2 + y^2)^2 - (xy)^2,$$

which can then be factored as the difference of squares, yielding $(x^2 + y^2 - xy)(x^2 + y^2 + xy)$.

---

**EXAMPLE 7-1** Show that $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$.

*Proof:* Expanding the right side above yields:

$$
\begin{aligned}
(a - b)(a^2 + ab + b^2) &= a(a^2 + ab + b^2) - b(a^2 + ab + b^2) \\
&= a^3 + a^2 b + ab^2 - a^2 b - ab^2 - b^3 \\
&= a^3 - b^3.
\end{aligned}
$$

It is easy to confuse the factorizations of the sum and difference of cubes. One easy way to remember which is which is that the sign in the expression involving cubes is the same as the sign in the *linear* term of the factored expression.

---

**EXERCISE 7-1** Show that $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.

---

Using special factorizations in problems involving sums and differences of squares and cubes is generally quite easy, but how did we ever come up with them? We saw the two involving squares in our discussion of quadratic equations, so let's focus on the two involving cubes.

We discussed in our chapter on quadratics that for every root of an expression, there is a factor of that expression. For example, since $x = 1$ is a root of $x^2 - 1$, $(x - 1)$ is a factor of $x^2 - 1$. Now consider the equation $a^3 - b^3 = 0$. Can you think of any roots? The obvious choice is $a = b$, for when $a = b$, $a^3 - b^3 = a^3 - a^3 = 0$. Since $a = b$ is a root, $a - b$ is a factor. Thus there is some expression, call it $f(a, b)$, such that $a^3 - b^3 = (a - b)[f(a, b)]$. We can determine this expression by noting that the result of the product $(a - b)[f(a, b)]$ must be $a^3 - b^3$. Hence, $f(a, b)$ has a term which is $a^2$ (since $(a)(a^2) = a^3$) and a term $b^2$. Let's try $f(a, b) = a^2 + b^2$:

$$(a - b)(a^2 + b^2) = a^3 + ab^2 - ba^2 - b^3.$$

Not quite right; we have two extra terms. How do we get rid of the $ab^2$ term? We can do this by including $ab$ in our expression for $f(a, b)$, because $(-b)(ab) = -ab^2$, which cancels with $ab^2$. Let's try it:

$$(a - b)(a^2 + ab + b^2) = a^3 + a^2 b + ab^2 - ba^2 - ab^2 - b^3 = a^3 - b^3.$$

💣 Yes! We have found our factorization. Try factoring $a^3 + b^3$ by noting that $a = -b$ is a root of $a^3 + b^3 = 0$.

**WARNING:** Special factorizations can be cleverly hidden in problems by requiring you to use them *backwards*, where instead of the sum or difference of squares or cubes appearing, one of the factors appears in the problem and you must multiply by the other to obtain the sum or difference and ultimately solve the problem. These are usually pretty obvious when the problem is in terms of variables; expressions like $x^2 + xy + y^2$ are tough to miss. They become less obvious, though, when written in terms of numbers, like $\sqrt{5} - \sqrt{3}$ or $\sqrt[3]{4} + \sqrt[3]{2} + \sqrt[3]{1}$.


<!-- PDF page 83 / book page 69 -->

**EXAMPLE 7-2** If $\dfrac{1}{a + c} = \dfrac{1}{a} + \dfrac{1}{c}$, find $(a/c)^3$. *(Mandelbrot #1)*

*Solution:* Variables in denominators are difficult to work with, so we multiply by $ac(a + c)$ first, which leaves

$$ac = c(a + c) + a(a + c).$$

Rearranging this yields $a^2 + ac + c^2 = 0$. Now we seem stuck, unless we note that $a^2 + ac + c^2$ is a factor of $a^3 - c^3$. Since $(a - c)$ is the other factor, we multiply both sides by it:

$$(a^2 + ac + c^2)(a - c) = a^3 - c^3 = 0.$$

Thus $a^3 = c^3$ and $a^3/c^3 = \mathbf{1}$.

---

**EXAMPLE 7-3** Find the sum

$$\frac{1}{3 + 2\sqrt{2}} + \frac{1}{2\sqrt{2} + \sqrt{7}} + \frac{1}{\sqrt{7} + \sqrt{6}} + \frac{1}{\sqrt{6} + \sqrt{5}} + \frac{1}{\sqrt{5} + 2} + \frac{1}{2 + \sqrt{3}}.$$

*Solution:* We could rationalize each denominator separately, but that would take a while. Instead, let's look at the sum with all numbers under radical signs (for example, writing $\sqrt{9}$ rather than 3):

$$\frac{1}{\sqrt{9} + \sqrt{8}} + \frac{1}{\sqrt{8} + \sqrt{7}} + \frac{1}{\sqrt{7} + \sqrt{6}} + \frac{1}{\sqrt{6} + \sqrt{5}} + \frac{1}{\sqrt{5} + \sqrt{4}} + \frac{1}{\sqrt{4} + \sqrt{3}}.$$

A pretty clear pattern exists. Consider $\sqrt{9} + \sqrt{8}$. If we multiply by $\sqrt{9} - \sqrt{8}$, we have

$$(\sqrt{9} + \sqrt{8})(\sqrt{9} - \sqrt{8}) = (\sqrt{9})^2 - (\sqrt{8})^2 = 9 - 8 = 1.$$

Thus, the reciprocal of $\sqrt{9} + \sqrt{8}$ is $\sqrt{9} - \sqrt{8}$! Writing $1/(\sqrt{9} + \sqrt{8}) = \sqrt{9} - \sqrt{8}$ and doing similarly for the other expressions, we have

$$
\begin{aligned}
&\frac{1}{\sqrt{9} + \sqrt{8}} + \frac{1}{\sqrt{8} + \sqrt{7}} + \frac{1}{\sqrt{7} + \sqrt{6}} + \frac{1}{\sqrt{6} + \sqrt{5}} + \frac{1}{\sqrt{5} + \sqrt{4}} + \frac{1}{\sqrt{4} + \sqrt{3}} \\
&\quad = \sqrt{9} - \sqrt{8} + \sqrt{8} - \sqrt{7} + \sqrt{7} - \sqrt{6} + \sqrt{6} - \sqrt{5} + \sqrt{5} - \sqrt{4} + \sqrt{4} - \sqrt{3}.
\end{aligned}
$$

All but the first and last terms cancel and our sum equals $\mathbf{3 - \sqrt{3}}$.

---

🪡 **EXERCISE 7-2** Find the sum

$$\frac{1}{\sqrt[3]{1} + \sqrt[3]{2} + \sqrt[3]{4}} + \frac{1}{\sqrt[3]{4} + \sqrt[3]{6} + \sqrt[3]{9}} + \frac{1}{\sqrt[3]{9} + \sqrt[3]{12} + \sqrt[3]{16}}.$$

*(MAΘ 1992)*


<!-- PDF page 84 / book page 70 -->

## 7.2 Manipulations

Consider the problem:

> *Given that the sum of a number and its reciprocal is 1, find the sum of the cube of that number and the cube of its reciprocal.*

This is a fairly harmless–seeming problem, which we could solve by first finding the number then cubing it and evaluating the desired sum. However, if we solve the equation $x + \dfrac{1}{x} = 1$, we find $x = (1 \pm i\sqrt{3})/2$. Cubing this would be a headache.

Fortunately, clever manipulations provide an easier method; in fact, we can solve the problem without ever finding $x$. We know that $x + \dfrac{1}{x} = 1$; we want to find $x^3 + \dfrac{1}{x^3}$. The simplest way to get an equation involving $x^3$ is to cube the equation we are given (recall the cube of a binomial expression, page 53). Let's try it:

$$
\begin{aligned}
1^3 &= \left(x + \frac{1}{x}\right)^3 \\
1 &= x^3 + 3x^2\left(\frac{1}{x}\right) + 3x\left(\frac{1}{x}\right)^2 + \left(\frac{1}{x}\right)^3 \\
1 &= x^3 + 3x + \frac{3}{x} + \frac{1}{x^3} \\
1 &= x^3 + 3\left(x + \frac{1}{x}\right) + \frac{1}{x^3}.
\end{aligned}
$$

Since we know that $x + \dfrac{1}{x} = 1$, we substitute this value in the last equation, getting $x^3 + 3(1) + \dfrac{1}{x^3} = 1$, so $x^3 + \dfrac{1}{x^3} = 1 - 3 = -2$. We have never actually determined $x$!

Both squaring and cubing equations are often helpful in solving systems of equations. Those problems involving the sum of a term and its reciprocal can also often be solved by raising the initial equation to various powers.

Another class of problems which can be solved by raising equations to various powers are those where we are given two of the quantities $xy$, $x + y$, $x^2 + y^2$, $x^3 + y^3$, etc. and asked for a third. By squaring $x + y$, we get the expression $x^2 + 2xy + y^2$, which involves both $xy$ and $x^2 + y^2$. Similarly, we can cube $x + y$ to get an expression involving $x^3 + y^3$, $xy$, and $x + y$:

$$(x + y)^3 = x^3 + 3x^2 y + 3xy^2 + y^3 = x^3 + y^3 + 3xy(x + y).$$

Thus if we know $x + y$ and $xy$, we can substitute these values in the above to find $x^3 + y^3$ without ever finding $x$ and $y$.

The following examples display the various uses of this technique. The two most important tools, both of which you have seen before, are

$$
\begin{aligned}
(x + y)^2 &= (x^2 + y^2) + (2xy) \\
\text{and} \quad (x + y)^3 &= (x^3 + y^3) + 3xy(x + y).
\end{aligned}
$$


<!-- PDF page 85 / book page 71 -->

In each of these, we have 3 quantities: the sum of the variables, the product of the variables, and the sum of either the squares or the cubes of the variables. Usually we are given the values of two of these three, and can then determine the third.

---

**EXAMPLE 7-4** If $a + b = 1$ and $a^2 + b^2 = 2$, find $a^4 + b^4$. *(MAΘ 1990)*

*Solution:* First, we square the sum of the variables, yielding

$$
\begin{aligned}
(a + b)^2 &= a^2 + b^2 + 2ab \\
1^2 &= 2 + 2ab \\
-1/2 &= ab.
\end{aligned}
$$

(We have used the given information to determine $ab$. Generally, we will almost always determine the product of the variables at some point in the problem if it is not given.)

Now, how can we get $a^4 + b^4$? Squaring $a^2 + b^2$ will achieve that:

$$
\begin{aligned}
(a^2 + b^2)^2 &= a^4 + 2a^2 b^2 + b^4 \\
2^2 &= a^4 + b^4 + 2(ab)^2 \\
4 &= a^4 + b^4 + 2(-1/2)^2.
\end{aligned}
$$

The last equation yields $a^4 + b^4 = \mathbf{7/2}$.

---

**EXAMPLE 7-5** Find $x^6 + \dfrac{1}{x^6}$ if $x + \dfrac{1}{x} = 3$.

*Solution:* Since our primary tools are squaring and cubing equations, we get to the sixth power by steps, rather than raising the initial equation to the sixth power directly.

First, we square the equation, to obtain

$$x^2 + \frac{1}{x^2} + 2 = \left(x + \frac{1}{x}\right)^2 = 3^2 = 9,$$

so that $x^2 + \dfrac{1}{x^2} = 7$. Cubing squares gives us sixth powers, so we cube this equation to get

$$
\begin{aligned}
\left(x^2 + \frac{1}{x^2}\right)^3 &= x^6 + 3(x^2)^2\left(\frac{1}{x^2}\right) + 3(x^2)\left(\frac{1}{x^2}\right)^2 + \frac{1}{x^6} \\
7^3 &= x^6 + \frac{1}{x^6} + 3\left(x^2 + \frac{1}{x^2}\right) \\
343 &= x^6 + \frac{1}{x^6} + 3(7).
\end{aligned}
$$

Our desired sum is $343 - 21 = \mathbf{322}$.

---

**EXAMPLE 7-6** Find $1/A + 1/B$ if $A + B = 6$ and $AB = 3$.

*Solution:* Since $1/A + 1/B = (A + B)/AB$, the desired sum is $6/3 = \mathbf{2}$. Remember this simple manipulation; you will see it often.


<!-- PDF page 86 / book page 72 -->

🪡 **EXERCISE 7-3** Find $z^5 + \dfrac{1}{z^5}$, given that $z > 0$ and $z^2 + \dfrac{1}{z^2} = 14$. (Hint: Square $z + 1/z$ to find $z + 1/z$, then use this to solve the problem.)

---

**EXERCISE 7-4** Find all possible values of $a^3 + b^3$ if $a^2 + b^2 = ab = 4$.

---

# Problems to Solve for Chapter 7

**138.** Given that $9876^2 = 97535376$, find $9877^2$. *(Mandelbrot #3)*

**139.** What is the sum of the prime factors of $2^{16} - 1$? *(MATHCOUNTS 1992)*

**140.** In the equation $2x^2 - 3x + 4 = 0$, what is the sum of the squares of the roots? *(MAΘ 1991)*

**141.** Factor completely: $-a^2 b^2 + 2ab^3 - b^4 + a^2 c^2 - 2abc^2 + b^2 c^2$. *(MAΘ 1990)*

**142.** Factor completely: $x^2 + 2mn - m^2 - n^2$. *(MAΘ 1992)*

**143.** Factor $x^{12} - y^{12}$ as completely as possible with integral coefficients and integral exponents. *(MAΘ 1992)*

**144.** Simplify the following expression as much as possible:

$$\left(\frac{a^3 - 1}{a^2 - 1}\right)\left(\frac{a^2 + 2a + 1}{a^3 + 1}\right)\left(\frac{a^2 - a + 1}{a + 1}\right).$$

*(MAΘ 1991)*

**145.** When $x^9 - x$ is factored as completely as possible into polynomials and monomials with integral coefficients, how many factors are there? *(MAΘ 1992)*

**146.** If the sum of two numbers is 1 and their product is 1, then what is the sum of their cubes? *(AHSME 1966)*

**147.** Find $x^4 + \dfrac{1}{x^4}$ if $x - \dfrac{1}{x} = 5$.

🪡 **148.** Factor as completely as possible with real coefficients: $x^8 - y^8$. (Hint: There are 5 factors. Note that we say *real* coefficients, not just integers.)

**149.** Simplify the following expression completely:

$$\frac{bx(a^2 x^2 + 2a^2 y^2 + b^2 y^2) + ay(a^2 x^2 + 2b^2 x^2 + b^2 y^2)}{bx + ay}.$$

*(AHSME 1988)*

**150.** Find four nontrivial (not 1) factors in terms of $x$ and $y$ whose product is $8^{2x} - 27^{2y}$.

**151.** If $x + y = 4$ and $xy = 2$, then find $x^6 + y^6$. *(MAΘ 1992)*


<!-- PDF page 87 / book page 73 -->

**152.** Find all real $x$ such that $\sqrt{x} + 1 = x - \sqrt{x} - 1$. *(MAΘ 1990)*

**153.** Evaluate the sum

$$\frac{1}{\sqrt{15} + \sqrt{13}} + \frac{1}{\sqrt{13} + \sqrt{11}} + \frac{1}{\sqrt{11} + 3} + \frac{1}{3 + \sqrt{7}} + \frac{1}{\sqrt{7} + \sqrt{5}}.$$

**154.** Find all possible values of $x^3 + \dfrac{1}{x^3}$ given that $x^2 + \dfrac{1}{x^2} = 7$.

**155.** If $r$ and $s$ are the roots of $x^2 + px + q = 0$, then find each of the following in terms of $p$ and $q$.

i. $r^2 + s^2$

ii. $r - s$

iii. $r^2 s + rs^2$

iv. $r^4 + s^4$

*(MAΘ 1987)*

🪡 **156.** Find two four digit numbers whose product is $4^8 + 6^8 + 9^8$.

**157.** What is the largest number by which the expression $n^3 - n$ is divisible for all possible integral values of $n$? *(AHSME 1951)*

**158.** Find all possible values of $ab$ given that $a + b = 2$ and $a^4 + b^4 = 16$.

🪡 **159.** If $a^3 - b^3 = 24$ and $a - b = 2$, then find all possible values of $a + b$. *(MAΘ 1990)*

**160.** Find all prime factors of $3^{18} - 2^{18}$.

🪡 **161.** If $q$ is an integer that can be expressed as the sum of two integer squares, show that both $2q$ and $5q$ can also be expressed as the sum of two integer squares. *(Mandelbrot #2)*


<!-- PDF page 88 / book page 74 -->

> ## *the BIG PICTURE*
>
> One of the most famous special factorizations was discovered by Leonhard Euler en route to a proof that *every positive integer may be written as a sum of four squares.* For example, $23 = 9 + 9 + 4 + 1$ and $24 = 16 + 4 + 4 + 0$.
>
> To prove this theorem, a very typical number theory approach is used. First, show that all *primes* can be written as a sum of four squares. Then, show that if two numbers $m$ and $n$ can be written as a sum of four squares, the product $mn$ can as well. We then use induction (page 256) on the number of primes which divide a number. We know it works for primes, the base case. For the inductive step, assume it works for up to $k - 1$ primes. A number which is a product of $k$ primes can be written as the first prime times the product of the rest, which is a product of $k - 1$ primes and is thus expressible as a sum of four squares. The number with $k$ primes can then be written as a sum of four squares, being the product of two numbers which can be so written.
>
> But how do we prove that if $m$ and $n$ may be written as the sum of four squares, then $mn$ can also? Letting $m = x_1^2 + x_2^2 + x_3^2 + x_4^2$ and $n = y_1^2 + y_2^2 + y_3^2 + y_4^2$, we turn to a very clever manipulation. We have
>
> $$
> \begin{aligned}
> (x_1^2 + x_2^2 + x_3^2 + x_4^2)(y_1^2 + y_2^2 + y_3^2 + y_4^2) &= (x_1 y_1 + x_2 y_2 + x_3 y_3 + x_4 y_4)^2 \\
> &\quad + (x_1 y_2 - x_2 y_1 + x_3 y_4 - x_4 y_3)^2 \\
> &\quad + (x_1 y_3 - x_3 y_1 + x_4 y_2 - x_2 y_4)^2 \\
> &\quad + (x_1 y_4 - x_4 y_1 + x_2 y_3 - x_3 y_2)^2.
> \end{aligned}
> $$
>
> We immediately see that the product of the sums of four squares is itself a sum of four squares! This identity, called **Euler's identity**, supposedly eluded Euler for 12 years. We highly recommend that you multiply it out and watch the beautiful way in which terms cancel, leaving behind exactly what is needed.


