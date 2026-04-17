'use client';

/**
 * useTextSettings — compatibility adapter over `useReadingSettingsStore`.
 *
 * Preserves the exact shape consumers depended on when this was backed by
 * React context: `{ settings, cssVars, setFontSize, ..., reset }`.
 * New Apple/flow-state fields live on the store directly; consumers
 * that want them should use `useReadingSettingsStore` instead.
 */
import { useMemo } from 'react';
import {
  useReadingSettingsStore,
  FONT_FAMILIES,
  type TextSettings,
} from '@/stores/useReadingSettingsStore';

export function useTextSettings() {
  const fontSize      = useReadingSettingsStore((s) => s.fontSize);
  const fontFamily    = useReadingSettingsStore((s) => s.fontFamily);
  const lineHeight    = useReadingSettingsStore((s) => s.lineHeight);
  const letterSpacing = useReadingSettingsStore((s) => s.letterSpacing);
  const theme         = useReadingSettingsStore((s) => s.theme);
  const mathScale     = useReadingSettingsStore((s) => s.mathScale);

  const setFontSize      = useReadingSettingsStore((s) => s.setFontSize);
  const setFontFamily    = useReadingSettingsStore((s) => s.setFontFamily);
  const setLineHeight    = useReadingSettingsStore((s) => s.setLineHeight);
  const setLetterSpacing = useReadingSettingsStore((s) => s.setLetterSpacing);
  const setTheme         = useReadingSettingsStore((s) => s.setTheme);
  const setMathScale     = useReadingSettingsStore((s) => s.setMathScale);
  const reset            = useReadingSettingsStore((s) => s.reset);

  const settings: TextSettings = useMemo(
    () => ({ fontSize, fontFamily, lineHeight, letterSpacing, theme, mathScale }),
    [fontSize, fontFamily, lineHeight, letterSpacing, theme, mathScale]
  );

  const cssVars = useMemo<React.CSSProperties>(() => {
    const fontEntry = FONT_FAMILIES.find((f) => f.value === fontFamily);
    return {
      '--reading-font-size':       `${fontSize}px`,
      '--reading-line-height':     `${lineHeight}`,
      '--reading-letter-spacing':  `${letterSpacing}em`,
      '--math-scale':              `${mathScale}`,
      fontFamily:    fontEntry?.css ?? FONT_FAMILIES[0].css,
      fontSize:      `${fontSize}px`,
      lineHeight:    `${lineHeight}`,
      letterSpacing: `${letterSpacing}em`,
    } as React.CSSProperties;
  }, [fontSize, fontFamily, lineHeight, letterSpacing, mathScale]);

  return {
    settings,
    cssVars,
    setFontSize,
    setFontFamily,
    setLineHeight,
    setLetterSpacing,
    setTheme,
    setMathScale,
    reset,
  };
}
