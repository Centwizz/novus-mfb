import { Section, SectionHeading } from '@/components/ui/section';
import { Accordion } from '@/components/ui/accordion';

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
      'We never ask for your PIN, OTP or full card details in chat, and you should never share them with anyone who contacts you. The full account-security controls will be described here once customer sign-in is live.',
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

      <Accordion items={faqs} className="mx-auto mt-12 max-w-3xl" />
    </Section>
  );
}
