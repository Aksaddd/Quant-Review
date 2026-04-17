import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 7.
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter7Choices: Record<string, Choice[]> = {
  'ch7-7-1-01-algorithms-problem-1': [
    {
      id: 'a',
      text: 'Use arithmetic (i = i+j; j = i-j; i = i-j) or bitwise XOR (i ^= j; j ^= i; i ^= j) so no temporary variable is needed.',
      correct: true,
      rationale: 'Both idioms exploit reversible operations to swap in place without extra storage.',
    },
    {
      id: 'b',
      text: 'Declare a third variable tmp, copy i into tmp, then overwrite i with j and j with tmp.',
      correct: false,
      rationale: 'This uses additional storage and violates the constraint of the problem.',
    },
    {
      id: 'c',
      text: 'Set i = j and j = i in sequence without any intermediate step.',
      correct: false,
      rationale: 'After i = j the original value of i is lost, so j cannot recover it.',
    },
    {
      id: 'd',
      text: 'Use i = i * j and j = i / j and i = i / j to avoid temporaries.',
      correct: false,
      rationale: 'This fails when either operand is zero and also risks overflow, unlike the XOR/arithmetic-sum trick.',
    },
  ],
  'ch7-7-1-02-algorithms-problem-2': [
    {
      id: 'a',
      text: 'Single pass: push a[0], then for i ≥ 1 push a[i] only when a[i] ≠ a[i-1], giving O(n) time.',
      correct: true,
      rationale: 'Because the array is sorted, duplicates are always adjacent, so neighbour comparison suffices.',
    },
    {
      id: 'b',
      text: 'Insert every element into a hash set and output the set, giving expected O(n) time.',
      correct: false,
      rationale: 'This ignores the sorted property and introduces unnecessary hashing overhead plus an unspecified output order.',
    },
    {
      id: 'c',
      text: 'For each index i, compare a[i] against every later element a[j] and skip duplicates.',
      correct: false,
      rationale: 'This is O(n^2) and wastes the sorted structure that makes a linear scan sufficient.',
    },
    {
      id: 'd',
      text: 'Sort the array first and then output every second element.',
      correct: false,
      rationale: 'The array is already sorted and outputting every second element has no connection to uniqueness.',
    },
  ],
  'ch7-7-1-03-algorithms-problem-3': [
    {
      id: 'a',
      text: "Horner's rule rewrites the polynomial in nested form and evaluates it with n multiplications and n additions, i.e. O(n).",
      correct: true,
      rationale: 'Each step reuses the accumulated partial value, so no power of x is recomputed.',
    },
    {
      id: 'b',
      text: 'Compute each x^k directly, multiply by A_k, and sum the n+1 terms, which costs O(n^2) multiplications.',
      correct: false,
      rationale: 'Recomputing x^k independently duplicates work that Horner avoids.',
    },
    {
      id: 'c',
      text: "Apply the FFT to convolve the coefficients with [1, x, x^2, ...] in O(n log n).",
      correct: false,
      rationale: 'FFT is for multiplying polynomials, not evaluating a single polynomial at one point.',
    },
    {
      id: 'd',
      text: 'Use divide-and-conquer by splitting coefficients in half and merging, giving O(n log n).',
      correct: false,
      rationale: 'No divide-and-conquer beats the linear bound for single-point polynomial evaluation.',
    },
  ],
  'ch7-7-1-04-algorithms-problem-4': [
    {
      id: 'a',
      text: 'Maintain a running sum: subtract the element leaving the window and add the one entering, giving O(m) total work.',
      correct: true,
      rationale: 'Each element is added and removed once, so the window sum slides in constant time per step.',
    },
    {
      id: 'b',
      text: 'For each window start i, sum the w elements A[i..i+w-1] from scratch, giving O(m·w).',
      correct: false,
      rationale: 'This naive method recomputes overlapping work and ignores the obvious increment/decrement reuse.',
    },
    {
      id: 'c',
      text: 'Compute prefix sums P[i] = A[1]+...+A[i] and then B[i] = (P[i] - P[i-w])/w in O(m log m).',
      correct: false,
      rationale: 'Prefix sums do work, but the correct cost is O(m), not O(m log m).',
    },
    {
      id: 'd',
      text: 'Sort each window before averaging to ensure numerical accuracy, costing O(m·w log w).',
      correct: false,
      rationale: 'Sorting is irrelevant to computing a moving average and only adds cost.',
    },
  ],
  'ch7-7-1-05-algorithms-problem-5': [
    {
      id: 'a',
      text: 'Insertion sort is Θ(n^2) average and worst, merge sort is Θ(n log n) average and worst, quicksort is Θ(n log n) average but Θ(n^2) worst.',
      correct: true,
      rationale: 'These match the standard analyses derived from the Master Theorem and comparison counts.',
    },
    {
      id: 'b',
      text: 'All three algorithms have Θ(n log n) worst-case complexity because comparison sorting is bounded below by n log n.',
      correct: false,
      rationale: 'The n log n lower bound applies to the best possible comparison sort, not to every specific algorithm (insertion and quicksort have Θ(n^2) worst case).',
    },
    {
      id: 'c',
      text: 'Quicksort is Θ(n log n) worst case, merge sort is Θ(n^2) worst case, insertion sort is Θ(n) average.',
      correct: false,
      rationale: 'This swaps the worst cases of quicksort and merge sort and understates insertion sort.',
    },
    {
      id: 'd',
      text: 'Insertion sort is Θ(n log n) average, merge sort is Θ(n^2) worst case due to merging, quicksort is always Θ(n log n).',
      correct: false,
      rationale: 'All three complexity claims are wrong; merging is linear and insertion sort is quadratic on average.',
    },
  ],
  'ch7-7-1-06-algorithms-problem-6': [
    {
      id: 'a',
      text: 'Knuth shuffle: for i = 1..n swap A[i] with A[Random(i,n)], producing every one of the n! orderings with equal probability in Θ(n) time.',
      correct: true,
      rationale: 'An inductive argument shows each of the n! permutations occurs with probability 1/n!.',
    },
    {
      id: 'b',
      text: 'For i = 1..n swap A[i] with A[Random(1,n)], drawing the swap partner uniformly over the entire array.',
      correct: false,
      rationale: 'This generates n^n equally-weighted swap sequences, which do not map uniformly to the n! permutations.',
    },
    {
      id: 'c',
      text: 'Repeatedly pick two random indices and swap them until the array "looks random" enough.',
      correct: false,
      rationale: 'Without a fixed, analyzable schedule this gives no guarantee of uniformity over the n! permutations.',
    },
    {
      id: 'd',
      text: 'Sort the array by index parity so that odd-indexed cards come first, then reverse to randomize.',
      correct: false,
      rationale: 'This is a deterministic rearrangement, not a random permutation.',
    },
  ],
  'ch7-7-1-07-algorithms-problem-7': [
    {
      id: 'a',
      text: 'Reservoir sampling: keep the current pick when reading the (n+1)-th character with probability n/(n+1), otherwise replace it.',
      correct: true,
      rationale: 'Induction on n shows every character read so far has probability 1/n of being the current pick.',
    },
    {
      id: 'b',
      text: 'Always replace the current pick with the new character as it is read, since the newest character is unbiased.',
      correct: false,
      rationale: 'This returns the last character with probability 1, not a uniform random character.',
    },
    {
      id: 'c',
      text: 'Read the entire file to learn its length N, then pick a uniform index in [1,N] and return that character.',
      correct: false,
      rationale: 'The problem constrains us to sequential reading without buffering; reservoir sampling avoids that overhead.',
    },
    {
      id: 'd',
      text: 'For each character flip a fair coin and keep it if heads, returning the last kept character.',
      correct: false,
      rationale: 'Later characters are more likely to be the last kept one, so the distribution is not uniform.',
    },
  ],
  'ch7-7-1-08-algorithms-problem-8': [
    {
      id: 'a',
      text: 'Pair the elements (n/2 comparisons), find the min among the smaller halves (n/2 - 1) and the max among the larger halves (n/2 - 1), totalling 3n/2 - 2 comparisons.',
      correct: true,
      rationale: 'Pairing lets each element be excluded from one of the two tournaments, saving roughly half the work.',
    },
    {
      id: 'b',
      text: 'Run one pass to find the min (n-1 comparisons) and a second pass to find the max (n-1 comparisons), totalling 2n-2.',
      correct: false,
      rationale: 'That is the naive bound which exceeds 3n/2; pairing removes duplicate comparisons.',
    },
    {
      id: 'c',
      text: 'Sort the array in O(n log n) and take A[1] and A[n] as min and max.',
      correct: false,
      rationale: 'Sorting uses far more than 3n/2 comparisons, so it does not meet the bound.',
    },
    {
      id: 'd',
      text: 'Use a tournament with a single elimination bracket, which requires 2(n-1) comparisons in total.',
      correct: false,
      rationale: 'A single tournament only finds the max; a separate loser tournament still costs more than 3n/2 overall.',
    },
  ],
  'ch7-7-1-09-algorithms-problem-9': [
    {
      id: 'a',
      text: 'Probe positions 1, 2, 4, 8, ..., 2^i until one is nonzero, then binary-search within [2^(i-1)+1, 2^i], costing Θ(log n).',
      correct: true,
      rationale: 'Exponential search bounds the region in O(log n) probes and binary search then locates the transition in O(log n).',
    },
    {
      id: 'b',
      text: 'Scan the array left to right until the first nonzero element is found, giving Θ(n).',
      correct: false,
      rationale: 'A linear scan is asymptotically worse than the Θ(log n) exponential-plus-binary search strategy.',
    },
    {
      id: 'c',
      text: 'Apply binary search directly on [1, ∞) without any bounding phase.',
      correct: false,
      rationale: 'Binary search needs a finite upper bound; without bounding the range first, the midpoint is undefined.',
    },
    {
      id: 'd',
      text: 'Random sampling of indices until a nonzero is seen, giving expected Θ(√n).',
      correct: false,
      rationale: 'Random sampling has no way to identify the first nonzero position and does not match the deterministic log-n bound.',
    },
  ],
  'ch7-7-1-10-algorithms-problem-10': [
    {
      id: 'a',
      text: 'Start at the top-right cell and move left when the entry exceeds x, down when it is less, giving O(n) total steps.',
      correct: true,
      rationale: 'Each move eliminates an entire row or column, so at most 2n moves are needed.',
    },
    {
      id: 'b',
      text: 'Run binary search on each of the n rows independently, giving Θ(n log n).',
      correct: false,
      rationale: 'That works but is strictly worse than the O(n) staircase search from the top-right corner.',
    },
    {
      id: 'c',
      text: 'Because the grid is globally sorted, binary search in O(log n^2) = O(log n) on the flattened array.',
      correct: false,
      rationale: 'The grid is row- and column-sorted but not a single sorted sequence, so flattened binary search fails.',
    },
    {
      id: 'd',
      text: 'Scan every cell, giving Θ(n^2).',
      correct: false,
      rationale: 'A full scan ignores the sorted structure that enables the O(n) staircase walk.',
    },
  ],
  'ch7-7-1-11-algorithms-problem-11': [
    {
      id: 'a',
      text: 'Roughly 162 seconds, because T(n) grows like φ^n with φ ≈ 1.618, so T(n+1)/T(n) ≈ 1.618 × 100.',
      correct: true,
      rationale: 'The recurrence T(n) = T(n-1)+T(n-2)+1 grows as φ^n, the dominant root of x^2 = x+1.',
    },
    {
      id: 'b',
      text: 'About 200 seconds, because each extra level of recursion roughly doubles the work.',
      correct: false,
      rationale: 'The growth factor is φ ≈ 1.618, not 2, since each call spawns two calls of size n-1 and n-2 rather than two of size n-1.',
    },
    {
      id: 'c',
      text: 'About 100 seconds, because the extra call only adds a constant amount of work.',
      correct: false,
      rationale: 'Running time grows exponentially in n, so incrementing n multiplies the time by roughly φ, not by 1.',
    },
    {
      id: 'd',
      text: 'About 110 seconds, because doubling only happens every log₂ n steps.',
      correct: false,
      rationale: 'The correct per-step growth factor is φ ≈ 1.618, giving ~162 s rather than ~110 s.',
    },
  ],
  'ch7-7-1-12-algorithms-problem-12': [
    {
      id: 'a',
      text: "Track prefix sum T(j) and its running minimum T_min; the best ending at j is T(j) - T_min, giving O(n) (Kadane's algorithm).",
      correct: true,
      rationale: 'For fixed j, V(i,j) = T(j) - T(i-1) is maximized by the smallest previous prefix sum, so one pass suffices.',
    },
    {
      id: 'b',
      text: 'Enumerate every pair (i,j) and sum A[i..j] from scratch, giving O(n^3).',
      correct: false,
      rationale: 'Recomputing each subarray sum independently is needlessly cubic; Kadane achieves linear time.',
    },
    {
      id: 'c',
      text: 'Sort the array descending and sum elements until the sum stops increasing.',
      correct: false,
      rationale: 'Sorting destroys the contiguity constraint; the answer depends on order, not merely element values.',
    },
    {
      id: 'd',
      text: 'Divide the array in half, take the larger half, and recurse, giving O(log n).',
      correct: false,
      rationale: 'This ignores subarrays that span the split; a correct divide-and-conquer version still needs Θ(n log n) work.',
    },
  ],
  'ch7-7-2-01-the-power-of-two-problem-1': [
    {
      id: 'a',
      text: 'Check that x > 0 and that x & (x - 1) == 0, which is true exactly when x has a single bit set.',
      correct: true,
      rationale: 'For any x = 2^n, the bits of x and x-1 are disjoint, so their AND is zero.',
    },
    {
      id: 'b',
      text: 'Check whether x % 2 == 0, since all powers of 2 are even.',
      correct: false,
      rationale: 'All even numbers satisfy this, but 6, 10, 12, ... are even and are not powers of 2.',
    },
    {
      id: 'c',
      text: 'Check that x | (x - 1) == x, because ORing with a smaller number should leave x unchanged.',
      correct: false,
      rationale: 'x | (x-1) differs from x whenever x has any bit set, so this test fires for essentially every positive x.',
    },
    {
      id: 'd',
      text: 'Check that log₂(x) is an integer by computing floor(log2(x)) == ceil(log2(x)).',
      correct: false,
      rationale: 'Using floating-point log is O(1) but numerically unreliable compared to the exact bitwise test.',
    },
  ],
  'ch7-7-2-02-the-power-of-two-problem-2': [
    {
      id: 'a',
      text: 'Return (x << 3) - x, since 7x = 8x - x.',
      correct: true,
      rationale: 'Left-shifting by 3 multiplies by 8 and subtracting x yields 7x using only shift and subtraction.',
    },
    {
      id: 'b',
      text: 'Return (x << 2) + (x << 1) + 1, because 7 = 4 + 2 + 1.',
      correct: false,
      rationale: '7 = 4 + 2 + 1 gives 7x = 4x + 2x + x, not 4x + 2x + 1; the constant 1 is wrong.',
    },
    {
      id: 'c',
      text: 'Add x to itself seven times in a loop.',
      correct: false,
      rationale: 'That works but is O(1) only for fixed 7 and still performs six additions instead of one shift and one subtraction.',
    },
    {
      id: 'd',
      text: 'Return x ^ (x << 3), since XOR with a shifted value multiplies by 7.',
      correct: false,
      rationale: 'XOR is not equal to subtraction in general (carry bits matter), so this does not produce 7x.',
    },
  ],
  'ch7-7-2-03-the-power-of-two-problem-3': [
    {
      id: 'a',
      text: 'Write p in binary 0.p₁p₂p₃... and toss the coin; at toss i declare WIN if s_i < p_i, LOSE if s_i > p_i, and otherwise continue.',
      correct: true,
      rationale: 'The binary expansion of p and symmetric coin tosses make the total WIN probability exactly p.',
    },
    {
      id: 'b',
      text: 'Flip the coin ⌈1/p⌉ times and declare WIN if at least one toss is heads.',
      correct: false,
      rationale: 'This gives WIN probability 1 - (1/2)^⌈1/p⌉, which only matches p for a few special values of p.',
    },
    {
      id: 'c',
      text: 'Flip the coin once; if heads, WIN with probability 2p, otherwise LOSE.',
      correct: false,
      rationale: 'A fair coin cannot be re-weighted to probability 2p without additional tosses; this is circular.',
    },
    {
      id: 'd',
      text: 'Flip the coin n times and WIN if the fraction of heads is below p.',
      correct: false,
      rationale: 'The fraction of heads concentrates around 1/2, so this procedure gives WIN probability depending on n rather than p.',
    },
  ],
  'ch7-7-2-04-the-power-of-two-problem-4': [
    {
      id: 'a',
      text: 'Label each bottle with a 10-bit binary number; mouse k drinks from every bottle whose bit k is 1, and after 18 hours the dead/alive pattern gives the bottle index.',
      correct: true,
      rationale: '10 mice encode 2^10 = 1024 > 1000 outcomes in one parallel trial, well within the 20-hour budget.',
    },
    {
      id: 'b',
      text: 'Split the bottles into 10 groups of 100 and feed each group to one mouse; the surviving mice identify the group.',
      correct: false,
      rationale: 'This only narrows to a group of 100 bottles, and there is no time for a second round within 20 hours.',
    },
    {
      id: 'c',
      text: 'Feed each mouse one bottle; at most 10 bottles are tested so the poisoned one is likely found.',
      correct: false,
      rationale: 'Ten bottles out of 1000 is a negligible sample and cannot guarantee identification.',
    },
    {
      id: 'd',
      text: 'Feed 500 bottles to one mouse; if it dies, split those and test with another mouse next round.',
      correct: false,
      rationale: 'Sequential halving would take roughly 10 × 18 hours, far exceeding the 20-hour limit.',
    },
  ],
  'ch7-7-3-01-numerical-methods-problem-1': [
    {
      id: 'a',
      text: 'Too many space steps is worse, because shrinking Δx blows up α = Δτ/(Δx)^2 and violates the α ≤ 1/2 stability condition of the explicit scheme.',
      correct: true,
      rationale: '(Δx)^2 in the denominator means halving Δx quadruples α, quickly breaking the conditional stability bound.',
    },
    {
      id: 'b',
      text: 'Too many time steps is worse, because each extra step compounds round-off error linearly in N.',
      correct: false,
      rationale: 'Shrinking Δτ actually lowers α and promotes stability; round-off growth is not the dominant concern here.',
    },
    {
      id: 'c',
      text: 'Both are equally bad since the scheme only converges when Δτ = Δx.',
      correct: false,
      rationale: 'The stability criterion involves the ratio Δτ/(Δx)^2, so Δτ = Δx is neither necessary nor sufficient.',
    },
    {
      id: 'd',
      text: 'Neither matters because the explicit method is unconditionally stable like Crank-Nicolson.',
      correct: false,
      rationale: 'Only the implicit and Crank-Nicolson schemes are unconditionally stable; the explicit method is only conditionally stable.',
    },
  ],
};

export default chapter7Choices;
