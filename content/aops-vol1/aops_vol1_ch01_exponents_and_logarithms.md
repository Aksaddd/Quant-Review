# Chapter 1 — Exponents and Logarithms

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 15–26. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 15 / book page 1 -->

# Chapter 1

# *Exponents and Logarithms*

## 1.1 Integer Exponents

Multiplication is simply a shorthand for repeated addition. Instead of writing $2 + 2 + 2 + 2 + 2$, we can write $5 \cdot 2$. Similarly, $x + x + x + x = 4x$.

Just as we have a shorthand for repeated addition, we have a simple way of writing repeated multiplication. Instead of writing $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2$, we can write $2^5$ to mean the product of five 2's. Similarly, $x \cdot x \cdot x \cdot x$ is $x^4$, the product of four $x$'s.

In an expression like $2^5$, the 2 is called the **base** and the 5 is the **exponent** or **power**. This is sometimes read "Two to the fifth power" or "Two raised to the fifth power." A number which is raised to the second power is said to be **squared** and to the third power is said to be **cubed**. When you study finding the area of squares (page 123) and the volume of cubes (page 162), you'll understand the source of these names. Let's examine some properties of powers.

---

**EXAMPLE 1-1** What is $2^5 \cdot 2^6$?

*Solution:* The first term in the product is the product of five 2's and the second is the product of six 2's, so altogether, we have the product of eleven 2's. Thus $2^5 \cdot 2^6 = 2^{11} = \mathbf{2048}$.

---

**EXAMPLE 1-2** What is $\dfrac{3^{15}}{3^{12}}$?

*Solution:* Evaluating the numerator and denominator and then performing the division is long, tedious, and leaves much room for error. We instead note that the twelve 3's on the bottom cancel with twelve of the fifteen threes on top (because $\tfrac{3}{3} = 1$), leaving three 3's on the top:

$$\frac{3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3}{3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3} = \frac{3 \cdot 3 \cdot 3}{1} = \mathbf{27}.$$

---

From these examples we see that when we multiply two expressions with the same base, we *add* their exponents, and when we divide two expressions with the same base we *subtract* exponents. This is analogous to the relationship between multiplication and addition. (Do you see why?)


<!-- PDF page 16 / book page 2 -->

What about $3^6/3^8$? Following our above rules, this equals $3^{6-8} = 3^{-2}$, an expression with a negative exponent! What has happened here is that the six 3's on top cancel with six on the bottom, leaving two on the bottom. Thus, a negative exponent means the extra numbers are in the denominator. This means

$$\frac{3^6}{3^8} = 3^{6-8} = 3^{-2} = \frac{1}{3^2} = \frac{1}{9}.$$

When dealing with problems involving multiplication and division of expressions with negative exponents, we can treat them just as the expressions with positive exponents, for example $x^3 x^{-2} = x^1 = x$ and $x^3/x^{-2} = x^{3-(-2)} = x^5$.

💣 Now you should be comfortable multiplying and dividing exponential expressions with integer exponents. **WARNING:** We can only apply our rules regarding multiplication and division when the bases of the expressions are the same.

---

**EXAMPLE 1-3** What is the difference between $\dfrac{5^5 + 5^2}{5}$ and $\dfrac{(5^5)(5^2)}{5}$?

*Solution:* The difference here is a very important one. In the first expression, 5 must be divided into each term of the numerator, so we write the expression as

$$\frac{5^5 + 5^2}{5} = \frac{5^5}{5} + \frac{5^2}{5} = 5^4 + 5.$$

In the second, the 5 in the denominator need only be divided into one of the factors, and the expression can be written

$$\frac{(5^5)(5^2)}{5} = 5^5 \left( \frac{5^2}{5} \right) = (5^5)(5).$$

You will see the importance of this when you start working with expressions like $(3 + x)/3$ and $3x/3$. The first is not reducible, but the second equals $x$, as the 3's cancel.

---

**EXERCISE 1-1** Evaluate each of the following.

| | |
|---|---|
| i. $3^4$ | ii. $2^5 2^2$ |
| iii. $5^{-3} 5^5 5^{-1}$ | iv. $4^3/4$ |
| v. $2^7/2^2$ | vi. $(3^4 3^{-2})/(3^5 3^{-2})$ |
| vii. $2^5 3^2 2^{-3}$ | viii. $5^2 3^{-1} 2^4 5^{-1} 2^{-2}$ |

---

