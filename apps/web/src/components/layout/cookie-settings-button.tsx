'use client';

import { clearStoredConsent, requestConsentOpen } from '@/lib/consent';

/**
 * Re-opens the cookie notice from the footer.
 *
 * Clearing the stored acknowledgement before dispatching the event keeps the
 * UI and storage in agreement: after reopening, the notice behaves exactly as
 * it does on a first visit.
 */
export function CookieSettingsButton() {
  const reopen = () => {
    clearStoredConsent();
    requestConsentOpen();
  };

  return (
    <button
      type="button"
      onClick={reopen}
      className="text-[3.59vw] leading-[3.59vw] text-ink-brand underline underline-offset-2 transition-colors hover:text-brand-700 lg:text-[14px] lg:leading-[20px]"
    >
      Cookie settings
    </button>
  );
}
