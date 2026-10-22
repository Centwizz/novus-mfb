'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accessible, keyboard-operable accordion.
 *
 * Uses explicit disclosure semantics (button + aria-expanded/aria-controls) rather
 * than <details> so that only one panel is open at a time and screen-reader users
 * get a clear expanded/collapsed announcement.
 */
export function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className={cn('divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-trigger-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-ink transition-colors hover:bg-surface-muted"
              >
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-brand-700">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-ink-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
