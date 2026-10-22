import { Lock, ShieldCheck, Smartphone } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Fraud protection',
    body: 'Security controls, monitoring and clear guidance to help keep your account and data safe.',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Secure sessions',
    body: 'Your portal session is protected with secure cookies and never stored in browser storage.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Account safety tools',
    body: 'Lock your card, review activity and reach support quickly if something looks wrong.',
  },
];

export function SecuritySection() {
  return (
    <Section id="security" muted>
      <SectionHeading
        eyebrow="Security & privacy"
        title="Your security is our priority"
        description="Novus MFB is built with security-first engineering. We never ask for your PIN, OTP or full card details."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
            {feature.body}
          </FeatureCard>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm text-warning">
        Regulatory and insurance details will be published here once verified by the bank. No
        licence, insurance or regulatory claim is made until confirmed.
      </p>
    </Section>
  );
}