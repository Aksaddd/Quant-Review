#!/usr/bin/env python3
"""Extract metadata from The Art of Problem Solving, Volume 1 markdown.

Two source pools coexist in the AoPS folder:

  * High-quality chapter MDs ............ aops_vol1_ch01..09_*.md
        Hand-transcribed with LaTeX math, **EXAMPLE N-M**, **EXERCISE N-M**,
        **N.** problems, *(SOURCE YEAR)* citations, ⭐🪡💣👁 difficulty
        markers, and YAML frontmatter.

  * OCR section MDs .................... chXX-X.X-*.md  (ch01..29, 145 files)
        Per-section files; the prose is mangled OCR but enough structure
        survives for a best-effort metadata pass: `EXAMPLE N-M`,
        `EXERCISE N-M`, bare-numbered Problems-to-Solve entries, and
        citations like (MA© 1990) where © / G are OCR mojibake of Θ.

Plus the canonical `_manifest.json` enumerating all 145 sections with their
chapter, section number, title, and PDF / book page ranges.

Outputs (under content/.../metadata/) — every record carries `source` and
`needs_review`:

  chapters.json       29 chapter records (stats + chapter_title resolution)
  sections.json      145 section records (joined manifest + frontmatter)
  examples.json       every EXAMPLE N-M (chapter_md or ocr_section_md)
  exercises.json      every EXERCISE N-M
  problems.json       every numbered Problems-to-Solve entry, with parsed
                      source competition and year/issue
  big_picture.json    BIG PICTURE block presence (chapter_md only)

Usage: python3 scripts/extract_aops_vol1.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AOPS_DIR = (
    ROOT
    / "content"
    / "The Art of Problem solving Volume 1: the BASICS by Sandor Lehoczky Richard Ruszyk"
)
MANIFEST_PATH = AOPS_DIR / "_manifest.json"
METADATA_DIR = AOPS_DIR / "metadata"

CHAPTER_MD_GLOB = "aops_vol1_ch*.md"
SECTION_MD_RE = re.compile(r"^ch(\d{1,2})-.*\.md$")

# ── Frontmatter / structural patterns ─────────────────────────────────────
YAML_OPEN = "---"
PAGE_MARKER_RE = re.compile(
    r"<!--\s*[Pp][Dd][Ff]\s*page\s*(\d+)(?:\s*[/(]\s*book\s*p?(\d+))?",
)
H2_SECTION_RE = re.compile(r"^##\s+(\d+)\.(\d+)\s+(.+?)\s*$", re.MULTILINE)
H1_PROBLEMS_RE = re.compile(
    r"^#\s+Problems\s+to\s+Solve\s+for\s+Chapter\s+(\d+)\b", re.IGNORECASE
)
PROBLEMS_HDR_OCR_RE = re.compile(
    r"\bProblems\s+to\s+Solve\s+for\s+Chapter\s+(\d+)\b", re.IGNORECASE
)

# ── Construct patterns: clean (chapter_md) ────────────────────────────────
EMOJI_TAG_GROUP = r"(?:([⭐🪡💣👁])\s+)?"
EXAMPLE_STRICT_RE = re.compile(
    rf"^{EMOJI_TAG_GROUP}\*\*EXAMPLE\s+(\d+)[-–](\d+)\*\*", re.MULTILINE
)
EXERCISE_STRICT_RE = re.compile(
    rf"^{EMOJI_TAG_GROUP}\*\*EXERCISE\s+(\d+)[-–](\d+)\*\*", re.MULTILINE
)
PROBLEM_STRICT_RE = re.compile(
    rf"^{EMOJI_TAG_GROUP}\*\*(\d+)\.\*\*", re.MULTILINE
)
BIG_PICTURE_RE = re.compile(r"^>\s*##\s+\*the BIG PICTURE\*", re.MULTILINE)

# ── Construct patterns: OCR-tolerant (ocr_section_md) ─────────────────────
EXAMPLE_OCR_RE = re.compile(r"\bEXAMPLE\s+(\d+)\s*[-–]\s*(\d+)\b")
EXERCISE_OCR_RE = re.compile(r"\bEXERCISE\s+(\d+)\s*[-–]\s*(\d+)\b")
# OCR problem numbers: line starts with `<digits>.` followed by a space and a non-digit.
PROBLEM_OCR_RE = re.compile(r"^(\d+)\.\s+\D", re.MULTILINE)

# ── Citation patterns ─────────────────────────────────────────────────────
# Strict: text wrapped in *(...)*  (chapter_md convention)
STRICT_CITATION_RE = re.compile(r"\*\(([^)]+)\)\*")
# Lenient: any (...) blob — used when scanning OCR
PARENS_RE = re.compile(r"\(([^()]{3,80})\)")
YEAR_RE = re.compile(r"\b(19|20)(\d{2})\b")
ISSUE_RE = re.compile(r"#\s*(\d+)|\bIssue\s*(\d+)\b", re.IGNORECASE)

# Competition fingerprints; OCR-tolerant.
# MAΘ may surface as MA©, MAG, MAO, MA0 — accept any of those single-char
# substitutes after `MA`.
COMPETITION_FINGERPRINTS: list[tuple[str, re.Pattern[str]]] = [
    ("MAΘ", re.compile(r"\bMA[Θ©G®@O0Øϴ]")),
    ("AHSME", re.compile(r"\bAHSM\s*E\b", re.IGNORECASE)),
    ("MATHCOUNTS", re.compile(r"\bMATHCO\s*U?\s*N?\s*T?\s*S?\b", re.IGNORECASE)),
    ("Mandelbrot", re.compile(r"\bMandelbrot\b", re.IGNORECASE)),
    ("USAMTS", re.compile(r"\bUSAM\s*T?\s*S?\b", re.IGNORECASE)),
    ("M&IQ", re.compile(r"\bM\s*&\s*IQ\b", re.IGNORECASE)),
    ("ARML", re.compile(r"\bARML\b", re.IGNORECASE)),
]

EMOJI_FLAGS = {
    "⭐": "high_value",
    "🪡": "hard",
    "💣": "warning",
    "👁": "conceptual",
}


# ──────────────────────────────────────────────────────────────────────────
# Frontmatter
# ──────────────────────────────────────────────────────────────────────────


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split YAML frontmatter from body. Returns (frontmatter_dict, body)."""
    if not text.startswith(YAML_OPEN):
        return {}, text
    end = text.find(f"\n{YAML_OPEN}", len(YAML_OPEN))
    if end == -1:
        return {}, text
    fm_block = text[len(YAML_OPEN) : end].strip()
    body = text[end + len(YAML_OPEN) + 1 :].lstrip("\n")
    fm = parse_simple_yaml(fm_block)
    return fm, body


