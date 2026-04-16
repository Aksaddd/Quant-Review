'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenLine,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  Minimize2,
  Trash2,
} from 'lucide-react';

// Lazy-load Excalidraw + its CSS together, client-side only
import dynamic from 'next/dynamic';
const Excalidraw = dynamic(
  async () => {
    try {
      // Import CSS alongside the component so both load client-side only
      await import('@excalidraw/excalidraw/index.css');
      const mod = await import('@excalidraw/excalidraw');
      return mod.Excalidraw;
    } catch (err) {
      console.error('Failed to load Excalidraw:', err);
      return function ExcalidrawFallback() {
        return (
          <div className="flex items-center justify-center h-full text-sm text-red-500 p-4">
            Failed to load drawing canvas. Try refreshing the page.
          </div>
        );
      };
    }
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-sm text-[#9299a5] p-4 animate-pulse">
        Loading canvas...
      </div>
    ),
  }
);

export interface CanvasSnapshot {
  elements: readonly any[];
  appState: Record<string, any>;
  files: Record<string, any>;
}

interface ApproachCanvasProps {
  /** Called when the user submits their approach */
  onSubmit: (snapshot: CanvasSnapshot) => void;
  /** Whether the approach has already been submitted */
  submitted: boolean;
  /** Previously saved canvas state to restore (from DB / SM-2 resurface) */
  savedSnapshot?: CanvasSnapshot | null;
  /** Problem ID for keying the canvas state */
  problemId: string;
}

export default function ApproachCanvas({
  onSubmit,
  submitted,
  savedSnapshot,
  problemId,
}: ApproachCanvasProps) {
  const [expanded, setExpanded] = useState(!submitted);
  const [fullscreen, setFullscreen] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const excalidrawAPIRef = useRef<any>(null);
  const [currentSnapshot, setCurrentSnapshot] = useState<CanvasSnapshot | null>(
    savedSnapshot || null
  );

  // Capture canvas state on every change for live persistence
  const handleChange = useCallback(
    (elements: readonly any[], appState: Record<string, any>, files: any) => {
      if (elements.length > 0) {
        setHasDrawn(true);
      }
      setCurrentSnapshot({ elements, appState, files });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (currentSnapshot) {
      onSubmit(currentSnapshot);
    } else {
      onSubmit({ elements: [], appState: {}, files: {} });
    }
  }, [currentSnapshot, onSubmit]);

  const handleClear = useCallback(() => {
    if (excalidrawAPIRef.current) {
      excalidrawAPIRef.current.resetScene();
      setHasDrawn(false);
    }
  }, []);

  // Collapsed submitted state — show a summary bar
  if (submitted && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#e6f4ea] border border-[#a8d5b5] text-sm text-[#0d652d] font-semibold hover:bg-[#d4eede] transition-colors"
      >
        <CheckCircle2 size={14} />
        Your approach submitted — click to view your sketch
        <ChevronDown size={14} className="ml-auto" />
      </button>
    );
  }

  // Expanded submitted state — show read-only canvas with saved drawing
  if (submitted && expanded) {
    return (
      <div className="rounded-lg border border-[#a8d5b5] bg-[#f6fef9] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#a8d5b5]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#1fab54]" />
            <span className="text-xs font-bold text-[#0d652d] uppercase tracking-wider">
              Your approach
            </span>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
          >
            Collapse
          </button>
        </div>
        <div className="h-[300px] w-full">
          <Excalidraw
            initialData={{
              elements: currentSnapshot?.elements || savedSnapshot?.elements || [],
              appState: {
                ...(currentSnapshot?.appState || savedSnapshot?.appState || {}),
                viewModeEnabled: true,
                zenModeEnabled: true,
                gridModeEnabled: false,
              },
              files: currentSnapshot?.files || savedSnapshot?.files || {},
            }}
            viewModeEnabled={true}
          />
        </div>
      </div>
    );
  }

  // Active drawing state — full canvas with tools
  const canvasHeight = fullscreen ? 'h-[80vh]' : 'h-[400px]';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border-2 border-dashed border-[#1865f2]/30 bg-[#f4f7fe] overflow-hidden ${
          fullscreen ? 'fixed inset-4 z-50 border-solid border-[#1865f2] shadow-2xl' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#f4f7fe]">
          <div className="flex items-center gap-2">
            <PenLine size={14} className="text-[#1865f2]" />
            <span className="text-xs font-bold text-[#1865f2] uppercase tracking-wider">
              Your approach first
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#9299a5] hover:text-[#e53e3e] hover:bg-red-50 transition-colors"
              title="Clear canvas"
            >
              <Trash2 size={12} />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#9299a5] hover:text-[#1865f2] hover:bg-blue-50 transition-colors"
              title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#626975] px-4 pb-2 leading-relaxed">
          Sketch your approach — draw diagrams, write equations, map out your
          thinking. Your work is saved and will reappear when this problem
          comes back for review.
        </p>

        {/* Canvas */}
        <div className={`${canvasHeight} w-full border-t border-[#1865f2]/10`}>
          <Excalidraw
            excalidrawAPI={(api: any) => { excalidrawAPIRef.current = api; }}
            initialData={{
              elements: savedSnapshot?.elements || [],
              appState: {
                ...(savedSnapshot?.appState || {}),
                zenModeEnabled: true,
                gridModeEnabled: false,
                theme: 'light',
              },
              files: savedSnapshot?.files || {},
            }}
            onChange={handleChange}
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#f4f7fe] border-t border-[#1865f2]/10">
          <button
            onClick={() => onSubmit({ elements: [], appState: {}, files: {} })}
            className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1865f2] text-white text-sm font-semibold hover:bg-[#1254cc] transition-colors"
          >
            <PenLine size={13} />
            Submit &amp; reveal hints
          </button>
        </div>
      </motion.div>

      {/* Fullscreen backdrop */}
      {fullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setFullscreen(false)}
        />
      )}
    </AnimatePresence>
  );
}
