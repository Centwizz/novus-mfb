import type { Metadata } from 'next';
import { BarChart3, Building2, FileSpreadsheet, Users } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';
import { SmartImage } from '@/components/ui/smart-image';
import { bannerImages, serviceImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Business Banking',
  description: 'Accounts and tools from Novus MFB for small businesses and entrepreneurs.',
};

const features = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Business account',
    body: 'A dedicated account for managing business income, expenses and payments.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Multi-user access',
    body: 'Give trusted team members appropriate, role-based access to your business account.',
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6" />,
    title: 'Clear records',
    body: 'Keep track of transactions with a clear, searchable history for easy reconciliation.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Simple insights',
    body: 'Understand how your money moves with straightforward reporting.',
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.business}
        eyebrow="Business banking"
        title="Banking that works as hard as you do"
        description="Practical accounts and tools that help small businesses manage money with confidence."
      />

      <Section>
        <SectionHeading align="left" eyebrow="Built for business" title="Tools that help you grow" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
              {feature.body}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Image: apps/web/public/images/services/business-banking.webp */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <SmartImage
              slot={serviceImages.business}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
            <p className="font-semibold">Placeholder content</p>
            <p className="mt-2 leading-relaxed">
              Business tariffs, account requirements and any product terms are not yet configured and
              will be published once verified by Novus MFB.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