def parse_simple_yaml(block: str) -> dict:
    """Tiny YAML subset sufficient for our frontmatter (scalars + list[int] +
    list[str]). Avoids a PyYAML dependency."""
    out: dict = {}
    for raw in block.splitlines():
        line = raw.rstrip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if not val:
            out[key] = None
            continue
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            if not inner:
                out[key] = []
                continue
            parts = [p.strip() for p in inner.split(",")]
            parsed: list = []
            for p in parts:
                p = p.strip().strip('"').strip("'")
                if not p:
                    continue
                if p.lstrip("-").isdigit():
                    parsed.append(int(p))
                else:
                    parsed.append(p)
            out[key] = parsed
        elif val == "true":
            out[key] = True
        elif val == "false":
            out[key] = False
        elif val == "null":
            out[key] = None
        elif val.lstrip("-").isdigit():
            out[key] = int(val)
        else:
            out[key] = val.strip('"').strip("'")
    return out


# ──────────────────────────────────────────────────────────────────────────
# Page tracking
# ──────────────────────────────────────────────────────────────────────────


def build_page_index(body: str) -> list[tuple[int, int, int | None]]:
    """Return [(char_offset, pdf_page, book_page)] in source order."""
    idx: list[tuple[int, int, int | None]] = []
    for m in PAGE_MARKER_RE.finditer(body):
        pdf = int(m.group(1))
        book = int(m.group(2)) if m.group(2) else None
        idx.append((m.start(), pdf, book))
    return idx


