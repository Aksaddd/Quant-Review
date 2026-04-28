# Chapter 4 — Proportions

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 42–52. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 42 / book page 28 -->

# Chapter 4

# *Proportions*

## 4.1 Direct and Inverse

Proportions are a method of relating one quantity to another. When we say that 5 apples cost 39 cents, we create a relationship between apples and money: 5 apples = 39 cents. If we let $a$ be the number of apples and $c$ be cost, we can write this relation as $a/c = 5/39$. This is read as, "The ratio of apples to cents is 5 to 39." From this we can then determine the price of any number of apples. This is an example of a **direct proportion**. In a directly proportional relationship, the quotient of the two quantities is a constant, so when one of the quantities increases, the other does also. The best way to solve proportion problems is to write the equation relating the two quantities:

$$\frac{\text{apples}}{\text{cost}} = \frac{5}{39}.$$

If we are ever given the number of apples or the cost, we simply substitute that in the appropriate place to get the other.

Ratios are not always written as fractions. Sometimes they are written with colons as $a : c = 5 : 39$, where the colon takes the place of the division sign. For example, we may say that the ratio of trucks to cars in a parking lot is $4 : 3$. This means that out of every 7 vehicles in the lot, 4 are trucks and 3 are cars, or $4/7$ are trucks and $3/7$ are cars. When working problems, it is always best to write the ratios as fractions rather than using colons.

Ratios are written using colons in part to allow us to consider the ratio of three quantities. For example, if Jim is 20 years old, Jane is 10, and Sam is 5, we can say that the ratio of their ages is $20 : 10 : 5$, or $4 : 2 : 1$. (Make sure you see why these two expressions are the same.) Clearly, we can't use fractions in a convenient way to express the relationship among more than two quantities.

---

**EXAMPLE 4-1** A ten foot pole casts an eight foot shadow. How long is a pole which casts a twelve foot shadow?

*Solution:* Since the height of an object is directly proportional to the length of its shadow, we can write

$$\frac{\text{pole}}{\text{shadow}} = \frac{10}{8}.$$


<!-- PDF page 43 / book page 29 -->

We can simply substitute 12 in where 'shadow' is and get our answer:

$$\frac{\text{pole}}{12} = \frac{10}{8}.$$

Hence, the pole is $\mathbf{15\text{ feet}}$ long.

---

**EXAMPLE 4-2** The ratio of boys to girls in a class is $3 : 2$. If there are 35 students in the class, how many girls are there?

*Solution:* For every 3 boys there are 2 girls. Since out of every 5 students 2 are girls, we know that $2/5$ of the students are girls. Thus, there are $35(2/5) = \mathbf{14}$ girls.

---

**EXERCISE 4-1** In 4 games, Michael Jordan scores 124 points. If he continues scoring at this rate, how many points will he score in the next 6 games?

**EXERCISE 4-2** The ratio of wins to losses of the Yankees is $15 : 16$. If the Yankees lost 64 games, how many games did they play?

---

If a quantity is directly proportional to more than one variable, it is **jointly proportional** to those values. In one of the ensuing examples you will see this.

A relationship where two quantities have a constant product is called an **inverse proportion**. When one quantity increases in an inverse proportion, the other decreases. For example, if the area of a rectangle is 40, the length and width are inversely proportional: $lw = 40$. If the length of the rectangle is doubled and the area is to remain the same, we must divide the width by 2.

The constant product in inverse proportions and the constant quotient in direct proportions are often called the **constant of proportionality**.

---

**EXAMPLE 4-3** If $x$ and $y$ are inversely proportional and $x = 10$ when $y = 6$, what is $x$ when $y = 4$?

*Solution:* We are told $xy = (6)(10) = 60$, so when $y = 4$, we have $xy = 4x = 60$ and $x = \mathbf{15}$.

---

**EXAMPLE 4-4** Given that $x$ is directly proportional to $y$ and to $z$ and is inversely proportional to $w$, and that $x = 4$ when $(w, y, z) = (6, 8, 5)$, what is $x$ when $(w, y, z) = (4, 10, 9)$?

*Solution:* Because $x$ is inversely proportional to $w$, when all other variables are constant, $xw$ is constant. Similarly, when the other two variables are constant, each of $x/y$ and $x/z$ is constant. We can combine all these by saying $xw/yz$ is constant. Thus, from the problem we have

