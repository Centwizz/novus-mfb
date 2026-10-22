import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { HeroBannerArt } from './hero-banner';

/**
 * Homepage hero — reconstructed from the reference's actual geometry.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - banner wrapper: aspect-ratio 1920/800 → 1440x600 at a 1440px viewport
 *   - .header-content: absolutely positioned over the banner, full height
 *   - .header-flex:    flex column, justify-content flex-end, padding-bottom 8vw
 *   - .pc-header-text: flex-basis 51% at >=1400px, padding-left 1.5vw
 *   - .header-title:   font-size 4.17vw (~60px), weight 700, line-height 1.2, white, width 50vw
 *   - .header-subtitle:font-size 1.04vw (~15px), line-height 2.34vw, width 47.51vw, colour #210f60
 *   - download buttons: 1.95vw x 6.17vw, gap 2.34vw
 *
 * Mobile: banner aspect-ratio 390/844; title 11.11vw; subtitle 3.33vw; content
 * bottom-aligned. The reference renders two separate markup branches for mobile and
 * desktop; here a single, responsive branch is used to avoid duplicated content in
 * the accessibility tree while producing the same visual result.
 */
export function Hero() {
  return (
    <section id="top" className="relative w-full">
      {/* Full-bleed banner */}
      <div className="relative aspect-[390/844] w-full lg:aspect-[1920/800]">
        <HeroBannerArt className="absolute inset-0 h-full w-full" />

        {/* Overlaid content, pinned to the bottom exactly like the reference. */}
        <div className="absolute inset-0 h-full w-full">
          <div className="flex h-full w-full flex-col justify-end px-[5.5vw] pb-[8vw] lg:px-gutter lg:pb-[3.5vw]">
            <div className="flex w-full flex-col items-start text-white lg:flex-row">
              <div className="w-full lg:basis-[51%] lg:pl-[1.5vw]">
                <h1 className="animate-fade-up text-[11.11vw] font-bold leading-[1.2] text-white lg:text-[4.17vw] lg:leading-[1.2]">
                  Banking that is
                  <br />
                  <span className="highlight">Beyond the Branch</span>
                </h1>

                {/* Mobile subtitle (reference: shown below 992px) */}
                <p className="mt-[4vw] max-w-[89.16vw] animate-fade-up-250 text-[3.33vw] leading-[6.67vw] text-white/95 lg:hidden">
                  Novus MFB makes everyday banking simple, secure and accessible — for
                  individuals and small businesses.
                </p>

                {/* Desktop subtitle (reference: shown at >=992px, darker body colour) */}
                <p className="mt-0 hidden w-[47.51vw] animate-fade-up-250 text-[1.04vw] leading-[2.34vw] text-white/90 lg:block">
                  With a mission to make financial services more inclusive through
                  technology, Novus MFB is dedicated to providing secure, easy-to-use and
                  affordable banking for individuals and small businesses. Open an
                  account, save, borrow and manage your money with confidence — with
                  human support and our assistant Nova whenever you need them.
                </p>

                {/* Regulatory badge slot — intentionally empty until the owner supplies
                    verified wording. The space is reserved so the layout matches the
                    reference and nothing shifts when the asset is added. */}
                <div className="mt-[3vw] hidden h-[37px] w-[401px] lg:block" aria-hidden="true" />

                {/* Store badges. Novus has no published app yet, so these are
                    honest, clearly-labelled placeholders that still occupy the
                    reference's exact 1.95vw x 6.17vw slots. */}
                <div className="mt-[2.7vw] flex flex-wrap gap-[3.33vw] lg:mt-[1.2vw] lg:gap-[2.34vw]">
                  <StoreBadge platform="iOS" className="h-[10.67vw] w-[35.56vw] lg:h-[1.95vw] lg:w-[6.17vw]" />
                  <StoreBadge platform="Android" className="h-[10.67vw] w-[35.56vw] lg:h-[1.95vw] lg:w-[6.17vw]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action, placed just under the banner. The reference relies on its
          app store links alone; Novus needs a web conversion path, so this is a
          documented, restrained addition rather than a replacement. */}
      <div className="border-b border-border bg-white">
        <div className="flex flex-wrap items-center gap-3 px-[5.5vw] py-6 lg:px-gutter">
          <ButtonLink href="/register" size="lg">
            Open an account
          </ButtonLink>
          <ButtonLink href="/personal" variant="outline" size="lg">
            Explore products
          </ButtonLink>
          <p className="text-sm text-ink-muted">
            Or chat with {siteConfig.assistant.name}, our virtual assistant.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Honest store-badge placeholder. Rendered as a labelled outline rather than a
 * fake Apple/Google badge, because no Novus app is published yet.
 */
function StoreBadge({ platform, className }: { platform: string; className?: string }) {
  return (
    <span
      className={`${className} inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-3 text-center text-[2.8vw] font-medium text-white backdrop-blur-sm lg:text-[0.7vw]`}
    >
      <span className="opacity-70">Coming soon on</span>
      <span className="font-semibold">{platform}</span>
    </span>
  );
}
