/**
 * Modern-API re-export.
 *
 * The original bundle shipped two stores with overlapping concerns. We've
 * consolidated them into `./useReadingSettings.js` (single source of truth).
 * This file re-exports the same store so existing modern-API consumers keep
 * working without code changes.
 */
export {
  useReadingSettings,
  resolveTheme,
  getThemeColors,
  getFontFamilyCSS,
  getAccentHue,
  getMeasurePx,
} from './useReadingSettings';