$$\frac{xw}{yz} = \frac{(4)(6)}{(8)(5)} = \frac{3}{5}.$$

When $(w, y, z) = (4, 10, 9)$, we find

$$x = \frac{3yz}{5w} = \mathbf{\frac{27}{2}}.$$

---

**EXAMPLE 4-5** It takes 3 days for 4 people to paint 5 houses. How long will it take 2 people to paint 6 houses?


<!-- PDF page 44 / book page 30 -->

*Solution:* Is the number of houses directly proportional or inversely proportional to the number of days and the number of people? If we have more houses, we will need more time, so the number of houses is directly proportional to the number of days. Similarly, if we have more houses and keep time constant, we need more people, so the number of houses is directly proportional to the number of people as well.

Direct proportion means that the quotient is constant, so both days and people are on the opposite side of the fraction from houses. Thus, our relationship among the three is

$$\frac{\text{houses}}{(\text{people})(\text{days})} = \frac{5}{12},$$

and the number of days necessary is

$$\text{days} = \frac{12(\text{houses})}{5(\text{people})} = \frac{(12)(6)}{(5)(2)} = \mathbf{\frac{36}{5}}.$$

---

**EXAMPLE 4-6** It is four o'clock now. How many minutes will pass before the minute and hour hands of a clock are coincident (at the same exact place)?

*Solution:* The answer is NOT 20, because the hour hand moves as the minutes hand does. When the minute hand is at 20 minutes, the hour hand has moved $20/60 = 1/3$ of the way from 4 hours to 5 hours. Now, suppose $x$ minutes have passed. The hour hand has gone $x/60$ of the way from 4 hours to 5 hours. Since 4 hours on a clock also represents 20 minutes and there are 5 minutes between the 4 and 5 hour marks on a clock, $x/60$ of the way from 4 to 5 is the same place as $20 + 5(x/60)$ minutes. (Check this by seeing what happens when $x$ is 0, 30, or 60.) We seek the place where this equals the number of minutes passed, $x$:

$$x = 20 + 5\left(\frac{x}{60}\right).$$

Solving this equation yields $x = \mathbf{240/11}$ minutes.

Some sources might give you a formula for "clock problems," as these are called. Don't bother memorizing it! It is much more important that you learn the *method* to solve this type of problem.

---

**EXERCISE 4-3** If 5 hens can lay 24 eggs in 5 days, how many days are needed for 8 hens to lay 20 eggs?

---

## 4.2 Manipulating Proportions

Now that we have learned how to use proportions in problems, we will discuss various ways of manipulating proportions. These manipulations are most useful in solving geometry problems involving ratios.

As a first example, we will prove that if $a/b = c/d$, then all of the following equalities hold:

$$\frac{a}{b} = \frac{c}{d} = \frac{a + c}{b + d} = \frac{a - c}{b - d} = \frac{a + kc}{b + kd}.$$


<!-- PDF page 45 / book page 31 -->

We can prove all of these by just showing the last, that if $a/b = c/d$, then $a/b = (a + kc)/(b + kd)$ for all $k$. (Using $k = 1$ and $k = -1$, we get the other equalities.) Since $a/b = c/d$, we have $d/b = c/a$ and

$$\frac{a + kc}{b + kd} = \frac{a\bigl(1 + k(c/a)\bigr)}{b\bigl(1 + k(d/b)\bigr)} = \frac{a}{b}\left(\frac{1 + k(c/a)}{1 + k(c/a)}\right) = \frac{a}{b}.$$

Thus, the above equalities are all true.

Another very common type of proportion manipulation is multiplying given proportions. For example, if we are given $x/y = 4/5$ and $z/y = 4/3$, we can find $x/z$ as

$$\frac{x}{z} = \left(\frac{x}{y}\right)\left(\frac{y}{z}\right) = \left(\frac{4}{5}\right)\left(\frac{3}{4}\right) = \frac{3}{5}.$$

Note how we multiply the ratios to cancel the $y$'s.

---

**EXAMPLE 4-7** Find $x/y$ if $\dfrac{x + 2y}{x - y} = \dfrac{3}{4}$.

