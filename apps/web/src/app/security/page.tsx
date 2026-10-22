import type { Metadata } from 'next';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How Novus MFB protects your money and data, and what you can do to stay safe.',
};

const protections = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Secure sessions',
    body: 'Your portal session is protected with HTTP-only cookies and never stored in browser storage.',
  },
  {
    icon: <KeyRound className="h-6 w-6" />,
    title: 'Strong password handling',
    body: 'Passwords are hashed with a modern, recognised algorithm. We never store them in plain text.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Fraud monitoring',
    body: 'We use security controls and monitoring to help detect and prevent suspicious activity.',
  },
];

const safetyTips = [
  'Never share your PIN, OTP or password with anyone — including anyone claiming to be from Novus.',
  'Novus will never ask for your full card details in a chat, email or phone call.',
  'Check the URL before entering your details and avoid logging in on shared devices.',
  'If you notice anything unusual, report it immediately through the in-app support or this website.',
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="How we protect you"
        description="Security is built into everything we do. Here is how we protect your account — and how you can help."
      />

      <Section>
        <SectionHeading align="left" eyebrow="Our protections" title="Built with security first" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {protections.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title}>
              {item.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          align="left"
          eyebrow="Stay safe"
          title="What you can do"
          description="A few simple habits go a long way towards keeping your account secure."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {safetyTips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 text-sm leading-relaxed text-ink-muted"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-700"
              />
              {tip}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
