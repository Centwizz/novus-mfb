/**
 * Starter knowledge base for Nova.
 *
 * IMPORTANT: This seed content is intentionally generic and contains NO invented
 * financial figures, rates, fees, regulatory claims or product terms. Product-
 * specific facts must be supplied and approved by Novus MFB and then edited via
 * the admin module (Phase 5) — never hard-coded here as if verified.
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
    slug: 'open-account',
    title: 'How to open a Novus MFB account',
    category: 'Accounts',
    keywords: ['open', 'account', 'register', 'sign up', 'create account', 'onboarding'],
    content:
      'To open a Novus MFB account, choose "Open an account" from the website menu and complete the short form with your name, email and phone number. You will then verify your email or phone number. If you get stuck, reply here and I can walk you through the next step.',
  },
  {
    slug: 'account-requirements',
    title: 'Documents needed to open an account',
    category: 'Accounts',
    keywords: ['documents', 'requirements', 'id', 'identification', 'kyc'],
    content:
      'Account opening typically requires a valid means of identification, a phone number and an email address. The exact requirement list is being finalised and I do not want to give you incorrect information. Would you like me to have a support agent confirm the current list for you?',
    placeholder: true,
  },
  {
    slug: 'transfer-pending',
    title: 'A transfer is pending or not received',
    category: 'Transfers',
    keywords: ['transfer', 'pending', 'debited', 'not received', 'failed', 'stuck'],
    content:
      'I am sorry you are having trouble with a transfer. To help, I need to know: was the money debited from your account, or were you unable to start the transfer? Please have your transaction reference or receipt ready. For your safety, never share your PIN, OTP, password or full card details.',
  },
  {
    slug: 'report-complaint',
    title: 'How to report a complaint',
    category: 'Support',
    keywords: ['complaint', 'report', 'issue', 'problem', 'escalate'],
    content:
      'You can report a complaint by asking me to create a support ticket, which will give you a reference number you can use to track progress. If you would prefer to speak with a person, I can escalate the conversation to a human support agent.',
  },
  {
    slug: 'speak-to-human',
    title: 'Speaking to a human agent',
    category: 'Support',
    keywords: ['human', 'agent', 'person', 'someone', 'representative', 'escalate'],
    content:
      'Of course — I can connect you with a human support agent. If an agent is available they will join this conversation; otherwise I will add your request to the support queue so a member of the team can pick it up. Would you like me to escalate now?',
  },
  {
    slug: 'card-issues',
    title: 'Card not working or lost',
    category: 'Cards',
    keywords: ['card', 'lost', 'stolen', 'blocked', 'declined', 'atm'],
    content:
      'If your card is lost or stolen, please ask me to escalate immediately so a support agent can help you lock it. For declined payments, check that your card is active and has sufficient funds. I will never ask for your PIN, OTP or full card number.',
  },
  {
    slug: 'security-guidance',
    title: 'Keeping your account safe',
    category: 'Security',
    keywords: ['security', 'fraud', 'safe', 'scam', 'phishing', 'password', 'pin', 'otp'],
    content:
      'Never share your PIN, OTP, password or full card details with anyone — including anyone claiming to be from Novus MFB. We will never ask for these. If you suspect fraud, tell me and I will escalate it to our team right away.',
  },
  {
    slug: 'savings-products',
    title: 'Savings products',
    category: 'Products',
    keywords: ['savings', 'save', 'interest', 'goal', 'plan'],
    content:
      'Novus MFB offers savings plans designed to help you set goals and save consistently. The specific rates and conditions are being finalised and I will not guess them. If you tell me what you are saving for, I can explain the plan types, or I can ask an agent to confirm current terms.',
    placeholder: true,
  },
  {
    slug: 'loan-enquiry',
    title: 'Loan enquiries',
    category: 'Products',
    keywords: ['loan', 'borrow', 'credit', 'lending', 'eligibility'],
    content:
      'I can explain how our loan process works: you apply, we assess your application against documented criteria, and we explain the full terms before you accept. I cannot approve loans or quote rates here. Would you like me to have an agent contact you about current loan products?',
    placeholder: true,
  },
];

/**
 * Naive keyword-based retrieval. Deliberately simple and dependency-free for the
 * initial release; a vector store can replace this behind the same interface later
 * once it provides a clear, measured benefit.
 */
export function retrieveKnowledge(query: string, limit = 3): KnowledgeEntry[] {
  const q = query.toLowerCase();
  const scored = DEFAULT_KNOWLEDGE_BASE.map((entry) => {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (q.includes(keyword.toLowerCase())) score += keyword.length;
    }
    if (q.includes(entry.category.toLowerCase())) score += 2;
    return { entry, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((item) => item.entry);
}
