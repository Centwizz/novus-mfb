import type { Metadata } from 'next';
import { AuthShell } from '@/components/layout/auth-shell';
import { LoginForm } from '@/features/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Novus MFB account.',
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your account and get support."
      footer={null}
    >
      <LoginForm />
    </AuthShell>
  );
}
