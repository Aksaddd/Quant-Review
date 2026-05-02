// Loads interactive JSON documents at build time via static import.
// resolveJsonModule + isolatedModules in tsconfig means the JSON is typed as
// `any` on import; we cast through unknown to the discriminated union.

import type {
  InteractiveDoc, ProblemWalkthrough, ReadingSection, Technique,
} from '@/types/interactive';

import ch1P1             from '../../../content/interactive/ch01/ch1-p1-broad-knowledge.json';
import ch2Pirates        from '../../../content/interactive/ch02/ch2-01-screwy-pirates.json';
import ch2TigerSheep     from '../../../content/interactive/ch02/ch2-02-tiger-and-sheep.json';
import ch2RiverCrossing  from '../../../content/interactive/ch02/ch2-03-river-crossing.json';
import ch2Birthday       from '../../../content/interactive/ch02/ch2-04-birthday-problem.json';
import ch2CardGame       from '../../../content/interactive/ch02/ch2-05-card-game.json';
import ch2BurningRopes   from '../../../content/interactive/ch02/ch2-06-burning-ropes.json';
import ch2DefectiveBall  from '../../../content/interactive/ch02/ch2-07-defective-ball.json';
import ch2TrailingZeros  from '../../../content/interactive/ch02/ch2-08-trailing-zeros.json';
import ch2HorseRace      from '../../../content/interactive/ch02/ch2-09-horse-race.json';
import ch2InfiniteSeq    from '../../../content/interactive/ch02/ch2-10-infinite-sequence.json';
import ch2BoxPacking     from '../../../content/interactive/ch02/ch2-11-box-packing.json';
import ch2CalendarCubes  from '../../../content/interactive/ch02/ch2-12-calendar-cubes.json';
import ch2DoorToOffer    from '../../../content/interactive/ch02/ch2-13-door-to-offer.json';
import ch2MessageDelivery from '../../../content/interactive/ch02/ch2-14-message-delivery.json';
import ch2LastBall       from '../../../content/interactive/ch02/ch2-15-last-ball.json';
import ch2LightSwitches  from '../../../content/interactive/ch02/ch2-16-light-switches.json';
import ch2QuantSalary    from '../../../content/interactive/ch02/ch2-17-quant-salary.json';
import ch2CoinPiles      from '../../../content/interactive/ch02/ch2-18-coin-piles.json';
import ch2MislabeledBags from '../../../content/interactive/ch02/ch2-19-mislabeled-bags.json';
import ch2WiseMen        from '../../../content/interactive/ch02/ch2-20-wise-men.json';
import ch2ClockPieces    from '../../../content/interactive/ch02/ch2-21-clock-pieces.json';
import ch2MissingInts    from '../../../content/interactive/ch02/ch2-22-missing-integers.json';
import ch2CounterfeitI   from '../../../content/interactive/ch02/ch2-23-counterfeit-coins-i.json';
import ch2GlassBalls     from '../../../content/interactive/ch02/ch2-24-glass-balls.json';
import ch2MatchingSocks  from '../../../content/interactive/ch02/ch2-25-matching-socks.json';
import ch2Handshakes     from '../../../content/interactive/ch02/ch2-26-handshakes.json';
import ch2HaveWeMet      from '../../../content/interactive/ch02/ch2-27-have-we-met.json';
import ch2AntsOnSquare   from '../../../content/interactive/ch02/ch2-28-ants-on-square.json';
import ch2CounterfeitII  from '../../../content/interactive/ch02/ch2-29-counterfeit-coins-ii.json';
import ch2Prisoner2      from '../../../content/interactive/ch02/ch2-30-prisoner-2-colors.json';
import ch2DivisionBy9    from '../../../content/interactive/ch02/ch2-31-division-by-9.json';
import ch2Chameleons     from '../../../content/interactive/ch02/ch2-32-chameleon-colors.json';
import ch2CoinSplit      from '../../../content/interactive/ch02/ch2-33-coin-split.json';
import ch2ChocolateBar   from '../../../content/interactive/ch02/ch2-34-chocolate-bar.json';
import ch2RaceTrack      from '../../../content/interactive/ch02/ch2-35-race-track.json';
import ch2IrrationalNum  from '../../../content/interactive/ch02/ch2-36-irrational-number.json';
import ch2RainbowHats    from '../../../content/interactive/ch02/ch2-37-rainbow-hats.json';
import ch3DerivLnXLnX    from '../../../content/interactive/ch03/ch3-01-derivative-ln-x-ln-x.json';
import ch3EVsPi          from '../../../content/interactive/ch03/ch3-02-e-vs-pi.json';
import ch3TwoLimits      from '../../../content/interactive/ch03/ch3-03-two-limits.json';
import ch3IntLnX         from '../../../content/interactive/ch03/ch3-04-integral-of-ln-x.json';
import ch3IntSecX        from '../../../content/interactive/ch03/ch3-05-integral-of-sec-x.json';
import ch3Cylinders      from '../../../content/interactive/ch03/ch3-06-intersecting-cylinders.json';
import ch3SnowPlow       from '../../../content/interactive/ch03/ch3-07-snow-plow.json';
import ch3HalfNormal     from '../../../content/interactive/ch03/ch3-08-half-normal-expectation.json';
import ch3GaussianInt    from '../../../content/interactive/ch03/ch3-09-gaussian-integral.json';
import ch3IToTheI        from '../../../content/interactive/ch03/ch3-10-i-to-the-i.json';
import ch3Bernoulli      from '../../../content/interactive/ch03/ch3-11-bernoulli-inequality.json';
import ch3Sqrt37         from '../../../content/interactive/ch03/ch3-12-sqrt-37.json';
import ch3RootFinding    from '../../../content/interactive/ch03/ch3-13-root-finding-algorithms.json';
import ch3DistToPlane    from '../../../content/interactive/ch03/ch3-14-distance-to-plane.json';
import ch3SeparableOde   from '../../../content/interactive/ch03/ch3-15-separable-ode.json';
import ch3ChangeVarOde   from '../../../content/interactive/ch03/ch3-16-change-of-variable-ode.json';
import ch3FirstOrderLin  from '../../../content/interactive/ch03/ch3-17-first-order-linear-ode.json';
import ch3ComplexRootsOde from '../../../content/interactive/ch03/ch3-18-complex-roots-ode.json';
import ch3NonhomogOdes   from '../../../content/interactive/ch03/ch3-19-nonhomogeneous-odes.json';
import ch3CorrVectors    from '../../../content/interactive/ch03/ch3-20-correlation-vectors.json';
import ch3LinearLS       from '../../../content/interactive/ch03/ch3-21-linear-least-squares.json';
import ch3Eigen2x2       from '../../../content/interactive/ch03/ch3-22-eigenvalues-2x2.json';
import ch3CorrPSD        from '../../../content/interactive/ch03/ch3-23-correlation-psd.json';
import ch3CorrNormals    from '../../../content/interactive/ch03/ch3-24-correlated-normals.json';
import ch4CoinToss       from '../../../content/interactive/ch04/ch4-01-coin-toss-game.json';
import ch4CardCompare    from '../../../content/interactive/ch04/ch4-02-card-comparison.json';
import ch4DrunkPass      from '../../../content/interactive/ch04/ch4-03-drunk-passenger.json';
import ch4NPointsCircle  from '../../../content/interactive/ch04/ch4-04-n-points-on-circle.json';
import ch4PokerHands     from '../../../content/interactive/ch04/ch4-05-poker-hands.json';
import ch4HoppingRabbit  from '../../../content/interactive/ch04/ch4-06-hopping-rabbit.json';
import ch4Pirates2       from '../../../content/interactive/ch04/ch4-07-screwy-pirates-2.json';
import ch4ChessTournament from '../../../content/interactive/ch04/ch4-08-chess-tournament.json';
import ch4Derangement    from '../../../content/interactive/ch04/ch4-09-application-letters-derangement.json';
import ch4BirthdayProb   from '../../../content/interactive/ch04/ch4-10-birthday-problem-prob.json';
import ch4HundredthDigit from '../../../content/interactive/ch04/ch4-11-100th-digit.json';
import ch4CubicInt       from '../../../content/interactive/ch04/ch4-12-cubic-of-integer.json';
import ch4BoysGirls      from '../../../content/interactive/ch04/ch4-13-boys-and-girls.json';
import ch4AllGirlWorld   from '../../../content/interactive/ch04/ch4-14-all-girl-world.json';
import ch4UnfairCoin     from '../../../content/interactive/ch04/ch4-15-unfair-coin.json';
import ch4FairFromUnfair from '../../../content/interactive/ch04/ch4-16-fair-from-unfair-coin.json';
import ch4DartGame       from '../../../content/interactive/ch04/ch4-17-dart-game.json';
import ch4BirthdayLine   from '../../../content/interactive/ch04/ch4-18-birthday-line.json';
import ch4DiceOrder      from '../../../content/interactive/ch04/ch4-19-dice-order.json';
import ch4MontyHall      from '../../../content/interactive/ch04/ch4-20-monty-hall.json';
import techBackInd       from '../../../content/interactive/techniques/backward-induction.json';
import techLogicReason   from '../../../content/interactive/techniques/logic-reasoning.json';
import techColoring      from '../../../content/interactive/techniques/coloring-arguments.json';
import techInvariant     from '../../../content/interactive/techniques/invariant-arguments.json';
import techOOTB          from '../../../content/interactive/techniques/thinking-out-of-the-box.json';
import techSymmetry      from '../../../content/interactive/techniques/symmetry-arguments.json';
import techSeries        from '../../../content/interactive/techniques/series-summation.json';
import techPigeonHole    from '../../../content/interactive/techniques/pigeon-hole-principle.json';
import techModular       from '../../../content/interactive/techniques/modular-arithmetic.json';
import techMathInduction from '../../../content/interactive/techniques/math-induction.json';
import techContradiction from '../../../content/interactive/techniques/proof-by-contradiction.json';
import techLimDeriv      from '../../../content/interactive/techniques/limits-and-derivatives.json';
import techIntegration   from '../../../content/interactive/techniques/integration-techniques.json';
import techTaylor        from '../../../content/interactive/techniques/taylor-series.json';
import techNewton        from '../../../content/interactive/techniques/newton-method.json';
import techLagrange      from '../../../content/interactive/techniques/lagrange-multipliers.json';
import techODE           from '../../../content/interactive/techniques/ordinary-differential-equations.json';
import techLinAlg        from '../../../content/interactive/techniques/linear-algebra-techniques.json';
import techProbFound     from '../../../content/interactive/techniques/probability-foundations.json';
import techCombiCount    from '../../../content/interactive/techniques/combinatorial-counting.json';
import techCondProb      from '../../../content/interactive/techniques/conditional-probability-and-bayes.json';