def page_at(idx: list[tuple[int, int, int | None]], offset: int) -> tuple[int | None, int | None]:
    pdf = book = None
    for off, p, b in idx:
        if off <= offset:
            pdf, book = p, b
        else:
            break
    return pdf, book


def build_section_index(body: str) -> list[tuple[int, str]]:
    """Return [(char_offset, section_id)] for each `## N.M Title` heading."""
    return [(m.start(), f"{m.group(1)}.{m.group(2)}") for m in H2_SECTION_RE.finditer(body)]


def section_at(idx: list[tuple[int, str]], offset: int) -> str | None:
    sec: str | None = None
    for off, s in idx:
        if off <= offset:
            sec = s
        else:
            break
    return sec


def problems_section_offset(body: str) -> int | None:
    """Where the Problems-to-Solve heading starts; None if not present."""
    m = H1_PROBLEMS_RE.search(body) or PROBLEMS_HDR_OCR_RE.search(body)
    return m.start() if m else None


# ──────────────────────────────────────────────────────────────────────────
# Citations
# ──────────────────────────────────────────────────────────────────────────


def detect_competition(text: str) -> str | None:
    for name, pat in COMPETITION_FINGERPRINTS:
        if pat.search(text):
            return name
    return None


def parse_citation(blob: str) -> dict | None:
    """Parse a citation like 'MA© 1992', 'AHSME 1955', 'Mandelbrot #3'.
    Returns {competition, year, issue, raw} or None if no competition matches."""
    competition = detect_competition(blob)
    if not competition:
        return None
    year_m = YEAR_RE.search(blob)
    year = int(f"{year_m.group(1)}{year_m.group(2)}") if year_m else None
    issue: int | None = None
    issue_m = ISSUE_RE.search(blob)
    if issue_m:
        issue = int(issue_m.group(1) or issue_m.group(2))
    elif competition in ("Mandelbrot", "USAMTS") and year is None:
        # USAMTS / Mandelbrot may use a bare number with no `#` (e.g., 'USAMTS 1').
        for tok in re.findall(r"\b(\d{1,3})\b", blob):
            n = int(tok)
            if n < 50:  # avoid colliding with year fragments
                issue = n
                break
    return {
        "competition": competition,
        "year": year,
        "issue": issue,
        "raw": blob.strip(),
    }


def extract_citation_near(body: str, anchor_end: int, window: int = 400) -> dict | None:
    """Look ahead `window` chars from `anchor_end` for the closest plausible
    citation. Returns parsed citation dict or None."""
    snippet = body[anchor_end : anchor_end + window]
    # Prefer strict *(...)* form first.
    for m in STRICT_CITATION_RE.finditer(snippet):
        cit = parse_citation(m.group(1))
        if cit:
            return cit
    for m in PARENS_RE.finditer(snippet):
        cit = parse_citation(m.group(1))
        if cit:
            return cit
    return None


# ──────────────────────────────────────────────────────────────────────────
# Tag flags
# ──────────────────────────────────────────────────────────────────────────


def empty_tags() -> dict:
    return {flag: False for flag in EMOJI_FLAGS.values()}


def tag_from_emoji(emoji: str | None) -> dict:
    tags = empty_tags()
    if emoji and emoji in EMOJI_FLAGS:
        tags[EMOJI_FLAGS[emoji]] = True
    return tags


# ──────────────────────────────────────────────────────────────────────────
# Manifest + filename helpers
# ──────────────────────────────────────────────────────────────────────────


