# Chapter 5: Stochastic Process and Stochastic Calculus

> **Book:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou  
> **Chapter:** 5  
> **Topic:** Stochastic Process and Stochastic Calculus

## Chapter Overview

This chapter covers advanced topics that increasingly appear in quant interviews at top firms: Markov chains and transition matrices, random walks and martingales (with optional stopping), dynamic programming for optimal decision problems, and Brownian motion with Itô's lemma. Understanding these topics provides a significant edge and is often required for quant researcher roles.

**Sections:**

- **5.1** — Markov Chain
- **5.2** — Martingale and Random Walk
- **5.3** — Dynamic Programming
- **5.4** — Brownian Motion and Stochastic Calculus


---

## Table of Contents

- [5.1 Markov Chain](#51-markov-chain)
- [5.2 Martingale and Random Walk](#52-martingale-and-random-walk)
- [5.3 Dynamic Programming](#53-dynamic-programming)
- [5.4 Brownian Motion and Stochastic Calculus](#54-brownian-motion-and-stochastic-calculus)

---

## 5.1 Markov Chain {#51}

A Markov chain is a sequence of random variables XQ9X}9---9Xn9-~ with the Markov property that given the present state, the future states and the past states are independent: `P(X_{n+1}=j | X_n=i, X_{n-1},...,X_0) = p_{ij}` for all states i,j in {1,...,M} (state space S). In other words, once the current state is known, past history has no bearing on the future. For a homogenous Markov chain, the transition probability from state i to state j does not depend on n.l A Markov chain with M states can be completely described by an MxM transition matrix P and the initial probabilities P(X0) . **Transition matrix P = {p_{ij}}:** p_{ij} = probability of going from state i to state j.

```
P = | p_11  p_12  ...  p_1M |
    | p_21  p_22  ...  p_2M |
    |  ...               ...|
    | p_M1  p_M2  ...  p_MM |
``` M **Initial probabilities:** P(X_0) = (P(X_0=1),...,P(X_0=M)), sum = 1 **Path probability:** `P(X_1=i_1,...,X_n=i_n | X_0=i_0) = p_{i0,i1}*p_{i1,i2}*...*p_{i(n-1),in}` Transition graph: A transition graph is often used to express the transition matrix graphically. The transition graph is more intuitive than the matrix, and it emphasizes 1 In this chapter, we only consider finite-state homogenous Markov chains (i.e., transition probabilities do not change over time).

possible and impossible transitions. Figure 5.1 shows the transition graph and the transition matrix of a Markov chain with four states: ?? ?*>-. J *->? i = P =

"

0.5

0.5

0.4

0.25 0.4

0.5" 0.25 0.2

||

?

Figure 5.1 Transition graph and transition matrix of the Play Classification of states Statey is accessible from state i if there is a directed path in the transition graph from i to j (3n such that 7>(w) > 0). Let Ttj = mir\(n :Xn =j\X0= i), then P{T. < ∞) > 0 ) if and only if state j is accessible from state i. States i andy communicate if i is accessible from j andy is accessible from i. In Figure 5.1, state 3 and 1 communicate. State 4 is accessible form state 1, but they do not communicate since state 1 is not accessible from state 4. We say that state i is recurrent if for every state j that is accessible from /, i is also accessible fromy (Vy, P{Ttj < ∞) > 0 ⟹ P{Ttj < ∞) = 1). A state is called transient if it is not recurrent (3/, JP(7^/<∞)>0 and P{T{j < ∞) < 1). In Figure 5.1, only state 4 is recurrent. States 1, 2 and 3 are all transient since 4 is accessible from 1/2/3, but 1/2/3 are not accessible from 4. Absorbing Markov chains: A state i is called absorbing if it is impossible to leave this state (pu = 1, pi} - 0, V/ * i). A Markov chain is absorbing if it has at least one absorbing state and if from every state it is possible to go to an absorbing state. In Figure 5.1, state 4 is an absorbing state. The corresponding Markov chain is an absorbing Markov chain. Equations for absorption probability: The probability to reach a specific absorbing state s, av'-,aM, are unique solutions to equations as=l, at =0 for all absorbing M state(s) i*s, and ai =^0//^- for all transient states i. These equations can be easily y-i

derived using the law of total probability by conditioning the absorption probabilities on the next state. Equations for the expected time to absorption: The expected times to absorption, fi]9'"9fiM, are unique solutions to the equations /ut = 0 for all absorbing state(s) / and m //; = 1 +^ Pij/jj for all transient states i. These equations can be easily derived using the law of total expectation by conditioning the expected times to absorption on the next state. The number 1 is added since it takes one step to reach the next state. Gambler's ruin problem Player M has $1 and player N has $2. Each game gives the winner $1 from the other. As a better player, Mwins 2/3 of the games. They play until one of them is bankrupt. What is the probability that Mwins?

> **Solution:**
> The most difficult part of Markov chain problems often lies in how to choose the right state space
> and define the transition probabilities Py 's, Vi, j. This problem has fairly straightforward
> states. You can define the state space as the combination of the money that player M has ($m) and
> the money that player TV has {%n)\ {(m, a)} = {(3,0), (2,1), (1,2), (0,3)}. (Neither m nor n can be
> negative since the whole game stops when one of them goes bankrupt.) Since the sum of the dollars of
> both players is always $3, we can actually simplify the state space using only m: {m} = {0,1,2,3}.
> The transition graph and the corresponding transition matrix are shown in Figure 5.2. "10

0" y3 o % o oxo%

Figure 5.2 Transition matrix and transition graph for Gambler's ruin problem The initial state is X0 = 1 (Mhas $1 at the beginning). At state 1, the next state is 0 (M loses a game) with probability 1/3 and 2 (M wins a game) with probability 2/3. So ph0 =1/3 and px2 =2/3. Similarly we can get plx =1/3 and p23 =2/3. Both state 3 (Mwins the whole game) and state 0 (Mioses the whole game) are absorbing states. To calculate the probability that M reaches absorbing state 3, we can apply absorption probability equations: p = {p?} = \ Po,o P\.o Pl,0 POA P\.\ PlA Po,2 Pl2 Pl,2 Pl.O Pl,\ Pl.7

a3=la0=0, and a, =^pUJaJ, a2 = YdP2,/a/ Plugging in the transition probabilities using either the transition graph or transition a, =l/3x0 + 2/3xa2l [a =4/7 matrix, we have So, starting from $1, player A/has 4/7 probability ofwinning. a2=l/3xa,+2/3xlJ [a2 =6/7 Dice question Two players bet on roll(s) of the total of two standard six-face dice. Player A bets that a sum of 12 will occur first. Player B bets that two consecutive 7s will occur first. The players keep rolling the dice and record the sums until one player wins. What is the probability that A will win?

> **Solution:**
> Many of the simple Markov chain problems can be solved using pure conditional probability argument.
> It is not surprising considering that Markov chain is defined as conditional probability:
> P{Xn+x=j\Xn=i,XnA=in_x,-,X0=i0} = Pij=P{Xn+x=j\Xn=i}. So let's first solve the problem using
> conditional probability arguments. Let P(A) be the probability that A wins. Conditioning P{A) on the
> first throw's sum F, which has three possible outcomes F = 12, F = 7 and F g {7,12}, we have P(A) =
> P(A\F = 12)F(F = 12) + P(A\F = 1)P{F = 1) + P{A\F<∉{7,12})F(F ∉{7,12}) Then we tackle each component
> on the right hand side. Using simple permutation, we can easily see that P(F = 12) = 1/36, P(F = 7)
> = 6/36, P{F ∉{7,12}) = 29/36. Also it is obvious that F(^|F = 12) = 1 and P(A | F e {7,12}) = P(A).
> (The game essentially starts over again.) To calculate P(A \ F = 7), we need to further condition on
> the second throw's total, which again has three possible outcomes: E = 12, E = 7, and E ∉{7,12}. P(A
> | F = 7) = P(A | F = 7,F = 12)F(F = 12 | F = 7) + P(A | F = 7,E = 1)P(E = 1\F = 1) + P(A\F = 7,Ee
> {7,12})F(F ∉{7,12} | F = 7) = F(^|F = 7,F = 12)xl/36 + F(^|F = 7,F = 7)x6/36 + F(^|F =
> 7,F∉{7,12})x29/36 = lx 1/36 + 0x6/36 +F(^)x29/36 = l/36 + 29/36F(^) Here the second equation relies
> on the independence between the second and the first rolls. IfF = 7 and F = 12, A wins; if F = 7 and
> F = 7, A loses; if F = 7 and

∫g{7,12},the game essentially starts over again. Now we have all the necessarily information for P{A). Plugging it into the original equation, we have P(A) = P(A\F = \2)P(F = 12) + P(A | F = 1)P(F = 7) + P(A\Fe {7,\2})P(F ∉{7,12}) = lxl/36 + 6/36x(l/36 + 29/36P(^)) + 29/36P(,4) Solving the equation, we get P(A) = 7/13. This approach, although logically solid, is not intuitively appealing. Now let's try a Markov chain approach. Again the key part is to choose the right state space and define the transition probabilities. It is apparent that we have two absorbing states, 12 (A wins) and 7-7 (B wins), at least two transient states, S (starting state) and 7 (one 7 occurs, yet no 12 or 7-7 occurred). Do we need any other states? Theoretically, you can have other states. In fact, you can use all combination of the outcomes of one roll and two consecutive rolls as states to construct a transition matrix and you will get the same final result. Nevertheless, we want to consolidate as many equivalent states as possible. As we just discussed in the conditional probability approach, if no 12 has occurred and the most recent roll did not yield 7, we essentially go back to the initial starting state S. So all we need are states S, 7, 7-7 and 12. The transition graph and probability to reach state 12 are shown in Figure 5.3. 6/36 t^ n n^\ \ Probability to absorption state 12 29/36 a\i = *> ai-i = ° as =l/36xl + 6/36xtf7 + 29/36xtf5 tf7=l/36xl + 6/36x0 + 29/36xtf5 as=lltt Figure 5.3 Transition graph and probability to absorption for dice rolls Here the transition probability is again derived from conditional probability arguments. Yet the transition graph makes the process crystal clear. Coin triplets Part A. If you keep on tossing a fair coin, what is the expected number of tosses such that you can have HHH (heads heads heads) in a row? What is the expected number of tosses to have THH (tails heads heads) in a row?

> **Solution:**
> The most difficult part of Markov chain is, again, to choose the right state space. For the HHH
> sequence, the state space is straightforward. We only need four states: S (for the starting state
> when no coin is tossed or whenever a T turns up before HHH), //, ////, and HHH. The transition graph
> is

At state S, after a coin toss, the state will stay at S when the toss gives a T. If the toss gives an H, the state becomes H. At state //, it has 1/2 probability goes back to state S if the next toss is T; otherwise, it goes to state HH. At state HH, it also has 1/2 probability goes back to state S if the next toss is T; otherwise, it reaches the absorbing state HHH. So we have the following transition probabilities: Pss=j, P =J- P = 1 1H,S 2' P =1 P AH,HH 2' * Hi = J- P = i.andP? = 1. We are interested in the expected number of tosses to get HHH, which is the expected time to absorption starting from state S. Applying the standard equations for the expected time to absorption, we have Mn^+lMs+lM*HH Mhh=1 + iMs+TMhhh \Mh =12 Mhh = 8 [Mhhh = " So from the starting state, the expected number of tosses to get HHH is 14. Similarly for expected time to reach THH, we can construct the following transition graph and estimate the corresponding expected time to absorption: *hhh = 0 1/2 M&z cjHijy Ms= l + i;"s+iy"r Mm = 1 + t /^y + y Mthh Mthh ~ " >=>? >5=8 Mr =4 y"? = 2 ./^77/W = " So from the starting state S, the expected number of tosses to get THH is 8. Part B. Keep flipping a fair coin until either HHH or THH occurs in the sequence. What is the probability that you get an HHH subsequence before THH?2 2 Hint: This problem does not require the drawing of a Markov chain. Just think about the relationship between an HHH pattern and a THH pattern. How can we get an HHH sequence before a THH sequence?

> **Solution:**
> Let's try a standard Markov chain approach. Again the focus is on choosing the right state space. In
> this case, we begin with starting state S. We only need ordered subsequences of either HHH or THH.
> After one coin is flipped, we have either state T or H. After two flips, we have states 77/ and
> 7/7/. We do not need TT (which is equivalent to T for this problem) or HT (which is also equivalent
> to T as well). For three coin sequences, we only need THH and 7/7/7/ states, which are both
> absorbing states. Using these states, we can build the following transition graph: 1/2 1/2 1/2 f\
> 1/2 1/2 1/2 J72 ^\1 {(jhyl) QnT) ? ? ? Vl/2^ Figure 5.4 Transition graph of coin tosses to reach HHH
> or THH We want to get the probability to reach absorbing state 7/7/7/ from the starting state S.
> Applying the equations for absorption probability, we have QHHH ~ 1> aTHH ~~ " as=\aT+\aH aT =laT
> ~*~ T aTH ' aH =TaT ~*~ 1QHH GTH ~l.aT ~^laTHH->aHH = ~iaT +laHHH , >=>< aT = 0, aTH = 0 as=k aH=\ a
> =-L UHH

So the probability that we end up with the 7/7/7/^ pattern is 1/8. This problem actually has a special feature that renders the calculation unnecessary. You may have noticed that aT = 0. Once a tail occurs, we will always get THH before HHH. The reason is that the last two coins in THH is 7/7/, which is the first two coins in sequence HHH. In fact, the only way that the sequence reaches state 7/7/7/ before THH is that we get three consecutive 7/s in the beginning. Otherwise, we always have a T before the first 7/7/ sequence and always end in THH first. So if we don't start the coin flipping sequence with 7/7/7/, which has a probability of 1/8, we will always have THH before 7/7/7/. Part C. (Difficult) Let's add more fun to the triplet game. Instead of fixed triplets for the two players, the new game allows both to choose their own triplets. Player 1 chooses a triplet first and announces it; then player 2 chooses a different triplet. The players again toss the coins until one of the two triplet sequences appears. The player whose chosen triplet appears first wins the game. Ill

If both player 1 and player 2 are perfectly rational and both want to maximize their probability of winning, would you go first (as player 1)? If you go second, what is your probability ofwinning?3

> **Solution:**
> A common misconception is that there is always a best sequence that beats other sequences. This
> misconception is often founded on a wrong assumption that these sequences are transitive: if
> sequence A has a higher probability occurring before sequence B and sequence B has a higher
> probability occurring before sequence C, then sequence A has a higher probability occurring before
> sequence C. In reality, such transitivity does not exist for this game. No matter what sequence
> player 1 chooses, player 2 can always choose another sequence with more than 1/2 probability of
> winning. The key, as we have indicated in Part B, is to choose the last two coins of the sequence as
> the first two coins of player l's sequence. We can compile the following table for each pair of
> sequences: 2's winning Probability Player

HHH THH HTH HHT TTH THT HTT TTT Player 1 HHH / 7/8 3/5 1/2 7/10 7/12 3/5 1/2 THH 1/8 / 1/2 1/4 2/3 1/2 1/2 2/5 HTH 2/5 1/2 / 2/3 5/8 1/2 1/2 5/12 HHT 1/2 3/4 1/3 / 1/2 3/8 1/3 3/10 TTH 3/10 1/3 3/8 1/2 / 1/3 3/4 1/2 THT 5/12 1/2 1/2 5/8 2/3 / 1/2 2/5 HTT 2/5 1/2 1/2 2/3 1/4 1/2 / 1/8 TTT 1/2 3/5 7/12 7/10 1/2 3/5 7/8 / Table 5.1 Player 2's winning probability with different coin sequence pairs As shown in Table 5.1 (you can confirm the results yourself), no matter what player 1 's choices are, player 2 can always choose a sequence to have better odds of winning. The best sequences that player 2 can choose in response to l's choices are highlighted in bold. In order to maximize his odds of winning, player 1 should choose among HTH, HTT, THH and THT. Even in these cases, player 2 has 2/3 probability of winning. 3 This problem is a difficult one. Interested reader may find the following paper helpful: "Waiting Time and Expected Waiting Time-Paradoxical Situations" by V. C. Hombas, The American Statistician, Vol. 51, No. 2 (May, 1997), pp. 130-133. In this section, we will only discuss the intuition.

Color balls A box contains n balls of n different colors. Each time, you randomly select a pair of balls, repaint the first to match the second, and put the pair back into the box. What is the expected number of steps until all balls in the box are of the same color? (Very difficult)

> **Solution:**
> Let Nn be the number of steps needed to make all balls the same color, and let Fn i = l, 2,'~9 n, be
> the event that all balls have color i in the end. Applying the law of total expectation, we have
> E[N^E[NJF,]P[F^E[NJF2]I\F2} + -^E[NJFn]P[Fn]. Since all the colors are symmetric (i.e., they should
> have equivalent properties), we have P[Fx} = P[F2] = ... = P[Fn} = \ln and E[Nn] = E[Nn\F,] =
> E[Nn\F2] = E[Nn\Fn\ That means we can assume that all the balls have color

in the end and use E[Nn \ F] ] to represent E[Nn]. So how do we calculate E[Nn |/*|]? Not surprisingly, use a Markov chain. Since we only consider event Fl, color

is different from other colors and colors 2, ???,? become equivalent. In other words, any pairs of balls that have no color 1 ball involved are equivalent and any pairs with a color 1 ball and a ball of another color are equivalent if the order is the same as well. So we only need to use the number of balls that have color 1 as the states. Figure 5.5 shows the transition graph. Figure 5.5 Transition graph for all n balls to become color 1 State n is the only absorbing state. Notice that there is no state 0, otherwise it will never reach Fx. In fact, all the transition probability is conditioned on Fx as well, which makes the transition probability p_{i,i+1}|F₁ higher than the unconditional probability pii+] and p_{i,i-1}|F₁ lower than p_{i,i-1} For example, p_{10}|Z^=0 and p_{10} = 1/n. (Without conditioning, each ball is likely to be the second ball, so color 1 has 1 / n probability of being the second ball.) Using the conditional transition probability, the problem essentially becomes expected time to absorption with system equations: E[Ni\Fi] = \ + E[Ni_]\Fi]xPi^\Fi+E[Ni\F1]xPi.\Fi+E[NM\F1]xPjM\Fl.

To calculate ^,_,|^, let's rewrite the probability as P(xk+l=i-\\xk=i, F}), V∫= 0,1,..., to make the derivation step clearer: FKxk+\ -'-l\xk -hr\)- — — P(xk=i,Ft) = P(F\ I **+■= * -1, s* = 0 * P(xk+l =i-\\xk=i)x P(xk = i) P(Fi\xk=i)xP(xk=i) = ^ K+i =i-l)xP(xk+,=i-l\xk=i) P(Fx\xk=i) i -1 i(n - i) x n(n-\) _ (w-i)x(i-l) iln n{n-\) The first equation is simply the definition of conditional probability; the second equation is the application of Bayes' theorem; the third equation applies the Markov property. To derive P{FX \ xk = i) = i/n, we again need to use symmetry. We have shown that if all the balls have different colors, then we have P[F]] = P[F2] = ??? = P[Fn] = \ln. What is the probability of ending in a given color, labeled as c, if i of the balls are of color c ? It is simply iln. To see that, we can label the color of each of the i balls of color c as cj, j = l9-~J (even though they are in fact the same color). Now it's obvious that all balls will end with color c. with probability \l n. The probability for c is the sum of probabilities of c^'s, which gives the result iln. Similarly we have P(F] \xk+] =i-\) = (i-\)ln. For P(xk+]=i-l\xk=i), we use a basic counting method. There are n(n -1) possible permutations to choose 2 balls out of n balls. In order for one color 1 ball to change color, the second ball must be color 1, which has i choices; the first ball needs to be another color, which has (n-i) choices. SoP(xk+]=i-\\xk=i) =-^-. Applying the same principles, we can get . r^x (n-i)x2i _. . tl . _. (h-i)x(i + 1) P(xk+]=i\xk=i,F])=y / P(s,+1=i + l|s,=i,f;) = v / \ ;. Plugging into E[Ni \ Fr] and simplifying E[Ni \F}] as Z., we have (/i-0x2ixZ/=/i(fi-l) + (fi-0(i>l)Z/+I+(/i-i)(i-l)ZM.

Using these recursive equations with boundary condition Z_n = 0, we get `Z_1 = (n-1)^2`.

## 5.2 Martingale and Random Walk {#52}

Random walk: The process {Sn; n>\) is called a random walk if {X.\i>\} are IID (identical and independently distributed) random variables and Sn=Xx+~-Xn, where n = 1,2, ? ? ? The term comes from the fact that we can think of Sn as the position at time n for a walker who makes successive random steps Xx, X2, ? ? ? If X. takes values 1 and -1 with probabilities p and

- p respectively, Sn is called a simple random walk with parameter p. Furthermore, if p = j, the process Sn is a symmetric random walk. For symmetric random walk, it's easy to show that E[Sn] = 0 and var(Sn) = E[Sₙ²]-E[Snf =E[Sₙ²] = n

Symmetric random walk is the process that is most often tested in quantitative interviews. The interview questions on random walk often revolve around finding the first n for which Sn reaches a defined threshold or, or the probability that Sn reaches a for any given value of n. Martingale: a martingale {Zn\n>\} is a stochastic process with the properties that E[\ Z? |] < ∞ for all n and E[Zn+x | Z? = zn9Zn_x = zn_w~,Zx = zx] = zn. The property of a martingale can be extended to E[Zm;m>n\Zn=zn9Zn_l=zn_l9-~9Zl =zl] = zn, which means the conditional expected value of future Zm is the current value Zw.6 A symmetric random walk is a martingale. From the definition of the symmetric random {S +1 with probability 1/2 r . walk we have Sn+]=< , so E \Sn+] \S? =sn9---,S] =s, \ = s?. n+] [Sn-l with probability 1/2 L w+1' n n x lj n Since E[Sₙ²+x -{n +1)] = ±[(Sn +1)2 + (Sn -1)2] - (n +1) = Sₙ² - n, Sₙ² - n is a martingale as well. 4 Even this step is not straightforward. You need to plug in the /'s and try a few cases starting with i = n-\. The pattern will emerge and you can see that all the terms containing Zn_,, Zn2 ,~,Z2 cancel out. 5 Induction again can be used for its proof. Var(Sx) = Var(Zx) = 1. Induction step: If Var(Sn) = n, then we have Var(Snil) = Var(Sn + x_{n+1} ) = Var(Sn) + Var(xnkX) = n +1 since x_{n+1} is independent of Sn. 6 Do not confuse a martingale process with a Markov process. A martingale does not need to be a Markov process; a Markov process does not need to be a martingale process, either.

Stopping rule: For an experiment with a set of IID random variables X]9X29--

a stopping rule for {Xᵢ, i > 1} is a positive integer-value random variable TV (stopping time) such that for each n > 1, the event {N < n) is independent of Xn+], Xn+2, ? ? ?. Basically it says that whether to stop at n depends only on Xl9X29-~9Xn (i.e., no look ahead). Wald's Equality: Let TV be a stopping rule for IID random variables Xl9X29-~ and let SN = Xx + X2 + ?. ? + XN , then E[SN] = E[X]E[N]. Since it is an important—yet relatively little known—theorem, let's briefly review its proof. Let In be the indicator function of the event {N>n}. So SN can be written as `S_N = sum_n X_n*I_n`, where `I_n=1` if N>=n, `I_n=0` if N<n. From the definition of stopping rules, we know that ln is independent of Xn, Xn+]9 ??? (it only depends on X}9 X2, .-, Xn_x). So E[XJn] = E[Xn]E[ln] = E[X]E[l?] and E[SN] = E n=\Z^/J=Z^K/J=Z^WE[/J=^WZE[/J=^^]^^]-7 n=\ n-\ n-\ A martingale stopped at a stopping time is a martingale. Drunk man A drunk man is at the 17th meter of a 100-meter-long bridge. He has a 50% probability of staggering forward or backward one meter each step. What is the probability that he will make it to the end of the bridge (the 100th meter) before the beginning (the 0th meter)? What is the expected number of steps he takes to reach either the beginning or the end of the bridge?

> **Solution:**
> The probability part of the problem—often appearing in different disguises—is among the most popular
> martingale problems asked by quantitative interviewers. Interestingly, few people use a clear-cut
> martingale argument. Most candidates either use Markov chain with two absorbing states or treat it
> as a special version of the gambler's ruin problem with p = 1/2. These approaches yield the correct
> results in the end, yet a martingale argument is not only simpler but also illustrates the insight
> behind the problem. 7 For detailed proof and applications of Wald's Equality, please refer to the
> book Discrete Stochastic Processes by Robert G. Gallager.

Let's set the current position (the 17th meter) to 0; then the problem becomes a symmetric random walk that stops at either 83 or -17. We also know that both Sn and S2 - n are martingales. Since a martingale stopped at a stopping time is a martingale, SN and S2N-N (where SN=Xl+X2+-~ + XN with N being the stopping time) are martingales as well. Let pa be the probability that it stops at or = 83, pp be the probability it stops at -/? = -17 (Pp=l-pa), and N be the stopping time. Then we have E[sN] = PaxS3-(\-pa)xn = s0 = o if Pa = o.n E[Sl-N] = E[paxS32+(l-pJxl72]-E[N] = S20-0 = 0\^[E[N] = l44l Hence, the probability that he will make it to the end of the bridge (the 100th meter) before reaching the beginning is 0.17, and the expected number of steps he takes to reach either the beginning or the end of the bridge is 1441. We can easily extend the solution to a general case: a symmetric random walk starting from 0 that stops at either a (or > 0 ) or -/? (/? > 0). The probability that it stops at a instead of -/? is p_a = β/(a + β). The expected stopping time to reach either a or -J3 is E[N] = αβ. Dice game Suppose that you roll a dice. For each roll, you are paid the face value. If a roll gives 4, 5 or 6, you can roll the dice again. If you get 1, 2 or 3, the game stops. What is the expected payoff of this game?

> **Solution:**
> In Chapter 4, we used the law of total expectation to solve the problem. A simpler
> approach—requiring more knowledge—is to apply Wald's Equality since the problem has clear stopping
> rules. For each roll, the process has 1/2 probability of stopping. So the stopping time TV follows a
> geometric distribution with p = 1/2 and we have E[N] = l/ p = 2. For each roll, the expected face
> value is E[X] = 7/2. The total expected payoff is E[SN ] = E[X]E[N] = 112x2 = 1. Ticket line At a
> theater ticket office, 2n people are waiting to buy tickets, n of them have only $5 bills and the
> other n people have only $10 bills. The ticket seller has no change to start

with. If each person buys one $5 ticket, what is the probability that all people will be able to buy their tickets without having to change positions?

> **Solution:**
> This problem is often considered to be a difficult one. Although many can correctly formulate the
> problem, few can solve the problem using the reflection principle.8 This problem is one of the many
> cases where a broad knowledge makes a difference. Assign +1 to the n people with $5 bills and -1 to
> the n people with $10 bills. Consider the process as a walk. Let (a, b) represent that after a
> steps, the walk ends at b. So we start at (0,0) and reaches (2n,0) after In steps. For these 2n
> steps, we need to choose n steps as +1, so there are (2n\ 2n\ \n J n\n\ possible paths. We are
> interested in the paths that have the property 6>0, \/0<a<2n steps. It's easier to calculate the
> number of complement paths that reach b = -1, 30 < a < 2n. As shown in Figure 5.6, if we reflect the
> path across the line y = -l after a path first reaches -1, for every path that reaches (2a,0) at
> step 2?, we have one corresponding reflected path that reaches (2n,-2) at step 2n. For a path to
> reach (2n,-2), there are (n -1) steps of+ 1 and (n +1) steps of-1. So there are ( 2n ' n-\ 2n\ such
> paths. The number of paths that have the ( 2n\ (fi-l)!(w + l)! property b = -l, 30<a<2n, given that
> the path reaches (2h,0) is also number of paths that have the property b > 0, V0 < a < 2n is n-\ and
> the (2n\ n) n + \ (2n\ \" J

n + \ 2n\ \n J Hence, the probability that all people will be able to buy their tickets without having to change positions is 1/(^ + 1). K Consider a random walk starting at a, S0 = a, and reaching b in n steps: Sn = b. Denote Nn(a,b) as the number of possible paths from (0,a) to (n,b) and N{)n(a,b) as the number possible paths from (0,a) to (n,b) that at some step k ( k > 0, ), Sk =0; in other words, N^ia.b) are the paths that contain (∫,0),30 < k < n. The reflection principle says that if a, b > 0, then N]{a,b) = Nn(-a,b). The proof is intuitive: for each path (0,a) to (∫,0),there is a one-to-one corresponding path from (0,-a) to (∫,0).

bi Figure 5.6 Reflected paths: the dashed line is the reflection of the solid line after it reaches -1 Coin sequence Assume that you have a fair coin. What is the expected number of coin tosses to get n heads in a row?

> **Solution:**
> Let E[f(n)] be the expected number of coin tosses to get n heads in a row. In the Markov chain
> section, we discussed the case where n = 3 (to get the pattern HHH). For any integer n, we can
> consider an induction approach. Using the Markov chain approach, we can easy get that E[f(l)] = 2,
> E[f(2)] = 6 and E[f(3)] = 14. A natural guess for the general formula is that E[f(n)] = 2^(n+1) - 2. As
> always, let's prove the formula using induction. We have shown the formula is true for n = 1,2,3. So
> we only need to prove that if E[f(n)] = 2^(n+1) - 2, E[f(n + l)] = 2"+2 -2. The following diagram shows
> how to prove that the equation holds for E[f(n +1)]: P=1/2 CnjO ? ((n+ljj) The state before {n +1)
> heads in a row (denoted as (n + \)H) must be n heads in a row n+\ (denoted as nH ). It takes an
> expected E[f(n)] = 2^(n+1) - 2 tosses to reach nH. Conditioned on state nH, there is a 1/2 probability it
> will go to (n + l)H (the new toss yields H) and the process stops. There is also a 1/2 probability
> that it will go to the

starting state 0 (the new toss yields 7) and we need another expected E[f(n +1)] tosses to reach (n + \)H. So we have E[/(/i+ l)] = E[F(w)]+ lxl + lxE[/(/i+ l)] ⟹ E[f{n +1)] = 2 x E[F{n)] + 2 = 2^(n+2) - 2 General Martingale approach: Let's use HH -Hn to explain a general approach for the expected time to get any coin sequence by exploring the stopping times of martingales.9 Imagine a gambler has $1 to bet on a sequence of n heads {HH'???//? ) in a fair game with the following rule: Bets are placed on up to n consecutive games (tosses) and each time the gambler bets all his money (unless he goes bankrupt). For example, if H appears at the first game, he will have $2 and he will put all $2 into the second game. He stops playing either when he loses a game or when he wins n games in a roll, in which case he collects $2" (with probability 1/2"). Now let's imagine, instead of one gambler, before each toss a new gambler joins the game and bets on the same sequence of n heads with a bankroll of $1 as well. After the i-th game, i gamblers have participated in the game and the total amount of money they have put in the game should be $/. Since each game is fair, the expected value of their total bankroll is $i as well. In other words, if we denote jcf. as the amount of money all the participating gamblers have after the /-th game, then (xi -i) is a martingale. Now, let's add a stopping rule: the whole game will stop if one of the gamblers becomes the first to get n heads in a roll. A martingale stopped at a stopping time is a martingale. So we still have E[(x.-i)] = 0. If the sequence stops after the i-th toss (i>n), the (i-n +1)-th player is the (first) player who gets n heads in a roll with payoff 2n. So all the (i-n) players before him went bankrupt; the (i-? + 2)-th player gets (n-l) heads in a roll with payoff 2n~x; ...; the i-th player gets one head with payoff 2. So the total payoff is fixed and x_i = 2^n + 2^(n-1) + ... + 2 = 2^(n+1) - 2. Hence, E[(x;. - /)] = 2^(n+1) - 2 - E[i] = 0 ⟹ E[i] = 2^(n+1) - 2. This approach can be applied to any coin sequences—as well as dice sequences or any sequences with arbitrary number of elements. For example, let's consider the sequence HHTTHH. We can again use a stopped martingale process for sequence HHTTHH. The gamblers join the game one by one before each toss to bet on the same sequence HHTTHH until one gambler becomes the first to get the sequence HHTTHH. If the sequence stops after the /-th toss, the (i - 5)th gambler gets the HHTTHH with payoff 9 If you prefer more details about the approach, please refer to "A Martingale Approach to the Study of Occurrence of Sequence Patterns in Repeated Experiments" by Shuo-Yen Robert Li, The Annals of Probability, Vol. 8, No. 6 (Dec, 1980), pp. 1171 -1176.

26. All the (1-6) players before him went bankrupt; the (i-4)th player loses in the second toss (HT); the (i-3)th player and the {i-2)th player lose in the first toss (7); the (i - \)th player gets sequence HH with payoff 22 and the /-th player gets H with payoff 2. Hence, E[(*,. - /)] = 26 + 22 + 21 - E[i] = 0 ⟹ E[i] = 70.

## 5.3 Dynamic Programming {#53}

Dynamic Programming refers to a collection of general methods developed to solve sequential, or multi-stage, decision problems.10 It is an extremely versatile tool with applications in fields such as finance, supply chain management and airline scheduling. Although theoretically simple, mastering dynamic programming algorithms requires extensive mathematical prerequisites and rigorous logic. As a result, it is often perceived to be one of the most difficult graduate level courses. Fortunately, the dynamic programming problems you are likely to encounter in interviews—although you often may not recognize them as such—are rudimentary problems. So in this section we will focus on the basic logic used in dynamic programming and apply it to several interview problems. Hopefully the solutions to these examples will convey the gist and the power of dynamic programming. A discrete-time dynamic programming model includes two inherent components: 1. The underlying discrete-time dynamic system A dynamic programming problem can always be divided into stages with a decision required at each stage. Each stage has a number of states associated with it. The decision at one stage transforms the current state into a state in the next stage (at some stages and states, the decision may be trivial if there is only one choice). Assume that the problem has N + \ stages (time periods). Following the convention, we label these stages as 0,1, ???,A^-1, N. At any stage k, 0<k<N-l,the state transition can be expressed as xk+] = f(xk,uk9wk)9 where xk is the state of system at stage k;u uk is the decision selected at stage k; wk is a random parameter (also called disturbance). This section barely scratches the surface of dynamic programming. For up-to-date dynamic programming topics, I'd recommend the book Dynamic Programming and Optimal Control by Professor Dimitri P. Bertsekas. 1' In general, xk can incorporate all past relevant information. In our discussion, we only consider the present information by assuming Markov property.

Basically the state of next stage xk+x is determined as a function of the current state xk, current decision uk (the choice we make at stage k from the available options) and the random variable wk (the probability distribution of wk often depends on xk and uk). 2. A cost (or profit) function that is additive over time. Except for the last stage (TV), which has a cost/profit gN(xN) depending only on xN, the costs at all other stages gk(xk9uk9wk) can depend on xk, uk, and wk. So the total N-\ cost/profit is gN(xN) + Y,Sk(xk>uk> wk)} ■ The goal of optimization is to select strategies/policies for the decision sequences a* = {Uq*9-~9un_x*} that minimize expected cost (or maximize expected profit): N-\ JAXo) = minE{gN(XN) + T,8k(Xk>Uk>Wk)}' Dynamic programming (DP) algorithm The dynamic programming algorithm relies on an idea called the Principle of Optimality: If n* = {uQ*9--9uN ,*} is the optimal policy for the original dynamic programming problem, then the tail policy n.* = {u.*9-~9uN_x*} must be optimal for the N

tail subproblem E{gN{xN) + ∫gk(xk,uk, wk)}. k-i N

DP algorithm: To solve the basic problem Jx*(x0) = mmE{gN(xN) + y]gk(xk,uk,wk)}, A-0 start with JN(xN) = gN(xN\ and go backwards minimizing cost-to-go function Jk(xk): Jk(xk)= min E{gk(xk,uk,wk) + Jk+](f(xk,uk,wk))},k=0,---,N-l. Then the J0(x0) ukcUk(xk)wk generated from this algorithm is the expected optimal cost. Although the algorithm looks complicated, the intuition is straightforward- For dynamic programming problems, we should start with optimal policy for every possible state of the final stage (which has the highest amount of information and least amount of uncertainty) first and then work backward towards earlier stages by applying the tail policies and cost-to-go functions until you reach the initial stage. Now let's use several examples to show how the DP algorithm is applied.

Dice game You can roll a 6-side dice up to 3 times. After the first or the second roll, if you get a number x, you can decide either to get x dollars or to choose to continue rolling. But once you decide to continue, you forgo the number you just rolled. If you get to the third roll, you'll just get x dollars if the third number is x and the game stops. What is the game worth and what is your strategy?

> **Solution:**
> This is a simple dynamic programming strategy game. As all dynamic programming questions, the key is
> to start with the final stage and work backwards. For this question, it is the stage where you have
> forgone the first two rolls. It becomes a simple dice game with one roll. Face values 1, 2, 3, 4, 5,
> and 6 each have a 1/6 probability and your expected payoff is $3.5. Now let's go back one step.
> Imagine that you are at the point after the second roll, for which you can choose either to have a
> third roll with an expected payoff of $3.5 or keep the current face value. Surely you will keep the
> face value if it is larger than 3.5; in other words, when you get 4, 5 or 6, you stop rolling. When
> you get 1,2 or 3, you keep rolling. So your expected payoff before the second roll is 3/6x 3.5+ l/6x
> (4 + 5 + 6) = $4.25. Now let's go back one step further. Imagine that you are at the point after the
> first roll, for which you can choose either to have a second roll with expected payoff $4.25 (when
> face value is 1, 2, 3 or 4) or keep the current face value. Surely you will keep the face value if
> it is larger than 4.25; In other words, when you get 5 or 6, you stop rolling. So your expected
> payoff before the first roll is 4/6x 4.25 + l/6x(5 + 6) = $14/3. This backward approach—called tail
> policy in dynamic programming—gives us the strategy and also the expected value of the game at the
> initial stage, $14/3. World series The Boston Red Sox and the Colorado Rockies are playing in the
> World Series finals. In case you are not familiar with the World Series, there are a maximum of 7
> games and the first team that wins 4 games claims the championship. You have $100 dollars to place a
> double-or-nothing bet on the Red Sox. Unfortunately, you can only bet on each individual game, not
> the series as a whole. How much should you bet on each game so that if the Red Sox wins the whole
> series, you win exactly $100, and if Red Sox loses, you lose exactly $100? Let (/,/) represents the
> state that the Red Sox has won i games and the Rockies has wony games, and let f(i9j) be our net
> payoff, which can be negative when we lose money, at state (/,/). From the rules of the game, we
> know that there may be between 4 and 7 games in total. We need to decide on a strategy so that
> whenever the

series is over, our final net payoff is either +100—when Red Sox wins the championship—or -100—when Red Sox loses. In other words, the state space of the final stage includes {(4,0), (4,1), (4,2), (4,3)} with payoff /(/,./) = 100 and {(0,4), (1,4), (2,4), (3,4)} with payoff/(i,y) = -100. As all dynamic programming questions, the key is to start with the final stage and work backwards—even though in this case the number of stages is not fixed. For each state (/, j\ if we bet $y on the Red Sox for the next game, we will have (/(/, j) + y) if the Red Sox wins and the state goes to (i + l, j), or (f(i9j)-y) if the Red Sox loses and the state goes to (/, y + 1). So clearly we have /(i +1, j) = /(/, j) + y] f/Ci, j) = (/(/ +1, j) + /(i, j +1)) / 2 r^ ^ /(4,3)+ /(3, 4) 100-100 A f , For example, we have 7(3, 3) = J v ' J v = = 0. Let's set up a table with the columns representing i and the rows representing j. Now we have all the information to fill in 7(4, 0), 7(4,1), /(4, 3), /(4, 2), /(0, 4), /(l, 4), /(2, 4), /(3, 4), as well as 7(3,3). Similarly we can also fill in all f{ij) for the states where i=3 or y= 3 as shown in Figure 5.7. Going further backward, we can fill in the net payoffs at every possible state. Using equation y = (f(i + l, j)-f(i, y' + l))/2, we can also calculate the bet we need to place at each state, which is essentially our strategy. If you are not accustomed to the table format, Figure 5.8 redraws it as a binomial tree, a format you should be familiar with. If you consider that the boundary conditions are /(4,0), 7(4,1), 7(4,3), 7(4,2), 7(0,4), 7(1,4), 7(2,4), and 7(3,4), the underlying asset either increases by 1 or decrease by 1 after each step, and there is no interest, then the problem becomes a simple binomial tree problem and the bet we place each time is the delta in dynamic hedging. In fact, both European options and American options can be solved numerically using dynamic programming approaches.

Colorado Rockies wins

Red Sox

-100

-100

-100

V -100

-100 Colorado Rockies wins

Red Sox

-31.3 -62.5 -87.5 -100

31.25

-37.5 -75 -100

62.5 37.5

-50 -100

87.5

-100

>⟹ l⟹ a o 0* o J. U Figure 5.7 Payoffs and bets at different states wins Red Sox -87.9t--ZS -100 ￥ -100 -5CH-

-100 87.5+100 7^?|-1 * -100

l(H-ioo ■100 Colorado Rockies bets

Red Sox

31.2931.25 31.25

12.5 37.5 37.5

37.5

12.5

(4,3) Figure 5.8 Payoff at different states expressed in a binomial tree

Dynamic dice game A casino comes up with a fancy dice game. It allows you to roll a dice as many times as you want unless a 6 appears. After each roll, if 1 appears, you will win $1; if 2 appears, you will win $2; ...; if 5 appears, you win $5; but if 6 appears all the moneys you have won in the game is lost and the game stops. After each roll, if the dice number is 1-5, you can decide whether to keep the money or keep on rolling. How much are you willing to pay to play the game (if you are risk neutral)?12

> **Solution:**
> Assuming that we have accumulated n dollars, the decision to have another roll or not depends on the
> expected profit versus expected loss. If we decide to have an extra roll, our expected payoff will
> become -(n + l) + -(n + 2) + -(n + 3) + -(n + 4) + -(n + 5) + -x0 = -n + 2.5.

We have another roll if the expected payoff —n + 2.5> n, which means that we should

keep rolling if the money is no more than $14. Considering that we will stop rolling when n > 15, the maximum payoff of the game is $1, (the dice rolls a 5 after reaching the state n = \4). We then have the following: /(19) = 19, /(18) = 18, /(17) = 17, /(16) = 16, and /(15) = 15. When n<\4, we will keep on rolling, so E[f(n) | a <14] = —^ E[f(n + i)]. Using this equation, we can calculate the value for

/=! E[f(n)] recursively for all n = 14, 13, ???, 0. The results are summarized in Table 5.2. Since E[f(0)] = 6.15, we are willing to pay at most $6.15 for the game. n m?n n k/M

19.∞ 18.∞

10.52 9.91

17.∞

9.34

16.∞

8.80

15.∞ 14.17

8.2, 7.81

13.36 12.5, 
7.36 6.93

11.85 11.16

6.53 6.15 Table 5.2 Expected payoff of the game when the player has accumulated n dollars 12 Hint: If you decide to have another roll, the expected amount you have after the roll should be higher than the amount before the roll. As the number of dollars increases, you risk losing more money if a 6 appears. So when the amount of dollar reaches a certain number, you should stop rolling.

Dynamic card game A casino offers yet another card game with the standard 52 cards (26 red, 26 black). The cards are thoroughly shuffled and the dealer draws cards one by one. (Drawn cards are not returned to the deck.) You can ask the dealer to stop at any time you like. For each red card drawn, you win $1; for each black card drawn, you lose $1. What is the optimal stopping rule in terms of maximizing expected payoff and how much are you willing to pay for this game?

> **Solution:**
> It is another problem perceived to be difficult by many interviewees. Yet it is a simple dynamic
> programming problem. Let (6, r) represent the number of black and red cards left in the deck,
> respectively. By symmetry, we have red cards drawn - black cards drawn = black cards left - red
> cards left = b-r At each (6, r), we face the decision whether to stop or keep on playing. If we ask
> the dealer to stop at (6, r), the payoff is b-r. If we keep on going, there is b + r probability
> that the next card will be black—in which case the state changes to r {b -1, r) —and probability
> that the next card will be red—in which case the state b + r changes to (b, r-l). We will stop if
> and only if the expected payoff of drawing more cards is less than b-r. That also gives us the
> system equation: E[/(fc,r)] =max(Vr,^ As shown in Figure 5.9 (next page), using the boundary
> conditions /(0, r) = 0, f(b,0) = b, V6, r = 0, 1, ??-, 26, and the system equation for E[f(b, r)],
> we can recursively calculate E[f(b, r)] for all pairs of b and r. The expected payoff at the
> beginning of the game is is [/(26, 26)] = $2.62. 13 You probably have recognized this system
> equation as the one for American options. Essentially you decide whether you want to exercise the
> option at state (b, r).

f(b,r;

∫ d Cards Le <? *?-o Numbei

Number of Black Cards Left |

p p p p p p p b _J

0.50 0.33 0.25 0.20 0.17 0.14 0.13 0.11 0.10 0.0, 0.08 0.08 0.07 0.07 0.06 0.06 0.06 0.05 0.05 0.05 0.05 0.04 0.04 0.04 0.04 0.04 _2

0.67 0.50 0.40 0.33 0.2, 0.25 0.22 0.20 0.18 0.17 0.15 0.14 0.13 0.13 0.12 0.11 0.11 0.10 0.10 0.0, 0.0, 0.08 0.08 0.08 0.07 _3

1.20 0.85 0.66 0.54 0.45 0.3, 0.35 0.31 0.28 0.26 0.24 0.22 0.20 0.1, 0.18 0.17 0.16 0.15 0.14 0.14 0.13 0.13 0.12 0.12 0.11 _4

1.34 1.∞ 0.7, 0.66 0.56 0.4, 0.43 0.3, 0.35 0.32 0.30 0.28 0.26 0.24 0.23 0.22 0.20 0.1, 0.1, 0.18 0.17 0.16 0.16 0.15 _5

1.44 1.12 0.91 0.76 0.66 0.58 0.52 0.46 0.42 0.3, 0.36 0.33 0.31 0.2, 0.28 0.26 0.25 0.24 0.23 0.22 0.21 0.20 0.1, _6

2.07 1.55 1.23 1.01 0.86 0.75 0.66 0.5, 0.54 0.4, 0.45 0.42 0.3, 0.36 0.34 0.32 0.31 0.2, 0.28 0.26 0.25 0.24 0.23 _7

2.15 1.66 1.34 1.11 0.95 0.83 0.74 0.66 0.60 0.55 0.51 0.47 0.44 0.41 0.3, 0.37 0.35 0.33 0.32 0.30 0.2, 0.28 J

2.23 1.75 1.43 1.21 1.04 0.91 0.81 0.73 0.67 0.61 0.57 0.53 0.4, 0.46 0.43 0.41 0.3, 0.37 0.35 0.34 0.32 J

2.30 1.84 1.52 1.30 1.12 0.9, 0.8, 0.80 0.73 0.67 0.62 0.58 0.54 0.51 0.48 0.45 0.43 0.41 0.3, 0.37

2.36 1.92 1.61 1.38 1.20 1.06 0.95 0.86 0.7, 0.73 0.67 0.63 0.5, 0.55 0.52 0.4, 0.47 0.45 0.43 J1

3.05 2.43 2.∞ 1.6, 1.46 1.28 1.13 1.02 0.93 0.85 0.78 0.73 0.68 0.63 0.60 0.56 0.53 0.51 0.48

3.10 2.50 2.08 1.77 1.53 1.35 1.20 1.08 0.9, 0.90 0.84 0.78 0.72 0.68 0.64 0.60 0.57 0.54

3.15 2.57 2.15 1.84 1.60 1.42 1.27 1.15 1.04 0.96 0.8, 0.83 0.77 0.72 0.68 0.64 0.61

3.20 2.63 2.22 1.91 1.67 1.48 1.33 1.21 1.10 1.01 0.94 0.87 0.82 0.77 0.72 0.68

3.24 2.70 2.2, 1.98 1.74 1.55 1.3, 1.26 1.16 1.07 0.9, 0.92 0.86 0.81 0.76

3.28 2.75 2.36 2.05 1.81 1.61 1.45 1.32 1.21 1.12 1.04 0.97 0.90 0.85 _17

4.03 3.33 2.81 2.42 2.11 1.87 1.67 1.51 1.38 1.26 1.17 1.08 1.01 0.95

4.06 3.38 2.87 2.48 2.17 1.93 1.73 1.57 1.43 1.32 1.22 1.13 1.06

4.0, 3.43 2.93 2.54 2.24 1.9, 1.7, 1.62 1.48 1.37 1.26 1.18

4.13 3.48 2.9, 2.60 2.30 2.05 1.85 1.68 1.54 1.42 1.31 _21

4.16 3.53 3.04 2.66 2.35 2.11 1.90 1.73 1.5, 1.46

4.1, 3.57 3.0, 2.72 2.41 2.16 1.96 1.78 1.64

4.22 3.62 3.15 2.77 2.47 2.22 2.01 1.83

5.01 4.25 3.66 3.20 2.82 2.52 2.27 2.06

5.03

4.28 5.05 3.71 4.32 3.25 3.75 2.88 3.30 2.57 2.93 2.32 2.62 Figure 5.9 Expected payoffs at different states (b, r)

## 5.4 Brownian Motion and Stochastic Calculus {#54}

In this section, we briefly go over some problems for stochastic calculus, the counterpart of stochastic processes in continuous space. Since the basic definitions and theorems of Brownian motion and stochastic calculus are directly used as interview problems, we'll simply integrate them into the problems instead of starting with an overview of definitions and theorems. Brownian motion

### Problem A

**Define and enumerate some properties of a Brownian motion?1**

> **Solution:**
> This is the most basic Brownian motion question. Interestingly, part of the definition, such as W(0)
> = 0, and some properties are so obvious that we often fail to recite all the details. A continuous
> stochastic process W(t), t > 0, is a Brownian motion i> - W(0) = 0
> - Increments W(t_1)-W(0), W(t_2)-W(t_1),... are **independent**
> - Each increment: W(t_{i+1})-W(t_i) ~ N(0, t_{i+1}-t_i)
> important properties of Brownian motion are the following: continuous (no jumps); E[W(t)] = 0;
> E\W(tf^ = t\ W(t)~N(0,t); martingale property E[W(t + s)\W(t)] = W(t); co\(W(s),W(t)) = s, V0<s<t;
> and Markov property (in continuous space). There are two other important martingales related to
> Brownian motion that are valuable tools in many applications. ? Y(t) = W(tf -t is a martingale.
> where X is any constant and W{t) is a Brownian motion, is a martingale. (Exponential martingale). 1
> A Brownian motion is often denoted as Br Alternatively it is denoted as W(t) since it is a Wiener
> process. In this section, we use both notations interchangeably so that you get familiar with both.

We'll show a proof of the first martingale using Ito's lemma in the next section. A sketch for the exponential martingale is the following:2 `E[Z(t+s)] = Z(t)*exp{-(1/2)*lambda^2*s}*exp{(1/2)*lambda^2*s} = Z(t)` -- martingale confirmed.

### Problem B

**What is the correlation of a Brownian motion and its square?**

> **Solution:**
> The solution to this problem is surprisingly simple. At time t, Bt ~ N(0,t), by symmetry, E[Bt] = 0
> and E[B?] = 0. Applying the equation for covariance Cov(XJ) = E[XY]-E[X]E[Yl we have Cov(BnB?) =
> E[B?]-E[Bt]E[B?] = 0-0 = 0. So the correlation of a Brownian motion and its square is 0, too. C Let
> Bt be a Brownian motion. What is the probability that B} > 0 andi?2 < 0? A standard solution takes
> advantage of the fact that B} ~ N(0,1), and B2 - B] is independent of B]9 which is again a normal
> distribution: B2 - B} ~ N(0,1). If B} = x > 0, then for B2 < 0, we must have B2-B} <-x. P(B}
> >0,B2<O) = P(B]>0,B2-B] <-B}) ?*>>/2^ ^fhz *^2n = r r^2/w^^ * */2* 2x In L Jo

But do we really need the integration step? If we fully take advantage of the facts that B] and B2-B] are two IID N(0,1), the answer is no. Using conditional probability and independence, we can reformulate the equation as P(B} > 0,B2 < 0) = P(B} > 0)P(B2 -B}< 0)P(\ B2 - B, \>\ B, |) = 1/2x1/2x1/2 = 1/8 2 W(s) ~ N(0,s). So E[exp{AW0?)}]is the moment generating function of normal random variable N(0,s).

