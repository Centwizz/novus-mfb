import type { Metadata } from 'next';
import { CreditCard, RefreshCw, Send, Wallet } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';
import { SmartImage } from '@/components/ui/smart-image';
import { bannerImages, serviceImages } from '@/lib/images';

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
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Savings',
    body: 'Grow your money with flexible savings plans tailored to your goals.',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'e-banking',
    body: 'Bank anytime, anywhere with our convenient and secure e-banking services.',
  },
];

export default function PersonalPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.personal}
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Image: apps/web/public/images/services/personal-banking.jpg */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <SmartImage
              slot={serviceImages.personal}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
            <p className="font-semibold">Placeholder content</p>
            <p className="mt-2 leading-relaxed">
              Specific fees, transaction limits, interest rates and eligibility criteria are not yet
              configured. These will be published once verified by Novus MFB.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading align="left" eyebrow="Requirements" title="Account opening requirements" />
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <p className="mb-4 font-medium text-ink">General requirements (as stated on our flyer):</p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed text-ink-muted">
            <li>NIN Slip</li>
            <li>1 Passport Photograph</li>
            <li>Utility Bill or any means of address verification</li>
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            These are general requirements. Additional requirements may apply for specific account packages.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