💣 What if an exponent is 0? Consider $3^0$. This could result from $3^3/3^3 = 3^{3-3} = 3^0$. Clearly, the numerator and denominator of the initial fraction are the same, so the initial fraction equals 1. Thus any nonzero number raised to the zero power equals 1. **WARNING:** What about $0^0$? We can't determine that it is 1 with the above method, because we can't let 0 be in the denominator of a fraction. Thus, $0^0$ is undefined. Similarly, zero raised to any negative power is undefined. Of course, 0 raised to any positive power is always 0 because the product of any number of 0's is always zero.

How about $(2^3)^5$? This is the product of five $2^3$'s; we multiply three 2's five times, for a total of fifteen 2's. Thus $(2^3)^5 = 2^{15}$. Hence, when an exponential expression is raised to a power, we multiply the exponent of the expression by the power to which the expression is raised.


<!-- PDF page 17 / book page 3 -->

**EXAMPLE 1-4** Evaluate $(3^5)^2$ and $(4^{-3})^{-2}$.

*Solution:*

$$(3^5)^2 = 3^{5 \cdot 2} = \mathbf{3^{10}}.$$

$$(4^{-3})^{-2} = 4^{(-3)(-2)} = \mathbf{4^6}.$$

---

**EXAMPLE 1-5** What is the difference between $2^{3^4}$ and $(2^3)^4$?

*Solution:* In $2^{3^4}$, the exponent itself is raised to the fourth power, while in $(2^3)^4$, the entire expression $2^3$ is raised to the fourth power. Thus,

$$2^{3^4} = 2^{81}, \quad \text{but} \quad (2^3)^4 = 2^{3 \cdot 4} = 2^{12}.$$

💣 Clearly these expressions are different. **WARNING:** Always be sure you know which is intended! Expressions like $2^{3^4}$ are rare, but when they occur, know what they mean.

---

## 1.2 Fractional Exponents

Now we've covered all possible integer exponents, but what about fractional exponents? For example, what is $25^{1/2}$? We know that $5^2 = 25$, and if we take the leap of faith that all our previous rules hold for fractional powers as well, we can raise each side to the $1/2$ power:

$$(5^2)^{1/2} = 25^{1/2}.$$

Since $(5^2)^{1/2} = 5^{2(1/2)} = 5^1 = 5$, we then have $25^{1/2} = 5$.

The exponent $1/2$ has a special name, the **square root**, and it also has a special symbol associated with it, $\sqrt{\,\,}$. (This symbol is called a **radical**.) Thus we write

$$25^{1/2} = \sqrt{25} = 5.$$

When asked for the square root of a number, say 81, we find the number which, when squared, equals 81. Since we get 81 when we square 9, $\sqrt{81} = 9$.

---

**EXAMPLE 1-6** Which two integers is $\sqrt{55}$ between?

*Solution:* Since $\sqrt{49} = 7$ is smaller than $\sqrt{55}$ and $\sqrt{64} = 8$ is larger, we know that $\sqrt{55}$ is between **7 and 8**.


<!-- PDF page 18 / book page 4 -->

When dealing with other powers which are reciprocals of integers, like $1/3$, $1/4$, $1/5$, and so on, we proceed just as with square roots. When asked for the fifth root of $100000$, we want the number which, when raised to the fifth power, equals $100000$. Since $10^5 = 100000$, we have $100000^{1/5} = 10$. We can adapt the radical sign to use with other roots by writing $\sqrt[n]{\,\,}$ for the $n$th root. For example, $8^{1/7}$ is $\sqrt[7]{8}$. (When no number is written where the 7 is, then the symbol is assumed to be the square root.) As with square roots, numbers raised to the $1/3$ power have a special name, **cube roots**.

When working with fractional powers in which the numerator is not 1, we use our rule for raising exponential expressions to powers *backwards*. This is a little tricky, and it looks like this:

$$8^{2/3} = 8^{(1/3)(2)} = (8^{1/3})^2 = (2)^2 = 4.$$

We find the fractional root first, then we raise the result to the power of the numerator, even if the numerator is negative. This takes practice, but you'll soon be able to handle expressions like this in your head quite swiftly.

---

**EXAMPLE 1-7** Consider the following examples:

i. $8^{5/3} = (8^{1/3})^5 = 2^5 = \mathbf{32}$.

ii. $(\sqrt{8})^{2/3} = (8^{1/2})^{2/3} = 8^{(1/2)(2/3)} = 8^{1/3} = \mathbf{2}$.

iii. $\sqrt[4]{81^{-3}} = 81^{-3/4} = (81^{1/4})^{-3} = 3^{-3} = \dfrac{1}{3^3} = \mathbf{\dfrac{1}{27}}$.

