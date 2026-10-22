import type { Metadata } from 'next';
import { CreditCard, RefreshCw, Send, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Personal Banking',
  description:
    'Everyday banking with Novus MFB — accounts, transfers, cards and payments in one place.',
};

const features = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Everyday account',
    body: 'A straightforward account for receiving money, paying bills and managing day-to-day spending.',
  },
  {
    icon: <Send className="h-6 w-6" />,
    title: 'Transfers',
    body: 'Send money to Novus and other Nigerian bank accounts with clear information about limits and fees.',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Debit card',
    body: 'Pay online and in person, and manage your card directly from your secure dashboard.',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Bill payments',
    body: 'Pay airtime, data and other bills quickly from a single, simple interface.',
  },
];

export default function PersonalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal banking"
        title="Banking made simple for everyday life"
        description="Manage your money, pay bills and move funds securely — all from one account."
      />

      <Section>
        <SectionHeading
          align="left"
          eyebrow="What you get"
          title="Everything in one account"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
              {feature.body}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
          <p className="font-semibold">Placeholder content</p>
          <p className="mt-2 leading-relaxed">
            Specific fees, transaction limits, interest rates and eligibility criteria are not yet
            configured. These will be published once verified by Novus MFB.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
