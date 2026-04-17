'use client';

/**
 * useHaptics — micro-feedback for reading interactions.
 *
 * Web Vibration API + optional WebAudio sine ping for desktop.
 * Respects the user's `hapticsEnabled` / `audioFeedback` settings
 * and `prefers-reduced-motion`.
 *
 * Usage:
 *   const haptic = useHaptics();
 *   haptic.tap();            // short 6ms — taps, toggles
 *   haptic.success();        // two-pulse — question correct, milestone
 *   haptic.select();         // 10ms — highlight complete
 */
import { useMemo } from 'react';
import { useReadingSettings } from '../reading-settings/useReadingSettings';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function buzz(pattern) {
  if (typeof navigator === 'undefined') return;
  if (reduced()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* no-op */
  }
}

let audioCtx = null;
function ping(freq = 880, durationMs = 60) {
  if (typeof window === 'undefined') return;
  if (reduced()) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    // Quick fade-in/out — no clicks.
    gain.gain.linearRampToValueAtTime(0.04, now + 0.005);
    gain.gain.linearRampToValueAtTime(0,     now + durationMs / 1000);
    osc.start(now);
    osc.stop(now + durationMs / 1000 + 0.02);
  } catch {
    /* no-op */
  }
}

export function useHaptics() {
  const hapticsEnabled = useReadingSettings((s) => s.hapticsEnabled);
  const audioFeedback  = useReadingSettings((s) => s.audioFeedback);

  return useMemo(
    () => ({
      tap: () => {
        if (hapticsEnabled) buzz(6);
        if (audioFeedback) ping(1200, 35);
      },
      select: () => {
        if (hapticsEnabled) buzz(10);
        if (audioFeedback) ping(880, 60);
      },
      success: () => {
        if (hapticsEnabled) buzz([8, 40, 16]);
        if (audioFeedback) { ping(660, 80); setTimeout(() => ping(990, 100), 60); }
      },
      warn: () => {
        if (hapticsEnabled) buzz([14, 60, 14]);
        if (audioFeedback) ping(330, 120);
      },
    }),
    [hapticsEnabled, audioFeedback]
  );
}
