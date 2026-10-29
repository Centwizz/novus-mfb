import { detectLanguage, type SupportedLanguage } from './language';
import {
  confidenceFor,
  DEFAULT_KNOWLEDGE_BASE,
  retrieveScoredKnowledge,
  type KnowledgeEntry,
} from './knowledge-base';

export interface NovaTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface NovaRequest {
  message: string;
  history?: NovaTurn[];
  /** Current pathname, so Nova can tailor suggestions to the page. */
  page?: string;
}

export interface NovaReply {
  reply: string;
  language: SupportedLanguage;
  mode: 'guided';
  escalated: boolean;
  intent: string;
  sources: Array<{ slug: string; title: string }>;
  suggestions: string[];
}

const GREETING_PATTERN =
  /^(hi|hello|hey|hiya|good (morning|afternoon|evening)|how far|kedu|bawo|sannu|ndewo)\b/i;
const THANKS_PATTERN = /^(thanks|thank you|thank u|daalu|dalu|nagode|na gode|ese|mo dupe|much appreciated)\b/i;
const BYE_PATTERN = /^(bye|goodbye|good bye|see you|good night|later)\b/i;
const HUMAN_PATTERN =
  /\b(human|agent|representative|customer care|real person|escalate|support team|talk to (a )?(person|someone)|speak to (a )?(person|someone))\b/i;
const FRAUD_PATTERN =
  /\b(fraud|scam|scammed|phishing|hacked|hacker|unauthori[sz]ed|stolen|someone used my account|wrong debit|dispute)\b/i;
const SHARED_SECRET_PATTERN = /\b(shared|sent|gave|entered)\b.{0,25}\b(otp|pin|password|passcode)\b/i;
const SECRET_PATTERN =
  /\b(?:\d[ -]?){13,19}\b|\b(otp|pin|password|passcode|card number)\b[^.\n]{0,20}\b\d{3,8}\b/i;

const GREETING: Record<SupportedLanguage, string> = {
  en: "Hello! I'm Nova, the Novus MFB assistant. I can help with accounts, transfers, cards, savings, loans and security. What do you need help with?",
  pcm:
    'How far! My name na Nova from Novus MFB. I can help you with account, transfer, card, savings, loan and security. Wetin you need help with?',
  yo: 'Báwo ni! Èmi ni Nova, olùrànlọ́wọ́ Novus MFB. Mo lè ràn yín lọ́wọ́ lórí àkọsílẹ̀, ìgbéwọ́lé, káàdì, ìṣowó, ẹ̀bùn àti ààbò. Kí ni ẹ fẹ́ kí n ṣe?',
  ig: 'Ndeewo! Abụ m Nova, onye enyemaka Novus MFB. Enwere m ike inyere gị aka gbasara akaụntụ, mbufe, kaadị, nchekwa ego, mgbazinye na nchekwa. Kedu ihe ị chọrọ?',
  ha: 'Sannu! Ni ce Nova, mataimakiyar Novus MFB. Zan iya taimaka muku kan asusu, musayar kudi, kati, ajiya, lamuni da tsaro. Me kuke bukata?',
};

const THANKS: Record<SupportedLanguage, string> = {
  en: "You're welcome. Is there anything else I can help with?",
  pcm: 'No wahala at all. Anything else you want make I help you with?',
  yo: 'Kò tọ́pẹ́. Ṣé ohun mìíràn wà tí mo lè ràn yín lọ́wọ́?',
  ig: 'Ọ dị mma. Ọ dị ihe ọzọ m nwere ike inyere gị aka?',
  ha: 'Babu komai. Akwai wani abu da zan iya taimaka muku da shi?',
};

