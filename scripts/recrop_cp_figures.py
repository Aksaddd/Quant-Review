#!/usr/bin/env python3
"""Re-extract every figure used in the CP handbook markdown using PyMuPDF's
vector-accurate bounding boxes.

For each PDF page:
  1. Collect all drawing rectangles via `page.get_drawings()`.
  2. Cluster them by proximity (connected within 15 pt) into figure regions.
  3. Expand each region to absorb nearby text blocks (axis labels, node
     labels, edge labels) without swallowing adjacent paragraphs.
  4. Render the page at 200 dpi and crop to each region plus a small pad.
  5. Match regions to existing figure filenames referenced in the markdown
     (ordered by appearance in MD == ordered top-to-bottom on the page).

Output overwrites the files under
  content/competitive_programmers_handbook/figures/
and
  public/cp-handbook/figures/

Usage:  python3 scripts/recrop_cp_figures.py
"""
from __future__ import annotations

import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

import fitz  # type: ignore


ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "competitive_programmers_handbook"
MD = CONTENT / "competitive_programmers_handbook.md"
PDF = CONTENT / "Competitive Programmer's Handbook.pdf"
FIG_DIR = CONTENT / "figures"
PUB_DIR = ROOT / "public" / "cp-handbook" / "figures"

RENDER_DPI = 200
PAD_POINTS = 8.0  # extra whitespace around each region in PDF points
TEXT_PAD = 10.0   # how far to reach to absorb associated text labels
MAX_TEXT_EXPAND = 110.0  # max per-iteration growth when pulling in text

# ----------------------------------------------------------------------------


def get_figure_regions(
    page: fitz.Page,
    drawing_gap: float = 15.0,
    text_pad: float = TEXT_PAD,
    min_side: float = 6.0,
    max_text_expand: float = MAX_TEXT_EXPAND,
) -> list[fitz.Rect]:
    """Return a list of figure bboxes on the page, ordered top-to-bottom.

    A figure region is a cluster of vector drawings (connected within
    `drawing_gap` points) whose bbox is then expanded to include nearby
    text blocks — but never expanded by more than `max_text_expand` points
    at a time (to avoid swallowing a full paragraph).
    """
    # --- Cluster drawings ----------------------------------------------------
    dr = []
    for d in page.get_drawings():
        r = d.get("rect")
        if r and r.width > 0.5 and r.height > 0.5:
            dr.append(fitz.Rect(r))
    if not dr:
        return []

    parent = list(range(len(dr)))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a: int, b: int) -> None:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for i in range(len(dr)):
        for j in range(i + 1, len(dr)):
            expanded = fitz.Rect(dr[i]) + (-drawing_gap, -drawing_gap, drawing_gap, drawing_gap)
            if expanded.intersects(dr[j]):
                union(i, j)

    clusters: dict[int, list[fitz.Rect]] = {}
    for i in range(len(dr)):
        clusters.setdefault(find(i), []).append(dr[i])

    regions: list[fitz.Rect] = []
    for rs in clusters.values():
        u = fitz.Rect(rs[0])
        for r in rs[1:]:
            u = u | r
        if u.width < min_side or u.height < min_side:
            continue
        regions.append(u)

    # --- Expand each region to absorb associated text blocks ----------------
    text_blocks = page.get_text("blocks")
    expanded_regions: list[fitz.Rect] = []
    for reg in regions:
        exp = fitz.Rect(reg)
        changed = True
        while changed:
            changed = False
            probe = fitz.Rect(exp) + (-text_pad, -text_pad, text_pad, text_pad)
            for tb in text_blocks:
                tr = fitz.Rect(tb[0], tb[1], tb[2], tb[3])
                if probe.intersects(tr) and not exp.contains(tr):
                    new_exp = fitz.Rect(
                        min(exp.x0, tr.x0),
                        min(exp.y0, tr.y0),
                        max(exp.x1, tr.x1),
                        max(exp.y1, tr.y1),
                    )
                    if new_exp.height - exp.height > max_text_expand:
                        continue
                    exp = new_exp
                    changed = True
        expanded_regions.append(exp)

    # --- Merge overlapping regions ------------------------------------------
    expanded_regions.sort(key=lambda r: (r.y0, r.x0))
    merged: list[fitz.Rect] = []
    for r in expanded_regions:
        absorbed = False
        for m in merged:
            if m.intersects(r):
                m.x0 = min(m.x0, r.x0)
                m.y0 = min(m.y0, r.y0)
                m.x1 = max(m.x1, r.x1)
                m.y1 = max(m.y1, r.y1)
                absorbed = True
                break
        if not absorbed:
            merged.append(fitz.Rect(r))

    # --- Second pass: merge regions on the same horizontal row --------------
    # Two regions are in the same row if their y-ranges overlap by ≥ 50%
    # of the smaller height. Figures drawn side-by-side (e.g. a row of
    # small graphs) become one composite figure.
    def overlap_ratio(a: fitz.Rect, b: fitz.Rect) -> float:
        lo = max(a.y0, b.y0)
        hi = min(a.y1, b.y1)
        if hi <= lo:
            return 0.0
        return (hi - lo) / min(a.height, b.height)

    changed = True
    while changed:
        changed = False
        for i in range(len(merged)):
            for j in range(i + 1, len(merged)):
                if overlap_ratio(merged[i], merged[j]) >= 0.5:
                    a, b = merged[i], merged[j]
                    a.x0 = min(a.x0, b.x0)
                    a.y0 = min(a.y0, b.y0)
                    a.x1 = max(a.x1, b.x1)
                    a.y1 = max(a.y1, b.y1)
                    merged.pop(j)
                    changed = True
                    break
            if changed:
                break

    merged.sort(key=lambda r: (r.y0, r.x0))
    return merged


