For the third one, inspection is at a loss. We turn to our method:

$$\sqrt[6]{6912} = (2^8 \cdot 3^3)^{1/6} = 2^{4/3} \cdot 3^{1/2} = 2(2^{1/3} \cdot 3^{1/2}) = 2(2^{2/6} \cdot 3^{3/6}) = 2\sqrt[6]{4(27)} = \mathbf{2\sqrt[6]{108}}.$$

Notice that we reduced the fractional exponents ($8/6 = 4/3$) before removing the integer parts. This keeps us from missing simplifications of expressions like $\sqrt[6]{9} = (3^2)^{1/6} = 3^{1/2} = \sqrt{3}$. If we don't simplify the $2/6$, we might come to the erroneous conclusion that $\sqrt[6]{9}$ is irreducible.

**EXERCISE 1-4** Find the following.

i. $\sqrt{27}$
ii. $\sqrt[3]{128}$
iii. $\sqrt[4]{1600}$
iv. $\sqrt[5]{9095625}$
v. $\sqrt[3]{\dfrac{36000}{243}}$
vi. $\sqrt[6]{\dfrac{56}{126}}$

## 1.4 Rationalizing Denominators

Rationalizing denominators is exactly what it sounds like: making the denominators of fractions rational. A rational number is a number which can be expressed as the ratio of two integers, i.e. a fraction. When rationalizing denominators, we usually make the denominator an integer. For example, consider the expression $1/\sqrt{2}$. If we multiply the numerator and the denominator by $\sqrt{2}$, we have

$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \cdot 1 = \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}.$$

As you can see, multiplying the numerator and denominator of a fraction by the same value doesn't change the value of the fraction because it is the same as multiplying by 1. Remember this fact, for we will use it often. Although the expressions $1/\sqrt{2}$ and $\sqrt{2}/2$ are equal, we will almost always use $\sqrt{2}/2$ as the preferred expression because the denominator is a rational number.

We've seen how to handle square roots in the denominator; just multiply the top and bottom of the fraction by the square root and the denominator is rationalized. For other roots, we must be more crafty. First, we reduce the radical as in the previous section. Then we split the expression under the radical into its prime factors and treat each factor separately. Consider $1/\sqrt[3]{12}$. From our first two steps, we have

$$\frac{1}{\sqrt[3]{12}} = \frac{1}{\sqrt[3]{2^2}\sqrt[3]{3}}.$$

To get rid of the $\sqrt[3]{2^2}$, we multiply top and bottom by $\sqrt[3]{2}$:

$$\frac{1}{\sqrt[3]{2^2}\sqrt[3]{3}} \left(\frac{\sqrt[3]{2}}{\sqrt[3]{2}}\right) = \frac{\sqrt[3]{2}}{\sqrt[3]{2^3}\sqrt[3]{3}} = \frac{\sqrt[3]{2}}{2\sqrt[3]{3}}.$$

To rationalize the $\sqrt[3]{3}$, we multiply by $\sqrt[3]{3^2}$ to make the denominator $2\sqrt[3]{3^3}$:

$$\frac{1}{\sqrt[3]{12}} = \frac{\sqrt[3]{2}}{2\sqrt[3]{3}} \left(\frac{\sqrt[3]{3^2}}{\sqrt[3]{3^2}}\right) = \frac{\sqrt[3]{2}\sqrt[3]{3^2}}{2\sqrt[3]{3^3}} = \frac{\sqrt[3]{18}}{2 \cdot 3} = \frac{\sqrt[3]{18}}{6}.$$
