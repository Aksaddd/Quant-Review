If the expression isn't already in exponential notation (rather than using the radical sign), we write it as such:

$$\sqrt{2^5 \cdot 3} = (2^5 \cdot 3)^{1/2}.$$

We next apply the root ($1/2$ in the above example) to each factor separately:

$$(2^5 \cdot 3)^{1/2} = (2^5)^{1/2} \cdot 3^{1/2} = 2^{5/2} \cdot 3^{1/2}.$$

We then evaluate any of the resulting expressions which have integral exponents. If any of the powers of the remaining factors are greater than one, we split the expression into a product of the factor with an integer exponent and the factor with a fractional coefficient less than one. Thus $2^{5/2}$ becomes $(2^2)(2^{1/2})$. We evaluate all parts with integer exponents, then combine everything with fractional exponents into a single expression.

Completing our example,

$$2^{5/2} \cdot 3^{1/2} = 2^2 \cdot 2^{1/2} \cdot 3^{1/2} = 4 \cdot 2^{1/2} \cdot 3^{1/2} = 4(2 \cdot 3)^{1/2} = 4\sqrt{6}.$$

With practice, you'll be able to do this much more quickly.

Here's how I would simplify $\sqrt{96}$ in my mind: I try to find perfect squares which divide 96. I know 96 is 16(6), so $\sqrt{96} = \sqrt{16(6)} = \sqrt{16}\sqrt{6} = 4\sqrt{6}$. Since I know there are no squares besides 1 that divide 6, I know I'm done. You'll agree that this method is quicker than the above step-by-step method, but our first method never fails, whereas the "inspection" method we've described is unreliable until you become experienced. Try some of the following examples using the rigorous method, then by inspection. It shouldn't take long to become pretty good at these.

**EXAMPLE 1-11.** Simplify $\sqrt{1440}$, $\sqrt[3]{\dfrac{144}{125}}$, and $\sqrt[6]{6912}$.

*Solution:* The prime factorization of 1440 is $2^5 \cdot 3^2 \cdot 5$. Following the method we have described, we have

$$\begin{aligned}
\sqrt{1440} &= (2^5 \cdot 3^2 \cdot 5)^{1/2} = (2^5)^{1/2} (3^2)^{1/2} (5)^{1/2} = (2^{5/2})(3)(5^{1/2}) \\
&= (2^{5/2})(3)(5^{1/2}) = 3 \left[(2^2)(2^{1/2})(5^{1/2})\right] = 3(4) 2^{1/2} 5^{1/2} = \mathbf{12\sqrt{10}}.
\end{aligned}$$

By inspection, since 144 is a perfect square which divides 1440, we obtain $\sqrt{1440} = \sqrt{144}\sqrt{10} = 12\sqrt{10}$. Much quicker.

Let's move on to the second one. When dealing with a fraction, first simplify the fraction, then work on the numerator and denominator separately. Thus,

$$\begin{aligned}
\sqrt[3]{\frac{144}{125}} &= \frac{\sqrt[3]{144}}{\sqrt[3]{125}} = \frac{(2^4 \cdot 3^2)^{1/3}}{(5^3)^{1/3}} = \frac{(2^{4/3})(3^{2/3})}{5^{3/3}} \\
&= \frac{2^1 \cdot 2^{1/3} \cdot 3^{2/3}}{5^1} = \left(\frac{2}{5}\right) \left((2^{1/3})(3^{2/3})\right) = \frac{2}{5}\sqrt[3]{(2)(3^2)} \\
&= \mathbf{\frac{2}{5}\sqrt[3]{18}}.
\end{aligned}$$

How would you attack this by inspection?
