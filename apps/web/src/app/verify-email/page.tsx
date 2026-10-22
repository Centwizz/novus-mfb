import type { Metadata } from 'next';
import { AuthShell } from '@/components/layout/auth-shell';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify your email',
  description: 'Verify your email address to activate your Novus MFB account.',
};

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Check your email"
      subtitle="We have sent a verification link to your email address."
      footer={null}
    >
      <div className="flex flex-col items-center rounded-2xl border border-border bg-surface-muted p-8 text-center">
        <Mail className="h-10 w-10 text-brand-700" aria-hidden="true" />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Click the link in the email to activate your account. If you do not see it, check your
          spam folder. Email delivery requires an email provider to be configured.
        </p>
        <Link
          href="/login"
          className="mt-6 text-sm font-semibold text-brand-700 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
