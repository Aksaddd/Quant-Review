export interface AopsChapter {
  number: number;
  slug: string;
  title: string;
  pdfPages: [number, number];
  bookPages: [number, number];
  highlight?: boolean;
  filename: string;
}

export const AOPS_VOL1_TOTAL_CHAPTERS = 29;

export const aopsVol1Chapters: AopsChapter[] = [
  { number: 1, slug: 'exponents-and-logarithms',                        title: 'Exponents and Logarithms',                        pdfPages: [15, 26], bookPages: [1, 12],  filename: 'aops_vol1_ch01_exponents_and_logarithms.md' },
  { number: 2, slug: 'complex-numbers',                                 title: 'Complex Numbers',                                 pdfPages: [27, 30], bookPages: [13, 16], filename: 'aops_vol1_ch02_complex_numbers.md' },
  { number: 3, slug: 'linear-equations',                                title: 'Linear Equations',                                pdfPages: [31, 41], bookPages: [17, 27], filename: 'aops_vol1_ch03_linear_equations.md' },
  { number: 4, slug: 'proportions',                                     title: 'Proportions',                                     pdfPages: [42, 52], bookPages: [28, 38], filename: 'aops_vol1_ch04_proportions.md' },
  { number: 5, slug: 'using-the-integers',                              title: 'Using the Integers',                              pdfPages: [53, 65], bookPages: [39, 51], highlight: true, filename: 'aops_vol1_ch05_using_the_integers.md' },
  { number: 6, slug: 'quadratic-equations',                             title: 'Quadratic Equations',                             pdfPages: [66, 80], bookPages: [52, 66], filename: 'aops_vol1_ch06_quadratic_equations.md' },
  { number: 7, slug: 'special-factorizations-and-clever-manipulations', title: 'Special Factorizations and Clever Manipulations', pdfPages: [81, 88], bookPages: [67, 74], highlight: true, filename: 'aops_vol1_ch07_special_factorizations.md' },
  { number: 8, slug: 'what-numbers-really-are',                         title: 'What Numbers Really Are',                         pdfPages: [89, 94], bookPages: [75, 80], filename: 'aops_vol1_ch08_what_numbers_really_are.md' },
  { number: 9, slug: 'an-introduction-to-circles',                      title: 'An Introduction to Circles',                      pdfPages: [95, 97], bookPages: [81, 83], filename: 'aops_vol1_ch09_intro_to_circles.md' },
  { number: 10, slug: 'angles',                                         title: 'Angles',                                          pdfPages: [98, 106], bookPages: [84, 92], filename: 'chapter_10.md' },
];

export const aopsVol1ChapterByNumber: Record<number, AopsChapter> = Object.fromEntries(
  aopsVol1Chapters.map((c) => [c.number, c]),
);

/**
 * Maps each ch 10 figure-spec id to the source PDF page it appears on.
 * Used to render an inline thumbnail of the source page next to each figure
 * caption. Mapping was determined by manually cross-referencing each figure
 * with the page-NNN.jpg scans during the figure-integration audit.
 */
export const aopsVol1FigurePages: Record<string, number> = {
  'fig-10-1-segments-rays-lines':           98,
  'fig-10-2-collinear-segment':             98,
  'fig-10-3-angle-subtending-arc':          98,
  'fig-10-4-angle-types':                   99,
  'fig-10-5-vertical-angles':               99,
  'fig-10-6-parallel-transversal':         100,
  'fig-10-7-marking-equal-angles':         100,
  'fig-10-8-triangle-angle-sum':           100,
  'fig-10-9-exterior-angle':               101,
  'fig-10-10-arc-sector':                  101,
  'fig-10-11-inscribed-angle':             102,
  'fig-10-12-two-secants-external':        102,
  'fig-10-13-tangent-chord-angle':         102,
  'fig-10-14-two-chords-internal':         102,
  'fig-10-15-diameter-tangent':            103,
  'fig-10-16-exercise-10-2':               103,
  'fig-10-17-exercise-10-3':               103,
  'fig-10-18-example-10-7':                103,
  'fig-10-19-example-10-8':                103,
  'fig-10-20-equal-inscribed-angles':      103,
  'fig-10-21-example-10-9-tangent-circles':104,
  'fig-10-22-inscribed-angle-proof-setup': 104,
  'fig-10-23-two-secants-proof':           105,
  'fig-10-24-tangent-chord-proof':         106,
  'fig-10-25-two-chords-proof':            106,
};

/** Converts a PDF page number to the printed book page number. */
export const aopsBookPageOf = (pdfPage: number): number => pdfPage - 14;
