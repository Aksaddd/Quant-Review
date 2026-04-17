'use client';

/**
 * Reading settings store — single source of truth.
 *
 * Replaces the prior TextSettingsProvider (React context). Keeps the same
 * persist key (`qr:settings`) so existing saved settings carry over.
 * Adds Apple/flow-state fields: accent, focusMode, chromeAutoHide,
 * hapticsEnabled, textContrast.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamily = 'inter' | 'lora' | 'georgia' | 'mono';
export type ReadingTheme = 'light' | 'sepia' | 'dark' | 'system';
export type TextContrast = 'soft' | 'normal' | 'high';
export type AccentKey =
  | 'teal' | 'blue' | 'indigo' | 'purple'
  | 'pink' | 'orange' | 'green' | 'graphite';

// ---- Public constants (moved from TextSettingsProvider) -----------------

export const FONT_FAMILIES: { value: FontFamily; label: string; css: string }[] = [
  { value: 'inter',   label: 'Inter',   css: 'var(--font-inter), system-ui, sans-serif' },
  { value: 'lora',    label: 'Lora',    css: 'var(--font-lora), Georgia, serif' },
  { value: 'georgia', label: 'Georgia', css: 'Georgia, "Times New Roman", serif' },
  { value: 'mono',    label: 'Mono',    css: 'var(--font-mono), "Courier New", monospace' },
];

export const FONT_SIZE_RANGE      = { min: 13,    max: 24,   step: 1 };
export const LINE_HEIGHT_RANGE    = { min: 1.3,   max: 2.4,  step: 0.1 };
export const LETTER_SPACING_RANGE = { min: -0.02, max: 0.08, step: 0.01 };
export const MATH_SCALE_RANGE     = { min: 0.9,   max: 1.4,  step: 0.05 };

export const ACCENT_HUES: Record<AccentKey, { hue: string; label: string }> = {
  teal:     { hue: '#0D9488', label: 'Focus Teal' },
  blue:     { hue: '#0A84FF', label: 'System Blue' },
  indigo:   { hue: '#5E5CE6', label: 'Indigo' },
  purple:   { hue: '#BF5AF2', label: 'Purple' },
  pink:     { hue: '#FF375F', label: 'Pink' },
  orange:   { hue: '#FF9F0A', label: 'Orange' },
  green:    { hue: '#30D158', label: 'Green' },
  graphite: { hue: '#8E8E93', label: 'Graphite' },
};

// ---- State shape --------------------------------------------------------

export interface ReadingSettingsData {
  // Typography
  fontSize: number;
  fontFamily: FontFamily;
  lineHeight: number;
  letterSpacing: number;
  mathScale: number;

  // Theme
  theme: Exclude<ReadingTheme, 'system'>;  // Writes never resolve to 'system'
  textContrast: TextContrast;
  accent: AccentKey;

  // Flow-state
  focusMode: boolean;
  chromeAutoHide: boolean;
  hapticsEnabled: boolean;
}

interface ReadingSettingsActions {
  setFontSize: (v: number) => void;
  setFontFamily: (v: FontFamily) => void;
  setLineHeight: (v: number) => void;
  setLetterSpacing: (v: number) => void;
  setTheme: (v: ReadingSettingsData['theme']) => void;
  setMathScale: (v: number) => void;
  setTextContrast: (v: TextContrast) => void;
  setAccent: (v: AccentKey) => void;
  toggleFocusMode: () => void;
  setChromeAutoHide: (v: boolean) => void;
  setHapticsEnabled: (v: boolean) => void;
  reset: () => void;
}

export type ReadingSettingsState = ReadingSettingsData & ReadingSettingsActions;

export const DEFAULT_READING_SETTINGS: ReadingSettingsData = {
  fontSize: 17,
  fontFamily: 'inter',
  lineHeight: 1.8,
  letterSpacing: 0.01,
  mathScale: 1.1,
  theme: 'light',
  textContrast: 'normal',
  accent: 'teal',
  focusMode: false,
  chromeAutoHide: false,
  hapticsEnabled: true,
};

// Back-compat re-export: components still import TextSettings/DEFAULT_TEXT_SETTINGS.
export type TextSettings = Pick<
  ReadingSettingsData,
  'fontSize' | 'fontFamily' | 'lineHeight' | 'letterSpacing' | 'theme' | 'mathScale'
>;
export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  fontSize: DEFAULT_READING_SETTINGS.fontSize,
  fontFamily: DEFAULT_READING_SETTINGS.fontFamily,
  lineHeight: DEFAULT_READING_SETTINGS.lineHeight,
  letterSpacing: DEFAULT_READING_SETTINGS.letterSpacing,
  theme: DEFAULT_READING_SETTINGS.theme,
  mathScale: DEFAULT_READING_SETTINGS.mathScale,
};

// ---- Store --------------------------------------------------------------

export const useReadingSettingsStore = create<ReadingSettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_READING_SETTINGS,

      setFontSize:       (v) => set({ fontSize: v }),
      setFontFamily:     (v) => set({ fontFamily: v }),
      setLineHeight:     (v) => set({ lineHeight: v }),
      setLetterSpacing:  (v) => set({ letterSpacing: v }),
      setTheme:          (v) => set({ theme: v }),
      setMathScale:      (v) => set({ mathScale: v }),
      setTextContrast:   (v) => set({ textContrast: v }),
      setAccent:         (v) => set({ accent: v }),
      toggleFocusMode:   () => set((s) => ({ focusMode: !s.focusMode })),
      setChromeAutoHide: (v) => set({ chromeAutoHide: v }),
      setHapticsEnabled: (v) => set({ hapticsEnabled: v }),
      reset:             () => set(DEFAULT_READING_SETTINGS),
    }),
    {
      name: 'qr:settings',
      version: 4,
      // Merge with defaults so new fields (accent, focusMode, ...) backfill
      // for users restoring v1/v2 data.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<ReadingSettingsData>),
      }),
      // v4 resets chromeAutoHide — prior default of `true` caused the sidebar
      // to vanish after 2.5s of inactivity on every page.
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<ReadingSettingsData>;
        if (version < 4) {
          return { ...state, chromeAutoHide: false };
        }
        return state;
      },
    }
  )
);
