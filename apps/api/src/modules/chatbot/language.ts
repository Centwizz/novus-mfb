export type SupportedLanguage = 'en' | 'pcm' | 'yo' | 'ig' | 'ha';

/**
 * Lightweight, dependency-free language detection for the languages Nova supports.
 *
 * This is intentionally a heuristic (keyword + marker based), NOT an attempt to
 * infer a speaker's tribe or ethnicity. Detection uses only the message text and
 * the customer can always override the detected language.
 */

const MARKERS: Record<SupportedLanguage, string[]> = {
  pcm: [
    'abeg',
    'wetin',
    'dey',
    'na ',
    ' no wahala',
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
    'ṣe',
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
    'don Allah',
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
  en: [],
};

export function detectLanguage(text: string): SupportedLanguage {
  const normalized = ` ${text.toLowerCase()} `;

  for (const lang of ['pcm', 'yo', 'ig', 'ha'] as const) {
    for (const marker of MARKERS[lang]) {
      if (normalized.includes(marker)) return lang;
    }
  }
  return 'en';
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  pcm: 'Nigerian Pidgin',
  yo: 'Yoruba',
  ig: 'Igbo',
  ha: 'Hausa',
};
