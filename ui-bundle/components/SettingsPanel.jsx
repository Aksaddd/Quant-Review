'use client';

/**
 * SettingsPanel — translucent HUD, not a sidebar.
 *
 * Hovers over content. Never pushes layout. Uses SF-style thin material
 * with backdrop-filter blur. Dismisses on outside-tap, Escape, or ⌘. .
 *
 * Opens via `useReadingSettings().togglePanel()` or the keyboard shortcut
 * wired in `useKeyboardShortcuts`.
 */
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, AlignLeft, Contrast, Sparkles, Eye, EyeOff, X, Check } from 'lucide-react';
import {
  useReadingSettings,
  resolveTheme,
  getThemeColors,
} from '../reading-settings/useReadingSettings';
import { accents, motion as motionTokens } from '../design-system/designSystem';

const SPRING = motionTokens.spring.default;

export default function SettingsPanel() {
  const s = useReadingSettings();
  const panelRef = useRef(null);

  // Outside-tap + Escape dismiss
  useEffect(() => {
    if (!s.isPanelOpen) return;
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        s.closePanel();
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') s.closePanel();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [s.isPanelOpen]);

  const isDark = resolveTheme(s.theme) === 'dark';
  const bg = isDark ? 'rgba(28, 28, 30, 0.72)' : 'rgba(255, 255, 255, 0.72)';
  const fg = isDark ? '#f2f2f7' : '#1d1d1f';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const shadow = isDark
    ? '0 0 0 0.5px rgba(255,255,255,0.08), 0 10px 40px -12px rgba(0,0,0,0.6)'
    : '0 0 0 0.5px rgba(0,0,0,0.08), 0 10px 40px -12px rgba(0,0,0,0.25)';

  return (
    <AnimatePresence>
      {s.isPanelOpen && (
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
            right: 24,
            width: 340,
            maxHeight: 'calc(100vh - 96px)',
            overflowY: 'auto',
            background: bg,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: 20,
            boxShadow: shadow,
            border: `0.5px solid ${border}`,
            color: fg,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
            fontSize: 14,
            padding: 20,
            zIndex: 1000,
          }}
        >
          <Header onClose={s.closePanel} />

          <Section icon={<Sparkles size={14} />} label="Accent">
            <SwatchRow
              value={s.accent}
              onChange={(v) => s.updateSetting('accent', v)}
            />
          </Section>

          <Section icon={<Contrast size={14} />} label="Theme">
            <SegmentRow
              value={s.theme}
              onChange={(v) => s.setTheme(v)}
              options={[
                { value: 'system', label: 'Auto' },
                { value: 'light',  label: 'Light' },
                { value: 'sepia',  label: 'Sepia' },
                { value: 'dark',   label: 'Dark' },
              ]}
            />
            <SegmentRow
              compact
              value={s.textContrast}
              onChange={(v) => s.updateSetting('textContrast', v)}
              options={[
                { value: 'soft',   label: 'Soft' },
                { value: 'normal', label: 'Normal' },
                { value: 'high',   label: 'High' },
              ]}
            />
          </Section>

          <Section icon={<Type size={14} />} label="Typography">
            <SegmentRow
              value={s.fontFamily}
              onChange={(v) => s.setFontFamily(v)}
              options={[
                { value: 'serif', label: 'Serif' },
                { value: 'sans',  label: 'Sans'  },
                { value: 'mono',  label: 'Mono'  },
              ]}
            />
            <SliderRow
              label="Size"
              min={14} max={28} step={1}
              value={s.fontSizePx}
              onChange={(v) => s.updateSetting('fontSizePx', v)}
              suffix="px"
            />
            <SliderRow
              label="Line height"
              min={1.2} max={2.0} step={0.05}
              value={s.lineHeight}
              onChange={(v) => s.updateSetting('lineHeight', Number(v.toFixed(2)))}
            />
            <SliderRow
              label="Heading scale"
              min={0.85} max={1.25} step={0.05}
              value={s.headingScale}
              onChange={(v) => s.updateSetting('headingScale', Number(v.toFixed(2)))}
            />
          </Section>

          <Section icon={<AlignLeft size={14} />} label="Layout">
            <SliderRow
              label="Measure"
              min={420} max={880} step={20}
              value={s.contentWidthPx ?? Math.round(66 * s.fontSizePx * 0.5)}
              onChange={(v) => s.updateSetting('contentWidthPx', v)}
              suffix="px"
            />
            <SliderRow
              label="Paragraph gap"
              min={0.5} max={2.0} step={0.1}
              value={s.paragraphGapEm}
              onChange={(v) => s.updateSetting('paragraphGapEm', Number(v.toFixed(1)))}
              suffix="em"
            />
            <SegmentRow
              value={s.textAlign}
              onChange={(v) => s.updateSetting('textAlign', v)}
              options={[
                { value: 'left',    label: 'Left' },
                { value: 'justify', label: 'Justify' },
              ]}
            />
          </Section>

          <Section icon={s.focusMode ? <Eye size={14} /> : <EyeOff size={14} />} label="Flow">
            <ToggleRow
              label="Focus mode"
              hint="Dim paragraphs except the one you're reading"
              value={s.focusMode}
              onChange={() => s.toggleFocusMode()}
            />
            <ToggleRow
              label="Auto-hide chrome"
              hint="Fade UI when idle"
              value={s.chromeAutoHide}
              onChange={(v) => s.updateSetting('chromeAutoHide', v)}
            />
            <ToggleRow
              label="Haptics"
              hint="Subtle buzz on highlights and taps"
              value={s.hapticsEnabled}
              onChange={(v) => s.updateSetting('hapticsEnabled', v)}
            />
          </Section>

          <Footer onReset={s.resetSettings} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Subcomponents ----------

function Header({ onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>Display</div>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          border: 'none', background: 'transparent', padding: 4, borderRadius: 8,
          cursor: 'pointer', color: 'inherit', opacity: 0.5,
          transition: 'opacity 120ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        <X size={16} />
      </button>
    </div>
  );
}

function Section({ icon, label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, opacity: 0.6, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function SwatchRow({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Object.entries(accents).map(([key, { hue, label }]) => {
        const active = key === value;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-label={label}
            title={label}
            style={{
              width: 26, height: 26, borderRadius: 999,
              background: hue,
              border: active ? '2px solid white' : '0.5px solid rgba(0,0,0,0.15)',
              boxShadow: active ? `0 0 0 2px ${hue}` : 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {active && <Check size={12} />}
          </button>
        );
      })}
    </div>
  );
}

function SegmentRow({ value, onChange, options, compact = false }) {
  return (
    <div
      role="radiogroup"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: 2,
        padding: 2,
        background: 'rgba(128,128,128,0.15)',
        borderRadius: 10,
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
            style={{
              border: 'none',
              background: active ? 'var(--eureka-accent)' : 'transparent',
              color: active ? 'white' : 'inherit',
              padding: compact ? '4px 8px' : '6px 10px',
              borderRadius: 8,
              fontSize: compact ? 11 : 12,
              fontWeight: active ? 600 : 500,
              cursor: 'pointer',
              transition: 'background 160ms cubic-bezier(0.22, 1, 0.36, 1), color 160ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SliderRow({ label, value, onChange, min, max, step, suffix = '' }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, opacity: 0.85 }}>
        <span>{label}</span>
        <span style={{ fontFeatureSettings: '"tnum"', opacity: 0.6 }}>
          {typeof value === 'number' ? value : '—'}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--eureka-accent)' }}
      />
    </div>
  );
}

function ToggleRow({ label, hint, value, onChange }) {
  const handleToggle = () => onChange(!value);
  return (
    <button
      onClick={handleToggle}
      role="switch"
      aria-checked={value}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '6px 0',
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: 'inherit', textAlign: 'left', width: '100%',
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {hint && <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{hint}</div>}
      </div>
      <span
        aria-hidden
        style={{
          width: 36, height: 22, borderRadius: 999,
          background: value ? 'var(--eureka-accent)' : 'rgba(128,128,128,0.3)',
          position: 'relative',
          transition: 'background 180ms cubic-bezier(0.22, 1, 0.36, 1)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2, left: value ? 16 : 2,
            width: 18, height: 18, borderRadius: 999,
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </span>
    </button>
  );
}

function Footer({ onReset }) {
  return (
    <div style={{ marginTop: 8, paddingTop: 12, borderTop: '0.5px solid rgba(128,128,128,0.2)' }}>
      <button
        onClick={onReset}
        style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'inherit', opacity: 0.6, fontSize: 12, padding: 4,
        }}
      >
        Reset to defaults
      </button>
    </div>
  );
}
