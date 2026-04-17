import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 4 (Probability Theory).
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter4Choices: Record<string, Choice[]> = {
  'ch4-4-1-01-coin-toss-game': [
    { id: 'a', text: 'The probability is exactly 1/2 by a symmetry argument that pairs A\'s first n coins against B\'s, then uses the extra coin to break ties.', correct: true, rationale: 'Symmetry on n-vs-n coins gives P(more)=P(fewer)=x with 2x+y=1; the extra coin breaks ties giving x+y/2=1/2.' },
    { id: 'b', text: 'The probability is (n+1)/(2n+1), slightly above 1/2, because A has one more coin than B.', correct: false, rationale: 'This treats the extra coin as giving a proportional edge, ignoring the symmetry that cancels the advantage outside of ties.' },
    { id: 'c', text: 'The probability is 1/2 + 1/2^(n+1), reflecting a small edge from A\'s extra coin on the tie configuration.', correct: false, rationale: 'The tie probability y is not 1/2^n; this miscomputes y and so adds a spurious positive term.' },
    { id: 'd', text: 'The probability depends on n and approaches 1/2 only asymptotically as n grows large.', correct: false, rationale: 'The answer is exactly 1/2 for every finite n, not an asymptotic limit.' },
  ],
  'ch4-4-1-02-card-game': [
    { id: 'a', text: 'The probability of winning is 8/17, obtained from symmetry after subtracting the tie probability of 3/51.', correct: true, rationale: 'P(win)=(1-P(tie))/2=(1-3/51)/2=8/17 by the symmetry between you and the dealer.' },
    { id: 'b', text: 'The probability is 1/2 since your card and the dealer\'s are drawn from the same deck under symmetric rules.', correct: false, rationale: 'This ignores the positive tie probability, which reduces the win probability below 1/2.' },
    { id: 'c', text: 'The probability is 24/51, computed by dividing wins-or-ties evenly across the 51 remaining cards.', correct: false, rationale: 'This double-counts ties as half-wins and uses the wrong base count for remaining cards.' },
    { id: 'd', text: 'The probability is 4/13, assuming exactly one rank beats yours out of the thirteen possible ranks.', correct: false, rationale: 'This ignores that multiple ranks can beat yours and treats ranks (not cards) as equally likely outcomes.' },
  ],
  'ch4-4-1-03-drunk-passenger': [
    { id: 'a', text: 'The probability that passenger 100 gets seat #100 is 1/2, independent of n, because only seats #1 and #100 ever resolve the displacement chain and are symmetric.', correct: true, rationale: 'At every step the displaced passenger chooses uniformly among free seats that always include both #1 and #100, so by symmetry either is equally likely to be chosen first.' },
    { id: 'b', text: 'The probability is 1/100 since the drunk picks a uniformly random seat out of 100.', correct: false, rationale: 'This confuses "drunk picks seat 100" with "passenger 100 gets their seat"; most resolutions don\'t go directly to seat 100.' },
    { id: 'c', text: 'The probability is 99/100 because only if the drunk initially picks seat #100 does passenger 100 lose out.', correct: false, rationale: 'Displaced passengers can also land on seat #100 later through the chain, so the failure probability exceeds 1/100.' },
    { id: 'd', text: 'The probability decreases with n and is approximately 1/n for large n due to the accumulating displacement chain.', correct: false, rationale: 'The answer is exactly 1/2 for every n ≥ 2; the chain has no n-dependence by the symmetry argument.' },
  ],
  'ch4-4-1-04-n-points-on-a-circle': [
    { id: 'a', text: 'The probability is N/2^(N-1), obtained by summing N mutually exclusive events "all other N-1 points lie in the clockwise semicircle from point i."', correct: true, rationale: 'Each anchor event has probability 1/2^(N-1) and the N events are mutually exclusive, so the union is N·(1/2^(N-1)).' },
    { id: 'b', text: 'The probability is 1/2^(N-1), the chance that any single fixed semicircle contains all N points.', correct: false, rationale: 'This fixes one semicircle rather than considering any semicircle, missing the factor of N from the anchor choices.' },
    { id: 'c', text: 'The probability is 1 - (1/2)^N, using inclusion-exclusion on N overlapping semicircle events.', correct: false, rationale: 'The anchor events are actually mutually exclusive, so inclusion-exclusion with overlap terms is incorrect here.' },
    { id: 'd', text: 'The probability is N/2^N, since each of the N points has an independent 1/2 chance of being on one side.', correct: false, rationale: 'This assumes independence of side assignments, which ignores the joint geometric constraint of a common semicircle.' },
  ],
  'ch4-4-2-01-poker-hands': [
    { id: 'a', text: 'Four-of-a-kind count = 624, full house = 3,744, two pairs = 123,552 out of C(52,5) = 2,598,960.', correct: true, rationale: 'These match 13·48, 13·C(4,3)·12·C(4,2), and C(13,2)·C(4,2)²·44 respectively.' },
    { id: 'b', text: 'Four-of-a-kind = 13, full house = 156, two pairs = 858, using only rank choices without suit multipliers.', correct: false, rationale: 'Forgets to multiply by C(4,k) suit-pattern counts and the free-fifth-card choices.' },
    { id: 'c', text: 'Two pairs = C(13,2)·C(4,2)²·48, using 48 cards for the fifth card (any card not already chosen).', correct: false, rationale: 'The fifth card must avoid both pair ranks, leaving 52-4·2 = 44 choices, not 48.' },
    { id: 'd', text: 'Full house = 13·4·12·4 = 2,496, treating the pair and triple as ordered single-card choices.', correct: false, rationale: 'This uses permutations instead of combinations for the triple (C(4,3)=4 correct) but misses the C(4,2)=6 for the pair.' },
  ],
  'ch4-4-2-02-hopping-rabbit': [
    { id: 'a', text: 'The count satisfies f(n) = f(n-1) + f(n-2), the Fibonacci recurrence, since the last hop is either 1 or 2 stairs.', correct: true, rationale: 'Conditioning on the final hop partitions paths into those arriving from stair n-1 versus stair n-2.' },
    { id: 'b', text: 'The count is 2^(n-1), treating each step as an independent binary choice of hop size.', correct: false, rationale: 'Hop sequences have variable length, so steps are not n-1 independent binary choices.' },
    { id: 'c', text: 'The count is n(n+1)/2, the number of ways to partition n into 1s and 2s.', correct: false, rationale: 'The number of compositions of n into 1s and 2s is Fibonacci, not a triangular number.' },
    { id: 'd', text: 'The count is C(n, floor(n/2)), the number of ways to choose positions for the 2-hops.', correct: false, rationale: 'The total number of hops varies from ceil(n/2) to n, not fixed at floor(n/2).' },
  ],
  'ch4-4-2-03-screwy-pirates-2': [
    { id: 'a', text: 'There must be C(11,5) = 462 locks and each pirate carries C(10,5) = 252 keys.', correct: true, rationale: 'Every 5-pirate subset needs one lock they cannot open; each pirate is in C(10,5) of the 6-pirate complements that hold the keys.' },
    { id: 'b', text: 'There must be C(11,6) = 462 locks and each pirate carries 6 keys, one per lock accessible to majorities.', correct: false, rationale: 'Each pirate is in many majority subsets, so keys per pirate equals C(10,5)=252, not 6.' },
    { id: 'c', text: 'There must be 11 locks (one per pirate) and each pirate carries 6 keys.', correct: false, rationale: 'With only 11 locks, some 5-pirate subsets would still be able to open every lock, violating the blocking condition.' },
    { id: 'd', text: 'There must be C(11,5) = 462 locks and each pirate carries C(11,5)/2 = 231 keys.', correct: false, rationale: 'Keys per pirate is not the total locks divided by 2; it equals C(10,5)=252 from counting the 6-subsets containing that pirate.' },
  ],
  'ch4-4-2-04-chess-tournament': [
    { id: 'a', text: 'The probability players 1 and 2 meet in the final is 2^(n-1)/(2^n - 1).', correct: true, rationale: 'Player 2 must land in the opposite half-bracket from player 1; among 2^n - 1 remaining slots, 2^(n-1) are in the other half.' },
    { id: 'b', text: 'The probability is 1/2 by symmetry, since player 2 is equally likely to be in either half-bracket.', correct: false, rationale: 'There are 2^n - 1 remaining slots, not 2^n, so the probability is slightly greater than 1/2.' },
    { id: 'c', text: 'The probability is 1/2^(n-1), the chance that both players survive all but the last round.', correct: false, rationale: 'Player 1 always wins (highest skill), so the probability is not a joint survival calculation.' },
    { id: 'd', text: 'The probability is 2/(2^n), treating two of the 2^n bracket slots as "final-bound."', correct: false, rationale: 'Player 1\'s half is already determined, leaving 2^n - 1 slots to place player 2, not 2^n.' },
  ],
  'ch4-4-2-05-application-letters-derangement': [
    { id: 'a', text: 'The probability all five letters land in wrong envelopes is 11/30, via inclusion-exclusion: 1 - 1/2! + 1/3! - 1/4! + 1/5!.', correct: true, rationale: 'The derangement formula gives D_5/5! = (1 - 1 + 1/2 - 1/6 + 1/24 - 1/120) = 44/120 = 11/30.' },
    { id: 'b', text: 'The probability is (4/5)^5, treating each letter as independently missing its envelope with probability 4/5.', correct: false, rationale: 'Letter placements are dependent (without replacement), so independence gives the wrong answer.' },
    { id: 'c', text: 'The probability is 1 - 5·(4!/5!) = 0, via a naive inclusion count stopping at the first term.', correct: false, rationale: 'Truncating inclusion-exclusion after the first term overcounts the union and yields a degenerate result.' },
    { id: 'd', text: 'The probability is 1/5! = 1/120, the chance of a specific derangement.', correct: false, rationale: 'This counts one arrangement rather than summing all D_5 derangements.' },
  ],
  'ch4-4-2-06-birthday-problem': [
    { id: 'a', text: 'The smallest n making P(match) > 1/2 is 23, where P(no match) falls just below 1/2.', correct: true, rationale: 'The product 365·364·...·(365-n+1)/365^n first drops below 1/2 at n=23, giving P(match)≈0.507.' },
    { id: 'b', text: 'The answer is 183 because 1/2 of 365 days are needed to expect a collision.', correct: false, rationale: 'This confuses "covering half the calendar" with "probability of a shared birthday," which grows quadratically in n.' },
    { id: 'c', text: 'The answer is 28, which is the first n where n·(n-1)/(2·365) exceeds 1/2.', correct: false, rationale: 'The linear approximation 1-exp(-n(n-1)/730) matches 1/2 at n≈23, not 28.' },
    { id: 'd', text: 'The answer is 50, rounded from 365/7 as a typical intuitive estimate.', correct: false, rationale: 'Intuition drastically overestimates; the true threshold comes from the exponential decay of P(no match).' },
  ],
  'ch4-4-2-07-100th-digit-of-1-2-3000': [
    { id: 'a', text: 'The 100th decimal digit is 9, because (1+√2)^3000 = N - ε with ε < 10^-100 for integer N.', correct: true, rationale: 'N = (1+√2)^3000 + (1-√2)^3000 is an integer and the second term is positive and tiny, giving a decimal like (N-1).999...9.' },
    { id: 'b', text: 'The 100th digit is 0, since the decimal part of (1+√2)^3000 is vanishingly small.', correct: false, rationale: 'The quantity is just below an integer, so the decimal expansion is 0.999..., not 0.000....' },
    { id: 'c', text: 'The 100th digit is 5 as the expected average digit in a pseudo-random expansion.', correct: false, rationale: 'The expansion is structured (close to integer), not statistically random.' },
    { id: 'd', text: 'The 100th digit cannot be determined without explicit high-precision computation.', correct: false, rationale: 'The conjugate-pair trick determines the digit exactly via elementary bounds on (√2-1)^3000.' },
  ],
  'ch4-4-2-08-cubic-of-integer': [
    { id: 'a', text: 'The probability is 1/100 because exactly the last two digits x ≡ 71 (mod 100) produce a cube ending in 11.', correct: true, rationale: 'Last digit of x must be 1 (only 1^3 ≡ 1 mod 10); then 30·b mod 100 forces last digit of b to be 7.' },
    { id: 'b', text: 'The probability is 1/10 because only the last digit of x controls the last two digits of x^3.', correct: false, rationale: 'The tens digit of x^3 depends on both digits of x through 30a²b, not just the last digit.' },
    { id: 'c', text: 'The probability is 2/100 since both 1 and 9 are candidates for the last digit that cube to end in 1.', correct: false, rationale: '9^3 = 729 ends in 9, not 1; only x ending in 1 cubes to a number ending in 1.' },
    { id: 'd', text: 'The probability is 1/1000 because three digits of x must align to produce "11" at the end of x^3.', correct: false, rationale: 'Only the last two digits of x determine the last two digits of x^3, so the probability is 1/100, not 1/1000.' },
  ],
  'ch4-4-3-01-all-girl-world': [
    { id: 'a', text: 'The fraction of girls remains 50%, because each birth independently has a 1/2 chance of being a girl regardless of family stopping rules.', correct: true, rationale: 'Linearity of expectation over independent Bernoulli(1/2) births makes family-stopping rules irrelevant to the overall sex ratio.' },
    { id: 'b', text: 'Girls become dominant because every family produces exactly one girl but may produce many boys.', correct: false, rationale: 'Each family stops after one girl, yet the expected number of boys per family is also 1, keeping the ratio balanced.' },
    { id: 'c', text: 'Boys become dominant since families keep trying until a girl arrives, producing many boys per family on average.', correct: false, rationale: 'The expected number of boys per family is 1 (geometric mean), not "many"; the ratio stays 1:1.' },
    { id: 'd', text: 'The ratio depends on the initial population size and cannot be determined from the rule alone.', correct: false, rationale: 'Each birth is Bernoulli(1/2) independent of history, so the law of large numbers fixes the ratio at 1/2.' },
  ],
  'ch4-4-3-02-unfair-coin': [
    { id: 'a', text: 'The posterior probability you picked the double-headed coin is approximately 1024/2023 ≈ 0.506.', correct: true, rationale: 'Bayes\' rule: (1·1/1000)/(1·1/1000 + (1/1024)·999/1000) = 1024/2023.' },
    { id: 'b', text: 'The probability is 1/1000, the unconditional prior of picking the unfair coin.', correct: false, rationale: 'This ignores the conditioning on observing ten heads, which should update the prior.' },
    { id: 'c', text: 'The probability is 1/1024, the chance of ten heads with a fair coin.', correct: false, rationale: 'This is P(B|A^c), not P(A|B); it flips the conditional direction.' },
    { id: 'd', text: 'The probability is 1 - 1/1024 ≈ 0.999, essentially certain given such a rare outcome from a fair coin.', correct: false, rationale: 'This ignores the low prior 1/1000; the proper Bayes update yields about 0.506, not near-certainty.' },
  ],
  'ch4-4-3-03-fair-probability-from-an-unfair-coin': [
    { id: 'a', text: 'Toss the coin twice and map HT to "win," TH to "loss," and re-toss on HH or TT, since P(HT) = P(TH) regardless of bias.', correct: true, rationale: 'Both ordered pairs have probability p_h·p_t by independence, so conditioning on HT or TH gives 1/2 exactly.' },
    { id: 'b', text: 'Toss the coin once and declare H a win; this gives fair odds only when p_h is exactly 1/2.', correct: false, rationale: 'The coin is biased, so a single toss cannot produce 1/2 outcomes without knowing the bias.' },
    { id: 'c', text: 'Toss the coin many times and take the majority outcome to approximate a fair sample.', correct: false, rationale: 'The majority outcome is still biased toward the more likely side and does not give exactly fair odds.' },
    { id: 'd', text: 'Toss twice and map HH to "win," TT to "loss," discarding HT and TH as inconclusive.', correct: false, rationale: 'P(HH) = p_h² ≠ p_t² = P(TT) unless the coin is already fair, so this is biased.' },
  ],
  'ch4-4-3-04-dart-game': [
    { id: 'a', text: 'The probability the next throw is also farther than the first is n/(n+1), since the (n+1)th is equally likely to be any rank among n+1 throws.', correct: true, rationale: 'By symmetry each throw is equally likely to be the best, so P(next is not best) = 1 - 1/(n+1) = n/(n+1).' },
    { id: 'b', text: 'The probability is 1/2, since each new dart is independently closer or farther than the first.', correct: false, rationale: 'This ignores the conditioning that the first n throws are monotone-increasing from the first.' },
    { id: 'c', text: 'The probability is 1/(n+1), the chance the new throw breaks the increasing pattern.', correct: false, rationale: 'This is the probability the new throw is the best of all n+1, which is the complement of the event asked.' },
    { id: 'd', text: 'The probability is (n-1)/n, using the rank symmetry only among the existing n throws.', correct: false, rationale: 'The relevant universe is n+1 throws, not n; the denominator should be n+1.' },
  ],
  'ch4-4-3-05-birthday-line': [
    { id: 'a', text: 'The optimal position is n = 20, the unique value satisfying both P(n) > P(n-1) and P(n) > P(n+1).', correct: true, rationale: 'Solving the inequalities gives n² - 3n - 363 < 0 and n² - n - 365 > 0, both met only at n = 20.' },
    { id: 'b', text: 'The optimal position is n = 23 because that\'s when P(birthday match) first exceeds 1/2.', correct: false, rationale: 'The birthday threshold 23 is for any match; here we want you specifically to match, which peaks earlier.' },
    { id: 'c', text: 'The optimal position is n = 1 (first in line), since earlier positions have higher unconditional win probability.', correct: false, rationale: 'Position 1 gives zero win probability because no tickets have yet been sold; the win probability rises then falls.' },
    { id: 'd', text: 'The optimal position is n = 365, covering the full calendar to guarantee a match.', correct: false, rationale: 'By n=365 the "no prior match" event has negligible probability, so P(n) is tiny there.' },
  ],
  'ch4-4-3-06-dice-order': [
    { id: 'a', text: 'The probability of strictly increasing results is 5/54, obtained as P(all different) · 1/3! = (5/9)·(1/6).', correct: true, rationale: 'P(all three values differ) = 30/36 = 5/9, and conditional on that, exactly one of 3! orderings is increasing.' },
    { id: 'b', text: 'The probability is 1/6 = 1/3!, the chance the outcomes are already sorted.', correct: false, rationale: 'This forgets to multiply by P(all three values differ), ignoring equal-value ties.' },
    { id: 'c', text: 'The probability is 6·5·4/6^3 = 5/9, which is P(all three values differ).', correct: false, rationale: 'This counts all-distinct orderings but forgets that only 1 of 3! orderings is strictly increasing.' },
    { id: 'd', text: 'The probability is (1/6)^3 = 1/216, the chance of any specific ordered outcome.', correct: false, rationale: 'Many distinct ordered outcomes are strictly increasing, so the probability sums C(6,3) such triples, not just one.' },
  ],
  'ch4-4-3-07-monty-hall-problem': [
    { id: 'a', text: 'You should switch, winning with probability 2/3 since switching wins exactly when your initial pick was a goat.', correct: true, rationale: 'Your first pick is a goat with probability 2/3, and Monty\'s reveal then forces the remaining door to hide the car.' },
    { id: 'b', text: 'It does not matter; the remaining two doors are equally likely (1/2 each) to hide the car.', correct: false, rationale: 'This treats Monty\'s reveal as uninformative, but his choice is constrained by the known goat location, breaking symmetry.' },
    { id: 'c', text: 'You should stay, since switching can only cost you the door you already correctly chose.', correct: false, rationale: 'P(initial pick is car) = 1/3, so staying wins only 1/3 of the time; switching is strictly better.' },
    { id: 'd', text: 'You should switch, because Monty\'s action is independent of your original choice and raises your odds to 3/4.', correct: false, rationale: 'The correct switching probability is 2/3, not 3/4; Monty\'s action is not independent of your initial pick.' },
  ],
  'ch4-4-3-08-amoeba-population': [
    { id: 'a', text: 'The extinction probability satisfies P(E)³ + P(E)² − 3P(E) + 1 = 0, giving P(E) = √2 − 1 ≈ 0.414.', correct: true, rationale: 'Conditioning on the first-minute outcomes yields a cubic whose only root in (0,1) is √2-1.' },
    { id: 'b', text: 'The extinction probability is 1/4, the probability the amoeba dies on its first step.', correct: false, rationale: 'This ignores eventual extinction through subsequent generations after splitting or staying.' },
    { id: 'c', text: 'The extinction probability is 1, since the expected growth factor (0+1+2+3)/4 = 3/2 exceeds 1.', correct: false, rationale: 'When mean offspring > 1, extinction probability is strictly less than 1, not 1.' },
    { id: 'd', text: 'The extinction probability is 1/2, by symmetry between extinction and indefinite growth.', correct: false, rationale: 'There is no such symmetry in a branching process; the correct value comes from the fixed-point equation.' },
  ],
  'ch4-4-3-09-candies-in-a-jar': [
    { id: 'a', text: 'P = 7/12, from 1/3 (last is green, red before blue) + 1/4 (last is blue, red before green).', correct: true, rationale: 'Split into the two mutually exclusive cases for which color ends last and apply symmetry within each.' },
    { id: 'b', text: 'P = 1/3, assuming the last candy is green.', correct: false, rationale: 'Incomplete: ignores the case where the last candy is blue, so it drops the 1/4 contribution.' },
    { id: 'c', text: 'P = 10/60 = 1/6, the probability a red candy is in the last position.', correct: false, rationale: 'Confuses "last is red" with "last red precedes the last blue and last green."' },
    { id: 'd', text: 'P = 1/2, by symmetry among the three colors.', correct: false, rationale: 'Symmetry does not apply because the three colors have different counts, breaking equal likelihood.' },
  ],
  'ch4-4-3-10-coin-toss-game-ht': [
    { id: 'a', text: 'P(A wins) = 4/9.', correct: true, rationale: 'Conditioning on A then B yields P(A|H)=1/3 and then P(A)=1/6+1/2−P(A)/2, giving 4/9.' },
    { id: 'b', text: 'P(A wins) = 1/2, since A and B alternate with a fair coin.', correct: false, rationale: 'Naive symmetry fails: A cannot win on the first flip, so the two positions are not symmetric.' },
    { id: 'c', text: 'P(A wins) = 5/9, because A moves first.', correct: false, rationale: 'Flips the answer: A is actually disadvantaged since the winner is the tosser of the T, not the H.' },
    { id: 'd', text: 'P(A wins) = 2/3, using a geometric series on A-tosses.', correct: false, rationale: 'Ignores the HT pattern dependence on who tossed the prior H, so independence between rounds is wrongly assumed.' },
  ],
  'ch4-4-3-11-aces': [
    { id: 'a', text: 'P = (39 × 26 × 13)/(51 × 50 × 49) ≈ 10.55%.', correct: true, rationale: 'Sequentially condition on where each ace lands: 2nd ace must avoid the 1st ace\'s pile, etc.' },
    { id: 'b', text: 'P = 4!·(13/52)⁴ ≈ 9.4%, assuming aces are placed independently into piles.', correct: false, rationale: 'Wrongly assumes independence; in a shuffled deal the aces\' placements are dependent due to fixed 13-card piles.' },
    { id: 'c', text: 'P = C(48,9)·C(48,9)·C(48,9)·C(48,9)/C(52,13)⁴ ≈ 6%.', correct: false, rationale: 'Double-counts by treating the four hands as independent draws of 13 from 52 instead of a partition.' },
    { id: 'd', text: 'P = 1/4⁴ = 1/256 ≈ 0.39%.', correct: false, rationale: 'Treats each ace as independently uniform over 4 piles, ignoring the fixed 13-card capacity constraint.' },
  ],
  'ch4-4-3-12-gambler-s-ruin': [
    { id: 'a', text: 'Pᵢ = [1−(q/p)ⁱ]/[1−(q/p)ᴺ] when p ≠ 1/2, and Pᵢ = i/N when p = 1/2.', correct: true, rationale: 'Solves the difference equation Pᵢ = p·Pᵢ₊₁ + q·Pᵢ₋₁ with boundaries P₀=0, Pₙ=1.' },
    { id: 'b', text: 'Pᵢ = i/N for all p, by linearity of expectation on the stopping time.', correct: false, rationale: 'Only correct for the fair case p = 1/2; biased walks produce geometric-ratio solutions.' },
    { id: 'c', text: 'Pᵢ = pⁱ(1−p)^(N−i), the binomial probability of exactly the right net gain.', correct: false, rationale: 'Confuses reaching a specific boundary with a single binomial path count; gambler\'s ruin integrates over many paths.' },
    { id: 'd', text: 'Pᵢ = 1 − (q/p)^(N−i), ignoring the lower boundary at 0.', correct: false, rationale: 'Drops the P₀=0 boundary condition, which is required to pin down the constants.' },
  ],
  'ch4-4-3-13-basketball-scores': [
    { id: 'a', text: 'P(exactly 50 baskets in 100 throws) = 1/99.', correct: true, rationale: 'Induction shows P(n,k) = 1/(n−1) for all k = 1,...,n−1, giving a uniform distribution over feasible totals.' },
    { id: 'b', text: 'P = C(100,50)(1/2)¹⁰⁰, treating each throw as a fair independent Bernoulli.', correct: false, rationale: 'Assumes independence; here the shot probability depends on the running score so trials are not IID.' },
    { id: 'c', text: 'P = 1/100, since all counts 0..99 are equally likely.', correct: false, rationale: 'Off-by-one: only counts 1..99 are achievable (impossible to stay at 0 or reach 100), so each has probability 1/99.' },
    { id: 'd', text: 'P = 50/99, proportional to the count.', correct: false, rationale: 'Uses the wrong uniform weighting on k; the distribution is uniform so every k has the same mass.' },
  ],
  'ch4-4-3-14-cars-on-a-road': [
    { id: 'a', text: 'P(car in 5 min) = 3/5, since (1−p)⁴ = 16/625 gives 1−p = 2/5.', correct: true, rationale: 'Partition the 20-minute window into four independent 5-minute blocks, each with no-car probability 1−p.' },
    { id: 'b', text: 'P(car in 5 min) = (609/625)/4 ≈ 24.4%, dividing the 20-min probability by 4.', correct: false, rationale: 'Probabilities of "at least one" do not scale linearly with time; you must use independence on the complements.' },
    { id: 'c', text: 'P(car in 5 min) = 609/2500, rescaling the numerator by 4.', correct: false, rationale: 'Same linear-scaling error applied differently; the correct relation is multiplicative on (1−p).' },
    { id: 'd', text: 'P(car in 5 min) = 2/5, the complement of p.', correct: false, rationale: 'Complement error: 2/5 is 1−p, not p itself.' },
  ],
  'ch4-4-4-01-meeting-probability': [
    { id: 'a', text: 'P(meet) = 23/144, from 1 − (55/60)² = (60²−55²)/60².', correct: true, rationale: 'The no-meet region is two triangles with legs 55 on the 60×60 arrival square.' },
    { id: 'b', text: 'P(meet) = 5/60 = 1/12, because each banker stays 5 minutes in a 60-minute window.', correct: false, rationale: 'Ignores that both arrivals are random; the correct calculation integrates over both uniform variables jointly.' },
    { id: 'c', text: 'P(meet) = (5/60)² = 1/144, treating the stays as independent events.', correct: false, rationale: 'Misapplies independence: meeting depends on the difference of arrival times, not a product of two marginals.' },
    { id: 'd', text: 'P(meet) = 10/60 = 1/6, combining both 5-minute stays linearly.', correct: false, rationale: 'Adds window lengths without accounting for geometric overlap on the 2D uniform square.' },
  ],
  'ch4-4-4-02-probability-of-triangle': [
    { id: 'a', text: 'P(triangle) = 1/4, from the feasible region x<1/2, y>1/2, y<x+1/2 (and symmetric).', correct: true, rationale: 'The triangle inequality reduces to those constraints and their area in [0,1]² is 1/4.' },
    { id: 'b', text: 'P(triangle) = 1/2, since either cut order is symmetric.', correct: false, rationale: 'Doubles the half-square area to 1/2 but forgets that only a quarter of each half satisfies the triangle inequality.' },
    { id: 'c', text: 'P(triangle) = 1/8, counting only the case x<y in the unit square.', correct: false, rationale: 'Off-by-two: captures only the x<y half and forgets the symmetric y<x half that also contributes 1/8.' },
    { id: 'd', text: 'P(triangle) = 1/3, by symmetry among the three segments.', correct: false, rationale: 'No such three-way symmetry holds; the constraint is about the largest piece being less than 1/2.' },
  ],
  'ch4-4-4-03-poisson-process-and-memorylessness': [
    { id: 'a', text: 'Expected wait = 10 min; expected time since last bus = 10 min, by memorylessness.', correct: true, rationale: 'The exponential inter-arrival distribution is memoryless, so forward and backward waits each have mean 1/λ.' },
    { id: 'b', text: 'Expected wait = 5 min, because on average you arrive halfway between buses.', correct: false, rationale: 'Confuses arithmetic halving with the inspection paradox; random-time arrivals favor longer intervals.' },
    { id: 'c', text: 'Expected wait depends on how long ago the last bus arrived.', correct: false, rationale: 'Memorylessness of the exponential means past waiting time gives no information about future wait.' },
    { id: 'd', text: 'Expected wait = 20 min, since the total interval averages 20 min by summing forward and backward.', correct: false, rationale: 'The residual + age sum exceeds E[X] due to size-biased sampling, so neither piece equals 20.' },
  ],
  'ch4-4-4-04-moments-of-the-normal-distribution': [
    { id: 'a', text: 'E[X]=0, E[X²]=1, E[X³]=0, E[X⁴]=3.', correct: true, rationale: 'Derivatives of the MGF e^(t²/2) at 0 yield these moments; odd moments vanish by symmetry.' },
    { id: 'b', text: 'E[X]=0, E[X²]=1, E[X³]=0, E[X⁴]=1.', correct: false, rationale: 'Confuses E[X⁴] with (E[X²])² = 1; the correct kurtosis factor is 3 = (2k−1)!! at k=2.' },
    { id: 'c', text: 'E[X]=0, E[X²]=0, E[X³]=0, E[X⁴]=0.', correct: false, rationale: 'Applies the zero-mean symmetry to even moments too, which is wrong because E[X²] is the variance.' },
    { id: 'd', text: 'E[X]=1, E[X²]=1, E[X³]=1, E[X⁴]=1.', correct: false, rationale: 'Confuses a standard normal with a standard exponential; N(0,1) has mean 0, not 1.' },
  ],
  'ch4-4-5-01-connecting-noodles': [
    { id: 'a', text: 'E[loops] = 1 + 1/3 + 1/5 + ... + 1/199.', correct: true, rationale: 'The recursion E[f(n)] = E[f(n−1)] + 1/(2n−1) from the probability of self-connection unfolds into this odd-reciprocal sum.' },
    { id: 'b', text: 'E[loops] = 1 + 1/2 + 1/3 + ... + 1/100, the harmonic number H₁₀₀.', correct: false, rationale: 'Uses the wrong denominator (2n instead of 2n−1); forgets that only 1 of 2n−1 remaining ends closes a loop.' },
    { id: 'c', text: 'E[loops] = 100 × 1/199, linearity applied to a single loop indicator.', correct: false, rationale: 'Applies linearity once instead of recursing; undercounts loops created after earlier reductions.' },
    { id: 'd', text: 'E[loops] = 50, exactly half the noodles.', correct: false, rationale: 'Ad hoc guess with no probabilistic justification; the true value is ≈ log(200)/2 + γ/2 ≈ 3.3.' },
  ],
  'ch4-4-5-02-optimal-hedge-ratio': [
    { id: 'a', text: 'h* = ρ·σ_A/σ_B.', correct: true, rationale: 'First-order condition on σ_A² − 2ρhσ_Aσ_B + h²σ_B² gives this minimum-variance hedge.' },
    { id: 'b', text: 'h* = σ_A/σ_B, ignoring correlation.', correct: false, rationale: 'Wrongly assumes ρ = 1; if assets are uncorrelated or anti-correlated, this overhedges or mis-signs.' },
    { id: 'c', text: 'h* = ρ·σ_B/σ_A, inverting the volatility ratio.', correct: false, rationale: 'Flips the σ_A and σ_B roles; dimensional reasoning shows the hedge scales with A\'s volatility per unit of B.' },
    { id: 'd', text: 'h* = ρ², the squared correlation.', correct: false, rationale: 'Omits the volatility ratio entirely, so the units do not match shares of B.' },
  ],
  'ch4-4-5-03-dice-game': [
    { id: 'a', text: 'E[X] = 7, from E[X] = (1/2)(2) + (1/2)(5 + E[X]).', correct: true, rationale: 'Conditioning on the first roll being low or high and solving for E[X] gives 7.' },
    { id: 'b', text: 'E[X] = 3.5, the expected value of one fair die roll.', correct: false, rationale: 'Ignores the continuation rule; rolling again after 4/5/6 adds more expected winnings.' },
    { id: 'c', text: 'E[X] = 5, the average of 4, 5, 6 (the roll-again faces).', correct: false, rationale: 'Counts only the continuation branch and drops the stop-value contribution from 1, 2, 3.' },
    { id: 'd', text: 'E[X] = 2, since the game stops on average at roll value 2.', correct: false, rationale: 'Only counts the terminal roll and ignores accumulated payoffs from earlier 4/5/6 rolls.' },
  ],
  'ch4-4-5-04-card-game-first-ace': [
    { id: 'a', text: 'E[cards to first ace] = 1 + 48/5 = 10.6.', correct: true, rationale: 'The 4 aces split the deck into 5 uniform slots, so each non-ace sits before the first ace with probability 1/5.' },
    { id: 'b', text: 'E = 52/4 = 13, spacing aces evenly across the deck.', correct: false, rationale: 'Treats the first ace\'s position as the arithmetic mean spacing; the correct value uses slot symmetry 1 + m/(n+1).' },
    { id: 'c', text: 'E = 52/5 = 10.4.', correct: false, rationale: 'Off-by-one: includes the ace itself incorrectly; the correct form is 1 + 48/5, not (48+4)/5.' },
    { id: 'd', text: 'E = 1/(4/52) = 13, treating draws as geometric with replacement.', correct: false, rationale: 'Uses with-replacement geometric expectation, but this problem is without replacement.' },
  ],
  'ch4-4-5-05-sum-of-random-variables': [
    { id: 'a', text: 'P(X₁ + ... + Xₙ < 1) = 1/n!.', correct: true, rationale: 'Induction via conditioning on Xₙ₊₁ scales the (n−1)-volume result by (1−x)ⁿ, integrating to 1/(n+1)!.' },
    { id: 'b', text: 'P = 1/2ⁿ, the probability each Xᵢ < 1/2 independently.', correct: false, rationale: 'Confuses the event Σ<1 with each individual Xᵢ being small, ignoring all cross terms.' },
    { id: 'c', text: 'P = 1/n, linear in dimension.', correct: false, rationale: 'The simplex volume shrinks factorially, not linearly; 1/n overstates the probability for n ≥ 2.' },
    { id: 'd', text: 'P = (1/2)ⁿ⁻¹.', correct: false, rationale: 'Uses the wrong base rate; the correct simplex volume is 1/n!, not 2^{−(n−1)}.' },
  ],
  'ch4-4-5-06-coupon-collection': [
    { id: 'a', text: 'E[collect all] = N·Hₙ; E[distinct after n] = N·[1 − (1−1/N)ⁿ].', correct: true, rationale: 'The first is a sum of geometric waits; the second is via indicator variables for each type appearing.' },
    { id: 'b', text: 'E[collect all] = N and E[distinct after n] = n.', correct: false, rationale: 'Ignores the increasing difficulty of finding new types as collection progresses.' },
    { id: 'c', text: 'E[collect all] = N·log(N) exactly; E[distinct after n] = n/N.', correct: false, rationale: 'The asymptotic N·log(N) drops the harmonic\'s γ term; and n/N is the wrong scale for distinct count.' },
    { id: 'd', text: 'E[collect all] = N²; E[distinct after n] = N·(1−1/N)ⁿ.', correct: false, rationale: 'Quadratic N² overstates by a factor of log N; the second is P(type missing), not its complement.' },
  ],
  'ch4-4-5-07-joint-default-probability': [
    { id: 'a', text: 'P(A∪B) ∈ [0.5, 0.8] and ρ ∈ [−√(3/7), +√(3/7)].', correct: true, rationale: 'Max occurs when defaults are disjoint (0.8), min when B⊂A (0.5), and ρ is back-solved from P(A∪B).' },
    { id: 'b', text: 'P(A∪B) ∈ [0.15, 0.8] and ρ ∈ [−1, +1].', correct: false, rationale: 'Uses ρ = ±1 bounds and inclusion-exclusion directly, which are infeasible for Bernoulli indicators with these means.' },
    { id: 'c', text: 'P(A∪B) = 0.65 uniquely, since P(A)+P(B)−P(A)P(B) = 0.65.', correct: false, rationale: 'Assumes independence without justification; the question asks for the feasible range.' },
    { id: 'd', text: 'P(A∪B) ∈ [0.5, 1.0], with ρ∈[-1,1].', correct: false, rationale: 'The union cannot exceed P(A)+P(B) = 0.8, so the upper bound 1.0 is impossible.' },
  ],
  'ch4-4-6-01-expected-value-of-max-and-min': [
    { id: 'a', text: 'E[max] = n/(n+1), E[min] = 1/(n+1).', correct: true, rationale: 'Integrate x·n·xⁿ⁻¹ and x·n·(1−x)ⁿ⁻¹ on [0,1] to get these order-statistic means.' },
    { id: 'b', text: 'E[max] = 1/2 and E[min] = 1/2, matching the Uniform[0,1] mean.', correct: false, rationale: 'The max and min are not individual Xᵢ; their distributions shift toward 1 and 0 respectively.' },
    { id: 'c', text: 'E[max] = 1 − 1/n, E[min] = 1/n.', correct: false, rationale: 'Off-by-one in the denominator; the exact values use n+1, not n.' },
    { id: 'd', text: 'E[max] = n, E[min] = 1/n.', correct: false, rationale: 'n cannot exceed 1 on Uniform[0,1], so E[max] = n is outside the support.' },
  ],
  'ch4-4-6-02-correlation-of-max-and-min': [
    { id: 'a', text: 'corr(Y,Z) = 1/2, and P(Y>y|Z<z) = (z−y)²/z² for 0<y<z≤1.', correct: true, rationale: 'Cov = 1/36 and Var(Y) = Var(Z) = 1/18, and the conditional probability is the ratio of the (z−y)² square to the z² region.' },
    { id: 'b', text: 'corr(Y,Z) = 0, since X₁ and X₂ are independent.', correct: false, rationale: 'Independence of X₁, X₂ does not imply independence of the nonlinear functions Y = min and Z = max.' },
    { id: 'c', text: 'corr(Y,Z) = 1, because Y ≤ Z always.', correct: false, rationale: 'A deterministic inequality is not perfect linear dependence; Y and Z can move in different magnitudes.' },
    { id: 'd', text: 'corr(Y,Z) = 1/3, and P(Y>y|Z<z) = (z−y)/z.', correct: false, rationale: 'Uses linear rather than quadratic scaling for the geometric region, which is a 2D area.' },
  ],
  'ch4-4-6-03-random-ants': [
    { id: 'a', text: 'E[T] = 500/501 minutes.', correct: true, rationale: 'Collisions act as pass-throughs by symmetry of labels, reducing the problem to E[max of 500 Uniform[0,1]] = n/(n+1).' },
    { id: 'b', text: 'E[T] = 1 minute, the worst-case traversal across the string.', correct: false, rationale: 'Ignores that positions are uniform; no ant starts exactly at an end, so the expectation is strictly below 1.' },
    { id: 'c', text: 'E[T] = 1/2 minute, since each ant walks at most half the string on average.', correct: false, rationale: 'Confuses the mean fall-off time of a single ant with the maximum over 500 ants.' },
    { id: 'd', text: 'E[T] = 1/500 minute, decreasing with more ants.', correct: false, rationale: 'The max of more samples increases (not decreases); this is the E[min] formula applied incorrectly.' },
  ],
};

export default chapter4Choices;
