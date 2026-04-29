---
title: "Chapter 26 — Statistics and Probability"
source: "The Art of Problem Solving, Volume 1"
chapter: 26
problem_range: [478, 499]
sections:
  - "26.1 Statistics"
  - "26.2 Probability and Common Sense"
  - "26.3 Multiplying Probabilities"
  - "26.4 Casework"
  - "26.5 Odds"
  - "26.6 What Did You Expect?"
includes_big_picture: true
big_picture_topic: "The circular definition of probability"
ocr_pass: cleaned
ocr_notes: |
  Common substitutions:
    • Binomial coefficients in poker problems    → \binom{n}{k}
    • `(?)` (uninterpretable in OCR)             → contextually inferred
    • Source typo "the desried red" (Ex. 26-4)   → "desired red"
    • `Vabc`                                     → \sqrt[3]{abc}
    • `\J(2)(4)(4)(5)(6)(10)`                    → 6th root in Ex 26-2
    • `MA©`                                      → MAΘ
  No figures in this chapter — all examples are textual / numeric.
---

# Chapter 26 — Statistics and Probability

## 26.1 Statistics

Suppose we want to compare the income of Americans to the income of British citizens. How can we do this? We could just list everybody's income in each country and compare our two lists. There are over a quarter of a billion people in the United States, so this would take a long, long time. Or we could just take a few people from each country and compare them. This, too, would be a bad idea, because we might take the richest people from one country and the poorest from the other and thus draw incorrect conclusions about the relative incomes of the citizens of the two countries.

There are a few simple ways to get a sound comparison of the incomes. We can find which income occurs *most often* in each country. This is called the **mode**. We could find the difference between the lowest and the highest income of a country. This gives the **range** of the incomes. The income which is the exact middle of all incomes is the **median**. By the middle, we mean that if we listed all the incomes from lowest to highest, the median is the one precisely in the middle.

Perhaps the best way to compare the incomes of the two nations is to compare how much income there is *per person* in each country. The income per person is called the **average** or **arithmetic mean** of the incomes in the country.

How do we evaluate the average? The income per person is found by just adding up all the incomes and dividing by the number of people! So the average of, say, $4$, $6$, and $11$ is $(4 + 6 + 11)/3 = 7$.

Similar to the arithmetic mean of a set of numbers, we can define a **geometric mean**. Instead of adding the three numbers and dividing by three, we multiply the numbers together and take the cube root. Thus if there are three people whose incomes are $4$, $6$, and $9$, we find the geometric mean as $x = \sqrt[3]{4 \cdot 6 \cdot 9} = \sqrt[3]{216} = 6$. Similarly, for any set of $n$ numbers, the geometric mean is the $n$th root of the product of the numbers.

> **Example 26-1.** Show that the arithmetic and geometric means of three different positive numbers are larger than the smallest of the three and smaller than the largest.
>
> ***Solution.*** Let the numbers be $a < b < c$ and the arithmetic mean be $A$. We then have
>
> $$A = \frac{a + b + c}{3} < \frac{c + c + c}{3} = c$$
>
> and
>
> $$A = \frac{a + b + c}{3} > \frac{a + a + a}{3} = a.$$
>
> Letting the geometric mean be $G$, we similarly have
>
> $$a = \sqrt[3]{a^{3}} < \sqrt[3]{abc} = G = \sqrt[3]{abc} < \sqrt[3]{c^{3}} = c.$$
>
> Note that we have just used $a < b$ and $b < c$ repeatedly.

The number of times an element appears in a set of elements is the **frequency** of that number. The frequencies of all the elements in a set are often displayed as a chart or graph. Such a display of frequencies is called a **histogram**.

