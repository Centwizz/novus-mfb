import { cn } from '@/lib/cn';
import type { PersonSlot } from '@/lib/images';
import { SmartImage } from './smart-image';

interface PersonCardProps {
  person: PersonSlot;
  /** "board" renders a wider role label; "team" is the same layout, kept explicit. */
  variant?: 'board' | 'team';
  className?: string;
}

/**
 * Profile card for a board member or staff member.
 *
 * Portrait slot is 800x1000 (ratio 4/5) for both variants, so the two sections share
 * identical image proportions, card widths and spacing — satisfying the requirement
 * that Board of Directors and Meet Our Team stay visually consistent.
 *
 * If `person.src` is null or the file is missing, an initials/role avatar is shown
 * instead, so the layout never breaks while real portraits are being gathered.
 */
export function PersonCard({ person, variant = 'board', className }: PersonCardProps) {
  const isPlaceholder = person.isPlaceholder !== false;
  const initials = person.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white',
        'shadow-card transition-shadow duration-200 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative w-full overflow-hidden bg-brand-50">
        {person.src ? (
          <SmartImage
            slot={{
              src: person.src,
              alt: isPlaceholder
                ? `Portrait placeholder for ${person.name}`
                : `Portrait of ${person.name}`,
              width: 800,
              height: 1000,
              aspect: '4 / 5',
              fit: 'cover',
              label: person.label,
            }}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 80vw"
            objectPosition="center top"
            className="h-full w-full"
          />
        ) : (
          <div
            className="flex aspect-[4/5] w-full items-center justify-center bg-brand-50 text-3xl font-bold text-brand-300"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-ink">{person.name}</h3>
        <p
          className={cn(
            'mt-1 text-sm font-medium',
            variant === 'board' ? 'text-brand-700' : 'text-ink-muted',
          )}
        >
          {person.role}
        </p>
        {person.bio ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{person.bio}</p>
        ) : null}

        {/* Honest labelling while these are placeholders. Hidden automatically
            when the entry is marked `isPlaceholder: false`. */}
        {isPlaceholder ? (
          <p className="mt-4 border-t border-border pt-3 text-xs text-ink-subtle">
            Placeholder profile — awaiting details from the bank.
          </p>
        ) : null}
      </div>
    </article>
  );
}