This approach is better demonstrated in Figure 5.10. When we have 2?,>0 and B2-Bx < -Z?,, which accounts for 1/8 of the density volume. (All 8 regions separated by x = 0, y - 0, y = x, and y = -x have the same density volume by symmetry.) 0.15 § 0.1 Q 0.05 Figure 5.10 Probability density graph of (B1f B2-B!) Stopping time/ first passage time

### Problem A

**What is the mean of the stopping time for a Brownian motion to reach either -1 or 1?**

> **Solution:**
> As we have discussed, B] -Ms martingale. It can be proved by applying Ito's lemma: d(B_t^2-t) = 2*B_t*dB_t + dt - dt = 2*B_t*dB_t   (no drift → martingale). Let T = mm{t; Bt =1 or -1}. At continuous time and space, the following property still applies: A martingale stopped at

a stopping time is a martingale! So B\ -T is a martingale and e\bI -7j = B% -0 = 0. The probability that 5, hits 1 or -1 is 1, so B2T = 1 ⟹ E[T] = #[#*] = 1. 5. Let W(/) be a standard Wiener process and tx {x > 0) be the first passage time to level x (tx =min{/; W(t) = x}). What is the probability density function of rx and the expected value of rx ?

> **Solution:**
> This is a textbook problem that is elegantly solved using the reflection principle, so we will
> simply summarize the explanation. For any Wiener process paths that reach x before t ( rx < t), they
> have equal probability ending above x or below x at time /, P{rx<t,W{t)>x) = P{rx<t,W{t)<x). The
> explanation lies in the reflection principle. As shown in Figure 5.11, for each path that reaches x
> before t and is at a level y above x at time t, we can switch the sign of any move starting from rx
> and the reflected path will end at 2x - y that is below x at time t. For a standard Wiener process
> (Brownian motion), both paths have equal probability. P(tx <t) = P(tx < t, W(t) >x) + P(tx < u Wit)
> < x) = 2P(tx < t, W(t) > x) = 2P(W(t) >x) = 2 f-^e-^/2tdw Jx √(2πt) Let v = —=■, we have e =e and dv
> = —^. y/t ylt :. P(t <0 = 2T-^e-w2/2V>v = 2rr-7l=e-v2/2Jv = 2-2yV(x/V/).3 Take the derivative with
> respect to /, we have T* dt d(x/yTt) dt

ty[2rt From part A, it's easy to show that the expected stopping time to reach either a (a>0) or -/? (/?>0) is again E[N] = αβ. The expected first passage time to level x is 3 If we define M(t) = max W(s), then P(z < t) if and only if M(t) > x. Taking the derivative of P(rx < t) 0<s<t with respect to x, we can derive the probability density function of M(t).

essentially the expected stopping time to reach either x or -∞ and ∫'[rjc] = xxoo = ∞. Although we have P{rx < ∞) = 2 - 2N(x/yf^) = 1, the expected value of rx is ∞! W(t){ Figure 5.11 Sample path of a standard Wiener process and its reflected path

### Problem C

**Suppose that A'is a Brownian motion with no drift, i.e. dX{t) = dW{t). IfX starts at 0,**

what is the probability that X hits 3 before hitting -5? What if X has drift m, i.e. dX(t) = mdt + dW(t)l

> **Solution:**
> A Brownian motion is a martingale. Let p3 be the probability that the Brownian motion hits 3 before
> -5. Since a martingale stopped at a stopping time is a martingale, we have 3P3 +(-5)(l-P3) = 0
> ⟹P3=5/S. Similar to random walk, if we have stopping boundaries (a>0) and -/? (/?>0), the
> probability that it stops at a instead of -J3 is pa = J31{a + /?). The expected stopping time to
> reach either a or -/? is again E[N] = aβ. When X has drift aw, the process is no longer a
> martingale. Let P(t, x) be the probability that the process hits 3 before hitting -5 when X = x at
> time t. Although X is no longer a

martingale process, it is still a Markov process. So P{t,x) = P{x) is actually independent oft. Applying the Feynman-Kac equation4, we have mPx{x) + (1/2)P_{xx}(x) = 0 for -5<x<3. We also have boundary conditions that P(3) = 1 and P{-5) = 0. mPx(x) +1 /2Pxx(x) = 0 is a homogeneous linear differential equation with two real roots: r, = 0 and r2 = -2m. So the general solution is P(x) = c}e0x + c2e~2mx = c, + c2e~2mx . Applying the boundary conditions, we have \cl+c2e^=0 \c2=l/(e-6m-e^) W '

eWm-e*m A different and simpler approach takes advantage of the exponential martingale: Z(t) = exp{lambda*W(t) - (1/2)*lambda^2*t}. Since W(t) = X(t)-mt, X(t)-mt is a Brownian motion as well. Applying the exponential martingale, we have E[exp(A(^-m/)-^A2/)] = l for any constant L To remove the terms including time t, we can set A = -2m and the equation becomes is [exp(-2m.Ar)] = 1. Since a martingale stopped at a stopping time is e]0m -1 a martingale, we have P3 exp(-2w x 3) + (1 - P3) exp(-2w x -5) = 1: 10m -6m e —e

