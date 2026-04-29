import figuresJson from '../../content/The Art of Problem solving Volume 1: the BASICS by Sandor Lehoczky Richard Ruszyk/figures.json';

export interface AopsFigure {
  id: string;
  chapter: number;
  page: number;
  bookPage: number;
  caption: string;
  bbox: [number, number, number, number];
  /** Asset format. Defaults to "svg" — only set to "png" for chapters whose
   *  figures are still bitmap crops (e.g. ch 11 pending code-gen). */
  format?: "svg" | "png";
}

export const aopsFigures: AopsFigure[] = (figuresJson.figures as AopsFigure[]);

export const aopsFigureById: Record<string, AopsFigure> = Object.fromEntries(
  aopsFigures.map((f) => [f.id, f]),
);

/** Returns figures for a chapter in the same order they appear in the markdown. */
export function aopsFiguresOfChapter(n: number): AopsFigure[] {
  return aopsFigures.filter((f) => f.chapter === n);
}

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
  { number: 11, slug: 'triangles',                                      title: 'Triangles, a.k.a. Geometry',                      pdfPages: [107, 131], bookPages: [93, 117], highlight: true, filename: 'AoPS_V1_Chapter_11.md' },
  { number: 12, slug: 'quadrilaterals',                                 title: 'Quadrilaterals',                                  pdfPages: [132, 140], bookPages: [118, 126], filename: 'AoPS_V1_Chapter_12.md' },
  { number: 13, slug: 'polygons',                                       title: 'Polygons',                                        pdfPages: [141, 146], bookPages: [127, 132], filename: 'AoPS_V1_Chapter_13.md' },
  { number: 14, slug: 'angle-chasing',                                  title: 'Angle Chasing',                                   pdfPages: [147, 149], bookPages: [133, 135], filename: 'AoPS_V1_Chapter_14.md' },
  { number: 15, slug: 'areas',                                          title: 'Areas',                                           pdfPages: [150, 156], bookPages: [136, 142], filename: 'AoPS_V1_Chapter_15.md' },
  { number: 16, slug: 'the-power-of-coordinates',                       title: 'The Power of Coordinates',                        pdfPages: [157, 168], bookPages: [143, 154], highlight: true, filename: 'AoPS_V1_Chapter_16.md' },
  { number: 17, slug: 'power-of-a-point',                               title: 'Power of a Point',                                pdfPages: [169, 173], bookPages: [155, 159], filename: 'AoPS_V1_Chapter_17.md' },
  { number: 18, slug: 'three-dimensional-geometry',                     title: 'Three Dimensional Geometry',                      pdfPages: [174, 186], bookPages: [160, 172], filename: 'AoPS_V1_Chapter_18.md' },
  { number: 19, slug: 'shifts-turns-flips-stretches-and-squeezes',      title: 'Shifts, Turns, Flips, Stretches, and Squeezes',   pdfPages: [187, 194], bookPages: [173, 180], filename: 'AoPS_V1_Chapter_19.md' },
];

export const aopsVol1ChapterByNumber: Record<number, AopsChapter> = Object.fromEntries(
  aopsVol1Chapters.map((c) => [c.number, c]),
);

/** Converts a PDF page number to the printed book page number. */
export const aopsBookPageOf = (pdfPage: number): number => pdfPage - 14;