const NO_MATCH: Record<SupportedLanguage, string> = {
  en: "I don't have a verified answer for that yet, and I would rather not guess. I can help with accounts, transfers, cards, savings, loans, security or contacting support. You can also reach the team directly on 07066887632 or info@novusmfb.com.",
  pcm:
    'I no get correct answer for that one yet, and I no want guess. I can help you with account, transfer, card, savings, loan, security or how to reach support. You can also call 07066887632 or email info@novusmfb.com.',
  yo: 'Mi ò tíì ní ìdáhùn tí a fọwọ́sí fún un, mi ò sì fẹ́ díbọ́n. Mo lè ràn yín lọ́wọ́ lórí àkọsílẹ̀, ìgbéwọ́lé, káàdì, ìṣowó, ẹ̀bùn, ààbò tàbí bí a lè kan sí ẹ̀ka ìtọ́jú. Ẹ lè pè 07066887632 tàbí kọ̀wé sí info@novusmfb.com.',
  ig: 'Enweghị m azịza a kwadoro maka nke ahụ, achọghị m ịkọ nkọ. Enwere m ike inyere gị aka gbasara akaụntụ, mbufe, kaadị, nchekwa ego, mgbazinye, nchekwa ma ọ bụ ịkpọtụrụ nkwado. Ị nwere ike ịkpọ 07066887632 ma ọ bụ dee info@novusmfb.com.',
  ha: 'Ba ni da tabbataccen amsa kan hakan tukuna, kuma ba na son yin hasashe. Zan iya taimakawa kan asusu, musayar kudi, kati, ajiya, lamuni, tsaro ko tuntubar tallafi. Kuna iya kira 07066887632 ko imel info@novusmfb.com.',
};

const SECRET_WARNING =
  "Please don't share that here. For your safety, never send your PIN, OTP, password or full card number in chat — even to someone who says they are from Novus MFB.\n\nIf you have already shared it, call 07066887632 now so the team can help secure your account. I can still help with the general question — what were you trying to do?";

const FOLLOW_UPS: Partial<Record<string, string>> = {
  Accounts: 'Would you like the requirements for a specific account package?',
  Transfers: 'Do you have the transaction reference or receipt handy?',
  Cards: 'Is the card with you right now?',
  Products: 'Would you like me to explain the options?',
  Security: 'Is your account safe right now?',
  Company: 'Is there anything else you would like to know?',
  Digital: 'Would you like help with anything else?',
};

const ACCOUNT_PACKAGES: Array<{
  label: string;
  body: string;
  pattern: RegExp;
}> = [
  {
    label: 'Personal',
    body: 'our everyday account for individuals to receive money, make transfers and manage daily spending.',
    pattern: /\bpersonal\b/i,
  },
  {
    label: 'Students',
    body: 'our account for students managing allowances, tuition and day-to-day expenses.',
    pattern: /\bstudents?\b/i,
  },
  {
    label: 'Beta-Pikin',
    body: 'our account for children, opened and managed by a parent or guardian.',
    pattern: /\bbeta[\s-]?pikin\b/i,
  },
  {
    label: 'Salary',
    body: 'our account for employees who want their salary paid into a Novus account.',
    pattern: /\bsalary\b/i,
  },
  {
    label: 'Cooperatives',
    body: 'our account for cooperative societies and groups.',
    pattern: /\bco-?operatives?\b/i,
  },
  {
    label: 'eBam',
    body: 'our digital-first account for customers who want to open and manage their banking online.',
    pattern: /\bebam\b/i,
  },
  {
    label: 'Corporate',
    body: 'our account for registered businesses to handle payments, collections and operations.',
    pattern: /\b(corporate|business|sme|company)\b/i,
  },
];

