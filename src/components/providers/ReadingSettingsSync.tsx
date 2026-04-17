'use client';

/**
 * ReadingSettingsSync — side-effect sink.
 *
 * Zustand stores don't touch the DOM on their own; this null component
 * applies `data-reading-theme`, `data-accent`, and CSS custom properties
 * to `document.documentElement` whenever the store changes. Mount once
 * near the top of the authenticated tree (inside AppShell).
 */
import { useEffect } from 'react';
import {
  useReadingSettingsStore,
  ACCENT_HUES,
} from '@/stores/useReadingSettingsStore';

export default function ReadingSettingsSync() {
  const theme          = useReadingSettingsStore((s) => s.theme);
  const accent         = useReadingSettingsStore((s) => s.accent);
  const fontSize       = useReadingSettingsStore((s) => s.fontSize);
  const lineHeight     = useReadingSettingsStore((s) => s.lineHeight);
  const letterSpacing  = useReadingSettingsStore((s) => s.letterSpacing);
  const mathScale      = useReadingSettingsStore((s) => s.mathScale);
  const textContrast   = useReadingSettingsStore((s) => s.textContrast);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-reading-theme', theme);
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-text-contrast', textContrast);

    const accentHue = ACCENT_HUES[accent]?.hue ?? ACCENT_HUES.teal.hue;
    root.style.setProperty('--eureka-accent', accentHue);
    root.style.setProperty(
      '--eureka-accent-tint',
      `color-mix(in oklch, ${accentHue} 8%, transparent)`
    );
    root.style.setProperty(
      '--eureka-accent-tint-strong',
      `color-mix(in oklch, ${accentHue} 14%, transparent)`
    );

    root.style.setProperty('--reading-font-size',      `${fontSize}px`);
    root.style.setProperty('--reading-line-height',    `${lineHeight}`);
    root.style.setProperty('--reading-letter-spacing', `${letterSpacing}em`);
    root.style.setProperty('--math-scale',             `${mathScale}`);
  }, [theme, accent, textContrast, fontSize, lineHeight, letterSpacing, mathScale]);

  return null;
}
