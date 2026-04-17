'use client';

/**
 * useIdleChrome — auto-hide chrome (top bar, HUDs) when the user is
 * actively reading.
 *
 * Returns `visible` (boolean) and `show()` / `hide()` imperatives.
 * Chrome reveals on: mousemove, scroll-up, key, touch — then fades
 * again after `idleMs` (default 2500ms).
 *
 * Apple analogue: Safari/Books auto-hide tab bars; the top chrome
 * fades on interaction with the content area.
 */
import { useEffect, useRef, useState } from 'react';
import { useReadingSettings } from '../reading-settings/useReadingSettings';

export function useIdleChrome({ idleMs = 2500, initiallyVisible = true } = {}) {
  const autoHide = useReadingSettings((s) => s.chromeAutoHide);
  const [visible, setVisible] = useState(initiallyVisible);
  const timer = useRef(null);
  const lastScroll = useRef(0);

  const show = () => {
    setVisible(true);
    if (!autoHide) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), idleMs);
  };

  useEffect(() => {
    if (!autoHide) {
      setVisible(true);
      return;
    }

    const handleMove = () => show();
    const handleKey  = () => show();
    const handleTouch = () => show();
    const handleScroll = () => {
      const y = window.scrollY;
      // Reveal on scroll-up; hide on scroll-down past a threshold.
      if (y < lastScroll.current - 8) show();
      else if (y > lastScroll.current + 32) setVisible(false);
      lastScroll.current = y;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('keydown',   handleKey);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('scroll',    handleScroll, { passive: true });
    // Start the idle timer immediately.
    show();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer.current);
    };
  }, [autoHide, idleMs]);

  return { visible, show, hide: () => setVisible(false) };
}
