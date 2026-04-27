We can do this because if the last digits in base 5 are the same before the addition, they will be the same after the addition. Clearly the same will be true for subtraction.

How about for multiplication? Again, the same thing should hold. If the last digits are the same before the multiplication, they will be the same after.

Not only can we multiply or add the same quantites to both sides, but if $x$ and $y$ have the same last digit in base 5, then we can add $x$ to one side and $y$ to the other in mod 5. For example, since 8 and 13 have the same last digit in base 5,

$$12 + 13 \equiv 7 + 8 \pmod{5}.$$

Applying this concept to multiplication, since 12 and 7 are congruent mod 5, we can multiply one side by 12 and the other by 7, yielding

$$12^2 \equiv 7^2 \pmod{5}.$$

In this manner, we can raise the two sides to any positive integral power!

WARNING: Division is a much more complicated matter. For instance, clearly $5 \equiv 10 \pmod{5}$, but if we divide both sides by 5, we have $1 \equiv 2 \pmod{5}$, an obviously false relation. There is something wrong here, and that something will be investigated in the next volume. Just remember that division doesn't generally work in modular arithmetic.

In finding the last digit of a sum or product of two numbers, we don't need to do the entire sum or product, just the sum or product of the last digits of the two numbers. In mods, this is reflected by the fact that we can "mod out" before or after doing operations; the order doesn't matter. By this we mean that we can mod out the factors of a product and then multiply the results rather than having to mod out the product of the numbers. For example, since $9899 \equiv 4 \pmod{5}$ and $7677 \equiv 2 \pmod{5}$, we can say $9899 \cdot 7677 \equiv 4 \cdot 2 \equiv 8 \equiv 3 \pmod{5}$ rather than first multiplying 9899 and 7677 and modding out the product. Make sure you follow this; it is a very important technique. Try to use it to show that $9453 \cdot 6824 \equiv 6782 \cdot 5675341 \equiv 2 \pmod{5}$.

Let's summarize what we can do with congruences. If $a \equiv b \pmod{m}$, then for all positive integers $c$:

1. $a + c \equiv b + c \pmod{m}$
2. $a - c \equiv b - c \pmod{m}$
3. $ac \equiv bc \pmod{m}$
4. $a^c \equiv b^c \pmod{m}$
5. $(a + b) \pmod{m} \equiv a \pmod{m} + b \pmod{m}$
6. $ab \pmod{m} \equiv \bigl(a \pmod{m}\bigr)\bigl(b \pmod{m}\bigr)$

You may need to chew on those last two a bit, though they are among the most useful. They just restate the fact that we can mod out before or after we add or multiply.
