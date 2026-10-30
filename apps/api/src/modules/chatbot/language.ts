export type SupportedLanguage = 'en' | 'pcm' | 'yo' | 'ig' | 'ha';

/**
 * Lightweight, dependency-free language detection for the languages Nova supports.
 *
 * This is intentionally a heuristic (keyword + marker based), NOT an attempt to
 * infer a speaker's tribe or ethnicity. Detection uses only the message text and
 * the customer can always override the detected language.
 */

const MARKERS: Record<Exclude<SupportedLanguage, 'en'>, string[]> = {
  pcm: [
    'abeg',
    'wetin',
    'dey',
    'no wahala',
    'sabi',
    'shey',
    'make i',
    'chop',
    'abi',
    'waka',
    'plenti',
    'small small',
  ],
  yo: [
    'jowo',
    'jọwọ',
    'bawo',
    'pele',
    'e ku',
    'mo fe',
    'se daadaa',
    'abi o',
    'kini',
    'elo ni',
  ],
  ig: [
    'biko',
    'kedu',
    'ndewo',
    'nna',
    'nne',
    'ọ dị',
    'gịnị',
    'maka',
    'dalu',
    'daalu',
    'ọfma',
  ],
  ha: [
    'don allah',
    'yaya',
    'sannu',
    'nagode',
    'na gode',
    'menene',
    'ina kwana',
    'kudi',
    'lafiya',
    'madalla',
  ],
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Matches a marker only as a whole word/phrase. Substring matching produced
 * false positives such as English "co(nne)ct" being read as Igbo "nne".
 * Unicode-aware boundaries are used so accented markers (e.g. "ọ dị") work.
 */
function containsMarker(text: string, marker: string): boolean {
  return new RegExp(`(?<!\\p{L})${escapeRegExp(marker)}(?!\\p{L})`, 'iu').test(text);
}

/**
 * Scores each language by the total length of the markers it matches, then picks
 * the strongest match. Scoring (rather than first-match-wins) avoids one generic
 * marker in an earlier language masking a longer, more specific match in another
 * (e.g. Pidgin "na" vs Hausa "sannu").
 */
export function detectLanguage(text: string): SupportedLanguage {
  const normalized = text.toLowerCase();
  let best: SupportedLanguage = 'en';
  let bestScore = 0;

  for (const [lang, markers] of Object.entries(MARKERS) as [
    Exclude<SupportedLanguage, 'en'>,
    string[],
  ][]) {
    let score = 0;
    for (const marker of markers) {
      if (containsMarker(normalized, marker)) score += marker.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = lang;
    }
  }

  return best;
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  pcm: 'Nigerian Pidgin',
  yo: 'Yoruba',
  ig: 'Igbo',
  ha: 'Hausa',
};
