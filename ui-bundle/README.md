# Eureka UI Bundle — Apple / Flow-State Edition

A portable reading surface for React apps, redesigned around Apple Human
Interface Guidelines and flow-state research. Drop this folder into any
React app.

## What changed from v1

| Area | Before | Now |
|---|---|---|
| Settings chrome | Right-side **sidebar** that pushed content | Translucent **HUD** with `backdrop-filter` that floats over content |
| Color system | 6 Bloom + 4 mastery + teal = 11 hues | Monochromatic luminance + user-pickable accent; state = glyph + 8% tint |
| Typography | Inter / Source Serif / JetBrains Mono | System-font-first (SF Pro / New York / SF Mono) with web-font fallback |
| Motion | Linear durations only | Spring physics via framer-motion, `cubic-bezier(0.22, 1, 0.36, 1)` |
| State store | Two competing stores (legacy + modern) | One canonical store, legacy API kept as selectors/setters |
| Focus / flow | Not addressed | Typographic focus mode, chrome auto-hide, ⌘. / ⌘K / ⌘F shortcuts, haptics |
| Reading geometry | Fixed width presets | Optimal measure auto-clamped to 58–72ch from font size |
| Anchors | Class-name coupled | `configureAnchor()` makes selectors injectable |

## Contents

```
ui-bundle/
├── index.js                         Barrel (optional)
├── design-system/
│   └── designSystem.js              Materials, luminance, accents, state
│                                    glyphs, typography, reading geometry,
│                                    spring motion, keyframes, globalStyles
├── reading-settings/
│   ├── useReadingSettings.js        Canonical store (zustand + persist)
│   └── useReadingSettings.modern.js Re-export (back-compat)
├── components/
│   ├── ReaderView.jsx               Reading surface + focus mode
│   ├── SettingsPanel.jsx            Translucent HUD (not a sidebar)
│   └── CommandBar.jsx               ⌘K spotlight palette
├── hooks/
│   ├── useKeyboardShortcuts.js      ⌘. / ⌘K / ⌘F / ⌘⇧H / Esc
│   ├── useIdleChrome.js             Auto-hide chrome on idle
│   └── useHaptics.js                Vibration + optional WebAudio ping
└── text-manipulation/
    ├── citationFormatter.js         APA 7 / MLA 9 / Chicago 17
    ├── anchorUtils.js               Configurable selectors, two-stage resolve
    └── questionEngine.js            Flashcard, fill-blank, MCQ, short-answer, summary
```

## Dependencies

| File | Dependencies |
|---|---|
| designSystem.js | none |
| useReadingSettings.js | `zustand` |
| ReaderView.jsx | `react` |
| SettingsPanel.jsx | `react`, `framer-motion`, `lucide-react` |
| CommandBar.jsx | `react`, `framer-motion`, `lucide-react` |
| hooks/* | `react` |
| citationFormatter.js | none |
| anchorUtils.js | browser DOM |
| questionEngine.js | none |

Install: `npm i zustand framer-motion lucide-react`

## Usage

### Full reading surface

```jsx
import {
  ReaderView,
  SettingsPanel,
  CommandBar,
  useKeyboardShortcuts,
  globalStyles,
  keyframes,
} from './ui-bundle';

export default function App() {
  useKeyboardShortcuts();
  return (
    <>
      <style>{keyframes}{globalStyles}</style>
      <SettingsPanel />
      <CommandBar />
      <ReaderView>
        <h1>Title</h1>
        <p>Body text. When focus mode is on (⌘F), this paragraph brightens as
        your eye-line reaches it, and the rest dim to 38%.</p>
      </ReaderView>
    </>
  );
}
```

### Keyboard shortcuts

| Keys | Action |
|---|---|
| ⌘ . / Ctrl . | Toggle settings HUD |
| ⌘ K / Ctrl K | Toggle command bar |
| ⌘ F / Ctrl F | Toggle focus mode |
| ⌘ ⇧ H | Highlight selection (provide `onHighlight` to the hook) |
| Esc | Dismiss any open chrome |

### Anchors with your own markup

```js
import { configureAnchor, createAnchorFromSelection } from './ui-bundle';

configureAnchor({
  blockIdAttr: 'data-paragraph-id',
  blockSelector: '[data-paragraph-id], h1, h2, p',
});

const anchor = createAnchorFromSelection(window.getSelection());
```

### Haptics

```jsx
import { useHaptics } from './ui-bundle';

function HighlightButton() {
  const haptic = useHaptics();
  return (
    <button onClick={() => { highlight(); haptic.select(); }}>
      Highlight
    </button>
  );
}
```

## Design principles (one-liners)

1. **Deference** — chrome disappears; content leads.
2. **Clarity** — one accent. Luminance for hierarchy. Glyphs for state.
3. **Depth via material**, not shadows — `backdrop-filter: blur(30px) saturate(180%)`.
4. **Motion as meaning** — spring physics only; never linear, never decorative.
5. **Single locus of attention** — every surface has one primary focus at a time.
6. **Flow-state** — reduce interruption by default; reveal on intent.

## Tokens at a glance

- **Materials** — `ultraThin` / `thin` / `regular` / `thick` with matching blur filters
- **Luminance** — 11-step scales for light + dark (Apple-calibrated greys)
- **Accents** — `teal` / `blue` / `indigo` / `purple` / `pink` / `orange` / `green` / `graphite`
- **Typography** — `ui-serif` / `-apple-system` / `ui-monospace` with web fallbacks
- **Motion** — spring presets `default` / `gentle` / `snappy` / `bouncy`
- **Measure** — auto-clamp to 58–72ch from font size
- **Focus opacity** — active 1.0 / inactive 0.38, 280ms crossfade

## Migration notes from v1

- **Two stores → one.** Legacy API (`setFontSize('lg')`, `togglePanel()`, `resetToDefaults()`)
  still works — it delegates to the canonical modern keys.
- **Persist key changed** to `eureka-reading-settings` (version 2). v1 data
  under `ergoread-settings` will not carry over; call `resetSettings()` or
  write a manual migration if needed.
- **Class names for anchors** are now the default but overridable via
  `configureAnchor({ blockSelector, ... })`.
- **Bloom/mastery colors** are replaced by glyphs + accent tint. If you were
  rendering the old swatches, import `state.bloom[level].glyph` instead.

## Accessibility

- Respects `prefers-reduced-motion` — disables springs, transitions, haptics, audio.
- Respects `prefers-color-scheme` when theme is `system`.
- Focus ring is accent-tinted with a 3px halo + 1px inner ring (WCAG 2.5:3 target).
- All interactive controls are keyboard-reachable; HUDs dismiss on Escape.
- Body text hits ≥4.5:1 contrast at `textContrast: 'normal'`, ≥7:1 at `'high'`.
