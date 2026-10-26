import Link from 'next/link';
import { cn } from '@/lib/cn';
import { SmartImage } from '@/components/ui/smart-image';
import { homeImages, type ImageSlot } from '@/lib/images';

/**
 * "Our Services" — reconstructed from the reference's actual layout.
 *
 * The reference is NOT a card grid. It is three stacked, full-width rows, each with a
 * solid colour background spanning the viewport, text on one side and a large
 * photograph on the other. Row 2 is reversed and uses a light background with coloured
 * text; rows 1 and 3 are solid colour with white text.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .pc-section-title:  font-size 3.1vw (~45px), weight 600, padding-left 5.69vw, left-aligned
 *   - .pc-service-flex:   padding 0 5.6vw 0 5.69vw, align-items center
 *   - .reverse:           flex-direction row-reverse
 *   - .pc-service-text:   width 41.7vw (~600px)
 *   - .pc-service-title:  font-size 2.78vw (~40px), weight 700, letter-spacing .1vw, line-height 3.47vw
 *   - .pc-service-description: 1.56vw (~22px), width 33.7vw (~485px), margin-top 16px
 *   - .pc-service-image-wrapper: aspect-ratio 622/455, width 43.8vw (~631px),
 *                                border-radius 1vw, margin 4.43vw 0 4.43vw 56px
 *   - .pc-service-subdescription: .9vw (~13px), italic, opacity .8
 */

interface Service {
  title: string;
  description: string;
  note?: string;
  href: string;
  linkLabel: string;
  /** Solid panel background for this row. */
  panel: 'solid' | 'light';
  /** Image slot from the central manifest. */
  image: ImageSlot;
  /** Puts the image on the left and the text on the right (reference row 2). */
  reversed?: boolean;
}

const services: Service[] = [
  {
    title: 'Fund your account, make transfers, pay bills',
    description:
      'Move money between Novus accounts and other Nigerian banks, and pay your bills from one place. Applicable limits and any fees are always shown before you confirm.',
    note: '*Transfer limits, fees and other restrictions may apply. Current terms will be published before launch.',
    href: '/personal',
    linkLabel: 'Personal banking',
    panel: 'solid',
    image: homeImages.serviceTransfers,
  },
  {
    title: 'Novus debit cards, your passport to everyday payments',
    description:
      'Use your Novus card at ATMs, POS terminals and online payment platforms in Nigeria. Card products, fees and availability are being finalised and will be published once confirmed.',
    href: '/personal',
    linkLabel: 'Cards & payments',
    panel: 'light',
    image: homeImages.serviceCard,
    reversed: true,
  },
  {
    title: 'Novus Savings',
    description:
      'Set savings targets, automate contributions and keep full access to your money while you work towards your goals. Interest terms will be published only once they are verified.',
    href: '/savings',
    linkLabel: 'Explore savings',
    panel: 'solid',
    image: homeImages.serviceSavings,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full">
      <h2 className="pb-[2.6vw] pt-[4vw] pl-[5.69vw] text-left text-[7vw] font-semibold leading-tight text-ink-brand lg:pb-[2.6vw] lg:pl-[5.69vw] lg:pt-[2.5vw] lg:text-[3.1vw] lg:leading-[4.17vw]">
        Our Services
      </h2>

      {services.map((service) => (
        <ServiceRow key={service.title} service={service} />
      ))}
    </section>
  );
}

function ServiceRow({ service }: { service: Service }) {
  const isSolid = service.panel === 'solid';
  // Row 2 (the debit-card panel) is the reversed one in the reference. This is
  // an explicit flag: comparing image object identity broke silently whenever
  // the manifest entry was re-created.
  const reversed = service.reversed === true;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Full-width colour panel behind the row. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 h-full w-full',
          isSolid ? 'bg-brand-700' : 'bg-brand-50',
        )}
      />

      <div
        className={cn(
          'relative flex w-full flex-col items-center justify-between gap-6 px-[5.69vw] py-10',
          'lg:gap-0 lg:py-0 lg:pr-[5.6vw] lg:pl-[5.69vw]',
          reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        {/* Text column */}
        <div className="relative w-full lg:w-[41.7vw]">
          <h3
            className={cn(
              'text-[6.5vw] font-bold leading-tight tracking-tight lg:text-[2.78vw] lg:leading-[3.47vw] lg:tracking-[0.1vw]',
              isSolid ? 'text-white' : 'text-brand-700',
            )}
          >
            {service.title}
          </h3>

          <p
            className={cn(
              'mt-4 w-full text-[3.6vw] leading-relaxed lg:w-[33.7vw] lg:text-[1.56vw] lg:leading-[2.43vw]',
              isSolid ? 'text-white' : 'text-ink-brand',
            )}
          >
            {service.description}
          </p>

          {service.note ? (
            <p
              className={cn(
                'mt-2.5 w-full text-[2.8vw] italic leading-snug opacity-80 lg:w-[33.7vw] lg:text-[max(12px,0.9vw)]',
                isSolid ? 'text-white' : 'text-ink-muted',
              )}
            >
              {service.note}
            </p>
          ) : null}

          <Link
            href={service.href}
            className={cn(
              'mt-6 inline-flex items-center gap-1.5 text-[3.4vw] font-semibold underline underline-offset-4 transition-opacity hover:opacity-80 lg:text-[max(13px,1vw)]',
              isSolid ? 'text-white' : 'text-brand-700',
            )}
          >
            {service.linkLabel}
          </Link>
        </div>

        {/* Image column — exact reference aspect ratio and dimensions.
            Source file: apps/web/public/images/home/{services,debit-card,savings}.jpg */}
        <div className="w-full shrink-0 overflow-hidden rounded-[2vw] lg:my-[4.43vw] lg:ml-[56px] lg:w-[43.8vw] lg:rounded-[1vw]">
          <div className="aspect-[622/455] w-full">
            <SmartImage
              slot={service.image}
              sizes="(min-width: 1024px) 44vw, 90vw"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