const LOAN_PACKAGES: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Agriculture', pattern: /\bagricultur(e|al)\b/i },
  { label: 'nMSMEs', pattern: /\bnmsmes?\b/i },
  { label: 'Side Hustle', pattern: /\bside\s+hustle\b/i },
  { label: 'MyPikin Fees', pattern: /\bmy\s*pikin(\s+fees)?\b/i },
  { label: 'Asset Financing', pattern: /\basset\s+financ(e|ing)\b/i },
  { label: 'Micro-Housing', pattern: /\bmicro[\s-]?housing\b/i },
  { label: 'Urgent 2k', pattern: /\burgent\s*2k\b/i },
  { label: 'Fuel4Me', pattern: /\bfuel\s*4\s*me\b/i },
  {
    label: 'Self-Help Group Lending',
    pattern: /\bself[\s-]?help(\s+group)?(\s+lending)?\b/i,
  },
  { label: 'Private Sector Business', pattern: /\bprivate\s+sector(\s+business)?\b/i },
  { label: 'Federal Business', pattern: /\bfederal\s+business\b/i },
];

const ENTRY_SUGGESTIONS: Record<string, string[]> = {
  'open-account': [
    'What documents do I need?',
    'What account packages are there?',
    'What are your contact details?',
  ],
  'account-requirements': [
    'What account packages are there?',
    'How do I open an account?',
    'What are your contact details?',
  ],
  'savings-products': [
    'Tell me about Personal',
    'Tell me about Students',
    'What documents do I need?',
  ],
  'loan-enquiry': [
    'What are the loan requirements?',
    'How do I apply for a loan?',
    'What are your contact details?',
  ],
  'transfer-pending': [
    'It was debited but not received',
    'How do I report a complaint?',
    'What are your contact details?',
  ],
  'failed-transfer': [
    'The transfer was reversed',
    'How do I report a complaint?',
    'What are your contact details?',
  ],
  'card-lost': ['Block my card', 'Order a new card', 'What are your contact details?'],
  'card-declined': [
    'Why was my card declined?',
    'Order a new card',
    'What are your contact details?',
  ],
  'fraud-phishing': [
    'I shared my OTP',
    'My card was stolen',
    'What are your contact details?',
  ],
  'rates-and-fees': [
    'What account packages are there?',
    'What are the loan requirements?',
    'What are your contact details?',
  ],
  'balance-statements': [
    'How do I check my balance?',
    'How do I report a complaint?',
    'What are your contact details?',
  ],
  'contact-support': [
    'What are your support hours?',
    'How do I report a complaint?',
    'Where is your head office?',
  ],
  'speak-to-human': [
    'What are your contact details?',
    'What are your support hours?',
    'How do I report a complaint?',
  ],
  'report-complaint': [
    'What are your contact details?',
    'What are your support hours?',
    'Where is your head office?',
  ],
  'app-and-ussd': [
    'What account packages are there?',
    'How do I open an account?',
    'What are your contact details?',
  ],
  branches: ['What are your support hours?', 'What are your contact details?', 'How do I open an account?'],
};

const DEFAULT_SUGGESTIONS = [
  'What account packages do you have?',
  'How do I open an account?',
  'What are your contact details?',
];

function wordCount(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function entryFor(slug: string): KnowledgeEntry | undefined {
  return DEFAULT_KNOWLEDGE_BASE.find((entry) => entry.slug === slug);
}

function sanitiseHistory(history: NovaTurn[] | undefined): NovaTurn[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (item): item is NovaTurn =>
        Boolean(item) &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0,
    )
    .slice(-10)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 2000) }));
}

function topicForPage(page: string | undefined): string | undefined {
  if (!page) return undefined;
  const path = page.split('?')[0]?.toLowerCase() ?? '';

  if (path.startsWith('/loans')) return 'loan packages';
  if (path.startsWith('/savings') || path.startsWith('/personal')) return 'account packages';
  if (path.startsWith('/security')) return 'security fraud';
  if (path.startsWith('/contact') || path.startsWith('/report')) return 'contact support';
  return undefined;
}

