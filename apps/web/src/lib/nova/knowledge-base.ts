/**
 * Approved knowledge base for Nova on the public website.
 *
 * IMPORTANT: This content is intentionally generic and contains NO invented
 * financial figures, rates, fees, regulatory claims or product terms. Product-
 * specific facts must be supplied and approved by Novus MFB before they are
 * added here — never hard-coded as if verified.
 *
 * Every entry is written so it can be returned verbatim to a customer when no
 * language model is configured, which is why the copy is conversational rather
 * than terse.
 *
 * The NestJS API keeps its own copy of this seed data for authenticated/agent
 * channels. When you change product facts here, mirror them there.
 */

export interface KnowledgeEntry {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
  content: string;
  /** True when the entry intentionally avoids unverified claims. */
  placeholder?: boolean;
}

export const DEFAULT_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    slug: 'about-novus',
    title: 'What is Novus MFB?',
    category: 'Company',
    keywords: ['novus', 'mfb', 'bank', 'who are you', 'about', 'microfinance', 'company'],
    content:
      'Novus MFB is a digital-first microfinance bank built to make everyday banking simpler, safer and more human. You can open an account, save, borrow and manage your money from this website, with Nova and a human support team on hand when you need them. Licensed by the Central Bank of Nigeria (CBN).',
  },
  {
    slug: 'open-account',
    title: 'How to open a Novus MFB account',
    category: 'Accounts',
    keywords: [
      'open',
      'account',
      'register',
      'sign up',
      'create account',
      'create an account',
      'new account',
      'onboarding',
      'get started',
      'join',
    ],
    content:
      'To open a Novus MFB account, choose "Open an account" from the website menu and complete the short form with your name, email and phone number. You will then verify your email or phone number. If you get stuck at any step, reply here and I can walk you through what comes next.',
  },
  {
    slug: 'account-requirements',
    title: 'Documents needed to open an account',
    category: 'Accounts',
    keywords: [
      'documents',
      'requirements',
      'id',
      'identification',
      'kyc',
      'bvn',
      'nin',
      'passport',
      'proof of address',
      'open account',
      'what do i need',
      'required documents',
      'utility bill',
      'address verification',
    ],
    content:
      'To open an account with Novus MFB, the general account-opening requirements are:\n\n1. NIN Slip\n2. 1 Passport Photograph\n3. Utility Bill or any means of address verification\n\nThese are the general requirements stated on our flyer. Additional requirements may apply for specific account packages (Personal, Students, Beta-Pikin, Salary, Cooperatives, eBam, Corporate). If you tell me which account package you want, I can clarify.',
  },
  {
    slug: 'application-status',
    title: 'Checking the status of an application',
    category: 'Accounts',
    keywords: ['application', 'status', 'pending', 'review', 'approved', 'still waiting', 'how long', 'track application', 'application status'],
    content:
      'I cannot see individual applications from this chat, so I will not guess at a timeline. If you tell me when you applied and which step you reached, I can explain what usually happens next, or I can pass your details to a support agent who can check the application properly.',
    placeholder: true,
  },
  {
    slug: 'email-verification',
    title: 'Verifying your email or phone number',
    category: 'Accounts',
    keywords: ['verify', 'verification', 'email link', 'otp not received', 'code', 'confirm', 'verify phone', 'verification code'],
    content:
      'Verification links and one-time codes are time-limited. Check your spam or promotions folder, make sure your phone has signal, and request a new code if the old one has expired. Never forward a code to anyone — our team will never ask you for it. If codes still do not arrive, I can pass this to a support agent.',
  },
  {
    slug: 'login-help',
    title: 'Trouble signing in',
    category: 'Accounts',
    keywords: ['login', 'log in', 'sign in', 'cannot login', "can't login", 'unable to login', 'locked out', 'password', 'account locked', 'app not working'],
    content:
      'If you cannot sign in, first check that you are using the email address you registered with and that caps lock is off. Use "Forgot password?" to reset your password. I will never ask you for your password or a one-time code. If the reset does not work, I can escalate this for you.',
  },
  {
    slug: 'password-reset',
    title: 'Resetting your password',
    category: 'Accounts',
    keywords: ['forgot password', 'reset', 'change password', 'new password', 'recover', 'cannot remember password'],
    content:
      'Open the sign-in page and choose "Forgot password?". Enter the email address on your account and follow the link that is sent to you. The link expires after a short time, so use it promptly. If you do not receive it, check your spam folder before requesting another one.',
  },
  {
    slug: 'transfer-pending',
    title: 'A transfer is pending or not received',
    category: 'Transfers',
    keywords: [
      'transfer',
      'pending',
      'debited',
      'not received',
      'failed',
      'stuck',
      'delayed',
      'money left',
      'not credited',
      'not reflecting',
      'not showing',
      'money not showing',
      'where is my money',
      'delayed transfer',
    ],
    content:
      'I am sorry you are having trouble with a transfer. To help, I need to know: was the money debited from your account, or were you unable to start the transfer? Please have your transaction reference or receipt ready. For your safety, never share your PIN, OTP, password or full card details.',
  },
  {
    slug: 'failed-transfer',
    title: 'A transfer failed or was reversed',
    category: 'Transfers',
    keywords: ['reversed', 'refund', 'did not go through', 'declined transfer', 'returned', 'chargeback', 'failed transfer', 'transfer failed', 'money returned'],
    content:
      'When a transfer fails, the money normally returns to the sending account automatically, but the timing depends on the banks involved and cannot be promised here. Keep your transaction reference and the exact time of the attempt. I can pass these details to a support agent so the transaction can be traced.',
  },
  {
    slug: 'transfer-limits',
    title: 'Transfer limits and fees',
    category: 'Transfers',
    keywords: ['limit', 'limits', 'fee', 'fees', 'charges', 'how much can i send', 'daily limit', 'tariff', 'transfer fee'],
    content:
      'Transfer limits and fees are set by the bank and are not published on this site yet, so I will not quote a figure that might be wrong. The applicable limit and any fee are shown before you confirm a transfer. For the current published terms, I can ask a support agent to confirm them in writing.',
    placeholder: true,
  },
  {
    slug: 'card-order',
    title: 'Ordering a Novus debit card',
    category: 'Cards',
    keywords: ['order card', 'new card', 'debit card', 'request card', 'card delivery', 'card fee'],
    content:
      'Card products, delivery times and fees are still being finalised, so I cannot confirm them yet. Once cards are available you will be able to request one from your account area. I can pass your interest to the team so you are contacted when card requests open.',
    placeholder: true,
  },
  {
    slug: 'card-lost',
    title: 'Card lost, stolen or blocked',
    category: 'Cards',
    keywords: ['card', 'lost', 'stolen', 'blocked', 'block card', 'lock card', 'atm', 'swallowed', 'lost my card', 'stolen card', 'block my card', 'freeze card'],
    content:
      'If your card is lost or stolen, please ask me to escalate immediately so a support agent can help you lock it. Do not share your full card number, PIN or OTP with anyone. If the card was swallowed by an ATM, keep the machine location and time — that helps the team trace it.',
  },
  {
    slug: 'card-declined',
    title: 'Card payment declined',
    category: 'Cards',
    keywords: ['declined', 'card not working', 'payment failed', 'insufficient', 'pos', 'online payment', 'card declined', 'why was my card declined'],
    content:
      'A declined payment can be caused by an inactive card, a limit, or a temporary problem with the terminal or merchant. Check that the card is active and that the merchant accepts it, then try once more. If it keeps failing, tell me what you were buying and I can pass the details to a support agent.',
  },
  {
    slug: 'savings-products',
    title: 'Account and savings packages',
    category: 'Products',
    keywords: [
      'savings',
      'save',
      'account',
      'accounts',
      'account types',
      'account packages',
      'personal account',
      'personal',
      'student account',
      'students',
      'student',
      'beta pikin',
      'beta',
      'pikin',
      'salary account',
      'salary',
      'cooperatives',
      'cooperative',
      'ebam',
      'corporate account',
      'corporate',
      'business account',
      'business',
      'sme',
      'goal',
      'plan',
      'target savings',
      'fixed deposit',
    ],
    content:
      'Novus MFB has seven account packages:\n\n• Personal — an everyday account for individuals.\n• Students — for students managing allowances, tuition and daily expenses.\n• Beta-Pikin — for children, opened and managed by a parent or guardian.\n• Salary — for employees who want their salary paid into a Novus account.\n• Cooperatives — for cooperative societies and groups.\n• eBam — a digital-first account managed online.\n• Corporate — for registered businesses.\n\nExact requirements, rates and terms are confirmed during application. Which package would you like to know more about?',
  },
  {
    slug: 'loan-enquiry',
    title: 'Loan enquiries',
    category: 'Products',
    keywords: ['loan', 'borrow', 'credit', 'lending', 'eligibility', 'repayment', 'collateral', 'apply for loan', 'loan package', 'loan packages', 'agriculture', 'nmsme', 'nmsmes', 'side hustle', 'mypikin', 'asset financing', 'micro housing', 'urgent 2k', 'fuel4me', 'self help group', 'private sector', 'federal business', 'business loan', 'salary loan', 'student loan', 'emergency loan'],
    content:
      'Novus MFB offers various loan packages including Agriculture, nMSMEs, Side Hustle, MyPikin Fees, Asset Financing, Micro-Housing, Urgent 2k, Fuel4Me, Self-Help Group Lending, Private Sector Business, and Federal Business.\n\nGeneral loan-request requirements (as stated on our flyer):\n\n1. Duly completed Loan Agreement Form (LAF)\n2. First Appointment Letter\n3. Confirmation or Last Promotion Letter\n4. Staff ID Card\n5. 1 Passport Photograph\n6. 3 Months Bank Statement\n\nThese are general requirements; specific documents may vary by loan package. Which loan package are you interested in?',
  },
  {
    slug: 'app-and-ussd',
    title: 'Mobile app and USSD',
    category: 'Digital',
    keywords: ['app', 'android', 'ios', 'download', 'play store', 'app store', 'ussd', 'code', 'mobile', 'mobile app', 'download app', 'banking app'],
    content:
      'The Novus MFB mobile app has not been published yet, so there is no download link or USSD code I can give you. Everything currently available can be done on this website. When the app and USSD service launch, the download links and codes will be published here.',
    placeholder: true,
  },
  {
    slug: 'branches',
    title: 'Branches and head office',
    category: 'Contact',
    keywords: ['branch', 'branches', 'office', 'address', 'location', 'headquarters', 'hq', 'where are you', 'atm', 'nearest branch', 'branch locator'],
    content:
      'Novus Microfinance Bank Head Office: Plot BNA 10558, New Bridge Road, Makurdi, Benue State. For more details, please visit our Contact page.',
  },
  {
    slug: 'contact-support',
    title: 'Contacting support',
    category: 'Contact',
    keywords: [
      'contact',
      'phone',
      'hotline',
      'call',
      'email',
      'whatsapp',
      'support hours',
      'speak to support',
      'speak to someone',
    ],
    content:
      'You can reach Novus MFB through:\n\n- Telephone: 07066887632\n- Telephone: 08122220105\n- Email: info@novusmfb.com\n- Customer-service centre: Makurdi\n- Contact form: /contact\n- Report an issue: /report\n\nSupport hours: Monday to Friday, 8:00am to 6:00pm (WAT).',
  },
  {
    slug: 'report-complaint',
    title: 'How to report a complaint',
    category: 'Support',
    keywords: ['complaint', 'report', 'issue', 'problem', 'escalate', 'unhappy', 'feedback', 'complain', 'log complaint', 'unresolved', 'poor service'],
    content:
      'You can report a complaint through the contact form on this website, by emailing info@novusmfb.com, or by calling the support line during support hours. Tell me what happened and I can point you to the right next step. Online ticket tracking is not live yet, so I cannot give you a tracking reference from this chat. Keep any transaction references or screenshots safe.',
  },
  {
    slug: 'speak-to-human',
    title: 'Speaking to a human agent',
    category: 'Support',
    keywords: ['human', 'agent', 'person', 'someone', 'representative', 'escalate', 'real person', 'customer care', 'talk to a person', 'chat with human', 'human being'],
    content:
      'Of course — I can point you to the right team. Nova cannot transfer you to a live agent from this chat, but the support team can be reached by email at info@novusmfb.com, through the contact form, or by phone during support hours (Monday to Friday, 8:00am to 6:00pm WAT).\n\nIf you tell me what the issue is, I can give you the most useful next step first.',
  },
  {
    slug: 'fraud-phishing',
    title: 'Suspected fraud, scam or phishing',
    category: 'Security',
    keywords: [
      'fraud',
      'scam',
      'phishing',
      'fake',
      'suspicious',
      'someone called',
      'sms link',
      'hacked',
      'unauthorised',
      'unauthorized',
      'someone used my account',
      'otp',
      'stolen money',
      'account hacked',
    ],
    content:
      'Please treat this as urgent. Do not click links in unexpected messages, and never share your PIN, OTP, password or full card details — even with someone who says they are from Novus MFB. Tell me what happened and I will escalate it so the team can help you secure your account.',
  },
  {
    slug: 'security-guidance',
    title: 'Keeping your account safe',
    category: 'Security',
    keywords: ['security', 'safe', 'password', 'pin', 'otp', 'protect', 'two factor', '2fa'],
    content:
      'Never share your PIN, OTP, password or full card details with anyone — including anyone claiming to be from Novus MFB. We will never ask for these. Use a unique password, keep your phone and email secure, and report anything suspicious here straight away.',
  },
  {
    slug: 'data-privacy',
    title: 'How your data is used',
    category: 'Security',
    keywords: ['privacy', 'data', 'gdpr', 'ndpa', 'data protection', 'personal information', 'consent', 'delete my data'],
    content:
      'We only ask for the information needed to respond to you and to provide the service you request. The full privacy notice and data-retention terms are being finalised and will be published before launch. I can pass a specific data request to the team so it is handled properly.',
    placeholder: true,
  },
  {
    slug: 'rates-and-fees',
    title: 'Interest rates, fees and product terms',
    category: 'Products',
    keywords: ['rate', 'interest rate', 'fees', 'charges', 'pricing', 'tariff', 'terms', 'interest', 'how much', 'account maintenance fee'],
    content:
      'Rates, fees and product terms are set by the bank, and I will not quote figures that have not been verified and published. Any applicable charge is shown before you confirm a transaction. For current published terms, I can ask a support agent to send them to you in writing.',
    placeholder: true,
  },
  {
    slug: 'deposit-insurance',
    title: 'Licence and deposit insurance',
    category: 'Company',
    keywords: ['licence', 'license', 'cbn', 'ndic', 'ndic insured', 'insured', 'insurance', 'regulated', 'regulation'],
    content:
      'Regulatory and deposit-insurance statements are only published once they have been verified by the bank, and I will not improvise them. The verified wording will appear on this website before launch. If you need confirmation for a specific purpose, I can ask the team to provide it.',
    placeholder: true,
  },
  {
    slug: 'languages',
    title: 'Languages Nova understands',
    category: 'Support',
    keywords: ['language', 'english', 'pidgin', 'yoruba', 'igbo', 'hausa', 'translate', 'speak'],
    content:
      'You can chat with me in English, Nigerian Pidgin, Yoruba, Igbo or Hausa. I will reply in the language I detect, and you can simply switch language at any point in the conversation.',
  },
  {
    slug: 'whistleblowing',
    title: 'Whistleblowing',
    category: 'Company',
    keywords: ['whistleblowing', 'whistleblower', 'report misconduct', 'corruption', 'anonymous report'],
    content:
      'If you need to report misconduct, please use the contact form and mark your message "Whistleblowing" or use the Report an Issue page (/report).',
  },
  {
    slug: 'careers',
    title: 'Careers at Novus MFB',
    category: 'Company',
    keywords: ['career', 'careers', 'job', 'jobs', 'vacancy', 'vacancies', 'apply', 'recruitment', 'hiring', 'work with you'],
    content:
      'Open roles are listed on the careers page. If nothing suitable is listed today, you can still send an introduction through the contact form and the team will keep it on file. I cannot review applications or confirm hiring decisions in chat.',
  },
  {
    slug: 'accessibility',
    title: 'Accessibility support',
    category: 'Support',
    keywords: ['accessibility', 'disability', 'screen reader', 'blind', 'deaf', 'large text', 'keyboard'],
    content:
      'This website is built to work with a keyboard, screen readers and browser zoom. If something is difficult to use, tell me which page and what happened — your feedback goes to the team and helps us fix it. I can also arrange for a support agent to help you complete a task by another route.',
  },
  {
    slug: 'balance-statements',
    title: 'Account balance and statements',
    category: 'Accounts',
    keywords: [
      'balance',
      'account balance',
      'how much do i have',
      'how much is in my account',
      'statement',
      'mini statement',
      'history',
      'transaction history',
      'receipt',
      'download statement',
      'check my balance',
      'see my balance',
      'statement of account',
    ],
    content:
      'This chat cannot see your balance or account records, and I will not guess a figure. Your balance and statements will be available in your account area once sign-in is live. If you need a record urgently, I can pass the request to a support agent who can confirm what is available.',
    placeholder: true,
  },
  {
    slug: 'unauthorised-transaction',
    title: 'Unrecognised or unauthorised transaction',
    category: 'Security',
    keywords: [
      'unauthorised',
      'unauthorized',
      'did not authorise',
      'did not authorize',
      'unknown transaction',
      'someone used my account',
      'dispute',
      'wrong debit',
    ],
    content:
      'Please treat this as urgent. This chat cannot reverse a transaction, but I can escalate it so a support agent can investigate. Keep your transaction reference, the amount and the exact time, and do not share your PIN or OTP with anyone. If your card or phone is missing, tell me so the team can help you secure the account first.',
  },
  {
    slug: 'close-account',
    title: 'Closing an account',
    category: 'Accounts',
    keywords: ['close account', 'cancel account', 'deactivate', 'close my account', 'stop using'],
    content:
      'I cannot close an account from chat. Requests to close an account have to be verified by the bank, so I can pass your request to a support agent who will confirm the steps and any conditions that apply. Please have the email address and phone number on the account ready.',
    placeholder: true,
  },
  {
    slug: 'update-details',
    title: 'Updating your personal details',
    category: 'Accounts',
    keywords: [
      'change phone',
      'change phone number',
      'update email',
      'change email',
      'change address',
      'update my details',
      'wrong name',
      'update profile',
    ],
    content:
      'Changes to the phone number, email address or name on an account must be verified before they are applied, so this chat cannot make them directly. Tell me which detail needs to change and I can pass the request to a support agent who will explain what evidence is needed.',
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* Retrieval                                                          */
/* ------------------------------------------------------------------ */

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'are',
  'but',
  'not',
  'you',
  'your',
  'can',
  'how',
  'what',
  'when',
  'where',
  'why',
  'who',
  'with',
  'have',
  'has',
  'was',
  'were',
  'this',
  'that',
  'there',
  'their',
  'from',
  'about',
  'into',
  'does',
  'did',
  'his',
  'her',
  'its',
  'our',
  'out',
  'get',
  'got',
  'any',
  'all',
  'would',
  'could',
  'should',
  'please',
  'want',
  'need',
  'know',
  'tell',
  'give',
  'make',
  'just',
  'still',
  'been',
  'being',
]);

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenise(text: string): string[] {
  return normalise(text)
    .split(' ')
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

/** Light plural/gerund folding so "cards" and "saving" match "card"/"save". */
function stem(word: string): string {
  if (word.length > 6 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 5 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith('s')) return word.slice(0, -1);
  return word;
}

/**
 * Everyday words customers use instead of the wording in the knowledge base.
 * Only single words belong here; multi-word phrases are handled by keywords.
 */
const SYNONYM_GROUPS: string[][] = [
  ['money', 'funds', 'cash'],
  ['transfer', 'send', 'payment', 'remit'],
  ['debited', 'charged', 'deducted'],
  ['pending', 'delayed', 'stuck', 'processing'],
  ['failed', 'reversed', 'refund', 'returned'],
  ['card', 'atm', 'debit'],
  ['login', 'signin', 'sign', 'access'],
  ['loan', 'borrow', 'credit', 'lending'],
  ['savings', 'save', 'saving'],
  ['charges', 'fees', 'cost', 'pricing'],
  ['complaint', 'complain', 'grievance'],
  ['fraud', 'scam', 'hacked', 'unauthorised', 'unauthorized'],
  ['human', 'agent', 'person', 'representative'],
  ['app', 'mobile', 'android', 'ios'],
  ['statement', 'history', 'record'],
  ['block', 'freeze', 'lock', 'stop'],
  ['open', 'create', 'register', 'onboard'],
  ['close', 'cancel', 'deactivate'],
  ['address', 'location', 'branch'],
  ['code', 'otp'],
  ['bvn', 'nin', 'id'],
  ['business', 'corporate', 'sme', 'company'],
  ['student', 'school'],
  ['kid', 'child', 'children'],
  ['salary', 'payroll'],
  ['lost', 'stolen', 'missing'],
  ['declined', 'rejected'],
  ['rate', 'interest'],
];

const SYNONYMS = new Map<string, Set<string>>();
for (const group of SYNONYM_GROUPS) {
  for (const word of group) {
    const key = stem(normalise(word));
    const family = SYNONYMS.get(key) ?? new Set<string>();
    for (const sibling of group) family.add(stem(normalise(sibling)));
    SYNONYMS.set(key, family);
  }
}

function expandToken(token: string): string[] {
  const family = SYNONYMS.get(token);
  return family ? Array.from(family) : [token];
}

/** True when two words are at most one typo apart (for common misspellings). */
function isNearMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1 || a.length < 5 || b.length < 5) return false;

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }

  return edits + (a.length - i) + (b.length - j) <= 1;
}

