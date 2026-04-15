import type { Chapter } from '@/lib/types';

/** Auto-generated from chapter_04_probability_theory.md — edit the .md then re-run scripts/gen-chapters.js */
const chapter4: Chapter = {
  id: 'chapter-4',
  number: 4,
  title: "Probability Theory",
  pageRange: "59–103",
  overview: "Probability is the single most tested quantitative topic in finance interviews. This chapter moves from set theory and combinatorics through conditional probability and Bayes' rule into discrete/continuous distributions, moments, and order statistics.",
  tags: ["probability","combinatorics","bayes","distributions","expectation","variance"],
  sections: [
    {
      id: "4.1",
      title: "Basic Probability Definitions and Set Operations",
      problemCount: 4,
      content: `## 4.1 Basic Probability Definitions and Set Operations

### Definitions and Notation

| Term | Definition |
|------|-----------|
| **Outcome** ω | The result of a single experiment or trial |
| **Sample space** Ω | The set of all possible outcomes |
| **P(ω)** | Probability of outcome ω; \`P(ω) > 0\` for all \`ω ∈ Ω\`, and \`Σ P(ω) = 1\` |
| **Event A** | A set of outcomes; a subset of Ω |
| **P(A)** | Probability of event A: \`P(A) = Σ P(ω)\` for \`ω ∈ A\` |
| **A ∪ B** | Union: outcomes in A or B (or both) |
| **A ∩ B** (or AB) | Intersection: outcomes in both A and B |
| **Aᶜ** | Complement: the event "not A" |
| **Mutually exclusive** | \`A ∩ B = ∅\`; then \`P(A ∪ B) = P(A) + P(B)\` |
| **Random variable** | A function mapping each outcome ω to a real number |
| **Indicator variable** | \`I_A = 1\` if A occurs, \`0\` otherwise; \`E[I_A] = P(A)\` |

**Example (six-sided die):** Sample space Ω = {1,2,3,4,5,6}. Let A = {1,3,5} (odd), B = {4,5,6} (>3). Then P(A) = 1/2, A ∪ B = {1,3,4,5,6}, A ∩ B = {5}.

---

### Problems

**Coin Toss Game**

**Question:** Gambler A has (n+1) fair coins; B has n fair coins. What is the probability that A has more heads if both flip all their coins?

**Solution:** Remove one coin from A so both have n coins. There are three equally likely-pair outcomes:
- E₁: A's n coins have more heads than B's
- E₂: A's n coins tie with B's
- E₃: A's n coins have fewer heads than B's

By symmetry: P(E₁) = P(E₃) = x, P(E₂) = y, so 2x + y = 1.

When we restore A's extra coin:
- In E₁: A has more heads regardless of the extra coin
- In E₃: A does not catch up regardless
- In E₂: If the extra coin is heads (prob 1/2), A wins. This adds 0.5y to A's probability.

**P(A has more heads) = x + 0.5y = x + 0.5(1−2x) = 0.5**

---

**Card Game**

**Question:** In a 52-card deck, you pick one card and the dealer picks another (without replacement). You win if your card has a larger number. What is your probability of winning?

**Solution (Symmetry approach):** Define events:
- E₁: Your card > Dealer's card (you win)
- E₂: Equal values
- E₃: Your card < Dealer's card

By symmetry, P(E₁) = P(E₃). Among the 51 remaining cards after your pick, exactly 3 share your value. So P(E₂) = 3/51.

\`\`\`
P(E₁) = (1 − P(E₂))/2 = (1 − 3/51)/2 = (48/51)/2 = 8/17
\`\`\`

**Verification (direct):** With card value v ∈ {2,...,A}, P(win | value v) = 4(v−2)/51. Summing:
\`\`\`
P(win) = (1/13) × (4/51) × (0+1+2+...+12) = (4/51) × 78/13 = 312/663 = 8/17 ✓
\`\`\`

---

**Drunk Passenger**

**Question:** 100 passengers board a plane with assigned seats 1–100. The first passenger is drunk and picks a random seat. Each subsequent sober passenger takes their own seat if available, or picks randomly otherwise. What is the probability that passenger 100 gets seat #100?

**Solution:** Focus only on seats #1 and #100. At every decision point (including every "redirected" passenger), both of these seats are equally likely to be chosen next before the other. By symmetry, exactly one of them is eventually occupied before the other — each with probability 1/2.

- If seat #1 is filled before #100: all subsequent passengers (including #100) get their correct seats ✓
- If seat #100 is filled first: passenger 100 cannot get their seat ✗

**P(passenger 100 gets seat #100) = 1/2**

---

**N Points on a Circle**

**Question:** N points are drawn randomly on a circle. What is the probability that all N points lie within some semicircle?

**Solution:** Label the points 1 through N clockwise. For each point i, define event Eᵢ = "all other N−1 points lie within the clockwise semicircle starting at point i." Each Eᵢ has probability 1/2^(N−1).

**Claim: E₁, E₂, ..., Eₙ are mutually exclusive.** If all points fit within a semicircle starting at i, then the arc from i−1 back to i (going clockwise) is at least a semicircle. No other starting point can collect all N points in its clockwise semicircle.

Since the Eᵢ are mutually exclusive and exhaustive for the event of interest:
\`\`\`
P(all N points in some semicircle) = N × (1/2^(N-1)) = N/2^(N-1)
\`\`\`

> **Generalization:** If the arc ratio to circumference is x < 1/2, the probability all N points fit is N × x^(N−1).

---`,
    },
    {
      id: "4.2",
      title: "Combinatorial Analysis",
      problemCount: 8,
      content: `## 4.2 Combinatorial Analysis

### Core Counting Principles

**Basic principle:** If a sequence of length k has n₁ choices for the 1st entry, n₂ for the 2nd, ..., nₖ for the k-th, the total number of sequences is n₁ × n₂ × ... × nₖ.

**Permutation** (order matters): The number of permutations of n objects where n₁ are alike, n₂ are alike, ..., nᵣ are alike is:
\`\`\`
n! / (n₁! × n₂! × ... × nᵣ!)
\`\`\`

**Combination** (order doesn't matter): The number of ways to choose r objects from n distinct objects is:
\`\`\`
C(n,r) = (n choose r) = n! / ((n−r)! × r!)
\`\`\`

**Binomial theorem:**
\`\`\`
(x + y)ⁿ = Σₖ₌₀ⁿ C(n,k) × xᵏ × y^(n-k)
\`\`\`

**Inclusion-Exclusion Principle:**
\`\`\`
P(E₁ ∪ E₂) = P(E₁) + P(E₂) − P(E₁E₂)

P(E₁ ∪ E₂ ∪ E₃) = Σ P(Eᵢ) − Σ P(EᵢEⱼ) + P(E₁E₂E₃)

P(E₁ ∪ ... ∪ Eₙ) = Σᵢ P(Eᵢ) − Σᵢ<ⱼ P(EᵢEⱼ) + ... + (−1)^(N+1) P(E₁E₂⋯Eₙ)
\`\`\`

---

### Problems

**Poker Hands**

**Question:** In a 52-card deck (13 values × 4 suits), what are the probabilities of four-of-a-kind, full house, and two pairs?

**Solution:**

Total 5-card hands = C(52,5) = **2,598,960**

| Hand | Counting | Count |
|------|---------|-------|
| Four-of-a-kind | 13 values × 48 remaining cards | **624** |
| Full house | 13 × C(4,3) × 12 × C(4,2) = 13×4×12×6 | **3,744** |
| Two pairs | C(13,2) × C(4,2) × C(4,2) × 44 = 78×6×6×44 | **123,552** |

> For two pairs: C(13,2)=78 ways to choose two values, C(4,2)=6 suits each pair, then 44 remaining cards for the 5th (52 − 4×2 = 44, cannot repeat either pair's value).

---

**Hopping Rabbit**

**Question:** A rabbit at the bottom of a staircase with n stairs can hop 1 or 2 stairs at a time. How many ways can it reach the top?

**Solution (induction):**
- f(1) = 1, f(2) = 2
- For n > 2: the last hop is either 1-stair (from stair n−1) or 2-stair (from stair n−2)

\`\`\`
f(n) = f(n−1) + f(n−2)    (Fibonacci recurrence)
\`\`\`

This generates the Fibonacci sequence: 1, 2, 3, 5, 8, 13, ...

---

**Screwy Pirates 2**

**Question:** 11 pirates put treasure in a safe. Any majority (≥ 6) can open it. What is the minimum number of locks needed? How many keys does each pirate carry?

**Solution:** For any group of 5 pirates, there must exist a lock that none of them can open. That lock's key is held only by the other 6. Each unique 5-pirate subset needs its own "exclusive" lock.

\`\`\`
Number of locks = C(11,5) = 11!/(5!6!) = 462
\`\`\`

Each lock has exactly 6 keys (one per pirate in the complementary 6-member group). Each pirate is in C(10,5) = 252 different 6-member subgroups, so:

\`\`\`
Keys per pirate = C(10,5) = 252
\`\`\`

---

**Chess Tournament**

**Question:** A knockout tournament has 2ⁿ players with skills 1 > 2 > ... > 2ⁿ (better skill always wins). What is the probability that players 1 and 2 meet in the final?

**Solution (counting):** Player 1 always wins and reaches the final. The 2ⁿ players are split into two 2^(n−1)-player subgroups. For players 1 and 2 to meet in the final, player 2 must be in the **other** subgroup from player 1. Among the 2ⁿ − 1 other players competing for the second subgroup slot, exactly 2^(n−1) slots are "other":

\`\`\`
P(1 and 2 meet in final) = 2^(n-1) / (2^n - 1)
\`\`\`

**Verification (conditional probability):** At each round k (k = 1,...,n−1), given players 1 and 2 haven't met yet, the conditional probability they don't meet in round k is 2(2^(n−k)−1)/(2^(n−k+1)−1). The product telescopes to give the same result.

---

**Application Letters (Derangement)**

**Question:** 5 personalized letters are randomly stuffed into 5 envelopes. What is the probability all letters go to the wrong firm?

**Solution (Inclusion-Exclusion):** Let Eᵢ = event that letter i is in the correct envelope.

Using the inclusion-exclusion principle: \`P(∪Eᵢ) = Σ(−1)^(k+1)/k!\` for k = 1 to 5.

Since \`Σ P(Eᵢ₁...Eᵢₖ) = 1/k!\` (there are C(5,k) terms each of probability k!/5! × (5−k)!/1 = 1/P(5,k)):

\`\`\`
P(∪Eᵢ) = 1 − 1/2! + 1/3! − 1/4! + 1/5!
        = 1 − 1/2 + 1/6 − 1/24 + 1/120
        = 76/120 = 19/30
\`\`\`

\`\`\`
P(all wrong) = 1 − 19/30 = 11/30 ≈ 0.367
\`\`\`

> **General formula (derangement):** P(all wrong for n letters) = Σₖ₌₀ⁿ (−1)ᵏ/k! → e⁻¹ ≈ 0.368 as n → ∞.

---

**Birthday Problem**

**Question:** How many people are needed in a room so that the probability two people share a birthday exceeds 1/2? (Assume 365 days/year.)

**Solution:** For n people, the probability of no shared birthdays is:
\`\`\`
P(no match) = 365/365 × 364/365 × 363/365 × ... × (365−n+1)/365
\`\`\`

We need P(no match) < 1/2. The smallest such n is **23**, giving P(at least one match) ≈ 0.507.

---

**100th Digit of (1 + √2)³⁰⁰⁰**

**Question:** What is the 100th digit to the right of the decimal point in the decimal representation of (1 + √2)³⁰⁰⁰?

**Solution:** By the binomial theorem:
\`\`\`
(1+√2)ⁿ + (1−√2)ⁿ = 2 × Σ C(n,k)(√2)ᵏ   [summing only even k]
\`\`\`

This is always an integer for any positive integer n. Since |1−√2| = √2−1 ≈ 0.414 < 1 and n = 3000:
\`\`\`
0 < (1−√2)³⁰⁰⁰ = (√2−1)³⁰⁰⁰ < 10⁻¹⁰⁰
\`\`\`

Let N = (1+√2)³⁰⁰⁰ + (1−√2)³⁰⁰⁰ (an integer). Then:
\`\`\`
N − 10⁻¹⁰⁰ < (1+√2)³⁰⁰⁰ < N
\`\`\`

So (1+√2)³⁰⁰⁰ = N − ε for some 0 < ε < 10⁻¹⁰⁰. In decimal, this is (N−1).999...9 where the 9s extend well past 100 places.

**The 100th digit is 9.**

---

**Cubic of Integer**

**Question:** x is an integer between 1 and 10¹². What is the probability that the cube of x ends in "11" (i.e., last two digits are 11)?

**Solution:** Write x = a + 10b where a is the last digit. By the binomial theorem:
\`\`\`
x³ = (a+10b)³ = a³ + 30a²b + 300ab² + 1000b³
\`\`\`

The **last digit** of x³ equals the last digit of a³. For a last digit of 1, only a = 1 works (1³ = 1 ✓).

With a = 1: the **tens digit** of x³ comes from 30a²b = 30b. For the tens digit to be 1, we need the tens digit of 30b to be 1, which requires the last digit of b to be 7 (since 30×7 = 210, giving tens digit 1).

Therefore, the last two digits of x must be **71**, which occurs with probability **1/100 = 1%**.

---`,
    },
    {
      id: "4.3",
      title: "Conditional Probability and Bayes' Formula",
      problemCount: 14,
      content: `## 4.3 Conditional Probability and Bayes' Formula

### Core Formulas

**Conditional probability:** If P(B) > 0:
\`\`\`
P(A | B) = P(A ∩ B) / P(B)
\`\`\`

**Multiplication rule:**
\`\`\`
P(E₁E₂...Eₙ) = P(E₁) × P(E₂|E₁) × P(E₃|E₁E₂) × ... × P(Eₙ|E₁...Eₙ₋₁)
\`\`\`

**Law of total probability:** For mutually exclusive, exhaustive events {Fᵢ}:
\`\`\`
P(E) = Σᵢ P(E|Fᵢ) P(Fᵢ)
\`\`\`

**Independent events:** \`P(EF) = P(E)P(F)\` ⟹ \`P(E|F) = P(E)\` and \`P(EFᶜ) = P(E)P(Fᶜ)\`.
Independence is symmetric: X independent of Y ⟺ Y independent of X.

**Bayes' formula:** For mutually exclusive, exhaustive events {Fᵢ}:
\`\`\`
P(Fⱼ | E) = P(E|Fⱼ)P(Fⱼ) / Σᵢ P(E|Fᵢ)P(Fᵢ)
\`\`\`

---

### Problems

**Boys and Girls**

**Part A:** A company holds a dinner for working mothers with at least one son. Ms. Jackson (two children) is invited. What is the probability both children are boys?

**Solution:** The sample space for two children is {(b,b), (b,g), (g,b), (g,g)}, each with equal probability. Conditioning on at least one boy (eliminates (g,g)):

\`\`\`
P(both boys | at least one boy) = P({b,b}) / P(at least one boy) = (1/4) / (3/4) = 1/3
\`\`\`

**Part B:** You see your colleague Ms. Parker walking with one of her two children, who is a boy. What is the probability both children are boys?

**Solution:** The other child is equally likely to be a boy or girl (independent of the one you see):

\`\`\`
P(both boys | this specific child is a boy) = 1/2
\`\`\`

> **Key distinction:** Part A asks "given at least one is a boy" (knowledge about the pair). Part B asks "given one specific child is a boy" (knowledge about an individual). The answers differ because the conditioning events are different.

---

**All-Girl World?**

**Question:** In a society, each couple has children until they get a girl, then stops. With a 50% chance of each child being a girl, what happens to the fraction of girls?

**Solution:** Many incorrectly think girls will dominate. The fraction of girls stays at **50%**. Nature assigns gender with probability 1/2 regardless of parental preferences. Every child — regardless of birth order or family history — has equal probability of being a boy or girl. Preference does not change biology.

---

**Unfair Coin**

**Question:** Among 1000 coins, one has heads on both sides. You randomly pick a coin and flip it 10 times — all heads. What is the probability you picked the unfair coin?

**Solution (Bayes' theorem):** Let A = "picked unfair coin", B = "10 heads in 10 tosses".

\`\`\`
P(A) = 1/1000,   P(Aᶜ) = 999/1000
P(B|A) = 1,       P(B|Aᶜ) = (1/2)¹⁰ = 1/1024
\`\`\`

\`\`\`
P(A|B) = P(B|A)P(A) / [P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)]

       = (1 × 1/1000) / (1/1000 × 1 + 1/1024 × 999/1000)

       = 1024/1000 / (1024/1000 + 999/1000)

       = 1024/2023 ≈ 0.506
\`\`\`

---

**Fair Probability from an Unfair Coin**

**Question:** Given a coin biased toward heads (probability pₕ) or tails (probability pₜ = 1−pₕ) at unknown bias, can you generate even odds?

**Solution:** Two independent tosses give four outcomes:
\`\`\`
P(HH) = pₕ²,   P(HT) = pₕpₜ,   P(TH) = pₜpₕ,   P(TT) = pₜ²
\`\`\`

Crucially, **P(HT) = P(TH) = pₕpₜ** regardless of the bias. Assign HT = win, TH = loss, re-toss on HH or TT. This produces perfectly even odds.

---

**Dart Game**

**Question:** Jason throws n darts and each subsequent throw is farther than the first. If he throws one more dart, what is the probability it is also farther from the center than his first throw?

**Solution:** The original problem (3 darts): enumerating all 6 equally likely rankings and conditioning on dart 2 being worse than dart 1 leaves outcomes 1, 3, 5. In 2 of 3 cases, dart 3 is also worse than dart 1. **P = 2/3.**

**General version (n+1 darts):** The question is equivalent to: what is the probability that the (n+1)th throw is **not** the best of all n+1 throws? Since the 1st throw is the best of the first n, and An+1 (the (n+1)th throw is best of all) is independent of the order of the first n throws (by symmetry, each throw is equally likely to be the best):

\`\`\`
P((n+1)th throw is not best) = 1 − 1/(n+1) = n/(n+1)
\`\`\`

For the original problem: P = 2/3. ✓

---

**Birthday Line**

**Question:** A manager gives a free ticket to the first person in line whose birthday matches someone who already bought a ticket. You choose your position. All birthdays are uniformly random over 365 days. What position maximizes your chance?

**Solution:** If you are in position n, the probability you win is:

\`\`\`
P(n) = [365×364×...×(365−n+2) / 365^(n-1)] × (n−1)/365
\`\`\`

(The first n−1 people must all have distinct birthdays, and yours must match one of theirs.)

To find the optimal n, find where P(n) > P(n−1) and P(n) > P(n+1):

**P(n) > P(n−1):**
\`\`\`
(367−n)(n−1) > 365(n−2)    →    n² − 3n − 363 < 0    →    n ≤ 20
\`\`\`

**P(n) > P(n+1):**
\`\`\`
(366−n)·n < 365(n−1)    →    n² − n − 365 > 0    →    n ≥ 20
\`\`\`

Both conditions are satisfied only at **n = 20**.

**You should be 20th in line.**

---

**Dice Order**

**Question:** Three dice are rolled in sequence. What is the probability the results are strictly increasing?

**Solution:**
\`\`\`
P(all different) = 1 × (5/6) × (4/6) = 20/36 = 5/9

P(strictly increasing | all different) = 1/3! = 1/6    (one of 6 equally likely orderings)

P = (5/9) × (1/6) = 5/54
\`\`\`

---

**Monty Hall Problem**

**Question:** Three doors: one hides a car, two hide goats. You pick a door; Monty opens one of the other two (always revealing a goat). Should you switch?

**Solution:**

- **Without switching:** P(win) = 1/3 (unchanged by Monty's action).
- **Switching:** You win if and only if you originally picked a goat (P = 2/3). Monty eliminates the other goat, so the remaining door must have the car.

\`\`\`
P(win by switching) = 2/3
\`\`\`

Equivalently: switching wins iff your first pick was wrong. You picked wrong with probability 2/3.

---

**Amoeba Population**

**Question:** One amoeba can die, stay, split into 2, or split into 3 — each with probability 1/4. All offspring behave the same way independently. What is the probability the population eventually dies out?

**Solution:** Let P(E) be the probability of eventual extinction. Conditioning on the first minute:
\`\`\`
P(E) = (1/4)×1 + (1/4)×P(E) + (1/4)×P(E)² + (1/4)×P(E)³
\`\`\`

Multiplying by 4: \`P(E)³ + P(E)² − 3P(E) + 1 = 0\`

Factoring out the root P = 1: \`(P−1)(P² + 2P − 1) = 0\`

The quadratic gives \`P = −1 ± √2\`. The only root in (0,1) is:

\`\`\`
P(E) = √2 − 1 ≈ 0.414
\`\`\`

---

**Candies in a Jar**

**Question:** A jar contains 10 red, 20 blue, and 30 green candies. Candies are removed one at a time at random. What is the probability that when all red candies are removed, at least 1 blue and 1 green remain?

**Solution:** Let Tr, Tb, Tg be the positions of the last red, blue, and green candies. We need P(Tr < Tb and Tr < Tg).

The two mutually exclusive favorable cases are Tr < Tb < Tg and Tr < Tg < Tb.

**Case 1 (Tr < Tb < Tg):** The last candy is green (Tg = 60). P(last is green) = 30/60. Among 30 red+blue candies, P(last red before last blue) = 20/30.

\`\`\`
P(Tr < Tb < Tg) = (30/60) × (20/30) = 1/3
\`\`\`

**Case 2 (Tr < Tg < Tb):** The last candy is blue (Tb = 60). P(last is blue) = 20/60. Among 40 red+green candies, P(last red before last green) = 30/40.

\`\`\`
P(Tr < Tg < Tb) = (20/60) × (30/40) = 1/4
\`\`\`

\`\`\`
P(Tr < Tb and Tr < Tg) = 1/3 + 1/4 = 7/12
\`\`\`

---

**Coin Toss Game (HT)**

**Question:** Players A and B alternate flipping a fair coin (A goes first). When an HT subsequence appears, the player who tossed the T wins. What is P(A wins)?

**Solution:** Let P(A) be A's winning probability.

Condition on A's first toss:
- P(A) = (1/2)P(A|T) + (1/2)P(A|H)

**If A tosses T:** B now needs to generate an HT sequence first — B is effectively the "first mover." So P(A|T) = P(B) = 1 − P(A).

**If A tosses H:** Further condition on B's toss:
- B tosses T (prob 1/2): A loses (HT complete, B wins) → contributes 0
- B tosses H (prob 1/2): B now holds the H, and A's position is like "after B threw the first H" — A has prob (1 − P(A|H)) of winning.

\`\`\`
P(A|H) = (1/2)×0 + (1/2)×(1 − P(A|H))    →    P(A|H) = 1/3
\`\`\`

Combining:
\`\`\`
P(A) = (1/2)(1/3) + (1/2)(1 − P(A))
P(A) = 1/6 + 1/2 − P(A)/2
3P(A)/2 = 2/3    →    P(A) = 4/9
\`\`\`

> **Sanity check:** P(A) < 1/2 makes sense — A cannot win on the first toss, but B has a 1/4 probability of winning on B's first toss.

---

**Russian Roulette**

**Part 1 — No respinning:**

Two players alternate pulling the trigger (single bullet, 6-chamber revolver, barrel spun once at the start). First player loses iff the bullet is in chamber 1, 3, or 5. **P(first player loses) = 3/6 = 1/2.** Neither player has an advantage.

---

**Part 2 — Barrel respun after each pull:**

Each turn is independent. Let p = P(first player loses).

\`\`\`
p = (1/6)×1 + (5/6)×(1−p)    (first player survives with prob 5/6, then becomes "second")
11p/6 = 1    →    p = 6/11
\`\`\`

The first player has probability 6/11 of losing, the second player 5/11. **Choose to be second.**

---

**Part 3 — Two random bullets, barrel respun:**

If you spin: P(lose) = 2/6 = 1/3.
If you don't spin (5 chambers remain): P(lose) = 2/5.

Since 2/5 > 2/6, **spin the barrel.**

---

**Part 4 — Two consecutive bullets, opponent survived:**

Label empty chambers 1–4 and bullet chambers 5–6 (consecutive). Opponent survived, so they faced one of {1,2,3,4} — each equally likely (prob 1/4). If opponent was in position k, the next chamber is k+1 (mod 6):
- k=1,2,3: next chamber is 2,3,4 (empty) → you survive
- k=4: next chamber is 5 (bullet) → you die

P(survive | no spin) = 3/4.
P(survive | spin) = 4/6 = 2/3.

Since 3/4 > 2/3, **do not spin the barrel.**

---

**Aces**

**Question:** 52 cards are distributed to 4 players (13 each). What is the probability each player has exactly one ace?

**Solution (conditional probability chain):**
\`\`\`
P = (52/52) × (39/51) × (26/50) × (13/49)
  = 1 × 39/51 × 26/50 × 13/49
\`\`\`

- 1st ace: belongs to some pile (probability 1)
- 2nd ace: 39 of remaining 51 cards belong to a different pile (39/51)
- 3rd ace: 26 of remaining 50 cards belong to the other two piles (26/50)
- 4th ace: 13 of remaining 49 cards belong to the last pile (13/49)

\`\`\`
P = (39 × 26 × 13) / (51 × 50 × 49) ≈ 10.55%
\`\`\`

---

**Gambler's Ruin**

**Question:** A gambler starts with \\$i and bets \\$1 on each game: wins with probability p, loses with probability q = 1−p. Stops at \\$0 (ruin) or \\$N (target). What is the probability of reaching \\$N?

**Solution:** Let Pᵢ = P(reach N from i). The recurrence is:
\`\`\`
Pᵢ = p·Pᵢ₊₁ + q·Pᵢ₋₁    with P₀ = 0, Pₙ = 1
\`\`\`

This gives Pᵢ − Pᵢ₋₁ = (q/p)(Pᵢ₋₁ − Pᵢ₋₂), a geometric progression with ratio r = q/p.

**Case 1 — p ≠ 1/2 (r = q/p ≠ 1):**
\`\`\`
Pᵢ = [1 − (q/p)ⁱ] / [1 − (q/p)ᴺ]
\`\`\`

**Case 2 — p = 1/2 (r = 1, fair game):**
\`\`\`
Pᵢ = i/N
\`\`\`

---

**Basketball Scores**

**Question:** A player takes 100 free throws. She scores on throw 1, misses throw 2. On each subsequent throw k, P(score) = (current score)/(k−1). After 100 throws, what is P(exactly 50 baskets)?

**Solution:** Let P(n,k) = P(k baskets after n throws). By induction:

**Claim: P(n,k) = 1/(n−1) for all k = 1, 2, ..., n−1.**

Base case (n=3): P(3,1) = P(3,2) = 1/2 ✓

Inductive step: Applying the law of total probability:
\`\`\`
P(n+1, k) = P(miss|(n,k)) × P(n,k) + P(score|(n,k−1)) × P(n,k−1)
           = (1−k/n) × 1/(n−1) + (k−1)/n × 1/(n−1)
           = (1 − k/n + (k−1)/n) / (n−1)
           = (1 − 1/n) / (n−1)
           = 1/n  ✓
\`\`\`

**P(100 throws, 50 baskets) = 1/99**

---

**Cars on a Road**

**Question:** The probability of observing at least one car during any 20-minute interval is 609/625. Assuming constant arrival rate, what is P(at least one car in 5 minutes)?

**Solution:** Break the 20-minute interval into 4 independent 5-minute intervals. Let p = P(car in 5 min), so P(no car in 5 min) = 1−p.

\`\`\`
P(no car in 20 min) = (1−p)⁴ = 1 − 609/625 = 16/625
\`\`\`

\`\`\`
1−p = (16/625)^(1/4) = 2/5    →    p = 3/5
\`\`\`

---`,
    },
    {
      id: "4.4",
      title: "Discrete and Continuous Distributions",
      problemCount: 4,
      content: `## 4.4 Discrete and Continuous Distributions

### Properties of Random Variables

**Table 4.1 — Basic properties:**

| Property | Discrete | Continuous |
|----------|---------|-----------|
| CDF | \`F(a) = P(X ≤ a)\` | \`F(a) = ∫₋∞ᵃ f(x)dx\` |
| PMF/PDF | \`p(x) = P(X = x)\` | \`f(x) = d/dx F(x)\` |
| E[X] | \`Σ x·p(x)\` | \`∫₋∞^∞ x·f(x)dx\` |
| E[g(X)] | \`Σ g(x)·p(x)\` | \`∫₋∞^∞ g(x)·f(x)dx\` |
| Var(X) | \`E[(X−E[X])²] = E[X²] − (E[X])²\` | same |
| Std(X) | \`√Var(X)\` | same |

> For continuous random variables, P(X = x) = 0 for all x, so P(X < x) = P(X ≤ x).

---

### Discrete Distributions

**Table 4.2 — Key discrete distributions:**

| Name | PMF | E[X] | Var(X) |
|------|-----|------|--------|
| **Uniform** (a to b) | \`1/(b−a+1)\` for x = a,...,b | \`(b+a)/2\` | \`[(b−a+1)²−1]/12\` |
| **Binomial** (n,p) | \`C(n,x)·pˣ(1−p)^(n-x)\`, x=0,...,n | \`np\` | \`np(1−p)\` |
| **Poisson** (λt) | \`e^(−λt)(λt)ˣ/x!\`, x=0,1,... | \`λt\` | \`λt\` |
| **Geometric** (p) | \`(1−p)^(x-1)·p\`, x=1,2,... | \`1/p\` | \`(1−p)/p²\` |
| **Negative Binomial** (r,p) | \`C(x−1,r−1)·pʳ(1−p)^(x-r)\`, x=r,r+1,... | \`r/p\` | \`r(1−p)/p²\` |

- **Binomial:** counts successes in n independent trials
- **Poisson:** counts events in a fixed interval with constant average rate λ
- **Geometric:** counts trials until first success
- **Negative Binomial:** counts trials until r-th success

---

### Continuous Distributions

**Table 4.3 — Key continuous distributions:**

| Name | PDF | E[X] | Var(X) |
|------|-----|------|--------|
| **Uniform** [a,b] | \`1/(b−a)\` for x ∈ [a,b] | \`(b+a)/2\` | \`(b−a)²/12\` |
| **Normal** (μ,σ²) | \`(1/(σ√(2π)))·exp(−(x−μ)²/(2σ²))\` | \`μ\` | \`σ²\` |
| **Exponential** (λ) | \`λe^(−λx)\` for x ≥ 0 | \`1/λ\` | \`1/λ²\` |
| **Gamma** (α,λ) | \`λe^(−λx)(λx)^(α−1)/Γ(α)\` for x > 0 | \`α/λ\` | \`α/λ²\` |
| **Beta** (α,β) | \`Γ(α+β)/[Γ(α)Γ(β)]·x^(α-1)(1-x)^(β-1)\` for x ∈ [0,1] | \`α/(α+β)\` | \`αβ/[(α+β)²(α+β+1)]\` |

---

### Problems

**Meeting Probability**

**Question:** Two bankers arrive uniformly at random between 5–6 am and each stays 5 minutes. What is the probability they meet?

**Solution:** Let X and Y be arrival times (in minutes after 5:00). Both uniform on [0,60], independent. They meet iff |X − Y| < 5.

The region where |X−Y| ≥ 5 consists of two triangles, each with legs of length 55:
\`\`\`
P(no meeting) = 2 × (1/2 × 55²) / 60² = 55²/3600 = 3025/3600
\`\`\`

\`\`\`
P(meeting) = 1 − 3025/3600 = 575/3600 = 23/144
\`\`\`

Alternatively: the meeting region forms a band of width 5 around the diagonal in the 60×60 square:
\`\`\`
P = (60+55)(60−55)/60² = 115×5/3600 = 575/3600 = 23/144  ✓
\`\`\`

---

**Probability of Triangle**

**Question:** A stick of length 1 is cut twice uniformly at random. What is the probability the three segments form a triangle?

**Solution:** Let the two cut points be x and y. Without loss of generality consider x < y; then the three segments are x, (y−x), and (1−y). The triangle inequality requires all three sides together exceed any one side. This simplifies to:
\`\`\`
x < 1/2,    y > 1/2,    and    y < x + 1/2
\`\`\`

The feasible region for x < y forms a triangle with area 1/8 in the half of the unit square. By symmetry, the case y < x gives another 1/8. Total:

\`\`\`
P(triangle) = 1/4
\`\`\`

---

**Poisson Process and Memorylessness**

**Question:** Buses arrive at a Poisson rate λ = 0.1/min (average every 10 min). You arrive at a random time. What is your expected waiting time? How long ago on average did the last bus arrive?

**Solution:** The exponential distribution models time between Poisson arrivals:
\`\`\`
f(t) = λe^(−λt)  for t ≥ 0,    E[T] = 1/λ,    Var(T) = 1/λ²
\`\`\`

**Memoryless property:** \`P(T > s+t | T > s) = P(T > t)\`. Waiting s minutes gives no information about how much longer you'll wait.

Due to memorylessness: **expected remaining wait = 1/λ = 10 minutes**, regardless of how long you've been waiting.

By the same logic in reverse (memorylessness holds backward in time): **last bus arrived 10 minutes ago on average.**

> **Apparent paradox:** "If the last bus was 10 min ago and the next is 10 min away, shouldn't the average interval be 20 min, not 10?" The resolution: when you arrive at a random time, you are more likely to fall inside a long interval than a short one. This is called the **inspection paradox**.
> **General formula for residual life:** E[residual] = E[X²] / (2E[X]) for arbitrary distributions.

---

**Moments of the Normal Distribution**

**Question:** If X ~ N(0,1), what are E[X], E[X²], E[X³], and E[X⁴]?

**Solution via Moment Generating Function (MGF):**

The MGF of X ~ N(0,1) is:
\`\`\`
M(t) = E[eᵗˣ] = ∫₋∞^∞ eᵗˣ · (1/√(2π)) e^(−x²/2) dx = e^(t²/2)
\`\`\`

(Computed by completing the square: the integrand becomes a N(t,1) pdf up to normalization.)

**Derivatives at t = 0** give the moments \`M⁽ⁿ⁾(0) = E[Xⁿ]\`:

\`\`\`
M'(t) = t·e^(t²/2)                                    →  E[X]  = M'(0) = 0
M''(t) = (1+t²)·e^(t²/2)                              →  E[X²] = M''(0) = 1
M'''(t) = (3t+t³)·e^(t²/2)                            →  E[X³] = M'''(0) = 0
M''''(t) = (3 + 6t² + t⁴)·e^(t²/2)                   →  E[X⁴] = M''''(0) = 3
\`\`\`

**Results: E[X] = 0, E[X²] = 1 (variance), E[X³] = 0 (symmetric), E[X⁴] = 3 (kurtosis = 3)**

> **Key formula:** For X ~ N(0,1), E[X^(2k)] = (2k−1)!! = 1×3×5×...×(2k−1). So E[X⁴] = 3, E[X⁶] = 15, E[X⁸] = 105.

---`,
    },
    {
      id: "4.5",
      title: "Expected Value, Variance, and Covariance",
      problemCount: 7,
      content: `## 4.5 Expected Value, Variance, and Covariance

### Core Rules

**Linearity of expectation** (always holds, regardless of dependence):
\`\`\`
E[X₁ + X₂ + ... + Xₙ] = E[X₁] + E[X₂] + ... + E[Xₙ]
\`\`\`

**Independence:** If X and Y are independent: \`E[g(X)h(Y)] = E[g(X)]·E[h(Y)]\`

**Covariance and correlation:**
\`\`\`
Cov(X,Y) = E[(X−E[X])(Y−E[Y])] = E[XY] − E[X]E[Y]

ρ(X,Y) = Cov(X,Y) / √(Var(X)·Var(Y))
\`\`\`

If X and Y are independent → Cov(X,Y) = 0 and ρ = 0. (The converse is NOT generally true.)

**General variance/covariance rule:**
\`\`\`
Cov(Σᵢ aᵢXᵢ, Σⱼ bⱼYⱼ) = Σᵢ Σⱼ aᵢbⱼ Cov(Xᵢ, Yⱼ)

Var(Σᵢ Xᵢ) = Σᵢ Var(Xᵢ) + 2 Σᵢ<ⱼ Cov(Xᵢ, Xⱼ)
\`\`\`

**Conditional expectation:**
\`\`\`
E[g(X) | Y=y] = ∫ g(x) f_{X|Y}(x|y) dx    (continuous)

E[X] = E[E[X|Y]]    (Law of Total Expectation)
\`\`\`

---

### Problems

**Connecting Noodles**

**Question:** 100 noodles with 200 free ends. Blindfolded, you repeatedly pick two random ends and connect them until no free ends remain. What is the expected number of loops?

**Solution:** Work by induction. With n noodles (2n free ends):
- Probability a chosen pair forms a loop (both ends of same noodle) = (2n−2) choose-wise... Actually: given one end is chosen, only 1 of the remaining 2n−1 ends completes a loop → probability 1/(2n−1). This adds one circle and n−1 noodles.
- Otherwise (probability (2n−2)/(2n−1)): n−1 noodles result.

\`\`\`
E[f(n)] = E[f(n−1)] + 1/(2n−1)
\`\`\`

Applying recursively from E[f(1)] = 1:
\`\`\`
E[f(n)] = 1 + 1/3 + 1/5 + ... + 1/(2n−1)
\`\`\`

For 100 noodles: **E[f(100)] = 1 + 1/3 + 1/5 + ... + 1/199**

---

**Optimal Hedge Ratio**

**Question:** You hold one share of stock A and want to minimize variance by shorting h shares of stock B. Given σ_A², σ_B², and correlation ρ, find the optimal h.

**Solution:** Variance of the hedged portfolio:
\`\`\`
Var(r_A − h·r_B) = σ_A² − 2ρhσ_Aσ_B + h²σ_B²
\`\`\`

Setting the first-order condition:
\`\`\`
d/dh[Var] = −2ρσ_Aσ_B + 2hσ_B² = 0    →    h* = ρ·σ_A/σ_B
\`\`\`

Second derivative \`2σ_B² > 0\` confirms this is a minimum.

**Optimal hedge ratio: \`h* = ρ·σ_A/σ_B\`**

---

**Dice Game**

**Question:** You roll a die and receive the face value. If it shows 4, 5, or 6, you roll again. The game continues until you roll 1, 2, or 3. What is the expected total payoff?

**Solution (Law of Total Expectation):** Let E[X] be the expected payoff, Y = first roll outcome.

- If Y ∈ {1,2,3} (prob 1/2): E[X | Y ∈ {1,2,3}] = 2 (average of 1,2,3)
- If Y ∈ {4,5,6} (prob 1/2): E[X | Y ∈ {4,5,6}] = 5 + E[X] (avg of 4,5,6 plus you restart)

\`\`\`
E[X] = (1/2)×2 + (1/2)×(5 + E[X])    →    E[X]/2 = 7/2    →    E[X] = 7
\`\`\`

---

**Card Game — First Ace**

**Question:** A 52-card deck is dealt one by one. What is the expected number of cards seen to reach the first ace?

**Solution:** There are 48 non-ace cards. For each non-ace card i, define indicator Xᵢ = 1 if card i is seen before all 4 aces.

The 4 aces divide the 52-card deck into 5 "slots." Card i is equally likely to be in any slot, so:
\`\`\`
P(Xᵢ = 1) = 1/5
\`\`\`

Total cards seen = 1 (the ace itself) + cards seen before it:
\`\`\`
E[cards] = 1 + Σᵢ E[Xᵢ] = 1 + 48 × (1/5) = 1 + 48/5 = 53/5 = 10.6
\`\`\`

**General formula:** For m ordinary cards and n special cards, the expected position of the first special card is \`1 + m/(n+1)\`. Here: 1 + 48/5 = 10.6. ✓

---

**Sum of Random Variables**

**Question:** X₁, X₂, ..., Xₙ are IID Uniform[0,1]. What is P(X₁ + X₂ + ... + Xₙ < 1)?

**Solution:** By inspection of small cases:
- n=1: P(X₁ < 1) = 1 = 1/1!
- n=2: P(X₁+X₂ < 1) = area under x₁+x₂ < 1 in unit square = 1/2 = 1/2!
- n=3: P(S₃ < 1) = volume of tetrahedron = 1/6 = 1/3!

**Claim: P(Sₙ < 1) = 1/n!**

**Inductive proof:** Assume P(Sₙ < 1) = 1/n!. Condition on Xₙ₊₁ = x:
\`\`\`
P(Sₙ₊₁ < 1) = ∫₀¹ P(Sₙ < 1−x) dx
\`\`\`

Since Sₙ < 1−x is geometrically equivalent to Sₙ < 1 scaled by factor (1−x), its probability is (1−x)ⁿ/n!:
\`\`\`
P(Sₙ₊₁ < 1) = ∫₀¹ (1−x)ⁿ/n! dx = [−(1−x)^(n+1)/((n+1)·n!)]₀¹ = 1/(n+1)! ✓
\`\`\`

**P(Sₙ < 1) = 1/n!**

---

**Coupon Collection**

**Question:** A box contains one of N distinct coupon types (uniformly random). A: How many boxes on average are needed to collect all N types? B: After collecting n coupons, what is the expected number of distinct types?

**Solution A:** Let Xᵢ = additional coupons needed to get the i-th new type (after i−1 types collected). The i-th new type appears with probability (N−i+1)/N, so Xᵢ ~ Geometric with p = (N−i+1)/N and E[Xᵢ] = N/(N−i+1).

\`\`\`
E[X] = Σᵢ₌₁ᴺ N/(N−i+1) = N × (1/N + 1/(N−1) + ... + 1/1) = N × Hₙ
\`\`\`

where Hₙ = 1 + 1/2 + ... + 1/N is the N-th harmonic number.

**Solution B:** Introduce indicator Iᵢ = 1 if type i appears at least once in n coupons. Each coupon misses type i with probability (N−1)/N, and all n coupons independently:
\`\`\`
P(Iᵢ = 0) = ((N−1)/N)ⁿ    →    E[Iᵢ] = 1 − ((N−1)/N)ⁿ
\`\`\`

\`\`\`
E[Y] = Σᵢ E[Iᵢ] = N × [1 − (1−1/N)ⁿ]
\`\`\`

---

**Joint Default Probability**

**Question:** Bond A defaults with probability 0.5 next year; bond B with probability 0.3. What is the range of P(at least one defaults) and their correlation range?

**Solution — Probability range:**

- **Maximum:** If the events are disjoint (A and B never both default), P(A or B) = 0.5 + 0.3 = **0.8**
- **Minimum:** If B always defaults when A does, P(A or B) = P(A) = **0.5**

**Solution — Correlation range:**

Let I_A and I_B be default indicators. Then:
\`\`\`
E[I_A] = 0.5,  E[I_B] = 0.3
Var(I_A) = 0.5×0.5 = 0.25,  σ_A = 0.5
Var(I_B) = 0.3×0.7 = 0.21,  σ_B = √0.21
\`\`\`

\`\`\`
P(A or B) = E[I_A] + E[I_B] − E[I_A I_B]
          = 0.5 + 0.3 − (E[I_A]E[I_B] + Cov(I_A, I_B))
          = 0.8 − 0.15 − ρ_AB × 0.5 × √0.21
          = 0.65 − ρ_AB × (√0.21)/2
\`\`\`

For max P = 0.8:  \`ρ_AB = −0.15 / (0.5√0.21) = −√(3/7) ≈ −0.655\`

For min P = 0.5:  \`ρ_AB = +0.15 / (0.5√0.21) = +√(3/7) ≈ +0.655\`

**Correlation range: ρ_AB ∈ [−√(3/7), +√(3/7)]**

> Note: Do not simply set ρ = ±1 to find the probability range, because ρ = ±1 may be outside the feasible correlation range. Always find the range of P first, then back-solve for ρ.

---`,
    },
    {
      id: "4.6",
      title: "Order Statistics",
      problemCount: 3,
      content: `## 4.6 Order Statistics

### Distributions of Max and Min

For n IID random variables with CDF F_X(x) and PDF f_X(x):

**Maximum Z_n = max(X₁, ..., Xₙ):**
\`\`\`
F_{Zn}(x) = [F_X(x)]ⁿ
f_{Zn}(x) = n · f_X(x) · [F_X(x)]^(n-1)
\`\`\`

**Minimum Y_n = min(X₁, ..., Xₙ):**
\`\`\`
P(Y_n > x) = [1 − F_X(x)]ⁿ    →    F_{Yn}(x) = 1 − [1 − F_X(x)]ⁿ
f_{Yn}(x) = n · f_X(x) · [1 − F_X(x)]^(n-1)
\`\`\`

---

### Problems

**Expected Value of Max and Min**

**Question:** X₁,...,Xₙ are IID Uniform[0,1]. Find the CDF, PDF, and E[·] for Z_n = max and Y_n = min.

**Solution:** For Uniform[0,1]: F_X(x) = x, f_X(x) = 1.

**Maximum:**
\`\`\`
F_{Zn}(x) = xⁿ
f_{Zn}(x) = n·xⁿ⁻¹
E[Z_n] = ∫₀¹ x · n·xⁿ⁻¹ dx = n/(n+1)
\`\`\`

**Minimum:**
\`\`\`
F_{Yn}(x) = 1 − (1−x)ⁿ
f_{Yn}(x) = n·(1−x)ⁿ⁻¹
E[Y_n] = ∫₀¹ x · n·(1−x)ⁿ⁻¹ dx = 1/(n+1)
\`\`\`

---

**Correlation of Max and Min**

**Question:** X₁, X₂ are IID Uniform[0,1]. Let Y = min(X₁,X₂) and Z = max(X₁,X₂). Find P(Y > y | Z < z) and corr(Y,Z).

**Solution:**

From the order statistics for n=2:
\`\`\`
E[Y] = 1/3,    E[Z] = 2/3
E[Y²] = ∫₀¹ y² · 2(1-y) dy = 2/12 = 1/6    →    Var(Y) = 1/6 − 1/9 = 1/18
E[Z²] = ∫₀¹ z² · 2z dz = 1/2    →    Var(Z) = 1/2 − 4/9 = 1/18
\`\`\`

**E[YZ]:** For any (X₁,X₂), Y·Z = min(X₁,X₂)·max(X₁,X₂) = X₁·X₂ regardless of ordering.
\`\`\`
E[YZ] = E[X₁·X₂] = E[X₁]·E[X₂] = (1/2)·(1/2) = 1/4
\`\`\`

\`\`\`
Cov(Y,Z) = E[YZ] − E[Y]E[Z] = 1/4 − (1/3)(2/3) = 1/4 − 2/9 = 1/36

corr(Y,Z) = (1/36) / √(1/18 × 1/18) = (1/36)/(1/18) = 1/2
\`\`\`

**Conditional probability:**
- If y ≥ z: P(Y > y | Z < z) = 0 (since Y ≤ Z always)
- If 0 < y < z ≤ 1: P(Y > y ∩ Z < z) = (z−y)² (the square with vertices (y,y),(z,y),(z,z),(y,z)), and P(Z < z) = z²:

\`\`\`
P(Y > y | Z < z) = (z−y)²/z²    for 0 < y < z ≤ 1
\`\`\`

---

**Random Ants**

**Question:** 500 ants are placed uniformly at random on a 1-foot string. Each moves at 1 ft/min toward a random end; when two ants collide they reverse directions. What is the expected time until all ants fall off?

**Solution:** The key insight: when two ants collide and reverse, the net effect is identical to the ants passing through each other (just with exchanged labels). Since labels are random anyway, collisions are irrelevant.

Therefore each ant independently falls off an end after time min(x, 1−x) where x is its position, OR we simply consider the maximum fall-off time.

With collisions ignored, each ant takes either x minutes (if moving left) or 1−x minutes (if moving right). The time for all ants to fall off equals:
\`\`\`
T = max(X₁, X₂, ..., X₅₀₀)    where Xᵢ = min(position_i, 1 − position_i) ≤ 0.5
\`\`\`

But more precisely: each ant can go to either end, and the last ant to fall off is the one whose fall-off time (the max of its x vs 1−x) is greatest. The worst-case ant is the one closest to the center of the string.

The original problem reduces to: **What is E[max of 500 IID Uniform[0,1] random variables]?**

Using the max formula with n = 500:
\`\`\`
E[max of 500 Uniform[0,1]] = 500/501
\`\`\`

**Expected time = 500/501 minutes ≈ 0.998 minutes.**

---

*End of Chapter 4*`,
    },
  ],
};

export default chapter4;
