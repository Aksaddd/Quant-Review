# Chapter 4: Probability Theory

> **Book:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou  
> **Chapter:** 4  
> **Topic:** Probability Theory

## Chapter Overview

Probability theory is the foundation of every aspect of quantitative finance and one of the most heavily tested areas in quant interviews. This chapter systematically covers: basic probability definitions and set operations, combinatorial analysis, conditional probability and Bayes' formula, discrete and continuous distributions, expected value/variance/covariance, and order statistics. Mastery of this chapter is essential before attempting stochastic calculus.

**Sections:**

- **4.1** — Basic Probability Definitions and Set Operations
- **4.2** — Combinatorial Analysis
- **4.3** — Conditional Probability and Bayes' Formula
- **4.4** — Discrete and Continuous Distributions
- **4.5** — Expected Value, Variance, and Covariance
- **4.6** — Order Statistics
- **4.7** — The Law of Large Numbers and the Central Limit Theorem


---

## 4.1 Basic Probability Definitions and Set Operations {#41}

First let's begin with some basic definitions and notations used in probability. These definitions and notations may seem dry without examples—which we will present momentarily—yet they are crucial to our understanding of probability theory. In addition, it will lay a solid ground for us to systematically approach probability problems. Outcome (co): the outcome of an experiment or trial. Sample space/Probability space (Omega): the set of all possible outcomes of an experiment. 1 As I have emphasized in Chapter 3, this book does not teach probability or any other math topics due to the space limit—it is not my goal to do so, either. The book gives a summary of the frequently-tested knowledge and shows how it can be applied to a wide range of real interview problems. The knowledge used in this chapter is covered by most introductory probability books. It is always helpful to pick up one or two classic probability books in case you want to refresh your memory on some of the topics. My personal favorites are First Course in Probability by Sheldon Ross and Introduction to Probability by Dimitri P. Bertsekas and John N. Tsitsiklis.

**P(omega):** probability of an outcome; P(omega) >= 0 for all omega in Omega, sum P(omega) = 1

**Event:** a subset of the sample space.

**P(A):** probability of event A = sum_{omega in A} P(omega)

**A union B:** outcomes in A or B (or both).

**A intersect B (or AB):**ntersection A n B (or ,42?) is the set of outcomes in both A and B. Ac: The complement ofA, which is the event "not A". Mutually Exclusive: A intersect B = empty set. For mutually exclusive events: P(union E_i) = sum P(E_i). Random variable: A function that maps each outcome (co) in the sample space (Q) into the set of real numbers. Let's use the rolling of a six-sided dice to explain these definitions and notations. A roll of a dice has 6 possible outcomes (mapped to a random variable): 1, 2, 3, 4, 5, or 6. So the sample space Omega is {1,2,3,4,5,6} and the probability of each outcome is 1/6 (assuming a fair dice). We can define an event A representing the event that the outcome is an odd number A = {1, 3, 5}, then the complement of A is Ac = {2, 4, 6}. Clearly P(A)= P(l) + P(3) + P(5) = l/2. Let B be the event that the outcome is larger than 3: B = {4, 5, 6}. Then the union is A u B = {1, 3, 4, 5, 6} and the intersection is AnB = {5}. One popular random variable called indicator variable (a binary dummy variable) for event A is defined as the following: `I_A = 1` if outcome in {1,3,5}, `I_A = 0` otherwise (A^c occurs). The [0, if x￡{1, 3, 5} expected value of IA is E[IA ] = P{A). Now, time for some examples.

Coin toss game Two gamblers are playing a coin toss game. Gambler A has (n +1) fair coins; B has n fair coins. What is the probability that A will have more heads than B if both flip all their coins?2

> **Solution:**
> We have yet to cover all the powerful tools probability theory offers. What do we have now?
> Outcomes, events, event probabilities, and surely our reasoning capabilities! The one extra coin
> makes A different from B. If we remove a coin from A, A and B will become symmetric. Not
> surprisingly, the symmetry will give us a lot of nice properties. So let's remove the last coin of A
> and compare the number of heads in A9s first n coins with i?'s n coins. There are three possible
> outcomes: ￡,:A9s n coins have more heads than B'sn coins; E2::A9s n coins have equal number of heads
> as B9s n coins; E3::A9s n coins have fewer heads than 2?'s n coins. By symmetry, the probability
> that A has more heads is equal to the probability that B has more heads. So we have P(E]) = P(E3).
> Let's denoteP(E]) = P(E3) = xand P(E2) = y. Since ^ P{a>) = 1, we have 2x + y = 1. For event Ex, A
> will always have more heads coeQ. than B no matter what A9s {n + \)th coin's side is; for event E3,
> A will have no more heads than B no matter what A9s (n + \)th coin's side is. For event E2, A9s (n +
> l)th coin does make a difference. If it's a head, which happens with probability 0.5, it will make A
> have more heads than B. So the (n + \)th coin increases the probability that A has more heads than B
> by 0.5;; and the total probability that A has more heads is jc + 0.5>> = x +0.5(1-2jc) = 0.5 when A
> has (? +1) coins. Card game A casino offers a simple card game. There are 52 cards in a deck with 4
> cards for each jack queen king ace value 2, 3, 4, 5,6, 7,8, 9,10, J, 0, K, A. Each time the cards
> are thoroughly shuffled (so each card has equal probability of being selected). You pick up a card
> from the deck and the dealer picks another one without replacement. If you have a larger number, you
> win; if the numbers are equal or yours is smaller, the house wins—as in all other casinos, the house
> always has better odds of winning. What is your probability ofwinning? 2 Hint: What are the possible
> results (events) if we compare the number of heads in^'s first n coins with B's n coins? By making
> the number of coins equal, we can take advantage of symmetry. For each event, what will happen ifA's
> last coin is a head? Or a tail?

> **Solution:**
> One answer to this problem is to consider all 13 different outcomes of your card. The card can have
> a value 2, 3, -,A and each has 1/13 of probability. With a value of 2, the probability of winning is
> 0/51; with a value of 3, the probability of winning is 4/51 (when the dealer picks a 2); ...; with a
> value of A, the probability of winning is 48/51 (when the dealer picks a 2, 3, -, or K). So your
> probability of winning is /a

1^

l2xl3

x(0 + l + --- + l2) = x- I3x5l

Although this is a straightforward solution and it elegantly uses the sum of an integer sequence, it is not the most efficient way to solve the problem. If you have got the core spirits of the coin tossing problem, you may approach the problem by considering three different outcomes: E]: Your card has a number larger than the dealer's; E2: Your card has a number equal to the dealer's; E3: Your card has a number lower than the dealer's. Again by symmetry, P(E]) = P(E3). So we only need to figure out P(E2\ the probability that two cards have equal value. Let's say you have randomly selected a card. Among the remaining 51 cards, only 3 cards will have the same value as your card. So the probability that the two cards have equal value is 3/51. As a result, the probability that you win isP(El) = (l-P(E2))/2 = (l-3/5l)/2 = 8/17. Drunk passenger A line of 100 airline passengers are waiting to board a plane. They each hold a ticket to one of the 100 seats on that flight. For convenience, let's say that the n-th passenger in line has a ticket for the seat number n. Being drunk, the first person in line picks a random seat (equally likely for each seat). All of the other passengers are sober, and will go to their proper seats unless it is already occupied; In that case, they will randomly choose a free seat. You're person number 100. What is the probability that you end up in your seat (i.e., seat #100) ?3

> **Solution:**
> Let's consider seats #1 and #100. There are two possible outcomes: 3 Hint: If you are trying to use
> complicated conditional probability to solve the problem, go back and think again. If you decide to
> start with a simpler version of the problem, starting with two passengers and increasing the number
> of passengers to show a pattern by induction, you can solve the problem more efficiently. But the
> problem is much simpler than that. Focus on events and symmetry and you will have an intuitive
> answer.

E]: Seat #1 is taken before #100; E2: Seat #100 is taken before #1. If any passenger takes seat #100 before #1 is taken, surely you will not end up in you own seat. But if any passenger takes #1 before #100 is taken, you will definitely end up in you own seat. By symmetry, either outcome has a probability of 0.5. So the probability that you end up in your seat is 50%. In case this over-simplified version of reasoning is not clear to you, consider the following detailed explanation: If the drunk passenger takes #1 by chance, then it's clear all the rest of the passengers will have the correct seats. If he takes #100, then you will not get your seat. The probabilities that he takes #1 or #100 are equal. Otherwise assume that he takes the n-th seat, where n is a number between 2 and 99. Everyone between 2 and (n-l) will get his own seat. That means the n-th passenger essentially becomes the new "drunk" guy with designated seat #1. If he chooses #1, all the rest of the passengers will have the correct seats. If he takes #100, then you will not get your seat. (The probabilities that he takes #1 or #100 are again equal.) Otherwise he will just make another passenger down the line the new "drunk" guy with designated seat #1 and each new "drunk" guy has equal probability of taking #1 or #100. Since at all jump points there's an equal probability for the "drunk" guy to choose seat #1 or 100, by symmetry, the probability that you, as the 100th passenger, will seat in #100 is 0.5. N points on a circle Given TV points drawn randomly on the circumference of a circle, what is the probability that they are all within a semicircle?4

> **Solution:**
> Let's start at one point and clockwise label the points as l929-~9N. The probability that all the
> remaining N-l points from 2 to N are in the clockwise semicircle starting at point 1 (That is, if
> point

is at 12:00, points 2 to N are all between 12:00 and 6:00) is \I2N~X . Similarly the probability that a clockwise semicircle starting at any point /, where ie{29-~9N} contains all the other TV -1 points is also 1/2""1. Claim: the events that all the other TV -1 points are in the clockwise semicircle starting at point i, i = l929-"9N are mutually exclusive. In other words, if we, starting at point i and proceeding clockwise along the circle, sequentially encounters points i + l, i + 2,???, N91, ???,/-1 in half a circle, then starting at any other point j9 we cannot encounter all Hint: Consider the events that starting from a pointw, you can reach all the rest of the points on the circle clockwise, n e {!,-??, N) in a semicircle. Are these events mutually exclusive?