### Problem D

**Suppose that X is a generalized Wiener process dX = dt + dW(t), where W(t)**

is a Brownian motion. What is the probability that X ever reaches -1?

> **Solution:**
> To solve this problem, we again can use the equation E[exp(-2AwX)] = 1 from the previous problem
> with m-\. It may not be obvious since we only have one apparent boundary, -1. To apply the stopping
> time, we also need a corresponding positive boundary. To address this problem, we can simply use +∞
> as the positive boundary and the equation becomes 4 Let A'be an Ito process given by equation dX(t)
> = fi(t, X)dt + y(t, X)dW and f(x) be a function of X. Define function V(t,x) = E[f(Xr) \ Xt = x],
> then K(/,x) is a martingale process that satisfies the partial dV dV

, d2V differential equation + /?(/,*) -\- — y(t,x) = 0 and terminal condition V(T,x) = f(x) for all dt dS

dS2 x.

`P_{-1}*e^2 + (1-P_{-1})*0 = 1  ⟹  P_{-1} = e^(-2)` Ito's lemma Ito's lemma is the stochastic counterpart of the chain rule in ordinary calculus. Let X(t) be an Ito process satisfying dX{t)= p(t,X)dt + y{t,X)dW(t), and f(X(t),t) be a twice-differentiable function of X(t) and /. Then f(X(t),t) is an Ito process satisfying ```
Ito's Lemma: for dX = mu*dt + sigma*dW(t), f(X,t):
df = [df/dt + mu*df/dX + (1/2)*sigma^2*d^2f/dX^2]*dt + sigma*(df/dX)*dW(t)
```