*Solution:* Although we spent this short section discussing fancy manipulations, most problems still call for simple algebra. Getting rid of the fractions by multiplying both sides by $4(x - y)$ yields $4(x + 2y) = 3(x - y)$, and rearraging this yields $x + 11y = 0$. To get $x/y$ we simply subtract $11y$, yielding $x = -11y$, and divide, so $x/y = \mathbf{-11}$.

---

**EXERCISE 4-4** Find $2y/x$ if $x/3z = 3$ and $y/4z = 2$.

---

## 4.3 Conversion Factors

A week after arriving at college, I asked a new friend of mine, a Canadian, how tall he was, and he responded 180 centimeters. I stared dumbly then asked, "How many feet?" He didn't know. I was stunned. I remembered that one inch was about 2.54 centimeters and 1 foot was 12 inches. So, to convert his height in centimeters to feet, did I divide by 2.54 and multiply by 12, multiply by 2.54 then divide by 12, or what?

**Conversion factors** will always give you the right answer when trying to convert from one unit to another. It's very simple, and often used as a method to solve proportion problems. We write down the conversions we know:

$$
\begin{aligned}
1 \text{ inch} &= 2.54 \text{ centimeters,} \\
1 \text{ foot} &= 12 \text{ inches.}
\end{aligned}
$$

If we divide both sides of the first equation by 2.54 centimeters, we have

$$\frac{1 \text{ inch}}{2.54 \text{ centimeters}} = \frac{2.54 \text{ centimeters}}{2.54 \text{ centimeters}} = 1.$$

Similarly,

$$\frac{1 \text{ foot}}{12 \text{ inches}} = 1.$$


<!-- PDF page 46 / book page 32 -->

Thus, we can multiply 180 centimeters by these factors to convert them to equivalent lengths in other units:

$$180 \text{ centimeters} = 180 \text{ centimeters} \times \frac{1 \text{ inch}}{2.54 \text{ centimeters}} \times \frac{1 \text{ foot}}{12 \text{ inches}} \approx 5.9 \text{ feet.}$$

Why does this work? First, each of the fractions in the above expression equals 1, so multiplying by these doesn't change the length (because multiplying an expression by 1 doesn't change the value of the expression). Second, where did the centimeters and the inches go? The 'inches' in the numerator of one fraction cancelled with the 'inches' in the denominator of another. Similarly, the 'centimeters' in the original expression cancelled with those in the denominator of one of the fractions.

How did we decide to write

$$1 \text{ inch} = 2.54 \text{ centimeters}$$

as

$$\frac{1 \text{ inch}}{2.54 \text{ centimeters}} = 1$$

rather than

$$\frac{2.54 \text{ centimeters}}{1 \text{ inch}} = 1?$$

Both of these are true, but if we use the second in our conversion, we have

$$180 \text{ centimeters} \times \frac{2.54 \text{ centimeters}}{1 \text{ inch}}.$$

In this, the 'centimeters' do not cancel as they did before. We thus choose our conversion factor to make the 'centimeters' cancel.

Note that while we have succeeded in converting 180 centimeters to feet, I still don't have a clear idea of how tall my new friend is because I have determined that he is 5.9 feet tall. What is 0.9 feet? Americans don't have a common conception of 0.9 feet, so to put this in more common terms, we convert the 0.9 feet to inches, giving

$$0.9 \text{ ft} \times \frac{12 \text{ in}}{1 \text{ ft}} = 10.8 \text{ in.}$$

Thus, my new friend is about 5'11".

Now let's convert 5 square feet to square meters, given that 1 foot is about 0.3048 meters. Using conversion factors as before, we have

$$\frac{0.3048 \text{ m}}{1 \text{ ft}} = 1.$$

Multiplying 5 square feet by this conversion factor, we have

$$5 \text{ ft}^2 \times \frac{0.3048 \text{ m}}{1 \text{ ft}}.$$

What is the problem here? If we write 'ft$^2$' as 'ft·ft', we note that the 'ft' in the denominator of the fraction cancels with only one 'ft' in the 'ft$^2$' term. To get both of the 'ft', we multiply by the conversion factor twice:

$$5 \text{ ft}^2 = 5 \text{ ft}^2 \times \frac{0.3048 \text{ m}}{1 \text{ ft}} \times \frac{0.3048 \text{ m}}{1 \text{ ft}} = 5 \text{ ft}^2 \times \left(\frac{0.3048 \text{ m}}{1 \text{ ft}}\right)^2 \approx 0.4645 \text{ m}^2.$$


