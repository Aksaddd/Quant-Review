'use client';

import { useState } from 'react';
import { Settings2, X, RotateCcw } from 'lucide-react';
import { useTextSettings } from '@/hooks/useTextSettings';
import {
  FONT_FAMILIES,
  FONT_SIZE_RANGE,
  LINE_HEIGHT_RANGE,
  LETTER_SPACING_RANGE,
  MATH_SCALE_RANGE,
} from '@/components/providers/TextSettingsProvider';

const THEMES = [
  { value: 'dark' as const,  label: 'Dark',  bg: '#0f1117', text: '#e2e8f0' },
  { value: 'sepia' as const, label: 'Sepia', bg: '#f5ead0', text: '#3d2b1f' },
  { value: 'light' as const, label: 'Light', bg: '#f8fafc', text: '#1e293b' },
];

export default function TextControls() {
  const { settings, setFontSize, setFontFamily, setLineHeight, setLetterSpacing, setTheme, setMathScale, reset } = useTextSettings();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        title="Reading settings"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c8ccd4] bg-white text-[#626975] text-xs font-semibold hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)] transition-colors"
      >
        <Settings2 size={13} />
        Reading
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-4 top-16 z-50 w-72 bg-[var(--surface-2)] border border-[var(--surface-border-strong)] rounded-2xl shadow-[var(--shadow-lg)] animate-fade-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--surface-border)]">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Reading Settings</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  title="Reset to defaults"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-3)] transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-3)] transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-5">
              {/* Theme */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Theme</label>
                <div className="flex gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl border transition-all
                        ${settings.theme === t.value
                          ? 'border-brand-500/60 bg-brand-500/10'
                          : 'border-[var(--surface-border)] hover:border-[var(--surface-border-strong)]'
                        }`}
                    >
                      <div
                        className="w-8 h-5 rounded-md border border-[var(--surface-border)]"
                        style={{ backgroundColor: t.bg }}
                      />
                      <span className="text-[10px] font-medium text-[var(--text-secondary)]">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font family */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Font</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {FONT_FAMILIES.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFontFamily(f.value)}
                      style={{ fontFamily: f.css }}
                      className={`py-1.5 px-3 rounded-xl border text-sm transition-all text-left
                        ${settings.fontFamily === f.value
                          ? 'border-brand-500/60 bg-brand-500/10 text-brand-300'
                          : 'border-[var(--surface-border)] text-[var(--text-secondary)] hover:border-[var(--surface-border-strong)]'
                        }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font size */}
              <Slider
                label="Font Size"
                value={settings.fontSize}
                min={FONT_SIZE_RANGE.min}
                max={FONT_SIZE_RANGE.max}
                step={FONT_SIZE_RANGE.step}
                display={`${settings.fontSize}px`}
                onChange={setFontSize}
              />

              {/* Line height */}
              <Slider
                label="Line Height"
                value={settings.lineHeight}
                min={LINE_HEIGHT_RANGE.min}
                max={LINE_HEIGHT_RANGE.max}
                step={LINE_HEIGHT_RANGE.step}
                display={settings.lineHeight.toFixed(1)}
                onChange={setLineHeight}
              />

              {/* Letter spacing */}
              <Slider
                label="Letter Spacing"
                value={settings.letterSpacing}
                min={LETTER_SPACING_RANGE.min}
                max={LETTER_SPACING_RANGE.max}
                step={LETTER_SPACING_RANGE.step}
                display={`${settings.letterSpacing.toFixed(2)}em`}
                onChange={setLetterSpacing}
              />

              {/* Math size — multiplier on display math + KaTeX */}
              <div>
                <Slider
                  label="Math Size"
                  value={settings.mathScale}
                  min={MATH_SCALE_RANGE.min}
                  max={MATH_SCALE_RANGE.max}
                  step={MATH_SCALE_RANGE.step}
                  display={`${Math.round(settings.mathScale * 100)}%`}
                  onChange={setMathScale}
                />
                {/* Live preview swatch */}
                <div
                  className="mt-2 px-3 py-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-3)]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: `calc(0.95em * ${settings.mathScale})`,
                    fontVariantNumeric: 'tabular-nums slashed-zero',
                    color: 'var(--text-primary)',
                  }}
                >
                  P(E₁) = (1 − 3/51) / 2 = 8/17
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{label}</label>
        <span className="text-xs font-mono text-[var(--text-secondary)]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-[var(--surface-3)]
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-brand-400 [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-500/50
          cursor-pointer"
      />
    </div>
  );
}