other points within a clockwise semicircle. Figure 4.1 clearly demonstrates this conclusion. If starting at point i and proceeding clockwise along the circle, we sequentially encounter points / +1, / + 2, ? ? ?, N, 1, ? ? ?, i -1 within half a circle, the clockwise arc between i -1 and i must be no less than half a circle. If we start at any other point, in order to reach all other points clockwise, the clockwise arc between i -1 and i are always included. So we cannot reach all points within a clockwise semicircle starting from any other points. Hence, all these events are mutually exclusive and we have f N f N (jEi \ = Y,P(Ei)^p\ \JE' \ = Nxl/2N-]=N/2N-] V/=i J /=i V/=i J The same argument can be extended to any arcs that have a length less than half a circle. If the ratio of the arc length to the circumference of the circle is x (x < 1 / 2), then the probability of all TV points fitting into the arc is NxxN~]. Figure 4.1 N points fall in a clockwise semicircle starting from /

## 4.2 Combinatorial Analysis {#42}

Many problems in probability theory can be solved by simply counting the number of different ways that a certain event can occur. The mathematic theory of counting is often referred to as combinatorial analysis (or combinatorics). In this section, we will cover the basics of combinatorial analysis. Basic principle of counting: Let S be a set of length-/: sequences. If there are

? nx possible first entries, ? n2 possible second entries for each first entry, ? n3 possible third entries for each combination of first and second entries, etc. Then there are a total of nx ? n2 ? ? -nk possible outcomes. Permutation: A rearrangement of objects into distinct sequence (i.e., order matters). Property: There are different permutations of n objects, of which n} are nx\n2\...nr! alike, n2 are alike, ? ? ?, nr are alike. **Combination:** C(n,r) = n! / [(n-r)! * r!]

**Binomial theorem:** `(x + y)^n = sum_{k=0}^{n} C(n,k) * x^k * y^(n-k)` Inclusion-Exclusion: P(E1 union E2) = P(E1) + P(E2) - P(E1 intersect E2)(Ei)-P(ElE2)-P(ElE2)-P(E2E2) + P(ElE2Ei) and more generally, P(E,uE2(J...(jEN) = fdP(Ei)-YdP(EiEi2) + - + (-lY+] J P(E.Ei2...Eir) + - i=\ ix<i2 ix<i2<...ir + (-l)N+'P(ElE2-EN) where ￡P(￡,.Eh ?■■Ei) has ;,</2<.../r (N>i \r J terms. Poker hands Poker is a card game in which each player gets a hand of 5 cards. There are 52 cards in a deck. Each card has a value and belongs to a suit. There are

values, jack queen king ace spade club heart diamond 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, and four suits, *,*,*, ? .

What are the probabilities of getting hands with four-of-a-kind (four of the five cards with the same value)? Hands with a full house (three cards of one value and two cards of another value)? Hands with two pairs?

> **Solution:**
> The number of different hands of a five-card draw is the number of 5-element '52" subsets of a
> 52-element set, so total number of hands = 2,598,960. Hands with a four-of-a-kind: First we can
> choose the value of the four cards with the same value, there are 13 choices. The 5th card can be
> any of the rest 48 cards (12 choices for values and 4 choices for suits). So the number of hands
> with four-of-a kind is 13x48 = 624. Hands with a Full House: In sequence we need to choose the value
> of the triple, 13 choices; the suits of the triple, choices; the value of the pair, 12 choices; and
> the suits of the pair, UJ v3y choices. So the number of hands with full house is 13x(4) xl2x f4l =
> 13x4x12x6 = 3,744. Hands with Two Pairs: In sequence we need to choose the values of the two pairs,
> fl3"| [4s] (4s) choices; the suits of the first pair, choices; the suits of the second pair, UJ UJ
> {2) choices; and the remaining card, 44 (52-4x2, since the last cards can not have the same value as
> either pair) choices. So the number of hands with two pairs is x44 = 78x6x6x44 = 123,552. To
> calculate the probability of each, we only need to divide the number of hands of each kind by the
> total possible number of hands. 1312J X (4) UJ X (4) lv Hopping rabbit A rabbit sits at the bottom
> of a staircase with n stairs. The rabbit can hop up only one or two stairs at a time. How many
> different ways are there for the rabbit to ascend to the top of the stairs?5 5 Hint: Consider an
> induction approach. Before the final hop to reach the w-th stair, the rabbit can be at either the
> (w-l)th stair or the (?-2)th stair assuming n > 2.

> **Solution:**
> Let's begin with the simplest cases and consider solving the problem for any number of stairs using
> induction. For n = \, there is only one way and /(1) = 1. For n = 2, we can have one 2-stair hop or
> two 1-stair hops. So f(2) = 2. For any n>2, there are always two possibilities for the last hop,
> either it's a 1-stair hop or a 2-stair hop. In the former case, the rabbit is at (n-\) before
> reaching n, and it has f(n-l) ways to reach (n-l). In the latter case, the rabbit is at (n-2) before
> reaching n, and it has f(n-2) ways to reach {n-2). So we have f(n) = f(n-2) + f(n-l). Using this
> function we can calculate f(n) for n = 3, 4, ? ? ?6 Screwy pirates 2 Having peacefully divided the
> loot (in chapter 2), the pirate team goes on for more looting and expands the group to 11 pirates.
> To protect their hard-won treasure, they gather together to put all the loot in a safe. Still being
> a democratic bunch, they decide that only a majority - any majority - of them (>6) together can open
> the safe. So they ask a locksmith to put a certain number of locks on the safe. To access the
> treasure, every lock needs to be opened. Each lock can have multiple keys; but each key only opens
> one lock. The locksmith can give more than one key to each pirate. What is the smallest number of
> locks needed? And how many keys must each pirate carry?7 This problem is a good example of the
> application of combinatorial analysis in information sharing and cryptography. A general version of
> the problem was explained in a 1979 paper "How to Share a Secret" by Adi Shamir. Let's randomly
> select 5 pirates from the 11-member group; there must be a lock that none of them has the key to.
> Yet any of the other 6 pirates must have the key to this lock since any 6 pirates can open all
> locks. In other words, we must have a "special" lock to which none of the 5 selected pirates has a
> key and the other 6 pirates all have keys. Such 5-pirate groups are randomly selected. So for each
> combination of 5 pirates, there must be such a "special" lock. The (U\ 11! = 462 locks. Each lock
> has 6 keys, minimum number of locks needed is v5y 5!6! which are given to a unique 6-member
> subgroup. So each pirate must have = 252 keys. That's surely a lot of locks to put on a safe and a
> lot of keys for each pirate to carry. 6 You may have recognized that the sequence is a sequence of
> Fibonacci numbers. 7 Hint: every subgroup of 6 pirates should have the same key to a unique lock
> that the other 5 pirates do not have.

Chess tournament A chess tournament has 2" players with skills

> 2 > ??? >2n. It is organized as a knockout tournament, so that after each round only the winner proceeds to the next round. Except for the final, opponents in each round are drawn at random. Let's also assume that when two players meet in a game, the player with better skills always wins. What's the probability that players 1 and 2 will meet in the final?8

> **Solution:**
> There are at least two approaches to solve the problem. The standard approach applies multiplication
> rule based on conditional probability, while a counting approach is far more efficient. (We will
> cover conditional probability in detail in the next section.) Let's begin with the conditional
> probability approach, which is easier to grasp. Since there are 2" players, the tournament will have
> n rounds (including the final). For round 1, players 2,3,---,2" each have —-— probability to be l's
> rival, so the probability that 2"-2 2x(2w_1-l) 1 and 2 do not meet in round 1 is = — -. Condition on
> that 1 and 2 do not 2W-1 2W-1 meet in round 1, 2"_1 players proceed to the 2nd round and the
> conditional probability 2?-i_2 2x(2""2-l) that 1 and 2 will not meet in round 2 is —; = —^—; -. We
> can repeat the same process until the {n-X)th round, in which there are 22 (=2" /2"~2) players left
> and the conditional probability that

and

will not meet in round (n-\) is 22-2_2x(22-'-l) 22-l~ 22-l Let E} be the event that 1 and 2 do not meet in round 1; E2 be the event that 1 and 2 do not meet in rounds 1 and 2; En_x be the event that 1 and 2 do not meet in round 1,2, ???,?-1. Apply the multiplication rule, we have P(l and 2 meet in the nth game) = P(E]) x P(E2 \ E]) x ? ? ? x P(En_x \EXE2 — En_2) _2x(2"-1-l) 2x(2"'2-l) 2x(22-]-l)_ 2"~] 2n-\ X 2""1-! X'"'X 22-l ~2W-1 8 Hint: Consider separating the players to two 2""1 subgroups. What will happen if player 1 and 2 in the same group? Or not in the same group?

Now let's move on to the counting approach. Figure 4.2A is the general case of what happens in the final. Player 1 always wins, so he will be in the final. From the figure, it is obvious that T players are separated to two 2""1 -player subgroups and each group will have one player reaching the final. As shown in Figure 4.2B, for player 2 to reach the final, he/she must be in a different subgroup from 1. Since any of the remaining players in 2,3,- ?-,2" are likely to be one of the (2"_1 -1) players in the same subgroup as player

or one of the 2""1 players in the subgroup different from player 1, the probability that 2 is in a different subgroup from 1 and that 1 and 2 will meet in the final ryn-\ is simply —-—. Clearly, the counting approach provides not only a simpler solution but also more insight to the problem. General Case

t + 1 & 2 in the Final

t + nth round (n-l)th round nth round (n-l)th round

AA

+

AA 2 +

2n_1 players 2n_1 players A 2n_1 players 2n_1 players B Figure 4.2A The general case of separating 2n players into 2n'1-player subgroups; 4.2B The special case with players 1 and 2 in different groups Application letters You're sending job applications to 5 firms: Morgan Stanley, Lehman Brothers, UBS, Goldman Sachs, and Merrill Lynch. You have 5 envelopes on the table neatly typed with names and addresses of people at these

firms. You even have

cover letters personalized to each of these firms. Your 3-year-old tried to be helpful and stuffed each cover letter into each of the envelopes for you. Unfortunately she randomly put letters

into envelopes without realizing that the letters are personalized. What is the probability that all 5 cover letters are mailed to the wrong firms?9

> **Solution:**
> This problem is a classic example for the Inclusion-Exclusion Principle. In fact, a more general
> case is an example in Ross' textbook First Course in Probability. Let's denote by Ei9i = l,---,5 the
> event that the i-th letter has the correct envelope. Then P\ \<jEi is the probability that at least
> one letter has the correct envelope and 1-P \<jEi is the probability that all letters have the wrong
> envelopes. P\ \jEi can be calculated using the Inclusion-Exclusion Principle:

It's obvious thatP(￡,)= -, Vi = 1,—,5. So ￡/>(￡,) = 1.

,=i P(Ei E.t) is the event that both letter /, and letter i2 have the correct envelope. The probability that /, has the correct envelope is 1/5; Conditioned on that /, has the correct envelope, the probability that i2 has the correct envelope is 1/4 (there are only 4

C5-2V envelopes left). So />(￡,.E,) = - x ■ - v }'

5-1 5! There are , 2 5^ 5! 2!(5-2)! members of P{EjEi) in ^P{EtEh), so we have 'l<'2 (5-2)! 5!

x- — Yp(e,e,) = fa '' - 5! 2!(5-2)! 2! Similarly we have Y,P{EiE,Eh) =^, J) ^WW = 7r and P(E,E2-E5)=5] 3? rr> . ?^' ;, <;2<;3<;4