function pageSuggestions(page: string | undefined): string[] {
  const topic = topicForPage(page);

  if (topic === 'loan packages') {
    return ['What loan packages do you have?', 'How do I apply for a loan?', 'What are your contact details?'];
  }
  if (topic === 'account packages') {
    return ['What account packages do you have?', 'What documents do I need?', 'How do I open an account?'];
  }
  if (topic === 'security fraud') {
    return ['How do I report fraud?', 'How do I keep my account safe?', 'I lost my card'];
  }
  if (topic === 'contact support') {
    return ['What are your support hours?', 'What are your contact details?', 'How do I report a complaint?'];
  }

  return DEFAULT_SUGGESTIONS;
}

function suggestionsFor(entry: KnowledgeEntry, page: string | undefined): string[] {
  return ENTRY_SUGGESTIONS[entry.slug] ?? pageSuggestions(page);
}

function sourceOf(entry: KnowledgeEntry): Array<{ slug: string; title: string }> {
  return [{ slug: entry.slug, title: entry.title }];
}

function makeReply(args: {
  reply: string;
  language: SupportedLanguage;
  intent: string;
  escalated?: boolean;
  entry?: KnowledgeEntry;
  suggestions?: string[];
}): NovaReply {
  return {
    reply: args.reply,
    language: args.language,
    mode: 'guided',
    escalated: args.escalated ?? false,
    intent: args.intent,
    sources: args.entry ? sourceOf(args.entry) : [],
    suggestions: args.suggestions ?? DEFAULT_SUGGESTIONS,
  };
}