<!-- PDF page 47 / book page 33 -->

Sometimes units are written with negative exponents. For example, density is measured as mass per unit volume, such as kg/m$^3$ or kg m$^{-3}$. In such a case, to convert the cubic meters to cubic feet, we multiply by $(0.3048 \text{ m}/1 \text{ ft})^3$, so the m$^3$ in the numerator of our conversion factor cancels with the m$^3$ in the denominator of our density. Hence, we have

$$1 \, \frac{\text{kg}}{\text{m}^3} = 1 \, \frac{\text{kg}}{\text{m}^3} \left(\frac{0.3048 \text{ m}}{1 \text{ ft}}\right)^3 \approx 0.02832 \, \frac{\text{kg}}{\text{ft}^3}.$$

---

**EXAMPLE 4-8** Given that 1 inch is 2.54 centimeters and 1 ounce is 28.35 grams, convert 16.2 in$^2$ oz$^{-1}$ to centimeters and grams.

*Solution:* This is a bit tricky. We convert the inches to centimeters and ounces to grams separately. First we convert the inches to centimeters:

$$\bigl(16.2 \text{ in}^2 \text{ oz}^{-1}\bigr) \times \left(\frac{2.54 \text{ cm}}{1 \text{ in}}\right)^2 \approx 104.5 \text{ cm}^2 \text{ oz}^{-1}.$$

Now we deal with the ounces. Since 'oz' appears in the denominator of the expression (remember, oz$^{-1}$ = 1/oz), we must have 'oz' in the *numerator* of our conversion factor in order to make it cancel.

$$104.5 \text{ cm}^2 \text{ oz}^{-1} \times \frac{1 \text{ oz}}{28.35 \text{ g}} \approx \mathbf{3.686 \text{ cm}^2 \text{ g}^{-1}}$$

---

**EXAMPLE 4-9** If 4 gleeps are worth 3 glops and 2 glops are worth 5 glips, how many glips are worth the same as 10 gleeps?

*Solution:* Since we have no conversion factor to convert gleeps directly to glips, we convert the gleeps first to glops, and then the glops to glips:

$$
\begin{aligned}
10 \text{ gleeps} \cdot \frac{3 \text{ glops}}{4 \text{ gleeps}} &= 7.5 \text{ glops;} \\
7.5 \text{ glops} \cdot \frac{5 \text{ glips}}{2 \text{ glops}} &= 18.75 \text{ glips.}
\end{aligned}
$$

Thus, 10 gleeps are worth the same as $\mathbf{18.75 \text{ glips}}$.

---

## 4.4 Percent

Percent means 'per hundred'. Thus 30% means $\tfrac{30}{100}$, or 0.30. As you see, it is quite simple to convert a percent to a fraction or to a decimal.


<!-- PDF page 48 / book page 34 -->

**EXAMPLE 4-10** Write $33\tfrac{1}{3}\%$ as a decimal and as a fraction.

*Solution:* First, we will write it as a fraction:

$$33\frac{1}{3}\% = \frac{33\tfrac{1}{3}}{100} = \frac{100/3}{100} = \mathbf{\frac{1}{3}}.$$

In decimal representation, this is $\mathbf{0.\overline{3}}$.

---

**EXAMPLE 4-11** Write $2/5$ as a percent.

*Solution:* If $2/5 = x\%$, then

$$\frac{2}{5} = \frac{x}{100}.$$

Solving for $x$ yields $x = 40$. Thus, $2/5 = \mathbf{40\%}$.

---

**EXERCISE 4-5** Write each of the following as a decimal and a fraction.

| | |
|---|---|
| i. 35% | ii. 175% |
| iii. $66\tfrac{2}{3}\%$ | iv. $16\tfrac{2}{3}\%$ |

---

**EXERCISE 4-6** Write the following fractions and decimals as percents.

| | |
|---|---|
| i. $\tfrac{5}{6}$ | ii. $2\tfrac{3}{4}$ |
| iii. $0.\overline{1}$ | iv. $3.5$ |

---

