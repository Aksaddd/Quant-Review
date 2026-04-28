# Chapter 3 — Linear Equations

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 31–41. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 31 / book page 17 -->

# Chapter 3

# *Linear Equations*

## 3.1 What is a Linear Equation?

Any time we write something with an equal sign, we write an equation. Any quantity in an equation which we do not know is called a **variable**, while anything in an equation which can take on only one value is called a **constant**. When a variable term is multiplied by a constant, the constant is called the term's **coefficient**. For example, in the equation $3x + y = 2$, $x$ and $y$ are variables, 2 is a constant term, and 3 is the coefficient of $x$.

The **degree** of a term is the sum of the powers of the variables in that term. For example, the degree of $x$ is one, and the degree of $xy^2$ is three. The degree of an equation is the highest degree of the terms in the equation.

The simplest type of equation is the **linear equation**. A linear equation is an equation whose degree is one. There are also no variables raised to fractional powers. For example, $x + \sqrt{x} = 3$ is not linear.

---

**EXAMPLE 3-1** Which of these equations are linear?

i. $x^2 + y = 4$ &mdash; This equation has degree two, so it is not linear.

ii. $xy = 4$ &mdash; This equation also has degree two, so is not linear.

iii. $x + y + z + w = 0$ &mdash; This has degree one and thus is linear.

iv. $3^x + y = 0$ &mdash; Because of the $3^x$ term, we can't define a degree for this equation, and it is not linear. This is also true of equations with trigonometric functions (page 105) and logarithms.

---

## 3.2 One Equation, One Variable

Let's start with linear equations in one variable, like $x + 4 = 5$ and $3y + 4 = -5$. We solve these with two steps: first move all the constants to one side of the equation and the variable to the other by subtraction and addition; then divide both sides by the coefficient of the variable.


<!-- PDF page 32 / book page 18 -->

**EXAMPLE 3-2** Solve the equation $3x + 5 = 11 + x$ for $x$.

*Solution:* First, subtract 5 from both sides to get

$$3x = 6 + x.$$

Now subtract $x$ from both sides to get

$$2x = 6.$$

Finally, divide by the coefficient, 2, of $x$ to get

$$x = \mathbf{3}.$$

This gives the solution to our equation. It's a good idea to check the answer once you have solved an equation. To do this, just substitute 3 for $x$ in the equation and make sure it works: $3(3) + 5 = 14 = 11 + 3$, so our answer is correct.

---

**EXAMPLE 3-3** Solve the equation $ax + b = c$ for $x$, where $a$, $b$, and $c$ are constants.

*Solution:* Remember that $a$, $b$, and $c$ are just constants here, even though they are letters. Our first step is to subtract $b$ from both sides to get

$$ax = c - b;$$

then we divide by $a$ to get

$$x = \mathbf{\frac{c - b}{a}}.$$

---

**EXAMPLE 3-4** Solve for $y$:

$$\frac{1 + y}{y} = 3.$$

*Solution:* Although this isn't linear, we can make it so by multiplying both sides of the equation by $y$, getting

$$1 + y = 3y.$$

Collecting $y$ terms on one side yields $2y = 1$, so dividing by 2 yields $y = \mathbf{1/2}$.

---

**EXERCISE 3-1** Solve for $y$: $3y + 2 = y - 3 + 4y$.

**EXERCISE 3-2** Solve for $y$: $\dfrac{2y}{3} - 3 = y$.


<!-- PDF page 33 / book page 19 -->

## 3.3 Two Equations, Two Variables

*[Figure: a coordinate plane showing two lines intersecting; line $\ell$ represents the equation $x + y = 3$.]*

Now that we can solve one variable equations, we move on to equations with two variables. For example, try solving the equation $x + y = 3$ for $x$ and $y$. We write a solution to this equation as an **ordered pair** $(x, y)$. Thus, we see that $(3, 0)$ works for the equation, but so does $(0, 3)$, $(6, -3)$, and $(1, 2)$. In fact, there are infinitely many solutions to this equation. As discussed on page 145, when all the solutions to $x + y = 3$ are plotted on a grid as shown at right, line $\ell$ is formed. Now, suppose we say that in addition to $x + y = 3$, we also know that $x - y = 1$. Both of these equations describe lines (as discussed on page 148), which are shown to the right. The only place where both equations are true is where the two lines meet.

