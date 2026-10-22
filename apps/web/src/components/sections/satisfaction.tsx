import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { SatisfactionVideoArt } from './satisfaction-video-art';

/**
 * "Customer Satisfaction, Our Priority" — present in the reference, missing before.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .satisfaction-flex:  flex-direction row, padding 0 5.65vw
 *   - .satisfaction-text:  left column, word-wrap break-word
 *   - .satisfaction-tels:  flex row; icon 0.8vw, margin-right 0.84vw
 *   - video tiles:         autoplaying muted loops, two side by side
 *
 * The reference lists two hotlines. Novus has no verified numbers yet, so the layout
 * shows the hotline block with clearly-marked placeholders instead of invented numbers.
 */
export function SatisfactionSection() {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col-reverse px-[5.65vw] pt-[4vw] lg:flex-row lg:items-center lg:justify-start lg:pt-0">
        {/* Text column */}
        <div className="w-full pb-[1.5vw] lg:pb-0">
          <h2 className="w-full text-[5.55vw] font-semibold leading-tight text-ink-brand lg:w-[38vw] lg:text-[3.13vw] lg:font-bold lg:leading-[4.65vw]">
            Customer satisfaction, our priority
          </h2>

          <p className="mt-4 w-full text-[3.4vw] leading-relaxed text-ink-muted lg:w-[34vw] lg:text-[1.04vw] lg:leading-[2.34vw]">
            We are here to provide responsive customer service. Send us a message through this
            site, reach out on social media, or call the hotline below. For account-specific
            help, {siteConfig.assistant.name} can also raise a support ticket for you.
          </p>

          <div className="mt-6 flex">
            <div className="mr-[2.78vw] h-[5.56vw] w-[5.56vw] translate-y-[1.3vw] lg:mr-[0.84vw] lg:h-[0.8vw] lg:w-[0.8vw] lg:translate-y-[0.3vw]">
              <Phone className="h-full w-full text-brand-700" aria-hidden="true" />
            </div>
            <div className="text-[3.4vw] text-ink-brand lg:text-[1.04vw] lg:leading-[2.34vw]">
              {/* TODO(owner): supply verified support hotlines. */}
              <p>Support hotline: Not configured yet</p>
              <p>Business and card queries: Not configured yet</p>
            </div>
          </div>
        </div>

        {/* Media tiles */}
        <div className="flex w-full flex-col gap-4 pb-6 sm:flex-row lg:w-auto lg:gap-[1.5vw] lg:pb-0">
          <MediaTile variant="service" />
          <MediaTile variant="customers" />
        </div>
      </div>
    </section>
  );
}

function MediaTile({ variant }: { variant: 'service' | 'customers' }) {
  return (
    <div className="relative w-full shrink-0 overflow-hidden rounded-[2.051vw] lg:w-[22vw] lg:rounded-[0.8vw]">
      <div className="aspect-[4/3] w-full">
        <SatisfactionVideoArt variant={variant} className="h-full w-full" />
      </div>
      {/* Play affordance, mirroring the reference's play icon overlay. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 lg:h-9 lg:w-9"
      >
        <span className="ml-0.5 block h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-brand-700" />
      </span>
    </div>
  );
}
