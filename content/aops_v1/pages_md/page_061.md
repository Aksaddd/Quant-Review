## 5.6 Primes

Primes are the most important integers. There is a simple reason for this: every other number can be broken down into a product of primes. For example, 15 can be written as $3 \cdot 5$, the product of the primes 3 and 5, or 48 as $16 \cdot 3 = 2^4 \cdot 3$, with the primes 2 and 3. By definition, primes cannot be broken down any further, for they have no divisors to split into. The splitting up of numbers into prime factors, or **prime factorization**, is extremely useful, because each number has only one distinct prime factorization. (Here distinct means that, for example, $2^4 \cdot 3$, $3 \cdot 2^4$, and $2 \cdot 2 \cdot 3 \cdot 2$ are considered the same.)

*EXERCISE 5-25* Write down the prime factorizations of all integers from 2 to 12.

*EXERCISE 5-26* What is the prime factorization of 256?

Finding the prime factorization of small numbers is very easy using only trial and error. To factor larger numbers, however, we need to be a little more systematic. One important tool is the divisibility tricks we have derived. We can easily factor out all 5's and 2's, for example. We can then test for 3's and 11's. For many numbers, we will already be well on our way with just these two methods.

For others we have to resort to trial and error, going up through the primes and dividing by each to see if it works. A tool to limit the amount of searching we have to do is to think about what the largest prime involved can be. Call the number we intend to factor $N$. Clearly there cannot be more than one factor greater than $\sqrt{N}$, since if there were more than one, their product would exceed $N$. Similarly, if $N$ is not prime, there must be at least one factor less than or equal to $\sqrt{N}$. Why? Since $N$ is not prime, it must have at least two factors other than itself and 1. Either both are greater than $\sqrt{N}$, which we have shown is impossible, or at least one is less than or equal to $\sqrt{N}$. Hence if we cannot find a prime less than $\sqrt{N}$ which divides $N$, we know $N$ is prime.

**EXAMPLE 5-9.** Let's see how all this works in practice by factoring 123420. We first get rid of all 10's, and convert them to 2's and 5's: $123420 = 10 \cdot 12342 = 2 \cdot 5 \cdot 12342$. Note that upon finding the prime factors 2 and 5 here, we divide 123420 by them and continue our job with the result, 12342. (How would not doing so affect our search for the prime factorization? Try it and see.)

Since the number left is divisible by 2, but not by any more 2's after that, we can take out one more $2$: $2 \cdot 5 \cdot 12342 = 2^2 \cdot 5 \cdot 6171$. We then test the number which remains for 3's and 11's. The sum of the digits of 6171 is $6 + 1 + 7 + 1 = 15$, which is divisible by 3 but not 9, so we can take out exactly one 3 to get $2^2 \cdot 3 \cdot 5 \cdot 2057$. The alternating sum of the digits of 2057 is $2 - 0 + 5 - 7 = 0$, which is divisible by 11, so 2057 is divisible by 11, and we have $2^2 \cdot 3 \cdot 5 \cdot 11 \cdot 187$. Testing 187, we again find divisibility by 11, leaving $2^2 \cdot 3 \cdot 5 \cdot 11^2 \cdot 17$. Since 17 is prime, this is a complete factorization.

**EXAMPLE 5-10.** Solution: Clearly 2 and 5 do not divide 97; 3 does not divide it because the sum of the digits, 16, is not divisible by 3; 7 does not divide it if we do the long division. But these are all the primes less than $\sqrt{97} \approx 10$, so 97 is a prime.

*EXERCISE 5-27* Factor 141, 1441, and 14441.