> **Example 26-2.** Find the mode, median, arithmetic mean, range, and geometric mean of the following set of numbers: $2, 4, 4, 5, 6, 10$.
>
> ***Solution.*** The mode is the number which appears most often, or $\mathbf{4}$. The median is the number which is in the middle of the list when the numbers are listed from smallest to largest. We have a problem here. Since there is an even number of numbers, none of the numbers is in the exact middle. When this occurs, the median is the average of the middle two numbers. Since the middle two numbers are $4$ and $5$, the median is $(4 + 5)/2 = \mathbf{4.5}$. For the average we have
>
> $$\text{Arithmetic mean} = \frac{2 + 4 + 4 + 5 + 6 + 10}{6} = \mathbf{\frac{31}{6}}.$$
>
> The difference between the largest and the smallest number is $10 - 2 = \mathbf{8}$, which gives us the range. Finally, we have
>
> $$\text{Geometric mean} = \sqrt[6]{(2)(4)(4)(5)(6)(10)} = \sqrt[6]{(2^{7})(3)(5^{2})} = \mathbf{2\sqrt[6]{150}}.$$

> **Example 26-3.** A student has an average score of $80$ on her first four tests. What must she score on the next test to raise her average to $82$?
>
> ***Solution.*** The average of her first four scores is the sum of the scores on the tests divided by $4$. Since the average of the first four tests is $80$, the sum of the four scores is $80 \cdot 4 = 320$. Letting her score on the 5th test be $x$, the sum of all five scores is $320 + x$ and we thus want
>
> $$\frac{320 + x}{5} = 82.$$
>
> Solving for $x$, we find $x = \mathbf{90}$, so she needs a $90$ on her fifth test to raise her average to $82$.
>
> <!-- OCR-NOTE: source says "third test" in the conclusion, but the calculation is for the 5th test (the next test after the first four). Preserved as printed. -->

> **Exercise 26-1.** The arithmetic mean of $12$ scores is $82$. When the highest and lowest scores are removed, the new mean becomes $84$. If the highest of the $12$ scores is $98$, what is the lowest score? *(MATHCOUNTS 1991)*

> **Exercise 26-2.** Twenty-five students have a combined average of $84$ on a test, while another group of $20$ students has a combined average of $66$. Find the overall average. *(MATHCOUNTS 1988)*

---

## 26.2 Probability and Common Sense

Once you really know how to count, **probability** is not too hard. The probability of an event $A$ is a little hard to define, but it is basically *the fraction of possible outcomes which correspond to $A$*. This probability is often denoted $P(A)$. For example, the probability of getting a head when you flip a coin is $1/2$, because of the two equally likely outcomes, one is a head. A probability can be a decimal as well as a fraction; the probability $1/2$ can just as well be written $0.5$. Do the following exercises using common sense.

> **Example 26-4.** If a box contains two yellow balls and one red, what is the probability of drawing out the red one if one ball is drawn at random?
>
> ***Solution.*** There are three possible balls which can be chosen, and one of them is the desired red color. Thus, the probability is $\mathbf{1/3}$. This is often written as $P(\text{red}) = 1/3$.

> **Exercise 26-3.** If a box contains two yellow balls and one red, what is the probability of drawing out a yellow?

> **Example 26-5.** If a box contains two yellow balls and one red, what is the probability of drawing a red and a yellow if two balls are drawn?
>
> ***Solution.*** One way to do the problem is to say that there are $\binom{3}{2} = 3$ ways to choose two balls, and two ways to choose a yellow and a red, so the probability is $\mathbf{2/3}$. However, another way is equally good.
>
> We use the fact that for any event $A$, the probability of $A$ happening plus the probability of $A$ not happening is $1$, since either $A$ occurs or it doesn't. Thus, we can write
>
> $$P(A) = 1 - P(\text{not } A).$$
>
> Here, we say that the probability of getting a red and a yellow is $1$ minus the probability of getting both yellows. But this is the same as leaving the red behind, which clearly has probability $1/3$, since the red is one of three balls which could be left behind. We then have
>
> $$P(\text{red-yellow}) = 1 - P(\text{yellow-yellow}) = 1 - P(\text{red left}) = 1 - \tfrac{1}{3} = \tfrac{2}{3}.$$

