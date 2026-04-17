/**
 * Anchor utilities — selection → portable anchor → Range resolution.
 *
 * Strategy (two-stage):
 *   1. Offset-based: { blockId, startOffset, endOffset } for fast restore.
 *   2. Quote + context: { quote, prefix, suffix } as fallback when content
 *      changes underneath us (text edits, re-renders, pagination).
 *
 * Unlike the original bundle, selectors are CONFIGURABLE via `configureAnchor()`
 * so consumers don't have to adopt `.er-paragraph` class names.
 *
 * Requires host markup to tag anchorable blocks with a stable `data-block-id`.
 */

const DEFAULTS = {
  blockIdAttr: 'data-block-id',
  blockSelector: '[data-block-id], .er-paragraph, .er-title, .er-heading, .er-subheading, p, h1, h2, h3',
  pageAttr: 'data-page-index',
  pageSelector: '.er-page',
  contextLen: 32,  // chars of prefix/suffix for quote-match fallback
};

let config = { ...DEFAULTS };

export function configureAnchor(partial = {}) {
  config = { ...DEFAULTS, ...partial };
}

// ---------- Create ----------

export function createAnchorFromSelection(selection) {
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  return createAnchorFromRange(range);
}

export function createAnchorFromRange(range) {
  if (!range) return null;
  const startBlock = findBlockAncestor(range.startContainer);
  const endBlock   = findBlockAncestor(range.endContainer);
  if (!startBlock) return null;

  const blockId = startBlock.getAttribute(config.blockIdAttr) || null;
  const endBlockId = endBlock?.getAttribute(config.blockIdAttr) || blockId;
  const startOffset = textOffsetWithin(startBlock, range.startContainer, range.startOffset);
  const endOffset   = endBlock
    ? textOffsetWithin(endBlock, range.endContainer, range.endOffset)
    : startOffset;

  const quote  = range.toString();
  const blockText = startBlock.textContent || '';
  const prefix = blockText.slice(Math.max(0, startOffset - config.contextLen), startOffset);
  const suffix = (endBlock?.textContent || blockText).slice(endOffset, endOffset + config.contextLen);

  const pageEl = startBlock.closest(config.pageSelector);
  const pageIndex = pageEl ? Number(pageEl.getAttribute(config.pageAttr)) : null;

  return {
    v: 1,
    blockId, endBlockId,
    startOffset, endOffset,
    quote, prefix, suffix,
    pageIndex,
  };
}

// ---------- Resolve ----------

export function resolveAnchorToRange(anchor, root = document) {
  if (!anchor) return null;
  const startBlock = anchor.blockId
    ? root.querySelector(`[${config.blockIdAttr}="${cssEscape(anchor.blockId)}"]`)
    : null;
  const endBlock = anchor.endBlockId
    ? root.querySelector(`[${config.blockIdAttr}="${cssEscape(anchor.endBlockId)}"]`)
    : startBlock;

  if (!startBlock) return resolveByQuote(anchor, root);

  // Stage 1: offset-based.
  try {
    const startPoint = pointAtTextOffset(startBlock, anchor.startOffset);
    const endPoint   = pointAtTextOffset(endBlock || startBlock, anchor.endOffset);
    if (startPoint && endPoint) {
      const r = document.createRange();
      r.setStart(startPoint.node, startPoint.offset);
      r.setEnd(endPoint.node, endPoint.offset);
      // Validate the quote still matches (content may have shifted).
      if (!anchor.quote || r.toString() === anchor.quote) return r;
    }
  } catch {
    /* fall through to quote match */
  }

  // Stage 2: quote + context match.
  return resolveByQuote(anchor, root);
}

function resolveByQuote(anchor, root) {
  if (!anchor.quote) return null;
  const block = anchor.blockId
    ? root.querySelector(`[${config.blockIdAttr}="${cssEscape(anchor.blockId)}"]`)
    : root.querySelector(config.blockSelector);
  const scope = block || root;
  const text = scope.textContent || '';

  // Find best match: prefer exact prefix+quote+suffix.
  let idx = -1;
  if (anchor.prefix && anchor.suffix) {
    const target = anchor.prefix + anchor.quote + anchor.suffix;
    const hit = text.indexOf(target);
    if (hit >= 0) idx = hit + anchor.prefix.length;
  }
  if (idx < 0 && anchor.prefix) {
    const hit = text.indexOf(anchor.prefix + anchor.quote);
    if (hit >= 0) idx = hit + anchor.prefix.length;
  }
  if (idx < 0) idx = text.indexOf(anchor.quote);
  if (idx < 0) return null;

  const startPoint = pointAtTextOffset(scope, idx);
  const endPoint   = pointAtTextOffset(scope, idx + anchor.quote.length);
  if (!startPoint || !endPoint) return null;

  const r = document.createRange();
  r.setStart(startPoint.node, startPoint.offset);
  r.setEnd(endPoint.node, endPoint.offset);
  return r;
}

// ---------- Geometry ----------

export function getRangeRects(range) {
  if (!range) return [];
  return Array.from(range.getClientRects()).map((r) => ({
    top: r.top, left: r.left, right: r.right, bottom: r.bottom,
    width: r.width, height: r.height,
    x: r.left + window.scrollX, y: r.top + window.scrollY,
  }));
}

// ---------- Internals ----------

function findBlockAncestor(node) {
  let el = node?.nodeType === 3 ? node.parentElement : node;
  while (el && el !== document.body) {
    if (el.matches?.(config.blockSelector)) return el;
    el = el.parentElement;
  }
  return null;
}

function textOffsetWithin(block, node, offset) {
  let running = 0;
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n === node) return running + offset;
    running += n.nodeValue.length;
  }
  return running;
}

function pointAtTextOffset(block, offset) {
  let running = 0;
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    const len = n.nodeValue.length;
    if (running + len >= offset) {
      return { node: n, offset: offset - running };
    }
    running += len;
  }
  // Offset beyond text — clamp to end.
  const last = walker.currentNode;
  if (last) return { node: last, offset: last.nodeValue.length };
  return null;
}

function cssEscape(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, (c) => `\\${c}`);
}
