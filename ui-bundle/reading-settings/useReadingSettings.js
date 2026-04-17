/**
 * Unified reading-settings store.
 *
 * One source of truth. Modern CSS-variable-driven shape is canonical;
 * legacy inline-style shape is derived via selectors so existing consumers
 * (SettingsPanel, ReaderView) keep working without migration.
 *
 * Persist key: `eureka-reading-settings`
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { accents } from '../design-system/designSystem';

// ---------- Canonical shape (modern) ----------
const DEFAULTS = {
  // Theme
  theme: 'system',                  // 'light' | 'dark' | 'sepia' | 'system'
  textContrast: 'normal',           // 'soft' | 'normal' | 'high'
  accent: 'teal',                   // key into accents

  // Typography
  fontFamily: 'serif',              // 'serif' | 'sans' | 'mono'
  fontSizePx: 18,                   // 14–28
  lineHeight: 1.625,                // 1.2–2.0
  headingScale: 1.0,                // 0.85–1.25 (multiplier on heading sizes)
  textAlign: 'left',                // 'left' | 'justify'

  // Geometry
  contentWidthPx: null,             // null = auto-derived from fontSize (optimal measure)
  marginWidthPx: 0,                 // optional extra outer margin
  paragraphGapEm: 1.0,
  firstLineIndentEm: 0,

  // Flow-state features
  focusMode: false,                 // typographic focus: dim non-active paragraphs
  chromeAutoHide: true,             // auto-hide chrome on idle
  hapticsEnabled: true,             // Web Vibration micro-feedback
  audioFeedback: false,             // WebAudio ping on key events (off by default)
  showImages: true,

  // Panel state (ephemeral, not persisted)
  isPanelOpen: false,
  isCommandBarOpen: false,
};

export const useReadingSettings = create(
  persist(
    (set, get) => ({
      ...DEFAULTS,

      // Modern API
      updateSetting: (key, value) => set({ [key]: value }),
      updateSettings: (obj) => set(obj),
      resetSettings: () => set(DEFAULTS),

      // ---------- Legacy-compatible API (delegates to modern keys) ----------
      // Legacy consumers used these; we keep them working.
      setFontFamily: (v) => set({ fontFamily: v }),
      setFontSize: (v) => {
        // Legacy values were 'sm' | 'md' | 'lg' | 'xl'. Map to px.
        const map = { sm: 14, md: 16, lg: 18, xl: 22 };
        set({ fontSizePx: typeof v === 'number' ? v : (map[v] ?? 18) });
      },
      setLineSpacing: (v) => {
        const map = { tight: 1.375, normal: 1.5, relaxed: 1.625, loose: 1.75 };
        set({ lineHeight: typeof v === 'number' ? v : (map[v] ?? 1.625) });
      },
      setLineLength: (v) => {
        const map = { narrow: 520, medium: 680, wide: 860 };
        set({ contentWidthPx: typeof v === 'number' ? v : (map[v] ?? null) });
      },
      setParagraphSpacing: (v) => {
        const map = { tight: 0.75, normal: 1.0, relaxed: 1.25, loose: 1.5 };
        set({ paragraphGapEm: typeof v === 'number' ? v : (map[v] ?? 1.0) });
      },
      setTheme: (v) => set({ theme: v }),
      setShowImages: (v) => set({ showImages: v }),
      togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
      openPanel:  () => set({ isPanelOpen: true }),
      closePanel: () => set({ isPanelOpen: false }),
      toggleCommandBar: () => set((s) => ({ isCommandBarOpen: !s.isCommandBarOpen })),
      toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
      resetToDefaults: () => set(DEFAULTS),
    }),
    {
      name: 'eureka-reading-settings',
      version: 2,
      // Don't persist ephemeral UI state.
      partialize: (state) => {
        const { isPanelOpen, isCommandBarOpen, ...rest } = state;
        return rest;
      },
    }
  )
);

// ---------- Selectors ----------

/** Resolve 'system' theme to a concrete 'light' | 'dark' | 'sepia'. */
export const resolveTheme = (theme) => {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Concrete theme palette for the current settings. */
export const getThemeColors = (theme, contrast = 'normal') => {
  const resolved = resolveTheme(theme);
  const palettes = {
    light: {
      background: '#ffffff',
      surface:    '#f5f5f7',
      text:       contrast === 'soft' ? '#3a3a3c' : contrast === 'high' ? '#000000' : '#1d1d1f',
      muted:      '#6e6e73',
      border:     'rgba(0,0,0,0.08)',
    },
    dark: {
      background: '#000000',
      surface:    '#1c1c1e',
      text:       contrast === 'soft' ? '#c7c7cc' : contrast === 'high' ? '#ffffff' : '#f2f2f7',
      muted:      '#8e8e93',
      border:     'rgba(255,255,255,0.1)',
    },
    sepia: {
      background: '#f5ecd7',
      surface:    '#ede1c4',
      text:       contrast === 'soft' ? '#5a4a2f' : contrast === 'high' ? '#1a1208' : '#3d2e14',
      muted:      '#8a7a5c',
      border:     'rgba(61,46,20,0.12)',
    },
  };
  return palettes[resolved] || palettes.light;
};

/** CSS font-family string from the `fontFamily` key. */
export const getFontFamilyCSS = (fontFamily) => {
  switch (fontFamily) {
    case 'sans':
      return `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif`;
    case 'mono':
      return `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace`;
    case 'serif':
    default:
      return `ui-serif, "New York", "Source Serif 4", Charter, Georgia, serif`;
  }
};

/** Accent hue from the current setting. */
export const getAccentHue = (accentKey) =>
  (accents[accentKey] || accents.teal).hue;

/** Optimal measure in px, derived from font size if not overridden. */
export const getMeasurePx = (state) => {
  if (state.contentWidthPx) return state.contentWidthPx;
  return Math.round(66 * state.fontSizePx * 0.5);
};
