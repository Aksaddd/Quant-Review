'use client';

/**
 * ReaderView — content-first reading surface.
 *
 * Flow-state features:
 *   • Optimal measure (auto-clamped to 58–72ch from font size)
 *   • Typographic focus mode (active paragraph at 100%, others at 38%)
 *   • System-font-first typography (SF on Apple, Inter elsewhere)
 *   • Sepia / light / dark / system theme with contrast control
 *
 * Render children as normal React. The focus-mode paragraph tracking
 * walks children at mount and wires `data-focus` on each `<p>` / `.er-paragraph`.
 */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  useReadingSettings,
  getThemeColors,
  getFontFamilyCSS,
  getAccentHue,
  getMeasurePx,
} from '../reading-settings/useReadingSettings';

export default function ReaderView({ children, className = '', style = {} }) {
  const s = useReadingSettings();
  const containerRef = useRef(null);

  const theme = getThemeColors(s.theme, s.textContrast);
  const fontFamily = getFontFamilyCSS(s.fontFamily);
  const accent = getAccentHue(s.accent);
  const measurePx = getMeasurePx(s);

  // Active-paragraph tracking for focus mode.
  useEffect(() => {
    if (!s.focusMode || !containerRef.current) return;
    const root = containerRef.current;
    const paragraphs = Array.from(
      root.querySelectorAll('p, .er-paragraph, [data-block-id]')
    );
    paragraphs.forEach((p) => {
      p.classList.add('er-paragraph');
      p.dataset.focus = 'inactive';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the viewport's 40% line (reader's eye line).
        const viewportEyeLine = window.innerHeight * 0.4;
        let best = null;
        let bestDist = Infinity;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const rect = entry.target.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - viewportEyeLine);
          if (dist < bestDist) {
            bestDist = dist;
            best = entry.target;
          }
        });
        if (best) {
          paragraphs.forEach((p) => {
            p.dataset.focus = p === best ? 'active' : 'inactive';
          });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -40% 0px' }
    );

    paragraphs.forEach((p) => observer.observe(p));
    return () => {
      observer.disconnect();
      paragraphs.forEach((p) => {
        delete p.dataset.focus;
      });
    };
  }, [s.focusMode, children]);

  // Drive accent as CSS var so selection/focus ring/buttons stay in sync.
  const cssVars = useMemo(
    () => ({
      '--eureka-accent': accent,
      '--eureka-accent-tint':        `color-mix(in oklch, ${accent} 8%, transparent)`,
      '--eureka-accent-tint-strong': `color-mix(in oklch, ${accent} 14%, transparent)`,
    }),
    [accent]
  );

  const rootStyle = {
    minHeight: '100vh',
    background: theme.background,
    color: theme.text,
    fontFamily,
    fontSize: `${s.fontSizePx}px`,
    lineHeight: s.lineHeight,
    transition: 'background 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1)',
    ...cssVars,
    ...style,
  };

  const innerStyle = {
    maxWidth: `${measurePx}px`,
    paddingInline: `${16 + s.marginWidthPx}px`,
    paddingBlock: '96px',
    margin: '0 auto',
    textAlign: s.textAlign,
    hyphens: s.textAlign === 'justify' ? 'auto' : 'manual',
  };

  // Paragraph gap / first-line indent applied via inline CSS vars for precision.
  const paraStyle = {
    '--eureka-para-gap': `${s.paragraphGapEm}em`,
    '--eureka-para-indent': `${s.firstLineIndentEm}em`,
  };

  return (
    <div
      ref={containerRef}
      className={`eureka-active ${className}`}
      style={rootStyle}
      data-theme={s.theme}
      data-focus-mode={s.focusMode ? 'on' : 'off'}
    >
      <style>{`
        .eureka-active .er-reader-inner > * + * {
          margin-top: var(--eureka-para-gap);
        }
        .eureka-active .er-reader-inner p,
        .eureka-active .er-reader-inner .er-paragraph {
          text-indent: var(--eureka-para-indent, 0);
        }
        .eureka-active .er-reader-inner h1,
        .eureka-active .er-reader-inner h2,
        .eureka-active .er-reader-inner h3 {
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .eureka-active .er-reader-inner h1 { font-size: calc(1em * ${s.headingScale} * 2.25); }
        .eureka-active .er-reader-inner h2 { font-size: calc(1em * ${s.headingScale} * 1.6);  }
        .eureka-active .er-reader-inner h3 { font-size: calc(1em * ${s.headingScale} * 1.25); }
        .eureka-active .er-reader-inner a { color: var(--eureka-accent); text-decoration-color: var(--eureka-accent-tint-strong); text-underline-offset: 3px; }
        .eureka-active .er-reader-inner img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          display: ${s.showImages ? 'block' : 'none'};
        }
        .eureka-active .er-reader-inner ::selection {
          background: var(--eureka-accent-tint-strong);
        }
      `}</style>
      <div className="er-reader-inner" style={{ ...innerStyle, ...paraStyle }}>
        {children}
      </div>
    </div>
  );
}
