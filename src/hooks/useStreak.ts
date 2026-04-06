'use client';

import { useState, useEffect } from 'react';

const STREAK_KEY = 'qr-streak';
const LAST_ACTIVE_KEY = 'qr-last-active';

interface StreakData {
  streak: number;
  lastActive: string | null; // ISO date string YYYY-MM-DD
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function useStreak() {
  const [data, setData] = useState<StreakData>({ streak: 0, lastActive: null });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
      const saved: StreakData = raw ? JSON.parse(raw) : { streak: 0, lastActive: null };

      // Check if streak broke (no activity yesterday or today)
      const today = todayISO();
      const yesterday = yesterdayISO();

      if (saved.lastActive && saved.lastActive !== today && saved.lastActive !== yesterday) {
        // Streak broke
        saved.streak = 0;
        saved.lastActive = null;
        localStorage.setItem(STREAK_KEY, JSON.stringify(saved));
      }

      setData(saved);
    } catch {
      // ignore
    }
  }, []);

  function recordActivity() {
    const today = todayISO();
    setData((prev) => {
      if (prev.lastActive === today) return prev; // already recorded today

      const yesterday = yesterdayISO();
      const newStreak = prev.lastActive === yesterday ? prev.streak + 1 : 1;
      const updated = { streak: newStreak, lastActive: today };

      try {
        localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }

      return updated;
    });
  }

  return { streak: data.streak, lastActive: data.lastActive, recordActivity };
}
