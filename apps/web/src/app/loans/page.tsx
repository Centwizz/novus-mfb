import type { Metadata } from 'next';
import { BadgeCheck, Briefcase, Clock, FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Loans',
  description: 'Fair, transparent credit from Novus MFB for individuals and small businesses.',
};

const steps = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: '1. Apply',
    body: 'Tell us how much you need and what it is for through a short, straightforward application.',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: '2. Get assessed',
    body: 'We review your application against clear, documented eligibility criteria.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: '3. Receive a decision',
    body: 'We will keep you informed at every stage and explain the terms in full before you accept.',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'For businesses',
    body: 'Working capital options for small businesses are part of our roadmap and being finalised.',
  },
];

export default function LoansPage() {
  return (
    <>
      <PageHeader
        eyebrow="Loans"
        title="Credit you can understand"
        description="Transparent lending with clear terms — no hidden surprises."
      />

      <Section>
        <SectionHeading align="left" eyebrow="How it works" title="Simple from start to finish" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <FeatureCard key={step.title} icon={step.icon} title={step.title}>
              {step.body}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
          <p className="font-semibold">Placeholder content</p>
          <p className="mt-2 leading-relaxed">
            Loan products, interest rates, tenures, fees and eligibility criteria are not yet
            configured. Nova and this page will only present figures that have been verified and
            approved by Novus MFB.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