def load_manifest() -> list[dict]:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def chapter_md_files() -> dict[int, Path]:
    out: dict[int, Path] = {}
    for p in sorted(AOPS_DIR.glob(CHAPTER_MD_GLOB)):
        m = re.search(r"aops_vol1_ch(\d{1,2})_", p.name)
        if m:
            out[int(m.group(1))] = p
    return out


def section_md_files() -> list[Path]:
    return sorted(p for p in AOPS_DIR.iterdir() if SECTION_MD_RE.match(p.name))


# ──────────────────────────────────────────────────────────────────────────
# Extraction passes
# ──────────────────────────────────────────────────────────────────────────


def extract_from_chapter_md(
    path: Path, chapter: int
) -> dict:
    """Strict extraction from a clean chapter MD. Returns dict of lists +
    chapter-level metadata."""
    raw = path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)
    page_idx = build_page_index(body)
    section_idx = build_section_index(body)
    problems_off = problems_section_offset(body)

    examples: list[dict] = []
    exercises: list[dict] = []
    problems: list[dict] = []
    big_pictures: list[dict] = []

    for m in EXAMPLE_STRICT_RE.finditer(body):
        emoji, ch, num = m.group(1), int(m.group(2)), int(m.group(3))
        pdf_page, _ = page_at(page_idx, m.start())
        section = section_at(section_idx, m.start())
        examples.append(
            {
                "id": f"{ch}-{num}",
                "chapter": ch,
                "number": num,
                "section": section,
                "pdf_page": pdf_page,
                "tags": tag_from_emoji(emoji),
                "source": "chapter_md",
                "source_file": path.name,
                "needs_review": False,
            }
        )

    for m in EXERCISE_STRICT_RE.finditer(body):
        emoji, ch, num = m.group(1), int(m.group(2)), int(m.group(3))
        pdf_page, _ = page_at(page_idx, m.start())
        section = section_at(section_idx, m.start())
        exercises.append(
            {
                "id": f"{ch}-{num}",
                "chapter": ch,
                "number": num,
                "section": section,
                "pdf_page": pdf_page,
                "tags": tag_from_emoji(emoji),
                "source": "chapter_md",
                "source_file": path.name,
                "needs_review": False,
            }
        )

    for m in PROBLEM_STRICT_RE.finditer(body):
        if problems_off is None or m.start() < problems_off:
            continue
        emoji, num = m.group(1), int(m.group(2))
        pdf_page, _ = page_at(page_idx, m.start())
        citation = extract_citation_near(body, m.end())
        problems.append(
            {
                "number": num,
                "chapter": chapter,
                "pdf_page": pdf_page,
                "tags": tag_from_emoji(emoji),
                "source_competition": citation["competition"] if citation else None,
                "source_year": citation["year"] if citation else None,
                "source_issue": citation["issue"] if citation else None,
                "source_raw": citation["raw"] if citation else None,
                "source": "chapter_md",
                "source_file": path.name,
                "needs_review": False,
            }
        )

    for m in BIG_PICTURE_RE.finditer(body):
        pdf_page, _ = page_at(page_idx, m.start())
        section = section_at(section_idx, m.start())
        big_pictures.append(
            {
                "chapter": chapter,
                "section": section,
                "pdf_page": pdf_page,
                "source": "chapter_md",
                "source_file": path.name,
                "needs_review": False,
            }
        )

    chapter_meta = {
        "chapter": chapter,
        "title": fm.get("chapter_title") or fm.get("title"),
        "high_value": bool(fm.get("high_value", False)),
        "pdf_page_range": fm.get("pdf_page_range"),
        "book_page_range": fm.get("book_page_range"),
        "has_chapter_md": True,
        "chapter_md_file": path.name,
    }
    return {
        "meta": chapter_meta,
        "examples": examples,
        "exercises": exercises,
        "problems": problems,
        "big_pictures": big_pictures,
    }


