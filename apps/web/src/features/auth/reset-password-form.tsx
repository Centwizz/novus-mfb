'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/form';
import { resetPasswordSchema, type ResetPasswordInput } from '@novus/shared-validation';
import { apiFetch } from '@/lib/api';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    setFormError(null);
    const result = await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (!result.ok) {
      setFormError(result.error.message);
      return;
    }
    router.push('/login?reset=1');
  };

  if (!token) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger"
      >
        This reset link is missing or invalid. Please request a new password reset email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {formError ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      ) : null}

      <input type="hidden" {...register('token')} />

      <Field
        label="New password"
        htmlFor="reset-password"
        error={errors.password?.message}
        hint="At least 8 characters with upper, lower and a number."
        required
      >
        <Input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />
      </Field>

      <Field
        label="Confirm new password"
        htmlFor="reset-confirm"
        error={errors.confirmPassword?.message}
        required
      >
        <Input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Updating...' : 'Update password'}
      </Button>
    </form>
  );
}
