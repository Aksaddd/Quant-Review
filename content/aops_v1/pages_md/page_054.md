That we can write it this way is a consequence of the fact that our usual number system is **base 10**, meaning we have 10 digits. Each digit represents a multiple of a power of 10, based on its position. To make this clearer we could write

$$7 \times 10^6 + 9 \times 10^5 + 6 \times 10^4 + 5 \times 10^3 + 8 \times 10^2 + 4 \times 10^1 + 1 \times 10^0.$$

Why do we count the way we do, following the number 9 with a new number consisting of a 1 and a 0? Having used 10 digits (0 through 9) to count to 9, we make a new "tens place," and assume that the digit in that position is the number of tens. For example, 57 is 5 tens and 7 ones. This saves us from needing a new digit for each number; we can stick to our original ten digits. When we get up to 99, we need to add another place, making the next position represent the number of hundreds.

Humans use 10 digits because we have ten fingers. However, what if we were cartoon characters, with only 8 fingers? Then we might only use the eight digits $0, 1, \ldots, 7$. To go higher than 7, we would create an "eights place," so that 25 in our new number system would represent two 8's and five 1's, for example, $6543$ means $6 \times 8^3 + 5 \times 8^2 + 4 \times 8 + 3$. To get rid of the confusion of going back and forth between the two bases, we use the notation $47_{10}$ means the base 10 number 47 and $47_8$ means the base 8 number 47. (What is this in base 10?) This notation carries over into other bases as well.

**EXAMPLE 5-1.** What is the base 7 number $3456_7$ in base 10?

*Solution:* All we have to do is write

$$3 \times 7^3 + 4 \times 7^2 + 5 \times 7^1 + 6 \times 7^0 = 3(343) + 4(49) + 5(7) + 6(1) = \mathbf{1266}.$$

**EXAMPLE 5-2.** Write the base 10 number 216 in base 4.

*Solution:* The first few powers of 4 are 1, 4, 16, 64, 256, $\ldots$ Clearly we can't use 256 or any greater power. The highest power which is less than 216 is $64 = 4^3$. The multiples of 64 are 64, 128, and 192; since $192 = 64 \times 3$ is still less than 216, the first digit is 3. Why don't we just use 2 64's? If so we would need more than 3 16's, but we are only allowed 3 nonzero digits to represent the number of 16's. Try it and see! To find the second digit, we look at what is left once we have taken out three 64's, or $216 - 192 = 24$.

In general, to find how many times one number goes into another, we can divide the first by the second and throw out the remainder. Doing this with 24 and 16, the quotient is 1.5, so only one 16 is needed (two 16's are too many), and the second digit is 1. We subtract this 16 from what is left, to get $24 - 16 = 8$. Dividing this by $4^1 = 4$, the quotient is 2, so the third digit is 2. Subtracting $8 - 2 \cdot 4$, we get zero, so the remaining digit is zero since we don't need any 1's. The number in base 4 is $\mathbf{3120_4}$.

*EXERCISE 5-4* Find the base 10 representations of $47_8$, $47_9$, and $47_{16}$.

*EXERCISE 5-5* Find the base 8, 9, and 16 representations of $47_{10}$.
