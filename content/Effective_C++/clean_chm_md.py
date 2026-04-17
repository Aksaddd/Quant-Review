"""Post-process the CHM->Markdown conversion of Effective C++ Third Edition.

Cleans up:
  - CHM navigation chrome (Previous/Next/Day Day Up tables)
  - Duplicate heading lines (##### duplicate of ##)
  - Heading typos (Item29 -> Item 29, Item31 -> Item 31, Item.55 -> Item 55)
  - 4-space indented code blocks -> fenced ```cpp blocks
  - .html cross-references rewritten to in-file # anchors
  - Unicode entity GIFs (U21D2.GIF) -> actual characters
  - Case-mangled words from stripped inline tags (tHRows -> throws, etc.)
  - TOC pixel.gif clutter -> clean bullet list
  - Orphan image refs (point at a non-existent _assets/ folder)
  - Stripped-tag artifacts: `<c>X<d>` -> `X`, `<i>X<d>` -> *X*, `<$nopage>`
  - Mangled index entry links (broken nested-link patterns)
  - Dead `index_X.html` "See" refs -> plain text
  - Cover/title metadata broken pipe-table -> clean prose
"""

from __future__ import annotations

import re
from pathlib import Path

SRC = Path(__file__).parent / (
    "Scott Meyers - Effective C++ Third Edition 55 Specific Ways to Improve "
    "Your Programs and Designs (2005, Addison-Wesley Professional) - libgen.li.md"
)


# --- 1. Unicode entity GIFs ----------------------------------------------------

UNICODE_ENT_RE = re.compile(
    r"!\[\][^\n]*?/ent/U([0-9A-Fa-f]{4,6})\.GIF\)"
)


def replace_unicode_ent_gifs(text: str) -> str:
    def sub(m: re.Match) -> str:
        return chr(int(m.group(1), 16))
    return UNICODE_ENT_RE.sub(sub, text)


# --- 2. Strip nav chrome -------------------------------------------------------

NAV_LINE_RE = re.compile(r"Day Day Up")
TABLE_SEP_RE = re.compile(r"^---(\|---)+\s*$")


def strip_nav_chrome(lines: list[str]) -> list[str]:
    out: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if NAV_LINE_RE.search(line):
            # Skip this nav line
            i += 1
            # Skip the table separator that follows (---|---|---)
            if i < len(lines) and TABLE_SEP_RE.match(lines[i]):
                i += 1
            # Trim a bare "---" or trailing whitespace-only lines that
            # often precede / follow the nav block.
            while out and out[-1].strip() in ("", "---"):
                out.pop()
            # Eat blank lines after the nav so we don't leave gaps.
            while i < len(lines) and lines[i].strip() == "":
                i += 1
            continue
        out.append(line)
        i += 1
    return out


# --- 3. Remove duplicate ##### Item headings that follow ## headings ----------

H2_ITEM_RE = re.compile(r"^## (Item ?\.?\d+[:.].*?)\s*$")
H5_ANY_RE = re.compile(r"^#####\s+(.*?)\s*$")


def strip_duplicate_subheadings(lines: list[str]) -> list[str]:
    """Drop a heading whose title duplicates the previous heading's title.

    The CHM export emits `# Chapter X` / `### Chapter X` and
    `## Item N` / `##### Item N` pairs - the second is always redundant.
    """
    HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
    out: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = HEADING_RE.match(line)
        if m:
            title = m.group(2)
            out.append(line)
            i += 1
            # Skip blank / anchor lines while looking for a duplicate heading.
            j = i
            while j < len(lines) and (
                lines[j].strip() == ""
                or lines[j].startswith("<a id=")
            ):
                j += 1
            if j < len(lines):
                m_next = HEADING_RE.match(lines[j])
                if m_next and _normalize(m_next.group(2)) == _normalize(title):
                    out.extend(lines[i:j])
                    i = j + 1
                    continue
            continue
        out.append(line)
        i += 1
    return out


def _normalize(s: str) -> str:
    return re.sub(r"[\s`._:]+", "", s).lower()


# --- 4. Fix Item heading typos -------------------------------------------------

def fix_item_headings(text: str) -> str:
    # "Item29:" / "Item.29:" -> "Item 29:" wherever they appear (headings,
    # TOC link text, references). The inner anchor slug is left as-is - the
    # rewriter has already used it as the anchor target.
    text = re.sub(r"\bItem\.?(\d+)([:.])", r"Item \1\2", text)
    return text


# --- 5. Fix case-mangled words from stripped inline tags ----------------------