Hint: The complement is that at least one letter is mailed to the correct firm.

D 5r t

1 ^^ ' 2! 3! 4! 5!

/=i (5 ^ ii So the probability that all 5 letters are mailed to the wrong firms is \-P\ l^j￡; = — ? V ;=i )

Birthday problem How many people do we need in a class to make the probability that two people have the same birthday more than 1/2? (For simplicity, assume 365 days a year.)

> **Solution:**
> The number is surprisingly small: 23. Let's say we have n people in the class. Without any
> restrictions, we have 365 possibilities for each individual's birthday. The basic principle of
> counting tells us that there are 365" possible sequences. We want to find the number of those
> sequences that have no duplication of birthdays. For the first individual, we can choose any of the
> 365 days; but for the second, only 364 remaining choices left, ..., for the rf/zindividual, there
> are 365-r + l choices. So for n people there are 365x364x-x (365-^ + 1) possible sequences where no
> two .,..,,, , i ? i j iw j i 365x364x---x(365-w + l) individuals have the same birthday. We need to
> have < 1 / 2

365" for the odds to be in our favor. The smallest such n is 23. 100th digit What is the 100th digit to the right of the decimal point in the decimal representation of (1 + V2)3000?10

> **Solution:**
> If you still have not figure out the solution from the hint, here is one more hint: (1 + y[2)n + (1
> - J2)" is an integer when n = 3000. Applying the binomial theorem for (x + y)", we have
> o+v2)-=i;("lr'V2'= ± f;V-'V2\ ± f:W *-0W k=2j,0<j^kJ k=2j+\,0ZJ<?\kJ ' Hint: (1 + -Jl)2 + (1 - -Jl)1
> = 6 . What will happen to (1 - V2)2" as n becomes large?

a-v2)-=zf;H-v2)*= ± f-W- ± f-W *-0^ ' k=2j\0<j<"^ ' k=2j+\,0<j<?l* . . n ( ft \ r—k So (1 +V2)W +(1 - V2)w = 2 ^ \\n~k V2 , which is always an integer. It is easy k=2j\0<j<-\ / see that 0<(1-V2)3000 ?10"100. So the 100th digit of (1 + V2)W must be 9. to Cubic of integer Let x be an integer between 1 and 1012, what is the probability that the cubic of x ends withll?11

> **Solution:**
> All integers can be expressed as x = a + \0b, where a is the last digit of x. Applying the binomial
> theorem, we have x3 = {a + \0b)3 =a3 +30a2b + 300ab2 + 100063. The unit digit of jc3 only depends on
> a3. So a3 has a unit digit of 1. Only a = 1 satisfies this requirement and a3 = 1. Since a3 = 1, the
> tenth digit only depends on 30a2b = 30b. So we must have that 3b ends in 1, which requires the last
> digit of b to be 7. Consequently, the last two digits of x should be 71, which has a probability of
> 1% for integers between 1 and 1012.

## 4.3 Conditional Probability and Bayes' Formula {#43}

Many financial transactions are responses to probability adjustments based on new—and most likely incomplete—information. Conditional probability surely is one of the most popular test subjects in quantitative interviews. So in this section, we focus on basic conditional probability definitions and theorems. Conditional probabilityP(A\B): If P(B)>0, then P{A\B) = P(^ is the fraction of B outcomes that are also A outcomes. Multiplication Rule: `P(E1*...*En) = P(E1)*P(E2|E1)*...*P(En|E1,...,E_{n-1})`

1' Hint: The last two digits of X only depend on the last two digits of jc.

**Law of Total Probability:** `P(E) = sum_i P(E|F_i)*P(F_i)` for mutually exclusive {F_i} partitioning Omega. Independent events: P(EF) = P(E)P(F) => P(EFC) = P(E)P(FC). Independence is a symmetric relation: X is independent of Y <=> Y is independent of X. P(E\F,)P(F.) **Bayes' Formula:** `P(F_j|E) = P(E|F_j)*P(F_j) / sum_i P(E|F_i)*P(F_i)`, where {F_1,...,F_n} partition Omega. As the following examples will demonstrate, not all conditional probability problems have intuitive solutions. Many demand logical analysis instead. Boys and girls Part A. A company is holding a dinner for working mothers with at least one son. Ms. Jackson, a mother with two children, is invited. What is the probability that both children are boys?

> **Solution:**
> The sample space of two children is given by n = {(ft,6),(ft,g),(g,ft),(g,g)} (e.g., (g,6) means the
> older child is a girl and the younger child a boy), and each outcome has the same probability. Since
> Ms. Jackson is invited, she has at least one son. Let B be the event that at least one of the
> children is a boy and A be the event that both children are boys, we have P(A\B)=P{AnB)= P({(M)})
> =1/4 =

P(B) P({(b9bUb9g)9(g,b)}) 3/4 3* Part B. Your new colleague, Ms. Parker is known to have two children. If you see her walking with one of her children and that child is a boy, what is the probability that both children are boys?

> **Solution:**
> the other child is equally likely to be a boy or a girl (independent of the boy you've seen), so the
> probability that both children are boys is 1/2. Notice the subtle difference between part A and part
> B. In part A, the problem essentially asks given there is at least one boy in two children, what is
> the conditional probability that both children are boys. Part B asks that given one child is a boy,
> what is the conditional probability that the other child is also a boy. For both parts, we need to
> assume that each child is equal likely to be a boy or a girl. All-girl world? In a primitive
> society, every couple prefers to have a baby girl. There is a 50% chance that each child they have
> is a girl, and the genders of their children are mutually independent. If each couple insists on
> having more children until they get a girl and once they have a girl they will stop having more
> children, what will eventually happen to the fraction of girls in this society? It was surprising
> that many interviewees—include many who studied probability—have the misconception that there will
> be more girls. Do not let the word "prefer" and a wrong intuition misguide you. The fraction of baby
> girls are driven by nature, or at least the X and Y chromosomes, not by the couples' preference. You
> only need to look at the key information: 50% and independence. Every new-born child has equal
> probability of being a boy or a girl regardless of the gender of any other children. So the fraction
> of girls born is always 50% and the fractions of girls in the society will stay stable at 50%.
> Unfair coin You are given 1000 coins. Among them, 1 coin has heads on both sides. The other 999
> coins are fair coins. You randomly choose a coin and toss it 10 times. Each time, the coin turns up
> heads. What is the probability that the coin you choose is the unfair one? This is a classic
> conditional probability question that uses Bayes' theorem. Let A be the event that the chosen coin
> is the unfair one, then Ac is the event that the chosen coin is a fair one. Let B be the event that
> all ten tosses turn up heads. Apply Bayes' ^/ , i nx P(B | A)P(A) P(B I A)P(A) theorem we have P(A
> \B) = v ' ' v ' = v ' } v } . P(B) P(B\A)P(A) + P(B\AC)P(AC) The priors are P(^) = l/1000 and P(AC)
> = 999/1000. If the coin is unfair, it always turns up heads, so P{B \A)-\. If the coin is fair, each
> time it has 1/2 probability turning

up heads. So P(B \AC) = (1/2)10 =1/1024. Plug in all the available information and we have the answer: P(A\B) = nB\A)P(A) 1/1000*1 .0-5. P(B\A)P(A) + P(B\AC)P(AC) 1/1000x1 + 999/1000x1/1024 Fair probability from an unfair coin If you have an unfair coin, which may bias toward either heads or tails at an unknown probability, can you generate even odds using this coin?

