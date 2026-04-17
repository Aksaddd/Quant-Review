// Barrel — deep imports still work; this is for convenience.

export * from './design-system/designSystem';
export { default as designSystem } from './design-system/designSystem';

export {
  useReadingSettings,
  resolveTheme,
  getThemeColors,
  getFontFamilyCSS,
  getAccentHue,
  getMeasurePx,
} from './reading-settings/useReadingSettings';

export { default as ReaderView }    from './components/ReaderView';
export { default as SettingsPanel } from './components/SettingsPanel';
export { default as CommandBar }    from './components/CommandBar';

export { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
export { useIdleChrome }        from './hooks/useIdleChrome';
export { useHaptics }           from './hooks/useHaptics';

export { formatCitation, formatAllStyles } from './text-manipulation/citationFormatter';
export {
  configureAnchor,
  createAnchorFromSelection,
  createAnchorFromRange,
  resolveAnchorToRange,
  getRangeRects,
} from './text-manipulation/anchorUtils';
export { analyzeChunk, generateQuestions, checkAnswer } from './text-manipulation/questionEngine';
