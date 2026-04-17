'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, X, RotateCcw, Check, Focus, Sparkles } from 'lucide-react';
import { useTextSettings } from '@/hooks/useTextSettings';
import {
  FONT_FAMILIES,
  FONT_SIZE_RANGE,
  LINE_HEIGHT_RANGE,
  LETTER_SPACING_RANGE,
  MATH_SCALE_RANGE,
  ACCENT_HUES,
  useReadingSettingsStore,
  type AccentKey,
} from '@/stores/useReadingSettingsStore';

const THEMES = [
  { value: 'light' as const, label: 'Light' },
  { value: 'sepia' as const, label: 'Sepia' },
  { value: 'dark'  as const, label: 'Dark'  },
];

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.9 };

export default function TextControls() {
  const { settings, setFontSize, setFontFamily, setLineHeight, setLetterSpacing, setTheme, setMathScale, reset } = useTextSettings();
  const accent         = useReadingSettingsStore((s) => s.accent);
  const setAccent      = useReadingSettingsStore((s) => s.setAccent);
  const focusMode      = useReadingSettingsStore((s) => s.focusMode);
  const toggleFocus    = useReadingSettingsStore((s) => s.toggleFocusMode);
  const hapticsEnabled = useReadingSettingsStore((s) => s.hapticsEnabled);
  const setHaptics     = useReadingSettingsStore((s) => s.setHapticsEnabled);

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Reading settings (⌘.)"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-200"
        style={{
          background: 'var(--material-thin-light)',
          backdropFilter: 'var(--material-blur)',
          WebkitBackdropFilter: 'var(--material-blur)',
          border: '0.5px solid rgba(0,0,0,0.08)',
          color: '#424245',
          transitionTimingFunction: 'var(--ease-standard)',
        }}
      >
        <Settings2 size={13} />
        Reading
      </button>

      {/* HUD */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Reading settings"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={SPRING}
            style={{
              position: 'fixed',
              top: 72,
              right: 16,
              width: 340,
              maxHeight: 'calc(100vh - 96px)',
              overflowY: 'auto',
              background: 'var(--material-thin-light)',
              backdropFilter: 'var(--material-blur-strong)',
              WebkitBackdropFilter: 'var(--material-blur-strong)',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 20,
              boxShadow: 'var(--shadow-hud)',
              color: '#1d1d1f',
              zIndex: 60,
              padding: 18,
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
            }}
          >
            <Header onClose={() => setOpen(false)} onReset={reset} />

            <Section icon={<Sparkles size={13} />} label="Accent">
              <SwatchRow value={accent} onChange={setAccent} />
            </Section>

            <Section icon={<Focus size={13} />} label="Theme">
              <SegmentRow
                value={settings.theme}
                onChange={setTheme}
                options={THEMES}
              />
            </Section>

            <Section label="Font">
              <SegmentRow
                value={settings.fontFamily}
                onChange={setFontFamily}
                options={FONT_FAMILIES.map((f) => ({ value: f.value, label: f.label }))}
              />
            </Section>

            <Slider
              label="Size"
              value={settings.fontSize}
              min={FONT_SIZE_RANGE.min} max={FONT_SIZE_RANGE.max} step={FONT_SIZE_RANGE.step}
              display={`${settings.fontSize}px`}
              onChange={setFontSize}
            />
            <Slider
              label="Line Height"
              value={settings.lineHeight}
              min={LINE_HEIGHT_RANGE.min} max={LINE_HEIGHT_RANGE.max} step={LINE_HEIGHT_RANGE.step}
              display={settings.lineHeight.toFixed(1)}
              onChange={setLineHeight}
            />
            <Slider
              label="Letter Spacing"
              value={settings.letterSpacing}
              min={LETTER_SPACING_RANGE.min} max={LETTER_SPACING_RANGE.max} step={LETTER_SPACING_RANGE.step}
              display={`${settings.letterSpacing.toFixed(2)}em`}
              onChange={setLetterSpacing}
            />
            <Slider
              label="Math Size"
              value={settings.mathScale}
              min={MATH_SCALE_RANGE.min} max={MATH_SCALE_RANGE.max} step={MATH_SCALE_RANGE.step}
              display={`${Math.round(settings.mathScale * 100)}%`}
              onChange={setMathScale}
            />

            <Section label="Flow">
              <ToggleRow label="Focus mode" hint="Dim paragraphs you're not reading" value={focusMode} onChange={toggleFocus} />
              <ToggleRow label="Haptics"    hint="Subtle buzz on key actions"        value={hapticsEnabled} onChange={() => setHaptics(!hapticsEnabled)} />
            </Section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Subcomponents ──────────────────────────────────────────────────────── */

function Header({ onClose, onReset }: { onClose: () => void; onReset: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-[14px] font-semibold tracking-tight">Display</div>
      <div className="flex items-center gap-1">
        <IconButton onClick={onReset} title="Reset to defaults"><RotateCcw size={13} /></IconButton>
        <IconButton onClick={onClose} title="Close"><X size={14} /></IconButton>
      </div>
    </div>
  );
}

function IconButton({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded-lg transition-colors duration-200 text-[#6e6e73] hover:text-[#1d1d1f]"
      style={{ background: 'transparent', transitionTimingFunction: 'var(--ease-standard)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </button>
  );
}

function Section({ icon, label, children }: { icon?: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function SwatchRow({ value, onChange }: { value: AccentKey; onChange: (v: AccentKey) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(Object.entries(ACCENT_HUES) as [AccentKey, { hue: string; label: string }][]).map(([key, { hue, label }]) => {
        const active = key === value;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-label={label}
            title={label}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-150"
            style={{
              background: hue,
              border: active ? '2px solid #ffffff' : '0.5px solid rgba(0,0,0,0.15)',
              boxShadow: active ? `0 0 0 2px ${hue}` : 'none',
              color: 'white',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {active && <Check size={11} />}
          </button>
        );
      })}
    </div>
  );
}

interface SegmentRowProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}
function SegmentRow<T extends string>({ value, onChange, options }: SegmentRowProps<T>) {
  return (
    <div
      role="radiogroup"
      className="grid gap-[2px] p-[2px] rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        background: 'rgba(0,0,0,0.06)',
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className="py-1.5 px-2.5 rounded-md text-[12px] font-medium tracking-tight transition-colors duration-200"
            style={{
              background: active ? 'var(--eureka-accent)' : 'transparent',
              color: active ? '#ffffff' : '#424245',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Slider({
  label, value, min, max, step, display, onChange,
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
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-[#6e6e73] tracking-tight">{label}</span>
        <span className="font-mono tabular-nums text-[#86868b]">{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-[3px] appearance-none rounded-full cursor-pointer"
        style={{
          background: 'rgba(0,0,0,0.08)',
          accentColor: 'var(--eureka-accent)',
        }}
      />
    </div>
  );
}

function ToggleRow({
  label, hint, value, onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
      className="flex items-center justify-between gap-3 py-1 text-left"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', width: '100%' }}
    >
      <div>
        <div className="text-[13px] font-medium tracking-tight">{label}</div>
        {hint && <div className="text-[11px] text-[#86868b] mt-0.5">{hint}</div>}
      </div>
      <span
        aria-hidden
        className="relative shrink-0"
        style={{
          width: 36, height: 22, borderRadius: 9999,
          background: value ? 'var(--eureka-accent)' : 'rgba(0,0,0,0.15)',
          transition: 'background 180ms var(--ease-standard)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2, left: value ? 16 : 2,
            width: 18, height: 18, borderRadius: 9999,
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 220ms var(--ease-standard)',
          }}
        />
      </span>
    </button>
  );
}