> **Solution:**
> Unlike fair coins, we clearly can not generate even odds with one toss using an unfair coin. How
> about using 2 tosses? Let pH be the probability the coin will yield head, and pT be the probability
> the coin will yield tails {pH+ pT = 1). Consider two independent tosses. We have four possible
> outcomes HH, HT, TH and TT with probabilities P{HH) = pHpH, P{HT) = pHpT, P(TH) = pTpH, and P{TT) =
> pTpT . So we have P(HT)=P(TH). By assigning HT to winning and TH to losing, we can generate even
> odds. Dart game Jason throws two darts at a dartboard, aiming for the center. The second dart lands
> farther from the center than the first. If Jason throws a third dart aiming for the center, what is
> the probability that the third throw is farther from the center than the first? Assume Jason's
> skillfulness is constant. A standard answer directly applies the conditional probability by
> enumerating all possible outcomes. If we rank the three darts' results from the best (A) to the
> worst (C), there are 6 possible outcomes with equal probability: 121 should point out that this
> simple approach is not the most efficient approach since I am disregarding the cases HH and TT. When
> the coin has high bias (one side is far more likely than the other side to occur), the method may
> take many runs to generate one useful result. For more complex algorithm that increasing efficiency,
> please refer to Tree Algorithms for Unbiased Coin Tossing with a Biased Coin by Quentin F. Stout and
> Bette L. Warren, Annals of Probability 12 (1984), pp. 212-222.

Outcome 1st throw 2nd throw 3rd throw

A B C

B A C

A C B

C A B

B C A

C B A The information from the first two throws eliminates outcomes 2, 4 and 6. Conditioned on outcomes 1, 3, and 5, the outcomes that the 3rd throw is worse than the 1st throw are outcomes 1 and 3. So there is 2/3 probability that the third throw is farther from the center than the first. This approach surely is reasonable. Nevertheless, it is not an efficient approach. When the number of darts is small, we can easily enumerate all outcomes. What if it is a more complex version of the original problem: Jason throws n (n > 5 ) darts at a dartboard, aiming for the center. Each subsequent dart is farther from the center than the first dart. If Jason throws the (n + l)th dart, what is the probability that it is also farther from the center than his first? This question is equivalent to a simple question: what is the probability that the (n + \)th throw is not the best among all {n +1) throws? Since the 1st throw is the best among the first n throws, essentially I am saying the event that the {n + l)th throw is the best of all (n +1) throws (let's call it An+]) is independent of the event that the 1st throw is the best of the first n throws (let's call it A]). In fact, An+] is independent of the order of the first n throws. Are these two events really independent? The answer is a resounding yes. If it is not obvious to you that^w+1 is independent of the order of the first n throws, let's look at it another way: the order of the first n throws is independent of An+]. Surely this claim is conspicuous. But independence is symmetric! Since the probability of An+] is 1 l(n +1), the probability that (n + \)th throw is not the best is n l{n + 1).13 For the original version, three darts are thrown independently, they each have a 1/3 chance of being the best throw. As long as the third dart is not the best throw, it will be worse than the first dart. Therefore the answer is 2/3. Birthday line At a movie theater, a whimsical manager announces that she will give a free ticket to the first person in line whose birthday is the same as someone who has already bought a ticket. You are given the opportunity to choose any position in line. Assuming that you 13 Here you can again use symmetry argument: each throw is equally likely to be the best.

don't know anyone else's birthday and all birthdays are distributed randomly throughout the year (assuming 365 days in a year), what position in line gives you the largest chance of getting the free ticket?1

