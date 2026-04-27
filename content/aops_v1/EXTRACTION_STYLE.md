# Art of Problem Solving Vol. 1 — Extraction Style Guide

You are transcribing a single PDF page image to clean GitHub-flavored Markdown
for the book *the ART of PROBLEM SOLVING — Volume 1: the BASICS* by Sandor
Lehoczky and Richard Rusczyk (AoPS, 7th printing, 2006). The PDF is an OCR'd
scan; **read the page image directly** and ignore any embedded OCR text.

## Hard rules — read carefully

1. **One markdown file per PDF page.** Output path is exactly
   `content/aops_v1/pages_md/page_NNN.md` where `NNN` is the zero-padded
   PDF page number (1..288). Do not include any YAML front-matter in the
   per-page files. Do not wrap the file in a code fence.

2. **Drop running headers and footers.** Every page has a top header band
   (e.g. `the ART of PROBLEM SOLVING ▷ -3` or `266 ▶ CHAPTER 29. PARTING SHOTS`)
   and a bottom page-number band (e.g. `◁ 5 ▷` or `◀ 262 ▶`). **Do not
   transcribe these.** They become explicit `<!-- PAGE n -->` markers added
   later in stitching, so omit them entirely from the per-page output.

3. **Math goes in LaTeX.** Every mathematical expression must be valid LaTeX:
   - Inline: `$x^5$`, `$2^5 \cdot 2^6 = 2^{11} = 2048$`, `$\sqrt{25}$`.
   - Display (centered, on its own line in the source): wrap in `$$ ... $$`
     on its own line. Multi-line aligned equations use `$$\begin{aligned}
     ... \end{aligned}$$`.
   - Use `\frac{a}{b}`, `\sqrt{x}`, `\sqrt[n]{x}`, `\log_b x`, `\binom{n}{k}`,
     `\overline{AB}`, `\angle ABC`, `\triangle ABC`, `\sim`, `\cong`,
     `\parallel`, `\perp`, `\cdot`, `\pm`, `\le`, `\ge`, `\neq`, `\to`,
     `\Rightarrow`, `\implies`, `\rightarrow`, `\infty`, `\pi`, `\theta`,
     `\alpha`, etc.
   - For things written like "log_2 8" in plain prose, prefer `$\log_2 8$`.
   - Italicized variables in prose (e.g. *x*, *n*) become `$x$`, `$n$`.
   - **Never** transcribe corrupted OCR like `25 • 26 = 211` literally —
     read the page image, recover the intended math, and emit
     `$2^5 \cdot 2^6 = 2^{11}$`.
   - Roots/radicals: `V25` in OCR → `$\sqrt{25}$`. Recover the radicand
     visually from the page.

4. **Headings.**
   - The book has **one Chapter heading** per chapter, on its first page.
     Emit it as `# Chapter N: Title` exactly once, on the page where the
     chapter starts. Other pages in that chapter must NOT repeat the
     chapter heading.
   - Section headings have the form `1.1 Integer Exponents` (number plus
     bold title). Emit as `## 1.1 Integer Exponents` (omit the trailing
     dotted leader from the TOC; the body's bold section heading is what
     you transcribe).
   - Subsection headings (`21.5.1 Absolute Values`) → `### 21.5.1 Absolute Values`.
   - Other in-text bold headings (e.g. **Type names**, **Modular arithmetic**)
     that have no number → `### Type names` is acceptable; if unsure, keep
     them inline-bold.

5. **EXAMPLE / Solution blocks.**
   - `EXAMPLE 1-1 What is 2^5 \cdot 2^6?` →
     `**EXAMPLE 1-1.** What is $2^5 \cdot 2^6$?`
   - `Solution:` opens a paragraph — keep as a normal paragraph starting
     with `*Solution:*` (italicized label). For numbered solutions the
     label may say `Solution to 1-1`; preserve verbatim.

6. **Numbered Problems.** End-of-chapter problems are numbered globally
   (1, 2, 3, ... up to 588). Render as a list:
   ```
   **526.** Forgetful Jones Jr. forgot his first three exam scores. ... (MA⊖ 1990)
   ```
   Each problem is its own paragraph; leave one blank line between them.
   Citations like `(AHSME 1958)`, `(MATHCOUNTS 1991)`, `(Mandelbrot #3)` go
   inline at the end. Use `(MA⊖ 1990)` for the Mandelbrot theta symbol.

