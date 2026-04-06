'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { loadTextSettings, saveTextSettings } from '@/lib/storage';
import type { TextSettings, FontFamily } from '@/lib/types';
import { DEFAULT_TEXT_SETTINGS } from '@/lib/types';

/* ── Font CSS mapping ────────────────────────────────────────────────────── */
export const FONT_FAMILIES: { value: FontFamily; label: string; css: string }[] = [
  { value: 'inter',   label: 'Inter',   css: 'var(--font-inter), system-ui, sans-serif' },
  { value: 'lora',    label: 'Lora',    css: 'var(--font-lora), Georgia, serif' },
  { value: 'georgia', label: 'Georgia', css: 'Georgia, "Times New Roman", serif' },
  { value: 'mono',    label: 'Mono',    css: 'var(--font-mono), "Courier New", monospace' },
];

export const FONT_SIZE_RANGE  = { min: 13, max: 24, step: 1 };
export const LINE_HEIGHT_RANGE = { min: 1.3, max: 2.4, step: 0.1 };
export const LETTER_SPACING_RANGE = { min: -0.02, max: 0.08, step: 0.01 };

/* ── Context type ────────────────────────────────────────────────────────── */
interface TextSettingsContextValue {
  settings: TextSettings;
  setFontSize: (v: number) => void;
  setFontFamily: (v: FontFamily) => void;
  setLineHeight: (v: number) => void;
  setLetterSpacing: (v: number) => void;
  setTheme: (v: TextSettings['theme']) => void;
  reset: () => void;
  cssVars: React.CSSProperties;
}

const TextSettingsContext = createContext<TextSettingsContextValue | null>(null);

/* ── Provider ────────────────────────────────────────────────────────────── */
export function TextSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<TextSettings>(DEFAULT_TEXT_SETTINGS);

  /* Hydrate on mount */
  useEffect(() => {
    setSettings(loadTextSettings());
  }, []);

  /* Persist on change */
  useEffect(() => {
    saveTextSettings(settings);
    /* Apply reading theme to document root for CSS vars */
    document.documentElement.setAttribute(
      'data-reading-theme',
      settings.theme
    );
    /* Inject CSS custom properties for reading content */
    document.documentElement.style.setProperty(
      '--reading-font-size',
      `${settings.fontSize}px`
    );
    document.documentElement.style.setProperty(
      '--reading-line-height',
      `${settings.lineHeight}`
    );
    document.documentElement.style.setProperty(
      '--reading-letter-spacing',
      `${settings.letterSpacing}em`
    );
  }, [settings]);

  const update = useCallback(
    (patch: Partial<TextSettings>) =>
      setSettings((prev) => ({ ...prev, ...patch })),
    []
  );

  const setFontSize      = useCallback((v: number) => update({ fontSize: v }), [update]);
  const setFontFamily    = useCallback((v: FontFamily) => update({ fontFamily: v }), [update]);
  const setLineHeight    = useCallback((v: number) => update({ lineHeight: v }), [update]);
  const setLetterSpacing = useCallback((v: number) => update({ letterSpacing: v }), [update]);
  const setTheme         = useCallback((v: TextSettings['theme']) => update({ theme: v }), [update]);
  const reset            = useCallback(() => setSettings(DEFAULT_TEXT_SETTINGS), []);

  /* CSS vars object for inline style application */
  const cssVars = useMemo<React.CSSProperties>(() => {
    const fontEntry = FONT_FAMILIES.find((f) => f.value === settings.fontFamily);
    return {
      '--reading-font-size':       `${settings.fontSize}px`,
      '--reading-line-height':     `${settings.lineHeight}`,
      '--reading-letter-spacing':  `${settings.letterSpacing}em`,
      fontFamily:      fontEntry?.css ?? FONT_FAMILIES[0].css,
      fontSize:        `${settings.fontSize}px`,
      lineHeight:      `${settings.lineHeight}`,
      letterSpacing:   `${settings.letterSpacing}em`,
    } as React.CSSProperties;
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      setFontSize,
      setFontFamily,
      setLineHeight,
      setLetterSpacing,
      setTheme,
      reset,
      cssVars,
    }),
    [settings, setFontSize, setFontFamily, setLineHeight, setLetterSpacing, setTheme, reset, cssVars]
  );

  return (
    <TextSettingsContext.Provider value={value}>
      {children}
    </TextSettingsContext.Provider>
  );
}

export function useTextSettings() {
  const ctx = useContext(TextSettingsContext);
  if (!ctx) throw new Error('useTextSettings must be used within TextSettingsProvider');
  return ctx;
}
