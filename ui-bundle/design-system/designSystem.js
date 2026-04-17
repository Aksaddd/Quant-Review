/**
 * Eureka design system — Apple-inspired, flow-state tuned.
 *
 * Design principles (from HIG + flow-state research):
 *   1. Deference — chrome disappears, content leads.
 *   2. Clarity — one accent, luminance-based hierarchy, ≥4.5:1 contrast for body.
 *   3. Depth — SF-style materials (blur + saturation), not drop shadows.
 *   4. Motion as meaning — spring physics, never linear, never decorative.
 *   5. Single locus of attention — every surface has exactly one primary focus.
 */

// ---------- Materials (SF-style translucency) ----------
// Apply as `background: materials.thin.light` + `backdrop-filter: thin.filter`.
export const materials = {
  ultraThin: {
    light: 'rgba(255, 255, 255, 0.55)',
    dark: 'rgba(28, 28, 30, 0.55)',
    filter: 'blur(20px) saturate(180%)',
  },
  thin: {
    light: 'rgba(255, 255, 255, 0.72)',
    dark: 'rgba(28, 28, 30, 0.72)',
    filter: 'blur(30px) saturate(180%)',
  },
  regular: {
    light: 'rgba(255, 255, 255, 0.82)',
    dark: 'rgba(28, 28, 30, 0.82)',
    filter: 'blur(40px) saturate(180%)',
  },
  thick: {
    light: 'rgba(255, 255, 255, 0.92)',
    dark: 'rgba(28, 28, 30, 0.92)',
    filter: 'blur(50px) saturate(180%)',
  },
};

// ---------- Luminance palette (monochromatic; accent is user-selectable) ----------
// Use luminance steps for hierarchy. Color is reserved for accent + state.
export const luminance = {
  light: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f7',   // Apple light canvas
    200: '#e8e8ed',
    300: '#d2d2d7',
    400: '#a1a1a6',
    500: '#86868b',
    600: '#6e6e73',
    700: '#424245',
    800: '#1d1d1f',   // Apple primary text
    900: '#000000',
  },
  dark: {
    0: '#000000',
    50: '#0a0a0a',
    100: '#1c1c1e',   // Apple dark canvas
    200: '#2c2c2e',
    300: '#3a3a3c',
    400: '#48484a',
    500: '#636366',
    600: '#8e8e93',
    700: '#aeaeb2',
    800: '#f2f2f7',   // Apple primary text on dark
    900: '#ffffff',
  },
};

// ---------- Accent (user-pickable; default is Focus Teal but intentionally muted) ----------
export const accents = {
  teal:   { hue: '#0D9488', label: 'Focus Teal' },   // original
  blue:   { hue: '#0A84FF', label: 'System Blue' },  // iOS 17 blue
  indigo: { hue: '#5E5CE6', label: 'Indigo' },
  purple: { hue: '#BF5AF2', label: 'Purple' },
  pink:   { hue: '#FF375F', label: 'Pink' },
  orange: { hue: '#FF9F0A', label: 'Orange' },
  green:  { hue: '#30D158', label: 'Green' },
  graphite: { hue: '#8E8E93', label: 'Graphite' },  // no accent (fully monochromatic)
};

// ---------- State (glyph + 8% tint only; never full-color swatches) ----------
// For Bloom levels and mastery, use glyphs and optional tint.
// Tint = `color-mix(in oklch, accent 8%, transparent)` at render time.
export const state = {
  bloom: {
    remember:   { glyph: '◦', label: 'Remember'   },
    understand: { glyph: '◯', label: 'Understand' },
    apply:      { glyph: '◉', label: 'Apply'      },
    analyze:    { glyph: '◈', label: 'Analyze'    },
    evaluate:   { glyph: '◆', label: 'Evaluate'   },
    create:     { glyph: '✦', label: 'Create'     },
  },
  mastery: {
    new:       { glyph: '·',  tintPct: 0 },
    learning:  { glyph: '◐',  tintPct: 6 },
    reviewing: { glyph: '◑',  tintPct: 10 },
    mastered:  { glyph: '●',  tintPct: 14 },
  },
};

