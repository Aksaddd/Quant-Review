#!/usr/bin/env python3
"""Extract curriculum metadata from Effective C++ (3rd ed.) markdown.

Reads the normalized markdown in content/Effective_C++/ and emits curriculum
JSON under content/Effective_C++/metadata/:

    items.json              - one record per Item (55 total)
    prerequisite_graph.json - directed graph of Item -> Items it cites
    learning_path.json      - topo-sort grouped by chapter
    flashcards.json         - one card per Things-to-Remember bullet
    code_exercises.json     - one fill-in-the-blank per code example

Usage: python3 scripts/extract_effective_cpp.py
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_MD = (
    ROOT
    / "content"
    / "Effective_C++"
    / "Scott Meyers - Effective C++ Third Edition 55 Specific Ways to Improve Your Programs and Designs (2005, Addison-Wesley Professional) - libgen.li.md"
)
OUT_DIR = ROOT / "content" / "Effective_C++" / "metadata"

CHAPTER_RE = re.compile(r"^# Chapter (\d+)\. (.+)$")
ITEM_RE = re.compile(r"^## Item (\d+): (.+)$")
APPENDIX_RE = re.compile(r"^# Appendix [AB]\.")
H3_RE = re.compile(r"^### (.+)$")
ANCHOR_RE = re.compile(r'^<a id="([^"]+)"></a>$')
CPP_OPEN = "```cpp"
CPP_CLOSE = "```"
FIGURE_OMITTED = "*[Figure omitted]*"
BULLET_RE = re.compile(r"^\s*\*\s+(.*)$")
XREF_RE = re.compile(r"\[Item\s+(\d+)\]\(<#([^>]+)>\)")

CPP_KEYWORDS = {
    "alignas", "alignof", "and", "and_eq", "asm", "auto", "bitand", "bitor",
    "bool", "break", "case", "catch", "char", "char16_t", "char32_t", "class",
    "compl", "const", "constexpr", "const_cast", "continue", "decltype",
    "default", "delete", "do", "double", "dynamic_cast", "else", "enum",
    "explicit", "export", "extern", "false", "float", "for", "friend",
    "goto", "if", "inline", "int", "long", "mutable", "namespace", "new",
    "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq",
    "private", "protected", "public", "register", "reinterpret_cast",
    "return", "short", "signed", "sizeof", "static", "static_assert",
    "static_cast", "struct", "switch", "template", "this", "thread_local",
    "throw", "true", "try", "typedef", "typeid", "typename", "union",
    "unsigned", "using", "virtual", "void", "volatile", "wchar_t", "while",
    "xor", "xor_eq", "std", "cout", "cin", "endl", "string", "size_t",
    "ptrdiff_t", "true", "false", "nullptr",
}

CONCEPT_VOCAB = [
    ("const", ["const", "constness"]),
    ("references", ["reference", "references"]),
    ("pointers", ["pointer", "pointers"]),
    ("smart-pointers", ["smart pointer", "auto_ptr", "tr1::shared_ptr", "shared_ptr", "unique_ptr", "scoped_ptr"]),
    ("raii", ["raii", "resource management"]),
    ("inheritance", ["inheritance", "inherit"]),
    ("polymorphism", ["polymorphism", "polymorphic"]),
    ("templates", ["template"]),
    ("exception-safety", ["exception-safe", "exception safety", "strong guarantee"]),
    ("type-safety", ["type safety", "type-safe", "type system"]),
    ("casting", ["cast", "casting", "dynamic_cast", "static_cast"]),
    ("constructors", ["constructor"]),
    ("destructors", ["destructor"]),
    ("assignment-operators", ["assignment operator", "operator="]),
    ("overloading", ["overload", "overloading"]),
    ("inlining", ["inline", "inlining"]),
    ("encapsulation", ["encapsulat"]),
    ("interfaces", ["interface"]),
    ("resource-management", ["resource management", "resource-managing", "resources"]),
    ("memory-management", ["new", "delete", "memory", "allocator"]),
    ("virtual-functions", ["virtual function", "virtual"]),
    ("multiple-inheritance", ["multiple inheritance"]),
    ("private-inheritance", ["private inheritance"]),
    ("non-member-functions", ["non-member"]),
    ("operator-overloading", ["operator overloading"]),
    ("stl", ["stl"]),
    ("generic-programming", ["generic programming", "template programming"]),
    ("metaprogramming", ["metaprogramming", "tmp"]),
    ("traits", ["traits", "type_traits"]),
    ("initialization", ["initializ", "initializer"]),
    ("swap", ["swap"]),
    ("self-assignment", ["self-assignment", "self assignment"]),
    ("preprocessor", ["preprocessor", "#define", "macro"]),
    ("exceptions", ["exception", "throw"]),
    ("compile-time", ["compile-time", "compile time", "compilation"]),
    ("linking", ["linker", "linking", "link-time"]),
    ("copy-control", ["copy constructor", "copy assignment", "copying"]),
    ("slicing", ["slicing", "slice"]),
    ("rtti", ["rtti", "typeid"]),
    ("pimpl", ["pimpl", "pointer to implementation"]),
    ("include-guards", ["include guard", "#ifndef"]),
    ("namespaces", ["namespace"]),
    ("forward-declaration", ["forward declaration", "forward-declare"]),
    ("factory-pattern", ["factory"]),
    ("singleton", ["singleton"]),
    ("visitor-pattern", ["visitor"]),
    ("strategy-pattern", ["strategy pattern", "strategy"]),
    ("nvi-idiom", ["non-virtual interface", "nvi"]),
    ("crtp", ["curiously recurring", "crtp"]),
    ("sfinae", ["sfinae", "substitution failure"]),
    ("boost", ["boost"]),
    ("tr1", ["tr1"]),
    ("object-layout", ["object size", "object layout", "vtable", "vptr"]),
    ("resource-leaks", ["leak", "resource leak"]),
    ("concurrency", ["thread", "threading", "concurrent", "multithread"]),
]

# Items that should be bumped to "advanced" regardless of chapter mapping.
HARD_ITEMS = {48}

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
    title: str
    paragraph_range: list[int]  # [start_order, end_order]


@dataclass
class CrossRef:
    to_item: int
    anchor: str


@dataclass
class ChapterRef:
    number: int
    title: str


@dataclass
class Item:
    item: int
    title: str
    chapter: ChapterRef
    anchor: str
    summary: str
    paragraphs: list[Paragraph]
    code_examples: list[CodeExample]
    subsections: list[Subsection]
    things_to_remember: list[str]
    cross_references: list[CrossRef]
    has_missing_figure: bool
    difficulty: str
    prerequisites: list[int]
    concept_tags: list[str]


# -----------------------------------------------------------------------------
# Parsing
# -----------------------------------------------------------------------------

def load_lines() -> list[str]:
    return SRC_MD.read_text(encoding="utf-8").splitlines()


def scan_item_ranges(lines: list[str]) -> list[tuple[int, int, int, str, ChapterRef]]:
    """Return per-item (start_idx, end_idx_exclusive, item_number, item_title, chapter).

    start_idx points at the `## Item N: title` line; end_idx_exclusive is the
    index of the next Item / Chapter / Appendix heading (or len(lines)).
    """
    chapters: list[tuple[int, ChapterRef]] = []  # (line_idx, chapter)
    items: list[tuple[int, int, str]] = []  # (line_idx, item_num, title)
    appendix_starts: list[int] = []

    for idx, line in enumerate(lines):
        m = CHAPTER_RE.match(line)
        if m:
            chapters.append((idx, ChapterRef(int(m.group(1)), m.group(2).strip())))
            continue
        m = ITEM_RE.match(line)
        if m:
            items.append((idx, int(m.group(1)), m.group(2).strip()))
            continue
        if APPENDIX_RE.match(line):
            appendix_starts.append(idx)

    def chapter_for(line_idx: int) -> ChapterRef:
        last = chapters[0][1]
        for cidx, chap in chapters:
            if cidx <= line_idx:
                last = chap
            else:
                break
        return last

    ranges: list[tuple[int, int, int, str, ChapterRef]] = []
    stop_points = sorted(
        [c[0] for c in chapters] + [i[0] for i in items] + appendix_starts + [len(lines)]
    )
    for start, num, title in items:
        end = next(p for p in stop_points if p > start)
        ranges.append((start, end, num, title, chapter_for(start)))
    return ranges


def parse_body(
    lines: list[str], start: int, end: int
) -> tuple[str, list[Paragraph], list[CodeExample], list[Subsection], list[str], bool]:
    """Parse the body of a single Item. start points at `## Item ...`.

    Returns (anchor, paragraphs, code_examples, subsections, things_to_remember,
    has_missing_figure).
    """
    anchor = ""
    paragraphs: list[Paragraph] = []
    code_examples: list[CodeExample] = []
    subsections: list[Subsection] = []
    things_to_remember: list[str] = []
    has_missing_figure = False

    i = start + 1
    # Expect an anchor line immediately after the heading (possibly after blanks).
    while i < end and lines[i].strip() == "":
        i += 1
    if i < end:
        m = ANCHOR_RE.match(lines[i])
        if m:
            anchor = m.group(1)
            i += 1

    # State-machine over the item body.
    in_ttr = False  # inside Things to Remember
    current_bullet_lines: list[str] = []
    current_subsection: Subsection | None = None
    last_paragraph_order: int | None = None
    pending_explanations_for: list[CodeExample] = []  # code examples awaiting explanations
    paragraphs_since_last_code: list[int] = []  # para orders emitted since last code block

    def close_bullet() -> None:
        nonlocal current_bullet_lines
        if current_bullet_lines:
            text = " ".join(s.strip() for s in current_bullet_lines).strip()
            if text:
                things_to_remember.append(text)
            current_bullet_lines = []

    def close_subsection(end_order: int | None) -> None:
        nonlocal current_subsection
        if current_subsection is not None:
            start_order = current_subsection.paragraph_range[0]
            if end_order is None:
                end_order = start_order
            current_subsection.paragraph_range = [start_order, end_order]
            subsections.append(current_subsection)
            current_subsection = None

    def add_paragraph(text: str) -> int | None:
        nonlocal last_paragraph_order
        text = text.strip()
        if not text:
            return None
        order = len(paragraphs)
        paragraphs.append(Paragraph(order=order, text=text))
        last_paragraph_order = order
        # Wire explanatory paragraphs for any code blocks awaiting them.
        for ce in pending_explanations_for:
            if len(ce.explanatory_paragraphs) < 2:
                ce.explanatory_paragraphs.append(order)
        # Keep only the most recent code block awaiting explanations; drop if full.
        pending_explanations_for[:] = [
            ce for ce in pending_explanations_for if len(ce.explanatory_paragraphs) < 2
        ]
        paragraphs_since_last_code.append(order)
        return order

    # Buffer for prose paragraph accumulation.
    prose_buf: list[str] = []

    def flush_prose() -> None:
        if prose_buf:
            add_paragraph(" ".join(prose_buf))
            prose_buf.clear()

    while i < end:
        line = lines[i]

        # Subsection heading.
        m_h3 = H3_RE.match(line)
        if m_h3:
            flush_prose()
            close_bullet()
            title = m_h3.group(1).strip()
            # End any open subsection at the last paragraph emitted.
            close_subsection(last_paragraph_order)
            if title == "Things to Remember":
                in_ttr = True
                # Advance past optional anchor and blank lines.
                i += 1
                while i < end and (lines[i].strip() == "" or ANCHOR_RE.match(lines[i])):
                    i += 1
                continue
            else:
                in_ttr = False
                current_subsection = Subsection(
                    title=title,
                    paragraph_range=[len(paragraphs), len(paragraphs)],
                )
                i += 1
                while i < end and (lines[i].strip() == "" or ANCHOR_RE.match(lines[i])):
                    i += 1
                continue

        # Anchor on its own line (beyond the item heading's anchor) - skip.
        if ANCHOR_RE.match(line):
            i += 1
            continue

        # Code block.
        if line.strip() == CPP_OPEN:
            flush_prose()
            close_bullet()
            i += 1
            code_lines: list[str] = []
            while i < end and lines[i].strip() != CPP_CLOSE:
                code_lines.append(lines[i])
                i += 1
            # Skip the closing fence.
            if i < end and lines[i].strip() == CPP_CLOSE:
                i += 1
            ce = CodeExample(
                order=len(code_examples),
                language="cpp",
                code="\n".join(code_lines),
                preceding_paragraph_order=last_paragraph_order,
                explanatory_paragraphs=[],
            )
            code_examples.append(ce)
            pending_explanations_for.append(ce)
            paragraphs_since_last_code.clear()
            continue

        # Blank line.
        if line.strip() == "":
            if in_ttr:
                # Blank lines don't end a bullet; TtR continues until next heading.
                i += 1
                continue
            flush_prose()
            i += 1
            continue

        # Figure omitted marker -> its own paragraph.
        if line.strip() == FIGURE_OMITTED:
            flush_prose()
            add_paragraph(FIGURE_OMITTED)
            has_missing_figure = True
            i += 1
            continue

        # Things to Remember bullet handling.
        if in_ttr:
            m_b = BULLET_RE.match(line)
            if m_b:
                close_bullet()
                current_bullet_lines = [m_b.group(1)]
            else:
                # Continuation line for the current bullet.
                current_bullet_lines.append(line.strip())
            i += 1
            continue

        # Regular prose or bulleted list inside prose.
        m_b = BULLET_RE.match(line)
        if m_b:
            # Treat each bullet as its own paragraph to preserve granularity.
            flush_prose()
            bullet_lines = [m_b.group(1)]
            i += 1
            while i < end:
                nxt = lines[i]
                if nxt.strip() == "":
                    break
                if H3_RE.match(nxt) or ITEM_RE.match(nxt) or CHAPTER_RE.match(nxt):
                    break
                if BULLET_RE.match(nxt):
                    break
                if ANCHOR_RE.match(nxt):
                    break
                if nxt.strip() == CPP_OPEN:
                    break
                bullet_lines.append(nxt.strip())
                i += 1
            add_paragraph("* " + " ".join(bullet_lines))
            continue

        # Accumulate prose.
        prose_buf.append(line.strip())
        i += 1

    # End-of-item flushes.
    flush_prose()
    close_bullet()
    close_subsection(last_paragraph_order)

    return anchor, paragraphs, code_examples, subsections, things_to_remember, has_missing_figure


def extract_cross_refs(paragraphs: list[Paragraph], things: list[str]) -> list[CrossRef]:
    seen: set[tuple[int, str]] = set()
    refs: list[CrossRef] = []
    blobs = [p.text for p in paragraphs] + list(things)
    for text in blobs:
        for m in XREF_RE.finditer(text):
            to_item = int(m.group(1))
            anchor = m.group(2)
            key = (to_item, anchor)
            if key in seen:
                continue
            seen.add(key)
            refs.append(CrossRef(to_item=to_item, anchor=anchor))
    return refs


def difficulty_for(chapter_num: int, item_num: int) -> str:
    if item_num in HARD_ITEMS:
        return "advanced"
    if chapter_num <= 2:
        return "beginner"
    if chapter_num <= 6:
        return "intermediate"
    return "advanced"


def tag_concepts(title: str, paragraphs: list[Paragraph]) -> list[str]:
    first_prose = next((p.text for p in paragraphs if not p.text.startswith("*")), "")
    text = (title + " " + first_prose).lower()
    tags: list[str] = []
    for tag, keywords in CONCEPT_VOCAB:
        for kw in keywords:
            if kw.lower() in text:
                tags.append(tag)
                break
    # Deduplicate preserving order.
    seen: set[str] = set()
    out: list[str] = []
    for t in tags:
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out


def summarize(title: str, things: list[str]) -> str:
    clean_title = title.rstrip(". ")
    if things:
        first = things[0].rstrip(". ")
        return f"Learn to {clean_title[0].lower() + clean_title[1:]}: {first}."
    return f"Learn to {clean_title[0].lower() + clean_title[1:]}."


# -----------------------------------------------------------------------------
# Derived metadata
# -----------------------------------------------------------------------------

def build_prereq_graph(items: list[Item]) -> dict:
    edges = {it.item: sorted({r.to_item for r in it.cross_references if r.to_item != it.item}) for it in items}

    # Tarjan's SCC to find cycles.
    index_counter = [0]
    stack: list[int] = []
    lowlinks: dict[int, int] = {}
    index: dict[int, int] = {}
    on_stack: dict[int, bool] = {}
    sccs: list[list[int]] = []

    def strongconnect(v: int) -> None:
        index[v] = index_counter[0]
        lowlinks[v] = index_counter[0]
        index_counter[0] += 1
        stack.append(v)
        on_stack[v] = True
        for w in edges.get(v, []):
            if w not in index:
                strongconnect(w)
                lowlinks[v] = min(lowlinks[v], lowlinks[w])
            elif on_stack.get(w):
                lowlinks[v] = min(lowlinks[v], index[w])
        if lowlinks[v] == index[v]:
            scc: list[int] = []
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
            strongconnect(v)

    clusters = [scc for scc in sccs if len(scc) > 1]
    return {
        "edges": [{"from": k, "to": v} for k, vs in edges.items() for v in vs],
        "adjacency": edges,
        "study_together_clusters": clusters,
    }


def topo_sort(items: list[Item], graph: dict) -> list[int]:
    """Topological-ish sort with cycle collapse via SCCs. Falls back to item number order."""
    # Build SCC order using the existing clusters.
    edges = graph["adjacency"]
    visited: set[int] = set()
    order: list[int] = []

    def visit(n: int, stack: set[int]) -> None:
        if n in visited or n in stack:
            return
        stack.add(n)
        for m in edges.get(n, []):
            visit(m, stack)
        stack.discard(n)
        visited.add(n)
        order.append(n)

    for it in sorted(items, key=lambda x: x.item):
        visit(it.item, set())
    return order


def build_learning_path(items: list[Item], graph: dict) -> dict:
    order = topo_sort(items, graph)
    item_by_num = {it.item: it for it in items}
    by_chapter: dict[int, list[dict]] = {}
    for num in order:
        it = item_by_num[num]
        by_chapter.setdefault(it.chapter.number, []).append(
            {"item": it.item, "title": it.title, "difficulty": it.difficulty}
        )
    return {
        "topo_order": order,
        "by_chapter": [
            {
                "chapter": ch,
                "title": item_by_num[entries[0]["item"]].chapter.title,
                "items": entries,
            }
            for ch, entries in sorted(by_chapter.items())
        ],
    }


def build_flashcards(items: list[Item]) -> list[dict]:
    cards: list[dict] = []
    for it in items:
        for k, bullet in enumerate(it.things_to_remember):
            front = (
                f"Item {it.item} — {it.title.rstrip('.')}. "
                f"{it.summary} What is rule #{k + 1} to remember?"
            )
            cards.append(
                {
                    "id": f"item-{it.item}-ttr-{k}",
                    "item": it.item,
                    "chapter": it.chapter.number,
                    "difficulty": it.difficulty,
                    "front": front,
                    "back": bullet,
                }
            )
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


def build_code_exercises(items: list[Item]) -> list[dict]:
    exercises: list[dict] = []
    for it in items:
        for ce in it.code_examples:
            token = pick_blank_token(ce.code)
            if token:
                blanked = ce.code.replace(token, "____", 1)
                extype = "fill-in-the-blank"
                prompt = (
                    f"In this snippet from Item {it.item} ({it.title.rstrip('.')}), "
                    f"one identifier has been replaced with `____`. Supply the missing token."
                )
            else:
                blanked = ce.code
                extype = "review"
                token = ""
                prompt = (
                    f"Review the snippet from Item {it.item} ({it.title.rstrip('.')}) "
                    f"and explain, in one sentence, what it demonstrates."
                )
            exercises.append(
                {
                    "id": f"item-{it.item}-code-{ce.order}",
                    "item": it.item,
                    "language": ce.language,
                    "type": extype,
                    "difficulty": it.difficulty,
                    "prompt": prompt,
                    "code_with_blank": blanked,
                    "answer_code": ce.code,
                    "answer_token": token,
                }
            )
    return exercises


# -----------------------------------------------------------------------------
# Entry point
# -----------------------------------------------------------------------------

def item_to_dict(it: Item) -> dict:
    return {
        "item": it.item,
        "title": it.title,
        "chapter": {"number": it.chapter.number, "title": it.chapter.title},
        "anchor": it.anchor,
        "summary": it.summary,
        "paragraphs": [asdict(p) for p in it.paragraphs],
        "code_examples": [asdict(c) for c in it.code_examples],
        "subsections": [asdict(s) for s in it.subsections],
        "things_to_remember": it.things_to_remember,
        "cross_references": [asdict(r) for r in it.cross_references],
        "has_missing_figure": it.has_missing_figure,
        "difficulty": it.difficulty,
        "prerequisites": it.prerequisites,
        "concept_tags": it.concept_tags,
    }


def main() -> int:
    if not SRC_MD.exists():
        print(f"ERROR: source not found: {SRC_MD}", file=sys.stderr)
        return 2

    lines = load_lines()
    ranges = scan_item_ranges(lines)
    items: list[Item] = []

    for start, end, num, title, chapter in ranges:
        anchor, paragraphs, code_examples, subsections, ttr, missing = parse_body(lines, start, end)
        cross_refs = extract_cross_refs(paragraphs, ttr)
        summary = summarize(title, ttr)
        concept_tags = tag_concepts(title, paragraphs)
        difficulty = difficulty_for(chapter.number, num)
        prereqs = sorted({r.to_item for r in cross_refs if r.to_item != num})
        items.append(
            Item(
                item=num,
                title=title,
                chapter=chapter,
                anchor=anchor,
                summary=summary,
                paragraphs=paragraphs,
                code_examples=code_examples,
                subsections=subsections,
                things_to_remember=ttr,
                cross_references=cross_refs,
                has_missing_figure=missing,
                difficulty=difficulty,
                prerequisites=prereqs,
                concept_tags=concept_tags,
            )
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    items_json = [item_to_dict(it) for it in items]
    (OUT_DIR / "items.json").write_text(
        json.dumps(items_json, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    graph = build_prereq_graph(items)
    (OUT_DIR / "prerequisite_graph.json").write_text(
        json.dumps(graph, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    path = build_learning_path(items, graph)
    (OUT_DIR / "learning_path.json").write_text(
        json.dumps(path, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    flashcards = build_flashcards(items)
    (OUT_DIR / "flashcards.json").write_text(
        json.dumps(flashcards, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    exercises = build_code_exercises(items)
    (OUT_DIR / "code_exercises.json").write_text(
        json.dumps(exercises, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # -------------------- Validation --------------------
    errors: list[str] = []
    numbers = [it.item for it in items]
    if sorted(numbers) != list(range(1, 56)):
        errors.append(
            f"Expected items 1..55; got {len(numbers)} items, missing {sorted(set(range(1,56)) - set(numbers))}, extras {sorted(set(numbers) - set(range(1,56)))}"
        )
    for it in items:
        if not it.things_to_remember:
            errors.append(f"Item {it.item} has no Things to Remember bullets")
    existing = set(numbers)
    for it in items:
        for r in it.cross_references:
            if r.to_item not in existing:
                errors.append(
                    f"Item {it.item} references missing Item {r.to_item}"
                )
    total_code = sum(len(it.code_examples) for it in items)
    # Count opening fences within item ranges (excludes intro, appendix, index).
    in_item_fences = 0
    for start, end, *_ in ranges:
        for j in range(start, end):
            if lines[j].strip() == CPP_OPEN:
                in_item_fences += 1
    if total_code != in_item_fences:
        errors.append(
            f"Code example count mismatch: extracted {total_code} vs in-item fences {in_item_fences}"
        )
    anchor_counts: dict[str, int] = {}
    for it in items:
        anchor_counts[it.anchor] = anchor_counts.get(it.anchor, 0) + 1
    for a, c in anchor_counts.items():
        if c != 1:
            errors.append(f"Anchor collision or missing: {a!r} count={c}")

    total_file_fences = sum(1 for ln in lines if ln.strip() == CPP_OPEN)
    print("=== Extraction report ===")
    print(f"Items: {len(items)}")
    print(f"Code examples: {total_code} (in-item fences {in_item_fences}, whole-file fences {total_file_fences})")
    print(f"Things-to-Remember bullets total: {sum(len(it.things_to_remember) for it in items)}")
    print(f"Cross-references total: {sum(len(it.cross_references) for it in items)}")
    print(f"Items with missing figure: {sum(1 for it in items if it.has_missing_figure)}")
    print(f"Study-together clusters: {len(graph['study_together_clusters'])}")
    if errors:
        print("\n=== VALIDATION ERRORS ===")
        for e in errors:
            print(f"- {e}")
        return 1
    print("\nAll validation checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
