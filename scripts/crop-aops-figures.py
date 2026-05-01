#!/usr/bin/env python3
"""Crop figures from AoPS Vol. 1 source page scans.

Reads figures.json from the AoPS content folder, opens each referenced
page-NNN.jpg, crops the bbox region, and writes public/aops-figures/<id>.png.

Run from repo root:
    python3 scripts/crop-aops-figures.py
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("error: Pillow not installed. run: pip3 install Pillow")

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = REPO_ROOT / "content" / "aops-vol1"
OUTPUT_DIR = REPO_ROOT / "public" / "aops-figures"

def main() -> int:
    meta_path = CONTENT_DIR / "figures.json"
    if not meta_path.exists():
        sys.exit(f"error: {meta_path} not found")

    meta = json.loads(meta_path.read_text())
    figures = meta["figures"]
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    written = 0
    skipped = 0
    for f in figures:
        # Only crop figures whose asset format is png. SVG-format figures
        # (ch 3, 9, 10) are produced by scripts/render-aops-figures.py instead.
        if f.get("format") != "png":
            continue
        page = f["page"]
        bbox = f["bbox"]
        x, y, w, h = bbox
        page_path = CONTENT_DIR / f"page-{page:03d}.jpg"
        if not page_path.exists():
            print(f"  ! missing page jpeg: {page_path.name}")
            skipped += 1
            continue
        img = Image.open(page_path)
        # Clamp bbox to image bounds — a few pixels of slack for right-margin
        # figures that abut the page edge is fine.
        left = max(0, x)
        top = max(0, y)
        right = min(img.width, x + w)
        bottom = min(img.height, y + h)
        if right <= left or bottom <= top:
            print(f"  ! degenerate bbox for {f['id']}: {bbox}")
            skipped += 1
            continue
        crop = img.crop((left, top, right, bottom))
        out = OUTPUT_DIR / f"{f['id']}.png"
        crop.save(out, optimize=True)
        print(f"  ✓ {f['id']:48s} {w}x{h} from page {page}")
        written += 1

    print(f"\n{written} figures cropped → {OUTPUT_DIR.relative_to(REPO_ROOT)}/")
    if skipped:
        print(f"{skipped} skipped (see warnings above)")
    return 0 if skipped == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
