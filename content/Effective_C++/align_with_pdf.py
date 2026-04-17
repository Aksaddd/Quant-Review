"""Recover paragraph structure in the Effective C++ markdown by aligning
it against the PDF's real paragraph breaks.

The CHM->markdown conversion produced one giant paragraph per Item.
The printed PDF has proper paragraph boundaries. This script:

  1. Extracts per-Item prose from the PDF plain text, strips running
     headers/footers, de-hyphenates word-wrapped lines, and preserves
     paragraph breaks.
  2. For each PDF paragraph in an Item, finds the best-matching position
     in the markdown's prose and inserts a paragraph break there.
  3. Promotes "Things to Remember" and the well-known in-Item subsection
     headings to real markdown headings.
  4. Adds `*[Figure omitted]*` placeholders where images were stripped.

Run after clean_chm_md.py. Idempotent.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import fitz  # type: ignore[import-not-found]

ROOT = Path(__file__).parent
PDF = ROOT / "Effective C++ 3rd ed.pdf"
MD = ROOT / (
    "Scott Meyers - Effective C++ Third Edition 55 Specific Ways to Improve "
    "Your Programs and Designs (2005, Addison-Wesley Professional) - libgen.li.md"
)


# ---------------------------------------------------------------------------
# PDF extraction
# ---------------------------------------------------------------------------

HEADER_FOOTER_RE = re.compile(
    r"^(?:\s*\d{1,3}\s*"            # page number alone
    r"|\s*Item \d+\s*"              # running header: Item N
    r"|\s*Chapter \d+\s*"           # running header: Chapter N
    r"|\s*[A-Z][A-Za-z ,=:]+?\s{2,}Item \d+\s*"  # section + Item NN running header
    r"|\s*Item \d+\s{2,}[A-Z][A-Za-z ,=:]+?\s*"  # Item NN + section
    r"|Accustoming Yourself to C\+\+\s*"
    r"|Constructors, Destructors, operator=\s*"
    r"|Inheritance and Object-Oriented Design\s*"
    r"|Templates and Generic Programming\s*"
    r"|Customizing new and delete\s*"
    r"|Resource Management\s*"
    r"|Designs and Declarations\s*"
    r"|Implementations\s*"
    r"|Miscellany\s*"
    r"|Effective C\+\+\s*"
    r")$",
    re.IGNORECASE,
)

# PDF sometimes joins the running header with text; specific patterns:
SECTION_HEADERS = [
    "Accustoming Yourself to C++",
    "Constructors, Destructors, operator=",
    "Inheritance and Object-Oriented Design",
    "Templates and Generic Programming",
    "Customizing new and delete",
    "Resource Management",
    "Designs and Declarations",
    "Implementations",
    "Miscellany",
]


def _is_running_header(line: str) -> bool:
    s = line.strip()
    if not s:
        return False
    # Bare page number
    if re.fullmatch(r"\d{1,4}", s):
        return True
    # "Item N" alone
    if re.fullmatch(r"Item \d+", s):
        return True
    # "Chapter N" alone
    if re.fullmatch(r"Chapter \d+", s):
        return True
    # One of the known running section names
    if s in SECTION_HEADERS:
        return True
    # "Effective C++" running header
    if s == "Effective C++":
        return True
    return False


def _dehyphenate(paragraph_lines: list[str]) -> str:
    """Join word-wrapped lines inside a paragraph.

    pdftotext (without -layout) breaks at the PDF's visual line wrap. Within
    a paragraph, each wrapped line becomes a newline in the output. Rejoin
    them with a single space, stitching together words split by hyphen.
    """
    text = ""
    for i, line in enumerate(paragraph_lines):
        line = line.rstrip()
        if not text:
            text = line
            continue
        # If previous text ended with a hyphen, only join if the hyphen is
        # at a word boundary and the next word isn't capitalized (which
        # would suggest a real hyphenated word like "object-oriented"
        # spanning a line).
        if text.endswith("-") and not text.endswith(" -"):
            # Peek at the word before the hyphen and the word after.
            prev_word = re.search(r"(\S+)-$", text)
            next_word = re.match(r"(\S+)", line)
            if prev_word and next_word:
                # If the joined word appears in its de-hyphenated form
                # elsewhere (common English/C++ words), prefer that. A
                # cheap heuristic: strip the hyphen if next_word starts
                # with a lowercase letter.
                if next_word.group(1)[:1].islower():
                    text = text[:-1] + line
                    continue
        text = text + " " + line
    return text


def extract_pdf_items() -> dict[int, list[str]]:
    """Return {item_number: [paragraph, paragraph, ...]} for Items 1-55.

    Uses PyMuPDF to get real paragraph-level block segmentation (the
    plain pdftotext output collapses the inter-paragraph spacing for
    this particular book, so blank-line-based splitting fails).
    """
    doc = fitz.open(str(PDF))
    # Collect all text blocks across the whole document, annotated with
    # their page number. Each block is a semantic paragraph per fitz.
    all_blocks: list[tuple[int, str]] = []
    for pnum in range(len(doc)):
        page = doc[pnum]
        for b in page.get_text("blocks"):
            _, _, _, _, txt, _, btype = b
            if btype != 0:
                continue  # skip image blocks
            txt = txt.strip()
            if not txt:
                continue
            all_blocks.append((pnum, txt))

    # Build a flat list of cleaned paragraph strings together with their
    # page number, for compatibility with the rest of the script.
    # Running headers/footers appear as short blocks; strip them.
    cleaned: list[tuple[int, str]] = []
    for pnum, txt in all_blocks:
        # Blocks like "12\nItem 1\nChapter 1" are the running header.
        # They start with just a page number.
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        if not lines:
            continue
        # If every line of the block is a short running-header
        # fragment, drop the block.
        if all(
            _is_header_fragment(l) for l in lines
        ):
            continue
        # Otherwise join the block's lines into one paragraph. fitz puts
        # line-wrapped text of a single paragraph inside one block.
        joined = _join_block_lines(lines)
        cleaned.append((pnum, joined))

    return _group_by_item(cleaned)


def _is_header_fragment(line: str) -> bool:
    line = line.strip()
    if not line:
        return True
    if re.fullmatch(r"\d{1,4}", line):
        return True
    if re.fullmatch(r"Item \d+", line):
        return True
    if re.fullmatch(r"Chapter \d+", line):
        return True
    # Known rotating section names
    if line in (
        "Accustoming Yourself to C++",
        "Constructors, Destructors, operator=",
        "Inheritance and Object-Oriented Design",
        "Templates and Generic Programming",
        "Customizing new and delete",
        "Resource Management",
        "Designs and Declarations",
        "Implementations",
        "Miscellany",
        "Effective C++",
    ):
        return True
    # Chapter opener: "Chapter N: <title>"
    if re.match(r"^Chapter \d+:", line):
        return True
    return False


def _join_block_lines(lines: list[str]) -> str:
    """Join word-wrapped lines of a PyMuPDF text block into a paragraph.

    Stitches together hyphenated word breaks across the wrap points.
    """
    text = ""
    for line in lines:
        if not text:
            text = line
            continue
        if text.endswith("-") and not text.endswith(" -"):
            # Join across a soft hyphen if next starts lowercase.
            nxt = re.match(r"(\S+)", line)
            if nxt and nxt.group(1)[:1].islower():
                text = text[:-1] + line
                continue
        text = text + " " + line
    return text


def _group_by_item(blocks: list[tuple[int, str]]) -> dict[int, list[str]]:
    """Given a flat list of (page, paragraph) blocks, group them by Item.

    Blocks starting with `Item N: <title>` signal the start of a new
    Item. Everything until the next Item heading or the start of the
    appendices belongs to that Item.

    TOC entries are skipped by requiring the block to be on a page
    beyond the front matter (> page 25), and by rejecting blocks that
    end with a page-number digit sequence.
    """
    item_re = re.compile(r"^Item (\d+):\s*(.*)", re.DOTALL)
    chapter_re = re.compile(r"^Chapter \d+:")
    toc_tail_re = re.compile(r"\b\d{1,3}\s*$")

    items: dict[int, list[str]] = {}
    current_num: int | None = None
    current: list[str] = []
    in_appendix = False
    seen_first_item = False
    FRONT_MATTER_PAGES = 25

    for pnum, para in blocks:
        if in_appendix:
            continue
        if (para.startswith("Appendix A:") or para.startswith("Appendix B:")) \
                and pnum >= FRONT_MATTER_PAGES and seen_first_item:
            in_appendix = True
            if current_num is not None and current_num not in items:
                items[current_num] = current
            break
        m = item_re.match(para)
        if m and pnum >= FRONT_MATTER_PAGES:
            # If the block is just "Item N: <title>" ending in a page
            # number (TOC entry format), skip it. A body Item heading
            # is just a title with no trailing page number.
            rest = m.group(2).strip()
            # TOC-style: block is 1-2 lines ending with a digit-only run.
            # Body heading is a long multi-line block OR a short block
            # whose content is just the title.
            if toc_tail_re.search(rest) and len(rest) < 120:
                continue
            # Flush the previous Item.
            if current_num is not None and current_num not in items:
                items[current_num] = current
            num = int(m.group(1))
            current_num = num
            current = []
            seen_first_item = True
            continue
        if chapter_re.match(para):
            continue
        if current_num is not None:
            current.append(para)

    if current_num is not None and current_num not in items:
        items[current_num] = current

    # Post-process: merge paragraphs within each Item that were split
    # across a page boundary mid-sentence. Heuristic: if para N ends
    # without terminal punctuation (.!?:) and para N+1 starts with a
    # lowercase letter, they're really one paragraph.
    TERMINAL = set(".!?:")
    for num in items:
        merged: list[str] = []
        for para in items[num]:
            if merged:
                prev = merged[-1]
                first = para.lstrip()[:1]
                last = prev.rstrip()[-1:] if prev.rstrip() else ""
                if last and last not in TERMINAL and first and first.islower():
                    merged[-1] = prev.rstrip() + " " + para.lstrip()
                    continue
            merged.append(para)
        items[num] = merged

    return items


# The legacy pdftotext-based helpers are kept for reference but are no
# longer called by the main pipeline.

    # Find the start of every Item. We need to distinguish real body
    # Items from TOC entries. Heuristic: a body Item has a long prose
    # paragraph (more than 80 chars on a single non-empty line) within
    # the next ~15 lines. TOC entries are short and followed by more
    # short entries.
    item_starts: dict[int, int] = {}
    for i, line in enumerate(all_lines):
        m = re.match(r"^Item (\d+):\s*(.*)$", line.strip())
        if not m:
            continue
        num = int(m.group(1))
        # Look ahead ~30 lines for a paragraph-length line (>= 60 chars).
        # Running headers like "Item 7", "Chapter 2" or the Item's own
        # title lines are skipped. A DIFFERENT "Item M: <title>" (M != N
        # and the next entry) aborts the scan - that means we're looking
        # at a TOC, not a body Item.
        has_body = False
        for j in range(i + 1, min(i + 30, len(all_lines))):
            nxt = all_lines[j].strip()
            m2 = re.match(r"^Item (\d+):", nxt)
            if m2 and int(m2.group(1)) != num:
                break
            if len(nxt) >= 60:
                has_body = True
                break
        if not has_body:
            continue
        if num not in item_starts:
            item_starts[num] = i

    # Find the terminator for the last Item (Appendix A onwards).
    appendix_start = len(all_lines)
    for i, line in enumerate(all_lines):
        if re.match(r"^Appendix [AB]:", line.strip()) or \
           line.strip() in ("Beyond Effective C++", "Item Mappings"):
            # Only consider occurrences after the first Item start.
            if item_starts and i > min(item_starts.values()):
                appendix_start = i
                break

    # For each Item, slice from its start to the next item's start.
    ordered = sorted(item_starts.items())
    items: dict[int, list[str]] = {}
    for idx, (num, start) in enumerate(ordered):
        end = ordered[idx + 1][1] if idx + 1 < len(ordered) else appendix_start
        body = all_lines[start:end]
        items[num] = _extract_paragraphs(body)

    return items


def _extract_paragraphs(lines: list[str]) -> list[str]:
    """Turn a slice of raw PDF lines into a list of paragraph strings.

    Skips running headers/footers. Drops the leading `Item N:` + title
    lines. Preserves paragraph boundaries (blank lines) while joining
    wrapped lines inside a paragraph.
    """
    # Drop the leading Item heading + title. The title ends with a period.
    i = 0
    while i < len(lines) and not re.match(r"^Item \d+:", lines[i].strip()):
        i += 1
    heading_line = lines[i].strip() if i < len(lines) else ""
    m = re.match(r"^Item \d+:\s*(.*)$", heading_line)
    inline_rest = (m.group(1) or "").strip() if m else ""
    # Skip the Item N: heading line itself.
    i += 1
    if inline_rest:
        # Title was on the same line as "Item N:". Keep skipping lines
        # until we find the line ending with "." - that's the title end.
        if not inline_rest.endswith("."):
            while i < len(lines) and lines[i].strip():
                if lines[i].rstrip().endswith("."):
                    i += 1
                    break
                i += 1
    else:
        # Title is on subsequent lines.
        while i < len(lines) and not lines[i].strip():
            i += 1
        while i < len(lines) and lines[i].strip():
            is_last = lines[i].rstrip().endswith(".")
            i += 1
            if is_last:
                break

    # First pass: strip running headers/footers. A page break creates
    # "<blank>, <page num>, <header>, <header>, <blank>" in the raw text
    # which would otherwise split a paragraph. Removing them closes the
    # gap so the subsequent blank-line split doesn't fire spuriously.
    body = [l for l in lines[i:] if not _is_running_header(l)]

    # Collapse runs of blank lines into a single blank (page breaks left
    # multiple blanks behind).
    collapsed: list[str] = []
    prev_blank = False
    for line in body:
        is_blank = not line.strip()
        if is_blank and prev_blank:
            continue
        collapsed.append(line)
        prev_blank = is_blank
    body = collapsed

    paragraphs: list[list[str]] = []
    current: list[str] = []
    for line in body:
        if not line.strip():
            if current:
                paragraphs.append(current)
                current = []
            continue
        current.append(line)
    if current:
        paragraphs.append(current)

    # Re-join paragraphs that were split by a page break mid-sentence.
    # Heuristic: if paragraph N ends without terminal punctuation (. ! ?
    # : etc.) and paragraph N+1 starts with lowercase, merge them.
    TERMINAL = set(".!?:")
    merged: list[list[str]] = []
    for para in paragraphs:
        if merged:
            last_text = _dehyphenate(merged[-1])
            first_char = para[0].strip()[:1] if para else ""
            last_char = last_text[-1:] if last_text else ""
            if last_char and last_char not in TERMINAL and \
                    first_char and first_char.islower():
                merged[-1].extend(para)
                continue
        merged.append(para)
    paragraphs = merged

    # If the FIRST paragraph looks like a title (short, ends with `.`,
    # no commas/semicolons), drop it. This catches the "title after
    # running-header" layout of Item 7 and a few others.
    if paragraphs:
        p0 = _dehyphenate(paragraphs[0])
        if len(p0) < 100 and p0.endswith(".") and \
                p0.count(",") <= 1 and p0.count(";") == 0:
            paragraphs.pop(0)

    return [_dehyphenate(p) for p in paragraphs if p]


# ---------------------------------------------------------------------------
# Markdown alignment
# ---------------------------------------------------------------------------

SMART_QUOTES_MAP = str.maketrans({
    "\u2018": "'", "\u2019": "'",  # single
    "\u201c": '"', "\u201d": '"',  # double
    "\u2013": "-", "\u2014": "-",  # dashes -> simple dash for matching
    "\u2026": "...",
    "\u00a0": " ",
})


def _normalize(text: str) -> str:
    """Normalize a string so PDF text and CHM markdown text can be matched."""
    text = text.translate(SMART_QUOTES_MAP)
    # Strip markdown link syntax: `[label](<anchor>)` -> `label`.
    text = re.sub(r"\[([^\]]+)\]\(<[^>]*>\)", r"\1", text)
    # Strip inline code ticks.
    text = text.replace("`", "")
    # Strip leading markdown list markers.
    text = re.sub(r"^\s*[*+-]\s+", "", text)
    # Collapse whitespace.
    text = re.sub(r"\s+", " ", text).strip()
    return text


def _first_n_words(text: str, n: int = 10) -> str:
    words = _normalize(text).split()
    return " ".join(words[:n])


def split_markdown_item(md_body: str, pdf_paragraphs: list[str]) -> str:
    """Insert paragraph breaks in `md_body` at positions that match each
    PDF paragraph's opening words. Code blocks and list items are
    passed through unchanged.
    """
    # Parse the markdown body into a list of segments:
    #   - fenced code blocks (preserved verbatim)
    #   - list-item runs (preserved verbatim)
    #   - prose paragraphs (candidates for splitting)
    segments: list[tuple[str, str]] = []
    lines = md_body.splitlines(keepends=True)
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        if line.lstrip().startswith("```"):
            # Fenced code block: copy through the closing fence.
            chunk = [line]
            i += 1
            while i < n:
                chunk.append(lines[i])
                if lines[i].lstrip().startswith("```"):
                    i += 1
                    break
                i += 1
            segments.append(("code", "".join(chunk)))
            continue
        # List item: line that starts with 2 or more spaces + "* "
        if re.match(r"^\s{2,}\*\s+", line) or re.match(r"^\s*\*\s+\S", line):
            chunk = [line]
            i += 1
            while i < n:
                nxt = lines[i]
                if nxt.strip() == "" or nxt.lstrip().startswith("```") or \
                        re.match(r"^#{1,6} ", nxt):
                    break
                chunk.append(nxt)
                i += 1
            segments.append(("list", "".join(chunk)))
            continue
        if re.match(r"^#{1,6} ", line):
            segments.append(("heading", line))
            i += 1
            continue
        if not line.strip():
            segments.append(("blank", line))
            i += 1
            continue
        # Prose line: gather until next non-prose segment boundary
        chunk = [line]
        i += 1
        while i < n:
            nxt = lines[i]
            if nxt.strip() == "" or nxt.lstrip().startswith("```") or \
                    re.match(r"^#{1,6} ", nxt) or \
                    re.match(r"^\s*\*\s+\S", nxt):
                break
            chunk.append(nxt)
            i += 1
        segments.append(("prose", "".join(chunk)))

    # For each prose segment, try to split it by matching PDF paragraph
    # opening words within it.
    rebuilt: list[str] = []
    pdf_queue = list(pdf_paragraphs)

    # Track the current position in the PDF queue so we don't match the
    # same paragraph twice and we progress forward.
    pdf_idx = 0

    for kind, content in segments:
        if kind != "prose":
            rebuilt.append(content)
            continue
        rebuilt.append(_split_prose(content, pdf_paragraphs, pdf_idx))

    # After the split, advance pdf_idx past the paragraphs we matched. (In
    # this simple version we just try all paragraphs each time; the split
    # function itself is idempotent.)
    return "".join(rebuilt)


def _split_prose(prose: str, pdf_paragraphs: list[str], start_idx: int) -> str:
    """Split a prose blob at positions matching PDF paragraph starts.

    Returns the prose with `\\n\\n` inserted at each detected break.

    Idempotency safeguard: if the prose is already shorter than a typical
    mega-paragraph and contains only ONE detected PDF paragraph start,
    leave it alone. That prevents a re-run from over-splitting already-
    paragraphed segments.
    """
    if len(pdf_paragraphs) < 2:
        return prose

    words_iter = list(re.finditer(r"\S+", prose))
    if not words_iter:
        return prose
    orig_words = [m.group(0) for m in words_iter]
    norm_words = [_normalize(w) for w in orig_words]

    # Gather candidate break positions from ALL PDF paragraphs. Require
    # a strict exact match on a 10-word opening to avoid spurious splits
    # when a PDF paragraph-starting phrase happens to appear mid-sentence
    # in a different context.
    candidates: list[int] = []
    for para in pdf_paragraphs:
        key = _first_n_words(para, 10).split()
        if len(key) < 6:
            continue
        idx = _find_sublist(norm_words, key, 0, fuzzy=0)
        if idx is None:
            continue
        candidates.append(idx)

    # If the prose only hits at most 1 PDF paragraph opener, it's already
    # a clean paragraph - do nothing. This keeps the script idempotent.
    if len(candidates) < 2:
        return prose

    # Otherwise, use candidates (excluding position 0) as break points.
    break_positions = sorted(set(p for p in candidates if p > 0))
    if not break_positions:
        return prose

    chars = list(prose)
    for pos in sorted(break_positions, reverse=True):
        offset = words_iter[pos].start()
        back = offset
        while back > 0 and chars[back - 1] in " \t":
            back -= 1
        chars[back:offset] = list("\n\n")
    return "".join(chars)


def _find_sublist(haystack: list[str], needle: list[str],
                   start: int, fuzzy: int = 0) -> int | None:
    """Find `needle` as a contiguous sublist of `haystack` starting at
    position >= `start`. Allow up to `fuzzy` word differences.
    """
    if not needle:
        return None
    nlen = len(needle)
    for i in range(start, len(haystack) - nlen + 1):
        diffs = 0
        for j in range(nlen):
            if haystack[i + j] != needle[j]:
                diffs += 1
                if diffs > fuzzy:
                    break
        else:
            if diffs <= fuzzy:
                return i
    return None


# ---------------------------------------------------------------------------
# "Things to Remember" + subsection heading promotion
# ---------------------------------------------------------------------------

def promote_things_to_remember(text: str) -> str:
    """Convert `... prose. Things to Remember\\n\\n  * bullet` to a
    proper `### Things to Remember` heading. Handles `.`, `!`, and `?`
    terminal punctuation as well as the case where "Things to Remember"
    appears on its own line.
    """
    # Case 1: end of a sentence, then "Things to Remember" on same line,
    # then a bullet list.
    text = re.sub(
        r"([.!?])\s*Things to Remember\s*\n\n(\s*\*\s+)",
        r"\1\n\n### Things to Remember\n\n\2",
        text,
    )
    # Case 2: "Things to Remember" on its own line before a bullet list.
    text = re.sub(
        r"(?<!^### )(?<!### )^Things to Remember\s*$\n(\s*\n)?(\s*\*\s+)",
        r"### Things to Remember\n\n\2",
        text,
        flags=re.MULTILINE,
    )
    return text



KNOWN_SUBSECTION_TITLES = [
    # Item 3
    "const Member Functions",
    "Avoiding Duplication in const and Non-const Member Functions",
    # Item 4
    "Member Initialization Lists",
    "The Order of Initialization of Non-local Static Objects",
    # Item 18
    "Using the Type System",
    # Item 25
    "A Default std::swap Implementation",
    "Member swaps",
    "Non-member swap and Specialization of std::swap",
    "A Summary of swap",
    # Item 29
    "The Exception-Safety Guarantees",
    "The Strong Guarantee via copy-and-swap",
    # Item 35
    "The Template Method Pattern via the Non-Virtual Interface Idiom",
    "The Strategy Pattern via Function Pointers",
    "The Strategy Pattern via tr1::function",
    "The \"Classic\" Strategy Pattern",
    # Item 40
    "Diamond inheritance",
    # Item 47
    "An IsTypeT Implementation",
    # Item 49
    "The Nothrow new",
    # Item 54
    "The Standard C++ Library",
    "TR1",
    # Item 55
    "Getting In to Boost",
    # Introduction
    "Terminology",
    "Naming Conventions",
    "Threading Considerations",
    "TR1 and Boost",
]


def promote_known_subsections(text: str) -> str:
    for title in KNOWN_SUBSECTION_TITLES:
        # Current form in markdown is `###### <title>` or inline text.
        text = re.sub(
            rf"^###### {re.escape(title)}\s*$",
            f"### {title}",
            text,
            flags=re.MULTILINE,
        )
    return text


# ---------------------------------------------------------------------------
# Figure placeholders
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Known text discrepancies vs PDF
# ---------------------------------------------------------------------------

CHM_PDF_TEXT_FIXES = [
    # Item 33 name-lookup discussion: the CHM source says "containing Base",
    # the printed PDF says "containing Derived". The PDF is the canonical
    # text; use it.
    (
        "first to the namespace(s) containing `Base`, if any,",
        "first to the namespace(s) containing `Derived`, if any,",
    ),
]


def apply_pdf_text_fixes(text: str) -> str:
    for old, new in CHM_PDF_TEXT_FIXES:
        text = text.replace(old, new)
    return text


def add_figure_placeholders(text: str) -> str:
    """Add `*[Figure omitted]*` markers where orphan image refs originally
    lived. Targets known figure-referencing sentence openings. Idempotent:
    only fires when the placeholder isn't already present.
    """
    patterns = [
        r"looks like this:",
        r"Graphically, it looks like this:",
        r"In UML, the design looks like this:",
        r"can visualize the scope situation this way:",
        r"Consider these pointers:",
    ]
    for pat in patterns:
        # Only insert the placeholder if the line after the match isn't
        # already a figure-omitted marker.
        text = re.sub(
            rf"({pat})\n\n(?!\*\[Figure omitted\]\*)",
            r"\1\n\n*[Figure omitted]*\n\n",
            text,
        )
    return text


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------

def main() -> None:
    if not PDF.exists():
        print(f"ERROR: PDF not found at {PDF}", file=sys.stderr)
        sys.exit(1)

    md_text = MD.read_text(encoding="utf-8")
    pdf_items = extract_pdf_items()
    print(f"Extracted {len(pdf_items)} items from PDF")
    for num in sorted(pdf_items)[:3]:
        print(f"  Item {num}: {len(pdf_items[num])} paragraphs")

    # Split md by Item headings.
    pattern = re.compile(r"^## Item (\d+):", re.MULTILINE)
    matches = list(pattern.finditer(md_text))
    if not matches:
        print("ERROR: no Item headings found in markdown", file=sys.stderr)
        sys.exit(1)

    out: list[str] = []
    cursor = 0
    for idx, m in enumerate(matches):
        # Emit the text before this Item (prior segment).
        out.append(md_text[cursor:m.start()])
        num = int(m.group(1))
        next_start = matches[idx + 1].start() if idx + 1 < len(matches) else len(md_text)
        item_body = md_text[m.start():next_start]

        pdf_paras = pdf_items.get(num, [])
        if pdf_paras:
            item_body = split_markdown_item(item_body, pdf_paras)

        out.append(item_body)
        cursor = next_start
    out.append(md_text[cursor:])

    new_text = "".join(out)
    new_text = promote_things_to_remember(new_text)
    new_text = promote_known_subsections(new_text)
    new_text = add_figure_placeholders(new_text)
    new_text = apply_pdf_text_fixes(new_text)

    # Collapse any 3+ blank lines to 2.
    new_text = re.sub(r"\n{3,}", "\n\n", new_text)

    MD.write_text(new_text, encoding="utf-8")
    print(f"Wrote {MD}")


if __name__ == "__main__":
    main()