Percent is simply a type of proportion. When we say that 5% of all people are left-handed, we mean that 5 out of 100 people are left-handed. Percent problems can be solved just like proportion problems, but also can be made much easier by realizing that the word 'of' means 'multiply' and both 'are' and 'is' mean 'equals'. For example, since 5% of all people are left handed, we have:

$$(0.05)(\text{all people}) = (\text{left handed people}).$$

Thus, if we are told there are 60 people, we would expect $(0.05)(60) = 3$ of them to be left handed.

This example of converting language to math works on fractions as well. If we know that $1/20$ of all people are left handed, we can write

$$\frac{1}{20}(\text{all people}) = (\text{left handed people}).$$

What does it mean when a store has a sale in which everything is "25% off"? This means that the prices of the goods have had 25% of their price deducted. If a book was originally $22, when it is on sale at a 25% discount, the new price is less by $(0.25)(\$22) = \$5.50$, so the new price is $\$22 - \$5.50 = \$16.50$. A percent increase is the exact opposite of this percent decrease. If the price of the book is increased by 25%, then the resulting price is the original price plus 25% of the original:

$$\$22 + (0.25)(\$22) = \$22 + \$5.50 = \$27.50.$$


<!-- PDF page 49 / book page 35 -->

**Interest** is simply a type of percent increase. Suppose you have taken a loan of $2000 at 8% annual interest. This means that at the end of a year the amount you will owe increases 8%, to $\$2000 + (0.08)(\$2000) = 1.08(\$2000) = \$2160$. Notice how we have used the distributive law "backwards" to write the amount we owe as $1.08(\$2000)$. After a while, you will use this directly, without having to write $\$2000 + (0.08)(\$2000)$ first. For example, 75 increased by 30% is $(1 + 0.30)(75) = 1.3(75)$, and is decreased by 30% is $0.7(75)$.

---

**EXAMPLE 4-12** 75 is 20% of what number?

*Solution:* Let $x$ be the desired number. Thus, 20% of $x$ is 75, or $(0.20)x = 75$; solving this equation yields $x = \mathbf{375}$.

---

**EXAMPLE 4-13** The price of a car is originally $10000. If the price is decreased by 25%, then increased by 25%, what is the resulting price?

*Solution:* The answer is *not* $10000! After the decrease, the price is

$$\$10000 - (0.25)(\$10000) = (0.75)(\$10000) = \$7500.$$

Then we increase $7500 by 25%; the result is $\$7500(1.25) = \mathbf{\$9375}$.

---

**EXAMPLE 4-14** Suppose you borrow $4000 at 5% annual interest. How much money will you owe after 4 years?

*Solution:* After one year, you owe $\$4000(1.05)$. At the end of the second year, you must pay 5% interest on this amount, so you owe $\$4000(1.05)(1.05) = \$4000(1.05)^2$. This is the amount $\$4000(1.05)$ increased by 5%. (Make sure you understand this.) Now you see why we did not multiply out the $\$4000(1.05)$ after the first year. Following the above reasoning, you owe $\$4000(1.05)^3$ after three years and $\$4000(1.05)^4$ after four years. Evaluating this rounded to the hundredths place (money is meaningless past the second decimal place), you owe $\mathbf{\$4862.03}$.

---

**EXAMPLE 4-15** If two liters of a 20% acid solution are mixed with 8 liters of a 50% acid solution, what is the concentration of the resulting solution?

*Solution:* The concentration of an acid solution is the amount of acid in the solution divided by the total volume of the solution. Two liters of 20% acid solution contains $2(0.2) = 0.4$ liters of acid, while the other solution contains $8(0.5) = 4$ liters of acid. For the solution which is a mixture of these two,

$$\text{Concentration} = \frac{0.4 + 4}{2 + 8} = \frac{4.4}{10} = \mathbf{44\%}.$$

---

**EXERCISE 4-7** The price of a ring is decreased 40% and the resulting price is increased by 50%. The final price is $360. What was the original price?

**EXERCISE 4-8** A car was originally $8000, but is on sale for $7000. What percent decrease in price does this represent?

**EXERCISE 4-9** The U.S. is loaning 1.5 million dollars to France. What annual interest rate must the U.S. charge if they want France to owe 2 million dollars at the end of one year?


<!-- PDF page 50 / book page 36 -->

