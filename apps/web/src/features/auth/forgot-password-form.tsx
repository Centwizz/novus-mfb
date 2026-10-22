'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/form';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@novus/shared-validation';
import { apiFetch } from '@/lib/api';

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    // Always show the same message to avoid revealing whether an account exists.
    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface-muted p-6 text-sm text-ink-muted"
      >
        If an account exists for that email address, we have sent password reset instructions.
        Please check your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field label="Email" htmlFor="forgot-email" error={errors.email?.message} required>
        <Input
          id="forgot-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Sending...' : 'Send reset instructions'}
      </Button>
    </form>
  );
}