def extract_from_ocr_section_md(
    path: Path,
) -> dict:
    """Best-effort extraction from an OCR section MD. Returns dict of lists +
    section-level metadata."""
    raw = path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)
    page_idx = build_page_index(body)
    problems_off = problems_section_offset(body)

    chapter = fm.get("chapter")
    section_id = fm.get("section")

    examples: list[dict] = []
    exercises: list[dict] = []
    problems: list[dict] = []

    seen_ex: set[str] = set()
    for m in EXAMPLE_OCR_RE.finditer(body):
        ch, num = int(m.group(1)), int(m.group(2))
        key = f"{ch}-{num}"
        if key in seen_ex:
            continue
        seen_ex.add(key)
        pdf_page, _ = page_at(page_idx, m.start())
        examples.append(
            {
                "id": key,
                "chapter": ch,
                "number": num,
                "section": section_id,
                "pdf_page": pdf_page,
                "tags": empty_tags(),
                "source": "ocr_section_md",
                "source_file": path.name,
                "needs_review": True,
            }
        )

    seen_xr: set[str] = set()
    for m in EXERCISE_OCR_RE.finditer(body):
        ch, num = int(m.group(1)), int(m.group(2))
        key = f"{ch}-{num}"
        if key in seen_xr:
            continue
        seen_xr.add(key)
        pdf_page, _ = page_at(page_idx, m.start())
        exercises.append(
            {
                "id": key,
                "chapter": ch,
                "number": num,
                "section": section_id,
                "pdf_page": pdf_page,
                "tags": empty_tags(),
                "source": "ocr_section_md",
                "source_file": path.name,
                "needs_review": True,
            }
        )

    if problems_off is not None:
        for m in PROBLEM_OCR_RE.finditer(body, pos=problems_off):
            num = int(m.group(1))
            pdf_page, _ = page_at(page_idx, m.start())
            citation = extract_citation_near(body, m.end())
            problems.append(
                {
                    "number": num,
                    "chapter": chapter,
                    "pdf_page": pdf_page,
                    "tags": empty_tags(),
                    "source_competition": citation["competition"] if citation else None,
                    "source_year": citation["year"] if citation else None,
                    "source_issue": citation["issue"] if citation else None,
                    "source_raw": citation["raw"] if citation else None,
                    "source": "ocr_section_md",
                    "source_file": path.name,
                    "needs_review": True,
                }
            )
    elif fm.get("section") is None:
        # E.g. ch29 'Parting Shots' — entire chapter is problems.
        for m in PROBLEM_OCR_RE.finditer(body):
            num = int(m.group(1))
            pdf_page, _ = page_at(page_idx, m.start())
            citation = extract_citation_near(body, m.end())
            problems.append(
                {
                    "number": num,
                    "chapter": chapter,
                    "pdf_page": pdf_page,
                    "tags": empty_tags(),
                    "source_competition": citation["competition"] if citation else None,
                    "source_year": citation["year"] if citation else None,
                    "source_issue": citation["issue"] if citation else None,
                    "source_raw": citation["raw"] if citation else None,
                    "source": "ocr_section_md",
                    "source_file": path.name,
                    "needs_review": True,
                }
            )

    section_meta = {
        "chapter": chapter,
        "section": section_id,
        "section_title": fm.get("section_title"),
        "chapter_title": fm.get("chapter_title"),
        "book_pages": fm.get("book_pages"),
        "pdf_pages": fm.get("pdf_pages"),
        "ocr_section_file": path.name,
    }
    return {
        "section": section_meta,
        "examples": examples,
        "exercises": exercises,
        "problems": problems,
    }


# ──────────────────────────────────────────────────────────────────────────
# Aggregation
# ──────────────────────────────────────────────────────────────────────────


