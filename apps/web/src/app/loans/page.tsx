import type { Metadata } from 'next';
import { BadgeCheck, Briefcase, Clock, FileText } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';
import { SmartImage } from '@/components/ui/smart-image';
import { bannerImages, serviceImages } from '@/lib/images';

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
      <PageBanner
        slot={bannerImages.loans}
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Image: apps/web/public/images/services/loans.jpg */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <SmartImage
              slot={serviceImages.loans}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
            <p className="font-semibold">Placeholder content</p>
            <p className="mt-2 leading-relaxed">
              Loan products, interest rates, tenures, fees and eligibility criteria are not yet
              configured. Nova and this page will only present figures that have been verified and
              approved by Novus MFB.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading align="left" eyebrow="Loan packages" title="Our loan offerings" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Agriculture',
            'nMSMEs',
            'Side Hustle',
            'MyPikin Fees',
            'Asset Financing',
            'Micro-Housing',
            'Urgent 2k',
            'Fuel4Me',
            'Self-Help Group Lending',
            'Private Sector Business',
            'Federal Business',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-surface p-4 shadow-card">
              <span className="font-medium text-ink">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading align="left" eyebrow="Requirements" title="Loan request requirements" />
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <p className="mb-4 font-medium text-ink">General loan-request requirements (as stated on our flyer):</p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed text-ink-muted">
            <li>Duly completed Loan Agreement Form (LAF)</li>
            <li>First Appointment Letter</li>
            <li>Confirmation or Last Promotion Letter</li>
            <li>Staff ID Card</li>
            <li>1 Passport Photograph</li>
            <li>3 Months Bank Statement</li>
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            These are general requirements. Specific documents may vary by loan package.
          </p>
        </div>
      </Section>
      </Section>

      <CtaSection />
    </>
  );
}