iv. $\left(\dfrac{1}{8}\right)^{2/3} = \dfrac{1^{2/3}}{8^{2/3}} = \dfrac{1^2}{2^2} = \mathbf{\dfrac{1}{4}}$. (Note that 1 raised to *any* power is always 1.)

---

**EXAMPLE 1-8** Evaluate $\dfrac{(4^{2/3})(2^{1/6})(3^{3/2})}{(2^{-1/2})(3^{1/2})}$.

*Solution:* Just because the exponents are fractions doesn't mean we can't use all our rules for multiplication and division. First, we convert all the expressions to the simplest base possible (by writing $4^{2/3} = (2^2)^{2/3} = 2^{4/3}$), then we simplify the expression using our rules for multiplication and division of expressions with a common base:

$$\frac{(4^{2/3})(2^{1/6})(3^{3/2})}{(2^{-1/2})(3^{1/2})} = \frac{(2^{4/3})(2^{1/6})(3^{3/2})}{(2^{-1/2})(3^{1/2})} = 2^{4/3 + 1/6 - (-1/2)} \, 3^{3/2 - 1/2} = (2^2)(3) = \mathbf{12}.$$

---

**EXERCISE 1-2** Try these.

| | |
|---|---|
| i. $9^{3/2}$ | ii. $\left(\sqrt[3]{81}\right)^{3/2}$ |
| iii. $64^{-4/3}$ | iv. $\sqrt[5]{100000^3}$ |
| v. $(4/9)^{(-3/2)}$ | vi. $\sqrt[4]{(1/16)^{-3}}$ |

---

💣 **WARNING:** You may have realized that 5 is not the only number which, when squared, equals 25. In fact, $-5$ squared equals 25 as well. So, if you are asked for the square root of 25, what will you answer? In general, always give the positive root.

A good rule of thumb is: if the radical sign or the fractional power was in the problem to start with, then we are only looking for the positive root; if we force the problem to have a fractional


<!-- PDF page 19 / book page 5 -->

exponent, then we must find all answers. The difference is the phrasing of the question. If asked for the square root of 25, we answer 5, because the problem involves a fractional power. If asked what number squared is 25, we give 5 and $-5$ as the answers, because the problem involves no fractional powers. Also, when asked to "find *all* values," we obviously include both positive and negative solutions. This is a ticky-tacky detail at best, but it is best to remove all confusion as early as possible.

---

**EXAMPLE 1-9** What is the difference between $x^2 = 9$ and $x = \sqrt{9}$?

*Solution:* In the first, we are asked what numbers squared are 9, so $x$ can be 3 or $-3$. We write this as $x = \pm 3$. In the second, $x = 3$, because $x$ *is* the square root of 9, which implies the positive value. This is just another example of our rule that *if the radical sign or fractional power is already there, only give the positive solution; if not, give all solutions.*

---

We only run into the difficulty of multiple real roots for even powers. For odd powers there is no confusion, because negative numbers raised to an odd power are negative and positive numbers raised to an odd power are positive. For example, the only real number which cubed equals 8 is 2, because $-2$ cubed is $-8$.

---

**EXAMPLE 1-10** What is the difference between $(-1)^{1/2}$ and $-1^{1/2}$?

*Solution:* The first denotes the square root of $-1$, while the second asks for the negative of the square root of 1. This is very clear if we write the two in radical notation: the first is $\sqrt{-1}$, while the second is $-\sqrt{1}$. 💣 There is a big difference between the two. There is no real number which equals the first, while the second is equal to $-1$.

---

**EXERCISE 1-3** Find all real $x$ in each of the following.

| | |
|---|---|
| i. $x = (-2)^5$ | ii. $x = \sqrt[3]{-1/8}$ |
| iii. $x^6 = 64$ | iv. $x^3 = 64$ |
| v. $x = (-27)^{-2/3}$ | vi. $x^{5/3} = 243$ |

---

## 1.3 Simplifying Radical Expressions

What is the square root of 8? After thinking for a moment, you'll decide that there is no integer that can be squared to give 8. Perhaps we could just write $\sqrt{8}$ and go on. However, since $8 = 4 \cdot 2$, we could write

$$\sqrt{8} = (8)^{1/2} = (4 \cdot 2)^{1/2} = 4^{1/2} \cdot 2^{1/2} = 2 \cdot 2^{1/2} = 2\sqrt{2}.$$

We almost always write $2\sqrt{2}$ rather than $\sqrt{8}$ because, for one thing, simplifications such as $\sqrt{8}/2 = (2\sqrt{2})/2 = \sqrt{2}$ are much easier to see this way.

