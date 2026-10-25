import type { PersonSlot } from '@/lib/images';
import { Carousel } from '@/components/ui/carousel';
import { PersonCard } from '@/components/ui/person-card';

interface PeopleCarouselProps {
  /** Section id, used for in-page anchors. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  people: PersonSlot[];
  variant?: 'board' | 'team';
  /** Accessible carousel name. */
  label: string;
}

/**
 * Shared people section used by BOTH "Meet Our Board of Directors" and
 * "Meet Our Team".
 *
 * Using one component guarantees the two sections cannot drift apart in
 * typography, spacing, card size, image proportions or carousel behaviour.
 *
 * Slides are sized as a fraction of the track so exactly `visible` cards fit at each
 * breakpoint (3 on desktop, 2 on tablet, 1 on mobile) — no horizontal overflow.
 */
export function PeopleCarousel({
  id,
  eyebrow,
  title,
  description,
  people,
  variant = 'board',
  label,
}: PeopleCarouselProps) {
  if (people.length === 0) return null;

  return (
    <section id={id} className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p>
          ) : null}
        </div>

        <div className="mt-10">
          <Carousel label={label} count={people.length} perView={{ base: 1, sm: 2, lg: 3 }}>
            {people.map((person) => (
              // Each slide is 1/visible of the track. The track width is set by the
              // carousel to (count / visible) * 100%, so this /count gives one card.
              <div
                key={person.label}
                className="shrink-0 px-3 first:pl-0 last:pr-0"
                style={{ width: `${100 / people.length}%` }}
              >
                <PersonCard person={person} variant={variant} />
              </div>
            ))}
          </Carousel>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-ink-subtle">
          Profiles shown are placeholders. Names, roles and photographs will be published only after
          the bank supplies and approves them.
        </p>
      </div>
    </section>
  );
}