> **Solution:**
> If you have solved the problem that no two people have the same birthday in an w-people group, this
> new problem is just a small extension. Assume that you choose to be the ?-th person in line. In
> order for you to get the free ticket, all of the first n -1 individuals in line must have different
> birthdays and your birthday needs to be the same as one of those n-\ individuals. p(n) - p {first n
> — 1 people have no same birthday) x p(yours among those n-\ birthdays) 365x364x — (365-#i + 2) n-\
> 365"

It is intuitive to argue that when n is small, increasing n will increase your chance of getting the free ticket since the increase of p(yours among those n-\ birthdays) is more significant than the decrease in p(first #7-1 people have no same birthday). So when n is small, we have P(n) > P(n -1). As n increases, gradually the negative impact of p(first n-\ peoplehave no samebirthday) will catch up and at a certain point we will have P(n +1) < P(n). So we need to find such an n that satisfies P(n) > P(n -1) and P(n) > P(n +1). _, ,.

365-(?-3) n-2 P(n -1) = x x ? ? ? x x ■

D. .

P(n) = x x-

_, ?

P(n +1) = x x ?

365-(#i-2) #i-l ?x - -x-

365-(#7-2) 365-(#i-l) #i ?X -X -X-

P(n) > P(n -1) 365-(#i-2) #7-1 #i-2 v ■x > Hence,

P(n) > P(n +1) #i-l 365-(#i-l) n > -x-

n -3?-363<0 ?2-#7-365>0 ? = 20 You should be the 20th person in line. 14 Hint: If you are the ?-th person in line, to get the free ticket, the first (?-l) people in line must not have the same birthday and you must have the same birthday as one of them.

Dice order We throw 3 dice one by one. What is the probability that we obtain 3 points in strictly increasing order?15

> **Solution:**
> To have 3 points in strictly increasing order, first all three points must be different numbers.
> Conditioned on three different numbers, the probability of strictly increasing order is simply 1/3!
> = 1/6 (one specific sequence out of all possible permutations). So we have P = P(different numbers
> in all three throws) x P(increasing order|3 different numbers) = 0*!*M = 5/54 Monty Hall problem
> Monty Hall problem is a probability puzzle based on an old American show Lefs Make a Deal The
> problem is named after the show's host. Suppose you're on the show now, and you're given the choice
> of 3 doors. Behind one door is a car; behind the other two, goats. You don't know ahead of time what
> is behind each of the doors. You pick one of the doors and announce it. As soon as you pick the
> door, Monty opens one of the other two doors that he knows has a goat behind it. Then he gives you
> the option to either keep your original choice or switch to the third door. Should you switch? What
> is the probability of winning a car if you switch? If you don't switch, whether you win or not is
> independent of Monty's action of showing you a goat, so your probability of winning is 1/3. What if
> you switch? Many would argue that since there are only two doors left after Monty shows a door with
> goat, the probability of winning is 1/2. But is this argument correct? If you look at the problem
> from a different perspective, the answer becomes clear. Using a switching strategy, you win the car
> if and only if you originally pick a door with a goat, which has a probability of 2/3 (You pick a
> door with a goat, Monty shows a door with another goat, so the one you switch to must have a car
> behind it). If you originally picked the door with the car, which has a probability of 1/3, you will
> lose by switching. So your probability of winning by switching is actually 2/3. 15 Hint: To obtain 3
> points in strictly increasing order, the 3 points must be different. For 3 different points in a
> sequence, strictly increasing order is one of the possible permutations.

Amoeba population There is a one amoeba in a pond. After every minute the amoeba may die, stay the same, split into two or split into three with equal probability. All its offspring, if it has any, will behave the same (and independent of other amoebas). What is the probability the amoeba population will die out?

> **Solution:**
> This is just another standard conditional probability problem once you realize we need to derive the
> probability conditioned on what happens to the amoeba one minute later. Let P(E) be the probability
> that the amoeba population will die out and apply the law of total probability conditioned on what
> happens to the amoeba one minute later: P(E)= P(E\Fx)P{Fx) + P(E\F2)P(F2)+- + P(E\Fn)P{Fn). For the
> original amoeba, as stated in the question, there are four possible mutually exclusive events each
> with probability 1/4. Let's denote Fx as the event the amoeba dies; F2 as the event that it stays
> the same; F3 as the event that it splits into two; F4 as the event that it splits into three. For
> event F}9 P(E\F]) = l since no amoeba is left. P(E\F2) = P(E) since the state is the same as the
> beginning. For F3, there are two amoebas; either behaves the same as the original one. The total
> amoeba population will die only if both amoebas die out. Since they are independent, the probability
> that they both will die out is P(E)2. Similarly we have P(F4) = P(E)3. Plug in all the numbers, the
> equation becomes P(E)= 1/4x1 + \IAxP(E) + \/4xP(E)2 +\IAxP{E)\ Solve this equation with the
> restriction 0<P(E)<\, and we will get P(E) = V2-l? 0.414 (The other two roots of the equation are 1
> and -V2-1). Candies in a jar You are taking out candies one by one from ajar that has 10 red
> candies, 20 blue candies, and 30 green candies in it. What is the probability that there are at
> least 1 blue candy and 1 green candy left in the jar when you have taken out all the red candies?16
> At first look, this problem appears to be a combinatorial one. However, a conditional probability
> approach gives a much more intuitive answer. Let Tr, Tb and Tg 16 Hint: If there are at least 1 blue
> candy and 1 green candy left, the last red candy must have been removed before the last blue candy
> and the last green candy in the sequence of 60 candies. What is the probability that the blue candy
> is the last one in the 60-candy sequence? Conditioned on that, what is the probability that the last
> green candy is the last one in the 30-candy sequence (10 red, 20 green)? What if the green candy is
> the last one in the 60-candy sequence?

we have P{Tr<Tg <Tb) = — x—. be the number that the last red, blue, and green candies are taken out respectively. To have at least 1 blue candy and 1 green candy left when all the red candies are taken out, we need to have Tr<Th and Tr<Tg. In other words, we want to derive P{Tr <ThnTr <T ). There are two mutually exclusive events that satisfy Tr < Th and Tr<Tg:Tr<Th<T^ndTr<Tg<Th. ..P(Tr<TbnTr<Tg) = P(Tr<Th<Tg) + P(Tr<Tg<Th) Tr <Th< Tg means that the last candy is green (Tg = 60). Since each of the 60 candies are equally likely to be the last candy and among them 30 are green ones, we have

P(T = 60) = —. Conditioned on T = 60, we need P(T <Tb\T = 60). Among the 30

red and blue candies, each candy is again equally likely to be the last candy and there are

20 blue candies, so P(T < 71 | T = 60) = — and P(T < 71 < T) = — x —. Similarly, V r b\ g ) 3Q \r b g> 6Q 3Q J>

60X40 Hence,

P(T<ThnT<T) = P(T<Th<T) + P(T <T<Th) = —x — + — x — = — . V r b r gJ V r b g) \ r g *'

Coin toss game Two players, A and B, alternatively toss a fair coin (A tosses the coin first, then B tosses the coin, then A, then B...). The sequence of heads and tails is recorded. If there is a head followed by a tail {HT subsequence), the game ends and the person who tosses the tail wins. What is the probability that ,4 wins the game?17

> **Solution:**
> Let P{A) be the probability that A wins; then the probability that B wins is P(B) = l-P(A). Let's
> condition P(A) on A9s first toss, which has 1/2 probability of H (heads) and 1/2 probability of
> T(tails). P(A) = l/2P(A | H) + \I2P{A | T) If A's first toss is T, then B essentially becomes the
> first to toss (An H is required for the HT subsequence). So we have P{A \ T) = P{B) = 1 - P(A). If
> A9s first toss ends in //, let's further condition on fi's first toss. B has 1/2 probability of
> getting T, in that case A loses. For the 1/2 probability that B gets //, B essentially 17 Hint:
> condition on the result of /Ts first toss and use symmetry.

becomes the first one to toss an H. In that case, A has (l-P(A\H)) probability of winning. So P{A \H) = l/2xO + l/2(l-P(A \H)) => P(A\H) = 1/3 Combining all the available information, we have P(A) = l/2xl/3 + l/2(l-P(A))=>P(A) = 4/9. Sanity check: we can see that P(A) < 1 / 2, which is reasonable since A cannot win in his first toss, yet B has 1/4 probability to win in her first toss. Russian roulette series Let's play a traditional version of Russian roulette. A single bullet is put into a 6- chamber revolver. The barrel is randomly spun so that each chamber is equally likely to be under the hammer. Two players take turns to pull the trigger—with the gun unfortunately pointing at one's own head—without further spinning until the gun goes off and the person who gets killed loses. If you, one of the players, can choose to go first or second, how will you choose? And what is your probability of loss?

> **Solution:**
> Many people have the wrong impression that the first person has higher probability of loss. After
> all, the first player has a 1/6 chance of getting killed in the first round before the second player
> starts. Unfortunately, this is one of the few times that intuition is wrong. Once the barrel is
> spun, the position of the bullet is fixed. If you go first, you lose if and only if the bullet is in
> chamber 1, 3 and 5. So the probability that you lose is the same as the second player, 1/2. In that
> sense, whether to go first or second does not matter. Now, let's change the rule slightly. We will
> spin the barrel again after every trigger pull. Will you choose to be the first or the second
> player? And what is your probability of loss? The difference is that each run now becomes
> independent. Assume that the first player's probability of losing is p, then the second player's
> probability of losing is l-/?. Let's condition the probability on the first person's first trigger
> pull. He has 1/6 probability of losing in this run. Otherwise, he essentially becomes the second
> player in the game with new (conditional) probability of losing I-p. That happens with probability
> 5/6. That gives us /? = lxl/6 + (l-/?)x5/6=>/? = 6/ll. So you should choose to be the second player
> and have 5/11 probability of losing. If instead of one bullet, two bullets are randomly put in the
> chamber. Your opponent played the first and he was alive after the first trigger pull. You are given
> the option whether to spin the barrel. Should you spin the barrel?

> **Solution:**
> if you spin the barrel, the probability that you will lose in this round is 2/6. If you don't spin
> the barrel, there are only 5 chambers left and your probability of losing in this round (conditioned
> on that your opponent survived) is 2/5. So you should spin the barrel. What if the two bullets are
> randomly put in two consecutive positions? If your opponent survived his first round, should you
> spin the barrel? Now we have to condition our probability on the fact that the positions of the two
> bullets are consecutive. As shown in Figure 4.3, let's label the empty chambers as 1, 2, 3 and 4;
> label the ones with bullets 5 and 6. Since your opponent survived the first round, the possible
> position he encountered is 1, 2, 3 or 4 with equal probability. With 1/4 chance, the next one is a
> bullet (the position was 4). So if you don't spin, the chance of survival is 3/4. If you spin the
> barrel, each position has equal probability of being chosen, and your chance of survival is only
> 2/3. So you should not spin the barrel. Figure 4.3 Russian roulette with two consecutive bullets.
> Aces Fifty-two cards are randomly distributed to 4 players with each player getting 13 cards. What
> is the probability that each of them will have an ace? The problem can be answered using standard
> counting methods. To distribute 52' 52 cards to 4 players with 13 cards each has permutations. If
> each player 13!13!13!13!

needs to have one ace, we can distribute the aces first, which has 4! ways. Then we 48? distribute the rest 48 cards to 4 players with 12 cards each, which has 12!12!12!12! permutations. So the probability that each of them will have an Ace is 48! . 52! 52^39^26^13 '* 12!12!12!12! ' 13!13!13!13! ~

X

X

X

" The logic becomes clearer if we use a conditional probability approach. Let's begin with any one of the four aces; it has probability 52/52 = 1 of belonging to a pile. The second ace can be any of the remaining 51 cards, among which 39 belong to a pile different from the first ace. So the probability that the second ace is not in the pile of the first ace is 39/51. Now there are 50 cards left, among which 26 belong to the other two piles. So the conditional probability that the third ace is in one of the other 2 piles given the first two aces are already in different piles is 26/50. Similarly, the conditional probability that the fourth ace is in the pile different from the first three aces given that the first three aces are in different piles is 13/49. So the probability that each pile has an ace is t

lx — x — x— .

Gambler's ruin problem A gambler starts with an initial fortune of i dollars. On each successive game, the gambler wins $1 with probability /?, 0 < p < 1, or loses $1 with probability q = 1 - p. He will stop if he either accumulates N dollars or loses all his money. What is the probability that he will end up with N dollars?

> **Solution:**
> This is a classic textbook probability problem called the Gambler's Ruin Problem. Interestingly, it
> is still widely used in quantitative interviews. From any initial state i (the dollars the gambler
> has), 0<i<N, let P. be the probability that the gambler's fortune will reach TV instead of 0. The
> next state is either z + lwith probability p or i-1 with probability q. So we have Pi=pPM+qPi.]^PM-
> Pi=l(Pi-Pi-i) = ( n V ( a Y P) P We also have the boundary probabilities P0 = 0 and PN=\. So
> starting from P2, we can successively evaluate P. as an expression of P}:

`P_i = p*P_{i+1} + q*P_{i-1}`, giving `P_{i+1} - P_i = (q/p)*(P_i - P_{i-1})` ```
P_i = [1 - (q/p)^i] / [1 - (q/p)^N]   if p != 1/2
P_i = i/N                               if p = 1/2
``` Basketball scores A basketball player is taking 100 free throws. She scores one point if the ball passes through the hoop and zero point if she misses. She has scored on her first throw and missed on her second. For each of the following throw the probability of her scoring is the fraction of throws she has made so far. For example, if she has scored 23 points after the 40th throw, the probability that she will score in the 41th throw is 23/40. After 100 throws (including the first and the second), what is the probability that she scores exactly 50 baskets?18

> **Solution:**
> Let (n,k), \<k<n, be the event that the player scores k baskets after n throws and Pnk = P((n,k)).
> The solution is surprisingly simple if we use an induction approach starting with n = 3. The third
> throw has 1/2 probability of scoring. So we have P3l=l/2 and Pi2=\/2. For the case when ? = 4, let's
> apply the law of total probability Hint: Again, do not let the number 100 scares you. Start with
> smallest n, solve the problem; try to find a pattern by increasing ?; and prove the pattern using
> induction.

P4jl=/>((4,l)|(3,l))xP31+/>((4,l)|(3,2))xP32=|xI + 0xI = I P4,2 = />((4,2)|(3,l))xP31+/>((4,2)|(3,2))xP32 =1x1 +1x1 = 1 P43 = P((4,3)\(3,l))xPi]+P((4,3)\(3,2))><PX2=0><^ +^ = ^ The results indicate that Pnk = , V￡= 1,2, ?■?,?-1, and give the hint that the law of n-\ total probability can be used in the induction step. Induction step: given that Pnk = , V￡= l, 2, ■■■,?-1, we need to prove ?-l P?+]Jc=- ——7 = —, V￡= l, 2,---, n. To show it, simply apply the law of total

__1 probability: Pn^k=P{miss\{n,k))Pnk + P(score\(n,k-\))Pnk_, V n)n-\ n n-\ n k-\ The equation is also applicable to the Pn+], and Pn+] w, although in these cases = 0 n k and 1- V nj Hence, Pm,0 = 1/99 = 0, respectively. So we have Pnk= , V￡= l,2,---,?-l and \/n>2. n-\ Cars on road If the probability of observing at least one car on a highway during any 20-minute time interval is 609/625, then what is the probability of observing at least one car during any 5-minute time interval? Assume that the probability of seeing a car at any moment is uniform (constant) for the entire 20 minutes.

> **Solution:**
> We can break down the 20-minute interval into a sequence of 4 non- overlapping 5-minute intervals.
> Because of constant default probability (of observing a car), the probability of observing a car in
> any 5-minute interval is constant. Let's denote the probability to be /?, then the probability that
> in any 5-minute interval we do not observe a car is 1 - p .

The probability that we do not observe any car in all four of such independent 5-minute intervals is (1 - p)4 = 1 -609/625 = 16/625, which gives p = 3/5. ## 4.4 Discrete and Continuous Distributions {#44}

