import type { Metadata } from 'next';
import { AuthShell } from '@/components/layout/auth-shell';
import { ForgotPasswordForm } from '@/features/auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Reset your Novus MFB account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email address and we will send you reset instructions."
      footer={null}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