There are two standard ways to solve these **systems of equations**.

### Substitution

The method of substitution involves solving one equation for one of the variables in terms of the other. For our problem, this means solving for $x$ in the equation $x + y = 3$. When we say "solve for $x$", we mean put the equation in the form

$$x = \text{something not involving } x.$$

We do this just like in our one variable problems before. Thus $x + y = 3$ becomes $x = 3 - y$. If we substitute this in place of $x$ in the other equation, we get $(3 - y) - y = 1$, so $y = 1$ and $x = 3 - y = 2$.

### Elimination

The elimination method involves adding multiples of the two equations together to cancel one of the variables. For example, if we simply add the equations $x + y = 3$ and $x - y = 1$, we get

$$(x + y) + (x - y) = 3 + 1,$$

or

$$2x = 4.$$

Thus, $x = 2$ and we can substitute this in either of the original equations to get $y = 1$. As you see, we have "eliminated" $y$ from the two equations by adding them together to get an equation involving only $x$.

Usually elimination is not as simple as just adding the equations together. In most cases, we must modify one or both of the equations before adding them together.


<!-- PDF page 34 / book page 20 -->

**EXAMPLE 3-5** Solve the system

$$
\begin{aligned}
2x + 3y &= -1 \\
3x - 4y &= 7
\end{aligned}
$$

by both elimination and substitution.

*Solution:* We'll try elimination first. Simply adding these equations gives $5x - y = 6$, which doesn't help us at all; we must first modify the equations. If we multiply the first by $-3$ and the second by 2, we will get

$$
\begin{aligned}
-6x - 9y &= 3 \\
6x - 8y &= 14.
\end{aligned}
$$

Adding these gives $-17y = 17$, so $(x, y) = \mathbf{(1, -1)}$. We can check this by substituting $x = 1$ and $y = -1$ into both the equations and making sure they both hold.

If we do this problem by substitution, we have

$$x = -1/2 - 3y/2$$

from rearranging the first equation. Substituting in the second equation yields

$$3(-1/2 - 3y/2) - 4y = 7,$$

from which we find $y$ and then $x$.

---

In the elimination portion of the prior example, how did we decide to multiply the first equation by $-3$ and the second by 2? In general, when you have two equations, if you multiply the second by the coefficient of one of the variables in the first, and multiply the first by the *negative* of the coefficient of that variable in the second equation, you will then be able to eliminate that variable by adding the resulting equations. (Read that sentence closely and compare it to the example.)

To prove this in general, let the two equations be $a_1 x + a_2 y = a_3$ and $b_1 x + b_2 y = b_3$, where all the $a$'s and $b$'s are constants. Multiply the first equation by $-b_1$ and the second by $a_1$. Add the resulting equations. What happens?

When using elimination, you can solve the problem by eliminating either variable, just as with substitution you can substitute for either variable.

Now, there are two special cases of systems of two equations in which we cannot always find a single pair $(x, y)$ to solve the equation. These two cases are demonstrated in the following examples.

---

**EXAMPLE 3-6** Solve the system of equations

$$
\begin{aligned}
2x - 4y &= 7 \\
x - 2y &= 2.
\end{aligned}
$$

*Solution:* If we try elimination we will get the astonishing result $0 = 3$. (Try it.) Since this can never be true, we deduce that there are never any solutions to this system. Indeed, if we graph the lines, we will find that they are parallel. Since parallel lines never intersect, the system can have **no solutions**.


<!-- PDF page 35 / book page 21 -->

**EXAMPLE 3-7** Solve the system of equations

$$
\begin{aligned}
2x - 2y &= 6 \\
x - y &= 3.
\end{aligned}
$$

*Solution:* If we try elimination here, we get $0 = 0$. This means that the equations are identical; in fact, the first equation is exactly twice the second. They describe the same line! All the solutions to one equation are also solutions to the other, so there are **infinitely many** solutions.

---