In this section, we review a variety of distribution functions for random variables that are widely used in quantitative modeling. Although it may not be necessary to memorize the properties of these distributions, having an intuitive understanding of the distributions and having the ability to quickly derive important properties are valuable skills in practice. As usual, let's begin with the theories: Common function of random variables Table 4.1 summarizes how the basic properties of discrete and continuous random variables are defined or calculated. These are the basics you should commit to memory. Random variable (X) Cumulative distribution function/cdf Probability mass function /pmf Probability density function /pdf Expected value/ E[X] Expected value of g(X)/E[g(X)] Variance ofXlvar(X) Standard deviation ofXIstd{X) Discrete F{a) = P{X < a} pmf: p(x) = P{X = x} x:pix)>0 2 s(x)pix) x:pix)>0 Continuous19 Fia)=[oafix)dx pdf: fix) = ±- Fix) ax P xf(x)dx J-00 r gix)fix)dx J-00 E[iX-E[X])2] = E[X2]-iE[X]f JvariX) Table 4.1 Basic properties of discrete and continuous random variables Discrete random variables Table 4.2 includes some of the most widely-used discrete distributions. Discrete uniform random variable represents the occurrence of a value between number a and b when all values in the set {a, a + l,-~, b} have equal probability. Binomial random variable represents the number of successes in a sequence of n experiments when each trial is I9 For continuous random variables, P(X = x) = 0, Vjc e (-00,00), so P{X < x} = P{X < x).

independently a success with probability p. Poisson random variable represents the number of events occurring in a fixed period of time with the expected number of occurrences Xt when events occur with a known average rate X and are independent of the time since the last event. Geometric random variable represents the trial number (n) to get the first success when each trial is independently a success with probability p. Negative Binomial random variable represents the trial number to get to the r-th success when each trial is independently a success with probability/?. Name Probability mass function (pmf) E[X] var(^) Uniform P(x) =

b-a + l , x = a,a + \,-,b b + a (b-a + l)2-I