In a radical expression, all factors that can be removed from the radical should be removed. We do this by writing the prime factorization (page 47) of the number under the radical. (The number under the radical is called the **radicand**.) Thus to find $\sqrt{96}$ we write

$$\sqrt{96} = \sqrt{2^5 \cdot 3}.$$


<!-- PDF page 20 / book page 6 -->

If the expression isn't already in exponential notation (rather than using the radical sign), we write it as such:

$$\sqrt{2^5 \cdot 3} = (2^5 \cdot 3)^{1/2}.$$

We next apply the root ($1/2$ in the above example) to each factor separately:

$$(2^5 \cdot 3)^{1/2} = (2^5)^{1/2} \cdot 3^{1/2} = 2^{5/2} \cdot 3^{1/2}.$$

We then evaluate any of the resulting expressions which have integral exponents. If any of the powers of the remaining factors are greater than one, we split the expression into a product of the factor with an integer exponent and the factor with a fractional coefficient less than one. Thus $2^{5/2}$ becomes $(2^2)(2^{1/2})$. We evaluate all parts with integer exponents, then combine everything with fractional exponents into a single expression.

Completing our example,

$$2^{5/2} \cdot 3^{1/2} = 2^2 \cdot 2^{1/2} \cdot 3^{1/2} = 4 \cdot 2^{1/2} \cdot 3^{1/2} = 4(2 \cdot 3)^{1/2} = 4\sqrt{6}.$$

With practice, you'll be able to do this much more quickly.

Here's how I would simplify $\sqrt{96}$ in my mind: I try to find perfect squares which divide 96. I know $96 = 16(6)$, so $\sqrt{96} = \sqrt{16(6)} = \sqrt{16}\sqrt{6} = 4\sqrt{6}$. Since I know there are no squares besides 1 that divide 6, I know I'm done. You'll agree that this method is quicker than the above step-by-step method, but our first method never fails, whereas the "inspection" method we've described is unreliable until you become experienced. Try some of the following examples using the rigorous method, then by inspection. It shouldn't take long to become pretty good at these.

---

**EXAMPLE 1-11** Simplify $\sqrt{1440}$, $\sqrt[3]{\dfrac{144}{125}}$, and $\sqrt[6]{6912}$.

*Solution:* The prime factorization of 1440 is $2^5 \cdot 3^2 \cdot 5$. Following the method we have described, we have

$$
\begin{aligned}
\sqrt{1440} &= (2^5 \cdot 3^2 \cdot 5)^{1/2} = (2^5)^{1/2}(3^2)^{1/2}(5)^{1/2} = (2^{5/2})(3^{2/2})(5^{1/2}) \\
&= (2^{5/2})(3^1)(5^{1/2}) = 3\left[(2^2)(2^{1/2})(5^{1/2})\right] = 3(4) 2^{1/2} 5^{1/2} = \mathbf{12\sqrt{10}}.
\end{aligned}
$$

By inspection, since 144 is a perfect square which divides 1440, we obtain $\sqrt{1440} = \sqrt{144}\sqrt{10} = 12\sqrt{10}$. Much quicker.

Let's move on to the second one. When dealing with a fraction, first simplify the fraction, then work on the numerator and denominator separately. Thus,

$$
\begin{aligned}
\sqrt[3]{\frac{144}{125}} &= \frac{\sqrt[3]{144}}{\sqrt[3]{125}} = \frac{(2^4 \cdot 3^2)^{1/3}}{(5^3)^{1/3}} = \frac{(2^{4/3})(3^{2/3})}{5^{3/3}} \\
&= \frac{2^1 \cdot 2^{1/3} \cdot 3^{2/3}}{5^1} = \left(\frac{2}{5}\right)\left((2^{1/3})(3^{2/3})\right) = \frac{2}{5}\sqrt[3]{(2)(3^2)} \\
&= \mathbf{\frac{2}{5}\sqrt[3]{18}}.
\end{aligned}
$$

How would you attack this by inspection?


<!-- PDF page 21 / book page 7 -->

For the third one, inspection is at a loss. We turn to our method:

$$\sqrt[6]{6912} = (2^8 \cdot 3^3)^{1/6} = 2^{4/3} \cdot 3^{1/2} = 2(2^{1/3} \cdot 3^{1/2}) = 2(2^{2/6} \cdot 3^{3/6}) = 2\sqrt[6]{4(27)} = \mathbf{2\sqrt[6]{108}}.$$