function isPackageQuestion(cleaned: string): boolean {
  return (
    wordCount(cleaned) <= 4 ||
    /^(tell me about|what is|what's|about|describe|explain)\b/i.test(cleaned)
  );
}

function detectAccountPackage(cleaned: string): (typeof ACCOUNT_PACKAGES)[number] | undefined {
  if (/\b(personal|student|salary|business|corporate)\s+loan\b/i.test(cleaned)) return undefined;
  if (!isPackageQuestion(cleaned)) return undefined;
  return ACCOUNT_PACKAGES.find((item) => item.pattern.test(cleaned));
}

function detectLoanPackage(cleaned: string): (typeof LOAN_PACKAGES)[number] | undefined {
  if (!isPackageQuestion(cleaned)) return undefined;
  return LOAN_PACKAGES.find((item) => item.pattern.test(cleaned));
}

function accountPackageReply(
  item: (typeof ACCOUNT_PACKAGES)[number],
  language: SupportedLanguage,
  page: string | undefined,
): NovaReply {
  return makeReply({
    reply: `${item.label} is ${item.body} I don't have verified package-specific rates, fees or requirements in front of me, so I won't guess them. I can share the general account-opening requirements, or point you to the team for the exact terms.`,
    language,
    intent: 'account-package',
    suggestions: [
      'What documents do I need?',
      'What account packages are there?',
      'What are your contact details?',
    ],
  });
}

function loanPackageReply(
  item: (typeof LOAN_PACKAGES)[number],
  language: SupportedLanguage,
): NovaReply {
  return makeReply({
    reply: `${item.label} is one of our loan packages. I don't have verified package-specific limits, rates or eligibility details in front of me, so I won't guess them. I can share the general loan-request requirements, or point you to the team to confirm the terms.`,
    language,
    intent: 'loan-package',
    suggestions: [
      'What are the loan requirements?',
      'How do I apply for a loan?',
      'What are your contact details?',
    ],
  });
}

function withFollowUp(entry: KnowledgeEntry, body: string): string {
  if (body.trim().endsWith('?')) return body;
  const followUp = FOLLOW_UPS[entry.category];
  return followUp ? `${body}\n\n${followUp}` : body;
}

/**
 * Deterministic Nova reply used when no language model is configured.
 *
 * It reads only from the approved knowledge base, never invents figures and
 * always offers a clear next step. The same knowledge and persona feed the
 * optional model path in `apps/web/src/app/api/nova/route.ts`.
 */
export function respond(input: NovaRequest): NovaReply {
  const text = (input.message ?? '').replace(/\s+/g, ' ').trim();
  const language = detectLanguage(text);
  const history = sanitiseHistory(input.history);
  const page = input.page;

  if (!text) {
    return makeReply({
      reply: GREETING[language],
      language,
      intent: 'greeting',
      suggestions: pageSuggestions(page),
    });
  }

  if (SECRET_PATTERN.test(text) || SHARED_SECRET_PATTERN.test(text)) {
    return makeReply({
      reply: SECRET_WARNING,
      language,
      intent: 'secret-warning',
      escalated: true,
      suggestions: ['What are your contact details?', 'How do I report fraud?'],
    });
  }

  const greetingMatch = text.match(GREETING_PATTERN);
  const cleaned = greetingMatch
    ? text.slice(greetingMatch[0].length).replace(/^[\s,.!?—-]+/, '')
    : text;

  if (wordCount(text) <= 4 && greetingMatch) {
    return makeReply({
      reply: GREETING[language],
      language,
      intent: 'greeting',
      suggestions: pageSuggestions(page),
    });
  }

  if (wordCount(text) <= 5 && THANKS_PATTERN.test(text)) {
    return makeReply({
      reply: THANKS[language],
      language,
      intent: 'thanks',
      suggestions: pageSuggestions(page),
    });
  }

  if (wordCount(text) <= 4 && BYE_PATTERN.test(text)) {
    return makeReply({
      reply: 'Thank you for chatting with Novus MFB. Take care.',
      language,
      intent: 'goodbye',
    });
  }

  if (HUMAN_PATTERN.test(cleaned)) {
    const entry = entryFor('speak-to-human');
    return makeReply({
      reply:
        entry?.content ??
        'I cannot transfer you to a live agent from this chat, but the support team can be reached on 07066887632 or info@novusmfb.com.',
      language,
      intent: 'human',
      escalated: true,
      entry,
      suggestions: entry ? suggestionsFor(entry, page) : DEFAULT_SUGGESTIONS,
    });
  }

  if (FRAUD_PATTERN.test(cleaned)) {
    const entry = entryFor('fraud-phishing');
    return makeReply({
      reply: entry?.content ?? SECRET_WARNING,
      language,
      intent: 'fraud',
      escalated: true,
      entry,
      suggestions: entry ? suggestionsFor(entry, page) : DEFAULT_SUGGESTIONS,
    });
  }

  const accountPackage = detectAccountPackage(cleaned);
  if (accountPackage) return accountPackageReply(accountPackage, language, page);

  const loanPackage = detectLoanPackage(cleaned);
  if (loanPackage) return loanPackageReply(loanPackage, language);

  const priorUser = [...history].reverse().find((item) => item.role === 'user')?.content;
  const topic = topicForPage(page);
  let query = cleaned || text;

  if (wordCount(cleaned) <= 4 && priorUser) query = `${priorUser} ${query}`;
  if (wordCount(cleaned) <= 5 && topic) query = `${query} ${topic}`;

  const scored = retrieveScoredKnowledge(query, 3);
  const best = scored[0];

  if (!best || confidenceFor(best.score) === 'low') {
    return makeReply({
      reply: NO_MATCH[language],
      language,
      intent: 'fallback',
      suggestions: pageSuggestions(page),
    });
  }

  const priorAssistant = [...history]
    .reverse()
    .find((item) => item.role === 'assistant')?.content;
  const repeated = Boolean(
    priorAssistant && priorAssistant.includes(best.entry.content.slice(0, 60)),
  );

  const body = repeated
    ? `I don't have more detail I can verify from here, so I don't want to guess. ${best.entry.content}`
    : best.entry.content;

  return makeReply({
    reply: withFollowUp(best.entry, body),
    language,
    intent: best.entry.slug,
    entry: best.entry,
    suggestions: suggestionsFor(best.entry, page),
  });
}
