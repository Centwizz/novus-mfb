import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { CtaSection } from '@/components/sections/cta';
import { SmartImage } from '@/components/ui/smart-image';
import { bannerImages, serviceImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Loans',
  description: 'Fair, transparent credit from Novus MFB for individuals and small businesses.',
};

const loanPackages = [
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
        <SectionHeading align="left" eyebrow="Loan Packages" title="Simple from start to finish" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loanPackages.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <span className="font-medium text-ink">{item}</span>
            </div>
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

      <CtaSection />
    </>
  );
}
