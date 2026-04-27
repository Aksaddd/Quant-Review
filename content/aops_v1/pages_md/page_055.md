The presence of base 16 in the previous exercises raises a new question: what if we want to use a base greater than 10? We will need more digits than the usual 10, so all we do is use some other symbols. The most common such case is base 16, or **hexadecimal** (six-plus-ten-imal). Here we use the digits

$$0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F.$$

Thus $A_{16} = 10_{10}$ and $F_{16} = 15_{10}$. If we had a high enough base we might have to start using smiley faces and triangles for digits, but there would be little use for such a system.

*EXERCISE 5-6* Find the base 10 equivalents of $BEE_{16}$, $DEF_{16}$, and $A1_{16}$.

At the opposite extreme from all these digits is the lowly base 2, or **binary**. Here the only two digits are 0 and 1, and counting looks like 1, 10, 11, 100, 101, 110, $\ldots$

*EXERCISE 5-7* How do you multiply a number by 2 in base 2?

*EXERCISE 5-8* Do some conversions into and out of binary.

**EXAMPLE 5-3.** Perform the addition $1001110_2 + 11001101_2$ without converting the two numbers to decimal. Check your answer by converting to decimal, adding, and converting back.

*Solution:* We can do the addition just like ordinary base 10 addition, writing the numbers one above the other like so:

$$\begin{array}{r}
1\,0\,0\,1\,1\,1\,0 \\
+\;1\,1\,0\,0\,1\,1\,0\,1 \\
\hline
\end{array}$$

If two 0's are in a column, a zero goes in the result in the same column. If a 1 and a 0 are in a column, a 1 goes below. If two 1's are together, the sum is 2, which in binary is $10_2$. Thus we must carry the 1, and put a 0 below. The 'carrying' process works in base 2 just like in base 10. (Compare this process to adding 56 and 65 in base 10.) This carried 1 will add to the numbers in the next column, making 1 if both are 0, $2$ (or $10_2$) with a 1 and a 0, and 3 (or $11_2$) with two 1's. For the latter two we will have to carry another 1, and so on. Using these rules we can fill in the digits of the result from right to left, as usual:

$$\begin{array}{r}
1\,1\quad\quad\quad\quad\;\;\;1\,1 \\
1\,0\,0\,1\,1\,1\,0 \\
+\;1\,1\,0\,0\,1\,1\,0\,1 \\
\hline
1\,0\,0\,0\,1\,1\,0\,1\,1
\end{array}$$

We've placed the carried digits above the columns they're carried to. The result is $100011011_2 = 256 + 16 + 8 + 2 + 1 = 283_{10}$. To confirm this we convert the original numbers to decimal, getting $1001110_2 = 64 + 8 + 4 + 2 = 78_{10}$ and $11001101_2 = 128 + 64 + 8 + 4 + 1 = 205_{10}$, and note that $205_{10} + 78_{10} = 283_{10}$, as desired.

We have seen that the operation of carrying works in binary. This procedure works in any base. Say we are adding the base 7 numbers $235_7$ and $114_7$. When we add the two rightmost digits we get $9 = 12_7$, so we place a 2 below the line and carry the 1.
