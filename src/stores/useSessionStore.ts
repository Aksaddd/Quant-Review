'use client';

import { create } from 'zustand';

/* ── Session timer store ──────────────────────────────────────────────── */

interface SessionState {
  /** ISO timestamp when this study session started */
  sessionStart: string | null;
  /** Whether the break nudge has been shown for current session */
  breakNudgeShown: boolean;
  /** Whether the "come back tomorrow" message has been dismissed today */
  tomorrowNudgeDismissed: boolean;
  /** Focus mode active */
  focusModeActive: boolean;
}

interface SessionActions {
  startSession: () => void;
  showBreakNudge: () => void;
  resetBreakNudge: () => void;
  dismissTomorrowNudge: () => void;
  toggleFocusMode: () => void;
  setFocusMode: (active: boolean) => void;
}

export const useSessionStore = create<SessionState & SessionActions>()((set) => ({
  sessionStart: null,
  breakNudgeShown: false,
  tomorrowNudgeDismissed: false,
  focusModeActive: false,

  startSession: () =>
    set({ sessionStart: new Date().toISOString(), breakNudgeShown: false }),

  showBreakNudge: () => set({ breakNudgeShown: true }),
  resetBreakNudge: () => set({ breakNudgeShown: false }),
  dismissTomorrowNudge: () => set({ tomorrowNudgeDismissed: true }),

  toggleFocusMode: () => set((s) => ({ focusModeActive: !s.focusModeActive })),
  setFocusMode: (active) => set({ focusModeActive: active }),
}));
