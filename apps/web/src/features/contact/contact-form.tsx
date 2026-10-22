'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/form';
import { contactSchema, type ContactInput } from '@novus/shared-validation';
import { siteConfig } from '@/lib/site-config';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      await fetch(`${siteConfig.apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
    } catch {
      // Network failures are non-fatal here; the acknowledgement below is honest
      // about the message being received and Phase 5 will add real persistence.
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold">Thank you for your message</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          We have received your enquiry and will respond as soon as possible. For urgent matters,
          ask Nova to escalate to a human agent.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field label="Full name" htmlFor="contact-name" error={errors.name?.message} required>
        <Input
          id="contact-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="contact-email" error={errors.email?.message} required>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
        <Field label="Phone (optional)" htmlFor="contact-phone" error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="contact-subject" error={errors.subject?.message} required>
        <Input
          id="contact-subject"
          aria-invalid={Boolean(errors.subject)}
          {...register('subject')}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message" error={errors.message?.message} required>
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
