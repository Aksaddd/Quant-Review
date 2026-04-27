**EXAMPLE 3-5.** Solve the system

$$\begin{aligned} 2x + 3y &= -1 \\ 3x - 4y &= 7 \end{aligned}$$

by both elimination and substitution.

*Solution:* We'll try elimination first. Simply adding these equations gives $5x - y = 6$, which doesn't help us at all; we must first modify the equations. If we multiply the first by $-3$ and the second by 2, we will get

$$\begin{aligned} -6x - 9y &= 3 \\ 6x - 8y &= 14. \end{aligned}$$

Adding these gives $-17y = 17$, so $(x, y) = (\mathbf{1, -1})$. We can check this by substituting $x = 1$ and $y = -1$ into both the equations and making sure they both hold.

If we do this problem by substitution, we have

$$x = -1/2 - 3y/2$$

from rearranging the first equation. Substituting in the second equation yields

$$3(-1/2 - 3y/2) - 4y = 7,$$

from which we find $y$ and then $x$.

In the elimination portion of the prior example, how did we decide to multiply the first equation by $-3$ and the second by 2? In general, when you have two equations, if you multiply the second by the coefficient of one of the variables in the first, and multiply the first by the *negative* of the coefficient of that variable in the second equation, you will then be able to eliminate that variable by adding the resulting equations. (Read that sentence closely and compare it to the example.)

To prove this in general, let the two equations be $a_1x + a_2y = a_3$ and $b_1x + b_2y = b_3$, where all the $a$'s and $b$'s are constants. Multiply the first equation by $-b_1$ and the second by $a_1$. Add the resulting equations. What happens?

When using elimination, you can solve the problem by eliminating either variable, just as with substitution you can substitute for either variable.

Now, there are two special cases of systems of two equations in which we cannot always find a single pair $(x, y)$ to solve the equation. These two cases are demonstrated in the following examples.

**EXAMPLE 3-6.** Solve the system of equations

$$\begin{aligned} 2x - 4y &= 7 \\ x - 2y &= 2. \end{aligned}$$

*Solution:* If we try elimination we will get the astonishing result $0 = 3$. (Try it.) Since this can never be true, we deduce that there are never any solutions to this system. Indeed, if we graph the lines, we will find that they are parallel. Since parallel lines never intersect, the system can have **no solutions**.