/**
 * Scores one entry against a query.
 *
 * Phrase keywords ("not received") outweigh single words, title overlap adds
 * context, and the category gives a small boost. Synonyms and one-typo
 * tolerance keep the matcher useful without a search dependency.
 */
export function scoreEntry(entry: KnowledgeEntry, query: string): number {
  const normalisedQuery = normalise(query);
  const queryTokens = tokenise(query).map(stem);
  const querySet = new Set(queryTokens);
  const expanded = new Set<string>();
  for (const token of querySet) {
    for (const variant of expandToken(token)) expanded.add(variant);
  }

  let score = 0;

  for (const keyword of entry.keywords) {
    const normalisedKeyword = normalise(keyword);

    if (normalisedKeyword.includes(' ')) {
      if (normalisedQuery.includes(normalisedKeyword)) {
        score += 14 + Math.min(normalisedKeyword.length, 30);
      }
      continue;
    }

    const keywordStem = stem(normalisedKeyword);
    if (querySet.has(keywordStem)) {
      score += 9 + Math.min(keywordStem.length, 20);
      continue;
    }
    if (expanded.has(keywordStem)) {
      score += 5 + Math.min(keywordStem.length, 20) / 2;
      continue;
    }
    if (queryTokens.some((token) => isNearMatch(token, keywordStem))) {
      score += 4;
    }
  }

  const titleTokens = new Set(tokenise(entry.title).map(stem));
  for (const token of querySet) {
    if (titleTokens.has(token)) score += 4;
  }

  if (normalisedQuery.includes(normalise(entry.category))) score += 2;

  return Math.round(score * 10) / 10;
}

export interface ScoredKnowledgeEntry {
  entry: KnowledgeEntry;
  score: number;
}

/** Retrieval with the score kept, so callers can apply a confidence threshold. */
export function retrieveScoredKnowledge(query: string, limit = 3): ScoredKnowledgeEntry[] {
  return DEFAULT_KNOWLEDGE_BASE.map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.slug.localeCompare(b.entry.slug))
    .slice(0, limit);
}

export function retrieveKnowledge(query: string, limit = 3): KnowledgeEntry[] {
  return retrieveScoredKnowledge(query, limit).map((item) => item.entry);
}

/** Best single match, used to answer directly when no LLM is configured. */
export function findBestKnowledge(query: string): KnowledgeEntry | undefined {
  return retrieveKnowledge(query, 1)[0];
}

export type KnowledgeConfidence = 'high' | 'medium' | 'low';

export function confidenceFor(score: number): KnowledgeConfidence {
  if (score >= 16) return 'high';
  if (score >= 8) return 'medium';
  return 'low';
}