> **Exercise 26-4.** If a card is drawn from a deck of playing cards (jokers ignored as usual), what is the probability that it is
>
>   i. black?
>   ii. a spade?
>   iii. a spade face card?
>   iv. any face card?
>   v. the ace of spades?

All there really is to probability is figuring out how to count first all possible outcomes, then all desired outcomes. Then just divide the latter by the former. Clearly a probability is always positive. It is also always between $0$ and $1$, since the number of ways for one outcome cannot be greater than the total number for all outcomes. Moreover, the sum of the probabilities of all possible outcomes is always $1$, because the sum of the ways to get all the individual outcomes should equal the total number of ways the event can occur. (We have used this fact in Example 26-5 above.)

> **Example 26-6.** John and Jayne each choose a number (not necessarily different) from $1$ to $10$ inclusive. What is the probability that they each pick a number greater than $7$?
>
> ***Solution.*** They can each pick a number greater than $7$ in $3$ ways. Thus, the total number of ways they can both pick a number greater than $7$ is $3 \cdot 3 = 9$. The total number of ways they can pick their numbers is $10 \cdot 10 = 100$. Hence, there are $9$ desirable outcomes out of $100$ possible, for a probability of $\mathbf{9/100}$. (After reading the next section, come back and try this with multiplication of probabilities.)