const REGISTRY: Record<string, InteractiveDoc> = {
  'ch1-p1-broad-knowledge':   ch1P1             as unknown as ReadingSection,
  'ch2-01-screwy-pirates':    ch2Pirates        as unknown as ProblemWalkthrough,
  'ch2-02-tiger-and-sheep':   ch2TigerSheep     as unknown as ProblemWalkthrough,
  'ch2-03-river-crossing':    ch2RiverCrossing  as unknown as ProblemWalkthrough,
  'ch2-04-birthday-problem':  ch2Birthday       as unknown as ProblemWalkthrough,
  'ch2-05-card-game':         ch2CardGame       as unknown as ProblemWalkthrough,
  'ch2-06-burning-ropes':     ch2BurningRopes   as unknown as ProblemWalkthrough,
  'ch2-07-defective-ball':    ch2DefectiveBall  as unknown as ProblemWalkthrough,
  'ch2-08-trailing-zeros':    ch2TrailingZeros  as unknown as ProblemWalkthrough,
  'ch2-09-horse-race':        ch2HorseRace      as unknown as ProblemWalkthrough,
  'ch2-10-infinite-sequence': ch2InfiniteSeq    as unknown as ProblemWalkthrough,
  'ch2-11-box-packing':       ch2BoxPacking     as unknown as ProblemWalkthrough,
  'ch2-12-calendar-cubes':    ch2CalendarCubes  as unknown as ProblemWalkthrough,
  'ch2-13-door-to-offer':     ch2DoorToOffer    as unknown as ProblemWalkthrough,
  'ch2-14-message-delivery':  ch2MessageDelivery as unknown as ProblemWalkthrough,
  'ch2-15-last-ball':         ch2LastBall       as unknown as ProblemWalkthrough,
  'ch2-16-light-switches':    ch2LightSwitches  as unknown as ProblemWalkthrough,
  'ch2-17-quant-salary':      ch2QuantSalary    as unknown as ProblemWalkthrough,
  'ch2-18-coin-piles':        ch2CoinPiles      as unknown as ProblemWalkthrough,
  'ch2-19-mislabeled-bags':   ch2MislabeledBags as unknown as ProblemWalkthrough,
  'ch2-20-wise-men':          ch2WiseMen        as unknown as ProblemWalkthrough,
  'ch2-21-clock-pieces':      ch2ClockPieces    as unknown as ProblemWalkthrough,
  'ch2-22-missing-integers':  ch2MissingInts    as unknown as ProblemWalkthrough,
  'ch2-23-counterfeit-coins-i': ch2CounterfeitI as unknown as ProblemWalkthrough,
  'ch2-24-glass-balls':       ch2GlassBalls     as unknown as ProblemWalkthrough,
  'ch2-25-matching-socks':    ch2MatchingSocks  as unknown as ProblemWalkthrough,
  'ch2-26-handshakes':        ch2Handshakes     as unknown as ProblemWalkthrough,
  'ch2-27-have-we-met':       ch2HaveWeMet      as unknown as ProblemWalkthrough,
  'ch2-28-ants-on-square':    ch2AntsOnSquare   as unknown as ProblemWalkthrough,
  'ch2-29-counterfeit-coins-ii': ch2CounterfeitII as unknown as ProblemWalkthrough,
  'ch2-30-prisoner-2-colors': ch2Prisoner2      as unknown as ProblemWalkthrough,
  'ch2-31-division-by-9':     ch2DivisionBy9    as unknown as ProblemWalkthrough,
  'ch2-32-chameleon-colors':  ch2Chameleons     as unknown as ProblemWalkthrough,
  'ch2-33-coin-split':        ch2CoinSplit      as unknown as ProblemWalkthrough,
  'ch2-34-chocolate-bar':     ch2ChocolateBar   as unknown as ProblemWalkthrough,
  'ch2-35-race-track':        ch2RaceTrack      as unknown as ProblemWalkthrough,
  'ch2-36-irrational-number': ch2IrrationalNum  as unknown as ProblemWalkthrough,
  'ch2-37-rainbow-hats':      ch2RainbowHats    as unknown as ProblemWalkthrough,
  'ch3-01-derivative-ln-x-ln-x': ch3DerivLnXLnX as unknown as ProblemWalkthrough,
  'ch3-02-e-vs-pi':           ch3EVsPi          as unknown as ProblemWalkthrough,
  'ch3-03-two-limits':        ch3TwoLimits      as unknown as ProblemWalkthrough,
  'ch3-04-integral-of-ln-x':  ch3IntLnX         as unknown as ProblemWalkthrough,
  'ch3-05-integral-of-sec-x': ch3IntSecX        as unknown as ProblemWalkthrough,
  'ch3-06-intersecting-cylinders': ch3Cylinders as unknown as ProblemWalkthrough,
  'ch3-07-snow-plow':         ch3SnowPlow       as unknown as ProblemWalkthrough,
  'ch3-08-half-normal-expectation': ch3HalfNormal as unknown as ProblemWalkthrough,
  'ch3-09-gaussian-integral': ch3GaussianInt    as unknown as ProblemWalkthrough,
  'ch3-10-i-to-the-i':        ch3IToTheI        as unknown as ProblemWalkthrough,
  'ch3-11-bernoulli-inequality': ch3Bernoulli   as unknown as ProblemWalkthrough,
  'ch3-12-sqrt-37':           ch3Sqrt37         as unknown as ProblemWalkthrough,
  'ch3-13-root-finding-algorithms': ch3RootFinding as unknown as ProblemWalkthrough,
  'ch3-14-distance-to-plane': ch3DistToPlane    as unknown as ProblemWalkthrough,
  'ch3-15-separable-ode':     ch3SeparableOde   as unknown as ProblemWalkthrough,
  'ch3-16-change-of-variable-ode': ch3ChangeVarOde as unknown as ProblemWalkthrough,
  'ch3-17-first-order-linear-ode': ch3FirstOrderLin as unknown as ProblemWalkthrough,
  'ch3-18-complex-roots-ode': ch3ComplexRootsOde as unknown as ProblemWalkthrough,
  'ch3-19-nonhomogeneous-odes': ch3NonhomogOdes  as unknown as ProblemWalkthrough,
  'ch3-20-correlation-vectors': ch3CorrVectors  as unknown as ProblemWalkthrough,
  'ch3-21-linear-least-squares': ch3LinearLS    as unknown as ProblemWalkthrough,
  'ch3-22-eigenvalues-2x2':   ch3Eigen2x2       as unknown as ProblemWalkthrough,
  'ch3-23-correlation-psd':   ch3CorrPSD        as unknown as ProblemWalkthrough,
  'ch3-24-correlated-normals': ch3CorrNormals   as unknown as ProblemWalkthrough,
  'ch4-01-coin-toss-game':    ch4CoinToss       as unknown as ProblemWalkthrough,
  'ch4-02-card-comparison':   ch4CardCompare    as unknown as ProblemWalkthrough,
  'ch4-03-drunk-passenger':   ch4DrunkPass      as unknown as ProblemWalkthrough,
  'ch4-04-n-points-on-circle': ch4NPointsCircle as unknown as ProblemWalkthrough,
  'ch4-05-poker-hands':       ch4PokerHands     as unknown as ProblemWalkthrough,
  'ch4-06-hopping-rabbit':    ch4HoppingRabbit  as unknown as ProblemWalkthrough,
  'ch4-07-screwy-pirates-2':  ch4Pirates2       as unknown as ProblemWalkthrough,
  'ch4-08-chess-tournament':  ch4ChessTournament as unknown as ProblemWalkthrough,
  'ch4-09-application-letters-derangement': ch4Derangement as unknown as ProblemWalkthrough,
  'ch4-10-birthday-problem-prob': ch4BirthdayProb as unknown as ProblemWalkthrough,
  'ch4-11-100th-digit':       ch4HundredthDigit as unknown as ProblemWalkthrough,
  'ch4-12-cubic-of-integer':  ch4CubicInt       as unknown as ProblemWalkthrough,
  'ch4-13-boys-and-girls':    ch4BoysGirls      as unknown as ProblemWalkthrough,
  'ch4-14-all-girl-world':    ch4AllGirlWorld   as unknown as ProblemWalkthrough,
  'ch4-15-unfair-coin':       ch4UnfairCoin     as unknown as ProblemWalkthrough,
  'ch4-16-fair-from-unfair-coin': ch4FairFromUnfair as unknown as ProblemWalkthrough,
  'ch4-17-dart-game':         ch4DartGame       as unknown as ProblemWalkthrough,
  'ch4-18-birthday-line':     ch4BirthdayLine   as unknown as ProblemWalkthrough,
  'ch4-19-dice-order':        ch4DiceOrder      as unknown as ProblemWalkthrough,
  'ch4-20-monty-hall':        ch4MontyHall      as unknown as ProblemWalkthrough,
  'backward-induction':       techBackInd       as unknown as Technique,
  'logic-reasoning':          techLogicReason   as unknown as Technique,
  'coloring-arguments':       techColoring      as unknown as Technique,
  'invariant-arguments':      techInvariant     as unknown as Technique,
  'thinking-out-of-the-box':  techOOTB          as unknown as Technique,
  'symmetry-arguments':       techSymmetry      as unknown as Technique,
  'series-summation':         techSeries        as unknown as Technique,
  'pigeon-hole-principle':    techPigeonHole    as unknown as Technique,
  'modular-arithmetic':       techModular       as unknown as Technique,
  'math-induction':           techMathInduction as unknown as Technique,
  'proof-by-contradiction':   techContradiction as unknown as Technique,
  'limits-and-derivatives':   techLimDeriv      as unknown as Technique,
  'integration-techniques':   techIntegration   as unknown as Technique,
  'taylor-series':            techTaylor        as unknown as Technique,
  'newton-method':            techNewton        as unknown as Technique,
  'lagrange-multipliers':     techLagrange      as unknown as Technique,
  'ordinary-differential-equations': techODE    as unknown as Technique,
  'linear-algebra-techniques': techLinAlg       as unknown as Technique,
  'probability-foundations':  techProbFound     as unknown as Technique,
  'combinatorial-counting':   techCombiCount    as unknown as Technique,
  'conditional-probability-and-bayes': techCondProb as unknown as Technique,
};

export function getInteractiveDoc(id: string): InteractiveDoc | null {
  return REGISTRY[id] ?? null;
}

export function listInteractiveDocs(): InteractiveDoc[] {
  return Object.values(REGISTRY);
}

/** Reading sections and problem walkthroughs only — used by /interactive routes. */
export function listInteractiveContent(): (ReadingSection | ProblemWalkthrough)[] {
  return Object.values(REGISTRY).filter(
    (d): d is ReadingSection | ProblemWalkthrough => d.kind !== 'technique',
  );
}

export function listInteractiveDocsByChapter(chapter: number): InteractiveDoc[] {
  return Object.values(REGISTRY).filter(
    (d): d is ReadingSection | ProblemWalkthrough => d.kind !== 'technique' && d.chapter === chapter,
  );
}

export function listTechniques(): Technique[] {
  return Object.values(REGISTRY).filter(
    (d): d is Technique => d.kind === 'technique',
  );
}

export function getTechnique(id: string): Technique | null {
  const doc = REGISTRY[id];
  return doc && doc.kind === 'technique' ? doc : null;
}