A system of two equations will always fall into one of these categories if we can multiply one equation by some number to make its coefficients the same as the other equation. In the two examples above, the coefficients of the first equation are double those of the second. This means the lines described by the two equations are parallel; hence, they either never intersect (the first example) or they are the same line (the second).

💣 **WARNING:** Always substitute your solution back into the original equations to check that your answer is correct.

---

**EXAMPLE 3-8** Find $(x, y)$ such that $2x = 2y - 4$ and $2y = 2 + x$.

*Solution:* First, we group all the $x$ terms together and all the $y$ terms together on one side as shown:

$$
\begin{aligned}
2x - 2y &= -4 \\
-x + 2y &= 2.
\end{aligned}
$$

(Make sure you see that these two equations are the same as the original equations.) We see that adding these together will eliminate $y$, to give $x = -2$, so $y = 0$. Thus $(x, y) = \mathbf{(-2, 0)}$.

---

**EXAMPLE 3-9** Find all $(x, y)$ such that

$$
\begin{aligned}
2\sqrt{x} + 4\sqrt{y} &= 10 \\
2\sqrt{x} - 3\sqrt{y} &= 3.
\end{aligned}
$$

*Solution:* Even though these are not linear equations, we can solve them as linear equations for $\sqrt{x}$ and $\sqrt{y}$ rather than for $x$ and $y$. (Then, we can just square these results to get $x$ and $y$.) Subtracting the second equation from the first, we find $7\sqrt{y} = 7$, so $\sqrt{y} = 1$. Thus $2\sqrt{x} + 4 = 10$ and $\sqrt{x} = 3$. Squaring these equations for $\sqrt{x}$ and $\sqrt{y}$ yields $(x, y) = \mathbf{(9, 1)}$. Just because the equations are not linear in terms of the variables does not always mean they cannot be solved as linear equations!

---

**EXERCISE 3-3** Solve for $(x, y)$.

i.

$$
\begin{aligned}
3x &= 5 + 2y \\
2x - 2y &= 7
\end{aligned}
$$


<!-- PDF page 36 / book page 22 -->

ii.

$$
\begin{aligned}
\frac{x}{2} + 3y &= 4 \\
x + 6y &= 9
\end{aligned}
$$

iii.

$$
\begin{aligned}
0.1x + y &= 3 \\
0.5x - 3y &= 7
\end{aligned}
$$

iv.

$$
\begin{aligned}
x - y &= 2x + 3 \\
x - 2y &= 5 - 3y
\end{aligned}
$$

---

## 3.4 Word Problems

Word problems are just equations which are written with words rather than with variables. To solve a word problem, we must interpret the words as a set of equations and then use the principles of the last two sections to solve them. (The equations are very often linear, which is why we address word problems in this chapter.)

To show you how to solve the most common types of word problems, we will work through a couple of examples and then leave a few exercises for practice. In our examples we will follow a three step procedure.

> *Step 1:* Define all the variables.
> *Step 2:* Write the equations described by the problem.
> *Step 3:* Solve the equations.

---

**EXAMPLE 3-10** Johnny is twice as old as Gina. Johnny is five years older than Gina. How old is Johnny?

*Solution:* First, we define our variables: let Johnny's age be $J$ and Gina's be $G$. Second, we determine the equations. Since Johnny is twice as old as Gina, $J$ must be twice $G$, so $J = 2G$. Because Johnny is five years older than Gina, then $J$ must be 5 more than $G$, so $J = G + 5$. Solving this system, we find $(J, G) = (10, 5)$, so Johnny is $\mathbf{10}$ years old.

---

**EXAMPLE 3-11** The units digit in a two-digit number is three times the tens digit. If the digits are reversed, the resulting number is 54 more than the original number. Find the original number. *(MAΘ 1990)*

*Solution:* Let $t$ be the tens digit and $u$ the units digit. The value of the number is then $10t + u$. Since the units digit is three times the tens digit, $u = 3t$. If the digits are reversed, the resulting number has value $10u + t$. Thus $10u + t - (10t + u) = 9u - 9t = 54$, so $u - t = 6$. Since $u = 3t$, we have $u - t = 2t = 6$. Finally, $t = 3$ and the number is $\mathbf{39}$.

---