// ---------- Typography ----------
// System-font-first (falls back to web fonts). Matches Apple feel natively on macOS/iOS.
export const typography = {
  fontFamily: {
    // SF Pro Text on Apple devices, Inter elsewhere.
    ui: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif`,
    // New York on Apple devices; Source Serif 4 elsewhere.
    reading: `ui-serif, "New York", "Source Serif 4", Charter, Georgia, serif`,
    // SF Mono on Apple devices; JetBrains Mono elsewhere.
    mono: `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace`,
  },
  // Modular scale (1.2 minor third — calm, reading-optimized).
  scale: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    base: '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl':'1.5rem',
    '3xl':'1.875rem',
    '4xl':'2.25rem',
    '5xl':'3rem',
  },
  // Reading-tuned line heights.
  leading: {
    tight:   1.2,   // headings
    snug:    1.375,
    normal:  1.5,
    relaxed: 1.625, // default body
    loose:   1.75,
    airy:    2.0,
  },
  // Optical tracking (tighter for display, looser for small).
  tracking: {
    tightest: '-0.04em',
    tighter:  '-0.02em',
    tight:    '-0.01em',
    normal:   '0',
    wide:     '0.01em',
    wider:    '0.02em',
  },
  weight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
};

// ---------- Reading geometry ----------
// Optimal measure is 58–72 characters; we auto-clamp from font size.
export const reading = {
  measureCh: { min: 58, ideal: 66, max: 72 },
  // Rule of thumb: pxWidth ≈ charsPerLine * fontSizePx * 0.5
  computeMeasurePx: (fontSizePx, charsPerLine = 66) =>
    Math.round(charsPerLine * fontSizePx * 0.5),
  // Active-paragraph contrast in focus mode.
  focus: {
    activeOpacity:   1.0,
    inactiveOpacity: 0.38,
    transitionMs:    280,
  },
};

// ---------- Spacing (4px base, unchanged — it's already good) ----------
export const spacing = {
  0:  '0',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

// ---------- Radii (Apple prefers continuous/squircle curves; we approximate) ----------
export const radii = {
  xs:   '4px',
  sm:   '6px',
  md:   '10px',
  lg:   '14px',
  xl:   '20px',
  '2xl':'28px',
  '3xl':'36px',
  full: '9999px',
};

// ---------- Shadows (minimal; depth is achieved via materials, not shadows) ----------
export const shadows = {
  none: 'none',
  // Only used for floating HUDs on top of content.
  hud: '0 0 0 0.5px rgba(0,0,0,0.08), 0 10px 40px -12px rgba(0,0,0,0.25)',
  hudDark: '0 0 0 0.5px rgba(255,255,255,0.08), 0 10px 40px -12px rgba(0,0,0,0.6)',
  // Subtle, for raised affordances.
  soft: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)',
};

// ---------- Motion (spring-first; durations fall out of physics) ----------
// Cubic-beziers tuned to match Apple's feel.
export const motion = {
  // The one ease curve you'll use 90% of the time. Apple's "standard" easing.
  ease: {
    standard:  'cubic-bezier(0.22, 1, 0.36, 1)',    // ease-out, slight overshoot feel
    emphasized:'cubic-bezier(0.2, 0.8, 0.2, 1)',    // used for entrance
    soft:      'cubic-bezier(0.4, 0.0, 0.2, 1)',    // ease-in-out
    linear:    'linear',                             // only for progress bars
  },
  duration: {
    micro:   120,  // hover tints, focus rings
    short:   220,  // tooltips, chrome reveal
    medium:  320,  // HUD fade, panel transitions (default)
    long:    480,  // page transitions
    reading: 280,  // focus-mode paragraph crossfade
  },
  // framer-motion spring presets — prefer these over duration when possible.
  spring: {
    // Default. Natural, responsive. Use for HUD, buttons, sliders.
    default:  { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },
    // Gentle. Use for large surfaces and page-level transitions.
    gentle:   { type: 'spring', stiffness: 220, damping: 28, mass: 1.0 },
    // Snappy. Use for taps, toggles.
    snappy:   { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 },
    // Bouncy. Reserved for celebratory feedback (answer correct, milestone).
    bouncy:   { type: 'spring', stiffness: 320, damping: 14, mass: 0.9 },
  },
};

// ---------- Breakpoints ----------
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ---------- Global CSS (keyframes, focus ring, scrollbar, reading base) ----------
export const globalStyles = `
  /* Font fallbacks (only loaded if system fonts unavailable) */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    color-scheme: light dark;
    --eureka-accent: ${accents.teal.hue};
    --eureka-accent-tint: color-mix(in oklch, var(--eureka-accent) 8%, transparent);
    --eureka-accent-tint-strong: color-mix(in oklch, var(--eureka-accent) 14%, transparent);
    --eureka-ease: ${motion.ease.standard};
    --eureka-dur-medium: ${motion.duration.medium}ms;
  }

  /* Smooth out all user-initiated scrolling */
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Apple-style focus ring (tight, accent-tinted, never yellow) */
  .eureka-active :focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--eureka-accent-tint-strong),
                0 0 0 1px var(--eureka-accent);
    border-radius: 6px;
    transition: box-shadow 120ms var(--eureka-ease);
  }

  /* Scrollbar — desktop Safari style: thin, fade in on hover */
  .eureka-active ::-webkit-scrollbar { width: 10px; height: 10px; }
  .eureka-active ::-webkit-scrollbar-track { background: transparent; }
  .eureka-active ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0);
    border-radius: 999px;
    transition: background 200ms var(--eureka-ease);
  }
  .eureka-active:hover ::-webkit-scrollbar-thumb {
    background: rgba(128,128,128,0.35);
  }
  .eureka-active ::-webkit-scrollbar-thumb:hover {
    background: rgba(128,128,128,0.55);
  }

  /* Selection — accent-tinted, not the browser blue */
  .eureka-active ::selection {
    background: var(--eureka-accent-tint-strong);
    color: inherit;
  }

  /* Reading focus-mode paragraph opacity (applied by ReaderView) */
  .er-paragraph[data-focus="inactive"] {
    opacity: ${reading.focus.inactiveOpacity};
    transition: opacity ${reading.focus.transitionMs}ms var(--eureka-ease);
  }
  .er-paragraph[data-focus="active"] {
    opacity: ${reading.focus.activeOpacity};
    transition: opacity ${reading.focus.transitionMs}ms var(--eureka-ease);
  }
`;

export const keyframes = `
  @keyframes eureka-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes eureka-fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes eureka-scale-in {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes eureka-pulse-subtle {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.72; }
  }
`;

// Legacy aliases for back-compat with the original designSystem.js API.
export const colors = {
  primary: accents.teal.hue,
  ...luminance.light,
  accent: accents,
  state,
};

export default {
  materials, luminance, accents, state, typography, reading,
  spacing, radii, shadows, motion, breakpoints,
  globalStyles, keyframes, colors,
};