**EXERCISE 4-10** A chemist has 80 ml of a solution containing 20% acid. How many ml must be removed and replaced by pure acid in order to obtain a 40% solution? *(MAΘ 1992)*

---

# Problems to Solve for Chapter 4

**56.** What percent of 20 is 13?

**57.** The population of a town increases 25% during 1991. By what percent must it decrease the following year to return to the population it was at the beginning of 1991?

**58.** A number is increased by 50%, then the resulting number is decreased by 40%. What was the initial number if the final number is 8 less than the original?

**59.** A metric calendar has 1 metric year equivalent to our calendar year of 365 days. A metric year is divided into 10 equal metric months; a metric month is divided into 10 equal metric weeks; a metric week is divided into 10 equal metric days. To the nearest day of our calendar, how many days are there in 4 metric months, 5 metric weeks and 8 metric days? *(MATHCOUNTS 1985)*

**60.** If the ratio of $2x - y$ to $x + y$ is $2 : 3$, find the ratio $x : y$. *(MAΘ 1992)*

**61.** If a stack of 8 quarters is exactly one-half inch high, how many quarters will be needed to make a stack one foot high? *(MATHCOUNTS 1991)*

**62.** If $y^2$ varies inversely as $x^3$, and $y = 3$ when $x = 2$, find $y$ when $x = 9$, assuming that $y > 0$. *(MAΘ 1990)*

**63.** The discount on a stereo system is $69, and the rate of discount is 15%. What was the original price of the system? *(MAΘ 1990)*

**64.** Given $\dfrac{x}{y} = \dfrac{2}{3}$ and $\dfrac{y}{z} = \dfrac{3}{2}$, find $\dfrac{x}{z}$. *(MATHCOUNTS 1992)*

**65.** A test has two parts. The first part is worth 60% and the second part is worth 40%. If a student gets 95% of part one correct, what exact percent correct must the student achieve on part two to average 90% for the whole test? *(MATHCOUNTS 1988)*

**66.** Jennifer had a bag of Gummy Bears. She gave $1/2$ of them to Jessica, $1/3$ of them to Jana, and 15 to Julie. If the bag was then empty, how many Gummy Bears were in the bag at the beginning? *(MATHCOUNTS 1991)*

**67.** A man can run $x$ feet in $y$ seconds. How many yards can he run in $z$ minutes? *(MAΘ 1992)*

**68.** $x$ is directly proportional to $y$ and inversely proportional to $z$. If $x = 1/2$ when $y = 3/4$ and $z = 2/3$, find $x$ when $y = 7/8$ and $z = 7/9$. *(MATHCOUNTS 1989)*

**69.** A woman has part of $4500 invested at 4% and the rest at 6%. If her annual return on each investment is the same, then what is the average rate of interest which she realizes on the $4500? *(AHSME 1953)*

**70.** The wages of 3 men for 4 weeks is $108. At the same rate of pay, how many weeks will 5 men work for $135? *(MAΘ 1991)*


<!-- PDF page 51 / book page 37 -->

**71.** Tennis coaches High Lob and Low Smash decided to share with their assistants (Love and Vantage) the money they earned from tennis lessons. They agreed on the following ratios: Lob : Love $= 17 : 12$, Love : Smash $= 3 : 4$, and Smash : Vantage $= 32 : 15$. If their earnings totaled $3,150, how much did Love receive? *(MAΘ 1990)*

**72.** In a closed bottle, the product of the pressure and volume is constant. By what percent must the volume be decreased to increase the pressure by 25%? *(MATHCOUNTS 1992)*

**73.** In a school election, candidate $A$ got $33.\overline{3}\%$ of the votes cast, $B$ got $9/20$ of the votes, $C$ got $2/15$ of the votes, and the only other candidate, $D$, got the remaining 75 votes. How many students voted in the election? *(MATHCOUNTS 1990)*

**74.** Ms. $A$ owns a house worth $10000. She sells it to Mr. $B$ at 10% profit. Mr. $B$ sells the house back to Ms. $A$ at a 10% loss. How much money does Ms. $A$ make? *(AHSME 1955)*

**75.** The rails of a railroad are 30 feet long. As a train passes over the point where the rails are joined, there is an audible click. The speed of the train in miles per hour is approximately the number of clicks heard in how many seconds? *(AHSME 1953)*