### Problem A

**Let Bt be a Brownian motion and Z,**

. What is the mean and variance of Z, ? Is Z, a martingale process?

> **Solution:**
> B_t ~ N(0,t). Z_t = sqrt(t)*B_t is symmetric about 0, mean = 0, variance = `t*Var(B_t) = t^2`. More exactly, Z, - N(0, f2). Although Z, has unconditional expected value 0, it is not a martingale. Applying Ito's lemma to Z = sqrt(t)*B_t:
```
dZ = sqrt(t)*dB_t + (1/(2*sqrt(t)))*B_t*dt
```
The drift term is non-zero (for B_t ≠ 0), so Z_t is **not** a martingale.

For all the cases that B(*0, which has probability 1, the drift term jt~U2Btdt is not zero.5 Hence, the process Z, = 4tBt is not a martingale process.

### Problem B

**Let ^(7) be a Brownian motion. Is W{if a martingale process?**

5 A generalized Wiener process dx = a(x,t)dt + b(x,t)dW(t) is a martingale process if and only if the drift term has coefficient a(x,t) = 0.

> **Solution:**
> Applying Ito's lemma to f(W,t) = W^3:
> ```
> df/dW = 3W^2, d^2f/dW^2 = 6W, df/dt = 0
> df = 3W^2*dW + (1/2)*6W*dt = 3*W(t)^2*dW(t) + 3*W(t)*dt
> ```
> Drift term 3*W(t)*dt ≠ 0, so W(t)^3 is **not** a martingale. So again for the cases W{t) * 0, which has probability 1, the drift term is not zero. Hence, W{tf is not a martingale process.
