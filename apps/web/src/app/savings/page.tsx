import type { Metadata } from 'next';
import { CalendarClock, Lock, Target, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Savings',
  description: 'Flexible savings plans with Novus MFB to help you reach your goals.',
};

const plans = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Goal savings',
    body: 'Set a target, save consistently and track your progress towards what matters to you.',
  },
  {
    icon: <CalendarClock className="h-6 w-6" />,
    title: 'Fixed savings',
    body: 'Lock funds for a set period to build discipline and work towards a fixed return.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Flexible savings',
    body: 'Keep your money accessible while still putting something aside regularly.',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Secure by design',
    body: 'Your savings are protected by the same security engineering as the rest of your account.',
  },
];

export default function SavingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Savings"
        title="Save with purpose, on your terms"
        description="Choose the plan that fits your goals and build your savings steadily over time."
      />

      <Section>
        <SectionHeading align="left" eyebrow="Savings plans" title="Find your fit" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <FeatureCard key={plan.title} icon={plan.icon} title={plan.title}>
              {plan.body}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
          <p className="font-semibold">Placeholder content</p>
          <p className="mt-2 leading-relaxed">
            Interest rates, minimum balances, tenure options and any conditions are not yet
            configured and will only be published once verified by Novus MFB.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
