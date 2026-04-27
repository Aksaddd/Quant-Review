As you may have guessed, we have chosen our multiplying factors to make the exponent of the factor under the radical equal to the root. For example, in our final step above the power of 3 under the radical in $\sqrt[3]{3}$ is 1. To make that power 3, we must multiply by $\sqrt[3]{3^2}$, so that $\sqrt[3]{3}\sqrt[3]{3^2} = \sqrt[3]{3^3} = 3$, a rational number. (Remember to multiply the numerator by this factor too.)

**EXAMPLE 1-12.** Rationalize the denominator of $\dfrac{2\sqrt{5}}{3\sqrt[4]{72}}$.

*Solution:* First we split everything into prime factors:

$$\frac{2\sqrt{5}}{3\sqrt[4]{72}} = \frac{2\sqrt{5}}{3\sqrt[4]{2^3}\sqrt[4]{3^2}}.$$

For the factor 2, we must multiply by $\sqrt[4]{2}$, to get $\sqrt[4]{2^4}$. Likewise, for the factor 3, we multiply by $\sqrt[4]{3^2}$ to get $\sqrt[4]{3^4}$.

$$\begin{aligned}
\frac{2\sqrt{5}}{3\sqrt[4]{72}} &= \frac{2\sqrt{5}}{3\sqrt[4]{2^3}\sqrt[4]{3^2}} \cdot \frac{\sqrt[4]{2}}{\sqrt[4]{2}} = \frac{2\sqrt{5}\sqrt[4]{2}}{3\sqrt[4]{2^4}\sqrt[4]{3^2}} \\
&= \frac{2\sqrt{5}\sqrt[4]{2}}{3 \cdot 2 \sqrt[4]{3^2}} \cdot \frac{\sqrt[4]{3^2}}{\sqrt[4]{3^2}} = \frac{2\sqrt{5}\sqrt[4]{2}\sqrt[4]{3^2}}{6\sqrt[4]{3^4}} = \frac{\sqrt[4]{25}\sqrt[4]{2}\sqrt[4]{9}}{3 \cdot 3} \\
&= \frac{\sqrt[4]{450}}{9}.
\end{aligned}$$

Don't feel bad if you need to go through all those equations more than once!

**EXERCISE 1-5** Express the following as fractions with rational denominators.

i. $3/\sqrt{3}$
ii. $\sqrt{2}/\sqrt{6}$
iii. $2/\sqrt[3]{24}$
iv. $1/\sqrt[3]{1800}$
v. $5^{1/3}/5^{5/3}$
vi. $(3^{1/2} 2^{1/3})/(3^{1/6} 2^{3/2})$

What if we have an expression like $1/(1 + \sqrt{2})$? Multiplying top and bottom by $\sqrt{2}$ does little good, as the result is $\sqrt{2}/(\sqrt{2} + 2)$, which still has an irrational denominator. There is, however, a way to rationalize this denominator: we multiply top and bottom by $1 - \sqrt{2}$. What happens? We will see if we expand the product $(1 + \sqrt{2})(1 - \sqrt{2})$, to get

$$(1 + \sqrt{2})(1 - \sqrt{2}) = 1(1 - \sqrt{2}) + \sqrt{2}(1 - \sqrt{2}) = 1 - \sqrt{2} + \sqrt{2} - 2 = -1.$$

The result is rational, and we have

$$\frac{1}{1 + \sqrt{2}} \cdot \frac{1 - \sqrt{2}}{1 - \sqrt{2}} = \frac{1 - \sqrt{2}}{(1 + \sqrt{2})(1 - \sqrt{2})} = \frac{1 - \sqrt{2}}{-1} = \sqrt{2} - 1.$$

The quantity $1 - \sqrt{2}$ is called the **conjugate radical** of $1 + \sqrt{2}$. We find the conjugate radical of a two-term expression by changing the sign in front of one radical term. Multiplying top and bottom by the conjugate radical of an expression in the denominator will always make the denominator rational. This only works for square roots, and only for two-term expressions like $1 + \sqrt{2}$, $3 - 4\sqrt{2}$, $\sqrt{2} - \sqrt{3}$, etc.
