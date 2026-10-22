import { SecurityTileArt } from './security-tile-art';

/**
 * Security section — reconstructed from the reference.
 *
 * The reference is a SOLID colour band (#1dc99b green) containing a two-column flex:
 * two stacked media tiles on the left, and a heading plus three text blocks on the
 * right. The previous build used three icon cards on a plain background — a
 * completely different composition.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .security-product: background solid accent, padding 5vw 0
 *   - .security-flex:    padding 0 5.65vw, align-items center, flex-direction row
 *   - .security-item:    width 41.1vw (~592px), margin-bottom 1.4vw, aspect-ratio 1004/425
 *   - .security-text:    margin-left 48px
 *   - .security-title:   font-size 3.13vw (~45px), weight 700, line-height 4.65vw, width 40.4vw
 *
 * The reference's tiles are autoplaying muted video. Novus has no such video, so the
 * tiles render original branded artwork with the same ratio and visual weight.
 */

const items = [
  {
    title: 'Advanced fraud protection',
    body: 'Your data is stored and encrypted using industry-standard technology, and our systems are monitored continuously to protect against security threats.',
  },
  {
    title: 'Secure transactions',
    body: 'Every transaction and session is encrypted in transit. We never ask for your PIN, OTP or full card details, in chat or anywhere else.',
  },
  {
    title: 'Instant account locking',
    body: 'Lock your card or account immediately if your phone is lost or stolen, and reach our support team directly from this site or the app.',
  },
];

export function SecuritySection() {
  return (
    <section className="w-full bg-brand-700">
      <div className="flex flex-col px-[5.65vw] py-[6.67vw] lg:flex-row lg:items-center lg:justify-start lg:py-[5vw]">
        {/* Media tiles */}
        <div className="mb-[2.16vw] shrink-0 lg:mb-0">
          <div className="relative mb-[3vw] w-[88.88vw] overflow-hidden rounded-[2.051vw] lg:mb-[1.4vw] lg:w-[41.1vw]">
            <div className="aspect-[1004/425] w-full">
              <SecurityTileArt variant="shield" className="h-full w-full" />
            </div>
          </div>
          <div className="relative w-[88.88vw] overflow-hidden rounded-[2.051vw] lg:w-[41.1vw]">
            <div className="aspect-[1004/425] w-full">
              <SecurityTileArt variant="lock" className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:ml-12">
          <h2 className="mb-[4.44vw] w-full text-[5.55vw] font-semibold leading-tight text-white lg:mb-[1vw] lg:w-[40.4vw] lg:pl-[3vw] lg:text-[3.13vw] lg:font-bold lg:leading-[4.65vw] lg:text-white">
            Your security and privacy are our priority
          </h2>

          {items.map((item) => (
            <div key={item.title} className="mb-[4.44vw] lg:mb-[2vw] lg:pl-[3vw]">
              <h3 className="text-[4.2vw] font-semibold text-white lg:text-[1.4vw] lg:font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-[3.4vw] leading-relaxed text-white/85 lg:w-[34vw] lg:text-[1vw]">
                {item.body}
              </p>
            </div>
          ))}

          <p className="mt-6 w-full rounded-xl border border-white/25 bg-white/10 px-5 py-4 text-[3.2vw] leading-relaxed text-white/90 lg:w-[34vw] lg:text-[0.9vw]">
            Regulatory and insurance details will be published here once verified by the bank.
            No licence, insurance or regulatory claim is made until confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
