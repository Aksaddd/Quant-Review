'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ── XP Constants ─────────────────────────────────────────────────────── */

/** XP awarded per action */
export const XP_REWARDS = {
  problemSolved:       25,
  problemSolvedNoHint: 50,  // bonus for solving without any hints
  problemSolvedHard:   40,  // hard difficulty bonus
  hintFreeHardSolve:   75,  // hard + no hints = fiero moment
  flashcardReview:      5,
  flashcardMastered:   15,
  dailyStreak:         10,  // per day of active streak
  sessionComplete:     20,
} as const;

/** Level thresholds — XP required to reach each level */
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  300,    // Level 3
  600,    // Level 4
  1000,   // Level 5
  1500,   // Level 6
  2200,   // Level 7
  3000,   // Level 8
  4000,   // Level 9
  5500,   // Level 10
] as const;

export const LEVEL_TITLES = [
  'Beginner',           // Level 1
  'Apprentice',         // Level 2
  'Problem Solver',     // Level 3
  'Analyst',            // Level 4
  'Strategist',         // Level 5
  'Expert',             // Level 6
  'Quant Thinker',      // Level 7
  'Master',             // Level 8
  'Grandmaster',        // Level 9
  'Quant Sage',         // Level 10
] as const;

/* ── Types ────────────────────────────────────────────────────────────── */

export interface XPEvent {
  type: string;
  xp: number;
  timestamp: string;
  detail?: string;
}

interface XPState {
  totalXP: number;
  events: XPEvent[];
  /** Fiero moment: set to timestamp when triggered, cleared after animation plays */
  fieroTriggeredAt: string | null;
  lastLevelUp: number | null;
}

interface XPActions {
  awardXP: (type: string, xp: number, detail?: string) => void;
  triggerFiero: () => void;
  clearFiero: () => void;
  clearLastLevelUp: () => void;
}

/* ── Derived helpers ──────────────────────────────────────────────────── */

export function getLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getLevelProgress(totalXP: number): {
  level: number;
  title: string;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progress: number; // 0–1
} {
  const level = getLevel(totalXP);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInLevel = totalXP - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const isMaxLevel = level >= LEVEL_THRESHOLDS.length;

  return {
    level,
    title: LEVEL_TITLES[level - 1] ?? 'Quant Sage',
    currentXP: totalXP,
    xpForCurrentLevel: currentThreshold,
    xpForNextLevel: nextThreshold,
    progress: isMaxLevel ? 1 : Math.min(1, xpInLevel / xpNeeded),
  };
}

/* ── Store ────────────────────────────────────────────────────────────── */

export const useXPStore = create<XPState & XPActions>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      events: [],
      fieroTriggeredAt: null,
      lastLevelUp: null,

      awardXP: (type, xp, detail) => {
        const prevLevel = getLevel(get().totalXP);
        const event: XPEvent = {
          type,
          xp,
          timestamp: new Date().toISOString(),
          detail,
        };
        const newTotal = get().totalXP + xp;
        const newLevel = getLevel(newTotal);
        set({
          totalXP: newTotal,
          events: [...get().events.slice(-99), event], // keep last 100
          lastLevelUp: newLevel > prevLevel ? newLevel : get().lastLevelUp,
        });
      },

      triggerFiero: () => set({ fieroTriggeredAt: new Date().toISOString() }),
      clearFiero: () => set({ fieroTriggeredAt: null }),
      clearLastLevelUp: () => set({ lastLevelUp: null }),
    }),
    {
      name: 'qr:xp',
    }
  )
);
