import type { Principle } from '@/lib/types';

import broadKnowledge        from './ch1-01-broad-knowledge';
import practiceSkills        from './ch1-02-practice-skills';
import listenCarefully       from './ch1-03-listen-carefully';
import speakYourMind         from './ch1-04-speak-your-mind';
import reasonableAssumptions from './ch1-05-reasonable-assumptions';

export const chapter1Principles: Principle[] = [
  broadKnowledge,
  practiceSkills,
  listenCarefully,
  speakYourMind,
  reasonableAssumptions,
];

export const principlesById: Record<string, Principle> = Object.fromEntries(
  chapter1Principles.map((p) => [p.id, p])
);