Notice that we reduced the fractional exponents ($8/6 = 4/3$) before removing the integer parts; this keeps us from missing simplifications of expressions like $\sqrt[4]{9} = (3^2)^{1/4} = 3^{1/2} = \sqrt{3}$. If we don't simplify the $2/4$, we might come to the erroneous conclusion that $\sqrt[4]{9}$ is irreducible.

---

**EXERCISE 1-4** Find the following.

| | |
|---|---|
| i. $\sqrt{27}$ | ii. $\sqrt[3]{128}$ |
| iii. $\sqrt[4]{1600}$ | iv. $\sqrt{9095625}$ |
| v. $\sqrt[3]{\dfrac{36000}{243}}$ | vi. $\sqrt{\dfrac{56}{126}}$ |

---

## 1.4 Rationalizing Denominators

Rationalizing denominators is exactly what it sounds like: making the denominators of fractions rational. A rational number is a number which can be expressed as the ratio of two integers, i.e. a fraction. When rationalizing denominators, we usually make the denominator an integer. For example, consider the expression $1/\sqrt{2}$. If we multiply the numerator and the denominator by $\sqrt{2}$, we have

$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \cdot 1 = \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}.$$

As you can see, multiplying the numerator and denominator of a fraction by the same value doesn't change the value of the fraction because it is the same as multiplying by 1. Remember this fact, for we will use it often. Although the expressions $1/\sqrt{2}$ and $\sqrt{2}/2$ are equal, we will almost always use $\sqrt{2}/2$ as the preferred expression because its denominator is a rational number.

We've seen how to handle square roots in the denominator; just multiply the top and the bottom of the fraction by the square root and the denominator is rationalized. For other roots, we must be more crafty. First, we reduce the radical as in the previous section. Then, we split the expression under the radical in the denominator into its prime factors and treat each factor separately. Consider $1/\sqrt[3]{12}$. From our first two steps, we have

$$\frac{1}{\sqrt[3]{12}} = \frac{1}{\sqrt[3]{2^2}\sqrt[3]{3}}.$$

To get rid of the $\sqrt[3]{2^2}$, we multiply top and bottom by $\sqrt[3]{2}$:

$$\frac{1}{\sqrt[3]{2^2}\sqrt[3]{3}} \left(\frac{\sqrt[3]{2}}{\sqrt[3]{2}}\right) = \frac{\sqrt[3]{2}}{\sqrt[3]{2^3}\sqrt[3]{3}} = \frac{\sqrt[3]{2}}{2\sqrt[3]{3}}.$$

To rationalize the $\sqrt[3]{3}$, we multiply by $\sqrt[3]{3^2}$ to make the denominator $2\sqrt[3]{3^3}$:

$$\frac{1}{\sqrt[3]{12}} = \frac{\sqrt[3]{2}}{2\sqrt[3]{3}} \left(\frac{\sqrt[3]{3^2}}{\sqrt[3]{3^2}}\right) = \frac{\sqrt[3]{2}\sqrt[3]{3^2}}{2\sqrt[3]{3^3}} = \frac{\sqrt[3]{18}}{2 \cdot 3} = \frac{\sqrt[3]{18}}{6}.$$


<!-- PDF page 22 / book page 8 -->

As you may have guessed, we have chosen our multiplying factors to make the exponent of the factor under the radical equal to the root. For example, in our final step above the power of 3 under the radical in $\sqrt[3]{3}$ is 1. To make that power 3, we must multiply by $\sqrt[3]{3^2}$, so that $\sqrt[3]{3}\sqrt[3]{3^2} = \sqrt[3]{3^3} = 3$, a rational number. (Remember to multiply the numerator by this factor too.)

---

**EXAMPLE 1-12** Rationalize the denominator of $\dfrac{2\sqrt{5}}{3\sqrt[4]{72}}$.

*Solution:* First we split everything into prime factors:

$$\frac{2\sqrt{5}}{3\sqrt[4]{72}} = \frac{2\sqrt{5}}{3\sqrt[4]{2^3}\sqrt[4]{3^2}}.$$

For the factor 2, we must multiply by $\sqrt[4]{2}$, to get $\sqrt[4]{2^4}$. Likewise, for the factor 3, we multiply by $\sqrt[4]{3^2}$ to get $\sqrt[4]{3^4}$.

