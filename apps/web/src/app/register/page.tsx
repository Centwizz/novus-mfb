import type { Metadata } from 'next';
import { AuthShell } from '@/components/layout/auth-shell';
import { RegisterForm } from '@/features/auth/register-form';

export const metadata: Metadata = {
  title: 'Open an account',
  description: 'Open your Novus MFB account in minutes.',
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Open your account"
      subtitle="It only takes a few minutes. You will verify your email next."
      footer={null}
    >
      <RegisterForm />
    </AuthShell>
  );
}
