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
  Eraser,
} from 'lucide-react';
import { ReactSketchCanvas, type ReactSketchCanvasRef } from 'react-sketch-canvas';

export interface CanvasSnapshot {
  paths: any[];
  image: string;
}

interface ApproachCanvasProps {
  onSubmit: (snapshot: CanvasSnapshot) => void;
  submitted: boolean;
  savedSnapshot?: CanvasSnapshot | null;
  problemId: string;
}

const STROKE_COLORS = ['#21242c', '#1865f2', '#e53e3e', '#1fab54', '#f5a623'];
const STROKE_WIDTHS = [2, 4, 6, 8];

export default function ApproachCanvas({
  onSubmit,
  submitted,
  savedSnapshot,
  problemId,
}: ApproachCanvasProps) {
  const [expanded, setExpanded] = useState(!submitted);
  const [fullscreen, setFullscreen] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#21242c');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!canvasRef.current) {
      onSubmit({ paths: [], image: '' });
      return;
    }
    try {
      const paths = await canvasRef.current.exportPaths();
      const image = await canvasRef.current.exportImage('png');
      onSubmit({ paths, image });
    } catch {
      onSubmit({ paths: [], image: '' });
    }
  }, [onSubmit]);

  const handleClear = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, []);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const toggleErase = useCallback(() => {
    setEraseMode((prev) => {
      const next = !prev;
      if (next) {
        canvasRef.current?.eraseMode(true);
      } else {
        canvasRef.current?.eraseMode(false);
      }
      return next;
    });
  }, []);

  // Load saved paths when canvas mounts
  const handleCanvasMount = useCallback((ref: ReactSketchCanvasRef | null) => {
    canvasRef.current = ref;
    if (ref && savedSnapshot?.paths?.length) {
      ref.loadPaths(savedSnapshot.paths);
    }
  }, [savedSnapshot]);

  // Collapsed submitted state
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

  // Expanded submitted state — show saved drawing as image
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
        <div className="p-4">
          {savedSnapshot?.image ? (
            <img
              src={savedSnapshot.image}
              alt="Your approach sketch"
              className="w-full rounded border border-[#e4e6ea]"
            />
          ) : (
            <p className="text-sm text-[#9299a5] italic">Quick submission — no sketch saved</p>
          )}
        </div>
      </div>
    );
  }

  // Active drawing state
  const canvasHeight = fullscreen ? 'h-[80vh]' : 'h-[400px]';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border-2 border-dashed border-[#1865f2]/30 bg-white overflow-hidden ${
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
              onClick={handleUndo}
              className="px-2 py-1 rounded text-xs text-[#9299a5] hover:text-[#626975] hover:bg-gray-100 transition-colors"
              title="Undo"
            >
              Undo
            </button>
            <button
              onClick={toggleErase}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                eraseMode
                  ? 'bg-[#1865f2] text-white'
                  : 'text-[#9299a5] hover:text-[#626975] hover:bg-gray-100'
              }`}
              title="Eraser"
            >
              <Eraser size={12} />
            </button>
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

        {/* Toolbar — colors and stroke width */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#f4f7fe] border-t border-[#1865f2]/10">
          <div className="flex items-center gap-1.5">
            {STROKE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => { setStrokeColor(color); setEraseMode(false); canvasRef.current?.eraseMode(false); }}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${
                  strokeColor === color && !eraseMode ? 'border-[#1865f2] scale-125' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="w-px h-4 bg-[#e4e6ea]" />
          <div className="flex items-center gap-1">
            {STROKE_WIDTHS.map((w) => (
              <button
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`flex items-center justify-center w-6 h-6 rounded transition-colors ${
                  strokeWidth === w ? 'bg-[#1865f2]/10' : 'hover:bg-gray-100'
                }`}
                title={`${w}px`}
              >
                <div
                  className="rounded-full bg-[#21242c]"
                  style={{ width: w + 2, height: w + 2 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#626975] px-4 py-2 leading-relaxed bg-[#f4f7fe]">
          Sketch your approach — draw diagrams, write equations, map out your
          thinking. Your work is saved and will reappear when this problem
          comes back for review.
        </p>

        {/* Canvas */}
        <div className={`${canvasHeight} w-full`}>
          <ReactSketchCanvas
            ref={handleCanvasMount}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="#ffffff"
            style={{ border: 'none', borderRadius: 0 }}
            width="100%"
            height="100%"
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#f4f7fe] border-t border-[#1865f2]/10">
          <button
            onClick={() => onSubmit({ paths: [], image: '' })}
            className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1865f2] text-white text-sm font-semibold hover:bg-[#1254cc] transition-colors"
          >
            <PenLine size={13} />
            Submit & reveal hints
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