$$
\begin{aligned}
\frac{2\sqrt{5}}{3\sqrt[4]{72}} &= \frac{2\sqrt{5}}{3\sqrt[4]{2^3}\sqrt[4]{3^2}} \cdot \frac{\sqrt[4]{2}}{\sqrt[4]{2}} = \frac{2\sqrt{5}\sqrt[4]{2}}{3\sqrt[4]{2^4}\sqrt[4]{3^2}} \\
&= \frac{2\sqrt{5}\sqrt[4]{2}}{3 \cdot 2 \sqrt[4]{3^2}} \cdot \frac{\sqrt[4]{3^2}}{\sqrt[4]{3^2}} = \frac{2\sqrt{5}\sqrt[4]{2}\sqrt[4]{3^2}}{6\sqrt[4]{3^4}} = \frac{\sqrt[4]{25}\sqrt[4]{2}\sqrt[4]{9}}{3 \cdot 3} \\
&= \mathbf{\frac{\sqrt[4]{450}}{9}}.
\end{aligned}
$$

Don't feel bad if you need to go through all those equations more than once!

---

**EXERCISE 1-5** Express the following as fractions with rational denominators.

| | |
|---|---|
| i. $3/\sqrt{3}$ | ii. $\sqrt{2}/\sqrt{6}$ |
| iii. $2/\sqrt[3]{24}$ | iv. $1/\sqrt[4]{1800}$ |
| v. $5^{1/3}/5^{5/3}$ | vi. $(3^{1/2} 2^{2/3})/(3^{1/6} 2^{3/2})$ |

---

What if we have an expression like $1/(1 + \sqrt{2})$? Multiplying top and bottom by $\sqrt{2}$ does little good, as the result is $\sqrt{2}/(\sqrt{2} + 2)$, which still has an irrational denominator. There is, however, a way to rationalize this denominator: we multiply top and bottom by $1 - \sqrt{2}$. What happens? We will see if we expand the product $(1 + \sqrt{2})(1 - \sqrt{2})$, to get

$$(1 + \sqrt{2})(1 - \sqrt{2}) = 1(1 - \sqrt{2}) + \sqrt{2}(1 - \sqrt{2}) = 1 - \sqrt{2} + \sqrt{2} - 2 = -1.$$

The result is rational, and we have

$$\frac{1}{1 + \sqrt{2}} \cdot \frac{1 - \sqrt{2}}{1 - \sqrt{2}} = \frac{1 - \sqrt{2}}{(1 - \sqrt{2})(1 + \sqrt{2})} = \frac{1 - \sqrt{2}}{-1} = \sqrt{2} - 1.$$

The quantity $1 - \sqrt{2}$ is called the **conjugate radical** of $1 + \sqrt{2}$. We find the conjugate radical of a two-term expression by changing the sign in front of one radical term. Multiplying top and bottom by the conjugate radical of an expression in the denominator will always make the denominator rational. This only works for square roots, and only for two-term expressions like $1 + \sqrt{2}$, $3 - 4\sqrt{2}$, $\sqrt{2} - \sqrt{3}$, etc.


<!-- PDF page 23 / book page 9 -->

**EXAMPLE 1-13** Show that the product of $a\sqrt{b} + c\sqrt{d}$ and $a\sqrt{b} - c\sqrt{d}$ is always rational if $a$, $b$, $c$, and $d$ are rational.

*Proof:* We simply multiply and show that there are no radical signs in the result:

$$
\begin{aligned}
(a\sqrt{b} + c\sqrt{d})(a\sqrt{b} - c\sqrt{d}) &= a^2 b + (a\sqrt{b})(-c\sqrt{d}) + (c\sqrt{d})(a\sqrt{b}) - c^2 d \\
&= a^2 b - ac\sqrt{bd} + ac\sqrt{bd} - c^2 d \\
&= a^2 b - c^2 d
\end{aligned}
$$

The result is rational. We can now see why our method of rationalization works: the two terms involving radicals in the expression cancel each other.

---

🪡 **EXAMPLE 1-14** What is $\dfrac{\sqrt{2}}{5 - \sqrt{2} - \sqrt{3}}$ when its denominator is rationalized?

*Solution:* Although the denominator is not a two-term expression, we can treat it like one to get rid of one of the radicals by writing $5 - \sqrt{2} - \sqrt{3}$ as $(5 - \sqrt{2}) - \sqrt{3}$. This suggests multiplying by $(5 - \sqrt{2}) + \sqrt{3}$, which results in

$$\frac{5\sqrt{2} - 2 + \sqrt{6}}{(5 - \sqrt{2})(5 - \sqrt{2}) + (5 - \sqrt{2})(\sqrt{3}) + (-\sqrt{3})(5 - \sqrt{2}) + (-\sqrt{3})(\sqrt{3})}.$$

In the new denominator, we see that the center two terms cancel each other, leaving the outer two terms. Evaluating these we find that we have cleared the denominator of all irrationals except $\sqrt{2}$. (Multiply it out yourself.) Our expression now is

