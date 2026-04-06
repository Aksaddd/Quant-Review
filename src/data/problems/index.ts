import { Problem } from '@/lib/types';

import screwyPirates     from './ch2-01-screwy-pirates';
import tigerAndSheep     from './ch2-02-tiger-and-sheep';
import riverCrossing     from './ch2-03-river-crossing';
import birthdayProblem   from './ch2-04-birthday-problem';
import cardGame          from './ch2-05-card-game';
import burningRopes      from './ch2-06-burning-ropes';
import defectiveBall     from './ch2-07-defective-ball';
import trailingZeros     from './ch2-08-trailing-zeros';
import horseRace         from './ch2-09-horse-race';
import infiniteSequence  from './ch2-10-infinite-sequence';
import boxPacking        from './ch2-11-box-packing';
import calendarCubes     from './ch2-12-calendar-cubes';
import doorToOffer       from './ch2-13-door-to-offer';
import messageDelivery   from './ch2-14-message-delivery';
import lastBall          from './ch2-15-last-ball';
import lightSwitches     from './ch2-16-light-switches';
import quantSalary       from './ch2-17-quant-salary';
import coinPiles         from './ch2-18-coin-piles';
import mislabeledBags    from './ch2-19-mislabeled-bags';
import wiseMen           from './ch2-20-wise-men';
import clockPieces       from './ch2-21-clock-pieces';
import missingIntegers   from './ch2-22-missing-integers';
import counterfeitCoinsI from './ch2-23-counterfeit-coins-i';
import glassBalls        from './ch2-24-glass-balls';
import matchingSocks     from './ch2-25-matching-socks';
import handshakes        from './ch2-26-handshakes';
import haveWeMet         from './ch2-27-have-we-met';
import antsOnSquare      from './ch2-28-ants-on-square';
import counterfeitCoinsII from './ch2-29-counterfeit-coins-ii';
import prisonerProblem   from './ch2-30-prisoner-problem';
import divisionBy9       from './ch2-31-division-by-9';
import chameleonColors   from './ch2-32-chameleon-colors';
import coinSplit         from './ch2-33-coin-split';
import chocolateBar      from './ch2-34-chocolate-bar';
import raceTrack         from './ch2-35-race-track';
import irrationalNumber  from './ch2-36-irrational-number';
import rainbowHats       from './ch2-37-rainbow-hats';

export const chapter2Problems: Problem[] = [
  screwyPirates,
  tigerAndSheep,
  riverCrossing,
  birthdayProblem,
  cardGame,
  burningRopes,
  defectiveBall,
  trailingZeros,
  horseRace,
  infiniteSequence,
  boxPacking,
  calendarCubes,
  doorToOffer,
  messageDelivery,
  lastBall,
  lightSwitches,
  quantSalary,
  coinPiles,
  mislabeledBags,
  wiseMen,
  clockPieces,
  missingIntegers,
  counterfeitCoinsI,
  glassBalls,
  matchingSocks,
  handshakes,
  haveWeMet,
  antsOnSquare,
  counterfeitCoinsII,
  prisonerProblem,
  divisionBy9,
  chameleonColors,
  coinSplit,
  chocolateBar,
  raceTrack,
  irrationalNumber,
  rainbowHats,
];

/** All problems indexed by id for O(1) lookup */
export const problemsById: Record<string, Problem> = Object.fromEntries(
  chapter2Problems.map((p) => [p.id, p])
);

/** Problems grouped by section */
export const problemsBySection: Record<string, Problem[]> = chapter2Problems.reduce(
  (acc, p) => {
    if (!acc[p.section]) acc[p.section] = [];
    acc[p.section].push(p);
    return acc;
  },
  {} as Record<string, Problem[]>
);

export const SECTIONS = [
  { id: '2.1', title: 'Problem Simplification' },
  { id: '2.2', title: 'Logic Reasoning' },
  { id: '2.3', title: 'Thinking Out of the Box' },
  { id: '2.4', title: 'Application of Symmetry' },
  { id: '2.5', title: 'Series Summation' },
  { id: '2.6', title: 'The Pigeon Hole Principle' },
  { id: '2.7', title: 'Modular Arithmetic' },
  { id: '2.8', title: 'Math Induction' },
  { id: '2.9', title: 'Proof by Contradiction' },
] as const;
