'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/form';
import { registerSchema, type RegisterInput } from '@novus/shared-validation';
import { apiFetch } from '@/lib/api';

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    setFormError(null);
    const result = await apiFetch<{ redirectTo?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (!result.ok) {
      setFormError(result.error.message);
      return;
    }
    router.push(result.data.redirectTo ?? '/verify-email');
    router.refresh();
  };

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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="reg-first" error={errors.firstName?.message} required>
          <Input
            id="reg-first"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            {...register('firstName')}
          />
        </Field>
        <Field label="Last name" htmlFor="reg-last" error={errors.lastName?.message} required>
          <Input
            id="reg-last"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            {...register('lastName')}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="reg-email" error={errors.email?.message} required>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
      </Field>

      <Field
        label="Phone number"
        htmlFor="reg-phone"
        error={errors.phone?.message}
        hint="e.g. 08012345678"
        required
      >
        <Input
          id="reg-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone')}
        />
      </Field>

      <Field
        label="Password"
        htmlFor="reg-password"
        error={errors.password?.message}
        hint="At least 8 characters with upper, lower and a number."
        required
      >
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />
      </Field>

      <Field
        label="Confirm password"
        htmlFor="reg-confirm"
        error={errors.confirmPassword?.message}
        required
      >
        <Input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
        />
      </Field>

      <div className="flex items-start gap-2">
        <input
          id="reg-terms"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border text-brand-700 focus:ring-brand-700"
          aria-invalid={Boolean(errors.acceptTerms)}
          {...register('acceptTerms')}
        />
        <label htmlFor="reg-terms" className="text-sm text-ink-muted">
          I agree to the{' '}
          <Link href="/terms-and-conditions" className="font-medium text-brand-700 hover:underline">
            Terms &amp; Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="font-medium text-brand-700 hover:underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {errors.acceptTerms ? (
        <p role="alert" className="-mt-3 text-xs font-medium text-danger">
          {errors.acceptTerms.message}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