$$\frac{5\sqrt{2} - 2 + \sqrt{6}}{24 - 10\sqrt{2}}.$$

To rationalize the denominator of this expression, we multiply top and bottom by the conjugate of $24 - 10\sqrt{2}$, or $24 + 10\sqrt{2}$. After some simplification, we find that the fraction is

$$\mathbf{\frac{13 + 25\sqrt{2} + 5\sqrt{3} + 6\sqrt{6}}{94}}.$$

---

**EXERCISE 1-6** Rationalize the denominators of each of the following expressions.

i. $\dfrac{1}{\sqrt{7} + \sqrt{3}}$

ii. $\dfrac{6}{\sqrt{15} - \sqrt{6}}$

iii. $\dfrac{\sqrt{2}}{\sqrt{6} - 2}$

iv. 🪡 $\dfrac{1}{\sqrt{1 + \sqrt{2}}}$ &nbsp;(Hint: First multiply top and bottom by $\sqrt{1 + \sqrt{2}}$.)

v. 🪡 $\dfrac{1}{2 - \sqrt[4]{2}}$ &nbsp;(Hint: Let $\sqrt[4]{2} = \sqrt{\sqrt{2}}$.)


<!-- PDF page 24 / book page 10 -->

As you can see, the previous examples and exercises extend what we have learned about two-term expressions involving square roots to a variety of other types of problems. This is what mathematics is all about: extending one's knowledge in creative ways to solve different types of problems.

## 1.5 Logarithms

When someone writes $\log_2 8$, they mean the power you have to raise 2 to in order to get 8. Since $2^3 = 8$, we write $\log_2 8 = 3$. This is read, "The logarithm of 8 base 2 is 3." Similarly, since $3^5 = 243$, we can write $\log_3 243 = 5$.

Logarithms are just another way of writing expressions like $3^2 = 9$. Instead of writing that, we can write $\log_3 9 = 2$. To help answer the nagging question of why anyone would want logarithms, see *the BIG PICTURE* which follows this chapter.