def main() -> int:
    if not AOPS_DIR.exists():
        print(f"AoPS directory not found: {AOPS_DIR}", file=sys.stderr)
        return 1
    METADATA_DIR.mkdir(parents=True, exist_ok=True)

    manifest = load_manifest()
    ch_md_files = chapter_md_files()
    sec_md_paths = section_md_files()

    chapter_md_results: dict[int, dict] = {}
    for ch_num, path in ch_md_files.items():
        chapter_md_results[ch_num] = extract_from_chapter_md(path, ch_num)

    ocr_results: list[dict] = []
    for path in sec_md_paths:
        ocr_results.append(extract_from_ocr_section_md(path))

    chapter_titles_from_ocr: dict[int, str] = {}
    for r in ocr_results:
        sec = r["section"]
        if sec.get("chapter") is not None and sec.get("chapter_title"):
            chapter_titles_from_ocr.setdefault(sec["chapter"], sec["chapter_title"])

    examples: list[dict] = []
    exercises: list[dict] = []
    problems: list[dict] = []
    big_picture: list[dict] = []

    for r in chapter_md_results.values():
        examples.extend(r["examples"])
        exercises.extend(r["exercises"])
        problems.extend(r["problems"])
        big_picture.extend(r["big_pictures"])

    chapters_with_md = set(chapter_md_results.keys())
    # OCR section files for adjacent pages can mention the same EXAMPLE /
    # EXERCISE; dedupe at the chapter level by id, keeping the earliest
    # occurrence (lowest pdf_page).
    ocr_examples: dict[tuple[int, int], dict] = {}
    ocr_exercises: dict[tuple[int, int], dict] = {}
    ocr_problems: list[dict] = []
    for r in ocr_results:
        ch = r["section"].get("chapter")
        if ch in chapters_with_md:
            continue  # canonical record already came from chapter_md
        for rec in r["examples"]:
            key = (rec["chapter"], rec["number"])
            existing = ocr_examples.get(key)
            if existing is None or (rec["pdf_page"] or 99999) < (existing["pdf_page"] or 99999):
                ocr_examples[key] = rec
        for rec in r["exercises"]:
            key = (rec["chapter"], rec["number"])
            existing = ocr_exercises.get(key)
            if existing is None or (rec["pdf_page"] or 99999) < (existing["pdf_page"] or 99999):
                ocr_exercises[key] = rec
        ocr_problems.extend(r["problems"])
    examples.extend(ocr_examples.values())
    exercises.extend(ocr_exercises.values())
    problems.extend(ocr_problems)

    # ── chapters.json ─────────────────────────────────────────────────────
    chapter_numbers: set[int] = set(chapter_md_results.keys())
    for entry in manifest:
        if entry.get("chapter") is not None:
            chapter_numbers.add(entry["chapter"])
    for ch in chapter_titles_from_ocr:
        chapter_numbers.add(ch)

    chapters_out: list[dict] = []
    for ch in sorted(chapter_numbers):
        ch_entries = [entry for entry in manifest if entry.get("chapter") == ch]
        # Count manifest entries for the chapter, including monolithic
        # chapters where the whole chapter is one entry with section=null.
        section_count = len(ch_entries)
        is_monolithic = (
            section_count > 0 and all(not e.get("section") for e in ch_entries)
        )
        ch_examples = [e for e in examples if e["chapter"] == ch]
        ch_exercises = [e for e in exercises if e["chapter"] == ch]
        ch_problems = [p for p in problems if p["chapter"] == ch]
        ch_bp = [b for b in big_picture if b["chapter"] == ch]

        if ch in chapter_md_results:
            meta = chapter_md_results[ch]["meta"]
            record = {
                **meta,
                "is_monolithic": is_monolithic,
                "section_count": section_count,
                "example_count": len(ch_examples),
                "exercise_count": len(ch_exercises),
                "problem_count": len(ch_problems),
                "big_picture_count": len(ch_bp),
                "source": "chapter_md",
                "needs_review": False,
            }
        else:
            pdf_pages_in_ch = [p for e in ch_entries for p in (e.get("pdf_pages") or [])]
            book_pages_in_ch = [p for e in ch_entries for p in (e.get("book_pages") or [])]
            record = {
                "chapter": ch,
                "title": chapter_titles_from_ocr.get(ch),
                "high_value": False,
                "pdf_page_range": (
                    [min(pdf_pages_in_ch), max(pdf_pages_in_ch)] if pdf_pages_in_ch else None
                ),
                "book_page_range": (
                    [min(book_pages_in_ch), max(book_pages_in_ch)] if book_pages_in_ch else None
                ),
                "has_chapter_md": False,
                "chapter_md_file": None,
                "is_monolithic": is_monolithic,
                "section_count": section_count,
                "example_count": len(ch_examples),
                "exercise_count": len(ch_exercises),
                "problem_count": len(ch_problems),
                "big_picture_count": 0,
                "source": "ocr_section_md",
                "needs_review": True,
            }
        chapters_out.append(record)

    # ── sections.json ─────────────────────────────────────────────────────
    sections_out: list[dict] = []
    for entry in manifest:
        ch = entry.get("chapter")
        sec = entry.get("section")
        sec_record = {
            "chapter": ch,
            "section": sec,
            "title": entry.get("title"),
            "book_pages": entry.get("book_pages"),
            "pdf_pages": entry.get("pdf_pages"),
            "section_md_file": entry.get("file"),
            "in_chapter_md": (ch in chapter_md_results),
            "source": "manifest",
            "needs_review": ch not in chapter_md_results,
        }
        sections_out.append(sec_record)

    # ── Sort everything ───────────────────────────────────────────────────
    examples.sort(key=lambda e: (e["chapter"], e["number"]))
    exercises.sort(key=lambda e: (e["chapter"], e["number"]))
    problems.sort(key=lambda p: (p["chapter"], p["number"]))
    big_picture.sort(key=lambda b: (b["chapter"], b.get("pdf_page") or 0))
    sections_out.sort(
        key=lambda s: (
            s["chapter"] if s["chapter"] is not None else 0,
            tuple(int(x) for x in (s["section"] or "0").split(".")) if s["section"] else (0,),
        )
    )

    # ── Write JSON ────────────────────────────────────────────────────────
    def write_json(name: str, data) -> None:
        out = METADATA_DIR / name
        out.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"  wrote {out.relative_to(ROOT)}  ({len(data)} records)")

    print("AoPS Volume 1 metadata extraction")
    print(f"  source dir: {AOPS_DIR.relative_to(ROOT)}")
    print(f"  output dir: {METADATA_DIR.relative_to(ROOT)}")
    write_json("chapters.json", chapters_out)
    write_json("sections.json", sections_out)
    write_json("examples.json", examples)
    write_json("exercises.json", exercises)
    write_json("problems.json", problems)
    write_json("big_picture.json", big_picture)

    # ── Summary ───────────────────────────────────────────────────────────
    print()
    print("Summary by chapter:")
    print(
        f"  {'ch':>3}  {'title':<48}  {'src':<14}  "
        f"{'sec':>3}  {'ex':>4}  {'xer':>4}  {'prob':>4}  {'bp':>2}"
    )
    for ch in chapters_out:
        title = (ch.get("title") or "—")[:48]
        src = ch["source"]
        print(
            f"  {ch['chapter']:>3}  {title:<48}  {src:<14}  "
            f"{ch['section_count']:>3}  {ch['example_count']:>4}  "
            f"{ch['exercise_count']:>4}  {ch['problem_count']:>4}  "
            f"{ch['big_picture_count']:>2}"
        )
    print()
    print(
        f"Totals: chapters={len(chapters_out)} sections={len(sections_out)} "
        f"examples={len(examples)} exercises={len(exercises)} problems={len(problems)} "
        f"big_picture={len(big_picture)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
