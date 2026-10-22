import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { FaqSection } from '@/components/sections/faq';
import { CtaSection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Help Centre',
  description: 'Answers to common questions about banking with Novus MFB.',
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help centre"
        title="How can we help?"
        description="Browse common questions below, or ask Nova for an instant answer."
      />
      <FaqSection />
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">Still need help?</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Our support team is ready to assist. Submit a ticket and we will get back to you.
          </p>
          <a
            href="/report"
            className="mt-5 inline-flex h-11 items-center rounded-full bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Report an issue
          </a>
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