The first step in becoming proficient with logarithms is learning how to switch back and forth from **logarithmic notation**, $\log_5 25 = 2$, to **exponential notation**, $5^2 = 25$. The number that is raised to some power in exponential notation (5 in the above example), the **base**, is the small lowered number (the **subscript**) of the logarithm. The exponent (2 above) is the result of the logarithm, and the result of the exponential equation (25 above) is the **argument** of the logarithm. (Don't worry if this seems complicated; it'll make sense when you've played with some logarithms yourself.)

---

**EXERCISE 1-7** Convert the following exponential equations to logarithmic equations.

i. $3^3 = 27$

ii. $16^{1/4} = 2$

iii. $x^z = y$

---

**EXERCISE 1-8** Convert the following logarithmic equations to exponential equations.

i. $\log_{36} 6 = 1/2$

ii. $\log_3 (1/9) = -2$

iii. $\log_x y = z$

---

Solving logarithms is quite simple. We change one question, "What is $\log_7 343$?", to a more understandable one, "To what power do we have to raise 7 to get 343?" The answer is 3. If you don't see this right away, write $x = \log_7 343$ and convert this to exponential notation: $7^x = 343$. Now what is $x$?

💣 **WARNING:** The base and the argument of the logarithm must both *always* be positive if the result of the logarithm is to be a real number. As for why arguments can't be negative, consider $\log_3(-3)$. For this to be true, there must be some $x$ such that $3^x = -3$, but any power of a positive number is positive, so this is impossible. Also, when log appears without a base, it is usually assumed to be base 10.

The result of a logarithm, however, can be negative. For example, $\log_2 0.5 = -1$. (Do you see why?)


<!-- PDF page 25 / book page 11 -->

**EXAMPLE 1-15** Evaluate $\log_3 \dfrac{1}{243}$ and $\log_8 2$.

*Solution:* Putting the first expression in exponential notation yields $3^x = 1/243$. Since $1/243 = (3)^{-5}$, we have $x = \mathbf{-5}$.

Putting the second expression in exponential notation gives $8^x = 2$. Solving this as in the prior section, we write $8 = 2^3$, so

$$(2^3)^x = 2,$$

yielding $2^{3x} = 2^1$. Two expressions with the same base are equal only if their exponents are equal, so $3x = 1$ and $x = \mathbf{1/3}$.

---

**EXERCISE 1-9** Find each of the following.

| | |
|---|---|
| i. $\log_5 625$ | ii. $\log_{1/2} 2$ |
| iii. $\log_9 \sqrt{3}$ | iv. $\log_{\sqrt{5}} \sqrt[3]{5}$ |

---

# Problems to Solve for Chapter 1

(If you do not have experience solving linear equations, read Chapter 3 before attempting problems 9–16.)

**1.** Find the value of $\log_5 \dfrac{(125)(625)}{25}$. *(AHSME 1950)*

**2.** What is the logarithm of $27\sqrt[4]{9}\sqrt[3]{9}$ base 3? *(AHSME 1953)*

**3.** Express $2 + \sqrt{2} + \dfrac{1}{2 + \sqrt{2}} + \dfrac{1}{\sqrt{2} - 2}$ in simplest form. *(AHSME 1958)*

**4.** Find $(-3)^{-2} + (-2)^{-1} + (-1)^0 + 0^1 + 1^2 + 2^3 + 3^4$.

**5.** Simplify the expression $81^{-(2^{-2})}$. *(AHSME 1965)*

**6.** Find, with a rational common denominator, the sum

$$\left(\frac{1}{2}\right)^{-1/2} + \left(\frac{3}{2}\right)^{-3/2} + \left(\frac{5}{2}\right)^{-5/2}.$$

**7.** Write $\dfrac{\sqrt{2}}{\sqrt{2} + \sqrt{3} - \sqrt{5}}$ with a rational denominator. *(AHSME 1952)*

**8.** Find $\log_{\sqrt{3}} \sqrt[3]{9}$.

**9.** Solve for $n$: $\sqrt{1 + \sqrt{2 + \sqrt{n}}} = 2$. *(MATHCOUNTS 1991)*

**10.** Find $x$ if $2^{16^x} = 16^{2^x}$. *(Mandelbrot #3)*

**11.** Solve the equation $\log_{2x} 216 = x$, where $x$ is real. *(AHSME 1960)*


<!-- PDF page 26 / book page 12 -->

🪡 **12.** Suppose $A$ and $B$ are positive real numbers for which $\log_A B = \log_B A$. If neither $A$ nor $B$ is 1 and $A \neq B$, find the value of $AB$. *(MAΘ 1992)*

🪡 **13.** The formula $N = 8 \cdot 10^8 \cdot x^{-3/2}$ gives, for a certain group, the number of individuals whose income exceeds $x$ dollars. What is the smallest possible value of the lowest income of the wealthiest 800 individuals? *(AHSME 1960)*

**14.** Show that if $a \neq c$, $a^x = c^q$ and $c^y = a^z$, then $xy = qz$. *(AHSME 1951)*

🪡 **15.** Given that $\log_3 2 = 0.631$, find the smallest positive integer $a$ such that $3^a > 2^{102}$. (Hint: Show that $\log_3 2^{102} = 102 \log_3 2$.) *(Mandelbrot #3)*

🪡 **16.** Show that $\log_6 2 + \log_6 3 = 1$.

---

> ## *the BIG PICTURE*
>
> Although they later came to have all sorts of uses, logarithms were first invented as a trick to do multiplication! John Napier realized in the early 1600's that instead of having to multiply two large numbers $M$ and $N$, he could, if he knew their logarithms, simply add, because $\log MN = \log M + \log N$. So by constructing a table of logarithms, Napier was actually constructing a simple calculator.
>
> Believe it or not, this technique worked! Tables of logarithms were a standard part of many people's lives for a long time, and the slide rule also operates on this principle.
>
> Besides converting multiplication to addition, logarithms also convert powers to multiplication, as in $\log x^2 = 2 \log x$. This is the basis for logarithmic graph paper: instead of drawing some crazy curve for $y = 2^x$, I can just plot $y$ against the logarithm of the right side, or $x \log 2$, which gives a straight line.
>
> This property of logs also helps us to think about quantities which differ by a huge amount. For example, suppose we had some unit of loudness, the Spinal Tap or ST, such that a normal speaking voice was 1000 ST. Then a whisper might be only 100 ST, while a jet engine could be 1,000,000,000,000 ST. These numbers are just too far apart to think about. So we could take the log base 10 of the quantities instead, so that the voice would be 3 ST, the whisper 2 ST, and the jet 12 ST. Much easier to sink your teeth into. This is the basis for the **decibel**, the usual unit of loudness. The only difference is that decibels (written dB) are for some reason multiplied by 10, so that a whisper is 20 dB and a jet engine 120 dB.
>
> I recently read an article in a newspaper which asserted that a jet engine is *6 times louder* than a whisper. Do you understand the error? How many times louder is the jet really? Spread some mathematical literacy today!