7. **Figures and diagrams.** This book is geometry-heavy. When a diagram
   appears on the page:
   - Emit a placeholder line on its own:
     `![Figure: <one-line description from the page>](figures/fig_p<NNN>_<seq>.png)`
   - `<NNN>` is the PDF page number, `<seq>` is 1-indexed within the page.
   - Include a brief caption that names the labeled points/lines (e.g.
     `Triangle ABC with altitude from A to D on BC`). Do NOT try to
     describe pixel-perfect layout. Cropping is handled in a later pass.

8. **Footnotes.** Footnotes live at the bottom of pages, marked with `*`,
   `†`, or numerals. Render inline reference as `[^pNNN-1]` and the
   definition at the end of the page markdown:
   ```
   [^p019-1]: This is the footnote text.
   ```
   Use `pNNN-K` (PDF page, sequential) so footnote IDs are unique across
   the book.

9. **Italics / Bold / Quotes.**
   - The original uses italics liberally for terms ("base", "exponent",
     "squared"). Preserve with `*term*`. Bold (book uses sparingly) → `**`.
   - Curly quotes `“ ”` may be safely converted to straight `"` if the
     OCR mangles them. Em-dashes `—` are preferred over `--`.

10. **Code and computer text.** This book has no code blocks; it's a math
    book. Don't invent fenced code blocks.

11. **Whitespace.** One blank line between paragraphs. No trailing
    whitespace. Preserve em-dashes. Don't double-space sentences.

12. **Don't editorialize or summarize.** Transcribe exactly what is on the
    page (with math repaired to LaTeX). If a sentence breaks mid-word at
    end of page (the book uses hyphenated wraps like `math­ ematical`),
    join it back into a single word — `mathematical`. Continuation
    paragraphs that started on the previous page should still begin the
    file naturally; the stitching step will join them.

13. **Skip blank or marketing pages** (e.g. PDF page 287, 288 are AoPS ads,
    PDF page 14 may end with whitespace). For genuinely blank pages, write
    a file containing only the line `<!-- blank -->`.

## Output format example (for PDF page 15)

```
# Chapter 1: Exponents and Logarithms

## 1.1 Integer Exponents

Multiplication is simply a shorthand for repeated addition. Instead of writing $2 + 2 + 2 + 2 + 2$, we can write $5 \cdot 2$. Similarly, $x + x + x + x = 4x$.

Just as we have a shorthand for repeated addition, we have a simple way of writing repeated multiplication. Instead of writing $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2$, we can write $2^5$ to mean the product of five 2's. Similarly, $x \cdot x \cdot x \cdot x$ is $x^4$, the product of four $x$'s.

In an expression like $2^5$, the 2 is called the *base* and the 5 is the *exponent* or *power*. This is sometimes read "Two to the fifth power" or "Two raised to the fifth power." A number which is raised to the second power is said to be *squared* and to the third power is said to be *cubed*. When you study finding the area of squares (page 123) and the volume of cubes (page 162), you'll understand the source of these names. Let's examine some properties of powers.

**EXAMPLE 1-1.** What is $2^5 \cdot 2^6$?

*Solution:* The first term in the product is the product of five 2's and the second is the product of six 2's, so altogether, we have the product of eleven 2's. Thus $2^5 \cdot 2^6 = 2^{11} = 2048$.

**EXAMPLE 1-2.** What is $\dfrac{3^{15}}{3^{12}}$?
```

## Required workflow per agent

1. For each PDF page in your range:
   1. `Read` the image at `/home/user/Quant-Review/content/aops_v1/pages/page_NNN.png`.
   2. Transcribe to clean markdown following the rules above.
   3. `Write` to `/home/user/Quant-Review/content/aops_v1/pages_md/page_NNN.md`.
2. After the whole range is done, return a one-line status:
   `"Pages X-Y complete: N files written, F figures, P problems"`.
3. If a page is impossible to read (e.g. truly blank or a defect), write
   the single line `<!-- blank -->` into the file and note it in your
   status.

Be meticulous. The math is the whole point of this book.
