'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Light active-recall overlay store.
 *
 * Drives the reader-level Study Overlay: when `enabled`, content wrapped in
 * <RecallMask/> is hidden behind a "try to recall" gate that forces generation
 * before reveal — the strongest single intervention identified in
 * content/Research/Synthesis (retrieval practice, generation effect).
 *
 * Only the toggle is persisted. Per-card recall ratings live in session
 * counters so each reading session starts fresh, matching the "one sitting =
 * one retrieval round" framing in the Make It Stick / How We Learn sources.
 */

export type RecallOutcome = 'got' | 'partial' | 'blank';

interface StudyOverlayState {
  enabled: boolean;
  /** When false, masks pass-through even if overlay is enabled (peek mode). */
  masksOn: boolean;
  /** ISO timestamp of the current session's first recall — null if none yet. */
  sessionStartedAt: string | null;
  counts: { got: number; partial: number; blank: number };
  /** Mask ids already revealed in the current session (prevents double-counting). */
  revealed: string[];
  /** Incremented on resetSession so <RecallMask/> can clear its local state. */
  resetToken: number;
}

interface StudyOverlayActions {
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
  toggleMasks: () => void;
  markRevealed: (id: string, outcome: RecallOutcome) => void;
  resetSession: () => void;
}

export const useStudyOverlayStore = create<StudyOverlayState & StudyOverlayActions>()(
  persist(
    (set, get) => ({
      enabled: false,
      masksOn: true,
      sessionStartedAt: null,
      counts: { got: 0, partial: 0, blank: 0 },
      revealed: [],
      resetToken: 0,

      toggle: () => set({ enabled: !get().enabled }),
      setEnabled: (enabled) => set({ enabled }),
      toggleMasks: () => set({ masksOn: !get().masksOn }),

      markRevealed: (id, outcome) => {
        const s = get();
        if (s.revealed.includes(id)) return;
        set({
          revealed: [...s.revealed, id],
          counts: { ...s.counts, [outcome]: s.counts[outcome] + 1 },
          sessionStartedAt: s.sessionStartedAt ?? new Date().toISOString(),
        });
      },

      resetSession: () =>
        set({
          sessionStartedAt: null,
          counts: { got: 0, partial: 0, blank: 0 },
          revealed: [],
          resetToken: get().resetToken + 1,
        }),
    }),
    {
      name: 'qr:study-overlay',
      // Persist toggles across reloads; session counts stay in-memory so each
      // study session is a clean retrieval round.
      partialize: (s) => ({ enabled: s.enabled, masksOn: s.masksOn }),
    },
  ),
);