# ----------------------------------------------------------------------------


def collect_md_figure_refs() -> dict[int, list[str]]:
    """Return { page_number: [figure_filename, ...] } in MD order."""
    md_text = MD.read_text(encoding="utf-8")

    # Walk line by line, tracking the current <!-- PAGE N --> marker.
    page_re = re.compile(r"<!--\s*PAGE\s+(\d+)\s*-->")
    fig_re = re.compile(r"!\[[^\]]*\]\(figures/([A-Za-z0-9_./-]+)\)")

    by_page: dict[int, list[str]] = defaultdict(list)
    cur = None
    for line in md_text.splitlines():
        m = page_re.search(line)
        if m:
            cur = int(m.group(1))
            continue
        m = fig_re.search(line)
        if m and cur is not None:
            fname = m.group(1).split("/")[-1]
            by_page[cur].append(fname)
    return dict(by_page)


# ----------------------------------------------------------------------------


def main() -> int:
    if not PDF.exists():
        print(f"ERROR: PDF missing: {PDF}", file=sys.stderr)
        return 2
    if not MD.exists():
        print(f"ERROR: MD missing: {MD}", file=sys.stderr)
        return 2

    by_page = collect_md_figure_refs()
    doc = fitz.open(str(PDF))

    total_pages_with_refs = len(by_page)
    total_refs = sum(len(v) for v in by_page.values())
    print(f"MD has {total_refs} figure refs across {total_pages_with_refs} pages")

    ok = 0
    skipped_pages: list[tuple[int, int, int, list[str]]] = []  # (page, refs, regions)

    zoom = RENDER_DPI / 72.0

    from PIL import Image

    for page_num in sorted(by_page):
        refs = by_page[page_num]
        page = doc[page_num - 1]
        regions = get_figure_regions(page)

        # Only re-crop on pages where detection perfectly matches the MD.
        # Mismatch pages keep their existing images (which are already
        # validated / human-inspected).
        if len(regions) != len(refs):
            skipped_pages.append((page_num, len(refs), len(regions), refs))
            continue

        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

        for i, r in enumerate(regions):
            padded = fitz.Rect(r) + (-PAD_POINTS, -PAD_POINTS, PAD_POINTS, PAD_POINTS)
            px0 = max(0, int(padded.x0 * zoom))
            py0 = max(0, int(padded.y0 * zoom))
            px1 = min(img.width, int(padded.x1 * zoom))
            py1 = min(img.height, int(padded.y1 * zoom))
            if px1 <= px0 or py1 <= py0:
                continue
            crop = img.crop((px0, py0, px1, py1))
            out_path = FIG_DIR / refs[i]
            crop.save(out_path)
            shutil.copy2(out_path, PUB_DIR / refs[i])
            ok += 1

    print(f"\nRe-cropped {ok} / {total_refs} figures (clean PyMuPDF match)")
    if skipped_pages:
        print(
            f"\nSkipped {len(skipped_pages)} page(s) with mismatched region count — "
            f"keeping existing crops:"
        )
        for p, refs_n, regs_n, _ in skipped_pages:
            print(f"  p{p}: {refs_n} MD refs vs {regs_n} detected")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