CASE_FIXES = {
    "tHRows": "throws",
    "tHRow": "throw",
    "tHReads": "threads",
    "tHRead": "thread",
    "tHRough": "through",
    "devel-oper": "developer",
    "hard-ware": "hardware",
}


def fix_case_mangling(text: str) -> str:
    for bad, good in CASE_FIXES.items():
        text = text.replace(bad, good)
    return text


# --- 6. Convert 4-space indented code to ```cpp fenced blocks -----------------

LIST_ITEM_RE = re.compile(r"^\s*[*+-]\s+")
ORDERED_LIST_RE = re.compile(r"^\s*\d+\.\s+")


FENCE_RE = re.compile(r"^(\s*)```")


def fence_code_blocks(lines: list[str]) -> list[str]:
    out: list[str] = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        # Pass through any pre-existing fenced block untouched.
        m = FENCE_RE.match(line)
        if m:
            out.append(line)
            i += 1
            while i < n:
                out.append(lines[i])
                if FENCE_RE.match(lines[i]):
                    i += 1
                    break
                i += 1
            continue
        # CommonMark: an indented code block requires a blank line
        # immediately before it. Otherwise it's a paragraph continuation
        # (e.g. an index entry under a parent term that ends with `  \n`).
        prev_blank = not out or out[-1].strip() == ""
        # Detect start of a 4-space-indented code block.
        if prev_blank and line.startswith("    ") and line.strip() != "":
            # Determine base indent (4 or 8 = list-nested).
            stripped_so_far = line.rstrip()
            base_indent = len(line) - len(line.lstrip(" "))
            base_indent = max(4, (base_indent // 4) * 4)

            # Collect all consecutive lines that either start with
            # >= base_indent spaces or are blank/whitespace-only.
            block: list[str] = []
            j = i
            while j < n:
                cur = lines[j]
                cur_stripped = cur.strip()
                if cur_stripped == "":
                    block.append("")
                    j += 1
                    continue
                if cur.startswith(" " * base_indent):
                    block.append(cur[base_indent:].rstrip("\n"))
                    j += 1
                    continue
                # Stray two-space soft-break separator that often appears
                # in the source between code chunks.
                if cur.rstrip() == "":
                    block.append("")
                    j += 1
                    continue
                break

            # Trim leading/trailing blank lines from the block content.
            while block and block[0].strip() == "":
                block.pop(0)
            while block and block[-1].strip() == "":
                block.pop()

            if not block:
                # No real content - fall through and emit the line as-is.
                out.append(line)
                i += 1
                continue

            # Choose fence indent: 4 spaces if nested in a list, else none.
            fence_indent = "    " if base_indent >= 8 else ""
            out.append(f"{fence_indent}```cpp")
            for b in block:
                out.append(f"{fence_indent}{b}" if b else "")
            out.append(f"{fence_indent}```")
            i = j
            continue
        out.append(line)
        i += 1
    return out


# --- 7. Build anchor map and rewrite .html links ------------------------------

ANCHOR_RE = re.compile(r'<a id="([^"]+)"></a>')


def build_anchor_map(text: str) -> dict[str, str]:
    """Map filename (e.g. 'ch01lev1sec1.html') -> first anchor id for that file."""
    mapping: dict[str, str] = {}
    for m in ANCHOR_RE.finditer(text):
        anchor = m.group(1)
        # Anchor format: 0321334876<basename>html-<slug>
        am = re.match(r"0321334876(.+?)html-", anchor)
        if not am:
            continue
        base = am.group(1)
        # Re-attach .html
        filename = f"{base}.html"
        mapping.setdefault(filename, anchor)
    return mapping


LINK_HTML_RE = re.compile(r"<([A-Za-z0-9_\-]+\.html)(?:#[^>]*)?>")


def rewrite_html_links(text: str, anchors: dict[str, str]) -> str:
    def sub(m: re.Match) -> str:
        filename = m.group(1)
        anchor = anchors.get(filename)
        if anchor:
            return f"<#{anchor}>"
        # Unknown file - leave as-is.
        return m.group(0)
    return LINK_HTML_RE.sub(sub, text)


# --- 8. Clean up TOC pixel.gif clutter ----------------------------------------

TOC_LINE_RE = re.compile(
    r"^\s*\|?\s*(?:\|\s*)?!\[\]\([^)]*pixel\.gif\)\|\s*(.+?)\s*$"
)


def _collapse_link_whitespace(m: re.Match) -> str:
    inner = re.sub(r"\s+", " ", m.group(1)).strip()
    return f"[{inner}]"


def clean_toc(lines: list[str]) -> list[str]:
    """Convert the broken TOC table into a clean nested bullet list.

    Source rows look like one of:
      `   | ![](.../pixel.gif)| [Copyright](<copyrightpg.html>)  `
      `   |    | ![](.../pixel.gif)| [Item 1: ...](<...>)  `
    """
    out: list[str] = []
    in_toc = False
    for line in lines:
        if "pixel.gif" in line:
            in_toc = True
            stripped = line.lstrip()
            pre, sep, _rest = stripped.partition("![](")
            level = pre.count("|") if sep else 0
            content_match = re.search(
                r"pixel\.gif\)\s*\|\s*(.+?)\s*$", line
            )
            if content_match:
                # Strip any leading whitespace inside link text like
                # "[ Chapter 1.  ...]" -> "[Chapter 1. ...]".
                content = content_match.group(1).rstrip()
                content = re.sub(
                    r"\[\s+([^\]]+?)\s*\]",
                    _collapse_link_whitespace,
                    content,
                )
                indent = "  " * max(0, level - 1)
                out.append(f"{indent}- {content}")
                continue
        if in_toc and TABLE_SEP_RE.match(line):
            continue
        if in_toc and line.strip() == "":
            out.append(line)
            continue
        if in_toc and "pixel.gif" not in line:
            in_toc = False
        out.append(line)
    return out


# --- 8a. Strip orphan image refs ---------------------------------------------

ORPHAN_IMG_RE = re.compile(
    r"!\[[^\]]*\]\([^\n]*?_assets/[^\n]*?\.(?:jpg|jpeg|gif|png)\)",
    re.IGNORECASE,
)


def strip_orphan_images(text: str) -> str:
    """Remove image refs that point at the missing CHM `_assets/` folder.

    They render as broken images. Stripping them also keeps the
    fence-builder from absorbing them into surrounding code blocks.
    """
    return ORPHAN_IMG_RE.sub("", text)


# --- 8b. Strip stripped-tag artifacts ----------------------------------------

def fix_tag_artifacts(text: str) -> str:
    # `<$nopage>` was an indexer hint; it adds nothing in markdown.
    text = text.replace("<$nopage>", "")
    # `<c>X<d>` was `<code>X</code>` -> use backticks. Bound the body to one
    # line and to characters that wouldn't reasonably contain a `<` or `>`.
    text = re.sub(r"<c>([^<>\n]{1,80}?)<d>", r"`\1`", text)
    # `<i>X<d>` was `<i>X</i>` italic -> use *X*.
    text = re.sub(r"<i>([^<>\n]{1,80}?)<d>", r"*\1*", text)
    return text


# --- 8c. Repair mangled index entry links ------------------------------------

# Two-line pattern:
#     <indent>label[parent  \n
#         [ label]](<#anchor>)<trailing>
# becomes:
#     [label](<#anchor>)<trailing>
# The inner `[parent` text may include spaces (e.g. `[include directives`).
TWO_LINE_INDEX_RE = re.compile(
    r"^[ \t]*([^\[\n]+?)\[[^\[\]\n]+?[ \t]*\n"
    r"[ \t]+\[ ?\1 ?\]\]\((<[^>\n]+>)\)([^\n]*)$",
    re.MULTILINE,
)

# Same shape but the inner `[ <inner> ]` text is just whitespace - a CHM
# source artifact where the index sub-entry was literally empty. We use the
# *outer* label as the link text instead of the missing inner.
TWO_LINE_INDEX_EMPTY_INNER_RE = re.compile(
    r"^[ \t]*([^\[\n]+?)\[[^\[\]\n]+?[ \t]*\n"
    r"[ \t]+\[\s*\]\]\((<[^>\n]+>)\)([^\n]*)$",
    re.MULTILINE,
)

# CHM-extractor leftover where the link text was lost and replaced with the
# literal placeholder `aaa`. The label is the parent term on the line above.
#     <parent>  \n
#     [ aaa]](<#anchor>)<trailing>
# becomes:
#     [<parent>](<#anchor>)<trailing>
TWO_LINE_INDEX_AAA_RE = re.compile(
    r"^([^\[\n]+?)[ \t]*\n"
    r"[ \t]+\[ aaa\]\]\((<[^>\n]+>)\)([^\n]*)$",
    re.MULTILINE,
)

# Same `aaa]]` pattern but the parent line above is itself a link, e.g.
#     [ casting](<#anchorA>)[ 2nd](<#anchorB>)  \n
#         [ aaa]](<#anchorC>) [See also ...]
# We keep the parent line and re-use its label for the sub-entry.
TWO_LINE_INDEX_AAA_LINKED_PARENT_RE = re.compile(
    r"^(\[ ([^\]\n]+?)\]\(<[^>]+>\)[^\n]*)\n"
    r"([ \t]+)\[ aaa\]\]\((<[^>\n]+>)\)([^\n]*)$",
    re.MULTILINE,
)

# One-line pattern: `[ outer[inner]](<#anchor>)` -> `[outer](<#anchor>)`.
ONE_LINE_INDEX_RE = re.compile(
    r"\[\s*([^\[\]\n]+?)\[[^\[\]\n]+?\]\]\((<[^>\n]+>)\)"
)


def repair_index_links(text: str) -> str:
    # Drop the original leading indent. The parent term above ends with a
    # markdown soft-break (`  \n`) so we don't need extra spaces.
    text = TWO_LINE_INDEX_RE.sub(r"[\1](\2)\3", text)
    text = TWO_LINE_INDEX_EMPTY_INNER_RE.sub(r"[\1](\2)\3", text)
    text = TWO_LINE_INDEX_AAA_LINKED_PARENT_RE.sub(
        r"\1\n\3[\2](\4)\5", text
    )
    text = TWO_LINE_INDEX_AAA_RE.sub(r"[\1](\2)\3", text)
    text = ONE_LINE_INDEX_RE.sub(r"[\1](\2)", text)
    return text


# --- 8d. Convert dead `index_X.html` See refs to plain text ------------------

SEE_REF_RE = re.compile(
    r"\[See( also)?\s+\[([^\]\n]+?)\]\(<index_[A-Z]\.html[^>]*>\)\]"
)
BARE_INDEX_LINK_RE = re.compile(
    r"\[([^\]\n]+?)\]\(<index_[A-Z]+(?:-[A-Za-z]+)?\.html[^>]*>\)"
)


def neutralize_dead_index_refs(text: str) -> str:
    def see_sub(m: re.Match) -> str:
        also = m.group(1) or ""
        target = m.group(2).strip()
        return f"(see{also} {target})"

    text = SEE_REF_RE.sub(see_sub, text)
    # Any remaining bare links to `index_X.html` -> plain text.
    text = BARE_INDEX_LINK_RE.sub(r"\1", text)
    return text


# --- 8e. Clean up the broken cover/title metadata block ----------------------

# strip_orphan_images() runs before this, so any leading book-cover image
# has already been removed; the cover block now begins with `| | **<title>**`.
COVER_BLOCK_RE = re.compile(
    r"\| \| \*\*(?P<title>[^*\n]+)\*\*[ \t]*\n"
    r"---[ \t]*\n"
    r"By (?P<author>[^\n]+?)[ \t]*\n"
    r"\.+[ \t]*\n"
    r"Publisher: \*\*(?P<publisher>[^*\n]+)\*\*[ \t]*\n"
    r"Pub Date: \*\*(?P<date>[^*\n]+)\*\*[ \t]*\n"
    r"Print ISBN: \*\*(?P<isbn>[^*\n]+)\*\*[ \t]*\n"
    r"Pages: \*\*(?P<pages>[^*\n]+)\*\*[ \t]*\n"
    r"\|[ \t]+\n[ \t]*\n"
    r"\[Table of Contents\]\(<(?P<toc>[^>]+)>[^)]*\)[ \t]+\| \[Index\]\(<(?P<idx>[^>]+)>[^)]*\)\|[ \t]+\|[ \t]*\n"
    r"---\|---\|---[ \t]*\n",
    re.MULTILINE,
)

# After orphan-image stripping, the linked cover image becomes `[](<#anchor>)`.
LINKED_COVER_BLOCK_RE = re.compile(
    r"\[\]\(<[^>]+>\)\| \| \*\*[^*\n]+\*\*[ \t]*\n"
    r"---[ \t]*\n"
    r"By [^\n]+[ \t]*\n"
    r"\.+[ \t]*\n"
    r"Publisher: \*\*[^*\n]+\*\*[ \t]*\n"
    r"Pub Date: \*\*[^*\n]+\*\*[ \t]*\n"
    r"Print ISBN: \*\*[^*\n]+\*\*[ \t]*\n"
    r"Pages: \*\*[^*\n]+\*\*[ \t]*\n"
    r"\|[ \t]+\n[ \t]*\n"
    r"\[Table of Contents\]\(<[^>]+>[^)]*\)[ \t]+\| \[Index\]\(<[^>]+>[^)]*\)\|[ \t]+\|[ \t]*\n"
    r"---\|---\|---[ \t]*\n",
    re.MULTILINE,
)


def clean_cover_block(text: str) -> str:
    """The first cover block (right after the # title heading) keeps
    metadata; the duplicate one above the TOC is just stripped.

    Must run AFTER strip_orphan_images() so the leading book-cover image
    has already been removed.
    """

    def replace(m: re.Match) -> str:
        return (
            f"By **{m.group('author').strip()}**  \n"
            f"Publisher: {m.group('publisher').strip()}  \n"
            f"Pub Date: {m.group('date').strip()}  \n"
            f"Print ISBN: {m.group('isbn').strip()}  \n"
            f"Pages: {m.group('pages').strip()}\n\n"
            f"[Table of Contents](<{m.group('toc')}>) | "
            f"[Index](<{m.group('idx')}>)\n"
        )

    text = COVER_BLOCK_RE.sub(replace, text, count=1)
    text = LINKED_COVER_BLOCK_RE.sub("", text)
    # The "Overview" banner: the original was `![Overview](...)  \n---  \n`.
    # strip_orphan_images() killed the image, leaving `<spaces>  \n---  \n`.
    # Turn that pair into a proper `## Overview` heading.
    text = re.sub(
        r"^[ \t]*\n---  \n",
        "\n## Overview\n\n",
        text,
        count=1,
        flags=re.MULTILINE,
    )
    return text


# --- 9. Drop standalone TOC asset cells & decorative table fragments ----------

def strip_misc_noise(lines: list[str]) -> list[str]:
    """Drop assorted clutter that adds nothing to the rendered document."""
    INDEX_HEADING_RE = re.compile(r"^#{3,6}\s+Index\s*$")
    # The per-letter alphabet bar appears at the top of every index page.
    # After link rewriting/neutralization the SYMBOL link may or may not
    # still carry a URL, so accept both forms.
    INDEX_LETTER_BAR_RE = re.compile(
        r"^\s*\[?\[SYMBOL[^\n]*\[A\][^\n]*\[Z\]\]?\s*$"
    )
    out: list[str] = []
    for line in lines:
        # Pure pixel-image cells like `![](.../images/pixel.gif)` on their own.
        if re.match(r"^\s*!\[\]\([^)]*pixel\.gif\)\s*$", line):
            continue
        # Decorative "Index" subheadings repeated on every per-letter page.
        if INDEX_HEADING_RE.match(line):
            continue
        # The alphabetical letter-bar repeated on every per-letter page.
        if INDEX_LETTER_BAR_RE.match(line):
            continue
        out.append(line)
    return out


# --- driver --------------------------------------------------------------------

def main() -> None:
    # Read in binary so universal-newline mode doesn't expand the source's
    # \r\r\r\n line endings (inside code blocks) into runs of \n that show
    # up as spurious blank lines.
    raw = SRC.read_bytes()
    text = raw.decode("utf-8")
    text = re.sub(r"\r+\n?", "\n", text)
    # The CHM source sprinkles non-breaking spaces (U+00A0) through the
    # cover panel and inline. They render the same as a normal space but
    # break naive regex matching.
    text = text.replace("\u00a0", " ")

    # Order matters: do textual fixes first, then line-oriented passes.
    text = replace_unicode_ent_gifs(text)
    text = fix_case_mangling(text)
    text = fix_item_headings(text)
    text = strip_orphan_images(text)
    text = fix_tag_artifacts(text)

    anchors = build_anchor_map(text)
    text = rewrite_html_links(text, anchors)

    text = repair_index_links(text)
    text = neutralize_dead_index_refs(text)
    text = clean_cover_block(text)

    lines = text.splitlines()
    lines = strip_nav_chrome(lines)
    lines = strip_duplicate_subheadings(lines)
    lines = clean_toc(lines)
    lines = strip_misc_noise(lines)
    lines = fence_code_blocks(lines)

    # Collapse runs of >2 blank lines to exactly one.
    cleaned: list[str] = []
    blank = 0
    for line in lines:
        if line.strip() == "":
            blank += 1
            if blank <= 1:
                cleaned.append("")
        else:
            blank = 0
            cleaned.append(line)
    while cleaned and cleaned[-1] == "":
        cleaned.pop()

    SRC.write_text("\n".join(cleaned) + "\n", encoding="utf-8")
    print(f"Wrote {SRC} ({len(cleaned)} lines)")


if __name__ == "__main__":
    main()
