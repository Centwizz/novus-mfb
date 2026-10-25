'use client';

import type { ReactNode } from 'react';
import { buttonClass } from '@/components/ui/button';

/**
 * Opens the Nova chat panel from anywhere on the site.
 *
 * The launcher lives in the root layout, so a DOM event is used instead of
 * prop-drilling or a global store: any server component can drop this button in
 * and the single chat instance reacts.
 */
export function ChatOpenButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('nova:open'))}
      className={buttonClass({ variant: 'outline', size: 'sm', className })}
    >
      {children}
    </button>
  );
}
