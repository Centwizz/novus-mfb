import type { Metadata } from 'next';
import { ShieldCheck, Target, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Novus MFB — our mission to make banking simple, secure and accessible for everyday Nigerians.',
};

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Customer first',
    body: 'Every product and process is designed around what actually helps our customers.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Trust and security',
    body: 'We protect customer data with modern security engineering and transparent practices.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Financial inclusion',
    body: 'We believe everyone deserves access to reliable, affordable financial services.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Banking that puts people first"
        description="Novus MFB is a digital-first microfinance bank built to make everyday banking simpler, safer and more human."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our mission</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              We are building a microfinance bank around the everyday realities of our customers —
              clear pricing, dependable service and technology that just works. Our goal is to make
              banking accessible to individuals and small businesses who have too often been
              overlooked.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              This section will be completed with verified company history, leadership and
              regulatory information supplied by the bank.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-warning">
            <p className="font-semibold">Placeholder content</p>
            <p className="mt-2 leading-relaxed">
              Company history, leadership, registration details and any regulatory statements must
              be verified and provided by Novus MFB before this page is published.
            </p>
          </div>
        </div>
      </Section>
      <Section muted>
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <FeatureCard key={value.title} icon={value.icon} title={value.title}>
              {value.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
