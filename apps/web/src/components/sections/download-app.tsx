import { QrCode } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { homeImages } from '@/lib/images';

/**
 * "Download the app" band — present in the reference and missing from the previous build.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .pc-download-app:            background #ededed, padding 4.04vw 0
 *   - .pc-container:               padding 4.04vw 5.65vw
 *   - .pc-download-image-wrapper:  49.56vw x 27.56vw (~713x397), border-radius 8px
 *   - .pc-download-text-wrapper:   margin-left 3.91vw, width 31vw
 *   - .pc-download-qr:             12vw x 12.4vw (~173x179)
 *   - .pc-download-text-content:   font-size 2.08vw (~30px)
 *
 * Novus has no published app. Rather than fabricate store links, this section states
 * the position honestly and reserves the correct space so the layout matches.
 */
export function DownloadAppSection() {
  return (
    <section className="w-full bg-band">
      {/* The band has no visible heading by design; the heading still exists so
          the section is named in the document outline and by screen readers. */}
      <h2 className="sr-only">Download the Novus MFB app</h2>
      <div className="w-full px-[5.65vw] py-[4.04vw]">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-start">
          {/* Phone / app artwork. Source file:
              apps/web/public/images/home/mobile-banking.webp */}
          <div className="relative h-auto w-full shrink-0 overflow-hidden rounded-lg lg:aspect-[49.56/27.56] lg:h-auto lg:w-[49.56vw]">
            <div className="aspect-[49.56/27.56] w-full">
              <SmartImage
                slot={homeImages.downloadApp}
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Text + QR */}
          <div className="mt-8 flex w-full flex-col items-start lg:ml-[3.91vw] lg:mt-0 lg:w-[31vw]">
            {/* QR code: desktop only. On a phone the visitor is already on the
                device that would scan it, so showing it wastes the whole first
                screen of the band. */}
            <div className="mb-[1.39vw] hidden h-[12.4vw] w-[12vw] justify-center lg:ml-[6px] lg:flex">
              <QrPlaceholder />
            </div>

            <div className="mt-[1.39vw] text-[5vw] lg:text-[2.08vw]">
              <p className="font-semibold text-ink-brand">
                The {`Novus`} MFB app is coming soon.
              </p>
              <p className="mt-1 text-ink-brand">
                It will be available on{' '}
                <span className="font-semibold text-brand-700">iOS</span> and{' '}
                <span className="font-semibold text-brand-700">Android</span>.
              </p>
              <p className="mt-2 text-[3.4vw] text-ink-muted lg:text-[max(13px,1vw)]">
                When the app is released this space will hold a working QR code and direct store
                links. Until then you can use every service on this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * QR placeholder at the reference's exact dimensions. Rendered as a clearly-marked
 * empty frame rather than a real (and therefore misleading) scannable code.
 */
function QrPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-200 bg-white text-center">
      <QrCode className="h-1/3 w-1/3 text-brand-300" aria-hidden="true" />
      <span className="px-2 text-[2.6vw] font-medium text-ink-subtle lg:text-[max(12px,0.7vw)]">
        QR code available at launch
      </span>
    </div>
  );
}