**EXERCISE 3-4** Adult tickets to a football game were $3.25 and student tickets were $1.75. If 1350 fans paid a total of $2700 to attend the game, how many adults attended? *(MAΘ 1992)*


<!-- PDF page 37 / book page 23 -->

The following set of problems includes samples of various types of word problems. Work through all of them, as each one is an example of a very common class of problems.

---

**EXAMPLE 3-12** Jim drives to his mother's house, which is 40 miles away, and then drives back. On the way there he drives 40 miles an hour, but on the way back he drives only 20 mph. What is his average speed for the whole trip?

*Solution:* The answer is NOT 30 mph. Since Jim's mother's house is 40 miles away, it takes him one hour to get there and two to get back, so the whole trip takes 3 hours. The round trip is eighty miles, so his average speed is $80/3 = \mathbf{26\tfrac{2}{3}}$ mph.

All of these "moving" problems, whether they involve driving, walking, rowing a boat, or flying a plane, can be solved using the basic formula

$$\text{rate} \times \text{time} = \text{distance}.$$

This simply means that the rate (speed) you travel times the time you travel is the distance you travel. If you understand this you can do *all* of these problems.

---

**EXERCISE 3-5** Jim drives 40 mph to his mother's house and 20 mph on the way back. Show that his average speed for the trip is $26\tfrac{2}{3}$ mph regardless of the distance to his mother's house.

---

**EXAMPLE 3-13** A frog swims 8 miles downstream in 2 hours. She returns upstream in 14 hours. How fast does the frog swim in still water? *(MAΘ 1987)*

*Solution:* The current helps the frog swim downstream and hinders her swimming upstream. Let the frog's rate in still water be $x$ and the current be $y$. Thus, swimming downstream the frog's rate is $x + y$, while swimming upstream it is $x - y$. Now apply rate times time equals distance: downstream, we have

$$(x + y)(2) = 8,$$

and upstream gives

$$(x - y)(14) = 8.$$

Solving these equations, we find that $(x, y) = (16/7, 12/7)$. Thus, the frog's rate in still water is $\mathbf{16/7}$ miles per hour.

---

**EXAMPLE 3-14** Pipe A can fill a pool in 5 hours, while pipe B can fill it in four. How long will it take for the two to fill the pool if both are operating at the same time?

*Solution:* In one hour, pipe A can fill $1/5$ of the pool. (Make sure you see why.) Similarly, pipe B can fill $1/4$. The two together can thus fill $1/4 + 1/5$ of the pool in one hour. If the two are on for $x$ hours, they fill the fraction $x(1/4 + 1/5)$ of the pool. When this fraction is 1, the pool is full. Thus, we solve

$$x \left(\frac{1}{4} + \frac{1}{5}\right) = 1.$$

Solving yields $x = 20/9$, so it will take $\mathbf{2\tfrac{2}{9}}$ hours to fill the pool if both pipes are operating.


<!-- PDF page 38 / book page 24 -->

**EXAMPLE 3-15** Tom and Huck paint a fence for four hours, after which Jim helps them and they finish two hours later. If Jim had not helped them, it would have taken them 5 more hours to paint the fence. How long would it take for Jim to paint the fence alone?

*Solution:* We'll use the same basic method as in the prior example. Let $T$, $H$, and $J$ be the number of hours it would take for Tom, Huck, and Jim, respectively, to paint the fence alone. Hence, $1/T + 1/H$ is the fraction of the fence Tom and Huck together can paint in an hour. (If you don't quite follow this, compare it to the previous example.) Since we are told that the two together can paint the entire fence in 9 hours, we have

$$9\left(\frac{1}{T} + \frac{1}{H}\right) = 1.$$

The fraction of the house Tom and Huck have painted in four hours is $4(1/T + 1/H)$. Since $1/T + 1/H + 1/J$ represents the fraction of the fence the three can paint in one hour, 2 times this is the amount the three can paint in 2 hours. The sum of these contributions is the entire fence, so

$$4\left(\frac{1}{T} + \frac{1}{H}\right) + 2\left(\frac{1}{T} + \frac{1}{H} + \frac{1}{J}\right) = 1.$$

Since $(1/T + 1/H) = 1/9$, we have