**76.** A town's population increased by 1,200 people, and then this new population decreased by 11%. The town now had 32 less people than it did before the 1,200 increase. What was the original population? *(AHSME 1974)*

**77.** The cost of living in each quarter (3 months) increased by 2% over the previous quarter. To the nearest tenth of a percent, to what annual percentage rate of increase does this correspond? *(MAΘ 1990)*

**78.** It is given that $x$ varies directly as $y$ and inversely as the square of $z$, and that $x = 10$ when $y = 4$ and $z = 14$. What is $x$ when $y = 16$ and $z = 7$? *(AHSME 1959)*

**79.** Two joggers are running around an oval track in opposite directions. One jogger runs around the track in 56 seconds. They meet every 24 seconds. How many seconds does it take the second jogger to run around the track? *(MATHCOUNTS 1986)*

**80.** If $x$ varies as the cube of $y$, and $y$ varies as the fifth root of $z$, then $x$ varies as the $n$th power of $z$. What is $n$? *(AHSME 1954)*

**81.** It is now between 10:00 and 11:00. Six minutes from now, the minute hand of a watch will be exactly opposite the place where the hour hand was three minutes ago. What is the exact time now? *(MAΘ 1991)*

**82.** If $p$ is 50% of $q$ and $r$ is 40% of $q$, what percent of $r$ is $p$? *(Mandelbrot #1)*

🪡 **83.** Country A has $c\%$ of the world's population and owns $d\%$ of the world's wealth. Country B has $e\%$ of the world's population and $f\%$ of its wealth. Assume that the citizens of A share the wealth of A equally, and that those of B share the wealth of B equally. Find the ratio of the wealth of a citizen of A to the wealth of a citizen of B. *(AHSME 1993)*

**84.** $A$, $B$, $C$, $D$, and $E$ are consecutive points on a line. If $\dfrac{AB}{BC} = \dfrac{1}{3}$, $\dfrac{BC}{CD} = \dfrac{1}{4}$, and $\dfrac{CD}{DE} = \dfrac{1}{2}$, what is $\dfrac{AC}{BE}$? *(MATHCOUNTS 1992)*


<!-- PDF page 52 / book page 38 -->

**85.** From time $t = 0$ to time $t = 1$ a population increased by $i\%$, and from time $t = 1$ to time $t = 2$ the population increased by $j\%$. By what percent, in terms of $i$ and $j$, did the population increase from time $t = 0$ to time $t = 2$? *(AHSME 1991)*

🪡 **86.** If for three distinct positive numbers $x$, $y$, and $z$,

$$\frac{y}{x - z} = \frac{x + y}{z} = \frac{x}{y},$$

then find the numerical value of $x/y$. *(AHSME 1992)*

---

> ## *the BIG PICTURE*
>
> As the simplest possible relation between two variables, proportions find their way into almost any mathematical formulation. For example, modern chemistry got an enormous boost around the year 1800 when Dalton used a simple proportion to deduce that matter was made up of atoms. (Such a theory was actually advanced several hundred years B.C. by the Greek Democritus, but he was unable to accumulate the physical evidence needed to convince his peers.) Dalton knew that in any sample of some pure substance, the ratios of the weights of constituent elements was always a constant. For example, if in a sample of water we let the weight of oxygen be $O$ and the weight of hydrogen be $H$, experiment will always yield the proportion
>
> $$\frac{H}{O} \approx 0.124.$$
>
> From this Dalton guessed that substances are made up of units, and each of these is made up of a fixed ratio of atoms. Otherwise, why would the ratio always be the same?
>
> Economics has its share of proportions as well. In some economies, the price $P$ and the demand $D$ for a given product may be inversely proportional, so that
>
> $$PD = \text{constant}.$$
>
> Thus as the price increases, the demand decreases. Of course, other relationships between price and demand are possible, but the simple proportion is an important case.
>
> In thermodynamics, the pressure, volume, and temperature of a gas obey the proportion
>
> $$\frac{PV}{T} = \text{constant},$$
>
> so that, for example, lower volume at a constant temperature yields higher pressure. (Does this seem right? Try squeezing a balloon.) This **Ideal Gas Law** is crucial to engines and other applications of thermodynamics.
>
> In the more complicated humanities and social sciences, simple proportions are harder to come by, as many a politician has found out who expected a proportion between money spent and votes received.


