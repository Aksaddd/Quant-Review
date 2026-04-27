At some point in the study of primes, the question arises: How many primes are there? (Do you have a guess?) It was shown by a Greek that there have to be infinitely many primes. The proof is an easy application of contradiction.

*Proof:* Assume for the sake of contradiction that there are only finitely many primes and call them $p_1, p_2, \ldots, p_n$. Now consider the number $P = p_1 p_2 \cdots p_n + 1$. Clearly this number is not divisible by any of the $p_i$, since dividing by any $p_i$ will leave a remainder of 1. But since $P$ has no prime factor, it has no factor. Thus $P$ is prime; but this is a new prime, not one of the $p_i$, which we assumed were all the primes. This is a contradiction, so the original assumption of finitely many primes must be false. If you don't understand contradiction, read about it on page 254 and return.

## 5.7 Common and Uncommon Factors

Given two numbers $m$ and $n$, it is often important to think about what factors they have in common. For example consider the numbers 84 and 112, which can be factored into $2^2 \cdot 3 \cdot 7$ and $2^4 \cdot 7$, respectively. What prime factors are in common? Exactly two 2's and one 7.

Given the prime factors that are in common, we can write down the composite common factors as well by combining the primes. In our example, the composite common factors are $2^2 = 4$, $2 \cdot 7 = 14$, and $2^2 \cdot 7 = 28$.

The largest factor shared by two numbers is called their **greatest common factor**, or GCF. The greatest common factor is found by multiplying together all the common prime factors, so that for 84 and 112 we have 28 as the GCF. Once we can do the prime factorizations of two numbers, finding the GCF is easy: just combine all the common prime factors. The GCF of two numbers is usually expressed by writing the numbers in parentheses separated by a comma; for example, $(84, 112) = 28$. (Yes, this does look uncomfortably like an ordered pair.)

What about two numbers which, like 28 and 15, have no common factors? In this case, the greatest common factor is 1. Such numbers are called **relatively prime**.

**EXAMPLE 5-11.** Find the GCF of 100 and 1000.

*Solution:* The numbers factor as $2^2 \cdot 5^2$ and $2^3 \cdot 5^3$, so they share two 2's and two 5's. The product of these common factors is $2^2 \cdot 5^2 = \mathbf{100}$.

*EXERCISE 5-28* Find $(117, 165)$, $(102, 119)$, and $(96, 36)$.

*EXERCISE 5-29* Prove that $(a, b)$ must be less than or equal to $a$, and $a - b$, where $a > b$.

Having analyzed the common factors of two integers, we can next think about the factors which are not in common. The **least common multiple** (LCM) of two integers is the smallest number which both integers divide evenly.

To see how the LCM works, let's return to our original pair, 84 = $2^2 \cdot 3 \cdot 7$ and $112 = 2^4 \cdot 7$. If an integer is divisible by 84, it must be divisible by two 2's, a 3, and a 7; if it is divisible by 112, it must be divisible by four 2's and one 7. Since we want it to be divisible by both, the LCM must contain four 2's, one 3, and one 7. Moreover, the LCM should not be divisible by anything else, or it would be larger than $2^4 \cdot 3 \cdot 7 = 336$, which is already divisible by both 84 and 112.