> **Example 26-7.** What is the probability that a five-card poker hand contains exactly two aces?
>
> ***Solution.*** The number of desired hands is found by choosing the two aces, in $\binom{4}{2}$ ways, then choosing the other three cards (which can't be aces), in $\binom{48}{3}$ ways. The total number of possible hands is found by choosing five cards from the deck of $52$, in $\binom{52}{5}$ ways. Thus the probability of having exactly two aces is
>
> $$\frac{\binom{4}{2}\binom{48}{3}}{\binom{52}{5}}.$$

> **Exercise 26-5.** If Sapphira randomly chooses a 4-digit number (not beginning with zero) what is the probability that all four digits will be distinct? *(MAΘ 1990)*

> **Example 26-8.** Let's examine a more complicated probability problem. What is the probability that a five-card poker hand has exactly two cards of the same value, but no other cards duplicated?
>
> ***Solution.*** First we pick the number which will be duplicated; we can do this in $\binom{13}{1}$ ways. Then we can pick two of the four cards of that number in $\binom{4}{2}$ ways. To fill out the hand, we then need three cards, all of different number, so we can choose $3$ of the remaining $12$ numbers in $\binom{12}{3}$ ways, and for each can choose one of the four suits in $\binom{4}{1}$ ways. Then the total number of ways is given by
>
> $$\binom{13}{1}\binom{4}{2}\binom{12}{3}\binom{4}{1}\binom{4}{1}\binom{4}{1}.$$
>
> To find the probability, we need to divide this by the total number of ways to choose a poker hand. Since this is just picking $5$ cards from a set of $52$, the number is $\binom{52}{5}$. The probability of getting a hand of the type we desire is the monstrous
>
> $$\frac{\binom{13}{1}\binom{4}{2}\binom{12}{3}\binom{4}{1}\binom{4}{1}\binom{4}{1}}{\binom{52}{5}}.$$
>
> Can you simplify this using factorials?

Just ask the questions: How many configurations are there that I want? How many are there in total?

---

## 26.3 Multiplying Probabilities

One very useful way to treat probabilities uses the multiplication principle of counting. Consider two events, $A$ and $B$, which have no effect on each other, for example getting heads on two different coin flips. Such events we call **uncorrelated**. What is the probability of both $A$ and $B$ occurring? In the coin case, clearly there are four ways for the coins to come up: HH, HT, TH, TT, and only one of them is the one we want, HH. Thus the probability of getting two heads is $1/4$. Note, though, that this is equal to the square of $1/2$, the probability of each head individually.

It turns out that this is generally true: the probability of both $A$ and $B$ occurring, if $A$ and $B$ are purely uncorrelated events, is equal to the *product* of the probabilities of $A$ and $B$ individually. Why? Suppose the probability of $A$ is $N_{A}/T_{A}$, where $N_{A}$ is the number of desired outcomes and $T_{A}$ is the total number. Similarly the probability for $B$ is $N_{B}/T_{B}$. How many total outcomes are there for both experiments? By the multiplication principle of counting, there are $T_{A} T_{B}$, so long as the events have no effect on each other. How many desired outcomes? For the same reason, $N_{A} N_{B}$. Thus the probability of both occurring is $N_{A} N_{B} / T_{A} T_{B}$, which is just the product of the two probabilities.

> **Example 26-9.** Find the probability of rolling a $12$ with two six-sided dice.
>
> ***Solution.*** We could do this as follows: there is only $1$ way to get a $12$ (6-6), while there are $36$ total possibilities (anything-anything). Thus the probability is $\mathbf{1/36}$. However, we can also use the multiplication rule for probability as follows. The only possible roll which yields a sum of $12$ is 6-6. The probability of a $6$ on the first die is obviously $1/6$, the probability of $6$ on the second die is $1/6$. Since the two dice are uncorrelated, the probability of both occurring is the product, or $(1/6)(1/6) = \mathbf{1/36}$.

> **Exercise 26-6.** A Flo Hyman spike puts the ball away $60\%$ of the time. What is the probability that her first spike on a given point is returned and her second is not?

> **Example 26-10.** Three six-sided dice are rolled. What is the probability that at least one comes up with a $5$ or $6$?
>
> ***Solution.*** You might think we need to separately consider the possibilities that one, two, or all three of the dice come up $5$ or $6$. However, all we really have to consider is the probability that *none* of the dice comes up $5$ or $6$, then subtract this from $1$! The probability of a single die not coming up $5$ or $6$ is $2/3$. Moreover, the dice are uncorrelated, so multiplication applies and we have
>
> $$P(\text{at least one 5 or 6}) = 1 - P(\text{no 5 or 6}) = 1 - (2/3)(2/3)(2/3) = \mathbf{19/27}.$$
>
> This is yet another problem where using $P(A) = 1 - P(\text{not } A)$ is a powerful simplification.

> ⚠️ **Warning.** Probabilities can only be multiplied when the events are *completely* uncorrelated!

> **Example 26-11.** Two cards are drawn in order from a standard deck of cards. What is the probability that the first is a spade and the second is a heart?
>
> ***Solution.*** Since there are $13$ spades among the $52$ cards, the probability that the first is a spade is $13/52 = 1/4$. Of the remaining $51$ cards, $13$ are hearts, so the probability of picking a heart second is $13/51$. Hence, the desired probability is $(1/4)(13/51) = \mathbf{13/204}$.

> **Exercise 26-7.** A box contains three red balls and three green. Two balls are chosen. What is the probability that a red is chosen first, then a green?

> **Exercise 26-8.** A box contains three red balls and three green. Two balls are chosen. What is the probability that one red and one green are chosen? Note how this is different from the prior question.

---

## 26.4 Casework

Many many many many problems in both counting and probability come down to the evaluation of several cases in which the desired outcome occurs. We find the probability that each case occurs, and the overall probability is the sum of these. We will solidify this concept here by examining some common types of probability problems which use cases.

> **Example 26-12.** There is a $20\%$ chance it will rain today. If it rains, there is a $10\%$ chance that we will be allowed to go outside; otherwise, there is an $80\%$ chance we will be able to go outside. What is the probability that we will be allowed to go outside? *(MAΘ 1992)*
>
> ***Solution.*** We split this into the case that it rains and the case that it doesn't. The probability that it rains and we go outside is $(0.20)(0.10) = 0.02$. The probability that it doesn't rain and we go outside is $(1 - 0.20)(0.80) = 0.64$. The overall probability that we go outside is then the sum of these, or $0.64 + 0.02 = \mathbf{0.66}$.

Many case-type problems are more complicated, though. A very standard type is:

> *Find the probability of rolling a $6$ if two six-sided dice are rolled.*

***Solution.*** First consider all possible ways in which a $6$ can arise: 1-5, 2-4, 3-3, 4-2, 5-1. There are $5$ different cases to consider. However, for each case we are looking at a configuration which can only occur in one way. Since there are $36$ total possible configurations, each configuration has probability $1/36$, so that the $5$ configurations which yield a $6$ add up to make probability $\mathbf{5/36}$.

> **Exercise 26-9.** Find the probabilities of all rolls, $2$ through $12$. Is there a pattern to help you remember these?

A much more interesting extension is to three dice. For example,

> *What is the probability of rolling a $12$ if three six-sided dice are rolled?*

***Solution.*** Now we will have some nontrivial cases. Let's consider the first two dice as a unit, and the third by itself. Then the configurations which yield $12$ are 6-6, 7-5, 8-4, 9-3, 10-2, 11-1. Using the results of Exercise 26-9 and the multiplication principle, we can write down the probability of each case. For 6-6 it is $(5/36)(1/6)$, since the probability of a $6$ with two dice is $5/36$ and with one die the probability of a $6$ is $1/6$. The rest of the cases are done just as easily, and we can then add the probabilities for all the cases to get

$$\begin{aligned}
&P(\text{6-6}) + P(\text{7-5}) + P(\text{8-4}) + P(\text{9-3}) + P(\text{10-2}) + P(\text{11-1}) \\
&= \tfrac{5}{36} \cdot \tfrac{1}{6} + \tfrac{6}{36} \cdot \tfrac{1}{6} + \tfrac{5}{36} \cdot \tfrac{1}{6} + \tfrac{4}{36} \cdot \tfrac{1}{6} + \tfrac{3}{36} \cdot \tfrac{1}{6} + \tfrac{2}{36} \cdot \tfrac{1}{6} = \mathbf{\tfrac{25}{216}}.
\end{aligned}$$

---

## 26.5 Odds

Because people like to have codes of their own that no one else gets, bettors have come up with a different way of expressing probability. It is called **odds**, and results in those strange numbers which fill the TV screen when the Kentucky Derby comes on. To put it simply, the odds *against* an event occurring is the ratio of the probability it does not happen to the probability that it does. So take the roll of a die, for instance. The probability of rolling a $3$ is $1/6$, the probability of anything else is $5/6$, and the odds against rolling a $3$ are thus $5/6 : 1/6$, or $5 : 1$. (Odds almost never contain fractions.) We read this as "$5$ to $1$."

> **Exercise 26-10.** Is an event with $2 : 1$ odds against or $1 : 2$ odds against more likely to occur?

> **Exercise 26-11.** What are the odds against getting a $1$ in one roll of a six-sided die?

> **Exercise 26-12.** If $10\%$ of the game cards in a sweepstakes are winners, what are the odds against winning?

> **Exercise 26-13.** If a horse has a $7$ in $100$ chance of winning, what are the odds against its winning? (Be careful.)

Odds against are sometimes referred to as simply 'odds.' We can also define 'odds for,' in which we take the ratio of the probability of success to the probability of failure. Typically when it's not specified whether the odds are for or against, odds against are intended.

A common mistake is to reverse the order of odds, forgetting which probability should go first. One way to remember is to keep in mind that $100$ to $1$ ($100 : 1$) is very bad odds, so it must be the probability of the event *not* happening which comes first.

---

## 26.6 What Did You Expect?

Antoinette has really rotten luck. Every week for a year she played the lottery, and never won a thing. Terrible luck. Or is it?

To see whether Antoinette's luck is really so bad, we need to see what the average winnings are. Suppose the prizes in each lottery total \$500{,}000, and $10{,}000{,}000$ people play each week. Then per person, the average winning is \$500{,}000$/$10{,}000{,}000$ = $\$0.05$ for each lottery. Thus if Antoinette plays for a year, or $52$ weeks, her expected earnings are only \$2.60$; suddenly her luck doesn't seem so bad.

This is the essence of **expected value**, the average amount that one can expect to get from some activity in which the result depends on chance. To find the expected value, all you need to do is take all the possible outcomes, multiply each by the probability of its happening, and add up the results.

> **Example 26-13.** Ignatius plays a game in which he chooses at random from a penny, a nickel, a dime, and a quarter. How much can he pay to play and still break even?
>
> ***Solution.*** The amount you can pay to play a game and still hope to break even is exactly the expected value. In this game, Ignatius chooses each coin with probability $1/4$, so his expected value is $(1/4)(1) + (1/4)(5) + (1/4)(10) + (1/4)(25) = \mathbf{10.25}$ cents.

> **Exercise 26-14.** What is the expected value of a Michael Jordan shot if $43\%$ are 2-pointers, $6\%$ are 3-pointers, and the rest are misses ($0$ points)?

> **Exercise 26-15.** What is the expected value of buying stock in a small company if the stock will fail with probability $1/2$, be worth \$1$ with probability $1/3$, and be worth \$10$ with probability $1/6$? Would you buy a share for \$2.50$?

One thing to remember is that the expected value is *not* necessarily the most likely result in one event; it is simply the average result if the event were to take place many times. For example, suppose three coins are flipped. The expected number of heads is $1.5$; obviously this is not a very likely outcome!

---

## Problems to Solve for Chapter 26

**478.** A basketball player scores an average of $18.6$ points per game for five games. How many points must he score in the next game to raise his average to $20$ points per game? *(Mandelbrot #1)*

---

**479.** What is the average of $7$ numbers if the average of the first two is $9$ and the average of the last $5$ is $16$? *(MATHCOUNTS 1986)*

---

**480.** $42$ is the arithmetic mean of a group of $30$ numbers. If two numbers, $82$ and $44$, are removed, then what is the arithmetic mean of the remaining group of numbers? *(MAΘ 1987)*

---

**481.** Two numbers $x$ and $y$ have a geometric mean of $12$ and an arithmetic mean of $12.5$. Find $x^{2} + y^{2}$. *(MATHCOUNTS 1992)*

---

**482.** Joan's average through five math tests was $m$. After a sixth test her average was $n$. If the teacher then decides to double the weight of the last test, what will Joan's average be? *(MAΘ 1992)*

---

**483.** The ace of hearts, the ace of clubs, the ace of diamonds, and the ace of spades are face down on a table. Two different cards are selected at random from the set of four cards. What is the probability that at least one of the cards is a red ace? *(MATHCOUNTS 1985)*

---

**484.** In a raffle $20$ tickets are sold. Two prizes will be given. A student buys $2$ tickets. What is the probability that this student wins at least one prize? *(MATHCOUNTS 1988)*

---

**485.** A blue urn contains $4$ black marbles and two blue marbles. A black urn contains $4$ black marbles and $11$ blue marbles. One marble is drawn at random from each of the two urns. What is the probability that both of the marbles drawn are blue? *(MATHCOUNTS 1988)*

---

**486.** A teacher with a math class of $20$ students randomly pairs the students to take a test. What is the probability that Camilla and Cameron, two students in the class, are paired with each other? *(MATHCOUNTS 1991)*

---

**487.** If there are $3$ boys and $4$ girls in a group and two are chosen to give a report, what is the probability that one boy and one girl are chosen? *(MATHCOUNTS 1986)*

---

**488.** The odds are $7$ to $15$ against horse Car Naggy winning the third race at Upson Downs. What is the probability that a different horse will win? *(MAΘ 1987)*

---

**489.** The probability of rain on any given day in Atlanta is $20\%$. After how many days would you expect it to have rained on $30$ days? *(MATHCOUNTS 1991)*

---

**490.** The probability that a baseball player gets a hit is $3/10$. Find the probability that she gets $2$ hits in $4$ at bats in her next game. *(MAΘ 1991)*

---

**491.** Two digits between $1$ and $9$, inclusive, are selected at random. The same digit may be selected twice. What is the probability that their product is a multiple of $3$? *(MAΘ 1987)*

---

**492.** If five standard fair dice are tossed simultaneously, what is the probability that the outcome has a sum greater than $28$? *(MATHCOUNTS 1989)*

---

**493.** Eight first-graders, $4$ girls and $4$ boys, arrange themselves at random around a merry-go-round. What is the probability that boys and girls will be seated alternately? *(MAΘ 1987)*

---

**494.** A secretary writes letters to $8$ different people and addresses $8$ envelopes with the people's addresses. He randomly puts the letters in the envelopes. What is the probability that he gets exactly $6$ letters in the correct envelopes? *(MAΘ 1992)*

---

**495.** The integers from $1$ to $10$, inclusive, are partitioned at random into two sets of five elements each. What is the probability that $1$ and $2$ are in the same set? *(MAΘ 1992)*

---

**496.** Ashley, Bob, Carol, and Doug are rescued from a desert island by a pirate who forces them to play a game. Each of the four, in alphabetical order by first names, is forced to roll two dice. If the total on the two dice is either $8$ or $9$, the person rolling the dice is forced to walk the plank. The game stops as soon as one player loses or after all have rolled the dice once. What is the probability that Doug survives? *(MAΘ 1990)*

---

**497.** Instead of using two standard cubical dice in a board game, three standard cubical dice are used so that the game goes more quickly. In the regular game, doubles are needed to get out of the 'pit'. In the revised game, doubles or triples will get you out. How many times as likely is it for a player to get out of the 'pit' on one toss under the new rules as compared to the old rules? *(MATHCOUNTS 1987)*

---

**498.** Rocky and Bullwinkle are playing Risk. Rocky rolls one six sided die, while Bullwinkle rolls two of them. What is the probability that Rocky's roll is greater than or equal to Bullwinkle's larger number? *(Mandelbrot #2)*

---

**499.** Richard is hitchhiking from Decatur, AL, to Amherst, VA. The probability that Richard will see a car within the next $20$ minutes is $609/625$. What is the probability that he will see a car within the next $5$ minutes? Assume that the probability of seeing a car at any moment is uniform (the same) for the entire $20$ minutes. *(Mandelbrot #2)*

---

## 📚 The BIG PICTURE

> An interesting aspect of probability is that it is extremely difficult to define in a satisfying way. For example, what does it mean that the probability of a coin coming up heads is $1/2$?
>
> A naïve answer to this question is that if we were to do the identical experiment many, many times, we would *expect* the number of heads to approach being half the total number of flips: "It comes up heads half the time." However, this definition is lacking, because it contains the word *expect*. We have to include *expect*, because it doesn't *have* to happen this way; we could just keep on getting heads forever. All we can say is that we expect it to happen. But if we are talking about what we expect to happen, we are talking about probability again! The attempt at a definition has led us into a circle.
>
> The logical circle can be shown more clearly by rewriting things in rigorous form. Our expectation that the number of heads will tend toward half the total number means that
>
> > *with probability $1$, the number of heads will tend toward half the total number of flips.*
>
> So all we have done is defined probability in terms of probability!
>
> Can you do better? Mathematicians have been forced to go to extreme levels of rigor to consider probability. They define a quantity in a certain way, and show that it satisfies all the intuitive requirements of a probability, and then use that. But the real definition of probability must be left to the intuition. After all, the number of heads *will* tend to half the total$\ldots$ at least, most of the time.

---

*End of Chapter 26.*
