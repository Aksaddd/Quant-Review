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
import techBackInd       from '../../../content/interactive/techniques/backward-induction.json';
import techLogicReason   from '../../../content/interactive/techniques/logic-reasoning.json';
import techColoring      from '../../../content/interactive/techniques/coloring-arguments.json';
import techInvariant     from '../../../content/interactive/techniques/invariant-arguments.json';
import techOOTB          from '../../../content/interactive/techniques/thinking-out-of-the-box.json';
import techSymmetry      from '../../../content/interactive/techniques/symmetry-arguments.json';

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
  'backward-induction':       techBackInd       as unknown as Technique,
  'logic-reasoning':          techLogicReason   as unknown as Technique,
  'coloring-arguments':       techColoring      as unknown as Technique,
  'invariant-arguments':      techInvariant     as unknown as Technique,
  'thinking-out-of-the-box':  techOOTB          as unknown as Technique,
  'symmetry-arguments':       techSymmetry      as unknown as Technique,
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
