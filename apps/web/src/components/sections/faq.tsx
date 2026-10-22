import { Section, SectionHeading } from '@/components/ui/section';

const faqs = [
  {
    question: 'How do I open a Novus MFB account?',
    answer:
      'Choose "Open an account" from the menu, complete the short form and verify your email or phone number. You will be guided through each step and can reach Nova or our support team at any point.',
  },
  {
    question: 'What do I need to open an account?',
    answer:
      'You will typically need a valid means of identification, a phone number and an email address. The exact requirements are being finalised and will be published here once confirmed by the bank.',
  },
  {
    question: 'Is my information safe?',
    answer:
      'Yes. We use secure, HTTP-only sessions, encrypt data in transit, validate every request and never ask for your PIN, OTP or full card details in chat.',
  },
  {
    question: 'Can Nova perform transactions for me?',
    answer:
      'No. Nova is a customer-service assistant. It can answer questions, help you report an issue and escalate to a human agent, but it cannot move money or change your account.',
  },
  {
    question: 'How do I speak to a human agent?',
    answer:
      'Ask Nova to speak to a person, or submit a support ticket. If a human agent is not immediately available, we will queue your message and keep you informed.',
  },
];

export function FaqSection() {
  return (
    <Section id="faq" muted>
      <SectionHeading
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Quick answers to the questions we hear most often."
      />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-semibold hover:bg-surface-muted">
              {faq.question}
              <span
                aria-hidden="true"
                className="text-brand-700 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
