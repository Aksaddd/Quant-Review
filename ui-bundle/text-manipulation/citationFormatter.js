/**
 * Citation formatter — APA 7 / MLA 9 / Chicago 17.
 *
 * Input shape (minimum viable):
 *   {
 *     actual_title: string,
 *     authors: [{ firstName, lastName }] or ['Last, First'] ,
 *     year: number | string,
 *     journal?: string,         // journal/magazine
 *     publisher?: string,       // book publisher
 *     city?: string,            // book city
 *     volume?: string | number,
 *     issue?: string | number,
 *     pages?: string,           // '12-34'
 *     doi?: string,
 *     url?: string,
 *     accessed?: string,        // ISO date for web sources
 *   }
 *
 * Returns: { bibliography: string, inText: string }
 */

const safe = (v) => (v === undefined || v === null || v === '' ? null : v);

function normalizeAuthors(authors) {
  if (!Array.isArray(authors)) return [];
  return authors.map((a) => {
    if (typeof a === 'string') {
      // 'Vaswani, Ashish' or 'Ashish Vaswani'
      if (a.includes(',')) {
        const [lastName, firstName] = a.split(',').map((s) => s.trim());
        return { firstName, lastName };
      }
      const parts = a.trim().split(/\s+/);
      return { firstName: parts.slice(0, -1).join(' '), lastName: parts.at(-1) };
    }
    return { firstName: a.firstName || '', lastName: a.lastName || '' };
  });
}

const initials = (firstName = '') =>
  firstName
    .trim()
    .split(/\s+/)
    .map((w) => (w[0] ? `${w[0].toUpperCase()}.` : ''))
    .join(' ');

// ---------- APA 7 ----------
function formatApa(c) {
  const authors = normalizeAuthors(c.authors);
  const authorStr = authors.length === 0
    ? ''
    : authors.length === 1
      ? `${authors[0].lastName}, ${initials(authors[0].firstName)}`
      : authors.length <= 20
        ? authors.map((a, i) =>
            i === authors.length - 1
              ? `& ${a.lastName}, ${initials(a.firstName)}`
              : `${a.lastName}, ${initials(a.firstName)}`
          ).join(', ')
        : `${authors.slice(0, 19).map((a) => `${a.lastName}, ${initials(a.firstName)}`).join(', ')}, ... ${authors.at(-1).lastName}, ${initials(authors.at(-1).firstName)}`;

  const year = safe(c.year) ? ` (${c.year}).` : '';
  const title = safe(c.actual_title) ? ` ${c.actual_title}.` : '';
  const journal = safe(c.journal) ? ` *${c.journal}*` : '';
  const vol = safe(c.volume) ? `, *${c.volume}*` : '';
  const issue = safe(c.issue) ? `(${c.issue})` : '';
  const pages = safe(c.pages) ? `, ${c.pages}` : '';
  const pub = safe(c.publisher) ? ` ${c.publisher}.` : '';
  const doi = safe(c.doi) ? ` https://doi.org/${c.doi}` : '';
  const url = safe(c.url) && !safe(c.doi) ? ` ${c.url}` : '';

  const bibliography = `${authorStr}${year}${title}${journal}${vol}${issue}${pages}.${pub}${doi}${url}`.trim().replace(/\s+/g, ' ');
  const inText = buildInText(authors, c.year, 'apa');
  return { bibliography, inText };
}

// ---------- MLA 9 ----------
function formatMla(c) {
  const authors = normalizeAuthors(c.authors);
  const authorStr = authors.length === 0
    ? ''
    : authors.length === 1
      ? `${authors[0].lastName}, ${authors[0].firstName}`
      : authors.length === 2
        ? `${authors[0].lastName}, ${authors[0].firstName}, and ${authors[1].firstName} ${authors[1].lastName}`
        : `${authors[0].lastName}, ${authors[0].firstName}, et al`;

  const title = safe(c.actual_title) ? ` "${c.actual_title}."` : '';
  const journal = safe(c.journal) ? ` *${c.journal}*` : '';
  const vol = safe(c.volume) ? `, vol. ${c.volume}` : '';
  const issue = safe(c.issue) ? `, no. ${c.issue}` : '';
  const year = safe(c.year) ? `, ${c.year}` : '';
  const pages = safe(c.pages) ? `, pp. ${c.pages}` : '';
  const pub = safe(c.publisher) ? `. ${c.publisher}` : '';
  const doi = safe(c.doi) ? `. doi:${c.doi}` : '';

  const bibliography = `${authorStr}.${title}${journal}${vol}${issue}${year}${pages}${pub}${doi}.`.trim().replace(/\s+/g, ' ');
  const inText = buildInText(authors, c.pages || c.year, 'mla');
  return { bibliography, inText };
}

// ---------- Chicago 17 (Author-Date) ----------
function formatChicago(c) {
  const authors = normalizeAuthors(c.authors);
  const authorStr = authors.length === 0
    ? ''
    : authors.length === 1
      ? `${authors[0].lastName}, ${authors[0].firstName}`
      : authors.length <= 3
        ? authors.map((a, i) =>
            i === 0
              ? `${a.lastName}, ${a.firstName}`
              : i === authors.length - 1
                ? `and ${a.firstName} ${a.lastName}`
                : `${a.firstName} ${a.lastName}`
          ).join(', ')
        : `${authors[0].lastName}, ${authors[0].firstName}, et al`;

  const year = safe(c.year) ? `. ${c.year}.` : '.';
  const title = safe(c.actual_title) ? ` "${c.actual_title}."` : '';
  const journal = safe(c.journal) ? ` *${c.journal}*` : '';
  const vol = safe(c.volume) ? ` ${c.volume}` : '';
  const issue = safe(c.issue) ? `, no. ${c.issue}` : '';
  const pages = safe(c.pages) ? `: ${c.pages}` : '';
  const pub = safe(c.publisher) ? ` ${c.publisher}.` : '';
  const doi = safe(c.doi) ? ` https://doi.org/${c.doi}.` : '';

  const bibliography = `${authorStr}${year}${title}${journal}${vol}${issue}${pages}.${pub}${doi}`.trim().replace(/\s+/g, ' ');
  const inText = buildInText(authors, c.year, 'chicago');
  return { bibliography, inText };
}

function buildInText(authors, locator, style) {
  if (!authors.length) return '';
  const last = authors[0].lastName;
  if (style === 'apa') {
    if (authors.length === 1) return `(${last}, ${locator})`;
    if (authors.length === 2) return `(${last} & ${authors[1].lastName}, ${locator})`;
    return `(${last} et al., ${locator})`;
  }
  if (style === 'mla') {
    if (authors.length === 1) return `(${last} ${locator})`;
    if (authors.length === 2) return `(${last} and ${authors[1].lastName} ${locator})`;
    return `(${last} et al. ${locator})`;
  }
  // chicago (author-date)
  if (authors.length === 1) return `(${last} ${locator})`;
  if (authors.length <= 3) return `(${authors.map((a) => a.lastName).join(', ')} ${locator})`;
  return `(${last} et al. ${locator})`;
}

export function formatCitation(citation, style = 'apa') {
  switch (style.toLowerCase()) {
    case 'apa':     return formatApa(citation);
    case 'mla':     return formatMla(citation);
    case 'chicago': return formatChicago(citation);
    default:        return formatApa(citation);
  }
}

export function formatAllStyles(citation) {
  return {
    apa:     formatApa(citation),
    mla:     formatMla(citation),
    chicago: formatChicago(citation),
  };
}
