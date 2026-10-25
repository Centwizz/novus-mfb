import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Report an Issue',
  description: 'Report a problem or complaint to Novus MFB.',
};

export default function ReportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Report an issue"
        description="Tell us what went wrong and we will help put it right."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="space-y-3">
            <h2 className="text-lg font-semibold">Ways to report an issue</h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">Contact our team.</strong> Use the{' '}
                <Link href="/contact" className="font-medium text-brand-700 hover:underline">
                  contact form
                </Link>{' '}
                and we will get back to you. Online ticket tracking is part of the support
                portal, which is delivered in a later phase.
              </li>
              <li>
                <strong className="text-ink">Ask Nova.</strong> Use the chat button to describe
                the problem. Nova can point you to the right channel and help you collect the
                details a support agent will need.
              </li>
              <li>
                <strong className="text-ink">Call the hotline.</strong> Once the bank&apos;s
                verified support numbers are published they will appear on the{' '}
                <Link href="/contact" className="font-medium text-brand-700 hover:underline">
                  contact page
                </Link>
                .
              </li>
            </ol>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <h2 className="text-sm font-semibold text-warning">Important</h2>
            <p className="mt-2 text-sm leading-relaxed text-warning">
              Never share your PIN, OTP, password or full card details when reporting an issue. Our
              team will never ask you for these.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
