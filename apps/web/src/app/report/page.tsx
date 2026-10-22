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
                <strong className="text-ink">Sign in and open a ticket.</strong> If you have a Novus
                MFB account, log in and create a support ticket so you can track its progress.{' '}
                <Link href="/login" className="font-medium text-brand-700 hover:underline">
                  Log in
                </Link>
              </li>
              <li>
                <strong className="text-ink">Ask Nova.</strong> Use the chat button to describe the
                problem. Nova can create a ticket and escalate to a human agent when needed.
              </li>
              <li>
                <strong className="text-ink">Contact our team.</strong> Use the{' '}
                <Link href="/contact" className="font-medium text-brand-700 hover:underline">
                  contact form
                </Link>{' '}
                if you prefer to reach us directly.
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
