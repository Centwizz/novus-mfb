import type { Metadata } from 'next';
import { Baby, Building2, GraduationCap, Smartphone, User, Users, Wallet } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';
import { SmartImage } from '@/components/ui/smart-image';
import { bannerImages, serviceImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Savings',
  description: 'Flexible savings plans with Novus MFB to help you reach your goals.',
};

const plans = [
  {
    icon: <User className="h-6 w-6" />,
    title: 'Personal',
    body: 'An everyday account for individuals to receive money, make transfers and manage daily spending.',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Students',
    body: 'An account for students to manage allowances, tuition and day-to-day expenses.',
  },
  {
    icon: <Baby className="h-6 w-6" />,
    title: 'Beta-Pikin',
    body: 'An account for children, opened and managed by a parent or guardian to encourage early saving.',
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Salary',
    body: 'For employees who want their salary paid into a Novus account with straightforward access to their money.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Cooperatives',
    body: 'An account for cooperative societies and groups to hold and manage funds contributed by members.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'eBam',
    body: 'A digital-first account for customers who want to open and manage their banking online.',
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Corporate',
    body: 'An account for registered businesses to handle day-to-day payments, collections and operations.',
  },
];

export default function SavingsPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.savings}
        eyebrow="Savings"
        title="Save with purpose, on your terms"
        description="Choose the plan that fits your goals and build your savings steadily over time."
      />

      <Section>
        <SectionHeading align="left" eyebrow="Account Packages" title="Find your fit" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <FeatureCard key={plan.title} icon={plan.icon} title={plan.title}>
              {plan.body}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Image: apps/web/public/images/services/savings.jpg */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <SmartImage
              slot={serviceImages.savings}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
            <p className="font-semibold">Placeholder content</p>
            <p className="mt-2 leading-relaxed">
              Interest rates, minimum balances, tenure options and any conditions are not yet
              configured and will only be published once verified by Novus MFB.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
