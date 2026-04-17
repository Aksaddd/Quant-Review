#!/usr/bin/env python3
"""Extract curriculum metadata from the Competitive Programmer's Handbook.

Mirrors scripts/extract_effective_cpp.py so the output slots into the same UI
pipeline. The handbook has a different native structure than Effective C++:

    Part I ── Chapter 1 ── paragraphs / code / figures / subsections
                Chapter 2 ──
                ...
    Part II ──  Chapter 11 ──
                ...
    Part III ── Chapter 21 ──
                ...

At the user's request, each **chapter** (30 total) is one page/record — the
same role that an "Item" plays in Effective C++. `chapter.part` is the
grouping container (analogous to Effective C++'s chapter grouping).

Outputs under content/competitive_programmers_handbook/metadata/:

    items.json              - one record per Chapter (30 total)
    prerequisite_graph.json - directed graph of Chapter -> Chapters it cites
    learning_path.json      - topologically ordered, grouped by Part
    flashcards.json         - auto-generated from `**bold term**` definitions
    code_exercises.json     - fill-in-the-blank per code example

Usage:
    python3 scripts/extract_cp_handbook.py
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

# -----------------------------------------------------------------------------
# Paths
# -----------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content" / "competitive_programmers_handbook"
SRC_MD = CONTENT_DIR / "competitive_programmers_handbook.md"
OUT_DIR = CONTENT_DIR / "metadata"
FIG_SRC_DIR = CONTENT_DIR / "figures"
FIG_PUBLIC_DIR = ROOT / "public" / "cp-handbook" / "figures"
FIG_PUBLIC_HREF = "/cp-handbook/figures"

# -----------------------------------------------------------------------------
# Regexes
# -----------------------------------------------------------------------------

PART_RE = re.compile(r"^# Part (I{1,3})\s*$")
CHAPTER_RE = re.compile(r"^# Chapter (\d+)\s*$")
H2_RE = re.compile(r"^## (.+?)\s*$")
H3_RE = re.compile(r"^### (.+?)\s*$")
PAGE_RE = re.compile(r"^<!--\s*PAGE\s+\d+\s*-->\s*$")
FIGURE_RE = re.compile(r"^!\[([^\]]*)\]\((figures/[A-Za-z0-9_./-]+)\)\s*$")
FOOTNOTE_RE = re.compile(r"^>\s+\*\*\[(\d+)\]\*\*\s+(.*)$")
# `§X.Y` / "Chapter N" / "Section N.M" style references used for prereqs.
CROSSREF_CHAPTER_RE = re.compile(r"\bChapter\s+(\d+)\b")
# Bold term candidate for flashcards: "**<term>** is/are/means <definition>..."
BOLD_DEF_RE = re.compile(
    r"\*\*(?P<term>[^*]{2,80})\*\*\s+(?:is|are|means|refers to|denotes)\s+(?P<def>[^.]{10,400}[.!?])"
)

CPP_OPEN_RE = re.compile(r"^```(\w+)?\s*$")
CPP_CLOSE = "```"

PART_NUMBER = {"I": 1, "II": 2, "III": 3}
PART_TITLES = {
    1: "Basic techniques",
    2: "Graph algorithms",
    3: "Advanced topics",
}

CPP_KEYWORDS = {
    "alignas", "alignof", "auto", "bool", "break", "case", "catch", "char",
    "class", "const", "constexpr", "continue", "default", "delete", "do",
    "double", "else", "enum", "explicit", "extern", "false", "float", "for",
    "friend", "goto", "if", "inline", "int", "long", "mutable", "namespace",
    "new", "noexcept", "nullptr", "operator", "private", "protected", "public",
    "register", "return", "short", "signed", "sizeof", "static", "struct",
    "switch", "template", "this", "throw", "true", "try", "typedef", "typeid",
    "typename", "union", "unsigned", "using", "virtual", "void", "volatile",
    "while", "std", "cout", "cin", "endl", "string", "vector", "size_t",
    "main", "include",
}

# Concept vocabulary — map chapter title / intro keywords to slugs for UI tags.
CONCEPT_VOCAB = [
    ("algorithms", ["algorithm"]),
    ("complexity", ["time complexity", "complexity"]),
    ("sorting", ["sorting", "sort"]),
    ("binary-search", ["binary search"]),
    ("data-structures", ["data structure", "vector", "map", "set"]),
    ("dynamic-programming", ["dynamic programming"]),
    ("greedy", ["greedy"]),
    ("backtracking", ["backtracking"]),
    ("amortized", ["amortized"]),
    ("range-queries", ["range query", "segment tree", "binary indexed"]),
    ("bit-manipulation", ["bit manipulation", "bitwise"]),
    ("graph", ["graph", "tree", "node", "edge"]),
    ("shortest-path", ["shortest path", "dijkstra", "bellman"]),
    ("spanning-tree", ["spanning tree", "kruskal", "prim"]),
    ("connectivity", ["connectivity", "strongly connected"]),
    ("flows", ["flow", "cut", "matching"]),
    ("number-theory", ["prime", "gcd", "modular", "factor"]),
    ("combinatorics", ["combinatoric", "binomial", "catalan", "inclusion"]),
    ("matrices", ["matrix", "matrices", "linear algebra"]),
    ("probability", ["probability", "random"]),
    ("game-theory", ["game", "nim", "sprague"]),
    ("strings", ["string", "hash", "trie", "suffix"]),
    ("geometry", ["geometry", "polygon", "convex"]),
    ("sweep-line", ["sweep"]),
    ("square-root", ["square root", "sqrt"]),
    ("segment-tree", ["segment tree"]),
]

# -----------------------------------------------------------------------------
# Data model
# -----------------------------------------------------------------------------


@dataclass
class Paragraph:
    order: int
    text: str


@dataclass
class CodeExample:
    order: int
    language: str
    code: str
    preceding_paragraph_order: int | None = None
    explanatory_paragraphs: list[int] = field(default_factory=list)


@dataclass
class Subsection:
    level: int  # 2 or 3
    title: str
    paragraph_range: list[int]  # [start_order, end_order]


@dataclass
class Figure:
    src: str
    alt: str
    preceding_paragraph_order: int | None


@dataclass
class Footnote:
    marker: int
    text: str


@dataclass
class CrossRef:
    to_chapter: int


@dataclass
class PartRef:
    number: int
    roman: str
    title: str


@dataclass
class Chapter:
    number: int
    title: str
    part: PartRef
    anchor: str
    slug: str
    summary: str
    paragraphs: list[Paragraph]
    code_examples: list[CodeExample]
    subsections: list[Subsection]
    figures: list[Figure]
    footnotes: list[Footnote]
    cross_references: list[CrossRef]
    difficulty: str
    prerequisites: list[int]
    concept_tags: list[str]


# -----------------------------------------------------------------------------
# Parsing utilities
# -----------------------------------------------------------------------------


def load_lines() -> list[str]:
    return SRC_MD.read_text(encoding="utf-8").splitlines()


def scan_parts(lines: list[str]) -> list[tuple[int, PartRef]]:
    """Return list of (line_idx, PartRef) for each `# Part X` heading."""
    parts = []
    for idx, line in enumerate(lines):
        m = PART_RE.match(line)
        if m:
            roman = m.group(1)
            num = PART_NUMBER[roman]
            parts.append((idx, PartRef(number=num, roman=roman, title=PART_TITLES[num])))
    return parts


def scan_chapter_ranges(
    lines: list[str], parts: list[tuple[int, PartRef]]
) -> list[tuple[int, int, int, PartRef]]:
    """Return (start_idx, end_idx_excl, chapter_num, part) for each chapter.

    `start_idx` points at the `# Chapter N` heading; `end_idx_excl` is the next
    `# Chapter` / `# Part` heading (or len(lines)).
    """
    chapter_heads: list[tuple[int, int]] = []  # (line_idx, number)
    stop_points: list[int] = []
    for idx, line in enumerate(lines):
        m = CHAPTER_RE.match(line)
        if m:
            chapter_heads.append((idx, int(m.group(1))))
            stop_points.append(idx)
        elif PART_RE.match(line):
            stop_points.append(idx)
    stop_points.append(len(lines))
    stop_points = sorted(set(stop_points))

    def part_for(line_idx: int) -> PartRef:
        last = parts[0][1]
        for pidx, part in parts:
            if pidx <= line_idx:
                last = part
            else:
                break
        return last

    ranges = []
    for start, num in chapter_heads:
        end = next(p for p in stop_points if p > start)
        ranges.append((start, end, num, part_for(start)))
    return ranges


def slugify(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s or "chapter"


# -----------------------------------------------------------------------------
# Body parser for a single chapter
# -----------------------------------------------------------------------------


def parse_chapter_body(
    lines: list[str], start: int, end: int
) -> tuple[
    str,            # chapter title
    str,            # anchor (slug)
    list[Paragraph],
    list[CodeExample],
    list[Subsection],
    list[Figure],
    list[Footnote],
]:
    """Parse the body of a `# Chapter N` block.

    The first `## <title>` encountered becomes the chapter title. Subsequent
    `##` and `###` headings are recorded as Subsections (with level).
    Figures, footnotes, code examples, paragraphs are collected in reading
    order; each figure and code example records the paragraph order it follows.
    """
    paragraphs: list[Paragraph] = []
    code_examples: list[CodeExample] = []
    subsections: list[Subsection] = []
    figures: list[Figure] = []
    footnotes: list[Footnote] = []

    title: str | None = None
    last_paragraph_order: int | None = None
    current_subsection: Subsection | None = None
    pending_explanations_for: list[CodeExample] = []

    def close_subsection(end_order: int | None) -> None:
        nonlocal current_subsection
        if current_subsection is None:
            return
        s = current_subsection.paragraph_range[0]
        e = end_order if end_order is not None else s
        current_subsection.paragraph_range = [s, e]
        subsections.append(current_subsection)
        current_subsection = None

    prose_buf: list[str] = []

    def flush_prose() -> None:
        nonlocal last_paragraph_order
        if not prose_buf:
            return
        text = " ".join(p.strip() for p in prose_buf).strip()
        prose_buf.clear()
        if not text:
            return
        order = len(paragraphs)
        paragraphs.append(Paragraph(order=order, text=text))
        last_paragraph_order = order
        for ce in pending_explanations_for:
            if len(ce.explanatory_paragraphs) < 2:
                ce.explanatory_paragraphs.append(order)
        pending_explanations_for[:] = [
            ce for ce in pending_explanations_for if len(ce.explanatory_paragraphs) < 2
        ]

    i = start + 1
    while i < end:
        line = lines[i]
        stripped = line.strip()

        # Skip page markers.
        if PAGE_RE.match(line):
            i += 1
            continue

        # H2 heading — chapter title on first occurrence, else a subsection.
        m_h2 = H2_RE.match(line)
        if m_h2:
            flush_prose()
            h2_title = m_h2.group(1).strip()
            if title is None:
                title = h2_title
                i += 1
                continue
            close_subsection(last_paragraph_order)
            current_subsection = Subsection(
                level=2,
                title=h2_title,
                paragraph_range=[len(paragraphs), len(paragraphs)],
            )
            i += 1
            continue

        # H3 heading — always a subsection.
        m_h3 = H3_RE.match(line)
        if m_h3:
            flush_prose()
            close_subsection(last_paragraph_order)
            current_subsection = Subsection(
                level=3,
                title=m_h3.group(1).strip(),
                paragraph_range=[len(paragraphs), len(paragraphs)],
            )
            i += 1
            continue

        # Image figure on its own line.
        m_fig = FIGURE_RE.match(line)
        if m_fig:
            flush_prose()
            raw_src = m_fig.group(2)  # e.g. "figures/fig_p036_001.png"
            basename = raw_src.split("/", 1)[1] if raw_src.startswith("figures/") else raw_src
            figures.append(
                Figure(
                    src=f"{FIG_PUBLIC_HREF}/{basename}",
                    alt=m_fig.group(1),
                    preceding_paragraph_order=last_paragraph_order,
                )
            )
            i += 1
            continue

        # Footnote.
        m_fn = FOOTNOTE_RE.match(line)
        if m_fn:
            flush_prose()
            footnotes.append(
                Footnote(marker=int(m_fn.group(1)), text=m_fn.group(2).strip())
            )
            i += 1
            continue

        # Code fence.
        m_open = CPP_OPEN_RE.match(line)
        if m_open:
            flush_prose()
            language = m_open.group(1) or "text"
            i += 1
            code_lines: list[str] = []
            while i < end and lines[i].strip() != CPP_CLOSE:
                code_lines.append(lines[i])
                i += 1
            if i < end and lines[i].strip() == CPP_CLOSE:
                i += 1
            ce = CodeExample(
                order=len(code_examples),
                language=language,
                code="\n".join(code_lines),
                preceding_paragraph_order=last_paragraph_order,
                explanatory_paragraphs=[],
            )
            code_examples.append(ce)
            pending_explanations_for.append(ce)
            continue

        # Blank line ends an in-progress paragraph.
        if stripped == "":
            flush_prose()
            i += 1
            continue

        # Accumulate prose.
        prose_buf.append(stripped)
        i += 1

    # End-of-chapter flushes.
    flush_prose()
    close_subsection(last_paragraph_order)

    if title is None:
        # Fallback — use "Chapter N" if there's no H2 (shouldn't happen for real chapters).
        title = "Untitled"

    anchor = slugify(title)
    return title, anchor, paragraphs, code_examples, subsections, figures, footnotes


# -----------------------------------------------------------------------------
# Per-chapter derived metadata
# -----------------------------------------------------------------------------


def extract_cross_refs(paragraphs: list[Paragraph], own_chapter: int) -> list[CrossRef]:
    seen: set[int] = set()
    refs: list[CrossRef] = []
    for p in paragraphs:
        for m in CROSSREF_CHAPTER_RE.finditer(p.text):
            n = int(m.group(1))
            if n == own_chapter or n < 1 or n > 30:
                continue
            if n in seen:
                continue
            seen.add(n)
            refs.append(CrossRef(to_chapter=n))
    return refs


def tag_concepts(title: str, paragraphs: list[Paragraph]) -> list[str]:
    first_prose = paragraphs[0].text if paragraphs else ""
    haystack = (title + " " + first_prose).lower()
    tags: list[str] = []
    for tag, kws in CONCEPT_VOCAB:
        for kw in kws:
            if kw.lower() in haystack:
                tags.append(tag)
                break
    seen: set[str] = set()
    out: list[str] = []
    for t in tags:
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
    return out


def difficulty_for_part(part_number: int) -> str:
    return {1: "beginner", 2: "intermediate", 3: "advanced"}[part_number]


def summarize(title: str, paragraphs: list[Paragraph]) -> str:
    if not paragraphs:
        return f"Chapter on {title.lower()}."
    first = paragraphs[0].text
    # Cut at first sentence end.
    m = re.match(r"(.{20,240}?[.!?])(\s|$)", first)
    sentence = m.group(1) if m else first[:200]
    return sentence.strip()


# -----------------------------------------------------------------------------
# Cross-chapter derived metadata
# -----------------------------------------------------------------------------


def build_prereq_graph(chapters: list[Chapter]) -> dict:
    edges = {
        c.number: sorted({r.to_chapter for r in c.cross_references if r.to_chapter != c.number})
        for c in chapters
    }

    # Tarjan's SCC.
    counter = [0]
    stack: list[int] = []
    lowlinks: dict[int, int] = {}
    index: dict[int, int] = {}
    on_stack: dict[int, bool] = {}
    sccs: list[list[int]] = []

    def connect(v: int) -> None:
        index[v] = counter[0]
        lowlinks[v] = counter[0]
        counter[0] += 1
        stack.append(v)
        on_stack[v] = True
        for w in edges.get(v, []):
            if w not in index:
                connect(w)
                lowlinks[v] = min(lowlinks[v], lowlinks[w])
            elif on_stack.get(w):
                lowlinks[v] = min(lowlinks[v], index[w])
        if lowlinks[v] == index[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v:
                    break
            sccs.append(sorted(scc))

    sys.setrecursionlimit(2000)
    for v in edges:
        if v not in index:
            connect(v)

    clusters = [scc for scc in sccs if len(scc) > 1]
    return {
        "edges": [{"from": k, "to": v} for k, vs in edges.items() for v in vs],
        "adjacency": edges,
        "study_together_clusters": clusters,
    }


def build_learning_path(chapters: list[Chapter], graph: dict) -> dict:
    # Chapters are already naturally ordered; we group by Part.
    by_part: dict[int, list[dict]] = {}
    for c in sorted(chapters, key=lambda c: c.number):
        by_part.setdefault(c.part.number, []).append(
            {"chapter": c.number, "title": c.title, "difficulty": c.difficulty}
        )
    return {
        "topo_order": [c.number for c in sorted(chapters, key=lambda c: c.number)],
        "by_part": [
            {
                "part": n,
                "roman": {1: "I", 2: "II", 3: "III"}[n],
                "title": PART_TITLES[n],
                "chapters": entries,
            }
            for n, entries in sorted(by_part.items())
        ],
    }


def build_flashcards(chapters: list[Chapter]) -> list[dict]:
    cards: list[dict] = []
    for c in chapters:
        seen_terms: set[str] = set()
        k = 0
        for p in c.paragraphs:
            for m in BOLD_DEF_RE.finditer(p.text):
                term = m.group("term").strip()
                definition = m.group("def").strip()
                key = term.lower()
                if key in seen_terms:
                    continue
                seen_terms.add(key)
                k += 1
                cards.append({
                    "id": f"cph-{c.number}-def-{k}",
                    "chapter": c.number,
                    "part": c.part.number,
                    "difficulty": c.difficulty,
                    "front": f"Chapter {c.number} — {c.title}. What is **{term}**?",
                    "back": f"**{term}** {definition}",
                })
    return cards


IDENT_RE = re.compile(r"[A-Za-z_][A-Za-z_0-9]*")


def pick_blank_token(code: str) -> str | None:
    for m in IDENT_RE.finditer(code):
        tok = m.group(0)
        if len(tok) < 4:
            continue
        if tok in CPP_KEYWORDS:
            continue
        return tok
    return None


def build_code_exercises(chapters: list[Chapter]) -> list[dict]:
    exercises: list[dict] = []
    for c in chapters:
        for ce in c.code_examples:
            if ce.language != "cpp":
                continue
            token = pick_blank_token(ce.code)
            if token:
                blanked = ce.code.replace(token, "____", 1)
                extype = "fill-in-the-blank"
                prompt = (
                    f"In this snippet from Chapter {c.number} ({c.title}), "
                    f"one identifier has been replaced with `____`. Supply it."
                )
            else:
                blanked = ce.code
                extype = "review"
                token = ""
                prompt = (
                    f"Review this snippet from Chapter {c.number} ({c.title}) "
                    f"and explain what it demonstrates."
                )
            exercises.append({
                "id": f"cph-{c.number}-code-{ce.order}",
                "chapter": c.number,
                "language": ce.language,
                "type": extype,
                "difficulty": c.difficulty,
                "prompt": prompt,
                "code_with_blank": blanked,
                "answer_code": ce.code,
                "answer_token": token,
            })
    return exercises


# -----------------------------------------------------------------------------
# Serialization
# -----------------------------------------------------------------------------


def chapter_to_dict(c: Chapter) -> dict:
    return {
        "chapter": c.number,
        "title": c.title,
        "part": {"number": c.part.number, "roman": c.part.roman, "title": c.part.title},
        "anchor": c.anchor,
        "slug": c.slug,
        "summary": c.summary,
        "paragraphs": [asdict(p) for p in c.paragraphs],
        "code_examples": [asdict(ce) for ce in c.code_examples],
        "subsections": [asdict(s) for s in c.subsections],
        "figures": [asdict(f) for f in c.figures],
        "footnotes": [asdict(fn) for fn in c.footnotes],
        "cross_references": [asdict(r) for r in c.cross_references],
        "difficulty": c.difficulty,
        "prerequisites": c.prerequisites,
        "concept_tags": c.concept_tags,
    }


# -----------------------------------------------------------------------------
# Entry point
# -----------------------------------------------------------------------------


def sync_figures() -> tuple[int, int]:
    """Copy figures from content/.../figures/ to public/cp-handbook/figures/.

    Returns (copied, skipped) counts. Overwrites existing files only if content
    changed (by size). Keeps the destination in sync — removes stragglers that
    no longer exist at the source.
    """
    import shutil

    FIG_PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    src_names = {p.name for p in FIG_SRC_DIR.iterdir() if p.is_file()}
    dst_names = {p.name for p in FIG_PUBLIC_DIR.iterdir() if p.is_file()}

    copied = 0
    skipped = 0
    for name in src_names:
        src = FIG_SRC_DIR / name
        dst = FIG_PUBLIC_DIR / name
        if dst.exists() and dst.stat().st_size == src.stat().st_size:
            skipped += 1
            continue
        shutil.copy2(src, dst)
        copied += 1

    # Remove orphans.
    for name in dst_names - src_names:
        (FIG_PUBLIC_DIR / name).unlink()

    return copied, skipped


def main() -> int:
    if not SRC_MD.exists():
        print(f"ERROR: source not found: {SRC_MD}", file=sys.stderr)
        return 2

    lines = load_lines()
    parts = scan_parts(lines)
    if len(parts) != 3:
        print(f"ERROR: expected 3 Parts, got {len(parts)}", file=sys.stderr)
        return 2

    ranges = scan_chapter_ranges(lines, parts)
    chapters: list[Chapter] = []
    for start, end, num, part in ranges:
        title, anchor, paragraphs, codes, subs, figs, fns = parse_chapter_body(lines, start, end)
        xrefs = extract_cross_refs(paragraphs, own_chapter=num)
        tags = tag_concepts(title, paragraphs)
        diff = difficulty_for_part(part.number)
        summary = summarize(title, paragraphs)
        prereqs = sorted({r.to_chapter for r in xrefs})
        chapters.append(
            Chapter(
                number=num,
                title=title,
                part=part,
                anchor=anchor,
                slug=anchor,
                summary=summary,
                paragraphs=paragraphs,
                code_examples=codes,
                subsections=subs,
                figures=figs,
                footnotes=fns,
                cross_references=xrefs,
                difficulty=diff,
                prerequisites=prereqs,
                concept_tags=tags,
            )
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    items_json = [chapter_to_dict(c) for c in chapters]
    (OUT_DIR / "items.json").write_text(
        json.dumps(items_json, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    graph = build_prereq_graph(chapters)
    (OUT_DIR / "prerequisite_graph.json").write_text(
        json.dumps(graph, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    path = build_learning_path(chapters, graph)
    (OUT_DIR / "learning_path.json").write_text(
        json.dumps(path, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    flashcards = build_flashcards(chapters)
    (OUT_DIR / "flashcards.json").write_text(
        json.dumps(flashcards, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    exercises = build_code_exercises(chapters)
    (OUT_DIR / "code_exercises.json").write_text(
        json.dumps(exercises, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # -------------------- Sync figures to public/ --------------------
    fig_copied, fig_skipped = sync_figures()

    # -------------------- Validation --------------------
    errors: list[str] = []
    numbers = [c.number for c in chapters]
    if sorted(numbers) != list(range(1, 31)):
        missing = sorted(set(range(1, 31)) - set(numbers))
        extras = sorted(set(numbers) - set(range(1, 31)))
        errors.append(
            f"Expected chapters 1..30; got {len(numbers)} (missing={missing}, extras={extras})"
        )
    anchor_counts: dict[str, int] = {}
    for c in chapters:
        anchor_counts[c.anchor] = anchor_counts.get(c.anchor, 0) + 1
    for a, n in anchor_counts.items():
        if n != 1:
            errors.append(f"Anchor collision: {a!r} appears {n} times")
    existing = set(numbers)
    for c in chapters:
        for r in c.cross_references:
            if r.to_chapter not in existing:
                errors.append(f"Chapter {c.number} references missing Chapter {r.to_chapter}")

    total_code = sum(len(c.code_examples) for c in chapters)
    in_chapter_fences = 0
    for start, end, *_ in ranges:
        inside = False
        for j in range(start, end):
            m = CPP_OPEN_RE.match(lines[j])
            if m and not inside:
                in_chapter_fences += 1
                inside = True
            elif lines[j].strip() == CPP_CLOSE and inside:
                inside = False
    if total_code != in_chapter_fences:
        errors.append(
            f"Code example count mismatch: extracted {total_code} vs in-chapter fences {in_chapter_fences}"
        )

    total_figs = sum(len(c.figures) for c in chapters)
    in_chapter_figs = 0
    for start, end, *_ in ranges:
        for j in range(start, end):
            if FIGURE_RE.match(lines[j]):
                in_chapter_figs += 1
    if total_figs != in_chapter_figs:
        errors.append(
            f"Figure count mismatch: extracted {total_figs} vs in-chapter figures {in_chapter_figs}"
        )

    total_file_fences = sum(1 for ln in lines if CPP_OPEN_RE.match(ln))
    print("=== Extraction report ===")
    print(f"Chapters: {len(chapters)} (across {len(parts)} Parts)")
    print(f"Paragraphs total: {sum(len(c.paragraphs) for c in chapters)}")
    print(f"Code examples: {total_code} (in-chapter fences {in_chapter_fences}, whole-file {total_file_fences})")
    print(f"Figures: {total_figs}")
    print(f"Footnotes: {sum(len(c.footnotes) for c in chapters)}")
    print(f"Cross-references: {sum(len(c.cross_references) for c in chapters)}")
    print(f"Flashcards generated: {len(flashcards)}")
    print(f"Code exercises: {len(exercises)}")
    print(f"Study-together clusters: {len(graph['study_together_clusters'])}")
    print(f"Figures synced: {fig_copied} copied, {fig_skipped} up-to-date -> {FIG_PUBLIC_DIR}")

    if errors:
        print("\n=== VALIDATION ERRORS ===")
        for e in errors:
            print(f"- {e}")
        return 1

    print("\nAll validation checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
