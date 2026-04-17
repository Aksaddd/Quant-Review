'use client';

/**
 * useIdleChrome — auto-hide chrome (top bar, sidebar, mobile nav) when the
 * user is actively reading. TS port of ui-bundle/hooks/useIdleChrome.js
 * bound to `useReadingSettingsStore.chromeAutoHide`.
 *
 * Chrome reveals on mousemove, scroll-up, keydown, touchstart, and
 * re-hides after `idleMs` (default 2500ms) of inactivity.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useReadingSettingsStore } from '@/stores/useReadingSettingsStore';

interface Options {
  idleMs?: number;
  initiallyVisible?: boolean;
}

export function useIdleChrome({
  idleMs = 2500,
  initiallyVisible = true,
}: Options = {}) {
  const autoHide = useReadingSettingsStore((s) => s.chromeAutoHide);
  const [visible, setVisible] = useState(initiallyVisible);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScroll = useRef(0);

  const show = useCallback(() => {
    setVisible(true);
    if (!autoHide) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), idleMs);
  }, [autoHide, idleMs]);

  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!autoHide) {
      setVisible(true);
      return;
    }

    const onMove  = () => show();
    const onKey   = () => show();
    const onTouch = () => show();
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastScroll.current - 8) show();
      else if (y > lastScroll.current + 32) setVisible(false);
      lastScroll.current = y;
    };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('keydown',    onKey);
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('scroll',     onScroll, { passive: true });
    show();

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('keydown',    onKey);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('scroll',     onScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [autoHide, idleMs, show]);

  return { visible, show, hide };
}