Binomial (ri\ yXj P(x) = \ \px(l-p)"-x, jc = 0,1,-,#i np np{\-p) Poisson P(x) = - -x,(xty x = 0,\,-

At At Geometric p(x)=(\-Py-lp,x=i,2, p \-p Negative Binomial P(x) = \ x-i\ r-\ P'Q-PY x = r,r + L r P r{\-p) Table 4.2 Probability mass function, expected value and variance of discrete random variables Continuous random variables Table 4.3 includes some of the commonly encountered continuous distributions. Uniform distribution describes a random variable uniformly distributed over the interval [a,b]. Because of the central limit theorem, normal distribution/Gaussian distribution is by far the most popular continuous distribution. Exponential distribution models the arrival time of an event if it has a constant arrival rate k. Gamma distribution with parameters (a, k) often arises, in practice, as the distribution of the amount of time one has to wait until a total of n events occur. Beta distributions are used to model events 20 Here we use the product of arrival rate k and time t to define the parameter (expected value) since it is the definition used in many Poisson process studies.

that are constrained within a defined interval. By adjusting the shape parameters a and P, it can model different shapes of probability density functions.21 Name Probability density function (pdf) E[X] var(X) Uniform

b-a , a<x<b b + a (b-af

-U-fY Normal V2fl7T e 2<T , x e (-00, oo) Exponential Ae , x>0 MX MX2 -Xx Gamma Xe-AX(Xx)' —, x>0, r(a) =￡>>""' alX alX2 Beta T(a +^-x"-\l-xf-\0<x<l a ap T{a)T{P) a + p (a + p + \){a + py Table 4.3 Probability density function, expected value random variables and variance of continuous Meeting probability Two bankers each arrive at the station at some random time between 5:00 am and 6:00 am (arrival time for either banker is uniformly distributed). They stay exactly five minutes and then leave. What is the probability they will meet on a given day?

> **Solution:**
> Assume banker^ arrives Xminutes after 5:00 am and B arrives 7minutes after 5:00 am. Xand Y are
> independent uniform distribution between 0 and 60. Since both only stay exactly five minutes, as
> shown in Figure 4.4, A and B meet if and only if \X-Y\<5. So the probability that A and B will meet
> is simply the area of the shadowed region divided by the area of the square (the rest of the region
> can be combined to a square with `P(meet) = [60^2 - 55^2] / 60^2 = 575/3600 ~= 0.159` 60x60

21 For example, beta distribution is widely used in modeling loss given default in risk management. If you are familiar with Bayesian statistics, you will also recognize it as a popular conjugate prior function.

Figure 4.4 Distributions of Banker As and Banker B's arrival times Probability of triangle A stick is cut twice randomly (each cut point follows a uniform distribution on the stick), what is the probability that the 3 segments can form a triangle?

> **Solution:**
> Without loss of generality, let's assume that the length of the stick is 1. Let's also label the
> point of the first cut as x and the second cut asjy .

If x < y, then the three segments are x, y-x and 1-y. The conditions to form a triangle are mmYmm X v y-x Try x + (y-x)>l-y^>y>l/2 x + (l-y)>y-x^>y<l/2 + x (y - x) + (1 - y) > x => x < 1 / 2 The feasible area is shown in Figure 4.5. The case for x < y is the left gray triangle. Using symmetry, we can see that the case for x > y is the right gray triangle. 1/2 X Figure 4.5 Distribution of cuts X

andY 22 Hint: Let the first cut point be x, the second one bey, use the figure to show the distribution ofx andy.

The total shadowed area represents the region where 3 segments can form a triangle, which is 1/4 of the square. So the probability is 1/4. Property of Poisson process You are waiting for a bus at a bus station. The buses arrive at the station according to a Poisson process with an average arrival time of 10 minutes (A = 0.1/min). If the buses have been running for a long time and you arrive at the bus station at a random time, what is your expected waiting time? On average, how many minutes ago did the last bus leave?

> **Solution:**
> Considering the importance of jump-diffusion processes in derivative pricing and the role of Poisson
> processes in studying jump processes, let's elaborate more on exponential random variables and the
> Poison process. Exponential distribution is widely used to model the time interval between
> independent events that happen at a constant \Xe~Xt (t > 0) average rate (arrival rate) k: f(t) = <
> . The expected arrival time is MX [0 (t < 0) and the variance is 1/ X2. Using integration, we can
> calculate the cdf of an exponential distribution to be F(t) = P(t < t) = 1 - e~rt and P(r>t) = e~rt,
> where r is the random variable for arrival time. One unique property of exponential distribution is
> memorylessness: P{t>s + t\r>s} = P{r>/}.23 That means if we have waited for s time units, the extra
> waiting time has the same distribution as the waiting time when we start at time 0. When the
> arrivals of a series of events each independently follow an exponential distribution with arrival
> rate k, the number of arrivals between time 0 and / can be modeled as a Poisson process P(N(t) = x)
> = , x = 0, 1, ??? 24 The expected x\ number of arrivals is Xt and the variance is also Xt. Because
> of the memoryless nature of exponential distribution, the number of arrivals between time s and / is
> also a Poisson e-M'-s){A(t-s))x process P(N(t - s) = x) = jc! Taking advantage of the memoryless
> property of exponential distribution, we know that the expected waiting time is \lX = 10min. If you
> look back in time, the memoryless property stills applies. So on average, the last bus arrived 10
> minutes ago as well. 23 P{t > 5 + /1 t > s} = e-Ms+t)/e-As = e~Xt = P(x > /} 24 More rigorously,
> N(t) is defined as a right-continuous function.

This is another example that your intuition may misguide you. You may be wondering that if the last bus on average arrived 10 minutes ago and the next bus on average will arrive 10 minutes later, shouldn't the average arrival time be 20 minutes instead of 10? The explanation to the apparent discrepancy is that when you arrive at a random time, you are more likely to arrive in a long time interval between two bus arrivals than in a short one. For example, if one interval between two bus arrivals is 30 minutes and another is 5 minutes, you are more likely to arrive at a time during that 30-minute interval rather than 5-minute interval. In fact, if you arrive at a random time, the F\X^l expected residual life (the time for the next bus to arrive) is — for a general 2E[X] distribution.25 Moments of normal distribution IfX follows standard normal distribution (X ~ N(0,1)), what is E[Xn] for n = 1, 2, 3 and 4?

> **Solution:**
> The first to fourth moments of the standard normal distribution are essentially the mean, the
> variance, the skewness and the kurtosis. So you probably have remembered that the answers are 0, 1,
> 0 (no skewness), and 3, respectively.

_ 2 /9 Standard normal distribution has pdf f(x) = —j^e x . Using simple symmetry we yj27T have E[xn]= ￡xw-t=^2/2dx = 0 when n is odd. For n = 2, integration by parts are often used. To solve E[Xn] for any integer n, an approach using moment generating functions may be a better choice. Moment generating functions are defined as ^Vx/?(x), // x is discrete X ￡etxf(x)dx, if x is continuous Sequentially taking derivative of M(t), we get one frequently-used property of M(t): M(t) = E[etx] = M'(/) = — E[etx ] = E[XetX ] => M '(0) = E[X], dt M\t) = — E[XetX] = E[X2e'x]^M"(0) = E[X2], dt 25 The residual life is explained in Chapter 3 of "Discrete Stochastic Process" by Robert G. Gallager.

and M"(0) = E[X"], V? > 1 in general. We can use this property to solve ^'[A'"] for X ~ Af(0,1). For standard normal distribution M(t) = E[e'x] = f etx ^=e*2'2dx = /12 f° -^=e(x-'fl2dx = /12. (-=e-{x-')2/2 is the pdf of normal distribution X ~ N(t, 1), so ￡/(*>￡: = 1). Taking derivatives, we have M'(/) = te'2'2 =>M'(0) = 0, M"(/) = e'2'2 + tV12 => M"(0) = e° = 1, M3(0 = ///2 + It/12 + tV12 = 3te'2'2 +13/12 => M3(0) = 0, and M\t) = 3e'2'2 + It2/12 + 3t2/12 + 3tV'2 =>M4(0) = 3e° = 3.

## 4.5 Expected Value, Variance, and Covariance {#45}

Expected value, variance and covariance are indispensable in estimating returns and risks of any investments. Naturally, they are a popular test subject in interviews as well. The basic knowledge includes the following: If E[x,] is finite for all i = l, ???,?, then E[Xl+ — + X?] = E[Xl] + — + E[Xn].The relationship holds whether the xt 's are independent of each other or not. IfXand yare independent, then E[g(X)h(Y)] = E[g(x)]E[h(Y)]. Covariance: Cov(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]. Cov(X,Y) Correlation: p(X,Y) = ^Var{X)Var{Y) MX and Y are independent, Cov{X, Y) = 0 and p{X, Y) = 0.26 General rules of variance and covariance: n m n m Covi^X,,ZW = Y^aJbjCoviX^ Yj) i=\ j=\ i=\ j=\ Varfcx^YVariXt +lYZ Cov{XnXj) The reverse is not true. p(X, Y) = 0 only means A'and Y are uncorrelated; they may well be dependent.

Conditional expectation and variance For discrete distribution: E[g{X) \ Y = y] = ^g(x)pX{Y(x \ y) = ^g(x)p(X = x \ Y = y) X X For continuous distribution: E[g(X) \ Y = y] = T g(x)fx{Y (x \ y)dx Law of total expectation: f YaElx I Y = yMY = y\ for discrete Y y fE[X | Y = y]fY(y)dy, for continuous Y oo E[X] = E[E[X | 7]] = Connecting noodles You have 100 noodles in your soup bowl. Being blindfolded, you are told to take two ends of some noodles (each end on any noodle has the same probability of being chosen) in your bowl and connect them. You continue until there are no free ends. The number of loops formed by the noodles this way is stochastic. Calculate the expected number of circles.

> **Solution:**
> Again do not be frightened by the large number 100. If you have no clue how to start, let's begin
> with the simplest case where n = 1. Surely you have only one choice (to connect both ends of the
> noodle), so Zs[/(1)] = 1. How about 2 noodles? Now you (4^\ 4x3 have 4 ends (2x2) and you can
> connect any two of them. There are = = 6 \2)

combinations. Among them, 2 combinations will connect both ends of the same noodle together and yield 1 circle and 1 noodle. The other 4 choices will yield a single noodle. So the expected number of circles is E[f(2)] = 216 x (1 + ￡[/(!)])+ 4 / 6 x E[f(l)] = 1 / 3 + ￡[/(!)]= 1/3 + 1. We now move on to 3 noodles with (6} 6x5 v2y = 15 choices. Among them, 3 choices

will yield 1 circle and 2 noodles; the other 12 choices will yield 2 noodles only, so E[fO)] = 3/15 x(l + ^[/(2)]) +12/15 x￡[/(2)]= 1/5 + E[f(2)] = 1/5 + 1/3 + 1. See the pattern? For any n noodles, we will have E[f(n)] = l + l/3 + l/5 + --- + ll{2n-1), which can be easily proved by induction. Plug 100 in, we will have the answer.

Actually after the 2-noodle case, you probably have found the key to this question. If (ln\ you start with n noodles, among \ = n(2n-\) possible combinations, we have V 2 J Yi

2/7 — 2 = probability to yield 1 circle and n -1 noodles and probability n{2n-\) 2n — \ 2n-\ to yield n-\ noodles only, so E[f(n)] = E[f(n-1)] + . Working backward, you 2n-l can get the final solution as well. Optimal hedge ratio You just bought one share of stock A and want to hedge it by shorting stock B. How many shares of B should you short to minimize the variance of the hedged position? Assume that the variance of stock ^4's return is a]; the variance of 2?'s return is a\\ their correlation coefficient is p.

> **Solution:**
> Suppose that we short h shares of B, the variance of the portfolio return is var(r, - hrB) = a\ -
> 2phaAaB + h2a2B The best hedge ratio should minimize var(rA-hrB). Take the first order partial
> derivative with respect to h and set it to zero: = -2paAaB + 2ha2B - 0 => h = p—^. dh <jb To confirm
> it's the minimum, we can also check the second-order partial derivative: — = 2a2B>0. So Indeed when
> h = p^L, the hedge portfolio has the minimum dh aB variance. Dice game Suppose that you roll a dice.
> For each roll, you are paid the face value. If a roll gives 4, 5 or 6, you can roll the dice again.
> Once you get 1,2 or 3, the game stops. What is the expected payoff of this game? This is an example
> of the law of total expectation. Clearly your payoff will be different depending on the outcome of
> first roll. Let E[X] be your expected payoff and Kbe the outcome of your first throw. You have 1/2
> chance to get Ye {1,2,3}, in which case the expected value is the expected face value 2, so E[X | Y
> e {1,2,3}] = 2; you have

1/2 chance to get Ye {4,5, 6}, in which case you get expected face value 5 and extra throw(s). The extra throw(s) essentially means you start the game again and have an extra expected value E[X]. So we have E[X | Y e (4,5,6)] = 5 + E[X]. Apply the law of total expectation, we have E[X] = E[E[X\ Y]] = ±x2 + ±x(5 + E[X]) => E[X] = 7.27 Card game What is the expected number of cards that need to be turned over in a regular 52-card deck in order to see the first ace?

> **Solution:**
> There are 4 aces and 48 other cards. Let's label them as card 1,2,- -,48. Let f 1, if card i is
> turned over before 4 aces xi=\ [0, otherwise The total number of cards that need to be turned over
> in order to see the first ace is

X = l + ^X.9 so we have E[X] = 1 + ^E[X.]. As shown in the following sequence, ;=1 /=! each card i is equally likely to be in one of the five regions separated by 4 aces: 1A2A3A4A5 So the probability that card i appears before all 4 aces is 1/5, and we have E[X{] = 1/5.

Therefore, E[X] = 1 + ^￡[X;] = 1 + 48/5 = 10.6. This is just a special case for random ordering of m ordinary cards and n special cards. m Yyi The expected position of the first special card is 1 + J]E[X.] = 1 + . Sum of random variables Assume that X]9 X29 ???, and Xn are independent and identically-distributed (IID) random variables with uniform distribution between 0 and 1. What is the probability \+x2 that S =X,+X, + — + Xm <1?28 27 You will also see that the problem can be solved using Wald's equality in Chapter 5. 28 Hint: start with the simplest case where n =1, 2, and 3. Try to find a general formula and prove it using induction.

> **Solution:**
> This problem is a rather difficult one. The general principle to start with the simplest cases and
> try to find a pattern will again help you approach the problem; even though it may not give you the
> final answer. When n = 1, P(S^ < 1) is 1. As shown in Figure 4.6, when n = 2, the probability that
> X}+X2<1 is just the area under Xx +X2 <1 within the square with side length 1 (a triangle). So P(S2
> < 1) = 1/2. When n = 3, the probability becomes the tetrahedron ABCD under the plane Xx + X2 + X3 <
> 1 within the cube with side length 1. The volume of tetrahedron ABCD is 1/6.29 So P(S3 <l) = l/6.
> Now we can guess that the solution is \ln\. To prove it, let's again resort to induction. Assume
> P(Sn <1) = l/n\. We need to prove that P(Sn+l<\) = l/(n + l)\. n = 2 Figure 4.6 Probability that Sn
> ^ 1 when n = 2 or n= 3. n = 3 Here we can use probability by conditioning. Condition on the value of
> Xn+l, we have P(Sn+]<\)= lf(Xn+])P(Sn<l-Xn+l)dXn+], where f(XH+l) is the probability density
> function of Xn+X, so / (Xn+l) = 1. But how do we calculate P(Sn < 1 - Xn+]) ? The cases of n = 2 and
> n - 3 have provided us with some clue. For Sn < 1 - Xn+^ instead of Sn < 1, we essentially need to
> shrink every dimension of the ^-dimensional simplex30 from 1 to 29 You can derive it by integration:
> T A(z)dz = f 1 /2z2dz = 1 /6> where A(z) is the cross-sectional area. 30 An rt-Simplex is the
> ^-dimensional analog of a triangle.

(1 — X )"

\-Xn+v So its volume should be ^— instead of—. Plugging in these results, n\ n\ wehaveP(5?+1<l)=>[ o-*~.> .w+1 n+\ > tt + 1 _J_

n\ n + \ {n + \)\ So the general result is true for n +1 as well and we have P{Sn < 1) = 1 / n!. Coupon collection There are TV distinct types of coupons in cereal boxes and each type, independent of prior selections, is equally likely to be in a box.

### Problem A

**If a child wants to collect a complete set of coupons with at least one of each type,**

how many coupons (boxes) on average are needed to make such a complete set?

### Problem B

**If the child has collected n coupons, what is the expected number of distinct coupon**

types?31

> **Solution:**
> For part A, let Xi9 i = 1,2, ? ? ?, TV, be the number of additional coupons needed to obtain the
> /-th type after (i -1) distinct types have been collected. So the total number N of coupons needed
> is X = X] + X2 + ? ? ? + XN = ^JXi . For any i, i -1 distinct types of coupons have already been
> collected. It follows that a new coupon will be of a different type with probability \-(i-\)lN =
> {N-i + \)lN. Essentially to obtain the /-th distinct type, the random variable Xi follows a
> geometric distribution with p = (N-i + l)/N and E[Xj] = N/(N-i + l). For example, if / = 1, we
> simply have X. = E[X;] = 1. ??? E[X] = YE[Xi] = Y^— = N(± + — + ---+1-} L J tt ' tfN-i + l {N N-l X)
> 31 Hint: For part A, let Xi be the number of extra coupons collected to get the /-th distinct coupon
> after /-I types of distinct coupons have been collected. Then the total expected number of coupons
> to collect N all distinct types is E[X] = J\E[X.]- F°r Part B, which is the expected probability (P)
> that the /-th coupon type is not in the n coupons?

For part 2?, let Y be the number of distinct types of coupons in the set of n coupons. We introduce indicator random variables l{., i = 1, 2, ? ? ?, N , where 17. = 1, if at least one coupon of the i-th type is in the set of n coupons [ I; = 0, otherwise So we have Y = 7, +12 + ? ? ? + IN = ]T 7 /=i N-l For each collected coupon, the probability that it is not the i-th coupon type is . TV Since all n coupons are independent, the probability that none of the n coupons is the i-th coupon type is P(/; = 0) = and we have ￡[/.]= P{Ii = 1) = 1 ￡&]= ￡￡[!;] = N-N\ N J ...... ^ N N-V

;=1 A^ Joint default probability If there is a 50% probability that bond A will default next year and a 30% probability that bond B will default. What is the range of probability that at least one bond defaults and what is the range of their correlation?

> **Solution:**
> The range of probability that at least one bond defaults is easy to find. To have the largest
> probability, we can assume whenever A defaults, B does not default; whenever B defaults, A does not
> default. So the maximum probability that at least one bond defaults is 50%+ 30% = 80%. (The result
> only applies if P{A) +P{B)<\). For the minimum, we can assume whenever A defaults, B also defaults.
> So the minimum probability that at least one bond defaults is 50%. To calculate the corresponding
> correlation, let IA and IB be the indicator for the event that bond A/B defaults next year and pAB
> be their correlation. Then we have ￡[/J= 0.5, ￡[/,] = 0.3, var(/,) = pA x(1 -pA) = 0.25, var(/,) =
> 0.21. 32 A similar question: if you randomly put 18 balls into 10 boxes, what is the expected number
> of empty boxes?

P(A or B defaults) = E[IA] + E[IB]-E[IAIB] = E[IA] + E[IB]-(E[IA]E[IB]-cow(IA,IB)) = 0.5 + 03-(0.5x0.3-pABc7A<7B) = O.65-j021/2pAB For the maximum probability, we have 0.65- V0.21 /2pAB = 0.8 => pAB = -V3/7 . For the minimum probability, we have 0.65-y[02l 12pAB = 0.5 => pAB = JiTl . In this problem, do not start with P(A or B defaults)=0.65-y/0.2l/2pAB and try to set pAB=±l to calculate the maximum and minimum probability since the correlation cannot be ±1. The range of correlation is restricted to

## 4.6 Order Statistics {#46}

Let X be a random variable with cumulative distribution function Fx (x). We can derive the distribution function for the minimum Yn = min(^T,, X2,? ? ?, Xn) and for the maximum Zn = max(Xt, X2, ? ? ?, Xn) of n IID random variables with cdf Fx (x) as P(Yn >x) = (P(X>x))"^\-FYn(x) = (l-Fx(x))" => fYa(x) = nfx(*)(1 -Fx(x))""1 P(Zn <x) = (P(X < x))" => FZn (x) = (Fx (x))" =* fZm (x) = nfx (x)(Fx (x))""' Expected value of max and min Let Xx,X2,--,Xn be IID random variables with uniform distribution between 0 and 1. What are the cumulative distribution function, the probability density function and expected value of Zn =max(X\,X2,--,Xn)? What are the cumulative distribution function, the probability density function and expected value of Yn = min(X,, X2, ? ? ?, Xn) ?

> **Solution:**
> This is a direct test of textbook knowledge. For uniform distribution on [0,1], Fx(x) = x and fx(x)
> = \. Applying Fx(x) and fx(x)to Z? =max(X?X2,--,^?) we have P(Z? <x) = (P(X < x))" ^ FZn (x) = (Fx
> (x)T = x" => fz. (x) = nfx (xXFx (x)r] = nx-x

and E[Zn] = fxfz (x)dx = fnxndx = ~^-[xn+] T = ^-. Jo ? Jo n + lL Jo n + \ Applying Fx{x) and fx(x)io Yn =mm(X],X2,-,Xn) we have P(Yn>x) = (P(X>x)y^FY(x) = \-(l-Fx(x)y=\-(l-xy => /r. (*) = nfx (x)(l - /V (x))-1 = n(l - x)-1 and E[YJ= (nx(l-xy]dx= (,,(i-^/-'A = [/]'-^[^']' =-- JO JO LJO^ + JLJO^ + I Correlation of max and min Let X] and X2 be IID random variables with uniform distribution between 0 and 1, Y = min(X],X2) and Z = max(X],X2). What is the probability of Y>y given that Z <z for any y,z e [0,1] ? What is the correlation of Y and Z?

> **Solution:**
> This problem is another demonstration that a figure is worth a thousand words. As shown in Figure
> 4.7, the probability that Z < z is simply the square with side length z. So P(Z<z) = z2. Since Z =
> max(X^X2) and K = min^,,^), we must have Y < Z for any pair of X, and X2. So if y > z, P(Y > y \ Z <
> z) = 0. For y < z, that *, and A^ satisfies Y>y and Z < z is the square with vertices
> (y,y),(z,y),(z,z), and (y, z), which has an area (z-y)2. So P(Y>ynZ<z) = (z-y)2.Hence , rr x
> f(2-v)2/z2, if0<z<land0<y<z P{Y>y\Z<z) = \K " J * [0, otherwise Now let's move on to calculate the
> correlation of Y and Z. cov(/,Z) E[YZ]-E[Y]E[Z] corr(/,Z) = std(y)xstd(Z) ylE[Y2]-E[Y]2
> x^E[Z2]-E[Z]2

x2 * (y.z) (z,z) y zi -**h*^*sv^ ,*r^^*=-

i y z

x, Figure 4.7 Distribution of Xi, X2, their maximum and minimum.

Using previous problem's conclusions, we have E[Y] = =—, E[Z] = = —. From the pdfs of Y and Z, fY (x) = n(l-x)n~] = 2(1- jc) and fz(z) = nzn~x = 2z9 we can also get E[Yn2 ] = j[ 2(1 - y)y2dy = - - - = - and ￡[Z?2 ] = j[ 2z3<fe = -, which give us the

, ^ /^\2 variances: var(Y) = E[Y2]-E[Yf =--[-] =— and var(Z) =Ml J_33 18'

UJ

To calculate E[YZ], we can use E[YZ] = T [yzf(y,z)dydz. To solve this equation, we need f{y,z). Let's again go back to Figure 4.7. From the figure we can see that when 0<z < 1 and 0<y<z, F(y,z) is the shadowed area with probability F(y,z) = P(Y < ynZ < z) = P(Z < z)-P(Y>ynZ < z) = z2 -(z- yf =2zy- y2 -?-F(y,z) = 2 and E[YZ]= [[^yzdydz = {z\y2\dz = [r>dz = ±. ■f(y,z) 33 You may have noticed that var(y) = var(Z) and wonder whether it is a coincidence for n = 2. It is actually true for all integer n. You may want to think about why that is true without resorting to calculation. Hint: var(x) = var(l - x) for any random variable x.

An alternative and simpler approach to calculate E[YZ] is again to take advantage of symmetry. Notice that no matter xx<x2 or x,>jc2, we always have yz = x]x2 (z = max(jc,,x2) and y-min(x,,x2)). .'. E[YZ]=H xxx2dxxdx2 = E[X, ]E[X2 ] = I x I = I Hence cov(K, Z) = E[YZ] - E[Y]E[Z] = — and corr(r, Z) = `corr(Y,Z) = Cov(Y,Z) / [std(Y)*std(Z)] = (1/12) / (1/18) = 1/2`

Sanity check: That Y and Z have positive autocorrelation make sense since when Y becomes large, Z tends to become large as well (Z > Y). Random ants 500 ants are randomly put on a 1-foot string (independent uniform distribution for each ant between 0 and 1). Each ant randomly moves toward one end of the string (equal probability to the left or right) at constant speed of 1 foot/minute until it falls off at one end of the string. Also assume that the size of the ant is infinitely small. When two ants collide head-on, they both immediately change directions and keep on moving at

foot/min. What is the expected time for all ants to fall off the string?34

> **Solution:**
> This problem is often perceived to be a difficult one. The following components contribute to the
> complexity of the problem: The ants are randomly located; each ant can go either direction; an ant
> needs to change direction when it meets another ant. To solve the problem, let's tackle these
> components. When two ants collide head-on, both immediately change directions. What does it mean?
> The following diagram illustrates the key point: Before collision: —^—><—-—; After collision: <—*
> ^—>; switch label: <—^ ^—> When an ant A collides with another ant B, both switch direction. But if
> we exchange the ants' labels, it's like that the collision never happens. A continues to move to the
> right and B moves to the left. Since the labels are randomly assigned anyway, collisions make no
> difference to the result. So we can assume that when two ants meet, each just keeps on going in its
> original direction. What about the random direction that each ant chooses? Once the collision is
> removed, we can use symmetry to argue that it makes no difference which direction that an ant goes
> either. That means if an ant is put at the jc-th foot, the 34 Hint: If we switch the label of two
> ants that collide with each other, it's like that the collision never happened.

expected value for it to fall off is just x min. If it goes in the other direction, simply set x to 1 - x. So the original problem is equivalent to the following: What is the expected value of the maximum of 500 IID random variables with uniform distribution between 0 and 1?

The expected time = `E[max(X_1,...,X_500)] = 500/501` minutes (expected max of 500 Uniform[0,1] variables).
