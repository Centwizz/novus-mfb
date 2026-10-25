'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CONSENT_OPEN_EVENT,
  createConsent,
  parseConsent,
  readStoredConsent,
  storeConsent,
} from '@/lib/consent';

/**
 * Cookie / storage notice.
 *
 * Deliberately non-modal: it is a notice, not a gate. It appears only after the
 * stored choice has been read (so returning visitors never see a flash), sits
 * below the Nova launcher's stacking layer, and does not lock scrolling.
 *
 * On phones the action is inset from the right so the floating chat button can
 * never cover it.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (parseConsent(readStoredConsent()) === null) setVisible(true);

    const open = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (!visible) return null;

  const acknowledge = () => {
    storeConsent(createConsent());
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-border bg-white shadow-[0_-8px_30px_rgba(1,0,101,0.12)]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink-muted">
            We use essential cookies and local storage to keep this site secure and to remember
            this choice. No advertising or analytics cookies are set.{' '}
            <Link
              href="/privacy-policy"
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              Read our privacy policy
            </Link>
            .
          </p>
        </div>

        {/*
          The Nova launcher is fixed to the bottom-right and sits above this
          layer. Reserve room on the right at every breakpoint so it can never
          cover the action (96px > the launcher's 76px reach).
        */}
        <div className="flex shrink-0 pr-24">
          <Button size="sm" onClick={acknowledge} className="w-full sm:w-auto">
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
}
