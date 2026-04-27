## 5.3 The Last Digit

No matter what number base we are using, often the most important digit of a number is the last digit. Why should the last digit be so important? There is a very simple reason: if we want to know the last digit of the sum or product of two numbers, all we have to do is find the sum or product of their last digits and take the last digit of that result.

*EXERCISE 5-9* Convince yourself that the previous statement is true. Find the last digits of $34 \cdot 17$ and $34 + 17$, first by actually doing the multiplication and addition, then by taking the last digits and just multiplying or adding those. Explain why this works.

The method of the last digit works in any number base and can be used to prove some very useful facts.

*EXERCISE 5-10* In base 10, what digits can the last digit of the square of an integer not be?

**EXAMPLE 5-4.** Find the units digit of $7^{42} + 42^7$.

*Solution:* To find the last digit of $7^{42} + 42^7$, we find the last digit of each of the two quantities in the sum. To find the last digit of $7^{42}$, we break it up into a product of 7's. Since $7^2 = 49$, $7^2$ ends in 9. Since $7^4 = 7^2 \cdot 7^2$, it ends in the same number as $9 \cdot 9$ ends in, or 1. Now we write $7^{42} = (7^4)^{10} \cdot 7^2$. Since $7^4$ ends in 1, the last digit of $(7^4)^{10}$ is the same as the last digit of the product of ten 1's, or 1. Finally, since $(7^4)^{10}$ ends in 1 and $7^2$ ends in 9, $7^{42}$ ends in $1 \cdot 9 = 9$.

In finding the last digit of $42^7$, the tens digit is irrelevant because it does not contribute to the units digit of the product. Hence we are only concerned with $2^7$. Since this is 128, the last digit of $42^7$ is 8. (Make sure you see why the last digit of $42^7$ is the same as that of $2^7$.) Completing our problem, $7^{42} + 42^7$ ends in the same digit as $9 + 8$, or **7**.

## 5.4 Modular Arithmetic

Imagine we decide to do all arithmetic in base 5. Doing arithmetic in different number bases is not always easy; for example, you don't want to memorize a multiplication table for base 8. ($B \cdot C = 84$?!) So just to make it easier on ourselves, we will only consider only the last digits. All numbers which have the same last digit in base 5 will be considered equal:

$$2_5 = 12_5 = 22_5 = 32_5 = \cdots$$

In base 10, this looks like

$$2 = 7 = 12 = 17 = \cdots$$

The usual way to show that we are using this system is to replace the $=$ with a $\equiv$, and also append the suffix (mod 5). We thus write, for example, $12 \equiv 7 \pmod{5}$. We say that **12 is congruent to 7 mod 5**.

Another way to look at mods is that 2, 7, 12, 17, etc. all have the same remainder of 2 when divided by 5. This method of viewing modular arithmetic makes actual computation much easier. It is often