$$\frac{4}{9} + 2\left(\frac{1}{9} + \frac{1}{J}\right) = 1.$$

Solving for $J$ we find that $J = 6$, so Jim can paint the fence alone in $\mathbf{6\text{ hours}}$.

All problems involving some combination of two or three people or things performing a task in some amount of time can be solved using this method. Choose variables representing the total time for each person to do the job and write the problem as equations. These equations are always of the form

$$(\text{time at work})(\text{fraction of work in one unit of time}) = (\text{fraction of job done}).$$

You'll find that this looks quite similar to the familiar rate times time equals distance. It should, for it is exactly the same concept; rate of work times time working equals total work done.

---

**EXERCISE 3-6** A canoeist paddled upstream for 2 hours, then downstream for 3. The rate of the current was 2 mph. When she stopped, the canoeist realized she was 20 miles downstream from her starting point. How many hours will it take her to paddle back to her starting point? *(MAΘ 1992)* If you can do this problem, you should be able to handle any problems involving current.

---

**EXERCISE 3-7** One knight can storm a castle in 15 days. He and his partner can do it in 10 days. How long does it take the partner to storm the same castle alone? *(MAΘ 1987)*

---

# Problems to Solve for Chapter 3

**27.** At a dance party a group of boys and girls exchange dances as follows: one boy dances with 5 girls, a second boy dances with 6 girls, and so on, the last boy dancing with all the girls. If $b$ represents the number of boys and $g$ the number of girls, then find $b$ in terms of $g$. *(AHSME 1958)*


<!-- PDF page 39 / book page 25 -->

**28.** The tens digit of a two-digit number exceeds its units digit by 4. The number exceeds twice the number obtained by reversing the digits of the original number by 10. What is the original number? *(MAΘ 1987)*

**29.** There are 16 coins in a bank. If the coins are all nickels and dimes and they total $1.05, how many nickels are there? *(MATHCOUNTS 1990)*

**30.** George Washington was born 11 years before Thomas Jefferson. In 1770 Washington's age was 3 more than 7 times the age of Jefferson in 1748. What was the sum of the two men's ages in 1750? *(MAΘ 1991)*

**31.** The number 66 is divided into smaller numbers. One number is 3 more than twice the other number. Find the larger of the two numbers. *(MATHCOUNTS 1990)*

**32.** Four pounds of onions costs the same as 2 pounds of string beans. At the same time, 1 pound of string beans costs 3 times as much as a pound of potatoes, while 1 pound of onions costs 4 cents less than 2 pounds of potatoes. What is the total cost (without tax) of 1 pound of each of the vegetables? *(MAΘ 1991)*

**33.** Find two consecutive odd integers such that $1/3$ the smaller plus twice the larger equals 7 more than the sum of the two numbers. *(MAΘ 1990)*

