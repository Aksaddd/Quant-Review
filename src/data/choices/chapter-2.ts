import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 2 (Brain Teasers).
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter2Choices: Record<string, Choice[]> = {
  'ch2-01-screwy-pirates': [
    {
      id: 'a',
      text: 'Pirate 5 keeps 98 coins; pirates 1 and 3 each get 1 coin; pirates 2 and 4 get nothing.',
      correct: true,
      rationale: 'Backward induction from the 4-pirate case (where pirates 1 and 3 get 0) means pirate 5 only needs to bribe them with 1 coin each.',
    },
    {
      id: 'b',
      text: 'Pirate 5 keeps all 100 coins; his seniority alone passes the vote.',
      correct: false,
      rationale: 'Seniority does not weight votes — pirate 5 still needs at least 3 of 5 votes, so he must bribe two others.',
    },
    {
      id: 'c',
      text: 'Pirate 5 keeps 97 and gives 1 coin each to pirates 1, 2, and 3.',
      correct: false,
      rationale: 'Bribing pirate 2 is wasted — pirate 2 already gets 1 coin in the 4-pirate fallback, so pirate 4 is cheaper to bribe instead (actually pirates 1 and 3 are cheapest since they get 0).',
    },
    {
      id: 'd',
      text: 'Pirate 5 keeps 99 and gives 1 coin to pirate 1 only.',
      correct: false,
      rationale: 'Only 2 of 5 votes (pirates 1 and 5) is not a majority — pirate 5 needs at least 3 votes.',
    },
  ],
  'ch2-02-tiger-and-sheep': [
    {
      id: 'a',
      text: 'The sheep will NOT be eaten, because 100 is even and no tiger will risk becoming the next sheep.',
      correct: true,
      rationale: 'By induction, when the tiger count is even the would-be eater would become a sheep among an odd number of tigers, where it gets eaten — so no tiger eats.',
    },
    {
      id: 'b',
      text: 'The sheep will be eaten immediately by the hungriest tiger.',
      correct: false,
      rationale: 'Tigers prioritize survival over hunger, and eating transforms the tiger into a sheep that would be eaten next.',
    },
    {
      id: 'c',
      text: 'The sheep will be eaten because with 100 tigers there is always at least one willing to sacrifice.',
      correct: false,
      rationale: 'All tigers are perfectly rational and value survival first — none will sacrifice itself.',
    },
    {
      id: 'd',
      text: 'The sheep will be eaten only if the tigers coordinate; otherwise it is safe.',
      correct: false,
      rationale: 'The outcome follows purely from individual rationality and the parity of n — no coordination is required.',
    },
  ],
  'ch2-03-river-crossing': [
    {
      id: 'a',
      text: '17 minutes: C and D cross; D returns; A and B cross; C returns; C and D cross.',
      correct: true,
      rationale: 'Pairing the two slowest (A and B) on a single crossing, with the two fastest shuttling the torch, yields 2+1+10+2+2 = 17.',
    },
    {
      id: 'b',
      text: '19 minutes: D shuttles each slow person across one at a time.',
      correct: false,
      rationale: 'Using D as a lone ferry forces A and B to cross on separate trips, adding the slowest pair twice to the total.',
    },
    {
      id: 'c',
      text: '15 minutes: A and D cross, D returns, B and C cross, C returns, C and D cross.',
      correct: false,
      rationale: 'This counts incorrectly — A + D = 10 min (not 1), so the total is actually 10+1+5+2+2 = 20 minutes.',
    },
    {
      id: 'd',
      text: '13 minutes: everyone crosses in one trip since the bridge holds two.',
      correct: false,
      rationale: 'The bridge holds at most 2, so four people require multiple trips with the torch.',
    },
  ],
  'ch2-04-birthday-problem': [
    {
      id: 'a',
      text: 'September 1.',
      correct: true,
      rationale: 'Your first statement eliminates Jun and Dec (they contain unique days 7 and 2); C\'s knowing then eliminates day 5; your knowing eliminates March (two candidates remained) — leaving Sep 1.',
    },
    {
      id: 'b',
      text: 'June 7.',
      correct: false,
      rationale: 'Jun 7 is ruled out by your first statement — if C had day 7, C would know immediately, contradicting your certainty.',
    },
    {
      id: 'c',
      text: 'March 4.',
      correct: false,
      rationale: 'After C\'s deduction, March still has two candidates (Mar 4 and Mar 8), so you could not identify the birthday from March.',
    },
    {
      id: 'd',
      text: 'December 1.',
      correct: false,
      rationale: 'December contains Dec 2 (unique day 2), so your first statement rules out December entirely.',
    },
  ],
  'ch2-05-card-game': [
    {
      id: 'a',
      text: '$0 — the game always ends in a tie, so you can never win.',
      correct: true,
      rationale: 'The deck has equal reds and blacks, and mixed discards remove one of each — so your pile (reds) always equals the dealer\'s pile (blacks).',
    },
    {
      id: 'b',
      text: '$50, since the game is symmetric and your expected winnings are half the prize.',
      correct: false,
      rationale: 'Symmetry here forces a guaranteed tie (not a 50/50 win) — expected winnings are 0.',
    },
    {
      id: 'c',
      text: 'Up to $25, reflecting variance in how many pairs land in each pile.',
      correct: false,
      rationale: 'There is no variance in the margin — the invariant forces exact equality regardless of order.',
    },
    {
      id: 'd',
      text: 'The casino should pay you, because discarding mixed pairs gives you an edge.',
      correct: false,
      rationale: 'Discarded mixed pairs remove one red and one black equally, preserving equality — no edge arises.',
    },
  ],
  'ch2-06-burning-ropes': [
    {
      id: 'a',
      text: 'Light rope 1 at both ends and rope 2 at one end simultaneously; when rope 1 finishes (30 min), light rope 2\'s other end — it finishes 15 min later for 45 min total.',
      correct: true,
      rationale: 'Burning from both ends halves the remaining time regardless of rate, giving 30 + 15 = 45 min precisely.',
    },
    {
      id: 'b',
      text: 'Light rope 1 at one end; when it is halfway burned by length, light rope 2 — wait for rope 2 to finish.',
      correct: false,
      rationale: 'The ropes burn non-uniformly, so a halfway-by-length mark does not correspond to 30 minutes of burn time.',
    },
    {
      id: 'c',
      text: 'Light both ropes at one end simultaneously; wait until rope 1 finishes and stop rope 2 at three-quarters its length.',
      correct: false,
      rationale: 'You cannot visually identify a time-based fraction of the non-uniform rope 2.',
    },
    {
      id: 'd',
      text: 'Light rope 1 at both ends; when it finishes (30 min), light rope 2 at one end and wait the full hour for 90 min total.',
      correct: false,
      rationale: 'This measures 90 minutes, not 45.',
    },
  ],
  'ch2-07-defective-ball': [
    {
      id: 'a',
      text: '3 weighings suffice, using a divide-into-thirds decision tree that also determines heavier vs. lighter.',
      correct: true,
      rationale: 'Each weighing has 3 outcomes giving log_3 information; (3^3 - 3)/2 = 12 covers both identity and heavy/light.',
    },
    {
      id: 'b',
      text: '4 weighings are needed because we also have to determine heavier vs. lighter.',
      correct: false,
      rationale: 'A careful 3-weighing decision tree simultaneously finds the ball and its heavy/light status within the 24 distinguishable outcomes.',
    },
    {
      id: 'c',
      text: '2 weighings suffice if the first split is 6 vs 6.',
      correct: false,
      rationale: '6 vs 6 always tips (no balanced outcome) and wastes information — 2 weighings give only 9 outcomes, insufficient for 24 possibilities.',
    },
    {
      id: 'd',
      text: '3 weighings suffice, but only if you already know the defective ball is heavier.',
      correct: false,
      rationale: 'The standard 12-ball solution handles the unknown heavy/light case within 3 weighings, not only the known case.',
    },
  ],
  'ch2-08-trailing-zeros': [
    {
      id: 'a',
      text: '24 trailing zeros.',
      correct: true,
      rationale: 'Legendre\'s formula: floor(100/5) + floor(100/25) = 20 + 4 = 24 factors of 5 (2s are in excess).',
    },
    {
      id: 'b',
      text: '20 trailing zeros.',
      correct: false,
      rationale: 'This counts only multiples of 5 (100/5 = 20) but misses the extra factor from multiples of 25.',
    },
    {
      id: 'c',
      text: '25 trailing zeros.',
      correct: false,
      rationale: 'Off by one — Legendre\'s formula gives 20 + 4 = 24, not 25.',
    },
    {
      id: 'd',
      text: '10 trailing zeros.',
      correct: false,
      rationale: 'This confuses the count with multiples of 10 in [1,100] rather than the prime factor 5 count.',
    },
  ],
  'ch2-09-horse-race': [
    {
      id: 'a',
      text: '7 races: 5 group races, 1 race of group winners, then 1 final race of the 5 remaining candidates.',
      correct: true,
      rationale: 'After the winners\' race, eliminations leave exactly 5 candidates for places 2 and 3, fitting into one last race.',
    },
    {
      id: 'b',
      text: '6 races: 5 group races plus 1 race of the group winners.',
      correct: false,
      rationale: 'The winners\' race only identifies #1 overall — 5 other horses remain candidates for 2nd/3rd, requiring a 7th race.',
    },
    {
      id: 'c',
      text: '11 races: 5 group races plus 5 runoff races plus 1 final.',
      correct: false,
      rationale: 'Most runoffs are unnecessary — structured elimination after the winners\' race reduces to a single final race.',
    },
    {
      id: 'd',
      text: '5 races: each group race reveals its fastest, and those 5 group winners include the top 3 overall.',
      correct: false,
      rationale: 'The overall 2nd and 3rd fastest could be in the same group as the overall winner — group winners do not automatically include the global top 3.',
    },
  ],
  'ch2-10-infinite-sequence': [
    {
      id: 'a',
      text: 'x = sqrt(2).',
      correct: true,
      rationale: 'The exponent on the first x is itself the whole tower, which equals 2, so x^2 = 2 and x = sqrt(2).',
    },
    {
      id: 'b',
      text: 'x = 2.',
      correct: false,
      rationale: 'That would make x^2 = 4, not 2 — the tower would diverge from 2.',
    },
    {
      id: 'c',
      text: 'x = root(2, 2) = 1 (no real solution exists).',
      correct: false,
      rationale: 'A real positive solution does exist: sqrt(2) satisfies the fixed-point equation and lies within the convergence range.',
    },
    {
      id: 'd',
      text: 'x = 2^(1/4).',
      correct: false,
      rationale: 'This comes from mistakenly setting x^(x^x) ≈ 2 with only two layers — the infinite self-similar substitution gives x^2 = 2 instead.',
    },
  ],
  'ch2-11-box-packing': [
    {
      id: 'a',
      text: 'No — a 3D checkerboard coloring of 27 sub-cubes shows at most 52 bricks fit; the 53rd is impossible.',
      correct: true,
      rationale: 'Each 1x1x4 brick spans two opposite-color 2x2x2 sub-cubes, and only 13 sub-cubes of the minority color exist, capping the count at 13*4 = 52.',
    },
    {
      id: 'b',
      text: 'Yes — the total volume 53*4 = 212 is under 216, so it fits.',
      correct: false,
      rationale: 'Sufficient volume does not imply packability; the coloring invariant rules out 53.',
    },
    {
      id: 'c',
      text: 'Yes — align all 53 bricks in one direction along the length-6 axis.',
      correct: false,
      rationale: 'Length-6 rows only hold one 1x1x4 brick each (since 4+4 > 6), so 36 rows fit at most 36 bricks axially, not 53.',
    },
    {
      id: 'd',
      text: 'No — the bricks cannot tile the 6x6x6 box because 4 does not divide 6.',
      correct: false,
      rationale: 'Divisibility alone is not the blocker — 1x1x4 bricks do not need 4 | 6 to fit; the real obstruction is the coloring argument.',
    },
  ],
  'ch2-12-calendar-cubes': [
    {
      id: 'a',
      text: 'Cube 1: {0,1,2,3,4,5}. Cube 2: {0,1,2,6,7,8}, using the 6 flipped upside down as a 9.',
      correct: true,
      rationale: 'Both cubes need 0, 1, 2 to cover 11, 22 and 01-09; the remaining 7 digits (3-9) fit on 6 faces by reusing 6 as 9.',
    },
    {
      id: 'b',
      text: 'Cube 1: {0,1,2,3,4,5}. Cube 2: {3,4,5,6,7,8}, with 9 omitted entirely.',
      correct: false,
      rationale: 'Without a 9 (or flipped 6) you cannot display the 9th, 19th, or 29th; also cube 2 lacks 0, 1, 2 needed for 11, 22, 01-09.',
    },
    {
      id: 'c',
      text: 'Cube 1: {0,1,2,3,4,9}. Cube 2: {0,5,6,7,8,9}, giving both cubes a 9.',
      correct: false,
      rationale: 'This fails 11 and 22 (cube 2 has no 1 or 2) and wastes faces by duplicating 9 instead of reusing 6/9.',
    },
    {
      id: 'd',
      text: 'Use three small cubes instead; two 6-sided cubes cannot cover 01-31.',
      correct: false,
      rationale: 'Two cubes do suffice via the 6/9 flip trick — a third cube is unnecessary.',
    },
  ],
  'ch2-13-door-to-offer': [
    {
      id: 'a',
      text: 'Ask either guard: "Would the other guard say this door leads to the offer?" If No, take this door; if Yes, take the other.',
      correct: true,
      rationale: 'The double-negation forces a reliable inverted answer regardless of which guard you questioned, so No always points to the offer door.',
    },
    {
      id: 'b',
      text: 'Ask either guard: "Does this door lead to the offer?" Take the door if they say Yes.',
      correct: false,
      rationale: 'Without knowing whether the guard lies or tells the truth, a single direct question gives no reliable information.',
    },
    {
      id: 'c',
      text: 'Ask: "Are you the truth-teller?" If Yes, trust their door; if No, take the other door.',
      correct: false,
      rationale: 'Both guards answer "Yes" to this question (truth-teller truthfully, liar falsely), so it distinguishes nothing.',
    },
    {
      id: 'd',
      text: 'Ask either guard: "Would the other guard say this door leads to the offer?" If Yes, take this door; if No, take the other.',
      correct: false,
      rationale: 'The direction is inverted — the double negation makes Yes point to the exit door, not the offer.',
    },
  ],
  'ch2-14-message-delivery': [
    {
      id: 'a',
      text: 'Lock the box with your padlock and send it; colleague adds their padlock and returns it; you remove your padlock and send again; colleague opens theirs.',
      correct: true,
      rationale: 'The box is always secured by at least one lock the messenger cannot open, and no key ever travels with the box.',
    },
    {
      id: 'b',
      text: 'Put your key in the locked box along with the document and send it in one trip.',
      correct: false,
      rationale: 'Keys placed inside a locked box are inaccessible to the colleague, and putting the key in the box is equivalent to giving it to the messenger when they break the lock.',
    },
    {
      id: 'c',
      text: 'Send the box unlocked but hidden under other packages so the messenger won\'t notice.',
      correct: false,
      rationale: 'Anything in an unlocked box is stolen by assumption, so concealment is not a valid security method.',
    },
    {
      id: 'd',
      text: 'Send your padlock first; colleague locks the document with it and returns the box; you open with your key.',
      correct: false,
      rationale: 'Sending the padlock separately exposes the lock to theft, and the colleague cannot lock it with your open padlock anyway (the scheme relies on dual-locking).',
    },
  ],
  'ch2-15-last-ball': [
    {
      id: 'a',
      text: '14 red (even start) leaves a BLUE last ball; 13 red (odd start) leaves a RED last ball.',
      correct: true,
      rationale: 'The parity of red balls is invariant — it either stays the same or decreases by 2 — so the last ball\'s color matches the starting parity of R.',
    },
    {
      id: 'b',
      text: 'Both scenarios leave a BLUE ball because blue starts with a larger count.',
      correct: false,
      rationale: 'The outcome depends on the parity of red balls, not on which color is more numerous — 13 red is odd, forcing a red final ball.',
    },
    {
      id: 'c',
      text: 'The final color is random; neither is guaranteed because the draws are random.',
      correct: false,
      rationale: 'Despite random draws, the parity invariant of red balls deterministically fixes the final color.',
    },
    {
      id: 'd',
      text: '14 red (even) leaves RED; 13 red (odd) leaves BLUE.',
      correct: false,
      rationale: 'The parity mapping is inverted — an odd number of reds ends on red, not blue.',
    },
  ],
  'ch2-16-light-switches': [
    {
      id: 'a',
      text: 'One entry: turn on switches 1 and 2, wait, turn off 2 and turn on 3, then enter and use on/off plus hot/cold to identify all four.',
      correct: true,
      rationale: 'The bulb provides two independent binary channels (current state and thermal history), encoding 4 distinct outcomes that map 1-to-1 to the 4 switches.',
    },
    {
      id: 'b',
      text: 'Two entries: each entry distinguishes between two switches, and log_2(4) = 2.',
      correct: false,
      rationale: 'This ignores the bulb\'s thermal memory, which acts as a second free bit of information usable within a single entry.',
    },
    {
      id: 'c',
      text: 'Four entries: try each switch one at a time and check the bulb.',
      correct: false,
      rationale: 'Three entries would actually suffice with trial-and-error (once three are ruled out the fourth is known), but the thermal trick reduces it further to one.',
    },
    {
      id: 'd',
      text: 'Three entries: toggle one switch per trip and observe.',
      correct: false,
      rationale: 'Still suboptimal — the heat-based strategy enables a single entry.',
    },
  ],
  'ch2-17-quant-salary': [
    {
      id: 'a',
      text: 'Quant 1 adds a secret random R to their salary and passes it on; each quant adds their salary in turn; when it returns to Quant 1, they subtract R and divide by 8.',
      correct: true,
      rationale: 'R masks every intermediate sum so no one learns another salary, yet the final total is recovered exactly by the one person who knows R.',
    },
    {
      id: 'b',
      text: 'Each quant publicly announces their salary and the group computes the average.',
      correct: false,
      rationale: 'This reveals every individual salary, violating the privacy requirement.',
    },
    {
      id: 'c',
      text: 'Have a trusted outsider collect each salary privately, then announce the average.',
      correct: false,
      rationale: 'Requires trusting an outside party — a weaker guarantee than a purely cryptographic protocol using only the 8 quants.',
    },
    {
      id: 'd',
      text: 'Each quant picks an independent random number and adds it to their salary before passing along; at the end take the average directly.',
      correct: false,
      rationale: 'Without a mechanism to subtract the random masks, the final total is polluted by unknown noise and no correct average can be recovered.',
    },
  ],
  'ch2-18-coin-piles': [
    {
      id: 'a',
      text: 'Take any 20 coins, flip them all, and call that pile 1; the remaining 980 coins are pile 2.',
      correct: true,
      rationale: 'If m of the 20 chosen were heads, flipping makes pile 1 have 20-m heads and pile 2 also has 20-m heads (the original heads you didn\'t take) — always equal.',
    },
    {
      id: 'b',
      text: 'Take any 10 coins, flip them all — both piles will have the same heads count.',
      correct: false,
      rationale: 'The flipped-pile size must equal the number of heads (20), not half of it; flipping 10 generally yields unequal counts.',
    },
    {
      id: 'c',
      text: 'Take any 500 coins without flipping; by symmetry the heads split evenly.',
      correct: false,
      rationale: 'A random 500-coin sample has unequal heads count with high probability — there is no guarantee without the flip trick.',
    },
    {
      id: 'd',
      text: 'Take any 20 coins without flipping; each pile will contain exactly 10 heads.',
      correct: false,
      rationale: 'You cannot control which coins in the chosen 20 are heads; the heads counts will not equalize without flipping.',
    },
  ],
  'ch2-19-mislabeled-bags': [
    {
      id: 'a',
      text: '1 pick, taken from the bag labeled "mix."',
      correct: true,
      rationale: 'The mix label must be wrong, so the bag is purely one fruit — that single pick identifies it and the other two follow by elimination since all labels are wrong.',
    },
    {
      id: 'b',
      text: '2 picks, one from each of two bags.',
      correct: false,
      rationale: 'The mislabel constraint on the "mix" bag is strong enough that a single pick cascades to identify all three — one pick suffices.',
    },
    {
      id: 'c',
      text: '3 picks, one from each bag.',
      correct: false,
      rationale: 'This ignores the logical constraint that all bags are mislabeled, which reduces the problem to a single pick.',
    },
    {
      id: 'd',
      text: '1 pick, taken from the bag labeled "apples."',
      correct: false,
      rationale: 'Picking from "apples" gives an ambiguous result — if you draw an apple from "apples" labeled bag... but that contradicts mislabeling; actually it could be oranges or mix, so the pick cannot distinguish those two cases reliably.',
    },
  ],
  'ch2-20-wise-men': [
    { id: 'a', text: 'Designate one spokesman as the counter; each other wise man flips the glass exactly once (only when it is bottom-down), and the spokesman declares freedom after flipping it back 49 times.', correct: true, rationale: 'Asymmetric roles let non-counters leave a single irreversible signal and the spokesman counts 49 distinct visitors.' },
    { id: 'b', text: 'Everyone flips the glass every time they enter the room, and the first person to count 50 flips declares freedom.', correct: false, rationale: 'Without unique once-only signals the same wise man could flip many times, making the count meaningless.' },
    { id: 'c', text: 'Each wise man flips the glass the first time they enter; once the glass has been flipped 50 times anyone may declare freedom.', correct: false, rationale: 'No single person can observe total flip count since visits are private, so this cannot be executed.' },
    { id: 'd', text: 'Wait until the glass remains untouched for 50 consecutive calls, then declare freedom since everyone must have been called by then.', correct: false, rationale: 'Random repeats mean a long untouched streak gives no lower bound on how many distinct people visited.' },
  ],
  'ch2-21-clock-pieces': [
    { id: 'a', text: 'Piece 1 = {12,1,2,11}, Piece 2 = {3,4,9,10}, Piece 3 = {5,6,7,8}, each summing to 26.', correct: true, rationale: 'Total 1+..+12=78, so each piece sums to 78/3=26, and these three contiguous arcs all work.' },
    { id: 'b', text: 'Piece 1 = {1,2,3,4}, Piece 2 = {5,6,7,8}, Piece 3 = {9,10,11,12}, each summing to 26.', correct: false, rationale: 'Only {5,6,7,8} sums to 26; the other two sum to 10 and 42, violating equal sums.' },
    { id: 'c', text: 'Three pieces of four consecutive numbers each that sum to 25.', correct: false, rationale: 'The target must be 78/3 = 26, not 25, so this violates the total-sum constraint.' },
    { id: 'd', text: 'Piece 1 = {1,12}, Piece 2 = {2,3,4,5,6}, Piece 3 = {7,8,9,10,11} with sums 13, 20, 45.', correct: false, rationale: 'The sums are unequal, so this fails the problem constraint even though the pieces are arcs.' },
  ],
  'ch2-22-missing-integers': [
    { id: 'a', text: 'Compute S = 5050 − Σzᵢ and Q = 338350 − Σzᵢ², then solve t² − St + (S² − Q)/2 = 0 for x and y.', correct: true, rationale: 'Two independent equations in x and y (sum and sum-of-squares) uniquely determine them via a quadratic.' },
    { id: 'b', text: 'Compute only S = 5050 − Σzᵢ; the two missing integers are S/2 and S/2.', correct: false, rationale: 'The sum alone cannot distinguish distinct pairs, and x = y violates the distinctness assumption.' },
    { id: 'c', text: 'Sort the 98 numbers and look for two consecutive differences greater than 1 to identify the missing integers.', correct: false, rationale: 'This works but is O(n log n); the intended O(n) technique is sum plus sum-of-squares.' },
    { id: 'd', text: 'Compute S and the product P = (100!)/(Πzᵢ), then solve t² − St + P = 0.', correct: false, rationale: 'Products of 100 numbers overflow badly; sum-of-squares is the numerically viable second invariant.' },
  ],
  'ch2-23-counterfeit-coins-i': [
    { id: 'a', text: 'Take k coins from bag k for k = 1..10, weigh all 55, and read the signed deviation from 550 to identify the bag and direction.', correct: true, rationale: 'Each bag contributes a unique signed offset ±k, so the deviation uniquely encodes bag index and weight direction.' },
    { id: 'b', text: 'Take 10 coins from each bag and weigh them; if the total differs from 1000, the deviation divided by 10 identifies the bag.', correct: false, rationale: 'All bags contribute equally so you cannot tell which bag is counterfeit from a single weighing.' },
    { id: 'c', text: 'Take k coins from bag k and compare the total to 550; any positive deviation means bag 1 is heavy, negative means bag 1 is light.', correct: false, rationale: 'Only deviation magnitude reveals the bag index; reading only the sign collapses 10 cases into 2.' },
    { id: 'd', text: 'Take 2^(k-1) coins from bag k (1, 2, 4, ..., 512) and decode the bag from binary deviation bits.', correct: false, rationale: 'Binary encoding works in principle but requires ~1023 coins and is wasteful; linear weights 1..10 suffice.' },
  ],
  'ch2-24-glass-balls': [
    { id: 'a', text: '14 drops, starting ball 1 at floor 14 then incrementing by 13, 12, 11, … (14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100).', correct: true, rationale: 'Decreasing step sizes balance worst cases so N(N+1)/2 ≥ 100 gives N = 14.' },
    { id: 'b', text: '10 drops, using ball 1 to test every 10th floor (10, 20, 30, ..., 100) and ball 2 to scan the surviving decade linearly.', correct: false, rationale: 'This can require up to 10 + 9 = 19 worst-case drops, not 10, because later decades cost the same as earlier ones.' },
    { id: 'c', text: '7 drops via binary search with ball 1, then binary search with ball 2 in the remaining range.', correct: false, rationale: 'Binary search fails because after ball 1 breaks, ball 2 must scan linearly (one break ends it).' },
    { id: 'd', text: '15 drops, using the equal-step strategy N ≈ √100 = 10 plus 5 safety drops.', correct: false, rationale: 'Equal steps are suboptimal; the decreasing-step strategy achieves 14, which is provably minimal.' },
  ],
  'ch2-25-matching-socks': [
    { id: 'a', text: '4 socks, since with 3 colors the worst case is 3 different socks and the 4th must repeat a color.', correct: true, rationale: 'By the pigeon hole principle, 3 colors + 1 extra sock forces a matching pair.' },
    { id: 'b', text: '3 socks, since there are 3 colors and any 3 must include a repeat.', correct: false, rationale: 'Three socks can be one of each color (red, yellow, blue) with no matching pair.' },
    { id: 'c', text: '32 socks, since you could draw all 31 blue and 1 of another color before a match.', correct: false, rationale: 'This over-counts by ignoring that matches form from any color, not just the largest pile.' },
    { id: 'd', text: '22 socks, since 20 yellow plus 2 red still lacks a pair until the 22nd sock is drawn.', correct: false, rationale: 'A pair can form as soon as two of the same color are drawn, regardless of bag sizes.' },
  ],
  'ch2-26-handshakes': [
    { id: 'a', text: 'Handshake counts lie in {1, ..., 25}, only 25 values, so 26 people must share a count by pigeon hole.', correct: true, rationale: 'Each person shook hands with at least 1 and at most 25 others, giving 25 holes for 26 pigeons.' },
    { id: 'b', text: 'Handshake counts lie in {0, 1, ..., 25}, giving 26 values, so pigeon hole does not directly force a match.', correct: false, rationale: 'The problem states each person shook at least one hand, which excludes 0 from the range.' },
    { id: 'c', text: 'If everyone had distinct counts, the total number of handshakes would be odd, contradicting that each handshake is counted twice.', correct: false, rationale: 'Parity of the degree sum is the wrong invariant here; pigeon hole on 25 possible values is the direct argument.' },
    { id: 'd', text: 'Since everyone shook at least 1 hand, by symmetry exactly 13 pairs of people must share the same count.', correct: false, rationale: 'Pigeon hole only guarantees one shared count; claiming 13 pairs overstates what the principle proves.' },
  ],
  'ch2-27-have-we-met': [
    { id: 'a', text: 'Fix person P; of the other 5, P either knows ≥3 or is stranger to ≥3, then case-analyze that triple to find either 3 mutuals or 3 strangers.', correct: true, rationale: 'This is the classical Ramsey R(3,3)=6 pigeon-hole argument, and it completes in both cases.' },
    { id: 'b', text: 'By pigeon hole, with 6 people and C(6,2)=15 pairs, at least 8 must be "knows" so 3 of them form a mutual triangle.', correct: false, rationale: '8 "knows" edges among 6 vertices need not contain a triangle (e.g. bipartite K₃,₃ has 9 edges, no triangle).' },
    { id: 'c', text: 'Pick any 3 people; they either all know or all do not know each other with probability 1, proving the claim.', correct: false, rationale: 'A random triple is not forced to be monochromatic; a combinatorial argument over all configurations is required.' },
    { id: 'd', text: 'Apply pigeon hole to 6 people and 2 relations to get 3 people in one category, which are automatically mutual.', correct: false, rationale: 'Being in the same "category" does not mean they pairwise know or do not know each other; edges between them must be checked.' },
  ],
  'ch2-28-ants-on-square': [
    { id: 'a', text: 'Yes: partition into a 5×5 grid of 1/5-squares; some cell has ⌈51/25⌉ = 3 ants and radius 1/7 > √2/10 covers that cell.', correct: true, rationale: 'Pigeon hole gives a crowded cell and 1/7 exceeds the half-diagonal 1/(5√2) of a 1/5 square.' },
    { id: 'b', text: 'Yes: partition into a 4×4 grid of 1/4-squares; some cell has ⌈51/16⌉ = 4 ants and radius 1/7 covers that cell.', correct: false, rationale: 'A 1/4-square has half-diagonal √2/8 ≈ 0.177 > 1/7, so radius 1/7 does not cover the cell.' },
    { id: 'c', text: 'No, because 51 ants can be spread so that no disk of radius 1/7 covers more than 2.', correct: false, rationale: 'This contradicts the pigeon-hole construction; a 5×5 grid forces 3 ants into one cell which fits inside a 1/7-disk.' },
    { id: 'd', text: 'Yes: by averaging, some disk of radius 1/7 has area π/49 ≈ 0.064 and thus contains ≥ 51·0.064 ≈ 3.3 ants.', correct: false, rationale: 'An averaging argument over area fractions does not rigorously guarantee 3 ants under a specific placed disk.' },
  ],
  'ch2-29-counterfeit-coins-ii': [
    { id: 'a', text: '1 weighing: take 3^(k-1) coins from bag k, then decode the deviation from 1210g as a signed base-3 number.', correct: true, rationale: 'Each bag contributes dᵢ·3^(i-1) with dᵢ ∈ {-1,0,1}, giving a unique deviation for all 3⁵ = 243 cases.' },
    { id: 'b', text: '1 weighing: take k coins from bag k (k=1..5), then decode the deviation from 150g linearly.', correct: false, rationale: 'Linear weights 1..5 cannot distinguish 3⁵ = 243 cases; e.g. deviations 1+0 and 0+1 overlap.' },
    { id: 'c', text: '2 weighings: first weigh one coin from each bag to find 9g vs 11g bags, then weigh again to find 10g bags.', correct: false, rationale: 'A single weighing suffices via base-3 encoding, making the second weighing unnecessary.' },
    { id: 'd', text: '5 weighings: weigh one coin from each bag separately to determine its type.', correct: false, rationale: 'This is the naive approach; powers-of-3 encoding collapses the 5 weighings into 1.' },
  ],
  'ch2-30-prisoner-problem': [
    { id: 'a', text: 'At least 99 survive: prisoner 1 announces the parity of red hats he sees; each later prisoner deduces his own hat from the running parity.', correct: true, rationale: 'One sacrifice communicates a global parity bit that lets every other prisoner deduce his color deterministically.' },
    { id: 'b', text: 'At most 50 survive on average, since each prisoner has a 50/50 chance and no communication is allowed.', correct: false, rationale: 'Prisoners can hear each other\'s guesses, so prior announcements carry exploitable information.' },
    { id: 'c', text: 'All 100 survive: prisoner 1 guesses the most common color he sees, and the others copy the running majority.', correct: false, rationale: 'Majority does not encode a consistent invariant, so later prisoners cannot deduce their hats reliably.' },
    { id: 'd', text: 'At least 99 survive: prisoner 1 says the color of prisoner 2\'s hat, and each prisoner then says the next prisoner\'s color.', correct: false, rationale: 'This saves only prisoners whose color was named; the person named cannot use that to infer their own hat in general.' },
  ],
  'ch2-31-division-by-9': [
    { id: 'a', text: 'Since 10 ≡ 1 (mod 9), 10^k ≡ 1, so a = Σaₖ·10^k ≡ Σaₖ (mod 9); the number and digit sum share their residue.', correct: true, rationale: 'The key congruence 10 ≡ 1 (mod 9) makes each place value collapse to 1 in mod-9 arithmetic.' },
    { id: 'b', text: 'Because 9 = 3², and any number divisible by 3 has digit sum divisible by 3, so the same holds for 9.', correct: false, rationale: 'Extending divisibility-by-3 to divisibility-by-9 is not automatic; the modular argument must be redone.' },
    { id: 'c', text: 'Since 10 ≡ -1 (mod 9), we have 10^k ≡ (-1)^k, so a ≡ alternating digit sum (mod 9).', correct: false, rationale: '10 ≡ 1 (mod 9), not -1; the alternating rule is the mod-11 test, not mod-9.' },
    { id: 'd', text: 'By induction on the number of digits, since adding a digit multiplies by 10 and 10 is divisible by 9.', correct: false, rationale: '10 is not divisible by 9, so this premise is false; the correct observation is 10 ≡ 1 (mod 9).' },
  ],
  'ch2-32-chameleon-colors': [
    { id: 'a', text: 'No: the multiset of counts mod 3 is always {0,1,2}, but the all-same state would require residues {0,0,0}.', correct: true, rationale: 'Every meeting preserves the multiset of residues mod 3, so the initial {1,0,2} can never reach {0,0,0}.' },
    { id: 'b', text: 'Yes: repeatedly pair red with green to reduce both, then pair the blues until only one color remains.', correct: false, rationale: 'Pairing a red-green actually produces more blues, and the invariant rules out any monochromatic end state.' },
    { id: 'c', text: 'No, because the total 13+15+17 = 45 is not divisible by 3, so three equal counts are impossible.', correct: false, rationale: '45 is divisible by 3, so this parity argument is incorrect; the real obstacle is the mod-3 residue set invariant.' },
    { id: 'd', text: 'Yes, by induction: with 1 red 1 green 1 blue it is possible, so larger counts reduce to this base case.', correct: false, rationale: 'Even (1,1,1) cannot reach a monochromatic state, and the invariant blocks all initial multisets with distinct residues.' },
  ],
  'ch2-33-coin-split': [
    { id: 'a', text: 'The sum is always f(n) = n(n-1)/2, so for 1000 coins the total is 1000·999/2 = 499,500.', correct: true, rationale: 'Induction shows f(N) = x(N-x) + f(x) + f(N-x) simplifies to N(N-1)/2 independent of the split x.' },
    { id: 'b', text: 'The sum depends on split order; greedy halving minimizes it and gives roughly 500·500 = 250,000.', correct: false, rationale: 'Induction proves the sum is independent of split choice, so no strategy can change the total.' },
    { id: 'c', text: 'The sum equals n²/2 = 500,000 for 1000 coins, invariant under splits.', correct: false, rationale: 'The correct closed form is n(n-1)/2 = 499,500, matching the counted pairs, not n²/2.' },
    { id: 'd', text: 'The sum equals the sum 1 + 2 + ... + 999 = 499,500 only when splits always separate one coin at a time.', correct: false, rationale: 'The total equals n(n-1)/2 for every split sequence, not just one-at-a-time peeling.' },
  ],
  'ch2-34-chocolate-bar': [
    { id: 'a', text: '47 breaks, because each break raises the piece count by exactly 1, so going from 1 piece to 48 requires 48-1 breaks.', correct: true, rationale: 'Piece count is a monovariant that rises by 1 per break, forcing mn-1 = 47 breaks regardless of order.' },
    { id: 'b', text: '48 breaks, one per final square.', correct: false, rationale: 'This off-by-one error misses that the initial bar already counts as one piece before any break.' },
    { id: 'c', text: '13 breaks, because 5 horizontal cuts plus 7 vertical cuts separate every row and column.', correct: false, rationale: 'A single break only splits one rectangle, not every stacked piece, so the cuts cannot be amortized this way.' },
    { id: 'd', text: 'At least 47 but possibly more if breaks are done inefficiently.', correct: false, rationale: 'The piece-count invariant makes the total exactly 47, independent of strategy.' },
  ],
  'ch2-35-race-track': [
    { id: 'a', text: 'Induct on n: some adjacent can i holds enough gas to reach can i+1, merge them into one can, and apply the hypothesis to the n-can track.', correct: true, rationale: 'A can that reaches its neighbor must exist, and merging reduces to the n-can case whose valid start still works.' },
    { id: 'b', text: 'Start at the can with the most gas; it can reach the next can, and by total equals one lap you can finish.', correct: false, rationale: 'Largest-gas alone is not sufficient; the next segment may exceed even the largest can\'s range.' },
    { id: 'c', text: 'Start at a random can; since total gas equals one lap, you will always have enough fuel in expectation.', correct: false, rationale: '"Enough in expectation" does not prevent running out mid-lap; a specific starting can is required.' },
    { id: 'd', text: 'Drive the full circle in reverse from any can, and the reversed order of refuels guarantees success.', correct: false, rationale: 'The track is one-way; reversing direction is disallowed, and reversal does not preserve fuel feasibility anyway.' },
  ],
  'ch2-36-irrational-number': [
    { id: 'a', text: 'Assume √2 = m/n in lowest terms; then m² = 2n² forces m even and hence n even, contradicting gcd(m,n)=1.', correct: true, rationale: 'The classical contradiction shows 2 dividing both m and n, violating the coprime assumption.' },
    { id: 'b', text: 'Since √2 ≈ 1.4142 has a non-repeating decimal expansion observed empirically, it cannot be rational.', correct: false, rationale: 'Empirical observation of digits is not a proof; irrationality must be established formally.' },
    { id: 'c', text: 'Because 2 is prime, its square root cannot be an integer, hence √2 is irrational.', correct: false, rationale: 'Non-integer does not imply irrational; many rationals like 3/2 are non-integer yet rational.' },
    { id: 'd', text: 'Assume √2 = m/n; then n√2 = m is rational, but √2 is irrational, contradiction.', correct: false, rationale: 'This is circular: it assumes the very conclusion (√2 irrational) that needs to be proved.' },
  ],
  'ch2-37-rainbow-hats': [
    { id: 'a', text: 'Label colors and prisoners 0..6; prisoner i guesses (i − Σ_{j≠i} x_j) mod 7, and the prisoner whose index equals the true total mod 7 is correct.', correct: true, rationale: 'Every residue 0..6 is claimed by exactly one prisoner, so whichever value the true total takes, that prisoner guesses right.' },
    { id: 'b', text: 'Every prisoner guesses the color that is the majority among the 6 hats they see; at least one will match their own.', correct: false, rationale: 'With 7 colors and 6 hats, majority may not exist, and no invariant guarantees coverage of every configuration.' },
    { id: 'c', text: 'Prisoner 0 guesses red, prisoner 1 guesses orange, etc., covering all 7 colors; one guess must match.', correct: false, rationale: 'This only succeeds if the chosen mapping happens to match one prisoner\'s actual hat, which is not guaranteed.' },
    { id: 'd', text: 'Each prisoner guesses the color missing among the 6 hats they see; since 7 colors exist, one guess must be right.', correct: false, rationale: 'The hats can repeat colors, so no color may be "missing" and this rule is ill-defined in general.' },
  ],
};

export default chapter2Choices;