**34.** In a basketball game, the United States has four times as many points as Croatia. A Croatian makes a basket for three points, at which point the United States only has three times as many points. How many points does the United States have? *(Mandelbrot #3)*

**35.** Mike and Joey bought identical loaves of bread and packages of bologna. Mike made sandwiches with 5 slices of bologna and had 4 slices of bread left when he ran out of meat. Joey made sandwiches with 4 slices of bologna and had 4 slices of meat when he ran out of bread. How many slices of bread were in each loaf? *(MAΘ 1992)*

**36.** Sue has $3.08 in pennies, nickels, and quarters. She has four more pennies than quarters and one more nickel than pennies. How many nickels does she have? *(MAΘ 1990)*

**37.** Solve for $c$ in terms of $a$ and $b$ given that

$$\sqrt{a + \frac{b}{c}} = a\sqrt{\frac{b}{c}}.$$

*(AHSME 1955)*

**38.** $K$ takes 30 minutes less time than $M$ to travel a distance of 30 miles. $K$ travels $\tfrac{1}{3}$ mile per hour faster than $M$. If $x$ is $K$'s rate of speed in miles per hour, then find $K$'s time for the distance in terms of $x$. *(AHSME 1952)*

**39.** What is the value of $x$ if 1 minus the reciprocal of $(1 - x)$ equals the reciprocal of $(1 - x)$? *(MAΘ 1992)*

**40.** A train traveling from Aytown to Beetown meets with an accident after 1 hour. The train is stopped for 30 minutes, after which it proceeds at four-fifths of its usual rate, arriving at Beetown 2 hours late. If the train had covered 80 miles more before the accident, it would have been just one hour late. What is the usual rate of the train? *(AHSME 1955)*

**41.** Adam can do a job in 10 days, while Brenda takes 15 days to do it. After Brenda works alone for


<!-- PDF page 40 / book page 26 -->

3 days, Adam and Brenda work together to finish the job. How many days did Adam work? *(MAΘ 1990)*

**42.** A car travels 120 miles from $A$ to $B$ at 30 miles per hour but returns the same distance at 40 miles per hour. What is the average speed for the round trip? *(AHSME 1950)*

**43.** One car left a city at 2:00 PM and traveled at an average speed of 40 miles per hour. A second car left at 4:00 PM, traveled the same route and overtook the first car at 9:00 PM. What was the average speed in miles per hour of the second car? *(MATHCOUNTS 1991)*

**44.** A man can do a job in 9 days and his son can do the same job in 16 days. They start working together. After 4 days the son leaves and the father finishes the job alone. How many days does the man take to finish the job? *(MAΘ 1991)*

**45.** Twenty-five women did $1/5$ of a job in 8 days. Then, because of an emergency, it became necessary to complete the job in the next 20 days. How many additional women needed to be added to the crew of 25 to accomplish this? *(MATHCOUNTS 1989)*

**46.** Two bicyclists are seven-eighths of the way through a mile-long tunnel when a train approaches the closer end at 40 mph. The riders take off at the same speed in opposite directions, and each escapes the tunnel as the train passes them. How fast did they ride? *(Mandelbrot #3)*

**47.** A train, $x$ meters long, traveling at a constant speed, takes 20 seconds from the time it first enters a tunnel 300 meters long until the time it completely emerges from the tunnel. One of the stationary ceiling lights in the tunnel is directly above the train for 10 seconds. Find $x$. *(MAΘ 1992)*

**48.** Two men starting at a point on a circular 1-mile race track walk in opposite directions with uniform speeds and meet in 6 minutes, but if they walk in the same direction, it requires one hour for the faster walker to gain a lap. What is the rate of the slower walker? *(MAΘ 1991)*

**49.** A crew of 30 people can build a certain road in 60 days. After the tenth day the plans are changed; the company wants the road built in 30, not 60, days. How many more people must be hired? *(MAΘ 1992)*

**50.** Jack and Jill went up the hill at a rate of 8 units per minute. They came tumbling down at a rate of 8 units per second. What was their average rate, in units per minute, for the round trip? *(MAΘ 1992)*

🪡 **51.** Two dogs, each traveling 10 ft/sec, run toward each other from 500 feet apart. As they run, a flea flies from the nose of one dog to the nose of the other at 25 ft/sec. The flea flies between the dogs in this manner until it is crushed when the dogs collide. How far did the flea fly? *(MAΘ 1992)*

🪡 **52.** Find the ordered pair $(x, y)$ that is the solution of the system *(MAΘ 1990)*

$$
\begin{aligned}
\frac{x + 2y}{xy} &= \frac{11}{12} \\
\frac{2x - 3y}{xy} &= \frac{2}{3}.
\end{aligned}
$$

**53.** Find the value of $x/y$ if $(3/\sqrt{y}) - (1/\sqrt{x}) = 2/(\sqrt{x} + \sqrt{y})$. *(MAΘ 1992)*


<!-- PDF page 41 / book page 27 -->

🪡 **54.** When three numbers are added two at a time, the sums are 29, 46, and 53. What is the sum of all three numbers? *(MATHCOUNTS 1991)*

🪡 **55.** Each valve $A$, $B$, and $C$, when open, releases water into a tank at its own constant rate. With all three valves open, the tank fills in 1 hour, with only valves $A$ and $C$ open it takes 1.5 hour, and with only valves $B$ and $C$ open it takes 2 hours. How long will it take to fill the tank with only valves $A$ and $B$ open? *(AHSME 1973)*


